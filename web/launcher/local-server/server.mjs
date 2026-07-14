import { spawn } from "node:child_process";
import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer, get } from "node:http";
import { extname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const root = resolve(__dirname, "..", "..", "app", "dist");
const port = Number(process.env.PORT ?? 4173);
const host = "127.0.0.1";
const shouldOpenBrowser = process.env.DESCRIPTOR_OPEN_BROWSER === "1";
const healthPath = "/__descriptor_health";
const healthMarker = "descriptor-game-ready";

const mimeByExt = new Map([
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".webmanifest", "application/manifest+json; charset=utf-8"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".svg", "image/svg+xml"],
  [".wav", "audio/wav"],
  [".mp3", "audio/mpeg"],
  [".ogg", "audio/ogg"]
]);

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  console.error(`[ERROR] Invalid PORT value: ${process.env.PORT}`);
  console.error("PORT must be a whole number from 1 through 65535.");
  process.exit(1);
}

const entryFile = join(root, "index.html");
if (!existsSync(root) || !existsSync(entryFile)) {
  console.error(`[ERROR] Prepared build not found: ${entryFile}`);
  console.error("External testers should request a complete package.");
  console.error("Developers can run npm run build inside app first.");
  process.exit(1);
}

function openBrowser(url) {
  const commandByPlatform = {
    darwin: { command: "open", args: [url] },
    linux: { command: "xdg-open", args: [url] },
    win32: { command: "explorer.exe", args: [url] }
  };
  const launcher = commandByPlatform[process.platform];

  if (!launcher) {
    console.warn(`Open this address in a browser: ${url}`);
    return;
  }

  const child = spawn(launcher.command, launcher.args, {
    detached: true,
    stdio: "ignore",
    windowsHide: true
  });
  child.once("error", (error) => {
    console.warn(`[WARNING] The browser could not be opened automatically: ${error.message}`);
    console.warn(`Open this address manually: ${url}`);
  });
  child.unref();
}

function existingDescriptorServerIsReady() {
  return new Promise((resolveReady) => {
    const request = get(
      { host, port, path: healthPath, timeout: 1000 },
      (response) => {
        let body = "";
        response.setEncoding("utf8");
        response.on("data", (chunk) => {
          body += chunk;
        });
        response.on("end", () => {
          resolveReady(response.statusCode === 200 && body.trim() === healthMarker);
        });
      }
    );
    request.once("timeout", () => {
      request.destroy();
      resolveReady(false);
    });
    request.once("error", () => resolveReady(false));
  });
}

function resolveRequestPath(url) {
  const parsed = new URL(url, `http://localhost:${port}`);
  const decoded = decodeURIComponent(parsed.pathname);
  const candidate = normalize(join(root, decoded));
  if (!candidate.startsWith(root)) return null;
  if (!existsSync(candidate)) return join(root, "index.html");
  if (statSync(candidate).isDirectory()) return join(candidate, "index.html");
  return candidate;
}

const server = createServer((request, response) => {
  const requestUrl = new URL(request.url ?? "/", `http://${host}:${port}`);
  if (requestUrl.pathname === healthPath) {
    response.writeHead(200, {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store"
    });
    response.end(healthMarker);
    return;
  }

  const filePath = resolveRequestPath(request.url ?? "/");
  if (!filePath || !existsSync(filePath)) {
    response.writeHead(404);
    response.end("Not found");
    return;
  }

  response.writeHead(200, {
    "Content-Type": mimeByExt.get(extname(filePath)) ?? "application/octet-stream",
    "Cache-Control": "no-store"
  });
  createReadStream(filePath).pipe(response);
});

server.once("error", async (error) => {
  if (error.code === "EADDRINUSE") {
    const url = `http://${host}:${port}`;
    if (await existingDescriptorServerIsReady()) {
      console.log(`Descriptor Game is already running at ${url}`);
      if (shouldOpenBrowser) openBrowser(url);
      process.exit(0);
    }

    console.error(`[ERROR] Port ${port} is already in use by another application.`);
    console.error(`Close that application, or set PORT to a free port and try again.`);
    process.exit(1);
  }

  console.error(`[ERROR] Local server could not start: ${error.message}`);
  process.exit(1);
});

server.listen(port, host, async () => {
  const url = `http://${host}:${port}`;
  console.log(`Descriptor Cards running at ${url}`);
  if (shouldOpenBrowser) {
    if (await existingDescriptorServerIsReady()) {
      openBrowser(url);
    } else {
      console.warn("[WARNING] The server is listening, but its readiness check failed.");
      console.warn(`Open this address manually after retrying: ${url}`);
    }
  }
});
