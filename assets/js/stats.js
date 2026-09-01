/*
 * stats.js — what to show someone when they come back.
 *
 * Pure functions over (program, progress, now). No DOM, so it is testable.
 *
 * The design constraint: this has to give a real reason to return without
 * becoming a slot machine. Every number here is earned by doing the work, and
 * counts sessions actually logged rather than visits. The headline is hours
 * banked against the discipline's own threshold for the next level, because
 * that is the number the whole site is built on.
 */

(function () {
  'use strict';

  var DAY = 86400000;

  function dayKey(d) {
    return d.getFullYear() + '-' +
      String(d.getMonth() + 1).padStart(2, '0') + '-' +
      String(d.getDate()).padStart(2, '0');
  }

  function parseKey(s) {
    var p = String(s).split('-');
    return new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]));
  }

  /* Monday-anchored week id, so a week streak does not reset on Sunday. */
  function weekId(d) {
    var t = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    t.setDate(t.getDate() - ((t.getDay() + 6) % 7));
    return dayKey(t);
  }

  function weekIdMinus(d, weeksBack) {
    var t = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    t.setDate(t.getDate() - weeksBack * 7);
    return weekId(t);
  }

  /* ------------------------------------------------------------- the ladder */

  /* Hours banked against the next level. This is the honest progress bar:
   * prior experience the plan already credited, plus hours you have actually
   * logged, measured against the threshold the site published up front. */
  function ladder(program, progress) {
    var levels = window.Planner.levels;
    var thresholds = program.discipline.hours;
    var banked = program.verdict.bankedHours || 0;
    var logged = progress.hours || 0;
    var effective = banked + logged;

    var current = null;
    var next = levels[0];
    for (var i = 0; i < levels.length; i++) {
      if (effective >= thresholds[levels[i].key]) {
        current = levels[i];
        next = levels[i + 1] || null;
      }
    }

    var floor = current ? thresholds[current.key] : 0;
    var ceiling = next ? thresholds[next.key] : floor;
    var span = ceiling - floor;
    var pct = next ? Math.max(0, Math.min(100, ((effective - floor) / span) * 100)) : 100;

    /* Split the bar: hours credited for prior experience are real but they are
     * not work you did in this plan, so they are shown in a muted tone behind
     * the hours you actually logged. Otherwise someone starting as
     * 'competent' opens the page at 60% having done nothing yet. */
    var creditedPct = next ? Math.max(0, Math.min(100, ((Math.min(banked, ceiling) - floor) / span) * 100)) : 100;

    return {
      banked: Math.round(banked),
      creditedPct: Math.round(Math.max(0, creditedPct)),
      logged: Math.round(logged * 10) / 10,
      effective: Math.round(effective),
      current: current,
      next: next,
      target: ceiling,
      remaining: next ? Math.max(0, Math.round(ceiling - effective)) : 0,
      pct: Math.round(pct),
      /* Sessions left at this plan's session length, which is more legible
       * than a raw hour count. */
      sessionsToNext: next
        ? Math.ceil(Math.max(0, ceiling - effective) / Math.max(0.1, program.sessionLength))
        : 0
    };
  }

  /* -------------------------------------------------------------- this week */

  function thisWeek(program, progress, now) {
    var id = weekId(now);
    var week = null;
    for (var i = 0; i < program.schedule.length; i++) {
      if (weekId(program.schedule[i].startDate) === id) { week = program.schedule[i]; break; }
    }
    if (!week) return { inPlan: false, done: 0, total: 0, pct: 0, week: null };

    var done = 0;
    week.sessions.forEach(function (s) {
      if (progress.sessions['w' + week.number + 'd' + s.day]) done++;
    });
    return {
      inPlan: true,
      week: week,
      done: done,
      total: week.sessions.length,
      pct: week.sessions.length ? Math.round((done / week.sessions.length) * 100) : 0
    };
  }

  /* ---------------------------------------------------------------- streaks */

  /* Weeks, not days. Plans schedule four or five sessions a week, so a day
   * streak would break by design and punish someone following the plan
   * correctly. A week counts if you logged at least one session in it. */
  function streak(progress, now) {
    var weeks = {};
    var days = {};
    Object.keys(progress.sessions || {}).forEach(function (k) {
      var d = parseKey(progress.sessions[k]);
      weeks[weekId(d)] = true;
      days[dayKey(d)] = true;
    });

    var count = 0;
    /* The current week does not break a streak until it is over, so start
     * from last week if this week is still empty. */
    var start = weeks[weekId(now)] ? 0 : 1;
    for (var back = start; ; back++) {
      if (weeks[weekIdMinus(now, back)]) count++;
      else break;
      if (back > 260) break;
    }
    if (weeks[weekId(now)] && start === 1) count++;

    var lastDate = null;
    Object.keys(days).forEach(function (k) {
      var d = parseKey(k);
      if (!lastDate || d > lastDate) lastDate = d;
    });

    var daysSince = lastDate
      ? Math.floor((new Date(now.getFullYear(), now.getMonth(), now.getDate()) - lastDate) / DAY)
      : null;

    return {
      weeks: count,
      activeWeeks: Object.keys(weeks).length,
      activeDays: Object.keys(days).length,
      lastDate: lastDate,
      daysSince: daysSince
    };
  }

  /* -------------------------------------------------------------- momentum */

  /* What to say when they come back. Never a scold: the discipline's own
   * content says one miss is noise and two is a pattern, so the copy follows
   * that rather than guilting someone for a quiet week. */
  function momentum(program, progress, now, s, w) {
    if (!s.lastDate) {
      return {
        state: 'new',
        line: 'Nothing logged yet. The first session is the one that matters; it is short and it is today.'
      };
    }
    if (s.daysSince === 0) {
      return { state: 'today', line: 'Logged today. That is the whole job.' };
    }
    if (s.daysSince <= 2) {
      return {
        state: 'on',
        line: 'Last session ' + (s.daysSince === 1 ? 'yesterday' : s.daysSince + ' days ago') +
          '. You are in rhythm.'
      };
    }
    if (s.daysSince <= 9) {
      return {
        state: 'slipping',
        line: s.daysSince + ' days since your last session. One miss is noise. Do the short version today ' +
          'rather than the perfect one.'
      };
    }
    return {
      state: 'lapsed',
      line: 'It has been ' + s.daysSince + ' days. Restarting costs one session, not the whole plan. ' +
        'Pick up at the current week and carry on.'
    };
  }

  /* -------------------------------------------------------- earned markers */

  /* Milestones you actually reached, stated as facts rather than celebrated.
   * These accumulate, so returning after a few weeks shows a record that got
   * longer while you were away doing the work. */
  function markers(program, progress, l, w, s, totals) {
    var out = [];

    if (totals.done > 0) {
      out.push({ label: 'First session logged', done: true });
    }
    [10, 25, 50, 100, 250].forEach(function (h) {
      if (l.logged >= h) out.push({ label: h + ' hours of practice', done: true });
    });
    if (l.current) {
      out.push({ label: 'Reached ' + l.current.label.toLowerCase(), done: true });
    }
    if (totals.gatesDone > 0) {
      out.push({ label: totals.gatesDone + ' gate ' + (totals.gatesDone === 1 ? 'criterion' : 'criteria') + ' passed', done: true });
    }
    if (s.weeks >= 4) out.push({ label: s.weeks + ' weeks without dropping it', done: true });

    /* The next one, so there is something specific just ahead. */
    var upcoming = null;
    var nextHours = [10, 25, 50, 100, 250].filter(function (h) { return l.logged < h; })[0];
    if (nextHours) {
      upcoming = {
        label: nextHours + ' hours of practice',
        remaining: Math.max(0, Math.round((nextHours - l.logged) * 10) / 10)
      };
    }
    return { earned: out.slice(-6), next: upcoming };
  }

  /* ------------------------------------------------------------ calibration */

  /* What your own scores say about whether the practice is pitched right.
   *
   * The method page commits to a 50-85% success band: above it you are
   * performing, below it you are flailing. Nobody computes their success rate
   * mid-drill, so difficulty is collected as a three-way judgement after the
   * session and turned into that advice here.
   */
  function calibration(program, progress) {
    var records = progress.records || {};

    /* In schedule order, so "recent" means recent in the plan. */
    var ordered = [];
    program.schedule.forEach(function (w) {
      w.sessions.forEach(function (sn) {
        var key = 'w' + w.number + 'd' + sn.day;
        var rec = records[key];
        if (rec && (rec.score || rec.difficulty)) {
          ordered.push({ key: key, week: w.number, type: sn.type.key, rec: rec });
        }
      });
    });

    var scored = ordered.filter(function (r) { return typeof r.rec.score === 'number'; });
    var recent = scored.slice(-5);
    var previous = scored.slice(-10, -5);

    function mean(list) {
      if (!list.length) return null;
      return Math.round((list.reduce(function (a, r) { return a + r.rec.score; }, 0) / list.length) * 10) / 10;
    }

    var recentMean = mean(recent);
    var previousMean = mean(previous);
    var trend = null;
    if (recentMean !== null && previousMean !== null) {
      var delta = Math.round((recentMean - previousMean) * 10) / 10;
      trend = { delta: delta, direction: delta > 0.3 ? 'up' : (delta < -0.3 ? 'down' : 'flat') };
    }

    /* Difficulty over the last six judged sessions. */
    var judged = ordered.filter(function (r) { return r.rec.difficulty; }).slice(-6);
    var counts = { easy: 0, right: 0, hard: 0 };
    judged.forEach(function (r) { counts[r.rec.difficulty] = (counts[r.rec.difficulty] || 0) + 1; });

    var verdict = null;
    if (judged.length >= 3) {
      if (counts.easy >= Math.ceil(judged.length * 0.6)) {
        verdict = {
          state: 'too-easy',
          line: 'You have marked ' + counts.easy + ' of your last ' + judged.length +
            ' sessions too easy. That is practice below your level, and it will not move anything. ' +
            'Raise the difficulty: more volume, a shorter time limit, or a harder audience.'
        };
      } else if (counts.hard >= Math.ceil(judged.length * 0.6)) {
        verdict = {
          state: 'too-hard',
          line: 'You have marked ' + counts.hard + ' of your last ' + judged.length +
            ' sessions too hard. Failing almost everything teaches very little. ' +
            'Cut the drill in half and rebuild from the part you can do.'
        };
      } else {
        verdict = {
          state: 'in-band',
          line: 'Difficulty is sitting about right across your last ' + judged.length +
            ' sessions. Leave it alone while it keeps producing progress.'
        };
      }
    }

    /* A plateau is a flat or falling score over enough sessions to be real. */
    var plateau = null;
    if (scored.length >= 8 && trend && trend.direction !== 'up') {
      plateau = {
        line: 'Your scores have not improved across the last ' + Math.min(10, scored.length) +
          ' sessions. Change one variable, not three: the difficulty, where the feedback comes ' +
          'from, or the drill itself. Give it a fortnight before judging.'
      };
    }

    return {
      count: scored.length,
      judged: judged.length,
      recentMean: recentMean,
      previousMean: previousMean,
      trend: trend,
      difficulty: counts,
      verdict: verdict,
      plateau: plateau,
      evidenceNoted: ordered.filter(function (r) { return r.rec.evidence; }).length
    };
  }

  /* ------------------------------------------------------------- transcript */

  /* A university-style record. Each phase is a module worth credits equal to
   * its scheduled practice hours. You accumulate credits by logging sessions
   * in that module, and the module is only *awarded* once every gate criterion
   * passes. That keeps the two honest and separate: hours are attendance,
   * the award is evidence you can do the thing.
   */
  function moduleCode(discipline, index) {
    var letters = discipline.name
      .replace(/[^A-Za-z ]/g, '')
      .split(' ')
      .filter(Boolean)
      .map(function (w) { return w[0]; })
      .join('')
      .toUpperCase();
    if (letters.length < 3) letters = discipline.name.replace(/[^A-Za-z]/g, '').slice(0, 3).toUpperCase();
    return letters.slice(0, 3) + '-' + String(index).padStart(2, '0');
  }

  /* --------------------------------------------------------------- gates */

  /* A gate is an assessment, and passing one used to cost a click. It now
   * costs three things, in this order:
   *
   *   1. The phase before it has to have passed in full. Ordering was already
   *      here and it stays.
   *   2. You have to have done most of the phase's scheduled work. Claiming
   *      the outcome of a phase you did not run is not a claim about anything.
   *   3. Every single criterion needs a written statement of what you did and
   *      a named check — a person, a recording, a published result. The tick
   *      is then a record of that evidence rather than a substitute for it.
   *
   * None of this can stop someone lying to themselves. It can stop the gate
   * being passed by accident, which is what a one-click gate mostly was.
   */
  var WORK_REQUIRED = 0.8;
  var STATEMENT_MIN = 40;
  var VERIFIER_MIN = 2;

  function gateKey(phase, i) { return 'p' + phase.index + 'c' + i; }

  /* Sessions logged in this phase, which is the work the gate is about. */
  function phaseWork(program, progress, phase) {
    var total = 0, done = 0;
    program.schedule.forEach(function (w) {
      if (w.phase.index !== phase.index) return;
      w.sessions.forEach(function (sn) {
        total++;
        if (progress.sessions['w' + w.number + 'd' + sn.day]) done++;
      });
    });
    var required = Math.max(1, Math.ceil(total * WORK_REQUIRED));
    return {
      sessions: total,
      done: done,
      required: required,
      remaining: Math.max(0, required - done),
      pct: total ? Math.round((done / total) * 100) : 0,
      met: done >= required
    };
  }

  /* Is the written evidence for one criterion complete enough to claim on? */
  function criterionEvidence(progress, phase, i) {
    var ev = (progress.gateEvidence || {})[gateKey(phase, i)] || {};
    var statement = String(ev.statement || '').trim();
    var verifier = String(ev.verifier || '').trim();
    return {
      statement: statement,
      verifier: verifier,
      statementShort: Math.max(0, STATEMENT_MIN - statement.length),
      hasStatement: statement.length >= STATEMENT_MIN,
      hasVerifier: verifier.length >= VERIFIER_MIN,
      complete: statement.length >= STATEMENT_MIN && verifier.length >= VERIFIER_MIN,
      at: ev.updated || null
    };
  }

  /* Gates open in order. You cannot claim the gate for phase three while
   * phase two is unpassed, because the plan's whole claim is that each phase
   * is built on the last. Returns one entry per phase, in phase order. */
  function gateLocks(program, progress) {
    var previousOpen = true;
    return program.phases.map(function (ph, i) {
      var criteria = ph.milestone.criteria.length;
      var passed = 0, evidenced = 0;
      ph.milestone.criteria.forEach(function (_, c) {
        if (progress.gates[gateKey(ph, c)]) passed++;
        if (criterionEvidence(progress, ph, c).complete) evidenced++;
      });
      var work = phaseWork(program, progress, ph);
      var locked = !previousOpen;
      var complete = criteria > 0 && passed === criteria;
      var entry = {
        index: ph.index,
        criteria: criteria,
        passed: passed,
        evidenced: evidenced,
        work: work,
        complete: complete,
        locked: locked,
        /* Ordering says the gate is yours to sit; the work requirement says
         * whether you are allowed to sit it yet. Kept apart so the page can
         * say which of the two is holding it. */
        workReady: work.met,
        claimable: !locked && work.met,
        /* Once awarded it stays read-only until deliberately reopened. */
        sealed: complete && !(progress.reopened || {})['p' + ph.index],
        blockedBy: previousOpen ? null : program.phases[i - 1],
        state: locked ? 'locked' : (complete ? 'passed' : (work.met ? 'open' : 'pending'))
      };
      previousOpen = previousOpen && entry.complete;
      return entry;
    });
  }

  /* -------------------------------------------------------------- pace */

  /* Ahead, on schedule, or behind — the question everyone actually has when
   * they reopen a dated plan.
   *
   * Measured in sessions rather than hours, because a session is the unit the
   * schedule is written in and the unit you fall behind by. "Expected" counts
   * every session dated on or before today; anything else would let a plan
   * that has not started yet report you behind.
   */
  function pace(program, progress, now) {
    now = now || new Date();
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    var total = 0, done = 0, expected = 0, doneOnTime = 0;
    var nextDue = null, lastExpectedDate = null;
    program.schedule.forEach(function (w) {
      w.sessions.forEach(function (sn) {
        total++;
        var due = new Date(sn.date.getFullYear(), sn.date.getMonth(), sn.date.getDate());
        var isDone = !!progress.sessions['w' + w.number + 'd' + sn.day];
        if (isDone) done++;
        if (due <= today) {
          expected++;
          lastExpectedDate = due;
          if (isDone) doneOnTime++;
        } else if (!nextDue) {
          nextDue = due;
        }
      });
    });

    var delta = done - expected;
    var started = expected > 0;
    var finished = done >= total && total > 0;

    /* Days of drift, so the number means something in a calendar rather than
     * only inside the plan. */
    var perWeek = Math.max(1, Math.round(total / Math.max(1, program.schedule.length)));
    var daysPerSession = 7 / perWeek;
    var driftDays = Math.round(Math.abs(delta) * daysPerSession);

    var state, line;
    if (!total) {
      state = 'empty';
      line = 'Nothing is scheduled.';
    } else if (finished) {
      state = 'finished';
      line = 'Every scheduled session is logged. The plan is done; the gates are what is left.';
    } else if (!started) {
      state = 'not-started';
      line = 'The plan has not started yet. First session is ' +
        (nextDue ? window.Planner.fmtDate(nextDue) : 'scheduled shortly') + '.';
    } else if (delta >= 1) {
      state = 'ahead';
      line = 'Ahead of schedule by ' + delta + ' session' + (delta === 1 ? '' : 's') +
        (driftDays >= 1 ? ' — about ' + driftDays + ' day' + (driftDays === 1 ? '' : 's') + ' of work in hand' : '') +
        '. Working ahead is fine; skipping the rest days it buys you is not.';
    } else if (delta <= -1) {
      var behind = Math.abs(delta);
      state = 'behind';
      line = 'Behind by ' + behind + ' session' + (behind === 1 ? '' : 's') +
        (driftDays >= 1 ? ' — roughly ' + driftDays + ' day' + (driftDays === 1 ? '' : 's') : '') +
        '. ' + (behind <= 2
          ? 'That is one catch-up session, not a crisis. Do the next one short rather than skipping it.'
          : 'Do not try to run them all back to back. Add one extra session a week until the gap closes, ' +
            'or rebuild the plan on the hours you actually have.');
    } else {
      state = 'on';
      line = 'On schedule. ' + done + ' of the ' + expected + ' sessions due by today are logged.';
    }

    /* Where the plan expects you to be, and where you are, on the same track. */
    var expectedPct = total ? Math.round((expected / total) * 100) : 0;
    var donePct = total ? Math.round((done / total) * 100) : 0;

    /* If the last few weeks are the guide, when does this actually finish? */
    var elapsedWeeks = Math.max(1, Math.ceil(expected / perWeek));
    var rate = done / elapsedWeeks;                 /* sessions a week, actual */
    var projected = null;
    if (started && !finished && rate > 0.1) {
      var weeksLeft = Math.ceil((total - done) / rate);
      projected = window.Planner.addDays(today, weeksLeft * 7);
    }

    return {
      total: total,
      done: done,
      expected: expected,
      doneOnTime: doneOnTime,
      delta: delta,
      behind: Math.max(0, -delta),
      ahead: Math.max(0, delta),
      driftDays: driftDays,
      state: state,
      line: line,
      expectedPct: expectedPct,
      donePct: donePct,
      adherence: expected ? Math.round((Math.min(done, expected) / expected) * 100) : null,
      perWeek: perWeek,
      projectedEnd: projected,
      plannedEnd: program.endDate,
      nextDue: nextDue,
      lastExpectedDate: lastExpectedDate
    };
  }

  /* Week-by-week planned against logged, for the small chart under the
   * headline. Twelve weeks is as much as reads at a glance. */
  function paceWeeks(program, progress, now) {
    now = now || new Date();
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return program.schedule.map(function (w) {
      var done = 0, due = 0;
      w.sessions.forEach(function (sn) {
        var d = new Date(sn.date.getFullYear(), sn.date.getMonth(), sn.date.getDate());
        if (d <= today) due++;
        if (progress.sessions['w' + w.number + 'd' + sn.day]) done++;
      });
      var past = w.endDate < today;
      return {
        number: w.number,
        planned: w.sessions.length,
        due: due,
        done: done,
        current: today >= w.startDate && today <= window.Planner.addDays(w.endDate, 1),
        past: past,
        state: !due ? 'future' : (done >= due ? 'met' : (done === 0 && past ? 'missed' : 'short'))
      };
    });
  }

  function transcript(program, progress) {
    var locks = gateLocks(program, progress);
    var modules = program.phases.map(function (ph, phIdx) {
      var creditsTotal = Math.max(1, Math.round(ph.hours));

      var sessions = 0, done = 0, minutesDone = 0;
      program.schedule.forEach(function (w) {
        if (w.phase.index !== ph.index) return;
        w.sessions.forEach(function (sn) {
          sessions++;
          if (progress.sessions['w' + w.number + 'd' + sn.day]) {
            done++;
            minutesDone += (sn.minutes || Math.round(sn.hours * 60));
          }
        });
      });

      var criteria = ph.milestone.criteria.length;
      var passed = 0;
      ph.milestone.criteria.forEach(function (_, i) {
        if (progress.gates['p' + ph.index + 'c' + i]) passed++;
      });
      var awarded = criteria > 0 && passed === criteria;

      /* Credits accrue with logged work while the module is open, and the
       * full value lands when the gate passes. Hours alone never complete a
       * module, and passing the gate is what actually completes it. */
      var earned = awarded
        ? creditsTotal
        : Math.min(creditsTotal - 1, Math.round(minutesDone / 60));

      return {
        code: moduleCode(program.discipline, ph.index),
        index: ph.index,
        title: ph.name,
        objective: ph.objective,
        credits: creditsTotal,
        earned: earned,
        sessions: sessions,
        sessionsDone: done,
        criteria: criteria,
        criteriaPassed: passed,
        awarded: awarded,
        locked: locks[phIdx].locked,
        claimable: locks[phIdx].claimable,
        workPct: locks[phIdx].work.pct,
        status: awarded
          ? 'Awarded'
          : locks[phIdx].locked
            ? 'Locked'
            : locks[phIdx].claimable
              ? 'Assessable'
              : (done > 0 ? 'In progress' : 'Not started'),
        weeks: ph.weekStart + '\u2013' + ph.weekEnd
      };
    });

    var creditsTotal = modules.reduce(function (a, m) { return a + m.credits; }, 0);
    var creditsEarned = modules.reduce(function (a, m) { return a + m.earned; }, 0);
    var awarded = modules.filter(function (m) { return m.awarded; }).length;

    return {
      modules: modules,
      creditsTotal: creditsTotal,
      creditsEarned: creditsEarned,
      creditsPct: creditsTotal ? Math.round((creditsEarned / creditsTotal) * 100) : 0,
      modulesAwarded: awarded,
      modulesTotal: modules.length,
      /* The module you are in now, so the transcript can point somewhere. */
      current: modules.filter(function (m) { return !m.awarded; })[0] || null
    };
  }

  /* ------------------------------------------------------------------ build */

  function build(program, progress, now) {
    now = now || new Date();

    var sessions = 0, done = 0;
    program.schedule.forEach(function (wk) {
      wk.sessions.forEach(function (sn) {
        sessions++;
        if (progress.sessions['w' + wk.number + 'd' + sn.day]) done++;
      });
    });
    var gateCriteria = 0, gatesDone = 0;
    program.phases.forEach(function (ph) {
      ph.milestone.criteria.forEach(function (_, i) {
        gateCriteria++;
        if (progress.gates['p' + ph.index + 'c' + i]) gatesDone++;
      });
    });
    var totals = {
      sessions: sessions,
      done: done,
      pct: sessions ? Math.round((done / sessions) * 100) : 0,
      gateCriteria: gateCriteria,
      gatesDone: gatesDone,
      gatesTotal: program.phases.length
    };

    var l = ladder(program, progress);
    var w = thisWeek(program, progress, now);
    var s = streak(progress, now);

    return {
      totals: totals,
      ladder: l,
      week: w,
      streak: s,
      momentum: momentum(program, progress, now, s, w),
      markers: markers(program, progress, l, w, s, totals),
      transcript: transcript(program, progress),
      calibration: calibration(program, progress),
      pace: pace(program, progress, now),
      paceWeeks: paceWeeks(program, progress, now)
    };
  }

  window.Stats = {
    build: build,
    transcript: transcript,
    gateLocks: gateLocks,
    criterionEvidence: criterionEvidence,
    phaseWork: phaseWork,
    pace: pace,
    paceWeeks: paceWeeks,
    workRequired: WORK_REQUIRED,
    statementMin: STATEMENT_MIN,
    verifierMin: VERIFIER_MIN,
    calibration: calibration,
    ladder: ladder,
    thisWeek: thisWeek,
    streak: streak,
    dayKey: dayKey,
    weekId: weekId
  };
})();
