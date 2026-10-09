# Topdoo Studio Responsive Design Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform Topdoo Studio (`TopdooStudioView.jsx` and `src/index.css`) into a fully responsive interface adapting seamlessly across mobile (320px–480px), tablet (481px–1024px), laptop, and desktop displays.

**Architecture:** Replace hardcoded grid columns and inline fixed styles with CSS class-based responsive design tokens. Utilize CSS clamp() for fluid typography, flexible CSS grids with auto-fit/media queries, and mobile-adaptive flex layouts for complex components (Voicebox Studio, Canvas Workspace modal, and Video modal).

**Tech Stack:** React 19, Vite 8, Lucide React, Vanilla CSS design system.

**Spec:** Dev Team collaborative review synthesis for TopdooStudioView responsive layout.

## Global Constraints

- No disruption to existing business logic or state in `TopdooStudioView.jsx` (TTS, cloning, canvas, credits).
- Preserve existing brand aesthetics: purple gradients, glassmorphism, clean dark/light contrast.
- Ensure 0 horizontal scrolling on screens down to 320px width.
- Build must pass (`npm run build`) with zero syntax or compile errors.

---

### Task 1: Container & Global Studio Responsive Rules in `src/index.css`

**Files:**
- Modify: `src/index.css:4425-4435`, `src/index.css:8490-8560`

**Interfaces:**
- Produces: Responsive `.landing-container`, fluid typography for `.studio-hero-heading`, flexible `.studio-hero-props-row`, scalable `.studio-showcase-video-card`.

- [x] **Step 1: Update `.landing-container` with safe horizontal gutters**
  Add `padding-left: 20px; padding-right: 20px;` with media query for <= 640px to use `16px`.

- [x] **Step 2: Add comprehensive media queries for Studio Hero, Formats, and Features**
  Add rules for 1200px, 1024px, 768px, 640px, and 480px covering:
  - `.studio-hero-section` and `.studio-hero-heading` (clamp font size)
  - `.studio-hero-props-row` (wrapping text, 1 or 2 columns on small screens)
  - `.studio-quick-formats-grid` (mobile horizontal-scroll or clean 2-4 column grid)
  - `.studio-about-grid` and `.studio-showcase-video-card` (dynamic clamp height)
  - `.studio-features-grid` and `.studio-feature-card`
  - `.studio-bottom-cta-section` buttons full-width on mobile.

- [x] **Step 3: Verify build and CSS syntax**
  Run: `npm run build`
  Expected: Success without CSS parsing errors.

---

### Task 2: Refactor Voicebox Studio Section to Use Responsive CSS Classes

**Files:**
- Modify: `src/views/marketing/TopdooStudioView.jsx`
- Modify: `src/index.css`

**Interfaces:**
- Consumes: `voiceStudioTab`, `voiceProfiles`, `ttsScript`, `isSynthesizing`, `handleSynthesizeVoice`.
- Produces: `.studio-voice-header`, `.studio-voice-tabs`, `.studio-voice-tts-grid`, `.studio-voice-clone-form`, `.studio-voice-waveform` responsive classes.

- [x] **Step 1: Define CSS classes in `src/index.css` for Voicebox Studio**
  Create classes:
  - `.studio-voicebox-container`: flex column with responsive padding.
  - `.studio-voice-tabs`: flex with `flex-wrap: wrap` and full-width buttons on mobile.
  - `.studio-voice-tts-grid`: desktop `grid-template-columns: 360px 1fr`, tablet/mobile `grid-template-columns: 1fr`.
  - `.studio-voice-clone-grid`: desktop `1fr 140px`, mobile `1fr` stacked.
  - `.studio-voice-waveform`: responsive height & flex gap.

- [x] **Step 2: Update `TopdooStudioView.jsx` to replace inline grid styles with these classes**
  Replace inline styles in `studio-voicebox-section` with the newly defined CSS classes.

- [x] **Step 3: Verify build**
  Run: `npm run build`
  Expected: PASS.

---

### Task 3: Responsive Modals (Canvas Workspace & Video Player)

**Files:**
- Modify: `src/views/marketing/TopdooStudioView.jsx`
- Modify: `src/index.css`

**Interfaces:**
- Consumes: `isCanvasOpen`, `isVideoModalOpen`, `selectedFormat`, `activeProject`.
- Produces: Mobile-friendly `.studio-canvas-modal-card`, `.studio-canvas-layout` (stacked on mobile/tablet), `.studio-video-player-screen` (aspect-ratio based).

- [x] **Step 1: Define responsive modal classes in `src/index.css`**
  - `.studio-canvas-layout`: row on >= 992px, column on < 992px.
  - `.studio-canvas-sidebar`: 380px on desktop, 100% on tablet/mobile with max-height scroll.
  - `.studio-video-player-screen`: aspect-ratio 16/9 with responsive max-height.

- [x] **Step 2: Apply classes to modals in `TopdooStudioView.jsx`**
  Remove rigid inline `width: 380` and `flex: 1` layouts that lock horizontal overflow on smaller screens.

- [x] **Step 3: Verify build**
  Run: `npm run build`
  Expected: PASS.

---

### Task 4: Complete Testing & Verification Across Breakpoints

**Files:**
- Test: Build output & styling inspection.

- [x] **Step 1: Run project linter and build**
  Run: `npm run build`
  Expected: Build successfully created in `dist/`.

- [x] **Step 2: Verify responsive layout visually or via DOM inspection**
  Check that media queries cover 320px, 375px, 768px, 1024px, 1440px without overflow.
