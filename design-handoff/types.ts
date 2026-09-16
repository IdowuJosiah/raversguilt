// Raversguilt — content model (source of truth for the editable events data)
// Keep these types next to your data loader. The public calendar, event pages,
// "This week" list, and homepage "next up" card all derive from RaveEvent[].

/** A recurring party series / residency. Drives filter chips and tags. */
export type Series =
  | "303 Garage"
  | "Void House"
  | "Group Therapy"
  | "Groove Station"
  | "Healin' in Saturn"
  | "House Arrest"
  | "RestlessAffairs"
  | "Off Duty";

export interface Artist {
  name: string;
  /** e.g. "HEADLINE · 12–2AM" or "SUPPORT · 10–12" */
  role?: string;
  /** true if this act is a back-to-back set */
  b2b?: boolean;
}

export interface RaveEvent {
  /** URL slug, unique. e.g. "acid-church-vol-2" */
  slug: string;
  title: string;
  series: Series;
  /** ISO 8601 start, in Africa/Lagos. e.g. "2026-09-12T22:00:00+01:00" */
  startsAt: string;
  /** Optional ISO end; if omitted, treat as "– late". */
  endsAt?: string;
  /** Human door time label shown on cards, e.g. "10PM – late". Optional; can be derived. */
  timeLabel?: string;
  /** Venue name. Use "[Venue TBA]" when secret; reveal closer to the date. */
  venueName: string;
  /** Area label, e.g. "Lagos Mainland" / "Island". */
  area?: string;
  /** Full address; often hidden until 24h before doors. */
  address?: string;
  /** Map link (Google Maps, etc.). */
  mapUrl?: string;
  /** Editorial "verdict" / description shown on the event page. */
  description?: string;
  lineup?: Artist[];
  /** Ticket or RSVP link. */
  ticketUrl?: string;
  /** From-price label, e.g. "₦5,000". Optional. */
  priceLabel?: string;
  /** Flyer image path/URL (4:5). Optional; falls back to the liquid-blob placeholder. */
  flyerUrl?: string;
  /** Marks a jury-endorsed "Guilty Pick" — gold star treatment. */
  guiltyPick?: boolean;
}

/** A past night in the gallery. */
export interface GalleryNight {
  slug: string;
  title: string;
  series: Series;
  /** ISO date of the night. */
  date: string;
  /** Cover image/video-poster path. Optional; falls back to a flat tile. */
  coverUrl?: string;
  /** Optional recap video URL + duration label, e.g. "0:48". */
  recapUrl?: string;
  recapLength?: string;
  /** Photos in this night's gallery. */
  photos?: string[];
  /** Feature this night as the big recap card at the top of the gallery. */
  featured?: boolean;
}
