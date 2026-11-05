const CACHE = 'divcmd-endscreen1';
const ASSETS = [
  './',
  './index.html',
  './css/app.css',
  './css/kit-editor.css',
  './css/align.css',
  './js/data/catalog.js',
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
