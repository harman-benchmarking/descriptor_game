#!/bin/sh
cd "$(dirname "$0")/.."
open "http://127.0.0.1:4173"
node launcher/local-server/server.mjs
