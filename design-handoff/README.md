# Raversguilt — Design Handoff

This folder is the design handoff for the Raversguilt website. Point Claude Code
at it and let it build.

## Feed it to Claude Code

From your repo, run `claude` and give it something like:

> Read `design-handoff/BUILD_BRIEF.md` and everything it references, then build the
> Raversguilt site per the spec. Start by scaffolding Next.js + TypeScript, then
> port the mockups screen by screen. Ask me before installing anything unexpected.

Claude Code will read the brief, the design system, the tokens, the data model, and
the reference mockups, and implement the site.

## What's here

- **`BUILD_BRIEF.md`** — start here. Scope, stack, routes, per-screen specs,
  suggested structure, build order, acceptance criteria.
- **`design-system.md`** — color, type, the four signature motifs, component list.
- **`tokens.css`** — design tokens (drop into `src/styles/`, import globally).
- **`data-model.md`** — how the editable content works.
- **`types.ts`** — the content model types.
- **`events.sample.json`** — seed data.
- **`mockups/`** — **mobile** reference HTML for all five screens. Open any in a
  browser to see the target; the markup is the source of truth for the motifs.
- **`mockups/desktop/`** — **desktop** reference HTML for the same five screens
  (1440-wide, top nav, multi-column). The site is built responsive to match both.

## Decisions already made

- Next.js (App Router) + TypeScript.
- Plain CSS with design tokens (no Tailwind, no CSS-in-JS).
- Local JSON content, no backend/CMS for v1.
- Mobile-first; dark theme only.

## Not decided / for you to fill in

- Real event data, flyers, and photos (the seed is placeholder — bracketed values).
- Ticketing/RSVP + mailing-list providers (buttons are outbound-link stubs for now).
- Desktop multi-column layouts for calendar/gallery (a later pass).
