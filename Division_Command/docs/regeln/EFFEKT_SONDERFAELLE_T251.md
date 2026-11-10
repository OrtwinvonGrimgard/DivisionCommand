# Effekt-Sonderfälle (t251)

Kartentext ist maßgeblich. Hier stehen nur Präzisierungen, die der Text offen lässt. Die Datenfelder `text` wurden nicht geändert.

## `dc_b_vertragsclip_182` – Vertragsclip

„Elite/Unterstützung: Soforteinsatz −1 Kosten.“

Die Ausrüstung darf nur an eine eigene Elite-Einheit oder eine eigene offene Unterstützung gelegt werden. Solange sie dort liegt, kosten eigene Soforteinsätze 1 AP weniger (mindestens 0). Mehrere Clips stapeln sich. Der Effektcode `EQUIP_DISCOUNT_AURA` (Typ Soforteinsatz, Betrag 1) greift in `costOf`; das ist unabhängig vom älteren Rabatt `EQUIP_DISCOUNT` auf Unterstützungskarten.

## `dc_dok_blitzkrieg` – Blitzkrieg (`BLITZ_LOCK_SUPPORT`)

„Panzertruppen erhalten +1 Angriff in dem Zug, in dem sie in die Frontlinie gespielt werden. Sonderfähigkeiten gegnerischer Unterstützungskarten können in der ersten Runde nach Ausspielung einer Panzerkarte nicht aktiviert werden.“

Der ATK-Bonus (`BLITZ_SUMMON_ATK`) bleibt unverändert. Die Unterstützungssperre löst aus, sobald eine eigene Panzerkarte in die Front kommt (offen oder verdeckt; auch kostenloses Auslegen zählt als Ausspielung). Sie gilt für den nächsten Zug des Gegners: Sonderfähigkeiten seiner Unterstützung (einschließlich taktischer Aktivierungen) können nicht gestartet werden. Passive Auren, das Auslegen neuer Unterstützung und das Neutralisieren einer gegnerischen Schläferzelle bleiben erlaubt. Ein weiteres eigenes Panzer-Ausspiel in demselben Zug verlängert die laufende Sperre nicht über diesen einen gegnerischen Zug hinaus. Das Aufdecken eines älteren, bereits gelegenen Panzers löst die Sperre nicht erneut aus.

## `dc_su_schlaefer` – Schläferzelle (`NEUTRALIZE`)

„Nach 3 eigenen Zügen: zufällige gegnerische Einheit mit AP ≤ 3 zerstören. Danach auf den Friedhof. Neutralisierung 2 AP (Gegner).“

Der SLEEPER-Pfad bleibt unverändert. Der Gegner kann die ausliegende, offene Schläferzelle in seinem eigenen Zug für 2 AP entfernen (zerstören, ohne den Vernichtungseffekt auszulösen), auch unmittelbar nach dem Auslegen. Die Aktion steht in `listActions` als `ACTIVATE_SUPPORT` mit `ability: 'NEUTRALIZE'` und läuft über `dispatch` (Bots und LAN/Online).
