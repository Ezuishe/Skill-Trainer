/*
 * store.js — local persistence.
 *
 * Everything lives in this browser. No account, no server, no telemetry.
 * The program itself is stored as its inputs and rebuilt deterministically by
 * the planner, so the plan and the code that generates it never drift apart.
 */

(function () {
  'use strict';

  var KEYS = {
    program: 'st.program',
    progress: 'st.progress',
    dispatch: 'st.dispatch',
    theme: 'st.theme'
  };

  function read(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function write(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      return false;
    }
  }

  function todayKey() {
    var d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' +
      String(d.getDate()).padStart(2, '0');
  }

  /* ------------------------------------------------------------- program */

  function saveProgram(program) {
    return write(KEYS.program, {
      id: program.id,
      input: program.input,
      createdAt: program.createdAt
    });
  }

  function loadProgram() {
    var saved = read(KEYS.program, null);
    if (!saved || !saved.input) return null;
    try {
      var program = window.Planner.build(saved.input);
      program.id = saved.id;
      program.createdAt = saved.createdAt;
      return program;
    } catch (e) {
      return null;
    }
  }

  function clearProgram() {
    try {
      localStorage.removeItem(KEYS.program);
      localStorage.removeItem(KEYS.progress);
    } catch (e) { /* storage unavailable; nothing to clear */ }
  }

  /* ------------------------------------------------------------ progress */

  function blankProgress(id) {
    /* `records` holds what you thought of a session: a score, how hard it felt,
     * and a note. `sessions` stays the simple done-marker so older saved
     * progress keeps working. */
    return { id: id, sessions: {}, gates: {}, logs: [], hours: 0, records: {} };
  }

  function getProgress(id) {
    var p = read(KEYS.progress, null);
    if (!p || p.id !== id) return blankProgress(id);
    if (!p.records) p.records = {};
    return p;
  }

  function setProgress(p) { write(KEYS.progress, p); return p; }

  function toggleSession(id, key, hours) {
    var p = getProgress(id);
    if (p.sessions[key]) {
      delete p.sessions[key];
      p.hours = Math.max(0, Math.round((p.hours - hours) * 10) / 10);
    } else {
      p.sessions[key] = todayKey();
      p.hours = Math.round((p.hours + hours) * 10) / 10;
    }
    return setProgress(p);
  }

  function toggleGateCriterion(id, key) {
    var p = getProgress(id);
    if (p.gates[key]) delete p.gates[key]; else p.gates[key] = todayKey();
    return setProgress(p);
  }

  /* Score how the session went, and how hard it felt. Difficulty drives the
   * calibration advice: the method targets a 50-85% success rate, so a run of
   * "too easy" means the difficulty should go up. */
  function setRecord(id, key, patch) {
    var p = getProgress(id);
    var current = p.records[key] || {};
    Object.keys(patch).forEach(function (k) {
      if (patch[k] === null) delete current[k];
      else current[k] = patch[k];
    });
    current.at = current.at || todayKey();
    current.updated = todayKey();
    p.records[key] = current;
    return setProgress(p);
  }

  function getRecord(id, key) {
    return getProgress(id).records[key] || {};
  }

  function clearRecord(id, key) {
    var p = getProgress(id);
    delete p.records[key];
    return setProgress(p);
  }

  function addLog(id, text) {
    var p = getProgress(id);
    p.logs.unshift({ date: todayKey(), at: new Date().toISOString(), text: text });
    p.logs = p.logs.slice(0, 200);
    return setProgress(p);
  }

  function deleteLog(id, at) {
    var p = getProgress(id);
    p.logs = p.logs.filter(function (l) { return l.at !== at; });
    return setProgress(p);
  }

  /* ------------------------------------------------------------ dispatch */

  function getDispatch() {
    return read(KEYS.dispatch, { track: null, streak: 0, lastRead: null, saved: [] });
  }

  function setTrack(trackId) {
    var d = getDispatch();
    d.track = trackId;
    return write(KEYS.dispatch, d) ? d : d;
  }

  function markRead() {
    var d = getDispatch();
    var today = todayKey();
    if (d.lastRead === today) return d;
    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    var yKey = yesterday.getFullYear() + '-' +
      String(yesterday.getMonth() + 1).padStart(2, '0') + '-' +
      String(yesterday.getDate()).padStart(2, '0');
    d.streak = d.lastRead === yKey ? (d.streak || 0) + 1 : 1;
    d.lastRead = today;
    write(KEYS.dispatch, d);
    return d;
  }

  function toggleSaved(entryKey) {
    var d = getDispatch();
    d.saved = d.saved || [];
    var i = d.saved.indexOf(entryKey);
    if (i === -1) d.saved.unshift(entryKey); else d.saved.splice(i, 1);
    d.saved = d.saved.slice(0, 100);
    write(KEYS.dispatch, d);
    return d;
  }

  /* --------------------------------------------------------------- theme */

  function getTheme() { return read(KEYS.theme, null); }
  function setTheme(t) { write(KEYS.theme, t); }

  window.Store = {
    saveProgram: saveProgram,
    loadProgram: loadProgram,
    clearProgram: clearProgram,
    getProgress: getProgress,
    toggleSession: toggleSession,
    setRecord: setRecord,
    getRecord: getRecord,
    clearRecord: clearRecord,
    toggleGateCriterion: toggleGateCriterion,
    addLog: addLog,
    deleteLog: deleteLog,
    getDispatch: getDispatch,
    setTrack: setTrack,
    markRead: markRead,
    toggleSaved: toggleSaved,
    getTheme: getTheme,
    setTheme: setTheme,
    todayKey: todayKey
  };
})();
