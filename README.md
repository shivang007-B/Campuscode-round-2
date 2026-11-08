<div align="center">

# ⚡ CampusCode · The Student Hackathon Arena
### 🏆 ReBuild '26 Hackathon · Round 2: New UI & Architecture Design

[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![Status](https://img.shields.io/badge/Round_2-LIVE_SUBMISSION-2fe59e?style=for-the-badge&logo=codeforces&logoColor=black)](https://campuscode.co.in)
[![Tier](https://img.shields.io/badge/Tier-FINALIST-c084fc?style=for-the-badge&logo=target&logoColor=white)](https://campuscode.co.in)

<br/>

<p align="center">
  <b>A next-generation, high-performance digital arena for student builders, innovators, and hackathon competitors.</b><br/>
  Featuring an Obsidian-Emerald dark aesthetic, interactive canvas particles, sound-reactive video showcase, AI-driven team matchmaking, live round tracking, and cryptographically verified digital ID passes.
</p>

<p align="center">
  <a href="./JUDGES_NOTES.md"><b>📖 Read the Full Technical Evaluation Dossier for Judges →</b></a>
</p>

---

</div>

## 📌 Submission Overview · Round 2

| Specification | Details |
|:---|:---|
| **Hackathon** | **CampusCode Presents: ReBuild '26** |
| **Track** | Round 2: New UI & Architecture Recreation |
| **Team Name** | **`spacex's team`** |
| **Team ID** | `713ad00f-2af7-47f9-a146-497533715bdd` |
| **Current Status** | 🌟 **FINALIST TIER (Score: 94.2 pts · Rank #2)** |
| **Core Framework** | React 19 + TypeScript + Vite + Custom Canvas & SVG Graphics |
| **Deployment Target** | Vercel SPA (`vercel.json` optimized) |

---

## 🎨 What’s New in Round 2 UI

```
┌────────────────────────────────────────────────────────────────────────┐
│  🌌 Obsidian & Emerald Glassmorphism                                  │
│  ✨ Interactive Physics Canvas Particles (Poppable & Mouse Gravity)   │
│  🎥 Embedded Autoplay Video Showcase with Hover-to-Sound             │
│  🤖 HackMate AI Matchmaking & Real-Time Teammate Discovery            │
│  🧠 IdeaCheck AI Feasibility Scorer & RuleBot Assistant                │
│  🎫 3D Holographic Tilt Digital Identity Pass with Verified QR         │
│  🔒 Hardened Auth Guard (Strict Dashboard Login Protection)          │
│  🗓️ Vector Event Calendar Badges (Custom Squircle Container)          │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Key Modules & Architecture

### 1. 🌐 Landing Page (`src/components/campuscode.tsx`)
- **Interactive Physics Canvas**: Particle bubble wordmark rendered directly on HTML5 Canvas. Bubbles drift, scatter with pointer gravity, and pop with haptic feedback.
- **Sound-Reactive Showcase**: Beautiful framed `what-is-campuscode.mp4` video with hover sound activation and smooth mute toggle.
- **Dynamic Track Arenas**: AI Innovation, Future Web, Campus Tech, and Open Innovation cards with live progress bars.
- **Live Moon-Phase & Hackathon Tracker**: Real-time celestial rendering alongside active hackathons and submission countdowns.
- **Zero Broken Links**: Smart auto-scroll anchor navigation across all sections (`#mission`, `#projects`, `#nights`, `#join`).

### 2. 🛡️ Strict Auth Guard (`src/App.tsx`)
- **No Unauthorized Redirects**: Direct navigation to `#dashboard` without an active session immediately halts and redirects the user to `#login`.
- **Persistent Session State**: Automatic token & session storage synchronization via `localStorage` with graceful logout cleanup.

### 3. ⚡ Arena Dashboard (`src/pages/DashboardPage.tsx`)
- **Event / Live Hub (ReBuild '26)**:
  - 3-stage visual pipeline (`Round 1 - Recreate` ✅ ➔ `Round 2 - New UI` 🟢 LIVE ➔ `Round 3 - Finale` 🔒).
  - Live Team Record badge for **`spacex's team`**.
  - Interactive submission modal for GitHub repository and live preview URLs.
- **HackMate AI Matchmaking**:
  - Semantic compatibility match engine (95% fullstack, 92% systems, 88% UI/UX).
  - Custom in-app notification toasts matching the emerald-obsidian theme.
- **Digital Identity Pass**:
  - Live 3D tilt calculation with holographic specular reflections.
  - Offline QR scanner pass for on-campus verification and venue check-in.
- **Student Guide & RuleBot Assistant**:
  - Step-by-step 7-stage playbook for first-time competitors.
  - Interactive AI assistant answering round rules, scoring rubrics, and deadlines.
- **Certificates & Verified Credentials**:
  - Clean status tracking with `"NOT ISSUED YET"` badges pending jury evaluations.

---

## 📂 Project Directory Structure

```bash
campuscode/
├── public/
│   ├── campuscode-logo.png      # Official CampusCode brand mark
│   ├── what-is-campuscode.mp4   # Round 2 showcase video
│   ├── qr_scanner.png           # Public builder verification QR
│   ├── event_icon.png           # Vector-modeled calendar event glyph
│   └── avatar.png               # Default builder identity avatar
├── src/
│   ├── components/
│   │   └── campuscode.tsx       # Core Landing Page Component
│   ├── pages/
│   │   ├── DashboardPage.tsx    # Live Arena Hub & Round 2 Workspace
│   │   ├── LoginPage.tsx        # Obsidian-glass Login Interface
│   │   └── RegisterPage.tsx     # Student Onboarding & College Select
│   ├── App.tsx                  # App Router & Strict Auth Guard
│   ├── main.tsx                 # Application Mount Point
│   └── index.css                # Global Design Tokens & Typography
├── vercel.json                  # Production SPA Rewrite & Caching Config
├── vite.config.ts               # Vite Build & Asset Pipeline
└── package.json                 # Dependencies & Build Scripts
```

---

## 🛠️ Tech Stack & Libraries

<div align="center">

| Layer | Technologies |
|:---|:---|
| **Frontend** | React 19, TypeScript, Modern CSS3 Custom Properties |
| **Styling** | Dark Glassmorphism, CSS Grid & Flexbox, KaTeX Math |
| **Graphics** | HTML5 2D Canvas Engine, Scalable Vector Graphics (SVG) |
| **Bundler** | Vite 6.4 (ESBuild minification, sub-1.2s build time) |
| **Deployment** | Vercel Cloud Platform (Automatic Edge Rewrites) |

</div>

---

## 💻 Local Development

### 1. Clone the repository
```bash
git clone https://github.com/your-username/campuscode.git
cd campuscode
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for production
```bash
npm run build
```
Generates an optimized, production-ready static build inside `/dist`.

---

## 🚢 Deploy to Vercel

This repository includes a pre-configured `vercel.json` optimized for client-side routing:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

```bash
# Deploy via Vercel CLI
npm install -g vercel
vercel
```

---

## 👥 Team & Acknowledgments

- **Team**: **`spacex's team`**
- **Hackathon**: [CampusCode ReBuild '26](https://campuscode.co.in)
- **Developed with ❤️ for student innovators across India.**

<br/>

<div align="center">
  <sub>CampusCode © 2026 · The Student Hackathon Arena</sub>
</div>
