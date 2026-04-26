import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const root = resolve(__dirname, "..", "..", "app", "dist");
const port = Number(process.env.PORT ?? 4173);

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

if (!existsSync(root)) {
  console.error(`Build folder not found: ${root}`);
  console.error("Run npm run build inside app first.");
  process.exit(1);
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

server.listen(port, "127.0.0.1", () => {
  const url = `http://127.0.0.1:${port}`;
  console.log(`Descriptor Cards running at ${url}`);
});
