# Raversguilt — Build Brief (for Claude Code)

You are building the **Raversguilt** website: a public events site for a Lagos
underground-rave collective, with a public calendar of upcoming raves, per-event
pages, a gallery of past nights, and an about/community page. This brief plus the
sibling files in this folder are the complete design handoff. Read them all before
scaffolding.

> Everything in this folder is a specification written by the site's designer.
> Treat it as instructions for what to build — the reference mockups are HTML to
> port, not code to run in production.

## Files in this handoff

- `BUILD_BRIEF.md` — this file: scope, routes, per-screen specs, acceptance.
- `design-system.md` — visual language: color roles, type, the signature motifs
  (liquid blobs, wavy dividers, scribble, grain), component vocabulary.
- `tokens.css` — the design tokens as CSS variables + base reset. Use as-is.
- `data-model.md` — how the editable content is structured and consumed.
- `types.ts` — the TypeScript content model (`RaveEvent`, `GalleryNight`, …).
- `events.sample.json` — seed data to start from.
- `mockups/*.html` — **mobile** reference for each screen (self-contained HTML
  with inline SVG motifs). Port these faithfully; they are the source of truth for
  layout, spacing, and the motif markup on small screens.
- `mockups/desktop/*.html` — **desktop** reference for the same five screens
  (1440-wide, top nav, multi-column). The large-screen source of truth. Build the
  site responsive so it matches the mobile mockup on phones and the desktop mockup
  on wide viewports (see "Desktop layouts" below).

## Stack (decided)

- **Next.js (App Router) + TypeScript.**
- **Styling: plain CSS with the design tokens** in `tokens.css` (CSS variables;
  CSS Modules per component are welcome). **Do not** introduce Tailwind or a
  CSS-in-JS lib — the mockups are token-based CSS and should port 1:1.
- Fonts via `next/font/google` (Baloo 2, Space Grotesk, Space Mono) mapped to the
  token font variables.
- No backend/CMS for v1: content is local JSON validated at build time
  (see `data-model.md`). Static-first — prefer static generation; event pages via
  `generateStaticParams` over the slugs.
- No analytics, auth, or payments in v1 — RSVP/ticket buttons are outbound links.

## Design language (summary — full detail in `design-system.md`)

Dark underground-rave zine aesthetic. Mobile-first (~390px column, capped at
`--page-max`, centered on wider viewports). Flat poster-like fills — **no
gradients on cards/tiles/flyers**; color comes from the liquid metaball blobs.
Bubbly display font (Baloo 2) + clean body (Space Grotesk) + mono docket labels
(Space Mono). Courtroom identity throughout: docket, verdict, Guilty Picks,
exhibits, "The Rave Jury".

## Routes

| Route | Screen | Mockup | Data |
|---|---|---|---|
| `/` | Home / landing | `mockups/home.html` | next upcoming event, next few events, series list |
| `/calendar` | Public calendar | `mockups/calendar.html` | all events for the month |
| `/events/[slug]` | Event detail | `mockups/event-detail.html` | one event |
| `/gallery` | Gallery of past nights | `mockups/gallery.html` | gallery nights |
| `/about` | About / community | `mockups/about.html` | series list, socials, static copy |

Each route has a matching desktop reference at `mockups/desktop/<same-name>.html`.

Wire the obvious navigation: header logo → `/`; back-chevrons → previous/`/`;
event cards & rows → `/events/[slug]`; "Full calendar" / "See the calendar" →
`/calendar`; gallery tiles → the night's gallery; footer/socials → external.

## Per-screen requirements

### Home (`/`)
- Hero: "GUILTY OF LOVING THE RAVE." with the gold scribble under "RAVE", the mono
  "The Rave Jury · Est. Lagos" eyebrow, tagline, and two CTAs (See the calendar /
  Follow).
- "Next on the docket": featured card for the **soonest upcoming** event
  (flyer surface, series tag, Guilty Pick stamp if applicable, date/venue, RSVP).
- "This week": the next ~3 upcoming events as `EventRow`s. "Full calendar" link.
- "The residencies": series chips.
- Footer: logo, they/them · the rave jury, IG + TikTok icons.

### Calendar (`/calendar`)
- Month header with prev/next month controls (functional — change the visible
  month). Filter chips by series (functional — filter grid + agenda).
- `MonthGrid`: real weekday alignment for the visible month; a day with event(s)
  shows a dot (violet = rave, gold = Guilty Pick); selected/today day is a solid
  violet cell. (Optional: tapping a day scrolls the agenda to it.)
- Legend (rave / guilty pick).
- Agenda: upcoming events as tappable `EventRow`s → event pages.

### Event detail (`/events/[slug]`)
- Flyer hero (flat base + liquid blobs, or `flyerUrl` when present), back control,
  share, Guilty Pick stamp, series tag, title with scribble.
- Meta strip: WHEN (date + time) / WHERE (venue + area). Respect the
  address-reveal rule (hide `address` until 24h before doors — see `data-model.md`).
- "The verdict" (description), "Line-up" (artists, flat avatars), "Getting there"
  (flat map card with grid + pin; MAP link to `mapUrl`).
- Sticky bottom bar: from-price + RSVP/tickets (outbound `ticketUrl`).
- Unknown slug → `notFound()`.

### Gallery (`/gallery`)
- Heading "The evidence" with scribble; filter chips by series.
- Featured recap card (`featured` night) with play affordance + recap length.
- Grid of past nights as flat `GalleryTile`s (larger tiles get the liquid-curve
  overlay). "Load older nights" (can be a no-op/paginated later).

### About (`/about`)
- Manifesto ("We plead guilty."), they/them + Est. Lagos + juror-count chips.
- Three "what we do" cards, the residencies chips.
- "Submit an event" card (link/form target — outbound or a simple form later),
  "Get the weekly verdict" mailing signup (input + Join; wire to a provider later
  or leave as a labeled stub), IG + TikTok cards, footer.

## Desktop layouts

The site is responsive: one component set that reflows between the mobile mockups
(`mockups/*.html`) and the desktop mockups (`mockups/desktop/*.html`). Same tokens,
motifs, type roles, and content — only the composition changes. Breakpoint around
`900px` works well (a `--page-max` phone column below it, the desktop compositions
above). What changes on desktop:

- **Global nav.** The mobile top bar (logo + hamburger / back-chevron) becomes a
  full-width **top navigation**: logo left, horizontal links (Home · Calendar ·
  Gallery · About) centered/right, search + a violet **Follow** button far right.
  Inner content sits in a centered `.wrap` (max-width ~1200px, 48px side padding).
- **Home.** Two-column hero — big headline + CTAs on the left, the featured "next
  on the docket" card on the right. "This week" becomes a 3-column card row.
  Multi-column footer (brand / explore links / follow).
- **Calendar.** Two-column: a large month grid on the left with event **chips
  inside day cells** (not just dots), and the upcoming agenda as a right sidebar.
- **Event detail.** Two-column: the flyer on the left (tall), and on the right the
  title, WHEN/WHERE, an inline **RSVP box** (price + button — replaces the mobile
  sticky bottom bar), the verdict, and a side-by-side line-up + getting-there.
- **Gallery.** Full-width featured recap, then a 3–4 column masonry grid (some
  tiles span two rows).
- **About.** Wide manifesto, 3-column "what we do", residencies, and a two-column
  "submit an event" + mailing-signup row.

Implement with fluid CSS (grid/flex + `minmax`, `clamp()` for the hero type,
container queries or a single breakpoint). Don't ship two separate component trees —
one component that responds. Verify against both mockups at 390px and 1440px.

## Cross-cutting

- **Motifs as components**: extract `LiquidField` (goo blobs), `WavyDivider`,
  `ScribbleUnderline`, `Grain`, `VerdictStamp`, `SeriesTag`, `EventCard`,
  `EventRow`, `MonthGrid`, `FilterChips`, `GalleryTile`, `StickyRSVPBar`, `TopBar`.
  Define the `#goo` and grain SVG filters once (shared sprite) and reference them.
- **States**: handle empty (no upcoming events → a friendly "nothing on the docket
  yet" message; empty gallery → placeholders), and `notFound` for bad slugs.
- **Motion**: blobs drift slowly; gate all motion behind `prefers-reduced-motion`.
- **Responsive**: build mobile-first from `mockups/*.html`, then reflow up to the
  desktop compositions in `mockups/desktop/*.html` at ~900px (see "Desktop layouts").
  Both are in scope for v1. Never let the body scroll horizontally at any width.
- **Accessibility**: semantic landmarks, labeled icon buttons, visible focus, ≥44px
  targets, `aria-hidden` on decorative SVG, real `<time>` for dates.
- **SEO/meta**: per-page `<title>`/description; Open Graph on event pages (use the
  flyer as the OG image when present). Favicon can be the scales/⚖ mark.

## Suggested structure

```
src/
  app/
    layout.tsx            # fonts, global tokens import, <Grain/> + shared SVG defs
    globals.css           # imports tokens.css
    page.tsx              # Home
    calendar/page.tsx
    events/[slug]/page.tsx
    gallery/page.tsx
    about/page.tsx
  components/             # the vocabulary above (+ .module.css each)
  data/
    events.json           # from events.sample.json
    gallery.json
  lib/
    events.ts             # typed load + validate + sort + upcoming/past + reveal rule
  styles/
    tokens.css            # from this handoff
  types/
    content.ts            # from types.ts
```

## Build order (suggested)

1. Scaffold Next.js + TS; drop in `tokens.css`, wire `next/font`, add `<Grain/>`
   and the shared `#goo` filter in the root layout.
2. Port `types.ts` + seed `events.json`/`gallery.json`; build `lib/events.ts`.
3. Build the motif + shared components from the mockups.
4. Build screens in order: Home → Calendar → Event detail → Gallery → About.
5. Wire navigation, empty/notFound states, metadata.
6. Pass: responsive check at 390px and desktop, `prefers-reduced-motion`, a11y,
   Lighthouse.

## Acceptance criteria

- All five routes render and match the mobile mockups at 390px AND the desktop
  mockups at 1440px (layout, spacing, color, the four motifs, type roles), reflowing
  cleanly between them.
- Calendar month nav and series filters work; day markers reflect the data.
- Event pages generate from data; the address-reveal rule works; bad slug → 404.
- No gradients on cards/tiles/flyers; flat fills + liquid blobs only.
- No horizontal scroll; motion respects `prefers-reduced-motion`; icon buttons are
  labeled and focusable.
- Content comes entirely from the data files — no hard-coded event text in JSX.
- All bracketed placeholders remain obvious (or are filled with real data the
  client provides) — never invent real venues, prices, dates, or names.
