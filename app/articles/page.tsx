import type { Metadata } from "next";
import Link from "next/link";
import TopBar from "@/components/TopBar";
import SeriesTag from "@/components/SeriesTag";
import VerdictStamp from "@/components/VerdictStamp";
import LiquidField from "@/components/LiquidField";
import ScribbleUnderline from "@/components/ScribbleUnderline";
import { sortedEvents, formatEventDate, getTimeLabel, getTileColor } from "@/lib/events";
import type { Series } from "@/types/content";

export const metadata: Metadata = {
  title: "Articles",
  description: "Every case filed — the full editorial index of nights we've tracked, judged, and archived.",
};

function seriesBlobs(series: Series): { c1: string; c2: string } {
  const map: Record<Series, { c1: string; c2: string }> = {
    "303 Garage":        { c1: "#a86bff", c2: "#ff4d6d" },
    "Void House":        { c1: "#ff4d6d", c2: "#a86bff" },
    "Group Therapy":     { c1: "#a86bff", c2: "#e0aa47" },
    "Groove Station":    { c1: "#e0aa47", c2: "#a86bff" },
    "Off Duty":          { c1: "#ff4d6d", c2: "#e0aa47" },
    "Healin' in Saturn": { c1: "#a86bff", c2: "#e0aa47" },
    "House Arrest":      { c1: "#e0aa47", c2: "#ff4d6d" },
    RestlessAffairs:     { c1: "#a86bff", c2: "#ff4d6d" },
  };
  return map[series] ?? { c1: "#a86bff", c2: "#e0aa47" };
}

export default function ArticlesPage() {
  const [featured, ...rest] = sortedEvents;

  return (
    <main className="page-outer">
      <div className="page-content">
        <TopBar active="articles" />

        {/* ── Page kicker ── */}
        <div style={{ padding: "20px 20px 0" }}>
          <span className="mono" style={{ fontSize: 10, letterSpacing: "0.22em", color: "var(--muted-2)" }}>
            THE FULL DOCKET
          </span>
        </div>

        {/* ══════════════════════════════════════════
            FEATURED — full-bleed split card
        ══════════════════════════════════════════ */}
        {featured && (() => {
          const blobs = seriesBlobs(featured.series);
          const tileColor = getTileColor(featured.series);
          return (
            <Link href={`/events/${featured.slug}`} className="arts-hero" aria-label={featured.title}>

              {/* Left: text */}
              <div className="arts-hero-body">
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                  <SeriesTag series={featured.series} />
                  {featured.guiltyPick && <VerdictStamp />}
                </div>

                <h1 className="disp arts-hero-title">
                  {featured.title}
                  <ScribbleUnderline width={120} />
                </h1>

                {featured.description && (
                  <p className="arts-hero-lede">{featured.description}</p>
                )}

                <div className="arts-hero-meta mono">
                  <time dateTime={featured.startsAt}>{formatEventDate(featured.startsAt)}</time>
                  {" · "}{getTimeLabel(featured)}
                  {" · "}{featured.venueName !== "[Venue TBA]" ? featured.venueName : featured.area ?? "Lagos"}
                </div>

                <span className="arts-hero-cta mono">
                  Read case file →
                </span>
              </div>

              {/* Right: visual */}
              <div className="arts-hero-visual" style={{ background: tileColor }}>
                <LiquidField
                  style={{ position: "absolute", top: -40, right: -40, width: 360, height: 360 }}
                  fill={blobs.c1}
                  opacity={0.7}
                  circles={[
                    { cx: 140, cy: 130, r: 66 },
                    { cx: 182, cy: 168, r: 44 },
                    { cx: 104, cy: 172, r: 36 },
                    { cx: 186, cy: 96, r: 30 },
                  ]}
                />
                <LiquidField
                  style={{ position: "absolute", bottom: -60, left: -40, width: 300, height: 300 }}
                  fill={blobs.c2}
                  opacity={0.5}
                  circles={[
                    { cx: 118, cy: 112, r: 54 },
                    { cx: 154, cy: 144, r: 36 },
                    { cx: 88, cy: 148, r: 28 },
                  ]}
                  delay="-7s"
                />
                <svg
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
                  viewBox="0 0 560 500"
                  fill="none"
                  preserveAspectRatio="xMidYMid slice"
                  aria-hidden="true"
                >
                  <path d="M-20 260 C 120 120, 260 380, 420 240 C 510 168, 570 300, 560 420"
                    stroke="var(--text)" strokeWidth="1.4" opacity="0.15" strokeLinecap="round" />
                  <path d="M60 -20 C 40 140, 220 280, 180 500"
                    stroke="var(--gold)" strokeWidth="1" opacity="0.18" strokeLinecap="round" />
                </svg>
                {featured.flyerUrl && (
                  <img src={featured.flyerUrl} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                )}
                {/* Case number watermark */}
                <span className="mono arts-hero-casenum">01</span>
              </div>
            </Link>
          );
        })()}

        {/* ══════════════════════════════════════════
            SECONDARY GRID
        ══════════════════════════════════════════ */}
        {rest.length > 0 && (
          <section style={{ padding: "10px 20px 60px" }} aria-label="More case files">
            <div className="arts-section-label">
              <span className="ev-section-rule" />
              <span className="mono ev-section-title">More on the docket</span>
            </div>

            <div className="arts-grid">
              {rest.map((event, i) => {
                const blobs = seriesBlobs(event.series);
                const tileColor = getTileColor(event.series);
                return (
                  <Link key={event.slug} href={`/events/${event.slug}`} className="arts-card" aria-label={event.title}>
                    {/* Visual */}
                    <div className="arts-card-visual" style={{ background: tileColor }}>
                      <LiquidField
                        style={{ position: "absolute", top: -20, right: -20, width: 220, height: 220 }}
                        fill={blobs.c1}
                        opacity={0.65}
                        circles={[
                          { cx: 96, cy: 90, r: 46 },
                          { cx: 126, cy: 118, r: 30 },
                          { cx: 72, cy: 120, r: 24 },
                        ]}
                        delay={`-${(i * 3) % 15}s`}
                      />
                      <LiquidField
                        style={{ position: "absolute", bottom: -20, left: -20, width: 180, height: 180 }}
                        fill={blobs.c2}
                        opacity={0.45}
                        circles={[
                          { cx: 82, cy: 78, r: 38 },
                          { cx: 108, cy: 102, r: 26 },
                        ]}
                        delay={`-${(i * 4 + 5) % 18}s`}
                      />
                      {event.flyerUrl && (
                        <img src={event.flyerUrl} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                      )}
                      <span className="mono arts-card-casenum">{String(i + 2).padStart(2, "0")}</span>
                      {event.guiltyPick && (
                        <div style={{ position: "absolute", top: 12, right: 12, transform: "scale(0.85)", transformOrigin: "top right" }}>
                          <VerdictStamp />
                        </div>
                      )}
                    </div>

                    {/* Body */}
                    <div className="arts-card-body">
                      <SeriesTag series={event.series} size="sm" />
                      <h2 className="disp arts-card-title">{event.title}</h2>
                      {event.description && (
                        <p className="arts-card-excerpt">{event.description}</p>
                      )}
                      <div className="arts-card-footer">
                        <span className="mono" style={{ fontSize: 10, letterSpacing: "0.1em", color: "var(--muted-2)" }}>
                          <time dateTime={event.startsAt}>{formatEventDate(event.startsAt)}</time>
                          {" · "}{getTimeLabel(event)}
                        </span>
                        <span className="mono" style={{ fontSize: 10, letterSpacing: "0.1em", color: "var(--violet)" }}>
                          Case file →
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
