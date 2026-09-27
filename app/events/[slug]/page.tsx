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
import ScribbleUnderline from "@/components/ScribbleUnderline";
import SeriesTag from "@/components/SeriesTag";
import VerdictStamp from "@/components/VerdictStamp";
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
    openGraph: event.flyerUrl ? { images: [{ url: event.flyerUrl }] } : undefined,
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
    <main className="page-outer">

      {/* ══════════════════════════════════════════════════════
          HERO — full-bleed split (text left · visual right)
      ══════════════════════════════════════════════════════ */}
      <div className="ev-hero">

        {/* Left: headline content */}
        <div className="ev-hero-body">
          {/* Nav */}
          <TopBar variant="inner" title={event.series} docketLabel="CASE FILE" backHref="/articles" active="articles" />

          <div className="ev-hero-content">
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <SeriesTag series={event.series} />
              {event.guiltyPick && <VerdictStamp />}
            </div>

            <h1 className="disp ev-hero-title">
              {event.title}
              <ScribbleUnderline width={140} />
            </h1>

            <div className="ev-hero-meta mono">
              <time dateTime={event.startsAt}>{dateLabel}</time>
              {" · "}{timeLabel}
              {" · "}{event.venueName !== "[Venue TBA]" ? event.venueName : event.area ?? "Lagos"}
            </div>
          </div>
        </div>

        {/* Right: visual */}
        <div className="ev-hero-visual" style={{ background: "#150e26" }}>
          {event.flyerUrl ? (
            <img
              src={event.flyerUrl}
              alt={`${event.title} flyer`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <>
              <LiquidField
                style={{ position: "absolute", top: -40, left: -40, width: 340, height: 340 }}
                fill="#ff4d6d"
                opacity={0.5}
                circles={[
                  { cx: 120, cy: 116, r: 56 },
                  { cx: 158, cy: 150, r: 38 },
                  { cx: 90, cy: 154, r: 30 },
                  { cx: 160, cy: 88, r: 26 },
                ]}
              />
              <LiquidField
                style={{ position: "absolute", bottom: -60, right: -50, width: 380, height: 380 }}
                fill="#a86bff"
                opacity={0.68}
                circles={[
                  { cx: 140, cy: 126, r: 60 },
                  { cx: 178, cy: 158, r: 40 },
                  { cx: 104, cy: 160, r: 32 },
                  { cx: 178, cy: 92, r: 28 },
                ]}
              />
              <svg
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
                viewBox="0 0 560 600"
                fill="none"
                preserveAspectRatio="xMidYMid slice"
                aria-hidden="true"
              >
                <path d="M-20 300 C 120 160, 260 440, 420 280 C 510 200, 570 320, 560 500"
                  stroke="var(--text)" strokeWidth="1.4" opacity="0.18" strokeLinecap="round" />
                <path d="M60 -20 C 40 180, 280 340, 200 600"
                  stroke="var(--gold)" strokeWidth="1" opacity="0.22" strokeLinecap="round" />
              </svg>
              <div className="mono" style={{
                position: "absolute", left: 24, top: "50%", transform: "translateY(-50%)",
                fontSize: 10, letterSpacing: "0.16em", color: "rgba(239,233,247,0.3)",
              }}>
                [ EVENT FLYER — 4:5 ]
              </div>
            </>
          )}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          ARTICLE BODY — narrow reading column
      ══════════════════════════════════════════════════════ */}
      <div className="ev-body">

        {/* Byline strip */}
        <div className="ev-byline mono">
          COVERED BY RAVERSGUILT · {new Date(event.startsAt).getFullYear()}
        </div>

        {/* Meta row — WHEN / WHERE */}
        <div className="ev-meta-row" role="list" aria-label="Event details">
          <div role="listitem">
            <div className="mono" style={{ fontSize: 9, letterSpacing: "0.18em", color: "var(--muted-2)", marginBottom: 6 }}>WHEN</div>
            <div className="disp" style={{ fontWeight: 700, fontSize: 17 }}>
              <time dateTime={event.startsAt}>{dateLabel}</time>
            </div>
            <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 3 }}>{timeLabel}</div>
          </div>
          <div className="ev-meta-divider" aria-hidden="true" />
          <div role="listitem">
            <div className="mono" style={{ fontSize: 9, letterSpacing: "0.18em", color: "var(--muted-2)", marginBottom: 6 }}>WHERE</div>
            <div className="disp" style={{ fontWeight: 700, fontSize: 17 }}>{event.venueName}</div>
            {event.area && <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 3 }}>{event.area}</div>}
          </div>
          {event.priceLabel && (
            <>
              <div className="ev-meta-divider" aria-hidden="true" />
              <div role="listitem">
                <div className="mono" style={{ fontSize: 9, letterSpacing: "0.18em", color: "var(--muted-2)", marginBottom: 6 }}>FROM</div>
                <div className="disp" style={{ fontWeight: 700, fontSize: 17 }}>{event.priceLabel}</div>
              </div>
            </>
          )}
        </div>

        {/* 01 — The Verdict */}
        {event.description && (
          <section aria-label="The verdict">
            <div className="ev-section-label" style={{ marginTop: 40 }}>
              <span className="mono ev-section-num">01</span>
              <span className="ev-section-rule" />
              <span className="mono ev-section-title">The Verdict</span>
            </div>
            <blockquote className="ev-pullquote">{event.description}</blockquote>
          </section>
        )}

        {/* 02 — Line-up */}
        {event.lineup && event.lineup.length > 0 && (
          <section aria-label="Line-up">
            <div className="ev-section-label" style={{ marginTop: 44 }}>
              <span className="mono ev-section-num">02</span>
              <span className="ev-section-rule" />
              <span className="mono ev-section-title">Line-up</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {event.lineup.map((artist, i) => (
                <div key={i} className="ev-lineup-row">
                  <div style={{
                    width: 44, height: 44, borderRadius: 10,
                    background: "#241640", border: "1px solid #2f2050", flexShrink: 0,
                  }} aria-hidden="true" />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{artist.name}</div>
                    {artist.role && (
                      <div className="mono" style={{ fontSize: 10, color: "var(--muted)", letterSpacing: "0.08em", marginTop: 2 }}>
                        {artist.role}
                      </div>
                    )}
                  </div>
                  {artist.b2b && (
                    <span className="mono" style={{ fontSize: 9, letterSpacing: "0.1em", color: "var(--gold)" }}>B2B</span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 03 — Getting There */}
        <section aria-label="Getting there">
          <div className="ev-section-label" style={{ marginTop: 44 }}>
            <span className="mono ev-section-num">{event.lineup && event.lineup.length > 0 ? "03" : "02"}</span>
            <span className="ev-section-rule" />
            <span className="mono ev-section-title">Getting There</span>
          </div>
          <div style={{ border: "1px solid var(--line)", borderRadius: "var(--r-lg)", overflow: "hidden" }}>
            {/* Map placeholder */}
            <div style={{
              height: 160, position: "relative", background: "#141024",
              backgroundImage: "linear-gradient(rgba(168,107,255,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(168,107,255,0.10) 1px, transparent 1px)",
              backgroundSize: "24px 24px, 24px 24px",
            }} aria-hidden="true">
              <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
                viewBox="0 0 640 160" fill="none" preserveAspectRatio="none" aria-hidden="true">
                <path d="M-10 100 C 100 48, 200 130, 340 84 C 460 44, 560 108, 650 70"
                  stroke="var(--violet)" strokeWidth="1.4" opacity="0.4" strokeLinecap="round" />
              </svg>
              <svg style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -70%)" }}
                width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 21s7-5.5 7-11a7 7 0 10-14 0c0 5.5 7 11 7 11z" fill="var(--hot)" />
                <circle cx="12" cy="10" r="2.6" fill="#0b0710" />
              </svg>
            </div>
            <div style={{ padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 13 }}>
                  {revealAddress && event.address ? event.address : "[Venue address]"}
                </div>
                <div className="mono" style={{ fontSize: 10, color: "var(--muted)", marginTop: 3, letterSpacing: "0.06em" }}>
                  {revealAddress ? "ADDRESS CONFIRMED" : "SHARED 24H BEFORE DOORS"}
                </div>
              </div>
              {event.mapUrl && revealAddress && (
                <a href={event.mapUrl} target="_blank" rel="noopener noreferrer"
                  className="mono" style={{ fontSize: 11, letterSpacing: "0.1em", color: "var(--gold)" }}>
                  MAP →
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Back link */}
        <div style={{ marginTop: 52, paddingBottom: 20 }}>
          <Link href="/articles" className="mono" style={{ fontSize: 11, letterSpacing: "0.16em", color: "var(--muted)", textDecoration: "none" }}>
            ← Back to all case files
          </Link>
        </div>
      </div>

    </main>
  );
}
