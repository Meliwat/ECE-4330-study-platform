# ECE 4330 Study Platform Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and publish a GitHub Pages study platform with progressive hints, worked steps, why explanations, search, modes, and local mastery tracking.

**Architecture:** Keep the app static and dependency-light. Enrich `output/problems.json` with generated learning metadata, then replace the current reveal-only UI with a richer single-page study interface that reads the same JSON and stores student progress in `localStorage`.

**Tech Stack:** HTML, CSS, vanilla JavaScript, Python data enrichment/validation scripts, GitHub Pages.

---

### Task 1: Learning Metadata

**Files:**
- Create: `scripts/learning_enrichment.py`
- Modify: `scripts/rebuild_dataset.py`
- Modify: `output/problems.json`

- [x] Add enrichment helpers that derive stable IDs, subtopics, difficulty, hints, steps, why explanations, checks, and common mistakes.
- [x] Run enrichment against the current dataset without removing existing data repairs.
- [x] Wire rebuilds to apply enrichment before writing `output/problems.json`.

### Task 2: Study App UI

**Files:**
- Modify: `study.html`

- [x] Add search, mode controls, progress dashboard, review queue, and reset controls.
- [x] Add attempt-first cards with notes, confidence, difficulty, mastery status, hint reveal, next-step reveal, why toggles, full solution reveal, and scan fallback.
- [x] Fix image URL resolution for GitHub Pages project paths.

### Task 3: Shareable Project

**Files:**
- Create: `README.md`
- Create: `.nojekyll`
- Modify: `[C] PROJECT_OVERVIEW.md`
- Modify: `[C] CURRENT_TASK.md`

- [x] Document local launch, GitHub Pages sharing, features, and data limitations.
- [x] Add `.nojekyll` so GitHub Pages serves static assets exactly as committed.

### Task 4: Verification and Publish

**Files:**
- Create: `scripts/validate_study_app.py`

- [x] Add validation for JSON shape, learning metadata, and referenced asset files.
- [x] Run validation and a local HTTP server.
- [x] Browser-test the app locally.
- [x] Commit, push, confirm the repo is public, and enable GitHub Pages.
