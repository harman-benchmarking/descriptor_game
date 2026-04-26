#!/bin/sh
cd "$(dirname "$0")/.."
xdg-open "http://127.0.0.1:4173" >/dev/null 2>&1 &
node launcher/local-server/server.mjs
