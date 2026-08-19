/**
 * server.js
 * Minimal Express server that serves the built Study Sprint app.
 * PORT and APP_ENV come from environment variables, so the exact
 * same server/code runs in staging or production — only the
 * environment configuration (port + APP_ENV) changes.
 */

import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;
const APP_ENV = process.env.APP_ENV || "development";

app.use(express.static(path.join(__dirname, "dist")));

// Health-check endpoint, commonly used by CI/CD pipelines to confirm
// a deployment succeeded before routing real traffic to it.
app.get("/health", (req, res) => {
  res.json({ status: "ok", environment: APP_ENV });
});

// Returns a random motivational quote for study sprints.
const quotes = [
  "Small steps every day add up to big progress.",
  "Focus on progress, not perfection.",
  "One sprint at a time.",
  "Discipline beats motivation.",
  "Done is better than perfect.",
];

app.get("/api/quote", (req, res) => {
  if (!quotes.length) {
    return res.status(500).json({ error: "No quotes available" });
  }
  const random = quotes[Math.floor(Math.random() * quotes.length)];
  res.json({ quote: random });
});

app.listen(PORT, () => {
  console.log(`Server running in [${APP_ENV}] mode on http://localhost:${PORT}`);
});