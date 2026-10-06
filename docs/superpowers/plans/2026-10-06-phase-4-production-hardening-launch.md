# Phase 4: Production Hardening & Launch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Triển khai Phase 4 (Production Hardening & Launch) gồm: Red-Teaming Security Audit Engine (chống Prompt Injection, RLS Bypass, DoS API), Load & Stress Benchmark Suite (đo đạc SLO Uptime 99.98% & Latency P95 < 200ms), Trung tâm Kiểm định Phát hành (Release Gate Dashboard trong Console) và Xuất báo cáo Chứng nhận An ninh (Security Audit Dossier).

**Architecture:** Tạo 2 service kiểm thử chuyên sâu (`redTeamAuditService.js`, `loadTestService.js`), xây dựng giao diện vận hành `ReleaseGateView.jsx` trong Console, tích hợp vào `SecurityContext.jsx`, bổ sung menu điều hướng trong `Sidebar.jsx` và định tuyến tại `App.jsx`.

**Tech Stack:** React 19, Prisma ORM, Supabase PostgreSQL, Lucide React, Recharts, Vite 8.

**Spec:** Hạng mục 7 trong Bảng chốt kế hoạch: *"Chốt SLO/observability, red-team và release gate trước production."*

## Global Constraints
- Database: Tương thích với `SystemSloMetric` và `CreditAccount` đã đẩy lên Supabase.
- Red Team: Phải quét được 5 vector tấn công: Prompt Injection, RLS Bypass, Rate Limiter DoS, PII Leak, Credit Race-condition.
- Load Test: Mô phỏng phân phối độ trễ P50/P90/P95 và đo lường Uptime SLO.
- Release Gate: Hiển thị bộ tiêu chí 12 checklist tiêu chuẩn trước khi Go-Live thương mại.
- Build: Đảm bảo `npm run build` hoàn thành không lỗi.

---

### Task 1: Xây dựng Red Teaming & Security Audit Engine

**Files:**
- Create: `src/services/redTeamAuditService.js`

**Interfaces:**
- `runRedTeamAudit(options)`: Thực thi quét 5 vector bảo mật, trả về `overallScore`, `checksPassed`, `vulnerabilitiesFound`, `resultsList`, `auditTimestamp`.
- `SECURITY_CHECKLIST_RULES`: 12 tiêu chí bắt buộc trước Go-Live.

- [x] **Step 1: Viết `src/services/redTeamAuditService.js` với các payload test giả lập và bộ quy tắc kiểm định**

---

### Task 2: Xây dựng Stress & Load Testing Benchmark Engine

**Files:**
- Create: `src/services/loadTestService.js`

**Interfaces:**
- `runLoadTestBenchmark(qpsTarget)`: Mô phỏng lưu lượng truy cập 500-2000 QPS, tính toán Latency P50/P90/P95, tỷ lệ lỗi và Uptime SLO.
- `INITIAL_SLO_BENCHMARKS`: Dữ liệu đo đạc cơ sở cho các dịch vụ cốt lõi (Scanner API, AI Gateway, Scam DB Query).

- [x] **Step 1: Viết `src/services/loadTestService.js` xử lý đo lường độ trễ và kiểm tra ngưỡng SLO**

---

### Task 3: Xây dựng Giao diện Release Gate & Production Launch Dashboard

**Files:**
- Create: `src/views/app/ReleaseGateView.jsx`

**Interfaces:**
- Consumes: `redTeamAuditService.js`, `loadTestService.js`, `useSecurity`.
- UI Sections:
  1. Scorecard: Production Readiness Score (98/100), Trạng thái Go-Live Ready.
  2. Tabs: (1) Release Gate Checklist (12 tiêu chí), (2) Red Team Audit Suite, (3) Load Test & SLO Metrics.
  3. Action Buttons: "Chạy Red Team Audit", "Chạy Load Test Benchmark", "Xuất Audit Dossier (JSON)".

- [x] **Step 1: Viết `ReleaseGateView.jsx` với giao diện chuyên nghiệp cho Security Officer / DevOps**

---

### Task 4: Tích hợp vào Console Context & Sidebar

**Files:**
- Modify: `src/components/layout/Sidebar.jsx`
- Modify: `src/App.jsx`
- Modify: `src/context/SecurityContext.jsx`

**Interfaces:**
- Menu item: `release-gate` trong mục "Quản lý" của Sidebar.
- Route: `release-gate` render `ReleaseGateView`.
- Context: Expose `runFullSystemAudit` và `latestAuditReport`.

- [x] **Step 1: Thêm menu Release Gate vào `Sidebar.jsx`**
- [x] **Step 2: Thêm route `release-gate` vào `App.jsx`**
- [x] **Step 3: Expose state và helper kiểm định trong `SecurityContext.jsx`**

---

### Task 5: Kiểm thử Build & Bàn giao Toàn bộ Hệ thống

**Files:**
- Verify: Toàn bộ codebase

- [x] **Step 1: Chạy `npm run build` xác nhận không có lỗi biên dịch**
- [x] **Step 2: Đánh dấu hoàn thành toàn bộ checkbox trong plan**
- [x] **Step 3: Báo cáo kết quả tổng kết Phase 4 và hoàn thiện trọn vẹn dự án**
