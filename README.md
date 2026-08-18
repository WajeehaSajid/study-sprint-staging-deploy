# Study Sprint — Web Dev Stretch Task

A focus-session timer app (Pomodoro-style), rebuilt from a provided reference design to match spacing, states, dark mode, and responsiveness pixel-for-pixel.

🔗 **Live Demo:** [your-vercel-link-here](https://your-vercel-link-here.vercel.app)

![Accessibility Score](https://img.shields.io/badge/Lighthouse%20Accessibility-100%2F100-brightgreen)

---

## 🚀 How to Run This Project Locally

1. Clone this repository:
   ```bash
   git clone <your-repo-url>
   cd my-study-sprint
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open the link shown in your terminal (usually `http://localhost:5173`) in your browser.

---

## 🧩 Component Structure

The app is broken into small, reusable components instead of one large file, so nothing is duplicated across the UI.

```
src/
├── App.jsx                  → Main app: holds all state & logic, assembles the page
├── index.css                 → Design tokens (CSS variables) + hover/focus states
└── components/
    ├── TimerBoard.jsx         → The split-flap style digit tiles (MM : SS)
    ├── Button.jsx              → Reusable button (primary / ghost variants)
    ├── DurationButton.jsx      → The pill-shaped duration selector (Sprint / Deep / Short break)
    ├── StatCard.jsx             → Small stat block (used 3× for Today / Streak / Sprints)
    └── LogItem.jsx               → A single row in "Today's log"
```

**Why this structure?**
Each component represents one repeated UI pattern in the design. For example, `StatCard` is used three times with different `label` and `value` props instead of writing the same markup three times — this satisfies the "no duplicated markup blocks" requirement.

---

## 🎨 Design Tokens (Dark Mode)

All colors are defined as CSS custom properties in `index.css`, scoped under `:root[data-theme="light"]` and `:root[data-theme="dark"]`. Components never use hardcoded hex values — they reference variables like `var(--bg)`, `var(--ink)`, `var(--amber)`, etc.

Dark mode is toggled by setting a `data-theme` attribute on the `<html>` element (via `document.documentElement.setAttribute(...)` inside a `useEffect`), which is what makes the entire page — not just isolated elements — repaint correctly when the theme switches.

---

## ✅ Features Implemented

- **Timer logic** — Sprint (25m) / Deep work (50m) / Short break (5m), with accurate countdown via `setInterval` + cleanup on unmount.
- **Full interactive states**:
  - **Hover** — buttons brighten and lift slightly (`transform: translateY(-1px)`)
  - **Focus** — visible keyboard focus ring (`box-shadow` glow) for keyboard navigation
  - **Active** — buttons scale down slightly on click for tactile feedback
  - **Disabled** — duration buttons and Reset are disabled while a timer is running, with reduced opacity
  - **Loading** — "Save to log" shows a "Saving to log…" state for ~1.1s to simulate a network request
  - **Error** — saving randomly fails ~30% of the time and shows an inline error message, matching the reference file's simulated sync behavior
- **Responsive layout** — built with `flex-wrap` so the stats rail and hero card reflow underneath each other on mobile, rather than just scaling down.
- **Reusable, prop-driven components** (see structure above).
- **Accessibility** — Lighthouse Accessibility score: **100/100** (see `lighthouse-report.png`).

---

## 🤔 Decisions Made Where the Design Was Ambiguous

The reference file didn't specify how a sprint's task name should be captured, so I made the following judgment calls:

1. **Task naming — asked *after* the sprint, not before.**
   The reference design shows completed log entries with descriptive names (e.g. "Deep work — Bison grammar"), but never shows a UI for entering that name. I decided to show an optional text input **only after a sprint completes** — right before "Save to log" — rather than asking for a task name up front. Asking before starting would add friction to a tool whose whole purpose is to help someone start focusing quickly. Leaving it blank defaults to "Untitled sprint."

2. **"Discard" now logs a Skipped entry.**
   In the reference file, discarding a completed sprint simply resets the timer with no record. I changed this so Discard also adds an entry to the log with a "Skipped" status — this felt more true to a real productivity app, where you'd want a record of sprints you didn't save, and it reuses the existing "skipped" style already defined in the design tokens.

3. **Today / Streak / Sprints stats are static.**
   These values are hardcoded rather than calculated from actual usage, since real calculation would require persistent storage (a backend or local storage), which was outside the scope of this front-end-focused task.

---

## 🛠️ Tech Stack

- React (Vite)
- Tailwind CSS (utility classes for layout/spacing)
- Plain CSS custom properties for theming (no CSS-in-JS library)

---

## 📋 Deliverables Checklist

- [x] Deployed link / local run instructions (this README)
- [x] Lighthouse accessibility report — 100/100 (screenshot attached separately)
- [x] This README explaining component structure and design decisions
