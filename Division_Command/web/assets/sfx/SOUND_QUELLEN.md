# SOUND_QUELLEN — Division Command SFX v4

Stand: 2026-11-05 · `/workspace/sfx_set_v4/` (nicht im Repo)

## Stil
Noch dichtere polyphone Schichtung (**typisch 6–8 Schichten**): Unisono-Körper (3–5 verstimmte Oszillatoren),
Obertöne, Sub-Bass, Druckwelle, Rauschen/Debris, Mechanik, optional CC0-Layer.
Weich, trocken, mono, **kein Hall/Echo/Haas**. Leichte Retro-Note (milder 15-Bit-Crush).

## Was bei den Treffern falsch war (v3)
1. Artillerie-/Angriffsketten wurden per `mix(..., ats=0)` **übereinandergelegt** statt sequenziert — Einschlag lag unter Abschuss/Pfeifen und war kaum hörbar.
2. `loudnorm`/`dynaudnorm` und starke End-Fades **drückten** späte Einschläge.
3. Gewehr-/MG-Bursts endeten ohne Querschläger/Treffer-Schwanz.

## Fix in v4
- Ketten mit `concatenate`: Abschuss → (Pfeifen) → **lauter Einschlag**.
- Peak-Normierung ohne Dynaudnorm für Impact-Dateien.
- Neue separate Treffer: `hit-infanterie`, `hit-panzer`, `hit-artillerie`, `hit-explosion`, `hit-metall`; `hit` selbst satte Erde/Metall/Splitter.

## Kadenzen
Unverändert: MG 800–1200/min Bursts 0,5–1,5 s; Kanone 1× / 2×@1,0 s / 3×@1,2 s; Gewehr 3–4 Schüsse; Artillerie Abschuss–Pfeifen–Einschlag.

## Lizenz
Synthetisch (numpy) + optionale CC0-Freesound-Previews (#169775, #160590, #239135, #168078, #186962/#216563, #325269).

## Lieferumfang
102 SFX (97 Basis + 5 neue hit-*) · mp3 + ogg · vorschau.mp3 · diese Datei · `/workspace/sfx_set_v4.zip`

## Schwächen
Prozedural; Jingles spielerisch; CC0 nur als Zusatzschicht.
