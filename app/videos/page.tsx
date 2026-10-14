import type { Metadata } from "next";
import Link from "next/link";
import TopBar from "@/components/TopBar";
import ScribbleUnderline from "@/components/ScribbleUnderline";

export const metadata: Metadata = {
  title: "Watch",
  description: "All Raversguilt Shorts — Lagos rave culture on camera.",
};

const VIDEOS = [
  {
    id: "OKBJhoex7xY",
    title: "Dapping up 10s",
    views: "1.1K views",
    tag: "Culture",
  },
  {
    id: "vABz7oSuYPc",
    title: "Ravers share their craziest village people experience",
    views: "105 views",
    tag: "Community",
  },
  {
    id: "BZYDk1rSfSU",
    title: "Guilty or not game — DJ Edition",
    views: "37 views",
    tag: "The Jury",
  },
  {
    id: "UttK4A8GOl0",
    title: "Guilty or not — DJ Edition",
    views: "5 views",
    tag: "The Jury",
  },
  {
    id: "AByhzhRMNx4",
    title: "Raving in Lagos — Owanbe style",
    views: "11 views",
    tag: "Culture",
  },
  {
    id: "DGwAwS7Jjss",
    title: "Azzionthebeat Ogba — BTS scene",
    views: "3 views",
    tag: "Behind the Lens",
  },
];

const TAG_COLORS: Record<string, string> = {
  "Culture":        "var(--violet)",
  "Community":      "var(--gold)",
  "The Jury":       "var(--hot)",
  "Behind the Lens":"var(--muted)",
};

export default function VideosPage() {
  return (
    <main className="page-outer">
      <div className="page-content">
        <TopBar active="videos" />

        {/* Page header */}
        <div style={{ padding: "24px 20px 0" }}>
          <span className="mono" style={{ fontSize: 10, letterSpacing: "0.22em", color: "var(--muted-2)" }}>
            THE REEL
          </span>
          <h1 className="disp" style={{ margin: "10px 0 0", fontWeight: 800, fontSize: 40, lineHeight: 1 }}>
            Watch.
            <ScribbleUnderline width={80} />
          </h1>
          <p style={{ margin: "12px 0 0", fontSize: 14, color: "var(--muted)", lineHeight: 1.5 }}>
            Lagos underground rave culture — on camera. All {VIDEOS.length} shorts.
          </p>
        </div>

        {/* ═══════════════════════════════════════════
            FEATURED — first video gets a big card
        ═══════════════════════════════════════════ */}
        {(() => {
          const v = VIDEOS[0];
          return (
            <div style={{ padding: "20px 20px 0" }}>
              <a
                href={`https://youtube.com/shorts/${v.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="vid-featured"
                aria-label={v.title}
              >
                {/* Thumbnail */}
                <div className="vid-featured-thumb">
                  <img
                    src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`}
                    alt={v.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  {/* Play button overlay */}
                  <div className="vid-play-btn" aria-hidden="true">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <path d="M5 4l15 8-15 8V4z" fill="currentColor" />
                    </svg>
                  </div>
                  <span className="mono" style={{
                    position: "absolute", top: 12, left: 12,
                    fontSize: 9, letterSpacing: "0.16em",
                    background: "rgba(11,7,16,0.75)", padding: "4px 8px", borderRadius: 6,
                    color: "rgba(239,233,247,0.7)",
                  }}>SHORTS</span>
                </div>

                {/* Body */}
                <div className="vid-featured-body">
                  <span className="mono" style={{
                    fontSize: 9, letterSpacing: "0.14em",
                    color: TAG_COLORS[v.tag] ?? "var(--muted)",
                  }}>{v.tag}</span>
                  <h2 className="disp" style={{ margin: "8px 0 0", fontWeight: 800, fontSize: 22, lineHeight: 1.1 }}>
                    {v.title}
                  </h2>
                  <div className="mono" style={{ fontSize: 10, letterSpacing: "0.1em", color: "var(--muted-2)", marginTop: 8 }}>
                    {v.views}
                  </div>
                  <span className="mono" style={{
                    display: "inline-block", marginTop: 14,
                    fontSize: 11, letterSpacing: "0.14em", color: "var(--violet)",
                  }}>Watch on YouTube →</span>
                </div>
              </a>
            </div>
          );
        })()}

        {/* ═══════════════════════════════════════════
            GRID — remaining videos
        ═══════════════════════════════════════════ */}
        <section style={{ padding: "10px 20px 60px" }} aria-label="All shorts">
          <div className="vid-section-header">
            <span style={{ flex: 1, height: 1, background: "var(--line)" }} />
            <span className="mono" style={{ fontSize: 10, letterSpacing: "0.2em", color: "var(--gold)", textTransform: "uppercase" }}>
              All Shorts
            </span>
          </div>

          <div className="vid-grid">
            {VIDEOS.slice(1).map((v, i) => (
              <a
                key={v.id}
                href={`https://youtube.com/shorts/${v.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="vid-card"
                aria-label={v.title}
              >
                {/* Thumbnail */}
                <div className="vid-thumb">
                  <img
                    src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`}
                    alt={v.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <div className="vid-play-btn" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M5 4l15 8-15 8V4z" fill="currentColor" />
                    </svg>
                  </div>
                  <span className="mono" style={{
                    position: "absolute", bottom: 8, right: 8,
                    fontSize: 8, letterSpacing: "0.14em",
                    color: "rgba(239,233,247,0.45)",
                  }}>{String(i + 2).padStart(2, "0")}</span>
                </div>

                {/* Body */}
                <div className="vid-body">
                  <span className="mono" style={{
                    fontSize: 8, letterSpacing: "0.14em",
                    color: TAG_COLORS[v.tag] ?? "var(--muted)",
                  }}>{v.tag}</span>
                  <h3 className="disp vid-card-title">{v.title}</h3>
                  <span className="mono" style={{ fontSize: 9, letterSpacing: "0.08em", color: "var(--muted-2)" }}>
                    {v.views}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* YouTube channel CTA */}
        <div style={{ padding: "0 20px 60px" }}>
          <a
            href="https://www.youtube.com/@RaversGuilt"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              background: "var(--surface)",
              border: "1px solid var(--line)",
              borderRadius: "var(--r-xl)",
              padding: "16px 20px",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            {/* YouTube logo */}
            <svg width="32" height="22" viewBox="0 0 32 22" fill="none" style={{ flexShrink: 0 }}>
              <rect width="32" height="22" rx="5" fill="#FF0000" />
              <path d="M13 7l9 4.5L13 16V7z" fill="white" />
            </svg>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: 13 }}>Ravers Guilt on YouTube</div>
              <div className="mono" style={{ fontSize: 10, color: "var(--muted)", marginTop: 2, letterSpacing: "0.06em" }}>
                @RaversGuilt · Subscribe for new shorts
              </div>
            </div>
            <span className="mono" style={{ fontSize: 10, letterSpacing: "0.12em", color: "var(--muted-2)", flexShrink: 0 }}>↗</span>
          </a>
        </div>
      </div>
    </main>
  );
}
