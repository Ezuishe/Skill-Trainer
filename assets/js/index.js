/*
 * index.js — catalog, the commission form, and the live feasibility preview.
 */

(function () {
  'use strict';

  var el = window.App.el;
  var state = {
    disciplineId: window.DISCIPLINES[0].id,
    level: 'novice'
  };

  /* --------------------------------------------------------------- stats */

  function fillStats() {
    var drills = 0, gates = 0;
    window.DISCIPLINES.forEach(function (d) {
      d.pillars.forEach(function (p) {
        drills += p.drills.length;
        gates += 1;
      });
    });
    var map = {
      disciplines: window.DISCIPLINES.length,
      drills: drills,
      gates: gates
    };
    Object.keys(map).forEach(function (k) {
      var node = document.querySelector('[data-stat="' + k + '"]');
      if (node) node.textContent = map[k];
    });
  }

  /* ------------------------------------------------------------- catalog */

  function renderCatalog() {
    var host = document.getElementById('catalog');
    if (!host) return;
    host.innerHTML = '';
    window.DISCIPLINES.forEach(function (d) {
      var btn = el('button', {
        class: 'disc',
        type: 'button',
        role: 'listitem',
        'aria-pressed': String(d.id === state.disciplineId),
        'data-id': d.id,
        onclick: function () { selectDiscipline(d.id, true); }
      }, [
        el('div', { class: 'disc__top' }, [
          el('span', { class: 'disc__cat', text: d.discipline }),
          el('span', { class: 'tag', text: d.hours.competent + ' h' })
        ]),
        el('h3', { class: 'disc__name', text: d.name }),
        el('p', { class: 'disc__tag', text: d.tagline }),
        el('div', { class: 'disc__hours' }, [
          el('span', { text: 'Functional ' + d.hours.functional + ' h' }),
          el('span', { text: 'Professional ' + d.hours.professional + ' h' })
        ])
      ]);
      host.appendChild(btn);
    });
  }

  function syncCatalog() {
    document.querySelectorAll('.disc').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-id') === state.disciplineId));
    });
  }

  /* ---------------------------------------------------------------- form */

  function inputs() {
    return {
      weeks: document.getElementById('f-weeks'),
      hours: document.getElementById('f-hours'),
      days: document.getElementById('f-days'),
      start: document.getElementById('f-start'),
      objective: document.getElementById('f-objective'),
      select: document.getElementById('f-discipline')
    };
  }

  function currentInput() {
    var i = inputs();
    return {
      disciplineId: state.disciplineId,
      weeks: parseInt(i.weeks.value, 10),
      hoursPerWeek: parseInt(i.hours.value, 10),
      daysPerWeek: parseInt(i.days.value, 10),
      level: state.level,
      objective: i.objective.value,
      startDate: i.start.value || new Date().toISOString().slice(0, 10)
    };
  }

  function selectDiscipline(id, scroll) {
    state.disciplineId = id;
    var sel = document.getElementById('f-discipline');
    if (sel) sel.value = id;
    syncCatalog();
    updateThesis();
    updatePreview();
    if (scroll) {
      document.getElementById('commission').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function updateThesis() {
    var d = window.DISCIPLINES.filter(function (x) { return x.id === state.disciplineId; })[0];
    var node = document.getElementById('disc-thesis');
    if (node && d) node.textContent = d.thesis;
  }

  function fillSelect() {
    var sel = document.getElementById('f-discipline');
    if (!sel) return;
    var groups = {};
    window.DISCIPLINES.forEach(function (d) {
      (groups[d.discipline] = groups[d.discipline] || []).push(d);
    });
    Object.keys(groups).forEach(function (g) {
      var og = el('optgroup', { label: g });
      groups[g].forEach(function (d) {
        og.appendChild(el('option', { value: d.id, text: d.name }));
      });
      sel.appendChild(og);
    });
    sel.value = state.disciplineId;
    sel.addEventListener('change', function () { selectDiscipline(sel.value, false); });
  }

  function wireLevel() {
    var host = document.getElementById('f-level');
    if (!host) return;
    host.querySelectorAll('.choice').forEach(function (b) {
      b.addEventListener('click', function () {
        state.level = b.getAttribute('data-value');
        host.querySelectorAll('.choice').forEach(function (o) {
          o.setAttribute('aria-pressed', String(o === b));
        });
        updatePreview();
      });
    });
  }

  function wireRanges() {
    var i = inputs();
    [['f-weeks', 'v-weeks'], ['f-hours', 'v-hours'], ['f-days', 'v-days']].forEach(function (pair) {
      var input = document.getElementById(pair[0]);
      var out = document.getElementById(pair[1]);
      input.addEventListener('input', function () {
        out.textContent = input.value;
        updateSessionLength();
        updatePreview();
      });
      out.textContent = input.value;
    });
    i.start.value = new Date().toISOString().slice(0, 10);
    i.start.addEventListener('change', updatePreview);
    i.objective.addEventListener('input', function () { /* stored on submit only */ });
    updateSessionLength();
  }

  function updateSessionLength() {
    var i = inputs();
    var per = parseInt(i.hours.value, 10) / parseInt(i.days.value, 10);
    var mins = Math.round(per * 60);
    var node = document.getElementById('session-length');
    if (!node) return;
    var text = 'Each session runs about ' + (mins >= 90
      ? (Math.round(per * 10) / 10) + ' hours'
      : mins + ' minutes') + '.';
    if (per > 4) text += ' Over four hours in one sitting returns very little; spread these across more days.';
    else if (mins < 25) text += ' Under twenty-five minutes, most of the session is spent warming up.';
    node.textContent = text;
  }

  /* ------------------------------------------------------------- preview */

  function updatePreview() {
    var host = document.getElementById('preview-body');
    if (!host) return;
    var program;
    try {
      program = window.Planner.build(currentInput());
    } catch (e) {
      host.innerHTML = '<p class="small muted">Choose a discipline to see the verdict.</p>';
      return;
    }
    var v = program.verdict;
    host.innerHTML = '';

    host.appendChild(el('div', { class: 'stat', style: 'margin-bottom:1.25rem' }, [
      el('span', { class: 'stat__value', text: program.totalHours + ' h' }),
      el('span', { class: 'stat__label', text: 'total deliberate practice' })
    ]));

    host.appendChild(el('p', {
      class: 'small',
      style: 'margin:0 0 0.5rem;font-weight:600;color:var(--accent)',
      text: v.headline
    }));
    host.appendChild(el('p', { class: 'small muted', text: v.statement }));

    var ladder = el('div', { class: 'ladder', style: 'margin:1.25rem 0' });
    window.Planner.levels.forEach(function (lv) {
      var need = program.discipline.hours[lv.key];
      var stateAttr = v.effectiveHours >= need ? 'reached' : 'beyond';
      ladder.appendChild(el('div', { class: 'ladder__row', 'data-state': stateAttr }, [
        el('span', { class: 'ladder__name', text: lv.label }),
        el('span', { class: 'ladder__hours', text: need + ' h' }),
        el('span', { class: 'small', text: program.discipline.proofs[lv.key] })
      ]));
    });
    host.appendChild(ladder);

    if (v.bankedHours > 0) {
      host.appendChild(el('p', {
        class: 'tiny muted',
        text: 'Includes roughly ' + v.bankedHours + ' hours credited for your stated starting level.'
      }));
    }

    if (program.scope.dropped.length) {
      host.appendChild(el('div', { class: 'notice', style: 'margin-top:1rem' }, [
        el('strong', { class: 'small', text: 'Scope narrowed. ' }),
        el('span', {
          class: 'small',
          text: 'These hours cover ' + program.scope.included.length + ' of ' +
            program.discipline.pillars.length + ' pillars properly rather than all of them badly. ' +
            'Cut: ' + program.scope.dropped.map(function (d) { return d.name; }).join(', ') + '.'
        })
      ]));
    }

    v.warnings.forEach(function (w) {
      host.appendChild(el('div', { class: 'notice notice--flat', style: 'margin-top:0.5rem' }, [
        el('span', { class: 'small', text: w })
      ]));
    });

    host.appendChild(el('p', {
      class: 'tiny muted',
      style: 'margin-top:1rem;border-top:1px solid var(--rule);padding-top:0.75rem',
      text: program.phases.length + ' phases · ' + program.sessionCount + ' sessions · ' +
        program.phases.length + ' gates · ' + window.Planner.fmtShort(program.startDate) +
        ' → ' + window.Planner.fmtShort(program.endDate)
    }));
  }

  /* -------------------------------------------------------------- submit */

  function wireSubmit() {
    var form = document.getElementById('builder');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var program = window.Planner.build(currentInput());
      if (window.Store.saveProgram(program)) {
        location.href = 'program.html';
      } else {
        window.App.toast('Could not save. This browser is blocking local storage.');
      }
    });
    var reset = document.getElementById('reset-form');
    if (reset) {
      reset.addEventListener('click', function () {
        document.getElementById('f-weeks').value = 12;
        document.getElementById('f-hours').value = 8;
        document.getElementById('f-days').value = 5;
        document.getElementById('f-objective').value = '';
        document.getElementById('f-start').value = new Date().toISOString().slice(0, 10);
        state.level = 'novice';
        document.querySelectorAll('#f-level .choice').forEach(function (b) {
          b.setAttribute('aria-pressed', String(b.getAttribute('data-value') === 'novice'));
        });
        ['v-weeks', 'v-hours', 'v-days'].forEach(function (id, i) {
          document.getElementById(id).textContent = [12, 8, 5][i];
        });
        updateSessionLength();
        updatePreview();
      });
    }
  }

  /* ------------------------------------------------------------- teaser */

  function renderTeaser() {
    var host = document.getElementById('dispatch-teaser');
    if (!host || !window.DispatchCore) return;
    var saved = window.Store.getDispatch();
    var pick = window.DispatchCore.entryFor(saved.track || 'stoic');
    var e = pick.entry;
    host.appendChild(el('div', { class: 'dispatch' }, [
      el('span', { class: 'eyebrow', text: pick.track.name + ' · today' }),
      el('blockquote', { class: 'dispatch__source', text: e.source }),
      el('div', { class: 'dispatch__author', text: e.author }),
      el('div', { class: 'dispatch__grid' }, [
        el('div', { class: 'dispatch__block' }, [
          el('h4', { text: 'The reading' }),
          el('p', { text: e.reading })
        ]),
        el('div', { class: 'dispatch__block' }, [
          el('h4', { text: 'Today’s practice' }),
          el('p', { text: e.practice })
        ]),
        el('div', { class: 'dispatch__block' }, [
          el('h4', { text: 'The counterweight' }),
          el('p', { text: e.tension })
        ])
      ])
    ]));
  }

  /* ---------------------------------------------------------------- init */

  document.addEventListener('DOMContentLoaded', function () {
    /* Resume from a saved program if one exists, so the form reflects it. */
    var existing = window.Store.loadProgram();
    if (existing) {
      state.disciplineId = existing.input.disciplineId;
      state.level = existing.input.level;
    }

    fillStats();
    renderCatalog();
    fillSelect();
    wireLevel();
    wireRanges();
    wireSubmit();
    renderTeaser();

    if (existing) {
      document.getElementById('f-weeks').value = existing.input.weeks;
      document.getElementById('f-hours').value = existing.input.hoursPerWeek;
      document.getElementById('f-days').value = existing.input.daysPerWeek;
      document.getElementById('f-objective').value = existing.input.objective || '';
      document.getElementById('v-weeks').textContent = existing.input.weeks;
      document.getElementById('v-hours').textContent = existing.input.hoursPerWeek;
      document.getElementById('v-days').textContent = existing.input.daysPerWeek;
      document.querySelectorAll('#f-level .choice').forEach(function (b) {
        b.setAttribute('aria-pressed', String(b.getAttribute('data-value') === existing.input.level));
      });
      updateSessionLength();
    }

    syncCatalog();
    updateThesis();
    updatePreview();
  });
})();
