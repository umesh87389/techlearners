---
name: TechLearners Design System
version: 2.1.0
colors:
  light:
    bg:
      value: "#f3fbf5" # very light green page background
      type: color
    card:
      value: "#ffffff" # white cards for contrast
      type: color
    text:
      value: "#14532d" # dark green
      type: color
    muted:
      value: "#4f7a61"
      type: color
    accent:
      value: "#16a34a" # green — single primary
      type: color
    accent-hover:
      value: "#15803d"
      type: color
    soft:
      value: "#e9f7ef" # pale green fill for pills/badges
      type: color
    border:
      value: "#c9e9d4" # light green border
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

## Visual Philosophy (v2.1 — Very Light Green)
TechLearners uses a calm, fast, academic look: **very light green page (#f3fbf5)** with **white cards** and a single **green primary (#16a34a)**. Dark-green text (#14532d) keeps readability.

### Rules
* **One primary only:** `#16a34a` for buttons, links, icons, badges, bars. Hover: `#15803d`. No navy, lime, teal, violet, pink, amber, sky gradients.
* **Backgrounds:** page `#f3fbf5`; cards/header/nav `#fff`; soft fills `#e9f7ef`. No `linear-gradient` / `radial-gradient`.
* **No glassmorphism:** no `backdrop-filter`, no translucent layers. Solid colours only.
* **No 3D:** no `preserve-3d`, `rotateX/Y`, `translateZ`. Hovers use `transform: none`.
* **Shadows:** max `0 1px 3px rgba(0,0,0,.08)`; hover `0 2px 8px rgba(0,0,0,.1)`. No coloured glows.
* **Decor layers removed:** no `.light-beam`, `.light-blobs`, `.light-dots`, no fixed full-screen layers.
* **Animations:** only one short `fadeUp` (.5s). No `float`, `pulse`, `shimmer`, or infinite loops.
* **Functional colours only:** red reserved strictly for quiz wrong feedback.
* **Borders:** `1px solid #c9e9d4`, radius `8–12px`.
* **Dark mode:** not used. `color-scheme: light` only.

### Performance
* No `backdrop-filter` anywhere (was the main scroll-jank cause).
* No fixed `body::before` background layer.
* `3d-effects.css` and `animations.css` are intentionally minimal no-ops.
