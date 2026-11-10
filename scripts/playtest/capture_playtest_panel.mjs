/**
 * Headless screenshots of Playtest panel tabs → /workspace/playtest_tab_{logs,notes,chat}.png
 * Uses styled fixtures matching DCPlayPanel (Chrome headless).
 */
import fs from 'fs';
import path from 'path';
import { spawnSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const WEB = path.resolve(__dirname, '../../Division_Command/web');
const OUT = '/workspace';
const css = fs.readFileSync(path.join(WEB, 'css/app.css'), 'utf8');

/**
 * Basis-URL bzw. Wurzelpfad des lokalen Playtest-Servers.
 */
function base(title, body) {
  return `<!doctype html><html lang="de"><head><meta charset="utf-8">
<title>${title}</title><style>${css}
body{margin:0;background:#1a0808;min-height:100vh}
.playtest-overlay{display:flex!important;position:fixed;inset:0;background:rgba(0,0,0,.55);align-items:center;justify-content:center}
</style></head><body>
<div class="overlay playtest-overlay" style="display:flex">
<div class="modal playtest-modal">${body}</div></div></body></html>`;
}

const head = `<div class="playtest-head"><h2>Playtest</h2><button class="playtest-x">×</button></div>`;
/**
 * Öffnet nacheinander die Karten des Playtest-Panels für Screenshots.
 */
const tabs = (on) => `<div class="playtest-tabs">
<button class="pt-tab${on === 'logs' ? ' on' : ''}">Logs</button>
<button class="pt-tab${on === 'notes' ? ' on' : ''}">Anmerkungen</button>
<button class="pt-tab${on === 'chat' ? ' on' : ''}${on === 'chat' ? ' disabled' : ''}">Chat</button></div>`;

const bodies = {
  logs: head + tabs('logs') + `<div class="playtest-body"><section class="pt-pane on">
<p class="pt-hint">Partien werden lokal im Browser (IndexedDB) gespeichert. <strong>Nicht im Inkognito-Modus</strong> spielen und Websitedaten nicht löschen, sonst sind die Logs weg. Bitte etwa alle <strong>10 Partien</strong> exportieren.</p>
<div class="pt-actions"><button class="primary">Logs exportieren</button><button>Exportieren &amp; danach löschen…</button></div>
<ul class="pt-list"><li><div class="pt-row"><strong>2026-11-05 17:40:00</strong> · bot · Sieg P1<br><span class="tiny">DemoA [human] vs DemoB [bot] · 1 Aktionen</span></div></li></ul>
</section></div>`,
  notes: head + tabs('notes') + `<div class="playtest-body"><section class="pt-pane on">
<label>Kategorie<select><option>Anmerkung</option><option selected>Idee</option><option>Bug</option></select></label>
<label>Text (max. 500)<textarea rows="4">Demo-Anmerkung für Screenshot</textarea><div class="pt-counter">32/500</div></label>
<div class="pt-actions"><button class="primary">Speichern</button></div>
<h3>Bisherige Einträge</h3>
<ul class="pt-list"><li><div class="pt-row"><strong>[idee]</strong> 2026-11-05 17:40:00<br>Demo-Anmerkung für Screenshot</div></li></ul>
</section></div>`,
  chat: head + tabs('chat') + `<div class="playtest-body"><section class="pt-pane on">
<p class="pt-hint">Chat ist nur im <strong>LAN-Modus</strong> aktiv, solange eine Verbindung besteht. Starte oder trete einer LAN-Sitzung bei.</p>
</section></div>`,
};

const tmp = path.join(OUT, '.playtest_shots');
fs.mkdirSync(tmp, { recursive: true });
for (const name of ['logs', 'notes', 'chat']) {
  const html = path.join(tmp, name + '.html');
  fs.writeFileSync(html, base(name, bodies[name]));
  const png = path.join(OUT, 'playtest_tab_' + name + '.png');
  const r = spawnSync('google-chrome', [
    '--headless=new', '--disable-gpu', '--no-sandbox', '--hide-scrollbars',
    '--window-size=1280,800', `--screenshot=${png}`, 'file://' + html,
  ], { encoding: 'utf8', timeout: 60000 });
  if (r.status !== 0) throw new Error('chrome failed: ' + (r.stderr || r.stdout));
  console.log('wrote', png, fs.statSync(png).size);
}
console.log('DONE');
