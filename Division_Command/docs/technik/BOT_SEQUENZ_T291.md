# Bot-Zug in Einzelschritten und Reaktionsfenster (t291, Version 0.610)

**Status: aktiv** · Stand 17.11.2026 · Code: `web/js/ai/bot-seq.js`, Bot-Abschnitt in `web/js/ui/app.js`

## 1. Ausgangslage (bis 0.6e)

Der Bot rechnete seinen Zug im Browser in schneller Folge durch (Takt `dc_bot_delay`, 60–4000 ms, aber ohne Halt nach einer Aktion). Gleichzeitig hielt das Ereignis-Banner (`showRecap`) die Anzeige an, bis alles gesammelt war. Ergebnis: Zu Beginn des eigenen Zuges lief eine lange Zusammenfassung ab, was der Bot getan hatte. Der Mensch konnte zwischendurch nicht reagieren. Nur die Engine-Fenster (Feindkontakt, SAM, Geistiger Vorsprung, taktische Fenster) unterbrachen den Bot.

## 2. Ablauf jetzt

Der Bot spielt seinen Zug wie ein Mensch, eine Aktion nach der anderen:

1. **Planen:** `DCBotSeq.nextAction(engine, pid, DCBot, fail)` wählt genau eine Aktion. Dafür dient dieselbe Bot-Logik wie bisher (`DCBot.step`). Nach jeder Aktion plant der Bot neu, auf dem dann aktuellen Spielstand.
2. **Ausführen:** `engine.dispatch(action)`, dann sofort `render()`.
3. **Zeigen:** Der Ticker `#bot-ticker` oben links ist nicht blockierend. Er zeigt das Kartenbild und die letzten vier Zeilen (z. B. „Gegner · spielt aus“). Die gespielte Karte und ihr Ziel leuchten kurz auf (`.bot-hl`, `.bot-hl-target`). Zerstörte Karten fliegen auf den Friedhof, die Ereignis-Sounds laufen. Es gibt kein modales Banner mehr, das die Aktionen des Bots sammelt.
4. **Denkpause:** Die Pause schwankt zufällig, aber deterministisch (`DCBotSeq.thinkDelay`, ohne `Math.random`):

| Tempo | Pause nach Hauptaktion | Folgewahl (Ziel, Feld) | Zusatz zu Zugbeginn |
|---|---|---|---|
| langsam | 1100–2000 ms | 650 ms | +600 ms |
| normal (Standard) | 600–1400 ms | 380 ms | +350 ms |
| schnell | 200–450 ms | 120 ms | +100 ms |

   Für Folgewahlen gilt höchstens der Regler „Pause bei Folgewahl“ (früher „Denkpause“, `dc_bot_delay`).
5. **Reaktion prüfen:** Ist eine Hauptaktion samt ihrer Folgewahlen abgeschlossen (z. B. PLAY und danach die Feldwahl), prüft `DCBotSeq.reactionOptions(engine, humanPid)`, ob der Mensch einen Soforteinsatz legal spielen kann (siehe §3). Gibt es einen, öffnet sich das Reaktionsfenster.
6. **Zugende:** Beendet der Bot seinen Zug (END_TURN), ist nichts nachzuholen. Der eigene Zug beginnt ohne Zusammenfassung, das Protokoll enthält alle Einträge.

Nur ein Planer läuft, mit Token (`scheduleBot`). Ein alter Plan verfällt, sobald ein neuer angesetzt wird. Damit kann der Bot nie doppelt ziehen.

## 3. Wann der Bot anhält

| Grund | Wirkung |
|---|---|
| **Engine-Reaktionsfenster** (Feindkontakt bei Angriff, SAM, Geistiger Vorsprung, taktische Fenster `tac-*`) | wie bisher: Die Engine setzt `pending` für den Menschen, der Bot wartet. |
| **Reaktionsfenster nach einer Bot-Aktion** (neu) | Der Mensch hat AP-Reserve und mindestens einen Soforteinsatz auf der Hand, den die Engine im Gegnerzug zulässt. Geprüft wird per Trockenlauf auf einer Kopie der Engine. Karten mit „nur im eigenen Zug“ (`OWN_TURN`), zu teure und solche ohne gültiges Ziel fallen weg. |
| Offenes Ereignis-Banner, Karte wird gezogen, Karte angewählt, Optionen offen, Kartenansicht offen | Der Bot wartet, bis der Mensch fertig ist (`botHoldReason`). |
| **Tab im Hintergrund** (`document.visibilityState === 'hidden'`) | Der Bot pausiert und macht weiter, wenn der Tab wieder sichtbar ist. So verpasst niemand Aktionen. |
| Partieende mitten im Zug, Verlassen der Partie | Plan und Fenster werden verworfen (`clearMatchPresentation`, `showMatchEnd`). |

**Reaktionsfenster** (`.modal.bot-react`): Es zeigt „Gegner: …“ mit der letzten Aktion, die AP-Reserve und die spielbaren Soforteinsätze als Karten mit Kosten. „Weiter“ lässt den Bot fortfahren. „In diesem Zug nicht mehr anhalten“ unterdrückt weitere Fenster bis zum Zugende des Bots. Ein Klick auf eine Karte spielt sie. Braucht sie ein Ziel, folgt die normale Zielwahl am Tisch. Danach plant der Bot neu.

## 4. Einstellungen

Unter „Optionen › Spielablauf“ und in den Optionen im Spiel. Gespeichert werden sie in `localStorage`, der Reset kennt beide Schlüssel.

| Schlüssel | Werte | Standard |
|---|---|---|
| `dc_bot_tempo` | `slow`, `normal`, `fast` | `normal` |
| `dc_bot_react` | `stop` (immer anhalten, bis du entscheidest), `brief` (5 s Fenster, dann weiter), `off` (nie anhalten; Engine-Fenster bleiben) | `stop` |

## 5. Was gleich bleibt

- **Headless (Sim, Fuzz, Smoke, Balance):** ruft `DCBot.step` direkt auf, ohne Pausen. Der Hash aus 80 Partien (`DCBot.step` mit fester Saat) ist vor und nach t291 identisch: `71024234358106ad…`, 40 : 40. Es gibt also **keine Balanceverschiebung**.
- **Tutorial:** eigenes Skript (`scriptedTick`), unverändert.
- **Hotseat und LAN:** kein Bot, unverändert. Alle Änderungen greifen nur im Modus `bot`.
- **Speichern/Laden:** gibt es im Spiel nicht. Nichts zu tun.

## 6. Nebenbefund behoben

Die Engine kappt das Ereignisprotokoll bei 80 Einträgen. Bisher verglich die UI die Länge des Protokolls und übersah ab dort neue Ereignisse. Jetzt bekommt jedes Ereignis eine laufende Nummer (`state.evN`, Feld `n`), und die UI merkt sich die zuletzt gesehene Nummer.

Seit die Ereignisse wieder ab Eintrag 80 ankommen, zeigt die Oberfläche auch späte Meldungen. Eine Live-Meldung zeigt höchstens die **letzten 6 Einträge** (`RECAP_MAX`). Das Protokoll enthält alles, und so entsteht keine lange Meldungskette.

Der Bot wartet laufende Meldungen nur in seinem **eigenen** Zug ab. Muss er im Zug des Menschen antworten (Feindkontakt, SAM, taktische Fenster), antwortet er wie vor t291 sofort.

`dcEventDebug()` meldet zur Diagnose zusätzlich `seenN`, `evN`, `batches`, `lastBatch` und `lastBatchN`. `ui-play` schreibt bei einer Zeitüberschreitung die Timer-Latenz und ein 3-s-CPU-Profil der Seite (`DIAG-HANG`).

**Befund Browser-Gates t291:** `ui-play` lief unter Parallellast mehrfach in eine Zeitüberschreitung. Gewartet wurde dabei auf den eigenen Zug, während eine Live-Meldung lief. Das CPU-Profil im Fehlerfall zeigt eine Seite, die nicht blockiert ist und weiter tippt, deren Timer aber bis 200 ms verspätet feuern. Die Meldung tippte bisher mit einem Timer je Zeichen und dehnte sich dadurch auf Minuten.

Bis 0.605 fiel das kaum auf: Ab 80 Protokolleinträgen kamen gar keine Meldungen mehr an (siehe §6).

**Behoben:** Die Zeichen werden jetzt nach der verstrichenen Zeit gesetzt, nicht mehr pro Timer. Eine Meldung dauert dadurch auch unter Last etwa gleich lang. Zusätzlich wartet `ui-play` nach eigenen Aktionen bis 240 s und schreibt im Fehlerfall `DIAG-HANG`.

Der Tutorial-Hänger im `layout-test` („Tutorial hängt bei Schritt …“, zweiter Versuch grün) ist älter, er trat schon in t280 auf.

## 7. Tests

- `tests/test_botseq_t291.js` (in `npm test`): Einstellungen, Pausengrenzen, deterministische Schritt-API (6 Partien je zweimal, gleicher Hash), `reactionOptions` (nur zulässige Soforteinsätze, Zustand unverändert) sowie Ablauf in jsdom mit virtueller Uhr: Pausen, Fenster, Klick, „nicht mehr anhalten“, `off`, Countdown `brief`.
- `tests/playwright_botseq_t291.mjs` (`npm run botseq-play`): echter Browser, Pausen zwischen Bot-Aktionen gemessen, Fenster hält den Bot an, Napalm über das Fenster gespielt, Bot macht weiter, kein Nachholen zu Zugbeginn. Screenshots nach `DC_BOTSEQ_OUT` (Standard `/workspace/t291-shots`).
- `ui-play` läuft mit `dc_bot_tempo = fast`, Fenster an (es spielt angebotene Reaktionen).
