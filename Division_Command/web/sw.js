/**
 * Service Worker: legt das Offline-Cache (`divcmd-alpha46a`) für App-Shell
 * und Kern-Assets an. Bei geänderten Karten/Assets die Cache-Version erhöhen.
 */
const CACHE = 'divcmd-alpha46a';
const ASSETS = [
  './',
  './index.html',
  './css/app.css',
  './css/kit-editor.css',
  './css/align.css',
  './js/data/catalog.js',
  './css/tutorial.css',
  './js/tutorial/scenario.js',
  './js/ui/tutorial.js',
  './css/reset.css',
  './css/table-hud.css',
  './js/ui/reset.js',
  './css/ui-system.css',
  './css/ui-screens.css',
  './js/ui/ui-screens.js',
  './assets/ui/icons.svg',
  './assets/ui/corner.svg',
  './assets/ui/search.svg',
  './assets/ui/panel-grain.webp',
  './assets/ui/mode-ki.webp',
  './assets/ui/mode-hotseat.webp',
  './assets/ui/mode-lan.webp',
  './assets/ui/end-victory.webp',
  './assets/ui/end-defeat.webp',
  './css/ui-table.css',
  './assets/ui/corner-tr.svg',
  './assets/ui/corner-bl.svg',
  './assets/ui/corner-br.svg',
  './assets/ui/table-felt.webp',
  './assets/ui/hand-leather.webp',
  './assets/title-back-poster.webp',
  './assets/title-logo.png',
  './assets/icon-192.svg',
  './assets/icon-512.svg',
  './assets/icon-192.png',
  './assets/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

/* HTML/CSS/JS: Netzwerk zuerst, sonst Cache — sonst bleiben Fixes unsichtbar. */
self.addEventListener('fetch', e => {
  const url = e.request.url;
  const isCode = /\.(html?|js|css)(\?|$)/i.test(url) || e.request.mode === 'navigate';
  if (isCode) {
    e.respondWith(
      fetch(e.request).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy));
        return res;
      }).catch(() => caches.match(e.request).then(r => r || caches.match('./index.html')))
    );
    return;
  }
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy));
      return res;
    }).catch(() => caches.match('./index.html')))
  );
});
