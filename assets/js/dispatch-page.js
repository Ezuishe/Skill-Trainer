/*
 * dispatch-page.js — today's dispatch, the archive, and kept passages.
 */

(function () {
  'use strict';

  var el = window.App.el;
  var Core = window.DispatchCore;
  var trackId = null;

  function longDate(d) {
    return d.toLocaleDateString('en-GB', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    });
  }

  function shortDate(d) {
    return d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
  }

  /* -------------------------------------------------------------- tracks */

  function renderTracks() {
    var host = document.getElementById('tracks');
    host.innerHTML = '';
    Core.allTracks().forEach(function (t) {
      host.appendChild(el('button', {
        class: 'track',
        type: 'button',
        'aria-pressed': String(t.id === trackId),
        text: t.name,
        onclick: function () {
          trackId = t.id;
          window.Store.setTrack(t.id);
          renderAll();
        }
      }));
    });
    var track = Core.getTrack(trackId);
    var premise = document.getElementById('track-premise');
    premise.textContent = track.premise + ' (' + track.period + ')';
  }

  /* --------------------------------------------------------------- today */

  function renderToday() {
    var host = document.getElementById('today');
    host.innerHTML = '';
    var pick = Core.entryFor(trackId);
    var e = pick.entry;
    var saved = window.Store.getDispatch();
    var isKept = (saved.saved || []).indexOf(pick.key) !== -1;

    var card = el('article', { class: 'dispatch' }, [
      el('span', { class: 'eyebrow', text: pick.track.name }),
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
      ]),
      el('div', { class: 'btn-row no-print', style: 'margin-top:2rem' }, [
        el('button', {
          class: isKept ? 'btn' : 'btn btn--ghost',
          type: 'button',
          text: isKept ? 'Kept' : 'Keep this',
          onclick: function () {
            window.Store.toggleSaved(pick.key);
            renderAll();
          }
        }),
        el('button', {
          class: 'btn btn--ghost', type: 'button', text: 'Copy',
          onclick: function () {
            var text = '"' + e.source + '"\n— ' + e.author + '\n\n' + e.reading +
              '\n\nPractice: ' + e.practice + '\n\nCounterweight: ' + e.tension;
            window.App.copy(text).then(function () {
              window.App.toast('Copied.');
            }, function () {
              window.App.toast('Clipboard blocked by the browser.');
            });
          }
        })
      ])
    ]);
    host.appendChild(card);
  }

  /* ------------------------------------------------------------- archive */

  function entryRow(pick, showDate) {
    var e = pick.entry;
    var saved = window.Store.getDispatch();
    var isKept = (saved.saved || []).indexOf(pick.key) !== -1;
    var open = false;

    var detail = el('div', { style: 'display:none;margin-top:0.75rem' }, [
      el('p', { class: 'small muted', style: 'margin:0 0 0.5rem' }, [
        el('strong', { text: 'Reading. ' }), document.createTextNode(e.reading)
      ]),
      el('p', { class: 'small muted', style: 'margin:0 0 0.5rem' }, [
        el('strong', { text: 'Practice. ' }), document.createTextNode(e.practice)
      ]),
      el('p', { class: 'small muted', style: 'margin:0' }, [
        el('strong', { text: 'Counterweight. ' }), document.createTextNode(e.tension)
      ])
    ]);

    var body = el('div', {}, [
      el('div', { class: 'archive-item__source', text: '“' + e.source + '”' }),
      el('div', { class: 'archive-item__author', text: e.author + ' · ' + pick.track.name }),
      detail,
      el('div', { class: 'btn-row no-print', style: 'margin-top:0.75rem' }, [
        el('button', {
          class: 'btn btn--small btn--ghost', type: 'button', text: 'Read',
          onclick: function (ev) {
            open = !open;
            detail.style.display = open ? 'block' : 'none';
            ev.currentTarget.textContent = open ? 'Hide' : 'Read';
          }
        }),
        el('button', {
          class: 'btn btn--small btn--ghost', type: 'button', text: isKept ? 'Kept' : 'Keep',
          onclick: function () {
            window.Store.toggleSaved(pick.key);
            renderAll();
          }
        })
      ])
    ]);

    return el('div', { class: 'archive-item' }, [
      el('div', { class: 'archive-item__date', text: showDate ? shortDate(pick.date) : pick.track.name }),
      body
    ]);
  }

  function renderArchive() {
    var host = document.getElementById('archive');
    host.innerHTML = '';
    Core.archiveFor(trackId, 14).forEach(function (pick) {
      host.appendChild(entryRow(pick, true));
    });
  }

  /* --------------------------------------------------------------- saved */

  function renderSaved() {
    var host = document.getElementById('saved');
    host.innerHTML = '';
    var saved = window.Store.getDispatch().saved || [];
    if (!saved.length) {
      host.appendChild(el('div', { class: 'empty' }, [
        el('p', {
          class: 'small', style: 'margin:0',
          text: 'Nothing kept yet. Keep the passages you intend to return to — the practice line is the part worth revisiting.'
        })
      ]));
      return;
    }
    saved.forEach(function (key) {
      var parts = key.split(':');
      var track = Core.getTrack(parts[0]);
      var entry = track.entries[parseInt(parts[1], 10)];
      if (!entry) return;
      host.appendChild(entryRow({ track: track, entry: entry, key: key, date: new Date() }, false));
    });
  }

  /* ---------------------------------------------------------------- init */

  function renderAll() {
    renderTracks();
    renderToday();
    renderArchive();
    renderSaved();
  }

  document.addEventListener('DOMContentLoaded', function () {
    var saved = window.Store.getDispatch();
    trackId = saved.track || 'stoic';
    if (!saved.track) window.Store.setTrack(trackId);

    document.getElementById('today-date').textContent = longDate(new Date());
    var d = window.Store.markRead();
    document.getElementById('streak').textContent = d.streak || 1;

    renderAll();
  });
})();
