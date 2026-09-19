---
name: TechLearners Design System
version: 2.0.0
colors:
  light:
    bg:
      value: "#ffffff"
      type: color
    surface:
      value: "#f8fafc"
      type: color
    card:
      value: "#ffffff"
      type: color
    text:
      value: "#0f172a"
      type: color
    muted:
      value: "#475569"
      type: color
    accent:
      value: "#0f3d91" # Deep Navy — single primary
      type: color
    accent-hover:
      value: "#0b2f6f"
      type: color
    border:
      value: "#e2e8f0"
      type: color
    header-bg:
      value: "#ffffff"
      type: color
    nav-bg:
      value: "#ffffff"
      type: color
    success:
      value: "#15803d" # quiz correct only
      type: color
    error:
      value: "#b91c1c" # quiz wrong only
      type: color
typography:
  fontFamily: "Inter, Segoe UI, Arial, sans-serif"
  headings:
    h1:
      fontSize: "clamp(2rem, 4vw, 3.2rem)"
      fontWeight: "800"
---

# Design System Guidelines

This document serves as the single source of truth for the **TechLearners** visual design system. All AI coding assistants and developers must adhere to these tokens and rules when generating or modifying pages, components, and layouts.

## Visual Philosophy (v2 — Simplified)
TechLearners uses a minimal, fast, academic look: **white + deep navy (#0f3d91)** with slate neutrals. No rainbow colours.

### Rules
* **One primary only:** `#0f3d91` for buttons, links, icons, badges, bars. Hover: `#0b2f6f`. No lime, teal, violet, pink, amber, sky gradients.
* **No gradients:** all backgrounds are flat `#fff`, `#f8fafc`, or `#f1f5f9`. No `linear-gradient` / `radial-gradient`.
* **No glassmorphism:** no `backdrop-filter`, no translucent `rgba()` layers. Solid `#fff` header/nav/cards.
* **No 3D:** no `preserve-3d`, `rotateX/Y`, `translateZ`, `will-change`. Hovers use `transform: none`.
* **Shadows:** max `0 1px 3px rgba(0,0,0,.08)`; hover `0 2px 8px rgba(0,0,0,.1)`. No coloured glows.
* **Decor layers removed:** no `.light-beam`, `.light-blobs`, `.light-dots`, no fixed full-screen layers.
* **Animations:** only one short `fadeUp` (.5s). No `float`, `pulse`, `shimmer`, `kenBurns`, or infinite loops.
* **Functional colours only:** green/red reserved strictly for quiz correct/wrong feedback.
* **Borders:** `1px solid #e2e8f0`, radius `8–12px`.
* **Dark mode:** not used. `color-scheme: light` only.

### Performance
* No `backdrop-filter` anywhere (was the main scroll-jank cause).
* No fixed `body::before` background layer.
* `3d-effects.css` and `animations.css` are intentionally minimal no-ops.
