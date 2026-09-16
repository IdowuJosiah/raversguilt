import type { Metadata } from "next";
import Link from "next/link";
import {
  getUpcomingEvents,
  allGalleryNights,
  ALL_SERIES,
  getTileColor,
  formatEventDate,
  getTimeLabel,
} from "@/lib/events";
import type { Series } from "@/types/content";
import TopBar from "@/components/TopBar";
import LiquidField from "@/components/LiquidField";
import WavyDivider from "@/components/WavyDivider";
import ScribbleUnderline from "@/components/ScribbleUnderline";
import SeriesTag from "@/components/SeriesTag";
import VerdictStamp from "@/components/VerdictStamp";
import MailingSignup from "@/components/MailingSignup";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Raversguilt",
  description:
    "The underground dance docket. We track every rave worth showing up to, hand down the verdict, and file it here — case by case, night by night.",
};

/** Distinct blob palette per series */
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

export default function HomePage() {
  const upcoming = getUpcomingEvents();
  const featured = upcoming[0] ?? null;
  const articles = upcoming.slice(0, 6);             // article grid
  const galleryPreview = allGalleryNights.slice(0, 8); // gallery strip

  return (
    <main className="page-outer" style={{ position: "relative", overflow: "hidden" }}>

      {/* ================================================================
          HERO — full-bleed cinematic opener
      ================================================================ */}
      <section className="home-hero-section" aria-label="Hero">
        {/* Background blobs */}
        <LiquidField
          style={{ position: "absolute", top: -60, right: -80, width: 420, height: 420, zIndex: 0 }}
          fill="#a86bff"
          opacity={0.55}
          circles={[
            { cx: 140, cy: 110, r: 68 },
            { cx: 184, cy: 148, r: 46 },
            { cx: 104, cy: 160, r: 38 },
            { cx: 188, cy: 78, r: 30 },
          ]}
        />
        <LiquidField
          style={{ position: "absolute", bottom: -40, left: -60, width: 360, height: 360, zIndex: 0 }}
          fill="#e0aa47"
          opacity={0.3}
          circles={[
            { cx: 120, cy: 124, r: 60 },
            { cx: 160, cy: 158, r: 42 },
            { cx: 88, cy: 166, r: 32 },
            { cx: 158, cy: 96, r: 28 },
          ]}
          delay="-9s"
        />
        <LiquidField
          style={{ position: "absolute", bottom: 60, right: "18%", width: 200, height: 200, zIndex: 0 }}
          fill="#ff4d6d"
          opacity={0.22}
          circles={[
            { cx: 80, cy: 80, r: 42 },
            { cx: 108, cy: 106, r: 28 },
          ]}
          delay="-14s"
        />

        {/* Flowing curve overlay */}
        <svg
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 1, pointerEvents: "none" }}
          viewBox="0 0 1440 600"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          aria-hidden="true"
        >
          <path d="M-40 320 C 200 140, 420 480, 700 300 C 920 160, 1100 420, 1480 260"
            stroke="#a86bff" strokeWidth="2" opacity="0.25" strokeLinecap="round" />
          <path d="M-40 380 C 220 200, 440 540, 720 360 C 940 220, 1140 480, 1480 320"
            stroke="#e0aa47" strokeWidth="1.4" opacity="0.18" strokeLinecap="round" />
          <path d="M300 -40 C 260 180, 560 320, 480 560"
            stroke="#a86bff" strokeWidth="1.2" opacity="0.15" strokeLinecap="round" />
        </svg>

        {/* TopBar */}
        <div style={{ position: "relative", zIndex: 10 }}>
          <TopBar variant="home" active="home" />
        </div>

        {/* Headline content */}
        <div className="home-hero-inner" style={{ position: "relative", zIndex: 5 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <svg width="26" height="12" viewBox="0 0 26 12" fill="none" aria-hidden="true">
              <path d="M1 7 C 4 2, 7 2, 10 6 C 13 10, 16 10, 19 6 C 22 2, 24 4, 25 6"
                stroke="#e0aa47" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <span className="mono" style={{ fontSize: 11, letterSpacing: "0.22em", color: "var(--gold)", textTransform: "uppercase" }}>
              The Rave Jury · Est. Lagos
            </span>
          </div>

          <h1 className="disp home-h1" style={{ margin: "16px 0 0", fontWeight: 800, fontSize: 52, lineHeight: 0.96, letterSpacing: "-0.02em" }}>
            GUILTY
            <br />OF LOVING
            <br />THE{" "}
            <span style={{ position: "relative", color: "var(--violet)" }}>
              RAVE
              <ScribbleUnderline width={140} />
            </span>.
          </h1>

          <p className="home-lede" style={{ margin: "24px 0 0", fontSize: 16, lineHeight: 1.55, color: "var(--muted)", maxWidth: 420 }}>
            The underground dance docket. We track every rave worth showing
            up to, hand down the verdict, and file it — case by case, night by night.
          </p>

          <div className="home-cta-row" style={{ display: "flex", gap: 10, marginTop: 28 }}>
            <Link
              href="/calendar"
              style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--violet)", color: "#0b0710", fontWeight: 700, fontSize: 14, padding: "15px 24px", borderRadius: "var(--r-md)", textDecoration: "none" }}
            >
              See the calendar
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="#0b0710" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <a
              href="https://instagram.com/raversguilt"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", padding: "15px 24px", borderRadius: "var(--r-md)", border: "1px solid var(--line)", color: "var(--text)", fontWeight: 600, fontSize: 14, textDecoration: "none" }}
            >
              Follow us
            </a>
          </div>

          {/* Live stats strip */}
          <div className="home-stats-row" style={{ display: "flex", gap: 32, marginTop: 36, paddingTop: 20, borderTop: "1px solid var(--line)" }}>
            {[
              { val: `${upcoming.length}`, label: "On the docket" },
              { val: `${upcoming.filter((e) => e.guiltyPick).length}`, label: "Guilty Picks" },
              { val: `${allGalleryNights.length}`, label: "Nights filed" },
              { val: ALL_SERIES.length.toString(), label: "Residencies" },
            ].map(({ val, label }) => (
              <div key={label}>
                <div className="disp" style={{ fontWeight: 800, fontSize: 28, lineHeight: 1 }}>{val}</div>
                <div className="mono" style={{ fontSize: 10, letterSpacing: "0.12em", color: "var(--muted-2)", textTransform: "uppercase", marginTop: 4 }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="page-content">

        {/* ================================================================
            FEATURED ARTICLE — next event, editorial wide card
        ================================================================ */}
        {featured && (
          <section style={{ padding: "48px 20px 8px" }} aria-label="Next on the docket">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <svg width="26" height="12" viewBox="0 0 26 12" fill="none" aria-hidden="true">
                  <path d="M1 7 C 4 2, 7 2, 10 6 C 13 10, 16 10, 19 6 C 22 2, 24 4, 25 6"
                    stroke="#e0aa47" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
                <span className="mono" style={{ fontSize: 11, letterSpacing: "0.2em", color: "var(--gold)", textTransform: "uppercase" }}>
                  Next on the docket
                </span>
              </div>
              <Link href="/calendar" className="mono" style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--muted)" }}>
                FULL CALENDAR →
              </Link>
            </div>

            {/* Wide editorial card */}
            <Link href={`/events/${featured.slug}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
              <div className="featured-article-card">
                {/* Visual side */}
                <div className="featured-article-visual">
                  {featured.flyerUrl ? (
                    <img src={featured.flyerUrl} alt={`${featured.title} flyer`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <>
                      <LiquidField
                        style={{ position: "absolute", top: -30, left: -30, width: 280, height: 280 }}
                        fill={seriesBlobs(featured.series).c1}
                        opacity={0.72}
                        circles={[
                          { cx: 110, cy: 104, r: 54 },
                          { cx: 148, cy: 138, r: 36 },
                          { cx: 84, cy: 144, r: 28 },
                          { cx: 152, cy: 80, r: 24 },
                        ]}
                      />
                      <LiquidField
                        style={{ position: "absolute", bottom: -40, right: -20, width: 260, height: 260 }}
                        fill={seriesBlobs(featured.series).c2}
                        opacity={0.5}
                        circles={[
                          { cx: 106, cy: 100, r: 48 },
                          { cx: 140, cy: 128, r: 32 },
                          { cx: 80, cy: 130, r: 24 },
                        ]}
                        delay="-7s"
                      />
                      <svg
                        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
                        viewBox="0 0 400 340"
                        fill="none"
                        preserveAspectRatio="xMidYMid slice"
                        aria-hidden="true"
                      >
                        <path d="M-10 180 C 100 90, 180 270, 300 180 C 370 130, 420 200, 405 300"
                          stroke="var(--text)" strokeWidth="1.2" opacity="0.18" strokeLinecap="round" />
                      </svg>
                    </>
                  )}
                  {/* Overlays */}
                  <div style={{ position: "absolute", top: 16, left: 16 }}>
                    <SeriesTag series={featured.series} />
                  </div>
                  {featured.guiltyPick && (
                    <div style={{ position: "absolute", top: 14, right: 16 }}>
                      <VerdictStamp />
                    </div>
                  )}
                  <div className="mono" style={{ position: "absolute", bottom: 16, left: 16, fontSize: 9, letterSpacing: "0.14em", color: "rgba(239,233,247,0.45)" }}>
                    [ EVENT VISUAL — UPCOMING ]
                  </div>
                </div>

                {/* Details side */}
                <div className="featured-article-body">
                  <div className="mono" style={{ fontSize: 9, letterSpacing: "0.18em", color: "var(--muted-2)", textTransform: "uppercase", marginBottom: 14 }}>
                    Case #{new Date(featured.startsAt).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit" }).replace("/", "")} · {featured.series}
                  </div>

                  <h2 className="disp featured-article-h2" style={{ margin: 0, fontWeight: 800, fontSize: 32, lineHeight: 1.05, position: "relative" }}>
                    {featured.title}
                    <ScribbleUnderline width={100} />
                  </h2>

                  <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 20 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <rect x="3.5" y="5" width="17" height="15" rx="2.5" stroke="var(--violet)" strokeWidth="1.7" />
                        <path d="M3.5 9.5h17M8 3v3M16 3v3" stroke="var(--violet)" strokeWidth="1.7" strokeLinecap="round" />
                      </svg>
                      <span style={{ fontSize: 14, fontWeight: 600 }}>
                        <time dateTime={featured.startsAt}>{formatEventDate(featured.startsAt)}</time>
                      </span>
                      <span style={{ color: "var(--muted)", fontSize: 13 }}>· {getTimeLabel(featured)}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M12 21s7-5.5 7-11a7 7 0 10-14 0c0 5.5 7 11 7 11z" stroke="var(--violet)" strokeWidth="1.7" />
                        <circle cx="12" cy="10" r="2.4" stroke="var(--violet)" strokeWidth="1.7" />
                      </svg>
                      <span style={{ fontSize: 14, fontWeight: 600 }}>{featured.venueName}</span>
                      {featured.area && <span style={{ color: "var(--muted)", fontSize: 13 }}>· {featured.area}</span>}
                    </div>
                  </div>

                  {featured.description && (
                    <p style={{ margin: "18px 0 0", fontSize: 14, lineHeight: 1.65, color: "var(--muted)" }}>
                      {featured.description}
                    </p>
                  )}

                  <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
                    {featured.ticketUrl ? (
                      <a
                        href={featured.ticketUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--gold)", color: "#0b0710", fontWeight: 700, fontSize: 13, padding: "13px 20px", borderRadius: "var(--r-md)", textDecoration: "none" }}
                      >
                        RSVP / Tickets
                      </a>
                    ) : (
                      <span style={{ display: "flex", alignItems: "center", background: "var(--surface-2)", color: "var(--muted)", fontWeight: 600, fontSize: 13, padding: "13px 20px", borderRadius: "var(--r-md)", border: "1px solid var(--line)" }}>
                        Tickets TBA
                      </span>
                    )}
                    <span style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--violet)", fontWeight: 600, fontSize: 13 }}>
                      Full case file →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </section>
        )}

        <WavyDivider padding="36px 20px 8px" />

        {/* ================================================================
            ARTICLE GRID — upcoming events as editorial cards
        ================================================================ */}
        <section style={{ padding: "8px 20px 8px" }} aria-label="Upcoming events">
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 24 }}>
            <div>
              <h2 className="disp" style={{ margin: 0, fontWeight: 800, fontSize: 26 }}>
                On the{" "}
                <span style={{ position: "relative", color: "var(--violet)" }}>
                  docket
                  <ScribbleUnderline width={90} />
                </span>
              </h2>
              <p style={{ margin: "6px 0 0", fontSize: 13, color: "var(--muted)" }}>Every upcoming night we're watching</p>
            </div>
            <Link href="/calendar" className="mono" style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--muted)", flexShrink: 0 }}>
              ALL →
            </Link>
          </div>

          {articles.length === 0 ? (
            <p style={{ color: "var(--muted)", fontSize: 14 }}>Nothing on the docket yet — check back soon.</p>
          ) : (
            <div className="home-articles-grid">
              {articles.map((event) => {
                const blobs = seriesBlobs(event.series);
                const tileColor = getTileColor(event.series);
                return (
                  <article key={event.slug}>
                    <Link href={`/events/${event.slug}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
                      <div className="article-card">
                        {/* Visual header */}
                        <div
                          className="article-card-visual"
                          style={{ background: tileColor }}
                        >
                          <LiquidField
                            style={{ position: "absolute", top: -20, right: -20, width: 200, height: 200 }}
                            fill={blobs.c1}
                            opacity={0.65}
                            circles={[
                              { cx: 90, cy: 86, r: 44 },
                              { cx: 118, cy: 112, r: 28 },
                              { cx: 68, cy: 116, r: 22 },
                              { cx: 120, cy: 66, r: 18 },
                            ]}
                          />
                          <LiquidField
                            style={{ position: "absolute", bottom: -20, left: -20, width: 180, height: 180 }}
                            fill={blobs.c2}
                            opacity={0.45}
                            circles={[
                              { cx: 84, cy: 80, r: 38 },
                              { cx: 110, cy: 104, r: 26 },
                              { cx: 62, cy: 108, r: 20 },
                            ]}
                            delay="-6s"
                          />
                          <svg
                            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
                            viewBox="0 0 280 200"
                            fill="none"
                            preserveAspectRatio="xMidYMid slice"
                            aria-hidden="true"
                          >
                            <path
                              d={`M-10 ${80 + (event.slug.length % 40)} C 60 ${30 + (event.slug.length % 20)}, 130 ${160 - (event.slug.length % 40)}, 200 ${90 + (event.slug.length % 30)} C 250 ${60 + (event.slug.length % 20)}, 290 ${100 + (event.slug.length % 30)}, 285 160`}
                              stroke="var(--text)"
                              strokeWidth="1.1"
                              opacity="0.2"
                              strokeLinecap="round"
                            />
                          </svg>

                          {/* Overlays */}
                          <div style={{ position: "absolute", top: 12, left: 12 }}>
                            <SeriesTag series={event.series} size="sm" />
                          </div>
                          {event.guiltyPick && (
                            <div style={{ position: "absolute", top: 10, right: 12, transform: "scale(0.8)", transformOrigin: "top right" }}>
                              <VerdictStamp />
                            </div>
                          )}

                          {/* Date badge */}
                          <div style={{
                            position: "absolute",
                            bottom: 12,
                            right: 12,
                            background: "rgba(11,7,16,0.7)",
                            backdropFilter: "blur(4px)",
                            borderRadius: 8,
                            padding: "6px 10px",
                            textAlign: "center",
                          }}>
                            <div className="disp" style={{ fontWeight: 800, fontSize: 20, lineHeight: 1, color: "var(--text)" }}>
                              {new Date(event.startsAt).getDate()}
                            </div>
                            <div className="mono" style={{ fontSize: 9, letterSpacing: "0.1em", color: "var(--gold)", textTransform: "uppercase" }}>
                              {["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"][new Date(event.startsAt).getMonth()]}
                            </div>
                          </div>
                        </div>

                        {/* Card body */}
                        <div className="article-card-body">
                          <h3 className="disp" style={{ margin: 0, fontWeight: 700, fontSize: 18, lineHeight: 1.15 }}>
                            {event.title}
                          </h3>
                          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
                            <span style={{ fontSize: 12, color: "var(--muted)", fontWeight: 500 }}>
                              {getTimeLabel(event)}
                            </span>
                            <span style={{ color: "var(--line)", fontSize: 10 }}>·</span>
                            <span style={{ fontSize: 12, color: "var(--muted)" }}>
                              {event.venueName !== "[Venue TBA]" ? event.venueName : event.area ?? "Lagos"}
                            </span>
                          </div>
                          {event.description && (
                            <p style={{ margin: "10px 0 0", fontSize: 12, lineHeight: 1.55, color: "var(--muted-2)", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const, overflow: "hidden" }}>
                              {event.description}
                            </p>
                          )}
                          <div style={{ marginTop: 14, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <span className="mono" style={{ fontSize: 10, letterSpacing: "0.12em", color: "var(--violet)" }}>
                              CASE FILE →
                            </span>
                            {event.priceLabel && (
                              <span className="mono" style={{ fontSize: 10, letterSpacing: "0.06em", color: "var(--muted-2)" }}>
                                {event.priceLabel}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        <WavyDivider padding="40px 20px 8px" />

        {/* ================================================================
            GALLERY SECTION — past nights archive
        ================================================================ */}
        <section style={{ padding: "8px 20px 8px" }} aria-label="Gallery archive">
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 20 }}>
            <div>
              <h2 className="disp" style={{ margin: 0, fontWeight: 800, fontSize: 26 }}>
                The{" "}
                <span style={{ position: "relative", color: "var(--gold)" }}>
                  archive
                  <ScribbleUnderline width={82} color="var(--gold)" />
                </span>
              </h2>
              <p style={{ margin: "6px 0 0", fontSize: 13, color: "var(--muted)" }}>
                Evidence filed from past nights
              </p>
            </div>
            <Link href="/gallery" className="mono" style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--muted)", flexShrink: 0 }}>
              ALL EXHIBITS →
            </Link>
          </div>

          {/* Gallery grid */}
          <div className="home-gallery-grid">
            {galleryPreview.map((night, i) => {
              const blobs = seriesBlobs(night.series);
              const tileColor = getTileColor(night.series);
              const isFeatured = !!night.featured;
              return (
                <Link
                  key={night.slug}
                  href="/gallery"
                  className={`home-gallery-tile${isFeatured ? " home-gallery-tile--featured" : ""}`}
                  style={{ background: tileColor, textDecoration: "none" }}
                  aria-label={`${night.title} — ${night.series}`}
                >
                  {/* Blob art */}
                  <LiquidField
                    style={{ position: "absolute", top: -20, right: -20, width: 180, height: 180 }}
                    fill={blobs.c1}
                    opacity={0.55}
                    circles={[
                      { cx: 80, cy: 76, r: i % 2 === 0 ? 40 : 36 },
                      { cx: 106, cy: 100, r: 24 },
                      { cx: 60, cy: 104, r: 18 },
                    ]}
                    delay={`-${(i * 3) % 17}s`}
                  />
                  <LiquidField
                    style={{ position: "absolute", bottom: -20, left: -10, width: 140, height: 140 }}
                    fill={blobs.c2}
                    opacity={0.4}
                    circles={[
                      { cx: 64, cy: 62, r: 30 },
                      { cx: 86, cy: 84, r: 20 },
                    ]}
                    delay={`-${(i * 4 + 5) % 19}s`}
                  />

                  {/* Wave overlay */}
                  <svg
                    style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "40%", pointerEvents: "none" }}
                    viewBox="0 0 280 80"
                    preserveAspectRatio="none"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M0 40 C 50 20, 100 60, 160 38 C 210 20, 250 44, 280 36 L 280 80 L 0 80 Z"
                      fill="rgba(11,7,16,0.35)"
                    />
                  </svg>

                  {/* Recap badge */}
                  {night.recapLength && (
                    <div style={{
                      position: "absolute",
                      top: 10,
                      left: 10,
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      background: "rgba(11,7,16,0.6)",
                      padding: "4px 8px",
                      borderRadius: "var(--r-pill)",
                      zIndex: 2,
                    }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M8 5v14l11-7z" fill="var(--hot)" />
                      </svg>
                      <span className="mono" style={{ fontSize: 8, letterSpacing: "0.1em", color: "var(--text)", textTransform: "uppercase" }}>
                        {night.recapLength}
                      </span>
                    </div>
                  )}

                  {/* Labels */}
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "10px 12px", zIndex: 2 }}>
                    <div className="mono" style={{ fontSize: 9, letterSpacing: "0.12em", color: "var(--gold)", textTransform: "uppercase", marginBottom: 3 }}>
                      {night.series}
                    </div>
                    <div className="disp" style={{ fontWeight: 700, fontSize: 14, lineHeight: 1.2 }}>
                      {night.title}
                    </div>
                    <div className="mono" style={{ fontSize: 8, letterSpacing: "0.08em", color: "var(--muted-2)", marginTop: 3 }}>
                      {new Date(night.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "2-digit" }).toUpperCase()}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <WavyDivider padding="40px 20px 8px" />

        {/* ================================================================
            RESIDENCIES — series chips
        ================================================================ */}
        <section className="residencies-section" style={{ padding: "8px 20px 8px" }} aria-label="Residencies">
          <div style={{ marginBottom: 20 }}>
            <h2 className="disp" style={{ margin: 0, fontWeight: 800, fontSize: 26 }}>The residencies</h2>
            <p style={{ margin: "6px 0 0", fontSize: 13, color: "var(--muted)" }}>
              Recurring nights we run and curate
            </p>
          </div>
          <div className="residencies-grid">
            {ALL_SERIES.map((s) => {
              const blobs = seriesBlobs(s);
              return (
                <Link key={s} href="/calendar" style={{ textDecoration: "none" }}>
                  <div
                    className="residency-chip"
                    style={{ background: getTileColor(s), position: "relative", overflow: "hidden" }}
                  >
                    <LiquidField
                      style={{ position: "absolute", top: -10, right: -10, width: 80, height: 80 }}
                      fill={blobs.c1}
                      opacity={0.4}
                      circles={[{ cx: 36, cy: 34, r: 20 }, { cx: 50, cy: 48, r: 14 }]}
                    />
                    <span style={{ position: "relative", zIndex: 1, fontWeight: 600, fontSize: 13 }}>{s}</span>
                    <span className="mono" style={{ position: "relative", zIndex: 1, fontSize: 9, letterSpacing: "0.1em", color: "var(--muted-2)", marginLeft: "auto" }}>
                      →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <WavyDivider padding="40px 20px 8px" />

        {/* ================================================================
            MAILING SIGNUP
        ================================================================ */}
        <div style={{ padding: "8px 20px 8px" }}>
          <MailingSignup />
        </div>

        <Footer />
      </div>
    </main>
  );
}
