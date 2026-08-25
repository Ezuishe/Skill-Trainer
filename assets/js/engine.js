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
      v.headline = 'Below the functional threshold';
      v.statement =
        'This budget is ' + Math.round(shortfall) + ' hours short of functional competence in ' +
        discipline.name.toLowerCase() + '. That is not a reason to stop — it is a reason to narrow ' +
        'the target. The program below trains the highest-leverage fraction of the discipline rather ' +
        'than pretending to cover all of it.';
      v.owns = 'Real, usable capability in one narrow slice of the skill.';
      v.lacks = 'Breadth. You will be able to do a specific thing well and will still need help outside it.';
    } else {
      v.headline = reached.label + ' — reachable';
      v.statement =
        Math.round(totalHours) + ' hours of deliberate practice' +
        (banked > 0 ? ', on top of roughly ' + Math.round(banked) + ' hours you already hold,' : '') +
        ' lands at ' + reached.label.toLowerCase() + ' in ' + discipline.name.toLowerCase() +
        ' — provided the hours are deliberate and the milestone gates are actually passed.';
      v.owns = discipline.proofs[reached.key];
      v.lacks = next
        ? discipline.proofs[next.key] + ' — that needs roughly ' +
          Math.round(discipline.hours[next.key] - effective) + ' further hours.'
        : 'Nothing on this ladder. Beyond here, progress comes from the arena, not from a syllabus.';
    }

    /* The three real levers, quantified. */
    v.levers = [];
    if (next) {
      var gap = discipline.hours[next.key] - effective;
      var weeksNeeded = Math.ceil(gap / input.hoursPerWeek);
      var hoursNeeded = gap / input.weeks;
      v.levers.push({
        name: 'Extend the horizon',
        detail: 'Keep ' + input.hoursPerWeek + ' h/week and add ' + weeksNeeded +
          ' weeks (' + (input.weeks + weeksNeeded) + ' total) to reach ' + next.label + '.'
      });
      v.levers.push({
        name: 'Raise the intensity',
        detail: 'Keep ' + input.weeks + ' weeks and train ' + round1(input.hoursPerWeek + hoursNeeded) +
          ' h/week to reach ' + next.label + '.' +
          (input.hoursPerWeek + hoursNeeded > 35
            ? ' At that rate this is a full-time occupation, not a side project.'
            : '')
      });
      v.levers.push({
        name: 'Narrow the scope',
        detail: 'Spend the same hours on fewer pillars. Concentrated on one specialisation, ' +
          Math.round(totalHours) + ' hours goes considerably further than spread across the full discipline.'
      });
    }

    /* Sustainability check — the failure mode that kills most programs. */
    v.warnings = [];
    if (input.hoursPerWeek > 30) {
      v.warnings.push(
        'Above 30 hours per week of deliberate practice alongside other obligations, the ' +
        'failure rate is high and the usual cause is sleep debt. The program schedules ' +
        'consolidation weeks; take them.'
      );
    }
    if (input.hoursPerWeek / input.daysPerWeek > 4) {
      v.warnings.push(
        'Sessions over four hours produce diminishing returns. Consider spreading these hours ' +
        'across more days rather than longer blocks.'
      );
    }
    if (input.weeks < 4) {
      v.warnings.push(
        'Programs under four weeks cannot include a consolidation cycle. Expect the gains to ' +
        'decay faster than a longer program at the same total hours.'
      );
    }
    if (input.daysPerWeek < 3) {
      v.warnings.push(
        'Below three sessions per week, retention between sessions becomes the binding constraint. ' +
        'More frequent, shorter sessions beat fewer long ones at equal total hours.'
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
        competencies: w.pillar.competencies,
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
      note: 'New material, capped. Input is the smallest part of the work.'
    },
    drill: {
      key: 'drill',
      label: 'Drill',
      note: 'Isolated repetition against one named weakness.'
    },
    produce: {
      key: 'produce',
      label: 'Produce',
      note: 'Make the real artefact. This is where the skill actually forms.'
    },
    review: {
      key: 'review',
      label: 'Review & Log',
      note: 'Score the week, update the log, choose next week’s weakness.'
    }
  };

  function weekTemplate(phase, input) {
    var sessions = input.daysPerWeek;
    var sessionHours = input.hoursPerWeek / sessions;
    var reserveReview = sessions >= 3 ? 1 : 0;
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

    return ordered.map(function (type, i) {
      return {
        day: i + 1,
        type: SESSION_TYPES[type],
        hours: round1(sessionHours)
      };
    });
  }

  /* Session-level focus: cycle drills and competencies so no two consecutive
   * weeks repeat the same prescription. */
  function focusFor(phase, session, weekInPhase) {
    var drills = phase.drills || [];
    var comps = phase.competencies || [];
    var crit = (phase.milestone && phase.milestone.criteria) || [];
    switch (session.type.key) {
      case 'acquire':
        return comps.length ? comps[(weekInPhase + session.day) % comps.length] : phase.objective;
      case 'drill':
        var drill = drills.length ? drills[(weekInPhase + session.day) % drills.length] : null;
        return drill ? drill.name + ' — ' + drill.dose : 'Isolated repetition on your weakest component';
      case 'produce':
        return crit.length
          ? 'Work directly toward: ' + crit[(weekInPhase) % crit.length]
          : 'Produce a real artefact using this pillar';
      default:
        return 'Score the week against your metrics; name next week’s single weakness';
    }
  }

  function drillDetail(phase, session, weekInPhase) {
    if (session.type.key !== 'drill') return null;
    var drills = phase.drills || [];
    if (!drills.length) return null;
    return drills[(weekInPhase + session.day) % drills.length];
  }

  /* ------------------------------------------------------------ schedule */

  function buildSchedule(discipline, input, phases, startDate) {
    var weeks = [];
    var consolidationEvery = input.weeks >= 10 ? 8 : 0;

    phases.forEach(function (phase) {
      for (var w = 0; w < phase.weeks; w++) {
        var absolute = phase.weekStart + w;
        var weekStart = addDays(startDate, (absolute - 1) * 7);
        var isConsolidation =
          consolidationEvery && absolute % consolidationEvery === 0 && absolute !== input.weeks;
        var sessions = weekTemplate(phase, input).map(function (s) {
          return {
            day: s.day,
            date: addDays(weekStart, s.day - 1),
            type: s.type,
            hours: isConsolidation ? round1(s.hours * 0.6) : s.hours,
            focus: focusFor(phase, s, w),
            drill: drillDetail(phase, s, w)
          };
        });

        weeks.push({
          number: absolute,
          weekInPhase: w + 1,
          phase: phase,
          startDate: weekStart,
          endDate: addDays(weekStart, 6),
          consolidation: isConsolidation,
          hours: round1(sessions.reduce(function (a, s) { return a + s.hours; }, 0)),
          sessions: sessions,
          gate: w === phase.weeks - 1 ? phase.milestone : null,
          theme: isConsolidation
            ? 'Consolidation week — reduced load, retrieval practice, and an honest audit of the last block'
            : phase.name + ' · week ' + (w + 1) + ' of ' + phase.weeks
        });
      }
    });
    return weeks;
  }

  /* ------------------------------------------------------------- session */

  function dailyBlock(input) {
    var minutes = Math.round((input.hoursPerWeek / input.daysPerWeek) * 60);
    var parts = [
      { name: 'Retrieval warm-up', share: 0.1, note: 'Closed-book recall of the last session. No notes open.' },
      { name: 'Edge work', share: 0.5, note: 'The drill or task at the limit of your current ability. Aim for a 50–85% success rate.' },
      { name: 'Application', share: 0.3, note: 'Use it on something real, with consequences, today.' },
      { name: 'Log', share: 0.1, note: 'Three lines: what you practised, what was hard, what changes next session.' }
    ];
    return parts.map(function (p) {
      return { name: p.name, minutes: Math.max(3, Math.round(minutes * p.share)), note: p.note };
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
      verdict: verdict,
      scope: scope,
      phases: phases,
      schedule: schedule,
      dailyBlock: dailyBlock(normalized)
    };
  }

  /* --------------------------------------------------------------- export */

  function toMarkdown(p) {
    var L = [];
    L.push('# ' + p.discipline.name + ' — ' + p.input.weeks + '-week program');
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
    L.push('');
    L.push('## The daily block (' + Math.round(p.sessionLength * 60) + ' minutes)');
    L.push('');
    p.dailyBlock.forEach(function (b) {
      L.push('- **' + b.name + '** (' + b.minutes + ' min) — ' + b.note);
    });
    L.push('');
    L.push('## Phases');
    p.phases.forEach(function (ph) {
      L.push('');
      L.push('### Phase ' + ph.index + ': ' + ph.name + (ph.compressed ? ' *(compressed — prior experience)*' : ''));
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
        L.push('  - ' + fmtShort(s.date) + ' · ' + s.type.label + ' (' + s.hours + ' h): ' + s.focus);
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
    L.push('## Arena — where the feedback comes from');
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
      'X-WR-CALNAME:' + icsEscape(p.discipline.name + ' program')
    ];
    var stamp = icsDate(new Date()) + 'T000000Z';
    p.schedule.forEach(function (w) {
      w.sessions.forEach(function (s) {
        var uid = p.id + '-w' + w.number + 'd' + s.day + '@skill-trainer';
        var desc = s.type.note + '\n\nFocus: ' + s.focus +
          (s.drill ? '\n\nProtocol: ' + s.drill.protocol : '') +
          '\n\nPhase: ' + w.phase.name + ' — ' + w.phase.objective;
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
    toMarkdown: toMarkdown,
    toICS: toICS,
    levels: LEVELS,
    levelCopy: LEVEL_COPY,
    fmtDate: fmtDate,
    fmtShort: fmtShort,
    addDays: addDays
  };
})();
