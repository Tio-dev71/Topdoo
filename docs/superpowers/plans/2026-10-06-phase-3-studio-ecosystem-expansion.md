# Phase 3: Studio & Ecosystem Expansion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Triển khai hoàn chỉnh Phase 3 gồm: M2. Topdoo Studio (Interactive Canvas Editor & Asset Generator), M3. Topdoo Tools (Dynamic Tool Catalog, Filter & Rating/Review Engine), M7. Topdoo Academy (Khóa học an ninh số & AI thực chiến), và M8. Topdoo Community (Diễn đàn cộng đồng, chia sẻ cảnh báo lừa đảo & template).

**Architecture:** Mở rộng CSDL Supabase PostgreSQL thông qua Prisma ORM cho Studio Projects, AI Tools, Reviews, Academy Courses và Community Posts. Tạo 4 service module độc lập (`studioService.js`, `toolsCatalogService.js`, `academyService.js`, `communityService.js`) và tích hợp hai chiều vào `SecurityContext.jsx`, kết nối hệ thống trừ AI credit tự động và định tuyến qua `App.jsx`, `MarketingHeader.jsx`.

**Tech Stack:** React 19, Prisma ORM 5.22, Supabase PostgreSQL, Lucide React, Framer Motion, Vite 8.

**Spec:** Lộ trình 12 module Topdoo (Hoàn thiện toàn bộ 4 module cuối cùng: M2, M3, M7, M8).

## Global Constraints
- Database: Supabase PostgreSQL (prisma/schema.prisma) được sync thông qua `npx prisma db push`.
- M2 Topdoo Studio: Khởi tạo Canvas Workspace tương tác, cho phép sinh nội dung AI (bài viết, ảnh, kịch bản video) kèm trừ credit từ `CreditAccount`.
- M3 Topdoo Tools: CSDL động hỗ trợ lọc, bookmark, bình luận và đánh giá sao (1-5 sao).
- M7 Academy: Màn hình khóa học thực chiến, thanh đo tiến độ học tập và cấp chứng chỉ.
- M8 Community: Diễn đàn chia sẻ cảnh báo lừa đảo, thảo luận kỹ thuật an ninh mạng, like & comment thời gian thực.
- Giữ vững tốc độ build sạch (`npm run build`), không làm gãy các route hiện có.

---

### Task 1: Mở rộng Prisma Schema cho Phase 3 (M2, M3, M7, M8)

**Files:**
- Modify: `prisma/schema.prisma`
- Output: `prisma/schema.prisma`

**Interfaces:**
- Enums: `StudioProjectType` (TEXT, IMAGE, VIDEO, AUDIO, PRESENTATION, DESIGN), `ToolPricingType` (FREE, FREEMIUM, PAID, CONTACT), `CourseLevel` (BEGINNER, INTERMEDIATE, ADVANCED), `CommunityCategory` (THREAT_ALERT, AI_DISCUSSION, TOOL_FEEDBACK, TUTORIAL).
- Models: `StudioProject`, `AiTool`, `ToolReview`, `SavedTool`, `AcademyCourse`, `CommunityPost`, `CommunityComment`.

- [x] **Step 1: Khai báo Enums và Models Phase 3 trong `prisma/schema.prisma`**
- [x] **Step 2: Chạy `npx prisma db push` đẩy schema lên Supabase PostgreSQL**
- [x] **Step 3: Chạy `npx prisma generate` cập nhật Prisma Client**

---

### Task 2: Xây dựng Bộ Service Layer (Studio, Tools, Academy, Community)

**Files:**
- Create: `src/services/studioService.js`
- Create: `src/services/toolsCatalogService.js`
- Create: `src/services/academyService.js`
- Create: `src/services/communityService.js`

**Interfaces:**
- `studioService`: `createStudioProject`, `generateStudioAsset`, `getStudioProjects`, `STUDIO_TEMPLATES`.
- `toolsCatalogService`: `getToolsList`, `toggleSaveTool`, `submitToolReview`, `getToolById`.
- `academyService`: `getCoursesList`, `enrollCourse`, `updateCourseProgress`.
- `communityService`: `getCommunityPosts`, `createCommunityPost`, `likeCommunityPost`, `addCommentToPost`.

- [x] **Step 1: Viết `src/services/studioService.js` xử lý dự án canvas và sinh asset trừ credit**
- [x] **Step 2: Viết `src/services/toolsCatalogService.js` quản lý catalog công cụ, rating, bookmark**
- [x] **Step 3: Viết `src/services/academyService.js` quản lý khóa học và tiến trình học tập**
- [x] **Step 4: Viết `src/services/communityService.js` quản lý bài thảo luận, phản hồi cộng đồng**

---

### Task 3: Nâng cấp M2 Topdoo Studio Canvas Workspace

**Files:**
- Modify: `src/views/marketing/TopdooStudioView.jsx`

**Interfaces:**
- Consumes: `studioService.js`, `useSecurity` (`creditBalance`, `sendAiPrompt`, `deductCredits`).
- Features: Chuyển đổi giữa chế độ Showcase và **Interactive Canvas Editor Modal / View**, chọn template, nhập prompt sinh asset, hiển thị thời gian thực và khấu trừ credit.

- [x] **Step 1: Tích hợp Canvas Workspace Interactive Modal vào `TopdooStudioView.jsx`**
- [x] **Step 2: Kết nối nút sinh nội dung AI trừ credit và hiển thị kết quả canvas trực quan**

---

### Task 4: Nâng cấp M3 Topdoo Tools Catalog & Rating Engine

**Files:**
- Modify: `src/views/marketing/TopdooExploreToolsView.jsx`
- Modify: `src/views/marketing/TopdooToolsView.jsx`

**Interfaces:**
- Consumes: `toolsCatalogService.js`, `useSecurity`.
- Features: Kết nối danh sách công cụ từ service, hỗ trợ bookmark lưu trữ đồng bộ, hiển thị modal đánh giá chấm sao (Review Modal).

- [x] **Step 1: Kết nối dữ liệu động và bộ lọc từ `toolsCatalogService.js` vào `TopdooExploreToolsView.jsx`**
- [x] **Step 2: Tích hợp Star Rating Modal và nút gửi đánh giá của người dùng**
- [x] **Step 3: Cập nhật `TopdooToolsView.jsx` hiển thị công cụ nổi bật từ catalog service**

---

### Task 5: Xây dựng Giao diện M7 Topdoo Academy & M8 Topdoo Community

**Files:**
- Create: `src/views/marketing/TopdooAcademyView.jsx`
- Create: `src/views/marketing/TopdooCommunityView.jsx`
- Modify: `src/App.jsx`
- Modify: `src/components/layout/MarketingHeader.jsx`

**Interfaces:**
- Consumes: `academyService.js`, `communityService.js`, `useSecurity`.
- Routes: `topdoo-academy`, `topdoo-community`.

- [x] **Step 1: Viết `TopdooAcademyView.jsx` hiển thị danh mục khóa học, bài học và cấp chứng chỉ**
- [x] **Step 2: Viết `TopdooCommunityView.jsx` hiển thị diễn đàn, tạo bài viết mới, like & comment**
- [x] **Step 3: Khai báo routes mới trong `App.jsx`**
- [x] **Step 4: Cập nhật các menu trong `MarketingHeader.jsx` điều hướng chính xác**

---

### Task 6: Tích hợp Tập trung vào Context & Kiểm thử Build

**Files:**
- Modify: `src/context/SecurityContext.jsx`

**Interfaces:**
- Expose: `studioProjects`, `createStudioProject`, `aiTools`, `savedTools`, `toggleSaveTool`, `academyCourses`, `enrollCourse`, `communityPosts`, `createCommunityPost`.

- [x] **Step 1: Tích hợp state & actions Phase 3 vào `SecurityContext.jsx`**
- [x] **Step 2: Chạy `npm run build` xác nhận không có lỗi cú pháp hay import**
- [x] **Step 3: Tổng hợp báo cáo kết quả hoàn thành Phase 3**
