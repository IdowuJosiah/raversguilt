import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  allEvents,
  getEventBySlug,
  formatEventDate,
  getTimeLabel,
  shouldRevealAddress,
} from "@/lib/events";
import LiquidField from "@/components/LiquidField";
import WavyDivider from "@/components/WavyDivider";
import ScribbleUnderline from "@/components/ScribbleUnderline";
import SeriesTag from "@/components/SeriesTag";
import VerdictStamp from "@/components/VerdictStamp";
import StickyRSVPBar from "@/components/StickyRSVPBar";
import TopBar from "@/components/TopBar";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return allEvents.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) return { title: "Event not found" };
  return {
    title: event.title,
    description: event.description ?? `${event.series} · ${formatEventDate(event.startsAt)} · ${event.venueName}`,
    openGraph: event.flyerUrl
      ? { images: [{ url: event.flyerUrl }] }
      : undefined,
  };
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) notFound();

  const revealAddress = shouldRevealAddress(event);
  const dateLabel = formatEventDate(event.startsAt);
  const timeLabel = getTimeLabel(event);

  return (
    <main
      className="page-outer"
      style={{ paddingBottom: 96 /* space for sticky bar */ }}
    >
      {/* Shared goo filter already in layout */}

      <div className="page-content">
        {/* Desktop site nav; mobile shows back button */}
        <TopBar variant="inner" title={event.series} docketLabel="CASE FILE" backHref="/calendar" active="calendar" />

        <div className="event-grid">
        <div className="event-left">
        {/* ---- Flyer hero ---- */}
        <section
          className="event-flyer" style={{ position: "relative", height: 420, overflow: "hidden", background: "#150e26" }}
          aria-label={`${event.title} flyer`}
        >
          {event.flyerUrl ? (
            <img
              src={event.flyerUrl}
              alt={`${event.title} flyer`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <>
              <LiquidField
                style={{ position: "absolute", top: -40, left: -40, width: 270, height: 270 }}
                fill="#ff4d6d"
                opacity={0.5}
                circles={[
                  { cx: 94, cy: 92, r: 44 },
                  { cx: 126, cy: 118, r: 30 },
                  { cx: 72, cy: 122, r: 26 },
                  { cx: 128, cy: 70, r: 22 },
                ]}
              />
              <LiquidField
                style={{ position: "absolute", bottom: -60, right: -50, width: 300, height: 300 }}
                fill="#a86bff"
                opacity={0.68}
                circles={[
                  { cx: 106, cy: 98, r: 48 },
                  { cx: 140, cy: 124, r: 32 },
                  { cx: 80, cy: 128, r: 26 },
                  { cx: 140, cy: 72, r: 24 },
                ]}
              />
              {/* Curve trails */}
              <svg
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
                viewBox="0 0 390 420"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M-20 210 C 100 130, 190 300, 300 210 C 370 155, 420 230, 400 330"
                  stroke="var(--text)"
                  strokeWidth="1.3"
                  opacity="0.22"
                  strokeLinecap="round"
                />
                <path
                  d="M-20 250 C 110 180, 200 340, 320 250 C 390 200, 430 270, 410 360"
                  stroke="var(--gold)"
                  strokeWidth="1.1"
                  opacity="0.28"
                  strokeLinecap="round"
                />
              </svg>
              <div
                className="mono"
                style={{
                  position: "absolute",
                  left: 20,
                  top: 196,
                  fontSize: 10,
                  letterSpacing: "0.16em",
                  color: "rgba(239,233,247,0.4)",
                }}
              >
                [ EVENT FLYER — 4:5 ]
              </div>
            </>
          )}

          {/* Hero controls */}
          <div
            style={{
              position: "absolute",
              top: 16,
              left: 16,
              right: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Link
              href="/calendar"
              aria-label="Back to calendar"
              style={{
                width: 40,
                height: 40,
                borderRadius: 11,
                background: "rgba(11,7,16,0.55)",
                backdropFilter: "blur(4px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M15 5l-7 7 7 7" stroke="var(--text)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <div style={{ display: "flex", gap: 10 }}>
              <a
                href={`/events/${event.slug}`}
                aria-label="Share event"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 11,
                  background: "rgba(11,7,16,0.55)",
                  backdropFilter: "blur(4px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M4 12v7a1 1 0 001 1h14a1 1 0 001-1v-7" stroke="var(--text)" strokeWidth="1.7" strokeLinecap="round" />
                  <path d="M12 3v12M8 7l4-4 4 4" stroke="var(--text)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>

          {/* Guilty Pick stamp */}
          {event.guiltyPick && (
            <div style={{ position: "absolute", top: 74, right: 20 }}>
              <VerdictStamp />
            </div>
          )}

          {/* Series + title overlay */}
          <div style={{ position: "absolute", left: 20, right: 20, bottom: 22 }}>
            <SeriesTag series={event.series} />
            <h1
              className="disp event-title"
              style={{
                position: "relative",
                margin: "12px 0 0",
                fontWeight: 800,
                fontSize: 36,
                lineHeight: 1.03,
              }}
            >
              {event.title}
              <ScribbleUnderline width={120} />
            </h1>
          </div>
        </section>

        </div>{/* event-left */}
        <div className="event-right">
        {/* ---- Meta strip ---- */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: 1,
            background: "var(--line)",
            borderBottom: "1px solid var(--line)",
          }}
          role="list"
          aria-label="Event details"
        >
          <div style={{ background: "var(--bg)", padding: "16px 20px" }} role="listitem">
            <div className="mono" style={{ fontSize: 9, letterSpacing: "0.16em", color: "var(--muted-2)" }}>
              WHEN
            </div>
            <div className="disp" style={{ fontWeight: 700, fontSize: 16, marginTop: 6 }}>
              <time dateTime={event.startsAt}>{dateLabel}</time>
            </div>
            <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>
              {timeLabel}
            </div>
          </div>
          <div style={{ background: "var(--bg)", padding: "16px 20px" }} role="listitem">
            <div className="mono" style={{ fontSize: 9, letterSpacing: "0.16em", color: "var(--muted-2)" }}>
              WHERE
            </div>
            <div className="disp" style={{ fontWeight: 700, fontSize: 16, marginTop: 6 }}>
              {event.venueName}
            </div>
            {event.area && (
              <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>
                {event.area}
              </div>
            )}
          </div>
        </div>

        {/* Desktop inline RSVP */}
        <div className="event-rsvp-desktop">
          <div>
            <div className="mono" style={{ fontSize: 10, color: "var(--muted-2)", letterSpacing: "0.1em" }}>FROM</div>
            <div className="disp" style={{ fontWeight: 800, fontSize: 22 }}>{event.priceLabel ?? "Free"}</div>
          </div>
          {event.ticketUrl ? (
            <a href={event.ticketUrl} target="_blank" rel="noopener noreferrer" className="event-rsvp-btn">RSVP / Get tickets</a>
          ) : (
            <span className="event-rsvp-btn" style={{ opacity: 0.6 }}>RSVP / Get tickets</span>
          )}
        </div>

        {/* ---- The verdict ---- */}
        {event.description && (
          <section style={{ padding: "24px 20px 4px" }} aria-label="The verdict">
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <svg width="26" height="12" viewBox="0 0 26 12" fill="none" aria-hidden="true">
                <path d="M1 7 C 4 2, 7 2, 10 6 C 13 10, 16 10, 19 6 C 22 2, 24 4, 25 6" stroke="#e0aa47" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              <span className="mono" style={{ fontSize: 11, letterSpacing: "0.2em", color: "var(--gold)", textTransform: "uppercase" }}>
                The verdict
              </span>
            </div>
            <p style={{ margin: "12px 0 0", fontSize: 15, lineHeight: 1.6, color: "#d9d1e6" }}>
              {event.description}
            </p>
          </section>
        )}

        <WavyDivider padding="22px 20px 4px" />

        {/* ---- Line-up ---- */}
        {event.lineup && event.lineup.length > 0 && (
          <section style={{ padding: "6px 20px 4px" }} aria-label="Line-up">
            <h2 className="disp" style={{ margin: "0 0 14px", fontWeight: 700, fontSize: 19 }}>
              Line-up
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {event.lineup.map((artist, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 13,
                    background: "var(--surface)",
                    border: "1px solid var(--line)",
                    borderRadius: 14,
                    padding: "11px 14px",
                  }}
                >
                  {/* Avatar placeholder */}
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 10,
                      background: "#241640",
                      border: "1px solid #2f2050",
                      flexShrink: 0,
                    }}
                    aria-hidden="true"
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{artist.name}</div>
                    {artist.role && (
                      <div className="mono" style={{ fontSize: 10, color: "var(--muted)", letterSpacing: "0.08em", marginTop: 2 }}>
                        {artist.role}
                      </div>
                    )}
                  </div>
                  {artist.b2b && (
                    <span className="mono" style={{ fontSize: 9, letterSpacing: "0.1em", color: "var(--gold)" }}>
                      B2B
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ---- Getting there ---- */}
        <section style={{ padding: "26px 20px 4px" }} aria-label="Getting there">
          <h2 className="disp" style={{ margin: "0 0 14px", fontWeight: 700, fontSize: 19 }}>
            Getting there
          </h2>
          <div
            style={{
              border: "1px solid var(--line)",
              borderRadius: "var(--r-lg)",
              overflow: "hidden",
            }}
          >
            {/* Map placeholder with grid pattern */}
            <div
              style={{
                height: 140,
                position: "relative",
                background: "#141024",
                backgroundImage:
                  "linear-gradient(rgba(168,107,255,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(168,107,255,0.10) 1px, transparent 1px)",
                backgroundSize: "24px 24px, 24px 24px",
              }}
              aria-hidden="true"
            >
              <svg
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
                viewBox="0 0 350 140"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M-10 90 C 80 40, 140 120, 220 75 C 290 38, 340 90, 360 60"
                  stroke="var(--violet)"
                  strokeWidth="1.4"
                  opacity="0.4"
                  strokeLinecap="round"
                />
              </svg>
              {/* Map pin */}
              <svg
                style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -70%)" }}
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path d="M12 21s7-5.5 7-11a7 7 0 10-14 0c0 5.5 7 11 7 11z" fill="var(--hot)" />
                <circle cx="12" cy="10" r="2.6" fill="#0b0710" />
              </svg>
            </div>

            <div
              style={{
                padding: "14px 16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div style={{ fontWeight: 600, fontSize: 13 }}>
                  {revealAddress && event.address
                    ? event.address
                    : "[Venue address]"}
                </div>
                <div className="mono" style={{ fontSize: 10, color: "var(--muted)", marginTop: 3, letterSpacing: "0.06em" }}>
                  {revealAddress ? "ADDRESS CONFIRMED" : "SHARED 24H BEFORE DOORS"}
                </div>
              </div>
              {event.mapUrl && revealAddress && (
                <a
                  href={event.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mono"
                  style={{ fontSize: 11, letterSpacing: "0.1em", color: "var(--gold)" }}
                >
                  MAP →
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Bottom spacer for sticky bar */}
        <div style={{ height: 96 }} aria-hidden="true" />
        </div>{/* event-right */}
        </div>{/* event-grid */}
      </div>

      {/* ---- Sticky RSVP bar (mobile only) ---- */}
      <div className="event-sticky">
        <StickyRSVPBar priceLabel={event.priceLabel} ticketUrl={event.ticketUrl} />
      </div>
    </main>
  );
}
