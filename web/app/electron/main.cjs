const { app, BrowserWindow, net, protocol, shell } = require("electron");
const { existsSync, statSync } = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");

const appOrigin = "descriptor-game://app";
const appRoot = path.resolve(__dirname, "..");
const distRoot = path.resolve(appRoot, "dist");
let mainWindow = null;

protocol.registerSchemesAsPrivileged([
  {
    scheme: "descriptor-game",
    privileges: {
      standard: true,
      secure: true,
      supportFetchAPI: true,
      corsEnabled: true,
      stream: true
    }
  }
]);

function isInsideDistRoot(filePath) {
  const relativePath = path.relative(distRoot, filePath);
  return Boolean(relativePath) && !relativePath.startsWith("..") && !path.isAbsolute(relativePath);
}

function resolveDistFile(requestUrl) {
  const url = new URL(requestUrl);
  const rawPathname = decodeURIComponent(url.pathname);
  const relativePath = rawPathname === "/" ? "index.html" : rawPathname.replace(/^[/\\]+/, "");
  const filePath = path.resolve(distRoot, relativePath);

  if (!isInsideDistRoot(filePath) || !existsSync(filePath) || statSync(filePath).isDirectory()) {
    return null;
  }

  return filePath;
}

async function registerAppProtocol() {
  protocol.handle("descriptor-game", (request) => {
    const filePath = resolveDistFile(request.url);

    if (!filePath) {
      return new Response("Not found", { status: 404 });
    }

    return net.fetch(pathToFileURL(filePath).toString());
  });
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 820,
    minWidth: 1024,
    minHeight: 700,
    title: "Descriptor Game",
    backgroundColor: "#101820",
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });

  mainWindow.setMenuBarVisibility(false);
  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    void shell.openExternal(url);
    return { action: "deny" };
  });

  mainWindow.webContents.on("will-navigate", (event, url) => {
    if (!url.startsWith(appOrigin)) {
      event.preventDefault();
      void shell.openExternal(url);
    }
  });

  void mainWindow.loadURL(`${appOrigin}/index.html`);

  if (!app.isPackaged && process.env.ELECTRON_OPEN_DEVTOOLS === "1") {
    mainWindow.webContents.openDevTools({ mode: "detach" });
  }
}

app.setName("Descriptor Game");
app.setAppUserModelId("com.descriptor.game");

app.whenReady().then(async () => {
  await registerAppProtocol();
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
