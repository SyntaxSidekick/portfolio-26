@echo off
set "SCRIPT_DIR=%~dp0"
start "Portfolio Dev Stack" powershell.exe -NoProfile -WindowStyle Hidden -ExecutionPolicy Bypass -File "%SCRIPT_DIR%start-dev-tray.ps1"
