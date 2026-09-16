import type { Metadata } from "next";
import Link from "next/link";
import { getUpcomingEvents, ALL_SERIES } from "@/lib/events";
import TopBar from "@/components/TopBar";
import LiquidField from "@/components/LiquidField";
import WavyDivider from "@/components/WavyDivider";
import ScribbleUnderline from "@/components/ScribbleUnderline";
import EventCard from "@/components/EventCard";
import EventRow from "@/components/EventRow";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Raversguilt",
  description:
    "The underground dance docket. We track every rave worth showing up to, hand down the verdict, and file it here — case by case, night by night.",
};

export default function HomePage() {
  const upcoming = getUpcomingEvents();
  const nextEvent = upcoming[0] ?? null;
  const thisWeekEvents = upcoming.slice(0, 3);

  return (
    <main className="page-outer">
      {/* Liquid blob decorations */}
      <LiquidField
        style={{ position: "absolute", top: -80, right: -70, width: 330, height: 330 }}
        fill="#a86bff"
        opacity={0.5}
        circles={[
          { cx: 112, cy: 84, r: 46 },
          { cx: 148, cy: 112, r: 34 },
          { cx: 84, cy: 120, r: 30 },
          { cx: 150, cy: 64, r: 22 },
          { cx: 98, cy: 58, r: 20 },
        ]}
      />
      <LiquidField
        style={{ position: "absolute", top: 150, left: -90, width: 300, height: 300 }}
        fill="#e0aa47"
        opacity={0.26}
        circles={[
          { cx: 90, cy: 96, r: 44 },
          { cx: 124, cy: 122, r: 32 },
          { cx: 70, cy: 130, r: 26 },
          { cx: 120, cy: 74, r: 24 },
        ]}
        delay="-7s"
      />

      <div className="page-content">
        <TopBar variant="home" active="home" />

        {/* Hero + featured card (2-col on desktop) */}
        <div className="home-top">
          <section className="home-hero" style={{ padding: "22px 20px 8px" }} aria-label="Hero">
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <svg width="26" height="12" viewBox="0 0 26 12" fill="none" aria-hidden="true">
                <path d="M1 7 C 4 2, 7 2, 10 6 C 13 10, 16 10, 19 6 C 22 2, 24 4, 25 6" stroke="#e0aa47" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              <span className="mono" style={{ fontSize: 11, letterSpacing: "0.22em", color: "var(--gold)", textTransform: "uppercase" }}>
                The Rave Jury · Est. Lagos
              </span>
            </div>

            <h1 className="disp home-h1" style={{ margin: "14px 0 0", fontWeight: 800, fontSize: 44, lineHeight: 1.02 }}>
              GUILTY
              <br />
              OF LOVING
              <br />
              THE{" "}
              <span style={{ position: "relative", color: "var(--violet)" }}>
                RAVE
                <ScribbleUnderline width={130} />
              </span>
              .
            </h1>

            <p className="home-lede" style={{ margin: "22px 0 0", fontSize: 15, lineHeight: 1.5, color: "var(--muted)", maxWidth: 300 }}>
              The underground dance docket. We track every rave worth showing up to,
              hand down the verdict, and file it here — case by case, night by night.
            </p>

            <div className="home-cta-row" style={{ display: "flex", gap: 10, marginTop: 22 }}>
              <Link href="/calendar" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "var(--violet)", color: "#0b0710", fontWeight: 700, fontSize: 14, padding: "14px 22px", borderRadius: "var(--r-md)" }}>
                See the calendar
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="#0b0710" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <a href="https://instagram.com/raversguilt" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "14px 22px", borderRadius: "var(--r-md)", border: "1px solid var(--line)", color: "var(--text)", fontWeight: 600, fontSize: 14 }}>
                Follow
              </a>
            </div>
          </section>

          <WavyDivider padding="22px 20px 4px" className="home-top-divider" />

          {nextEvent ? (
            <EventCard event={nextEvent} caseNumber={`CASE #${new Date(nextEvent.startsAt).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit" }).replace("/", "")}`} />
          ) : (
            <div style={{ padding: "16px 20px", color: "var(--muted)", fontSize: 14 }}>
              Nothing on the docket yet — check back soon.
            </div>
          )}
        </div>

        <WavyDivider padding="24px 20px 4px" />

        {/* This week */}
        <section style={{ padding: "6px 20px 8px" }} aria-label="This week">
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 14 }}>
            <h2 className="disp" style={{ margin: 0, fontWeight: 700, fontSize: 20 }}>This week</h2>
            <Link href="/calendar" className="mono" style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--muted)" }}>
              FULL CALENDAR →
            </Link>
          </div>

          {thisWeekEvents.length === 0 ? (
            <p style={{ color: "var(--muted)", fontSize: 14 }}>Nothing on the docket yet.</p>
          ) : (
            <div className="this-week-grid" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {thisWeekEvents.map((e) => (
                <EventRow key={e.slug} event={e} variant="home" />
              ))}
            </div>
          )}
        </section>

        <WavyDivider padding="24px 20px 4px" />

        {/* The residencies */}
        <section className="residencies-section" style={{ padding: "6px 20px 8px" }} aria-label="Residencies">
          <h2 className="disp" style={{ margin: "0 0 14px", fontWeight: 700, fontSize: 20 }}>The residencies</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {ALL_SERIES.map((s) => (
              <Link key={s} href={`/calendar`} style={{ fontSize: 12, color: "var(--text)", background: "var(--surface-2)", border: "1px solid var(--line)", padding: "9px 13px", borderRadius: "var(--r-pill)" }}>
                {s}
              </Link>
            ))}
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
