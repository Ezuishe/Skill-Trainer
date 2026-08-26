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
          p.schedule.forEach(function (w) {
            check('sessions per week ' + d.id + ' w' + w.number,
              w.sessions.length === p.input.daysPerWeek,
              w.sessions.length + ' vs ' + p.input.daysPerWeek);
            w.sessions.forEach(function (s) {
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
