#!/usr/bin/env python3
"""Ein Doppelklick: Server an, Browser auf. Multiplayer-Host ist sofort bereit."""
from __future__ import annotations

import socket
import sys
import threading
import time
import webbrowser
from pathlib import Path

ROOT = Path(__file__).resolve().parent
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

import server  # noqa: E402


def wait_port(port: int, timeout: float = 8.0) -> bool:
    end = time.time() + timeout
    while time.time() < end:
        s = socket.socket()
        s.settimeout(0.3)
        try:
            s.connect(("127.0.0.1", port))
            s.close()
            return True
        except OSError:
            time.sleep(0.15)
        finally:
            try:
                s.close()
            except OSError:
                pass
    return False


def main():
    name = "Spieler"
    if len(sys.argv) > 1:
        name = sys.argv[1][:24]
    t = threading.Thread(target=lambda: server.main_from_launcher(name), daemon=False)
    t.start()
    if wait_port(server.HTTP_PORT):
        webbrowser.open("http://127.0.0.1:%s" % server.HTTP_PORT)
    t.join()


if __name__ == "__main__":
    main()
