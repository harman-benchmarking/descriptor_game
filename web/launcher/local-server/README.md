# Descriptor Game launch paths

The browser version has two deliberately separate launch paths. Do not give the internal developer shortcut to external testers.

## External Windows testing

Distribute the complete `web/` folder with a prepared `app/dist/`, then ask the tester to double-click:

`Start Descriptor Game - TESTER.bat`

This launcher:

- requires Node.js but does not require `npm` or `node_modules`;
- validates that the local server and `app/dist/index.html` are present;
- never installs packages, synchronizes assets, or builds source files;
- keeps the server visible in the console and opens the browser only after the server is listening;
- reports an occupied port, incomplete package, or startup failure directly in the console.

The legacy low-level `launcher/start-windows.bat` entry point delegates to the same tester launcher. Keep the console window open while using the game; close it or press Ctrl+C to stop the server.

## Internal development

`Start Descriptor Game.bat` remains the source-tree developer shortcut. Its banner labels it as internal. It may install dependencies, synchronizes shared source assets, and runs a complete build before serving the result. This behavior is convenient when testing current source, but it is intentionally excluded from the external test path.

Developers can also run `npm run build` inside `app/` and start the local server manually:

```powershell
node launcher/local-server/server.mjs
```

The server serves `app/dist/` at `http://127.0.0.1:4173`. Set `DESCRIPTOR_OPEN_BROWSER=1` to open the default browser after the server is ready. Set `PORT` to use another valid local port.

If the configured port already hosts this Descriptor Game server, a second launcher opens the existing instance. If another application owns the port, startup stops with a clear error instead of opening an unrelated page.
