@echo off
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0starthilfe.ps1"
if errorlevel 1 (
  echo.
  echo Starthilfe fehlgeschlagen. Fehlende Zips oder PowerShell blockiert.
)
pause
