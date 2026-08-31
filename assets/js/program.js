/*
 * program.js — renders the saved program: verdict, phases, dated schedule,
 * gates, progress and exports.
 */

(function () {
  'use strict';

  var el = window.App.el;
  var P = window.Planner;
  var program = null;
  var progress = null;

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

  /* "2.17 hours" is not how anyone describes a session, and a bare "488"
     gets read as hours. One formatter, defined in the planner. */
  var fmtDuration = window.Planner.fmtDuration;

  /* Sections carry ids so the walkthrough can send you to the right one
     instead of telling you to scroll. */
  function jumpTo(id) {
    return function (ev) {
      ev.preventDefault();
      var node = document.getElementById(id);
      if (node) node.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
  }

  function sessionKey(week, session) { return 'w' + week.number + 'd' + session.day; }
  function gateKey(phase, i) { return 'p' + phase.index + 'c' + i; }

  function sameDay(a, b) {
    return a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate();
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

  /* -------------------------------------------------------------- status */

  /* The panel a returning user lands on. Hours banked against the next level
     is the headline, because that is the number the rest of the site is built
     on and it is earned rather than awarded. */
  function renderStatus() {
    var st = window.Stats.build(program, progress, new Date());
    var l = st.ladder;

    var panel = el('div', { class: 'status', 'data-state': st.momentum.state });

    /* Headline: the credits bar. */
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

    /* Three things that change between visits. */
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

    /* Where you stand, said plainly. */
    panel.appendChild(el('p', { class: 'status__momentum', text: st.momentum.line }));

    /* What your own scores say about how the practice is pitched. */
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

    /* What you have actually reached, and the next one along. */
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

  /* ---------------------------------------------------------------- head */

  function renderHead(root) {
    var i = program.input;
    var t = totals();
    var bp = program.blockPlan || P.blockPlan(i);
    var sec = el('section', { class: 'wrap', style: 'padding-block:clamp(2.5rem,6vw,4.5rem)' });

    sec.appendChild(el('span', { class: 'eyebrow', text: program.discipline.discipline + ' · training plan' }));
    sec.appendChild(el('h1', { style: 'font-size:clamp(2.2rem,5vw,3.6rem)', text: program.discipline.name }));
    sec.appendChild(el('p', {
      class: 'lede',
      style: 'margin-top:1rem',
      text: program.discipline.tagline
    }));

    if (i.objective) {
      sec.appendChild(el('div', {
        class: 'notice notice--flat',
        style: 'margin-top:1.5rem;max-width:68ch'
      }, [
        el('span', { class: 'eyebrow', style: 'margin-bottom:0.25rem', text: 'What you said you wanted' }),
        el('span', { class: 'small', text: i.objective })
      ]));
    }

    var stats = el('div', { class: 'grid grid--4', style: 'margin-top:2.5rem' });
    [
      [program.totalHours + ' h', 'Total practice hours'],
      [i.weeks + ' wk', 'Horizon'],
      [program.phases.length, 'Phases and gates'],
      [t.sessions, 'Scheduled sessions']
    ].forEach(function (pair) {
      stats.appendChild(el('div', { class: 'stat' }, [
        el('span', { class: 'stat__value', text: String(pair[0]) }),
        el('span', { class: 'stat__label', text: pair[1] })
      ]));
    });
    sec.appendChild(stats);

    sec.appendChild(el('p', {
      class: 'small muted',
      style: 'margin-top:1rem',
      text: P.fmtDate(program.startDate) + ' → ' + P.fmtDate(program.endDate) + ' · ' +
        bp.trainingDays + ' training day' + (bp.trainingDays === 1 ? '' : 's') + ' a week, ' +
        (bp.blocksPerDay === 1
          ? 'one sitting of ' + fmtDuration(bp.blockMinutes)
          : bp.blocksPerDay + ' sittings of ' + fmtDuration(bp.blockMinutes)) +
        ' · starting from: ' + program.levelLabel.toLowerCase()
    }));

    sec.appendChild(renderStatus());

    var actions = el('div', { class: 'btn-row no-print', style: 'margin-top:2rem' }, [
      el('button', {
        class: 'btn', type: 'button', text: 'Download as Markdown',
        onclick: function () {
          window.App.download(
            program.discipline.id + '-program.md', P.toMarkdown(program), 'text/markdown'
          );
          window.App.toast('Markdown file downloaded.');
        }
      }),
      el('button', {
        class: 'btn btn--ghost', type: 'button', text: 'Add to calendar (.ics)',
        onclick: function () {
          window.App.download(
            program.discipline.id + '-program.ics', P.toICS(program), 'text/calendar'
          );
          window.App.toast('Calendar file downloaded. Import it into your calendar app.');
        }
      }),
      el('button', {
        class: 'btn btn--ghost', type: 'button', text: 'Copy plan',
        onclick: function () {
          window.App.copy(P.toMarkdown(program)).then(function () {
            window.App.toast('Copied the whole plan to the clipboard.');
          }, function () {
            window.App.toast('Clipboard blocked by the browser. Use the Markdown download instead.');
          });
        }
      }),
      el('button', {
        class: 'btn btn--ghost', type: 'button', text: 'Print',
        onclick: function () { window.print(); }
      })
    ]);
    sec.appendChild(actions);
    root.appendChild(sec);
  }

  /* -------------------------------------------------------- walkthrough */

  /* A plan is only obvious to the person who built it. This is the part that
     says what to do first, second and third, in order, with the state of each
     step read off work actually logged rather than off a checkbox someone
     ticked to make the panel go away. */

  var walkExpanded = null;   /* null = decide from progress */

  function walkSteps() {
    var records = progress.records || {};
    var sessionsDone = Object.keys(progress.sessions || {}).length;
    var scored = Object.keys(records).some(function (k) {
      return typeof records[k].score === 'number';
    });

    var firstSession = null, firstReview = null, reviewDone = false;
    program.schedule.forEach(function (w) {
      w.sessions.forEach(function (s) {
        if (!firstSession) firstSession = { w: w, s: s };
        if (s.type.key === 'review') {
          if (!firstReview) firstReview = { w: w, s: s };
          if (progress.sessions[sessionKey(w, s)]) reviewDone = true;
        }
      });
    });

    var locks = window.Stats.gateLocks(program, progress);
    var gate1 = locks[0];
    var phase1 = program.phases[0];
    var v = program.verdict;

    return [
      {
        id: 'verdict',
        title: 'Check the arithmetic before you commit to it',
        target: 'sec-verdict',
        targetLabel: 'Read what these hours buy',
        done: !!progress.steps.verdict,
        ack: 'verdict',
        ackLabel: 'I have read it',
        body: [
          'Your ' + program.totalHours + ' practice hours reach ' +
            (v.reached ? v.reached.label.toLowerCase() : 'below the first level') +
            '. Section 02 says what that gets you, what it does not, and the three ways to change it.',
          'If the level is lower than you were expecting, rebuild the plan now with different numbers. ' +
            'That costs a minute today and saves you finding out in week five.'
        ]
      },
      {
        id: 'setup',
        title: 'Spend one hour setting up, before any session',
        target: 'sec-setup',
        targetLabel: 'Open Before week 1',
        done: !!progress.steps.setup,
        ack: 'setup',
        ackLabel: 'Setup done, baseline written down',
        body: [
          'Section 03 lists the tools you need, where honest feedback is going to come from, and a ' +
            'baseline to measure today.',
          'The baseline is the step everyone skips. Without a number from before you started, you have ' +
            'no way to tell in week twelve whether any of this worked, and you will end up arguing with ' +
            'your own memory.'
        ]
      },
      {
        id: 'first',
        title: 'Run the first session off the run sheet',
        target: 'sec-today',
        targetLabel: 'Go to the session card',
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
          : ['Open the session card and work down the run sheet in order.']
      },
      {
        id: 'record',
        title: 'Record the session, not just tick it',
        target: 'sec-today',
        targetLabel: 'Go to the record panel',
        done: scored,
        body: [
          'Under every session card there is a record: mark it done, score it out of five, say whether ' +
            'it was too easy, about right or too hard, and attach whatever you made — a recording, a ' +
            'draft, a screenshot.',
          'The difficulty judgement is the one that does work. It feeds the calibration line in the ' +
            'panel at the top of this page, which is what keeps the practice in the band where it ' +
            'changes anything. Mark most sessions too easy and the plan will tell you to make them ' +
            'harder rather than congratulate you.'
        ]
      },
      {
        id: 'review',
        title: 'Close the week with the review session',
        target: 'sec-schedule',
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
        title: 'Sit the gate at the end of the phase',
        target: 'sec-phases',
        targetLabel: 'See the gates',
        done: !!(gate1 && gate1.complete),
        body: [
          'Phase 1 ends in week ' + phase1.weekEnd + ' at the gate "' + phase1.milestone.name +
            '", with ' + phase1.milestone.criteria.length + ' criteria another person could check.',
          'Gates open in order: the next phase\'s gate stays locked until this one passes in full. If ' +
            'it does not pass, repeat the last week of the phase rather than moving on. Moving on ' +
            'because the weeks ran out is how people finish a plan with nothing they can do.'
        ]
      }
    ];
  }

  function walkGlossary() {
    var mix = program.discipline;
    return [
      ['Phase', 'One pillar of the skill, several weeks long, ending at a gate. This plan has ' +
        program.phases.length + '.'],
      ['Gate', 'The criteria that say you can move on, written so someone else could check them. ' +
        'They unlock in order — you cannot claim one while the phase before it is unpassed.'],
      ['Session', 'One sitting. Four kinds: acquire (take something in and use it), drill ' +
        '(repetitions against one weakness), produce (make the real thing), and review (score the ' +
        'week). They are mixed rather than blocked, on purpose.'],
      ['Run sheet', 'The minute-by-minute order for one session, with a clock window on each block ' +
        'and a mark on the block to drop first if you are short.'],
      ['Stage', 'How a phase escalates. Week 4 of a phase is not a repeat of week 1, and the stage ' +
        'name on each session says where you are in that.'],
      ['Credit', 'One hour of scheduled practice in a phase. Credits accrue as you log sessions; the ' +
        'module is only awarded when the gate passes. Hours are attendance, the gate is evidence.'],
      ['Baseline', 'The measurement you take in ' + mix.name.toLowerCase() +
        ' before week 1, so progress later is a number rather than a feeling.']
    ];
  }

  function renderWalkthrough(root) {
    var steps = walkSteps();
    var doneCount = steps.filter(function (s) { return s.done; }).length;
    var currentIdx = steps.findIndex(function (s) { return !s.done; });
    var finished = currentIdx === -1;
    var open = walkExpanded === null ? !finished : walkExpanded;

    var sec = el('section', { class: 'section no-print', id: 'sec-start' });
    var wrap = el('div', { class: 'wrap' });

    wrap.appendChild(el('div', { class: 'section__head' }, [
      el('div', { class: 'section__num', text: '01' }),
      el('div', {}, [
        el('h2', { text: 'Start here' }),
        el('p', {
          class: 'lede', style: 'margin-top:1rem',
          text: finished
            ? 'You have been through all six. This stays here as a reference for what the plan expects of you.'
            : 'Six things, in order. Everything else on this page is detail hanging off one of them. ' +
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
          actions.appendChild(el('a', {
            class: 'walk__link', href: '#' + st.target, text: st.targetLabel + ' →',
            onclick: jumpTo(st.target)
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

      /* The vocabulary. Without it, half the page is nouns the reader has not
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

    wrap.appendChild(box);
    sec.appendChild(wrap);
    root.appendChild(sec);
  }

  /* ------------------------------------------------------------- setup */

  function renderSetup(root) {
    var setup = program.setup;
    if (!setup) return;
    var sec = el('section', { class: 'section', id: 'sec-setup' });
    var wrap = el('div', { class: 'wrap' });

    wrap.appendChild(el('div', { class: 'section__head' }, [
      el('div', { class: 'section__num', text: '03' }),
      el('div', {}, [
        el('h2', { text: 'Before week 1' }),
        el('p', {
          class: 'lede', style: 'margin-top:1rem',
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

    wrap.appendChild(grid);
    wrap.appendChild(el('div', { class: 'notice', style: 'margin-top:1.5rem' }, [
      el('span', { class: 'small', text: setup.firstWeek })
    ]));

    sec.appendChild(wrap);
    root.appendChild(sec);
  }

  /* ------------------------------------------------------------ runsheet */

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

  /* -------------------------------------------------------------- record */

  /* What happened, in your own judgement, plus whatever proves it. Difficulty
     feeds the calibration advice; evidence is what lets you compare week one
     with week twelve. */
  function renderRecord(w, s) {
    var key = sessionKey(w, s);
    var rec = window.Store.getRecord(program.id, key);
    var done = !!progress.sessions[key];

    var box = el('div', { class: 'record', 'data-done': String(done) });
    box.appendChild(el('span', { class: 'eyebrow', text: 'Record the session' }));

    /* Done */
    box.appendChild(el('label', { class: 'check record__done' }, [
      el('input', {
        type: 'checkbox',
        checked: done ? 'checked' : null,
        onchange: function () {
          progress = window.Store.toggleSession(program.id, key, s.hours);
          render();
        }
      }),
      el('span', { text: done ? 'Done, and logged.' : 'Mark this session done' })
    ]));

    /* Score */
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

    /* Difficulty */
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

    /* Evidence */
    box.appendChild(renderEvidence(key, s));

    /* Note */
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
              href: url,
              target: '_blank',
              rel: 'noopener',
              text: 'Open'
            }) : null,
            el('button', {
              class: 'btn btn--small btn--ghost', type: 'button', text: 'Remove',
              onclick: function () {
                window.Evidence.remove(r.id).then(refresh);
              }
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

  /* --------------------------------------------------------------- today */

  function findToday() {
    var now = new Date();
    var upcoming = null;
    for (var w = 0; w < program.schedule.length; w++) {
      var week = program.schedule[w];
      for (var s = 0; s < week.sessions.length; s++) {
        var session = week.sessions[s];
        if (sameDay(session.date, now)) return { week: week, session: session, today: true };
        if (!upcoming && session.date > now) upcoming = { week: week, session: session, today: false };
      }
    }
    return upcoming;
  }

  function renderToday(root) {
    var next = findToday();
    var sec = el('section', { class: 'section no-print', id: 'sec-today' });
    var wrap = el('div', { class: 'wrap' });
    wrap.appendChild(el('div', { class: 'section__head' }, [
      el('div', { class: 'section__num', text: '04' }),
      el('div', {}, [el('h2', { text: next && next.today ? 'Today' : 'Next session' })])
    ]));

    if (!next) {
      wrap.appendChild(el('div', { class: 'empty' }, [
        el('p', {
          class: 'small',
          style: 'margin:0',
          text: program.endDate < new Date()
            ? 'The plan has run its course. Score yourself against the gates below, then build the next one from the level you actually reached.'
            : 'No sessions scheduled.'
        })
      ]));
      sec.appendChild(wrap);
      root.appendChild(sec);
      return;
    }

    var s = next.session;
    var w = next.week;
    var key = sessionKey(w, s);
    var checked = !!progress.sessions[key];

    var card = el('div', { class: 'card' }, [
      el('div', {
        style: 'display:flex;flex-wrap:wrap;gap:1rem;justify-content:space-between;align-items:baseline'
      }, [
        el('div', {}, [
          el('span', { class: 'session__type', 'data-t': s.type.key, text: s.type.label }),
          el('h3', { style: 'margin-top:0.35rem', text: s.title })
        ]),
        el('div', { style: 'text-align:right' }, [
          el('div', { class: 'mono small', text: P.fmtDate(s.date) }),
          el('div', {
            class: 'mono small muted',
            text: fmtDuration(s.minutes) + ' · week ' + w.number +
              (s.blocks > 1 ? ' · sitting ' + s.block + ' of ' + s.blocks + ' today' : '')
          })
        ])
      ])
    ]);

    /* Where this sits in the arc, so the session is not free-floating. */
    card.appendChild(el('p', {
      class: 'tiny muted',
      style: 'margin:0.75rem 0 0'
    }, [
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
          ? el('p', {
              class: 'drill__mistake',
              text: 'What usually goes wrong: ' + s.drill.mistake
            })
          : null
      ]));
    } else if (s.detail) {
      card.appendChild(el('p', {
        style: 'margin:1.25rem 0 0;color:var(--ink-2)',
        text: s.detail
      }));
    }

    /* The run sheet below lists every step with its own time window, so the
       plain step list would be the same content twice. Only the completion
       test needs restating here. */
    if (s.check) {
      card.appendChild(el('p', { class: 'steps__check', style: 'margin:1.25rem 0 0;padding-left:0', text: 'Done when: ' + s.check }));
    }

    /* The generic note only earns its place when nothing more specific was
       printed above it. */
    if (!s.detail && !s.drill && !(s.steps && s.steps.length)) {
      card.appendChild(el('p', {
        class: 'small muted',
        style: 'margin:1rem 0 0',
        text: s.type.note
      }));
    }

    /* One teaching note per session, rotating through the idea, the
       mechanism, the misunderstanding and the self-check. Ninety seconds of
       reading before you start, so the hour is spent on something you
       understand rather than on following instructions. */
    if (s.lesson) {
      card.appendChild(el('div', { class: 'lesson' }, [
        el('span', { class: 'eyebrow', style: 'margin:0', text: s.lesson.label }),
        el('p', { class: 'lesson__text', text: s.lesson.text })
      ]));
    }

    card.appendChild(renderRunsheet(s));
    card.appendChild(renderRecord(w, s));

    wrap.appendChild(card);
    sec.appendChild(wrap);
    root.appendChild(sec);
  }

  /* ------------------------------------------------------------- verdict */

  function renderVerdict(root) {
    var v = program.verdict;
    var sec = el('section', { class: 'section', id: 'sec-verdict' });
    var wrap = el('div', { class: 'wrap' });
    wrap.appendChild(el('div', { class: 'section__head' }, [
      el('div', { class: 'section__num', text: '02' }),
      el('div', {}, [
        el('h2', { text: 'What these hours buy' }),
        el('p', {
          class: 'lede', style: 'margin-top:1rem',
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

    wrap.appendChild(box);

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
      wrap.appendChild(cut);
    }

    v.warnings.forEach(function (warn) {
      wrap.appendChild(el('div', { class: 'notice', style: 'margin-top:0.75rem' }, [
        el('span', { class: 'small', text: warn })
      ]));
    });

    if (program.discipline.disclaimer) {
      wrap.appendChild(el('div', { class: 'notice notice--flat', style: 'margin-top:0.75rem' }, [
        el('span', { class: 'small', text: program.discipline.disclaimer })
      ]));
    }

    sec.appendChild(wrap);
    root.appendChild(sec);
  }

  /* -------------------------------------------------------------- phases */

  function renderPhases(root) {
    var sec = el('section', { class: 'section', id: 'sec-phases' });
    var wrap = el('div', { class: 'wrap' });
    wrap.appendChild(el('div', { class: 'section__head' }, [
      el('div', { class: 'section__num', text: '05' }),
      el('div', {}, [
        el('h2', { text: 'Phases' }),
        el('p', {
          class: 'lede', style: 'margin-top:1rem',
          text: 'Each phase opens with the idea it is teaching, then the work, then a gate. Gates ' +
            'unlock in order: the next one stays shut until this one passes in full. You move on ' +
            'when you can do the things listed, not when the weeks run out — and if a gate does not ' +
            'pass, you repeat the last week of the phase.'
        })
      ])
    ]));

    var locks = window.Stats.gateLocks(program, progress);

    program.phases.forEach(function (ph, phIdx) {
      var lock = locks[phIdx];
      var node = el('article', { class: 'phase' });
      node.appendChild(el('div', { class: 'phase__head' }, [
        el('div', { class: 'phase__index', text: 'PHASE ' + String(ph.index).padStart(2, '0') }),
        el('div', {}, [
          el('h3', {}, [
            document.createTextNode(ph.name),
            ph.compressed
              ? el('span', { class: 'tag', style: 'margin-left:0.6rem', text: 'compressed' })
              : null
          ]),
          el('p', { class: 'small muted', style: 'margin:0.35rem 0 0', text: ph.objective })
        ]),
        el('div', { class: 'phase__stats' }, [
          el('div', { text: 'Weeks ' + ph.weekStart + '–' + ph.weekEnd }),
          el('div', { text: ph.hours + ' practice hours in total' }),
          el('div', { text: P.fmtShort(ph.startDate) + ' → ' + P.fmtShort(ph.endDate) })
        ])
      ]));

      /* The teaching note. A phase that only lists drills tells you what to do
         and nothing about what you are meant to be learning. */
      if (ph.teaching) {
        var t = ph.teaching;
        var brief = el('div', { class: 'brief' }, [
          el('span', { class: 'eyebrow', text: 'What this phase is actually teaching' }),
          el('p', { class: 'brief__idea', text: t.idea }),
          el('div', { class: 'brief__grid' }, [
            el('div', {}, [
              el('span', { class: 'brief__label', text: 'Why it works' }),
              el('p', { class: 'brief__text', text: t.why })
            ]),
            el('div', {}, [
              el('span', { class: 'brief__label', text: 'The version that does not work' }),
              el('p', { class: 'brief__text', text: t.misread })
            ]),
            el('div', {}, [
              el('span', { class: 'brief__label', text: 'How to check your own work' }),
              el('p', { class: 'brief__text', text: t.tell })
            ])
          ])
        ]);
        if (t.terms && t.terms.length) {
          var terms = el('div', { class: 'brief__terms' }, [
            el('span', { class: 'brief__label', text: 'Vocabulary you will meet' })
          ]);
          var tdl = el('dl', { class: 'defs defs--tight' });
          t.terms.forEach(function (tm) {
            tdl.appendChild(el('dt', { text: tm.term }));
            tdl.appendChild(el('dd', { text: tm.meaning }));
          });
          terms.appendChild(tdl);
          brief.appendChild(terms);
        }
        node.appendChild(brief);
      }

      var body = el('div', { class: 'phase__body' });

      var comps = el('div', {}, [el('span', { class: 'eyebrow', text: 'Competencies' })]);
      var cl = el('ul', { class: 'list-clean' });
      ph.competencies.forEach(function (c) { cl.appendChild(el('li', { text: c })); });
      comps.appendChild(cl);
      body.appendChild(comps);

      var drills = el('div', {}, [el('span', { class: 'eyebrow', text: 'Drills' })]);
      ph.drills.forEach(function (d) {
        drills.appendChild(el('div', { class: 'drill' }, [
          el('span', { class: 'drill__dose', text: d.dose }),
          el('div', { class: 'drill__name', text: d.name }),
          el('p', { class: 'drill__protocol', text: d.protocol }),
          d.mistake
            ? el('p', { class: 'drill__mistake', text: 'What usually goes wrong: ' + d.mistake })
            : null
        ]));
      });
      body.appendChild(drills);

      /* How the phase escalates week to week. */
      if (ph.stages && ph.stages.length) {
        var stages = el('div', {}, [el('span', { class: 'eyebrow', text: 'How this phase progresses' })]);
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
        body.appendChild(stages);
      }

      var mix = el('div', {}, [
        el('span', { class: 'eyebrow', text: 'Session mix in this phase' }),
        el('table', { class: 'table' }, [
          el('tr', {}, [
            el('td', { text: 'Acquire' }),
            el('td', { class: 'num', text: Math.round(ph.mix.acquire * 100) + '%' })
          ]),
          el('tr', {}, [
            el('td', { text: 'Drill' }),
            el('td', { class: 'num', text: Math.round(ph.mix.drill * 100) + '%' })
          ]),
          el('tr', {}, [
            el('td', { text: 'Produce' }),
            el('td', { class: 'num', text: Math.round(ph.mix.produce * 100) + '%' })
          ])
        ]),
        el('p', {
          class: 'tiny muted',
          style: 'margin-top:0.75rem',
          text: 'Taking things in drops off as the plan goes on and making things rises. Reading is never most of a week.'
        })
      ]);
      body.appendChild(mix);

      node.appendChild(body);

      if (ph.standard) {
        node.appendChild(el('p', {
          class: 'phase__standard',
          text: 'What good looks like: ' + ph.standard
        }));
      }

      /* Gates open in order. A locked gate still shows its criteria — you
         should know what you are working toward — but it cannot be ticked,
         and it says exactly what is holding it shut. */
      var gate = el('div', { class: 'gate', 'data-locked': String(lock.locked) });
      gate.appendChild(el('div', { class: 'gate__head' }, [
        el('div', { class: 'gate__title', text: 'Gate: ' + ph.milestone.name }),
        el('span', {
          class: 'gate__state',
          'data-state': lock.locked ? 'locked' : (lock.complete ? 'passed' : 'open'),
          text: lock.locked ? 'Locked' : (lock.complete ? 'Passed' : lock.passed + ' of ' + lock.criteria)
        })
      ]));

      if (lock.locked) {
        var prev = lock.blockedBy;
        gate.appendChild(el('p', { class: 'gate__lockline' }, [
          document.createTextNode(
            'Shut until phase ' + prev.index + ' passes. "' + prev.milestone.name + '" has ' +
            locks[phIdx - 1].passed + ' of ' + locks[phIdx - 1].criteria +
            ' criteria ticked. The plan\'s claim is that this phase is built on that one, so ' +
            'claiming this gate first would not mean anything.'
          )
        ]));
        gate.appendChild(el('a', {
          class: 'walk__link', href: '#sec-phases', text: 'Go to phase ' + prev.index + '’s gate →',
          onclick: jumpTo('gate-' + prev.index)
        }));
      }

      var list = el('div', { class: 'gate__list', id: 'gate-' + ph.index });
      ph.milestone.criteria.forEach(function (c, idx) {
        var k = gateKey(ph, idx);
        list.appendChild(el('label', { class: 'check' }, [
          el('input', {
            type: 'checkbox',
            checked: progress.gates[k] ? 'checked' : null,
            disabled: lock.locked ? 'disabled' : null,
            onchange: function () {
              if (lock.locked) return;
              progress = window.Store.toggleGateCriterion(program.id, k);
              render();
            }
          }),
          el('span', { text: c })
        ]));
      });
      gate.appendChild(list);
      node.appendChild(gate);
      wrap.appendChild(node);
    });

    sec.appendChild(wrap);
    root.appendChild(sec);
  }

  /* ----------------------------------------------------------- transcript */

  function renderTranscript(root) {
    var t = window.Stats.transcript(program, progress);
    var sec = el('section', { class: 'section', id: 'sec-transcript' });
    var wrap = el('div', { class: 'wrap' });

    wrap.appendChild(el('div', { class: 'section__head' }, [
      el('div', { class: 'section__num', text: '06' }),
      el('div', {}, [
        el('h2', { text: 'Transcript' }),
        el('p', {
          class: 'lede', style: 'margin-top:1rem',
          text: 'Each phase is a module worth credits equal to its practice hours. Credits build as ' +
            'you log sessions, and the module is awarded in full when every gate criterion passes. ' +
            'Hours are attendance; the award is evidence.'
        })
      ])
    ]));

    /* Standing */
    var standing = el('div', { class: 'transcript__standing' }, [
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
    ]);
    wrap.appendChild(standing);

    /* The record itself */
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
      table.appendChild(el('tr', { 'data-status': m.awarded ? 'awarded' : m.status.toLowerCase().replace(' ', '-') }, [
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
          class: 'pill pill--' + (m.awarded
            ? 'awarded'
            : m.locked ? 'locked' : (m.sessionsDone ? 'open' : 'idle')),
          text: m.status
        })])
      ]));
    });
    wrap.appendChild(el('div', { class: 'transcript-scroll' }, [table]));

    if (t.current) {
      wrap.appendChild(el('p', { class: 'small muted', style: 'margin-top:1.25rem' }, [
        document.createTextNode('Currently reading ' + t.current.code + ' ' + t.current.title + '. '),
        el('span', {
          text: t.current.criteria - t.current.criteriaPassed === 0
            ? 'All criteria passed; tick the last one to take the credits.'
            : (t.current.criteria - t.current.criteriaPassed) +
              ' gate criteria left to award its ' + t.current.credits + ' credits.'
        })
      ]));
    }

    sec.appendChild(wrap);
    root.appendChild(sec);
  }

  /* ------------------------------------------------------------ schedule */

  function renderSchedule(root) {
    var sec = el('section', { class: 'section', id: 'sec-schedule' });
    var wrap = el('div', { class: 'wrap' });
    var now = new Date();

    wrap.appendChild(el('div', { class: 'section__head' }, [
      el('div', { class: 'section__num', text: '07' }),
      el('div', {}, [
        el('h2', { text: 'Week by week' }),
        el('p', {
          class: 'lede', style: 'margin-top:1rem',
          text: 'Every session, dated. Tick them off as you go. The count is the only honest record ' +
            'of whether you are running this or just looking at it.'
        })
      ])
    ]));

    var controls = el('div', { class: 'btn-row no-print', style: 'margin-bottom:1.5rem' }, [
      el('button', {
        class: 'btn btn--small btn--ghost', type: 'button', text: 'Expand all',
        onclick: function () {
          wrap.querySelectorAll('.week').forEach(function (w) { w.setAttribute('data-open', 'true'); });
        }
      }),
      el('button', {
        class: 'btn btn--small btn--ghost', type: 'button', text: 'Collapse all',
        onclick: function () {
          wrap.querySelectorAll('.week').forEach(function (w) { w.setAttribute('data-open', 'false'); });
        }
      })
    ]);
    wrap.appendChild(controls);

    program.schedule.forEach(function (w) {
      var isCurrent = now >= w.startDate && now <= P.addDays(w.endDate, 1);
      var doneCount = w.sessions.filter(function (s) {
        return progress.sessions[sessionKey(w, s)];
      }).length;

      var node = el('div', {
        class: 'week',
        'data-open': String(isCurrent),
        'data-consolidation': String(!!w.consolidation),
        'data-gate': String(!!w.gate)
      });

      var head = el('button', {
        class: 'week__head', type: 'button',
        onclick: function () {
          node.setAttribute('data-open', node.getAttribute('data-open') === 'true' ? 'false' : 'true');
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
        class: 'tiny muted',
        style: 'margin:0 0 0.75rem',
        text: P.fmtDate(w.startDate) + ' – ' + P.fmtDate(w.endDate) + ' · ' + w.phase.name +
          (w.stage ? ' · ' + w.stage.stage.name + ': ' + w.stage.stage.work : '')
      }));

      w.sessions.forEach(function (s) {
        var key = sessionKey(w, s);
        body.appendChild(el('div', { class: 'session' }, [
          el('span', { class: 'session__date' }, [
            document.createTextNode(P.fmtShort(s.date)),
            s.blocks > 1
              ? el('span', { class: 'session__block', text: 'sitting ' + s.block + '/' + s.blocks })
              : null
          ]),
          el('span', { class: 'session__type', 'data-t': s.type.key, text: s.type.label }),
          el('span', { class: 'session__focus' }, [
            document.createTextNode(s.title),
            s.detail
              ? el('div', { class: 'tiny muted', style: 'margin-top:0.2rem', text: s.detail })
              : null,
            s.drill
              ? el('div', { class: 'tiny muted', style: 'margin-top:0.2rem' }, [
                  el('span', { class: 'mono', text: s.drill.dose + ' · ' }),
                  document.createTextNode(s.drill.protocol)
                ])
              : null,
            stepList(s.steps, s.check)
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
            document.createTextNode('Score yourself against the criteria in Phase ' + w.phase.index +
              ' before starting the next phase.')
          ])
        ]));
      }

      node.appendChild(body);
      wrap.appendChild(node);
    });

    sec.appendChild(wrap);
    root.appendChild(sec);
  }

  /* ------------------------------------------------------------ reference */

  function renderReference(root) {
    var d = program.discipline;
    var sec = el('section', { class: 'section', id: 'sec-reference' });
    var wrap = el('div', { class: 'wrap' });

    wrap.appendChild(el('div', { class: 'section__head' }, [
      el('div', { class: 'section__num', text: '08' }),
      el('div', {}, [el('h2', { text: 'Reference' })])
    ]));

    var grid = el('div', { class: 'grid grid--2' });

    var metrics = el('div', {}, [el('span', { class: 'eyebrow', text: 'What to measure' })]);
    var mt = el('table', { class: 'table' });
    d.metrics.forEach(function (m) {
      mt.appendChild(el('tr', {}, [
        el('td', { class: 'table__key', text: m.name }),
        el('td', { class: 'muted', text: m.method })
      ]));
    });
    metrics.appendChild(mt);
    grid.appendChild(metrics);

    var fails = el('div', {}, [el('span', { class: 'eyebrow', text: 'Known failure modes' })]);
    var ft = el('table', { class: 'table' });
    d.failureModes.forEach(function (f) {
      ft.appendChild(el('tr', {}, [
        el('td', { class: 'table__key', text: f.name }),
        el('td', { class: 'muted', text: f.fix })
      ]));
    });
    fails.appendChild(ft);
    grid.appendChild(fails);

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
    grid.appendChild(arena);

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
    grid.appendChild(lib);

    wrap.appendChild(grid);
    sec.appendChild(wrap);
    root.appendChild(sec);
  }

  /* ------------------------------------------------------------------ log */

  function renderLog(root) {
    var sec = el('section', { class: 'section', id: 'sec-log' });
    var wrap = el('div', { class: 'wrap' });

    wrap.appendChild(el('div', { class: 'section__head' }, [
      el('div', { class: 'section__num', text: '09' }),
      el('div', {}, [
        el('h2', { text: 'Session log' }),
        el('p', {
          class: 'lede', style: 'margin-top:1rem',
          text: 'Three lines a session: what you practised, what was hard, what changes next time. ' +
            'This is how the plan corrects itself, and it is the difference between practising and just repeating.'
        })
      ])
    ]));

    var input = el('textarea', {
      id: 'log-input',
      placeholder: 'Practised: cold opens, 6 reps.\nHard: still rushing the first pause.\nNext: metronome drill before recording.'
    });
    var form = el('div', { class: 'card no-print', style: 'margin-bottom:2rem' }, [
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
    ]);
    wrap.appendChild(form);

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
              class: 'btn btn--small btn--ghost no-print',
              type: 'button',
              style: 'margin-top:0.5rem',
              text: 'Delete',
              onclick: function () {
                progress = window.Store.deleteLog(program.id, entry.at);
                render();
              }
            })
          ])
        ]));
      });
    }

    sec.appendChild(wrap);
    root.appendChild(sec);
  }

  /* ----------------------------------------------------------- footer bar */

  function renderControls(root) {
    var sec = el('section', { class: 'section no-print' });
    var wrap = el('div', { class: 'wrap' });
    wrap.appendChild(el('div', { class: 'btn-row' }, [
      el('a', { class: 'btn btn--ghost', href: 'index.html#commission', text: 'Rebuild this plan' }),
      el('button', {
        class: 'btn btn--ghost', type: 'button', text: 'Delete plan and progress',
        onclick: function () {
          if (confirm('Delete this plan and everything you have logged against it? There is no undo.')) {
            window.Store.clearProgram();
            location.href = 'index.html#commission';
          }
        }
      })
    ]));
    wrap.appendChild(el('p', {
      class: 'tiny muted', style: 'margin-top:1rem',
      text: 'Rebuilding with different numbers replaces this plan. Export it first if you want to keep it.'
    }));
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

  function render() {
    var root = document.getElementById('program-root');
    if (!program) { renderEmpty(root); return; }
    progress = window.Store.getProgress(program.id);
    var scrollY = window.scrollY;
    root.innerHTML = '';
    renderHead(root);
    renderWalkthrough(root);
    renderVerdict(root);
    renderSetup(root);
    renderToday(root);
    renderPhases(root);
    renderTranscript(root);
    renderSchedule(root);
    renderReference(root);
    renderLog(root);
    renderControls(root);
    window.scrollTo(0, scrollY);
  }

  document.addEventListener('DOMContentLoaded', function () {
    program = window.Store.loadProgram();
    if (program) {
      document.title = program.discipline.name + ' plan · Skill Trainer';
      progress = window.Store.getProgress(program.id);
    }
    render();
  });
})();
