@echo off
setlocal

cd /d "%~dp0"

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
start "" "http://127.0.0.1:4173"
node launcher\local-server\server.mjs
