# 2,5D-Tischkamera (Prototyp, Branch `table-camera`)

- Technik: reines DOM/CSS. Der Spieltisch (Front, Support, Niemandsland) liegt in `#cam-world`, die per
  `translate/scale` bewegt und über `.cam-tilt` mit `rotateX(9deg)` + `perspective` leicht geneigt wird.
  **Kein echtes 3D / WebGL**: keine Kamera-Rotation, keine echten Tiefenschatten pro Karte, nur Perspektive.
- Hand, Doktrinen, Stapel, HUD, Protokoll/Chat, Playtest, Optionen, Endscreen bleiben außerhalb (angepinnt).
- Steuerung: WASD/Pfeile (kontinuierlich), Mausrad = Zoom um Mausposition (0,45–1,6), Mittelklick-Ziehen = Pan.
  Kein WASD in Eingabefeldern, bei offenem Dialog/Endscreen oder mit Strg/Meta/Alt. Mausrad über Hand/Protokoll/Dialog bleibt natives Scrollen.
- Buttons: „Übersicht“, „Auto-Fokus“ an/aus, „Flach“ (klassischer Tisch, reversibel über „2,5D-Tisch“).
  Einstellungen in `localStorage.dc_camera_prefs` (getrennt von Audio/Optionen).
- Auto-Fokus: einmal pro Ereignis (neue Fronteinheit, tatsächlicher Treffer-Impuls), nur wenn das Ziel nicht sichtbar ist;
  nie während offener Auswahl, Ziehen oder gewählter Handkarte; 2,5 s Vorrang nach manueller Bewegung; mind. 0,9 s Abstand.
  `prefers-reduced-motion`: keine Kamerafahrt-Animation.
- Grenzen: Größe der Welt wird gemessen; sehr kleine Fenster zeigen bei Übersicht ggf. kleinen Zoom. Perspektive kann Karten oben minimal verkleinern.
