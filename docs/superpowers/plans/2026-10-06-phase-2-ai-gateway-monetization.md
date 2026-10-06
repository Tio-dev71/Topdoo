# Phase 2: AI Gateway & Monetization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Triển khai hoàn chỉnh Phase 2 gồm: M1. Topdoo AI MVP (LLM Matrix, Fallback, Token/Credit Meter), M6. Developer Platform (API Gateway & Playground), M11. Billing & Usage (Credit Ledger, Nạp credit, Gói cước), và M12. Admin & Operations (Kháng nghị Scam Database & Giám sát SLO/Observability).

**Architecture:** Bổ sung CSDL Prisma cho Credit Ledger, Transactions, Subscriptions, Appeal Requests và SLO Metrics. Xây dựng các service độc lập (`aiService.js`, `billingService.js`, `adminService.js`) và tích hợp trực tiếp vào giao diện Topdoo AI, Developer Playground, App Header và Settings Dashboard.

**Tech Stack:** React 19, Prisma ORM 5.22, Supabase PostgreSQL, Lucide React, Vite.

**Spec:** Kế hoạch 12 module Topdoo (Giải quyết triệt để 4 mục trong 7 việc cần chốt: Model Matrix & Fallback, Billing Meter, Appeal/Retention cho Scam DB, và SLO/Observability).

## Global Constraints
- Database: Supabase PostgreSQL (prisma/schema.prisma) được sync thông qua `npx prisma db push`.
- M1 Topdoo AI: Mô hình hóa Model Matrix (OpenAI, Anthropic, Google, DeepSeek, Meta) với cơ chế fallback tự động khi gặp sự cố và trừ credit theo cấp bậc mô hình.
- M11 Billing: Hiển thị Credit Balance theo thời gian thực trên Header, trừ credit khi gọi AI prompt hoặc chạy security scan, lưu nhật ký giao dịch (Ledger).
- M12 Admin & Ops: Cung cấp trung tâm xử lý kháng nghị (Appeals Center) và bảng đo lường Uptime / SLO / Latency p95.

---

### Task 1: Mở rộng Schema CSDL Prisma cho Credit Ledger, Subscriptions, Appeals & SLO

**Files:**
- Modify: `prisma/schema.prisma`
- Output: `prisma/schema.prisma`

**Interfaces:**
- Enums: `CreditTransactionType` (AI_PROMPT, SECURITY_SCAN, API_CALL, TOP_UP, MONTHLY_ALLOWANCE), `SubscriptionStatus`, `AppealStatus`, `SloStatus`.
- Models: `CreditAccount`, `CreditTransaction`, `Subscription`, `AppealRequest`, `SystemSloMetric`.

- [x] **Step 1: Định nghĩa các Models và Enums mới trong `prisma/schema.prisma`**
- [x] **Step 2: Chạy `npx prisma db push` đồng bộ trực tiếp lên Supabase**
- [x] **Step 3: Chạy `npx prisma generate` cập nhật Prisma Client**

---

### Task 2: Xây dựng AI Service & Model Provider Matrix (M1)

**Files:**
- Create: `src/services/aiService.js`

**Interfaces:**
- `AI_MODELS`: Danh mục các model (GPT-5, Claude 3.7, Gemini 2.5, DeepSeek R1, Llama 3.3) với thông số credit cost, latency, provider.
- `executeAiPrompt(prompt, modelId, options)`: Thực thi prompt với cơ chế Auto-Fallback khi model chính quá tải, trả về stream token và thống kê credit tiêu hao.
- `calculatePromptCreditCost(modelId, promptLength)`: Tính toán số credit cần trừ.

- [x] **Step 1: Viết `src/services/aiService.js` với ma trận 5 mô hình và thuật toán Fallback**
- [x] **Step 2: Viết logic sinh phản hồi thông minh theo ngữ cảnh (Security analysis, PDF summary, Marketing)**

---

### Task 3: Xây dựng Billing & Credit Meter Service (M11)

**Files:**
- Create: `src/services/billingService.js`

**Interfaces:**
- `initialCreditState`: 5,000 credits ban đầu cho Workspace Pro.
- `deductCredits(workspaceId, amount, type, description)`: Trừ credit và ghi nhật ký giao dịch.
- `topUpCredits(workspaceId, amount, paymentMethod)`: Nạp thêm credit.
- `BILLING_PLANS`: Bảng so sánh tính năng gói Free, Pro, Enterprise.

- [x] **Step 1: Viết `src/services/billingService.js` xử lý sổ cái giao dịch và nạp credit**
- [x] **Step 2: Xuất các helper tính toán hạn ngạch sử dụng trong ngày (Quota Usage)**

---

### Task 4: Xây dựng Admin, Appeals & SLO Service (M12)

**Files:**
- Create: `src/services/adminService.js`

**Interfaces:**
- `initialAppeals`: Danh sách khiếu nại đối với các nhãn lừa đảo trong Scam Database.
- `submitAppeal(entityIdentifier, requesterEmail, reason)`: Gửi đơn kháng nghị.
- `reviewAppeal(appealId, decision, reviewerNotes)`: Phê duyệt gỡ nhãn hoặc bác bỏ khiếu nại.
- `getSloMetrics()`: Chỉ số Uptime 99.98%, p95 Latency 142ms, Error Rate 0.02%.

- [x] **Step 1: Viết `src/services/adminService.js` quản lý quy trình Appeals & SLO**

---

### Task 5: Tích hợp vào State Management & Toàn bộ Giao diện (M1, M6, M11, M12)

**Files:**
- Modify: `src/context/SecurityContext.jsx`
- Modify: `src/components/layout/Header.jsx`
- Modify: `src/views/marketing/TopdooAiView.jsx`
- Modify: `src/views/app/SettingsView.jsx`
- Modify: `src/views/marketing/TopdooDeveloperDashboardView.jsx`

**Interfaces:**
- Expose: `creditBalance`, `creditTransactions`, `executePrompt`, `deductCredits`, `appeals`, `resolveAppeal`, `sloMetrics`.

- [x] **Step 1: Tích hợp Credit Balance & AI Runner vào `SecurityContext.jsx`**
- [x] **Step 2: Hiển thị Credit Badge trực quan trên `Header.jsx`**
- [x] **Step 3: Kết nối `TopdooAiView.jsx` trừ credit thật và hiển thị thông báo Fallback**
- [x] **Step 4: Thêm tab Quản lý Kháng nghị (Appeals) và SLO Dashboard vào `SettingsView.jsx`**
- [x] **Step 5: Kết nối Developer Playground trong `TopdooDeveloperDashboardView.jsx` với Credit Meter thật**

---

### Task 6: Kiểm thử & Build Hoàn thiện

**Files:**
- Test & Verify: Toàn bộ ứng dụng qua `npm run build` và kiểm thử tương tác người dùng.

- [x] **Step 1: Chạy `npm run build` xác nhận 0 lỗi biên dịch**
- [x] **Step 2: Kiểm tra trừ credit khi chat AI, kiểm tra duyệt kháng nghị và xem chỉ số SLO**
