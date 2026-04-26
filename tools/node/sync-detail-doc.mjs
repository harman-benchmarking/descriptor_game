import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
const source = resolve(repoRoot, "docs", "descriptor-detail-pages.md");
const target = resolve(repoRoot, "app", "public", "docs", "descriptor-detail-pages.md");

mkdirSync(dirname(target), { recursive: true });
copyFileSync(source, target);
console.log(`Synced ${source} -> ${target}`);
