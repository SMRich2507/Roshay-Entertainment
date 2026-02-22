# Roshay Entertainment — "La Noche Boricua" Design Document

**Date:** 2026-02-20
**Status:** Approved
**Type:** Single-page portfolio/brand showcase
**Theme:** Bold & vibrant Puerto Rican entertainer site

---

## Overview

Roshay Entertainment is a portfolio/brand showcase for a Puerto Rican artist who is both a music performer (hip hop, rap, salsa, bachata) and a dance instructor (group classes, private lessons, work functions, socials). The site establishes credibility and links out to external platforms for booking and streaming.

The design direction is "La Noche Boricua" — the Puerto Rican night. Dark base, vibrant PR flag-inspired accents that glow against the darkness, analog grain texture, and animated backgrounds that evoke stage lighting. The site feels like walking into a live performance venue.

---

## Color Palette

| Role | Hex | Usage |
|------|-----|-------|
| Dark Base | `#0A0A0A` | Page background, near-black with warm undertone |
| Surface | `#141414` | Cards, elevated sections |
| PR Red | `#EF0000` | Primary accent — CTAs, glows, rule lines |
| Caribbean Gold | `#FFC142` | Secondary accent — warmth, celebration |
| PR Blue | `#1A6BCC` | Tertiary accent — cooler variety, used sparingly |
| Coral Pop | `#FF5733` | Bridges red & gold — hover states, energy moments |
| Text | `#F0EBE3` | Warm cream body text, not harsh white |

### Atmospheric Treatment
- Radial gradients of red/gold at 5-8% opacity layered on dark base — background subtly glows
- SVG `feTurbulence` grain noise at ~8% opacity fixed across entire page — analog concert-poster feel
- Red/gold elements get `box-shadow` halos so they appear to emit light

---

## Typography

| Role | Font | Weight | Style |
|------|------|--------|-------|
| Display | Barlow Condensed | 900 (Black) | All-caps, `clamp(4rem, 15vw, 16rem)`, line-height 0.9, letter-spacing -0.03em |
| Body | DM Sans | 300/400 | Line-height 1.75, generous and readable |
| Accent | Dancing Script | 700 | Used sparingly — "Entertainment" flourish, one Spanish tagline max |

All via Google Fonts CDN.

---

## Section Breakdown

### 1. Nav (Fixed)
- Transparent over hero, darkens on scroll via JS
- "Roshay Entertainment" wordmark left
- Section anchor links right: About, Services, Music, Contact
- Gold "Book Now" CTA button with glow: `box-shadow: 0 0 30px rgba(255,193,66,0.3)`

### 2. Hero — Full Viewport
- **Background:** Animated multi-layer gradient — deep reds, golds, blues flowing with `hard-light` blend mode. 5 independent radial gradient layers rotating on 20-40s cycles. Mouse-interactive 6th gradient layer.
- **Headline:** "ROSHAY" in Barlow Condensed at ~15vw, full-width. Below: "Entertainment" in Dancing Script gold.
- **Subtitle:** Word rotation cycling: "Artist" → "Instructor" → "Entertainer" → "Performer" with fade + vertical slide transition
- **CTA:** Ghost button with animated moving border glow — "Book Now"
- **Decorative:** Faint PR flag star watermark, subtle particle drift

### 3. Genre Marquee Strip
- Full-width between hero and dual identity section
- Infinite scrolling: `SALSA · BACHATA · HIP HOP · RAP · REGGAETON · DANCE · MUSICA ·`
- Dual-row: top row scrolls right, bottom row scrolls left
- Alternating filled and outline text styles
- Speed multiplies with user scroll velocity

### 4. Dual Identity Split
Two-column layout with diagonal `clip-path` divide on desktop, stacked on mobile.

**Left — "The Artist"**
- Dark/urban feel
- Placeholder performance photo with red duotone overlay (`mix-blend-mode: multiply`)
- Genre tags as glowing pills: Hip Hop, Rap, Salsa, Bachata
- Brief text about music career
- Neon gradient card border pulsing red/gold

**Right — "The Instructor"**
- Warm/vibrant feel
- Placeholder dance photo with gold color treatment
- Style tags: Salsa, Bachata, Hip Hop
- Brief text about teaching philosophy
- Neon gradient card border pulsing gold/blue

### 5. Services Grid
4 cards with blur-fade scroll entry, staggered 100ms:

| Card | Description |
|------|-------------|
| Group Classes | In-person salsa, bachata, hip hop classes |
| Private Lessons | One-on-one personalized instruction |
| Work Functions | Corporate events, team building, entertainment |
| Socials | Community dance events and social nights |

- Each card: cursor-tracking gradient spotlight, lift + color-tinted shadow on hover
- Number ticker stats below cards: "500+ Students", "8+ Years", "100+ Events"

### 6. Media Section
- Placeholder YouTube video embed (iframe-ready slot)
- Row of 3-4 placeholder album art / track cards styled as mini music player
- Placeholder Spotify embed slot
- All elements with blur-fade entry

### 7. Contact / Footer
- Gold accent divider
- "Let's Work Together" headline with sparkle effect
- Real link: Facebook — https://www.facebook.com/TheHolyokeGuy
- Placeholder icon links: Instagram, YouTube, Spotify
- Simple CTA or mailto link
- Puerto Rican flag color stripe at very bottom
- Copyright: "Roshay Entertainment 2026"

---

## Global Effects

| Effect | Implementation |
|--------|---------------|
| Grain overlay | Fixed SVG `feTurbulence` noise at 8% opacity over entire page |
| Accent glow | `box-shadow` halos on all red/gold interactive elements |
| Scroll reveal | IntersectionObserver — elements fade in with blur + opacity + translateY |
| Photo treatment | All images get gradient overlays via `::after` pseudo-elements |
| Hover states | Every clickable element has hover, focus-visible, and active states |
| Animations | Only `transform` and `opacity` — never `transition-all` |

---

## Technical Constraints

- Single `index.html` file, all styles inline
- Tailwind CSS via CDN: `<script src="https://cdn.tailwindcss.com"></script>`
- Google Fonts via CDN link
- Vanilla JavaScript only — no frameworks
- Mobile-first responsive
- Placeholder images via `https://placehold.co/WIDTHxHEIGHT`
- Local dev server via `node serve.mjs` at `http://localhost:3000`

---

## Real Assets

- Facebook: https://www.facebook.com/TheHolyokeGuy
- All other links: placeholder
- No logo provided — use text wordmark
- No photos provided — use placehold.co
- brand_assets/ folder empty — all placeholder content

---

## Inspiration Sources

- Awwwards: Stage-lighting gradients, viewport-width typography, duotone photo overlays, marquee strips, magnetic buttons, grain textures
- Dribbble: Dark entertainer portfolios, Latin color palettes, diagonal section dividers, bento grids
- 21st.dev: Background gradient animation, scroll-based velocity marquee, neon gradient cards, blur-fade reveals, word rotation, number tickers, sparkle text, moving border buttons
