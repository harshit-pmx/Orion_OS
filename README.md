# Project Orion - **A Unified, AI-Native Operating System for Life**
*Moonshot prototype: multimodal, explainable, orchestration-first.*

[![Build](https://img.shields.io/badge/build-passing-brightgreen?style=flat-square)](#installation--setup)
[![Stack](https://img.shields.io/badge/stack-Next.js%2015%20%7C%20TypeScript%20%7C%20Tailwind%20%7C%20Turbopack-black?style=flat-square)](#tech-stack)
[![Node](https://img.shields.io/badge/node-%E2%89%A518.x-black?style=flat-square)](#installation--setup)
[![Deploy](https://img.shields.io/badge/deploy-Vercel%20App%20Hosting-red?style=flat-square)](#deployment)
[![Stars](https://img.shields.io/github/stars/harshit-pmx/studio?style=flat-square)](https://github.com/harshit-pmx/studio/stargazers)
[![Forks](https://img.shields.io/github/forks/harshit-pmx/studio?style=flat-square)](https://github.com/harshit-pmx/studio/network/members)

---

## Overview
**Orion** is a **presentation-grade, AI-native Life OS**: a unified, multimodal interface that turns intent into orchestrated action **with privacy, explainability, and undo** built in.  
This repository hosts the **interactive product simulation** (not a portfolio) that demonstrates the end-to-end experience:

**Onboarding → Multimodal Dashboard → Life OS (Goals / Scheduling / Knowledge) → Orchestration → Control → Vision**

**Recruiter pitch:** Explore Orion and imagine your roadmap when AI is **ambient, trustworthy, and truly helpful**.

---

## Demo / Prototype
- **Live Demo:** _Add your deploy URL once published (e.g., Firebase Hosting link)_
- **Screenshots (recommended):**
  - `docs/screens/01_onboarding.png` - https://drive.google.com/file/d/1xTTCb9vL6zmHkdEnQtZeVZ-zNNcJiFnZ/view?usp=drive_link
  - `docs/screens/02_dashboard.png` - https://drive.google.com/file/d/1Eavk59pxJi4l8qHCxTYVQ1ZHifzqK5u7/view?usp=drive_link
  - `docs/screens/03_lifeos.png` - https://drive.google.com/file/d/1v7LutCukNwZTFm5GEIksZgeGTcexRai7/view?usp=drive_link
  - `docs/screens/04_orchestration.png` - https://drive.google.com/file/d/1XB4soSjMyrApEz2wfJtyenGi6B7mxkVA/view?usp=drive_link
  - `docs/screens/05_control.png` - https://drive.google.com/file/d/1v8jr5xULNTmmeUnGHG0NABb8F-qQbEjN/view?usp=drive_link
  - `docs/screens/06_vision.png` - https://drive.google.com/file/d/1u9MyjXRQPIpW-C1a5Fs_X-ZXPdcOprKl/view?usp=drive_link

> Everything in the demo is **interactive**: every route, CTA, modal, toggle, and preview works.

---

## Key Features
- **Onboarding**
  - Capture goals, focus windows, and granular permissions
  - Persist client-side; editable summary with **Confirm**
- **Multimodal Dashboard**
  - **Text**, **voice** (Web Speech API fallback), **image** quick-picker
  - Quick-reply chips and proactive recommendations (Accept / Snooze / Never)
- **Life OS Demos**
  - **Goals → Plans → Execution:** create a goal, auto-generate steps, mark progress
  - **Intelligent Scheduling:** propose conflict-free slots from focus windows; Accept / Decline / Reschedule
  - **Adaptive Knowledge Assistant:** ask questions; structured answers with simulated sources
  - **Cross-Device Sync:** toggle availability for phone/tablet/desktop
  - **Emotional & Behavioral Insights (opt-in):** simple trends with a privacy notice
- **Task Orchestration**
  - Preview a multi-app plan (calendar, docs, messages, environment)
  - **Confirm** to execute with a visual progress tracker
- **Explainability & Safety**
  - “**Why this?**” signals summary, rules tree, export/delete demo data
- **Future Vision Mode**
  - **Now / Next / Later** milestones with **Try Preview** micro-prototypes
- **A11y & Performance**
  - Focus-trapped modals, ARIA labels, keyboard carousels, 60fps transforms

---

## Tech Stack
- **Framework:** Next.js 15 (TypeScript) with Turbopack
- **UI:** Tailwind CSS, cinematic dark theme with subtle red accents
- **State:** Lightweight client store (e.g., Zustand or reducer) persisted to `localStorage`
- **Routing:** App Router (SPA-style navigation for demo)
- **Speech:** Web Speech API (graceful fallback when unsupported)
- **Data:** JSON-driven config for fast iteration
- **Deploy:** Vercel as standard Next.js

---

Explore Orion → Imagine the future of AI-native systems.
If you’re hiring for APM/PM with an AI-first charter, let’s talk. I bring product vision, execution rigor, and a working prototype that goes beyond “docs and decks.”

LinkedIn: www.linkedin.com/in/harshitx

Email: harshutiwary08@gmail.com
