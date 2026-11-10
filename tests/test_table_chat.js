/**
 * LAN-Chat am Tisch, kein Leck in das Partieprotokoll.
 * Läuft über `npm test` von der Repo-Wurzel. Keine Produktlogik.
 */
/* Table protocol window: Protokoll | Chat tabs with real net.js over a fake WebSocket. No browser. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const WEB = path.join(__dirname, '../Division_Command/web');
const { setup } = require('./test_audio_actions');
const h = setup('off'), { w } = h;
/**
 * Lädt Spielmodule (Katalog/Engine/UI) in den Test- oder Simulationskontext.
 */
const load = f => w.eval(fs.readFileSync(path.join(WEB, f), 'utf8'));
const sockets = [];
class FakeWS { constructor(u) { this.url = u; this.readyState = 0; this.sent = []; sockets.push(this); }
  /**
   * Sendet eine Chat-Nachricht im Test.
   */
  send(d) { this.sent.push(JSON.parse(d)); } close() { this.readyState = 3; }
  /**
   * Öffnet das Chat-Panel im Test.
   */
  open() { this.readyState = 1; this.onopen && this.onopen(); }
  /**
   * Simuliert den Empfang einer Chat-Nachricht.
   */
  recv(o) { this.onmessage({ data: JSON.stringify(o) }); } }
w.WebSocket = FakeWS;
const logged = [];
w.DCPlayStore = { getAll: () => Promise.resolve([]), get: () => Promise.resolve(null), uid: () => 'x' };
let loggerChats = 0; w.DCPlayLogger = { addChat: () => loggerChats++, getCurrent: () => ({ id: 'g', turns: [], chat: [{ name: 'Alt', text: 'ALTLOG' }] }) };
/**
 * Anzahl der sichtbaren Chat-Nachrichten.
 */
const chatCount = () => (w.__dcPlayChatBuf || []).length;
load('js/playtest/panel.js'); load('js/ui/table-chat.js'); load('js/net.js');
/**
 * Kurzselektor: findet ein Element in der Testdom bzw. jsdom.
 */
const $ = id => w.document.getElementById(id);
const C = w.DCTableChat;
C.refresh(); C.refresh(); assert(C._subscribed());
// Playtest panel: Logs + Anmerkungen only, no chat remnant.
w.DCPlayPanel.show();
const tabs = [...w.document.querySelectorAll('#playtest-panel .pt-tab')].map(b => b.dataset.tab);
assert.deepEqual(tabs, ['logs', 'notes']); assert(!$('pt-pane-chat') && !$('pt-tab-chat'));
w.DCPlayPanel.hide();
// Default tab Protokoll; content stays there.
assert.equal(C.tab(), 'log'); assert(!$('log').hidden); assert($('log-chat').hidden);
w.dcRender(); assert($('log').innerHTML.length >= 0);
// Not LAN: chat tab marked disabled, hint, no input.
$('log-tab-chat').click();
assert.equal(C.tab(), 'chat'); assert($('log').hidden); assert(!$('log-chat').hidden);
assert($('log-tab-chat').classList.contains('disabled')); assert(!$('log-chat-in')); assert($('log-chat').textContent.includes('LAN'));
assert.equal($('log-tab-chat').getAttribute('aria-selected'), 'true');
// Keyboard tab switching
$('log-tab-chat').dispatchEvent(new w.KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
assert.equal(C.tab(), 'log');
// Connect LAN (real net.js)
w.DCNet.connect('ws://x', 'Host', 'host'); sockets[0].open(); C.refresh();
assert(!$('log-tab-chat').classList.contains('disabled'));
// Incoming while on Protokoll: unread, no auto-switch
sockets[0].recv({ type: 'chat', name: 'Gast', text: 'Hallo', player: 1, t: '2026-11-05T20:01:02.000Z' });
assert.equal(C.tab(), 'log'); assert.equal(C.unread(), 1); assert(!$('log-chat-unread').hidden);
assert.equal(chatCount(), 1, 'incoming stored in session exactly once');
$('log-tab-chat').click(); assert.equal(C.unread(), 0); assert($('log-chat-unread').hidden);
assert($('log-chat').textContent.includes('Hallo')); assert($('log-chat').textContent.includes('Gast'));
assert.equal($('log-chat-in').getAttribute('maxlength'), '400');
// Outgoing via Enter: sent once, logged once, rendered once
const inp = $('log-chat-in'); inp.value = 'Angriff links';
inp.dispatchEvent(new w.KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }));
let chats = sockets[0].sent.filter(m => m.type === 'chat');
assert.equal(chats.length, 1); assert.equal(chats[0].text, 'Angriff links');
assert.equal(chatCount(), 2);
assert.equal([...w.document.querySelectorAll('#log-chat .pt-chat-line')].filter(e => e.textContent.includes('Angriff links')).length, 1);
// Send button after re-render (delegated): once
$('log-chat-in').value = 'Zweite'; $('log-chat-send').click();
assert.equal(sockets[0].sent.filter(m => m.type === 'chat').length, 2); assert.equal(chatCount(), 3);
// Empty input does nothing
$('log-chat-in').value = '   '; $('log-chat-send').click(); assert.equal(chatCount(), 3);
// Rematch / re-render / new connection: no stale listeners
w.dcRender(); w.dcRender(); C.bind(); C.bind();
w.DCNet.disconnect(); C.refresh(); assert($('log-tab-chat').classList.contains('disabled')); assert(!$('log-chat-in'));
w.DCNet.connect('ws://y', 'Host', 'host'); sockets[1].open(); C.refresh();
sockets[1].recv({ type: 'chat', name: 'Gast', text: 'Neu', player: 1 });
assert.equal(chatCount(), 4, 'one listener after reconnect');
$('log-chat-in').value = 'Antwort'; $('log-chat-send').click();
assert.equal(sockets[1].sent.filter(m => m.type === 'chat').length, 1);
assert.equal(chatCount(), 5);
// Playtest panel show('chat') legacy -> table chat tab, panel on logs
C.setTab('log'); w.DCPlayPanel.show('chat'); assert.equal(C.tab(), 'chat'); w.DCPlayPanel.hide();
// Export path unchanged: chat goes into game record via logger.addChat (covered in test_playtest_logger)
const idx = fs.readFileSync(path.join(WEB, 'index.html'), 'utf8');
assert(idx.indexOf('js/playtest/panel.js') < idx.indexOf('js/ui/table-chat.js'));
assert.equal(loggerChats, 0, 'chat never written to playtest log'); assert(!$('log-chat').textContent.includes('ALTLOG'), 'UI uses own session history');
assert.equal(h.errors.length, 0, String(h.errors));
h.dom.window.close();
console.log('PASS table chat: tabs/keyboard, non-LAN disabled, unread without auto-switch, in/out exactly once, delegated send, reconnect/rematch no stale listeners, panel Logs+Anmerkungen only');
