# 2,5D-Tischkamera (Test-Option)

**Einstellen:** Optionen → Grafik → „Tischansicht: Flach (klassisch) / 2,5D“ und „Kamera-Auto-Fokus“; ebenso im Ingame-Menü „Optionen“ unter „Grafik“. Standard: Flach. Wirkt sofort, gespeichert in `dc_camera_prefs`; während eines Karten-Drags wird erst nach dem Drop umgeschaltet.

- Technik: reines DOM/CSS. Der Spieltisch (Front, Support, Niemandsland) liegt in `#cam-world`, die per
  `translate/scale` bewegt und über `.cam-tilt` mit `rotateX(9deg)` + `perspective` leicht geneigt wird.
  **Kein echtes 3D / WebGL**: keine Kamera-Rotation, keine echten Tiefenschatten pro Karte, nur Perspektive.
- Hand, Doktrinen, Stapel, HUD, Protokoll/Chat, Playtest, Optionen, Endscreen bleiben außerhalb (angepinnt).
- Steuerung: WASD/Pfeile (kontinuierlich), Mausrad = Zoom um Mausposition (0,45–1,6), Mittelklick-Ziehen = Pan.
  Kein WASD in Eingabefeldern, bei offenem Dialog/Endscreen oder mit Strg/Meta/Alt. Mausrad über Hand/Protokoll/Dialog bleibt natives Scrollen.
- Am Tisch bleibt nur der Button „Übersicht“ plus Steuerhinweis; Umschalten zentral über die Grafikoptionen.
- Auto-Fokus: einmal pro Ereignis (neue Fronteinheit, tatsächlicher Treffer-Impuls), nur wenn das Ziel nicht sichtbar ist;
  nie während offener Auswahl, Ziehen oder gewählter Handkarte; 2,5 s Vorrang nach manueller Bewegung; mind. 0,9 s Abstand.
  `prefers-reduced-motion`: keine Kamerafahrt-Animation.
- Grenzen: Größe der Welt wird gemessen; sehr kleine Fenster zeigen bei Übersicht ggf. kleinen Zoom. Perspektive kann Karten oben minimal verkleinern.
