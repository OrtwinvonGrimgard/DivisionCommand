/**
 * Tutorial „Grundausbildung“ (t275): Erststart-Merker, Spotlight-Overlay und Schrittablauf.
 *
 * - Merker-API ohne DOM (`shouldAutoStart`, `isDone`, `markDone`, `reset`), testbar in Node.
 * - `start(opts)` baut eine eigene Engine-Instanz (Szenario aus `DCTutorialScenario`), legt sie über
 *   `window.dcStartScripted` auf den echten Tisch und führt durch die Schritte. Normale Partie,
 *   Spielstände, Benutzer und Playtest-Protokolle bleiben unberührt; die Engine wird am Ende verworfen.
 * - Gefiltert wird über die `dispatch`-Methode dieser einen Instanz: falsche Spieleraktionen werden
 *   mit freundlichem Hinweis abgelehnt, ohne den Stand zu ändern.
 *
 * Ablauf und Lernziele: `Division_Command/docs/TUTORIAL_T275.md`.
 */
(function (root) {
  'use strict';

  /** localStorage-Schlüssel des Erststart-Merkers. */
  var KEY = 'dc_tutorial_done';
  /** Porträt des Ausbilders (vorhandenes Offiziersbild). */
  var COACH_IMG = 'assets/portraits/Jetzt/male/hauptmann/01.png';
  var COACH_NAME = 'Hauptmann Kessler';

  /* ---------------- Merker (ohne DOM) ---------------- */

  /**
   * Zugriff auf localStorage (oder null, wenn gesperrt).
   * @returns {Storage|null}
   */
  function store() {
    try { return root.localStorage || null; } catch (e) { return null; }
  }
  /**
   * Hat der Spieler das Tutorial abgeschlossen oder übersprungen? Jeder gesetzte Wert zählt.
   * @returns {boolean}
   */
  function isDone() {
    var s = store();
    if (!s) return false;
    try { return s.getItem(KEY) != null; } catch (e) { return false; }
  }
  var forcedUsed = false;
  /**
   * Erzwingt `?tutorial=1` in der Adresse einen Lauf (einmal je Seitenaufruf)?
   * @returns {boolean}
   */
  function forced() {
    if (forcedUsed) return false;
    try { return /[?&]tutorial=1(&|$)/.test((root.location && root.location.search) || ''); } catch (e) { return false; }
  }
  /**
   * Gibt es schon ein Offiziersprofil? Dann ist es kein Erststart.
   * @returns {boolean}
   */
  function hasUsers() {
    var s = store();
    if (!s) return false;
    try {
      var list = JSON.parse(s.getItem('dc_users') || '[]');
      return Array.isArray(list) && list.length > 0;
    } catch (e) { return false; }
  }
  /**
   * Soll „Spiel starten“ zuerst das Tutorial öffnen? Nur beim allerersten Start (kein Merker,
   * kein Benutzer) oder erzwungen per `?tutorial=1`.
   * @returns {boolean}
   */
  function shouldAutoStart() {
    if (forced()) return true;
    return !isDone() && !hasUsers();
  }
  /**
   * Setzt den Merker (Abschluss oder Überspringen).
   * @param {'done'|'skip'} how
   */
  function markDone(how) {
    var s = store();
    if (!s) return;
    try { s.setItem(KEY, JSON.stringify({ v: 1, how: how === 'skip' ? 'skip' : 'done', at: new Date().toISOString() })); } catch (e) { /* Speicher voll/gesperrt */ }
  }
  /** Löscht den Merker (nur für Entwickler/Tests). */
  function reset() {
    var s = store();
    if (s) { try { s.removeItem(KEY); } catch (e) { /* egal */ } }
  }

  /* ---------------- Laufzeit ---------------- */

  /** Aktiver Lauf oder null. */
  var run = null;

  /**
   * Kurzform für document.querySelector.
   * @param {string} sel
   * @param {Element} [base]
   * @returns {Element|null}
   */
  function q(sel, base) { try { return (base || document).querySelector(sel); } catch (e) { return null; } }
  /**
   * Spielt einen Effekt aus dem vorhandenen Klangsatz.
   * @param {string} id
   * @param {number} [gain]
   */
  function sfx(id, gain) {
    try { if (root.DCAudio && root.DCAudio.playSfx) root.DCAudio.playSfx(id, { prio: 3, gain: gain == null ? 0.7 : gain }); } catch (e) { /* stumm */ }
  }
  /**
   * HTML-escapen (für Namen aus dem Profil).
   * @param {string} s
   * @returns {string}
   */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; });
  }
  /**
   * Sichtbares Rechteck eines Elements oder null.
   * @param {Element} el
   * @returns {{x:number,y:number,w:number,h:number}|null}
   */
  function rectOf(el) {
    if (!el || !el.getBoundingClientRect) return null;
    var r = el.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) return null;
    var cs = root.getComputedStyle ? root.getComputedStyle(el) : null;
    if (cs && (cs.visibility === 'hidden' || cs.display === 'none')) return null;
    return { x: r.left, y: r.top, w: r.width, h: r.height };
  }
  /**
   * Kartenbild (Vorderseite) eines Katalogeintrags.
   * @param {string} id
   * @returns {string}
   */
  function faceSrc(id) {
    var f = root.DC_CARD_FACES && root.DC_CARD_FACES[id];
    return f && f.file ? 'assets/cards/' + f.file : '';
  }
  /**
   * Katalogeintrag per ID.
   * @param {string} id
   * @returns {object|null}
   */
  function defById(id) {
    var cards = (root.DC_CATALOG && root.DC_CATALOG.cards) || [];
    for (var i = 0; i < cards.length; i++) if (cards[i].id === id) return cards[i];
    return null;
  }
  /**
   * Aktives Offiziersprofil (nur lesen) für Namen und Porträt.
   * @returns {{name?: string, portrait?: string, rank?: string}}
   */
  function activeOfficer() {
    var s = store();
    if (!s) return {};
    try {
      var list = JSON.parse(s.getItem('dc_users') || '[]');
      var id = s.getItem('dc_user_active');
      var u = null;
      for (var i = 0; i < list.length; i++) if (list[i].id === id) u = list[i];
      u = u || list[0];
      return u ? { name: u.name, portrait: u.portrait, rank: u.rank } : {};
    } catch (e) { return {}; }
  }

  /* ---------------- Overlay ---------------- */

  /**
   * Baut die Overlay-Ebene (Abdunklung mit Ausschnitten, Ringe, Pfeil, Ausbilder-Box, Überspringen).
   * @returns {object} DOM-Referenzen
   */
  function buildLayer() {
    var layer = document.createElement('div');
    layer.id = 'tut-layer';
    if (root.DC_REDUCE_MOTION) layer.classList.add('tut-calm');
    layer.innerHTML =
      '<svg id="tut-dim" aria-hidden="true"><defs><mask id="tut-mask"><rect x="0" y="0" width="100%" height="100%" fill="#fff"/><g id="tut-holes"></g></mask></defs>' +
      '<rect x="0" y="0" width="100%" height="100%" fill="rgba(8,2,2,0.74)" mask="url(#tut-mask)"/></svg>' +
      '<div id="tut-catch"></div>' +
      '<div id="tut-rings"></div>' +
      '<div id="tut-arrow" aria-hidden="true"><span></span></div>' +
      '<div id="tut-fx"></div>' +
      '<section id="tut-coach" role="dialog" aria-live="polite" aria-label="Ausbilder">' +
        '<button type="button" id="tut-skip" title="Tutorial beenden (Esc)">Tutorial überspringen</button>' +
        '<div class="tut-portrait"><img alt="" src="' + COACH_IMG + '"><span class="tut-name">' + COACH_NAME + '</span></div>' +
        '<div class="tut-body">' +
          '<div class="tut-chapter"></div>' +
          '<h3 class="tut-title"></h3>' +
          '<div class="tut-panel"></div>' +
          '<p class="tut-text"></p>' +
          '<p class="tut-hint" hidden></p>' +
          '<div class="tut-foot">' +
            '<div class="tut-progress"><i></i></div><span class="tut-count"></span>' +
            '<button type="button" class="tut-back">Zurück</button>' +
            '<span class="tut-todo" hidden>Ihr Befehl</span>' +
            '<button type="button" class="tut-next primary">Weiter</button>' +
          '</div>' +
        '</div>' +
      '</section>' +
      '<div id="tut-banner" hidden><div class="tut-banner-in"><small>Übungsgefecht</small><strong>SIEG</strong><em>5 / 5 Siegpunkte</em></div></div>' +
      '<div id="tut-confirm" hidden><div class="tut-confirm-box"><h3>Ausbildung abbrechen?</h3>' +
        '<p>Das Tutorial startet dann nicht mehr von selbst. Sie finden es jederzeit im Hauptmenü unter <b>Tutorial</b>.</p>' +
        '<div class="tut-confirm-row"><button type="button" class="tut-stay primary">Weiter üben</button><button type="button" class="tut-leave">Überspringen</button></div></div></div>';
    document.body.appendChild(layer);
    return {
      layer: layer, holes: q('#tut-holes', layer), catcher: q('#tut-catch', layer), rings: q('#tut-rings', layer),
      arrow: q('#tut-arrow', layer), fx: q('#tut-fx', layer), coach: q('#tut-coach', layer), banner: q('#tut-banner', layer),
      skip: q('#tut-skip', layer), confirm: q('#tut-confirm', layer)
    };
  }

  /**
   * Zeichnet Ausschnitte, Ringe, Pfeil und Box-Position passend zum aktuellen Schritt.
   * Läuft im Takt, damit Ausschnitte neu gerenderten Karten folgen.
   */
  function layout() {
    if (!run || !run.dom) return;
    var d = run.dom, step = run.S.STEPS[run.i];
    if (!step) return;
    var vw = root.innerWidth, vh = root.innerHeight;
    var rects = [];
    var sels = run.waiting ? [] : (step.focus ? step.focus(run.ctx) : []);
    sels.forEach(function (sel, idx) {
      var r = rectOf(q(sel));
      rects.push(r ? { r: r, idx: idx, sel: sel } : null);
    });
    // Offene Wahl/Reaktion des Spielers immer freistellen, damit sie bedienbar bleibt.
    var modal = q('#overlay .modal');
    var ov = q('#overlay');
    var modalRect = (ov && ov.style.display !== 'none') ? rectOf(modal) : null;
    var holes = rects.filter(Boolean).map(function (o) { return o.r; });
    if (modalRect && step.kind !== 'info') holes.push(modalRect);
    var insp = q('#inspect');
    var inspRect = (insp && insp.style.display !== 'none') ? rectOf(insp.firstElementChild) : null;
    if (inspRect) holes.push(inspRect);
    var pad = 6;
    var key = holes.map(function (r) { return [r.x, r.y, r.w, r.h].map(Math.round).join(','); }).join('|') + '#' + vw + 'x' + vh + '#' + run.i;
    if (key !== run.layoutKey) {
      run.layoutKey = key;
      d.holes.innerHTML = holes.map(function (r) {
        return '<rect x="' + (r.x - pad) + '" y="' + (r.y - pad) + '" width="' + (r.w + pad * 2) + '" height="' + (r.h + pad * 2) + '" rx="10" ry="10" fill="#000"/>';
      }).join('');
      var at = firstShown(step.arrow, rects);
      d.rings.innerHTML = rects.map(function (o) {
        if (!o) return '';
        var cls = 'tut-ring' + (inList(step.mark, o.idx) ? ' tut-mark' : '') + (at && at.idx === o.idx ? ' tut-src' : '');
        if (o.r.w > vw * 0.5 || o.r.h > vh * 0.45) cls += ' tut-wide';
        return '<div class="' + cls + '" style="left:' + (o.r.x - pad) + 'px;top:' + (o.r.y - pad) + 'px;width:' + (o.r.w + pad * 2) + 'px;height:' + (o.r.h + pad * 2) + 'px"></div>';
      }).join('');
      if (at && step.kind === 'action' && !run.waiting) {
        var up = at.r.y < 160; // Ziel oben: Pfeil zeigt von unten nach oben
        d.arrow.className = up ? 'tut-up' : '';
        d.arrow.style.left = Math.round(at.r.x + at.r.w / 2 - 22) + 'px';
        d.arrow.style.top = Math.round(up ? at.r.y + at.r.h + 10 : at.r.y - 62) + 'px';
        d.arrow.style.display = 'block';
      } else d.arrow.style.display = 'none';
      placeCoach(holes.concat(modalRect ? [modalRect] : []));
    }
  }

  /**
   * Liegt `idx` in `list` (Zahl oder Liste)?
   * @param {number|number[]|undefined} list
   * @param {number} idx
   * @returns {boolean}
   */
  function inList(list, idx) { return Array.isArray(list) ? list.indexOf(idx) >= 0 : list === idx; }
  /**
   * Erstes sichtbares Pfeilziel nach Vorrang.
   * @param {number|number[]|undefined} pref Index oder Vorrangliste
   * @param {Array<object|null>} rects gemessene Ziele
   * @returns {object|null}
   */
  function firstShown(pref, rects) {
    if (pref == null) return null;
    var list = Array.isArray(pref) ? pref : [pref];
    for (var i = 0; i < list.length; i++) if (rects[list[i]]) return rects[list[i]];
    return null;
  }

  /**
   * Setzt die Ausbilder-Box auf eine freie Fläche (bevorzugt über der leeren gegnerischen Support-Zone).
   * @param {Array<{x:number,y:number,w:number,h:number}>} avoid freizuhaltende Rechtecke
   */
  function placeCoach(avoid) {
    var d = run.dom, step = run.S.STEPS[run.i];
    var box = d.coach;
    if (step.center || run.waitingCenter) { box.classList.remove('tut-dock'); box.classList.add('tut-center'); box.style.left = ''; box.style.top = ''; return; }
    box.classList.remove('tut-center');
    var vw = root.innerWidth, vh = root.innerHeight;
    // t283: Kleine Fenster (≤ 1100 × 700): schmale Box seitlich andocken statt mitten über dem Spielfeld,
    // damit Ziele wie die gegnerische Elite sichtbar bleiben. Rechts über Zugtimer/Befehle, sonst links.
    if (vw <= 1100 || vh <= 700) {
      box.classList.add('tut-dock');
      var dw = Math.max(280, Math.min(360, Math.round(vw * 0.34)));
      box.style.width = dw + 'px';
      var dh = box.offsetHeight || 220;
      var dock = [{ x: vw - dw - 8, y: 52 }, { x: 8, y: 52 }, { x: vw - dw - 8, y: Math.max(52, vh - dh - 8) }, { x: 8, y: Math.max(52, vh - dh - 8) }];
      var dhit = function (c) {
        return avoid.some(function (r) { return r && c.x < r.x + r.w + 6 && c.x + dw > r.x - 6 && c.y < r.y + r.h + 6 && c.y + dh > r.y - 6; });
      };
      var dp = dock.filter(function (c) { return !dhit(c); })[0] || dock[0];
      box.style.left = Math.round(dp.x) + 'px';
      box.style.top = Math.round(Math.min(dp.y, Math.max(10, vh - dh - 8))) + 'px';
      return;
    }
    box.classList.remove('tut-dock');
    var bw = Math.min(760, vw - 40), bh = box.offsetHeight || 190;
    var cands = [];
    ['#enemy-support', '#my-support', '#enemy-front'].forEach(function (sel) {
      var r = rectOf(q(sel));
      if (r) cands.push({ x: r.x + (r.w - bw) / 2, y: r.y + (r.h - bh) / 2 });
    });
    cands.push({ x: (vw - bw) / 2, y: 70 }, { x: (vw - bw) / 2, y: vh - bh - 170 });
    function hits(c) {
      return avoid.some(function (r) { return r && c.x < r.x + r.w + 8 && c.x + bw > r.x - 8 && c.y < r.y + r.h + 8 && c.y + bh > r.y - 8; });
    }
    var pick = cands.filter(function (c) { return !hits(c); })[0] || cands[0];
    box.style.width = bw + 'px';
    box.style.left = Math.max(10, Math.min(vw - bw - 10, Math.round(pick.x))) + 'px';
    box.style.top = Math.max(50, Math.min(vh - bh - 10, Math.round(pick.y))) + 'px';
  }

  /**
   * Schwebende Zahl (Schaden, Heilung, Siegpunkte) an einer Bildschirmstelle.
   * @param {{x:number,y:number,w:number,h:number}} r
   * @param {string} text
   * @param {string} cls tut-dmg | tut-heal | tut-vp | tut-kill
   */
  function floatAt(r, text, cls) {
    if (!run || !r) return;
    var el = document.createElement('div');
    el.className = 'tut-float ' + cls;
    el.textContent = text;
    el.style.left = Math.round(r.x + r.w / 2) + 'px';
    el.style.top = Math.round(r.y + r.h * 0.35) + 'px';
    run.dom.fx.appendChild(el);
    setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 1900);
  }

  /**
   * Misst Verteidigung und Lage aller Fronteinheiten plus Siegpunkte (vor einer Aktion).
   * @returns {{units: Object<string,{def:number,r:object}>, vp: number[]}}
   */
  function measure() {
    var eng = run.eng, S = run.S, out = { units: {}, vp: [eng.player(0).vp, eng.player(1).vp] };
    eng.state.players.forEach(function (p) {
      ['L', 'C', 'R'].forEach(function (s) {
        (p.front[s] || []).forEach(function (inst) {
          if (!inst) return;
          out.units[inst.uid] = { def: S.defNow(eng, inst.uid), r: rectOf(q(S.slotSel(inst.uid))) };
        });
      });
    });
    return out;
  }
  /**
   * Zeigt Schadenszahlen, Abschüsse und SP-Gewinne nach einer Aktion.
   * @param {object} pre Ergebnis von `measure()` vor der Aktion
   */
  function showDiff(pre) {
    if (!run) return;
    var eng = run.eng, S = run.S;
    Object.keys(pre.units).forEach(function (uid) {
      var was = pre.units[uid];
      var nowDef = S.defNow(eng, uid);
      var r = rectOf(q(S.slotSel(uid))) || was.r;
      if (nowDef == null) { floatAt(was.r, 'Zerstört', 'tut-kill'); return; }
      if (was.def == null) return;
      if (nowDef < was.def) floatAt(r, '−' + (was.def - nowDef), 'tut-dmg');
      else if (nowDef > was.def) floatAt(r, '+' + (nowDef - was.def) + ' DEF', 'tut-heal');
    });
    [0, 1].forEach(function (pid) {
      var gain = eng.player(pid).vp - pre.vp[pid];
      if (gain > 0) {
        floatAt(rectOf(q('#ap' + pid)), '+' + gain + ' SP', 'tut-vp');
        if (pid === 0) sfx('trophy', 0.8);
      }
    });
  }

  /**
   * Umhüllt `dispatch` dieser einen Engine-Instanz: Filter für Spieleraktionen und Effekte.
   * (Proben in app.js nutzen eine frische Engine-Kopie und bleiben ungefiltert.)
   */
  function wrapEngine() {
    var eng = run.eng;
    var raw = Object.getPrototypeOf(eng).dispatch;
    eng.dispatch = function (a) {
      if (!run || run.eng !== eng) return raw.call(eng, a);
      var step = run.S.STEPS[run.i];
      var hint = (a && a.player === 0) ? (run.waiting ? 'Einen Moment – gleich geht es weiter.' : run.S.gate(step, a, eng, run.ctx)) : null;
      if (hint) { blocked(hint); return { ok: false, error: hint, tutorialBlocked: true }; }
      var pre = measure();
      var res = raw.call(eng, a);
      if (res && res.ok) {
        setTimeout(function () { if (run && run.eng === eng) showDiff(pre); }, 90);
        setTimeout(check, 30);
      }
      return res;
    };
  }

  /**
   * Freundlicher Hinweis bei falscher Aktion (Box wackelt kurz, Text erscheint).
   * @param {string} msg
   */
  function blocked(msg) {
    if (!run) return;
    var h = q('.tut-hint', run.dom.coach);
    h.textContent = msg;
    h.hidden = false;
    run.dom.coach.classList.remove('tut-nudge');
    void run.dom.coach.offsetWidth;
    run.dom.coach.classList.add('tut-nudge');
    sfx('ui-click', 0.4);
  }

  /* ---------------- Schrittablauf ---------------- */

  /**
   * Füllt die Box für den aktuellen Schritt (Kapitel, Titel, Text, Fortschritt, Knöpfe).
   */
  function paint() {
    var S = run.S, step = S.STEPS[run.i], d = run.dom, n = S.STEPS.length;
    var box = d.coach;
    box.classList.remove('tut-in', 'tut-nudge', 'tut-ok');
    void box.offsetWidth;
    box.classList.add('tut-in');
    box.classList.toggle('tut-kind-action', step.kind === 'action');
    box.classList.toggle('tut-kind-watch', step.kind === 'watch');
    q('.tut-chapter', box).textContent = 'Kapitel ' + (step.chapter + 1) + '/' + S.CHAPTERS.length + ' · ' + S.CHAPTERS[step.chapter];
    q('.tut-title', box).textContent = (step.id === 'intro' && run.who.name) ? 'Willkommen, ' + run.who.name : step.title;
    q('.tut-text', box).innerHTML = step.text;
    var h = q('.tut-hint', box); h.hidden = true; h.textContent = '';
    q('.tut-progress i', box).style.width = Math.round(((run.i + 1) / n) * 100) + '%';
    q('.tut-count', box).textContent = 'Schritt ' + (run.i + 1) + '/' + n;
    var next = q('.tut-next', box), todo = q('.tut-todo', box), back = q('.tut-back', box);
    next.hidden = !(step.kind === 'info' || step.kind === 'finale');
    next.textContent = step.kind === 'finale' ? 'Zum Hauptmenü' : (step.id === 'intro' ? 'Ausbildung beginnen' : 'Weiter');
    todo.hidden = !(step.kind === 'action' || step.kind === 'watch');
    todo.textContent = step.kind === 'watch' ? 'Feind am Zug …' : 'Ihr Befehl';
    back.disabled = prevIndex() < 0;
    paintPanel(step);
    d.banner.hidden = !step.victory;
    if (step.victory) {
      d.banner.classList.remove('tut-go'); void d.banner.offsetWidth; d.banner.classList.add('tut-go');
    }
    // Abdunklung: Info und Beobachten blocken den Tisch; Handlungsschritte lassen ihn frei.
    d.catcher.style.pointerEvents = step.kind === 'action' ? 'none' : 'auto';
    d.layer.classList.toggle('tut-open', step.kind === 'action');
    d.layer.classList.toggle('tut-full', !!step.center);
    run.layoutKey = '';
    layout();
    setTimeout(function () { if (run) { run.layoutKey = ''; layout(); } }, 60);
    if (next && !next.hidden) { try { next.focus({ preventScroll: true }); } catch (e) { /* alt */ } }
  }

  /**
   * Bildtafel für die Deckbau-Schritte (echte Kartenvorderseiten).
   * @param {object} step
   */
  function paintPanel(step) {
    var el = q('.tut-panel', run.dom.coach);
    if (!step.panel) { el.innerHTML = ''; el.hidden = true; return; }
    var C = run.S.CARDS;
    function card(id, label, sub) {
      var def = defById(id) || {};
      var src = faceSrc(id);
      return '<figure class="tut-card">' + (src ? '<img alt="' + esc(def.name || id) + '" src="' + src + '">' : '<div class="tut-card-ph">' + esc(def.name || id) + '</div>') +
        '<figcaption><b>' + esc(label) + '</b>' + (sub ? '<span>' + esc(sub) + '</span>' : '') + '</figcaption></figure>';
    }
    var html = '';
    if (step.panel === 'deck') {
      html = '<div class="tut-deckcount"><b>60</b><span>Karten</span><i>+</i><b>2</b><span>Doktrinen</span></div><div class="tut-cards">' +
        card(C.push, 'Rothain', 'Soforteinsatz') + card(C.elite, 'Sahr', 'Elite-Einheit') + card(C.kitchen, 'Merovan', 'Unterstützung') +
        card(C.docA, 'Doktrin', 'Zielangriff') + card(C.docB, 'Doktrin', 'Etappensicherung') + '</div>';
    } else if (step.panel === 'rarity') {
      html = '<div class="tut-cards tut-rar">' +
        card(C.push, 'Bronze · bis ×4', 'Druckpunkt') + card(C.elite, 'Silber · bis ×2', 'Lotte Knoten · Elite') + card(C.gold, 'Gold · ×1', 'Offener Weg · Elite') + '</div>';
    }
    el.innerHTML = html;
    el.hidden = false;
  }

  /**
   * Index des vorherigen Schritts, zu dem „Zurück“ springen darf (keine Beobachtungsschritte,
   * nicht über den Sieg zurück), oder -1.
   * @returns {number}
   */
  function prevIndex() {
    var S = run.S, cur = S.STEPS[run.i];
    if (!cur || cur.victory) return -1;
    for (var j = run.i - 1; j >= 0; j--) {
      var st = S.STEPS[j];
      if (st.kind === 'watch') continue;
      if (st.victory) return -1;
      if (!run.snaps[j]) continue;
      return j;
    }
    return -1;
  }

  /**
   * Wartet, bis keine Meldung/Animation mehr läuft, und ruft dann `fn`.
   * @param {Function} fn
   * @param {number} [minMs] Mindestpause
   */
  function whenCalm(fn, minMs) {
    var my = run, t0 = Date.now();
    (function poll() {
      if (run !== my) return;
      var busy = (root.dcEventBusy && root.dcEventBusy()) || document.body.classList.contains('dc-dragging');
      if (busy || Date.now() - t0 < (minMs || 0)) { setTimeout(poll, 120); return; }
      fn();
    })();
  }

  /**
   * Betritt Schritt i: wartet ggf. auf den Gegner (`ready`), merkt den Stand für „Zurück“, zeichnet.
   * @param {number} i
   */
  function enter(i) {
    var S = run.S, step = S.STEPS[i];
    if (!step) { finish('done'); return; }
    run.i = i;
    run.gen++;
    var gen = run.gen;
    if (step.ready && !step.ready(run.eng, run.ctx)) {
      run.waiting = true;
      run.dom.catcher.style.pointerEvents = 'auto';
      var box = run.dom.coach;
      q('.tut-chapter', box).textContent = 'Kapitel ' + (step.chapter + 1) + '/' + S.CHAPTERS.length + ' · ' + S.CHAPTERS[step.chapter];
      q('.tut-title', box).textContent = 'Der Gegner beendet seinen Zug';
      q('.tut-text', box).innerHTML = 'Zu Beginn Ihres Zuges: wieder <b>5 AP</b>, und Sie ziehen eine Karte.';
      q('.tut-next', box).hidden = true;
      q('.tut-todo', box).hidden = false; q('.tut-todo', box).textContent = 'Bitte warten …';
      q('.tut-panel', box).hidden = true;
      run.layoutKey = ''; layout();
      (function wait() {
        if (!run || run.gen !== gen) return;
        if (step.ready(run.eng, run.ctx)) { whenCalm(function () { if (run && run.gen === gen) { run.waiting = false; enterReady(i); } }, 500); return; }
        setTimeout(wait, 200);
      })();
      return;
    }
    run.waiting = false;
    enterReady(i);
  }
  /**
   * Zweiter Teil von `enter`, sobald der Schritt beginnen darf.
   * @param {number} i
   */
  function enterReady(i) {
    var S = run.S, step = S.STEPS[i];
    run.snaps[i] = S.snapshot(run.eng, run.ctx);
    var prev = S.STEPS[run.lastPainted];
    if (!prev || prev.chapter !== step.chapter) sfx('doktrin-activate', 0.5);
    else sfx('reveal-01', 0.35);
    run.lastPainted = i;
    paint();
    if (step.victory) sfx('win', 0.9);
    check();
  }

  /**
   * Prüft, ob der laufende Handlungs- oder Beobachtungsschritt erfüllt ist, und schaltet weiter.
   */
  function check() {
    if (!run || run.waiting || run.advancing) return;
    var step = run.S.STEPS[run.i];
    if (!step || !(step.kind === 'action' || step.kind === 'watch')) return;
    if (!step.done(run.eng, run.ctx)) return;
    run.advancing = true;
    var gen = run.gen;
    if (step.kind === 'action') {
      run.dom.coach.classList.add('tut-ok');
      var t = q('.tut-todo', run.dom.coach); t.hidden = false; t.textContent = 'Ausgeführt';
      sfx('doktrin-proc-01', 0.6);
    }
    whenCalm(function () {
      if (!run || run.gen !== gen) return;
      run.advancing = false;
      enter(run.i + 1);
    }, step.kind === 'action' ? 900 : 300);
  }

  /** „Weiter“ in einem Info- oder Schlussschritt. */
  function next() {
    if (!run || run.waiting || run.advancing) return;
    var step = run.S.STEPS[run.i];
    if (!(step.kind === 'info' || step.kind === 'finale')) return;
    sfx('ui-click', 0.5);
    if (step.onLeave) step.onLeave(run.ctx);
    if (step.kind === 'finale') { finish('done'); return; }
    if (step.id === 'payoff' && root.dcIsScripted && root.dcIsScripted()) {
      // Gegner darf jetzt seinen Zug beenden; der Bot-Takt fragt von selbst nach.
    }
    enter(run.i + 1);
  }

  /** „Zurück“: stellt den Stand des vorherigen Schritts wieder her. */
  function back() {
    if (!run || run.advancing) return;
    var j = prevIndex();
    if (j < 0) return;
    sfx('ui-click', 0.5);
    run.S.restore(run.eng, run.ctx, run.snaps[j]);
    if (root.dcScriptedSync) root.dcScriptedSync();
    run.gen++;
    run.waiting = false;
    run.i = j;
    run.lastPainted = j;
    paint();
  }

  /** Öffnet die Rückfrage zum Überspringen. */
  function askSkip() {
    if (!run) return;
    sfx('ui-click', 0.5);
    run.dom.confirm.hidden = false;
    var stay = q('.tut-stay', run.dom.confirm);
    try { stay.focus({ preventScroll: true }); } catch (e) { /* alt */ }
  }

  /**
   * Beendet das Tutorial: Merker setzen, Overlay und Engine verwerfen, Tisch abbauen, `onExit` rufen.
   * @param {'done'|'skip'} how
   */
  function finish(how) {
    if (!run) return;
    var my = run;
    run = null;
    markDone(how);
    clearInterval(my.timer);
    root.removeEventListener('resize', my.onResize);
    document.removeEventListener('keydown', my.onKey, true);
    if (root.DCTune && my.oldDialogMs != null) root.DCTune.dialogMs = my.oldDialogMs;
    my.dom.layer.classList.add('tut-leaving');
    var veil = q('#kick-veil');
    function teardown() {
      if (my.dom.layer.parentNode) my.dom.layer.parentNode.removeChild(my.dom.layer);
      if (root.dcEndScripted) root.dcEndScripted();
      my.eng.dispatch = function () { return { ok: false, error: 'Tutorial beendet' }; };
      if (my.opts.onExit) my.opts.onExit(how);
    }
    if (!veil) { teardown(); return; }
    veil.style.display = 'flex';
    veil.style.opacity = '0';
    requestAnimationFrame(function () { veil.style.opacity = '1'; });
    setTimeout(function () {
      teardown();
      setTimeout(function () {
        veil.style.opacity = '0';
        setTimeout(function () { veil.style.display = 'none'; }, 900);
      }, 250);
    }, 650);
  }

  /**
   * Startet das Tutorial als eigene Instanz auf dem Spieltisch.
   * @param {{onExit?: function('done'|'skip')}} [opts] `onExit` zeigt danach das passende Menü
   * @returns {boolean} false, wenn Engine/Tisch fehlen (dann sofort `onExit('skip')` ohne Merker)
   */
  function start(opts) {
    opts = opts || {};
    if (run) return true;
    var S = root.DCTutorialScenario;
    if (!S || !root.DCEngine || !root.DC_CATALOG || !root.dcStartScripted) { if (opts.onExit) opts.onExit('error'); return false; }
    forcedUsed = true;
    var eng = new root.DCEngine.Engine(root.DC_CATALOG, { seed: S.SEED });
    var who = activeOfficer();
    var ctx = S.setup(eng, who);
    run = { S: S, eng: eng, ctx: ctx, who: who, opts: opts, i: 0, gen: 0, snaps: {}, lastPainted: -1, waiting: false, advancing: false };
    wrapEngine();
    run.oldDialogMs = root.DCTune ? root.DCTune.dialogMs : null;
    if (root.DCTune) root.DCTune.dialogMs = Math.min(run.oldDialogMs || 2000, 1400);
    var my = run;
    introVeil(function () {
      if (run !== my) return;
      root.dcStartScripted({ engine: eng, botStep: function (e) { return S.botStep(e, ctx); }, onEnd: function () { setTimeout(check, 30); }, delayMs: 1100 });
      var musicOn = q('#opt-music') && q('#opt-music').checked;
      if (musicOn && root.dcTableMusic) root.dcTableMusic(true);
      my.dom = buildLayer();
      bind(my);
      my.timer = setInterval(layout, 200);
      enter(0);
    });
    return true;
  }

  /**
   * Übergang vom Titel: Titelmusik ausblenden, Schleier mit „Grundausbildung“, dann Tisch.
   * @param {Function} done
   */
  function introVeil(done) {
    var veil = q('#kick-veil'), msg = q('#kick-msg'), bgm = q('#bgm');
    if (!veil) { done(); return; }
    var oldMsg = msg ? msg.textContent : '';
    if (msg) { msg.textContent = 'Grundausbildung'; msg.style.display = 'none'; msg.style.opacity = '0'; }
    veil.style.display = 'flex';
    veil.style.opacity = '0';
    requestAnimationFrame(function () { veil.style.opacity = '1'; });
    var startVol = bgm ? bgm.volume : 0, t0 = Date.now();
    var fast = !!root.DC_REDUCE_MOTION;
    (function fade() {
      var u = Math.min(1, (Date.now() - t0) / (fast ? 300 : 1100));
      if (bgm) bgm.volume = Math.max(0, startVol * (1 - u));
      if (u < 1) { requestAnimationFrame(fade); return; }
      if (bgm) { try { bgm.pause(); bgm.currentTime = 0; bgm.volume = startVol; } catch (e) { /* egal */ } }
      if (msg) { msg.style.display = 'block'; requestAnimationFrame(function () { msg.style.opacity = '1'; }); }
      setTimeout(function () {
        if (msg) msg.style.opacity = '0';
        setTimeout(function () {
          if (msg) { msg.style.display = 'none'; msg.textContent = oldMsg; }
          done();
          veil.style.opacity = '0';
          setTimeout(function () { veil.style.display = 'none'; }, 1100);
        }, fast ? 100 : 700);
      }, fast ? 300 : 1300);
    })();
  }

  /**
   * Verdrahtet Knöpfe, Tastatur und Größenänderung des Overlays.
   * @param {object} my Lauf
   */
  function bind(my) {
    var d = my.dom;
    q('.tut-next', d.coach).addEventListener('click', next);
    q('.tut-back', d.coach).addEventListener('click', back);
    d.skip.addEventListener('click', askSkip);
    q('.tut-stay', d.confirm).addEventListener('click', function () { d.confirm.hidden = true; sfx('ui-click', 0.4); });
    q('.tut-leave', d.confirm).addEventListener('click', function () { d.confirm.hidden = true; finish('skip'); });
    d.catcher.addEventListener('click', function () {
      if (!run) return;
      var st = run.S.STEPS[run.i];
      blocked(run.waiting || st.kind === 'watch' ? 'Abwarten – der Gegner ist am Zug.' : 'Erst lesen, dann „Weiter“.');
    });
    my.onResize = function () { if (run) { run.layoutKey = ''; layout(); } };
    root.addEventListener('resize', my.onResize);
    my.onKey = function (ev) {
      if (!run) return;
      if (!d.confirm.hidden) { if (ev.key === 'Escape') { d.confirm.hidden = true; ev.preventDefault(); } return; }
      var st = run.S.STEPS[run.i];
      if ((ev.key === 'Enter' || ev.key === ' ') && (st.kind === 'info' || st.kind === 'finale') && !run.waiting) {
        ev.preventDefault(); ev.stopPropagation(); next();
      } else if (ev.key === 'Escape') { ev.preventDefault(); ev.stopPropagation(); askSkip(); }
    };
    document.addEventListener('keydown', my.onKey, true);
  }

  /**
   * Zustand für Tests im Browser (nur lesen).
   * @returns {{running: boolean, step: (string|null), index: number, total: number, waiting: boolean}}
   */
  function status() {
    if (!run) return { running: false, step: null, index: -1, total: 0, waiting: false };
    var st = run.S.STEPS[run.i];
    return { running: true, step: st ? st.id : null, index: run.i, total: run.S.STEPS.length, waiting: !!run.waiting };
  }

  root.DCTutorial = {
    KEY: KEY,
    isDone: isDone, markDone: markDone, reset: reset, shouldAutoStart: shouldAutoStart,
    start: start, status: status,
    /** Bricht ab wie „Überspringen“ (ohne Rückfrage). */
    skip: function () { finish('skip'); }
  };
})(typeof window !== 'undefined' ? window : globalThis);
