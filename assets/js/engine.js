/*
 * engine.js — the program planner.
 *
 * Pure logic, no DOM. Given a discipline and an honest hour budget it produces
 * a dated program: scoped pillars, phases, a weekly session template, milestone
 * gates, and a feasibility verdict that refuses to promise a level the budget
 * does not buy.
 *
 * The central idea: a plan that flatters the user is worthless. The engine
 * computes what the hours actually reach, states it plainly, and then offers
 * the three real levers — more time, more hours, or narrower scope.
 */

(function () {
  'use strict';

  var LEVELS = [
    { key: 'functional', label: 'Functional', rank: 1 },
    { key: 'competent', label: 'Working Competence', rank: 2 },
    { key: 'professional', label: 'Professional', rank: 3 },
    { key: 'elite', label: 'Elite', rank: 4 }
  ];

  /* What a starting level means in banked practice hours. Someone who is
   * already working competent does not start from zero — they start from
   * roughly the hours it takes to get there. */
  var BANKED = {
    novice: function () { return 0; },
    developing: function (h) { return h.functional * 0.6; },
    working: function (h) { return h.functional; },
    advanced: function (h) { return h.competent; }
  };

  var LEVEL_COPY = {
    novice: 'Starting from zero',
    developing: 'Some exposure, no structure',
    working: 'Functional but plateaued',
    advanced: 'Competent, pushing toward professional'
  };

  /* Session mix shifts across the program: heavy acquisition early, heavy
   * production late. Each entry is [acquire, drill, produce]; review is a
   * fixed reserved session. */
  function sessionMixFor(progress) {
    var acquire = 0.45 - 0.35 * progress;
    var produce = 0.15 + 0.40 * progress;
    var drill = 1 - acquire - produce;
    return { acquire: acquire, drill: drill, produce: produce };
  }

  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
  function round1(v) { return Math.round(v * 10) / 10; }

  function addDays(date, days) {
    var d = new Date(date.getTime());
    d.setDate(d.getDate() + days);
    return d;
  }

  function fmtDate(d) {
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  function fmtShort(d) {
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  }

  function startOfWeek(date) {
    var d = new Date(date.getTime());
    var day = (d.getDay() + 6) % 7; /* Monday = 0 */
    return addDays(d, -day);
  }

  /* Largest-remainder apportionment: distribute `total` whole units across
   * weights without drift. */
  function apportion(weights, total) {
    var sum = weights.reduce(function (a, b) { return a + b; }, 0);
    var exact = weights.map(function (w) { return (w / sum) * total; });
    var floors = exact.map(Math.floor);
    var used = floors.reduce(function (a, b) { return a + b; }, 0);
    var remainder = total - used;
    var order = exact
      .map(function (v, i) { return { i: i, frac: v - Math.floor(v) }; })
      .sort(function (a, b) { return b.frac - a.frac; });
    for (var k = 0; k < remainder; k++) floors[order[k % order.length].i]++;
    return floors;
  }

  function levelFor(discipline, hours) {
    var reached = null;
    for (var i = 0; i < LEVELS.length; i++) {
      if (hours >= discipline.hours[LEVELS[i].key]) reached = LEVELS[i];
    }
    return reached;
  }

  function nextLevelAfter(reached) {
    var rank = reached ? reached.rank : 0;
    return LEVELS.find(function (l) { return l.rank === rank + 1; }) || null;
  }

  /* ------------------------------------------------------------- verdict */

  function buildVerdict(discipline, input, totalHours, banked) {
    var effective = totalHours + banked;
    var reached = levelFor(discipline, effective);
    var next = nextLevelAfter(reached);
    var v = {
      totalHours: Math.round(totalHours),
      bankedHours: Math.round(banked),
      effectiveHours: Math.round(effective),
      reached: reached,
      reachedKey: reached ? reached.key : null,
      next: next,
      thresholds: discipline.hours
    };

    if (!reached) {
      var shortfall = discipline.hours.functional - effective;
      v.headline = 'Short of the first level';
      v.statement =
        'You are about ' + Math.round(shortfall) + ' hours short of being functional at ' +
        discipline.name.toLowerCase() + '. That is worth knowing now rather than in week five. ' +
        'The plan below narrows the target so those hours buy you one thing you can actually do, ' +
        'instead of a light coating of everything.';
      v.owns = 'One narrow slice of the skill, properly. Small, but real.';
      v.lacks = 'Everything either side of that slice. You will still need help outside it.';
    } else {
      v.headline = reached.label;
      v.statement =
        Math.round(totalHours) + ' hours' +
        (banked > 0
          ? ', plus roughly ' + Math.round(banked) + ' you already have from experience,'
          : '') +
        ' gets you to ' + reached.label.toLowerCase() + '. That assumes the hours are real practice ' +
        'rather than reading about it, and that you pass the gates instead of walking past them.';
      v.owns = discipline.proofs[reached.key];
      v.lacks = next
        ? discipline.proofs[next.key] + ' That is another ' +
          Math.round(discipline.hours[next.key] - effective) + ' hours or so.'
        : 'Nothing left on this ladder. Past here you improve through the work itself, not a syllabus.';
    }

    /* The three things you can actually change, with the arithmetic done. */
    v.levers = [];
    if (next) {
      var gap = discipline.hours[next.key] - effective;
      var weeksNeeded = Math.ceil(gap / input.hoursPerWeek);
      var hoursNeeded = gap / input.weeks;
      var neededPerWeek = round1(input.hoursPerWeek + hoursNeeded);
      v.levers.push({
        name: 'Give it longer',
        detail: 'Same ' + input.hoursPerWeek + ' hours a week, ' + weeksNeeded + ' more weeks. ' +
          'That is ' + (input.weeks + weeksNeeded) + ' weeks in total to reach ' +
          next.label.toLowerCase() + '.'
      });
      v.levers.push({
        name: 'Go harder',
        detail: 'Same ' + input.weeks + ' weeks at ' + neededPerWeek + ' hours a week.' +
          (neededPerWeek > 35
            ? ' At that point it is a full-time job, so be honest about whether you have that.'
            : neededPerWeek > 20
              ? ' That is a serious second job on top of whatever else you do.'
              : '')
      });
      v.levers.push({
        name: 'Want less',
        detail: 'Keep the hours and cut the scope. Pick one part of the skill and go deep. ' +
          Math.round(totalHours) + ' hours on two pillars gets you further than the same hours ' +
          'spread thin across five.'
      });
    }

    /* The things that usually break a programme, checked against these inputs. */
    v.warnings = [];
    if (input.hoursPerWeek > 30) {
      v.warnings.push(
        'Over 30 hours a week of real practice alongside everything else, most people stop within ' +
        'two months, and the usual cause is sleep. The lighter weeks in this plan are there for a ' +
        'reason. Take them.'
      );
    }
    if (input.hoursPerWeek / input.daysPerWeek > 4) {
      v.warnings.push(
        'Your sessions come out over four hours. The back half of a session that long is rarely ' +
        'worth much. Spread the same hours across more days if you can.'
      );
    }
    if (input.weeks < 4) {
      v.warnings.push(
        'Under four weeks there is no room for a lighter week, and not much room to fix a plan that ' +
        'is not working. Expect this to fade faster than the same hours spent over longer.'
      );
    }
    if (input.daysPerWeek < 3) {
      v.warnings.push(
        'With fewer than three sessions a week you will spend the start of each one remembering ' +
        'where you were. Shorter and more often beats longer and rarer at the same total.'
      );
    }
    return v;
  }

  /* --------------------------------------------------------------- scope */

  /* Which pillars make the cut, and how compressed they are. A shorter
   * program does not get a thinner version of everything — it gets fewer
   * things, trained properly. */
  function buildScope(discipline, input, totalHours) {
    var pillars = discipline.pillars.slice();

    /* Prior experience compresses the early pillars rather than removing them. */
    var compression = { novice: 0, developing: 1, working: 1, advanced: 2 }[input.level] || 0;
    var weighted = pillars.map(function (p, i) {
      var w = p.weight;
      var compressed = i < compression;
      if (compressed) w = w * (i === 0 && compression >= 2 ? 0.3 : 0.45);
      return { pillar: p, weight: w, compressed: compressed };
    });

    /* Capacity: a pillar needs enough hours to be worth opening at all. */
    var minPillarHours = 12;
    var capacity = Math.max(1, Math.floor(totalHours / minPillarHours));
    var dropped = [];

    if (capacity < weighted.length) {
      /* Keep the heaviest pillars — plus always the first, which is usually
       * foundational — and record what was cut so the user sees the trade. */
      var ranked = weighted
        .map(function (w, i) { return { w: w, i: i }; })
        .sort(function (a, b) { return b.w.weight - a.w.weight || a.i - b.i; });
      var keepIdx = ranked.slice(0, Math.max(1, capacity)).map(function (r) { return r.i; });
      if (keepIdx.indexOf(0) === -1) { keepIdx[keepIdx.length - 1] = 0; }
      keepIdx.sort(function (a, b) { return a - b; });
      dropped = weighted.filter(function (_, i) { return keepIdx.indexOf(i) === -1; })
        .map(function (w) { return w.pillar; });
      weighted = keepIdx.map(function (i) { return weighted[i]; });
    }

    var sum = weighted.reduce(function (a, b) { return a + b.weight; }, 0);
    weighted.forEach(function (w) {
      w.share = w.weight / sum;
      w.hours = totalHours * w.share;
    });

    return {
      included: weighted,
      dropped: dropped,
      specialisation: weighted.length < discipline.pillars.length
        ? weighted.map(function (w) { return w.pillar.specialization; }).join(' · ')
        : null
    };
  }

  /* -------------------------------------------------------------- phases */

  function buildPhases(discipline, input, scope, startDate) {
    var weekCounts = apportion(
      scope.included.map(function (w) { return w.share; }),
      input.weeks
    );

    /* Nobody gets zero weeks: steal from the largest allocation. */
    for (var i = 0; i < weekCounts.length; i++) {
      if (weekCounts[i] === 0) {
        var maxIdx = weekCounts.indexOf(Math.max.apply(null, weekCounts));
        if (weekCounts[maxIdx] > 1) { weekCounts[maxIdx]--; weekCounts[i] = 1; }
      }
    }

    var phases = [];
    var weekCursor = 0;
    scope.included.forEach(function (w, idx) {
      var weeks = weekCounts[idx];
      if (weeks < 1) return;
      var progress = phases.length === 0 ? 0 : weekCursor / input.weeks;
      var mix = sessionMixFor(clamp(progress, 0, 1));
      var start = addDays(startDate, weekCursor * 7);
      var end = addDays(startDate, (weekCursor + weeks) * 7 - 1);
      phases.push({
        index: phases.length + 1,
        pillar: w.pillar,
        name: w.pillar.name,
        objective: w.pillar.objective,
        specialization: w.pillar.specialization,
        compressed: w.compressed,
        weeks: weeks,
        weekStart: weekCursor + 1,
        weekEnd: weekCursor + weeks,
        hours: Math.round(w.hours),
        startDate: start,
        endDate: end,
        mix: mix,
        pillarId: w.pillar.id,
        competencies: w.pillar.competencies,
        stages: w.pillar.stages || [],
        standard: w.pillar.standard || '',
        drills: w.pillar.drills,
        milestone: w.pillar.milestone
      });
      weekCursor += weeks;
    });
    return phases;
  }

  /* ------------------------------------------------------------ sessions */

  var SESSION_TYPES = {
    acquire: {
      key: 'acquire',
      label: 'Acquire',
      note: 'Take in new material, then stop. This is the smallest part of the work.'
    },
    drill: {
      key: 'drill',
      label: 'Drill',
      note: 'Repetition on one thing you are bad at.'
    },
    produce: {
      key: 'produce',
      label: 'Produce',
      note: 'Make the actual thing. This is where the skill forms.'
    },
    review: {
      key: 'review',
      label: 'Review & Log',
      note: 'Score the week, write the log, choose what to work on next.'
    }
  };

  function weekTemplate(phase, input) {
    var sessions = input.daysPerWeek;
    var reserveReview = sessions >= 3 ? 1 : 0;

    /* A weekly review is scoring, not practice. Giving it a full-length slot
     * put people in front of a 108-minute "review the week" session, which
     * nobody does. Cap it at half an hour and hand the rest to the sessions
     * that are actually training.
     *
     * Allocation happens in whole minutes so the week sums to exactly the
     * hours asked for, instead of drifting by a tenth per session. */
    var weekMinutes = Math.round(input.hoursPerWeek * 60);
    var reviewMinutes = reserveReview
      ? Math.min(30, Math.floor(weekMinutes / sessions))
      : 0;
    var workCount = Math.max(1, sessions - reserveReview);
    var workSplit = apportion(
      new Array(workCount).fill(1),
      Math.max(workCount, weekMinutes - reviewMinutes)
    );
    var remaining = sessions - reserveReview;
    var counts = apportion(
      [phase.mix.acquire, phase.mix.drill, phase.mix.produce],
      remaining
    );
    var list = [];
    for (var a = 0; a < counts[0]; a++) list.push('acquire');
    for (var d = 0; d < counts[1]; d++) list.push('drill');
    for (var p = 0; p < counts[2]; p++) list.push('produce');

    /* Interleave rather than block: acquire, drill, produce, drill, ... keeps
     * spacing between same-type sessions, which the retention literature
     * consistently favours. */
    var ordered = [];
    var buckets = { acquire: [], drill: [], produce: [] };
    list.forEach(function (t) { buckets[t].push(t); });
    var cycle = ['acquire', 'drill', 'produce', 'drill'];
    var guard = 0;
    while (ordered.length < list.length && guard < 100) {
      cycle.forEach(function (t) {
        if (buckets[t].length && ordered.length < list.length) ordered.push(buckets[t].pop());
      });
      guard++;
    }
    if (reserveReview) ordered.push('review');

    var workIdx = 0;
    return ordered.map(function (type, i) {
      var mins = type === 'review' ? reviewMinutes : workSplit[workIdx++];
      return {
        day: i + 1,
        type: SESSION_TYPES[type],
        minutes: mins,
        hours: Math.round((mins / 60) * 100) / 100
      };
    });
  }

  /* Which stage of the pillar a given week falls in. A three-week phase and a
   * ten-week phase both walk the same stages, at different speeds. */
  function stageFor(phase, weekInPhase) {
    var stages = phase.stages && phase.stages.length ? phase.stages : null;
    if (!stages) return null;
    var idx = Math.min(stages.length - 1, Math.floor((weekInPhase * stages.length) / phase.weeks));
    return { index: idx, total: stages.length, stage: stages[idx] };
  }

  /* The step-by-step work, authored per pillar. Without this an acquire or
   * produce session is only a topic label, which is not something anyone can
   * sit down and do. */
  function pillarSessions(discipline, phase) {
    var table = window.PILLAR_SESSIONS || {};
    return table[discipline.id + '/' + phase.pillarId] || null;
  }

  /* The weekly review is the same procedure every time, so it is written once
   * here rather than repeated in every pillar. */
  function reviewSteps(phase, stage, discipline) {
    var metric = (discipline.metrics && discipline.metrics[0]) || null;
    return [
      'Count it: sessions completed this week out of sessions planned. Write the number, not an impression.',
      metric
        ? 'Update your measure. ' + metric.name + ': ' + metric.method
        : 'Update whatever number you are tracking for this skill.',
      'Closed book, write what you can still do from this phase that you could not at the start.',
      stage && stage.check
        ? 'Check yourself against this stage: ' + stage.check + ' Yes or no, no partial credit.'
        : 'Check yourself against the gate criteria for this phase. Yes or no.',
      'Name next week\'s single weakness in one specific sentence, and pick which drill hits it.',
      'If nothing improved for two weeks running, change one variable: difficulty, feedback source, or drill design. Not all three.'
    ];
  }

  /* What a single session is for. Returns a title, optional supporting line,
   * and the concrete steps. The drill object travels separately so the
   * renderer never prints the same sentence twice. */
  function sessionWork(discipline, phase, session, weekInPhase, stageInfo, objective) {
    var drills = phase.drills || [];
    var comps = phase.competencies || [];
    var crit = (phase.milestone && phase.milestone.criteria) || [];
    var stage = stageInfo && stageInfo.stage;
    var seed = weekInPhase + session.day;
    var authored = pillarSessions(discipline, phase);

    switch (session.type.key) {
      case 'acquire': {
        var study = authored && authored.study && authored.study.length
          ? authored.study[seed % authored.study.length]
          : null;
        if (study) {
          return { title: study.task, detail: null, steps: study.steps, drill: null };
        }
        return {
          title: comps.length ? comps[seed % comps.length] : phase.objective,
          detail: 'Take in only what serves this, then stop and use it.',
          steps: null,
          drill: null
        };
      }

      case 'drill': {
        var drill = drills.length ? drills[seed % drills.length] : null;
        return {
          title: drill ? drill.name : 'Work your weakest component',
          detail: null,
          steps: null,
          drill: drill
        };
      }

      case 'produce': {
        var make = authored && authored.make && authored.make.length
          ? authored.make[weekInPhase % authored.make.length]
          : null;

        /* Every other produce session points at what the user actually said
         * they wanted, using the authored steps as the method. */
        var useObjective = objective && (weekInPhase % 2 === 1);
        if (make) {
          return {
            title: make.task,
            detail: useObjective
              ? 'Do this on your own goal: ' + objective
              : null,
            steps: make.steps,
            check: make.check,
            drill: null
          };
        }
        return {
          title: crit.length ? crit[weekInPhase % crit.length] : 'Make something real with this pillar',
          detail: 'Make the thing itself, not notes about it.',
          steps: null,
          drill: null
        };
      }

      default:
        return {
          title: 'Score the week and pick next week\'s weakness',
          detail: null,
          steps: reviewSteps(phase, stage, discipline),
          drill: null
        };
    }
  }

  /* ------------------------------------------------------------ schedule */

  function buildSchedule(discipline, input, phases, startDate) {
    var weeks = [];
    var consolidationEvery = input.weeks >= 10 ? 8 : 0;
    var objective = input.objective;

    phases.forEach(function (phase) {
      for (var w = 0; w < phase.weeks; w++) {
        var absolute = phase.weekStart + w;
        var weekStart = addDays(startDate, (absolute - 1) * 7);
        var isConsolidation =
          consolidationEvery && absolute % consolidationEvery === 0 && absolute !== input.weeks;
        var stageInfo = stageFor(phase, w);
        var sessions = weekTemplate(phase, input).map(function (s) {
          var work = sessionWork(discipline, phase, s, w, stageInfo, objective);
          var isFirst = absolute === 1 && s.day === 1;
          return {
            day: s.day,
            date: addDays(weekStart, s.day - 1),
            type: s.type,
            minutes: isConsolidation ? Math.round(s.minutes * 0.6) : s.minutes,
            hours: isConsolidation
              ? Math.round((s.minutes * 0.6 / 60) * 100) / 100
              : s.hours,
            title: work.title,
            detail: work.detail,
            steps: work.steps || null,
            check: work.check || null,
            drill: work.drill,
            stage: stageInfo,
            first: isFirst,
            plan: sessionPlan({ minutes: isConsolidation ? Math.round(s.minutes * 0.6) : s.minutes, type: s.type }, isFirst)
          };
        });

        weeks.push({
          number: absolute,
          weekInPhase: w + 1,
          phase: phase,
          stage: stageInfo,
          startDate: weekStart,
          endDate: addDays(weekStart, 6),
          consolidation: isConsolidation,
          hours: round1(sessions.reduce(function (a, s) { return a + s.hours; }, 0)),
          sessions: sessions,
          gate: w === phase.weeks - 1 ? phase.milestone : null,
          theme: isConsolidation
            ? 'Lighter week. Reduced load, recall practice, and an honest look at the last block.'
            : phase.name + (stageInfo ? ' · ' + stageInfo.stage.name : '') +
              ' (week ' + (w + 1) + ' of ' + phase.weeks + ')'
        });
      }
    });
    return weeks;
  }

  /* ------------------------------------------------------------- session */

  /* The shape of a single session, in real minutes off that session's own
   * length. Previously this was computed once for the whole plan, which meant
   * a 30-minute review and a shortened consolidation session both displayed
   * the full-length breakdown. Each session type has its own shape, and the
   * very first session of a plan has no previous session to recall from. */
  var SESSION_SHAPES = {
    first: [
      { name: 'Set up', share: 0.30, note: 'Get the tools from "Before week 1" in place. This is the session where that happens, so it does not eat every later one.' },
      { name: 'Baseline', share: 0.45, note: 'Take the baseline measurement for this skill and write the numbers down with today\'s date. Without it you cannot tell in ten weeks whether any of this worked.' },
      { name: 'Start', share: 0.15, note: 'Begin step 1 below. Getting part of the way in beats finishing nothing.' },
      { name: 'Log', share: 0.10, note: 'Three lines: what you set up, what was awkward, what you will do first next session.' }
    ],
    acquire: [
      { name: 'Recall', share: 0.10, note: 'Notes shut, write what you remember from last session. Then check what you missed.' },
      { name: 'Take it in', share: 0.55, note: 'Work the steps below. When the time is up, stop, whether or not you finished the source.' },
      { name: 'Put it to use', share: 0.25, note: 'Rewrite it in your own words or apply it to something real. Material you take in and never use is gone within days.' },
      { name: 'Log', share: 0.10, note: 'Three lines: what you practised, what was hard, what changes next time.' }
    ],
    drill: [
      { name: 'Warm up', share: 0.10, note: 'One easy rep, then read the "what usually goes wrong" note so you know what to watch for.' },
      { name: 'Reps', share: 0.60, note: 'The drill at the dose given. Stop between reps and note what went wrong in that one.' },
      { name: 'Check the output', share: 0.20, note: 'Watch, read or measure what you produced. A rep you never look back at is exercise, not practice.' },
      { name: 'Log', share: 0.10, note: 'Three lines: what you practised, what was hard, what changes next time.' }
    ],
    produce: [
      { name: 'Recall', share: 0.10, note: 'Notes shut, write the one thing you are trying to fix in this piece of work.' },
      { name: 'Make it', share: 0.60, note: 'The steps below. Make the thing; resist going back to research it.' },
      { name: 'Put it in front of someone', share: 0.20, note: 'Send it, publish it, or show it to a person. Work nobody sees teaches you very little.' },
      { name: 'Log', share: 0.10, note: 'Three lines: what you made, what was hard, what changes next time.' }
    ],
    review: [
      { name: 'Count', share: 0.20, note: 'Sessions done out of sessions planned, and hours logged. Numbers, not impressions.' },
      { name: 'Score the gate', share: 0.35, note: 'Work through this phase\'s gate criteria. Yes or no on each, no partial credit.' },
      { name: 'Name the weakness', share: 0.30, note: 'One specific sentence on what to fix next week, and which drill hits it.' },
      { name: 'Write it up', share: 0.15, note: 'Add the entry to your log so next week has something to read back.' }
    ]
  };

  function sessionPlan(session, isFirstOfPlan) {
    var minutes = Math.max(4, session.minutes || Math.round(session.hours * 60));
    var shape = SESSION_SHAPES[isFirstOfPlan ? 'first' : session.type.key] || SESSION_SHAPES.acquire;
    /* Whole minutes, summing exactly to the session length. */
    var split = apportion(shape.map(function (r) { return r.share; }), minutes);
    return shape.map(function (r, i) {
      return { name: r.name, minutes: split[i], note: r.note };
    });
  }

  /* ---------------------------------------------------------------- build */

  function build(input) {
    var discipline = window.DISCIPLINES.filter(function (d) { return d.id === input.disciplineId; })[0];
    if (!discipline) throw new Error('Unknown discipline: ' + input.disciplineId);

    var weeks = clamp(parseInt(input.weeks, 10) || 12, 1, 156);
    var hoursPerWeek = clamp(parseFloat(input.hoursPerWeek) || 6, 1, 60);
    var daysPerWeek = clamp(parseInt(input.daysPerWeek, 10) || 5, 1, 7);
    var normalized = {
      disciplineId: discipline.id,
      weeks: weeks,
      hoursPerWeek: hoursPerWeek,
      daysPerWeek: daysPerWeek,
      level: input.level || 'novice',
      objective: (input.objective || '').trim(),
      startDate: input.startDate || new Date().toISOString().slice(0, 10)
    };

    var totalHours = weeks * hoursPerWeek;
    var banked = (BANKED[normalized.level] || BANKED.novice)(discipline.hours);
    var startDate = startOfWeek(new Date(normalized.startDate + 'T00:00:00'));

    var verdict = buildVerdict(discipline, normalized, totalHours, banked);
    var scope = buildScope(discipline, normalized, totalHours);
    var phases = buildPhases(discipline, normalized, scope, startDate);
    var schedule = buildSchedule(discipline, normalized, phases, startDate);

    return {
      version: 1,
      createdAt: new Date().toISOString(),
      id: discipline.id + '-' + Date.now().toString(36),
      input: normalized,
      levelLabel: LEVEL_COPY[normalized.level],
      discipline: discipline,
      totalHours: Math.round(totalHours),
      sessionCount: schedule.reduce(function (a, w) { return a + w.sessions.length; }, 0),
      sessionLength: round1(hoursPerWeek / daysPerWeek),
      startDate: startDate,
      endDate: addDays(startDate, weeks * 7 - 1),
      setup: (window.DISCIPLINE_SETUP || {})[discipline.id] || null,
      verdict: verdict,
      scope: scope,
      phases: phases,
      schedule: schedule,
      sessionShapes: SESSION_SHAPES
    };
  }

  /* --------------------------------------------------------------- export */

  function toMarkdown(p) {
    var L = [];
    L.push('# ' + p.discipline.name + ': a ' + p.input.weeks + '-week plan');
    L.push('');
    L.push('- **Budget:** ' + p.input.hoursPerWeek + ' h/week × ' + p.input.weeks + ' weeks = **' +
      p.totalHours + ' hours**');
    L.push('- **Starting point:** ' + p.levelLabel);
    L.push('- **Dates:** ' + fmtDate(p.startDate) + ' → ' + fmtDate(p.endDate));
    L.push('- **Session:** ' + p.sessionLength + ' h × ' + p.input.daysPerWeek + ' days/week');
    if (p.input.objective) L.push('- **Stated objective:** ' + p.input.objective);
    L.push('');
    L.push('## Feasibility');
    L.push('');
    L.push('**' + p.verdict.headline + '**');
    L.push('');
    L.push(p.verdict.statement);
    L.push('');
    L.push('- **What this buys:** ' + p.verdict.owns);
    L.push('- **What it will not:** ' + p.verdict.lacks);
    if (p.verdict.levers.length) {
      L.push('');
      L.push('### To go further');
      p.verdict.levers.forEach(function (l) { L.push('- **' + l.name + '** — ' + l.detail); });
    }
    if (p.verdict.warnings.length) {
      L.push('');
      L.push('### Warnings');
      p.verdict.warnings.forEach(function (w) { L.push('- ' + w); });
    }
    if (p.scope.dropped.length) {
      L.push('');
      L.push('### Cut from scope');
      L.push('These hours do not stretch to the full discipline. Deliberately excluded:');
      p.scope.dropped.forEach(function (d) { L.push('- ' + d.name + ' — ' + d.objective); });
    }
    if (p.setup) {
      L.push('');
      L.push('## Before week 1');
      L.push('');
      L.push('**What you need**');
      p.setup.tools.forEach(function (t) { L.push('- ' + t); });
      L.push('');
      L.push('**Where the feedback comes from.** ' + p.setup.arena);
      L.push('');
      L.push('**Measure your baseline now**');
      p.setup.baseline.forEach(function (b, i) { L.push((i + 1) + '. ' + b); });
      L.push('');
      L.push('_' + p.setup.firstWeek + '_');
    }
    L.push('');
    L.push('## How a session is spent');
    L.push('');
    L.push('Each session below carries its own breakdown in real minutes. The shapes are:');
    L.push('');
    ['acquire', 'drill', 'produce', 'review'].forEach(function (k) {
      L.push('- **' + k + '**: ' +
        p.sessionShapes[k].map(function (r) {
          return r.name + ' ' + Math.round(r.share * 100) + '%';
        }).join(', '));
    });
    L.push('');
    L.push('Your first session replaces the recall step with setting up and taking your baseline.');
    L.push('');
    L.push('## Phases');
    p.phases.forEach(function (ph) {
      L.push('');
      L.push('### Phase ' + ph.index + ': ' + ph.name + (ph.compressed ? ' *(compressed, because of your experience)*' : ''));
      L.push('');
      L.push('*Weeks ' + ph.weekStart + '–' + ph.weekEnd + ' · ' + ph.hours + ' hours · ' +
        fmtShort(ph.startDate) + ' → ' + fmtShort(ph.endDate) + '*');
      L.push('');
      L.push('**Objective:** ' + ph.objective);
      L.push('');
      L.push('**Competencies**');
      ph.competencies.forEach(function (c) { L.push('- ' + c); });
      L.push('');
      L.push('**Drills**');
      ph.drills.forEach(function (d) {
        L.push('- **' + d.name + '** (' + d.dose + ') — ' + d.protocol);
      });
      L.push('');
      L.push('**Gate — ' + ph.milestone.name + '** (do not advance until all pass)');
      ph.milestone.criteria.forEach(function (c) { L.push('- [ ] ' + c); });
    });
    L.push('');
    L.push('## Week by week');
    L.push('');
    p.schedule.forEach(function (w) {
      L.push('**Week ' + w.number + '** (' + fmtShort(w.startDate) + '–' + fmtShort(w.endDate) + ') — ' +
        w.theme + ' · ' + w.hours + ' h');
      w.sessions.forEach(function (s) {
        L.push('  - ' + fmtShort(s.date) + ' · ' + s.type.label + ' (' + s.hours + ' h): ' + s.title);
        if (s.detail) L.push('      ' + s.detail);
        if (s.drill) {
          L.push('      Dose: ' + s.drill.dose);
          L.push('      ' + s.drill.protocol);
          L.push('      Goes wrong: ' + s.drill.mistake);
        }
        if (s.steps) s.steps.forEach(function (st, i) { L.push('      ' + (i + 1) + '. ' + st); });
        if (s.check) L.push('      Done when: ' + s.check);
        if (s.plan) {
          L.push('      Time: ' + s.plan.map(function (r) {
            return r.name + ' ' + r.minutes + 'm';
          }).join(' · '));
        }
      });
      if (w.gate) L.push('  - **GATE: ' + w.gate.name + '**');
      L.push('');
    });
    L.push('## Measurement');
    L.push('');
    p.discipline.metrics.forEach(function (m) { L.push('- **' + m.name + '** — ' + m.method); });
    L.push('');
    L.push('## Known failure modes');
    L.push('');
    p.discipline.failureModes.forEach(function (f) { L.push('- **' + f.name + '** → ' + f.fix); });
    L.push('');
    L.push('## Where the feedback comes from');
    L.push('');
    p.discipline.arena.forEach(function (a) { L.push('- ' + a); });
    L.push('');
    L.push('## Library');
    L.push('');
    p.discipline.library.forEach(function (b) {
      L.push('- *' + b.title + '* — ' + b.author + '. ' + b.note);
    });
    if (p.discipline.disclaimer) {
      L.push('');
      L.push('---');
      L.push('');
      L.push('_' + p.discipline.disclaimer + '_');
    }
    return L.join('\n');
  }

  function icsDate(d) {
    return d.getFullYear() +
      String(d.getMonth() + 1).padStart(2, '0') +
      String(d.getDate()).padStart(2, '0');
  }

  function icsEscape(s) {
    return String(s).replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
  }

  function fold(line) {
    /* RFC 5545 caps lines at 75 octets. */
    var out = [];
    while (line.length > 73) { out.push(line.slice(0, 73)); line = ' ' + line.slice(73); }
    out.push(line);
    return out.join('\r\n');
  }

  function toICS(p) {
    var lines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Skill Trainer//Program//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'X-WR-CALNAME:' + icsEscape(p.discipline.name + ' plan')
    ];
    var stamp = icsDate(new Date()) + 'T000000Z';
    p.schedule.forEach(function (w) {
      w.sessions.forEach(function (s) {
        var uid = p.id + '-w' + w.number + 'd' + s.day + '@skill-trainer';
        var desc = s.title +
          (s.detail ? '\n\n' + s.detail : '') +
          (s.drill
            ? '\n\nDose: ' + s.drill.dose + '\n\n' + s.drill.protocol +
              '\n\nWhat usually goes wrong: ' + s.drill.mistake
            : '') +
          (s.steps
            ? '\n\n' + s.steps.map(function (st, i) { return (i + 1) + '. ' + st; }).join('\n')
            : '') +
          (s.check ? '\n\nDone when: ' + s.check : '') +
          '\n\n' + s.type.note +
          '\n\nPhase: ' + w.phase.name + '. ' + w.phase.objective +
          (w.stage ? '\nStage ' + (w.stage.index + 1) + ' of ' + w.stage.total + ': ' +
            w.stage.stage.name + '. ' + w.stage.stage.work : '');
        lines.push('BEGIN:VEVENT');
        lines.push('UID:' + uid);
        lines.push('DTSTAMP:' + stamp);
        lines.push('DTSTART;VALUE=DATE:' + icsDate(s.date));
        lines.push('DTEND;VALUE=DATE:' + icsDate(addDays(s.date, 1)));
        lines.push(fold('SUMMARY:' + icsEscape(
          p.discipline.name + ' · ' + s.type.label + ' (' + s.hours + ' h)'
        )));
        lines.push(fold('DESCRIPTION:' + icsEscape(desc)));
        lines.push('END:VEVENT');
      });
      if (w.gate) {
        lines.push('BEGIN:VEVENT');
        lines.push('UID:' + p.id + '-gate' + w.number + '@skill-trainer');
        lines.push('DTSTAMP:' + stamp);
        lines.push('DTSTART;VALUE=DATE:' + icsDate(w.endDate));
        lines.push('DTEND;VALUE=DATE:' + icsDate(addDays(w.endDate, 1)));
        lines.push(fold('SUMMARY:' + icsEscape('GATE · ' + w.gate.name)));
        lines.push(fold('DESCRIPTION:' + icsEscape(
          'Do not advance until every criterion passes:\n\n- ' + w.gate.criteria.join('\n- ')
        )));
        lines.push('END:VEVENT');
      }
    });
    lines.push('END:VCALENDAR');
    return lines.join('\r\n');
  }

  window.Planner = {
    build: build,
    sessionPlan: sessionPlan,
    toMarkdown: toMarkdown,
    toICS: toICS,
    levels: LEVELS,
    levelCopy: LEVEL_COPY,
    fmtDate: fmtDate,
    fmtShort: fmtShort,
    addDays: addDays
  };
})();
