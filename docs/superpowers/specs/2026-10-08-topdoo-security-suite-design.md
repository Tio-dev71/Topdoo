# Topdoo Security Suite & Auth Navigation Design Spec

**Date:** 2026-10-08  
**Topic:** Topdoo Security Universal Scanner Suite, Threat Radar & Auth State Continuity  
**Status:** Approved by User  

---

## 1. Problem Statement & User Needs
1. **Auth State Continuity:** When a user is already logged in (e.g. `App Topmedia (USER)`), navigating through the security funnel or clicking "Bắt đầu bảo vệ ngay" was mistakenly sending them back to Step 1 (Register Account form) in `TopdooGetProtectView.jsx`, asking them for full name, email, phone, and password again.
2. **Security Suite Completeness:** The user wants to complete the entire security feature set today on `topdoo-security` (`TopdooSecurityView.jsx`) by integrating:
   - A live **Universal Security Scanner** with 4 tabs:
     - URL & Phishing Scanner
     - Data Breach / Leak Checker (Email & Phone)
     - Password Entropy & Leak Audit
     - IP & Server Reputation Lookup
   - An interactive **AI Threat Scorecard** (Score 0-100, status tags, detailed metrics).
   - A **Live Threat Radar & Security Feed** displaying real-time global & Vietnam threat alerts.
   - Seamless 1-click bridge to the internal **SecOps Enterprise Console** (`mode: 'app'`).

---

## 2. Architecture & Component Structure

### A. Auth State Continuity Fixes
1. **`TopdooSecurityView.jsx`**:
   - Extract `user` from `useSecurity()`.
   - Primary CTA "Bắt đầu bảo vệ ngay" dynamically routes:
     - If logged in: routes directly to `topdoo-plan-security` (Chọn gói) or `topdoo-get-protect` in Step 2.
     - If guest: routes to `topdoo-get-protect` in Step 1.
2. **`TopdooGetProtectView.jsx`**:
   - Extract `user` from `useSecurity()`.
   - Set initial `currentStep = user ? 2 : 1`.
   - Sync `formData` with `user.fullName` and `user.email`.
   - In Step 1, if user is logged in, show an authenticated status card with a prominent "Tiếp tục sang bước chọn gói bảo vệ" button instead of blank signup fields.
3. **`SecurityContext.jsx` & Header/Home CTAs**:
   - `openAuthModal` verifies if `user` is already logged in. If logged in, notifies user of active session rather than presenting login/signup forms.
   - `PublicWebsite.jsx` hero and banner CTAs route logged-in users directly to Developer Dashboard / Security Hub instead of opening auth modal.

### B. Universal Security Scanner (`TopdooSecurityView.jsx`)
1. **4 Scanning Modes**:
   - **Mode 1 (`url`)**: Scans URLs/Domains. Checks SSL certificates, domain age, known malicious signatures, phishing indicators.
   - **Mode 2 (`breach`)**: Checks email/phone numbers against simulated & known breach records, highlighting compromised services and risk levels.
   - **Mode 3 (`password`)**: Audits password entropy, calculates brute-force crack time, tests against top common breached password lists locally with 100% privacy.
   - **Mode 4 (`ip`)**: Performs IP & server threat analysis, ASN lookup, geo-location, and proxy/tor/malware detection.
2. **Scan States & Simulation Engine**:
   - `idle` -> `scanning` (animated progress bar, step messages, pulsing badges) -> `complete` (Scorecard, risk analysis, action items).
3. **Interactive Threat Scorecard**:
   - Circular/radial SVG gauge for Security Score (0 - 100).
   - Severity badges: `AN TOÀN` (85-100), `CẢNH BÁO` (60-84), `NGUY HIỂM` (<60).
   - Technical breakdown: Protocol security, reputation index, identity safety, server health.
   - Actions: "Tải báo cáo phân tích", "Quét mục tiêu khác", "Bảo vệ ngay".

### C. Live Threat Radar & Security Feed
1. **Radar Canvas / Visual Widget**:
   - 360-degree rotating radar sweep with glowing blips.
   - Active threat count counter (`1.428+` threats neutralized in last 24h).
2. **Real-time Incident Feed**:
   - Ticker of intercepted phishing domains, suspicious banking clones, ransomware signatures.
   - Location flags and timestamps.

### D. SecOps Console Direct Bridge
- 1-Click launcher directly opening `setMode('app')` into `quick-check`, `scam-database`, `monitoring`, or `alerts`.

---

## 3. Verification Plan
1. Test logged-in user navigation from `topdoo-security` -> "Bắt đầu bảo vệ ngay" -> verifies that user goes straight to Plan Selection without asking to register again.
2. Verify all 4 tabs of the Universal Security Scanner on `topdoo-security` (interactive inputs, scan transitions, result scorecards).
3. Run `npm run build` to confirm zero bundle errors.
4. Deploy to VPS (`157.66.100.35`) and test on live browser `https://topdoo.com/topdoo-security`.
