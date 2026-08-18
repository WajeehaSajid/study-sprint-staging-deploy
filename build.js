/**
 * build.js
 * Build step for Study Sprint (Vite + React project).
 * 1. Runs `vite build` to produce the production bundle in /dist.
 * 2. Stamps the target environment (from APP_ENV) into dist/index.html,
 *    replacing the __APP_ENV__ placeholder with the real value.
 *
 * In a real CI/CD pipeline this is the step that runs automatically
 * before deploying to staging or production.
 */

import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const targetEnv = process.env.APP_ENV || "staging";

console.log(`==> Running vite build (target env: ${targetEnv})`);
execSync("npx vite build", { stdio: "inherit" });

const distFile = path.join(__dirname, "dist", "index.html");

let html = fs.readFileSync(distFile, "utf-8");
html = html.replaceAll("__APP_ENV__", targetEnv);
fs.writeFileSync(distFile, html);

console.log(`Build complete. Target environment: ${targetEnv}`);
console.log(`Output written to: ${distFile}`);
