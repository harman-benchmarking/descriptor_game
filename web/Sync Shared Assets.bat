@echo off
setlocal

cd /d "%~dp0app"

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is required to sync Descriptor Cards assets.
  pause
  exit /b 1
)

call npm.cmd run sync:shared
if errorlevel 1 (
  echo Shared asset sync failed.
  pause
  exit /b 1
)

echo Shared assets synced into web\app\public.
pause
