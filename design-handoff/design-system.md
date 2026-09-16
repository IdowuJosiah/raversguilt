# Raversguilt — Design System

The visual language for the site. Pair this with `tokens.css` (the values) and
the files in `mockups/` (the exact markup + styling for every screen).

## Concept

Raversguilt is a Lagos rave collective and events desk with a tongue-in-cheek
**courtroom / "The Rave Jury"** identity — a docket of upcoming raves, "verdicts"
(event write-ups), "Guilty Picks" (endorsed nights), and "exhibits" (gallery).
The aesthetic is **dark underground rave meets hand-made zine**: flat poster-like
color, liquid ink/lava blobs, wavy hand-drawn dividers, and a bubbly display font.

Mobile-first — the audience arrives from Instagram/TikTok QR codes. Design and
build phone-width first (content column ~390px, capped at `--page-max` and
centered on larger screens). Desktop layouts are a later pass.

## Color

All values live in `tokens.css`. Roles:

- **Backgrounds** are dark, purple-toned: `--bg` for the page, `--surface` for
  cards/rows, `--surface-2` for chips.
- **`--violet`** is the primary accent — primary buttons, active states, links in
  UI, calendar "rave" markers, series tag text.
- **`--gold`** is the secondary accent — the "guilty verdict" theme: Guilty Pick
  stamps/stars, primary CTAs like RSVP, mono docket labels, scribble underlines.
- **`--hot`** is a tertiary pop used sparingly (map pin, "live/recap" dot).
- Cards, tiles, flyers, avatars, and the map use **flat solid fills** — the
  `--tile-*` and `--flyer-base` tokens. **Do not reintroduce CSS gradients on
  these surfaces**; color and life come from the liquid blobs instead.

Theme: the design is committed dark. A light theme is out of scope for v1.

## Type

Load from Google Fonts (the only external host allowed in the mockups):

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700;800&family=Space+Grotesk:wght@400;500;600&family=Space+Mono:wght@400;700&display=swap">
```

In Next.js, prefer `next/font/google` for `Baloo_2`, `Space_Grotesk`, and
`Space_Mono`, wiring each to the matching CSS variable in `tokens.css`
(`--font-display`, `--font-body`, `--font-mono`).

Three roles, never more:

- **Display — Baloo 2** (rounded, bubbly). Headlines, section titles, card
  titles, the RAVERSGUILT logo, calendar day numbers. Weights 600–800. Slight
  negative tracking (`-0.01em`). Give multi-line headlines a little extra
  line-height (~1.02–1.04) so the round letters don't crowd.
- **Body — Space Grotesk.** Paragraphs, buttons, chips, nav. Weights 400–600.
- **Mono — Space Mono.** The "docket" voice: dates, series tags, case numbers,
  small labels. Always UPPERCASE with wide letter-spacing (0.1–0.22em).

The contrast between bubbly display, clean body, and technical mono is the
point — it keeps the playful headlines legible and grounds the courtroom concept.
Don't make everything bubbly.

## Signature motifs

These are what make the design feel hand-made rather than templated. Each mockup
contains working inline-SVG examples — copy them into reusable components.

### 1. Liquid metaball blobs
Overlapping circles fused by an SVG "goo" filter into organic ink/lava shapes.
Used as background decoration on heros and inside flyer/recap surfaces. Define
the filter once per document (or once in a shared SVG sprite):

```html
<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
  <filter id="goo" x="-40%" y="-40%" width="180%" height="180%">
    <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="b"/>
    <feColorMatrix in="b" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 26 -12"/>
  </filter>
</defs></svg>
```

Then a blob is a `<g filter="url(#goo)">` of 3–5 circles in one accent color at
0.2–0.7 opacity. They drift with a slow `@keyframes drift` (translate + tiny
rotate). Respect `prefers-reduced-motion` — disable the drift when set (the
mockups animate unconditionally; add the guard in the build).

### 2. Wavy dividers
Two offset hand-drawn strokes (violet + gold) as a section separator instead of a
flat rule. See the `<svg ... viewBox="0 0 350 30">` blocks in `home.html`.

### 3. Scribble underline
A rough marker stroke tucked under a key word (absolutely positioned SVG under a
`position:relative` span). Used on "RAVE", "guilty", "September", "The evidence".

### 4. Grain
A faint `feTurbulence` noise layer over each screen (`opacity ~0.06`,
`mix-blend-mode: overlay`) for a printed/tactile feel.

## Component vocabulary

Recurring pieces to build as reusable components (exact markup in `mockups/`):

- **TopBar** — logo + verified tick + search/menu (home) OR back-chevron + page
  title + mono section label (inner pages).
- **VerdictStamp** — rotated bordered "GUILTY PICK" chip (gold).
- **SeriesTag** — pill, mono uppercase, violet text + violet-dim border.
- **EventCard (featured)** — flyer surface (flat base + liquid blobs) + title +
  date/venue rows + RSVP button + share.
- **EventRow** — date block (day-of-week + big day number) │ divider │
  title + mono meta + series tag. Used in "This week" and the calendar agenda.
- **MonthGrid** — 7-col grid; day cells are flat `--surface` rounded squares;
  event days carry a colored dot (violet = rave, gold = Guilty Pick); the
  selected day is a solid violet cell.
- **FilterChips** — horizontally scrollable series filters; active chip is solid
  gold with dark text.
- **GalleryTile** — flat `--tile-*` panel with a mono tag; larger tiles get a
  liquid-curve overlay.
- **StickyRSVPBar** — event page bottom bar: from-price + full-width CTA.
- **WavyDivider**, **LiquidField**, **ScribbleUnderline**, **Grain** — the motifs
  above as small components.

## Layout & accessibility

- Responsive: mobile-first, reflowing to the desktop mockups (`mockups/desktop/`)
  at ~900px. On desktop the mobile top bar becomes a full-width top nav (logo left,
  links + Follow button right) and content sits in a centered ~1200px `.wrap`; the
  mobile sticky RSVP bar becomes an inline RSVP box on the event page.
- Use flex/grid with `gap` (the mockups already do) — not margin hacks.
- Hit targets ≥ 44px.
- Icons are inline stroke SVGs on a 24px grid — no emoji, no icon fonts. Keep one
  consistent stroke style.
- Every interactive element needs a visible focus state and an accessible label
  (the mockups use `aria-label` on icon-only links).
- Decorative SVGs are `aria-hidden="true"`.
- Honor `prefers-reduced-motion` for the blob drift and any reveal animations.
