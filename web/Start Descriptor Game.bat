@echo off
setlocal
title Descriptor Game - Internal Developer Launcher

cd /d "%~dp0"

echo ============================================================
echo  Descriptor Game - INTERNAL DEVELOPER LAUNCHER
echo ============================================================
echo  This shortcut installs dependencies when needed, synchronizes
echo  source assets, and rebuilds the app before every launch.
echo.
echo  External testers should use:
echo    Start Descriptor Game - TESTER.bat
echo ============================================================
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is required to run Descriptor Cards.
  echo Install Node.js, then run this file again.
  pause
  exit /b 1
)

if not exist "app\node_modules" (
  echo Installing web app dependencies...
  pushd app
  call npm.cmd install
  if errorlevel 1 (
    popd
    echo Dependency installation failed.
    pause
    exit /b 1
  )
  popd
)

echo Building Descriptor Cards...
pushd app
call npm.cmd run build
if errorlevel 1 (
  popd
  echo Build failed.
  pause
  exit /b 1
)
popd

echo Starting Descriptor Cards at http://127.0.0.1:4173
echo The browser will open after the local server is ready.
set "DESCRIPTOR_OPEN_BROWSER=1"
node launcher\local-server\server.mjs
if errorlevel 1 (
  echo.
  echo Descriptor Cards could not start. Review the error above.
  pause
  exit /b 1
)
