#!/usr/bin/env python3
"""Karteneditor: statische Dateien + POST /api/render und /api/export."""
from __future__ import annotations

import base64
import json
import os
import re
import sys
import tempfile
import traceback
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(Path(__file__).resolve().parent))
os.chdir(ROOT)

import render as R  # noqa: E402

PORT = int(os.environ.get("DC_EDITOR_PORT", "8080"))
CARDS = Path(R.CARDS)
DEFAULT_ART = CARDS / "Stosstrupp_Lehm.jpg"
OUTBOX_NAME = "Division Command Karten"


TYP_DIR = {
    "Einheit": "Einheit",
    "Unterstützung": "Unterstützung",
    "Soforteinsatz": "Soforteinsatz",
    "Ausrüstung": "Ausrüstung",
    "Doktrin": "Doktrin",
    "Token": "Token",
}
METAL_DIR = {
    "gold": "gold",
    "silver": "silber",
    "silber": "silber",
    "bronze": "bronze",
}


def user_home() -> Path:
    return Path(os.environ.get("USERPROFILE") or Path.home())


def _writable(folder: Path) -> bool:
    try:
        folder.mkdir(parents=True, exist_ok=True)
        probe = folder / ".dc_write"
        probe.write_text("ok", encoding="utf-8")
        probe.unlink()
        return True
    except OSError:
        return False


def output_candidates() -> list:
    home = user_home()
    od = os.environ.get("OneDrive") or os.environ.get("OneDriveConsumer") or ""
    return [
        ROOT,
        home / "Documents",
        home / "Dokumente",
        Path(od) / "Documents" if od else None,
        Path(od) / "Dokumente" if od else None,
        home / "Desktop",
        home / "Schreibtisch",
    ]


def outbox_root() -> Path:
    """Zuerst neben start.bat, sonst Dokumente/Desktop."""
    for base in output_candidates():
        if base is None:
            continue
        folder = Path(base) / OUTBOX_NAME
        if _writable(folder):
            return folder
    folder = ROOT / OUTBOX_NAME
    folder.mkdir(parents=True, exist_ok=True)
    return folder


def ensure_outbox_tree(root: Path | None = None) -> Path:
    folder = root or outbox_root()
    for typ in TYP_DIR.values():
        for metal in ("gold", "silber", "bronze"):
            (folder / typ / metal).mkdir(parents=True, exist_ok=True)
    return folder


def card_number(body: dict) -> str:
    raw = str(body.get("number") or "001")
    digits = re.sub(r"\D+", "", raw) or "1"
    return digits.zfill(3)[:4]


def save_png(png: bytes, body: dict) -> Path:
    """Division Command Karten / Typ / gold|silber|bronze / 001.png"""
    typ = TYP_DIR.get(str(body.get("typ") or "Einheit"), "Einheit")
    metal = METAL_DIR.get(str(body.get("metal") or "gold").lower(), "gold")
    num = card_number(body)
    folder = ensure_outbox_tree() / typ / metal
    folder.mkdir(parents=True, exist_ok=True)
    dest = folder / (num + ".png")
    dest.write_bytes(png)
    return dest


def _send_json(handler, obj, status=200):
    payload = json.dumps(obj, ensure_ascii=False).encode("utf-8")
    handler.send_response(status)
    handler.send_header("Content-Type", "application/json; charset=utf-8")
    handler.send_header("Content-Length", str(len(payload)))
    handler.end_headers()
    handler.wfile.write(payload)


class Handler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def do_GET(self):
        path = self.path.split("?", 1)[0]
        preview = (ROOT / ".preview-only").is_file()
        if path in ("/", "/index.html"):
            dest = "/preview.html" if preview else "/editor.html"
            self.send_response(302)
            self.send_header("Location", dest)
            self.end_headers()
            return
        if path == "/api/outbox":
            folder = ensure_outbox_tree()
            _send_json(self, {"ok": True, "dir": str(folder)})
            return
        super().do_GET()

    def do_POST(self):
        path = self.path.split("?", 1)[0]
        if path not in ("/api/render", "/api/export"):
            self.send_error(404)
            return
        try:
            n = int(self.headers.get("Content-Length") or 0)
            body = json.loads(self.rfile.read(n).decode("utf-8") or "{}")
            png = render_card(body)
        except Exception as e:
            traceback.print_exc()
            if path == "/api/export":
                _send_json(self, {"ok": False, "error": "Rendern fehlgeschlagen: " + str(e)}, 500)
            else:
                self.send_error(500, "render failed")
            return
        if path == "/api/export":
            try:
                saved = save_png(png, body)
            except Exception as e:
                traceback.print_exc()
                _send_json(self, {"ok": False, "error": "Speichern fehlgeschlagen: " + str(e)}, 500)
                return
            print("[save]", saved, flush=True)
            _send_json(self, {"ok": True, "path": str(saved), "dir": str(saved.parent)})
            return
        self.send_response(200)
        self.send_header("Content-Type", "image/png")
        self.send_header("Content-Length", str(len(png)))
        self.end_headers()
        self.wfile.write(png)

    def log_message(self, fmt, *args):
        sys.stderr.write("[editor] " + (fmt % args) + "\n")


def render_card(body: dict) -> bytes:
    name = str(body.get("name") or "Neue Karte")
    tags = [str(t).strip() for t in (body.get("tags") or []) if str(t).strip()]
    typ = str(body.get("typ") or "Einheit")
    klasse = str(body.get("klasse") or ("Infanterie" if typ == "Einheit" else ""))
    card = {
        "name": name,
        "typ": typ,
        "klasse": klasse,
        "ap": int(body.get("ap") or 0),
        "atk": int(body.get("atk") or 0),
        "def": int(body.get("def") or 0),
        "text": str(body.get("text") or ""),
        "flavor": str(body.get("flavor") or ""),
        "tags": tags,
        "edition": str(body.get("edition") or "ALPHA"),
        "footer_star": bool(body.get("footer_star")),
        "n": str(body.get("number") or "001"),
        "tag_colors": body.get("tag_colors") or {},
        "marble_seed": int(body.get("marble_seed") or 0),
        "token_kind": str(body.get("token_kind") or "minenfeld"),
        "art_pan_x": float(body.get("art_pan_x") or 0),
        "art_pan_y": float(body.get("art_pan_y") or 0),
        "art_zoom": float(body.get("art_zoom") or 100),
    }
    art = DEFAULT_ART
    if typ == "Unterstützung":
        cand = CARDS / "Kriegsanleihe.jpg"
        if cand.is_file():
            art = cand
    if typ == "Ausrüstung":
        cand = CARDS / "Klappspaten.jpg"
        if cand.is_file():
            art = cand
    if typ == "Soforteinsatz":
        cand = CARDS / "Roter_Stempel.jpg"
        if not cand.is_file():
            cand = CARDS / "Armageddon.jpg"
        if cand.is_file():
            art = cand
    if typ == "Token":
        kind = str(body.get("token_kind") or "minenfeld")
        cand = CARDS / ("token-nebel-oil.jpg" if "nebel" in kind.lower() else "token-mine-oil.jpg")
        if cand.is_file():
            art = cand
    tmp = None
    raw = body.get("image_b64") or ""
    if raw:
        if "," in raw:
            raw = raw.split(",", 1)[1]
        blob = base64.b64decode(raw)
        tmp = tempfile.NamedTemporaryFile(suffix=".png", delete=False)
        tmp.write(blob)
        tmp.close()
        art = Path(tmp.name)
    elif body.get("image"):
        cand = CARDS / str(body.get("image"))
        if cand.is_file():
            art = cand
    dest = tempfile.NamedTemporaryFile(suffix=".png", delete=False)
    dest.close()
    try:
        if typ == "Token":
            R.render_token(
                card,
                dest.name,
                metal=str(body.get("metal") or "gold"),
                art=str(art) if art else None,
            )
        else:
            R.render(
                card,
                str(art),
                dest.name,
                number=str(body.get("number") or "001").zfill(3),
                native=True,
                metal=str(body.get("metal") or "gold"),
                panel="marmor",
                edition=str(body.get("edition") or "ALPHA"),
                footer_star=bool(body.get("footer_star")),
            )
        return Path(dest.name).read_bytes()
    finally:
        try:
            os.unlink(dest.name)
        except OSError:
            pass
        if tmp:
            try:
                os.unlink(tmp.name)
            except OSError:
                pass


if __name__ == "__main__":
    ThreadingHTTPServer.allow_reuse_address = True
    httpd = ThreadingHTTPServer(("0.0.0.0", PORT), Handler)
    folder = ensure_outbox_tree()
    print(f"Karteneditor: http://127.0.0.1:{PORT}/editor.html", flush=True)
    print(f"Kartenordner: {folder}", flush=True)
    httpd.serve_forever()
