// Bots: Schloter (Zufallsprozente) und Test (Bewertung von Brett und Hand).
(function (global) {
  'use strict';

  var DEFAULTS = {
    playChance: 75,
    instantChance: 30,
    delayMs: 350,
    model: 'test',
    aggression: 45,
    allowUnit: 1,
    allowSupport: 1,
    allowEquip: 1,
    allowInstant: 1,
    allowAttack: 1,
    holdAp: 1
  };

  var cfg = {};
  Object.keys(DEFAULTS).forEach(function (k) { cfg[k] = DEFAULTS[k]; });

  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function n(key, min, max, fallback) {
    var v = Number(cfg[key]);
    if (!isFinite(v)) v = fallback;
    return Math.max(min, Math.min(max, v));
  }

  function defOf(engine, card) {
    try { return engine.defOf(card); } catch (e) { return {}; }
  }

  function codes(d) {
    return ((d && d.effects) || []).map(function (x) { return x.code; });
  }

  function hasCode(d, code) {
    return codes(d).indexOf(code) >= 0;
  }

  function frontCount(engine, pid) {
    var p = engine.player(pid);
    return engine.frontList(p).length;
  }

  function emptyFront(engine, pid) {
    return 9 - frontCount(engine, pid);
  }

  function threat(engine, pid) {
    var opp = engine.opponent(pid);
    var t = 0;
    engine.frontList(opp).forEach(function (l) {
      var d = defOf(engine, l.inst);
      t += (Number(d.atk) || 0) + (Number(d.def) || 0) * 0.4;
    });
    return t;
  }

  function reserveNeed(engine, pid) {
    var p = engine.player(pid);
    var need = 1;
    p.hand.forEach(function (c) {
      var d = defOf(engine, c);
      if (d.typ !== 'Soforteinsatz') return;
      if (hasCode(d, 'CANCEL_AIR_DAMAGE') || hasCode(d, 'PAUSE_UNIT') || hasCode(d, 'LAY_MINE') || hasCode(d, 'AMMO_COOK')) need = Math.max(need, 1);
    });
    return need;
  }

  function scorePending(engine, pid, act) {
    var s = 1;
    var loc = act.target ? engine.findInst(act.target) : null;
    if (act.slot) {
      s += 8;
      if (act.slot.section === 'C') s += 2;
      return s + Math.random();
    }
    if (!loc) return s + Math.random();
    var mine = loc.player && loc.player.id === pid;
    var d = defOf(engine, loc.inst);
    if (mine) {
      s += (Number(d.atk) || 0) + (Number(d.def) || 0) * 0.5;
    } else {
      s += (Number(d.atk) || 0) * 2 + (Number(d.def) || 0);
      if (loc.inst.facedown) s += 6;
      if ((loc.inst.def || 0) <= 3) s += 8;
    }
    return s + Math.random();
  }

  function scorePlay(engine, pid, act) {
    var p = engine.player(pid);
    var d = engine.byId ? engine.byId[act.cardId] : null;
    if (!d) {
      var card = p.hand.find(function (c) { return c.uid === act.uid; });
      d = card ? defOf(engine, card) : {};
    }
    var cost = Number(act.cost || d.ap || 0);
    var apAfter = p.ap - cost;
    var empty = emptyFront(engine, pid);
    var s = 0;
    var tag = (d.tags || []).join(' ');

    if (d.typ === 'Einheit') {
      s += 18 + (Number(d.atk) || 0) * 3.2 + (Number(d.def) || 0) * 2.2;
      if (empty <= 0) s -= 90;
      else if (empty >= 6) s += 10;
      if (tag.indexOf('artillerie') >= 0) s += 7;
      if (tag.indexOf('aufklaerung') >= 0 && threat(engine, pid) > 8) s += 6;
      if (hasCode(d, 'ATTACK_ANY_FRONT')) s += 8;
      if (frontCount(engine, pid) === 0) s += 14;
    } else if (d.typ === 'Unterstützung') {
      s += 16;
      if (empty >= 7 && frontCount(engine, pid) === 0) s -= 6;
    } else if (d.typ === 'Ausrüstung') {
      s += frontCount(engine, pid) ? 20 : -50;
      if (hasCode(d, 'EQUIP_STAT') || hasCode(d, 'SCHANZEN') || hasCode(d, 'MEDIZIN')) s += 6;
    } else if (d.typ === 'Soforteinsatz') {
      s += 4;
      if (hasCode(d, 'CANCEL_AIR_DAMAGE')) s -= 25;
      if (hasCode(d, 'PAUSE_UNIT') && frontCount(engine, engine.opponent(pid).id) > 0) s += 8;
      if (hasCode(d, 'LAY_MINE')) s += frontCount(engine, pid) ? 10 : 0;
      if (hasCode(d, 'NAPALM') || hasCode(d, 'AIR_STRIKE')) s += threat(engine, pid) > 12 ? 12 : 2;
    }

    var agg = n('aggression', 1, 100, 45);
    var hold = Number(cfg.holdAp) ? reserveNeed(engine, pid) : 0;
    if (agg >= 90) hold = 0;
    hold = Math.round(hold * (100 - agg) / 100);
    if (apAfter < hold && d.typ !== 'Soforteinsatz') s -= (hold - apAfter) * 7;
    if (p.ap <= 2 && cost >= 3 && empty > 2 && agg < 70) s -= 12;
    if (d.typ === 'Einheit' && !Number(cfg.allowUnit)) s = -200;
    if (d.typ === 'Unterstützung' && !Number(cfg.allowSupport)) s = -200;
    if (d.typ === 'Ausrüstung' && !Number(cfg.allowEquip)) s = -200;
    if (d.typ === 'Soforteinsatz' && !Number(cfg.allowInstant)) s = -200;
    return s;
  }

  function scoreAttack(engine, pid, act) {
    var p = engine.player(pid);
    var aLoc = engine.findInst(act.uid);
    if (!aLoc) return -1;
    var ad = defOf(engine, aLoc.inst);
    var best = null;
    var bestS = -99;
    (act.targets || []).forEach(function (t) {
      var loc = engine.findInst(t.uid);
      var ts = 6;
      if (loc) {
        var td = defOf(engine, loc.inst);
        var atk = Number((engine.currentAtkDef && engine.currentAtkDef(aLoc.inst).atk) || ad.atk || 0);
        var defv = Number(loc.inst.def || td.def || 0);
        ts += atk;
        if (atk >= defv) ts += 28;
        else ts += Math.max(0, 10 - (defv - atk));
        ts += (Number(td.atk) || 0) * 1.4;
        if (loc.inst.facedown) ts += 5;
      }
      if (ts > bestS) { bestS = ts; best = t; }
    });
    var agg = n('aggression', 1, 100, 45);
    bestS += (agg - 50) * 0.55;
    if (agg >= 85) bestS += 12;
    var hold = Number(cfg.holdAp) && agg < 90 ? reserveNeed(engine, pid) : 0;
    if (p.ap - 1 < hold && bestS < 30) bestS -= 10;
    if (!Number(cfg.allowAttack)) bestS = -200;
    return { score: bestS, target: best && best.uid };
  }

  function playable(a) {
    if (!a || a.type !== 'PLAY') return false;
    if (a.typ === 'Einheit' && !Number(cfg.allowUnit)) return false;
    if (a.typ === 'Unterstützung' && !Number(cfg.allowSupport)) return false;
    if (a.typ === 'Ausrüstung' && !Number(cfg.allowEquip)) return false;
    if (a.typ === 'Soforteinsatz' && !Number(cfg.allowInstant)) return false;
    return true;
  }

  function emit(pid, row) {
    if (!row) return { type: 'END_TURN', player: pid };
    if (row.act.type === 'ATTACK') return { type: 'ATTACK', player: pid, uid: row.act.uid, target: row.target };
    return Object.assign({ player: pid }, row.act);
  }

  function actKey(a) {
    if (!a) return '';
    var slot = a.slot ? (a.slot.section + ':' + a.slot.row) : '';
    return [a.type || '', a.uid || '', a.cardId || '', a.target || '', slot].join('|');
  }

  function stepTest(engine, pid, skip) {
    var acts = engine.listActions(pid);
    if (!acts.length) return { type: 'END_TURN', player: pid };

    var pending = acts.filter(function (a) {
      return a.type === 'RESOLVE_PENDING' && !(skip && skip[actKey(a)]);
    });
    if (pending.length) {
      var bestP = pending[0];
      var bestPs = -1e9;
      pending.forEach(function (a) {
        var s = scorePending(engine, pid, a);
        if (s > bestPs) { bestPs = s; bestP = a; }
      });
      return Object.assign({ player: pid }, bestP);
    }

    var scored = [];
    acts.forEach(function (a) {
      if (skip && skip[actKey(a)]) return;
      if (a.type === 'CONCEDE' || a.type === 'PROPOSE_PEACE' || a.type === 'ACCEPT_PEACE') return;
      if (a.type === 'END_TURN') return;
      if (a.type === 'PLAY') {
        if (!playable(a)) return;
        scored.push({ act: a, score: scorePlay(engine, pid, a) });
        return;
      }
      if (a.type === 'ATTACK') {
        if (!Number(cfg.allowAttack)) return;
        var ev = scoreAttack(engine, pid, a);
        scored.push({ act: a, score: ev.score, target: ev.target });
        return;
      }
      if (a.type === 'REVEAL_UNIT') scored.push({ act: a, score: 3 });
    });
    var plays = scored.filter(function (x) { return playable(x.act); });
    if (plays.length) {
      plays.sort(function (x, y) { return y.score - x.score; });
      return emit(pid, plays[0]);
    }
    var rest = scored.filter(function (x) { return x.act.type === 'ATTACK' || x.act.type === 'REVEAL_UNIT'; });
    if (!rest.length) return { type: 'END_TURN', player: pid };
    rest.sort(function (x, y) { return y.score - x.score; });
    return emit(pid, rest[0]);
  }

  function stepSchloter(engine, pid, skip) {
    var acts = engine.listActions(pid);
    if (!acts.length) return { type: 'END_TURN', player: pid };
    var pendingChoices = acts.filter(function (a) {
      return a.type === 'RESOLVE_PENDING' && !(skip && skip[actKey(a)]);
    });
    if (pendingChoices.length) return Object.assign({ player: pid }, pick(pendingChoices));
    var plays = acts.filter(function (a) { return playable(a) && !(skip && skip[actKey(a)]); });
    var attacks = acts.filter(function (a) { return a.type === 'ATTACK' && Number(cfg.allowAttack) && !(skip && skip[actKey(a)]); });
    if (plays.length) return Object.assign({ player: pid }, pick(plays));
    if (attacks.length) {
      var at = pick(attacks);
      var target = at.targets && at.targets.length ? pick(at.targets).uid : null;
      return { type: 'ATTACK', player: pid, uid: at.uid, target: target };
    }
    var reveal = acts.find(function (a) { return a.type === 'REVEAL_UNIT'; });
    if (reveal) return Object.assign({ player: pid }, reveal);
    var end = acts.find(function (a) { return a.type === 'END_TURN'; });
    return end ? { type: 'END_TURN', player: pid } : Object.assign({ player: pid }, pick(acts));
  }

  function step(engine, pid, skip) {
    if ((cfg.model || 'test') === 'schloter') return stepSchloter(engine, pid, skip);
    return stepTest(engine, pid, skip);
  }

  function applyCfg(next) {
    if (!next) return;
    Object.keys(DEFAULTS).forEach(function (k) {
      if (next[k] != null) cfg[k] = k === 'model' ? String(next[k]) : Number(next[k]);
    });
    if (next.model) cfg.model = String(next.model);
  }

  function useDefaults() {
    var m = cfg.model;
    applyCfg(DEFAULTS);
    cfg.model = m;
  }

  global.DCBot = {
    name: 'Test',
    defaults: DEFAULTS,
    cfg: cfg,
    step: step,
    actKey: actKey,
    applyCfg: applyCfg,
    useDefaults: useDefaults
  };
})(window);
