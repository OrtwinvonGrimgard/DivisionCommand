"""t283: Härtung von server.py (HTTP-Origin, Größenlimit, WebSocket-Origin und Sitzplätze).

Aufruf: python3 tests/test_server_t283.py (Teil von npm test). Startet server.py auf einem Zufallsport.
"""
import http.client
import json
import warnings
import os
import random
import subprocess
import sys
import time
from pathlib import Path

from websockets.sync.client import connect

warnings.simplefilter("ignore", DeprecationWarning)

ROOT = Path(__file__).resolve().parent.parent
PORT = random.randint(20500, 21400)


def req(method, path, body=None, headers=None):
    """HTTP-Anfrage an den Testserver; liefert (Status, Header-Dict)."""
    c = http.client.HTTPConnection("127.0.0.1", PORT, timeout=5)
    c.request(method, path, body=body, headers=headers or {})
    r = c.getresponse()
    r.read()
    return r.status, dict(r.getheaders())


def recv_until(ws, typ, timeout=2.0):
    """Liest Nachrichten bis zum gewünschten Typ; None bei Zeitüberschreitung."""
    end = time.time() + timeout
    while time.time() < end:
        try:
            m = json.loads(ws.recv(timeout=max(0.05, end - time.time())))
        except TimeoutError:
            return None
        if m.get("type") == typ:
            return m
    return None


def main():
    """Führt alle Prüfungen aus und beendet den Server."""
    env = dict(os.environ, DC_KEEP_ALIVE="1")
    srv = subprocess.Popen([sys.executable, str(ROOT / "Division_Command/server.py"), "--port", str(PORT)],
                           stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, env=env)
    try:
        for _ in range(60):
            try:
                if req("GET", "/api/status")[0] == 200:
                    break
            except OSError:
                time.sleep(0.15)
        st, hd = req("GET", "/api/status")
        assert st == 200 and hd.get("Access-Control-Allow-Origin") == "*", "Status lesbar"
        j = {"Content-Type": "application/json"}
        assert req("POST", "/api/name", "{}", dict(j, Origin="http://evil.example"))[0] == 403, "fremder Origin /api/name"
        assert req("POST", "/api/quit", "{}", dict(j, Origin="http://evil.example"))[0] == 403, "fremder Origin /api/quit"
        assert req("POST", "/api/export", "{}", dict(j, Origin="null"))[0] == 403, "Origin null /api/export"
        assert req("GET", "/api/status")[0] == 200, "Server lebt nach abgewiesenem Quit"
        st, hd = req("POST", "/api/name", json.dumps({"name": "Host"}), dict(j, Origin="http://127.0.0.1:%d" % PORT))
        assert st == 200 and "Access-Control-Allow-Origin" not in hd, "same-origin erlaubt, kein CORS auf POST"
        assert req("POST", "/api/name", "{}", dict(j, **{"Content-Length": str(9 * 1024 * 1024)}))[0] == 413, "Größenlimit"
        url = "ws://127.0.0.1:%d" % (PORT + 1)
        try:
            bad = connect(url, origin="http://evil.example", open_timeout=3)
            try:
                bad.recv(timeout=2)
                raise AssertionError("fremder WS-Origin nicht geschlossen")
            except Exception as exc:  # erwartet: Verbindung geschlossen
                assert "evil" not in str(exc)
        except AssertionError:
            raise
        except Exception:
            pass  # Handshake abgelehnt ist ebenfalls korrekt
        host = connect(url, origin="http://127.0.0.1:%d" % PORT)
        guest = connect(url, origin="http://192.168.1.20:8765")
        third = connect(url)
        host.send(json.dumps({"type": "hello", "name": "H"}))
        assert recv_until(host, "lobby")
        guest.send(json.dumps({"type": "hello", "name": "G"}))
        assert recv_until(guest, "lobby")
        third.send(json.dumps({"type": "hello", "name": "X"}))
        assert recv_until(third, "full"), "dritter Client ohne Sitzplatz"
        third.send(json.dumps({"type": "state", "state": {"fake": 1}}))
        third.send(json.dumps({"type": "action", "action": {"type": "END_TURN"}}))
        assert recv_until(guest, "state", 0.6) is None, "kein Stand von Client ohne Sitz"
        assert recv_until(host, "action", 0.6) is None, "keine Aktion von Client ohne Sitz"
        guest.send(json.dumps({"type": "state", "state": {"fake": 2}}))
        assert recv_until(host, "state", 0.6) is None, "Gast darf keinen Stand senden"
        guest.send(json.dumps({"type": "action", "action": {"type": "END_TURN"}}))
        assert recv_until(host, "action"), "Gast-Aktion erreicht Host"
        host.send(json.dumps({"type": "state", "seq": 1, "state": {}}))
        assert recv_until(guest, "state"), "Host-Stand erreicht Gast"
        for w in (host, guest, third):
            w.close()
        print("PASS server t283: Origin-/Same-Origin-Prüfung, Größenlimit, WS-Origin, nur Sitzinhaber, Rollen je Nachricht")
    finally:
        srv.terminate()
        try:
            srv.wait(5)
        except subprocess.TimeoutExpired:
            srv.kill()


if __name__ == "__main__":
    main()
