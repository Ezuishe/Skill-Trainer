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

  /* ---------------------------------------------------------------- head */

  function renderHead(root) {
    var i = program.input;
    var t = totals();
    var sec = el('section', { class: 'wrap', style: 'padding-block:clamp(2.5rem,6vw,4.5rem)' });

    sec.appendChild(el('span', { class: 'eyebrow', text: program.discipline.discipline + ' · program' }));
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
        el('span', { class: 'eyebrow', style: 'margin-bottom:0.25rem', text: 'Your stated objective' }),
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
      text: P.fmtDate(program.startDate) + ' → ' + P.fmtDate(program.endDate) +
        ' · ' + program.sessionLength + ' h × ' + i.daysPerWeek + ' sessions/week · starting from: ' +
        program.levelLabel.toLowerCase()
    }));

    /* progress */
    var bar = el('div', { style: 'margin-top:2rem' }, [
      el('div', {
        class: 'small',
        style: 'display:flex;justify-content:space-between;margin-bottom:0.4rem'
      }, [
        el('span', { text: 'Progress · ' + t.done + ' of ' + t.sessions + ' sessions logged' }),
        el('span', { class: 'mono', text: t.pct + '%' })
      ]),
      el('div', { class: 'meter' }, [
        el('div', { class: 'meter__fill', style: 'width:' + t.pct + '%' })
      ]),
      el('p', {
        class: 'tiny muted',
        style: 'margin-top:0.5rem',
        text: progress.hours + ' hours logged · ' + t.gatesDone + ' of ' + t.gateCriteria +
          ' gate criteria passed'
      })
    ]);
    sec.appendChild(bar);

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
          window.App.toast('Calendar file downloaded — import it into your calendar app.');
        }
      }),
      el('button', {
        class: 'btn btn--ghost', type: 'button', text: 'Copy plan',
        onclick: function () {
          window.App.copy(P.toMarkdown(program)).then(function () {
            window.App.toast('Full program copied to clipboard.');
          }, function () {
            window.App.toast('Clipboard blocked — use the Markdown download instead.');
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
    var sec = el('section', { class: 'section no-print' });
    var wrap = el('div', { class: 'wrap' });
    wrap.appendChild(el('div', { class: 'section__head' }, [
      el('div', { class: 'section__num', text: '01' }),
      el('div', {}, [el('h2', { text: next && next.today ? 'Today' : 'Next session' })])
    ]));

    if (!next) {
      wrap.appendChild(el('div', { class: 'empty' }, [
        el('p', {
          class: 'small',
          style: 'margin:0',
          text: program.endDate < new Date()
            ? 'The program window has closed. Score yourself against the gates below, then commission the next one at the level you actually reached.'
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
          el('h3', { style: 'margin-top:0.35rem', text: w.phase.name }),
          el('p', { class: 'small muted', style: 'margin:0.25rem 0 0', text: w.phase.objective })
        ]),
        el('div', { style: 'text-align:right' }, [
          el('div', { class: 'mono small', text: P.fmtDate(s.date) }),
          el('div', { class: 'mono small muted', text: s.hours + ' hours · week ' + w.number })
        ])
      ]),
      el('p', { style: 'margin:1.5rem 0 0.5rem;font-size:1.05rem', text: s.focus }),
      el('p', { class: 'small muted', style: 'margin:0', text: s.type.note })
    ]);

    if (s.drill) {
      card.appendChild(el('div', { class: 'drill', style: 'margin-top:1.5rem' }, [
        el('span', { class: 'drill__dose', text: s.drill.dose }),
        el('div', { class: 'drill__name', text: s.drill.name }),
        el('p', { class: 'drill__protocol', text: s.drill.protocol })
      ]));
    }

    var block = el('div', { style: 'margin-top:1.75rem;border-top:1px solid var(--rule);padding-top:1.25rem' });
    block.appendChild(el('span', { class: 'eyebrow', text: 'Session structure' }));
    var table = el('table', { class: 'table' });
    program.dailyBlock.forEach(function (b) {
      table.appendChild(el('tr', {}, [
        el('td', { class: 'num table__dur', text: b.minutes + ' min' }),
        el('td', { class: 'table__key', text: b.name }),
        el('td', { class: 'muted', text: b.note })
      ]));
    });
    block.appendChild(table);
    card.appendChild(block);

    var label = el('label', { class: 'check', style: 'margin-top:1.5rem;border-bottom:0' }, [
      el('input', {
        type: 'checkbox',
        checked: checked ? 'checked' : null,
        onchange: function () {
          progress = window.Store.toggleSession(program.id, key, s.hours);
          render();
        }
      }),
      el('span', { text: 'Session complete — log it' })
    ]);
    card.appendChild(label);

    wrap.appendChild(card);
    sec.appendChild(wrap);
    root.appendChild(sec);
  }

  /* ------------------------------------------------------------- verdict */

  function renderVerdict(root) {
    var v = program.verdict;
    var sec = el('section', { class: 'section' });
    var wrap = el('div', { class: 'wrap' });
    wrap.appendChild(el('div', { class: 'section__head' }, [
      el('div', { class: 'section__num', text: '02' }),
      el('div', {}, [
        el('h2', { text: 'What these hours actually buy' }),
        el('p', {
          class: 'lede', style: 'margin-top:1rem',
          text: 'Stated before you begin, so the program cannot quietly redefine success later.'
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
        el('h4', { text: 'What you will own' }),
        el('p', { class: 'small muted', style: 'margin:0.35rem 0 0', text: v.owns })
      ]),
      el('div', {}, [
        el('h4', { text: 'What you will still lack' }),
        el('p', { class: 'small muted', style: 'margin:0.35rem 0 0', text: v.lacks })
      ])
    ]));

    if (v.levers.length) {
      var levers = el('div', { class: 'levers' });
      levers.appendChild(el('span', { class: 'eyebrow', text: 'The three levers, quantified' }));
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
      cut.appendChild(el('span', { class: 'eyebrow', style: 'margin-bottom:0.35rem', text: 'Deliberately cut from scope' }));
      cut.appendChild(el('p', {
        class: 'small', style: 'margin:0 0 0.75rem',
        text: 'Your budget covers ' + program.scope.included.length + ' pillars properly. ' +
          'The rest are excluded rather than thinned, because a diluted pillar teaches nothing:'
      }));
      var ul = el('ul', { class: 'list-clean' });
      program.scope.dropped.forEach(function (d) {
        ul.appendChild(el('li', { text: d.name + ' — ' + d.objective }));
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
    var sec = el('section', { class: 'section' });
    var wrap = el('div', { class: 'wrap' });
    wrap.appendChild(el('div', { class: 'section__head' }, [
      el('div', { class: 'section__num', text: '03' }),
      el('div', {}, [
        el('h2', { text: 'Phases' }),
        el('p', {
          class: 'lede', style: 'margin-top:1rem',
          text: 'Each phase ends at a gate. Time served does not advance you — evidence does. ' +
            'If a gate does not pass, repeat the phase’s final week rather than moving on.'
        })
      ])
    ]));

    program.phases.forEach(function (ph) {
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
          el('div', { text: ph.hours + ' hours' }),
          el('div', { text: P.fmtShort(ph.startDate) + ' → ' + P.fmtShort(ph.endDate) })
        ])
      ]));

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
          el('p', { class: 'drill__protocol', text: d.protocol })
        ]));
      });
      body.appendChild(drills);

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
          text: 'Acquisition falls and production rises as the program advances. Reading is never the majority of a session.'
        })
      ]);
      body.appendChild(mix);

      node.appendChild(body);

      var gate = el('div', { class: 'gate' });
      gate.appendChild(el('div', { class: 'gate__title', text: 'Gate — ' + ph.milestone.name }));
      ph.milestone.criteria.forEach(function (c, idx) {
        var k = gateKey(ph, idx);
        gate.appendChild(el('label', { class: 'check' }, [
          el('input', {
            type: 'checkbox',
            checked: progress.gates[k] ? 'checked' : null,
            onchange: function () {
              progress = window.Store.toggleGateCriterion(program.id, k);
              render();
            }
          }),
          el('span', { text: c })
        ]));
      });
      node.appendChild(gate);
      wrap.appendChild(node);
    });

    sec.appendChild(wrap);
    root.appendChild(sec);
  }

  /* ------------------------------------------------------------ schedule */

  function renderSchedule(root) {
    var sec = el('section', { class: 'section' });
    var wrap = el('div', { class: 'wrap' });
    var now = new Date();

    wrap.appendChild(el('div', { class: 'section__head' }, [
      el('div', { class: 'section__num', text: '04' }),
      el('div', {}, [
        el('h2', { text: 'Week by week' }),
        el('p', {
          class: 'lede', style: 'margin-top:1rem',
          text: 'Every session, dated. Tick them as you go — the count is the only honest record of ' +
            'whether the program is being run or merely admired.'
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
        el('span', { class: 'week__hours', text: doneCount + '/' + w.sessions.length + ' · ' + w.hours + ' h' })
      ]);
      node.appendChild(head);

      var body = el('div', { class: 'week__body' });
      body.appendChild(el('p', {
        class: 'tiny muted',
        style: 'margin:0 0 0.75rem',
        text: P.fmtDate(w.startDate) + ' – ' + P.fmtDate(w.endDate) + ' · ' + w.phase.name
      }));

      w.sessions.forEach(function (s) {
        var key = sessionKey(w, s);
        body.appendChild(el('div', { class: 'session' }, [
          el('span', { class: 'session__date', text: P.fmtShort(s.date) }),
          el('span', { class: 'session__type', 'data-t': s.type.key, text: s.type.label }),
          el('span', { class: 'session__focus' }, [
            document.createTextNode(s.focus),
            s.drill ? el('div', { class: 'tiny muted', style: 'margin-top:0.2rem', text: s.drill.protocol }) : null
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
            el('span', { class: 'session__hours', text: s.hours + ' h' })
          ])
        ]));
      });

      if (w.gate) {
        body.appendChild(el('div', { class: 'notice', style: 'margin-top:1rem' }, [
          el('span', { class: 'small' }, [
            el('strong', { text: 'Gate week — ' + w.gate.name + '. ' }),
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
    var sec = el('section', { class: 'section' });
    var wrap = el('div', { class: 'wrap' });

    wrap.appendChild(el('div', { class: 'section__head' }, [
      el('div', { class: 'section__num', text: '05' }),
      el('div', {}, [el('h2', { text: 'Instruments' })])
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
      el('span', { class: 'eyebrow', text: 'Arena — where the feedback comes from' }),
      el('p', {
        class: 'small muted',
        text: 'Practice without an arena plateaus quickly and invisibly. Choose at least one before week two.'
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
        text: 'Read inside your acquisition sessions only. Reading beyond that budget is comfortable and does not train the skill.'
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
    var sec = el('section', { class: 'section' });
    var wrap = el('div', { class: 'wrap' });

    wrap.appendChild(el('div', { class: 'section__head' }, [
      el('div', { class: 'section__num', text: '06' }),
      el('div', {}, [
        el('h2', { text: 'Session log' }),
        el('p', {
          class: 'lede', style: 'margin-top:1rem',
          text: 'Three lines per session: what you practised, what was hard, what changes next time. ' +
            'The log is the difference between practice and repetition — it is how the program corrects itself.'
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
        el('p', { class: 'small', style: 'margin:0', text: 'No entries yet. The first one is the hardest.' })
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
      el('a', { class: 'btn btn--ghost', href: 'index.html#commission', text: 'Rebuild this program' }),
      el('button', {
        class: 'btn btn--ghost', type: 'button', text: 'Delete program and progress',
        onclick: function () {
          if (confirm('Delete the saved program and all logged progress from this browser? This cannot be undone.')) {
            window.Store.clearProgram();
            location.href = 'index.html#commission';
          }
        }
      })
    ]));
    wrap.appendChild(el('p', {
      class: 'tiny muted', style: 'margin-top:1rem',
      text: 'Rebuilding with different inputs replaces this program. Export first if you want to keep it.'
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
      text: 'Programs are stored in this browser only — nothing is kept on a server. Commission one and it will appear here, dated and ready to run.'
    }));
    wrap.appendChild(el('div', { class: 'btn-row', style: 'margin-top:2rem' }, [
      el('a', { class: 'btn', href: 'index.html#commission', text: 'Commission a program' }),
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
    renderToday(root);
    renderVerdict(root);
    renderPhases(root);
    renderSchedule(root);
    renderReference(root);
    renderLog(root);
    renderControls(root);
    window.scrollTo(0, scrollY);
  }

  document.addEventListener('DOMContentLoaded', function () {
    program = window.Store.loadProgram();
    if (program) {
      document.title = program.discipline.name + ' program — Skill Trainer';
      progress = window.Store.getProgress(program.id);
    }
    render();
  });
})();
