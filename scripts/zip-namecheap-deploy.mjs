import { spawnSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, "..");

const nextDir = path.join(projectRoot, ".next");
const standaloneDir = path.join(nextDir, "standalone");
const staticDir = path.join(nextDir, "static");
const publicDir = path.join(projectRoot, "public");
const envFile = path.join(projectRoot, ".env.production");

const distDir = path.join(projectRoot, "dist");
const bundleDir = path.join(distDir, "namecheap-deploy");
const zipFile = path.join(distDir, "namecheap-deploy.zip");

const rel = (target) => path.relative(projectRoot, target);

const missing = [standaloneDir, staticDir, publicDir].filter((target) => !existsSync(target));

if (missing.length > 0) {
  console.error("Missing deploy artifacts:");
  for (const target of missing) {
    console.error(`- ${rel(target)}`);
  }
  console.error('Run `npm run build` first (next.config.mjs must set output: "standalone").');
  process.exit(1);
}

// Assemble the bundle.
rmSync(bundleDir, { recursive: true, force: true });
rmSync(zipFile, { force: true });
mkdirSync(bundleDir, { recursive: true });

for (const entry of readdirSync(standaloneDir)) {
  cpSync(path.join(standaloneDir, entry), path.join(bundleDir, entry), { recursive: true });
}

mkdirSync(path.join(bundleDir, ".next"), { recursive: true });
cpSync(staticDir, path.join(bundleDir, ".next", "static"), { recursive: true });
cpSync(publicDir, path.join(bundleDir, "public"), { recursive: true });

if (existsSync(envFile)) {
  cpSync(envFile, path.join(bundleDir, ".env.production"));
}

// Checks worth failing or shouting about before the file goes to a server.
if (!existsSync(path.join(bundleDir, "server.js"))) {
  console.error("Bundle has no server.js — cPanel needs it as the startup file. Aborting.");
  process.exit(1);
}

const warnings = [];

if (!existsSync(envFile)) {
  warnings.push(
    ".env.production not found. NEXT_PUBLIC_* values are inlined at build time and the\n" +
      "  pages are pre-rendered, so a build without Supabase credentials bakes the fallback\n" +
      "  content into the bundle. Create it and rebuild before deploying."
  );
}

// sharp is what next/image uses to optimize on the fly. Without it in the
// bundle, every optimized image request fails at runtime on the server.
if (!existsSync(path.join(bundleDir, "node_modules", "sharp"))) {
  warnings.push(
    "sharp is not in the bundle. next/image optimization will fail on the server.\n" +
      "  Install it locally (`npm install sharp`) and rebuild."
  );
}

const zipResult = spawnSync("zip", ["-rq", zipFile, "."], { cwd: bundleDir, stdio: "inherit" });

if (zipResult.error) {
  console.error(`Failed to create zip: ${zipResult.error.message}`);
  process.exit(1);
}

if (typeof zipResult.status === "number" && zipResult.status !== 0) {
  process.exit(zipResult.status);
}

const megabytes = (statSync(zipFile).size / 1024 / 1024).toFixed(1);
console.log(`Created ${rel(zipFile)} (${megabytes} MB)`);
console.log(`Unzipped bundle left at ${rel(bundleDir)} for inspection.`);

for (const warning of warnings) {
  console.warn(`\nWARNING: ${warning}`);
}
