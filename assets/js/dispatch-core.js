/*
 * dispatch-core.js — deterministic daily selection.
 *
 * The entry for a given day is a pure function of the date and the track, so
 * every reader on a track sees the same passage on the same day, it does not
 * change on refresh, and the archive can be reconstructed backwards without
 * storing anything.
 */

(function () {
  'use strict';

  var MS_PER_DAY = 86400000;

  function dayIndex(date) {
    var d = date || new Date();
    /* Local midnight, so the dispatch turns over at the reader's midnight
     * rather than UTC's. */
    var local = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    return Math.floor(local.getTime() / MS_PER_DAY);
  }

  function hash(str) {
    var h = 0;
    for (var i = 0; i < str.length; i++) {
      h = (h << 5) - h + str.charCodeAt(i);
      h |= 0;
    }
    return Math.abs(h);
  }

  function getTrack(trackId) {
    var tracks = window.DISPATCH_TRACKS;
    return tracks.filter(function (t) { return t.id === trackId; })[0] || tracks[0];
  }

  function entryFor(trackId, date) {
    var track = getTrack(trackId);
    var n = track.entries.length;
    var idx = (dayIndex(date) + hash(track.id)) % n;
    var entry = track.entries[idx];
    return {
      track: track,
      entry: entry,
      index: idx,
      key: track.id + ':' + idx,
      date: date || new Date(),
      dayNumber: dayIndex(date)
    };
  }

  function archiveFor(trackId, days, endDate) {
    var out = [];
    var end = endDate || new Date();
    for (var i = 1; i <= days; i++) {
      var d = new Date(end.getFullYear(), end.getMonth(), end.getDate() - i);
      out.push(entryFor(trackId, d));
    }
    return out;
  }

  function allTracks() { return window.DISPATCH_TRACKS; }

  window.DispatchCore = {
    entryFor: entryFor,
    archiveFor: archiveFor,
    getTrack: getTrack,
    allTracks: allTracks,
    dayIndex: dayIndex
  };
})();
