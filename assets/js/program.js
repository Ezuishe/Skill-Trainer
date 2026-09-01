/*
 * program.js — the saved plan, as a workspace rather than one long page.
 *
 * It used to render as a single scroll: verdict, setup, session, phases,
 * transcript, schedule, reference and log, one after another. Everything was
 * on the page and almost nothing was findable. It is now seven views behind a
 * tab bar, and only the active one is built.
 *
 * Three rules the rest of the file follows:
 *   - Sessions open one at a time. Finishing the one you are on opens the next,
 *     which is how you get at tomorrow's work today.
 *   - Gates are assessments. Passing one costs written evidence and most of the
 *     phase's scheduled work, not a click.
 *   - Every view can say where you stand against the calendar, because that is
 *     the question people actually open a dated plan with.
 */

(function () {
  'use strict';

  var el = window.App.el;
  var P = window.Planner;
  var program = null;
  var progress = null;

  /* Every session in the plan, flattened, because the session view walks them
     in order and the schedule's week/day nesting gets in the way of that. */
  var flat = [];
  var viewIndex = null;      /* which session the Session view is showing */
  var activeTab = null;
  var walkExpanded = null;   /* null = decide from progress */

  /* Which weeks are open on the schedule. Kept here rather than in the DOM so
     that ticking a session — which rebuilds the view — does not fold up the
     week you were working in. */
  var weekOpen = {};

  var TABS = [
    { id: 'overview',   num: '01', label: 'Overview',   title: 'Where you stand' },
    { id: 'session',    num: '02', label: 'Session',    title: 'The session in front of you' },
    { id: 'curriculum', num: '03', label: 'Curriculum', title: 'The syllabus, module by module' },
    { id: 'schedule',   num: '04', label: 'Schedule',   title: 'Every session, dated' },
    { id: 'assessment', num: '05', label: 'Assessment', title: 'Gates and transcript' },
    { id: 'handbook',   num: '06', label: 'Handbook',   title: 'What the hours buy, and how to set up' },
    { id: 'log',        num: '07', label: 'Log',        title: 'Your written record' }
  ];

  function tabById(id) {
    for (var i = 0; i < TABS.length; i++) if (TABS[i].id === id) return TABS[i];
    return null;
  }

  /* -------------------------------------------------------------- helpers */

  var fmtDuration = window.Planner.fmtDuration;

  function sessionKey(week, session) { return 'w' + week.number + 'd' + session.day; }
  function gateKey(phase, i) { return 'p' + phase.index + 'c' + i; }

  function sameDay(a, b) {
    return a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate();
  }

  function startOfToday() {
    var n = new Date();
    return new Date(n.getFullYear(), n.getMonth(), n.getDate());
  }

  /* Numbered steps, the same shape wherever a session appears. */
  function stepList(steps, check) {
    if (!steps || !steps.length) return null;
    var ol = el('ol', { class: 'steps' });
    steps.forEach(function (text) {
      ol.appendChild(el('li', { text: text }));
    });
    var wrap = el('div', {}, [ol]);
    if (check) {
      wrap.appendChild(el('p', { class: 'steps__check', text: 'Done when: ' + check }));
    }
    return wrap;
  }

  function totals() {
    var sessions = 0, done = 0, plannedHours = 0;
    program.schedule.forEach(function (w) {
      w.sessions.forEach(function (s) {
        sessions++;
        plannedHours += s.hours;
        if (progress.sessions[sessionKey(w, s)]) done++;
      });
    });
    var gateCriteria = 0, gatesDone = 0;
    program.phases.forEach(function (ph) {
      ph.milestone.criteria.forEach(function (_, i) {
        gateCriteria++;
        if (progress.gates[gateKey(ph, i)]) gatesDone++;
      });
    });
    return {
      sessions: sessions,
      done: done,
      plannedHours: Math.round(plannedHours),
      gateCriteria: gateCriteria,
      gatesDone: gatesDone,
      pct: sessions ? Math.round((done / sessions) * 100) : 0
    };
  }

  /* ------------------------------------------------------ session ordering */

  function buildFlat() {
    flat = [];
    program.schedule.forEach(function (w) {
      w.sessions.forEach(function (s) {
        flat.push({ w: w, s: s, key: sessionKey(w, s), i: flat.length });
      });
    });
  }

  function isDone(i) {
    return i >= 0 && i < flat.length && !!progress.sessions[flat[i].key];
  }

  function dateArrived(i) {
    var d = flat[i].s.date;
    return new Date(d.getFullYear(), d.getMonth(), d.getDate()) <= startOfToday();
  }

  /* Two ways a session opens: the one before it got logged, or its own date
     arrived.

     The rule is deliberately local rather than "everything up to the first gap".
     Finishing the session in front of you opens the next one — which is the
     whole point of it — and a Tuesday you missed never locks you out of
     Wednesday. The plan is a schedule, not a punishment. What it will not do is
     hand you the whole fortnight to read through on day one. */
  function isUnlocked(i) {
    if (i < 0 || i >= flat.length) return false;
    return i === 0 || isDone(i - 1) || dateArrived(i);
  }

  function lockReason(i) {
    return 'Opens when session ' + i + ' is logged, or on ' + P.fmtDate(flat[i].s.date) +
      ' — whichever comes first.';
  }

  /* Where to put someone who has just arrived: the session dated today if there
     is one and it is open, otherwise the oldest open session they have not
     logged, otherwise the last one they can see. */
  function defaultIndex() {
    var now = new Date();
    var i;
    for (i = 0; i < flat.length; i++) {
      if (sameDay(flat[i].s.date, now) && isUnlocked(i)) return i;
    }
    for (i = 0; i < flat.length; i++) {
      if (isUnlocked(i) && !isDone(i)) return i;
    }
    for (i = flat.length - 1; i >= 0; i--) {
      if (isUnlocked(i)) return i;
    }
    return 0;
  }

  function currentIndex() {
    if (viewIndex === null || viewIndex < 0 || viewIndex >= flat.length) return defaultIndex();
    if (!isUnlocked(viewIndex)) return defaultIndex();
    return viewIndex;
  }

  /* ------------------------------------------------------------ navigation */

  function goTo(tabId, anchor) {
    activeTab = tabId;
    window.Store.setView({ tab: tabId });
    render();
    if (anchor) {
      var node = document.getElementById(anchor);
      if (node) { node.scrollIntoView({ behavior: 'smooth', block: 'start' }); return; }
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  function openSession(i) {
    viewIndex = i;
    window.Store.setView({ tab: 'session', session: i });
    activeTab = 'session';
    render();
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  /* ------------------------------------------------------------- plan bar */

  /* Always on screen: which plan this is, which week of it you are in, and
     whether you are keeping up. Then the tabs. Everything else is one click
     away rather than four thousand pixels down. */
  function renderPlanBar(root, st) {
    var bar = el('div', { class: 'planbar no-print' });
    var inner = el('div', { class: 'wrap planbar__inner' });

    var weekNow = null;
    var now = new Date();
    program.schedule.forEach(function (w) {
      if (!weekNow && now >= w.startDate && now <= P.addDays(w.endDate, 1)) weekNow = w;
    });

    inner.appendChild(el('div', { class: 'planbar__id' }, [
      el('span', { class: 'planbar__name', text: program.discipline.name }),
      el('span', { class: 'planbar__meta' }, [
        document.createTextNode(
          weekNow
            ? 'Week ' + weekNow.number + ' of ' + program.schedule.length
            : (now < program.startDate ? 'Starts ' + P.fmtShort(program.startDate) : 'Plan complete')
        ),
        el('span', { class: 'planbar__dot', text: '·' }),
        document.createTextNode(st.totals.done + '/' + st.totals.sessions + ' sessions')
      ])
    ]));

    inner.appendChild(el('button', {
      class: 'pacechip', type: 'button',
      'data-state': st.pace.state,
      title: st.pace.line,
      text: paceChipText(st.pace),
      onclick: function () { goTo('overview', 'sec-pace'); }
    }));

    bar.appendChild(inner);

    var tabs = el('div', { class: 'wrap' }, [
      (function () {
        var strip = el('div', { class: 'tabs', role: 'tablist', 'aria-label': 'Plan sections' });
        TABS.forEach(function (t) {
          strip.appendChild(el('button', {
            class: 'tab', type: 'button', role: 'tab',
            id: 'tab-' + t.id,
            'data-tab': t.id,
            'aria-selected': String(t.id === activeTab),
            onclick: function () { goTo(t.id); }
          }, [
            el('span', { class: 'tab__n', text: t.num }),
            document.createTextNode(t.label),
            tabBadge(t.id, st)
          ]));
        });
        return strip;
      })()
    ]);
    bar.appendChild(tabs);
    root.appendChild(bar);
  }

  function paceChipText(pace) {
    if (pace.state === 'ahead') return 'Ahead · ' + pace.ahead;
    if (pace.state === 'behind') return 'Behind · ' + pace.behind;
    if (pace.state === 'on') return 'On schedule';
    if (pace.state === 'finished') return 'Plan complete';
    if (pace.state === 'not-started') return 'Not started';
    return 'No schedule';
  }

  /* A count on a tab only earns its place if it changes what you do next. */
  function tabBadge(id, st) {
    if (id === 'session') {
      var i = currentIndex();
      return el('span', { class: 'tab__badge', text: String(i + 1) });
    }
    if (id === 'assessment' && st.totals.gateCriteria) {
      return el('span', {
        class: 'tab__badge',
        text: st.totals.gatesDone + '/' + st.totals.gateCriteria
      });
    }
    return null;
  }

  /* Shared head for a view, so each one opens the same way. */
  function viewHead(tabId, heading, lede) {
    var t = tabById(tabId);
    return el('div', { class: 'section__head' }, [
      el('div', { class: 'section__num', text: t.num }),
      el('div', {}, [
        el('h2', { text: heading }),
        lede ? el('p', { class: 'lede', style: 'margin-top:1rem', text: lede }) : null
      ])
    ]);
  }

  /* ------------------------------------------------------------ pace panel */

  /* Ahead, level, or behind — against the dates the plan actually printed.
     This is deliberately the first thing in the overview: it is the question
     someone reopening a dated plan has, and until now the page answered it
     only by implication. */
  function renderPace(st) {
    var p = st.pace;
    var box = el('div', { class: 'pace', 'data-state': p.state, id: 'sec-pace' });

    box.appendChild(el('div', { class: 'pace__head' }, [
      el('div', {}, [
        el('span', { class: 'eyebrow', style: 'margin-bottom:0.35rem', text: 'Against the schedule' }),
        el('div', { class: 'pace__state', text: paceHeadline(p) })
      ]),
      el('div', { class: 'pace__figure' }, [
        el('span', { class: 'pace__now', text: String(p.done) }),
        el('span', { class: 'pace__of', text: ' logged · ' + p.expected + ' due by today' })
      ])
    ]));

    /* One track, two positions: where the plan says you should be, and where
       you are. The gap between them is the whole point of the panel. */
    var track = el('div', { class: 'pace__track' }, [
      el('div', { class: 'pace__done', style: 'width:' + Math.min(100, p.donePct) + '%' }),
      el('div', {
        class: 'pace__marker',
        style: 'left:' + Math.min(100, p.expectedPct) + '%',
        title: 'Where the schedule says you should be today'
      })
    ]);
    box.appendChild(track);
    box.appendChild(el('div', { class: 'pace__scale tiny mono muted' }, [
      el('span', { text: P.fmtShort(program.startDate) }),
      el('span', { text: 'today: ' + p.expectedPct + '% of the plan is due' }),
      el('span', { text: P.fmtShort(program.endDate) })
    ]));

    box.appendChild(el('p', { class: 'pace__line', text: p.line }));

    var row = el('div', { class: 'pace__row' });
    row.appendChild(paceCell('Drift', p.delta === 0
      ? 'level'
      : (p.delta > 0 ? '+' + p.delta : String(p.delta)),
      p.delta === 0 ? 'exactly on the dates' : (p.driftDays + ' day' + (p.driftDays === 1 ? '' : 's') + ' of work')));
    row.appendChild(paceCell('Kept to the date', p.adherence === null ? '—' : p.adherence + '%',
      'of what was due, done'));
    row.appendChild(paceCell('At this rate, finishes',
      p.projectedEnd ? P.fmtShort(p.projectedEnd) : '—',
      'planned ' + P.fmtShort(program.endDate)));
    row.appendChild(paceCell('Sessions left', String(Math.max(0, p.total - p.done)),
      'of ' + p.total + ' scheduled'));
    box.appendChild(row);

    /* Week by week, planned against logged. A run of short weeks is visible
       here long before it shows up in the totals. */
    var weeks = st.paceWeeks;
    var strip = el('div', { class: 'pace__weeks' });
    weeks.forEach(function (w) {
      var pct = w.planned ? Math.min(100, Math.round((w.done / w.planned) * 100)) : 0;
      strip.appendChild(el('div', {
        class: 'pw', 'data-state': w.state, 'data-current': String(w.current),
        title: 'Week ' + w.number + ': ' + w.done + ' of ' + w.planned + ' logged'
      }, [
        el('div', { class: 'pw__bar' }, [
          el('div', { class: 'pw__fill', style: 'height:' + pct + '%' })
        ]),
        el('span', { class: 'pw__n', text: String(w.number) })
      ]));
    });
    box.appendChild(el('div', { class: 'pace__weekswrap' }, [
      el('span', { class: 'eyebrow', style: 'margin-bottom:0.5rem', text: 'Week by week' }),
      strip,
      el('p', {
        class: 'tiny muted', style: 'margin:0.5rem 0 0',
        text: 'Filled to the share of that week\'s sessions you logged. Amber is a week that came up short, ' +
          'grey is a week not due yet.'
      })
    ]));

    if (p.state === 'behind' && p.behind >= 3) {
      box.appendChild(el('div', { class: 'btn-row no-print', style: 'margin-top:1.25rem' }, [
        el('a', { class: 'btn btn--small btn--ghost', href: 'index.html#commission',
          text: 'Rebuild on the hours you actually have' })
      ]));
    }

    return box;
  }

  function paceHeadline(p) {
    if (p.state === 'ahead') return 'Ahead of schedule';
    if (p.state === 'behind') return 'Behind schedule';
    if (p.state === 'on') return 'On schedule';
    if (p.state === 'finished') return 'Schedule complete';
    if (p.state === 'not-started') return 'Not started';
    return 'No schedule';
  }

  function paceCell(label, value, note) {
    return el('div', { class: 'pace__cell' }, [
      el('span', { class: 'status__label', text: label }),
      el('span', { class: 'status__value', text: value }),
      el('span', { class: 'tiny muted', text: note })
    ]);
  }

  /* ---------------------------------------------------------- status panel */

  /* Hours banked against the next level is the headline, because that is the
     number the rest of the site is built on and it is earned rather than
     awarded. */
  function renderStatus(st) {
    var l = st.ladder;
    var panel = el('div', { class: 'status', 'data-state': st.momentum.state });

    var head = el('div', { class: 'status__head' }, [
      el('div', {}, [
        el('span', { class: 'eyebrow', style: 'margin-bottom:0.35rem', text: 'Hours banked' }),
        el('div', { class: 'status__figure' }, [
          el('span', { class: 'status__now', text: String(l.effective) }),
          el('span', { class: 'status__of', text: ' of ' + l.target + ' h' }),
          l.next
            ? el('span', { class: 'status__goal', text: ' to ' + l.next.label.toLowerCase() })
            : el('span', { class: 'status__goal', text: ' — top of the ladder' })
        ])
      ]),
      el('div', { class: 'status__pct mono', text: l.pct + '%' })
    ]);
    panel.appendChild(head);

    panel.appendChild(el('div', { class: 'meter meter--lg' }, [
      el('div', { class: 'meter__credit', style: 'width:' + l.creditedPct + '%' }),
      el('div', { class: 'meter__fill', style: 'width:' + l.pct + '%' })
    ]));

    if (l.creditedPct > 0 && l.logged === 0) {
      panel.appendChild(el('p', {
        class: 'tiny muted', style: 'margin:0.5rem 0 0',
        text: 'The pale part is the experience you told us you already had. The solid part is ' +
          'what you log from here.'
      }));
    }

    panel.appendChild(el('p', { class: 'tiny muted', style: 'margin:0.6rem 0 0' }, [
      document.createTextNode(
        l.logged + ' h logged by you' +
        (l.banked ? ' · ' + l.banked + ' h credited for prior experience' : '')
      ),
      l.next
        ? el('span', { text: ' · ' + l.sessionsToNext + ' more sessions at this length' })
        : null
    ]));

    var row = el('div', { class: 'status__row' });

    row.appendChild(el('div', { class: 'status__cell' }, [
      el('span', { class: 'status__label', text: 'This week' }),
      el('span', { class: 'status__value', text: st.week.inPlan ? st.week.done + '/' + st.week.total : '—' }),
      el('div', { class: 'meter meter--sm' }, [
        el('div', { class: 'meter__fill', style: 'width:' + (st.week.inPlan ? st.week.pct : 0) + '%' })
      ])
    ]));

    row.appendChild(el('div', { class: 'status__cell' }, [
      el('span', { class: 'status__label', text: 'Week streak' }),
      el('span', { class: 'status__value', text: String(st.streak.weeks) }),
      el('span', { class: 'tiny muted', text: st.streak.weeks === 1 ? 'week running' : 'weeks running' })
    ]));

    row.appendChild(el('div', { class: 'status__cell' }, [
      el('span', { class: 'status__label', text: 'Gates' }),
      el('span', { class: 'status__value', text: st.totals.gatesDone + '/' + st.totals.gateCriteria }),
      el('span', { class: 'tiny muted', text: 'criteria passed' })
    ]));

    row.appendChild(el('div', { class: 'status__cell' }, [
      el('span', { class: 'status__label', text: 'Credits' }),
      el('span', { class: 'status__value', text: st.transcript.creditsEarned + '/' + st.transcript.creditsTotal }),
      el('span', { class: 'tiny muted', text: st.transcript.modulesAwarded + ' of ' + st.transcript.modulesTotal + ' modules awarded' })
    ]));

    row.appendChild(el('div', { class: 'status__cell' }, [
      el('span', { class: 'status__label', text: 'Sessions' }),
      el('span', { class: 'status__value', text: st.totals.done + '/' + st.totals.sessions }),
      el('span', { class: 'tiny muted', text: st.totals.pct + '% of the plan' })
    ]));

    panel.appendChild(row);
    panel.appendChild(el('p', { class: 'status__momentum', text: st.momentum.line }));

    var cal = st.calibration;
    if (cal.verdict) {
      panel.appendChild(el('div', { class: 'calib', 'data-state': cal.verdict.state }, [
        el('div', { class: 'calib__head' }, [
          el('span', { class: 'eyebrow', style: 'margin:0', text: 'Difficulty check' }),
          cal.recentMean !== null
            ? el('span', { class: 'mono tiny muted', text: 'mean score ' + cal.recentMean + '/5 over the last ' + Math.min(5, cal.count) })
            : null,
          cal.trend
            ? el('span', {
                class: 'calib__trend',
                'data-dir': cal.trend.direction,
                text: cal.trend.direction === 'up' ? 'improving' : (cal.trend.direction === 'down' ? 'falling' : 'flat')
              })
            : null
        ]),
        el('p', { class: 'small', style: 'margin:0.4rem 0 0', text: cal.verdict.line })
      ]));
    }
    if (cal.plateau) {
      panel.appendChild(el('div', { class: 'calib', 'data-state': 'plateau' }, [
        el('span', { class: 'eyebrow', style: 'margin:0', text: 'Plateau' }),
        el('p', { class: 'small', style: 'margin:0.4rem 0 0', text: cal.plateau.line })
      ]));
    }

    if (st.markers.earned.length || st.markers.next) {
      var marks = el('div', { class: 'status__markers' });
      st.markers.earned.forEach(function (m) {
        marks.appendChild(el('span', { class: 'marker', text: m.label }));
      });
      if (st.markers.next) {
        marks.appendChild(el('span', {
          class: 'marker marker--next',
          text: st.markers.next.label + ' · ' + st.markers.next.remaining + ' h to go'
        }));
      }
      panel.appendChild(marks);
    }

    return panel;
  }

  /* -------------------------------------------------------------- overview */

  function renderOverview(root, st) {
    var i = program.input;
    var t = totals();
    var bp = program.blockPlan || P.blockPlan(i);
    var sec = el('section', { class: 'section section--flush', 'data-view': 'overview' });
    var wrap = el('div', { class: 'wrap' });

    wrap.appendChild(el('span', { class: 'eyebrow', text: program.discipline.discipline + ' · training plan' }));
    wrap.appendChild(el('h1', { style: 'font-size:clamp(2.2rem,5vw,3.6rem)', text: program.discipline.name }));
    wrap.appendChild(el('p', { class: 'lede', style: 'margin-top:1rem', text: program.discipline.tagline }));

    if (i.objective) {
      wrap.appendChild(el('div', {
        class: 'notice notice--flat', style: 'margin-top:1.5rem;max-width:68ch'
      }, [
        el('span', { class: 'eyebrow', style: 'margin-bottom:0.25rem', text: 'What you said you wanted' }),
        el('span', { class: 'small', text: i.objective })
      ]));
    }

    var stats = el('div', { class: 'grid grid--4', style: 'margin-top:2.5rem' });
    [
      [program.totalHours + ' h', 'Total practice hours'],
      [i.weeks + ' wk', 'Horizon'],
      [program.phases.length, 'Modules and gates'],
      [t.sessions, 'Scheduled sessions']
    ].forEach(function (pair) {
      stats.appendChild(el('div', { class: 'stat' }, [
        el('span', { class: 'stat__value', text: String(pair[0]) }),
        el('span', { class: 'stat__label', text: pair[1] })
      ]));
    });
    wrap.appendChild(stats);

    wrap.appendChild(el('p', {
      class: 'small muted', style: 'margin-top:1rem',
      text: P.fmtDate(program.startDate) + ' → ' + P.fmtDate(program.endDate) + ' · ' +
        bp.trainingDays + ' training day' + (bp.trainingDays === 1 ? '' : 's') + ' a week, ' +
        (bp.blocksPerDay === 1
          ? 'one sitting of ' + fmtDuration(bp.blockMinutes)
          : bp.blocksPerDay + ' sittings of ' + fmtDuration(bp.blockMinutes)) +
        ' · starting from: ' + program.levelLabel.toLowerCase()
    }));

    /* The two panels that answer "how is it going": against the calendar
       first, then against the ladder. */
    wrap.appendChild(renderPace(st));
    wrap.appendChild(renderStatus(st));

    /* One button, to the thing you are supposed to do next. */
    var idx = currentIndex();
    if (flat.length) {
      var cur = flat[idx];
      wrap.appendChild(el('div', { class: 'nextup no-print' }, [
        el('div', {}, [
          el('span', { class: 'eyebrow', style: 'margin-bottom:0.3rem', text: 'Next up' }),
          el('div', { class: 'nextup__title', text: 'Session ' + (idx + 1) + ' · ' + cur.s.title }),
          el('p', {
            class: 'tiny muted', style: 'margin:0.35rem 0 0',
            text: P.fmtDate(cur.s.date) + ' · ' + cur.s.type.label.toLowerCase() + ' · ' +
              fmtDuration(cur.s.minutes) + ' · week ' + cur.w.number
          })
        ]),
        el('button', {
          class: 'btn', type: 'button', text: 'Open the session',
          onclick: function () { openSession(idx); }
        })
      ]));
    }

    wrap.appendChild(renderWalkthrough());

    sec.appendChild(wrap);
    root.appendChild(sec);
  }

  /* ------------------------------------------------------------ exports */

  function exportRow() {
    return el('div', { class: 'btn-row no-print' }, [
      el('button', {
        class: 'btn btn--small', type: 'button', text: 'Download as Markdown',
        onclick: function () {
          window.App.download(
            program.discipline.id + '-program.md', P.toMarkdown(program), 'text/markdown'
          );
          window.App.toast('Markdown file downloaded.');
        }
      }),
      el('button', {
        class: 'btn btn--small btn--ghost', type: 'button', text: 'Add to calendar (.ics)',
        onclick: function () {
          window.App.download(
            program.discipline.id + '-program.ics', P.toICS(program), 'text/calendar'
          );
          window.App.toast('Calendar file downloaded. Import it into your calendar app.');
        }
      }),
      el('button', {
        class: 'btn btn--small btn--ghost', type: 'button', text: 'Copy plan',
        onclick: function () {
          window.App.copy(P.toMarkdown(program)).then(function () {
            window.App.toast('Copied the whole plan to the clipboard.');
          }, function () {
            window.App.toast('Clipboard blocked by the browser. Use the Markdown download instead.');
          });
        }
      }),
      el('button', {
        class: 'btn btn--small btn--ghost', type: 'button', text: 'Print this view',
        onclick: function () { window.print(); }
      })
    ]);
  }

  /* ----------------------------------------------------------- walkthrough */

  /* A plan is only obvious to the person who built it. This says what to do
     first, second and third, with the state of each step read off work
     actually logged rather than off a checkbox someone ticked to make the
     panel go away. Each step now names the tab it lives on. */

  function walkSteps() {
    var records = progress.records || {};
    var sessionsDone = Object.keys(progress.sessions || {}).length;
    var scored = Object.keys(records).some(function (k) {
      return typeof records[k].score === 'number';
    });

    var firstSession = flat.length ? flat[0] : null;
    var firstReview = null, reviewDone = false;
    flat.forEach(function (f) {
      if (f.s.type.key === 'review') {
        if (!firstReview) firstReview = f;
        if (progress.sessions[f.key]) reviewDone = true;
      }
    });

    var locks = window.Stats.gateLocks(program, progress);
    var gate1 = locks[0];
    var phase1 = program.phases[0];
    var v = program.verdict;

    return [
      {
        id: 'verdict',
        title: 'Check the arithmetic before you commit to it',
        tab: 'handbook', anchor: 'sec-verdict',
        targetLabel: 'Read what these hours buy',
        done: !!progress.steps.verdict,
        ack: 'verdict',
        ackLabel: 'I have read it',
        body: [
          'Your ' + program.totalHours + ' practice hours reach ' +
            (v.reached ? v.reached.label.toLowerCase() : 'below the first level') +
            '. The Handbook says what that gets you, what it does not, and the three ways to change it.',
          'If the level is lower than you were expecting, rebuild the plan now with different numbers. ' +
            'That costs a minute today and saves you finding out in week five.'
        ]
      },
      {
        id: 'setup',
        title: 'Spend one hour setting up, before any session',
        tab: 'handbook', anchor: 'sec-setup',
        targetLabel: 'Open Before week 1',
        done: !!progress.steps.setup,
        ack: 'setup',
        ackLabel: 'Setup done, baseline written down',
        body: [
          'The Handbook lists the tools you need, where honest feedback is going to come from, and a ' +
            'baseline to measure today.',
          'The baseline is the step everyone skips. Without a number from before you started, you have ' +
            'no way to tell in week twelve whether any of this worked, and you will end up arguing with ' +
            'your own memory.'
        ]
      },
      {
        id: 'first',
        title: 'Run the first session off the run sheet',
        tab: 'session',
        targetLabel: 'Go to the session',
        done: sessionsDone > 0,
        body: firstSession
          ? [
            'Your first sitting is ' + P.fmtShort(firstSession.s.date) + ': ' +
              firstSession.s.type.label.toLowerCase() + ', ' + fmtDuration(firstSession.s.minutes) +
              ' — "' + firstSession.s.title + '".',
            'The run sheet on the card breaks that into ' + firstSession.s.runsheet.rows.length +
              ' blocks with a clock window on each. Work down it in order. If you run out of time, ' +
              'stop at the end of a block rather than half way through one, and log it anyway.'
          ]
          : ['Open the session and work down the run sheet in order.']
      },
      {
        id: 'record',
        title: 'Record the session, not just tick it',
        tab: 'session',
        targetLabel: 'Go to the record panel',
        done: scored,
        body: [
          'Under every session card there is a record: mark it done, score it out of five, say whether ' +
            'it was too easy, about right or too hard, and attach whatever you made — a recording, a ' +
            'draft, a screenshot.',
          'The difficulty judgement is the one that does work. It feeds the calibration line in the ' +
            'Overview, which is what keeps the practice in the band where it changes anything. Mark ' +
            'most sessions too easy and the plan will tell you to make them harder rather than ' +
            'congratulate you.',
          'Logging a session is also what opens the next one, so this is not bookkeeping you can skip.'
        ]
      },
      {
        id: 'review',
        title: 'Close the week with the review session',
        tab: 'schedule',
        targetLabel: 'See the week',
        done: reviewDone,
        body: firstReview
          ? [
            'The last sitting of each training week is Review & Log: ' +
              fmtDuration(firstReview.s.minutes) + ', a fixed six-point procedure.',
            'It is where you count what you actually did against what was planned, check yourself ' +
              'against this stage, and name next week\'s single weakness. It is scoring rather than ' +
              'practice, which is why it is short.'
          ]
          : [
            'At this session count there is no separate weekly review, so do the counting at the end ' +
              'of your last session of the week: sessions done against planned, and one sentence on ' +
              'next week\'s weakness.'
          ]
      },
      {
        id: 'gate',
        title: 'Sit the gate at the end of the module',
        tab: 'assessment',
        targetLabel: 'See the gates',
        done: !!(gate1 && gate1.complete),
        body: [
          'Module 1 ends in week ' + phase1.weekEnd + ' at the gate "' + phase1.milestone.name +
            '", with ' + phase1.milestone.criteria.length + ' criteria another person could check.',
          'A gate is an assessment, not a checkbox. Each criterion needs ' +
            window.Stats.statementMin + ' characters of written evidence and a named check before ' +
            'it can be claimed, and the gate stays shut until you have logged ' +
            Math.round(window.Stats.workRequired * 100) + '% of the module\'s sessions.',
          'Gates open in order: the next module\'s gate stays locked until this one passes in full. ' +
            'If it does not pass, repeat the last week rather than moving on.'
        ]
      }
    ];
  }

  function walkGlossary() {
    var mix = program.discipline;
    return [
      ['Module', 'One pillar of the skill, several weeks long, ending at a gate. This plan has ' +
        program.phases.length + '. The Curriculum tab holds them.'],
      ['Phase', 'The same thing as a module, said in training rather than course language. The ' +
        'schedule numbers its weeks by phase.'],
      ['Gate', 'The assessment that says you can move on, written so someone else could check it. ' +
        'Each criterion needs written evidence and a named check, and gates unlock in order.'],
      ['Session', 'One sitting. Four kinds: acquire (take something in and use it), drill ' +
        '(repetitions against one weakness), produce (make the real thing), and review (score the ' +
        'week). They are mixed rather than blocked, on purpose. Sessions open one at a time.'],
      ['Run sheet', 'The minute-by-minute order for one session, with a clock window on each block ' +
        'and a mark on the block to drop first if you are short.'],
      ['Stage', 'How a module escalates. Week 4 of a module is not a repeat of week 1, and the stage ' +
        'name on each session says where you are in that.'],
      ['Credit', 'One hour of scheduled practice in a module. Credits accrue as you log sessions; the ' +
        'module is only awarded when the gate passes. Hours are attendance, the gate is evidence.'],
      ['Baseline', 'The measurement you take in ' + mix.name.toLowerCase() +
        ' before week 1, so progress later is a number rather than a feeling.']
    ];
  }

  function renderWalkthrough() {
    var steps = walkSteps();
    var doneCount = steps.filter(function (s) { return s.done; }).length;
    var currentIdx = -1;
    steps.forEach(function (s, i) { if (currentIdx === -1 && !s.done) currentIdx = i; });
    var finished = currentIdx === -1;
    var open = walkExpanded === null ? !finished : walkExpanded;

    var holder = el('div', { class: 'no-print', id: 'sec-start', style: 'margin-top:3rem' });

    holder.appendChild(el('div', { class: 'section__head', style: 'margin-bottom:1.5rem' }, [
      el('div', { class: 'section__num', text: '·' }),
      el('div', {}, [
        el('h3', { text: 'Start here' }),
        el('p', {
          class: 'small muted', style: 'margin-top:0.6rem;max-width:64ch',
          text: finished
            ? 'You have been through all six. This stays here as a reference for what the plan expects of you.'
            : 'Six things, in order. Everything else in this plan is detail hanging off one of them. ' +
              'You are on step ' + (currentIdx + 1) + '.'
        })
      ])
    ]));

    var box = el('div', { class: 'walk', 'data-open': String(open) });

    box.appendChild(el('div', { class: 'walk__bar' }, [
      el('span', { class: 'mono tiny muted', text: doneCount + ' of ' + steps.length + ' done' }),
      el('div', { class: 'meter meter--sm', style: 'flex:1;margin:0' }, [
        el('div', {
          class: 'meter__fill',
          style: 'width:' + Math.round((doneCount / steps.length) * 100) + '%'
        })
      ]),
      el('button', {
        class: 'walk__toggle', type: 'button',
        text: open ? 'Collapse' : 'Show the steps',
        onclick: function () { walkExpanded = !open; render(); }
      })
    ]));

    if (open) {
      steps.forEach(function (st, i) {
        var isCurrent = i === currentIdx;
        var row = el('div', {
          class: 'walk__step',
          'data-state': st.done ? 'done' : (isCurrent ? 'current' : 'ahead')
        });

        row.appendChild(el('span', { class: 'walk__n', text: st.done ? '✓' : String(i + 1) }));

        var bodyCol = el('div', { class: 'walk__body' });
        bodyCol.appendChild(el('div', { class: 'walk__title', text: st.title }));

        if (isCurrent || st.done) {
          st.body.forEach(function (para) {
            bodyCol.appendChild(el('p', { class: 'walk__text', text: para }));
          });

          var actions = el('div', { class: 'walk__actions' });
          actions.appendChild(el('button', {
            class: 'walk__link', type: 'button', text: st.targetLabel + ' →',
            onclick: function () { goTo(st.tab, st.anchor); }
          }));
          if (st.ack) {
            actions.appendChild(el('button', {
              class: 'btn btn--tiny', type: 'button',
              text: st.done ? 'Mark as not done' : st.ackLabel,
              onclick: function () {
                progress = window.Store.markStep(program.id, st.ack, !st.done);
                walkExpanded = null;
                render();
              }
            }));
          } else if (!st.done) {
            actions.appendChild(el('span', {
              class: 'tiny muted',
              text: 'This ticks itself once you have done it.'
            }));
          }
          bodyCol.appendChild(actions);
        }

        row.appendChild(bodyCol);
        box.appendChild(row);
      });

      /* The vocabulary. Without it, half the plan is nouns the reader has not
         been introduced to. */
      var gloss = el('div', { class: 'walk__gloss' }, [
        el('span', { class: 'eyebrow', text: 'The parts of this plan' })
      ]);
      var dl = el('dl', { class: 'defs' });
      walkGlossary().forEach(function (pair) {
        dl.appendChild(el('dt', { text: pair[0] }));
        dl.appendChild(el('dd', { text: pair[1] }));
      });
      gloss.appendChild(dl);
      box.appendChild(gloss);
    }

    holder.appendChild(box);
    return holder;
  }

  /* ------------------------------------------------------------- runsheet */

  function renderRunsheet(s) {
    var r = s.runsheet;
    var box = el('div', { class: 'runsheet' });
    box.appendChild(el('div', { class: 'runsheet__head' }, [
      el('span', { class: 'eyebrow', style: 'margin:0', text: 'Run sheet' }),
      el('span', { class: 'mono tiny muted', text: fmtDuration(r.total) + ' · ' + r.rows.length + ' blocks' })
    ]));

    r.rows.forEach(function (row) {
      box.appendChild(el('div', { class: 'rs', 'data-kind': row.kind }, [
        el('div', { class: 'rs__time mono' }, [
          el('span', { class: 'rs__from', text: row.from }),
          el('span', { class: 'rs__dur', text: row.minutes + ' min' })
        ]),
        el('div', { class: 'rs__body' }, [
          el('div', { class: 'rs__label' }, [
            document.createTextNode(row.label),
            row.dose ? el('span', { class: 'rs__dose mono', text: row.dose }) : null,
            row.cutFirst ? el('span', { class: 'rs__cut', text: 'cut this first if short' }) : null
          ]),
          el('p', { class: 'rs__detail', text: row.detail })
        ])
      ]));
    });

    box.appendChild(el('p', { class: 'tiny muted', style: 'margin:0.75rem 0 0', text: r.note }));
    return box;
  }

  /* --------------------------------------------------------------- record */

  /* What happened, in your own judgement, plus whatever proves it. Difficulty
     feeds the calibration advice; evidence is what lets you compare week one
     with week twelve; and marking it done is what opens the next session. */
  function renderRecord(w, s) {
    var key = sessionKey(w, s);
    var rec = window.Store.getRecord(program.id, key);
    var done = !!progress.sessions[key];

    var box = el('div', { class: 'record', 'data-done': String(done) });
    box.appendChild(el('span', { class: 'eyebrow', text: 'Record the session' }));

    box.appendChild(el('label', { class: 'check record__done' }, [
      el('input', {
        type: 'checkbox',
        checked: done ? 'checked' : null,
        onchange: function () {
          progress = window.Store.toggleSession(program.id, key, s.hours);
          render();
        }
      }),
      el('span', { text: done ? 'Done, and logged.' : 'Mark this session done — this opens the next one' })
    ]));

    var scoreRow = el('div', { class: 'record__field' }, [
      el('span', { class: 'record__label', text: 'How did it go?' }),
      el('span', { class: 'tiny muted', text: '1 = fell apart · 5 = better than expected' })
    ]);
    var scores = el('div', { class: 'scale' });
    [1, 2, 3, 4, 5].forEach(function (n) {
      scores.appendChild(el('button', {
        class: 'scale__btn', type: 'button',
        'aria-pressed': String(rec.score === n),
        text: String(n),
        onclick: function () {
          window.Store.setRecord(program.id, key, { score: rec.score === n ? null : n });
          render();
        }
      }));
    });
    scoreRow.appendChild(scores);
    box.appendChild(scoreRow);

    var diffRow = el('div', { class: 'record__field' }, [
      el('span', { class: 'record__label', text: 'How hard was it?' }),
      el('span', { class: 'tiny muted', text: 'Aim to be getting it wrong about a third of the time' })
    ]);
    var diffs = el('div', { class: 'choice-row' });
    [
      ['easy', 'Too easy', 'I got nearly all of it right'],
      ['right', 'About right', 'Some of it went wrong'],
      ['hard', 'Too hard', 'I got almost none of it']
    ].forEach(function (d) {
      diffs.appendChild(el('button', {
        class: 'choice', type: 'button',
        'aria-pressed': String(rec.difficulty === d[0]),
        onclick: function () {
          window.Store.setRecord(program.id, key, { difficulty: rec.difficulty === d[0] ? null : d[0] });
          render();
        }
      }, [
        document.createTextNode(d[1]),
        el('small', { text: d[2] })
      ]));
    });
    diffRow.appendChild(diffs);
    box.appendChild(diffRow);

    box.appendChild(renderEvidence(key, s));

    var noteField = el('div', { class: 'record__field' }, [
      el('span', { class: 'record__label', text: 'Note' })
    ]);
    var note = el('textarea', {
      placeholder: 'What was hard, and what you will change next time.',
      style: 'min-height:4rem'
    });
    note.value = rec.note || '';
    note.addEventListener('change', function () {
      window.Store.setRecord(program.id, key, { note: note.value.trim() || null });
      window.App.toast('Note saved.');
    });
    noteField.appendChild(note);
    box.appendChild(noteField);

    return box;
  }

  function renderEvidence(key, s) {
    var field = el('div', { class: 'record__field' }, [
      el('span', { class: 'record__label', text: 'Evidence' }),
      el('span', {
        class: 'tiny muted',
        text: s.check
          ? 'What shows this is done: ' + s.check
          : 'A recording, a draft, a screenshot. Whatever you could compare against in ten weeks.'
      })
    ]);

    if (!window.Evidence || !window.Evidence.isAvailable()) {
      field.appendChild(el('p', {
        class: 'tiny muted',
        text: 'Attachments need IndexedDB, which this browser has switched off. Everything else still works.'
      }));
      return field;
    }

    var list = el('div', { class: 'evidence__list' });
    var input = el('input', {
      type: 'file',
      multiple: 'multiple',
      class: 'visually-hidden',
      id: 'ev-' + key,
      onchange: function () {
        var files = Array.prototype.slice.call(input.files || []);
        if (!files.length) return;
        Promise.all(files.map(function (f) {
          return window.Evidence.add(key, f).catch(function (e) {
            window.App.toast(e.message);
            return null;
          });
        })).then(function (added) {
          var ok = added.filter(Boolean).length;
          if (ok) {
            window.Store.setRecord(program.id, key, { evidence: true });
            window.App.toast(ok + (ok === 1 ? ' file attached.' : ' files attached.'));
          }
          input.value = '';
          refresh();
        });
      }
    });

    function refresh() {
      window.Evidence.listFor(key).then(function (rows) {
        list.innerHTML = '';
        if (!rows.length) {
          list.appendChild(el('p', { class: 'tiny muted', style: 'margin:0', text: 'Nothing attached yet.' }));
          return;
        }
        rows.forEach(function (r) {
          var url = window.Evidence.urlFor(r);
          list.appendChild(el('div', { class: 'evidence__item' }, [
            el('span', { class: 'evidence__name', text: r.name }),
            el('span', { class: 'evidence__meta mono tiny', text: window.Evidence.formatBytes(r.size) }),
            url ? el('a', {
              class: 'btn btn--small btn--ghost',
              href: url, target: '_blank', rel: 'noopener', text: 'Open'
            }) : null,
            el('button', {
              class: 'btn btn--small btn--ghost', type: 'button', text: 'Remove',
              onclick: function () { window.Evidence.remove(r.id).then(refresh); }
            })
          ]));
        });
      });
    }

    field.appendChild(el('div', { class: 'btn-row', style: 'margin-bottom:0.6rem' }, [
      el('label', { class: 'btn btn--small btn--ghost', for: 'ev-' + key, text: 'Attach evidence' }),
      input
    ]));
    field.appendChild(list);
    refresh();
    return field;
  }

  /* --------------------------------------------------------- session view */

  /* One session at a time, with the way forward and the way back. Sessions
     unlock in order: finishing the one you are on opens the next, which is how
     you get at tomorrow's work tonight without the plan pretending you did
     today's. Anything already dated in the past stays open regardless, because
     a missed Tuesday should not lock you out of Wednesday. */
  function renderSessionView(root) {
    var sec = el('section', { class: 'section section--flush no-print', 'data-view': 'session', id: 'sec-today' });
    var wrap = el('div', { class: 'wrap' });

    if (!flat.length) {
      wrap.appendChild(viewHead('session', 'Sessions', null));
      wrap.appendChild(el('div', { class: 'empty' }, [
        el('p', { class: 'small', style: 'margin:0', text: 'No sessions scheduled.' })
      ]));
      sec.appendChild(wrap);
      root.appendChild(sec);
      return;
    }

    var idx = currentIndex();
    var entry = flat[idx];
    var s = entry.s, w = entry.w;
    var key = entry.key;
    var done = !!progress.sessions[key];
    var isToday = sameDay(s.date, new Date());

    wrap.appendChild(renderSessionNav(idx));

    var card = el('div', { class: 'card', 'data-done': String(done) }, [
      el('div', {
        style: 'display:flex;flex-wrap:wrap;gap:1rem;justify-content:space-between;align-items:baseline'
      }, [
        el('div', {}, [
          el('span', { class: 'session__type', 'data-t': s.type.key, text: s.type.label }),
          el('h3', { style: 'margin-top:0.35rem', text: s.title })
        ]),
        el('div', { style: 'text-align:right' }, [
          el('div', { class: 'mono small' }, [
            document.createTextNode(P.fmtDate(s.date)),
            isToday ? el('span', { class: 'tag tag--accent', style: 'margin-left:0.5rem', text: 'today' }) : null
          ]),
          el('div', {
            class: 'mono small muted',
            text: fmtDuration(s.minutes) + ' · week ' + w.number +
              (s.blocks > 1 ? ' · sitting ' + s.block + ' of ' + s.blocks + ' today' : '')
          })
        ])
      ])
    ]);

    /* Where this sits in the arc, so the session is not free-floating. */
    card.appendChild(el('p', { class: 'tiny muted', style: 'margin:0.75rem 0 0' }, [
      document.createTextNode(w.phase.name + ' · ' + w.phase.objective),
      s.stage
        ? el('span', {
            text: '  ·  Stage ' + (s.stage.index + 1) + ' of ' + s.stage.total + ': ' + s.stage.stage.name
          })
        : null
    ]));

    if (s.drill) {
      card.appendChild(el('div', { class: 'drill', style: 'margin-top:1.5rem' }, [
        el('span', { class: 'drill__dose', text: s.drill.dose }),
        el('p', { class: 'drill__protocol', text: s.drill.protocol }),
        s.drill.mistake
          ? el('p', { class: 'drill__mistake', text: 'What usually goes wrong: ' + s.drill.mistake })
          : null
      ]));
    } else if (s.detail) {
      card.appendChild(el('p', { style: 'margin:1.25rem 0 0;color:var(--ink-2)', text: s.detail }));
    }

    /* The run sheet below lists every step with its own time window, so the
       plain step list would be the same content twice. Only the completion
       test needs restating here. */
    if (s.check) {
      card.appendChild(el('p', {
        class: 'steps__check', style: 'margin:1.25rem 0 0;padding-left:0',
        text: 'Done when: ' + s.check
      }));
    }

    if (!s.detail && !s.drill && !(s.steps && s.steps.length)) {
      card.appendChild(el('p', { class: 'small muted', style: 'margin:1rem 0 0', text: s.type.note }));
    }

    if (s.lesson) {
      card.appendChild(el('div', { class: 'lesson' }, [
        el('span', { class: 'eyebrow', style: 'margin:0', text: s.lesson.label }),
        el('p', { class: 'lesson__text', text: s.lesson.text })
      ]));
    }

    card.appendChild(renderRunsheet(s));
    card.appendChild(renderRecord(w, s));
    wrap.appendChild(card);

    /* What happens next, said explicitly rather than left to be discovered. */
    wrap.appendChild(renderUnlock(idx, done));

    sec.appendChild(wrap);
    root.appendChild(sec);
  }

  /* The navigator: previous, position, next, and the current week as chips. */
  function renderSessionNav(idx) {
    var entry = flat[idx];
    var nav = el('div', { class: 'navsess no-print' });

    var prevOk = idx > 0;
    var nextOk = idx + 1 < flat.length && isUnlocked(idx + 1);

    nav.appendChild(el('button', {
      class: 'navsess__btn', type: 'button',
      disabled: prevOk ? null : 'disabled',
      'aria-label': 'Previous session',
      text: '‹ Previous',
      onclick: function () { if (prevOk) openSession(idx - 1); }
    }));

    nav.appendChild(el('div', { class: 'navsess__now' }, [
      el('span', { class: 'navsess__count mono', text: 'Session ' + (idx + 1) + ' of ' + flat.length }),
      el('span', {
        class: 'navsess__where',
        text: 'Week ' + entry.w.number + ' · ' + P.fmtShort(entry.s.date) + ' · ' + entry.w.phase.name
      })
    ]));

    nav.appendChild(el('button', {
      class: 'navsess__btn', type: 'button',
      disabled: nextOk ? null : 'disabled',
      'aria-label': 'Next session',
      title: nextOk ? '' : 'Log this session to open the next one',
      text: 'Next ›',
      onclick: function () { if (nextOk) openSession(idx + 1); }
    }));

    /* The week's sittings as chips, so jumping back to Monday is one click and
       the locked ones are visible rather than merely absent. */
    var strip = el('div', { class: 'navsess__strip' });
    var weekEntries = flat.filter(function (f) { return f.w.number === entry.w.number; });
    weekEntries.forEach(function (f) {
      var unlocked = isUnlocked(f.i);
      var isDone = !!progress.sessions[f.key];
      strip.appendChild(el('button', {
        class: 'chip', type: 'button',
        'data-state': isDone ? 'done' : (unlocked ? 'open' : 'locked'),
        'aria-current': String(f.i === idx),
        disabled: unlocked ? null : 'disabled',
        title: unlocked
          ? f.s.type.label + ' · ' + P.fmtDate(f.s.date) + ' · ' + f.s.title
          : lockReason(f.i),
        onclick: function () { if (unlocked) openSession(f.i); }
      }, [
        el('span', { class: 'chip__n', text: String(f.i + 1) }),
        el('span', { class: 'chip__d', text: P.fmtShort(f.s.date) }),
        !unlocked ? el('span', { class: 'chip__lock', text: '🔒' }) : null
      ]));
    });

    var stripWrap = el('div', { class: 'navsess__striprow' }, [
      el('button', {
        class: 'navsess__wk', type: 'button',
        disabled: entry.w.number > 1 ? null : 'disabled',
        text: '‹ wk',
        onclick: function () {
          var target = null;
          flat.forEach(function (f) {
            if (f.w.number === entry.w.number - 1 && target === null) target = f.i;
          });
          if (target !== null) openSession(isUnlocked(target) ? target : currentIndex());
        }
      }),
      strip,
      el('button', {
        class: 'navsess__wk', type: 'button',
        disabled: entry.w.number < program.schedule.length ? null : 'disabled',
        text: 'wk ›',
        onclick: function () {
          var target = null;
          flat.forEach(function (f) {
            if (f.w.number === entry.w.number + 1 && target === null && isUnlocked(f.i)) target = f.i;
          });
          if (target !== null) openSession(target);
          else window.App.toast('Next week is not open yet. Log the sessions you are on first.');
        }
      })
    ]);

    return el('div', {}, [nav, stripWrap]);
  }

  /* The panel under the card. Its whole job is to make the next step a button
     rather than a search. */
  function renderUnlock(idx, done) {
    var last = idx + 1 >= flat.length;
    var box = el('div', { class: 'unlock no-print', 'data-state': done ? 'open' : 'shut' });

    if (last) {
      box.appendChild(el('div', {}, [
        el('span', { class: 'eyebrow', style: 'margin-bottom:0.3rem', text: 'Last scheduled session' }),
        el('p', {
          class: 'small', style: 'margin:0',
          text: done
            ? 'That is the plan run. What is left is the gates — claim them in Assessment, with the evidence.'
            : 'This is the last sitting on the schedule. Log it, then take the final gate in Assessment.'
        })
      ]));
      box.appendChild(el('button', {
        class: 'btn btn--small btn--ghost', type: 'button', text: 'Go to Assessment',
        onclick: function () { goTo('assessment'); }
      }));
      return box;
    }

    var next = flat[idx + 1];
    if (done) {
      box.appendChild(el('div', {}, [
        el('span', { class: 'eyebrow', style: 'margin-bottom:0.3rem', text: 'Next session unlocked' }),
        el('div', { class: 'unlock__title', text: 'Session ' + (idx + 2) + ' · ' + next.s.title }),
        el('p', {
          class: 'tiny muted', style: 'margin:0.35rem 0 0',
          text: 'Scheduled for ' + P.fmtDate(next.s.date) + ' · ' + next.s.type.label.toLowerCase() +
            ' · ' + fmtDuration(next.s.minutes) +
            '. You can read it now; doing two sittings back to back is worse practice than one, so ' +
            'reading ahead is the sensible use of it.'
        })
      ]));
      box.appendChild(el('button', {
        class: 'btn btn--small', type: 'button', text: 'Open session ' + (idx + 2),
        onclick: function () { openSession(idx + 1); }
      }));
    } else {
      box.appendChild(el('div', {}, [
        el('span', { class: 'eyebrow', style: 'margin-bottom:0.3rem', text: 'Next session locked' }),
        el('p', {
          class: 'small', style: 'margin:0',
          text: 'Session ' + (idx + 2) + ' (' + P.fmtShort(next.s.date) + ') opens when you mark this ' +
            'one done, or on its own date — whichever comes first.'
        })
      ]));
    }
    return box;
  }

  /* ----------------------------------------------------------- curriculum */

  /* The curriculum, laid out the way a course handbook is: a programme
     specification, an index of modules, then each module as a specification of
     its own — aim, learning outcomes, teaching, scheme of work, practical work,
     assessment. The content was always this substantial; it was presented as a
     stack of boxes, which made it read like a blog post about training. */

  function specRow(label, value) {
    return el('div', { class: 'spec__row' }, [
      el('dt', { class: 'spec__label', text: label }),
      el('dd', { class: 'spec__value', text: value })
    ]);
  }

  function renderSpec() {
    var d = program.discipline;
    var t = window.Stats.transcript(program, progress);
    var bp = program.blockPlan || P.blockPlan(program.input);
    var tt = totals();

    var box = el('div', { class: 'spec', id: 'sec-spec' });
    box.appendChild(el('div', { class: 'spec__head' }, [
      el('span', { class: 'eyebrow', style: 'margin:0', text: 'Programme specification' }),
      el('span', { class: 'mono tiny muted', text: 'Issued ' + P.fmtDate(program.startDate) })
    ]));

    var dl = el('dl', { class: 'spec__grid' });
    dl.appendChild(specRow('Programme', d.name));
    dl.appendChild(specRow('Field', d.discipline));
    dl.appendChild(specRow('Level on entry', program.levelLabel));
    dl.appendChild(specRow('Exit level at these hours',
      program.verdict.reached ? program.verdict.reached.label : 'Below the first published level'));
    dl.appendChild(specRow('Duration', program.input.weeks + ' weeks · ' +
      P.fmtDate(program.startDate) + ' → ' + P.fmtDate(program.endDate)));
    dl.appendChild(specRow('Notional practice hours', program.totalHours + ' hours across ' +
      tt.sessions + ' scheduled sessions'));
    dl.appendChild(specRow('Contact pattern', bp.trainingDays + ' training day' +
      (bp.trainingDays === 1 ? '' : 's') + ' a week · ' +
      (bp.blocksPerDay === 1 ? 'one sitting' : bp.blocksPerDay + ' sittings') + ' of ' +
      fmtDuration(bp.blockMinutes) +
      (bp.reserveReview ? ' · weekly review of ' + fmtDuration(bp.reviewMinutes) : '')));
    dl.appendChild(specRow('Structure', t.modulesTotal + ' modules · ' + t.creditsTotal +
      ' credits · one credit per scheduled practice hour'));
    dl.appendChild(specRow('Assessment', 'Criterion-referenced gates, one per module. Every criterion ' +
      'requires written evidence and a named check, and modules are assessed in order.'));
    if (d.entryCheck && d.entryCheck.length) {
      dl.appendChild(specRow('Assumed on entry', d.entryCheck.join('; ') + '.'));
    }
    dl.appendChild(specRow('Award', 'Self-certified. This is a training programme, not an accredited ' +
      'qualification: nobody but you signs the transcript, which is exactly why the evidence has to be ' +
      'the kind a second person could check.'));
    box.appendChild(dl);

    if (d.thesis) {
      box.appendChild(el('div', { class: 'spec__thesis' }, [
        el('span', { class: 'eyebrow', text: 'Why this subject' }),
        el('p', { class: 'small', style: 'margin:0;color:var(--ink-2)', text: d.thesis })
      ]));
    }
    return box;
  }

  function renderModuleIndex(locks) {
    var t = window.Stats.transcript(program, progress);
    var table = el('table', { class: 'table modindex' });
    table.appendChild(el('tr', {}, [
      el('th', { text: 'Code' }),
      el('th', { text: 'Module' }),
      el('th', { text: 'Weeks' }),
      el('th', { text: 'Hours' }),
      el('th', { text: 'Sessions' }),
      el('th', { text: 'Assessment' }),
      el('th', { text: 'Status' })
    ]));
    program.phases.forEach(function (ph, i) {
      var m = t.modules[i];
      var lock = locks[i];
      table.appendChild(el('tr', { 'data-status': m.status.toLowerCase().replace(/ /g, '-') }, [
        el('td', { class: 'num transcript__code', text: m.code }),
        el('td', {}, [
          el('button', {
            class: 'linkish', type: 'button', text: ph.name,
            onclick: function () {
              var node = document.getElementById('mod-' + ph.index);
              if (node) node.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }),
          el('div', { class: 'tiny muted', text: ph.objective })
        ]),
        el('td', { class: 'num', text: ph.weekStart + '–' + ph.weekEnd }),
        el('td', { class: 'num', text: ph.hours + ' h' }),
        el('td', { class: 'num', text: m.sessionsDone + '/' + m.sessions }),
        el('td', { class: 'num', text: lock.passed + '/' + lock.criteria }),
        el('td', {}, [el('span', {
          class: 'pill pill--' + (m.awarded ? 'awarded' : (m.locked ? 'locked' : (m.claimable ? 'open' : 'idle'))),
          text: m.status
        })])
      ]));
    });
    return el('div', { class: 'transcript-scroll' }, [table]);
  }

  function modSection(label, node) {
    if (!node) return null;
    return el('div', { class: 'mod-sec' }, [
      el('span', { class: 'mod-sec__label', text: label }),
      node
    ]);
  }

  function renderCurriculum(root) {
    var sec = el('section', { class: 'section section--flush', 'data-view': 'curriculum', id: 'sec-phases' });
    var wrap = el('div', { class: 'wrap' });
    var locks = window.Stats.gateLocks(program, progress);
    var t = window.Stats.transcript(program, progress);

    wrap.appendChild(viewHead('curriculum', 'Curriculum',
      'Each module takes one pillar of the skill, teaches the idea behind it, escalates the work ' +
      'across its weeks, and ends at a gate someone else could mark. Modules run in order, and so do ' +
      'their gates.'));

    wrap.appendChild(renderSpec());

    wrap.appendChild(el('div', { style: 'margin-top:2.5rem' }, [
      el('span', { class: 'eyebrow', text: 'Modules in this programme' }),
      renderModuleIndex(locks)
    ]));

    program.phases.forEach(function (ph, phIdx) {
      var lock = locks[phIdx];
      var m = t.modules[phIdx];
      var node = el('article', { class: 'phase module', id: 'mod-' + ph.index, 'data-status': m.status.toLowerCase().replace(/ /g, '-') });

      /* Module header: the identifiers first, the way a syllabus does it. */
      node.appendChild(el('div', { class: 'module__head' }, [
        el('div', { class: 'module__ident' }, [
          el('span', { class: 'module__code mono', text: m.code }),
          el('h3', {}, [
            document.createTextNode(ph.name),
            ph.compressed ? el('span', { class: 'tag', style: 'margin-left:0.6rem', text: 'compressed' }) : null
          ]),
          el('p', { class: 'module__aim', text: ph.objective })
        ]),
        el('div', { class: 'module__meta' }, [
          metaRow('Weeks', ph.weekStart + '–' + ph.weekEnd),
          metaRow('Dates', P.fmtShort(ph.startDate) + ' → ' + P.fmtShort(ph.endDate)),
          metaRow('Practice hours', String(ph.hours)),
          metaRow('Credits', String(m.credits)),
          metaRow('Sessions', m.sessionsDone + ' of ' + m.sessions + ' logged'),
          el('span', {
            class: 'pill pill--' + (m.awarded ? 'awarded' : (m.locked ? 'locked' : (m.claimable ? 'open' : 'idle'))),
            style: 'margin-top:0.5rem', text: m.status
          })
        ])
      ]));

      /* Learning outcomes, numbered, because the gate criteria are marked
         against them and a numbered list is what makes that checkable. */
      var los = el('ol', { class: 'lo' });
      ph.competencies.forEach(function (c) { los.appendChild(el('li', { text: c })); });
      node.appendChild(modSection('Learning outcomes — on completion you can', los));

      if (ph.teaching) {
        var tt = ph.teaching;
        var brief = el('div', { class: 'brief' }, [
          el('p', { class: 'brief__idea', text: tt.idea }),
          el('div', { class: 'brief__grid' }, [
            el('div', {}, [
              el('span', { class: 'brief__label', text: 'Why it works' }),
              el('p', { class: 'brief__text', text: tt.why })
            ]),
            el('div', {}, [
              el('span', { class: 'brief__label', text: 'The version that does not work' }),
              el('p', { class: 'brief__text', text: tt.misread })
            ]),
            el('div', {}, [
              el('span', { class: 'brief__label', text: 'How to check your own work' }),
              el('p', { class: 'brief__text', text: tt.tell })
            ])
          ])
        ]);
        if (tt.terms && tt.terms.length) {
          var terms = el('div', { class: 'brief__terms' }, [
            el('span', { class: 'brief__label', text: 'Vocabulary you will meet' })
          ]);
          var tdl = el('dl', { class: 'defs defs--tight' });
          tt.terms.forEach(function (tm) {
            tdl.appendChild(el('dt', { text: tm.term }));
            tdl.appendChild(el('dd', { text: tm.meaning }));
          });
          terms.appendChild(tdl);
          brief.appendChild(terms);
        }
        node.appendChild(modSection('What this module is actually teaching', brief));
      }

      if (ph.stages && ph.stages.length) {
        var stages = el('div', {});
        ph.stages.forEach(function (st, i) {
          stages.appendChild(el('div', { class: 'stage' }, [
            el('span', { class: 'stage__n', text: String(i + 1) }),
            el('div', {}, [
              el('div', { class: 'stage__name', text: st.name }),
              el('p', { class: 'stage__work', text: st.work }),
              el('p', { class: 'stage__check', text: 'Done when: ' + st.check })
            ])
          ]));
        });
        node.appendChild(modSection('Scheme of work — how the weeks escalate', stages));
      }

      var drills = el('div', {});
      ph.drills.forEach(function (d) {
        drills.appendChild(el('div', { class: 'drill' }, [
          el('span', { class: 'drill__dose', text: d.dose }),
          el('div', { class: 'drill__name', text: d.name }),
          el('p', { class: 'drill__protocol', text: d.protocol }),
          d.mistake ? el('p', { class: 'drill__mistake', text: 'What usually goes wrong: ' + d.mistake }) : null
        ]));
      });
      node.appendChild(modSection('Practical work — the drills, with doses', drills));

      var mixTable = el('table', { class: 'table' }, [
        el('tr', {}, [el('td', { text: 'Acquire' }), el('td', { class: 'num', text: Math.round(ph.mix.acquire * 100) + '%' })]),
        el('tr', {}, [el('td', { text: 'Drill' }), el('td', { class: 'num', text: Math.round(ph.mix.drill * 100) + '%' })]),
        el('tr', {}, [el('td', { text: 'Produce' }), el('td', { class: 'num', text: Math.round(ph.mix.produce * 100) + '%' })])
      ]);
      node.appendChild(modSection('Delivery — how the sessions divide', el('div', {}, [
        mixTable,
        el('p', {
          class: 'tiny muted', style: 'margin-top:0.75rem',
          text: 'Taking things in drops off as the plan goes on and making things rises. Reading is never most of a week.'
        })
      ])));

      /* Assessment, stated here and marked on the Assessment tab. Keeping the
         criteria visible in the syllabus and the claiming somewhere else is
         deliberate: you should be able to read what you are working toward
         without being one click from ticking it. */
      var critList = el('ol', { class: 'lo lo--crit' });
      ph.milestone.criteria.forEach(function (c, ci) {
        critList.appendChild(el('li', {}, [
          document.createTextNode(c),
          progress.gates[gateKey(ph, ci)]
            ? el('span', { class: 'tag', style: 'margin-left:0.5rem', text: 'passed' })
            : null
        ]));
      });
      node.appendChild(modSection('Assessment — gate: ' + ph.milestone.name, el('div', {}, [
        ph.standard ? el('p', { class: 'phase__standard', text: 'What good looks like: ' + ph.standard }) : null,
        critList,
        el('p', { class: 'tiny muted', style: 'margin:0.75rem 0 0' }, [
          document.createTextNode(
            lock.locked
              ? 'Locked until ' + program.phases[phIdx - 1].name + ' passes in full. '
              : (lock.workReady
                  ? 'Open for assessment. '
                  : 'Opens once ' + lock.work.required + ' of this module\'s ' + lock.work.sessions +
                    ' sessions are logged — ' + lock.work.remaining + ' to go. ')
          )
        ]),
        el('button', {
          class: 'btn btn--small btn--ghost no-print', type: 'button',
          style: 'margin-top:0.5rem',
          text: 'Open the gate in Assessment',
          onclick: function () { goTo('assessment', 'gate-' + ph.index); }
        })
      ])));

      wrap.appendChild(node);
    });

    sec.appendChild(wrap);
    root.appendChild(sec);
  }

  function metaRow(label, value) {
    return el('div', { class: 'module__metarow' }, [
      el('span', { class: 'module__metalabel', text: label }),
      el('span', { class: 'module__metavalue', text: value })
    ]);
  }

  /* ----------------------------------------------------------- assessment */

  /* Gates used to cost one click each, which made the transcript worth about
     as much as the click. They now cost three things: the module before it
     passed, most of the module's own sessions logged, and, per criterion, a
     written statement of what you did plus who or what checked it.

     None of that can stop someone lying to themselves. It can stop a gate
     being passed absent-mindedly, which is most of what a bare checkbox
     was. */

  function requirementRow(met, text) {
    return el('div', { class: 'req', 'data-met': String(met) }, [
      el('span', { class: 'req__mark', text: met ? '✓' : '·' }),
      el('span', { class: 'req__text', text: text })
    ]);
  }

  function renderCriterion(ph, ci, lock) {
    var key = gateKey(ph, ci);
    var ev = window.Stats.criterionEvidence(progress, ph, ci);
    var passed = !!progress.gates[key];
    var editable = lock.claimable && !lock.sealed;
    var claimable = editable && ev.complete;

    var state = passed ? 'passed' : (ev.complete ? 'ready' : 'evidence');
    var box = el('div', { class: 'crit', 'data-state': state });

    box.appendChild(el('div', { class: 'crit__head' }, [
      el('span', { class: 'crit__no mono', text: 'C' + (ci + 1) }),
      el('span', { class: 'crit__text', text: ph.milestone.criteria[ci] }),
      el('span', {
        class: 'crit__state',
        'data-state': state,
        text: passed ? 'Passed' : (ev.complete ? 'Ready to claim' : 'Evidence needed')
      })
    ]));

    if (!lock.claimable) {
      /* Nothing to fill in yet — the reason is printed once at gate level. */
      if (ev.statement) {
        box.appendChild(el('p', { class: 'crit__saved small muted', text: ev.statement }));
      }
      return box;
    }

    if (lock.sealed) {
      box.appendChild(el('div', { class: 'crit__saved' }, [
        el('p', { class: 'small', style: 'margin:0 0 0.4rem', text: ev.statement || 'No statement recorded.' }),
        el('p', { class: 'tiny muted', style: 'margin:0', text: 'Checked by: ' + (ev.verifier || '—') +
          (ev.at ? ' · recorded ' + ev.at : '') })
      ]));
      return box;
    }

    /* The evidence itself. Saved on blur so the page is not rebuilt under the
       cursor, with a live counter so the minimum is not a surprise. */
    var stField = el('div', { class: 'record__field' }, [
      el('span', { class: 'record__label', text: 'Evidence — what you did, and what it produced' })
    ]);
    var counter = el('span', {
      class: 'tiny muted',
      text: ev.hasStatement
        ? 'Long enough.'
        : ev.statementShort + ' more character' + (ev.statementShort === 1 ? '' : 's') + ' needed.'
    });
    var ta = el('textarea', {
      style: 'min-height:4.5rem',
      placeholder: 'Not "I did it". What you produced, when, and how it went — the detail a stranger ' +
        'would need to agree with you.'
    });
    ta.value = ev.statement || '';
    ta.addEventListener('input', function () {
      var left = window.Stats.statementMin - ta.value.trim().length;
      counter.textContent = left <= 0
        ? 'Long enough.'
        : left + ' more character' + (left === 1 ? '' : 's') + ' needed.';
    });
    ta.addEventListener('change', function () {
      progress = window.Store.setGateEvidence(program.id, key, { statement: ta.value.trim() });
      render();
    });
    stField.appendChild(ta);
    stField.appendChild(counter);
    box.appendChild(stField);

    var vField = el('div', { class: 'record__field' }, [
      el('span', { class: 'record__label', text: 'Checked by — the person, audience or record that verified it' })
    ]);
    var vi = el('input', {
      type: 'text',
      placeholder: 'A name, a client, a published result, a recording you can play back'
    });
    vi.value = ev.verifier || '';
    vi.addEventListener('change', function () {
      progress = window.Store.setGateEvidence(program.id, key, { verifier: vi.value.trim() });
      render();
    });
    vField.appendChild(vi);
    box.appendChild(vField);

    box.appendChild(el('label', { class: 'check crit__claim' }, [
      el('input', {
        type: 'checkbox',
        checked: passed ? 'checked' : null,
        disabled: claimable ? null : 'disabled',
        onchange: function () {
          if (!claimable) return;
          progress = window.Store.toggleGateCriterion(program.id, key);
          render();
        }
      }),
      el('span', {
        text: passed
          ? 'Claimed on the evidence above. Untick to withdraw the claim.'
          : (claimable
              ? 'Claim this criterion — the evidence above is written and it was checked'
              : 'Fill in both fields before you can claim this')
      })
    ]));

    return box;
  }

  function renderGate(ph, phIdx, locks) {
    var lock = locks[phIdx];
    var gate = el('div', {
      class: 'gate',
      id: 'gate-' + ph.index,
      'data-locked': String(lock.locked),
      'data-state': lock.state
    });

    gate.appendChild(el('div', { class: 'gate__head' }, [
      el('div', {}, [
        el('span', { class: 'mono tiny muted', text: 'Module ' + ph.index + ' · ' + ph.name }),
        el('div', { class: 'gate__title', text: 'Gate: ' + ph.milestone.name })
      ]),
      el('span', {
        class: 'gate__state',
        'data-state': lock.locked ? 'locked' : (lock.complete ? 'passed' : (lock.workReady ? 'open' : 'pending')),
        text: lock.locked
          ? 'Locked'
          : (lock.complete ? 'Passed' : (lock.workReady ? lock.passed + ' of ' + lock.criteria : 'Not open yet'))
      })
    ]));

    /* What has to be true before this gate can be sat, ticked off as it
       becomes true. Three conditions, all visible, none of them a click. */
    var reqs = el('div', { class: 'gate__reqs' }, [
      el('span', { class: 'eyebrow', style: 'margin-bottom:0.4rem', text: 'To sit this gate' })
    ]);
    reqs.appendChild(requirementRow(
      !lock.locked,
      phIdx === 0
        ? 'This is the first module, so nothing blocks it.'
        : 'Module ' + (ph.index - 1) + ' (' + program.phases[phIdx - 1].milestone.name + ') passed in full' +
          (lock.locked ? ' — currently ' + locks[phIdx - 1].passed + ' of ' + locks[phIdx - 1].criteria : '')
    ));
    reqs.appendChild(requirementRow(
      lock.work.met,
      lock.work.required + ' of the module\'s ' + lock.work.sessions + ' sessions logged (' +
        Math.round(window.Stats.workRequired * 100) + '%) — ' + lock.work.done + ' so far' +
        (lock.work.met ? '' : ', ' + lock.work.remaining + ' to go')
    ));
    reqs.appendChild(requirementRow(
      lock.evidenced === lock.criteria,
      'Written evidence and a named check on all ' + lock.criteria + ' criteria — ' +
        lock.evidenced + ' complete'
    ));
    gate.appendChild(reqs);

    if (lock.locked) {
      var prev = lock.blockedBy;
      gate.appendChild(el('p', { class: 'gate__lockline' }, [
        document.createTextNode(
          'Shut until phase ' + prev.index + ' passes. "' + prev.milestone.name + '" has ' +
          locks[phIdx - 1].passed + ' of ' + locks[phIdx - 1].criteria +
          ' criteria ticked. The plan\'s claim is that this module is built on that one, so ' +
          'claiming this gate first would not mean anything.'
        )
      ]));
      gate.appendChild(el('button', {
        class: 'walk__link no-print', type: 'button',
        text: 'Go to phase ' + prev.index + '’s gate →',
        onclick: function () {
          var node = document.getElementById('gate-' + prev.index);
          if (node) node.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }));
    } else if (!lock.work.met) {
      gate.appendChild(el('p', { class: 'gate__lockline' }, [
        document.createTextNode(
          'Open, but not yet sittable. You have logged ' + lock.work.done + ' of this module\'s ' +
          lock.work.sessions + ' sessions. A gate is a claim about work you did; ' +
          lock.work.remaining + ' more session' + (lock.work.remaining === 1 ? '' : 's') +
          ' and it can be assessed.'
        )
      ]));
    }

    var list = el('div', { class: 'gate__list' });
    ph.milestone.criteria.forEach(function (_, ci) {
      list.appendChild(renderCriterion(ph, ci, lock));
    });
    gate.appendChild(list);

    if (lock.complete) {
      gate.appendChild(el('div', { class: 'gate__award' }, [
        el('div', {}, [
          el('span', { class: 'eyebrow', style: 'margin-bottom:0.25rem', text: 'Module awarded' }),
          el('p', {
            class: 'small', style: 'margin:0',
            text: lock.sealed
              ? 'All ' + lock.criteria + ' criteria claimed on written evidence. The record is sealed; ' +
                'reopen it if a claim turns out to be wrong.'
              : 'Reopened for editing. Seal it again when the evidence is right.'
          })
        ]),
        el('button', {
          class: 'btn btn--small btn--ghost no-print', type: 'button',
          text: lock.sealed ? 'Reopen this module' : 'Seal it again',
          onclick: function () {
            progress = window.Store.toggleModuleReopen(program.id, ph.index);
            render();
          }
        })
      ]));
    }

    return gate;
  }

  function renderAssessment(root) {
    var sec = el('section', { class: 'section section--flush', 'data-view': 'assessment', id: 'sec-gates' });
    var wrap = el('div', { class: 'wrap' });
    var locks = window.Stats.gateLocks(program, progress);

    wrap.appendChild(viewHead('assessment', 'Assessment',
      'One gate per module, marked against criteria another person could check. Gates are sat in ' +
      'order, they open only once the module\'s work is actually done, and every criterion needs a ' +
      'written statement and a named check before it can be claimed.'));

    wrap.appendChild(el('div', { class: 'notice notice--flat', style: 'margin-bottom:2rem;max-width:70ch' }, [
      el('span', { class: 'small', text: 'A tick here is a record of evidence, not a substitute for it. ' +
        'Write the statement as though the person who is going to disagree with you will read it, ' +
        'because in the version of this that matters, they will.' })
    ]));

    program.phases.forEach(function (ph, i) {
      wrap.appendChild(renderGate(ph, i, locks));
    });

    wrap.appendChild(renderTranscript());

    sec.appendChild(wrap);
    root.appendChild(sec);
  }

  /* ----------------------------------------------------------- transcript */

  function renderTranscript() {
    var t = window.Stats.transcript(program, progress);
    var holder = el('div', { id: 'sec-transcript', style: 'margin-top:4rem' });

    holder.appendChild(el('div', { class: 'section__head', style: 'margin-bottom:1.5rem' }, [
      el('div', { class: 'section__num', text: '·' }),
      el('div', {}, [
        el('h3', { text: 'Transcript' }),
        el('p', {
          class: 'small muted', style: 'margin-top:0.6rem;max-width:66ch',
          text: 'Each module is worth credits equal to its practice hours. Credits build as you log ' +
            'sessions, and the module is awarded in full when every gate criterion passes. Hours are ' +
            'attendance; the award is evidence.'
        })
      ])
    ]));

    holder.appendChild(el('div', { class: 'transcript__standing' }, [
      el('div', {}, [
        el('span', { class: 'eyebrow', style: 'margin-bottom:0.3rem', text: 'Credits earned' }),
        el('div', { class: 'status__figure' }, [
          el('span', { class: 'status__now', text: String(t.creditsEarned) }),
          el('span', { class: 'status__of', text: ' of ' + t.creditsTotal })
        ])
      ]),
      el('div', {}, [
        el('span', { class: 'eyebrow', style: 'margin-bottom:0.3rem', text: 'Modules awarded' }),
        el('div', { class: 'status__figure' }, [
          el('span', { class: 'status__now', text: String(t.modulesAwarded) }),
          el('span', { class: 'status__of', text: ' of ' + t.modulesTotal })
        ])
      ]),
      el('div', { style: 'flex:1;min-width:12rem' }, [
        el('span', { class: 'eyebrow', style: 'margin-bottom:0.5rem', text: 'Toward the full plan' }),
        el('div', { class: 'meter meter--lg' }, [
          el('div', { class: 'meter__fill', style: 'width:' + t.creditsPct + '%' })
        ]),
        el('p', { class: 'tiny muted', style: 'margin:0.5rem 0 0', text: t.creditsPct + '% of the credits on this plan' })
      ])
    ]));

    var table = el('table', { class: 'table transcript', style: 'margin-top:2rem' });
    table.appendChild(el('tr', {}, [
      el('th', { text: 'Code' }),
      el('th', { text: 'Module' }),
      el('th', { text: 'Weeks' }),
      el('th', { text: 'Sessions' }),
      el('th', { text: 'Gate' }),
      el('th', { text: 'Credits' }),
      el('th', { text: 'Status' })
    ]));
    t.modules.forEach(function (m) {
      table.appendChild(el('tr', { 'data-status': m.awarded ? 'awarded' : m.status.toLowerCase().replace(/ /g, '-') }, [
        el('td', { class: 'num transcript__code', text: m.code }),
        el('td', {}, [
          el('div', { style: 'font-weight:500', text: m.title }),
          el('div', { class: 'tiny muted', text: m.objective })
        ]),
        el('td', { class: 'num', text: m.weeks }),
        el('td', { class: 'num', text: m.sessionsDone + '/' + m.sessions }),
        el('td', { class: 'num', text: m.criteriaPassed + '/' + m.criteria }),
        el('td', { class: 'num transcript__credits', text: m.earned + '/' + m.credits }),
        el('td', {}, [el('span', {
          class: 'pill pill--' + (m.awarded ? 'awarded' : (m.locked ? 'locked' : (m.claimable ? 'open' : 'idle'))),
          text: m.status
        })])
      ]));
    });
    holder.appendChild(el('div', { class: 'transcript-scroll' }, [table]));

    if (t.current) {
      holder.appendChild(el('p', { class: 'small muted', style: 'margin-top:1.25rem' }, [
        document.createTextNode('Currently reading ' + t.current.code + ' ' + t.current.title + '. '),
        el('span', {
          text: t.current.criteria - t.current.criteriaPassed === 0
            ? 'All criteria passed; tick the last one to take the credits.'
            : (t.current.criteria - t.current.criteriaPassed) +
              ' gate criteria left to award its ' + t.current.credits + ' credits.'
        })
      ]));
    }

    return holder;
  }

  /* -------------------------------------------------------------- schedule */

  function renderSchedule(root, st) {
    var sec = el('section', { class: 'section section--flush', 'data-view': 'schedule', id: 'sec-schedule' });
    var wrap = el('div', { class: 'wrap' });
    var now = new Date();

    wrap.appendChild(viewHead('schedule', 'Week by week',
      'Every session, dated. Tick them off as you go — the count is the only honest record of whether ' +
      'you are running this or just looking at it.'));

    /* The pace line again, in one sentence, because this is the view where
       "am I behind" is the obvious question. */
    wrap.appendChild(el('div', { class: 'notice', 'data-state': st.pace.state, style: 'margin-bottom:1.5rem' }, [
      el('span', { class: 'eyebrow', style: 'margin-bottom:0.25rem', text: paceHeadline(st.pace) }),
      el('span', { class: 'small', text: st.pace.line })
    ]));

    var controls = el('div', { class: 'btn-row no-print', style: 'margin-bottom:1.5rem' }, [
      el('button', {
        class: 'btn btn--small btn--ghost', type: 'button', text: 'Expand all',
        onclick: function () {
          program.schedule.forEach(function (w) { weekOpen[w.number] = true; });
          render();
        }
      }),
      el('button', {
        class: 'btn btn--small btn--ghost', type: 'button', text: 'Collapse all',
        onclick: function () {
          program.schedule.forEach(function (w) { weekOpen[w.number] = false; });
          render();
        }
      }),
      el('button', {
        class: 'btn btn--small btn--ghost', type: 'button', text: 'Jump to the session I am on',
        onclick: function () { openSession(currentIndex()); }
      })
    ]);
    wrap.appendChild(controls);

    program.schedule.forEach(function (w) {
      var isCurrent = now >= w.startDate && now <= P.addDays(w.endDate, 1);
      var doneCount = w.sessions.filter(function (s) {
        return progress.sessions[sessionKey(w, s)];
      }).length;

      var open = Object.prototype.hasOwnProperty.call(weekOpen, w.number)
        ? weekOpen[w.number]
        : isCurrent;

      var node = el('div', {
        class: 'week',
        'data-open': String(open),
        'data-consolidation': String(!!w.consolidation),
        'data-gate': String(!!w.gate)
      });

      var head = el('button', {
        class: 'week__head', type: 'button',
        onclick: function () {
          weekOpen[w.number] = node.getAttribute('data-open') !== 'true';
          node.setAttribute('data-open', String(weekOpen[w.number]));
        }
      }, [
        el('span', { class: 'week__n', text: 'WEEK ' + String(w.number).padStart(2, '0') }),
        el('span', { class: 'week__theme' }, [
          document.createTextNode(w.theme),
          isCurrent ? el('span', { class: 'tag tag--accent', style: 'margin-left:0.5rem', text: 'current' }) : null
        ]),
        el('span', { class: 'week__hours', text: doneCount + '/' + w.sessions.length + ' · ' + fmtDuration(w.minutes) })
      ]);
      node.appendChild(head);

      var body = el('div', { class: 'week__body' });
      body.appendChild(el('p', {
        class: 'tiny muted', style: 'margin:0 0 0.75rem',
        text: P.fmtDate(w.startDate) + ' – ' + P.fmtDate(w.endDate) + ' · ' + w.phase.name +
          (w.stage ? ' · ' + w.stage.stage.name + ': ' + w.stage.stage.work : '')
      }));

      w.sessions.forEach(function (s) {
        var key = sessionKey(w, s);
        var entry = null;
        flat.forEach(function (f) { if (f.key === key) entry = f; });
        var unlocked = entry ? isUnlocked(entry.i) : true;

        body.appendChild(el('div', { class: 'session', 'data-locked': String(!unlocked) }, [
          el('span', { class: 'session__date' }, [
            document.createTextNode(P.fmtShort(s.date)),
            s.blocks > 1
              ? el('span', { class: 'session__block', text: 'sitting ' + s.block + '/' + s.blocks })
              : null
          ]),
          el('span', { class: 'session__type', 'data-t': s.type.key, text: s.type.label }),
          el('span', { class: 'session__focus' }, [
            unlocked
              ? el('button', {
                  class: 'linkish', type: 'button', text: s.title,
                  onclick: function () { openSession(entry.i); }
                })
              : el('span', { text: s.title }),
            s.detail ? el('div', { class: 'tiny muted', style: 'margin-top:0.2rem', text: s.detail }) : null,
            s.drill
              ? el('div', { class: 'tiny muted', style: 'margin-top:0.2rem' }, [
                  el('span', { class: 'mono', text: s.drill.dose + ' · ' }),
                  document.createTextNode(s.drill.protocol)
                ])
              : null,
            stepList(s.steps, s.check),
            !unlocked
              ? el('div', { class: 'tiny muted', style: 'margin-top:0.3rem', text: lockReason(entry.i) })
              : null
          ]),
          el('label', { class: 'check', style: 'border:0;padding:0;justify-content:flex-end' }, [
            el('input', {
              type: 'checkbox',
              'aria-label': 'Mark session complete',
              checked: progress.sessions[key] ? 'checked' : null,
              onchange: function () {
                progress = window.Store.toggleSession(program.id, key, s.hours);
                render();
              }
            }),
            el('span', { class: 'session__hours', text: fmtDuration(s.minutes) })
          ])
        ]));
      });

      if (w.gate) {
        body.appendChild(el('div', { class: 'notice', style: 'margin-top:1rem' }, [
          el('span', { class: 'small' }, [
            el('strong', { text: 'Gate week: ' + w.gate.name + '. ' }),
            document.createTextNode('Sit the gate on the Assessment tab before starting the next module.')
          ])
        ]));
      }

      node.appendChild(body);
      wrap.appendChild(node);
    });

    sec.appendChild(wrap);
    root.appendChild(sec);
  }

  /* -------------------------------------------------------------- handbook */

  function renderHandbook(root) {
    var sec = el('section', { class: 'section section--flush', 'data-view': 'handbook' });
    var wrap = el('div', { class: 'wrap' });

    wrap.appendChild(viewHead('handbook', 'Handbook',
      'What these hours actually buy, what to set up before week 1, and the reference material the ' +
      'plan assumes you have to hand.'));

    /* -- what the hours buy -- */
    var v = program.verdict;
    var vsec = el('div', { id: 'sec-verdict' });
    vsec.appendChild(el('div', { class: 'section__head', style: 'margin-bottom:1.5rem' }, [
      el('div', { class: 'section__num', text: '·' }),
      el('div', {}, [
        el('h3', { text: 'What these hours buy' }),
        el('p', {
          class: 'small muted', style: 'margin-top:0.6rem;max-width:66ch',
          text: 'Written down before you start, so this cannot quietly move the goalposts later.'
        })
      ])
    ]));

    var box = el('div', { class: 'verdict' }, [
      el('div', { class: 'verdict__head' }, [
        el('span', { class: 'verdict__level', text: v.headline }),
        el('span', { class: 'mono small muted', text: v.effectiveHours + ' effective hours' })
      ]),
      el('p', { style: 'max-width:70ch', text: v.statement })
    ]);

    var ladder = el('div', { class: 'ladder' });
    P.levels.forEach(function (lv) {
      var need = program.discipline.hours[lv.key];
      ladder.appendChild(el('div', {
        class: 'ladder__row',
        'data-state': v.effectiveHours >= need ? 'reached' : 'beyond'
      }, [
        el('span', { class: 'ladder__name', text: lv.label }),
        el('span', { class: 'ladder__hours', text: need + ' h' }),
        el('span', { class: 'small', text: program.discipline.proofs[lv.key] })
      ]));
    });
    box.appendChild(ladder);

    box.appendChild(el('div', { class: 'grid grid--2', style: 'margin-top:1.5rem' }, [
      el('div', {}, [
        el('h4', { text: 'What you will be able to do' }),
        el('p', { class: 'small muted', style: 'margin:0.35rem 0 0', text: v.owns })
      ]),
      el('div', {}, [
        el('h4', { text: 'What you still will not' }),
        el('p', { class: 'small muted', style: 'margin:0.35rem 0 0', text: v.lacks })
      ])
    ]));

    if (v.levers.length) {
      var levers = el('div', { class: 'levers' });
      levers.appendChild(el('span', { class: 'eyebrow', text: 'If you want more than that' }));
      v.levers.forEach(function (l) {
        levers.appendChild(el('div', { class: 'lever' }, [
          el('b', { text: l.name }),
          el('span', { class: 'muted', text: l.detail })
        ]));
      });
      box.appendChild(levers);
    }
    vsec.appendChild(box);

    if (program.scope.dropped.length) {
      var cut = el('div', { class: 'notice', style: 'margin-top:1.5rem' });
      cut.appendChild(el('span', { class: 'eyebrow', style: 'margin-bottom:0.35rem', text: 'Left out on purpose' }));
      cut.appendChild(el('p', {
        class: 'small', style: 'margin:0 0 0.75rem',
        text: 'Your hours cover ' + program.scope.included.length + ' pillars properly. The rest are ' +
          'cut rather than thinned down, because half a pillar teaches you very little. Cut:'
      }));
      var ul = el('ul', { class: 'list-clean' });
      program.scope.dropped.forEach(function (d) {
        ul.appendChild(el('li', { text: d.name + '. ' + d.objective }));
      });
      cut.appendChild(ul);
      vsec.appendChild(cut);
    }

    v.warnings.forEach(function (warn) {
      vsec.appendChild(el('div', { class: 'notice', style: 'margin-top:0.75rem' }, [
        el('span', { class: 'small', text: warn })
      ]));
    });

    if (program.discipline.disclaimer) {
      vsec.appendChild(el('div', { class: 'notice notice--flat', style: 'margin-top:0.75rem' }, [
        el('span', { class: 'small', text: program.discipline.disclaimer })
      ]));
    }
    wrap.appendChild(vsec);

    /* -- before week 1 -- */
    var setup = program.setup;
    if (setup) {
      var ssec = el('div', { id: 'sec-setup', style: 'margin-top:4rem' });
      ssec.appendChild(el('div', { class: 'section__head', style: 'margin-bottom:1.5rem' }, [
        el('div', { class: 'section__num', text: '·' }),
        el('div', {}, [
          el('h3', { text: 'Before week 1' }),
          el('p', {
            class: 'small muted', style: 'margin-top:0.6rem;max-width:66ch',
            text: 'Do this before the first session. Most plans fail at the start, because nothing was ' +
              'set up and there was nowhere to get feedback.'
          })
        ])
      ]));

      var grid = el('div', { class: 'grid grid--2' });

      var tools = el('div', {}, [el('span', { class: 'eyebrow', text: 'What you need' })]);
      var tl = el('ul', { class: 'list-clean' });
      setup.tools.forEach(function (t) { tl.appendChild(el('li', { text: t })); });
      tools.appendChild(tl);
      grid.appendChild(tools);

      grid.appendChild(el('div', {}, [
        el('span', { class: 'eyebrow', text: 'Where the feedback comes from' }),
        el('p', { class: 'small', style: 'margin:0;color:var(--ink-2)', text: setup.arena })
      ]));

      var base = el('div', { style: 'grid-column:1/-1' }, [
        el('span', { class: 'eyebrow', text: 'Measure your baseline today' }),
        el('p', {
          class: 'small muted', style: 'margin:0 0 0.5rem',
          text: 'Without this you will not be able to tell later whether any of it worked.'
        })
      ]);
      var bl = stepList(setup.baseline, null);
      if (bl) base.appendChild(bl);
      grid.appendChild(base);

      ssec.appendChild(grid);
      ssec.appendChild(el('div', { class: 'notice', style: 'margin-top:1.5rem' }, [
        el('span', { class: 'small', text: setup.firstWeek })
      ]));
      wrap.appendChild(ssec);
    }

    /* -- reference -- */
    var d = program.discipline;
    var rsec = el('div', { id: 'sec-reference', style: 'margin-top:4rem' });
    rsec.appendChild(el('div', { class: 'section__head', style: 'margin-bottom:1.5rem' }, [
      el('div', { class: 'section__num', text: '·' }),
      el('div', {}, [el('h3', { text: 'Reference' })])
    ]));

    var rgrid = el('div', { class: 'grid grid--2' });

    var metrics = el('div', {}, [el('span', { class: 'eyebrow', text: 'What to measure' })]);
    var mt = el('table', { class: 'table' });
    d.metrics.forEach(function (m) {
      mt.appendChild(el('tr', {}, [
        el('td', { class: 'table__key', text: m.name }),
        el('td', { class: 'muted', text: m.method })
      ]));
    });
    metrics.appendChild(mt);
    rgrid.appendChild(metrics);

    var fails = el('div', {}, [el('span', { class: 'eyebrow', text: 'Known failure modes' })]);
    var ft = el('table', { class: 'table' });
    d.failureModes.forEach(function (f) {
      ft.appendChild(el('tr', {}, [
        el('td', { class: 'table__key', text: f.name }),
        el('td', { class: 'muted', text: f.fix })
      ]));
    });
    fails.appendChild(ft);
    rgrid.appendChild(fails);

    var arena = el('div', {}, [
      el('span', { class: 'eyebrow', text: 'Where the feedback comes from' }),
      el('p', {
        class: 'small muted',
        text: 'Pick at least one of these before week two. Practising with nobody watching plateaus quickly, and quietly.'
      })
    ]);
    var al = el('ul', { class: 'list-clean' });
    d.arena.forEach(function (a) { al.appendChild(el('li', { text: a })); });
    arena.appendChild(al);
    rgrid.appendChild(arena);

    var lib = el('div', {}, [
      el('span', { class: 'eyebrow', text: 'Library' }),
      el('p', {
        class: 'small muted',
        text: 'Read during your acquire sessions and not outside them. Reading past that budget is comfortable and does not train anything.'
      })
    ]);
    var lt = el('table', { class: 'table' });
    d.library.forEach(function (b) {
      lt.appendChild(el('tr', {}, [
        el('td', {}, [
          el('div', { style: 'font-weight:500', text: b.title }),
          el('div', { class: 'tiny muted', text: b.author })
        ]),
        el('td', { class: 'muted', text: b.note })
      ]));
    });
    lib.appendChild(lt);
    rgrid.appendChild(lib);

    rsec.appendChild(rgrid);
    wrap.appendChild(rsec);

    sec.appendChild(wrap);
    root.appendChild(sec);
  }

  /* ------------------------------------------------------------------ log */

  function renderLog(root) {
    var sec = el('section', { class: 'section section--flush', 'data-view': 'log', id: 'sec-log' });
    var wrap = el('div', { class: 'wrap' });

    wrap.appendChild(viewHead('log', 'Session log',
      'Three lines a session: what you practised, what was hard, what changes next time. This is how ' +
      'the plan corrects itself, and it is the difference between practising and just repeating.'));

    var input = el('textarea', {
      id: 'log-input',
      placeholder: 'Practised: cold opens, 6 reps.\nHard: still rushing the first pause.\nNext: metronome drill before recording.'
    });
    wrap.appendChild(el('div', { class: 'card no-print', style: 'margin-bottom:2rem' }, [
      input,
      el('div', { class: 'btn-row', style: 'margin-top:1rem' }, [
        el('button', {
          class: 'btn btn--small', type: 'button', text: 'Add entry',
          onclick: function () {
            var text = input.value.trim();
            if (!text) { window.App.toast('Nothing to log yet.'); return; }
            progress = window.Store.addLog(program.id, text);
            render();
            window.App.toast('Logged.');
          }
        })
      ])
    ]));

    if (!progress.logs.length) {
      wrap.appendChild(el('div', { class: 'empty' }, [
        el('p', { class: 'small', style: 'margin:0', text: 'Nothing logged yet.' })
      ]));
    } else {
      progress.logs.forEach(function (entry) {
        wrap.appendChild(el('div', { class: 'archive-item' }, [
          el('div', { class: 'archive-item__date', text: entry.date }),
          el('div', {}, [
            el('p', { class: 'small', style: 'margin:0;white-space:pre-wrap', text: entry.text }),
            el('button', {
              class: 'btn btn--small btn--ghost no-print', type: 'button',
              style: 'margin-top:0.5rem', text: 'Delete',
              onclick: function () {
                progress = window.Store.deleteLog(program.id, entry.at);
                render();
              }
            })
          ])
        ]));
      });
    }

    /* Exports and the destructive controls live at the end of the log, which
       is the one view nobody lands on by accident. */
    wrap.appendChild(el('div', { style: 'margin-top:4rem' }, [
      el('span', { class: 'eyebrow', text: 'Take it with you' }),
      exportRow(),
      el('p', {
        class: 'tiny muted', style: 'margin-top:1rem',
        text: 'The plan and everything logged against it live in this browser only. An export is the ' +
          'only copy that survives clearing your site data.'
      })
    ]));

    wrap.appendChild(el('div', { class: 'no-print', style: 'margin-top:2.5rem' }, [
      el('span', { class: 'eyebrow', text: 'Start over' }),
      el('div', { class: 'btn-row' }, [
        el('a', { class: 'btn btn--small btn--ghost', href: 'index.html#commission', text: 'Rebuild this plan' }),
        el('button', {
          class: 'btn btn--small btn--ghost', type: 'button', text: 'Delete plan and progress',
          onclick: function () {
            if (confirm('Delete this plan and everything you have logged against it? There is no undo.')) {
              window.Store.clearProgram();
              location.href = 'index.html#commission';
            }
          }
        })
      ]),
      el('p', {
        class: 'tiny muted', style: 'margin-top:1rem',
        text: 'Rebuilding with different numbers replaces this plan. Export it first if you want to keep it.'
      })
    ]));

    sec.appendChild(wrap);
    root.appendChild(sec);
  }

  /* --------------------------------------------------------------- empty */

  function renderEmpty(root) {
    root.innerHTML = '';
    var wrap = el('div', { class: 'wrap', style: 'padding-block:clamp(3rem,10vw,7rem);max-width:60ch' });
    wrap.appendChild(el('span', { class: 'eyebrow', text: 'No program saved' }));
    wrap.appendChild(el('h1', { style: 'font-size:clamp(2rem,5vw,3rem)', text: 'Nothing here yet.' }));
    wrap.appendChild(el('p', {
      class: 'lede', style: 'margin-top:1rem',
      text: 'Plans are stored in this browser and nowhere else. Build one and it will show up here, dated and ready to run.'
    }));
    wrap.appendChild(el('div', { class: 'btn-row', style: 'margin-top:2rem' }, [
      el('a', { class: 'btn', href: 'index.html#commission', text: 'Build a plan' }),
      el('a', { class: 'btn btn--ghost', href: 'index.html#disciplines', text: 'Browse disciplines' })
    ]));
    root.appendChild(wrap);
  }

  /* -------------------------------------------------------------- render */

  /* Only the active view is built. That is the whole reason the page stopped
     being four thousand pixels of everything. Printing is the exception: a
     printed plan should be the whole plan, so print builds every view. */
  function render() {
    var root = document.getElementById('program-root');
    if (!program) { renderEmpty(root); return; }

    progress = window.Store.getProgress(program.id);
    buildFlat();

    var st = window.Stats.build(program, progress, new Date());
    var scrollY = window.scrollY;

    root.innerHTML = '';
    renderPlanBar(root, st);

    var body = el('div', { id: 'view-root', 'data-tab': activeTab });
    root.appendChild(body);

    switch (activeTab) {
      case 'session': renderSessionView(body); break;
      case 'curriculum': renderCurriculum(body); break;
      case 'schedule': renderSchedule(body, st); break;
      case 'assessment': renderAssessment(body); break;
      case 'handbook': renderHandbook(body); break;
      case 'log': renderLog(body); break;
      default: renderOverview(body, st);
    }

    window.scrollTo(0, scrollY);
  }

  /* Which tab to open on. The URL wins, then wherever you were last, then the
     overview. */
  function initialTab() {
    var hash = (location.hash || '').replace('#', '');
    if (tabById(hash)) return hash;
    var saved = window.Store.getView();
    if (saved && tabById(saved.tab)) return saved.tab;
    return 'overview';
  }

  document.addEventListener('DOMContentLoaded', function () {
    program = window.Store.loadProgram();
    if (program) {
      document.title = program.discipline.name + ' plan · Skill Trainer';
      progress = window.Store.getProgress(program.id);
      buildFlat();
      activeTab = initialTab();
      var saved = window.Store.getView();
      if (saved && typeof saved.session === 'number') viewIndex = saved.session;
    }
    render();
  });

  window.addEventListener('hashchange', function () {
    var hash = (location.hash || '').replace('#', '');
    if (program && tabById(hash) && hash !== activeTab) goTo(hash);
  });
})();
