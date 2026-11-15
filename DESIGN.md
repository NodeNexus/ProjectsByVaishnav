---
version: alpha
name: Google Antigravity
description: "Light monochrome interface measured from antigravity.google: Google Sans Flex type, tonal surfaces and pill-shaped controls."
colors:
  background: "#F8F9FA"
  surface: "#F8F9FA"
  on-surface: "#121317"
  on-background: "#121317"
  on-surface-variant: "#45474D"
  surface-container-low: "#FFFFFF"
  overlay: "#2122260F"
  overlay-strong: "#FFFFFFD9"
  outline: "#2122260F"
  primary: "#121317"
  on-primary: "#FFFFFF"
typography:
  headline-display:
    fontFamily: Google Sans Flex
    fontSize: 80px
    fontWeight: 450
    lineHeight: 1.1
  headline-lg:
    fontFamily: Google Sans Flex
    fontSize: 42px
    fontWeight: 450
    lineHeight: 1.04
    letterSpacing: -0.017em
  headline-md:
    fontFamily: Google Sans Flex
    fontSize: 28px
    fontWeight: 450
    lineHeight: 1.08
    letterSpacing: -0.004em
  body-md:
    fontFamily: Google Sans Flex
    fontSize: 14.5px
    fontWeight: 450
    lineHeight: 1.45
    letterSpacing: 0.008em
  body-lg:
    fontFamily: Google Sans Flex
    fontSize: 17.5px
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: 0.01em
  body-sm:
    fontFamily: Google Sans Flex
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.1
  caption:
    fontFamily: Google Sans Flex
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0.013em
  label-md:
    fontFamily: Google Sans Flex
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
  label-sm:
    fontFamily: Google Sans Flex
    fontSize: 14.5px
    fontWeight: 500
    lineHeight: 1.45
    letterSpacing: 0.008em
  headline-display-mobile:
    fontFamily: Google Sans Flex
    fontSize: 37.5px
    fontWeight: 450
    lineHeight: 1.1
  headline-lg-mobile:
    fontFamily: Google Sans Flex
    fontSize: 28px
    fontWeight: 450
    lineHeight: 1.06
    letterSpacing: -0.01em
rounded:
  sm: 4px
  md: 36px
  full: 9999px
spacing:
  xs: 4px
  sm: 6px
  md: 16px
  lg: 24px
  xl: 36px
  gutter: 8px
  section: 120px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.full}"
    padding: 6px 8px 6px 16px
    height: 36px
  button-primary-hover:
    backgroundColor: "#2F3034"
  button-ghost:
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.body-md}"
    rounded: "{rounded.full}"
    padding: 6px 8px 6px 16px
  input-field:
    textColor: "{colors.on-surface}"
    rounded: "{rounded.full}"
    padding: 0px 18px
  card:
    backgroundColor: "#F8F9FC"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-md}"
    rounded: "{rounded.md}"
    padding: 60px 48px
---

# Google Antigravity Design System

## Overview

Google Antigravity describes itself as: “Experience liftoff with the next-gen agent platform” The interface is light, built on **Snow (#F8F9FA)** with **Charcoal (#121317)** text and almost no color: actions are carried by contrast, not hue.

Type is set in **Google Sans Flex**. Headlines run large; body text is 14.5px. The surface language is flat. Controls are pill-shaped.

Measured from [antigravity.google](https://antigravity.google/) on November 16, 2026 at 1440×900 and 390×844 from 372 rendered elements. Values are computed styles from the live page, not the original source files.

## Colors

The palette has 9 roles.

- **Snow (#F8F9FA):** Page background, seen 2 times. Token `background`, CSS `--theme-tonal-tonal`.
- **Charcoal (#121317):** Primary text and headings, seen 46 times. Token `on-surface`, CSS `--theme-outlined-on-outlined`.
- **Cool Graphite (#45474D):** Secondary text, seen 54 times. Token `on-surface-variant`, CSS `--palette-grey-800`.
- **White (#FFFFFF):** Raised areas one step from the page, seen 4 times. Token `surface-container-low`, CSS `--theme-primary-on-primary`.
- **Charcoal 6% (#2122260F):** Translucent fill for cards and controls, seen 8 times. Token `overlay`, CSS `--theme-button-states-pressed`.
- **White 85% (#FFFFFFD9):** Stronger translucent fill, seen 3 times. Token `overlay-strong`.
- **Charcoal 6% (#2122260F):** Borders and dividers, seen 13 times. Token `outline`, CSS `--theme-button-states-pressed`.
- **Charcoal (#121317):** Primary buttons and calls to action, seen 73 times. Token `primary`, CSS `--theme-outlined-on-outlined`.
- **White (#FFFFFF):** Text and icons on primary. Token `on-primary`.

## Typography

**Google Sans Flex** carries the whole interface. Fallback stack: `Google Sans Flex, Google Sans, sans-serif`. Other loaded fonts: Google Sans Code.

- **headline-display:** Google Sans Flex 80px at weight 450, line height 1.1 (37.5px on mobile). Page title (h1).
- **headline-lg:** Google Sans Flex 42px at weight 450, line height 1.04, tracking -0.017em (28px on mobile). Section headings (h2).
- **headline-md:** Google Sans Flex 28px at weight 450, line height 1.08, tracking -0.004em. Sub-section headings.
- **body-md:** Google Sans Flex 14.5px at weight 450, line height 1.45, tracking 0.008em. Body text.
- **body-lg:** Google Sans Flex 17.5px at weight 400, line height 1.45, tracking 0.01em. Lead paragraphs.
- **body-sm:** Google Sans Flex 13px at weight 400, line height 1.1. Secondary and small text.
- **caption:** Google Sans Flex 12px at weight 400, line height 1.4, tracking 0.013em. Captions and fine print.
- **label-md:** Google Sans Flex 16px at weight 400, line height 1.5. Buttons, navigation and labels.
- **label-sm:** Google Sans Flex 14.5px at weight 500, line height 1.45, tracking 0.008em. Small labels and badges.

## Layout

Spacing is mostly on a 4px grid (77% of measured values), with some off-grid steps. Match the measured scale rather than rounding everything.

- **Scale:** xs 4px, sm 6px, md 16px, lg 24px, xl 36px.
- **Sections:** 120px vertical padding between major sections.
- **Gaps:** 8px is the most common gap in flex and grid layouts.

## Elevation & Depth

The design is flat: no shadows were measured. Hierarchy comes from tonal surface steps (#FFFFFF) and #2122260F borders.

## Shapes

Interactive controls are pill-shaped. Measured radii, most used first:

- **full (9999px):** 108 elements.
- **sm (4px):** 8 elements.
- **md (36px):** 8 elements.

## Components

Measured from the rendered page. Token values reference the tokens above.

- **button-primary (“Download”):** #121317 fill, #FFFFFF text, 14.5px/450, 9999px radius, padding 6px 8px 6px 16px.
- **button-primary-hover:** background #2F3034, text #FFFFFF on hover.
- **button-ghost (“Products”):** transparent fill, #45474D text, 14.5px/450, 9999px radius, padding 6px 8px 6px 16px.
- **input-field (“Enter your email address”):** transparent fill, #121317 text, 15px/400, 999px radius, padding 0px 18px.
- **card:** #F8F9FC fill, #121317 text, 16px/400, 36px radius, padding 60px 48px.

## Do's and Don'ts

- Do use #F8F9FA for the page and lift surfaces in small steps: #FFFFFF.
- Do keep text in 2 levels: #121317, #45474D.
- Do let contrast carry emphasis; primary actions use #121317 on #F8F9FA.
- Do reuse the measured spacing steps (6px, 16px, 24px).
- Do make buttons and chips fully rounded (9999px); most other elements use 4px corners.
- Don't add drop shadows for depth; use tonal surfaces.
- Don't introduce new font families beyond Google Sans Flex.
- Don't add saturated accent colors; the measured palette is almost entirely neutral.
- Don't make interface transitions slower than 0.3s.

## Motion

Interface transitions are quick: 0.15s, 0.2s, 0.16s, 0.3s.

- **Easing:** `ease`, `ease-out`, `cubic-bezier(0.165, 0.84, 0.44, 1)`.
- **Reduced motion:** the page responds to `prefers-reduced-motion`.

Generated by [Sitepeel](https://sitepeel.dev/design-md/antigravity.google/), the free DESIGN.md generator (engine 2026.10.29+f0c146f7cdfd).
