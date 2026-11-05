/**
 * Playtest IndexedDB + ZIP-Export (logs/ + notes/).
 */
(function (global) {
  'use strict';

  var DB_NAME = 'dc_playtest';
  var DB_VER = 1;
  var dbPromise = null;

  function openDb() {
    if (dbPromise) return dbPromise;
    dbPromise = new Promise(function (resolve, reject) {
      if (!global.indexedDB) {
        reject(new Error('IndexedDB nicht verfügbar (Inkognito?)'));
        return;
      }
      var req = indexedDB.open(DB_NAME, DB_VER);
      req.onupgradeneeded = function () {
        var db = req.result;
        if (!db.objectStoreNames.contains('games')) {
          db.createObjectStore('games', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('notes')) {
          db.createObjectStore('notes', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('meta')) {
          db.createObjectStore('meta', { keyPath: 'key' });
        }
      };
      req.onsuccess = function () { resolve(req.result); };
      req.onerror = function () { reject(req.error || new Error('IndexedDB open failed')); };
    });
    return dbPromise;
  }

  function txDone(tx) {
    return new Promise(function (resolve, reject) {
      tx.oncomplete = function () { resolve(); };
      tx.onerror = function () { reject(tx.error); };
      tx.onabort = function () { reject(tx.error || new Error('aborted')); };
    });
  }

  function put(store, value) {
    return openDb().then(function (db) {
      var tx = db.transaction(store, 'readwrite');
      tx.objectStore(store).put(value);
      return txDone(tx).then(function () { return value; });
    });
  }

  function get(store, key) {
    return openDb().then(function (db) {
      return new Promise(function (resolve, reject) {
        var tx = db.transaction(store, 'readonly');
        var req = tx.objectStore(store).get(key);
        req.onsuccess = function () { resolve(req.result || null); };
        req.onerror = function () { reject(req.error); };
      });
    });
  }

  function getAll(store) {
    return openDb().then(function (db) {
      return new Promise(function (resolve, reject) {
        var tx = db.transaction(store, 'readonly');
        var req = tx.objectStore(store).getAll();
        req.onsuccess = function () { resolve(req.result || []); };
        req.onerror = function () { reject(req.error); };
      });
    });
  }

  function del(store, key) {
    return openDb().then(function (db) {
      var tx = db.transaction(store, 'readwrite');
      tx.objectStore(store).delete(key);
      return txDone(tx);
    });
  }

  function clearStore(store) {
    return openDb().then(function (db) {
      var tx = db.transaction(store, 'readwrite');
      tx.objectStore(store).clear();
      return txDone(tx);
    });
  }

  function uid(prefix) {
    return (prefix || 'x') + '_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8);
  }

  /* --- CRC32 / ZIP (store only) --- */
  var CRC_TABLE = (function () {
    var t = new Uint32Array(256);
    for (var n = 0; n < 256; n++) {
      var c = n;
      for (var k = 0; k < 8; k++) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
      t[n] = c >>> 0;
    }
    return t;
  })();

  function crc32(bytes) {
    var c = 0xffffffff;
    for (var i = 0; i < bytes.length; i++) c = CRC_TABLE[(c ^ bytes[i]) & 0xff] ^ (c >>> 8);
    return (c ^ 0xffffffff) >>> 0;
  }

  function strToUtf8(str) {
    return new TextEncoder().encode(str);
  }

  function u16(n) { return [n & 0xff, (n >>> 8) & 0xff]; }
  function u32(n) {
    return [n & 0xff, (n >>> 8) & 0xff, (n >>> 16) & 0xff, (n >>> 24) & 0xff];
  }

  function buildZip(files) {
    // files: [{ name, text }]
    var localParts = [];
    var centralParts = [];
    var offset = 0;
    files.forEach(function (f) {
      var nameBytes = strToUtf8(f.name);
      var data = strToUtf8(f.text);
      var crc = crc32(data);
      var local = [];
      local.push(0x50, 0x4b, 0x03, 0x04); // sig
      local.push.apply(local, u16(20)); // version
      local.push.apply(local, u16(0)); // flags
      local.push.apply(local, u16(0)); // method store
      local.push.apply(local, u16(0)); // time
      local.push.apply(local, u16(0)); // date
      local.push.apply(local, u32(crc));
      local.push.apply(local, u32(data.length));
      local.push.apply(local, u32(data.length));
      local.push.apply(local, u16(nameBytes.length));
      local.push.apply(local, u16(0)); // extra
      for (var i = 0; i < nameBytes.length; i++) local.push(nameBytes[i]);
      for (var j = 0; j < data.length; j++) local.push(data[j]);
      var localArr = new Uint8Array(local);
      localParts.push(localArr);

      var central = [];
      central.push(0x50, 0x4b, 0x01, 0x02);
      central.push.apply(central, u16(20));
      central.push.apply(central, u16(20));
      central.push.apply(central, u16(0));
      central.push.apply(central, u16(0));
      central.push.apply(central, u16(0));
      central.push.apply(central, u16(0));
      central.push.apply(central, u32(crc));
      central.push.apply(central, u32(data.length));
      central.push.apply(central, u32(data.length));
      central.push.apply(central, u16(nameBytes.length));
      central.push.apply(central, u16(0));
      central.push.apply(central, u16(0));
      central.push.apply(central, u16(0));
      central.push.apply(central, u16(0));
      central.push.apply(central, u32(0));
      central.push.apply(central, u32(offset));
      for (var k = 0; k < nameBytes.length; k++) central.push(nameBytes[k]);
      centralParts.push(new Uint8Array(central));
      offset += localArr.length;
    });
    var centralSize = centralParts.reduce(function (s, p) { return s + p.length; }, 0);
    var end = [];
    end.push(0x50, 0x4b, 0x05, 0x06);
    end.push.apply(end, u16(0));
    end.push.apply(end, u16(0));
    end.push.apply(end, u16(files.length));
    end.push.apply(end, u16(files.length));
    end.push.apply(end, u32(centralSize));
    end.push.apply(end, u32(offset));
    end.push.apply(end, u16(0));
    var total = offset + centralSize + end.length;
    var out = new Uint8Array(total);
    var pos = 0;
    localParts.forEach(function (p) { out.set(p, pos); pos += p.length; });
    centralParts.forEach(function (p) { out.set(p, pos); pos += p.length; });
    out.set(new Uint8Array(end), pos);
    return out;
  }

  function downloadBlob(blob, filename) {
    var a = document.createElement('a');
    var url = URL.createObjectURL(blob);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      URL.revokeObjectURL(url);
      a.remove();
    }, 1500);
  }

  /* Chat wird nie exportiert: entfernt rekursiv Chat-Felder und Chat-Ereignisse, auch aus alten Partien. */
  function isChatKey(k) { return /^chat/i.test(k); }
  function isChatEvent(v) {
    return !!(v && typeof v === 'object' && !Array.isArray(v) &&
      [v.type, v.kind, v.event, v.action && v.action.type].some(function (x) { return /^chat$/i.test(String(x || '')); }));
  }
  function stripChat(v) {
    if (Array.isArray(v)) return v.filter(function (x) { return !isChatEvent(x); }).map(stripChat);
    if (v && typeof v === 'object') {
      var out = {};
      Object.keys(v).forEach(function (k) { if (!isChatKey(k)) out[k] = stripChat(v[k]); });
      return out;
    }
    return v;
  }

  function exportAll(opts) {
    opts = opts || {};
    var api = global.DCPlayStore || { getAll: getAll };
    return Promise.all([api.getAll('games'), api.getAll('notes')]).then(function (pair) {
      var games = pair[0].map(stripChat).sort(function (a, b) {
        return String(a.startedAt || '').localeCompare(String(b.startedAt || ''));
      });
      var notes = pair[1].slice().sort(function (a, b) {
        return String(a.t || '').localeCompare(String(b.t || ''));
      });
      var stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
      var files = [];
      files.push({
        name: 'manifest.json',
        text: JSON.stringify({
          schema: 1,
          exportedAt: new Date().toISOString(),
          version: global.DC_VERSION || '',
          build: global.DC_BUILD_LABEL || '',
          gameCount: games.length,
          noteCount: notes.length
        }, null, 2)
      });
      games.forEach(function (g) {
        var safe = String(g.id || 'game').replace(/[^\w.-]+/g, '_');
        files.push({ name: 'logs/' + safe + '.json', text: JSON.stringify(g, null, 2) });
      });
      notes.forEach(function (n) {
        var safe = String(n.id || 'note').replace(/[^\w.-]+/g, '_');
        files.push({ name: 'notes/' + safe + '.json', text: JSON.stringify(n, null, 2) });
      });
      files.push({
        name: 'notes/_index.json',
        text: JSON.stringify(notes.map(function (n) {
          return { id: n.id, t: n.t, category: n.category, text: n.text, gameId: n.gameId || null };
        }), null, 2)
      });
      var zipBytes = (api.buildZip || buildZip)(files);
      var blob = new Blob([zipBytes], { type: 'application/zip' });
      var filename = 'dc_playtest_' + stamp + '.zip';
      if (!opts.silent) (api.downloadBlob || downloadBlob)(blob, filename);
      return { filename: filename, blob: blob, games: games, notes: notes, files: files };
    });
  }

  global.DCPlayStore = {
    openDb: openDb,
    put: put,
    get: get,
    getAll: getAll,
    del: del,
    clearStore: clearStore,
    uid: uid,
    buildZip: buildZip,
    exportAll: exportAll,
    stripChat: stripChat,
    downloadBlob: downloadBlob,
    DB_NAME: DB_NAME
  };
})(typeof window !== 'undefined' ? window : globalThis);
