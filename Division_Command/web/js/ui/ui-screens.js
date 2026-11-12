/**
 * t280 – Bedienhilfen für alle Bildschirme außerhalb des Tisches.
 *  - Symbole (SVG-Sprite assets/ui/icons.svg) und Kurzbeschreibungen für das Hauptmenü,
 *  - Esc = Zurück auf Arbeitsseiten, wenn kein Dialog offen ist,
 *  - Standbild (poster) für das Titelvideo.
 * Der sichtbare Text der Knöpfe bleibt unverändert (Tests und Tutorial suchen danach).
 */
(function () {
  'use strict';

  /** Pfad zum Symbol-Sprite. */
  var SPRITE = 'assets/ui/icons.svg?v=t280';

  /**
   * Hauptmenü: Knopf-ID → [Symbol, Kurzbeschreibung].
   * @type {Object<string, Array<string>>}
   */
  var MENU = {
    'go-single': ['i-single', 'Gegen die KI oder zu zweit an einem Gerät'],
    'go-lan': ['i-lan', 'Gegen einen Menschen im Netz (LAN, Hamachi)'],
    'go-library': ['i-library', 'Karten ansehen und Decks bauen'],
    'go-tutorial': ['i-tutorial', 'Grundausbildung Schritt für Schritt'],
    'go-hilfe': ['i-help', ''],
    'go-user': ['i-user', ''],
    'go-playtest': ['i-playtest', ''],
    'go-options': ['i-options', ''],
    'go-quit': ['i-quit', '']
  };

  /**
   * Erzeugt ein SVG-Symbol aus dem Sprite.
   * @param {string} id Symbolname, z. B. "i-single".
   * @returns {SVGSVGElement}
   */
  function icon(id) {
    var NS = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('class', 'ui-ico');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    var use = document.createElementNS(NS, 'use');
    use.setAttribute('href', SPRITE + '#' + id);
    svg.appendChild(use);
    return svg;
  }

  /**
   * Setzt vor einen Knopf ein Symbol und hüllt den Text in einen Span (Text bleibt gleich).
   * @param {HTMLElement} btn Knopf.
   * @param {string} ico Symbolname.
   * @param {string} [sub] Kurzbeschreibung (per CSS aus data-sub angezeigt).
   */
  function decorate(btn, ico, sub) {
    if (!btn || btn.dataset.ui280) return;
    btn.dataset.ui280 = '1';
    var span = document.createElement('span');
    span.className = 'menu-btn-text';
    while (btn.firstChild) span.appendChild(btn.firstChild);
    if (sub) { span.setAttribute('data-sub', sub); if (!btn.title) btn.title = sub; }
    btn.appendChild(icon(ico));
    btn.appendChild(span);
  }

  /** Hauptmenü und Zurück-Knöpfe mit Symbolen versehen. */
  function decorateMenu() {
    Object.keys(MENU).forEach(function (id) {
      decorate(document.getElementById(id), MENU[id][0], MENU[id][1]);
    });
  }

  /**
   * Liegt gerade ein Dialog über der Seite? Dann gehört Esc dem Dialog.
   * @returns {boolean}
   */
  function modalOpen() {
    var sel = '.modal-layer:not([hidden]), #dc-reset-dialog, .dc-reset-layer, #tut-coach:not([hidden]), #dc-end-screen, #playtest-panel.open';
    var list = document.querySelectorAll(sel);
    for (var i = 0; i < list.length; i++) {
      var el = list[i];
      var cs = getComputedStyle(el);
      if (cs.display !== 'none' && cs.visibility !== 'hidden' && el.getClientRects().length) return true;
    }
    return false;
  }

  /**
   * Esc auf einer Arbeitsseite drückt den sichtbaren Zurück-Knopf.
   * @param {KeyboardEvent} e
   */
  function onKey(e) {
    if (e.key !== 'Escape' || e.defaultPrevented) return;
    var work = document.getElementById('work-root');
    if (!work || !work.classList.contains('open')) return;
    if (document.getElementById('app') && document.getElementById('app').childElementCount && getComputedStyle(document.getElementById('app')).display !== 'none' && !document.getElementById('title-root').offsetParent) return;
    var bot = document.getElementById('bot-modal');
    if (bot && bot.style.display !== 'none' && bot.getClientRects().length) {
      var cancel = document.getElementById('bot-cancel');
      if (cancel) { e.preventDefault(); cancel.click(); }
      return;
    }
    if (modalOpen()) return;
    var t = e.target;
    if (t && /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName) && t.value) { t.blur(); return; }
    var list = work.querySelectorAll('.screen.on .back, .screen.on .ui-back');
    for (var i = 0; i < list.length; i++) {
      var back = list[i];
      if (back.offsetParent && !back.disabled) { e.preventDefault(); back.click(); return; }
    }
  }

  /** Standbild für das Titelvideo, damit vor dem ersten Frame kein schwarzer Schirm steht. */
  function poster() {
    var v = document.getElementById('title-loop');
    if (v && !v.getAttribute('poster')) v.setAttribute('poster', 'assets/title-back-poster.webp');
  }

  /**
   * Einzelspieler: zwei Bildkarten (KI-Gegner, Hotseat) über dem Formular.
   * Sie stellen nur das vorhandene Auswahlfeld #mode um; dessen change-Logik bleibt maßgeblich.
   */
  function singleModes() {
    var scr = document.getElementById('scr-single');
    var sel = document.getElementById('mode');
    if (!scr || !sel || scr.querySelector('.ui-modes')) return;
    var box = document.createElement('div');
    box.className = 'ui-modes';
    box.setAttribute('role', 'group');
    box.setAttribute('aria-label', 'Spielart');
    var defs = [
      { key: 'bot', img: 'assets/ui/mode-ki.webp', title: 'Gegen die KI', sub: 'Ein Bot übernimmt die Gegenseite' },
      { key: 'hotseat', img: 'assets/ui/mode-hotseat.webp', title: 'Hotseat', sub: 'Zwei Offiziere, ein Gerät' }
    ];
    var btns = defs.map(function (d) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'ui-mode';
      b.id = 'ui-mode-' + d.key;
      b.style.setProperty('--img', 'url("' + new URL(d.img, document.baseURI).href + '")');
      b.innerHTML = '<b></b><small></small>';
      b.firstChild.textContent = d.title;
      b.lastChild.textContent = d.sub;
      b.addEventListener('click', function () {
        var want = d.key === 'hotseat' ? 'hotseat' : (sel.value !== 'hotseat' ? sel.value : (sel.dataset.lastBot || 'bot'));
        if (sel.value !== want) {
          sel.value = want;
          sel.dispatchEvent(new Event('change'));
        }
        paint();
      });
      box.appendChild(b);
      return b;
    });
    /** Gewählte Karte markieren und data-mode setzen. */
    function paint() {
      var hot = sel.value === 'hotseat';
      if (!hot) sel.dataset.lastBot = sel.value;
      scr.setAttribute('data-mode', hot ? 'hotseat' : 'bot');
      btns[0].setAttribute('aria-pressed', String(!hot));
      btns[1].setAttribute('aria-pressed', String(hot));
      var hs2 = document.getElementById('hotseat-user');
      scr.classList.toggle('ui-hs-empty', !!hs2 && hs2.options.length === 0);
    }
    var goSingle = document.getElementById('go-single');
    if (goSingle) goSingle.addEventListener('click', function () { setTimeout(paint, 0); });
    sel.addEventListener('change', paint);
    // Leerer Zustand: Hotseat braucht einen zweiten Benutzer
    var hs = document.getElementById('hotseat-user');
    var row = document.getElementById('hotseat-row');
    if (hs && row && !document.getElementById('ui-hotseat-empty')) {
      var hint = document.createElement('p');
      hint.id = 'ui-hotseat-empty';
      hint.className = 'ui-hint ui-empty-inline';
      hint.textContent = 'Noch kein zweiter Offizier angelegt. Unter „Benutzer“ im Hauptmenü kannst du einen weiteren anlegen.';
      row.parentNode.insertBefore(hint, row.nextSibling);
    }
    var title = scr.querySelector('.page-title');
    if (title && title.nextSibling) scr.insertBefore(box, title.nextSibling);
    else scr.insertBefore(box, scr.firstChild);
    paint();
  }

  /**
   * Benutzer: „Akte speichern“ in die Aktionsleiste neben „Zurück“, „Neuen Benutzer anlegen“ als eigene Zeile im Formular.
   * Elemente werden nur umgehängt; IDs und Handler bleiben.
   */
  function userLayout() {
    var scr = document.getElementById('scr-user');
    var save = document.getElementById('user-save');
    var back = document.getElementById('back-user');
    var add = document.getElementById('user-add');
    var input = document.getElementById('user-new');
    if (!scr || !save || !back || !add || !input || scr.querySelector('.ui-user-new')) return;
    var bar = back.parentNode;
    var oldMenu = save.parentNode;
    var lbl = input.closest('label');
    var row = document.createElement('div');
    row.className = 'ui-user-new';
    if (lbl) { lbl.parentNode.insertBefore(row, lbl); row.appendChild(lbl); }
    row.appendChild(add);
    bar.classList.add('ui-actionbar');
    bar.appendChild(save);
    if (oldMenu && oldMenu !== bar && !oldMenu.querySelector('button')) oldMenu.classList.add('ui-empty-menu');
    // Formularzeile vor die Aktionsleiste
    scr.insertBefore(row, bar);
  }

  /**
   * Baut ein Bildband (Illustration links, Text rechts) für den Kopf einer Seite.
   * @param {string} img Bildpfad relativ zur Seite.
   * @param {string} title Überschrift.
   * @param {string} text Erklärung in einem Satz.
   * @returns {HTMLElement}
   */
  function banner(img, title, text) {
    var el = document.createElement('div');
    el.className = 'ui-banner';
    el.style.setProperty('--img', 'url("' + new URL(img, document.baseURI).href + '")');
    var b = document.createElement('b'); b.textContent = title;
    var p = document.createElement('span'); p.textContent = text;
    el.appendChild(b); el.appendChild(p);
    return el;
  }

  /** LAN: Bildband, Suchzeile über die Aktionsleiste, „Lobby verlassen“ als Zurück. */
  function lanLayout() {
    var scr = document.getElementById('scr-lan');
    var pick = document.getElementById('lan-pick');
    var join = document.getElementById('join-row');
    var back = document.getElementById('back-lan');
    if (!scr || !pick || scr.querySelector('.ui-banner')) return;
    var title = scr.querySelector('.page-title');
    scr.insertBefore(banner('assets/ui/mode-lan.webp', 'Gefecht über das Netz', 'Einer hostet die Sitzung, der andere sucht sie – im lokalen Netz oder über Hamachi.'), title ? title.nextSibling : scr.firstChild);
    if (join && back && back.parentNode && back.parentNode.parentNode === pick) pick.insertBefore(join, back.parentNode);
    var leave = document.getElementById('btn-lan-leave');
    if (leave) leave.classList.add('ui-back');
  }

  /**
   * Bot-Dialog: Die Knöpfe Speichern/Zurücksetzen/Abbrechen lagen in den nur bei „eigener Mischung“ sichtbaren Reglern –
   * mit Werkseinstellung gab es keinen Ausgang. Sie kommen als feste Fußzeile unter den Dialog.
   */
  function botDialog() {
    var apply = document.getElementById('bot-apply');
    var box = document.getElementById('bot-box');
    if (!apply || !box) return;
    var menu = apply.parentNode;
    var dlg = box.parentNode;
    if (!menu || menu.classList.contains('ui-dlg-foot')) return;
    menu.classList.add('ui-dlg-foot');
    dlg.appendChild(menu);
    var cancel = document.getElementById('bot-cancel');
    if (cancel) menu.insertBefore(cancel, menu.firstChild);
  }

  /**
   * Schieberegler: Füllstand als CSS-Variable --fill, damit die Spur links vom Knopf golden ist.
   * @param {HTMLInputElement} el
   */
  function fillRange(el) {
    var min = parseFloat(el.min || '0');
    var max = parseFloat(el.max || '100');
    var v = parseFloat(el.value);
    var pct = max > min ? ((v - min) / (max - min)) * 100 : 0;
    el.style.setProperty('--fill', Math.max(0, Math.min(100, pct)) + '%');
  }

  /** Alle Regler im Dokument nachziehen (nach Seitenwechsel oder Laden gespeicherter Werte). */
  function fillAllRanges() {
    var list = document.querySelectorAll('input[type=range]');
    for (var i = 0; i < list.length; i++) fillRange(list[i]);
  }

  /** Optionen: Symbole an den Reitern (Text bleibt). */
  function optionTabs() {
    var map = { 'opt-audio': 'i-audio', 'opt-game': 'i-deck', 'opt-gfx': 'i-eye', 'opt-sys': 'i-options' };
    var tabs = document.querySelectorAll('#scr-options .opt-tab');
    for (var i = 0; i < tabs.length; i++) {
      var t = tabs[i];
      var ico = map[t.getAttribute('data-pane')];
      if (ico && !t.querySelector('.ui-ico')) t.insertBefore(icon(ico), t.firstChild);
    }
  }

  function init() {
    poster();
    optionTabs();
    fillAllRanges();
    document.addEventListener('input', function (e) { if (e.target && e.target.type === 'range') fillRange(e.target); }, true);
    document.addEventListener('click', function () { setTimeout(fillAllRanges, 0); }, true);
    botDialog();
    lanLayout();
    userLayout();
    decorateMenu();
    singleModes();
    document.addEventListener('keydown', onKey);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  window.DCUiScreens = { icon: icon, decorate: decorate, modalOpen: modalOpen };
})();
