/**
 * Effektdarstellung am Tisch. Liest ausschließlich echte Engine-Daten (flags/Auren/Log), erfindet keinen Status.
 * Verdeckte gegnerische Karten bekommen keinerlei Effektinformation.
 */
(function (global) {
  'use strict';
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function badge(k, txt, title) { return { k: k, txt: txt, title: title }; }

  /* Einheitenstatus (Kartenrand + Labels). */
  function unitFx(engine, inst, hidden) {
    var out = { cls: [], badges: [] };
    if (!engine || !inst || hidden) return out;
    var f = inst.flags || {}, turn = engine.state ? engine.state.turn : 0;
    var dig = false;
    try { dig = !!(engine._isDeployProtected && engine._isDeployProtected(inst)); } catch (e) {}
    if (dig) out.cls.push('fx-shield');
    if (f.angelUntil === turn) { out.cls.push('fx-shield'); out.badges.push(badge('shield', 'Engel', 'Silberner Engel: kein Schaden in diesem Zug')); }
    if (f.napalm) { out.cls.push('fx-burn'); out.badges.push(badge('burn', 'Brand', 'Napalm: 1 Schaden zu Beginn jedes eigenen Zugs des Besitzers')); }
    var ex = null;
    try { ex = engine.explainStats ? engine.explainStats(inst) : null; } catch (e) {}
    if (ex) {
      var maxDef = inst.defMax != null ? inst.defMax : ex.def;
      var up = ex.atk > ex.printedAtk || maxDef > ex.printedDef;
      var down = ex.atk < ex.printedAtk;
      if (up) out.cls.push('fx-buff');
      if (down) out.cls.push('fx-debuff');
    }
    if (f.suppressed > 0) { out.cls.push('fx-debuff'); out.badges.push(badge('debuff', 'Niedergehalten ' + f.suppressed, 'Unterdrückt: kein Angriff, noch ' + f.suppressed + ' Zug/Züge')); }
    else if (f.noAttack) { out.cls.push('fx-debuff'); out.badges.push(badge('debuff', 'Kein Angriff', 'Darf derzeit nicht angreifen')); }
    if (f.paused) { out.cls.push('fx-debuff'); out.badges.push(badge('debuff', 'Pausiert', 'Einheit ist pausiert')); }
    if (f.healLess) out.badges.push(badge('debuff', 'Heilung −' + f.healLess, 'Erhält ' + f.healLess + ' weniger Heilung'));
    if (f.doubleDmgUntil === turn) out.badges.push(badge('debuff', 'Doppelschaden', 'Kampfschaden in diesem Zug verdoppelt'));
    if (f.fogTurns > 0) { out.cls.push('fx-fog'); out.badges.push(badge('fog', 'Nebel ' + f.fogTurns, 'Im Nebel, noch ' + f.fogTurns + ' Zug/Züge')); }
    if (f.revealedTurn === turn) { out.cls.push('fx-recon'); out.badges.push(badge('recon', 'Aufgedeckt', 'In diesem Zug aufgedeckt')); }
    out.cls = out.cls.filter(function (c, i, a) { return a.indexOf(c) === i; });
    return out;
  }

  /* Abschnittseffekte eines Spielers (Slot-Rahmen der Spalte). Gegnerische Fallen bleiben unsichtbar. */
  function sectionFx(engine, player, mine) {
    var res = {};
    if (!engine || !player) return res;
    var f = player.flags || {}, turn = engine.state.turn;
    function add(sec, cls, title) {
      if (!sec) return;
      var r = res[sec] = res[sec] || { cls: [], titles: [] };
      if (r.cls.indexOf(cls) < 0) r.cls.push(cls);
      r.titles.push(title);
    }
    (f.sectionAuras || []).forEach(function (a) {
      if (!a || !(a.untilTurn >= turn)) return;
      if (a.kind === 'kein_loch') return;
      var parts = [];
      if (a.atk) parts.push((a.atk > 0 ? '+' : '') + a.atk + ' ATK');
      if (a.def) parts.push((a.def > 0 ? '+' : '') + a.def + ' DEF');
      add(a.section, (a.atk < 0 || a.def < 0) ? 'sec-debuff' : 'sec-buff', 'Abschnitt: ' + (parts.join(', ') || 'Effekt') + (a.filter ? ' (' + a.filter + ')' : '') + (a.untilTurn > turn ? ' bis nächster Zug' : ' in diesem Zug'));
    });
    if (f.keinLoch && f.keinLoch.until === turn && f.keinLoch.left > 0) add(f.keinLoch.section, 'sec-shield', 'Kein Loch: absorbiert noch ' + f.keinLoch.left + ' Schaden');
    if (mine) (f.sectionEnterDamage || []).forEach(function (t) {
      if (t && t.until >= turn) add(t.section, 'sec-trap', 'Falle: Einrückende erleiden ' + t.value + ' Schaden');
    });
    if (f.sectionBlockSupport && f.sectionBlockSupport.until >= turn) add(f.sectionBlockSupport.section, 'sec-debuff', 'Unterstützung im Abschnitt blockiert');
    return res;
  }

  /* Einmalige Impulse: DEF-Änderung je uid seit letztem Render; Brand nur bei echter Napalm-Logzeile. */
  var seen = {}, seenEngine = null, logMark = 0, active = {};
  var HOLD = 1000; // ms: wiederholte Renders zeigen denselben Impuls, danach weg
  function pulses(engine, nowMs) {
    var t = nowMs != null ? nowMs : Date.now();
    var out = {};
    Object.keys(active).forEach(function (u) { if (active[u].until > t) out[u] = active[u].kind; else delete active[u]; });
    if (!engine || !engine.state) return out;
    if (seenEngine !== engine) { seenEngine = engine; seen = {}; active = {}; out = {}; logMark = (engine.log || []).length; }
    var log = engine.log || [];
    var start = Math.max(0, Math.min(logMark, log.length) - (log.length >= 400 ? 1 : 0));
    var burned = {};
    for (var i = logMark > log.length ? 0 : start; i < log.length; i++) {
      var m = /^(.+) brennt \(Napalm/.exec(log[i] && log[i].msg || '');
      if (m) burned[m[1]] = 1;
    }
    logMark = log.length;
    var now = {};
    engine.state.players.forEach(function (p) {
      engine.frontList(p).forEach(function (l) {
        var inst = l.inst, cur = inst.def;
        now[inst.uid] = cur;
        var prev = seen[inst.uid];
        if (prev == null || cur == null || prev === cur) return;
        var kind = cur < prev ? ((inst.flags && inst.flags.napalm && burned[engine.defOf(inst).name]) ? 'burn' : 'hit') : 'heal';
        active[inst.uid] = { kind: kind, until: t + HOLD };
        out[inst.uid] = kind;
      });
    });
    seen = now;
    Object.keys(out).forEach(function (u) { if (!(u in now)) { delete out[u]; delete active[u]; } });
    return out;
  }

  function badgesHtml(list) {
    if (!list.length) return '';
    return '<div class="fx-badges">' + list.map(function (b) {
      return '<span class="fx-badge fx-b-' + b.k + '" title="' + esc(b.title) + '">' + esc(b.txt) + '</span>';
    }).join('') + '</div>';
  }
  function pulseHtml(kind) {
    return kind ? '<span class="fx-pulse fx-pulse-' + kind + '" aria-hidden="true"></span>' : '';
  }
  global.DCTableFx = { unitFx: unitFx, sectionFx: sectionFx, pulses: pulses, badgesHtml: badgesHtml, pulseHtml: pulseHtml };
})(window);
