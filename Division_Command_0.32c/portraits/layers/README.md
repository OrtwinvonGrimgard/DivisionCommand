# Ebenen

Jede Datei heißt wie ihre Ebene und füllt die ganze Leinwand. Was nicht zum Motiv gehört, ist durchsichtig.

| Datei | Darf unter die Kinnlinie |
|---|---|
| `body.png` | ja, das ist der gesperrte Körper |
| `face.png` | nein |
| `hair.png` | nein |
| `beard.png` | nein |
| `cap.png` | nein |
| `insignia.png` | ja |
| `medals.png` | ja |
| `details.png` | ja |

Es muss noch keine dieser Dateien geben. `compose.py` überspringt, was fehlt, und bricht ab, wenn der Körper fehlt.
