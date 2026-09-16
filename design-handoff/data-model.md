# Raversguilt — Content / Data Model

The whole site is driven by a small, hand-editable data set. No CMS or backend for
v1 — a teammate updates a data file and the site rebuilds. `types.ts` is the
contract; `events.sample.json` is a ready-to-use seed.

## Where the data lives

Recommended: a single source under `src/data/` (or `content/`):

- `src/data/events.json` — upcoming + recent raves (`RaveEvent[]`).
- `src/data/gallery.json` — past nights (`GalleryNight[]`).

Load and validate them in one typed module (e.g. `src/lib/events.ts`) that the
pages import. Consider validating at build time (e.g. `zod`) so a malformed entry
fails the build instead of the page. Sort by `startsAt`; treat "upcoming" as
`startsAt >= now` in Africa/Lagos.

Editing workflow to document for the client: "open `events.json`, copy the last
block, change the fields, commit." Keep it that simple.

## RaveEvent

See `types.ts` for the exact TypeScript. Field notes:

- `slug` — unique, URL-safe; the event page route is `/events/[slug]`.
- `series` — one of the fixed union values; drives the filter chips and tag color.
- `startsAt` / `endsAt` — ISO 8601 **with the +01:00 Lagos offset**. Derive the
  day cell, weekday, and "upcoming vs past" from this; don't store them separately.
- `timeLabel` — optional friendly override ("10PM – late"); otherwise derive from
  `startsAt`/`endsAt`.
- `venueName` / `address` — venues are often secret; `venueName` shows
  "[Venue TBA]" and `address` stays hidden until ~24h before doors. Model a simple
  rule: show `address` only when `now >= startsAt - 24h`.
- `guiltyPick` — gold star / "GUILTY PICK" treatment on cards and the calendar.
- `flyerUrl` — 4:5 image; when absent, render the flat-base + liquid-blob
  placeholder from the mockups.
- `ticketUrl`, `priceLabel` — power the RSVP button and the sticky price.

## GalleryNight

Past nights for the gallery grid. `featured: true` promotes one to the big recap
card. `recapUrl` + `recapLength` render the play affordance. `photos` is the tap-in
gallery; when empty, show flat tiles as placeholders.

## What each screen consumes

- **Home** — the soonest upcoming event (featured card), the next few upcoming
  events (the "This week" list), and the list of `series` (residency chips).
- **Calendar** — all events for the visible month → month grid dots + agenda list;
  filterable by `series`.
- **Event detail** — one event by `slug`.
- **Gallery** — `GalleryNight[]`, filterable by `series`, one `featured`.
- **About** — mostly static copy; renders the `series` list and social links.

## Placeholders — replace before launch

The seed is intentionally marked. Anything in brackets is a real fact to fill in:
`[Venue TBA]`, `[Venue address ...]`, `[DJ NAME]`, `₦[PRICE]`, and empty
`ticketUrl` / `mapUrl` / image fields. Flyers and photos are the biggest visual
upgrade — the flat placeholder surfaces are shaped to receive them.
