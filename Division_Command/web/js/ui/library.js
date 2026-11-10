(function (global) {
  'use strict';
  var draft = { cards: {}, doctrines: [] };
  var filterTab = 'all';
  var filterQuery = '';
  // Nur Ansichtsfilter, keine Deckbauregel: Decks dürfen Karten aller Nationen frei mischen.
  // '' = alle Karten; NEUTRAL = nur neutrale; sonst Nationenpool (eigene 100 Karten + 2 Doktrinen + Neutrale).
  var NEUTRAL = '__neutral';
  var filterNation = '';
  var filterRarity = ''; // '' | bronze | silver | gold
  var filterTags = []; // raw tag keys (lower), AND
  var tagPanelQ = '';

  function cards() {
    return (global.DC_CATALOG && DC_CATALOG.cards) || [];
  }
  function imgOf(c) {
    var file = global.dcCardImage ? global.dcCardImage(c) : (c && c.image);
    if (!file) return '';
    if (global.DC_IMAGES && DC_IMAGES[file]) return DC_IMAGES[file];
    if (global.dcCardSrc) return global.dcCardSrc(file);
    return 'assets/cards/' + String(file).split('/').map(encodeURIComponent).join('/');
  }
  function tags(c) {
    return ((c && c.tags) || []).map(function (x) { return String(x).toLowerCase(); }).join(' ');
  }
  function unitGroup(c) {
    if (c.typ !== 'Einheit') return null;
    var t = tags(c) + ' ' + (c.klasse || '') + ' ' + (c.name || '');
    if (/elite|helden/.test(t)) return 'Elite';
    if (/artillerie|haubitze|mörser|moerser/.test(t)) return 'Artillerie';
    if (/späh|spaeh|aufklär|aufklaer|aufklaerung/.test(t)) return 'Aufklärung';
    if (/panzer|kette/.test(t)) return 'Panzer';
    return 'Infanterie';
  }
  function byName(a, b) {
    return String(a.name || '').localeCompare(String(b.name || ''), 'de');
  }
  function matchesTab(c) {
    if (filterTab === 'all') return true;
    if (filterTab === 'Infanterie') return unitGroup(c) === 'Infanterie';
    if (filterTab === 'Panzer') return unitGroup(c) === 'Panzer';
    if (filterTab === 'Aufklärung') return unitGroup(c) === 'Aufklärung';
    if (filterTab === 'Artillerie') return unitGroup(c) === 'Artillerie';
    if (filterTab === 'Elite') return unitGroup(c) === 'Elite';
    if (filterTab === 'Unterstützung') return c.typ === 'Unterstützung';
    if (filterTab === 'Soforteinsatz') return c.typ === 'Soforteinsatz';
    if (filterTab === 'Ausrüstung') return c.typ === 'Ausrüstung';
    if (filterTab === 'Doktrinen') return c.typ === 'Doktrin';
    return true;
  }
  function isNeutral(c) {
    return !c.nation || String(c.nation).toLowerCase() === 'neutral';
  }
  // Doktrinen tragen kein Nationsfeld; ihre Zuordnung kommt aus den Nationendecks (2 je Nation).
  function doctrineNation(id) {
    var map = global.DC_NATION_DECKS || {};
    var hit = '';
    Object.keys(map).forEach(function (n) {
      if (!hit && map[n] && (map[n].doktrinen || []).indexOf(id) >= 0) hit = n;
    });
    return hit;
  }
  function nationOf(c) {
    if (!c) return '';
    if (c.typ === 'Doktrin') return doctrineNation(c.id);
    return isNeutral(c) ? '' : c.nation;
  }
  function matchesNation(c) {
    if (!filterNation) return true;
    var n = nationOf(c);
    if (filterNation === NEUTRAL) return !n;
    return n === filterNation || !n;
  }
  function nationPool(nation) {
    return cards().filter(function (c) { return c.nation === nation && c.typ !== 'Doktrin' && c.typ !== 'Token'; });
  }
  function deckCards() {
    return cards().filter(function (c) { return c.typ !== 'Doktrin' && c.typ !== 'Token' && c.typ !== 'Asset'; });
  }
  // Herkunft der Karten im Entwurf, z. B. { Steinmark: 30, Vael: 28, '': 2 } ('' = neutral).
  function draftNations() {
    var out = {};
    Object.keys(draft.cards || {}).forEach(function (id) {
      var c = cardById(id);
      if (!c) return;
      var n = nationOf(c);
      out[n] = (out[n] || 0) + (draft.cards[id] || 0);
    });
    return out;
  }
  function matchesQuery(c) {
    if (!filterQuery) return true;
    var tagNames = ((c && c.tags) || []).map(function (x) { return tagMeta(x).name; }).join(' ');
    var blob = [c.name, c.typ, c.klasse, c.text, (c.keywords || []).join(' '), tags(c), tagNames, c.flavor, c.rarity].join(' ').toLowerCase();
    return blob.indexOf(filterQuery) >= 0;
  }
  function sections() {
    var all = cards().filter(function (c) { return matchesTab(c) && matchesQuery(c) && matchesNation(c) && matchesRarity(c) && matchesTags(c); });
    var groups = [
      { title: 'Infanterie', list: all.filter(function (c) { return unitGroup(c) === 'Infanterie'; }) },
      { title: 'Panzer', list: all.filter(function (c) { return unitGroup(c) === 'Panzer'; }) },
      { title: 'Aufklärung', list: all.filter(function (c) { return unitGroup(c) === 'Aufklärung'; }) },
      { title: 'Artillerie', list: all.filter(function (c) { return unitGroup(c) === 'Artillerie'; }) },
      { title: 'Elite', list: all.filter(function (c) { return unitGroup(c) === 'Elite'; }) },
      { title: 'Unterstützung', list: all.filter(function (c) { return c.typ === 'Unterstützung'; }) },
      { title: 'Soforteinsatz', list: all.filter(function (c) { return c.typ === 'Soforteinsatz'; }) },
      { title: 'Ausrüstung', list: all.filter(function (c) { return c.typ === 'Ausrüstung'; }) },
      { title: 'Doktrinen', list: all.filter(function (c) { return c.typ === 'Doktrin'; }) }
    ];
    groups.forEach(function (g) { g.list.sort(byName); });
    return groups.filter(function (g) { return g.list.length; });
  }
  function maxOf(c) {
    if (!c) return 0;
    if (c.typ === 'Doktrin') return 1;
    if (window.DC_deckCopyLimit) return window.DC_deckCopyLimit(c);
    var r = String(c.rarity || 'bronze').toLowerCase();
    if (r === 'gold') return 1;
    if (r === 'silver' || r === 'silber') return 2;
    return 4;
  }
  function countByNameInDraft(name) {
    var nm = String(name || '').trim().toLowerCase();
    var n = 0;
    Object.keys(draft.cards || {}).forEach(function (id) {
      var c = cardById(id);
      if (c && String(c.name || '').trim().toLowerCase() === nm) n += draft.cards[id] || 0;
    });
    return n;
  }
  function deckLimitMessage(text) {
    var el = document.getElementById('deck-limit-msg');
    if (!el) {
      var host = document.getElementById('deck-meta') || document.getElementById('deck-picked');
      if (host && host.parentNode) {
        el = document.createElement('p');
        el.id = 'deck-limit-msg';
        el.className = 'tiny deck-limit-msg';
        el.style.color = '#c44';
        host.parentNode.insertBefore(el, host.nextSibling);
      }
    }
    if (el) {
      el.textContent = text || '';
      el.style.display = text ? '' : 'none';
    }
  }
  function userId() { return localStorage.getItem('dc_user_active') || 'anon'; }
  function loadDecks() {
    try { return JSON.parse(localStorage.getItem('dc_decks') || '{}'); } catch (e) { return {}; }
  }
  function saveDecks(map) { localStorage.setItem('dc_decks', JSON.stringify(map)); }
  function userDecks() { return loadDecks()[userId()] || []; }


  var TAG_META = {
    infanterie: { name: 'Infanterie', text: 'Zu Fuß kämpfende Truppe. Typisch für Stellungen, Deckung und Nahgefechte.' },
    panzer: { name: 'Panzer', text: 'Gepanzerte Kampffahrzeuge. Oft Kette und Panzerung; anfällig für Panzerabwehr und bestimmte Waffen.' },
    aufklaerung: { name: 'Aufklärung', text: 'Späht auf, deckt Verdecktes auf oder sammelt Informationen über den Gegner.' },
    aufklärer: { name: 'Aufklärer', text: 'Leichte Späheinheiten. Aufklärung und Sicht, selten Durchbruchskraft.' },
    artillerie: { name: 'Artillerie', text: 'Indirektes Feuer aus dem Support oder als Stellung. Trifft oft die Front, nicht den Nahkampf.' },
    elite: { name: 'Elite', text: 'Besonders zuverlässige oder politisch aufgeladene Truppe. Oft stärkere Werte oder Sonderregeln.' },
    fahrzeug: { name: 'Fahrzeug', text: 'Motorisierte Einheit. Reagiert auf Fahrzeug- und Panzerungsregeln, nicht wie bloße Infanterie.' },
    kette: { name: 'Kette', text: 'Kettenfahrzeug. Geländeunempfindlicher, zählt zu den gepanzerten Fahrzeugen.' },
    rad: { name: 'Rad', text: 'Radfahrzeug. Schneller auf Straße, oft leichter gepanzert als Kettenfahrzeuge.' },
    gepanzert: { name: 'Gepanzert', text: 'Hat Panzerung. Leicht, mittel oder schwer ändert, welche Waffen voll wirken.' },
    leicht: { name: 'Leicht', text: 'Leichte Panzerung oder leichte Truppe. Empfindlicher, oft billiger und beweglicher.' },
    mittel: { name: 'Mittel', text: 'Mittlere Panzerung oder Mittelgewicht. Ausgleich zwischen Schutz und Kosten.' },
    schwer: { name: 'Schwer', text: 'Schwere Panzerung oder schwere Waffe. Hart zu knacken, teuer, langsam.' },
    stellung: { name: 'Stellung', text: 'Darf verdeckt ausgelegt werden. Artillerie und viele Waffenstellungen tragen diesen Tag.' },
    mg: { name: 'MG', text: 'Maschinengewehr. Flächen- oder Abwehrfeuer, oft an Stellungen gebunden.' },
    moerser: { name: 'Mörser', text: 'Steilfeuer auf kurze Distanz. Gut gegen Infanterie in Deckung.' },
    raketenwerfer: { name: 'Raketenwerfer', text: 'Salvenwerfer. Hoher Druck auf Frontabschnitte oder Fahrzeuge.' },
    panzerabwehr: { name: 'Panzerabwehr', text: 'Gegen gepanzerte Ziele ausgelegt. Volle Wirkung oft nur gegen Fahrzeuge und Panzer.' },
    luft: { name: 'Luft', text: 'Fliegt oder wirkt in der Luft. Boden-Luft-Regeln und Flugabwehr greifen.' },
    luftlande: { name: 'Luftlande', text: 'Wird eingeflogen. Beim Ausspielen und Rückzug zählt die Bewegung als Flug.' },
    drehfluegler: { name: 'Drehflügler', text: 'Hubschrauber. Luftziel, solange die Bewegung oder der Flug aktiv ist.' },
    luftabwehr: { name: 'Luftabwehr', text: 'Bekämpft Lufteinheiten und Luftschläge.' },
    luftverteidigung: { name: 'Luftverteidigung', text: 'Schützt den eigenen Luftraum. Reagiert auf Luftangriffe.' },
    luftschlag: { name: 'Luftschlag', text: 'Angriff aus der Luft auf die Front oder ein Ziel am Boden.' },
    guerrilla: { name: 'Guerilla', text: 'Unregelmäßige Kämpfer. Nutzen Gelände, Hinterhalt und Chaos, nicht offene Feldschlacht.' },
    grossverband: { name: 'Großverband', text: 'Große Formation. Mehr Masse, oft eigene Zusammenhaltsregeln.' },
    kommandant: { name: 'Kommandant', text: 'Führung. Aura, Befehle oder moralische Effekte für benachbarte Einheiten.' },
    medizin: { name: 'Medizin', text: 'Versorgung und Heilung. Stellt Stabilität oder Einheiten im Support wieder her.' },
    schanzen: { name: 'Schanzen', text: 'Feldbefestigung. Deckung oder Token vor der eigenen Stellung.' },
    befestigung: { name: 'Befestigung', text: 'Feste Anlage im Niemandsland oder Support. Schützt die Einheit dahinter.' },
    minenfeld: { name: 'Minenfeld', text: 'Token vor der Front. Löst aus, wenn jemand durch das Niemandsland angreift.' },
    nebel: { name: 'Nebel', text: 'Sicht und Treffer werden erschwert. Token oder Soforteffekt.' },
    rauch: { name: 'Rauch', text: 'Wie Nebel: verdeckt Linien, stört Zielerfassung.' },
    scharfschuetze: { name: 'Scharfschütze', text: 'Gezielter Einzelbeschuss. Oft gegen offene oder wichtige Ziele.' },
    diplomatie: { name: 'Diplomatie', text: 'Politischer Druck, Frieden oder Gesellschaft — nicht der reine Feuerkampf.' },
    doktrin: { name: 'Doktrin', text: 'Strategische Ausrichtung des Decks. Liegt offen, bestimmt Dauereffekte.' },
    operation: { name: 'Operation', text: 'Bleibt liegen, bis eine Bedingung erfüllt ist. Dann wird der Effekt ausgelöst.' },
    soforteinsatz: { name: 'Soforteinsatz', text: 'Einmaliger Einsatz zum gedruckten AP-Preis. Danach auf den Friedhof.' },
    unterstuetzung: { name: 'Unterstützung', text: 'Dauerhafte Karte im Support. Auren, Erzeugung, Logistik.' },
    ausruestung: { name: 'Ausrüstung', text: 'Wird an eine Einheit angelegt und verändert deren Werte oder Optionen.' },
    token: { name: 'Token', text: 'Kein Deckblatt, sondern Markierung auf dem Feld (Mine, Nebel, Befestigung).' }
  };
  function tagMeta(raw) {
    var key = String(raw || '').toLowerCase().replace(/ä/g,'ae').replace(/ö/g,'oe').replace(/ü/g,'ue').replace(/ß/g,'ss');
    var sf = key.match(/^steilfeuer-(v|iv|iii|ii|i)$/);
    if (sf) {
      var roman = { i: 'I', ii: 'II', iii: 'III', iv: 'IV', v: 'V' }[sf[1]];
      return { name: 'Steilfeuer ' + roman, text: 'Artillerie-Reichweite Stufe ' + roman + ' (Chip auf der Karte).' };
    }
    if (TAG_META[key]) return TAG_META[key];
    var pretty = String(raw || '').replace(/-/g, ' ');
    pretty = pretty.replace(/\b([a-zäöü])/g, function (m) { return m.toUpperCase(); });
    return { name: pretty, text: 'Kennzeichnung dieser Karte. Wirkt, sobald Regeln oder andere Karten diesen Begriff suchen.' };
  }
  function tagKey(raw) {
    return String(raw || '').toLowerCase().replace(/ä/g,'ae').replace(/ö/g,'oe').replace(/ü/g,'ue').replace(/ß/g,'ss');
  }
  function rarityOf(c) {
    if (!c) return '';
    if (c.typ === 'Doktrin' || c.typ === 'Token' || c.typ === 'Asset') return '';
    var r = String(c.rarity || 'bronze').toLowerCase();
    if (r === 'silber') return 'silver';
    if (r === 'bronze' || r === 'silver' || r === 'gold') return r;
    return 'bronze';
  }
  function matchesRarity(c) {
    if (!filterRarity) return true;
    var r = rarityOf(c);
    if (!r) return false; // Doktrinen/Token nur unter Alle
    return r === filterRarity;
  }
  function matchesTags(c) {
    if (!filterTags.length) return true;
    var have = {};
    ((c && c.tags) || []).forEach(function (x) { have[tagKey(x)] = true; });
    for (var i = 0; i < filterTags.length; i++) {
      if (!have[filterTags[i]]) return false;
    }
    return true;
  }
  function catalogTagStats() {
    var counts = {};
    cards().forEach(function (c) {
      ((c && c.tags) || []).forEach(function (raw) {
        var k = tagKey(raw);
        if (!k) return;
        counts[k] = (counts[k] || 0) + 1;
      });
    });
    return Object.keys(counts).sort(function (a, b) {
      return tagMeta(a).name.localeCompare(tagMeta(b).name, 'de') || a.localeCompare(b);
    }).map(function (k) { return { key: k, name: tagMeta(k).name, count: counts[k] }; });
  }
  function rarityCounts() {
    var out = { bronze: 0, silver: 0, gold: 0, other: 0 };
    cards().forEach(function (c) {
      var r = rarityOf(c);
      if (!r) out.other++;
      else out[r]++;
    });
    return out;
  }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (ch) {
      if (ch === '&') return '\u0026amp;';
      if (ch === '<') return '\u0026lt;';
      if (ch === '>') return '\u0026gt;';
      return '\u0026quot;';
    });
  }
  function realCost(c) {
    if (!c || c.typ === 'Doktrin') return '—';
    if (c.typ === 'Soforteinsatz') return String(Math.max(0, Number(c.ap || 0))) + ' AP';
    var printed = Number(c.ap || 0);
    var real = Math.max(1, printed);
    return real + ' AP real' + (printed !== real ? ' (gedruckt ' + printed + ')' : '');
  }
  function zoom(c) {
    if (!c) return;
    var ov = document.getElementById('lib-zoom');
    if (!ov) {
      ov = document.createElement('div');
      ov.id = 'lib-zoom';
      ov.className = 'overlay lib-zoom-ov';
      document.body.appendChild(ov);
    }
    var tags = (c.tags || []).join(', ');
    var fx = (c.effects || []).map(function (e) {
      return (e.code || '') + (e.param ? ' ' + JSON.stringify(e.param) : '');
    }).join(' · ');
    var stats = [];
    if (c.atk != null) stats.push('Angriff ' + c.atk);
    if (c.def != null) stats.push('Verteidigung ' + c.def);
    var hideTag = { einheit:1, karte:1, support:1 };
    var seen = {};
    var chips = [];
    function addChip(x) {
      var raw = String(x || '').trim();
      if (!raw) return;
      var key = raw.toLowerCase();
      if (hideTag[key] || seen[key]) return;
      seen[key] = 1;
      chips.push(raw);
    }
    (c.tags || []).forEach(addChip);
    addChip(c.klasse);
    var chipHtml = chips.map(function (x) { var m = tagMeta(x); return '<span class="chip" data-tag="' + esc(x) + '">' + esc(m.name) + '</span>'; }).join('');
    ov.innerHTML =
      '<div class="inspect-modal">' +
        (global.DCCardPh && DCCardPh.is(c) ? DCCardPh.html(c, 'hero') : '<img class="hero" alt="" src="' + imgOf(c) + '">') +
        '<div class="info">' +
          '<h3>' + esc(c.name) + '</h3>' +
          '<div class="kind">' + esc(c.typ || '') + '</div>' +
          '<div class="chips">' + chipHtml + '</div>' +
          '<div class="fight">' +
            (c.atk != null ? '<span><b>ATK</b> ' + c.atk + '</span>' : '') +
            (c.def != null ? '<span><b>DEF</b> ' + c.def + '</span>' : '') +
            '<span><b>AP</b> ' + (c.typ === 'Soforteinsatz' ? String(Math.max(0, Number(c.ap || 0))) : String(Math.max(c.typ === 'Doktrin' ? 0 : 1, Number(c.ap || 0)))) + '</span>' +
          '</div>' +
          (window.DCKw ? DCKw.html(c) : '') +
          '<p class="body">' + esc(c.text || '') + '</p>' +
          (global.DCCardPh ? DCCardPh.rulesHtml(c) : '') +
          (c.flavor ? '<p class="quote">« ' + esc(c.flavor) + ' »</p>' : '') +
        '</div>' +
        '<div class="move-row">' +
          '<span class="cnt cnt-lib"></span>' +
          '<button type="button" data-lib-back>In Bibliothek Ablegen</button>' +
          '<button type="button" data-lib-add>Zum Deck hinzufügen</button>' +
          '<span class="cnt cnt-deck"></span>' +
        '</div>' +
        '<div class="acts">' +
          '<button type="button" class="primary" data-lib-close>Schließen</button>' +
        '</div>' +
      '</div>';
    var taken = c.typ === 'Doktrin'
      ? (draft.doctrines.indexOf(c.id) >= 0 ? 1 : 0)
      : (draft.cards[c.id] || 0);
    var left = Math.max(0, maxOf(c) - taken);
    var libCnt = ov.querySelector('.cnt-lib');
    var deckCnt = ov.querySelector('.cnt-deck');
    if (libCnt) libCnt.textContent = left + ' in der Bibliothek';
    if (deckCnt) deckCnt.textContent = taken + ' im Deck';
    ov.style.display = 'flex';
    ov.onclick = function (ev) {
      if (ev.target === ov) ov.style.display = 'none';
    };
    var tip = document.getElementById('tag-tip');
    if (!tip) {
      tip = document.createElement('div');
      tip.id = 'tag-tip';
      tip.className = 'tag-tip';
      document.body.appendChild(tip);
    }
    ov.querySelectorAll('.chip').forEach(function (el) {
      el.onmouseenter = function () {
        var m = tagMeta(el.getAttribute('data-tag'));
        tip.innerHTML = '<b>' + esc(m.name) + '</b><span>' + esc(m.text) + '</span>';
        tip.style.display = 'block';
      };
      el.onmousemove = function (ev) {
        tip.style.left = (ev.clientX + 14) + 'px';
        tip.style.top = (ev.clientY + 16) + 'px';
      };
      el.onmouseleave = function () { tip.style.display = 'none'; };
    });
    var addBtn = ov.querySelector('[data-lib-add]');
    var backBtn = ov.querySelector('[data-lib-back]');
    if (addBtn) {
      addBtn.disabled = left <= 0;
      addBtn.onclick = function () { addCard(c); zoom(c); };
    }
    if (backBtn) {
      backBtn.disabled = taken <= 0;
      backBtn.onclick = function () { subCard(c.id); zoom(c); };
    }
    ov.querySelector('[data-lib-close]').onclick = function () { ov.style.display = 'none'; };
  }

  function addCard(c) {
    if (!c) return;
    if (c.typ === 'Doktrin') {
      if (draft.doctrines.indexOf(c.id) >= 0) {
        deckLimitMessage('Doktrin bereits gewählt.');
        return;
      }
      if (draft.doctrines.length >= 2) {
        deckLimitMessage('Maximal 2 verschiedene Doktrinen.');
        return;
      }
      draft.doctrines.push(c.id);
      deckLimitMessage('');
      render();
      return;
    }
    var lim = maxOf(c);
    var n = draft.cards[c.id] || 0;
    if (n >= lim) {
      deckLimitMessage((c.name || c.id) + ': maximal ' + lim + '× (' + (c.rarity || 'bronze') + ').');
      return;
    }
    var nameCount = countByNameInDraft(c.name);
    if (nameCount >= lim) {
      deckLimitMessage((c.name || c.id) + ': maximal ' + lim + '× unter diesem Namen.');
      return;
    }
    draft.cards[c.id] = n + 1;
    deckLimitMessage('');
    render();
  }
  function subCard(id) {
    var c = cardById(id);
    if (c && c.typ === 'Doktrin') {
      draft.doctrines = draft.doctrines.filter(function (x) { return x !== id; });
      render();
      return;
    }
    if (!draft.cards[id]) return;
    draft.cards[id] -= 1;
    if (draft.cards[id] <= 0) delete draft.cards[id];
    render();
  }
  function cardById(id) {
    return cards().filter(function (c) { return c.id === id; })[0];
  }
  function stackHtml(c, n, kind) {
    var shown = Math.max(1, n || 1);
    var cw, ox, oy;
    if (kind === 'lib') {
      var host = document.getElementById('lib-list');
      var col = host ? Math.max(110, Math.floor((host.clientWidth || 800) / 5) - 28) : 160;
      cw = Math.min(190, col);
      ox = 14;
      oy = 10;
    } else {
      var side = document.getElementById('deck-picked');
      var sw = side ? side.clientWidth : 220;
      cw = Math.max(70, Math.floor((sw - 44) / 2));
      ox = Math.max(5, Math.round(cw * 0.07));
      oy = Math.max(6, Math.round(cw * 0.09));
    }
    var ch = Math.round(cw * 1428 / 1024);
    var i;
    var layers = '';
    for (i = 0; i < shown; i++) {
      var pos = 'left:' + (i * ox) + 'px;top:' + (i * oy) + 'px;width:' + cw + 'px;height:' + ch + 'px;z-index:' + (i + 1);
      layers += global.DCCardPh && DCCardPh.is(c)
        ? DCCardPh.html(c, 'stack-ph').replace('<span class="stack-ph card-ph"', '<span class="stack-ph card-ph" style="position:absolute;' + pos + '"')
        : '<img alt="" src="' + imgOf(c) + '" style="' + pos + ';object-fit:contain;">';
    }
    return '<div class="stack n' + shown + '" style="width:' + (cw + (shown - 1) * ox) + 'px;height:' + (ch + (shown - 1) * oy) + 'px;">' + layers + '</div>';
  }
  function renderSide() {
    var box = document.getElementById('deck-picked');
    var docs = document.getElementById('deck-docs');
    if (box) {
      var ids = Object.keys(draft.cards);
      box.innerHTML = ids.map(function (id) {
        var c = cardById(id);
        if (!c) return '';
        var n = draft.cards[id];
        return '<div class="deck-stack" data-id="' + id + '">' +
          '<div class="deck-cap">' + (c.name || id) + ' ×' + n + '</div>' +
          stackHtml(c, n, 'deck') + '</div>';
      }).join('') || '<p class="tiny deck-empty">Noch keine Karten.</p>';
      box.querySelectorAll('.deck-stack').forEach(function (el) {
        var timer = 0;
        el.onclick = function () {
          var id = el.getAttribute('data-id');
          window.clearTimeout(timer);
          timer = window.setTimeout(function () { zoom(cardById(id)); }, 220);
        };
        el.ondblclick = function (ev) {
          ev.preventDefault();
          window.clearTimeout(timer);
          subCard(el.getAttribute('data-id'));
        };
      });
    }
    if (docs) {
      docs.style.display = '';
      docs.innerHTML = [0, 1].map(function (i) {
        var id = draft.doctrines[i];
        var c = id && cardById(id);
        if (!c) return '<div class="doc-slot empty">Doktrin ' + (i + 1) + '</div>';
        return '<div class="doc-slot" data-id="' + id + '">' + stackHtml(c, 1, 'deck') +
          '<div class="deck-cap">' + c.name + '</div></div>';
      }).join('');
      docs.querySelectorAll('.doc-slot[data-id]').forEach(function (el) {
        var timer = 0;
        el.onclick = function () {
          var id = el.getAttribute('data-id');
          window.clearTimeout(timer);
          timer = window.setTimeout(function () { zoom(cardById(id)); }, 220);
        };
        el.ondblclick = function (ev) {
          ev.preventDefault();
          window.clearTimeout(timer);
          subCard(el.getAttribute('data-id'));
        };
      });
    }
        var tally = { Einheit: 0, Ausrüstung: 0, Unterstützung: 0, Soforteinsatz: 0 };
    Object.keys(draft.cards).forEach(function (id) {
      var c = cardById(id);
      var n = draft.cards[id] || 0;
      if (c && tally[c.typ] != null) tally[c.typ] += n;
    });
    var total = tally.Einheit + tally.Ausrüstung + tally.Unterstützung + tally.Soforteinsatz;
    var meta = document.getElementById('deck-meta');
    if (meta) {
      meta.textContent = 'Karten · ' + total + ' / 60';
    }
    var origin = document.getElementById('deck-nations');
    if (origin) {
      var mix = draftNations();
      var parts = Object.keys(mix).filter(function (n) { return n; }).sort(function (a, b) { return mix[b] - mix[a] || a.localeCompare(b, 'de'); })
        .map(function (n) { return n + ' ' + mix[n]; });
      if (mix['']) parts.push('Neutral ' + mix['']);
      origin.textContent = parts.length ? 'Herkunft · ' + parts.join(' · ') : 'Herkunft · Karten aller Nationen frei mischbar';
    }
    var types = document.getElementById('deck-types');
    if (types) {
      types.textContent =
        'Einheiten ' + tally.Einheit +
        ' · Unterstützungen ' + tally.Unterstützung +
        ' · Soforteinsätze ' + tally.Soforteinsatz +
        ' · Ausrüstungen ' + tally.Ausrüstung +
        ' · Doktrinen ' + draft.doctrines.length + '/2';
    }
  }

  function bindChrome() {
    var tabs = document.getElementById('lib-tabs');
    if (tabs && !tabs._dcBound) {
      tabs._dcBound = true;
      tabs.addEventListener('click', function (ev) {
        var b = ev.target.closest('[data-tab]');
        if (!b) return;
        filterTab = b.getAttribute('data-tab');
        tabs.querySelectorAll('.lib-tab').forEach(function (x) {
          x.classList.toggle('on', x.getAttribute('data-tab') === filterTab);
        });
        render();
      });
    }
    var ns = document.getElementById('lib-nation');
    if (ns && !ns._dcBound) {
      ns._dcBound = true;
      var all0 = ns.querySelector('option[value=""]');
      if (all0) all0.textContent = 'Alle Nationen (' + deckCards().length + ')';
      Object.keys(global.DC_NATION_DECKS || {}).sort(function (a, b) { return a.localeCompare(b, 'de'); }).forEach(function (n) {
        var o = document.createElement('option'); o.value = n; o.textContent = n + ' (' + nationPool(n).length + ' + 2 Doktrinen)'; ns.appendChild(o);
      });
      var on = document.createElement('option'); on.value = NEUTRAL;
      on.textContent = 'Neutral (' + deckCards().filter(isNeutral).length + ')'; ns.appendChild(on);
      ns.value = filterNation;
      ns.addEventListener('change', function () { filterNation = ns.value; render(); });
    }
    var q = document.getElementById('lib-search');
    if (q && !q._dcBound) {
      q._dcBound = true;
      q.addEventListener('input', function () {
        filterQuery = String(q.value || '').trim().toLowerCase();
        render();
      });
    }
    var rar = document.getElementById('lib-rarity');
    if (rar && !rar._dcBound) {
      rar._dcBound = true;
      var rc = rarityCounts();
      var optAll = rar.querySelector('option[value=""]');
      if (optAll) optAll.textContent = 'Alle Seltenheiten (' + (rc.bronze + rc.silver + rc.gold + rc.other) + ')';
      var ob = rar.querySelector('option[value="bronze"]');
      if (ob) ob.textContent = 'Bronze (' + rc.bronze + ')';
      var os = rar.querySelector('option[value="silver"]');
      if (os) os.textContent = 'Silber (' + rc.silver + ')';
      var og = rar.querySelector('option[value="gold"]');
      if (og) og.textContent = 'Gold (' + rc.gold + ')';
      rar.value = filterRarity;
      rar.addEventListener('change', function () { filterRarity = rar.value; render(); });
    }
    bindTagFilter();
  }

  function bindTagFilter() {
    var root = document.getElementById('lib-tag-filter');
    var toggle = document.getElementById('lib-tag-toggle');
    var panel = document.getElementById('lib-tag-panel');
    var list = document.getElementById('lib-tag-list');
    var q = document.getElementById('lib-tag-q');
    var clear = document.getElementById('lib-tag-clear');
    if (!root || !toggle || !panel || !list) return;
    function paintToggle() {
      var n = filterTags.length;
      toggle.textContent = n ? ('Tags (' + n + ')') : 'Tags';
      toggle.classList.toggle('on', n > 0);
      toggle.setAttribute('aria-expanded', panel.hidden ? 'false' : 'true');
    }
    function paintList() {
      var qv = String(tagPanelQ || '').trim().toLowerCase();
      var rows = catalogTagStats().filter(function (row) {
        if (!qv) return true;
        return row.name.toLowerCase().indexOf(qv) >= 0 || row.key.indexOf(qv) >= 0;
      });
      list.innerHTML = rows.map(function (row) {
        var on = filterTags.indexOf(row.key) >= 0;
        return '<button type="button" class="lib-tag-opt' + (on ? ' on' : '') + '" role="option" aria-selected="' + (on ? 'true' : 'false') + '" data-tag="' + esc(row.key) + '">' +
          '<span class="lib-tag-opt-name">' + esc(row.name) + '</span>' +
          '<span class="lib-tag-opt-n">' + row.count + '</span></button>';
      }).join('') || '<p class="tiny lib-tag-empty">Kein Tag.</p>';
      list.querySelectorAll('[data-tag]').forEach(function (b) {
        b.onclick = function (ev) {
          ev.preventDefault();
          var k = b.getAttribute('data-tag');
          var i = filterTags.indexOf(k);
          if (i >= 0) filterTags.splice(i, 1);
          else filterTags.push(k);
          paintToggle();
          paintList();
          render();
        };
      });
    }
    if (!root._dcBound) {
      root._dcBound = true;
      toggle.addEventListener('click', function (ev) {
        ev.preventDefault();
        panel.hidden = !panel.hidden;
        paintToggle();
        if (!panel.hidden) {
          paintList();
          if (q) q.focus();
        }
      });
      document.addEventListener('click', function (ev) {
        if (panel.hidden) return;
        if (root.contains(ev.target)) return;
        panel.hidden = true;
        paintToggle();
      });
      if (q) q.addEventListener('input', function () {
        tagPanelQ = String(q.value || '');
        paintList();
      });
      if (clear) clear.addEventListener('click', function (ev) {
        ev.preventDefault();
        filterTags = [];
        paintToggle();
        paintList();
        render();
      });
    }
    paintToggle();
    if (!panel.hidden) paintList();
  }

  function render() {
    bindChrome();
    var host = document.getElementById('lib-list');
    if (!host) return;
    var groups = sections();
    if (!groups.length) {
      host.innerHTML = '<p class="tiny lib-empty">Keine Karten für diesen Filter.</p>';
    } else {
      host.innerHTML = groups.map(function (g) {
        return '<h3>' + g.title + '</h3><div class="lib-grid">' + g.list.map(function (c) {
          var taken = c.typ === 'Doktrin'
            ? (draft.doctrines.indexOf(c.id) >= 0 ? 1 : 0)
            : (draft.cards[c.id] || 0);
          var max = maxOf(c);
          var left = Math.max(0, max - taken);
          var full = left <= 0;
          return '<button type="button" class="lib-card' + (full ? ' full' : '') + '" data-add="' + c.id + '">' +
            stackHtml(c, Math.max(1, left), 'lib') +
            '<span class="lib-cap">' + (c.name || c.id) + '</span>' +
            '</button>';
        }).join('') + '</div>';
      }).join('');
    }
    host.querySelectorAll('[data-add]').forEach(function (b) {
      var t = 0;
      b.onclick = function () {
        var id = b.getAttribute('data-add');
        window.clearTimeout(t);
        t = window.setTimeout(function () { zoom(cardById(id)); }, 220);
      };
      b.ondblclick = function () {
        window.clearTimeout(t);
        addCard(cardById(b.getAttribute('data-add')));
      };
    });
    renderSide();
  }

  function saveNamed(name) {
    name = String(name || '').trim().slice(0, 32);
    if (!name) return false;
    var map = loadDecks();
    var list = map[userId()] || [];
    var expanded = expand({ cards: draft.cards });
    if (window.DC_validateDeck) {
      var chk = window.DC_validateDeck(expanded, draft.doctrines.slice());
      if (!chk.ok) {
        deckLimitMessage('Deck ungültig: ' + (chk.notices || []).join(' · '));
        return false;
      }
    }
    list.push({
      id: 'd' + Date.now(),
      name: name,
      cards: JSON.parse(JSON.stringify(draft.cards)),
      doctrines: draft.doctrines.slice()
    });
    map[userId()] = list;
    saveDecks(map);
    fillSelects();
    return true;
  }

  function expand(saved) {
    var out = [];
    if (!saved || !saved.cards) return out;
    Object.keys(saved.cards).forEach(function (id) {
      var n = saved.cards[id] || 0;
      var i;
      for (i = 0; i < n; i++) out.push(id);
    });
    return out;
  }

  function nationStarterDecks() {
    var out = [];
    var map = window.DC_NATION_DECKS || {};
    Object.keys(map).forEach(function (nat) {
      var d = map[nat];
      if (!d || !d.cards) return;
      var counts = {};
      (d.cards || []).forEach(function (id) { counts[id] = (counts[id] || 0) + 1; });
      out.push({
        id: 'nation:' + nat,
        name: d.name || ('Deck ' + nat),
        cards: counts,
        doctrines: (d.doktrinen || []).slice(),
        builtin: true
      });
    });
    return out;
  }

  function fillSelects() {
    var list = nationStarterDecks().concat(userDecks());
    ['deck-pick-single', 'deck-pick-lan', 'deck-pick-bot'].forEach(function (id) {
      var sel = document.getElementById(id);
      if (!sel) return;
      var cur = sel.value;
      sel.innerHTML = '<option value="">Zufälliges Testdeck</option>';
      list.forEach(function (d) {
        var o = document.createElement('option');
        o.value = d.id;
        o.textContent = d.name;
        sel.appendChild(o);
      });
      if (cur) sel.value = cur;
    });
  }

  function selectedDeck(selId) {
    var sel = document.getElementById(selId || 'deck-pick-single');
    if (!sel || !sel.value) return null;
    var all = nationStarterDecks().concat(userDecks());
    return all.filter(function (d) { return d.id === sel.value; })[0] || null;
  }

  global.DCLib = {
    nationPool: nationPool,
    deckCards: deckCards,
    nationOf: nationOf,
    draftNations: draftNations,
    addCard: function (id) { addCard(cardById(id)); },
    clearDraft: function () { draft = { cards: {}, doctrines: [] }; },
    draft: function () { return { cards: JSON.parse(JSON.stringify(draft.cards)), doctrines: draft.doctrines.slice() }; },
    visibleIds: function () { var out = []; sections().forEach(function (g) { g.list.forEach(function (c) { out.push(c.id); }); }); return out; },
    NEUTRAL: NEUTRAL,
    _setNationFilter: function (n) { filterNation = n || ''; },
    _setRarityFilter: function (r) { filterRarity = r || ''; },
    _setTagFilters: function (tags) { filterTags = (tags || []).map(tagKey); },
    _tagMeta: tagMeta,
    _rarityOf: rarityOf,
    _catalogTagStats: catalogTagStats,
    _rarityCounts: rarityCounts,
    render: render,
    fillSelects: fillSelects,
    saveNamed: saveNamed,
    selectedDeck: selectedDeck,
    expand: expand,
    maxOf: maxOf,
    validateDraft: function () {
      if (!window.DC_validateDeck) return { ok: true, notices: [] };
      return window.DC_validateDeck(expand({ cards: draft.cards }), draft.doctrines.slice());
    }
  };
})(window);
