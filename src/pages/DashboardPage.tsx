"use client"
import * as React from "react"

export type DashboardUser = {
  name: string
  email: string
  college?: string
  tier?: string
  avatar?: string
}

export type DashboardPageProps = {
  user?: DashboardUser
  onLogout?: () => void
  onGoHome?: () => void
}

type TabKey =
  | "overview"
  | "events"
  | "my-events"
  | "hackmate"
  | "ideacheck"
  | "certificates"
  | "digital-card"
  | "rulebot"
  | "guide"
  | "comm"
  | "notifications"
  | "support"
  | "profile"

/* ------------------------------------------------------------------- CSS */

const CSS = `
/* Obsidian-Emerald Theme Strictly Matching Reference Image */
:root {
  --db-bg: #070b09;
  --db-bg-card: rgba(15, 23, 19, 0.72);
  --db-bg-card-hover: rgba(20, 31, 26, 0.85);
  --db-border: rgba(255, 255, 255, 0.065);
  --db-border-hover: rgba(47, 229, 158, 0.3);
  --db-emerald: #2fe59e;
  --db-emerald-glow: rgba(47, 229, 158, 0.35);
  --db-lilac: #9d7df8;
  --db-lime: #bef264;
  --db-text-main: #ffffff;
  --db-text-muted: #7e9187;
  --db-text-sub: #52635a;
}

.db-root {
  display: flex;
  height: 100svh;
  max-height: 100svh;
  width: 100%;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  background-color: var(--db-bg);
  background-image: 
    radial-gradient(circle at 82% 16%, rgba(16, 185, 129, 0.16) 0%, transparent 48%),
    radial-gradient(circle at 14% 78%, rgba(16, 185, 129, 0.08) 0%, transparent 42%),
    radial-gradient(circle at 50% 50%, rgba(6, 15, 11, 0.95) 0%, var(--db-bg) 100%);
  color: var(--db-text-main);
  overflow: hidden;
  position: relative;
}

.db-root *, .db-root *::before, .db-root *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* Ambient glow accents */
.db-ambient-glow {
  position: absolute;
  top: 0;
  right: 0;
  width: 520px;
  height: 480px;
  background: radial-gradient(circle, rgba(47, 229, 158, 0.12) 0%, transparent 70%);
  pointer-events: none;
  filter: blur(60px);
  z-index: 1;
}

/* Window frame */
.db-shell {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 2;
  overflow: hidden;
}

/* ── Top Header Navigation Bar ── */
.db-topbar {
  height: 72px;
  min-height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 28px;
  gap: 20px;
  z-index: 20;
}

.db-brand-box {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  background: none;
  border: none;
  color: #fff;
  text-align: left;
}
.db-brand-logo-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 30px;
  height: 28px;
}
.db-brand-name {
  font-size: 17px;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: #ffffff;
}
.db-brand-name span {
  color: var(--db-emerald);
}

/* Search capsule */
.db-search-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 999px;
  padding: 8px 18px;
  width: min(380px, 34vw);
  transition: all .2s;
}
.db-search-bar:focus-within {
  background: rgba(255, 255, 255, 0.07);
  border-color: rgba(47, 229, 158, 0.4);
  box-shadow: 0 0 15px rgba(47, 229, 158, 0.15);
}
.db-search-icon {
  color: var(--db-text-muted);
  flex-shrink: 0;
}
.db-search-input {
  background: transparent;
  border: none;
  outline: none;
  color: #ffffff;
  font-size: 13px;
  font-family: inherit;
  width: 100%;
}
.db-search-input::placeholder {
  color: #63776e;
}

/* Header right user info */
.db-top-right {
  display: flex;
  align-items: center;
  gap: 16px;
}
.db-user-greeting {
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  letter-spacing: -0.01em;
}
.db-avatar-wrap {
  position: relative;
  width: 36px;
  height: 36px;
  cursor: pointer;
}
.db-avatar-img {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  display: block;
  border: 1.5px solid rgba(47, 229, 158, 0.4);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}
.db-status-dot {
  position: absolute;
  bottom: 0px;
  right: 0px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #2fe59e;
  border: 2px solid #070b09;
  box-shadow: 0 0 8px #2fe59e;
}

/* ── Content Layout with Left Icon Dock ── */
.db-container {
  display: flex;
  flex: 1;
  min-height: 0;
  padding: 0 24px 20px 20px;
  gap: 22px;
  overflow: hidden;
}

/* Left Icon Dock */
.db-nav-dock {
  width: 62px;
  flex-shrink: 0;
  background: rgba(14, 22, 18, 0.72);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.065);
  border-radius: 26px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 8px;
  gap: 10px;
  height: calc(100% - 4px);
  overflow-y: auto;
  scrollbar-width: none;
}
.db-nav-dock::-webkit-scrollbar { display: none; }

.db-dock-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: transparent;
  border: 1px solid transparent;
  color: #788d82;
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: all .2s cubic-bezier(.2,.8,.2,1);
  position: relative;
  flex-shrink: 0;
}
.db-dock-btn:hover {
  background: rgba(255, 255, 255, 0.07);
  color: #ffffff;
  border-color: rgba(255, 255, 255, 0.1);
}
/* Exact Match Active Pill Button from reference image */
.db-dock-btn[data-active="true"] {
  background: #ffffff;
  color: #080c0a;
  border-color: #ffffff;
  box-shadow: 0 4px 18px rgba(255, 255, 255, 0.28);
}
.db-dock-btn[data-active="true"] svg {
  stroke: #080c0a;
}
.db-dock-btn svg {
  width: 20px;
  height: 20px;
  transition: stroke .2s;
}

.db-dock-divider {
  width: 28px;
  height: 1px;
  background: rgba(255, 255, 255, 0.08);
  margin: 6px 0;
  flex-shrink: 0;
}

/* Tooltip on hover */
.db-dock-btn .db-tooltip {
  position: absolute;
  left: 56px;
  background: rgba(14, 23, 19, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #ffffff;
  padding: 5px 12px;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transform: translateX(-6px);
  transition: all .18s ease;
  z-index: 50;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
}
.db-dock-btn:hover .db-tooltip {
  opacity: 1;
  transform: translateX(0);
}

/* Main workspace area */
.db-main-scroll {
  flex: 1;
  height: 100%;
  overflow-y: auto;
  min-width: 0;
  padding-right: 6px;
  scrollbar-width: thin;
  scrollbar-color: rgba(47, 229, 158, 0.25) transparent;
}
.db-main-scroll::-webkit-scrollbar {
  width: 6px;
}
.db-main-scroll::-webkit-scrollbar-track {
  background: transparent;
}
.db-main-scroll::-webkit-scrollbar-thumb {
  background: rgba(47, 229, 158, 0.2);
  border-radius: 999px;
}

/* ── OVERVIEW TAB STYLING ── */
.db-overview-root {
  display: flex;
  flex-direction: column;
  gap: 22px;
  padding-bottom: 28px;
}

/* Heading & Filter Row */
.db-overview-header {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.db-overview-title-wrap {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 18px;
  flex-wrap: wrap;
}
.db-overview-title {
  font-size: clamp(32px, 3.4vw, 40px);
  font-weight: 800;
  color: #ffffff;
  letter-spacing: -0.025em;
  line-height: 1.15;
}
.db-overview-counter {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 800;
  color: var(--db-emerald);
  background: rgba(47, 229, 158, 0.12);
  border: 1px solid rgba(47, 229, 158, 0.25);
  padding: 7px 16px;
  border-radius: 999px;
}

.db-pills-row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}
.db-pill {
  padding: 9px 24px;
  border-radius: 999px;
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #889e93;
  transition: all .2s;
  font-family: inherit;
}
.db-pill:hover {
  background: rgba(255, 255, 255, 0.08);
  color: #ffffff;
  border-color: rgba(255, 255, 255, 0.15);
}
.db-pill[data-active="true"] {
  background: var(--db-emerald);
  color: #070c09;
  border-color: var(--db-emerald);
  font-weight: 700;
  box-shadow: 0 4px 18px rgba(47, 229, 158, 0.35);
}

/* 2-Column Grid Layout */
.db-grid-main {
  display: grid;
  grid-template-columns: 1.34fr 1fr;
  gap: 24px;
}
@media (max-width: 1080px) {
  .db-grid-main {
    grid-template-columns: 1fr;
  }
}

/* Standard Glass Card */
.db-card {
  background: var(--db-bg-card);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid var(--db-border);
  border-radius: 26px;
  padding: 26px 28px;
  position: relative;
  overflow: hidden;
  transition: border-color .2s, box-shadow .2s;
}
.db-card:hover {
  border-color: rgba(255, 255, 255, 0.14);
}

.db-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}
.db-card-title {
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: -0.01em;
}
.db-card-action {
  font-size: 13px;
  font-weight: 600;
  color: #8da497;
  cursor: pointer;
  background: none;
  border: none;
  font-family: inherit;
  transition: color .2s;
}
.db-card-action:hover {
  color: var(--db-emerald);
}

/* ── Bar Chart Widget ("Arena Flow") ── */
.db-chart-wrap {
  display: flex;
  gap: 16px;
  height: 210px;
  align-items: flex-end;
  padding-bottom: 8px;
  position: relative;
}
.db-y-axis {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding-bottom: 24px;
  font-size: 11px;
  color: #63776e;
  font-weight: 600;
}
.db-bars-area {
  flex: 1;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  height: 100%;
  padding-bottom: 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  position: relative;
}
.db-bar-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  height: 100%;
  justify-content: flex-end;
  position: relative;
}
.db-bar-pill {
  width: 44px;
  border-radius: 14px;
  position: relative;
  transition: transform .25s ease;
  cursor: pointer;
}
.db-bar-pill:hover {
  transform: scaleY(1.03);
}

/* Cross-hatched textured pattern bars from reference image */
.db-bar-textured {
  background-color: rgba(255, 255, 255, 0.04);
  background-image: 
    radial-gradient(rgba(47, 229, 158, 0.35) 1.5px, transparent 1.5px),
    repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.06) 1.5px, transparent 1.5px, transparent 6px),
    repeating-linear-gradient(-45deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.06) 1.5px, transparent 1.5px, transparent 6px);
  background-size: 12px 12px, 8px 8px, 8px 8px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

/* Highlighted Lilac Jul Bar */
.db-bar-highlight {
  background: linear-gradient(180deg, #aa8df8 0%, #8d6af6 100%);
  box-shadow: 0 4px 20px rgba(157, 125, 248, 0.45);
}
.db-bar-tooltip-wrap {
  position: absolute;
  top: -46px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
}
.db-tooltip-bubble {
  background: #0d1713;
  border: 1px solid rgba(255, 255, 255, 0.16);
  color: #ffffff;
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  white-space: nowrap;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.5);
}
.db-tooltip-pin {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #ffffff;
  border: 3px solid #9d7df8;
  margin-top: 4px;
  box-shadow: 0 0 10px rgba(157, 125, 248, 0.8);
}
.db-x-label {
  position: absolute;
  bottom: -24px;
  font-size: 11px;
  font-weight: 600;
  color: #63776e;
}

/* ── Subgrid (Available Donut + Stat Stack) ── */
.db-subgrid-left {
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  gap: 18px;
  margin-top: 20px;
}
@media (max-width: 820px) {
  .db-subgrid-left {
    grid-template-columns: 1fr;
  }
}

/* Donut Chart Widget */
.db-donut-card {
  padding: 22px 24px;
}
.db-donut-body {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: 8px;
}
.db-donut-chart {
  position: relative;
  width: 116px;
  height: 116px;
  flex-shrink: 0;
}
.db-donut-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  pointer-events: none;
}
.db-donut-val {
  font-size: 20px;
  font-weight: 800;
  color: #ffffff;
  line-height: 1;
}
.db-donut-sub {
  font-size: 9.5px;
  color: #7a8e83;
  margin-top: 3px;
}
.db-donut-legend {
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
}
.db-legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
}
.db-legend-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex-shrink: 0;
}
.db-legend-name {
  color: #a4b6ad;
  font-weight: 500;
}
.db-legend-val {
  color: #ffffff;
  font-weight: 700;
  margin-left: auto;
}

/* Mini Stat Stack */
.db-stat-stack {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.db-mini-stat-card {
  background: var(--db-bg-card);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--db-border);
  border-radius: 18px;
  padding: 15px 18px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.db-mini-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.db-mini-title {
  font-size: 13px;
  color: #7a8e83;
  font-weight: 600;
}
.db-mini-dots {
  color: #63776e;
  font-size: 14px;
  cursor: pointer;
}
.db-mini-main {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.db-mini-amount {
  font-size: 24px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: -0.02em;
}
.db-pct-pill {
  font-size: 11px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 999px;
}
.db-pct-pill[data-positive="true"] {
  background: rgba(47, 229, 158, 0.18);
  color: var(--db-emerald);
}
.db-pct-pill[data-positive="false"] {
  background: rgba(157, 125, 248, 0.22);
  color: #bca4fa;
}
.db-mini-foot {
  font-size: 11px;
  color: #63776e;
}

/* ── RIGHT COLUMN: 3D My Card & Activities ── */
.db-right-col {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* 3D Radiant Emerald Glowing Glass Card Deck */
.db-my-card-deck {
  position: relative;
  width: 100%;
  padding-top: 14px;
}
.db-card-layer-back2 {
  position: absolute;
  top: 0;
  left: 6%;
  right: 6%;
  height: 60px;
  border-radius: 18px;
  background: rgba(16, 185, 129, 0.18);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}
.db-card-layer-back1 {
  position: absolute;
  top: 7px;
  left: 3%;
  right: 3%;
  height: 60px;
  border-radius: 20px;
  background: rgba(16, 185, 129, 0.32);
  backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.12);
}
.db-emerald-card {
  position: relative;
  background: linear-gradient(135deg, #10b981 0%, #059669 45%, #047857 100%);
  border-radius: 22px;
  padding: 22px 24px;
  border: 1px solid rgba(255, 255, 255, 0.28);
  box-shadow: 
    0 20px 45px -10px rgba(5, 150, 105, 0.5),
    inset 0 1px 1px 0 rgba(255, 255, 255, 0.45);
  overflow: hidden;
  z-index: 5;
}
.db-card-radiant-glow {
  position: absolute;
  top: -40px;
  right: -40px;
  width: 220px;
  height: 220px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(167, 243, 208, 0.5) 0%, transparent 65%);
  pointer-events: none;
}
.db-emerald-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}
.db-card-bal-lbl {
  font-size: 11px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.85);
}
.db-card-bal-val {
  font-size: 28px;
  font-weight: 900;
  color: #ffffff;
  letter-spacing: -0.02em;
  margin-top: 4px;
}
.db-card-plus-btn {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: #ffffff;
  color: #080c0a;
  border: none;
  font-size: 22px;
  font-weight: 700;
  display: grid;
  place-items: center;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.25);
  transition: transform .2s, box-shadow .2s;
  font-family: inherit;
}
.db-card-plus-btn:hover {
  transform: scale(1.08);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.35);
}
.db-emerald-bottom {
  margin-top: 26px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.db-card-num {
  font-size: 13.5px;
  letter-spacing: 0.14em;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.92);
}
.db-card-exp {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.75);
  font-weight: 600;
}

/* ── Activities List ── */
.db-tx-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 10px;
}
.db-tx-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.db-tx-left {
  display: flex;
  align-items: center;
  gap: 12px;
}
.db-tx-icon-badge {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  font-weight: 800;
  font-size: 13px;
}
.db-tx-title {
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
}
.db-tx-sub {
  font-size: 11px;
  color: #7a8e83;
}
.db-tx-amount {
  font-size: 13px;
  font-weight: 700;
  color: var(--db-emerald);
}

/* ── Split Bottom Row (Hackmates & Momentum Wave) ── */
.db-split-bottom {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}
.db-split-card {
  background: var(--db-bg-card);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--db-border);
  border-radius: 20px;
  padding: 16px 18px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.db-split-title {
  font-size: 14px;
  font-weight: 700;
  color: #ffffff;
}
.db-friends-text {
  font-size: 10.5px;
  color: #7a8e83;
  line-height: 1.4;
  margin: 4px 0 10px;
}
.db-avatar-group {
  display: flex;
  align-items: center;
}
.db-stack-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid #0d1612;
  margin-left: -8px;
  display: grid;
  place-items: center;
  font-size: 10px;
  font-weight: 800;
  color: #fff;
}
.db-stack-avatar:first-child {
  margin-left: 0;
}

/* Spending neon wave SVG chart */
.db-spending-chart {
  width: 100%;
  height: 48px;
  margin-top: 8px;
}
.db-spending-wave {
  stroke: var(--db-emerald);
  stroke-width: 3.5;
  fill: none;
  stroke-linecap: round;
  filter: drop-shadow(0 0 8px rgba(47, 229, 158, 0.7));
}

/* ── Hero Invitation Banner (Original ReBuild '26 Content) ── */
.db-hero-glass {
  background: linear-gradient(135deg, rgba(16, 28, 22, 0.85) 0%, rgba(10, 18, 14, 0.92) 100%);
  border: 1px solid rgba(47, 229, 158, 0.28);
  border-radius: 24px;
  padding: 26px 30px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 16px 40px -10px rgba(0, 0, 0, 0.6);
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 24px;
  align-items: center;
}
.db-hero-glow {
  position: absolute;
  top: -60px;
  right: -60px;
  width: 320px;
  height: 320px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(47, 229, 158, 0.18) 0%, transparent 68%);
  filter: blur(45px);
  pointer-events: none;
}
.db-hero-tag {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: .12em;
  color: var(--db-emerald);
  text-transform: uppercase;
}
.db-hero-title {
  font-size: clamp(28px, 3.8vw, 44px);
  font-weight: 900;
  letter-spacing: -.03em;
  color: #ffffff;
  margin: 6px 0 10px;
  line-height: 1;
}
.db-hero-body {
  font-size: 13.5px;
  line-height: 1.6;
  color: #9eb0a5;
  max-width: 74ch;
  margin-bottom: 20px;
}
.db-hero-avatars {
  display: flex;
  align-items: center;
}
.db-hero-avatar-main {
  width: 68px;
  height: 68px;
  border-radius: 50%;
  background: rgba(14, 25, 20, 0.95);
  border: 2.5px solid var(--db-emerald);
  display: grid;
  place-items: center;
  font-size: 32px;
  box-shadow: 0 0 25px rgba(47, 229, 158, 0.35);
  z-index: 2;
}
.db-hero-avatar-sub {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: var(--db-emerald);
  color: #070c09;
  font-weight: 900;
  font-size: 18px;
  display: grid;
  place-items: center;
  margin-left: -18px;
  box-shadow: 0 0 20px rgba(47, 229, 158, 0.5);
  z-index: 1;
}

/* ── 4 Stats Grid (Original Content: Applications, Selections, Rank, Shortlisted) ── */
.db-stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
@media (max-width: 860px) {
  .db-stats-row {
    grid-template-columns: repeat(2, 1fr);
  }
}
.db-stat-box {
  background: var(--db-bg-card);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--db-border);
  border-radius: 20px;
  padding: 18px 22px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.db-stat-box-lbl {
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: #7a8e83;
}
.db-stat-box-val {
  font-size: 38px;
  font-weight: 900;
  letter-spacing: -.03em;
  color: #ffffff;
  line-height: 1;
  margin: 4px 0 2px;
}
.db-stat-box-sub {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .06em;
  color: var(--db-emerald);
  text-transform: uppercase;
}

/* ── Featured Events (Original Content) ── */
.db-featured-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 18px;
}

.db-arena-btn {
  padding: 12px 24px;
  border-radius: 999px;
  background: var(--db-emerald);
  color: #070c09;
  border: none;
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
  transition: all .2s;
  font-family: inherit;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  box-shadow: 0 4px 16px rgba(47, 229, 158, 0.35);
}
.db-arena-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(47, 229, 158, 0.5);
}

/* ── OTHER TABS GENERAL STYLING ── */
.db-section-header {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 26px;
}
.db-section-kicker {
  font-size: 12.5px;
  font-weight: 800;
  letter-spacing: .12em;
  color: var(--db-emerald);
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 8px;
}
.db-section-title {
  font-size: clamp(34px, 3.8vw, 44px);
  font-weight: 850;
  letter-spacing: -0.025em;
  color: #ffffff;
  line-height: 1.15;
}
.db-section-sub {
  font-size: 15px;
  color: #94a89d;
  line-height: 1.6;
  max-width: 78ch;
}

/* Event Cards Grid */
.db-events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 24px;
}
.db-event-card {
  padding: 26px 28px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 22px;
}
.db-event-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.db-event-tag {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .1em;
  color: #8da497;
  text-transform: uppercase;
}
.db-event-pill-live {
  background: rgba(47, 229, 158, 0.15);
  color: var(--db-emerald);
  font-size: 11px;
  font-weight: 800;
  padding: 4px 11px;
  border-radius: 999px;
  border: 1px solid rgba(47, 229, 158, 0.3);
}
.db-event-pill-done {
  background: rgba(255, 255, 255, 0.05);
  color: #b0c2b8;
  font-size: 11px;
  font-weight: 800;
  padding: 4px 11px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}
.db-event-badge {
  width: 50px;
  height: 50px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  display: grid;
  place-items: center;
  font-weight: 900;
  color: #ffffff;
  font-size: 17px;
}

/* ── Student Guide Playbook & Rules ── */
.db-guide-root {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.db-playbook-banner {
  background: linear-gradient(135deg, rgba(16, 28, 22, 0.85) 0%, rgba(10, 18, 14, 0.92) 100%);
  border: 1px solid rgba(47, 229, 158, 0.28);
  border-radius: 22px;
  padding: 24px 28px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.db-steps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}
.db-step-card {
  background: var(--db-bg-card);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--db-border);
  border-radius: 22px;
  padding: 24px 26px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: all .2s;
}
.db-step-card:hover {
  border-color: rgba(47, 229, 158, 0.35);
  transform: translateY(-2px);
}
.db-step-num {
  font-size: 30px;
  font-weight: 900;
  color: var(--db-emerald);
  letter-spacing: -0.02em;
  line-height: 1;
}
.db-step-title {
  font-size: 17px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: -0.01em;
}
.db-step-desc {
  font-size: 14px;
  color: #8da497;
  line-height: 1.55;
}
.db-do-avoid-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}
@media (max-width: 820px) {
  .db-do-avoid-grid {
    grid-template-columns: 1fr;
  }
}
.db-rule-box {
  background: var(--db-bg-card);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 28px 30px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.db-rule-box[data-type="do"] {
  border: 1px solid rgba(47, 229, 158, 0.25);
}
.db-rule-box[data-type="avoid"] {
  border: 1px solid rgba(248, 113, 113, 0.25);
}
.db-rule-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 13px;
  line-height: 1.5;
  color: #c5d6cc;
}
.db-rule-icon {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-size: 11px;
  font-weight: 900;
  flex-shrink: 0;
  margin-top: 1px;
}
.db-rule-icon[data-type="do"] {
  background: rgba(47, 229, 158, 0.2);
  color: var(--db-emerald);
}
.db-rule-icon[data-type="avoid"] {
  background: rgba(248, 113, 113, 0.2);
  color: #f87171;
}
.db-accordion-wrap {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.db-accordion-item {
  background: var(--db-bg-card);
  border: 1px solid var(--db-border);
  border-radius: 16px;
  overflow: hidden;
  transition: all .2s;
}
.db-accordion-item:hover {
  border-color: rgba(255, 255, 255, 0.12);
}
.db-accordion-head {
  padding: 18px 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  background: none;
  border: none;
  width: 100%;
  text-align: left;
  font-family: inherit;
  font-size: 15px;
  font-weight: 700;
  color: #ffffff;
}
.db-accordion-symbol {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.06);
  display: grid;
  place-items: center;
  font-size: 16px;
  font-weight: 700;
  color: var(--db-emerald);
  flex-shrink: 0;
}
.db-accordion-body {
  padding: 0 22px 18px;
  font-size: 13.5px;
  color: #8fa599;
  line-height: 1.6;
}

/* ── Official Communication Page ── */
.db-comm-hero {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(168, 85, 247, 0.08) 50%, rgba(47, 229, 158, 0.05) 100%);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 24px;
  padding: 32px 36px;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: 0 16px 40px -10px rgba(0, 0, 0, 0.5);
}
.db-comm-hero-inner {
  display: flex;
  align-items: flex-start;
  gap: 24px;
}
.db-comm-icon-badge {
  width: 58px;
  height: 58px;
  border-radius: 18px;
  background: linear-gradient(135deg, #a855f7 0%, #7e22ce 100%);
  display: grid;
  place-items: center;
  flex-shrink: 0;
  box-shadow: 0 8px 24px rgba(168, 85, 247, 0.4);
}
.db-comm-two-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
@media (max-width: 820px) {
  .db-comm-two-grid {
    grid-template-columns: 1fr;
  }
}

/* ── Help & Support 3-Card Grid ── */
.db-support-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
@media (max-width: 960px) {
  .db-support-grid {
    grid-template-columns: 1fr;
  }
}
.db-support-card {
  background: var(--db-bg-card);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--db-border);
  border-radius: 22px;
  padding: 26px 28px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;
  transition: all .2s;
}
.db-support-card:hover {
  border-color: rgba(255, 255, 255, 0.16);
  transform: translateY(-2px);
}
.db-support-num-pill {
  width: fit-content;
  background: rgba(168, 85, 247, 0.15);
  color: #c084fc;
  font-weight: 800;
  font-size: 11.5px;
  padding: 4px 10px;
  border-radius: 8px;
  border: 1px solid rgba(168, 85, 247, 0.3);
}
.db-support-btn-outline {
  width: fit-content;
  padding: 10px 22px;
  border-radius: 12px;
  background: transparent;
  border: 1.5px solid rgba(255, 255, 255, 0.16);
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all .2s;
  font-family: inherit;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.db-support-btn-outline:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.3);
}

/* ── Journey Hub View ── */
.db-journey-root {
  display: flex;
  flex-direction: column;
  gap: 26px;
  animation: dbFadeIn 0.3s ease-out;
}
.db-journey-back {
  width: fit-content;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 20px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.14);
  color: #ffffff;
  font-size: 12.5px;
  font-weight: 700;
  cursor: pointer;
  transition: all .2s;
  font-family: inherit;
}
.db-journey-back:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.28);
  transform: translateX(-3px);
}
.db-journey-banner {
  background: #ffffff;
  color: #070c0a;
  border-radius: 26px;
  padding: 30px 36px;
  display: flex;
  align-items: center;
  gap: 26px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
}
.db-journey-banner-bg-ribbon {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 45%;
  background: linear-gradient(135deg, transparent 20%, rgba(120, 214, 26, 0.12) 50%, rgba(93, 107, 255, 0.14) 100%);
  pointer-events: none;
}
.db-journey-banner-logo {
  width: 92px;
  height: 92px;
  border-radius: 22px;
  background: #090e12;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.35);
}
.db-journey-info-strip {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 20px;
  background: var(--db-bg-card);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--db-border);
  border-radius: 22px;
  padding: 24px 28px;
}
@media (max-width: 780px) {
  .db-journey-info-strip {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
.db-pipeline-card {
  background: var(--db-bg-card);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--db-border);
  border-radius: 22px;
  padding: 26px 28px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.db-pipeline-track {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-top: 6px;
}
.db-pipeline-step {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 22px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all .2s;
  cursor: pointer;
}
.db-pipeline-step:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}
.db-pipeline-step[data-active="true"] {
  border-color: rgba(93, 107, 255, 0.5);
  background: rgba(93, 107, 255, 0.08);
  box-shadow: 0 0 20px rgba(93, 107, 255, 0.2);
}
.db-pipeline-num {
  width: 38px;
  height: 38px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.08);
  display: grid;
  place-items: center;
  font-size: 18px;
  font-weight: 900;
  color: #ffffff;
}
.db-team-record-card {
  background: var(--db-bg-card);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--db-border);
  border-radius: 22px;
  padding: 24px 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

/* Modal Overlay */
.db-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(4, 8, 6, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  z-index: 100;
  display: grid;
  place-items: center;
  padding: 20px;
}
.db-modal-box {
  max-width: 560px;
  width: 100%;
  max-height: 85vh;
  overflow-y: auto;
  padding: 28px;
  position: relative;
  background: rgba(14, 23, 19, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 24px;
  box-shadow: 0 30px 70px rgba(0, 0, 0, 0.7);
}
.db-modal-close {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  border: none;
  color: #ffffff;
  font-size: 16px;
  cursor: pointer;
  display: grid;
  place-items: center;
}

/* ── Glass Toast Notification ── */
.db-toast-container {
  position: fixed;
  top: 24px;
  right: 28px;
  z-index: 99999;
  animation: dbToastSlideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  pointer-events: auto;
}
@keyframes dbToastSlideIn {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
@keyframes dbToastProgress {
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
}
.db-toast-card {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 320px;
  max-width: 440px;
  padding: 16px 20px 18px 16px;
  background: rgba(10, 19, 14, 0.94);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(47, 229, 158, 0.35);
  border-radius: 18px;
  box-shadow: 
    0 24px 50px rgba(0, 0, 0, 0.75),
    0 0 25px rgba(47, 229, 158, 0.14),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
}
.db-toast-icon {
  width: 38px;
  height: 38px;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(47, 229, 158, 0.22) 0%, rgba(190, 242, 100, 0.15) 100%);
  border: 1px solid rgba(47, 229, 158, 0.45);
  color: var(--db-emerald);
  display: grid;
  place-items: center;
  flex-shrink: 0;
  box-shadow: 0 0 16px rgba(47, 229, 158, 0.25);
}
.db-toast-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
}
.db-toast-kicker {
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.14em;
  color: var(--db-lime);
  display: flex;
  align-items: center;
  gap: 6px;
}
.db-toast-kicker::before {
  content: "";
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--db-emerald);
  box-shadow: 0 0 8px var(--db-emerald);
}
.db-toast-msg {
  font-size: 13.5px;
  font-weight: 600;
  color: #f1f5f3;
  line-height: 1.45;
  word-break: break-word;
}
.db-toast-close {
  background: transparent;
  border: none;
  color: #7a8e83;
  cursor: pointer;
  padding: 4px 6px;
  font-size: 14px;
  border-radius: 6px;
  transition: all 0.15s;
  line-height: 1;
}
.db-toast-close:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.08);
}
.db-toast-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2.5px;
  background: linear-gradient(90deg, var(--db-emerald), var(--db-lime));
  animation: dbToastProgress 4.2s linear forwards;
}
`

/* ── Calendar Event Icon Component (matching user's uploaded icon) ── */
export function EventCalendarIcon({
  size = 26,
  color = "currentColor",
  style,
}: {
  size?: number
  color?: string
  style?: React.CSSProperties
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      stroke={color}
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ overflow: "visible", display: "block", ...style }}
    >
      {/* 2 Binder Rings at Top */}
      <rect x="25" y="7" width="10" height="23" rx="5" fill="none" stroke={color} strokeWidth="6" />
      <rect x="65" y="7" width="10" height="23" rx="5" fill="none" stroke={color} strokeWidth="6" />

      {/* Calendar Outer Frame with Dog-Eared Bottom-Right Corner */}
      <path
        d="M 18 26
           H 82
           A 13 13 0 0 1 95 39
           V 70
           L 75 90
           H 31
           A 13 13 0 0 1 18 77
           V 39
           A 13 13 0 0 1 31 26"
        fill="none"
        stroke={color}
        strokeWidth="6"
      />

      {/* Folded Corner Flap */}
      <path
        d="M 75 90
           V 77
           A 7 7 0 0 1 82 70
           H 95"
        fill="none"
        stroke={color}
        strokeWidth="5.5"
      />

      {/* Horizontal Divider Line */}
      <line x1="18" y1="42" x2="95" y2="42" stroke={color} strokeWidth="6" />

      {/* Day Cells: Row 1 */}
      <rect x="27" y="51" width="12" height="12" rx="3" fill="none" stroke={color} strokeWidth="5" />
      <rect x="47" y="51" width="12" height="12" rx="3" fill="none" stroke={color} strokeWidth="5" />
      <rect x="67" y="51" width="12" height="12" rx="3" fill="none" stroke={color} strokeWidth="5" />

      {/* Day Cells: Row 2 */}
      <rect x="27" y="71" width="12" height="12" rx="3" fill="none" stroke={color} strokeWidth="5" />

      {/* Star Icon in Row 2 Middle */}
      <path
        d="M 53 66.5
           L 55.4 71.8
           L 61.2 72.2
           L 56.8 76
           L 58.2 81.6
           L 53 78.4
           L 47.8 81.6
           L 49.2 76
           L 44.8 72.2
           L 50.6 71.8 Z"
        fill="none"
        stroke={color}
        strokeWidth="4.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/* ── Standard Event Badge replacing generic 'FQ' and 'RE' ── */
export function EventBadge({
  type,
  badge,
  size = 50,
  style,
}: {
  type?: string
  badge?: string
  size?: number
  style?: React.CSSProperties
}) {
  const isQuiz = type === "quizzes" || badge === "FQ"
  const color = isQuiz ? "#c084fc" : "#2fe59e"
  const bg = isQuiz ? "rgba(168, 85, 247, 0.16)" : "rgba(47, 229, 158, 0.16)"
  const borderColor = isQuiz ? "rgba(168, 85, 247, 0.38)" : "rgba(47, 229, 158, 0.38)"

  return (
    <div
      className="db-event-badge"
      style={{
        width: size,
        height: size,
        borderRadius: Math.round(size * 0.28),
        background: bg,
        border: `1.5px solid ${borderColor}`,
        color: color,
        display: "grid",
        placeItems: "center",
        flexShrink: 0,
        boxShadow: `0 4px 16px ${isQuiz ? "rgba(168, 85, 247, 0.25)" : "rgba(47, 229, 158, 0.25)"}`,
        ...style,
      }}
    >
      <EventCalendarIcon size={Math.round(size * 0.54)} color={color} />
    </div>
  )
}

/* ---------------------------------------------------------------- COMPONENT */

export default function DashboardPage({
  user = { name: "Shivang Singhal", email: "spacex@campuscode.co.in", college: "Anna University", avatar: "/avatar.png" },
  onLogout,
  onGoHome,
}: DashboardPageProps) {
  const [activeTab, setActiveTab] = React.useState<TabKey>("overview")
  const [activeFilter, setActiveFilter] = React.useState<string>("All")
  const [eventFilter, setEventFilter] = React.useState<"all" | "hackathons" | "quizzes">("all")
  const [selectedHackathon, setSelectedHackathon] = React.useState<string>("")
  const [rulebotHackathon, setRulebotHackathon] = React.useState<string>("")
  const [rulebotChat, setRulebotChat] = React.useState<{ from: "user" | "bot"; text: string }[]>([])
  const [rulebotInput, setRulebotInput] = React.useState<string>("")
  const [notifFilter, setNotifFilter] = React.useState<"unread" | "all">("unread")
  const [copiedLink, setCopiedLink] = React.useState<boolean>(false)
  const [faqModal, setFaqModal] = React.useState<boolean>(false)
  const [journeyModal, setJourneyModal] = React.useState<boolean>(false)
  const [detailsModal, setDetailsModal] = React.useState<any>(null)
  const [openGuideFaq, setOpenGuideFaq] = React.useState<number | null>(0)
  const [activeJourney, setActiveJourney] = React.useState<string | null>(null)
  const [journeySubTab, setJourneySubTab] = React.useState<string>("Overview")
  const [toast, setToast] = React.useState<{ id: number; title: string; message: string } | null>(null)

  const showToast = React.useCallback((message: string, title: string = "NOTIFICATION") => {
    const id = Date.now()
    setToast({ id, title, message })
  }, [])

  React.useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => {
      setToast(null)
    }, 4200)
    return () => clearTimeout(timer)
  }, [toast])

  const [notificationsList, setNotificationsList] = React.useState([
    {
      id: 1,
      title: "Round is Live",
      date: "Nov 06, 2026",
      body: "Hello students ReBuild'26 hackathon round 1 is Live . You can submit your live demo + GitHub before 10pm toady",
      unread: true,
    },
    {
      id: 2,
      title: "Create your team",
      date: "Nov 05, 2026",
      body: "hello guys when you join the event using invite code you need to create a team . to create team go to hackmate ai select rebuild hackathon then create your team name",
      unread: true,
    },
  ])

  const studentName = user.name || "Shivang Singhal"
  const firstName = studentName.split(" ")[0] || "Shivang"
  const avatarUrl = user.avatar || "/avatar.png"
  const initials = studentName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  const unreadCount = notificationsList.filter((n) => n.unread).length

  function markAsRead(id: number) {
    setNotificationsList((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    )
  }

  function markAllRead() {
    setNotificationsList((prev) => prev.map((n) => ({ ...n, unread: false })))
  }

  function handleCopyProfileLink() {
    navigator.clipboard?.writeText("https://www.campuscode.co.in/student/CC-XF989T")
    setCopiedLink(true)
    showToast("Public profile link copied to clipboard!", "DIGITAL IDENTITY")
    setTimeout(() => setCopiedLink(false), 2000)
  }

  function handleSendRulebot() {
    if (!rulebotInput.trim()) return
    const q = rulebotInput.trim()
    setRulebotChat((prev) => [...prev, { from: "user", text: q }])
    setRulebotInput("")
    setTimeout(() => {
      let ans = "In ReBuild '26, you build individually under your team tracking name 'spacex'. Submit your GitHub and video link before Friday 10 PM IST."
      if (q.toLowerCase().includes("ai")) {
        ans = "Yes! Modern AI coding tools (Antigravity, Copilot, ChatGPT) are fully permitted for architecture, speed, and styling as long as you can explain every module."
      } else if (q.toLowerCase().includes("team")) {
        ans = "You can participate solo or collaborate with up to 3 peers. In ReBuild '26, judging is individual but teams receive special cohort bonus points."
      } else if (q.toLowerCase().includes("round 2")) {
        ans = "Round 2 takes place Saturday morning for the top 20 submissions from Round 1. Winners receive ₹50,000 cash prizes and internship interviews."
      }
      setRulebotChat((prev) => [...prev, { from: "bot", text: ans }])
    }, 600)
  }

  const allEvents = [
    {
      id: "rebuild-26",
      type: "hackathons",
      code: "e2798ce3-a1b5-4806-9147-4d9f10c52ef1",
      badge: "RE",
      badgeDark: false,
      title: "ReBuild '26",
      kicker: "CAMPUSCODE PRESENTS",
      subtitle: "THE DASHBOARD RECREATION HACKATHON",
      status: "LIVE",
      perks: ["CERTIFICATE FOR WINNERS", "INTERNSHIP OPPORTUNITY", "REGISTER BY 6 NOV 2026"],
      description:
        "ReBuild '26 is an individual dashboard-to-hackathon invitation by CampusCode. You participate alone, but you must create a team name for tracking. Round 1: Recreate CampusCode portal faithfully.",
      category: "Frontend & Fullstack",
      team: "spacex",
    },
    {
      id: "firstcommit-20",
      type: "quizzes",
      code: "20864c76-4702-4b09-a2e9-ff6764bf20d6",
      badge: "FQ",
      badgeDark: false,
      title: "FirstCommit '26 Quiz Competition 2.0",
      kicker: "CAMPUSCODE",
      subtitle: "AI / WEB TECH CHALLENGE",
      status: "COMPLETED",
      score: "50",
      perks: ["RANK CERTIFICATE", "CAMPUS BADGE"],
      description: "Fast-paced engineering intelligence quiz testing algorithms, web performance, and modern cloud deployment architectures.",
      category: "Quiz • Solo • Timed",
      team: "NOT ASSIGNED",
    },
    {
      id: "firstcommit-10",
      type: "quizzes",
      code: "80299fc1-3c30-466f-a146-fd45c77c04be",
      badge: "FQ",
      badgeDark: true,
      title: "FirstCommit '26 Quiz Competition",
      kicker: "CAMPUSCODE",
      subtitle: "PRE-SEASON ARENA",
      status: "COMPLETED",
      score: "50",
      perks: ["PARTICIPATION CERTIFICATE"],
      description: "The preliminary entry challenge for first-year builders stepping into competitive technical hackathons.",
      category: "Quiz • Solo • Timed",
      team: "NOT ASSIGNED",
    },
  ]

  const filteredEvents = allEvents.filter((ev) => {
    if (eventFilter === "hackathons") return ev.type === "hackathons"
    if (eventFilter === "quizzes") return ev.type === "quizzes"
    return true
  })

  // Navigation Items matching the left vertical dock in reference image
  const navTabs: { key: TabKey; label: string; icon: React.ReactNode }[] = [
    {
      key: "overview",
      label: "My Dashboard",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
    },
    {
      key: "events",
      label: "Events & Hackathons",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
      ),
    },
    {
      key: "my-events",
      label: "My Activity",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      ),
    },
    {
      key: "digital-card",
      label: "Digital ID Card",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
          <line x1="1" y1="10" x2="23" y2="10" />
        </svg>
      ),
    },
    {
      key: "hackmate",
      label: "HackMate AI",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M10 9a2 2 0 1 1 4 0" />
          <path d="M12 13v4" />
          <circle cx="12" cy="19" r="0.5" />
        </svg>
      ),
    },
    {
      key: "ideacheck",
      label: "IdeaCheck AI",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="9" y1="18" x2="15" y2="18" />
          <line x1="10" y1="22" x2="14" y2="22" />
          <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
        </svg>
      ),
    },
    {
      key: "certificates",
      label: "Certificates",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="6" />
          <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
        </svg>
      ),
    },
    {
      key: "rulebot",
      label: "RuleBot AI",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ),
    },
    {
      key: "guide",
      label: "Student Guide",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      ),
    },
    {
      key: "comm",
      label: "Communication",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
        </svg>
      ),
    },
    {
      key: "notifications",
      label: `Notifications (${unreadCount})`,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      ),
    },
    {
      key: "support",
      label: "Help & Support",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      ),
    },
    {
      key: "profile",
      label: "Profile",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
  ]

  return (
    <>
      <style>{CSS}</style>
      <div className="db-root">
        <div className="db-ambient-glow" />

        <div className="db-shell">
          {/* ── Top Header Navigation Bar ── */}
          <header className="db-topbar">
            {/* Left Brand Logo */}
            <button className="db-brand-box" type="button" onClick={onGoHome} title="CampusCode Home">
              <div className="db-brand-logo-icon">
                <svg width="24" height="22" viewBox="0 0 108 100" fill="none" style={{ overflow: "visible", flexShrink: 0 }}>
                  <rect x="18" y="10" width="18" height="80" rx="4" transform="skewX(-18)" fill="#ffffff" />
                  <rect x="52" y="10" width="18" height="80" rx="4" transform="skewX(-18)" fill="#5d6bff" />
                  <rect x="86" y="10" width="18" height="80" rx="4" transform="skewX(-18)" fill="#78d61a" />
                </svg>
              </div>
              <span className="db-brand-name">Campus<span>Code</span></span>
            </button>

            {/* Central Capsule Search Bar */}
            <div className="db-search-bar">
              <span className="db-search-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </span>
              <input
                type="text"
                className="db-search-input"
                placeholder="Search events, arena, teams..."
                defaultValue=""
              />
            </div>

            {/* Right User Status */}
            <div className="db-top-right">
              <span className="db-user-greeting">Hi {firstName}!</span>
              <div
                className="db-avatar-wrap"
                onClick={() => setActiveTab("profile")}
                title="Open Profile"
              >
                <img
                  src={avatarUrl}
                  alt={studentName}
                  className="db-avatar-img"
                />
                <span className="db-status-dot" />
              </div>
            </div>
          </header>

          {/* ── Main Workspace with Left Rail Dock ── */}
          <div className="db-container">
            {/* Left Vertical Icon Dock */}
            <nav className="db-nav-dock">
              {navTabs.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  className="db-dock-btn"
                  data-active={activeTab === tab.key ? "true" : "false"}
                  onClick={() => setActiveTab(tab.key)}
                  aria-label={tab.label}
                >
                  {tab.icon}
                  <span className="db-tooltip">{tab.label}</span>
                </button>
              ))}

              <div className="db-dock-divider" />

              <button
                type="button"
                className="db-dock-btn"
                onClick={onLogout}
                title="Log Out"
                aria-label="Log Out"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                <span className="db-tooltip">Log Out</span>
              </button>
            </nav>

            {/* Main Scroll Content Area */}
            <main className="db-main-scroll">
              {/* ════════════════════ TAB 1: OVERVIEW (ORIGINAL CONTENT + REFERENCE DESIGN) ════════════════════ */}
              {activeTab === "overview" && (
                <div className="db-overview-root">
                  {/* Top Welcome Title & Filter Pills */}
                  <div className="db-overview-header">
                    <div className="db-overview-title-wrap">
                      <div>
                        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: ".1em", color: "var(--db-emerald)", textTransform: "uppercase", marginBottom: 4 }}>
                          ● STUDENT WORKSPACE / LIVE
                        </div>
                        <h1 className="db-overview-title">
                          Welcome Back, {studentName.toUpperCase()}.
                        </h1>
                      </div>
                      <div className="db-overview-counter">
                        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--db-emerald)" }} />
                        03 LIVE DATA
                      </div>
                    </div>

                    <div className="db-pills-row">
                      {["All", "Hackathons", "Quizzes", "Team spacex"].map((p) => (
                        <button
                          key={p}
                          type="button"
                          className="db-pill"
                          data-active={activeFilter === p ? "true" : "false"}
                          onClick={() => {
                            setActiveFilter(p)
                            if (p === "Hackathons") setEventFilter("hackathons")
                            else if (p === "Quizzes") setEventFilter("quizzes")
                            else setEventFilter("all")
                          }}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 2-Column Grid Matching Reference Image Design with Student Content */}
                  <div className="db-grid-main">
                    {/* ──── LEFT COLUMN ──── */}
                    <div className="db-left-col">
                      {/* 1. Bar Chart: Arena Activity Flow */}
                      <div className="db-card">
                        <div className="db-card-header">
                          <div>
                            <h2 className="db-card-title">Arena Activity Flow</h2>
                            <span style={{ fontSize: 11, color: "#63776e" }}>Monthly submissions &amp; commit checkpoints</span>
                          </div>
                          <button
                            type="button"
                            className="db-card-action"
                            onClick={() => setActiveTab("events")}
                          >
                            View All &gt;
                          </button>
                        </div>

                        <div className="db-chart-wrap">
                          {/* Y Axis */}
                          <div className="db-y-axis">
                            <span>2.5K</span>
                            <span>2.0K</span>
                            <span>1.5K</span>
                            <span>1.0K</span>
                            <span>0.5K</span>
                            <span>0</span>
                          </div>

                          {/* Bars */}
                          <div className="db-bars-area">
                            {/* Mar */}
                            <div className="db-bar-col">
                              <div className="db-bar-pill db-bar-textured" style={{ height: "105px" }} />
                              <span className="db-x-label">Mar</span>
                            </div>

                            {/* Apr */}
                            <div className="db-bar-col">
                              <div className="db-bar-pill db-bar-textured" style={{ height: "135px" }} />
                              <span className="db-x-label">Apr</span>
                            </div>

                            {/* May */}
                            <div className="db-bar-col">
                              <div className="db-bar-pill db-bar-textured" style={{ height: "92px" }} />
                              <span className="db-x-label">May</span>
                            </div>

                            {/* Jun */}
                            <div className="db-bar-col">
                              <div className="db-bar-pill db-bar-textured" style={{ height: "125px" }} />
                              <span className="db-x-label">Jun</span>
                            </div>

                            {/* Jul (Highlighted with tooltip) */}
                            <div className="db-bar-col">
                              <div className="db-bar-tooltip-wrap">
                                <span className="db-tooltip-bubble">+820 PTS • ROUND 1 LIVE</span>
                                <span className="db-tooltip-pin" />
                              </div>
                              <div className="db-bar-pill db-bar-highlight" style={{ height: "155px" }} />
                              <span className="db-x-label" style={{ color: "#ffffff", fontWeight: 700 }}>Jul</span>
                            </div>

                            {/* Aug */}
                            <div className="db-bar-col">
                              <div className="db-bar-pill db-bar-textured" style={{ height: "130px" }} />
                              <span className="db-x-label">Aug</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 2. Sub-Grid: Event Distribution Donut + Stat Stack */}
                      <div className="db-subgrid-left">
                        {/* Donut Chart: Tracks */}
                        <div className="db-card db-donut-card">
                          <div className="db-card-header" style={{ marginBottom: 12 }}>
                            <h3 className="db-card-title">Track Distribution</h3>
                            <button
                              type="button"
                              className="db-card-action"
                              onClick={() => setActiveTab("my-events")}
                            >
                              View All &gt;
                            </button>
                          </div>

                          <div className="db-donut-body">
                            {/* Donut SVG with 3 thick segments */}
                            <div className="db-donut-chart">
                              <svg width="116" height="116" viewBox="0 0 120 120" style={{ transform: "rotate(-90deg)" }}>
                                {/* Segment 1: Lilac (Hackathons) */}
                                <circle
                                  cx="60"
                                  cy="60"
                                  r="44"
                                  fill="none"
                                  stroke="#9d7df8"
                                  strokeWidth="14"
                                  strokeDasharray="115 276"
                                  strokeDashoffset="0"
                                  strokeLinecap="round"
                                />
                                {/* Segment 2: Lime Yellow-Green (Quizzes) */}
                                <circle
                                  cx="60"
                                  cy="60"
                                  r="44"
                                  fill="none"
                                  stroke="#bef264"
                                  strokeWidth="14"
                                  strokeDasharray="65 276"
                                  strokeDashoffset="-128"
                                  strokeLinecap="round"
                                />
                                {/* Segment 3: Mint Emerald (Arena Rank) */}
                                <circle
                                  cx="60"
                                  cy="60"
                                  r="44"
                                  fill="none"
                                  stroke="#2fe59e"
                                  strokeWidth="14"
                                  strokeDasharray="80 276"
                                  strokeDashoffset="-200"
                                  strokeLinecap="round"
                                />
                              </svg>

                              <div className="db-donut-center">
                                <div className="db-donut-val">03</div>
                                <div className="db-donut-sub">Active Events</div>
                              </div>
                            </div>

                            {/* Legend */}
                            <div className="db-donut-legend">
                              <div className="db-legend-item">
                                <span className="db-legend-dot" style={{ background: "#9d7df8" }} />
                                <span className="db-legend-name">ReBuild '26</span>
                                <span className="db-legend-val">Live</span>
                              </div>
                              <div className="db-legend-item">
                                <span className="db-legend-dot" style={{ background: "#bef264" }} />
                                <span className="db-legend-name">FirstCommit</span>
                                <span className="db-legend-val">50/50</span>
                              </div>
                              <div className="db-legend-item">
                                <span className="db-legend-dot" style={{ background: "#2fe59e" }} />
                                <span className="db-legend-name">Univ Rank</span>
                                <span className="db-legend-val">#2</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Mini Stat Stack (Applications & Selections) */}
                        <div className="db-stat-stack">
                          {/* Applications */}
                          <div className="db-mini-stat-card">
                            <div className="db-mini-header">
                              <span className="db-mini-title">Applications</span>
                              <span className="db-mini-dots">···</span>
                            </div>
                            <div className="db-mini-main">
                              <span className="db-mini-amount">3</span>
                              <span className="db-pct-pill" data-positive="true">+12%</span>
                            </div>
                            <span className="db-mini-foot">From 120 total actions</span>
                          </div>

                          {/* Selections */}
                          <div className="db-mini-stat-card">
                            <div className="db-mini-header">
                              <span className="db-mini-title">Selections</span>
                              <span className="db-mini-dots">···</span>
                            </div>
                            <div className="db-mini-main">
                              <span className="db-mini-amount">1</span>
                              <span className="db-pct-pill" data-positive="false">Round 1</span>
                            </div>
                            <span className="db-mini-foot">Shortlisted for Arena Demo</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ──── RIGHT COLUMN ──── */}
                    <div className="db-right-col">
                      {/* 1. 3D Digital Pass Card Stack */}
                      <div className="db-card" style={{ padding: "20px 22px" }}>
                        <div className="db-card-header" style={{ marginBottom: 12 }}>
                          <div>
                            <h2 className="db-card-title">Digital Identity Pass</h2>
                            <span style={{ fontSize: 11, color: "#63776e" }}>Verified student builder credential</span>
                          </div>
                          <button
                            type="button"
                            className="db-card-action"
                            onClick={() => setActiveTab("digital-card")}
                          >
                            View All &gt;
                          </button>
                        </div>

                        <div className="db-my-card-deck">
                          {/* 3D background card layers */}
                          <div className="db-card-layer-back2" />
                          <div className="db-card-layer-back1" />

                          {/* Front Glowing Emerald Card */}
                          <div className="db-emerald-card">
                            <div className="db-card-radiant-glow" />

                            <div className="db-emerald-top">
                              <div>
                                <span className="db-card-bal-lbl">Total Arena Points</span>
                                <div className="db-card-bal-val">2,240 PTS</div>
                              </div>
                              <button
                                type="button"
                                className="db-card-plus-btn"
                                onClick={() => setActiveTab("digital-card")}
                                title="Print / Expand Pass"
                              >
                                +
                              </button>
                            </div>

                            <div className="db-emerald-bottom">
                              <div className="db-card-num">CC-XF989T-2026</div>
                              <div className="db-card-exp">TEAM: SPACEX • ANNA UNIVERSITY</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 2. Recent Arena Activity List */}
                      <div className="db-card" style={{ padding: "20px 22px" }}>
                        <div className="db-card-header" style={{ marginBottom: 14 }}>
                          <h3 className="db-card-title">Recent Submissions</h3>
                          <button
                            type="button"
                            className="db-card-action"
                            onClick={() => setActiveTab("my-events")}
                          >
                            View All &gt;
                          </button>
                        </div>

                        <div className="db-tx-list">
                          {/* ReBuild '26 */}
                          <div className="db-tx-item">
                            <div className="db-tx-left">
                              <div className="db-tx-icon-badge" style={{ background: "rgba(47, 229, 158, 0.15)", color: "var(--db-emerald)", border: "1px solid rgba(47, 229, 158, 0.3)" }}>
                                RE
                              </div>
                              <div>
                                <div className="db-tx-title">ReBuild '26 Round 1</div>
                                <div className="db-tx-sub">Dashboard Recreation Demo</div>
                              </div>
                            </div>
                            <span className="db-tx-amount">LIVE • 10 PM</span>
                          </div>

                          {/* FirstCommit Quiz */}
                          <div className="db-tx-item">
                            <div className="db-tx-left">
                              <div className="db-tx-icon-badge" style={{ background: "rgba(189, 242, 100, 0.15)", color: "var(--db-lime)", border: "1px solid rgba(189, 242, 100, 0.3)" }}>
                                FQ
                              </div>
                              <div>
                                <div className="db-tx-title">FirstCommit Quiz 2.0</div>
                                <div className="db-tx-sub">Rank 1 • Verified Badge</div>
                              </div>
                            </div>
                            <span className="db-tx-amount">+500 PTS</span>
                          </div>

                          {/* HackMate */}
                          <div className="db-tx-item">
                            <div className="db-tx-left">
                              <div className="db-tx-icon-badge" style={{ background: "rgba(157, 125, 248, 0.15)", color: "var(--db-lilac)", border: "1px solid rgba(157, 125, 248, 0.3)" }}>
                                HM
                              </div>
                              <div>
                                <div className="db-tx-title">Team spacex</div>
                                <div className="db-tx-sub">Solo Track Confirmed</div>
                              </div>
                            </div>
                            <span className="db-tx-amount">VERIFIED</span>
                          </div>
                        </div>
                      </div>

                      {/* 3. Split Bottom: Team Friends + Arena Momentum */}
                      <div className="db-split-bottom">
                        {/* Team Friends */}
                        <div className="db-split-card">
                          <div>
                            <h4 className="db-split-title">Team spacex</h4>
                            <p className="db-friends-text">Collaborate with peers in Anna Univ arena</p>
                          </div>
                          <div className="db-avatar-group">
                            <img
                              src={avatarUrl}
                              alt="You"
                              className="db-stack-avatar"
                              style={{ objectFit: "cover", border: "2px solid #0d1612" }}
                            />
                            <div className="db-stack-avatar" style={{ background: "#ec4899" }}>AS</div>
                            <div className="db-stack-avatar" style={{ background: "#3b82f6" }}>PS</div>
                            <div className="db-stack-avatar" style={{ background: "#8b5cf6" }}>KR</div>
                            <div
                              className="db-stack-avatar"
                              style={{ background: "#2fe59e", color: "#080c0a", cursor: "pointer", fontWeight: 900 }}
                              onClick={() => setActiveTab("hackmate")}
                              title="Find teammates with HackMate AI"
                            >
                              +
                            </div>
                          </div>
                        </div>

                        {/* Arena Velocity Wave */}
                        <div className="db-split-card">
                          <h4 className="db-split-title">Momentum</h4>
                          <svg className="db-spending-chart" viewBox="0 0 160 50">
                            <path
                              d="M 5 36 C 25 10, 40 45, 60 22 C 80 5, 95 48, 115 28 C 130 15, 145 35, 155 18"
                              className="db-spending-wave"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ── ReBuild '26 Invitation Hero Banner (Original Content) ── */}
                  <div className="db-hero-glass">
                    <div className="db-hero-glow" />
                    <div>
                      <div className="db-hero-tag">BUILD · LEARN · SHIP &amp; COMPETE</div>
                      <h2 className="db-hero-title">ReBuild '26</h2>
                      <p className="db-hero-body">
                        ReBuild '26 is an individual dashboard-to-hackathon invitation by CampusCode. You participate alone, but you must create a team name for tracking and use it on your Unstop registration, the CampusCode portal and every submission. Round 1: Recreate the CampusCode user flow faithfully — Dashboard, Login, Register, and Student dashboard — and submit your demo any time till 10 PM.
                      </p>
                      <button
                        type="button"
                        className="db-arena-btn"
                        onClick={() => {
                          setActiveTab("my-events")
                          setActiveJourney("rebuild-26")
                        }}
                      >
                        OPEN EVENT JOURNEY ↗
                      </button>
                    </div>

                    <div className="db-hero-avatars">
                      <img src={avatarUrl} alt={studentName} className="db-hero-avatar-main" style={{ objectFit: "cover" }} />
                      <div className="db-hero-avatar-sub" title="ReBuild '26 Arena Participant">
                        <EventCalendarIcon size={26} color="#070c09" />
                      </div>
                    </div>
                  </div>

                  {/* ── 4 Stats Grid (Original Content) ── */}
                  <div className="db-stats-row">
                    <div className="db-stat-box">
                      <span className="db-stat-box-lbl">APPLICATIONS</span>
                      <div className="db-stat-box-val">3</div>
                      <span className="db-stat-box-sub">FROM 120 ACTIONS</span>
                    </div>

                    <div className="db-stat-box">
                      <span className="db-stat-box-lbl">SELECTIONS</span>
                      <div className="db-stat-box-val">1</div>
                      <span className="db-stat-box-sub">FROM 120 ACTIONS</span>
                    </div>

                    <div className="db-stat-box">
                      <span className="db-stat-box-lbl">CAMPUS RANK</span>
                      <div className="db-stat-box-val">2</div>
                      <span className="db-stat-box-sub">{user.college?.toUpperCase() || "ANNA UNIVERSITY"}</span>
                    </div>

                    <div className="db-stat-box">
                      <span className="db-stat-box-lbl">SHORTLISTED</span>
                      <div className="db-stat-box-val">1</div>
                      <span className="db-stat-box-sub">ROUND 1 ARENA</span>
                    </div>
                  </div>

                  {/* ── Featured / Recent Arena Events ── */}
                  <div className="db-card" style={{ padding: "24px 26px" }}>
                    <div className="db-card-header">
                      <div>
                        <h2 className="db-card-title">Featured Arena Events</h2>
                        <span style={{ fontSize: 11, color: "#63776e" }}>Direct backend registrations &amp; round submissions</span>
                      </div>
                      <button
                        type="button"
                        className="db-card-action"
                        onClick={() => setActiveTab("events")}
                      >
                        VIEW ALL ARENA EVENTS ↗
                      </button>
                    </div>

                    <div className="db-featured-row">
                      {allEvents.slice(0, 2).map((ev) => (
                        <div key={ev.id} className="db-card" style={{ background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.08)", padding: 20 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                            <span style={{ fontSize: 10, fontWeight: 700, color: "#7a8e83", textTransform: "uppercase" }}>REGISTRATION</span>
                            <span className={ev.status === "LIVE" ? "db-event-pill-live" : "db-event-pill-done"}>{ev.status}</span>
                          </div>

                          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                            <EventBadge type={ev.type} badge={ev.badge} size={46} />
                            <div>
                              <h3 style={{ fontSize: 17, fontWeight: 700, color: "#fff" }}>{ev.title}</h3>
                              <div style={{ fontSize: 11, color: "var(--db-emerald)", fontWeight: 600 }}>TEAM: {ev.team}</div>
                            </div>
                          </div>

                          <p style={{ fontSize: 12.5, color: "#7a8e83", margin: "12px 0 16px", lineHeight: 1.5 }}>
                            {ev.description}
                          </p>

                          <button
                            type="button"
                            className="db-arena-btn"
                            style={{ width: "100%" }}
                            onClick={() => {
                              if (ev.status === "LIVE") {
                                setActiveTab("my-events")
                                setActiveJourney("rebuild-26")
                              } else {
                                setDetailsModal(ev)
                              }
                            }}
                          >
                            {ev.status === "LIVE" ? "OPEN JOURNEY ↗" : "VIEW DETAILS ↗"}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ════════════════════ TAB 2: EVENTS ════════════════════ */}
              {activeTab === "events" && (
                <div>
                  <div className="db-section-header">
                    <div className="db-section-kicker">● DISCOVER / BACKEND DATA</div>
                    <h1 className="db-section-title">Events &amp; Hackathons</h1>
                    <p className="db-section-sub">
                      Explore CampusCode events — hackathons, quizzes, workshops — and join the ones you want.
                    </p>
                  </div>

                  <div className="db-pills-row" style={{ marginBottom: 22 }}>
                    <button
                      type="button"
                      className="db-pill"
                      data-active={eventFilter === "all" ? "true" : "false"}
                      onClick={() => setEventFilter("all")}
                    >
                      All Events
                    </button>
                    <button
                      type="button"
                      className="db-pill"
                      data-active={eventFilter === "hackathons" ? "true" : "false"}
                      onClick={() => setEventFilter("hackathons")}
                    >
                      Hackathons
                    </button>
                    <button
                      type="button"
                      className="db-pill"
                      data-active={eventFilter === "quizzes" ? "true" : "false"}
                      onClick={() => setEventFilter("quizzes")}
                    >
                      Quizzes
                    </button>
                  </div>

                  <div className="db-events-grid">
                    {filteredEvents.map((ev) => (
                      <div key={ev.id} className="db-card db-event-card">
                        <div>
                          <div className="db-event-top">
                            <span className="db-event-tag">{ev.type}</span>
                            <span className={ev.status === "LIVE" ? "db-event-pill-live" : "db-event-pill-done"}>
                              {ev.status}
                            </span>
                          </div>

                          <div style={{ display: "flex", gap: 16, alignItems: "center", marginTop: 16 }}>
                            <EventBadge type={ev.type} badge={ev.badge} size={50} />
                            <div>
                              <h3 style={{ fontSize: 20, fontWeight: 800, color: "#fff", letterSpacing: "-0.01em" }}>{ev.title}</h3>
                              <div style={{ fontSize: 12, color: "var(--db-emerald)", fontWeight: 700, marginTop: 2 }}>
                                {ev.subtitle}
                              </div>
                            </div>
                          </div>

                          <p style={{ fontSize: 14, color: "#92a89c", marginTop: 16, lineHeight: 1.6 }}>
                            {ev.description}
                          </p>
                        </div>

                        <button
                          type="button"
                          className="db-arena-btn"
                          style={{ width: "100%", textAlign: "center", padding: "13px 20px" }}
                          onClick={() => setDetailsModal(ev)}
                        >
                          {ev.status === "LIVE" ? "OPEN ARENA ↗" : "VIEW DETAILS ↗"}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ════════════════════ TAB 3: MY EVENTS / JOURNEY HUB ════════════════════ */}
              {activeTab === "my-events" && (
                activeJourney === "rebuild-26" ? (
                  <div className="db-journey-root">
                    {/* Back Button */}
                    <div>
                      <button
                        type="button"
                        className="db-journey-back"
                        onClick={() => setActiveJourney(null)}
                      >
                        ← ALL MY EVENTS
                      </button>
                    </div>

                    {/* Section Header */}
                    <div className="db-section-header" style={{ marginBottom: 4 }}>
                      <div className="db-section-kicker">● EVENT / LIVE HUB</div>
                      <h1 className="db-section-title">REBUILD '26.</h1>
                      <p className="db-section-sub">
                        Everything for this event lives here — rounds, team, results, leaderboard and certificates.
                      </p>
                    </div>

                    {/* Sub-tabs Pills Row */}
                    <div className="db-pills-row" style={{ gap: 8, marginBottom: 8 }}>
                      {[
                        "Overview",
                        "Rounds",
                        "My Team",
                        "Results",
                        "Leaderboard",
                        "Certificates",
                        "Announcements",
                      ].map((tab) => (
                        <button
                          key={tab}
                          type="button"
                          className="db-pill"
                          data-active={journeySubTab === tab ? "true" : "false"}
                          onClick={() => setJourneySubTab(tab)}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>

                    {/* ── Subtab Content ── */}
                    {journeySubTab === "Overview" && (
                      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                        {/* ReBuild '26 White Frosted Banner */}
                        <div className="db-journey-banner">
                          <div className="db-journey-banner-bg-ribbon" />

                          <div className="db-journey-banner-logo">
                            <svg width="58" height="52" viewBox="0 0 114 100" fill="none">
                              <rect x="18" y="10" width="18" height="80" rx="4" transform="skewX(-18)" fill="#ffffff" />
                              <rect x="52" y="10" width="18" height="80" rx="4" transform="skewX(-18)" fill="#5d6bff" />
                              <rect x="86" y="10" width="18" height="80" rx="4" transform="skewX(-18)" fill="#78d61a" />
                            </svg>
                          </div>

                          <div style={{ flex: 1, zIndex: 1 }}>
                            <div style={{ fontSize: 11.5, fontWeight: 800, letterSpacing: ".14em", color: "#64748b", textTransform: "uppercase" }}>
                              CAMPUSCODE PRESENTS
                            </div>
                            <h2 style={{ fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 900, color: "#070c0a", margin: "4px 0", letterSpacing: "-.02em" }}>
                              ReBuild <span style={{ color: "#5d6bff" }}>'26</span>
                            </h2>
                            <div style={{ fontSize: 13, fontWeight: 900, letterSpacing: ".08em", color: "#0f172a", textTransform: "uppercase", marginBottom: 14 }}>
                              THE DASHBOARD RECREATION HACKATHON
                            </div>

                            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                              <span style={{ fontSize: 11, fontWeight: 800, padding: "4px 12px", borderRadius: 999, background: "rgba(93, 107, 255, 0.08)", border: "1px solid rgba(93, 107, 255, 0.25)", color: "#1e1b4b", display: "inline-flex", alignItems: "center", gap: 6 }}>
                                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#5d6bff" }} />
                                CERTIFICATE FOR WINNERS
                              </span>
                              <span style={{ fontSize: 11, fontWeight: 800, padding: "4px 12px", borderRadius: 999, background: "rgba(120, 214, 26, 0.12)", border: "1px solid rgba(120, 214, 26, 0.3)", color: "#064e3b", display: "inline-flex", alignItems: "center", gap: 6 }}>
                                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#78d61a" }} />
                                INTERNSHIP OPPORTUNITY
                              </span>
                              <span style={{ fontSize: 11, fontWeight: 800, padding: "4px 12px", borderRadius: 999, background: "rgba(93, 107, 255, 0.08)", border: "1px solid rgba(93, 107, 255, 0.25)", color: "#1e1b4b", display: "inline-flex", alignItems: "center", gap: 6 }}>
                                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#5d6bff" }} />
                                REGISTER BY 5 NOV 2026
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Registration ID Strip */}
                        <div className="db-journey-info-strip">
                          <div>
                            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: ".12em", color: "var(--db-emerald)", textTransform: "uppercase" }}>
                              REGISTRATION ID
                            </div>
                            <div style={{ fontSize: 14, fontFamily: "monospace", color: "#ffffff", fontWeight: 700, marginTop: 4 }}>
                              e4271f3c-295a-4a93-b193-b1bea9216c32
                            </div>
                          </div>
                          <div>
                            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: ".12em", color: "#8da497", textTransform: "uppercase" }}>
                              STATUS
                            </div>
                            <div style={{ marginTop: 4 }}>
                              <span className="db-event-pill-live" style={{ fontSize: 11.5, padding: "4px 12px" }}>
                                REGISTERED
                              </span>
                            </div>
                          </div>
                          <div>
                            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: ".12em", color: "#8da497", textTransform: "uppercase" }}>
                              TEAM
                            </div>
                            <div style={{ fontSize: 16, color: "var(--db-emerald)", fontWeight: 800, marginTop: 4 }}>
                              spacex
                            </div>
                          </div>
                        </div>

                        {/* ROUND PIPELINE Card */}
                        <div className="db-pipeline-card">
                          <div>
                            <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: ".12em", color: "var(--db-emerald)", textTransform: "uppercase" }}>
                              ROUND PIPELINE
                            </div>
                            <p style={{ fontSize: 13.5, color: "#8da497", marginTop: 4, margin: 0 }}>
                              Click a round to see what you need to submit.
                            </p>
                          </div>

                          <div className="db-pipeline-track">
                            {/* Round 1 */}
                            <div
                              className="db-pipeline-step"
                              onClick={() => showToast("Round 1 - Recreate was submitted and verified!", "ROUND 1 - RECREATE")}
                            >
                              <div className="db-pipeline-num" style={{ background: "rgba(47, 229, 158, 0.15)", color: "var(--db-emerald)" }}>
                                1
                              </div>
                              <div>
                                <div style={{ fontSize: 15, fontWeight: 800, color: "#ffffff" }}>Round 1 - Recreate</div>
                                <div style={{ marginTop: 4 }}>
                                  <span className="db-event-pill-live" style={{ fontSize: 10.5, padding: "2px 8px" }}>
                                    COMPLETED
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div style={{ fontSize: 20, color: "#52635a", fontWeight: 700 }}>—</div>

                            {/* Round 2 */}
                            <div
                              className="db-pipeline-step"
                              data-active="true"
                              onClick={() => setJourneyModal(true)}
                            >
                              <div className="db-pipeline-num" style={{ background: "rgba(93, 107, 255, 0.2)", color: "#7b8aff", border: "1px solid rgba(93, 107, 255, 0.4)" }}>
                                2
                              </div>
                              <div>
                                <div style={{ fontSize: 15, fontWeight: 800, color: "#ffffff" }}>Round 2 - New UI</div>
                                <div style={{ marginTop: 4, display: "flex", gap: 6, alignItems: "center" }}>
                                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#5d6bff", boxShadow: "0 0 10px #5d6bff" }} />
                                  <span style={{ fontSize: 11, fontWeight: 800, color: "#7b8aff" }}>
                                    LIVE
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div style={{ fontSize: 20, color: "#52635a", fontWeight: 700 }}>—</div>

                            {/* Round 3 */}
                            <div
                              className="db-pipeline-step"
                              style={{ opacity: 0.6 }}
                              onClick={() => showToast("Round 3 unlocks after Round 2 jury reviews.", "ROUND 3 - FINALE")}
                            >
                              <div className="db-pipeline-num">3</div>
                              <div>
                                <div style={{ fontSize: 15, fontWeight: 700, color: "#a4b6ad" }}>Round 3 - Finale</div>
                                <div style={{ marginTop: 4 }}>
                                  <span className="db-event-pill-done" style={{ fontSize: 10.5, padding: "2px 8px" }}>
                                    LOCKED
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* TEAM RECORD Card */}
                        <div className="db-team-record-card">
                          <div>
                            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: ".12em", color: "var(--db-emerald)", textTransform: "uppercase", marginBottom: 6 }}>
                              TEAM RECORD
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                              <div>
                                <div style={{ fontSize: 11.5, color: "#8da497", fontWeight: 700 }}>TEAM</div>
                                <div style={{ fontSize: 18, fontWeight: 800, color: "#ffffff" }}>spacex's team</div>
                              </div>
                              <div style={{ width: 1, height: 32, background: "rgba(255,255,255,0.12)" }} />
                              <div>
                                <div style={{ fontSize: 11.5, color: "#8da497", fontWeight: 700 }}>ID</div>
                                <div style={{ fontSize: 13.5, fontFamily: "monospace", color: "#c5d6cc", fontWeight: 600 }}>713ad00f-2af7-47f9-a146-497533715bdd</div>
                              </div>
                            </div>
                          </div>

                          <div>
                            <span className="db-event-pill-live" style={{ fontSize: 12, padding: "6px 16px", fontWeight: 800, letterSpacing: ".06em" }}>
                              STATUS: FINALIST
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Subtab: Rounds */}
                    {journeySubTab === "Rounds" && (
                      <div className="db-card" style={{ padding: "28px 30px" }}>
                        <h3 style={{ fontSize: 20, fontWeight: 800, color: "#fff", marginBottom: 16 }}>Rounds &amp; Submissions</h3>
                        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                          <div style={{ padding: 18, borderRadius: 16, background: "rgba(47, 229, 158, 0.08)", border: "1px solid rgba(47, 229, 158, 0.2)" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                              <h4 style={{ color: "#fff", fontSize: 16, fontWeight: 700 }}>Round 1: Dashboard Recreation</h4>
                              <span className="db-event-pill-live">SCORE: 94/100 · PASSED</span>
                            </div>
                            <p style={{ color: "#92a89c", fontSize: 13.5, marginTop: 6 }}>
                              Recreate CampusCode UI faithfully. Submission verified on GitHub.
                            </p>
                          </div>
                          <div style={{ padding: 18, borderRadius: 16, background: "rgba(93, 107, 255, 0.08)", border: "1px solid rgba(93, 107, 255, 0.3)" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                              <h4 style={{ color: "#fff", fontSize: 16, fontWeight: 700 }}>Round 2: New UI &amp; Architecture</h4>
                              <span style={{ fontSize: 11, fontWeight: 800, color: "#7b8aff", background: "rgba(93, 107, 255, 0.2)", padding: "4px 10px", borderRadius: 999 }}>LIVE SUBMISSION OPEN</span>
                            </div>
                            <p style={{ color: "#92a89c", fontSize: 13.5, marginTop: 6 }}>
                              Submit live preview link and demo before Saturday 10 PM.
                            </p>
                            <button
                              type="button"
                              className="db-arena-btn"
                              style={{ marginTop: 14 }}
                              onClick={() => setJourneyModal(true)}
                            >
                              SUBMIT DEMO URL ↗
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Subtab: My Team */}
                    {journeySubTab === "My Team" && (
                      <div className="db-card" style={{ padding: "28px 30px" }}>
                        <h3 style={{ fontSize: 20, fontWeight: 800, color: "#fff", marginBottom: 12 }}>Team Roster · spacex's team</h3>
                        <p style={{ color: "#92a89c", fontSize: 14, marginBottom: 18 }}>Team ID: 713ad00f-2af7-47f9-a146-497533715bdd</p>
                        <div style={{ display: "flex", gap: 14, alignItems: "center", padding: 14, borderRadius: 14, background: "rgba(255,255,255,0.04)" }}>
                          <img src={avatarUrl} alt={studentName} style={{ width: 44, height: 44, borderRadius: "50%", border: "2px solid var(--db-emerald)" }} />
                          <div>
                            <div style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>{studentName} (Lead)</div>
                            <div style={{ color: "var(--db-emerald)", fontSize: 12 }}>{user.college || "Anna University"} · Status: Finalist</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Subtab: Results & Leaderboard */}
                    {(journeySubTab === "Results" || journeySubTab === "Leaderboard") && (
                      <div className="db-card" style={{ padding: "28px 30px" }}>
                        <h3 style={{ fontSize: 20, fontWeight: 800, color: "#fff", marginBottom: 14 }}>ReBuild '26 Live Leaderboard</h3>
                        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                          {[
                            { rank: 1, team: "neo-matrix", score: "96.4 pts", status: "Leader" },
                            { rank: 2, team: "spacex's team", score: "94.2 pts", status: "Finalist (You)" },
                            { rank: 3, team: "hyperion-ai", score: "91.8 pts", status: "Finalist" },
                          ].map((row) => (
                            <div key={row.rank} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 18px", borderRadius: 12, background: row.rank === 2 ? "rgba(47, 229, 158, 0.12)" : "rgba(255,255,255,0.03)", border: row.rank === 2 ? "1px solid rgba(47, 229, 158, 0.3)" : "none" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                <span style={{ fontWeight: 900, color: row.rank === 2 ? "var(--db-emerald)" : "#fff", width: 24 }}>#{row.rank}</span>
                                <span style={{ color: "#fff", fontWeight: 700 }}>{row.team}</span>
                              </div>
                              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                                <span style={{ color: "var(--db-lime)", fontWeight: 800, fontSize: 13 }}>{row.score}</span>
                                <span className={row.rank === 2 ? "db-event-pill-live" : "db-event-pill-done"}>{row.status}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Subtab: Certificates */}
                    {journeySubTab === "Certificates" && (
                      <div className="db-card db-event-card" style={{ maxWidth: 540 }}>
                        <div>
                          <div className="db-event-top">
                            <span className="db-event-tag">FEB 2026</span>
                            <span className="db-event-pill-done" style={{ background: "rgba(255, 255, 255, 0.06)", color: "#8da497" }}>NOT ISSUED YET</span>
                          </div>
                          <h3 style={{ fontSize: 21, fontWeight: 800, color: "#fff", marginTop: 14 }}>ReBuild '26 Finalist Award</h3>
                          <p style={{ fontSize: 13, color: "#92a89c", marginTop: 6 }}>Issued to: {studentName.toUpperCase()} · Team spacex's team</p>
                          <p style={{ fontSize: 12, color: "var(--db-emerald)", fontWeight: 700, marginTop: 4 }}>ID: CC-2026-RB-84920</p>
                        </div>
                        <button
                          type="button"
                          className="db-support-btn-outline"
                          style={{
                            width: "100%",
                            justifyContent: "center",
                            color: "#8da497",
                            background: "rgba(255, 255, 255, 0.03)",
                            border: "1px dashed rgba(255, 255, 255, 0.18)",
                            cursor: "not-allowed",
                            fontWeight: 700,
                            fontSize: 13,
                          }}
                          onClick={() => showToast("Certificate is not issued yet. Available after final round evaluation.", "CERTIFICATES")}
                        >
                          NOT ISSUED YET
                        </button>
                      </div>
                    )}

                    {/* Subtab: Announcements */}
                    {journeySubTab === "Announcements" && (
                      <div className="db-card" style={{ padding: "28px 30px" }}>
                        <h3 style={{ fontSize: 20, fontWeight: 800, color: "#fff", marginBottom: 14 }}>Event Announcements</h3>
                        <div style={{ padding: 16, borderRadius: 14, background: "rgba(255,255,255,0.04)" }}>
                          <div style={{ fontSize: 11, color: "var(--db-emerald)", fontWeight: 800 }}>NOV 06, 2026</div>
                          <h4 style={{ color: "#fff", fontSize: 15, fontWeight: 700, marginTop: 4 }}>Round 1 Completed · Round 2 is Live!</h4>
                          <p style={{ color: "#92a89c", fontSize: 13.5, marginTop: 6, lineHeight: 1.55 }}>
                            Congratulations to team spacex's team for qualifying into the Finalist tier. Round 2 submission pipeline is now open.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <div className="db-section-header">
                      <div className="db-section-kicker">● MY REGISTRATIONS</div>
                      <h1 className="db-section-title">My Registered Events</h1>
                      <p className="db-section-sub">
                        Every event you joined in one place. View submissions, track judging rounds and download passes.
                      </p>
                    </div>

                    <div className="db-events-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))", maxWidth: 1100 }}>
                      {/* Live Event: ReBuild '26 */}
                      <div className="db-card db-event-card" style={{ padding: "30px 32px", gap: 24 }}>
                        <div>
                          <div className="db-event-top">
                            <span className="db-event-tag" style={{ fontSize: 11.5, letterSpacing: ".1em" }}>REGISTRATION ID: e2798ce3</span>
                            <span className="db-event-pill-live" style={{ fontSize: 11.5, padding: "4px 12px" }}>LIVE NOW</span>
                          </div>

                          <div style={{ display: "flex", gap: 16, alignItems: "center", marginTop: 18 }}>
                            <EventBadge type="hackathons" badge="RE" size={52} />
                            <div>
                              <h3 style={{ fontSize: 22, fontWeight: 800, color: "#fff", letterSpacing: "-0.01em" }}>ReBuild '26</h3>
                              <div style={{ fontSize: 13, color: "var(--db-emerald)", fontWeight: 700, marginTop: 2 }}>TEAM: spacex</div>
                            </div>
                          </div>

                          <p style={{ fontSize: 14.5, color: "#92a89c", marginTop: 18, lineHeight: 1.6 }}>
                            Round 1: Dashboard Recreation in progress. Submit your GitHub link and demo preview before Friday 10 PM IST.
                          </p>
                        </div>

                        <button
                          type="button"
                          className="db-arena-btn"
                          style={{ padding: "13px 26px", fontSize: 13, fontWeight: 800 }}
                          onClick={() => setActiveJourney("rebuild-26")}
                        >
                          OPEN JOURNEY TRACKER ↗
                        </button>
                      </div>

                      {/* Completed Event: FirstCommit '26 Quiz 2.0 */}
                      <div className="db-card db-event-card" style={{ padding: "30px 32px", gap: 24 }}>
                        <div>
                          <div className="db-event-top">
                            <span className="db-event-tag" style={{ fontSize: 11.5, letterSpacing: ".1em" }}>REGISTRATION ID: 20864c76</span>
                            <span className="db-event-pill-done" style={{ fontSize: 11.5, padding: "4px 12px" }}>COMPLETED</span>
                          </div>

                          <div style={{ display: "flex", gap: 16, alignItems: "center", marginTop: 18 }}>
                            <EventBadge type="quizzes" badge="FQ" size={52} />
                            <div>
                              <h3 style={{ fontSize: 22, fontWeight: 800, color: "#fff", letterSpacing: "-0.01em" }}>FirstCommit '26 Quiz 2.0</h3>
                              <div style={{ fontSize: 13, color: "var(--db-lime)", fontWeight: 700, marginTop: 2 }}>SOLO · SCORE 50/50</div>
                            </div>
                          </div>

                          <p style={{ fontSize: 14.5, color: "#92a89c", marginTop: 18, lineHeight: 1.6 }}>
                            FirstCommit engineering quiz completed successfully. Verified rank 1 score recorded (certificate not issued yet).
                          </p>
                        </div>

                        <button
                          type="button"
                          className="db-support-btn-outline"
                          style={{ padding: "12px 24px", fontSize: 13, fontWeight: 700 }}
                          onClick={() => setActiveTab("certificates")}
                        >
                          VIEW CREDENTIALS →
                        </button>
                      </div>
                    </div>
                  </div>
                )
              )}

              {/* ════════════════════ TAB 4: HACKMATE AI ════════════════════ */}
              {activeTab === "hackmate" && (
                <div>
                  <div className="db-section-header">
                    <div className="db-section-kicker">● INTELLIGENCE / TEAM MATCHING</div>
                    <h1 className="db-section-title">HackMate AI</h1>
                    <p className="db-section-sub">
                      Find registered students from the same hackathon using HackMate match scores and skill alignments.
                    </p>
                  </div>

                  <div className="db-card" style={{ marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 14, padding: "20px 24px" }}>
                    <span style={{ fontSize: 13, fontWeight: 800, color: "var(--db-emerald)", textTransform: "uppercase", letterSpacing: ".08em" }}>
                      Registered Hackathon
                    </span>
                    <select
                      style={{
                        padding: "10px 18px",
                        borderRadius: 14,
                        background: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        color: "#fff",
                        fontFamily: "inherit",
                        fontWeight: 700,
                        fontSize: 13.5,
                        outline: "none",
                      }}
                      value={selectedHackathon}
                      onChange={(e) => setSelectedHackathon(e.target.value)}
                    >
                      <option value="" style={{ background: "#070b09" }}>Select Hackathon</option>
                      <option value="rebuild-26" style={{ background: "#070b09" }}>ReBuild '26 — Dashboard Recreation</option>
                    </select>
                  </div>

                  <div className="db-events-grid">
                    {[
                      { name: "Aarav Sharma", role: "Frontend & Motion Lead", match: "98% Match", college: "Anna University", skills: ["React", "Tailwind", "Three.js"] },
                      { name: "Pooja Sundaram", role: "Product & UI/UX Designer", match: "95% Match", college: "SRM University", skills: ["Figma", "Design Systems", "KaTeX"] },
                      { name: "Karthik Raja", role: "Backend & Systems", match: "92% Match", college: "IIT Madras", skills: ["Node.js", "PostgreSQL", "Go"] },
                    ].map((mate, i) => (
                      <div key={i} className="db-card db-event-card">
                        <div>
                          <div className="db-event-top">
                            <span className="db-event-tag">{mate.college}</span>
                            <span className="db-event-pill-live">{mate.match}</span>
                          </div>

                          <div style={{ display: "flex", gap: 16, alignItems: "center", marginTop: 16 }}>
                            <div className="db-event-badge" style={{ width: 50, height: 50, borderRadius: 14, background: "rgba(47, 229, 158, 0.15)", color: "var(--db-emerald)", fontSize: 18 }}>
                              {mate.name[0]}
                            </div>
                            <div>
                              <h3 style={{ fontSize: 19, fontWeight: 800, color: "#fff" }}>{mate.name}</h3>
                              <div style={{ fontSize: 13, color: "#8da497", marginTop: 2 }}>{mate.role}</div>
                            </div>
                          </div>

                          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 16 }}>
                            {mate.skills.map((s, idx) => (
                              <span key={idx} style={{ fontSize: 11, padding: "3px 10px", borderRadius: 999, background: "rgba(255,255,255,0.06)", color: "#b5c7be" }}>
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>

                        <button
                          type="button"
                          className="db-arena-btn"
                          style={{ width: "100%", justifyContent: "center" }}
                          onClick={() => showToast(`Invitation sent to ${mate.name} for team spacex!`, "HACKMATE INVITE")}
                        >
                          INVITE TO TEAM ↗
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ════════════════════ TAB 5: IDEACHECK AI ════════════════════ */}
              {activeTab === "ideacheck" && (
                <div>
                  <div className="db-section-header">
                    <div className="db-section-kicker">● AI ENGINE / GEMINI POWERED</div>
                    <h1 className="db-section-title">IdeaCheck AI</h1>
                    <p className="db-section-sub">
                      Check your project idea against previous hackathon winners, then receive real-time Gemini recommendations.
                    </p>
                  </div>

                  <div className="db-card" style={{ maxWidth: 840, padding: "30px 32px" }}>
                    <h3 style={{ fontSize: 20, fontWeight: 800, color: "#fff", marginBottom: 14 }}>
                      What are you building?
                    </h3>
                    <textarea
                      style={{
                        width: "100%",
                        height: 180,
                        padding: 18,
                        borderRadius: 16,
                        background: "rgba(255, 255, 255, 0.04)",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        color: "#fff",
                        fontFamily: "inherit",
                        fontSize: 15,
                        outline: "none",
                        lineHeight: 1.6,
                        resize: "vertical",
                      }}
                      defaultValue="A real-time student hackathon arena portal with interactive Gemini AI idea evaluations, team matching, and live digital passes."
                    />
                    <button
                      type="button"
                      className="db-arena-btn"
                      style={{ marginTop: 20, padding: "13px 26px" }}
                      onClick={() => showToast("Idea verified! 86% originality score against CampusCode database.", "IDEACHECK AI")}
                    >
                      CHECK IDEA WITH GEMINI AI ↗
                    </button>
                  </div>
                </div>
              )}

              {/* ════════════════════ TAB 6: CERTIFICATES ════════════════════ */}
              {activeTab === "certificates" && (
                <div>
                  <div className="db-section-header">
                    <div className="db-section-kicker">● VERIFIED CREDENTIALS</div>
                    <h1 className="db-section-title">Certificates &amp; Ranks</h1>
                    <p className="db-section-sub">
                      Cryptographically verified accreditation for your hackathon rankings and participation.
                    </p>
                  </div>

                  <div className="db-events-grid">
                    <div className="db-card db-event-card">
                      <div>
                        <div className="db-event-top">
                          <span className="db-event-tag">FEB 2026</span>
                          <span className="db-event-pill-done" style={{ background: "rgba(255, 255, 255, 0.06)", color: "#8da497" }}>NOT ISSUED YET</span>
                        </div>
                        <h3 style={{ fontSize: 21, fontWeight: 800, color: "#fff", marginTop: 14, letterSpacing: "-0.01em" }}>ReBuild '26 Participation</h3>
                        <p style={{ fontSize: 13, color: "#92a89c", marginTop: 6 }}>Issued to: {studentName.toUpperCase()}</p>
                        <p style={{ fontSize: 12, color: "var(--db-emerald)", fontWeight: 700, marginTop: 4 }}>ID: CC-2026-RB-84920</p>
                      </div>
                      <button
                        type="button"
                        className="db-support-btn-outline"
                        style={{
                          width: "100%",
                          justifyContent: "center",
                          color: "#8da497",
                          background: "rgba(255, 255, 255, 0.03)",
                          border: "1px dashed rgba(255, 255, 255, 0.18)",
                          cursor: "not-allowed",
                          fontWeight: 700,
                          fontSize: 13,
                        }}
                        onClick={() => showToast("Certificate is not issued yet. Evaluations are currently in progress.", "CERTIFICATES")}
                      >
                        NOT ISSUED YET
                      </button>
                    </div>

                    <div className="db-card db-event-card">
                      <div>
                        <div className="db-event-top">
                          <span className="db-event-tag">JAN 2026</span>
                          <span className="db-event-pill-done" style={{ background: "rgba(255, 255, 255, 0.06)", color: "#8da497" }}>NOT ISSUED YET</span>
                        </div>
                        <h3 style={{ fontSize: 21, fontWeight: 800, color: "#fff", marginTop: 14, letterSpacing: "-0.01em" }}>FirstCommit '26 Quiz 2.0</h3>
                        <p style={{ fontSize: 13, color: "#92a89c", marginTop: 6 }}>Rank 1 • Accelerator Badge</p>
                        <p style={{ fontSize: 12, color: "var(--db-emerald)", fontWeight: 700, marginTop: 4 }}>ID: CC-2026-FC-11942</p>
                      </div>
                      <button
                        type="button"
                        className="db-support-btn-outline"
                        style={{
                          width: "100%",
                          justifyContent: "center",
                          color: "#8da497",
                          background: "rgba(255, 255, 255, 0.03)",
                          border: "1px dashed rgba(255, 255, 255, 0.18)",
                          cursor: "not-allowed",
                          fontWeight: 700,
                          fontSize: 13,
                        }}
                        onClick={() => showToast("Certificate is not issued yet. Digital verification in progress.", "CERTIFICATES")}
                      >
                        NOT ISSUED YET
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* ════════════════════ TAB 7: DIGITAL CARD ════════════════════ */}
              {activeTab === "digital-card" && (
                <div>
                  <div className="db-section-header">
                    <div className="db-section-kicker">● STUDENT PASS</div>
                    <h1 className="db-section-title">Digital Identity Pass</h1>
                    <p className="db-section-sub">
                      Official CampusCode student ID pass with verified QR code for offline event venues.
                    </p>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "minmax(360px, 460px) 1fr", gap: 28, alignItems: "start" }}>
                    <div className="db-card" style={{ background: "#ffffff", color: "#070c09", padding: "28px 30px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #e5e7eb", paddingBottom: 14 }}>
                        <span style={{ fontWeight: 900, fontSize: 15, letterSpacing: ".06em" }}>CAMPUSCODE ARENA</span>
                        <span style={{ fontSize: 11, fontWeight: 800, background: "#10b981", color: "#fff", padding: "3px 10px", borderRadius: 999 }}>VERIFIED</span>
                      </div>

                      <div style={{ display: "flex", gap: 14, alignItems: "center", margin: "20px 0" }}>
                        <img
                          src={avatarUrl}
                          alt={studentName}
                          style={{ width: 52, height: 52, borderRadius: "50%", objectFit: "cover", border: "2.5px solid #10b981", boxShadow: "0 2px 10px rgba(0,0,0,0.18)" }}
                        />
                        <div>
                          <div style={{ fontSize: 18, fontWeight: 800 }}>{studentName}</div>
                          <div style={{ fontSize: 13, color: "#6b7280", marginTop: 2 }}>{user.email}</div>
                        </div>
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, fontSize: 13, borderTop: "1px solid #e5e7eb", borderBottom: "1px solid #e5e7eb", padding: "14px 0" }}>
                        <div><strong>ID:</strong> CC-XF989T</div>
                        <div><strong>ROLE:</strong> STUDENT</div>
                        <div><strong>STATUS:</strong> <span style={{ color: "#10b981", fontWeight: 700 }}>ACTIVE</span></div>
                        <div><strong>COLLEGE:</strong> {user.college || "Anna Univ"}</div>
                      </div>

                      {/* Real Verified QR Code Scanner */}
                      <div style={{ textAlign: "center", marginTop: 18, display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <img
                          src="/qr_code.png"
                          alt="CampusCode Public Profile Scanner"
                          style={{ width: 195, height: "auto", display: "block", borderRadius: 6 }}
                        />
                      </div>
                    </div>

                    <div className="db-card" style={{ padding: "30px 32px" }}>
                      <h3 style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 14 }}>
                        Identity Pass Actions
                      </h3>
                      <p style={{ fontSize: 14.5, color: "#92a89c", lineHeight: 1.65, marginBottom: 24 }}>
                        Your pass is connected directly to your registered team 'spacex'. Use the print dialog to generate a physical event entry credential.
                      </p>
                      <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                        <button
                          type="button"
                          className="db-arena-btn"
                          style={{ padding: "13px 26px" }}
                          onClick={() => window.print?.()}
                        >
                          PRINT MY CARD ↗
                        </button>
                        <button
                          type="button"
                          className="db-support-btn-outline"
                          style={{ padding: "12px 24px" }}
                          onClick={handleCopyProfileLink}
                        >
                          {copiedLink ? "COPIED ✓" : "COPY PROFILE LINK"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ════════════════════ TAB 8: RULEBOT AI ════════════════════ */}
              {activeTab === "rulebot" && (
                <div>
                  <div className="db-section-header">
                    <div className="db-section-kicker">● RULEBOOK GROUNDED AI</div>
                    <h1 className="db-section-title">RuleBot AI</h1>
                    <p className="db-section-sub">
                      Ask questions grounded in the official ReBuild '26 organizer rulebook.
                    </p>
                  </div>

                  <div className="db-card" style={{ maxWidth: 880, padding: "30px 32px" }}>
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
                      {[
                        "What is the deadline for Round 1?",
                        "Can I use AI coding tools like Antigravity?",
                        "Can I participate alone or is a team required?",
                      ].map((chip) => (
                        <button
                          key={chip}
                          type="button"
                          className="db-pill"
                          style={{ fontSize: 12.5, padding: "8px 16px" }}
                          onClick={() => setRulebotInput(chip)}
                        >
                          {chip}
                        </button>
                      ))}
                    </div>

                    <div style={{ minHeight: 200, display: "flex", flexDirection: "column", gap: 12, padding: "12px 0" }}>
                      <div style={{ background: "rgba(47, 229, 158, 0.1)", border: "1px solid rgba(47, 229, 158, 0.25)", padding: "14px 18px", borderRadius: 14, maxWidth: "85%" }}>
                        <span style={{ fontSize: 11, fontWeight: 800, color: "var(--db-emerald)" }}>RULEBOT AI</span>
                        <p style={{ fontSize: 14, color: "#fff", marginTop: 6, lineHeight: 1.55 }}>
                          Welcome! I am grounded in the ReBuild '26 rulebook. Feel free to ask about tech stacks, judging criteria, or submission deadlines.
                        </p>
                      </div>

                      {rulebotChat.map((msg, idx) => (
                        <div
                          key={idx}
                          style={{
                            alignSelf: msg.from === "user" ? "flex-end" : "flex-start",
                            background: msg.from === "user" ? "var(--db-emerald)" : "rgba(255, 255, 255, 0.08)",
                            color: msg.from === "user" ? "#070c09" : "#fff",
                            fontWeight: msg.from === "user" ? 700 : 400,
                            padding: "10px 18px",
                            borderRadius: 14,
                            maxWidth: "80%",
                            fontSize: 14,
                            lineHeight: 1.5,
                          }}
                        >
                          {msg.text}
                        </div>
                      ))}
                    </div>

                    <div style={{ display: "flex", gap: 12, marginTop: 18 }}>
                      <input
                        type="text"
                        placeholder="Ask anything about the ReBuild '26 rulebook..."
                        value={rulebotInput}
                        onChange={(e) => setRulebotInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSendRulebot()}
                        style={{
                          flex: 1,
                          padding: "0 18px",
                          height: 48,
                          borderRadius: 12,
                          background: "rgba(255, 255, 255, 0.05)",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                          color: "#fff",
                          outline: "none",
                          fontFamily: "inherit",
                        }}
                      />
                      <button
                        type="button"
                        className="db-arena-btn"
                        onClick={handleSendRulebot}
                      >
                        ASK ↗
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* ════════════════════ TAB 9: GUIDE ════════════════════ */}
              {activeTab === "guide" && (
                <div className="db-guide-root">
                  {/* Top Section Header */}
                  <div className="db-section-header" style={{ marginBottom: 4 }}>
                    <div className="db-section-kicker">● PLAYBOOK &amp; CURRICULUM</div>
                    <h1 className="db-section-title">STUDENT GUIDE.</h1>
                    <p className="db-section-sub">
                      Everything you need to navigate CampusCode, from joining a hackathon to completing your final round.
                    </p>
                  </div>

                  {/* Section 1: Playbook Banner */}
                  <div className="db-playbook-banner" style={{ padding: "30px 34px" }}>
                    <span style={{ fontSize: 12.5, fontWeight: 800, letterSpacing: ".12em", color: "var(--db-emerald)", textTransform: "uppercase" }}>
                      YOUR PLAYBOOK
                    </span>
                    <h2 style={{ fontSize: "clamp(26px, 3vw, 32px)", fontWeight: 900, color: "#ffffff", letterSpacing: "-.02em" }}>
                      JOIN. BUILD. SUBMIT. ADVANCE.
                    </h2>
                    <p style={{ fontSize: 15, color: "#92a89c", lineHeight: 1.6, maxWidth: "75ch" }}>
                      Follow the journey in order. Your dashboard and round pages will tell you what is currently available.
                    </p>
                  </div>

                  {/* 7 Steps Playbook Grid */}
                  <div className="db-steps-grid">
                    {[
                      {
                        num: "01",
                        title: "GET STARTED",
                        desc: "Use your Dashboard to see your current activity, notifications and available hackathons.",
                      },
                      {
                        num: "02",
                        title: "JOIN A HACKATHON",
                        desc: "Open Hackathons, review the event information and use JOIN HACKATHON when you are eligible.",
                      },
                      {
                        num: "03",
                        title: "BUILD YOUR TEAM",
                        desc: "After joining, open My Team to create a team or use HackMate AI to discover compatible participants.",
                      },
                      {
                        num: "04",
                        title: "SUBMIT YOUR IDEA",
                        desc: "When Round 1 is live, your team submits its problem statement. A Participant Agreement appears before the official submission.",
                      },
                      {
                        num: "05",
                        title: "ROUND 1 → ROUND 3",
                        desc: "Watch the round status in each workspace. A later round can remain locked until the organizer workflow opens it for your team.",
                      },
                      {
                        num: "06",
                        title: "CHECK RESULTS",
                        desc: "Use Results and Leaderboard to view published outcomes, scores and available organizer feedback.",
                      },
                      {
                        num: "07",
                        title: "USE AI RESPONSIBLY",
                        desc: "IdeaCheck helps you review an idea. RuleBot helps with hackathon rules. Always treat the organizer's official instructions as authoritative.",
                      },
                    ].map((step) => (
                      <div key={step.num} className="db-step-card">
                        <span className="db-step-num">{step.num}</span>
                        <h3 className="db-step-title">{step.title}</h3>
                        <p className="db-step-desc">{step.desc}</p>
                      </div>
                    ))}
                  </div>

                  {/* Section 2: DO THIS vs AVOID THIS */}
                  <div className="db-do-avoid-grid">
                    {/* DO THIS */}
                    <div className="db-rule-box" data-type="do">
                      <div>
                        <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: ".1em", color: "var(--db-emerald)", textTransform: "uppercase" }}>
                          DO THIS
                        </span>
                        <h3 style={{ fontSize: 18, fontWeight: 800, color: "#ffffff", marginTop: 2 }}>
                          WHAT TO DO
                        </h3>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        {[
                          "Read the hackathon details before joining.",
                          "Create or join the correct team for the hackathon.",
                          "Check your round status before preparing a submission.",
                          "Keep your project information accurate and consistent.",
                          "Read official announcements and deadlines.",
                          "Use IdeaCheck and RuleBot as supporting tools.",
                        ].map((item, idx) => (
                          <div key={idx} className="db-rule-item">
                            <span className="db-rule-icon" data-type="do">✓</span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* AVOID THIS */}
                    <div className="db-rule-box" data-type="avoid">
                      <div>
                        <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: ".1em", color: "#f87171", textTransform: "uppercase" }}>
                          AVOID THIS
                        </span>
                        <h3 style={{ fontSize: 18, fontWeight: 800, color: "#ffffff", marginTop: 2 }}>
                          WHAT NOT TO DO
                        </h3>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        {[
                          "Do not submit copied or unauthorized work.",
                          "Do not share account credentials with other people.",
                          "Do not wait until the last moment to check a round.",
                          "Do not treat AI output as an official organizer decision.",
                          "Do not ignore organizer announcements.",
                          "Do not submit to the wrong hackathon or team.",
                        ].map((item, idx) => (
                          <div key={idx} className="db-rule-item">
                            <span className="db-rule-icon" data-type="avoid">✕</span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Section 3: FAQ / COMMON QUESTIONS */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    <div>
                      <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: ".1em", color: "var(--db-emerald)", textTransform: "uppercase" }}>
                        FAQ
                      </span>
                      <h2 style={{ fontSize: 22, fontWeight: 800, color: "#ffffff", marginTop: 2 }}>
                        COMMON QUESTIONS
                      </h2>
                    </div>

                    <div className="db-accordion-wrap">
                      {[
                        {
                          q: "Can I submit Round 1 without a team?",
                          a: "No. The current StudentPanel requires you to be part of a team before Round 1 submission.",
                        },
                        {
                          q: "Why is my round locked?",
                          a: "Watch the round status in each workspace. A later round can remain locked until the organizer workflow opens it for your team.",
                        },
                        {
                          q: "Where should I look for official communication?",
                          a: "Check the Official Communication tab and the verified CampusCode WhatsApp channel for deadline extensions and announcements.",
                        },
                        {
                          q: "Can RuleBot replace organizer instructions?",
                          a: "No. IdeaCheck helps you review an idea and RuleBot helps with hackathon rules, but always treat the organizer's official instructions as authoritative.",
                        },
                      ].map((faq, index) => {
                        const isOpen = openGuideFaq === index
                        return (
                          <div key={index} className="db-accordion-item">
                            <button
                              type="button"
                              className="db-accordion-head"
                              onClick={() => setOpenGuideFaq(isOpen ? null : index)}
                            >
                              <span>{faq.q}</span>
                              <span className="db-accordion-symbol">
                                {isOpen ? "−" : "+"}
                              </span>
                            </button>
                            {isOpen && (
                              <div className="db-accordion-body">
                                {faq.a}
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* ════════════════════ TAB 10: COMM ════════════════════ */}
              {activeTab === "comm" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
                  <div className="db-section-header" style={{ marginBottom: 0 }}>
                    <h1 className="db-section-title" style={{ fontSize: "clamp(34px, 4vw, 46px)", letterSpacing: "-0.03em" }}>
                      OFFICIAL COMMUNICATION.
                    </h1>
                    <p className="db-section-sub" style={{ fontSize: 15.5 }}>
                      Use the official CampusCode channel for important announcements and communication.
                    </p>
                  </div>

                  {/* Hero Card */}
                  <div className="db-comm-hero" style={{ padding: "36px 42px" }}>
                    <div style={{ fontSize: 12.5, fontWeight: 800, letterSpacing: "0.14em", color: "var(--db-lime)", textTransform: "uppercase" }}>
                      CAMPUSCODE OFFICIAL CHANNEL
                    </div>

                    <div className="db-comm-hero-inner">
                      <div className="db-comm-icon-badge" style={{ width: 64, height: 64, borderRadius: 20 }}>
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="3" fill="#ffffff" />
                          <circle cx="12" cy="12" r="8" />
                        </svg>
                      </div>

                      <div style={{ flex: 1 }}>
                        <h2 style={{ fontSize: "clamp(24px, 2.8vw, 32px)", fontWeight: 800, color: "#fff", marginBottom: 10, letterSpacing: "-0.02em" }}>
                          Stay connected.
                        </h2>
                        <p style={{ fontSize: 15, color: "#9caea4", lineHeight: 1.65, maxWidth: 740 }}>
                          Follow the official WhatsApp channel for hackathon updates, announcements, deadlines and important communication.
                        </p>
                      </div>
                    </div>

                    <div style={{ marginTop: 12 }}>
                      <button
                        type="button"
                        className="db-arena-btn"
                        style={{ padding: "13px 28px", fontSize: 13.5, fontWeight: 800 }}
                        onClick={() => window.open("https://whatsapp.com/channel", "_blank")}
                      >
                        OPEN WHATSAPP CHANNEL ↗
                      </button>
                    </div>
                  </div>

                  {/* Two Column Grid */}
                  <div className="db-comm-two-grid">
                    <div className="db-card" style={{ padding: "32px 34px" }}>
                      <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.14em", color: "var(--db-lime)", textTransform: "uppercase", marginBottom: 14 }}>
                        IMPORTANT
                      </div>
                      <h3 style={{ fontSize: 20, fontWeight: 800, color: "#fff", marginBottom: 12, letterSpacing: "-0.01em" }}>
                        Check official updates first.
                      </h3>
                      <p style={{ fontSize: 14.5, color: "#92a89c", lineHeight: 1.65, margin: 0 }}>
                        When a deadline, round instruction or organizer decision changes, rely on the official communication shared by CampusCode and your hackathon organizer.
                      </p>
                    </div>

                    <div className="db-card" style={{ padding: "32px 34px" }}>
                      <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.14em", color: "var(--db-lime)", textTransform: "uppercase", marginBottom: 14 }}>
                        QUICK ACCESS
                      </div>
                      <h3 style={{ fontSize: 20, fontWeight: 800, color: "#fff", marginBottom: 12, letterSpacing: "-0.01em" }}>
                        Keep this channel easy to find.
                      </h3>
                      <p style={{ fontSize: 14.5, color: "#92a89c", lineHeight: 1.65, margin: 0 }}>
                        Save or follow the channel so you can quickly return to official announcements when you are working on a submission.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* ════════════════════ TAB 11: NOTIFICATIONS ════════════════════ */}
              {activeTab === "notifications" && (
                <div>
                  <div className="db-section-header">
                    <div className="db-section-kicker">● INBOX &amp; ALERTS</div>
                    <h1 className="db-section-title">Notifications</h1>
                    <p className="db-section-sub">
                      {unreadCount} unread alert{unreadCount === 1 ? "" : "s"} waiting for your review.
                    </p>
                  </div>

                  <div className="db-pills-row" style={{ marginBottom: 18, justifyContent: "space-between" }}>
                    <div style={{ display: "flex", gap: 10 }}>
                      <button
                        type="button"
                        className="db-pill"
                        data-active={notifFilter === "unread" ? "true" : "false"}
                        onClick={() => setNotifFilter("unread")}
                      >
                        Unread ({unreadCount})
                      </button>
                      <button
                        type="button"
                        className="db-pill"
                        data-active={notifFilter === "all" ? "true" : "false"}
                        onClick={() => setNotifFilter("all")}
                      >
                        All ({notificationsList.length})
                      </button>
                    </div>

                    <button
                      type="button"
                      className="db-pill"
                      onClick={markAllRead}
                    >
                      MARK ALL AS READ ✓
                    </button>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {notificationsList
                      .filter((n) => (notifFilter === "unread" ? n.unread : true))
                      .map((n) => (
                        <div key={n.id} className="db-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 20, padding: "24px 28px" }}>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                              {n.unread && <span style={{ width: 9, height: 9, borderRadius: "50%", background: "var(--db-emerald)", boxShadow: "0 0 10px var(--db-emerald)" }} />}
                              <h3 style={{ fontSize: 18, fontWeight: 800, color: "#fff" }}>{n.title}</h3>
                            </div>
                            <p style={{ fontSize: 14.5, color: "#92a89c", marginTop: 8, lineHeight: 1.6 }}>{n.body}</p>
                          </div>
                          <div style={{ textAlign: "right", flexShrink: 0 }}>
                            <div style={{ fontSize: 12, color: "#6e8276", marginBottom: 8, fontWeight: 600 }}>{n.date}</div>
                            {n.unread && (
                              <button
                                type="button"
                                className="db-pill"
                                style={{ fontSize: 11.5, padding: "5px 12px", fontWeight: 700 }}
                                onClick={() => markAsRead(n.id)}
                              >
                                Mark Read ✓
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* ════════════════════ TAB 12: SUPPORT ════════════════════ */}
              {activeTab === "support" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
                  <div className="db-section-header" style={{ marginBottom: 0 }}>
                    <div style={{ fontSize: 12.5, fontWeight: 800, letterSpacing: "0.14em", color: "var(--db-lime)", textTransform: "uppercase", marginBottom: 10 }}>
                      HELP / SUPPORT
                    </div>
                    <h1 className="db-section-title" style={{ fontSize: "clamp(34px, 4vw, 46px)", letterSpacing: "-0.03em" }}>
                      HELP &amp; SUPPORT.
                    </h1>
                    <p className="db-section-sub" style={{ fontSize: 15.5 }}>
                      Start with the guide and FAQs. If you still need help, use the official communication channel or contact your organizer.
                    </p>
                  </div>

                  <div className="db-support-grid">
                    {/* Card 01 */}
                    <div className="db-support-card" style={{ padding: "32px 34px" }}>
                      <div>
                        <div className="db-support-num-pill" style={{ marginBottom: 20, fontSize: 12.5, padding: "5px 12px" }}>01</div>
                        <h3 style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 12 }}>Student Guide</h3>
                        <p style={{ fontSize: 14.5, color: "#92a89c", lineHeight: 1.65, margin: 0 }}>
                          Learn how the CampusCode workflow works from joining a hackathon through results.
                        </p>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="db-support-btn-outline"
                          style={{ padding: "12px 24px", fontSize: 13 }}
                          onClick={() => setActiveTab("guide")}
                        >
                          OPEN GUIDE →
                        </button>
                      </div>
                    </div>

                    {/* Card 02 */}
                    <div className="db-support-card" style={{ padding: "32px 34px" }}>
                      <div>
                        <div className="db-support-num-pill" style={{ marginBottom: 20, fontSize: 12.5, padding: "5px 12px" }}>02</div>
                        <h3 style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 12 }}>FAQs</h3>
                        <p style={{ fontSize: 14.5, color: "#92a89c", lineHeight: 1.65, margin: 0 }}>
                          Find answers about teams, rounds, submissions, AI assistance and communication.
                        </p>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="db-support-btn-outline"
                          style={{ padding: "12px 24px", fontSize: 13 }}
                          onClick={() => setFaqModal(true)}
                        >
                          VIEW FAQ →
                        </button>
                      </div>
                    </div>

                    {/* Card 03 */}
                    <div className="db-support-card" style={{ padding: "32px 34px" }}>
                      <div>
                        <div className="db-support-num-pill" style={{ marginBottom: 20, fontSize: 12.5, padding: "5px 12px" }}>03</div>
                        <h3 style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 12 }}>Official WhatsApp</h3>
                        <p style={{ fontSize: 14.5, color: "#92a89c", lineHeight: 1.65, margin: 0 }}>
                          Follow the official CampusCode channel for announcements and important updates.
                        </p>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="db-support-btn-outline"
                          style={{ padding: "12px 24px", fontSize: 13 }}
                          onClick={() => setActiveTab("comm")}
                        >
                          OPEN CHANNEL →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ════════════════════ TAB 13: PROFILE ════════════════════ */}
              {activeTab === "profile" && (
                <div>
                  <div className="db-section-header">
                    <div className="db-section-kicker">● ACCOUNT PROFILE</div>
                    <h1 className="db-section-title">Student Profile</h1>
                    <p className="db-section-sub">
                      Manage your CampusCode credentials, college association, and default team handles.
                    </p>
                  </div>

                  <div className="db-card" style={{ maxWidth: 760, padding: "32px 34px" }}>
                    <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
                      <img
                        src={avatarUrl}
                        alt={studentName}
                        style={{ width: 64, height: 64, borderRadius: "50%", objectFit: "cover", border: "2.5px solid var(--db-emerald)", boxShadow: "0 0 24px rgba(47, 229, 158, 0.45)" }}
                      />
                      <div>
                        <h3 style={{ fontSize: 24, fontWeight: 800, color: "#fff" }}>{studentName}</h3>
                        <div style={{ color: "var(--db-emerald)", fontSize: 13, fontWeight: 700, marginTop: 3 }}>
                          {user.college || "Anna University"} · Verified Student Builder
                        </div>
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, margin: "26px 0", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "18px 0" }}>
                      <div>
                        <div style={{ fontSize: 11.5, color: "#8da497", fontWeight: 800, letterSpacing: ".06em" }}>EMAIL</div>
                        <div style={{ fontSize: 14, color: "#fff", marginTop: 4, fontWeight: 600 }}>{user.email}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 11.5, color: "#8da497", fontWeight: 800, letterSpacing: ".06em" }}>DEFAULT TEAM</div>
                        <div style={{ fontSize: 14, color: "var(--db-emerald)", fontWeight: 800, marginTop: 4 }}>spacex</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 11.5, color: "#8da497", fontWeight: 800, letterSpacing: ".06em" }}>CAMPUSCODE ID</div>
                        <div style={{ fontSize: 14, color: "#fff", marginTop: 4, fontWeight: 600 }}>CC-XF989T</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 11.5, color: "#8da497", fontWeight: 800, letterSpacing: ".06em" }}>CAMPUS RANK</div>
                        <div style={{ fontSize: 14, color: "var(--db-emerald)", fontWeight: 800, marginTop: 4 }}>#2 in University</div>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="db-pill"
                      style={{ color: "#f87171", borderColor: "rgba(248, 113, 113, 0.3)", padding: "10px 24px", fontSize: 13, fontWeight: 700 }}
                      onClick={onLogout}
                    >
                      LOG OUT FROM CAMPUSCODE
                    </button>
                  </div>
                </div>
              )}
            </main>
          </div>
        </div>

        {/* ── Journey Modal for ReBuild '26 ── */}
        {journeyModal && (
          <div className="db-modal-overlay" onClick={() => setJourneyModal(false)}>
            <div className="db-modal-box" onClick={(e) => e.stopPropagation()}>
              <button className="db-modal-close" onClick={() => setJourneyModal(false)}>✕</button>

              <div className="db-section-kicker">HACKATHON JOURNEY TRACKER</div>
              <h2 style={{ fontSize: 26, fontWeight: 800, color: "#fff", margin: "8px 0" }}>
                ReBuild '26 Journey
              </h2>
              <div style={{ fontSize: 12, color: "var(--db-emerald)", fontWeight: 700, marginBottom: 18 }}>
                TEAM: spacex · STATUS: REGISTERED · ID: e4271f3c-295a
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ padding: 14, borderRadius: 12, background: "rgba(255,255,255,0.04)", borderLeft: "4px solid var(--db-emerald)" }}>
                  <h4 style={{ color: "#fff", fontSize: 14, fontWeight: 700 }}>Round 1: Dashboard Recreation (CURRENT)</h4>
                  <p style={{ color: "#7a8e83", fontSize: 12.5, marginTop: 4 }}>
                    Recreate CampusCode user flow faithfully — Dashboard, Login, Register, and Student views. Submit demo link before Friday 10 PM.
                  </p>
                  <div style={{ marginTop: 8 }}>
                    <span className="db-event-pill-live">IN PROGRESS · LIVE</span>
                  </div>
                </div>

                <div style={{ padding: 14, borderRadius: 12, background: "rgba(255,255,255,0.04)", borderLeft: "4px solid #6366f1" }}>
                  <h4 style={{ color: "#fff", fontSize: 14, fontWeight: 700 }}>Round 2: Architecture &amp; Live Pitch</h4>
                  <p style={{ color: "#7a8e83", fontSize: 12.5, marginTop: 4 }}>
                    Saturday, 7 Feb (Top performers from Round 1 only). Live architecture teardown with industry judges.
                  </p>
                </div>

                <div style={{ padding: 14, borderRadius: 12, background: "rgba(255,255,255,0.04)", borderLeft: "4px solid #71717a" }}>
                  <h4 style={{ color: "#fff", fontSize: 14, fontWeight: 700 }}>Round 3: Grand Finale &amp; Winner Ceremony</h4>
                  <p style={{ color: "#7a8e83", fontSize: 12.5, marginTop: 4 }}>
                    Winner announcements: ₹50,000 prize stipend, runner-up certificates, and interview fast-tracks.
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="db-arena-btn"
                style={{ width: "100%", justifyContent: "center", marginTop: 20 }}
                onClick={() => {
                  showToast("Please submit your demo URL on Unstop under team 'spacex'!", "ROUND 1 SUBMISSION")
                  setJourneyModal(false)
                }}
              >
                SUBMIT ROUND 1 DEMO URL ↗
              </button>
            </div>
          </div>
        )}

        {/* ── Details Modal for Events ── */}
        {detailsModal && (
          <div className="db-modal-overlay" onClick={() => setDetailsModal(null)}>
            <div className="db-modal-box" onClick={(e) => e.stopPropagation()}>
              <button className="db-modal-close" onClick={() => setDetailsModal(null)}>✕</button>

              <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 12 }}>
                <EventBadge type={detailsModal.type} badge={detailsModal.badge} size={48} />
                <div>
                  <div className="db-section-kicker">{detailsModal.kicker}</div>
                  <h2 style={{ fontSize: 24, fontWeight: 800, color: "#fff", margin: "4px 0 0" }}>
                    {detailsModal.title}
                  </h2>
                </div>
              </div>
              <div style={{ fontSize: 12, color: "var(--db-emerald)", fontWeight: 700, marginBottom: 14 }}>
                CATEGORY: {detailsModal.category}
              </div>

              <p style={{ fontSize: 13.5, color: "#7a8e83", lineHeight: 1.6, marginBottom: 16 }}>
                {detailsModal.description}
              </p>

              <div style={{ marginBottom: 18 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#52635a", marginBottom: 6 }}>PERKS &amp; REWARDS</div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {detailsModal.perks?.map((p: string, i: number) => (
                    <span key={i} className="db-event-pill-live">
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              <button
                type="button"
                className="db-arena-btn"
                style={{ width: "100%" }}
                onClick={() => {
                  showToast(`You are registered for ${detailsModal.title} with team spacex!`, "CAMPUSCODE ARENA")
                  setDetailsModal(null)
                }}
              >
                {detailsModal.status === "LIVE" ? "JOIN ARENA NOW ↗" : "VIEW ARCHIVED RESULTS ↗"}
              </button>
            </div>
          </div>
        )}

        {/* ── FAQ Modal ── */}
        {faqModal && (
          <div className="db-modal-overlay" onClick={() => setFaqModal(false)}>
            <div className="db-modal-box" onClick={(e) => e.stopPropagation()}>
              <button className="db-modal-close" onClick={() => setFaqModal(false)}>✕</button>

              <div className="db-section-kicker">FREQUENTLY ASKED QUESTIONS</div>
              <h2 style={{ fontSize: 26, fontWeight: 800, color: "#fff", margin: "8px 0 18px" }}>
                CampusCode Arena FAQs
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { q: "How do teams work?", a: "You can create or join teams in HackMate AI. Once created, team names are tracked across all your round submissions." },
                  { q: "What is the judging rubric?", a: "Judging is weighted: 40% Architecture & Code, 30% Design & Usability, 20% Originality, 10% Pitch Demo." },
                  { q: "Can I participate from another college?", a: "Yes! Students from any recognized university across India can join the Arena." },
                  { q: "How are certificates delivered?", a: "Certificates are automatically generated and hash verified in your Certificates tab within 48 hours of event completion." },
                ].map((item, idx) => (
                  <div key={idx} style={{ padding: 12, borderRadius: 12, background: "rgba(255,255,255,0.04)" }}>
                    <h4 style={{ color: "var(--db-emerald)", fontSize: 13.5, fontWeight: 700 }}>{item.q}</h4>
                    <p style={{ color: "#7a8e83", fontSize: 12.5, marginTop: 4, lineHeight: 1.5 }}>{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══════════════ FLOATING GLASSPHORIC TOAST NOTIFICATION ══════════════ */}
        {toast && (
          <div className="db-toast-container" key={toast.id}>
            <div className="db-toast-card">
              <div className="db-toast-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <div className="db-toast-content">
                <div className="db-toast-kicker">{toast.title}</div>
                <div className="db-toast-msg">{toast.message}</div>
              </div>
              <button
                type="button"
                className="db-toast-close"
                onClick={() => setToast(null)}
                aria-label="Close"
              >
                ✕
              </button>
              <div className="db-toast-progress" />
            </div>
          </div>
        )}
      </div>
    </>
  )
}
