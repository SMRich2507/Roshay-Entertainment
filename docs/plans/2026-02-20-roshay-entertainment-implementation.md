# Roshay Entertainment Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a single-page portfolio/brand showcase for Roshay Entertainment — a Puerto Rican music artist and dance instructor — with bold, vibrant "La Noche Boricua" design.

**Architecture:** Single `index.html` file with all styles inline via Tailwind CDN + custom CSS. Vanilla JavaScript for animations (scroll reveals, word rotation, marquee, gradient background). Google Fonts for typography. No frameworks.

**Tech Stack:** HTML, Tailwind CSS (CDN), vanilla JavaScript, Google Fonts, Puppeteer (screenshot verification)

**Design Doc:** `docs/plans/2026-02-20-roshay-entertainment-design.md` — read this first for full color palette, typography, and section specs.

**CLAUDE.md Rules:** Read `CLAUDE.md` at project root before writing any code. Key rules: invoke `frontend-design` skill before coding, screenshot from localhost (never file:///), at least 2 screenshot review passes, only animate `transform` and `opacity`.

---

## Task 0: Project Setup & Dev Tooling

**Files:**
- Create: `serve.mjs`
- Create: `screenshot.mjs`
- Create: `package.json`

**Step 1: Initialize package.json**

```bash
cd "c:/Users/shane/OneDrive/Documents/AI Projects/Website Builder"
npm init -y
```

**Step 2: Install Puppeteer**

```bash
npm install puppeteer
```

**Step 3: Create serve.mjs**

A minimal static file server that serves the project root on `http://localhost:3000`. Use Node's built-in `http` and `fs` modules. Handle common MIME types (html, css, js, png, jpg, svg, ico, woff2). Default to `index.html`.

**Step 4: Create screenshot.mjs**

A Puppeteer script that:
- Takes a URL as first argument (default: `http://localhost:3000`)
- Takes an optional label as second argument
- Saves full-page screenshots to `./temporary screenshots/screenshot-N.png` (auto-incremented)
- If label provided: `screenshot-N-label.png`
- Viewport: 1440x900
- Waits for network idle before capturing

**Step 5: Verify tooling works**

Create a minimal `index.html` with just `<h1>Test</h1>`, start the server, take a screenshot, confirm the pipeline works.

```bash
node serve.mjs &
node screenshot.mjs http://localhost:3000
```

Expected: `temporary screenshots/screenshot-1.png` exists and shows "Test".

**Step 6: Clean up test file**

Remove the test `index.html` content (it will be replaced in Task 1).

---

## Task 1: HTML Scaffold + Global Styles + Grain Overlay

**Files:**
- Create: `index.html`

**Step 1: Invoke the frontend-design skill**

Per CLAUDE.md, this is mandatory before writing any frontend code.

**Step 2: Write the HTML scaffold**

Create `index.html` with:
- `<!DOCTYPE html>`, lang="en", meta viewport, meta charset
- `<title>Roshay Entertainment</title>`
- Google Fonts link: Barlow Condensed (900), DM Sans (300, 400), Dancing Script (700)
- Tailwind CDN script tag
- Tailwind config extending with custom colors:
  ```
  colors: {
    dark: { base: '#0A0A0A', surface: '#141414' },
    pr: { red: '#EF0000', blue: '#1A6BCC', gold: '#FFC142', coral: '#FF5733' },
    cream: '#F0EBE3'
  }
  ```
- `<body>` with `bg-dark-base text-cream font-['DM_Sans']`
- Empty section placeholders (just `<section id="hero">`, `<section id="identity">`, etc.) — we'll fill them task by task
- SVG grain overlay (fixed, full screen, `feTurbulence` fractalNoise, opacity 0.08, pointer-events: none, z-index 9999)
- Atmospheric radial gradient background on body:
  ```css
  background:
    radial-gradient(ellipse 80% 60% at 20% 10%, rgba(239,0,0,0.06) 0%, transparent 60%),
    radial-gradient(ellipse 60% 80% at 80% 90%, rgba(255,193,66,0.05) 0%, transparent 60%),
    #0A0A0A;
  ```

**Step 3: Screenshot and verify**

```bash
node screenshot.mjs http://localhost:3000 scaffold
```

Expected: Dark page with subtle warm atmospheric glow and visible grain texture. No content yet, but the base feels warm and analog, not flat black.

---

## Task 2: Fixed Nav

**Files:**
- Modify: `index.html`

**Step 1: Build the nav**

Fixed position, full width, z-50. Transparent background initially. Contains:
- Left: "Roshay Entertainment" text wordmark (Barlow Condensed, uppercase, tracking wide)
- Right: Anchor links — About, Services, Music, Contact (DM Sans, small, uppercase, letter-spacing 0.1em)
- Far right: "Book Now" button — gold border, gold text, rounded, with glow `box-shadow: 0 0 20px rgba(255,193,66,0.25)`
- Hover states on all links: opacity transition, underline slide-in
- Focus-visible: outline with gold ring

**Step 2: Add nav scroll behavior JS**

Vanilla JS at bottom of body:
- `IntersectionObserver` or `scroll` listener on window
- When scrolled past 100px: add `bg-dark-base/90 backdrop-blur-md` classes to nav
- When at top: remove them (transparent again)

**Step 3: Screenshot and verify**

```bash
node screenshot.mjs http://localhost:3000 nav
```

Expected: Transparent nav floating over the dark atmospheric background. Gold "Book Now" button glowing.

---

## Task 3: Hero Section

**Files:**
- Modify: `index.html`

**Step 1: Build the animated gradient background**

Inside `<section id="hero">` (full viewport height, relative, overflow hidden):
- 5 `<div>` elements, each absolutely positioned, full size
- Each is a radial gradient (red, gold, blue, coral, dark-blue) at low-to-medium opacity
- Each has a CSS `@keyframes` animation: rotating + translating on independent 20-40s cycles
- `mix-blend-mode: hard-light` on each layer
- A 6th div that tracks mouse position via JS `mousemove` listener (radial gradient centered on cursor, gold at ~15% opacity)

**Step 2: Build the hero text content**

Centered vertically and horizontally over the gradient, z-10:
- "ROSHAY" in Barlow Condensed Black, `font-size: clamp(4rem, 15vw, 16rem)`, uppercase, line-height 0.9, letter-spacing -0.03em, color cream
- "Entertainment" below in Dancing Script, gold (`#FFC142`), ~2rem, italic feel
- Word rotation subtitle below: a `<span>` that cycles through ["Artist", "Instructor", "Entertainer", "Performer"] with fade + translateY animation every 2.5 seconds via JS `setInterval` + CSS transitions on `opacity` and `transform`
- Ghost CTA button: "Book Now" — transparent bg, gold border 2px, gold text, rounded-full, px-8 py-3. On hover: gold bg, dark text. Animated moving border glow (a pseudo-element radial gradient that traces the border on a CSS animation loop)

**Step 3: Add decorative elements**

- Faint PR flag star: an SVG five-pointed star, absolute positioned, large (30vw), very low opacity (0.03-0.05), cream colored, slight slow rotation animation
- Optional: subtle particle dots drifting (CSS-only, 10-15 small circles with float keyframes)

**Step 4: Screenshot and verify**

```bash
node screenshot.mjs http://localhost:3000 hero
```

Expected: Full-viewport hero with flowing animated gradients, massive "ROSHAY" headline, gold "Entertainment" script, rotating word subtitle, and a glowing CTA button. Should feel like stage lighting.

---

## Task 4: Genre Marquee Strip

**Files:**
- Modify: `index.html`

**Step 1: Build the dual-row marquee**

Between hero and identity sections. Full width, overflow hidden, py-6, border-top and border-bottom with subtle `rgba(255,193,66,0.15)` lines.

- Two rows of scrolling text
- Each row: a `<div>` containing the text twice (for seamless loop), using CSS `@keyframes translateX(0) to translateX(-50%)`
- Top row scrolls right (normal direction), bottom row scrolls left (reverse)
- Text content: `SALSA · BACHATA · HIP HOP · RAP · REGGAETON · DANCE · MUSICA ·`
- Top row: filled text (cream color, Barlow Condensed, uppercase, ~1.5rem)
- Bottom row: outline text (`-webkit-text-stroke: 1px`, color transparent)
- Speed: ~25s linear infinite

**Step 2: Add scroll-velocity multiplier (optional enhancement)**

JS that listens to scroll events, calculates velocity, and adjusts the `animation-duration` of the marquee. When scrolling fast: marquee speeds up. When idle: returns to base speed.

**Step 3: Screenshot and verify**

```bash
node screenshot.mjs http://localhost:3000 marquee
```

Expected: Two rows of genre names scrolling in opposite directions. Filled text on top, outline text on bottom. Visible gold border lines above and below.

---

## Task 5: Dual Identity Split Section

**Files:**
- Modify: `index.html`

**Step 1: Build the two-column split**

`<section id="identity">` with a two-column grid on desktop (`grid-cols-2`), single column on mobile.

**Left column — "The Artist":**
- Dark background (`#0D0A0B`)
- Placeholder image: `https://placehold.co/600x800/1a1a1a/ef0000?text=The+Artist` with `::after` pseudo-element red duotone overlay (`mix-blend-mode: multiply`, `background: rgba(239,0,0,0.3)`)
- Heading: "The Artist" in Barlow Condensed, red glow text-shadow
- Genre pills: "Hip Hop", "Rap", "Salsa", "Bachata" — small rounded tags with red border, red text, subtle red glow on hover
- Paragraph: placeholder text about music career (2-3 sentences)
- Neon border effect: `::before` pseudo-element with animated gradient border cycling red → gold on 3s loop, blurred for glow

**Right column — "The Instructor":**
- Slightly warmer background (`#141414`)
- Placeholder image: `https://placehold.co/600x800/1a1a1a/ffc142?text=The+Instructor` with gold color treatment overlay
- Heading: "The Instructor" in Barlow Condensed, gold glow text-shadow
- Style pills: "Salsa", "Bachata", "Hip Hop" — gold border, gold text
- Paragraph: placeholder text about teaching philosophy (2-3 sentences)
- Neon border effect: animated gradient cycling gold → blue

**Step 2: Add diagonal clip-path divider on desktop**

On `min-width: 1024px`, apply `clip-path: polygon(0 0, 100% 5%, 100% 100%, 0 95%)` on the section, or a diagonal SVG divider between the columns for visual tension.

**Step 3: Screenshot and verify**

```bash
node screenshot.mjs http://localhost:3000 identity
```

Expected: Two distinct halves — dark/red artist side, warm/gold instructor side. Genre pills visible. Neon borders glowing. Photos have color treatment overlays.

---

## Task 6: Services Grid + Stats

**Files:**
- Modify: `index.html`

**Step 1: Build the services section**

`<section id="services">` with heading "What I Offer" in Barlow Condensed, centered.

4-card grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-4`, gap-6):

| Card | Icon (emoji or SVG) | Title | Description |
|------|---------------------|-------|-------------|
| 1 | Music note / group | Group Classes | In-person salsa, bachata, and hip hop group sessions for all skill levels. |
| 2 | Person | Private Lessons | One-on-one personalized instruction tailored to your goals and pace. |
| 3 | Building | Work Functions | Corporate events, team building activities, and live entertainment. |
| 4 | Party/music | Socials | Community dance events and social nights — come dance, connect, celebrate. |

Each card:
- `bg-dark-surface` (`#141414`), rounded-xl, p-6
- Cursor-tracking gradient spotlight: JS `mousemove` on card → update CSS custom property `--mouse-x` and `--mouse-y` → radial gradient at that position with low opacity brand color
- Hover: `transform: translateY(-4px)`, color-tinted `box-shadow` (red for first two, gold for last two)
- Focus-visible: gold outline ring
- Icon at top (SVG or large emoji), title in Barlow Condensed, description in DM Sans

**Step 2: Add number ticker stats**

Below the cards grid, centered row of 3 stats:
- "500+" Students Taught
- "8+" Years Performing
- "100+" Events & Shows

Each number: large Barlow Condensed display, animates from 0 to target value when scrolled into view (IntersectionObserver + JS counter animation with spring easing). Label below in DM Sans small text.

**Step 3: Screenshot and verify**

```bash
node screenshot.mjs http://localhost:3000 services
```

Expected: 4 cards with hover effects working, cursor-tracking gradient visible. Stats row below with large numbers.

---

## Task 7: Media Section

**Files:**
- Modify: `index.html`

**Step 1: Build the media section**

`<section id="media">` with heading "Music & Performance" in Barlow Condensed.

- **Video embed:** Centered placeholder YouTube iframe (16:9 aspect ratio container, `aspect-ratio: 16/9`, max-w-4xl). Use a placeholder: `<div>` styled as a dark video player with a play button overlay and text "Video Coming Soon". Rounded-xl, subtle border.
- **Track cards row:** Horizontal scroll container (`flex overflow-x-auto gap-4 pb-4`) with 3-4 placeholder "album art" cards:
  - Each card: 200x200 square, `https://placehold.co/200x200/141414/ef0000?text=Track+N`, rounded-lg
  - Below image: track title (placeholder), genre tag small
  - Hover: slight scale up, red glow shadow
- **Spotify slot:** A placeholder styled container: "Spotify Player Coming Soon" in a rounded bar shape, dark surface with green accent border

**Step 2: Screenshot and verify**

```bash
node screenshot.mjs http://localhost:3000 media
```

Expected: Video placeholder centered, row of track cards horizontally scrollable, Spotify placeholder bar at bottom.

---

## Task 8: Contact Section + Footer

**Files:**
- Modify: `index.html`

**Step 1: Build the contact section**

`<section id="contact">`:
- Gold divider line at top (1px, `#FFC142`, 60% width, centered, with glow)
- Heading: "Let's Work Together" in Barlow Condensed, large. Add sparkle effect: 8-10 small SVG stars absolutely positioned around the text, each with a CSS `@keyframes` that fades opacity 0→1→0 and rotates slightly, staggered delays
- Subtext: "Ready to book a class, plan an event, or collaborate? Let's make it happen." in DM Sans
- CTA button: "Get In Touch" — solid gold bg, dark text, rounded-full, large, with pulsing shadow animation (`@keyframes pulse-glow` scaling box-shadow)
- Social links row: Icon links (SVG icons) for:
  - Facebook (real: `https://www.facebook.com/TheHolyokeGuy`)
  - Instagram (placeholder: `#`)
  - YouTube (placeholder: `#`)
  - Spotify (placeholder: `#`)
  - Each icon: 40x40, cream colored, hover transitions to brand color (FB→blue, IG→coral, YT→red, Spotify→green)

**Step 2: Build the footer**

- Puerto Rican flag stripe: 3 thin horizontal bars (red, white, blue) as a decorative element, 4px each, full width
- Below: dark footer bar with copyright: "2026 Roshay Entertainment. All rights reserved." centered, small DM Sans text, low opacity
- Optional: tiny PR flag emoji or star

**Step 3: Screenshot and verify**

```bash
node screenshot.mjs http://localhost:3000 contact
```

Expected: Gold divider, sparkle headline, pulsing CTA, social icons with hover colors, flag stripe at bottom.

---

## Task 9: Scroll Reveal System (Global)

**Files:**
- Modify: `index.html` (JS section)

**Step 1: Add blur-fade reveal CSS**

```css
.reveal {
  opacity: 0;
  filter: blur(8px);
  transform: translateY(30px);
  transition: opacity 0.8s ease, filter 0.8s ease, transform 0.8s ease;
}
.reveal.visible {
  opacity: 1;
  filter: blur(0);
  transform: translateY(0);
}
```

**Step 2: Add IntersectionObserver JS**

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), index * 100);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
```

**Step 3: Add `.reveal` class to key elements**

Go through all sections and add the `.reveal` class to:
- Section headings
- Cards (with stagger via `data-delay` or sibling index)
- Identity columns
- Media items
- Stats numbers
- Contact CTA

**Step 4: Screenshot full page and verify**

```bash
node screenshot.mjs http://localhost:3000 full-reveal
```

Note: Static screenshots won't show animations in action, but elements should be visible (the observer fires on page load for elements in viewport).

---

## Task 10: Responsive Polish + Final Screenshot Review

**Files:**
- Modify: `index.html`

**Step 1: Mobile responsive check**

Verify all sections work at mobile widths:
- Hero text scales down via `clamp()`
- Nav collapses to hamburger or simplified layout
- Identity section stacks vertically
- Services grid goes to 1 column
- Marquee still scrolls cleanly
- Track cards horizontal scroll works on touch

**Step 2: Screenshot at mobile viewport**

Take screenshots at 375px width (modify screenshot.mjs call or add viewport param):

```bash
node screenshot.mjs http://localhost:3000 mobile
```

**Step 3: Fix any responsive issues found**

Common fixes: oversized text, horizontal overflow, touch targets too small, spacing too tight.

**Step 4: Full desktop screenshot review — Pass 1**

```bash
node screenshot.mjs http://localhost:3000 final-pass1
```

Compare against design doc. Check:
- Colors match hex values in palette
- Typography uses correct fonts and weights
- Spacing is consistent
- All hover/focus states exist
- Grain overlay visible but subtle
- Atmospheric gradients present
- No `transition-all` anywhere

**Step 5: Fix issues from Pass 1**

Address any mismatches found.

**Step 6: Full screenshot review — Pass 2**

```bash
node screenshot.mjs http://localhost:3000 final-pass2
```

Confirm all issues resolved. Per CLAUDE.md: do not stop after one screenshot pass.

---

## Task Dependency Graph

```
Task 0 (Setup) → Task 1 (Scaffold) → Task 2 (Nav) → Task 3 (Hero)
                                                          ↓
Task 4 (Marquee) → Task 5 (Identity) → Task 6 (Services) → Task 7 (Media)
                                                                    ↓
                                              Task 8 (Contact) → Task 9 (Scroll Reveals)
                                                                    ↓
                                                            Task 10 (Polish)
```

All tasks are sequential — each builds on the previous section in the same `index.html` file.
