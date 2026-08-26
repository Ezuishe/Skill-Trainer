/*
 * evidence.js — files you attach to a session.
 *
 * The site's promise is that nothing leaves your browser, so evidence lives in
 * IndexedDB rather than being uploaded anywhere. A recording of a talk, a draft,
 * a screenshot of a chart, a photo of a page: whatever proves the session
 * happened and lets you compare week one against week twelve.
 *
 * Everything here returns a promise and fails soft. A browser with IndexedDB
 * disabled still gets a working plan, just without attachments.
 */

(function () {
  'use strict';

  var DB_NAME = 'skill-trainer';
  var DB_VERSION = 1;
  var STORE = 'evidence';

  /* Per-file cap. IndexedDB quotas vary and a browser that runs out mid-write
   * throws, so refuse politely rather than corrupting the record. */
  var MAX_FILE_BYTES = 25 * 1024 * 1024;

  var dbPromise = null;
  var unavailable = false;

  function openDb() {
    if (unavailable) return Promise.reject(new Error('storage unavailable'));
    if (dbPromise) return dbPromise;

    dbPromise = new Promise(function (resolve, reject) {
      if (typeof indexedDB === 'undefined' || !indexedDB) {
        unavailable = true;
        reject(new Error('This browser has no IndexedDB, so attachments are off.'));
        return;
      }
      var req;
      try {
        req = indexedDB.open(DB_NAME, DB_VERSION);
      } catch (e) {
        unavailable = true;
        reject(e);
        return;
      }
      req.onupgradeneeded = function () {
        var db = req.result;
        if (!db.objectStoreNames.contains(STORE)) {
          var store = db.createObjectStore(STORE, { keyPath: 'id' });
          store.createIndex('bySession', 'sessionKey', { unique: false });
        }
      };
      req.onsuccess = function () { resolve(req.result); };
      req.onerror = function () {
        unavailable = true;
        reject(req.error || new Error('Could not open local storage.'));
      };
    });
    return dbPromise;
  }

  function tx(mode) {
    return openDb().then(function (db) {
      return db.transaction(STORE, mode).objectStore(STORE);
    });
  }

  function request(makeRequest) {
    return new Promise(function (resolve, reject) {
      var req;
      try { req = makeRequest(); } catch (e) { reject(e); return; }
      req.onsuccess = function () { resolve(req.result); };
      req.onerror = function () { reject(req.error); };
    });
  }

  function newId() {
    return 'ev-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8);
  }

  /* ------------------------------------------------------------------ api */

  function add(sessionKey, file) {
    if (!file) return Promise.reject(new Error('No file.'));
    if (file.size > MAX_FILE_BYTES) {
      return Promise.reject(new Error(
        file.name + ' is ' + formatBytes(file.size) + '. The limit is ' +
        formatBytes(MAX_FILE_BYTES) + ' per file, because this is stored in your browser.'
      ));
    }
    var record = {
      id: newId(),
      sessionKey: sessionKey,
      name: file.name,
      type: file.type || 'application/octet-stream',
      size: file.size,
      addedAt: new Date().toISOString(),
      blob: file
    };
    return tx('readwrite')
      .then(function (store) { return request(function () { return store.add(record); }); })
      .then(function () { return record; })
      .catch(function (e) {
        if (e && (e.name === 'QuotaExceededError' || /quota/i.test(e.message || ''))) {
          throw new Error('Your browser is out of storage space for this site. Remove some older evidence first.');
        }
        throw e;
      });
  }

  function listFor(sessionKey) {
    return tx('readonly')
      .then(function (store) {
        return request(function () { return store.index('bySession').getAll(sessionKey); });
      })
      .then(function (rows) {
        return (rows || []).sort(function (a, b) {
          return a.addedAt < b.addedAt ? -1 : 1;
        });
      })
      .catch(function () { return []; });
  }

  function countAll() {
    return tx('readonly')
      .then(function (store) { return request(function () { return store.getAll(); }); })
      .then(function (rows) {
        var bytes = (rows || []).reduce(function (a, r) { return a + (r.size || 0); }, 0);
        var perSession = {};
        (rows || []).forEach(function (r) {
          perSession[r.sessionKey] = (perSession[r.sessionKey] || 0) + 1;
        });
        return { files: (rows || []).length, bytes: bytes, perSession: perSession };
      })
      .catch(function () { return { files: 0, bytes: 0, perSession: {} }; });
  }

  function remove(id) {
    return tx('readwrite')
      .then(function (store) { return request(function () { return store.delete(id); }); })
      .catch(function () { return null; });
  }

  function removeFor(sessionKey) {
    return listFor(sessionKey).then(function (rows) {
      return Promise.all(rows.map(function (r) { return remove(r.id); }));
    });
  }

  function clearAll() {
    return tx('readwrite')
      .then(function (store) { return request(function () { return store.clear(); }); })
      .catch(function () { return null; });
  }

  /* A temporary URL for viewing or downloading. Callers revoke it. */
  function urlFor(record) {
    try { return URL.createObjectURL(record.blob); } catch (e) { return null; }
  }

  function formatBytes(n) {
    if (n < 1024) return n + ' B';
    if (n < 1024 * 1024) return Math.round(n / 1024) + ' KB';
    return (Math.round((n / (1024 * 1024)) * 10) / 10) + ' MB';
  }

  function isAvailable() {
    return typeof indexedDB !== 'undefined' && !!indexedDB && !unavailable;
  }

  window.Evidence = {
    add: add,
    listFor: listFor,
    countAll: countAll,
    remove: remove,
    removeFor: removeFor,
    clearAll: clearAll,
    urlFor: urlFor,
    formatBytes: formatBytes,
    isAvailable: isAvailable,
    MAX_FILE_BYTES: MAX_FILE_BYTES
  };
})();
