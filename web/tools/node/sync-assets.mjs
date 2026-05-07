import { copyFileSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import { dirname, extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const webRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
const workspaceRoot = resolve(webRoot, "..");
const assetRoot = resolve(workspaceRoot, "assets-source");
const publicRoot = resolve(webRoot, "app", "public");
const imageExtensions = new Set([".png", ".jpg", ".jpeg", ".webp"]);
const discoveryIds = new Set([
  "0000",
  "powerful",
  "impactful",
  "shimmering",
  "tinny",
  "spitty",
  "metallic",
  "aggressive",
  "sharp",
  "crisp",
  "scooped",
  "distant",
  "lean",
  "empty",
  "faded",
  "full",
  "thick",
  "bassy",
  "vivid",
  "bloated",
  "muffled",
  "mellow",
  "chesty",
  "cupped",
  "pinched",
  "tubular",
  "brassy",
  "reedy",
  "cloudy",
  "canned",
  "brittle",
  "cold",
  "woolly",
  "fatiguing",
  "veiled",
  "energetic",
  "vintage",
  "plasticky",
  "congested",
  "exciting",
  "piercing",
  "buried",
  "precise",
  "diffuse",
  "intimate",
  "set-back",
  "spacious",
  "sluggish",
  "surging",
  "overdriven"
]);

function copyImages(sourceDir, targetDir, filter = () => true) {
  if (!existsSync(sourceDir)) {
    console.warn(`Skipped missing source folder: ${sourceDir}`);
    return 0;
  }

  mkdirSync(targetDir, { recursive: true });
  let copied = 0;

  for (const entry of readdirSync(sourceDir, { withFileTypes: true })) {
    if (!entry.isFile()) continue;
    const extension = extname(entry.name).toLowerCase();
    if (!imageExtensions.has(extension)) continue;
    if (!filter(entry.name)) continue;

    copyFileSync(resolve(sourceDir, entry.name), resolve(targetDir, entry.name));
    copied += 1;
  }

  return copied;
}

const descriptorSource = resolve(assetRoot, "descriptors");
const regionSource = resolve(assetRoot, "region");
const buildingSource = resolve(assetRoot, "buildings");
const descriptorCount = copyImages(descriptorSource, resolve(publicRoot, "icons", "descriptors"));
const regionCount = copyImages(regionSource, resolve(publicRoot, "icons", "regions"));
const buildingCount = copyImages(buildingSource, resolve(publicRoot, "icons", "buildings"));
const discoveryCount = copyImages(
  descriptorSource,
  resolve(publicRoot, "icons", "discoveries"),
  (fileName) => discoveryIds.has(fileName.replace(/\.[^.]+$/, ""))
);

console.log(
  `Synced ${descriptorCount} descriptor images, ${discoveryCount} discovery images, ${regionCount} region images, and ${buildingCount} building images.`
);
