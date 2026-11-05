/**
 * Partie-Logger — immer an, schreibt nach IndexedDB.
 */
(function (global) {
  'use strict';

  var current = null;
  var lastActionAt = 0;
  var persistTimer = null;
  var dirty = false;

  function nowIso() { return new Date().toISOString(); }

  function nationFromDeck(deckSelId) {
    try {
      if (global.DCLib && DCLib.selectedDeck) {
        var d = DCLib.selectedDeck(deckSelId);
        if (d) {
          var id = String(d.id || '');
          if (id.indexOf('nation:') === 0) return id.slice(7);
          return d.nation || d.name || id || null;
        }
      }
    } catch (e) {}
    return null;
  }

  function doctrineNames(engine, ids) {
    return (ids || []).map(function (id) {
      var def = engine && engine.byId && engine.byId[id];
      return { id: id, name: (def && def.name) || id };
    });
  }

  function frontSnap(engine, pid) {
    var p = engine.player(pid);
    var out = { L: [], C: [], R: [] };
    ['L', 'C', 'R'].forEach(function (sec) {
      (p.front[sec] || []).forEach(function (inst, row) {
        if (!inst) return;
        var def = engine.defOf(inst) || {};
        var ad = engine.currentAtkDef ? engine.currentAtkDef(inst) : { atk: inst.atk, def: inst.def };
        out[sec].push({
          row: row,
          id: def.id || null,
          name: def.name || '?',
          uid: inst.uid,
          atk: ad.atk,
          def: ad.def,
          facedown: !!inst.facedown
        });
      });
    });
    return out;
  }

  function sanitizeAction(action) {
    if (!action || typeof action !== 'object') return action;
    var copy = {};
    Object.keys(action).forEach(function (k) {
      if (k === 'state' || k === 'engine') return;
      var v = action[k];
      if (v == null || typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean') copy[k] = v;
      else if (Array.isArray(v) || (typeof v === 'object' && v.section != null)) {
        try { copy[k] = JSON.parse(JSON.stringify(v)); } catch (e) { copy[k] = String(v); }
      } else copy[k] = String(v);
    });
    return copy;
  }

  function schedulePersist() {
    dirty = true;
    if (persistTimer) return;
    persistTimer = setTimeout(function () {
      persistTimer = null;
      if (!dirty || !current) return;
      dirty = false;
      flush();
    }, 400);
  }

  function flush() {
    if (!current || !global.DCPlayStore) return Promise.resolve();
    return global.DCPlayStore.put('games', current).catch(function (err) {
      console.warn('[playtest] persist', err);
    });
  }

  function controllerFor(mode, pid, you) {
    if (mode === 'bot') return pid === 0 ? 'human' : 'bot';
    if (mode === 'hotseat') return 'human';
    if (mode === 'lan' || mode === 'host' || mode === 'join') {
      if (you == null) return pid === 0 ? 'human' : 'remote';
      return pid === you ? 'human' : 'remote';
    }
    return 'human';
  }

  function beginMatch(opts) {
    opts = opts || {};
    var engine = opts.engine;
    if (!engine || !engine.state) return null;
    var mode = opts.mode || engine.state.mode || 'hotseat';
    var you = opts.you != null ? opts.you : 0;
    var p0 = engine.player(0);
    var p1 = engine.player(1);
    var nat0 = opts.nation0 || nationFromDeck(mode === 'lan' ? 'deck-pick-lan' : 'deck-pick-single');
    var nat1 = opts.nation1 || (mode === 'bot' ? nationFromDeck('deck-pick-bot') : null);
    var d0 = (p0.doctrines || []).map(function (d) { return (engine.defOf(d) || {}).id || d.id || d; });
    var d1 = (p1.doctrines || []).map(function (d) { return (engine.defOf(d) || {}).id || d.id || d; });
    current = {
      id: global.DCPlayStore.uid('game'),
      schema: 1,
      startedAt: nowIso(),
      endedAt: null,
      version: global.DC_VERSION || '',
      build: global.DC_BUILD_LABEL || '',
      mode: mode,
      seed: engine.state.seed != null ? engine.state.seed : opts.seed,
      startPlayer: engine.state.active,
      coin: engine.state.startCoin || null,
      players: [
        {
          id: 0,
          name: p0.name,
          nation: nat0,
          doctrines: doctrineNames(engine, d0),
          controller: controllerFor(mode, 0, you)
        },
        {
          id: 1,
          name: p1.name,
          nation: nat1,
          doctrines: doctrineNames(engine, d1),
          controller: controllerFor(mode, 1, you)
        }
      ],
      turns: [],
      chat: [],
      end: null
    };
    lastActionAt = Date.now();
    schedulePersist();
    return current;
  }

  function botSuggest(engine, playerId) {
    try {
      if (!global.DCBot || !global.DCBot.step) return null;
      var act = global.DCBot.step(engine, playerId);
      return act ? sanitizeAction(act) : null;
    } catch (e) {
      return null;
    }
  }

  function actionsEqual(a, b) {
    if (!a || !b) return false;
    if (a.type !== b.type) return false;
    if (a.uid && b.uid && a.uid !== b.uid) return false;
    if (a.target != null && b.target != null && String(a.target) !== String(b.target)) return false;
    if (a.slot && b.slot) {
      if (a.slot.section !== b.slot.section || Number(a.slot.row) !== Number(b.slot.row)) return false;
    }
    return true;
  }

  function recordAction(opts) {
    if (!current || !opts || !opts.engine) return;
    var engine = opts.engine;
    var action = opts.action || {};
    var res = opts.result || {};
    var tNow = Date.now();
    var thinkMs = lastActionAt ? (tNow - lastActionAt) : null;
    lastActionAt = tNow;
    var pid = action.player != null ? action.player : engine.state.active;
    var actor = opts.actor || 'human';
    var suggestion = opts.botSuggestion != null ? opts.botSuggestion : null;
    if (suggestion === undefined) suggestion = null;
    var entry = {
      i: current.turns.length,
      t: nowIso(),
      turn: engine.state.turn,
      active: engine.state.active,
      player: pid,
      actor: actor,
      thinkMs: thinkMs,
      action: sanitizeAction(action),
      botSuggestion: suggestion,
      botMatch: suggestion ? actionsEqual(action, suggestion) : null,
      result: {
        ok: !!(res && res.ok),
        error: res && res.error ? String(res.error) : null,
        code: res && res.code ? res.code : null,
        need: res && res.need ? res.need : null,
        sent: !!(res && res.sent)
      },
      ap: [engine.player(0).ap, engine.player(1).ap],
      vp: [engine.player(0).vp || 0, engine.player(1).vp || 0],
      front: { 0: frontSnap(engine, 0), 1: frontSnap(engine, 1) }
    };
    if (action.type === 'ATTACK' && res && (res.dmgToT != null || res.damage != null)) {
      entry.combat = {
        dmgToT: res.dmgToT != null ? res.dmgToT : res.damage,
        dmgToA: res.dmgToA != null ? res.dmgToA : null,
        killed: !!(res.killed || res.targetDead)
      };
    }
    current.turns.push(entry);
    if (engine.state.winner != null || engine.state.endReason) {
      finish('completed', engine.state.winner, engine.state.endReason);
    } else {
      schedulePersist();
    }
  }

  function addChat(msg) {
    if (!current) return;
    current.chat.push({
      t: nowIso(),
      name: msg.name || '?',
      text: String(msg.text || '').slice(0, 500),
      player: msg.player != null ? msg.player : null
    });
    schedulePersist();
  }

  function finish(kind, winner, reason) {
    if (!current || current.end) return flush();
    current.endedAt = nowIso();
    var startMs = Date.parse(current.startedAt) || Date.now();
    current.end = {
      kind: kind || 'completed',
      winner: winner != null ? winner : null,
      reason: reason || null,
      turns: current.turns.length,
      durationMs: Date.now() - startMs,
      aborted: kind === 'aborted'
    };
    dirty = true;
    return flush();
  }

  function abort(reason) {
    return finish('aborted', null, reason || 'abgebrochen');
  }

  function getCurrent() { return current; }

  function attachToDispatch(appApi) {
    // optional helper — app.js hooks manually for clarity
    return appApi;
  }

  global.DCPlayLogger = {
    beginMatch: beginMatch,
    recordAction: recordAction,
    botSuggest: botSuggest,
    addChat: addChat,
    finish: finish,
    abort: abort,
    flush: flush,
    getCurrent: getCurrent,
    nationFromDeck: nationFromDeck,
    sanitizeAction: sanitizeAction,
    actionsEqual: actionsEqual,
    frontSnap: frontSnap
  };
})(typeof window !== 'undefined' ? window : globalThis);
