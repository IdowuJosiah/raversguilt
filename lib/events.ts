import eventsRaw from "@/data/events.json";
import galleryRaw from "@/data/gallery.json";
import type { RaveEvent, GalleryNight, Series } from "@/types/content";

export const ALL_SERIES: Series[] = [
  "303 Garage",
  "Void House",
  "Group Therapy",
  "Groove Station",
  "Healin' in Saturn",
  "House Arrest",
  "RestlessAffairs",
  "Off Duty",
];

// Cast raw JSON to typed arrays
export const allEvents: RaveEvent[] = eventsRaw as RaveEvent[];
export const allGalleryNights: GalleryNight[] = galleryRaw as GalleryNight[];

// Sort by startsAt ascending
export const sortedEvents: RaveEvent[] = [...allEvents].sort(
  (a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime()
);

/** Events on or after `now` (build-time evaluated for static generation) */
export function getUpcomingEvents(now = new Date()): RaveEvent[] {
  return sortedEvents.filter((e) => new Date(e.startsAt) >= now);
}

/** Events strictly before `now` */
export function getPastEvents(now = new Date()): RaveEvent[] {
  return sortedEvents.filter((e) => new Date(e.startsAt) < now);
}

export function getEventBySlug(slug: string): RaveEvent | undefined {
  return allEvents.find((e) => e.slug === slug);
}

/** All events that fall within the given calendar month (0-indexed month) */
export function getEventsForMonth(year: number, month: number): RaveEvent[] {
  return sortedEvents.filter((e) => {
    const d = new Date(e.startsAt);
    return d.getFullYear() === year && d.getMonth() === month;
  });
}

/**
 * Address-reveal rule: show full address only within 24h of door time.
 * For static builds this is evaluated at build time.
 */
export function shouldRevealAddress(event: RaveEvent, now = new Date()): boolean {
  if (!event.address) return false;
  const start = new Date(event.startsAt);
  const msUntil = start.getTime() - now.getTime();
  return msUntil <= 24 * 60 * 60 * 1000;
}

// ---- Date formatting utilities ----

const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const MONTHS_SHORT = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const MONTHS_LONG = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/** e.g. "FRI" */
export function getDayOfWeek(dateStr: string): string {
  return DAYS[new Date(dateStr).getDay()];
}

/** e.g. "12" */
export function getDayNumber(dateStr: string): string {
  return String(new Date(dateStr).getDate());
}

/** e.g. "SEP" */
export function getMonthShort(dateStr: string): string {
  return MONTHS_SHORT[new Date(dateStr).getMonth()];
}

/** e.g. "September" */
export function getMonthLong(year: number, month: number): string {
  return MONTHS_LONG[month];
}

/** e.g. "Fri 12 Sep" */
export function formatEventDate(dateStr: string): string {
  const d = new Date(dateStr);
  const dow = DAYS[d.getDay()];
  // capitalise first letter only
  const dowDisp = dow.charAt(0) + dow.slice(1).toLowerCase();
  return `${dowDisp} ${d.getDate()} ${MONTHS_SHORT[d.getMonth()]}`;
}

/** Return the event's timeLabel or derive a short time string */
export function getTimeLabel(event: RaveEvent): string {
  if (event.timeLabel) return event.timeLabel;
  const d = new Date(event.startsAt);
  const h = d.getHours();
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 || 12;
  return `${h12}${ampm}`;
}

/** Unique series present in the events array */
export function getSeriesInEvents(events: RaveEvent[]): Series[] {
  const seen = new Set<Series>();
  for (const e of events) seen.add(e.series);
  return ALL_SERIES.filter((s) => seen.has(s));
}

/** Featured gallery night (the one with featured: true) */
export function getFeaturedNight(): GalleryNight | undefined {
  return allGalleryNights.find((n) => n.featured);
}

/** Tile background color by series */
export function getTileColor(series: Series): string {
  const map: Record<Series, string> = {
    "303 Garage": "var(--tile-303)",
    "Group Therapy": "var(--tile-therapy)",
    "Groove Station": "var(--tile-groove)",
    "Off Duty": "var(--tile-offduty)",
    "Void House": "var(--tile-void)",
    "Healin' in Saturn": "var(--tile-saturn)",
    "House Arrest": "var(--tile-arrest)",
    RestlessAffairs: "var(--tile-restless)",
  };
  return map[series] ?? "var(--surface)";
}
