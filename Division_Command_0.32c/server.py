#!/usr/bin/env python3
"""Division Command — lokaler Host für PWA, LAN und Hamachi."""
from __future__ import annotations

import argparse
import os
import json
import socket
import sys
import threading
import time
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

def _base():
    if getattr(sys, "frozen", False):
        return Path(sys._MEIPASS)
    return Path(__file__).resolve().parent


WEB = _base() / "web"
UDP_PORT = 47831
HTTP_PORT = 8765
BEACON = b"DIVISION-COMMAND-V1"

def _find_editor_root() -> Path:
    here = _base()
    candidates = [
        here / "KartenEditor",
        here.parent / "KartenEditor",
        Path("/workspace/artifacts/KartenEditor"),
    ]
    for p in candidates:
        if (p / "tools" / "render.py").is_file():
            return p
    return here / "KartenEditor"


EDITOR_ROOT = _find_editor_root()
EDITOR_TOOLS = EDITOR_ROOT / "tools"
EDITOR_CARDS = EDITOR_ROOT / "assets" / "cards"
GAME_CARDS = WEB / "assets" / "cards"
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

if str(EDITOR_TOOLS) not in sys.path:
    sys.path.insert(0, str(EDITOR_TOOLS))
try:
    import render as DCRender  # noqa: E402
except Exception as exc:
    DCRender = None
    print("[editor] renderer fehlt:", exc, file=sys.stderr)


def _writable(folder: Path) -> bool:
    try:
        folder.mkdir(parents=True, exist_ok=True)
        probe = folder / ".dc_write"
        probe.write_text("ok", encoding="utf-8")
        probe.unlink()
        return True
    except OSError:
        return False


def outbox_root() -> Path:
    home = Path(os.environ.get("USERPROFILE") or Path.home())
    od = os.environ.get("OneDrive") or os.environ.get("OneDriveConsumer") or ""
    candidates = [
        _base(),
        home / "Documents",
        home / "Dokumente",
        Path(od) / "Documents" if od else None,
        Path(od) / "Dokumente" if od else None,
        home / "Desktop",
        home / "Schreibtisch",
        EDITOR_ROOT,
    ]
    for base in candidates:
        if base is None:
            continue
        folder = Path(base) / OUTBOX_NAME
        if _writable(folder):
            return folder
    folder = _base() / OUTBOX_NAME
    folder.mkdir(parents=True, exist_ok=True)
    return folder


def ensure_outbox_tree(root: Path | None = None) -> Path:
    folder = root or outbox_root()
    for typ in TYP_DIR.values():
        for metal in ("gold", "silber", "bronze"):
            (folder / typ / metal).mkdir(parents=True, exist_ok=True)
    return folder


def card_number(body: dict) -> str:
    import re
    raw = str(body.get("number") or "001")
    digits = re.sub(r"\D+", "", raw) or "1"
    return digits.zfill(3)[:4]


def find_art(image_name: str, typ: str, token_kind: str) -> Path:
    dirs = [EDITOR_CARDS, GAME_CARDS]
    name = str(image_name or "").strip()
    if name:
        for folder in dirs:
            cand = folder / name
            if cand.is_file():
                return cand
    defaults = {
        "Einheit": "Stosstrupp_Lehm.jpg",
        "Unterstützung": "Kriegsanleihe.jpg",
        "Ausrüstung": "Klappspaten.jpg",
        "Soforteinsatz": "Roter_Stempel.jpg",
        "Doktrin": "Blitzkrieg-Doktrin.jpg",
        "Token": "token-nebel-oil.jpg" if "nebel" in str(token_kind).lower() else "token-mine-oil.jpg",
    }
    fallback = defaults.get(typ, "Stosstrupp_Lehm.jpg")
    for folder in dirs:
        cand = folder / fallback
        if cand.is_file():
            return cand
    return EDITOR_CARDS / fallback


def render_card(body: dict) -> bytes:
    if DCRender is None:
        raise RuntimeError("Kartenrenderer nicht geladen")
    import base64
    import tempfile
    name = str(body.get("name") or "Neue Karte")
    tags = [str(t).strip() for t in (body.get("tags") or []) if str(t).strip()]
    typ = str(body.get("typ") or "Einheit")
    klasse = str(body.get("klasse") or ("Infanterie" if typ == "Einheit" else ""))
    token_kind = str(body.get("token_kind") or "minenfeld")
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
        "token_kind": token_kind,
        "art_pan_x": float(body.get("art_pan_x") or 0),
        "art_pan_y": float(body.get("art_pan_y") or 0),
        "art_zoom": float(body.get("art_zoom") or 100),
    }
    art = find_art(str(body.get("image") or ""), typ, token_kind)
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
    dest = tempfile.NamedTemporaryFile(suffix=".png", delete=False)
    dest.close()
    try:
        if typ == "Token":
            DCRender.render_token(
                card,
                dest.name,
                metal=str(body.get("metal") or "gold"),
                art=str(art) if art else None,
            )
        else:
            DCRender.render(
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


def preview_jpeg(png: bytes, width: int = 640) -> bytes:
    from io import BytesIO
    from PIL import Image
    im = Image.open(BytesIO(png)).convert("RGB")
    w, h = im.size
    if w > width:
        im = im.resize((width, max(1, int(round(h * (width / float(w)))))), Image.Resampling.LANCZOS)
    buf = BytesIO()
    im.save(buf, format="JPEG", quality=86, optimize=True)
    return buf.getvalue()


def save_png(png: bytes, body: dict) -> Path:
    typ = TYP_DIR.get(str(body.get("typ") or "Einheit"), "Einheit")
    metal = METAL_DIR.get(str(body.get("metal") or "gold").lower(), "gold")
    num = card_number(body)
    folder = ensure_outbox_tree() / typ / metal
    folder.mkdir(parents=True, exist_ok=True)
    dest = folder / (num + ".png")
    dest.write_bytes(png)
    exp = WEB / "assets" / "exports" / typ / metal
    exp.mkdir(parents=True, exist_ok=True)
    (exp / (num + ".png")).write_bytes(png)
    return dest

peers: dict[str, dict] = {}
peers_lock = threading.Lock()
host_name = "Spieler"


def local_ips() -> list[str]:
    found: set[str] = set()
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        found.add(s.getsockname()[0])
        s.close()
    except OSError:
        pass
    try:
        for info in socket.getaddrinfo(socket.gethostname(), None, socket.AF_INET):
            ip = info[4][0]
            if not ip.startswith("127."):
                found.add(ip)
    except OSError:
        pass
    return sorted(found) or ["127.0.0.1"]


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(WEB), **kwargs)

    def log_message(self, fmt, *args):
        sys.stdout.write("[http] " + (fmt % args) + "\n")

    def log_error(self, fmt, *args):
        msg = fmt % args
        if "Broken pipe" in msg or "Connection reset" in msg:
            return
        sys.stderr.write("[http] " + msg + "\n")

    def end_headers(self):
        path = (self.path or "").split("?", 1)[0].lower()
        if path.endswith((".mp4", ".mp3", ".wav", ".jpg", ".jpeg", ".png", ".webp", ".webm")):
            self.send_header("Cache-Control", "public, max-age=86400")
            self.send_header("Accept-Ranges", "bytes")
        elif path.endswith(".zip"):
            self.send_header("Cache-Control", "public, max-age=120")
            self.send_header("Accept-Ranges", "bytes")
            name = Path(path).name
            self.send_header("Content-Type", "application/zip")
            self.send_header("Content-Disposition", f'attachment; filename="{name}"')
        else:
            self.send_header("Cache-Control", "no-store, no-cache, must-revalidate")
        self.send_header("Access-Control-Allow-Origin", "*")
        super().end_headers()

    def do_GET(self):
        if self.path.startswith("/api/status"):
            return self._json(
                {
                    "name": host_name,
                    "ips": local_ips(),
                    "http": HTTP_PORT,
                    "udp": UDP_PORT,
                    "peers": list(_peers_view()),
                }
            )
        if self.path.startswith("/api/peers"):
            return self._json({"peers": list(_peers_view())})
        if self.path.startswith("/api/editor"):
            return self._json({"ok": True, "editor": True})
        if self.path.startswith("/api/outbox"):
            folder = ensure_outbox_tree()
            return self._json({"ok": True, "dir": str(folder)})
        try:
            return super().do_GET()
        except (BrokenPipeError, ConnectionResetError, ConnectionAbortedError):
            return

    def do_POST(self):
        length = int(self.headers.get("Content-Length") or 0)
        raw = self.rfile.read(length) if length else b"{}"
        try:
            data = json.loads(raw.decode("utf-8") or "{}")
        except json.JSONDecodeError:
            data = {}
        if self.path.startswith("/api/name"):
            global host_name
            host_name = str(data.get("name") or "Spieler")[:24]
            return self._json({"ok": True, "name": host_name})
        if self.path.startswith("/api/render") or self.path.startswith("/api/export"):
            try:
                png = render_card(data)
            except Exception as e:
                import traceback
                traceback.print_exc()
                if self.path.startswith("/api/export"):
                    return self._json({"ok": False, "error": "Rendern fehlgeschlagen: " + str(e)}, 500)
                self.send_error(500, "render failed")
                return
            if self.path.startswith("/api/export"):
                try:
                    saved = save_png(png, data)
                except Exception as e:
                    import traceback
                    traceback.print_exc()
                    return self._json({"ok": False, "error": "Speichern fehlgeschlagen: " + str(e)}, 500)
                print("[save]", saved, flush=True)
                return self._json({"ok": True, "path": str(saved), "dir": str(saved.parent)})
            jpeg = preview_jpeg(png)
            return self._bytes(jpeg, "image/jpeg")
        if self.path.startswith("/api/quit"):
            self._json({"ok": True})
            if os.environ.get("DC_KEEP_ALIVE") == "1":
                return
            def _die():
                import time
                time.sleep(0.2)
                os._exit(0)
            threading.Thread(target=_die, daemon=True).start()
            return
        self.send_error(404)

    def _json(self, obj, status=200):
        raw = json.dumps(obj, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(raw)))
        self.end_headers()
        self.wfile.write(raw)

    def _bytes(self, data, content_type):
        self.send_response(200)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)


def _peers_view():
    now = time.time()
    with peers_lock:
        dead = [k for k, v in peers.items() if now - v["seen"] > 8]
        for k in dead:
            peers.pop(k, None)
        return [
            {"ip": v["ip"], "name": v["name"], "port": v.get("port", HTTP_PORT), "age": round(now - v["seen"], 1)}
            for v in peers.values()
        ]


def udp_loop(http_port: int):
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    sock.setsockopt(socket.SOL_SOCKET, socket.SO_BROADCAST, 1)
    sock.bind(("", UDP_PORT))
    sock.settimeout(0.5)
    last_send = 0.0
    while True:
        now = time.time()
        if now - last_send > 2:
            payload = json.dumps(
                {
                    "dc": 1,
                    "name": host_name,
                    "port": http_port,
                    "ips": local_ips(),
                }
            ).encode("utf-8")
            for target in ("255.255.255.255", "10.255.255.255", "25.255.255.255"):
                try:
                    sock.sendto(BEACON + payload, (target, UDP_PORT))
                except OSError:
                    pass
            last_send = now
        try:
            data, addr = sock.recvfrom(2048)
        except socket.timeout:
            continue
        except OSError:
            time.sleep(0.5)
            continue
        if not data.startswith(BEACON):
            continue
        try:
            msg = json.loads(data[len(BEACON) :].decode("utf-8"))
        except (ValueError, UnicodeDecodeError):
            continue
        ip = addr[0]
        if ip in local_ips() or ip.startswith("127."):
            continue
        with peers_lock:
            peers[ip] = {
                "ip": ip,
                "name": str(msg.get("name") or "Spieler")[:24],
                "port": int(msg.get("port") or http_port),
                "seen": time.time(),
            }


def ws_thread(port: int):
    try:
        import asyncio
        from websockets.asyncio.server import serve
    except Exception as exc:
        print("[ws] WebSockets nicht verfügbar:", exc)
        return

    clients = {}
    seats = {"host": None, "guest": None}

    async def handler(ws):
        seat = None
        try:
            async for raw in ws:
                try:
                    msg = json.loads(raw)
                except json.JSONDecodeError:
                    continue
                typ = msg.get("type")
                if typ == "hello":
                    name = str(msg.get("name") or "Spieler")[:24]
                    if seats["host"] is None:
                        seat = "host"
                        seats["host"] = {"ws": ws, "name": name, "ready": False}
                    elif seats["guest"] is None:
                        seat = "guest"
                        seats["guest"] = {"ws": ws, "name": name, "ready": False}
                    else:
                        await ws.send(json.dumps({"type": "full", "error": "Raum voll"}))
                        continue
                    clients[ws] = {"seat": seat, "name": name}
                    await push_lobby()
                elif typ == "ready":
                    if seat and seats.get(seat) and seats[seat]["ws"] is ws:
                        seats[seat]["ready"] = bool(msg.get("ready"))
                    await push_lobby()
                elif typ == "leave":
                    packed = json.dumps({
                        "type": "sys",
                        "msg": (clients.get(ws) or {}).get("name", "Spieler") + " " + str(msg.get("msg") or "hat getrennt"),
                    })
                    for other in list(clients):
                        if other is ws:
                            continue
                        try:
                            await other.send(packed)
                        except Exception:
                            pass
                else:
                    # Spielzüge: an alle anderen
                    packed = json.dumps(msg)
                    for other in list(clients):
                        if other is ws:
                            continue
                        try:
                            await other.send(packed)
                        except Exception:
                            pass
        finally:
            name = (clients.get(ws) or {}).get("name") or "Spieler"
            clients.pop(ws, None)
            if seat and seats.get(seat) and seats[seat]["ws"] is ws:
                seats[seat] = None
            leave = json.dumps({"type": "sys", "msg": name + " hat die Verbindung getrennt."})
            for other in list(clients):
                try:
                    await other.send(leave)
                except Exception:
                    pass
            try:
                await push_lobby()
            except Exception:
                pass

    async def push_lobby():
        base = {
            "type": "lobby",
            "host": seats["host"]["name"] if seats["host"] else None,
            "guest": seats["guest"]["name"] if seats["guest"] else None,
            "hostReady": bool(seats["host"] and seats["host"].get("ready")),
            "guestReady": bool(seats["guest"] and seats["guest"].get("ready")),
        }
        for sock, meta in list(clients.items()):
            raw = json.dumps(dict(base, you=meta.get("seat")))
            try:
                await sock.send(raw)
            except Exception:
                pass

    async def main():
        async with serve(handler, "0.0.0.0", port):
            print(f"[ws] ws://0.0.0.0:{port}")
            await asyncio.Future()

    asyncio.run(main())


def main():
    global HTTP_PORT, host_name
    parser = argparse.ArgumentParser()
    parser.add_argument("--port", type=int, default=HTTP_PORT)
    parser.add_argument("--name", default="Spieler")
    args = parser.parse_args()
    HTTP_PORT = args.port
    host_name = args.name[:24]
    if not WEB.exists():
        print("web/ fehlt neben server.py", file=sys.stderr)
        sys.exit(1)

    threading.Thread(target=udp_loop, args=(HTTP_PORT,), daemon=True).start()
    if HTTP_PORT != 8080:
        threading.Thread(target=ws_thread, args=(HTTP_PORT + 1,), daemon=True).start()

    httpd = ThreadingHTTPServer(("0.0.0.0", HTTP_PORT), Handler)
    ips = local_ips()
    print("Division Command 0.21 Alpha — Host")
    if sys.platform == "win32":
        try:
            import ctypes
            ctypes.windll.kernel32.SetConsoleTitleW("Division Command 0.21 Alpha")
        except Exception:
            pass
    print("Lokal:   http://127.0.0.1:%s" % HTTP_PORT)
    for ip in ips:
        print("Netz:    http://%s:%s" % (ip, HTTP_PORT))
    print("Hamachi: gleiche Adresse mit 25.x wenn Hamachi läuft")
    print("WebSocket-Port:", HTTP_PORT + 1)
    if sys.platform == "win32":
        try:
            import subprocess
            subprocess.run(
                ["netsh", "advfirewall", "firewall", "add", "rule",
                 "name=Division Command HTTP", "dir=in", "action=allow",
                 "protocol=TCP", "localport=" + str(HTTP_PORT)],
                check=False, capture_output=True)
            subprocess.run(
                ["netsh", "advfirewall", "firewall", "add", "rule",
                 "name=Division Command WS", "dir=in", "action=allow",
                 "protocol=TCP", "localport=" + str(HTTP_PORT + 1)],
                check=False, capture_output=True)
            subprocess.run(
                ["netsh", "advfirewall", "firewall", "add", "rule",
                 "name=Division Command Suche", "dir=in", "action=allow",
                 "protocol=UDP", "localport=" + str(UDP_PORT)],
                check=False, capture_output=True)
        except Exception:
            pass
        print("Falls Beitreten haengt: firewall.bat einmal als Administrator ausfuehren.")
    print("UDP-Suche Port:", UDP_PORT)
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nStop")


def main_from_launcher(name="Spieler", port=None):
    global HTTP_PORT, host_name
    if port:
        HTTP_PORT = port
    host_name = (name or "Spieler")[:24]
    sys.argv = [sys.argv[0], "--name", host_name, "--port", str(HTTP_PORT)]
    main()


if __name__ == "__main__":
    main()
