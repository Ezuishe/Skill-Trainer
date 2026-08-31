/*
 * plan.test.js — curriculum integrity and planner arithmetic.
 * No dependencies:  node tests/plan.test.js
 */
global.window = global;
var path = require('path');
var root = path.join(__dirname, '..', 'assets', 'js');
['disciplines-01-communication.js', 'disciplines-02-influence.js',
  'disciplines-03-building.js', 'disciplines-04-foundation.js',
  'sessions-01-communication.js', 'sessions-02-influence.js',
  'sessions-03-building.js', 'sessions-04-foundation.js',
  'teaching-01-communication.js', 'teaching-02-influence.js',
  'teaching-03-building.js', 'teaching-04-foundation.js',
  'setup.js']
  .forEach(function (f) { require(path.join(root, 'data', f)); });
require(path.join(root, 'data', 'dispatch.js'));
require(path.join(root, 'engine.js'));
require(path.join(root, 'stats.js'));
require(path.join(root, 'dispatch-core.js'));

var fails = 0;
function check(label, cond, extra) {
  if (!cond) { fails++; console.log('FAIL  ' + label + (extra ? '  → ' + extra : '')); }
}

console.log('disciplines:', DISCIPLINES.length);
console.log('tracks:', DISPATCH_TRACKS.length,
  'entries:', DISPATCH_TRACKS.reduce((a, t) => a + t.entries.length, 0));

/* --- data integrity --------------------------------------------------- */
var ids = {};
DISCIPLINES.forEach(function (d) {
  check('unique id ' + d.id, !ids[d.id]); ids[d.id] = 1;
  ['functional', 'competent', 'professional', 'elite'].forEach(function (k) {
    check(d.id + ' has hours.' + k, typeof d.hours[k] === 'number');
    check(d.id + ' has proofs.' + k, !!d.proofs[k]);
  });
  check(d.id + ' hours ascend',
    d.hours.functional < d.hours.competent &&
    d.hours.competent < d.hours.professional &&
    d.hours.professional < d.hours.elite);
  var w = d.pillars.reduce(function (a, p) { return a + p.weight; }, 0);
  check(d.id + ' weights ≈ 1', Math.abs(w - 1) < 0.02, w.toFixed(3));
  d.pillars.forEach(function (p) {
    check(d.id + '/' + p.id + ' drills', p.drills.length >= 4, String(p.drills.length));
    check(d.id + '/' + p.id + ' stages', p.stages && p.stages.length >= 3, p.stages ? String(p.stages.length) : 'none');
    check(d.id + '/' + p.id + ' standard', !!p.standard && p.standard.length > 20);
    (p.stages || []).forEach(function (st) {
      check(d.id + '/' + p.id + '/stage ' + st.name, !!st.name && !!st.work && !!st.check);
    });
    check(d.id + '/' + p.id + ' criteria', p.milestone.criteria.length >= 3);
    check(d.id + '/' + p.id + ' specialization', !!p.specialization);
    p.drills.forEach(function (dr) {
      check(d.id + '/' + p.id + '/' + dr.name + ' protocol', !!dr.protocol && !!dr.dose);
      check(d.id + '/' + p.id + '/' + dr.name + ' mistake', !!dr.mistake && dr.mistake.length > 20);
    });
  });
  ['metrics', 'failureModes', 'arena', 'library'].forEach(function (k) {
    check(d.id + ' has ' + k, Array.isArray(d[k]) && d[k].length >= 3);
  });

  /* Every pillar must have authored acquire and produce work. Without it the
     session is only a topic label, which is the thing that made plans vague. */
  d.pillars.forEach(function (p) {
    var key = d.id + '/' + p.id;
    var sess = PILLAR_SESSIONS[key];
    check(key + ' has authored sessions', !!sess);
    if (!sess) return;
    check(key + ' has >=2 study tasks', sess.study && sess.study.length >= 2);
    check(key + ' has >=2 make tasks', sess.make && sess.make.length >= 2);
    (sess.study || []).concat(sess.make || []).forEach(function (item) {
      check(key + '/' + item.task + ' has a task name', !!item.task && item.task.length > 8);
      check(key + '/' + item.task + ' has >=3 steps', item.steps && item.steps.length >= 3,
        item.steps ? String(item.steps.length) : 'none');
      (item.steps || []).forEach(function (st) {
        /* Terse is fine ("Redraw it."); vague or unpunctuated is not. */
        check(key + ' step is a written instruction',
          st.length > 9 && /[.?]["']?$/.test(st) && /^[A-Z]/.test(st), st.slice(0, 45));
      });
    });
    (sess.make || []).forEach(function (m) {
      check(key + '/' + m.task + ' has a check', !!m.check && m.check.length > 15);
    });
  });

  /* Every pillar must also teach. A schedule without an explanation is a
     to-do list, which is the complaint that produced this layer. */
  d.pillars.forEach(function (p) {
    var key = d.id + '/' + p.id;
    var t = PILLAR_TEACHING[key];
    check(key + ' has a teaching note', !!t);
    if (!t) return;
    ['idea', 'why', 'misread', 'tell'].forEach(function (f) {
      check(key + '.' + f + ' is written out', !!t[f] && t[f].length > 80 && /[.?]$/.test(t[f]),
        t[f] ? t[f].slice(0, 40) : 'none');
    });
    check(key + ' has >=3 terms', t.terms && t.terms.length >= 3);
    (t.terms || []).forEach(function (tm) {
      check(key + '/' + tm.term + ' defined', !!tm.term && !!tm.meaning && tm.meaning.length > 40);
    });
  });

  /* Getting started. */
  var setup = DISCIPLINE_SETUP[d.id];
  check(d.id + ' has setup', !!setup);
  if (setup) {
    check(d.id + ' setup tools', setup.tools && setup.tools.length >= 2);
    check(d.id + ' setup arena', !!setup.arena && setup.arena.length > 30);
    check(d.id + ' setup baseline', setup.baseline && setup.baseline.length >= 3);
    check(d.id + ' setup firstWeek', !!setup.firstWeek && setup.firstWeek.length > 30);
  }
});

/* Nothing authored for a pillar that does not exist. */
var validKeys = {};
DISCIPLINES.forEach(function (d) { d.pillars.forEach(function (p) { validKeys[d.id + '/' + p.id] = 1; }); });
Object.keys(PILLAR_SESSIONS).forEach(function (k) {
  check('session key ' + k + ' matches a real pillar', !!validKeys[k]);
});
Object.keys(PILLAR_TEACHING).forEach(function (k) {
  check('teaching key ' + k + ' matches a real pillar', !!validKeys[k]);
});

DISPATCH_TRACKS.forEach(function (t) {
  check(t.id + ' >=10 entries', t.entries.length >= 10, t.entries.length);
  t.entries.forEach(function (e, i) {
    ['source', 'author', 'reading', 'practice', 'tension'].forEach(function (k) {
      check(t.id + '[' + i + '].' + k, !!e[k] && e[k].length > 3);
    });
  });
});

/* --- planner across the input space ----------------------------------- */
var levels = ['novice', 'developing', 'working', 'advanced'];
var cases = 0;
DISCIPLINES.forEach(function (d) {
  [1, 4, 12, 52, 104].forEach(function (weeks) {
    [1, 8, 45].forEach(function (hours) {
      [1, 5, 7].forEach(function (days) {
        levels.forEach(function (level) {
          cases++;
          var p = Planner.build({
            disciplineId: d.id, weeks: weeks, hoursPerWeek: hours,
            daysPerWeek: days, level: level, startDate: '2026-08-24'
          });
          check('phases exist ' + d.id + ' ' + weeks + 'w', p.phases.length >= 1);
          var phaseWeeks = p.phases.reduce(function (a, ph) { return a + ph.weeks; }, 0);
          check('phase weeks == horizon ' + d.id + ' ' + weeks + 'w/' + hours + 'h',
            phaseWeeks === p.input.weeks, phaseWeeks + ' vs ' + p.input.weeks);
          check('schedule length ' + d.id, p.schedule.length === p.input.weeks,
            p.schedule.length + ' vs ' + p.input.weeks);
          var bp = p.blockPlan;
          p.schedule.forEach(function (w) {
            check('sessions per week ' + d.id + ' w' + w.number,
              w.sessions.length === bp.blocks + bp.reserveReview,
              w.sessions.length + ' vs ' + (bp.blocks + bp.reserveReview));
            /* The week must sum to the hours asked for, give or take the
               floors that stop a session being too short to run. */
            if (!w.consolidation) {
              check('week sums to the budget ' + d.id + ' w' + w.number,
                w.minutes === bp.weekMinutes, w.minutes + ' vs ' + bp.weekMinutes);
            }
            var days = {};
            w.sessions.forEach(function (s) { days[s.weekday] = 1; });
            check('training days within the week ' + d.id,
              Object.keys(days).length === bp.trainingDays &&
              Math.max.apply(null, Object.keys(days).map(Number)) <= p.input.daysPerWeek);
            w.sessions.forEach(function (s) {
              check('no absurd single session ' + d.id,
                s.minutes <= Math.max(Planner.maxBlockMinutes, bp.blockMinutes),
                s.type.key + ' ' + s.minutes + ' min');
              check('no token session ' + d.id, s.minutes >= 10, s.type.key + ' ' + s.minutes + ' min');
              check('block numbering ' + d.id, s.block >= 1 && s.block <= s.blocks);
              check('session has title', typeof s.title === 'string' && s.title.length > 0);
              check('EVERY session has concrete instructions',
                (s.steps && s.steps.length >= 3) || !!s.drill,
                s.type.key + ': ' + s.title.slice(0, 50));
              check('drill sessions carry a drill', s.type.key !== 'drill' || !!s.drill);
              check('non-drill sessions carry no drill', s.type.key === 'drill' || !s.drill);
              check('session title is not the drill dose repeated',
                !s.drill || s.title.indexOf(s.drill.dose) === -1);
              check('session hours > 0', s.hours > 0, String(s.hours));
              check('session date valid', s.date instanceof Date && !isNaN(s.date));
            });
          });
          check('plan carries setup ' + d.id, !!p.setup && !!p.setup.baseline);
          check('verdict statement ' + d.id, !!p.verdict.statement);
          check('verdict owns ' + d.id, !!p.verdict.owns);
          check('gates == phases', p.phases.length ===
            p.schedule.filter(function (w) { return w.gate; }).length);
          var md = Planner.toMarkdown(p);
          check('markdown non-trivial', md.length > 1500, String(md.length));
          check('markdown no undefined', md.indexOf('undefined') === -1);
          check('markdown has the setup section', md.indexOf('## Before week 1') !== -1);
          check('markdown has numbered steps', /\n      1\. /.test(md));
          var ics = Planner.toICS(p);
          check('ics wrapped', /^BEGIN:VCALENDAR/.test(ics) && /END:VCALENDAR$/.test(ics));
          check('ics no undefined', ics.indexOf('undefined') === -1);
          var events = (ics.match(/BEGIN:VEVENT/g) || []).length;
          check('ics events count', events === p.sessionCount + p.phases.length,
            events + ' vs ' + (p.sessionCount + p.phases.length));
          ics.split('\r\n').forEach(function (line) {
            check('ics line length', line.length <= 75, line.slice(0, 30));
          });
        });
      });
    });
  });
});
console.log('planner cases:', cases);

/* --- clamping and odd input ------------------------------------------- */
var weird = Planner.build({ disciplineId: 'persuasive-writing', weeks: 999, hoursPerWeek: 500, daysPerWeek: 99, level: 'nonsense' });
check('weeks clamped', weird.input.weeks === 156, String(weird.input.weeks));
check('hours clamped', weird.input.hoursPerWeek === 60, String(weird.input.hoursPerWeek));
check('days clamped', weird.input.daysPerWeek === 7, String(weird.input.daysPerWeek));
check('unknown level treated as novice', weird.verdict.bankedHours === 0);

var tiny = Planner.build({ disciplineId: 'software-engineering', weeks: 1, hoursPerWeek: 1, daysPerWeek: 1, level: 'novice' });
check('tiny program has 1 phase', tiny.phases.length === 1, String(tiny.phases.length));
check('tiny program declares shortfall', /hours short of being functional/.test(tiny.verdict.statement));
check('tiny program cut scope', tiny.scope.dropped.length > 0);

var huge = Planner.build({ disciplineId: 'learning-velocity', weeks: 156, hoursPerWeek: 40, daysPerWeek: 6, level: 'advanced' });
check('huge program reaches elite', huge.verdict.reachedKey === 'elite', String(huge.verdict.reachedKey));
check('elite has no next lever', huge.verdict.levers.length === 0);

/* --- session time plans (the reported bugs) ---------------------------- */

DISCIPLINES.forEach(function (d) {
  [[7, 4], [5, 3], [12, 5], [3, 7], [1, 1]].forEach(function (cfg) {
    var pp = Planner.build({
      disciplineId: d.id, weeks: 14, hoursPerWeek: cfg[0], daysPerWeek: cfg[1],
      level: 'novice', startDate: '2026-08-24'
    });

    /* The week must sum to exactly the hours asked for, in whole minutes. */
    pp.schedule.filter(function (w) { return !w.consolidation; }).forEach(function (w) {
      var mins = w.sessions.reduce(function (a, sn) { return a + sn.minutes; }, 0);
      check('week sums to the budget ' + d.id + ' ' + cfg.join('/'),
        mins === Math.round(cfg[0] * 60), mins + ' vs ' + Math.round(cfg[0] * 60));
    });

    pp.schedule.forEach(function (w) {
      w.sessions.forEach(function (sn) {
        check('session has a time plan', sn.plan && sn.plan.length === 4);
        var sum = sn.plan.reduce(function (a, r) { return a + r.minutes; }, 0);
        check('time plan sums to the session ' + d.id,
          sum === sn.minutes, sum + ' vs ' + sn.minutes);
        sn.plan.forEach(function (r) {
          check('no zero-length block', r.minutes >= 1, String(r.minutes));
        });
        check('session minutes are positive', sn.minutes >= 1, String(sn.minutes));

        /* A review is scoring, not a practice block. */
        if (sn.type.key === 'review' && cfg[1] >= 3) {
          check('review capped at 30 min', sn.minutes <= 30, String(sn.minutes));
          check('review plan is review-shaped',
            /Count/.test(sn.plan[0].name), sn.plan[0].name);
        }
      });
    });

    /* The very first session cannot ask you to recall a previous one. */
    var firstSession = pp.schedule[0].sessions[0];
    check('first session is flagged ' + d.id, firstSession.first === true);
    var firstText = firstSession.plan.map(function (r) { return r.name + ' ' + r.note; }).join(' ');
    check('first session does not reference a previous session',
      !/last session|previous session/i.test(firstText), firstText.slice(0, 60));
    check('first session sets up and takes a baseline',
      /Set up/.test(firstText) && /Baseline/.test(firstText));

    /* Every later session may reference the previous one. */
    var second = pp.schedule[0].sessions[1] || pp.schedule[1].sessions[0];
    check('later sessions are not flagged first', second.first !== true);

    /* A consolidation week's plan must match its shortened session. */
    var cons = pp.schedule.filter(function (w) { return w.consolidation; })[0];
    if (cons) {
      var cs = cons.sessions[0];
      var csum = cs.plan.reduce(function (a, r) { return a + r.minutes; }, 0);
      check('consolidation plan matches the shortened session',
        csum === cs.minutes, csum + ' vs ' + cs.minutes);
      check('consolidation session really is shorter',
        cs.minutes < pp.schedule[0].sessions[0].minutes ||
        cs.type.key === 'review');
    }
  });
});

/* --- runsheets ---------------------------------------------------------- */

DISCIPLINES.forEach(function (d) {
  [[7, 4], [2, 3], [20, 5]].forEach(function (cfg) {
    var rp = Planner.build({
      disciplineId: d.id, weeks: 10, hoursPerWeek: cfg[0], daysPerWeek: cfg[1],
      level: 'novice', startDate: '2026-08-24'
    });
    rp.schedule.forEach(function (w) {
      w.sessions.forEach(function (sn) {
        var r = sn.runsheet;
        check('session has a runsheet ' + d.id, !!r && r.rows.length >= 3);
        var sum = r.rows.reduce(function (a, row) { return a + row.minutes; }, 0);
        check('runsheet sums to the session ' + d.id, sum === sn.minutes, sum + ' vs ' + sn.minutes);
        check('runsheet total matches', r.total === sn.minutes);
        r.rows.forEach(function (row) {
          check('runsheet row has time', row.minutes >= 1, String(row.minutes));
          check('runsheet row has a label', !!row.label);
          check('runsheet row has detail', !!row.detail && row.detail.length > 5);
          check('runsheet row has a clock window', /^\d+:\d\d$/.test(row.from) && /^\d+:\d\d$/.test(row.to),
            row.from + '-' + row.to);
        });
        /* Clock windows must be contiguous and start at zero. */
        check('runsheet starts at 0:00 ' + d.id, r.rows[0].from === '0:00', r.rows[0].from);
        var opens = r.rows.filter(function (row) { return row.kind === 'open'; }).length;
        var closes = r.rows.filter(function (row) { return row.kind === 'close'; }).length;
        check('exactly one opening band', opens === 1, String(opens));
        check('exactly one closing band', closes === 1, String(closes));
        /* Every step must appear as its own row. */
        if (sn.steps && sn.steps.length) {
          var workRows = r.rows.filter(function (row) { return row.kind === 'work'; });
          check('one row per step ' + d.id, workRows.length === sn.steps.length,
            workRows.length + ' vs ' + sn.steps.length);
        }
      });
    });

    /* The first session must not tell you to recall a previous one. */
    var f = rp.schedule[0].sessions[0].runsheet;
    check('first session runsheet sets up ' + d.id, /Set up/.test(f.rows[0].label), f.rows[0].label);
    check('first session runsheet has no recall',
      !/last session|previous session/i.test(f.rows[0].detail), f.rows[0].detail.slice(0, 50));
  });
});

/* Step weighting must actually differentiate. */
check('a heavy step outweighs a bookkeeping step',
  Planner.stepWeight('Record five minutes, watch it back and repeat until under two per minute.').weight >
  Planner.stepWeight('Note the date.').weight);
check('bookkeeping is classified as capture',
  Planner.stepWeight('Note the date.').rule === 'capture',
  Planner.stepWeight('Note the date.').rule);

/* --- calibration -------------------------------------------------------- */

function calProgress(prog, n, score, difficulty) {
  var pr = { id: prog.id, sessions: {}, gates: {}, logs: [], hours: 0, records: {} };
  var i = 0;
  prog.schedule.forEach(function (w) {
    w.sessions.forEach(function (sn) {
      if (i >= n) return;
      var k = 'w' + w.number + 'd' + sn.day;
      pr.sessions[k] = '2026-09-01';
      pr.records[k] = {
        score: typeof score === 'function' ? score(i) : score,
        difficulty: typeof difficulty === 'function' ? difficulty(i) : difficulty
      };
      i++;
    });
  });
  return pr;
}

var cp = Planner.build({
  disciplineId: 'speaking-presence', weeks: 12, hoursPerWeek: 7, daysPerWeek: 4,
  level: 'novice', startDate: '2026-08-24'
});

var calEmpty = Stats.calibration(cp, { records: {} });
check('no calibration verdict without data', calEmpty.verdict === null);
check('no plateau without data', calEmpty.plateau === null);
check('calibration count starts at zero', calEmpty.count === 0);

var calEasy = Stats.calibration(cp, calProgress(cp, 6, 4, 'easy'));
check('all-easy is flagged too easy', calEasy.verdict.state === 'too-easy', calEasy.verdict.state);
check('too-easy advice says raise it', /Raise the difficulty/.test(calEasy.verdict.line));

var calHard = Stats.calibration(cp, calProgress(cp, 6, 2, 'hard'));
check('all-hard is flagged too hard', calHard.verdict.state === 'too-hard', calHard.verdict.state);

var calMixed = Stats.calibration(cp, calProgress(cp, 6, 3, function (i) {
  return ['right', 'right', 'easy', 'right', 'hard', 'right'][i % 6];
}));
check('a mixed run sits in band', calMixed.verdict.state === 'in-band', calMixed.verdict.state);

var calTwo = Stats.calibration(cp, calProgress(cp, 2, 3, 'easy'));
check('two sessions is not enough to judge difficulty', calTwo.verdict === null);

var calFlat = Stats.calibration(cp, calProgress(cp, 12, 3, 'right'));
check('a flat run flags a plateau', !!calFlat.plateau);
check('flat trend is flat', calFlat.trend.direction === 'flat', calFlat.trend.direction);

var calUp = Stats.calibration(cp, calProgress(cp, 12, function (i) { return i < 6 ? 2 : 5; }, 'right'));
check('an improving run does not flag a plateau', calUp.plateau === null);
check('improving trend is up', calUp.trend.direction === 'up', calUp.trend.direction);

var calDown = Stats.calibration(cp, calProgress(cp, 12, function (i) { return i < 6 ? 5 : 2; }, 'right'));
check('a falling trend is detected', calDown.trend.direction === 'down', calDown.trend.direction);

check('means are bounded 1-5',
  calUp.recentMean >= 1 && calUp.recentMean <= 5, String(calUp.recentMean));

/* --- credits and transcript -------------------------------------------- */

var tp = Planner.build({
  disciplineId: 'speaking-presence', weeks: 12, hoursPerWeek: 7, daysPerWeek: 4,
  level: 'novice', startDate: '2026-08-24'
});
var tpr = { id: tp.id, sessions: {}, gates: {}, logs: [], hours: 0 };

var t0 = Stats.transcript(tp, tpr);
check('transcript has one module per phase', t0.modules.length === tp.phases.length);
check('no credits before any work', t0.creditsEarned === 0, String(t0.creditsEarned));
check('no modules awarded at the start', t0.modulesAwarded === 0);
check('module codes look like codes', /^[A-Z]{3}-\d{2}$/.test(t0.modules[0].code), t0.modules[0].code);
check('every module is worth at least one credit',
  t0.modules.every(function (m) { return m.credits >= 1; }));
check('credits total matches the plan hours roughly',
  Math.abs(t0.creditsTotal - tp.totalHours) <= tp.phases.length,
  t0.creditsTotal + ' vs ' + tp.totalHours);
check('current module points at the first one', t0.current && t0.current.index === 1);

/* Log every session of module 1 but do not pass the gate. */
tp.schedule.forEach(function (w) {
  if (w.phase.index !== 1) return;
  w.sessions.forEach(function (sn) { tpr.sessions['w' + w.number + 'd' + sn.day] = '2026-09-01'; });
});
var t1 = Stats.transcript(tp, tpr);
check('hours alone do not award a module', t1.modules[0].awarded === false);
check('hours alone do not grant full credits',
  t1.modules[0].earned < t1.modules[0].credits,
  t1.modules[0].earned + '/' + t1.modules[0].credits);
check('but credits did accrue', t1.modules[0].earned > 0, String(t1.modules[0].earned));
check('status is in progress', t1.modules[0].status === 'In progress', t1.modules[0].status);

/* Now pass the gate. */
tp.phases[0].milestone.criteria.forEach(function (_, i) { tpr.gates['p1c' + i] = '2026-09-05'; });
var t2 = Stats.transcript(tp, tpr);
check('passing the gate awards the module', t2.modules[0].awarded === true);
check('an awarded module grants its full credits',
  t2.modules[0].earned === t2.modules[0].credits,
  t2.modules[0].earned + '/' + t2.modules[0].credits);
check('awarding increases total credits', t2.creditsEarned > t1.creditsEarned);
check('modules awarded counts up', t2.modulesAwarded === 1);
check('current module moves to the next one', t2.current && t2.current.index === 2);
check('credits never exceed the total', t2.creditsEarned <= t2.creditsTotal);

/* Transcript must hold up for every discipline. */
DISCIPLINES.forEach(function (d) {
  var pr = Planner.build({
    disciplineId: d.id, weeks: 6, hoursPerWeek: 4, daysPerWeek: 3,
    level: 'novice', startDate: '2026-08-24'
  });
  var tr = Stats.transcript(pr, { id: pr.id, sessions: {}, gates: {}, logs: [], hours: 0 });
  check(d.id + ' transcript builds', tr.modules.length >= 1);
  check(d.id + ' credit percentages bounded', tr.creditsPct >= 0 && tr.creditsPct <= 100);
});

/* --- retention stats --------------------------------------------------- */

function blankProgress(id) { return { id: id, sessions: {}, gates: {}, logs: [], hours: 0 }; }

var sp = Planner.build({
  disciplineId: 'negotiation', weeks: 12, hoursPerWeek: 8, daysPerWeek: 4,
  level: 'novice', startDate: '2026-08-24'
});
var NOW = new Date(2026, 8, 16); // Wed 16 Sep 2026

/* empty state */
var s0 = Stats.build(sp, blankProgress(sp.id), NOW);
check('empty: no hours banked', s0.ladder.logged === 0, String(s0.ladder.logged));
check('empty: streak zero', s0.streak.weeks === 0, String(s0.streak.weeks));
check('empty: momentum is new', s0.momentum.state === 'new', s0.momentum.state);
check('empty: has a next marker', !!s0.markers.next);
check('empty: ladder targets functional first',
  s0.ladder.next && s0.ladder.next.key === 'functional', s0.ladder.next && s0.ladder.next.key);
check('empty: pct is 0', s0.ladder.pct === 0, String(s0.ladder.pct));

/* a person who logged something in each of the last three weeks */
var p3 = blankProgress(sp.id);
['2026-09-16', '2026-09-08', '2026-09-01'].forEach(function (d, i) {
  p3.sessions['w' + (i + 1) + 'd1'] = d;
});
p3.hours = 12;
var s3 = Stats.build(sp, p3, NOW);
check('three active weeks = streak 3', s3.streak.weeks === 3, String(s3.streak.weeks));
check('logged hours surface', s3.ladder.logged === 12, String(s3.ladder.logged));
check('momentum today when logged today', s3.momentum.state === 'today', s3.momentum.state);
check('10h marker earned', s3.markers.earned.some(function (m) { return /10 hours/.test(m.label); }));

/* a gap: last session 20 days ago should not claim a streak */
var pLapsed = blankProgress(sp.id);
pLapsed.sessions['w1d1'] = '2026-08-27';
pLapsed.hours = 2;
var sL = Stats.build(sp, pLapsed, NOW);
check('lapsed: streak broken', sL.streak.weeks === 0, String(sL.streak.weeks));
check('lapsed: state lapsed', sL.momentum.state === 'lapsed', sL.momentum.state);
check('lapsed: copy is recovery not scolding',
  /Restarting costs one session/.test(sL.momentum.line), sL.momentum.line);

/* current week empty must not break a streak that ran until last week */
var pGrace = blankProgress(sp.id);
pGrace.sessions['w1d1'] = '2026-09-10'; // previous week
pGrace.sessions['w1d2'] = '2026-09-03';
pGrace.hours = 4;
var sG = Stats.build(sp, pGrace, NOW);
check('quiet current week keeps prior streak', sG.streak.weeks === 2, String(sG.streak.weeks));

/* crossing a threshold moves the level */
var pBig = blankProgress(sp.id);
pBig.sessions['w1d1'] = '2026-09-16';
pBig.hours = sp.discipline.hours.functional + 5;
var sB = Stats.build(sp, pBig, NOW);
check('crossing functional sets current level',
  sB.ladder.current && sB.ladder.current.key === 'functional',
  sB.ladder.current && sB.ladder.current.key);
check('next target becomes competent',
  sB.ladder.next && sB.ladder.next.key === 'competent', sB.ladder.next && sB.ladder.next.key);
check('reached-level marker present',
  sB.markers.earned.some(function (m) { return /Reached functional/.test(m.label); }));

/* pct stays bounded whatever the hours */
[0, 1, 50, 5000, 100000].forEach(function (h) {
  var pp = blankProgress(sp.id); pp.hours = h;
  var ss = Stats.build(sp, pp, NOW);
  check('pct bounded at ' + h + 'h', ss.ladder.pct >= 0 && ss.ladder.pct <= 100, String(ss.ladder.pct));
  check('remaining never negative at ' + h + 'h', ss.ladder.remaining >= 0, String(ss.ladder.remaining));
});

/* stats must survive every discipline and a prior-experience credit */
DISCIPLINES.forEach(function (d) {
  var pr = Planner.build({
    disciplineId: d.id, weeks: 8, hoursPerWeek: 6, daysPerWeek: 4,
    level: 'advanced', startDate: '2026-08-24'
  });
  var st = Stats.build(pr, blankProgress(pr.id), NOW);
  check(d.id + ' stats build', !!st.ladder && !!st.momentum.line);
  check(d.id + ' banked credit counted', st.ladder.effective >= st.ladder.banked);
  check(d.id + ' sessionsToNext sane',
    st.ladder.sessionsToNext >= 0 && st.ladder.sessionsToNext < 100000,
    String(st.ladder.sessionsToNext));
});

/* --- dispatch determinism --------------------------------------------- */
var a = DispatchCore.entryFor('stoic', new Date(2026, 7, 25));
var b = DispatchCore.entryFor('stoic', new Date(2026, 7, 25));
check('dispatch deterministic', a.key === b.key);
var c = DispatchCore.entryFor('stoic', new Date(2026, 7, 26));
check('dispatch rotates', a.key !== c.key);
var seen = {};
for (var i = 0; i < 12; i++) {
  var pick = DispatchCore.entryFor('stoic', new Date(2026, 7, 25 + i));
  seen[pick.key] = (seen[pick.key] || 0) + 1;
}
check('12 days = 12 distinct stoic entries', Object.keys(seen).length === 12,
  String(Object.keys(seen).length));
var arch = DispatchCore.archiveFor('wealth', 14, new Date(2026, 7, 25));
check('archive length', arch.length === 14);
check('archive distinct from today',
  arch[0].key !== DispatchCore.entryFor('wealth', new Date(2026, 7, 25)).key);

/* --- a worked example -------------------------------------------------- */
var demo = Planner.build({
  disciplineId: 'negotiation', weeks: 8, hoursPerWeek: 6, daysPerWeek: 4,
  level: 'novice', objective: 'Renegotiate my salary in November', startDate: '2026-08-24'
});
console.log('\n--- sample verdict (negotiation, 8wk × 6h) ---');
console.log(demo.verdict.headline);
console.log(demo.verdict.statement);
console.log('owns :', demo.verdict.owns);
console.log('lacks:', demo.verdict.lacks);
demo.verdict.levers.forEach(l => console.log(' •', l.name + ':', l.detail));
console.log('phases:', demo.phases.map(p => p.name + ' (' + p.weeks + 'w/' + p.hours + 'h)').join(' | '));
console.log('dropped:', demo.scope.dropped.map(d => d.name).join(', ') || '(none)');
console.log('week 1 sessions:');
demo.schedule[0].sessions.forEach(s =>
  console.log('  ', Planner.fmtShort(s.date), s.type.label.padEnd(13), s.hours + 'h', '-', s.title.slice(0, 76)));
console.log('week 1 stage:', demo.schedule[0].stage.stage.name, '-', demo.schedule[0].stage.stage.work.slice(0, 90));
console.log('\nsample drill session detail:');
var ds = demo.schedule[1].sessions.filter(x => x.drill)[0];
console.log('  ', ds.title, '|', ds.drill.dose);
console.log('  ', ds.drill.protocol.slice(0, 150));
console.log('   goes wrong:', ds.drill.mistake.slice(0, 120));
var po = demo.schedule[1].sessions.filter(x => x.type.key === 'produce')[0];
console.log('\nproduce session (objective tailoring):', po ? po.title.slice(0, 110) : '(none this week)');

console.log('\n' + (fails ? fails + ' FAILURES' : 'all checks passed'));
process.exit(fails ? 1 : 0);
