@echo off
setlocal
title Descriptor Game - External Tester Launcher

cd /d "%~dp0"

echo ============================================================
echo  Descriptor Game - EXTERNAL TESTER LAUNCHER
echo ============================================================
echo  This shortcut runs the prepared build. It never installs,
echo  synchronizes, or rebuilds project files.
echo ============================================================
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo [ERROR] Node.js is required to run this tester package.
  echo Install Node.js, then run this file again.
  echo No project files were changed.
  pause
  exit /b 1
)

if not exist "launcher\local-server\server.mjs" (
  echo [ERROR] The local server is missing:
  echo   launcher\local-server\server.mjs
  echo Re-extract or request a complete tester package.
  pause
  exit /b 1
)

if not exist "app\dist\index.html" (
  echo [ERROR] The prepared game build is missing:
  echo   app\dist\index.html
  echo Re-extract or request a complete tester package.
  echo Developers can create the build with the internal launcher.
  pause
  exit /b 1
)

echo Starting the prepared Descriptor Game build...
echo Keep this window open while testing. Press Ctrl+C to stop it.
echo The browser will open only after the server is ready.
echo.

set "DESCRIPTOR_OPEN_BROWSER=1"
node "launcher\local-server\server.mjs"
set "SERVER_EXIT=%ERRORLEVEL%"

if "%SERVER_EXIT%"=="0" exit /b 0

echo.
echo [ERROR] Descriptor Game stopped before it could run normally.
echo Review the server message above, then try again.
pause
exit /b %SERVER_EXIT%
