/**
 * Tutorial „Grundausbildung“ (t275): Szenario, Schritte, Prüfregeln und geskripteter Gegner.
 *
 * Reine Logik ohne DOM. Läuft im Browser (`window.DCTutorialScenario`) und in Node
 * (`module.exports`, für `tests/test_tutorial_t275.js`). Alle Regeln kommen aus der echten
 * Engine (`DCEngine.Engine`); das Tutorial legt nur Startaufstellung, Hand und Zugreihenfolge fest
 * und filtert Aktionen des Spielers, damit jeder Schritt genau ein Konzept übt.
 *
 * Ablauf und Lernziele: `Division_Command/docs/TUTORIAL_T275.md`.
 */
(function (root) {
  'use strict';

  /** Feste Karten des Szenarios (alle mit fertigem Bild außer den Nationeneinheiten, die keine haben). */
  var CARDS = {
    recruit: 'dc_eh_erstewelle',          // Erste Welle, Infanterie 1 AP 2/1 (Hand)
    cover: 'dc_so_deckung',               // Deckung suchen, Soforteinsatz 2 AP, Reaktion
    kitchen: 'dc_b_feldkueche_193',       // Feldküche, Unterstützung 1 AP
    push: 'dc_b_druckpunkt_645',          // Druckpunkt, Soforteinsatz 2 AP, 2 Schaden
    strap: 'dc_b_kronriemen_648',         // Kronriemen, Ausrüstung 1 AP, +1 ATK (Nachziehkarte Zug 3)
    vet: 'dc_b_abloesungstrupp_45',       // Ablösungstrupp, kampfbereit auf L2
    art: 'dc_b_eidhof_kaliber_81',        // Eidhof-Kaliber, Steilfeuer II, kampfbereit auf C1
    foeA: 'dc_b_stossgruppe_361',         // Stoßgruppe (Gegner L2)
    foeB: 'dc_b_warteblatt_laeufer_186',  // Warteblatt-Läufer (Gegner L3)
    elite: 'dc_b_lotte_knoten_687',       // Lotte Knoten, Elite 3/5 (Gegner C3)
    scout: 'dc_b_lagebild_149',           // Lagebild, legt der Gegner in seinem Zug (R2)
    gold: 'dc_b_offener_weg_191',         // nur Anschauung im Deckbau-Kapitel (Gold)
    docA: 'dc_dok_zielangriff',
    docB: 'dc_dok_etappensicherung',
    foeDocA: 'dc_dok_abloesung',
    foeDocB: 'dc_dok_verlegung'
  };
  /** Startpunkte beider Seiten (Übungslage). */
  var START_VP = 2;
  /** Seed der Tutorial-Partie (fest, damit jeder Durchlauf gleich ist). */
  var SEED = 275;

  var CHAPTERS = ['Lagebesprechung', 'Kommando', 'Feuer frei', 'Feindkontakt', 'Der Schlag', 'Deckbau'];

  /**
   * Selektor des Tischfeldes einer Karteninstanz.
   * @param {string} uid
   * @returns {string}
   */
  function slotSel(uid) { return '.slot[data-uid="' + uid + '"]'; }
  /**
   * Selektor einer Handkarte.
   * @param {string} uid
   * @returns {string}
   */
  function handSel(uid) { return '#hand .card[data-uid="' + uid + '"]'; }
  /** „Angriff“-Knopf im Aktionsdialog einer eigenen Einheit (erscheint nach dem Antippen). */
  var ACT_ATK = '#overlay #ac-atk';
  /** Kartenwahl im offenen Ziel-/Wahldialog. */
  var CHOICES = '#overlay .choices';

  /**
   * Sucht eine Karte in Front, Support, Hand oder Friedhof.
   * @param {object} eng Engine
   * @param {string} uid
   * @returns {{zone: string, inst: object}|null}
   */
  function where(eng, uid) {
    var loc = eng.findInst(uid);
    if (loc) return { zone: loc.zone, inst: loc.inst, section: loc.section, row: loc.row };
    var found = null;
    eng.state.players.forEach(function (p) {
      (p.hand || []).forEach(function (c) { if (c && c.uid === uid) found = { zone: 'hand', inst: c }; });
      (p.grave || []).forEach(function (c) { if (c && c.uid === uid && !found) found = { zone: 'grave', inst: c }; });
      (p.support || []).forEach(function (c) { if (c && c.uid === uid && !found) found = { zone: 'support', inst: c }; });
    });
    return found;
  }
  /**
   * Liegt die Instanz an der Front?
   * @param {object} eng
   * @param {string} uid
   * @returns {boolean}
   */
  function onFront(eng, uid) {
    var w = where(eng, uid);
    return !!(w && w.zone === 'front');
  }
  /**
   * Aktuelle Verteidigung einer Instanz (mit allen Boni) oder null.
   * @param {object} eng
   * @param {string} uid
   * @returns {number|null}
   */
  function defNow(eng, uid) {
    var w = where(eng, uid);
    if (!w || w.zone !== 'front') return null;
    try { if (eng.currentAtkDef) return eng.currentAtkDef(w.inst).def; } catch (e) { /* Fallback auf Grundwert */ }
    return w.inst.def;
  }

  /**
   * Baut die Tutorial-Partie auf einer frischen Engine auf. Ändert nur diese Engine.
   * @param {object} eng `new DCEngine.Engine(catalog, {seed: SEED})`
   * @param {{name?: string, portrait?: string, rank?: string}} [who] Anzeigename/Porträt des Spielers
   * @returns {object} ctx mit `u` (Instanz-IDs) und Laufzeitmerkern
   */
  function setup(eng, who) {
    who = who || {};
    eng.createMatch({
      seed: SEED, mode: 'tutorial', startPlayer: 0,
      name0: who.name || 'Rekrut', name1: 'Übungsgegner',
      deck0: [CARDS.recruit, CARDS.cover, CARDS.kitchen, CARDS.push, CARDS.strap],
      deck1: [CARDS.scout],
      doctrine0: [CARDS.docA, CARDS.docB], doctrine1: [CARDS.foeDocA, CARDS.foeDocB]
    });
    var st = eng.state;
    var me = eng.player(0), foe = eng.player(1);
    st.startCoin = null; // kein Münzwurf: die Lage ist vorgegeben
    st.events = [];
    eng.log = [];
    st.players.forEach(function (p) {
      ['L', 'C', 'R'].forEach(function (s) { p.front[s] = [null, null, null]; });
      p.support = p.support.map(function () { return null; });
      p.grave = [];
    });
    st.pending = null;
    function mk(pid, id) { return eng.instFromId(id, pid); }
    function put(pid, id, s, r) {
      var inst = mk(pid, id);
      inst.summonedTurn = -9; inst.playedTurn = -9;
      eng.player(pid).front[s][r] = inst;
      return inst;
    }
    var u = {};
    var hand = [mk(0, CARDS.recruit), mk(0, CARDS.cover), mk(0, CARDS.kitchen), mk(0, CARDS.push)];
    u.recruit = hand[0].uid; u.cover = hand[1].uid; u.kitchen = hand[2].uid; u.push = hand[3].uid;
    me.hand = hand;
    var strap = mk(0, CARDS.strap); u.strap = strap.uid;
    // Nachziehstapel: Kronriemen oben, darunter Reserve (Zielangriff zieht beim Abschluss 1 Karte).
    me.deck = [strap, mk(0, 'dc_eh_sich'), mk(0, CARDS.recruit), mk(0, 'dc_eh_sich')];
    var scout = mk(1, CARDS.scout); u.scout = scout.uid;
    foe.hand = [scout];
    foe.deck = [mk(1, 'dc_eh_sich'), mk(1, 'dc_eh_sich'), mk(1, 'dc_eh_sich')];
    u.vet = put(0, CARDS.vet, 'L', 1).uid;
    u.art = put(0, CARDS.art, 'C', 0).uid;
    u.foeA = put(1, CARDS.foeA, 'L', 1).uid;
    u.foeB = put(1, CARDS.foeB, 'L', 2).uid;
    u.elite = put(1, CARDS.elite, 'C', 2).uid;
    me.vp = START_VP; foe.vp = START_VP;
    me.ap = 5; foe.ap = 5;
    st.turn = 1; st.active = 0; st.phase = 'main';
    if (who.portrait) me.portrait = who.portrait;
    me.rank = who.rank || 'Fhr';
    foe.portrait = 'f07-kampf-none';
    foe.rank = 'Hptm';
    st.tutorial = true;
    return { u: u, botEndAllowed: false, botStepNo: 0, seed: SEED };
  }

  /* ---------- Prüfhilfen für Handlungsschritte ---------- */

  /**
   * Gemeinsamer Filter: Abbrechen einer eigenen Wahl ist fast immer erlaubt.
   * @param {object} a Aktion
   * @returns {boolean}
   */
  function isCancel(a) { return a.type === 'CANCEL_PENDING'; }

  /**
   * Erlaubt „Karte X spielen“ einschließlich der Folgewahl (Stellung oder Ziel).
   * @param {object} a Aktion
   * @param {object} eng Engine
   * @param {string} uid Handkarte
   * @param {function(object): boolean} pick prüft Stellung/Ziel der Folgewahl
   * @returns {boolean}
   */
  function playFlow(a, eng, uid, pick) {
    if (a.type === 'PLAY') {
      if (a.uid !== uid) return false;
      if (a.slot) return pick({ slot: a.slot });
      if (a.target) return pick({ target: a.target });
      return true;
    }
    if (a.type === 'CHOOSE_SLOT' || a.type === 'CHOOSE_TARGET' || a.type === 'RESOLVE_PENDING') {
      if (!eng.state.pending) return false;
      return pick({ slot: a.slot, target: a.target });
    }
    return isCancel(a);
  }
  /**
   * Erlaubt „Einheit X greift Y an“ (direkt mit Ziel oder über die Zielwahl).
   * @param {object} a
   * @param {string} attacker
   * @param {string} target
   * @returns {boolean}
   */
  function attackFlow(a, attacker, target) {
    if (a.type === 'ATTACK') return a.uid === attacker && (!a.target || a.target === target);
    if (a.type === 'CHOOSE_TARGET' || a.type === 'RESOLVE_PENDING') return a.target === target;
    return isCancel(a);
  }

  /* ---------- Schritte ---------- */

  /**
   * Schrittliste. Felder:
   * - `kind`: info (Weiter), action (wartet auf Aktion), watch (Gegner handelt), finale (Ende)
   * - `focus(ctx)`: Selektoren, die ausgeschnitten und markiert werden (unsichtbare entfallen)
   * - `arrow`: Index des Pfeilziels oder Liste nach Vorrang (der erste sichtbare gewinnt); `mark`: Index/Liste der pulsierenden Ziele
   * - `allow(a, eng, ctx)`: true oder Hinweistext für eine Spieleraktion
   * - `done(eng, ctx)`: Schritt erfüllt
   * - `ready(eng, ctx)`: Schritt darf beginnen (z. B. erst nach dem Gegnerzug)
   * - `solve(eng, ctx)`: Lösungsweg (Tests/Autopilot)
   * @type {object[]}
   */
  var STEPS = [
    { id: 'intro', chapter: 0, kind: 'info', center: true, title: 'Willkommen, Rekrut',
      text: 'Hauptmann Kessler, Ihr Ausbilder. Ein Übungsgefecht, rund zehn Minuten. Danach führen Sie selbst.',
      focus: function () { return []; } },
    { id: 'goal', chapter: 0, kind: 'info', title: 'Ihr Auftrag: 5 Siegpunkte',
      text: 'Wer zuerst <b>5 SP</b> hat, gewinnt. Elite zerstören: <b>+2</b>. Abschnitt halten (Durchbruch): <b>+1</b>. Doktrin-Ziel erfüllen: <b>+1</b>. Beide Seiten stehen bei 2.',
      focus: function () { return ['#ap0', '#ap1']; } },
    { id: 'front', chapter: 0, kind: 'info', title: 'Die Front',
      text: 'Drei Abschnitte – linke Flanke, Zentrum, rechte Flanke – mit je drei Stellungen. Unten Ihre Linie, oben der Feind. Bewegt wird nur, wenn eine Karte es erlaubt.',
      focus: function () { return ['#my-front', '#enemy-front']; } },
    { id: 'ap', chapter: 1, kind: 'info', title: 'Aktionspunkte',
      text: 'AP sind Ihre Befehlskraft: <b>5 pro Zug</b> – beide Seiten schon im ersten Zug. Jede Karte kostet die AP, die auf ihr stehen. Ein Angriff kostet 1 AP.',
      focus: function () { return ['#ap0']; } },
    { id: 'hand', chapter: 1, kind: 'info', title: 'Ihre Hand',
      text: 'Einheiten, Unterstützung, Ausrüstung, Soforteinsätze. Kosten oben auf der Karte, Angriff (ATK) und Verteidigung (DEF) unten. Jede Karte kommt heute dran.',
      focus: function () { return ['#hand']; } },
    { id: 'deploy', chapter: 1, kind: 'action', title: 'Einheit an die Front',
      text: 'Ziehen Sie die <b>Erste Welle</b> auf die markierte Stellung im Zentrum – direkt gegenüber der feindlichen Elite. (Oder: Karte anklicken, dann Stellung.)',
      focus: function (ctx) { return [handSel(ctx.u.recruit), '#my-front .slot[data-section="C"][data-row="2"]', slotSel(ctx.u.elite)]; },
      arrow: 0, mark: 1,
      allow: function (a, eng, ctx) {
        var ok = playFlow(a, eng, ctx.u.recruit, function (p) { return !p.slot || (p.slot.section === 'C' && Number(p.slot.row) === 2); });
        if (ok) return true;
        if (a.type === 'PLAY' && a.uid === ctx.u.recruit) return 'Fast: die markierte Stellung im Zentrum, gegenüber der Elite.';
        if (a.type === 'CHOOSE_SLOT') return 'Fast: die markierte Stellung im Zentrum, gegenüber der Elite.';
        return 'Jetzt nur die Erste Welle an die Front.';
      },
      done: function (eng, ctx) { var w = where(eng, ctx.u.recruit); return !!(w && w.zone === 'front') && !eng.state.pending; },
      solve: function (eng, ctx) { return [{ type: 'PLAY', player: 0, uid: ctx.u.recruit }, { type: 'CHOOSE_SLOT', player: 0, slot: { section: 'C', row: 2 } }]; } },
    { id: 'digin', chapter: 1, kind: 'info', title: 'Eingegraben',
      text: 'Frisch gelegt heißt <b>eingegraben</b> (Schild): bis zu Ihrem nächsten Zug unangreifbar für Angriffe und gezielte Einsätze, dazu +1 DEF. Angreifen darf sie erst im nächsten Zug.',
      focus: function (ctx) { return [slotSel(ctx.u.recruit)]; } },
    { id: 'attack', chapter: 2, kind: 'action', title: 'Feuer frei',
      text: 'Ihr <b>Ablösungstrupp</b> ist kampfbereit. Reichweite: gegenüber und die Nachbarstellungen. Klicken Sie ihn an, wählen Sie <b>Angreifen</b> und dann die <b>Stoßgruppe</b>.',
      focus: function (ctx) { return [slotSel(ctx.u.vet), slotSel(ctx.u.foeA), ACT_ATK, CHOICES]; }, arrow: [3, 2, 0], mark: 1,
      allow: function (a, eng, ctx) {
        if (attackFlow(a, ctx.u.vet, ctx.u.foeA)) return true;
        if (a.type === 'ATTACK' && a.uid === ctx.u.vet) return 'Ziel ist die Stoßgruppe direkt gegenüber.';
        if (a.type === 'CHOOSE_TARGET') return 'Ziel ist die Stoßgruppe direkt gegenüber.';
        return 'Jetzt greift der Ablösungstrupp an.';
      },
      done: function (eng, ctx) { return !onFront(eng, ctx.u.foeA) && !eng.state.pending; },
      solve: function (eng, ctx) { return [{ type: 'ATTACK', player: 0, uid: ctx.u.vet }, { type: 'CHOOSE_TARGET', player: 0, target: ctx.u.foeA }]; } },
    { id: 'counter', chapter: 2, kind: 'info', title: 'Zerstört',
      text: 'Stabilität auf 0 – die Einheit fällt. Überlebt ein Ziel, <b>schlägt es zurück</b>. Wer fällt, schlägt nicht zurück. Ihr Trupp bleibt auf seiner Stellung.',
      focus: function (ctx) { return [slotSel(ctx.u.vet), '#enemy-front']; } },
    { id: 'steil', chapter: 2, kind: 'action', title: 'Steilfeuer',
      text: 'Artillerie trägt <b>Steilfeuer I–V</b>. I: 3 Stellungen breit, II: 5, III: 7, IV: ganze Front, V: auch Support. Ihre Batterie hat II – sie erreicht die Elite zwei Stellungen weiter. <b>Feuer auf die Elite!</b>',
      focus: function (ctx) { return [slotSel(ctx.u.art), slotSel(ctx.u.elite), ACT_ATK, CHOICES]; }, arrow: [3, 2, 0], mark: 1,
      allow: function (a, eng, ctx) {
        if (attackFlow(a, ctx.u.art, ctx.u.elite)) return true;
        if (a.type === 'ATTACK' && a.uid === ctx.u.art) return 'Ziel ist die Elite Lotte Knoten.';
        if (a.type === 'CHOOSE_TARGET') return 'Ziel ist die Elite Lotte Knoten.';
        return 'Jetzt feuert die Batterie Eidhof-Kaliber.';
      },
      done: function (eng, ctx) { var d = defNow(eng, ctx.u.elite); return d != null && d < 5 && !eng.state.pending; },
      solve: function (eng, ctx) { return [{ type: 'ATTACK', player: 0, uid: ctx.u.art }, { type: 'CHOOSE_TARGET', player: 0, target: ctx.u.elite }]; } },
    { id: 'noreturn', chapter: 2, kind: 'info', title: 'Kein Rückschlag',
      text: 'Treffer. Die Elite kann Ihre Batterie mit ihrer eigenen Reichweite nicht erreichen – also <b>kein Gegenschlag</b>. Das ist der Wert der Artillerie.',
      focus: function (ctx) { return [slotSel(ctx.u.art), slotSel(ctx.u.elite)]; } },
    { id: 'reserve', chapter: 3, kind: 'info', title: 'AP in Reserve',
      text: 'Sie haben noch <b>2 AP</b>. Behalten Sie sie. Im Zug des Gegners zahlen Sie damit Reaktionen. Zu Beginn Ihres nächsten Zuges gibt es wieder 5.',
      focus: function (ctx) { return ['#ap0', handSel(ctx.u.cover)]; } },
    { id: 'endturn', chapter: 3, kind: 'action', title: 'Zug beenden',
      text: 'Ihr Zug ist getan. Klicken Sie <b>Zugende</b>.',
      focus: function () { return ['#btn-end']; }, arrow: 0,
      allow: function (a) { return a.type === 'END_TURN' ? true : 'Jetzt nur noch: Zugende.'; },
      done: function (eng) { return eng.state.active === 1; },
      solve: function () { return [{ type: 'END_TURN', player: 0 }]; } },
    { id: 'enemy', chapter: 3, kind: 'watch', title: 'Der Gegner ist am Zug',
      text: 'Beobachten Sie. Ihre frisch gelegte Erste Welle ist eingegraben – dort kommt er nicht durch.',
      focus: function () { return ['#enemy-front', '#my-front']; },
      done: function (eng) { var p = eng.state.pending; return !!(p && p.kind === 'react-window' && p.player === 0); } },
    { id: 'react', chapter: 3, kind: 'action', title: 'Feindkontakt!',
      text: 'Der Läufer greift Ihren Trupp an. Jetzt zahlen sich die 2 AP aus: Spielen Sie <b>Deckung suchen</b> (Soforteinsatz, 2 AP – wie aufgedruckt) und wählen Sie den <b>Ablösungstrupp</b>.',
      focus: function (ctx) { return ['#overlay [data-react="' + ctx.u.cover + '"]', CHOICES, slotSel(ctx.u.vet), slotSel(ctx.u.foeB)]; }, arrow: [0, 1], mark: [0, 1, 2],
      allow: function (a, eng, ctx) {
        var pend = eng.state.pending;
        if (a.type === 'PLAY' && a.uid === ctx.u.cover) return true;
        if ((a.type === 'CHOOSE_TARGET' || a.type === 'RESOLVE_PENDING') && pend && pend.kind === 'react-window') return a.target === ctx.u.cover ? true : 'Wählen Sie „Deckung suchen“.';
        if (a.type === 'CHOOSE_TARGET' || a.type === 'RESOLVE_PENDING') return a.target === ctx.u.vet ? true : 'Die Deckung gehört dem angegriffenen Ablösungstrupp.';
        if (a.type === 'REACT_PASS' || a.type === 'CANCEL_PENDING') return 'Noch nicht weitergeben – erst in Deckung!';
        return 'Jetzt: Deckung suchen.';
      },
      done: function (eng, ctx) { return !onFront(eng, ctx.u.foeB) && !(eng.state.pending && eng.state.pending.player === 0); },
      solve: function (eng, ctx) { return [{ type: 'PLAY', player: 0, uid: ctx.u.cover }, { type: 'CHOOSE_TARGET', player: 0, target: ctx.u.vet }]; } },
    { id: 'payoff', chapter: 3, kind: 'info', title: 'Gegenschlag',
      text: '+3 DEF – Ihr Trupp hält und <b>schlägt zurück</b>. Der Läufer fällt. Das war Ihr zweiter Abschuss: Doktrin-Ziel <b>Zielangriff</b> erfüllt, <b>+1 SP</b>.',
      focus: function (ctx) { return [slotSel(ctx.u.vet), '#ap0']; },
      onLeave: function (ctx) { ctx.botEndAllowed = true; } },
    { id: 'doctrines', chapter: 4, kind: 'info', title: 'Doktrinen',
      text: 'Jedes Deck führt <b>zwei Doktrinen</b>. Sie wirken immer und kosten nichts. <b>Zielangriff</b>: +2 ATK gegen beschädigte Feinde. <b>Etappensicherung</b>: +1 DEF. Dazu je ein Doktrin-Ziel für +1 SP.',
      focus: function () { return ['#my-doctrine']; },
      ready: function (eng) { return eng.state.active === 0 && eng.state.turn >= 3 && !eng.state.pending; } },
    { id: 'support', chapter: 4, kind: 'action', title: 'Unterstützung',
      text: 'Hinter der Front liegt die <b>Support-Zone</b>: Logistik, Lazarett, Aufklärung. Legen Sie die <b>Feldküche</b> dorthin (1 AP). Sie heilt zu Beginn Ihres Zuges 1 DEF an einer beschädigten Einheit.',
      focus: function (ctx) { return [handSel(ctx.u.kitchen), '#my-support']; }, arrow: 0, mark: 1,
      allow: function (a, eng, ctx) {
        if (a.type === 'PLAY' && a.uid === ctx.u.kitchen && !a.facedown) return true;
        if (isCancel(a)) return true;
        return 'Zuerst die Feldküche in den Support.';
      },
      done: function (eng, ctx) { var w = where(eng, ctx.u.kitchen); return !!(w && w.zone === 'support'); },
      solve: function (eng, ctx) { return [{ type: 'PLAY', player: 0, uid: ctx.u.kitchen }]; } },
    { id: 'equip', chapter: 4, kind: 'action', title: 'Ausrüstung',
      text: 'Frisch gezogen: <b>Kronriemen</b>, +1 ATK. Ziehen Sie ihn auf Ihre <b>Erste Welle</b> (1 AP). Ausrüstung bleibt am Träger, bis er fällt.',
      focus: function (ctx) { return [handSel(ctx.u.strap), slotSel(ctx.u.recruit), CHOICES]; }, arrow: [2, 0], mark: 1,
      allow: function (a, eng, ctx) {
        var ok = playFlow(a, eng, ctx.u.strap, function (p) { return !p.target || p.target === ctx.u.recruit; });
        if (ok) return true;
        if (a.type === 'CHOOSE_TARGET' || (a.type === 'PLAY' && a.uid === ctx.u.strap)) return 'Der Kronriemen gehört an die Erste Welle.';
        return 'Jetzt: Kronriemen an die Erste Welle.';
      },
      done: function (eng, ctx) {
        var w = where(eng, ctx.u.recruit);
        return !!(w && w.zone === 'front' && (w.inst.attachments || []).some(function (x) { return x && (x.uid === ctx.u.strap || x === ctx.u.strap); })) && !eng.state.pending;
      },
      solve: function (eng, ctx) { return [{ type: 'PLAY', player: 0, uid: ctx.u.strap }, { type: 'CHOOSE_TARGET', player: 0, target: ctx.u.recruit }]; } },
    { id: 'instant', chapter: 4, kind: 'action', title: 'Soforteinsatz',
      text: 'Ein Soforteinsatz wirkt sofort und geht danach in den Friedhof. <b>Druckpunkt</b> kostet 2 AP: 2 Schaden an der <b>Elite</b>.',
      focus: function (ctx) { return [handSel(ctx.u.push), slotSel(ctx.u.elite), CHOICES]; }, arrow: [2, 0], mark: 1,
      allow: function (a, eng, ctx) {
        var ok = playFlow(a, eng, ctx.u.push, function (p) { return !p.target || p.target === ctx.u.elite; });
        if (ok) return true;
        if (a.type === 'CHOOSE_TARGET' || (a.type === 'PLAY' && a.uid === ctx.u.push)) return 'Ziel ist die Elite Lotte Knoten.';
        return 'Jetzt: Druckpunkt auf die Elite.';
      },
      done: function (eng, ctx) { var w = where(eng, ctx.u.push); return !!(w && w.zone !== 'hand') && !eng.state.pending; },
      solve: function (eng, ctx) { return [{ type: 'PLAY', player: 0, uid: ctx.u.push }, { type: 'CHOOSE_TARGET', player: 0, target: ctx.u.elite }]; } },
    { id: 'final', chapter: 4, kind: 'action', title: 'Der Schlag',
      text: 'Die Elite wankt. Ihre <b>Erste Welle</b> ist nicht mehr eingegraben und darf angreifen – mit Kronriemen und Zielangriff (+2 gegen Beschädigte). <b>Angriff auf die Elite!</b>',
      focus: function (ctx) { return [slotSel(ctx.u.recruit), slotSel(ctx.u.elite), '#ap0', ACT_ATK, CHOICES]; }, arrow: [4, 3, 0], mark: 1,
      allow: function (a, eng, ctx) {
        if (attackFlow(a, ctx.u.recruit, ctx.u.elite)) return true;
        if (a.type === 'ATTACK' || a.type === 'CHOOSE_TARGET') return 'Die Erste Welle greift die Elite an.';
        return 'Jetzt: Erste Welle greift die Elite an.';
      },
      done: function (eng) { return eng.state.winner === 0; },
      solve: function (eng, ctx) { return [{ type: 'ATTACK', player: 0, uid: ctx.u.recruit }, { type: 'CHOOSE_TARGET', player: 0, target: ctx.u.elite }]; } },
    { id: 'victory', chapter: 4, kind: 'info', victory: true, center: true, title: 'Sieg!',
      text: 'Elite zerstört: <b>+2 SP</b>. Fünf von fünf – das Gefecht ist gewonnen. Saubere Arbeit, Rekrut.',
      focus: function () { return []; } },
    { id: 'deck', chapter: 5, kind: 'info', center: true, panel: 'deck', title: 'Ihr Deck',
      text: 'Ein Deck hat <b>60 Karten + 2 Doktrinen</b>. Karten <b>aller Nationen</b> dürfen Sie frei mischen. Die zwei Doktrinen wählen Sie aus allen 36.',
      focus: function () { return []; } },
    { id: 'rarity', chapter: 5, kind: 'info', center: true, panel: 'rarity', title: 'Seltenheit und Elite',
      text: 'Kopien je Name: <b>Gold 1 · Silber 2 · Bronze 4</b>. <b>Elite</b> ist keine Stufe, sondern ein Merkmal – es gibt Elite in Bronze, Silber und Gold. Zerstörte Elite bringt 2 SP.',
      focus: function () { return []; } },
    { id: 'outro', chapter: 5, kind: 'finale', center: true, title: 'Ausbildung abgeschlossen',
      text: 'Bauen Sie Ihr Deck in der <b>Bibliothek</b>, üben Sie gegen den Bot im <b>Einzelspieler</b>. Das Tutorial finden Sie jederzeit im Hauptmenü. Wegtreten!',
      focus: function () { return []; } }
  ];

  /**
   * Geskripteter Gegner: legt Lagebild, greift mit dem Läufer an, beendet den Zug, sobald das
   * Tutorial es freigibt. Gibt `null` zurück, wenn er warten soll.
   * @param {object} eng
   * @param {object} ctx
   * @returns {object|null} Aktion für Spieler 1
   */
  function botStep(eng, ctx) {
    var st = eng.state;
    var pend = st.pending;
    if (pend && pend.player === 1) {
      var ch = (pend.choices || [])[0];
      if (pend.kind === 'react-window') return { type: 'REACT_PASS', player: 1 };
      if (ch && ch.slot) return { type: 'CHOOSE_SLOT', player: 1, slot: ch.slot };
      if (ch && ch.target) return { type: 'CHOOSE_TARGET', player: 1, target: ch.target };
      return { type: 'CANCEL_PENDING', player: 1 };
    }
    if (st.active !== 1 || pend) return null;
    var foe = eng.player(1);
    if (foe.hand.some(function (c) { return c.uid === ctx.u.scout; })) {
      return { type: 'PLAY', player: 1, uid: ctx.u.scout, slot: { section: 'R', row: 1 } };
    }
    if (onFront(eng, ctx.u.foeB)) {
      var b = where(eng, ctx.u.foeB);
      if (!b.inst.attackUsed && onFront(eng, ctx.u.vet)) return { type: 'ATTACK', player: 1, uid: ctx.u.foeB, target: ctx.u.vet };
    }
    return ctx.botEndAllowed ? { type: 'END_TURN', player: 1 } : null;
  }

  /**
   * Prüft eine Spieleraktion gegen den aktuellen Schritt.
   * @param {object} step Schritt aus STEPS
   * @param {object} a Aktion
   * @param {object} eng
   * @param {object} ctx
   * @returns {string|null} Hinweistext, wenn blockiert; sonst null
   */
  function gate(step, a, eng, ctx) {
    if (!a || a.player !== 0) return null;
    if (!step || step.kind !== 'action' || !step.allow) {
      return step && step.kind === 'watch' ? 'Abwarten – der Gegner ist am Zug.' : 'Erst lesen, dann „Weiter“.';
    }
    var r = step.allow(a, eng, ctx);
    return r === true ? null : (typeof r === 'string' ? r : 'Das ist gerade nicht dran.');
  }

  /**
   * Zustand für „Zurück“: Engine-Stand plus Laufzeitmerker, tief kopiert.
   * @param {object} eng
   * @param {object} ctx
   * @returns {object}
   */
  function snapshot(eng, ctx) {
    return { state: JSON.parse(JSON.stringify(eng.state)), uid: eng._uid, log: eng.log.length, botEndAllowed: ctx.botEndAllowed };
  }
  /**
   * Stellt einen Stand aus `snapshot` wieder her.
   * @param {object} eng
   * @param {object} ctx
   * @param {object} snap
   */
  function restore(eng, ctx, snap) {
    eng.state = JSON.parse(JSON.stringify(snap.state));
    eng._uid = snap.uid;
    eng.log = eng.log.slice(0, snap.log);
    ctx.botEndAllowed = snap.botEndAllowed;
  }

  var api = {
    CARDS: CARDS, CHAPTERS: CHAPTERS, STEPS: STEPS, SEED: SEED, START_VP: START_VP,
    setup: setup, botStep: botStep, gate: gate, snapshot: snapshot, restore: restore,
    where: where, onFront: onFront, defNow: defNow, slotSel: slotSel, handSel: handSel
  };
  root.DCTutorialScenario = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
