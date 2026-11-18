# Audio-Schleife am Spieltisch (t296, Version 0.611)

## Befund

Am Spieltisch schrieb `applyAudio` (`web/index.html`) laut Messung t291 etwa 19.000-mal pro Sekunde `dc_music` und `dc_vol` in den `localStorage`. Die Seite war dadurch belastet, Timer liefen verspätet, die Browser-Gates liefen unter Last in Fristen.

## Ursache

Eine Ereigniskette ohne Bremse:

1. `index.html`: `bgm` (Titelmusik, `#bgm`) hat Listener auf `canplay` und `loadeddata`, die `tryPlay()` → `applyAudio()` aufrufen.
2. Am Tisch (`#title-root.dc-off`) ruft `applyAudio` `DCAudio.playTable()`.
3. `playTable` (`web/js/data/audio-data.js`) ruft `stop(titleEl)`, um die Titelmusik anzuhalten.
4. `stop()` setzte immer `el.pause(); el.currentTime = 0;`. Auch auf einem schon pausierten Element bei 0 löst das in Chromium `seeking`, `seeked` und danach `canplay` aus.
5. `canplay` auf `#bgm` → zurück zu 1.

Jeder Durchlauf schrieb in `applyAudio` zwei Werte in den `localStorage` (`dc_music`, `dc_vol`). Gemessen: `canplay` = `seeked` = Schreibzugriffe / 2.

Der Einstieg ist das Ausblenden der Titelmusik in `window.dcKickoff` (`bgm.pause(); bgm.currentTime = 0;`), danach läuft die Kette von selbst.

## Schon vor t291? Auch im echten Browser?

- **Ja, schon vorher.** Gemessen in `v0.6e` (0.605, vor t291): 37.841 Schreibzugriffe pro Sekunde, `canplay` = `seeked`. `stop()` und `tryPlay` sind spätestens seit dem Stand vom 10.11.2026 (Ordner-Umbenennung, Commit `6037b970`) im Code. t291 hat die Schleife nur sichtbar gemacht (die Bot-Zug-Tests warten auf Timer).
- **Im echten Chromium/Chrome ebenso**, weil der Mechanismus Medienverhalten der Engine ist und nicht von Headless oder einer Audioausgabe abhängt: das Element ist pausiert, `currentTime = 0` startet trotzdem einen Seek. In Firefox/Safari ist das Ereignisverhalten beim Seek auf dieselbe Position weniger gesichert; die Schleife wäre dort langsamer oder fehlt. Die Kette ist durch den Fix in jedem Fall unterbrochen.
- Verdeckter Nebeneffekt: `keepBgm` (alle 2 s) startete die Titelmusik neu, sobald `#bgm` pausiert war. Die Schleife hat `#bgm` am Tisch ständig wieder angehalten und das verborgen. Ohne die Schleife hätte die Titelmusik am Tisch parallel zum Kampfstück gespielt. `keepBgm` überspringt `#bgm` am Tisch jetzt und setzt stattdessen ein angehaltenes Kampfstück fort.

## Fix

- `audio-data.js` `stop(el)`: `pause()` nur wenn nicht pausiert, `currentTime = 0` nur wenn ungleich 0.
- `index.html` `persistAudio(music, vol)`: `applyAudio` schreibt in den `localStorage` nur, wenn der gespeicherte Wert abweicht (Vergleich mit dem Speicher, nicht mit einem Merker, damit Zurücksetzen wieder zum Schreiben führt).
- `index.html` `keepBgm`: am Tisch kein Neustart der Titelmusik.
- Das Verhalten der Musik bleibt gleich: Menü- und Setup-Musik, Kampfstück am Tisch, Lautstärke und An/Aus werden weiter gespeichert.

## Messung (Headless-Chromium, Partie läuft, 3 s)

| Stand | Schreibzugriffe pro Sekunde | `canplay`/`seeked` auf `#bgm` |
|---|---|---|
| `v0.6e` (0.605) | etwa 37.800 | je 56.700 in 3 s |
| `v0.610` | etwa 32.900–37.800 | je 49.300–56.700 in 3 s |
| `v0.611` | 0 | 0 |

## Tests

- `tests/test_audio_loop_t296.js` (in `npm test`): zählt Seeks bei 1000 Aufrufen von `playTable`/`stopTable`; schlägt ohne den Fix fehl.
- `tests/playwright_audio_t296.mjs` (`npm run audio-play`): Menü und Tisch je 3 s, höchstens 20 Schreibzugriffe, `#bgm` am Tisch pausiert, Kampfstück läuft, Timer-Verzug unter 400 ms, Lautstärke-Änderung wird weiter gespeichert. `DC_AUDIO_GAME_DIR` zeigt auf einen alten Stand zum Vergleichen.
