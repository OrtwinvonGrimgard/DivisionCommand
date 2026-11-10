@echo off
echo Freigabe fuer Division Command (einmal als Administrator ausfuehren)
netsh advfirewall firewall delete rule name="Division Command HTTP" >nul 2>&1
netsh advfirewall firewall delete rule name="Division Command WS" >nul 2>&1
netsh advfirewall firewall delete rule name="Division Command Suche" >nul 2>&1
netsh advfirewall firewall add rule name="Division Command HTTP" dir=in action=allow protocol=TCP localport=8765
netsh advfirewall firewall add rule name="Division Command WS" dir=in action=allow protocol=TCP localport=8766
netsh advfirewall firewall add rule name="Division Command Suche" dir=in action=allow protocol=UDP localport=47831
echo.
echo Fertig. Beide Rechner brauchen diese Freigabe.
pause
