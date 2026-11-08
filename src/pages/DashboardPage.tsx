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
/* Astro Association Frame & Root */
.db-root {
  display: flex;
  height: 100svh;
  max-height: 100svh;
  width: 100%;
  font-family: "Poppins", "Montserrat", ui-sans-serif, system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  border: clamp(6px, 1.1vw, 12px) solid #8d9cff;
  background-color: #060821;
  background-image: 
    radial-gradient(rgba(141, 156, 255, 0.18) 1px, transparent 1px),
    radial-gradient(circle at 15% 20%, rgba(93, 107, 255, 0.18) 0%, transparent 45%),
    radial-gradient(circle at 85% 80%, rgba(120, 214, 26, 0.12) 0%, transparent 45%),
    url("/login_bg.png");
  background-size: 28px 28px, 100% 100%, 100% 100%, cover;
  background-position: center;
  background-repeat: repeat, no-repeat, no-repeat, no-repeat;
  color: #f2f4ff;
  overflow: hidden;
  position: relative;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.db-root::-webkit-scrollbar { display: none; }
.db-root *, .db-root *::before, .db-root *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* Sidebar */
.db-sidebar {
  width: 270px;
  flex-shrink: 0;
  background: rgba(8, 11, 38, 0.88);
  backdrop-filter: blur(24px) saturate(190%);
  -webkit-backdrop-filter: blur(24px) saturate(190%);
  border-right: 1.5px solid rgba(93, 107, 255, 0.28);
  display: flex;
  flex-direction: column;
  height: 100%;
  z-index: 30;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.db-sidebar::-webkit-scrollbar { display: none; width: 0; }

.db-brand {
  padding: 22px 20px 18px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid rgba(93, 107, 255, 0.2);
  cursor: pointer;
  background: none;
  border-left: none;
  border-right: none;
  border-top: none;
  text-align: left;
  width: 100%;
  transition: opacity .2s;
}
.db-brand:hover { opacity: .9; }

.db-brand-stripes {
  display: flex;
  gap: 3.5px;
  align-items: center;
  height: 24px;
}
.db-stripe {
  width: 5.5px;
  height: 22px;
  border-radius: 2px;
  transform: skewX(-16deg);
}
.db-brand-text {
  display: flex;
  flex-direction: column;
}
.db-brand-title {
  font-weight: 900;
  font-size: 15px;
  letter-spacing: -.02em;
  color: #ffffff;
  line-height: 1.1;
}
.db-brand-sub {
  font-size: 9.5px;
  font-weight: 800;
  letter-spacing: .08em;
  color: #78d61a;
  text-transform: uppercase;
}

.db-nav-group-title {
  padding: 16px 22px 8px;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: .12em;
  color: #8a90bd;
  text-transform: uppercase;
}

.db-nav-list {
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 0 12px;
  list-style: none;
  flex: 1;
}

.db-nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 9px 16px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 700;
  color: #c0c6ea;
  cursor: pointer;
  background: transparent;
  border: none;
  width: 100%;
  text-align: left;
  transition: all .2s cubic-bezier(.2,.8,.2,1);
  position: relative;
  font-family: inherit;
}
.db-nav-item:hover {
  background: rgba(93, 107, 255, 0.16);
  color: #ffffff;
  transform: translateX(2px);
}
/* Signature Lime Active Bubble Pill */
.db-nav-item[data-active="true"] {
  background: #78d61a;
  color: #0b0c16;
  font-weight: 900;
  box-shadow: 0 4px 18px rgba(120, 214, 26, 0.45);
}
.db-nav-item[data-active="true"] .db-nav-icon {
  filter: brightness(0);
}
.db-nav-item[data-active="true"] .db-ai-badge {
  background: #0b0c16;
  color: #78d61a;
}
.db-nav-icon {
  width: 18px;
  height: 18px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  font-size: 15px;
}
.db-ai-badge {
  margin-left: auto;
  font-size: 9px;
  font-weight: 900;
  background: #5d6bff;
  color: #ffffff;
  padding: 2px 7px;
  border-radius: 999px;
  letter-spacing: .06em;
}

.db-user-section {
  padding: 14px 16px;
  border-top: 1px solid rgba(93, 107, 255, 0.2);
  margin-top: auto;
  background: rgba(12, 16, 51, 0.6);
}
.db-user-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  border: 1px solid rgba(93, 107, 255, 0.25);
}
.db-avatar-circle {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: #5d6bff;
  color: #ffffff;
  display: grid;
  place-items: center;
  font-weight: 900;
  font-size: 13px;
  flex-shrink: 0;
  box-shadow: 0 0 12px rgba(93, 107, 255, 0.5);
}
.db-user-meta {
  display: flex;
  flex-direction: column;
  min-width: 0;
  flex: 1;
}
.db-user-name {
  font-size: 12.5px;
  font-weight: 800;
  color: #ffffff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.db-user-role {
  font-size: 9.5px;
  font-weight: 800;
  color: #78d61a;
  letter-spacing: .07em;
  text-transform: uppercase;
}
.db-logout-btn {
  margin-top: 8px;
  width: 100%;
  padding: 7px 12px;
  background: rgba(255, 75, 75, 0.12);
  border: 1px solid rgba(255, 75, 75, 0.35);
  border-radius: 8px;
  color: #ff9999;
  font-size: 11px;
  font-weight: 800;
  cursor: pointer;
  letter-spacing: .06em;
  transition: all .2s;
  text-align: center;
  font-family: inherit;
}
.db-logout-btn:hover {
  background: rgba(255, 75, 75, 0.25);
  color: #ffffff;
}

/* Main Area */
.db-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  height: 100%;
  overflow-y: auto;
  position: relative;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.db-main::-webkit-scrollbar { display: none; width: 0; }

/* Top Header Bar */
.db-header {
  padding: 16px clamp(20px, 3.5vw, 40px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(93, 107, 255, 0.22);
  background: rgba(8, 11, 38, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  position: sticky;
  top: 0;
  z-index: 25;
}
.db-breadcrumb {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: .09em;
  color: #8a90bd;
  text-transform: uppercase;
}
.db-breadcrumb span {
  color: #78d61a;
}
.db-header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}
.db-icon-btn {
  padding: 7px 14px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  border: 1.5px solid rgba(93, 107, 255, 0.3);
  color: #f2f4ff;
  font-size: 12px;
  font-weight: 800;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all .2s;
  font-family: inherit;
}
.db-icon-btn:hover {
  background: #5d6bff;
  border-color: #5d6bff;
  color: #ffffff;
}
.db-bell-pill {
  position: relative;
}
.db-bell-count {
  background: #78d61a;
  color: #0b0c16;
  font-size: 10px;
  font-weight: 900;
  padding: 1px 6px;
  border-radius: 999px;
  margin-left: 2px;
}
.db-header-user {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px 14px 5px 6px;
  background: rgba(255, 255, 255, 0.08);
  border: 1.5px solid rgba(93, 107, 255, 0.35);
  border-radius: 999px;
  font-size: 12px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: .04em;
}
.db-header-avatar {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #78d61a;
  color: #0b0c16;
  font-weight: 900;
  font-size: 11px;
  display: grid;
  place-items: center;
}

/* Dashboard Body Container */
.db-body {
  padding: clamp(24px, 3.5vw, 44px) clamp(20px, 3.5vw, 48px);
  display: flex;
  flex-direction: column;
  gap: 32px;
  max-width: 1360px;
  width: 100%;
  margin: 0 auto;
}

/* Bubble Headings */
.db-page-heading {
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
}
.db-kicker {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: .12em;
  color: #78d61a;
  text-transform: uppercase;
}
.db-kicker-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #78d61a;
  box-shadow: 0 0 10px #78d61a;
  animation: db-pulse 1.8s infinite;
}
@keyframes db-pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.3); opacity: 0.6; }
}

.db-title-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
}

/* Giant Bubble Headline */
.db-page-title {
  font-size: clamp(38px, 5.8vw, 76px);
  font-weight: 900;
  letter-spacing: -.035em;
  line-height: .92;
  color: #ffffff;
  text-transform: uppercase;
  margin-top: 4px;
}
.db-bubble-highlight {
  background: linear-gradient(135deg, #5d6bff 0%, #8d9cff 50%, #78d61a 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 4px 20px rgba(93, 107, 255, 0.4));
}
.db-page-sub {
  font-size: 14.5px;
  color: #9da6ce;
  line-height: 1.6;
  max-width: 65ch;
  margin-top: 4px;
}

/* Live Data Bubble Counter */
.db-counter-box {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
  flex-shrink: 0;
}
.db-counter-val {
  font-size: clamp(40px, 5vw, 64px);
  font-weight: 900;
  line-height: .85;
  color: #ffffff;
  letter-spacing: -.03em;
  font-family: inherit;
}
.db-counter-lbl {
  font-size: 10px;
  font-weight: 800;
  letter-spacing: .16em;
  color: #78d61a;
  text-transform: uppercase;
  margin-top: 6px;
}

/* Filter Bubble Tabs */
.db-filter-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}
.db-filter-left {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}
.db-filter-bubble {
  padding: 8px 20px;
  border-radius: 999px;
  border: 1.5px solid rgba(93, 107, 255, 0.35);
  background: rgba(12, 16, 51, 0.6);
  color: #c8cdf2;
  font-family: inherit;
  font-weight: 800;
  font-size: 12px;
  letter-spacing: .06em;
  cursor: pointer;
  transition: all .2s;
}
.db-filter-bubble:hover {
  background: rgba(93, 107, 255, 0.25);
  color: #ffffff;
  border-color: #5d6bff;
}
.db-filter-bubble[data-active="true"] {
  background: #ffffff;
  color: #0b0c16;
  border-color: #ffffff;
  box-shadow: 0 4px 16px rgba(255, 255, 255, 0.3);
}

/* Frosted Liquid Glass Cards */
.db-glass-card {
  background: linear-gradient(135deg, rgba(16, 22, 64, 0.75) 0%, rgba(10, 14, 44, 0.85) 100%);
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border: 1.5px solid rgba(93, 107, 255, 0.28);
  border-radius: 24px;
  box-shadow: 
    0 24px 60px -15px rgba(0, 0, 0, 0.55),
    inset 0 1px 1px 0 rgba(255, 255, 255, 0.25);
  position: relative;
  overflow: hidden;
  transition: transform .25s cubic-bezier(.2,.8,.2,1), border-color .25s, box-shadow .25s;
}
.db-glass-card:hover {
  border-color: rgba(93, 107, 255, 0.5);
  box-shadow: 
    0 30px 70px -15px rgba(0, 0, 0, 0.65),
    inset 0 1px 1px 0 rgba(255, 255, 255, 0.4);
}

/* Buttons */
.db-lime-btn {
  padding: 12px 28px;
  border-radius: 999px;
  background: #78d61a;
  color: #0b0c16;
  border: none;
  font-family: inherit;
  font-size: 12.5px;
  font-weight: 900;
  letter-spacing: .06em;
  text-transform: uppercase;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 8px 24px -4px rgba(120, 214, 26, 0.5);
  transition: transform .2s, box-shadow .2s;
}
.db-lime-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 30px -4px rgba(120, 214, 26, 0.7);
}
.db-black-btn {
  padding: 10px 22px;
  border-radius: 999px;
  background: #0b0c16;
  color: #ffffff;
  border: 1.5px solid rgba(93, 107, 255, 0.4);
  font-family: inherit;
  font-size: 11.5px;
  font-weight: 800;
  letter-spacing: .06em;
  text-transform: uppercase;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all .2s;
}
.db-black-btn:hover {
  background: #181d4a;
  border-color: #78d61a;
}

/* Hero ReBuild '26 Banner */
.db-hero-card {
  padding: clamp(28px, 3.5vw, 44px);
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 32px;
  align-items: center;
}
.db-hero-glow {
  position: absolute;
  top: -50px;
  right: -50px;
  width: 320px;
  height: 320px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(120, 214, 26, 0.25) 0%, rgba(93, 107, 255, 0.2) 50%, transparent 75%);
  pointer-events: none;
  filter: blur(35px);
}
.db-hero-tag {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: .12em;
  color: #78d61a;
  text-transform: uppercase;
}
.db-hero-title {
  font-size: clamp(34px, 4.5vw, 56px);
  font-weight: 900;
  letter-spacing: -.03em;
  color: #ffffff;
  margin: 6px 0 12px;
  line-height: .95;
}
.db-hero-body {
  font-size: 14px;
  line-height: 1.65;
  color: #a0a8cf;
  max-width: 72ch;
  margin-bottom: 24px;
}
.db-hero-avatars {
  display: flex;
  align-items: center;
  position: relative;
  gap: -12px;
}
.db-hero-avatar-main {
  width: 76px;
  height: 76px;
  border-radius: 50%;
  background: rgba(14, 18, 54, 0.9);
  border: 3px solid #5d6bff;
  display: grid;
  place-items: center;
  font-size: 36px;
  box-shadow: 0 0 25px rgba(93, 107, 255, 0.4);
  z-index: 2;
}
.db-hero-avatar-sub {
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background: #78d61a;
  color: #0b0c16;
  font-weight: 900;
  font-size: 20px;
  display: grid;
  place-items: center;
  margin-left: -20px;
  box-shadow: 0 0 20px rgba(120, 214, 26, 0.5);
  z-index: 1;
}

/* 4 Stat Cards Grid */
.db-stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}
.db-stat-card {
  padding: 22px 24px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.db-stat-label {
  font-size: 10.5px;
  font-weight: 800;
  letter-spacing: .09em;
  text-transform: uppercase;
  color: #8a90bd;
}
.db-stat-val {
  font-size: clamp(38px, 4.2vw, 54px);
  font-weight: 900;
  letter-spacing: -.03em;
  color: #ffffff;
  line-height: .95;
}
.db-stat-foot {
  font-size: 10px;
  font-weight: 800;
  letter-spacing: .08em;
  color: #78d61a;
  text-transform: uppercase;
  margin-top: 4px;
}

/* Event Cards Grid */
.db-events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
  gap: 24px;
}
.db-event-card {
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
}
.db-event-banner-wrap {
  width: 100%;
  height: 110px;
  border-radius: 14px;
  background: linear-gradient(135deg, rgba(93, 107, 255, 0.3) 0%, rgba(120, 214, 26, 0.2) 100%);
  border: 1px solid rgba(93, 107, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  position: relative;
  overflow: hidden;
}
.db-event-banner-left {
  display: flex;
  align-items: center;
  gap: 14px;
}
.db-event-badge-large {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: #0b0c16;
  border: 1.5px solid rgba(255, 255, 255, 0.2);
  display: grid;
  place-items: center;
  font-weight: 900;
  color: #ffffff;
  font-size: 16px;
}
.db-event-banner-text {
  display: flex;
  flex-direction: column;
}
.db-event-banner-kicker {
  font-size: 9px;
  font-weight: 800;
  letter-spacing: .09em;
  color: #8d9cff;
  text-transform: uppercase;
}
.db-event-banner-title {
  font-size: 20px;
  font-weight: 900;
  color: #ffffff;
}
.db-event-top-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 10.5px;
  font-weight: 800;
  letter-spacing: .06em;
}
.db-event-reg-tag {
  color: #8a90bd;
  text-transform: uppercase;
}
.db-event-hash-tag {
  color: #78d61a;
  font-family: "JetBrains Mono", monospace;
  font-size: 10px;
}
.db-event-live-pill {
  padding: 3px 9px;
  border-radius: 999px;
  background: rgba(120, 214, 26, 0.2);
  color: #78d61a;
  border: 1px solid rgba(120, 214, 26, 0.4);
  font-size: 9.5px;
  font-weight: 900;
  letter-spacing: .08em;
}
.db-event-completed-pill {
  padding: 3px 9px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.1);
  color: #a0a8cf;
  border: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 9.5px;
  font-weight: 800;
}
.db-event-main-info {
  display: flex;
  align-items: center;
  gap: 16px;
}
.db-circle-badge {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #78d61a;
  color: #0b0c16;
  font-weight: 900;
  font-size: 16px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  box-shadow: 0 0 16px rgba(120, 214, 26, 0.4);
}
.db-circle-badge[data-dark="true"] {
  background: #0b0c16;
  border: 2px solid #5d6bff;
  color: #ffffff;
  box-shadow: 0 0 16px rgba(93, 107, 255, 0.4);
}
.db-event-title {
  font-size: 21px;
  font-weight: 900;
  color: #ffffff;
  letter-spacing: -.02em;
}
.db-event-meta-line {
  font-size: 11px;
  font-weight: 800;
  color: #8a90bd;
  text-transform: uppercase;
  letter-spacing: .06em;
  margin-top: 4px;
}
.db-event-meta-team {
  font-size: 11px;
  font-weight: 800;
  color: #78d61a;
  text-transform: uppercase;
  letter-spacing: .06em;
}
.db-event-action-btn {
  width: 100%;
  padding: 12px 18px;
  border-radius: 999px;
  background: #78d61a;
  color: #0b0c16;
  border: none;
  font-family: inherit;
  font-size: 12px;
  font-weight: 900;
  letter-spacing: .06em;
  text-transform: uppercase;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all .2s;
  box-shadow: 0 8px 20px -4px rgba(120, 214, 26, 0.4);
}
.db-event-action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 28px -4px rgba(120, 214, 26, 0.6);
}
.db-event-action-btn[data-dark="true"] {
  background: #0b0c16;
  color: #ffffff;
  border: 1.5px solid rgba(93, 107, 255, 0.4);
  box-shadow: 0 8px 20px -4px rgba(0, 0, 0, 0.5);
}
.db-event-action-btn[data-dark="true"]:hover {
  border-color: #5d6bff;
  background: #141944;
}

/* ═════════ SPECIFIC SCREENSHOT 1: DIGITAL CARD (Image 1) ═════════ */
.db-digital-card-grid {
  display: grid;
  grid-template-columns: minmax(360px, 440px) 1fr;
  gap: clamp(24px, 4vw, 56px);
  align-items: center;
}
.db-id-card {
  background: #ffffff;
  color: #0b0c16;
  border-radius: 24px;
  padding: 28px 26px;
  box-shadow: 0 30px 70px -15px rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  gap: 20px;
  border: 1.5px solid rgba(255, 255, 255, 0.85);
  position: relative;
}
.db-id-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.db-id-verified-pill {
  font-size: 10px;
  font-weight: 900;
  letter-spacing: .08em;
  color: #78d61a;
  text-transform: uppercase;
}
.db-id-user-row {
  display: flex;
  align-items: center;
  gap: 16px;
}
.db-id-avatar-circle {
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background: #f1f3ee;
  border: 2px solid #5d6bff;
  display: grid;
  place-items: center;
  font-size: 30px;
}
.db-id-user-info {
  display: flex;
  flex-direction: column;
}
.db-id-student-tag {
  font-size: 9px;
  font-weight: 800;
  letter-spacing: .08em;
  color: #78d61a;
  text-transform: uppercase;
}
.db-id-student-name {
  font-size: 24px;
  font-weight: 900;
  letter-spacing: -.02em;
  color: #0b0c16;
  text-transform: uppercase;
}
.db-id-student-email {
  font-size: 12px;
  color: #71717a;
}
.db-id-divider {
  height: 1px;
  background: #e4e4e7;
  width: 100%;
}
.db-id-meta-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}
.db-id-meta-col {
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.db-id-meta-lbl {
  font-size: 9px;
  font-weight: 800;
  letter-spacing: .08em;
  color: #71717a;
  text-transform: uppercase;
}
.db-id-meta-val {
  font-size: 13px;
  font-weight: 900;
  color: #0b0c16;
}
.db-id-qr-box {
  background: #f4f4f5;
  border-radius: 16px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
.db-id-qr-foot {
  font-size: 8.5px;
  font-weight: 900;
  letter-spacing: .08em;
  color: #71717a;
  text-transform: uppercase;
}

/* Digital Card Right Column */
.db-id-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.db-id-headline {
  font-size: clamp(38px, 5.2vw, 68px);
  font-weight: 900;
  letter-spacing: -.035em;
  line-height: .92;
  color: #ffffff;
}
.db-id-sub {
  font-size: 14.5px;
  color: #a0a8cf;
  line-height: 1.6;
  max-width: 50ch;
}
.db-id-status-bar {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: .08em;
  color: #78d61a;
  text-transform: uppercase;
}
.db-id-btns-row {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 8px;
  flex-wrap: wrap;
}

/* ═════════ SPECIFIC SCREENSHOT 2: RULEBOT AI (Image 2) ═════════ */
.db-rulebot-card {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.db-rulebot-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}
.db-rulebot-status-left {
  display: flex;
  align-items: center;
  gap: 12px;
}
.db-sparkle-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: rgba(93, 107, 255, 0.2);
  border: 1px solid rgba(93, 107, 255, 0.4);
  color: #8d9cff;
  display: grid;
  place-items: center;
  font-size: 18px;
}
.db-rulebot-prompt-box {
  padding: 56px 24px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(93, 107, 255, 0.18);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 12px;
}

/* ═════════ SPECIFIC SCREENSHOT 3: OFFICIAL COMM (Image 3) ═════════ */
.db-comm-hero-card {
  padding: 36px clamp(24px, 4vw, 44px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  background: linear-gradient(135deg, rgba(16, 22, 64, 0.85) 0%, rgba(30, 20, 70, 0.75) 100%);
}
.db-comm-left {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 65ch;
}
.db-comm-icon-box {
  width: 84px;
  height: 84px;
  border-radius: 20px;
  background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%);
  display: grid;
  place-items: center;
  color: #ffffff;
  font-size: 38px;
  box-shadow: 0 10px 30px rgba(124, 58, 237, 0.4);
  flex-shrink: 0;
}
.db-comm-two-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

/* ═════════ SPECIFIC SCREENSHOT 4: NOTIFICATIONS (Image 4) ═════════ */
.db-notifs-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.db-notif-item {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.db-notif-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.db-notif-title-row {
  display: flex;
  align-items: center;
  gap: 10px;
}
.db-green-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #78d61a;
  box-shadow: 0 0 10px #78d61a;
  flex-shrink: 0;
}
.db-notif-title {
  font-size: 17px;
  font-weight: 900;
  color: #ffffff;
}
.db-notif-actions {
  display: flex;
  align-items: center;
  gap: 14px;
}
.db-notif-date {
  font-size: 11px;
  font-weight: 800;
  color: #8a90bd;
  text-transform: uppercase;
}
.db-read-btn {
  padding: 6px 14px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: transparent;
  color: #f2f4ff;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: .08em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all .2s;
  font-family: inherit;
}
.db-read-btn:hover {
  background: #78d61a;
  border-color: #78d61a;
  color: #0b0c16;
}
.db-notif-body {
  font-size: 13.5px;
  color: #c0c6ea;
  line-height: 1.6;
}

/* ═════════ SPECIFIC SCREENSHOT 5: HELP & SUPPORT (Image 5) ═════════ */
.db-support-three-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.db-support-card {
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 240px;
  gap: 20px;
}
.db-support-tag {
  width: fit-content;
  padding: 3px 10px;
  border-radius: 6px;
  background: rgba(93, 107, 255, 0.2);
  color: #8d9cff;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: .08em;
}
.db-support-title {
  font-size: 22px;
  font-weight: 900;
  color: #ffffff;
  letter-spacing: -.02em;
}
.db-support-body {
  font-size: 13px;
  color: #a0a8cf;
  line-height: 1.6;
}

/* Modal Popup */
.db-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(4, 6, 20, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  display: grid;
  place-items: center;
  z-index: 100;
  padding: 20px;
}
.db-modal-box {
  width: 100%;
  max-width: 620px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 36px;
  border-radius: 24px;
  position: relative;
}
.db-modal-close {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  font-size: 18px;
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: all .2s;
}
.db-modal-close:hover {
  background: #ff4b4b;
  border-color: #ff4b4b;
}

/* Responsive */
@media (max-width: 960px) {
  .db-root { flex-direction: column; }
  .db-sidebar { width: 100%; height: auto; max-height: 280px; }
  .db-stats-grid { grid-template-columns: repeat(2, 1fr); }
  .db-digital-card-grid { grid-template-columns: 1fr; }
  .db-comm-hero-card { flex-direction: column; align-items: flex-start; }
  .db-comm-two-grid { grid-template-columns: 1fr; }
  .db-support-three-grid { grid-template-columns: 1fr; }
}
`

/* ---------------------------------------------------------------- COMPONENT */

export default function DashboardPage({
  user = { name: "Shivang Singhal", email: "spacex@campuscode.co.in", college: "Anna University" },
  onLogout,
  onGoHome,
}: DashboardPageProps) {
  const [activeTab, setActiveTab] = React.useState<TabKey>("overview")
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
  const initials = studentName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  const navItems: { key: TabKey; label: string; icon: string; ai?: boolean }[] = [
    { key: "overview", label: "Overview", icon: "🏠" },
    { key: "events", label: "Events", icon: "🏆" },
    { key: "my-events", label: "My Events", icon: "📋" },
    { key: "hackmate", label: "HackMate AI", icon: "🤖", ai: true },
    { key: "ideacheck", label: "IdeaCheck AI", icon: "💡", ai: true },
    { key: "certificates", label: "Certificates", icon: "🎖️" },
    { key: "digital-card", label: "Digital Card", icon: "💳" },
    { key: "rulebot", label: "RuleBot AI", icon: "📜", ai: true },
    { key: "guide", label: "Student Guide", icon: "📖" },
    { key: "comm", label: "Official Communication", icon: "📢" },
    { key: "notifications", label: "Notifications", icon: "🔔" },
    { key: "support", label: "Help & Support", icon: "❓" },
    { key: "profile", label: "Profile", icon: "👤" },
  ]

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

  return (
    <>
      <style>{CSS}</style>
      <div className="db-root">
        {/* ── Left Sidebar ── */}
        <aside className="db-sidebar">
          <button className="db-brand" type="button" onClick={onGoHome} title="Go to CampusCode Homepage">
            <div className="db-brand-stripes">
              <span className="db-stripe" style={{ background: "#0b0c16" }} />
              <span className="db-stripe" style={{ background: "#5d6bff" }} />
              <span className="db-stripe" style={{ background: "#78d61a" }} />
            </div>
            <div className="db-brand-text">
              <span className="db-brand-title">CAMPUSCODE</span>
              <span className="db-brand-sub">HACKATHON ARENA</span>
            </div>
          </button>

          <div className="db-nav-group-title">WORKSPACE</div>

          <ul className="db-nav-list">
            {navItems.map((item) => (
              <li key={item.key}>
                <button
                  type="button"
                  className="db-nav-item"
                  data-active={activeTab === item.key ? "true" : "false"}
                  onClick={() => setActiveTab(item.key)}
                >
                  <span className="db-nav-icon">{item.icon}</span>
                  <span className="db-nav-text">{item.label}</span>
                  {item.ai && <span className="db-ai-badge">AI</span>}
                </button>
              </li>
            ))}
          </ul>

          <div className="db-user-section">
            <div className="db-user-card">
              <div className="db-avatar-circle">{initials}</div>
              <div className="db-user-meta">
                <span className="db-user-name">{studentName}</span>
                <span className="db-user-role">STUDENT BUILDER</span>
              </div>
            </div>
            <button className="db-logout-btn" type="button" onClick={onLogout}>
              LOG OUT
            </button>
          </div>
        </aside>

        {/* ── Main Workspace ── */}
        <main className="db-main">
          {/* Top Bar */}
          <header className="db-header">
            <div className="db-breadcrumb">
              CAMPUSCODE / STUDENT / <span>{activeTab.replace("-", " ")}</span>
            </div>
            <div className="db-header-actions">
              <button className="db-icon-btn db-bell-pill" type="button" onClick={() => setActiveTab("notifications")} title="Notifications">
                🔔 <span className="db-bell-count">{unreadCount}</span>
              </button>
              <button
                className="db-icon-btn"
                type="button"
                onClick={() => alert("Backend data refreshed for " + user.email)}
                title="Refresh Activity"
              >
                ↻ REFRESH
              </button>
              <div className="db-header-user">
                <div className="db-header-avatar">{initials}</div>
                <span>{studentName.toUpperCase()}</span>
              </div>
            </div>
          </header>

          {/* Dynamic Content */}
          <div className="db-body">
            {/* ════════════════════ TAB 1: OVERVIEW ════════════════════ */}
            {activeTab === "overview" && (
              <>
                <div className="db-page-heading">
                  <div className="db-kicker">
                    <span className="db-kicker-dot" />
                    STUDENT WORKSPACE / LIVE
                  </div>
                  <div className="db-title-row">
                    <h1 className="db-page-title">
                      WELCOME BACK, <span className="db-bubble-highlight">{studentName.toUpperCase()}.</span>
                    </h1>
                    <div className="db-counter-box">
                      <div className="db-counter-val">03</div>
                      <div className="db-counter-lbl">LIVE DATA</div>
                    </div>
                  </div>
                  <p className="db-page-sub">
                    Your CampusCode activity is loaded directly from the backend. Compete, match teams, and ship ideas.
                  </p>
                </div>

                {/* Hero Invitation Banner */}
                <div className="db-glass-card db-hero-card">
                  <div className="db-hero-glow" />
                  <div className="db-hero-content">
                    <div className="db-hero-tag">BUILD · LEARN · SHIP & COMPETE</div>
                    <h2 className="db-hero-title">ReBuild '26</h2>
                    <p className="db-hero-body">
                      ReBuild '26 is an individual dashboard-to-hackathon invitation by CampusCode. You participate alone, but you must create a team name for tracking and use it on your Unstop registration, the CampusCode portal and every submission. Round 1: Recreate the CampusCode user flow faithfully — Dashboard, Login, Register, and Student dashboard — and submit your demo any time till 10 PM.
                    </p>
                    <button
                      type="button"
                      className="db-lime-btn"
                      onClick={() => setJourneyModal(true)}
                    >
                      OPEN EVENT ↗
                    </button>
                  </div>
                  <div className="db-hero-avatars">
                    <div className="db-hero-avatar-main">👨‍💻</div>
                    <div className="db-hero-avatar-sub">RE</div>
                  </div>
                </div>

                {/* 4 Stats Cards */}
                <div className="db-stats-grid">
                  <div className="db-glass-card db-stat-card">
                    <span className="db-stat-label">APPLICATIONS</span>
                    <span className="db-stat-val">3</span>
                    <span className="db-stat-foot">FROM 120 ACTIONS</span>
                  </div>
                  <div className="db-glass-card db-stat-card">
                    <span className="db-stat-label">SELECTIONS</span>
                    <span className="db-stat-val">1</span>
                    <span className="db-stat-foot">FROM 120 ACTIONS</span>
                  </div>
                  <div className="db-glass-card db-stat-card">
                    <span className="db-stat-label">CAMPUS RANK</span>
                    <span className="db-stat-val">2</span>
                    <span className="db-stat-foot">ANNA UNIVERSITY</span>
                  </div>
                  <div className="db-glass-card db-stat-card">
                    <span className="db-stat-label">SHORTLISTED</span>
                    <span className="db-stat-val">1</span>
                    <span className="db-stat-foot">ROUND 1 ARENA</span>
                  </div>
                </div>

                {/* Featured Events */}
                <div className="db-page-heading" style={{ marginTop: 12 }}>
                  <div className="db-title-row">
                    <div className="db-kicker">FEATURED / RECENT ACTIVITY</div>
                    <button
                      className="db-icon-btn"
                      type="button"
                      onClick={() => setActiveTab("events")}
                      style={{ fontSize: 11 }}
                    >
                      VIEW ALL ARENA EVENTS ↗
                    </button>
                  </div>
                </div>

                <div className="db-events-grid">
                  {allEvents.slice(0, 2).map((ev) => (
                    <div key={ev.id} className="db-glass-card db-event-card">
                      <div className="db-event-top-row">
                        <span className="db-event-reg-tag">REGISTRATION</span>
                        <span className="db-event-live-pill">{ev.status}</span>
                      </div>
                      <div className="db-event-main-info">
                        <div className="db-circle-badge" data-dark={ev.badgeDark ? "true" : "false"}>
                          {ev.badge}
                        </div>
                        <div>
                          <h3 className="db-event-title">{ev.title}</h3>
                          <div className="db-event-meta-line">{ev.category}</div>
                          <div className="db-event-meta-team">TEAM: {ev.team}</div>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="db-event-action-btn"
                        onClick={() => setJourneyModal(true)}
                      >
                        OPEN JOURNEY ↗
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* ════════════════════ TAB 2: EVENTS ════════════════════ */}
            {activeTab === "events" && (
              <>
                <div className="db-page-heading">
                  <div className="db-kicker">
                    <span className="db-kicker-dot" />
                    DISCOVER / BACKEND DATA
                  </div>
                  <div className="db-title-row">
                    <h1 className="db-page-title">EVENTS.</h1>
                    <div className="db-counter-box">
                      <div className="db-counter-val">03</div>
                      <div className="db-counter-lbl">LIVE DATA</div>
                    </div>
                  </div>
                  <p className="db-page-sub">
                    Explore CampusCode events — hackathons, quizzes, workshops — and join the ones you want.
                  </p>
                </div>

                <div className="db-filter-row">
                  <div className="db-filter-left">
                    <button
                      type="button"
                      className="db-filter-bubble"
                      data-active={eventFilter === "all" ? "true" : "false"}
                      onClick={() => setEventFilter("all")}
                    >
                      All events
                    </button>
                    <button
                      type="button"
                      className="db-filter-bubble"
                      data-active={eventFilter === "hackathons" ? "true" : "false"}
                      onClick={() => setEventFilter("hackathons")}
                    >
                      Hackathons
                    </button>
                    <button
                      type="button"
                      className="db-filter-bubble"
                      data-active={eventFilter === "quizzes" ? "true" : "false"}
                      onClick={() => setEventFilter("quizzes")}
                    >
                      Quizzes
                    </button>
                  </div>
                </div>

                <div className="db-events-grid">
                  {filteredEvents.map((ev) => (
                    <div key={ev.id} className="db-glass-card db-event-card">
                      <div className="db-event-banner-wrap">
                        <div className="db-event-banner-left">
                          <div className="db-event-badge-large">{ev.badge}</div>
                          <div className="db-event-banner-text">
                            <span className="db-event-banner-kicker">{ev.kicker}</span>
                            <span className="db-event-banner-title">{ev.title}</span>
                          </div>
                        </div>
                        {ev.score && (
                          <div style={{ fontSize: 28, fontWeight: 900, color: "rgba(255,255,255,0.4)" }}>
                            {ev.score}
                          </div>
                        )}
                      </div>

                      <div className="db-event-top-row">
                        <span className="db-event-hash-tag">{ev.code.substring(0, 24)}...</span>
                        <span className={ev.status === "LIVE" ? "db-event-live-pill" : "db-event-completed-pill"}>
                          {ev.status}
                        </span>
                      </div>

                      <div>
                        <h3 className="db-event-title">{ev.title}</h3>
                        <p style={{ fontSize: 13, color: "#9da6ce", marginTop: 6, lineHeight: 1.5 }}>
                          {ev.description}
                        </p>
                      </div>

                      <button
                        type="button"
                        className="db-event-action-btn"
                        data-dark={ev.status !== "LIVE" ? "true" : "false"}
                        onClick={() => setDetailsModal(ev)}
                      >
                        {ev.status === "LIVE" ? "OPEN ARENA ↗" : "VIEW DETAILS ↗"}
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* ════════════════════ TAB 3: MY EVENTS ════════════════════ */}
            {activeTab === "my-events" && (
              <>
                <div className="db-page-heading">
                  <div className="db-kicker">
                    <span className="db-kicker-dot" />
                    MY ACTIVITY / BACKEND DATA
                  </div>
                  <div className="db-title-row">
                    <h1 className="db-page-title">MY EVENTS.</h1>
                    <div className="db-counter-box">
                      <div className="db-counter-val">01</div>
                      <div className="db-counter-lbl">LIVE DATA</div>
                    </div>
                  </div>
                  <p className="db-page-sub">
                    Every event you joined, in one place. Open one to see its rounds, team, results and certificates.
                  </p>
                </div>

                <div className="db-events-grid" style={{ gridTemplateColumns: "1fr" }}>
                  <div className="db-glass-card db-event-card" style={{ maxWidth: 520 }}>
                    <div className="db-event-banner-wrap">
                      <div className="db-event-banner-left">
                        <div className="db-event-badge-large">RE</div>
                        <div className="db-event-banner-text">
                          <span className="db-event-banner-kicker">CAMPUSCODE PRESENTS</span>
                          <span className="db-event-banner-title">ReBuild '26</span>
                          <span style={{ fontSize: 9, color: "#78d61a", fontWeight: 800 }}>THE DASHBOARD RECREATION HACKATHON</span>
                        </div>
                      </div>
                    </div>

                    <div className="db-event-top-row">
                      <span className="db-event-reg-tag">REGISTRATION</span>
                      <span className="db-event-hash-tag">e4271f3c-295a-4a93-b193-b1bea9216c32</span>
                    </div>

                    <div className="db-event-main-info">
                      <div className="db-circle-badge">RE</div>
                      <div>
                        <h3 className="db-event-title">ReBuild '26</h3>
                        <div className="db-event-meta-line">STATUS: REGISTERED</div>
                        <div className="db-event-meta-team">TEAM: spacex</div>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="db-event-action-btn"
                      onClick={() => setJourneyModal(true)}
                    >
                      OPEN JOURNEY ↗
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* ════════════════════ TAB 4: HACKMATE AI ════════════════════ */}
            {activeTab === "hackmate" && (
              <>
                <div className="db-page-heading">
                  <div className="db-kicker">
                    <span className="db-kicker-dot" />
                    INTELLIGENCE / HACKMATE
                  </div>
                  <div className="db-title-row">
                    <h1 className="db-page-title">FIND YOUR TEAM.</h1>
                    <div className="db-counter-box">
                      <div className="db-counter-val">
                        {selectedHackathon === "rebuild-26" ? "03" : "00"}
                      </div>
                      <div className="db-counter-lbl">LIVE DATA</div>
                    </div>
                  </div>
                  <p className="db-page-sub">
                    Find registered students from the same hackathon using HackMate match scores. Search by name or CampusCode ID, or scan a teammate's QR on mobile.
                  </p>
                </div>

                <div className="db-glass-card" style={{ padding: "18px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
                  <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: ".08em", color: "#8a90bd", textTransform: "uppercase" }}>
                    SELECT REGISTERED HACKATHON
                  </span>
                  <select
                    style={{ height: 44, padding: "0 18px", borderRadius: 12, background: "rgba(255,255,255,0.08)", border: "1.5px solid rgba(93,107,255,0.35)", color: "#ffffff", fontFamily: "inherit", fontWeight: 700, outline: "none", cursor: "pointer", minWidth: 280 }}
                    value={selectedHackathon}
                    onChange={(e) => setSelectedHackathon(e.target.value)}
                  >
                    <option value="" style={{ background: "#0b0c16" }}>Choose a registered hackathon</option>
                    <option value="rebuild-26" style={{ background: "#0b0c16" }}>ReBuild '26 — The Dashboard Recreation</option>
                  </select>
                </div>

                {selectedHackathon === "" ? (
                  <div className="db-glass-card" style={{ padding: "56px 24px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
                    <div className="db-brand-stripes" style={{ height: 32 }}>
                      <span className="db-stripe" style={{ width: 7, height: 30, background: "#0b0c16" }} />
                      <span className="db-stripe" style={{ width: 7, height: 30, background: "#5d6bff" }} />
                      <span className="db-stripe" style={{ width: 7, height: 30, background: "#78d61a" }} />
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 900, letterSpacing: ".08em", color: "#ffffff", textTransform: "uppercase" }}>
                      NO REGISTERED HACKATHONS
                    </div>
                    <p style={{ fontSize: 13, color: "#8a90bd", maxWidth: 440, lineHeight: 1.6 }}>
                      Register for a hackathon first. HackMate only works with your registered hackathons.
                    </p>
                    <button
                      type="button"
                      className="db-lime-btn"
                      onClick={() => setSelectedHackathon("rebuild-26")}
                      style={{ marginTop: 6 }}
                    >
                      Select ReBuild '26 (Demo) ↗
                    </button>
                  </div>
                ) : (
                  <div className="db-events-grid">
                    {[
                      { name: "Aarav Sharma", role: "Frontend & Motion Lead", match: "98% Match", college: "Anna University", skills: ["React", "Tailwind", "Three.js"] },
                      { name: "Pooja Sundaram", role: "Product & UI/UX Designer", match: "95% Match", college: "SRM University", skills: ["Figma", "Design Systems", "KaTeX"] },
                      { name: "Karthik Raja", role: "Backend & Systems", match: "92% Match", college: "IIT Madras", skills: ["Node.js", "PostgreSQL", "Go"] },
                    ].map((mate, i) => (
                      <div key={i} className="db-glass-card db-event-card">
                        <div className="db-event-top-row">
                          <span className="db-event-reg-tag">{mate.college}</span>
                          <span className="db-event-live-pill">{mate.match}</span>
                        </div>
                        <div className="db-event-main-info">
                          <div className="db-circle-badge" style={{ background: "#5d6bff", color: "#fff" }}>
                            {mate.name[0]}
                          </div>
                          <div>
                            <h3 className="db-event-title" style={{ fontSize: 18 }}>{mate.name}</h3>
                            <div className="db-event-meta-line">{mate.role}</div>
                          </div>
                        </div>
                        <button
                          type="button"
                          className="db-event-action-btn"
                          onClick={() => alert(`Invitation sent to ${mate.name} for team spacex!`)}
                        >
                          INVITE TO TEAM ↗
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* ════════════════════ TAB 5: IDEACHECK AI ════════════════════ */}
            {activeTab === "ideacheck" && (
              <>
                <div className="db-page-heading">
                  <div className="db-kicker">
                    <span className="db-kicker-dot" />
                    CAMPUSCODE INTELLIGENCE / IDEACHECK
                  </div>
                  <div className="db-title-row">
                    <h1 className="db-page-title">IDEACHECK AI.</h1>
                    <div className="db-counter-box">
                      <div className="db-counter-val">01</div>
                      <div className="db-counter-lbl">AI ENGINE</div>
                    </div>
                  </div>
                  <p className="db-page-sub">
                    Check your idea against the CampusCode reference dataset, then get a Gemini-powered explanation and improvement plan.
                  </p>
                </div>

                <div className="db-events-grid" style={{ gridTemplateColumns: "1.35fr 1fr" }}>
                  <div className="db-glass-card" style={{ padding: 28, display: "flex", flexDirection: "column", gap: 16 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span className="db-kicker">01 / YOUR IDEA</span>
                      <span className="db-ai-badge" style={{ background: "#78d61a", color: "#0b0c16", padding: "4px 10px" }}>
                        GEMINI AI
                      </span>
                    </div>
                    <h3 style={{ fontSize: 20, fontWeight: 900, color: "#ffffff" }}>
                      WHAT ARE YOU BUILDING?
                    </h3>
                    <textarea
                      style={{ width: "100%", height: 180, padding: 16, borderRadius: 14, background: "rgba(255,255,255,0.06)", border: "1.5px solid rgba(93,107,255,0.3)", color: "#ffffff", fontFamily: "inherit", fontSize: 14, lineHeight: 1.6, resize: "vertical", outline: "none" }}
                      placeholder="Describe your project idea, the problem it solves, target users and the main features..."
                      defaultValue="A real-time student hackathon arena portal with interactive Gemini AI idea evaluations, team matching, and live digital passes."
                    />
                    <button
                      type="button"
                      className="db-lime-btn"
                      style={{ justifyContent: "center", height: 48 }}
                      onClick={() => alert("Gemini AI Analysis Complete! Match score: 86% Unique against CampusCode dataset.")}
                    >
                      CHECK IDEA WITH AI ↗
                    </button>
                  </div>

                  <div className="db-glass-card" style={{ padding: 28, display: "flex", flexDirection: "column", gap: 16 }}>
                    <span className="db-kicker">HOW IT WORKS</span>
                    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                      <div style={{ display: "flex", gap: 12, padding: 12, borderRadius: 12, background: "rgba(255,255,255,0.04)" }}>
                        <span style={{ fontSize: 11, fontWeight: 900, color: "#0b0c16", background: "#78d61a", padding: "3px 8px", borderRadius: 6, height: "fit-content" }}>01</span>
                        <div>
                          <h4 style={{ fontSize: 13, fontWeight: 800, color: "#fff" }}>DATASET CHECK</h4>
                          <p style={{ fontSize: 12, color: "#9da6ce", marginTop: 2 }}>Compares your idea against the CampusCode reference projects.</p>
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: 12, padding: 12, borderRadius: 12, background: "rgba(255,255,255,0.04)" }}>
                        <span style={{ fontSize: 11, fontWeight: 900, color: "#0b0c16", background: "#78d61a", padding: "3px 8px", borderRadius: 6, height: "fit-content" }}>02</span>
                        <div>
                          <h4 style={{ fontSize: 13, fontWeight: 800, color: "#fff" }}>SIMILARITY</h4>
                          <p style={{ fontSize: 12, color: "#9da6ce", marginTop: 2 }}>Calculates the strongest project similarity and identifies matching references.</p>
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: 12, padding: 12, borderRadius: 12, background: "rgba(255,255,255,0.04)" }}>
                        <span style={{ fontSize: 11, fontWeight: 900, color: "#0b0c16", background: "#78d61a", padding: "3px 8px", borderRadius: 6, height: "fit-content" }}>03</span>
                        <div>
                          <h4 style={{ fontSize: 13, fontWeight: 800, color: "#fff" }}>GEMINI AI</h4>
                          <p style={{ fontSize: 12, color: "#9da6ce", marginTop: 2 }}>Explains what is similar, what is different and how you can improve the idea.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* ════════════════════ TAB 6: CERTIFICATES ════════════════════ */}
            {activeTab === "certificates" && (
              <>
                <div className="db-page-heading">
                  <div className="db-kicker">
                    <span className="db-kicker-dot" />
                    ACCREDITATION & RECORDS
                  </div>
                  <div className="db-title-row">
                    <h1 className="db-page-title">CERTIFICATES.</h1>
                    <div className="db-counter-box">
                      <div className="db-counter-val">02</div>
                      <div className="db-counter-lbl">VERIFIED</div>
                    </div>
                  </div>
                  <p className="db-page-sub">
                    Download and verify your official CampusCode hackathon certificates, ranks and credentials.
                  </p>
                </div>

                <div className="db-events-grid">
                  <div className="db-glass-card db-event-card">
                    <div className="db-event-top-row">
                      <span className="db-event-reg-tag">ISSUED: FEB 2026</span>
                      <span className="db-event-live-pill">VERIFIED ON CHAIN</span>
                    </div>
                    <div className="db-event-main-info">
                      <div className="db-circle-badge">RE</div>
                      <div>
                        <h3 className="db-event-title">ReBuild '26 Participation</h3>
                        <div className="db-event-meta-line">ISSUED TO: {studentName.toUpperCase()}</div>
                        <div className="db-event-meta-team">ID: CC-2026-RB-84920</div>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="db-lime-btn"
                      style={{ justifyContent: "center" }}
                      onClick={() => alert(`Downloading verified PDF for ReBuild '26...`)}
                    >
                      DOWNLOAD CERTIFICATE ↗
                    </button>
                  </div>

                  <div className="db-glass-card db-event-card">
                    <div className="db-event-top-row">
                      <span className="db-event-reg-tag">ISSUED: JAN 2026</span>
                      <span className="db-event-live-pill">SCORE 50/50</span>
                    </div>
                    <div className="db-event-main-info">
                      <div className="db-circle-badge" data-dark="true">FQ</div>
                      <div>
                        <h3 className="db-event-title">FirstCommit '26 Quiz 2.0</h3>
                        <div className="db-event-meta-line">RANK 1 • ACCELERATOR BADGE</div>
                        <div className="db-event-meta-team">ID: CC-2026-FC-11942</div>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="db-lime-btn"
                      style={{ justifyContent: "center" }}
                      onClick={() => alert(`Downloading verified PDF for FirstCommit Quiz...`)}
                    >
                      DOWNLOAD CERTIFICATE ↗
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* ════════════════════ TAB 7: DIGITAL CARD (Exact Match Image 1) ════════════════════ */}
            {activeTab === "digital-card" && (
              <>
                <div className="db-digital-card-grid">
                  {/* Left Column: ID Card */}
                  <div className="db-id-card">
                    <div className="db-id-header">
                      <div className="db-brand-stripes">
                        <span className="db-stripe" style={{ background: "#0b0c16" }} />
                        <span className="db-stripe" style={{ background: "#5d6bff" }} />
                        <span className="db-stripe" style={{ background: "#78d61a" }} />
                        <span style={{ marginLeft: 8, fontWeight: 900, fontSize: 13, color: "#0b0c16", letterSpacing: "-.01em" }}>
                          CAMPUSCODE <span style={{ fontSize: 9, color: "#71717a", fontWeight: 800 }}>HACKATHON ARENA</span>
                        </span>
                      </div>
                      <span className="db-id-verified-pill">VERIFIED</span>
                    </div>

                    <div className="db-id-user-row">
                      <div className="db-id-avatar-circle">
                        👤
                      </div>
                      <div className="db-id-user-info">
                        <span className="db-id-student-tag">STUDENT</span>
                        <span className="db-id-student-name">{studentName}</span>
                        <span className="db-id-student-email">{user.email}</span>
                      </div>
                    </div>

                    <div className="db-id-divider" />

                    <div className="db-id-meta-grid">
                      <div className="db-id-meta-col">
                        <span className="db-id-meta-lbl">CAMPUSCODE ID</span>
                        <span className="db-id-meta-val">CC-XF989T</span>
                      </div>
                      <div className="db-id-meta-col">
                        <span className="db-id-meta-lbl">ROLE</span>
                        <span className="db-id-meta-val">STUDENT</span>
                      </div>
                      <div className="db-id-meta-col">
                        <span className="db-id-meta-lbl">ACCOUNT</span>
                        <span className="db-id-meta-val" style={{ color: "#16a34a" }}>● ACTIVE</span>
                      </div>
                    </div>

                    {/* QR Code Container */}
                    <div className="db-id-qr-box">
                      <svg width="190" height="190" viewBox="0 0 29 29" fill="none">
                        <rect width="29" height="29" fill="#ffffff" rx="4" />
                        {/* QR Position Squares */}
                        <rect x="2" y="2" width="7" height="7" fill="#0b0c16" />
                        <rect x="3" y="3" width="5" height="5" fill="#ffffff" />
                        <rect x="4" y="4" width="3" height="3" fill="#0b0c16" />

                        <rect x="20" y="2" width="7" height="7" fill="#0b0c16" />
                        <rect x="21" y="3" width="5" height="5" fill="#ffffff" />
                        <rect x="22" y="4" width="3" height="3" fill="#0b0c16" />

                        <rect x="2" y="20" width="7" height="7" fill="#0b0c16" />
                        <rect x="3" y="21" width="5" height="5" fill="#ffffff" />
                        <rect x="4" y="22" width="3" height="3" fill="#0b0c16" />

                        {/* QR Alignment and Matrix dots */}
                        <rect x="13" y="13" width="3" height="3" fill="#0b0c16" />
                        <rect x="14" y="14" width="1" height="1" fill="#ffffff" />

                        {/* Timing Lines & Data Elements */}
                        <path d="M10 4h1v1h-1zM12 4h1v1h-1zM14 4h1v1h-1zM16 4h1v1h-1zM18 4h1v1h-1z" fill="#0b0c16" />
                        <path d="M4 10v1h1v-1zM4 12v1h1v-1zM4 14v1h1v-1zM4 16v1h1v-1zM4 18v1h1v-1z" fill="#0b0c16" />
                        <path d="M10 10h2v2h-2zM14 10h1v2h-1zM17 10h2v1h-2zM21 10h3v1h-3zM25 11h2v2h-2z" fill="#0b0c16" />
                        <path d="M10 14h2v1h-2zM13 15h2v2h-2zM17 13h1v3h-1zM20 13h2v2h-2zM24 14h3v1h-3z" fill="#0b0c16" />
                        <path d="M10 17h1v3h-1zM13 18h2v2h-2zM17 17h2v2h-2zM21 16h2v2h-2zM25 17h2v3h-2z" fill="#0b0c16" />
                        <path d="M10 22h3v1h-3zM14 21h2v3h-2zM18 21h1v1h-1zM21 21h1v3h-1zM24 22h3v2h-3z" fill="#0b0c16" />
                        <path d="M10 25h2v2h-2zM13 26h3v1h-3zM18 24h2v2h-2zM21 25h3v2h-3zM25 26h2v1h-2z" fill="#0b0c16" />
                      </svg>
                      <span className="db-id-qr-foot">SCAN TO OPEN PUBLIC CAMPUSCODE PROFILE</span>
                    </div>
                  </div>

                  {/* Right Column: Identity Info */}
                  <div className="db-id-content">
                    <div className="db-kicker">IDENTITY / 01</div>
                    <h1 className="db-id-headline">
                      ONE ID.<br />
                      YOUR CAMPUSCODE.
                    </h1>
                    <p className="db-id-sub">
                      The QR code is generated from the real public profile URL using the CampusCode ID returned by your backend. No placeholder QR pattern is used.
                    </p>
                    <div className="db-id-status-bar">
                      <span className="db-kicker-dot" />
                      BACKEND PROFILE LOADED
                    </div>
                    <div className="db-id-btns-row">
                      <button
                        type="button"
                        className="db-lime-btn"
                        onClick={() => window.print?.()}
                      >
                        PRINT / SAVE ↗
                      </button>
                      <button
                        type="button"
                        className="db-black-btn"
                        onClick={handleCopyProfileLink}
                      >
                        {copiedLink ? "COPIED TO CLIPBOARD ✓" : "COPY PROFILE LINK"}
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* ════════════════════ TAB 8: RULEBOT AI (Exact Match Image 2) ════════════════════ */}
            {activeTab === "rulebot" && (
              <>
                <div className="db-page-heading">
                  <div className="db-kicker">
                    <span className="db-kicker-dot" />
                    CAMPUSCODE INTELLIGENCE / RULEBOT
                  </div>
                  <div className="db-title-row">
                    <h1 className="db-page-title">RULEBOT AI.</h1>
                    <div className="db-counter-box">
                      <div className="db-counter-val">24/7</div>
                      <div className="db-counter-lbl">INSTANT GROUNDING</div>
                    </div>
                  </div>
                  <p className="db-page-sub">
                    Ask questions against the selected hackathon's organizer-uploaded rulebook.
                  </p>
                </div>

                <div className="db-glass-card db-rulebot-card">
                  <div className="db-rulebot-top">
                    <div className="db-rulebot-status-left">
                      <div className="db-sparkle-icon">✦</div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 900, color: "#fff", letterSpacing: ".06em" }}>RULEBOT</div>
                        <div style={{ fontSize: 9.5, fontWeight: 800, color: rulebotHackathon ? "#78d61a" : "#8a90bd", letterSpacing: ".08em", textTransform: "uppercase" }}>
                          {rulebotHackathon ? "ACTIVE RULEBOOK: REBUILD '26" : "RULEBOOK NOT AVAILABLE"}
                        </div>
                      </div>
                    </div>

                    <select
                      className="db-select-input"
                      value={rulebotHackathon}
                      onChange={(e) => setRulebotHackathon(e.target.value)}
                    >
                      <option value="">Choose a registered hackathon</option>
                      <option value="rebuild-26">ReBuild '26 — The Dashboard Recreation</option>
                    </select>
                  </div>

                  {rulebotHackathon === "" ? (
                    <div className="db-rulebot-prompt-box">
                      <div style={{ fontSize: 16, fontWeight: 900, color: "#ffffff", letterSpacing: ".06em", textTransform: "uppercase" }}>
                        SELECT A HACKATHON
                      </div>
                      <p style={{ fontSize: 13, color: "#9da6ce", maxWidth: 440, lineHeight: 1.6 }}>
                        RuleBot needs a specific hackathon because its answers are grounded in that event's rulebook.
                      </p>
                      <button
                        type="button"
                        className="db-lime-btn"
                        onClick={() => setRulebotHackathon("rebuild-26")}
                        style={{ marginTop: 6 }}
                      >
                        Select ReBuild '26 Rulebook ↗
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                      {/* Suggested Chips */}
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        {[
                          "What is the deadline for Round 1?",
                          "Can I use AI coding tools like Antigravity?",
                          "Can I participate alone or is a team required?",
                          "What are the Round 2 selection criteria?",
                        ].map((chip) => (
                          <button
                            key={chip}
                            type="button"
                            className="db-filter-bubble"
                            style={{ fontSize: 11, padding: "6px 14px" }}
                            onClick={() => {
                              setRulebotInput(chip)
                            }}
                          >
                            {chip}
                          </button>
                        ))}
                      </div>

                      {/* Chat Messages */}
                      <div style={{ minHeight: 180, display: "flex", flexDirection: "column", gap: 12, padding: "16px 0" }}>
                        <div style={{ background: "rgba(93, 107, 255, 0.15)", padding: "12px 16px", borderRadius: 12, border: "1px solid rgba(93, 107, 255, 0.3)", maxWidth: "80%" }}>
                          <span style={{ fontSize: 10, fontWeight: 900, color: "#78d61a", letterSpacing: ".06em" }}>RULEBOT AI</span>
                          <p style={{ fontSize: 13, color: "#f2f4ff", marginTop: 4, lineHeight: 1.5 }}>
                            Welcome! I'm grounded in the official <strong>ReBuild '26</strong> rulebook. Ask any question about submissions, tech stacks, or judging timelines.
                          </p>
                        </div>

                        {rulebotChat.map((msg, idx) => (
                          <div
                            key={idx}
                            style={{
                              alignSelf: msg.from === "user" ? "flex-end" : "flex-start",
                              background: msg.from === "user" ? "#5d6bff" : "rgba(255,255,255,0.08)",
                              padding: "10px 16px",
                              borderRadius: 12,
                              maxWidth: "80%",
                              fontSize: 13,
                              color: "#fff",
                            }}
                          >
                            {msg.text}
                          </div>
                        ))}
                      </div>

                      {/* Input Box */}
                      <div style={{ display: "flex", gap: 12 }}>
                        <input
                          type="text"
                          placeholder="Ask anything about the ReBuild '26 rulebook..."
                          value={rulebotInput}
                          onChange={(e) => setRulebotInput(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && handleSendRulebot()}
                          style={{ flex: 1, height: 46, padding: "0 16px", borderRadius: 12, background: "rgba(255,255,255,0.06)", border: "1.5px solid rgba(93,107,255,0.3)", color: "#fff", outline: "none", fontFamily: "inherit" }}
                        />
                        <button
                          type="button"
                          className="db-lime-btn"
                          onClick={handleSendRulebot}
                        >
                          ASK RULEBOT ↗
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* ════════════════════ TAB 9: STUDENT GUIDE ════════════════════ */}
            {activeTab === "guide" && (
              <>
                <div className="db-page-heading">
                  <div className="db-kicker">
                    <span className="db-kicker-dot" />
                    CURRICULUM & PLAYBOOK
                  </div>
                  <div className="db-title-row">
                    <h1 className="db-page-title">STUDENT GUIDE.</h1>
                    <div className="db-counter-box">
                      <div className="db-counter-val">04</div>
                      <div className="db-counter-lbl">MODULES</div>
                    </div>
                  </div>
                  <p className="db-page-sub">
                    Master the art of competitive coding, team hacking, and pitch presentations.
                  </p>
                </div>

                <div className="db-events-grid">
                  {[
                    { title: "01. Pitch Deck Blueprint", desc: "How to structure your 3-minute hackathon demo video to captivate judges." },
                    { title: "02. Fast Prototyping Stack", desc: "Next.js, Tailwind, and Supabase patterns to ship from zero to production in 12 hours." },
                    { title: "03. Hackathon Ethics & Git", desc: "Commit habits, branch conventions, and how judges inspect commit timestamps." },
                    { title: "04. Offline Check-in Etiquette", desc: "What to bring to campus venue check-in: QR pass, laptop chargers, and college ID." },
                  ].map((guide, idx) => (
                    <div key={idx} className="db-glass-card db-event-card">
                      <h3 style={{ fontSize: 18, fontWeight: 900, color: "#78d61a" }}>{guide.title}</h3>
                      <p style={{ fontSize: 13, color: "#9da6ce", lineHeight: 1.6 }}>{guide.desc}</p>
                      <button type="button" className="db-icon-btn" style={{ width: "fit-content" }}>
                        READ MODULE ↗
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* ════════════════════ TAB 10: OFFICIAL COMMUNICATION (Exact Match Image 3) ════════════════════ */}
            {activeTab === "comm" && (
              <>
                <div className="db-page-heading">
                  <div className="db-kicker">
                    <span className="db-kicker-dot" />
                    COMMUNICATION / OFFICIAL
                  </div>
                  <div className="db-title-row">
                    <h1 className="db-page-title">OFFICIAL COMMUNICATION.</h1>
                    <div className="db-counter-box">
                      <div className="db-counter-val">01</div>
                      <div className="db-counter-lbl">CHANNEL</div>
                    </div>
                  </div>
                  <p className="db-page-sub">
                    Use the official CampusCode channel for important announcements and communication.
                  </p>
                </div>

                {/* Big Hero Stay Connected Card */}
                <div className="db-glass-card db-comm-hero-card">
                  <div className="db-comm-left">
                    <span className="db-kicker">CAMPUSCODE OFFICIAL CHANNEL</span>
                    <h2 style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 900, color: "#ffffff", letterSpacing: "-.03em" }}>
                      Stay connected.
                    </h2>
                    <p style={{ fontSize: 14, color: "#a0a8cf", lineHeight: 1.6, marginBottom: 12 }}>
                      Follow the official WhatsApp channel for hackathon updates, announcements, deadlines and important communication.
                    </p>
                    <button
                      type="button"
                      className="db-lime-btn"
                      onClick={() => window.open("https://whatsapp.com/channel", "_blank")}
                      style={{ width: "fit-content" }}
                    >
                      OPEN WHATSAPP CHANNEL ↗
                    </button>
                  </div>

                  <div className="db-comm-icon-box">
                    📡
                  </div>
                </div>

                {/* 2 Info Cards Below */}
                <div className="db-comm-two-grid">
                  <div className="db-glass-card" style={{ padding: 26, display: "flex", flexDirection: "column", gap: 10 }}>
                    <span className="db-kicker">IMPORTANT</span>
                    <h3 style={{ fontSize: 20, fontWeight: 900, color: "#ffffff" }}>
                      Check official updates first.
                    </h3>
                    <p style={{ fontSize: 13, color: "#a0a8cf", lineHeight: 1.6 }}>
                      When a deadline, round instruction or organizer decision changes, rely on the official communication shared by CampusCode and your hackathon organizer.
                    </p>
                  </div>

                  <div className="db-glass-card" style={{ padding: 26, display: "flex", flexDirection: "column", gap: 10 }}>
                    <span className="db-kicker">QUICK ACCESS</span>
                    <h3 style={{ fontSize: 20, fontWeight: 900, color: "#ffffff" }}>
                      Keep this channel easy to find.
                    </h3>
                    <p style={{ fontSize: 13, color: "#a0a8cf", lineHeight: 1.6 }}>
                      Save or follow the channel so you can quickly return to official announcements when you are working on a submission.
                    </p>
                  </div>
                </div>
              </>
            )}

            {/* ════════════════════ TAB 11: NOTIFICATIONS (Exact Match Image 4) ════════════════════ */}
            {activeTab === "notifications" && (
              <>
                <div className="db-page-heading">
                  <div className="db-kicker">
                    <span className="db-kicker-dot" />
                    ALERTS / BACKEND DATA
                  </div>
                  <div className="db-title-row">
                    <h1 className="db-page-title">NOTIFICATIONS.</h1>
                    <div className="db-counter-box">
                      <div className="db-counter-val">
                        {String(unreadCount).padStart(2, "0")}
                      </div>
                      <div className="db-counter-lbl">LIVE DATA</div>
                    </div>
                  </div>
                  <p className="db-page-sub">
                    Only unread notifications are shown by default. Mark them read as you go.
                  </p>
                </div>

                {/* Filter and Mark All Read Row */}
                <div className="db-filter-row">
                  <div className="db-filter-left">
                    <button
                      type="button"
                      className="db-filter-bubble"
                      data-active={notifFilter === "unread" ? "true" : "false"}
                      onClick={() => setNotifFilter("unread")}
                    >
                      UNREAD ({unreadCount})
                    </button>
                    <button
                      type="button"
                      className="db-filter-bubble"
                      data-active={notifFilter === "all" ? "true" : "false"}
                      onClick={() => setNotifFilter("all")}
                    >
                      ALL ({notificationsList.length})
                    </button>
                  </div>

                  <button
                    type="button"
                    className="db-black-btn"
                    onClick={markAllRead}
                  >
                    MARK ALL AS READ ✓
                  </button>
                </div>

                {/* Notifications List */}
                <div className="db-notifs-list">
                  {notificationsList
                    .filter((n) => (notifFilter === "unread" ? n.unread : true))
                    .map((notif) => (
                      <div key={notif.id} className="db-glass-card db-notif-item">
                        <div className="db-notif-header">
                          <div className="db-notif-title-row">
                            {notif.unread && <span className="db-green-dot" />}
                            <h3 className="db-notif-title">{notif.title}</h3>
                          </div>
                          <div className="db-notif-actions">
                            <span className="db-notif-date">{notif.date}</span>
                            {notif.unread && (
                              <button
                                type="button"
                                className="db-read-btn"
                                onClick={() => markAsRead(notif.id)}
                              >
                                MARK AS READ
                              </button>
                            )}
                          </div>
                        </div>
                        <p className="db-notif-body">{notif.body}</p>
                      </div>
                    ))}

                  {notificationsList.filter((n) => (notifFilter === "unread" ? n.unread : true)).length === 0 && (
                    <div className="db-glass-card" style={{ padding: 48, textAlign: "center", color: "#8a90bd" }}>
                      ✓ You are all caught up! No unread notifications.
                    </div>
                  )}
                </div>
              </>
            )}

            {/* ════════════════════ TAB 12: HELP & SUPPORT (Exact Match Image 5) ════════════════════ */}
            {activeTab === "support" && (
              <>
                <div className="db-page-heading">
                  <div className="db-kicker">
                    <span className="db-kicker-dot" />
                    HELP / SUPPORT
                  </div>
                  <div className="db-title-row">
                    <h1 className="db-page-title">HELP & SUPPORT.</h1>
                    <div className="db-counter-box">
                      <div className="db-counter-val">24/7</div>
                      <div className="db-counter-lbl">STUDENT DESK</div>
                    </div>
                  </div>
                  <p className="db-page-sub">
                    Start with the guide and FAQs. If you still need help, use the official communication channel or contact your organizer.
                  </p>
                </div>

                <div className="db-support-three-grid">
                  {/* Card 1: Student Guide */}
                  <div className="db-glass-card db-support-card">
                    <div>
                      <span className="db-support-tag">01</span>
                      <h3 className="db-support-title" style={{ marginTop: 14 }}>Student Guide</h3>
                      <p className="db-support-body" style={{ marginTop: 8 }}>
                        Learn how the CampusCode workflow works from joining a hackathon through results.
                      </p>
                    </div>
                    <button
                      type="button"
                      className="db-black-btn"
                      onClick={() => setActiveTab("guide")}
                    >
                      OPEN GUIDE →
                    </button>
                  </div>

                  {/* Card 2: FAQs */}
                  <div className="db-glass-card db-support-card">
                    <div>
                      <span className="db-support-tag">02</span>
                      <h3 className="db-support-title" style={{ marginTop: 14 }}>FAQs</h3>
                      <p className="db-support-body" style={{ marginTop: 8 }}>
                        Find answers about teams, rounds, submissions, AI assistance and communication.
                      </p>
                    </div>
                    <button
                      type="button"
                      className="db-black-btn"
                      onClick={() => setFaqModal(true)}
                    >
                      VIEW FAQ →
                    </button>
                  </div>

                  {/* Card 3: Official WhatsApp */}
                  <div className="db-glass-card db-support-card">
                    <div>
                      <span className="db-support-tag">03</span>
                      <h3 className="db-support-title" style={{ marginTop: 14 }}>Official WhatsApp</h3>
                      <p className="db-support-body" style={{ marginTop: 8 }}>
                        Follow the official CampusCode channel for announcements and important updates.
                      </p>
                    </div>
                    <button
                      type="button"
                      className="db-black-btn"
                      onClick={() => setActiveTab("comm")}
                    >
                      OPEN CHANNEL →
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* ════════════════════ TAB 13: PROFILE ════════════════════ */}
            {activeTab === "profile" && (
              <>
                <div className="db-page-heading">
                  <div className="db-kicker">
                    <span className="db-kicker-dot" />
                    ACCOUNT SETTINGS
                  </div>
                  <div className="db-title-row">
                    <h1 className="db-page-title">PROFILE.</h1>
                    <div className="db-counter-box">
                      <div className="db-counter-val">#001</div>
                      <div className="db-counter-lbl">ID</div>
                    </div>
                  </div>
                  <p className="db-page-sub">
                    Manage your student credentials, connected email, college association and team names.
                  </p>
                </div>

                <div className="db-glass-card db-event-card" style={{ maxWidth: 640 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div className="db-circle-badge" style={{ width: 64, height: 64, fontSize: 24 }}>
                      {initials}
                    </div>
                    <div>
                      <h3 style={{ fontSize: 22, fontWeight: 900, color: "#fff" }}>{studentName}</h3>
                      <div style={{ color: "#78d61a", fontWeight: 800, fontSize: 12 }}>
                        {user.college || "Anna University"} · STUDENT BUILDER
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 12 }}>
                    <div>
                      <span className="db-stat-label">EMAIL ADDRESS</span>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginTop: 4 }}>
                        {user.email}
                      </div>
                    </div>
                    <div>
                      <span className="db-stat-label">DEFAULT TEAM</span>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#78d61a", marginTop: 4 }}>
                        spacex
                      </div>
                    </div>
                    <div>
                      <span className="db-stat-label">TIER</span>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginTop: 4 }}>
                        Student Arena (Verified)
                      </div>
                    </div>
                    <div>
                      <span className="db-stat-label">CAMPUS RANK</span>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#78d61a", marginTop: 4 }}>
                        #2 in University
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="db-logout-btn"
                    style={{ marginTop: 18, height: 42, fontSize: 12 }}
                    onClick={onLogout}
                  >
                    LOG OUT FROM CAMPUSCODE
                  </button>
                </div>
              </>
            )}
          </div>
        </main>

        {/* ── Journey Modal for ReBuild '26 ── */}
        {journeyModal && (
          <div className="db-modal-overlay" onClick={() => setJourneyModal(false)}>
            <div className="db-glass-card db-modal-box" onClick={(e) => e.stopPropagation()}>
              <button className="db-modal-close" onClick={() => setJourneyModal(false)}>✕</button>

              <div className="db-kicker">HACKATHON JOURNEY TRACKER</div>
              <h2 style={{ fontSize: 32, fontWeight: 900, color: "#fff", margin: "8px 0" }}>
                ReBuild '26 Journey
              </h2>
              <div style={{ fontSize: 12, color: "#78d61a", fontWeight: 800, marginBottom: 20 }}>
                TEAM: spacex · STATUS: REGISTERED · ID: e4271f3c-295a
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ padding: 16, borderRadius: 12, background: "rgba(255,255,255,0.05)", borderLeft: "4px solid #78d61a" }}>
                  <h4 style={{ color: "#fff", fontSize: 14, fontWeight: 800 }}>Round 1: Dashboard Recreation (CURRENT)</h4>
                  <p style={{ color: "#a0a8cf", fontSize: 13, marginTop: 4 }}>Recreate CampusCode user flow faithfully — Dashboard, Login, Register, and Student views. Submit demo link before Friday 10 PM.</p>
                  <div style={{ marginTop: 8 }}>
                    <span className="db-event-live-pill">IN PROGRESS · LIVE</span>
                  </div>
                </div>

                <div style={{ padding: 16, borderRadius: 12, background: "rgba(255,255,255,0.05)", borderLeft: "4px solid #5d6bff" }}>
                  <h4 style={{ color: "#fff", fontSize: 14, fontWeight: 800 }}>Round 2: Architecture & Live Pitch</h4>
                  <p style={{ color: "#a0a8cf", fontSize: 13, marginTop: 4 }}>Saturday, 7 Feb (Top performers from Round 1 only). Live architecture teardown with industry judges.</p>
                  <div style={{ marginTop: 8 }}>
                    <span className="db-event-completed-pill">UPCOMING</span>
                  </div>
                </div>

                <div style={{ padding: 16, borderRadius: 12, background: "rgba(255,255,255,0.05)", borderLeft: "4px solid #8a90bd" }}>
                  <h4 style={{ color: "#fff", fontSize: 14, fontWeight: 800 }}>Round 3: Grand Finale & Winner Ceremony</h4>
                  <p style={{ color: "#a0a8cf", fontSize: 13, marginTop: 4 }}>Winner announcements: ₹50,000 prize stipend, runner-up certificates, and interview fast-tracks.</p>
                </div>
              </div>

              <button
                type="button"
                className="db-lime-btn"
                style={{ width: "100%", justifyContent: "center", marginTop: 24, height: 48 }}
                onClick={() => {
                  alert("Submission link: Please paste your demo URL on the Unstop portal under team 'spacex'!")
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
            <div className="db-glass-card db-modal-box" onClick={(e) => e.stopPropagation()}>
              <button className="db-modal-close" onClick={() => setDetailsModal(null)}>✕</button>

              <div className="db-kicker">{detailsModal.kicker}</div>
              <h2 style={{ fontSize: 32, fontWeight: 900, color: "#fff", margin: "8px 0" }}>
                {detailsModal.title}
              </h2>
              <div style={{ fontSize: 12, color: "#78d61a", fontWeight: 800, marginBottom: 16 }}>
                CATEGORY: {detailsModal.category}
              </div>

              <p style={{ fontSize: 14, color: "#a0a8cf", lineHeight: 1.6, marginBottom: 20 }}>
                {detailsModal.description}
              </p>

              <div style={{ marginBottom: 20 }}>
                <div className="db-stat-label" style={{ marginBottom: 8 }}>PERKS & REWARDS</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {detailsModal.perks.map((p: string, i: number) => (
                    <span key={i} className="db-event-live-pill" style={{ background: "rgba(93,107,255,0.2)", color: "#8d9cff", borderColor: "rgba(93,107,255,0.4)" }}>
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              <button
                type="button"
                className="db-lime-btn"
                style={{ width: "100%", justifyContent: "center", height: 48 }}
                onClick={() => {
                  alert(`You are registered for ${detailsModal.title} with team spacex!`)
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
            <div className="db-glass-card db-modal-box" onClick={(e) => e.stopPropagation()}>
              <button className="db-modal-close" onClick={() => setFaqModal(false)}>✕</button>

              <div className="db-kicker">FREQUENTLY ASKED QUESTIONS</div>
              <h2 style={{ fontSize: 30, fontWeight: 900, color: "#fff", margin: "8px 0 20px" }}>
                CampusCode Arena FAQs
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { q: "How do teams work?", a: "You can create or join teams in HackMate AI. Once created, team names are tracked across all your round submissions." },
                  { q: "What is the judging rubric?", a: "Judging is weighted: 40% Architecture & Code, 30% Design & Usability, 20% Originality, 10% Pitch Demo." },
                  { q: "Can I participate from another college?", a: "Yes! Students from any recognized university across India can join the Arena." },
                  { q: "How are certificates delivered?", a: "Certificates are automatically generated and cryptographic hash verified in your Certificates tab within 48 hours of event completion." },
                ].map((item, idx) => (
                  <div key={idx} style={{ padding: 14, borderRadius: 12, background: "rgba(255,255,255,0.05)" }}>
                    <h4 style={{ color: "#78d61a", fontSize: 14, fontWeight: 800 }}>{item.q}</h4>
                    <p style={{ color: "#c0c6ea", fontSize: 13, marginTop: 4, lineHeight: 1.5 }}>{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
