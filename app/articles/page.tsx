import type { Metadata } from "next";
import Link from "next/link";
import TopBar from "@/components/TopBar";
import SeriesTag from "@/components/SeriesTag";
import VerdictStamp from "@/components/VerdictStamp";
import ScribbleUnderline from "@/components/ScribbleUnderline";
import { sortedEvents, formatEventDate, getTimeLabel } from "@/lib/events";

export const metadata: Metadata = {
  title: "Articles",
  description: "Every case filed — the full editorial index of nights we've tracked, judged, and archived.",
};

export default function ArticlesPage() {
  return (
    <main className="page-outer">
      <div className="page-content">
        <TopBar active="articles" />

        {/* Page header */}
        <div style={{ padding: "28px 20px 32px" }}>
          <span className="mono" style={{ fontSize: 10, letterSpacing: "0.22em", color: "var(--violet)" }}>
            THE FULL DOCKET
          </span>
          <h1 className="disp" style={{ margin: "12px 0 0", fontWeight: 800, fontSize: 44, lineHeight: 0.96 }}>
            Case{" "}
            <span style={{ position: "relative", color: "var(--gold)" }}>
              Files
              <ScribbleUnderline width={100} color="var(--gold)" />
            </span>
          </h1>
          <p style={{ margin: "14px 0 0", fontSize: 14, color: "var(--muted)", lineHeight: 1.6, maxWidth: 380 }}>
            Every night we've tracked, judged, and filed. Guilty or not, it's all in the record.
          </p>
        </div>

        {/* Article list */}
        <div style={{ padding: "0 0 60px" }}>
          {sortedEvents.map((event, i) => (
            <Link
              key={event.slug}
              href={`/events/${event.slug}`}
              style={{ textDecoration: "none", color: "inherit", display: "block" }}
            >
              <article className="articles-row">
                {/* Case number */}
                <div className="articles-row-num mono">
                  {String(i + 1).padStart(2, "0")}
                </div>

                {/* Main content */}
                <div className="articles-row-body">
                  <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                    <SeriesTag series={event.series} size="sm" />
                    {event.guiltyPick && (
                      <span style={{ transform: "scale(0.75)", transformOrigin: "left center", display: "inline-flex" }}>
                        <VerdictStamp />
                      </span>
                    )}
                  </div>
                  <h2 className="disp articles-row-title">
                    {event.title}
                  </h2>
                  {event.description && (
                    <p className="articles-row-excerpt">
                      {event.description}
                    </p>
                  )}
                  <div style={{ display: "flex", gap: 14, marginTop: 10, flexWrap: "wrap" }}>
                    <span className="mono" style={{ fontSize: 10, letterSpacing: "0.1em", color: "var(--muted-2)" }}>
                      <time dateTime={event.startsAt}>{formatEventDate(event.startsAt)}</time>
                      {" · "}{getTimeLabel(event)}
                    </span>
                    <span className="mono" style={{ fontSize: 10, letterSpacing: "0.1em", color: "var(--muted-2)" }}>
                      {event.venueName !== "[Venue TBA]" ? event.venueName : event.area ?? "Lagos"}
                    </span>
                  </div>
                </div>

                {/* Arrow */}
                <div className="articles-row-arrow mono">→</div>
              </article>
            </Link>
          ))}
        </div>

      </div>
    </main>
  );
}
