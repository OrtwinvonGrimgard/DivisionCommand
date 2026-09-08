@echo off
cd /d "%~dp0"
title Division Command 0.32c Alpha
echo Division Command 0.32c
echo Beende alte Python-Prozesse auf Port 8765 ...
for /f "tokens=5" %%P in ('netstat -ano ^| findstr ":8765" ^| findstr "LISTENING"') do (
  echo Beende PID %%P
  taskkill /F /PID %%P >nul 2>&1
)
timeout /t 1 /nobreak >nul
echo Starte Host und oeffne das Spiel...
python launcher.py
if errorlevel 1 py launcher.py
