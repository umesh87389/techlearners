---
name: TechLearners Design System
version: 2.0.0
# Source of truth: /index.html homepage + /assets/css/home-theme.css (unified override, loads last)
colors:
  light:
    bg:
      value: "#f5f6fb"
      type: color
    ink:
      value: "#0d1030"
      type: color
    card:
      value: "rgba(255, 255, 255, 0.85)"
      type: color
    text:
      value: "#0d1030"
      type: color
    muted:
      value: "#5a5f82"
      type: color
    navy:
      value: "#0b0f3a"
      type: color
    gold:
      value: "#c9a15b"
      type: color
    gold2:
      value: "#f1d9a2"
      type: color
    accent:
      value: "#5b3df5" # Violet (homepage primary)
      type: color
    accent2:
      value: "#2a62ff" # Blue (homepage gradient end)
      type: color
    accent3:
      value: "#c9a15b" # Gold (homepage pill border / accents)
      type: color
    border:
      value: "rgba(13, 16, 48, 0.09)"
      type: color
    header-bg:
      value: "rgba(255, 255, 255, 0.75)"
      type: color
    nav-bg:
      value: "rgba(255, 255, 255, 0.96)"
      type: color
  dark:
    # Homepage is light-only. Dark mode is neutralised to the same light
    # tokens via home-theme.css so every page matches the homepage.
    bg:
      value: "#f5f6fb"
      type: color
    card:
      value: "rgba(255, 255, 255, 0.85)"
      type: color
    text:
      value: "#0d1030"
      type: color
    muted:
      value: "#5a5f82"
      type: color
    accent:
      value: "#5b3df5"
      type: color
    accent2:
      value: "#2a62ff"
      type: color
    accent3:
      value: "#c9a15b"
      type: color
    border:
      value: "rgba(13, 16, 48, 0.09)"
      type: color
    header-bg:
      value: "rgba(255, 255, 255, 0.75)"
      type: color
    nav-bg:
      value: "rgba(255, 255, 255, 0.96)"
      type: color
typography:
  fontFamily: "Inter, system-ui, sans-serif"
  headings:
    fontFamily: "Fraunces, Georgia, serif"
    h1:
      fontSize: "clamp(42px, 6.2vw, 78px)"
      fontWeight: "500"
---

# Design System Guidelines

This document serves as the single source of truth for the **TechLearners** visual design system. All AI coding assistants and developers must adhere to these tokens and rules when generating or modifying pages, components, and layouts.

> Unified theme (2026): the homepage (`/index.html`) is the visual source of truth.
> Every other page loads `/assets/css/home-theme.css` LAST to match it.
> Do not reintroduce teal/lime (`#014751` / `#afe137`) or ice-blue (`#d6e6f5`)
> as primary theme colors — they are superseded by violet/blue/gold below.

## Visual Philosophy
TechLearners uses a clean, light academic aesthetic centered around **Violet (#5b3df5)**, **Blue (#2a62ff)** and **Gold (#c9a15b)** on **#f5f6fb**, with **Fraunces** serif headings and **Inter** body text.

### Glassmorphism & Translucency
To ensure a premium feel, the interface uses light layers with subtle backgrounds. However, **readability is paramount**:
* **Headers & Menus:** The main header and mobile navigation menu must maintain high opacity (`0.95` and `0.98`) to prevent page content from bleeding through and clashing with navigation text on scroll.
* **Backdrop Filters:** `backdrop-filter` is disabled on screens `<= 1024px` for performance optimizations. Solid/high-opacity fallback backgrounds (`header-bg`, `nav-bg`) must be used for mobile compatibility.

### Dark Mode Transitions
* The homepage is light-only. `home-theme.css` maps `[data-theme="dark"]` back to the same light homepage tokens so all pages stay identical.
* Do not add a separate dark palette unless the homepage itself gains one.
