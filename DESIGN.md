---
name: TechLearners Design System
version: 1.0.0
colors:
  light:
    bg:
      value: "#f9f9f9"
      type: color
    card:
      value: "rgba(255, 255, 255, 0.75)"
      type: color
    text:
      value: "#3d494b"
      type: color
    muted:
      value: "#515d5f"
      type: color
    accent:
      value: "#014751" # Deep Teal
      type: color
    accent2:
      value: "#afe137" # Lime Green
      type: color
    accent3:
      value: "#368995" # Soft Teal
      type: color
    border:
      value: "rgba(1, 71, 81, 0.16)"
      type: color
    header-bg:
      value: "rgba(242, 251, 253, 0.95)"
      type: color
    nav-bg:
      value: "rgba(242, 251, 253, 0.98)"
      type: color
  dark:
    bg:
      value: "#091a1c"
      type: color
    card:
      value: "rgba(13, 35, 38, 0.85)"
      type: color
    text:
      value: "#e2f0f2"
      type: color
    muted:
      value: "#8ca3a6"
      type: color
    accent:
      value: "#afe137" # Lime Green (Accent shifts to lime in dark mode for contrast)
      type: color
    accent2:
      value: "#70c0cc"
      type: color
    accent3:
      value: "#14a0b2"
      type: color
    border:
      value: "rgba(175, 225, 55, 0.25)"
      type: color
    header-bg:
      value: "rgba(9, 26, 28, 0.95)"
      type: color
    nav-bg:
      value: "rgba(9, 26, 28, 0.98)"
      type: color
typography:
  fontFamily: "Inter, Segoe UI, Arial, sans-serif"
  headings:
    h1:
      fontSize: "clamp(2rem, 4vw, 3.2rem)"
      fontWeight: "900"
---

# Design System Guidelines

This document serves as the single source of truth for the **TechLearners** visual design system. All AI coding assistants and developers must adhere to these tokens and rules when generating or modifying pages, components, and layouts.

## Visual Philosophy
TechLearners uses a modern, high-contrast, academic tech aesthetic centered around **Deep Teal** and **Lime Green**. 

### Glassmorphism & Translucency
To ensure a premium feel, the interface uses light layers with subtle backgrounds. However, **readability is paramount**:
* **Headers & Menus:** The main header and mobile navigation menu must maintain high opacity (`0.95` and `0.98`) to prevent page content from bleeding through and clashing with navigation text on scroll.
* **Backdrop Filters:** `backdrop-filter` is disabled on screens `<= 1024px` for performance optimizations. Solid/high-opacity fallback backgrounds (`header-bg`, `nav-bg`) must be used for mobile compatibility.

### Dark Mode Transitions
* Theme switching is managed by toggling a `data-theme="dark"` attribute on the `<html>` or `<body>` element.
* When transitioning to dark mode:
  * The primary accent color shifts from **Deep Teal** to **Lime Green** to maintain excellent readability against dark backgrounds.
  * Border colors shift to a subtle lime overlay.
