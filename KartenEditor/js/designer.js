/**
 * Karteneditor — Vorlage Einheit über /api/render.
 * Fonts, Plätze und Grafiken kommen aus dem Python-Renderer.
 */
(function (g) {
  'use strict';

  var STOCK = [
    ['leicht', '#5c4010'], ['mittel', '#4e2a0e'], ['schwer', '#341a0c'],
    ['fahrzeug', '#282e20'], ['kette', '#1c1c18'], ['rad', '#563a16'],
    ['gepanzert', '#20282e'], ['stellung', '#40280e'], ['mg', '#46260e'],
    ['mörser', '#582210'], ['luftlande', '#16284e'], ['drehflügler', '#16284e'],
    ['schanzen', '#3a3012'], ['elite', '#601218']
  ];
  var selected = { leicht: true, elite: true, drehflügler: false, gepanzert: false };
  var custom = [];
  var imageB64 = '';
  var imageName = 'Stosstrupp_Lehm.jpg';
  var lastUrl = '';
  var timer = 0;
  var busy = false;
  var pending = false;
  var marbleSeed = 0;
  var DOKTRIN_DEMO = {
    name: 'Blitzkrieg',
    rules: 'Blitz: Panzer und mech-Infanterie erhalten +1 ATK im Zug, in dem sie in die Front gespielt werden.\nSperre: Sonderfähigkeiten gegnerischer Unterstützung greifen in der ersten Runde nach einem Panzer nicht.',
    flavor: 'Überwältige. Erdrücke. Breche ihren Willen im ersten Schlag.'
  };
  var EINHEIT_DEMO = {
    name: 'Stoßtrupp Lehm',
    rules: 'Sturmangriff: +1 ATK, wenn diese Einheit angreift.\nDeckung: Nachbar erhält +1 DEF.',
    flavor: 'Lehm hält, wo Stahl bricht.',
    image: 'Stosstrupp_Lehm.jpg',
    ap: 3
  };
  var SUPPORT_DEMO = {
    name: 'Kriegsanleihe',
    rules: 'Anleihe: Zu Beginn des eigenen Zuges +1 AP.\nZahltag (1 AP): Ziehe 2 Karten und wirf 1 ab.',
    flavor: 'Der Krieg zahlt sich immer aus. Für jemanden.',
    image: 'Kriegsanleihe.jpg',
    ap: 3
  };
  var GEAR_DEMO = {
    name: 'Klappspaten',
    rules: 'Schanzen: Zug ohne Angriff: +1 V. Beim Angriff zurück auf Ursprung.',
    flavor: 'Sie werden graben bis ich ihnen befehle das Graben einzustellen!',
    image: 'Klappspaten.jpg',
    ap: 2
  };
  var SOFORT_DEMO = {
    name: 'Roter Stempel',
    rules: 'Gegenbefehl: Annulliere einen Soforteinsatz des Gegners.',
    flavor: 'Stempel drauf. Akte zu. Krieg weiter.',
    image: 'Roter_Stempel.jpg',
    ap: 0
  };
  var TOKEN_MINE_DEMO = {
    name: 'Minenfeld',
    rules: 'Token vor einer Einheit. Deckung auch verdeckt. Löst vor dem Kampf aus.',
    flavor: '',
    image: 'token-mine-oil.jpg',
    ap: 0,
    atk: 3,
    token_kind: 'minenfeld'
  };
  var TOKEN_FOG_DEMO = {
    name: 'Nebel',
    rules: 'Sicht nehmen. Angriffe durch das Niemandsland sind erschwert.',
    flavor: '',
    image: 'token-nebel-oil.jpg',
    ap: 0,
    token_kind: 'nebel'
  };

  function $(id) { return document.getElementById(id); }
  function val(id) { var el = $(id); return el ? el.value : ''; }
  function num(id) { return Number(val(id) || 0); }
  function typ() {
    var el = document.querySelector('input[name="typ"]:checked');
    return el ? el.value : 'Einheit';
  }
  var custom = [];
  var imageB64 = '';
  var imageName = 'Stosstrupp_Lehm.jpg';
  var lastUrl = '';
  var timer = 0;
  var busy = false;
  var pending = false;
  var marbleSeed = 0;
  var artPanX = 0;
  var artPanY = 0;
  var artZoom = 100;

  function $(id) { return document.getElementById(id); }
  function val(id) { var el = $(id); return el ? el.value : ''; }
  function num(id) { return Number(val(id) || 0); }
  function tokenKind() {
    var el = document.querySelector('input[name="token_kind"]:checked');
    return el ? el.value : 'minenfeld';
  }
  function metal() {
    var el = document.querySelector('input[name="metal"]:checked');
    return el ? el.value : 'gold';
  }
  function klasse() {
    var el = document.querySelector('input[name="klasse"]:checked');
    return el ? el.value : 'Infanterie';
  }
  function loadCustom() {
    try { custom = JSON.parse(localStorage.getItem('dc_custom_tags') || '[]') || []; }
    catch (e) { custom = []; }
  }
  function saveCustom() {
    localStorage.setItem('dc_custom_tags', JSON.stringify(custom));
  }
  function allTags() {
    var list = STOCK.map(function (p) { return { name: p[0], color: p[1], stock: true }; });
    custom.forEach(function (c) { list.push({ name: c.name, color: c.color, stock: false }); });
    return list;
  }
  function hexToRgb(hex) {
    var h = String(hex || '#c9a44a').replace('#', '');
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
  }
  function paintTags() {
    var box = $('de-tags');
    if (!box) return;
    box.innerHTML = '';
    allTags().forEach(function (t) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'de-tag' + (selected[t.name] ? ' on' : '');
      b.textContent = t.name.toUpperCase();
      b.style.setProperty('--tag', t.color);
      b.onclick = function () {
        selected[t.name] = !selected[t.name];
        paintTags();
        queue();
      };
      box.appendChild(b);
    });
  }
  function payload() {
    var tags = Object.keys(selected).filter(function (k) { return selected[k]; });
    var colors = {};
    allTags().forEach(function (t) {
      if (selected[t.name]) colors[t.name.toUpperCase()] = hexToRgb(t.color);
    });
    return {
      typ: typ(),
      name: val('de-name') || 'Neue Karte',
      ap: num('de-ap'),
      atk: typ() === 'Token' ? num('de-dmg') : num('de-atk-in'),
      def: num('de-def-in'),
      token_kind: tokenKind(),
      klasse: klasse(),
      tags: tags,
      tag_colors: colors,
      text: val('de-rules'),
      flavor: val('de-quote'),
      edition: val('de-edition') || 'ALPHA',
      number: val('de-number') || '001',
      footer_star: !!( $('de-star') && $('de-star').checked ),
      metal: metal(),
      image: imageName,
      image_b64: imageB64,
      marble_seed: marbleSeed,
      art_pan_x: artPanX,
      art_pan_y: artPanY,
      art_zoom: artZoom
    };
  }
  function queue() {
    if (timer) clearTimeout(timer);
    timer = setTimeout(renderNow, 700);
  }
  function renderNow() {
    if (busy) { pending = true; return; }
    busy = true;
    if ($('de-busy')) $('de-busy').hidden = false;
    fetch('/api/render', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload())
    }).then(function (r) {
      if (!r.ok) throw new Error('render');
      return r.blob();
    }).then(function (blob) {
      if (lastUrl) URL.revokeObjectURL(lastUrl);
      lastUrl = URL.createObjectURL(blob);
      if ($('de-preview')) $('de-preview').src = lastUrl;
    }).catch(function () {
      /* Vorschau bleibt */
    }).then(function () {
      busy = false;
      if ($('de-busy')) $('de-busy').hidden = true;
      if (pending) { pending = false; renderNow(); }
    });
  }
  function fillLoad() {
    var sel = $('de-load');
    if (!sel) return;
    sel.innerHTML = '<option value="">— aus Katalog —</option>';
    var t = typ();
    var cards = (g.DC_CATALOG && DC_CATALOG.cards) || [];
    cards.filter(function (c) { return c.typ === t; }).forEach(function (c) {
      var o = document.createElement('option');
      o.value = c.image || '';
      o.textContent = c.name;
      o.setAttribute('data-id', c.id);
      sel.appendChild(o);
    });
  }
  function applyCard(c) {
    if (!c) return;
    var t = c.typ || 'Einheit';
    var tr = document.querySelector('input[name="typ"][value="' + t + '"]');
    if (tr) tr.checked = true;
    if ($('de-form')) $('de-form').setAttribute('data-typ', t);
    $('de-name').value = c.name || '';
    $('de-ap').value = c.ap != null ? c.ap : 1;
    $('de-atk-in').value = c.atk != null ? c.atk : 0;
    $('de-def-in').value = c.def != null ? c.def : 0;
    $('de-rules').value = c.text || '';
    $('de-quote').value = c.flavor || '';
    var kl = (c.klasse || 'Infanterie');
    var r = document.querySelector('input[name="klasse"][value="' + kl + '"]');
    if (!r) {
      if (/artiller/i.test(kl + (c.tags || []).join(' '))) kl = 'Artillerie';
      else if (/panzer/i.test(kl)) kl = 'Panzer';
      else if (/aufkl|späh|spaeh/i.test(kl)) kl = 'Aufklärer';
      else kl = 'Infanterie';
      r = document.querySelector('input[name="klasse"][value="' + kl + '"]');
    }
    if (r) r.checked = true;
    selected = {};
    (c.tags || []).forEach(function (t) {
      var n = String(t).toLowerCase();
      if (['infanterie', 'artillerie', 'panzer', 'aufklärer', 'aufklärung'].indexOf(n) >= 0) return;
      selected[n] = true;
    });
    if (c.token_kind) {
      var tk = document.querySelector('input[name="token_kind"][value="' + c.token_kind + '"]');
      if (tk) tk.checked = true;
      if ($('de-form')) $('de-form').setAttribute('data-token', c.token_kind);
    }
    if (c.atk != null && $('de-dmg')) $('de-dmg').value = c.atk;
    imageName = c.image || imageName;
    imageB64 = '';
    artPanX = 0;
    artPanY = 0;
    artZoom = 100;
    if ($('de-art-x')) $('de-art-x').value = 0;
    if ($('de-art-y')) $('de-art-y').value = 0;
    if ($('de-art-z')) $('de-art-z').value = 100;
    paintTags();
    queue();
  }
  function bind() {
    loadCustom();
    paintTags();
    fillLoad();
    ['de-name', 'de-ap', 'de-atk-in', 'de-def-in', 'de-dmg', 'de-rules', 'de-quote', 'de-edition', 'de-number'].forEach(function (id) {
      var el = $(id); if (el) el.addEventListener('input', queue);
    });
    document.querySelectorAll('input[name="metal"], input[name="klasse"]').forEach(function (el) {
      el.addEventListener('change', queue);
    });
    document.querySelectorAll('input[name="token_kind"]').forEach(function (el) {
      el.addEventListener('change', function () {
        if ($('de-form')) $('de-form').setAttribute('data-token', tokenKind());
        var demo = tokenKind() === 'nebel' ? TOKEN_FOG_DEMO : TOKEN_MINE_DEMO;
        $('de-name').value = demo.name;
        $('de-rules').value = demo.rules;
        if (demo.atk != null && $('de-dmg')) $('de-dmg').value = demo.atk;
        imageName = demo.image; imageB64 = '';
        queue();
      });
    });
    document.querySelectorAll('input[name="typ"]').forEach(function (el) {
      el.addEventListener('change', function () {
        var t = typ();
        if ($('de-form')) $('de-form').setAttribute('data-typ', t);
        var demo = t === 'Doktrin' ? DOKTRIN_DEMO : t === 'Unterstützung' ? SUPPORT_DEMO : t === 'Ausrüstung' ? GEAR_DEMO : t === 'Soforteinsatz' ? SOFORT_DEMO : t === 'Token' ? (tokenKind() === 'nebel' ? TOKEN_FOG_DEMO : TOKEN_MINE_DEMO) : EINHEIT_DEMO;
        $('de-name').value = demo.name;
        $('de-rules').value = demo.rules;
        $('de-quote').value = demo.flavor;
        if (demo.ap != null && $('de-ap')) $('de-ap').value = demo.ap;
        if (demo.atk != null && $('de-dmg')) $('de-dmg').value = demo.atk;
        if (demo.image) { imageName = demo.image; imageB64 = ''; }
        if ($('de-form')) $('de-form').setAttribute('data-token', t === 'Token' ? tokenKind() : '');
        if ($('de-preview') && !lastUrl) {
          $('de-preview').removeAttribute('src');
        }
        if (t === 'Unterstützung' || t === 'Ausrüstung' || t === 'Soforteinsatz' || t === 'Token') selected = {};
        paintTags();
        fillLoad();
        queue();
      });
    });
    if ($('de-star')) $('de-star').addEventListener('change', queue);
    ['de-art-x', 'de-art-y', 'de-art-z'].forEach(function (id) {
      var el = $(id);
      if (!el) return;
      el.addEventListener('input', function () {
        artPanX = Number($('de-art-x') && $('de-art-x').value || 0);
        artPanY = Number($('de-art-y') && $('de-art-y').value || 0);
        artZoom = Number($('de-art-z') && $('de-art-z').value || 100);
        queue();
      });
    });
    (function bindPan() {
      var img = $('de-preview');
      if (!img) return;
      var drag = false, lx = 0, ly = 0;
      img.addEventListener('mousedown', function (e) {
        drag = true;
        lx = e.clientX;
        ly = e.clientY;
        img.classList.add('dragging');
        e.preventDefault();
      });
      window.addEventListener('mousemove', function (e) {
        if (!drag) return;
        var dx = e.clientX - lx;
        var dy = e.clientY - ly;
        lx = e.clientX;
        ly = e.clientY;
        var w = Math.max(1, img.getBoundingClientRect().width);
        artPanX = Math.max(-100, Math.min(100, artPanX + dx * (220 / w)));
        artPanY = Math.max(-100, Math.min(100, artPanY + dy * (220 / w)));
        if ($('de-art-x')) $('de-art-x').value = Math.round(artPanX);
        if ($('de-art-y')) $('de-art-y').value = Math.round(artPanY);
        if (timer) clearTimeout(timer);
        timer = setTimeout(renderNow, 80);
      });
      img.addEventListener('wheel', function (e) {
        e.preventDefault();
        artZoom = Math.max(100, Math.min(250, artZoom + (e.deltaY < 0 ? 8 : -8)));
        if ($('de-art-z')) $('de-art-z').value = Math.round(artZoom);
        if (timer) clearTimeout(timer);
        timer = setTimeout(renderNow, 80);
      }, { passive: false });
      window.addEventListener('mouseup', function () {
        if (!drag) return;
        drag = false;
        img.classList.remove('dragging');
        renderNow();
      });
    })();
    if ($('de-tag-add')) $('de-tag-add').onclick = function () {
      var n = (val('de-tag-new') || '').trim().toLowerCase();
      if (!n) return;
      custom = custom.filter(function (c) { return c.name !== n; });
      custom.push({ name: n, color: val('de-tag-color') || '#c9a44a' });
      saveCustom();
      selected[n] = true;
      $('de-tag-new').value = '';
      paintTags();
      queue();
    };
    if ($('de-file')) $('de-file').onchange = function () {
      var f = this.files && this.files[0];
      if (!f) return;
      var r = new FileReader();
      r.onload = function () {
        imageB64 = String(r.result || '');
        imageName = f.name;
        artPanX = 0;
        artPanY = 0;
        artZoom = 100;
        if ($('de-art-x')) $('de-art-x').value = 0;
        if ($('de-art-y')) $('de-art-y').value = 0;
        if ($('de-art-z')) $('de-art-z').value = 100;
        queue();
      };
      r.readAsDataURL(f);
      this.value = '';
    };
    if ($('de-load')) $('de-load').onchange = function () {
      imageName = this.value || imageName;
      imageB64 = '';
      var id = this.options[this.selectedIndex] && this.options[this.selectedIndex].getAttribute('data-id');
      var cards = (g.DC_CATALOG && DC_CATALOG.cards) || [];
      for (var i = 0; i < cards.length; i++) if (cards[i].id === id) { applyCard(cards[i]); return; }
      queue();
    };
    if ($('de-marble-btn')) $('de-marble-btn').onclick = function () {
      marbleSeed = Date.now() % 2147483647;
      renderNow();
    };
    if ($('de-png-btn')) $('de-png-btn').onclick = function () {
      var btn = $('de-png-btn');
      var note = $('de-save-path');
      if (btn) btn.disabled = true;
      if (note) note.textContent = 'Speichert …';
      fetch('/api/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload())
      }).then(function (r) { return r.json().then(function (j) { return { status: r.status, j: j }; }); }).then(function (pack) {
        if (btn) btn.disabled = false;
        var j = pack.j || {};
        if (j.ok) {
          if (note) note.textContent = 'Gespeichert: ' + j.path;
        } else {
          if (note) note.textContent = j.error || ('Fehler ' + pack.status);
        }
      }).catch(function (err) {
        if (btn) btn.disabled = false;
        if (note) note.textContent = 'Speichern fehlgeschlagen. Server mit start.bat laufen lassen. ' + (err && err.message ? err.message : '');
      });
    };
    if ($('de-save-btn')) $('de-save-btn').onclick = function () {
      var d = payload();
      d.id = 'draft_' + Date.now();
      var list = [];
      try { list = JSON.parse(localStorage.getItem('dc_card_drafts') || '[]'); } catch (e) { list = []; }
      list.unshift(d);
      localStorage.setItem('dc_card_drafts', JSON.stringify(list.slice(0, 40)));
      alert('Entwurf gespeichert.');
    };
    queue();
    fetch('/api/outbox').then(function (r) { return r.json(); }).then(function (j) {
      if (j && j.dir && $('de-save-path')) {
        $('de-save-path').textContent = 'Ordner: ' + j.dir;
      }
    }).catch(function () {
      if ($('de-save-path')) $('de-save-path').textContent = 'Kein Server — start.bat verwenden.';
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bind);
  else bind();
})(window);
