DIVISION COMMAND — installierbarer Offline/LAN-Host
====================================================

Was das ist
-----------
Kein Store-App-Paket, sondern ein kleiner Server plus Web-App.
Ein PC hostet. Handy und andere PCs öffnen die Adresse und können
die Seite auf den Startbildschirm legen.

Start auf dem Host-PC
---------------------
1. Python 3 installieren (python.org), falls nicht vorhanden.
2. start.bat (Windows) oder ./start.sh (Mac/Linux).
3. Im Terminal erscheinen Adressen, z.B.
     http://192.168.1.20:8765
     http://25.x.x.x:8765          ← Hamachi
4. Diese Adresse auf dem Handy im Browser öffnen.

Spielernamen
------------
In der Lobby eintragen, bevor du „Weiter“ drückst.

Modi
----
- Allein gegen Bot / Hotseat: kein Netz nötig, im Browser auf dem Host.
- LAN hosten: wartet auf den zweiten Spieler.
- LAN beitreten: „Suchen“ (nur wenn beide server.py laufen) oder
  Host-IP eintragen (Handy: immer die IP vom Bildschirm des Hosts).

Handy „installieren“
--------------------
Chrome/Edge: Menü → Zum Startbildschirm hinzufügen.
iPhone: Teilen → Zum Home-Bildschirm.
Ohne HTTPS ist das oft ein Lesezeichen im Vollbild, kein Store-App.
Neue Version = Host neu starten, auf dem Handy Seite neu laden
oder Icon entfernen und wieder hinzufügen.

Hamachi
-------
Beide in derselben Hamachi-Netzwerk. Host startet server.py.
Gast trägt die 25.x.x.x des Hosts ein.

Firewall
--------
Ports 8765 (HTTP), 8766 (WebSocket), 47831 UDP (Suche) zulassen.


Firewall (LAN)
--------------
Nach dem Bauen liegt firewall.bat neben DivisionCommand.exe.
Einmal als Administrator doppelklicken — auf JEDEM Rechner, der hostet oder beitritt.
