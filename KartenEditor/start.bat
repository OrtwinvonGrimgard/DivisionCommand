@echo off
cd /d "%~dp0"
set PY=python
where python >nul 2>&1 || set PY=py
echo Pruefe Python-Pakete (Pillow, NumPy) ...
%PY% -m pip install --user pillow numpy
if errorlevel 1 (
  echo.
  echo Python oder pip fehlt. Bitte Python 3 von python.org installieren
  echo und beim Setup "Add python.exe to PATH" ankreuzen.
  pause
  exit /b 1
)
echo Karteneditor: http://127.0.0.1:8080/editor.html
start "" http://127.0.0.1:8080/editor.html
%PY% tools\serve.py
if errorlevel 1 pause
