#!/bin/sh
cd "$(dirname "$0")"
python3 -m pip install --user pillow numpy
echo "Karteneditor: http://127.0.0.1:8080/editor.html"
python3 tools/serve.py
