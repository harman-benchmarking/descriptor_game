import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const webRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
const workspaceRoot = resolve(webRoot, "..");
const source = resolve(workspaceRoot, "docs", "descriptor-detail-pages.md");
const target = resolve(webRoot, "app", "public", "docs", "descriptor-detail-pages.md");

mkdirSync(dirname(target), { recursive: true });
copyFileSync(source, target);
console.log(`Synced ${source} -> ${target}`);
