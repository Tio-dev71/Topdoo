# Topdoo Security Suite & Auth Continuity Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement full security suite features (Universal Security Scanner with 4 tabs, AI Threat Scorecard, Live Threat Radar) and fix auth state continuity so logged-in users are never asked to register or login again across all security and marketing funnels.

**Architecture:** Client-side React with rich interactive UI components, integrating directly into `TopdooSecurityView.jsx`, `TopdooGetProtectView.jsx`, `PublicWebsite.jsx`, and `SecurityContext.jsx`. The scanning engine performs realistic client-side analysis and threat modeling with instant feedback, scoring, and SecOps console handoff.

**Tech Stack:** React 19, Lucide React icons, Tailwind/CSS3 Glassmorphism tokens, Supabase Auth.

**Spec:** `docs/superpowers/specs/2026-10-08-topdoo-security-suite-design.md`

## Global Constraints
- Do not break existing responsive layout or Vite production build.
- Preserve all existing Supabase and local authentication states.
- Maintain premium Topdoo visual aesthetics: glassmorphism, emerald accent (`#059669`, `#10B981`), smooth transitions.

---

### Task 1: Fix Auth Continuity in Funnel (`TopdooGetProtectView.jsx` & Navigation)

**Files:**
- Modify: `src/views/marketing/TopdooGetProtectView.jsx`
- Modify: `src/views/marketing/TopdooSecurityView.jsx`
- Modify: `src/views/marketing/PublicWebsite.jsx`
- Modify: `src/context/SecurityContext.jsx`

- [ ] **Step 1: Update `TopdooGetProtectView.jsx`**
  - Extract `user` from `useSecurity()`.
  - Initialize `currentStep` to `user ? 2 : 1`.
  - Add an effect to switch `currentStep` to 2 whenever `user` is detected.
  - In Step 1, render a clean card showing current logged-in identity with a button to continue directly to Step 2.

- [ ] **Step 2: Update `TopdooSecurityView.jsx` primary CTA**
  - Extract `user` from `useSecurity()`.
  - Change "Bắt đầu bảo vệ ngay" click handler: if user is logged in, navigate directly to `topdoo-plan-security` or `topdoo-get-protect` (which opens at Step 2).

- [ ] **Step 3: Update `PublicWebsite.jsx` CTAs**
  - For hero and banner trial buttons, if `user` exists, route to `topdoo-developer-dashboard` instead of opening the signup modal.

- [ ] **Step 4: Update `SecurityContext.jsx` openAuthModal**
  - If `user` is already logged in, do not re-open auth modal; show toast confirming active session.

---

### Task 2: Build Universal Security Scanner Component (`TopdooSecurityView.jsx`)

**Files:**
- Modify: `src/views/marketing/TopdooSecurityView.jsx`
- Modify: `src/index.css`

- [ ] **Step 1: Implement Scanner UI state and tab handlers**
  - Support 4 tabs: `url` (Website/Phishing), `breach` (Data Breach), `password` (Password Strength), `ip` (IP/Server).
  - Add input bar with scan action button, loading progress indicator, and simulated AI scan timeline.

- [ ] **Step 2: Implement Analysis and Threat Scorecard Engine**
  - Compute security score (0-100), risk status (`Safe`, `Warning`, `High Risk`).
  - Render gauge, detailed audit checklist (4 metrics), and actionable recommendations.
  - Provide "Quét lại", "Tải báo cáo", "Kích hoạt bảo vệ" actions.

---

### Task 3: Build Live Threat Radar & Security Feed (`TopdooSecurityView.jsx`)

**Files:**
- Modify: `src/views/marketing/TopdooSecurityView.jsx`
- Modify: `src/index.css`

- [ ] **Step 1: Create rotating 360-degree Threat Radar widget**
  - Radial radar animation with pulsing threat blips and active counter.

- [ ] **Step 2: Create Live Incident Feed ticker**
  - Live stream of recent neutralized phishing, malware, and brand impersonation domains in Vietnam and globally.

---

### Task 4: Connect Direct Bridge to SecOps Console & Build/Deploy Verification

**Files:**
- Modify: `src/views/marketing/TopdooSecurityView.jsx`

- [ ] **Step 1: Wire 1-Click SecOps Console navigation**
  - Wire buttons to `setMode('app')` and `setCurrentView('quick-check' | 'scam-database' | 'overview')`.

- [ ] **Step 2: Build and Deploy to Production**
  - Run `npm run build` locally.
  - Deploy updated bundle to VPS `157.66.100.35:/var/www/topdoo`.
  - Verify live on `https://topdoo.com/topdoo-security` and `https://topdoo.com/topdoo-get-protect`.
