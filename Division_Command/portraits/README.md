# Porträtebenen

Werkzeug neben dem Spiel. `server.py` und `web/` bleiben unverändert.

Eine Vorlage ist eine Leinwand mit festen Feldern, nicht zwei ähnliche Bilder. Alles unter der Kinnlinie gehört dem Körper. Gesicht, Haar, Bart und Mütze dürfen dort nichts malen.

## Dateien

| Datei | Zweck |
|---|---|
| `frame.json` | Leinwand, Kinnlinie, Reihenfolge |
| `layers/*.png` | Eine Ebene, immer 1152×1728, durchsichtig außer dem Motiv |
| `compose.py` | Legt die vorhandenen Ebenen übereinander |
| `preview.html` | Zeigt die Ebenen und die Kinnlinie |
| `build/portrait.png` | Ergebnis, wird erzeugt und nicht von Hand gepflegt |

## Benutzen

```text
python portraits/compose.py
```

Fehlt `layers/body.png`, wird nichts geschrieben. Eine Kopfebene mit Farbe unter `chin_y` wird verworfen.

`frame.json` ist gesperrt. `chin_y` ist 800, gemessen an `layers/body.png`. Der Kopf darüber ist aus der Körperebene gelöscht.
