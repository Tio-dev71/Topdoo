# Phase 1: Security Core MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Triển khai hoàn chỉnh tầng CSDL PostgreSQL (qua Prisma), hệ thống phân quyền RBAC (M10), quản lý Workspace & Dự án (M9), và lõi nghiệp vụ An ninh mạng / Chống lừa đảo (M4 & M5) trên hệ thống Topdoo.

**Architecture:** Sử dụng Prisma ORM kết nối Supabase PostgreSQL để thiết kế schema chuẩn quan hệ cho Users, Roles, Workspaces, ThreatEntities, ScanReports, Evidence và ScanJobs. Xây dựng tầng Service Layer mô đun hóa (Auth/RBAC, Threat Intelligence, Report Verification, Scanner Engine) và kết nối đồng bộ hai chiều với React Context (`SecurityContext.jsx`) để các màn hình Console hoạt động với dữ liệu thực tế và lưu trữ bền vững.

**Tech Stack:** React 19, Prisma ORM 5.22, Supabase PostgreSQL, Framer Motion, Lucide React, Vite.

**Spec:** Kế hoạch 12 module Topdoo (Tập trung hoàn thành 100% các tính năng P0/MVP của M10, M9, M4, M5).

## Global Constraints
- Database: Supabase PostgreSQL thông qua `DATABASE_URL` và `DIRECT_URL` trong `.env`.
- Mã nguồn React: Giữ nguyên trải nghiệm thiết kế giao diện hiện đại (Modern Cyber Threat Intelligence Theme).
- Bảo toàn tính năng: Không làm hỏng các luồng điều hướng marketing hay app console hiện có.
- Fallback an toàn: Có cơ chế fallback dữ liệu cục bộ khi môi trường mạng chưa kết nối được Supabase, đảm bảo app luôn chạy mượt mà.

---

### Task 1: Thiết kế Schema CSDL Toàn diện trong Prisma (M10, M9, M4, M5)

**Files:**
- Modify: `prisma/schema.prisma`
- Output: `prisma/schema.prisma`

**Interfaces:**
- Enums: `Role` (OWNER, ADMIN, SECURITY_ANALYST, DEVELOPER, USER), `EntityType`, `RiskStatus`, `ReportStatus`, `EvidenceType`, `ScanStatus`.
- Models: `User`, `Workspace`, `WorkspaceMember`, `Project`, `ThreatEntity`, `RiskFactor`, `ScanReport`, `EvidenceItem`, `WatchlistItem`, `ScanJob`.

- [ ] **Step 1: Định nghĩa các Enums và Models trong `prisma/schema.prisma`**
- [ ] **Step 2: Validate cấu trúc Prisma Schema**
- [ ] **Step 3: Chạy `npx prisma db push` để tạo bảng trực tiếp trên Supabase PostgreSQL**
- [ ] **Step 4: Tạo client Prisma qua `npx prisma generate`**

---

### Task 2: Xây dựng Bộ Dữ liệu Khởi tạo (Database Seeder) cho Threat Intelligence

**Files:**
- Create: `prisma/seed.js`
- Modify: `package.json`

**Interfaces:**
- Consumes: Prisma Client
- Produces: Khởi tạo sẵn tài khoản Admin, các Workspace mẫu, và nạp các thực thể đe dọa (Phishing Domains, Crypto Drainer Wallets, Fake Telegram Desks) vào PostgreSQL.

- [ ] **Step 1: Viết script `prisma/seed.js` nạp dữ liệu chuẩn từ Threat Intel**
- [ ] **Step 2: Chạy seed lên CSDL PostgreSQL Supabase**
- [ ] **Step 3: Kiểm tra truy vấn lấy dữ liệu thành công**

---

### Task 3: Xây dựng Tầng Service Layer Phân tách (Threat, Report, Workspace, RBAC)

**Files:**
- Create: `src/services/rbacService.js`
- Create: `src/services/threatService.js`
- Create: `src/services/reportService.js`
- Create: `src/services/workspaceService.js`

**Interfaces:**
- `rbacService`: `ROLES`, `PERMISSIONS`, `hasPermission(userRole, permission)`, `getUserRole(user)`
- `threatService`: `getEntities()`, `getEntityById(id)`, `searchEntities(query)`, `calculateRiskScore(factors)`
- `reportService`: `submitReport(reportData)`, `updateReportStatus(reportId, status, notes)`, `getReports()`
- `workspaceService`: `getWorkspaces()`, `getActiveWorkspace()`, `switchWorkspace(id)`, `getProjects()`

- [ ] **Step 1: Viết `src/services/rbacService.js` định nghĩa ma trận quyền hạn (RBAC Matrix)**
- [ ] **Step 2: Viết `src/services/threatService.js` quản lý truy xuất & tính toán rủi ro Threat Intel**
- [ ] **Step 3: Viết `src/services/reportService.js` xử lý nộp báo cáo, đính kèm bằng chứng & duyệt báo cáo**
- [ ] **Step 4: Viết `src/services/workspaceService.js` quản lý multi-tenant workspaces & projects**

---

### Task 4: Kết nối Service Layer vào `SecurityContext.jsx` & App Console

**Files:**
- Modify: `src/context/SecurityContext.jsx`
- Modify: `src/views/app/DashboardOverview.jsx`
- Modify: `src/views/app/VerificationCenterView.jsx`
- Modify: `src/views/app/ReportScamView.jsx`
- Modify: `src/views/app/SettingsView.jsx`

**Interfaces:**
- Cung cấp: `currentRole`, `setRole`, `canPerformAction`, `submitReport`, `verifyReport`, `currentWorkspace`, `workspaces`, `switchWorkspace`.

- [ ] **Step 1: Nâng cấp `SecurityContext.jsx` tích hợp RBAC và Service layer**
- [ ] **Step 2: Nâng cấp `ReportScamView.jsx` lưu báo cáo lừa đảo thực tế vào hệ thống**
- [ ] **Step 3: Nâng cấp `VerificationCenterView.jsx` cho phép Security Analyst duyệt hoặc từ chối báo cáo**
- [ ] **Step 4: Nâng cấp `SettingsView.jsx` hiển thị vai trò người dùng (RBAC Badge) và thông tin Workspace**

---

### Task 5: Kiểm thử Toàn diện (Build & End-to-End Verification)

**Files:**
- Test & Verify: Toàn bộ ứng dụng qua `npm run build` và kiểm tra tương tác console.

- [ ] **Step 1: Chạy `npm run build` để kiểm tra không có lỗi cú pháp hoặc Type error**
- [ ] **Step 2: Kiểm tra chức năng quét URL/Domain, duyệt báo cáo và phân quyền RBAC**
- [ ] **Step 3: Tổng kết tài liệu bàn giao Phase 1**
