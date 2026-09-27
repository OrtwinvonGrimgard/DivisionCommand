// Service Worker: legt wenige Dateien in den Cache, damit die Seite offline startet.
self.addEventListener('install', function (e) { // Installation nach dem Registrieren
  e.waitUntil(caches.open('dc-a1').then(function (c) { // Cache-Tasche öffnen
    return c.addAll(['./', './index.html', './css/app.css', './manifest.json']); // Grundgerüst speichern
  }));
  self.skipWaiting(); // neuen Worker sofort aktivieren
});
self.addEventListener('fetch', function (e) { // jede Netz-Anfrage der Seite
  e.respondWith(fetch(e.request).catch(function () { // zuerst live laden
    return caches.match(e.request); // bei Fehler: Cache
  }));
});
