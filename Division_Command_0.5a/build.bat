@echo off
cd /d "%~dp0"
title Division Command — EXE bauen
echo.
echo [1/3] Pruefe Python...
python --version || py --version || (
  echo Python 3 fehlt. Installieren von https://www.python.org/downloads/
  echo Haken setzen: "Add python.exe to PATH"
  pause
  exit /b 1
)

echo [2/3] Installiere Packer...
python -m pip install --upgrade pip
python -m pip install pyinstaller websockets

echo [3/3] Baue DivisionCommand.exe ...
python -m PyInstaller --noconfirm DivisionCommand.spec
copy /Y firewall.bat dist\DivisionCommand\ >nul
copy /Y README.txt dist\DivisionCommand\ >nul
echo firewall.bat liegt neben der EXE.

echo.
echo Fertig, wenn kein Fehler kam:
echo   %~dp0dist\DivisionCommand\DivisionCommand.exe
echo Diesen ganzen Ordner "dist\DivisionCommand" behalten — nicht nur die exe kopieren.
echo.
pause
