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
      markers: markers(program, progress, l, w, s, totals)
    };
  }

  window.Stats = {
    build: build,
    ladder: ladder,
    thisWeek: thisWeek,
    streak: streak,
    dayKey: dayKey,
    weekId: weekId
  };
})();
