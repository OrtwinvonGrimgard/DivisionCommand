# Ketten-Ansatz (Öl): Rothain / m1

1. Fähnrich-Master: GenerateImage mit 3 Referenzen (bestehendes Rothain-Ölgemälde = Stil, `m1_jung` = Identität, ghost-mannequin Rock = Schnitt), 3:4, frontal, Kopf+Torso, schlichter dunkler Hintergrund (#2b2724).
2. Rang n = GenerateImage-Edit von Rang n-1 (landmark-ausgerichtet, `chain_align.py`) + Fähnrich-Rohbild als Identitätsreferenz.
   Prompt-Schema: "KEEP EXACTLY: gleiche Person/Pose/Kopfgröße/Ausschnitt/Licht/Pinselstrich/Hintergrund und gleicher Mantel MIT dickem schwarzen Pelzkragen. CHANGE ONLY: (1) Alter ~N + konkrete Altersmerkmale, (2) Rangabzeichen laut Insignien.md (Schulterbretter/Kragenspiegel/Brustorden/Bänder/Aiguillette) jeweils reicher."
   Lehren: Pelzkragen explizit erhalten (sonst verschwindet er), Haaransatz explizit festhalten ab ~60 J., Zählbare Symbole (Ringe/Kronen) werden nur teilweise befolgt; separate "nur Schulterbretter ändern"-Edits klappen bei Kronenzahl (12, 13, 15), nicht bei Ringen (2) und nicht immer (14).
3. `chain_align.py`: mediapipe-Iris/Kinn -> Ähnlichkeitstransformation auf die Landmarken des Fähnrichs (Rand repliziert). `chain_build.py export|sheets`: 768x1024-WebP, Narben-Layer (aus dem v2-Narbengenerator, per Offset an den Master angepasst), manifest, Bögen.
Rohbilder: `chain_raw_rothain_m1/`. Ergebnis: `Division_Command/web/assets/portraits/oel_ketten/`.
