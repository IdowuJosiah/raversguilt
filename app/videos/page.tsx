import type { Metadata } from "next";
import TopBar from "@/components/TopBar";
import ScribbleUnderline from "@/components/ScribbleUnderline";

export const metadata: Metadata = {
  title: "Watch",
  description: "All Raversguilt Shorts and Reels — Lagos rave culture on camera.",
};

const YOUTUBE_VIDEOS = [
  { id: "OKBJhoex7xY", title: "Dapping up 10s",                                       views: "1.1K", tag: "Culture" },
  { id: "vABz7oSuYPc", title: "Ravers share their craziest village people experience", views: "105",  tag: "Community" },
  { id: "BZYDk1rSfSU", title: "Guilty or not game — DJ Edition",                       views: "37",   tag: "The Jury" },
  { id: "UttK4A8GOl0", title: "Guilty or not — DJ Edition",                            views: "5",    tag: "The Jury" },
  { id: "AByhzhRMNx4", title: "Raving in Lagos — Owanbe style",                        views: "11",   tag: "Culture" },
  { id: "DGwAwS7Jjss", title: "Azzionthebeat Ogba — BTS scene",                        views: "3",    tag: "Behind the Lens" },
];

const INSTAGRAM_REELS = [
  "De2KKjwI9kq",
  "DesAksnoiW4",
  "DeodfZeoGqZ",
  "Degb14HoPK6",
  "DefLtPbI-rT",
  "DeclH3zI0La",
  "DecIJp9Iq23",
  "DeaA1yvIfvf",
  "DeZaJEmobhL",
  "DeXhe9eoMq8",
  "DePeuKooVC9",
  "DeNPDeRIOIF",
];

const TAG_COLORS: Record<string, string> = {
  "Culture":         "var(--violet)",
  "Community":       "var(--gold)",
  "The Jury":        "var(--hot)",
  "Behind the Lens": "var(--muted)",
};

export default function VideosPage() {
  const [featuredYt, ...restYt] = YOUTUBE_VIDEOS;

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
            Lagos underground rave culture — on camera.
          </p>
        </div>

        {/* ═══════════════════════════════════════════
            YOUTUBE SHORTS
        ═══════════════════════════════════════════ */}
        <div style={{ padding: "20px 20px 0" }}>
          <div className="vid-platform-label">
            <svg width="22" height="16" viewBox="0 0 22 16" fill="none" aria-hidden="true">
              <rect width="22" height="16" rx="4" fill="#FF0000" />
              <path d="M9 5l7 3-7 3V5z" fill="white" />
            </svg>
            <span className="mono" style={{ fontSize: 10, letterSpacing: "0.2em", color: "var(--muted)" }}>
              YOUTUBE SHORTS
            </span>
          </div>
        </div>

        {/* Featured Short */}
        <div style={{ padding: "12px 20px 0" }}>
          <div className="vid-featured">
            <div className="vid-featured-thumb">
              <iframe
                src={`https://www.youtube.com/embed/${featuredYt.id}?rel=0&modestbranding=1`}
                title={featuredYt.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                style={{ width: "100%", height: "100%", border: 0 }}
              />
            </div>
            <div className="vid-featured-body">
              <span className="mono" style={{ fontSize: 9, letterSpacing: "0.14em", color: TAG_COLORS[featuredYt.tag] ?? "var(--muted)" }}>
                {featuredYt.tag}
              </span>
              <h2 className="disp" style={{ margin: "8px 0 0", fontWeight: 800, fontSize: 22, lineHeight: 1.1 }}>
                {featuredYt.title}
              </h2>
              <div className="mono" style={{ fontSize: 10, letterSpacing: "0.1em", color: "var(--muted-2)", marginTop: 8 }}>
                {featuredYt.views} views
              </div>
            </div>
          </div>
        </div>

        {/* Remaining Shorts grid */}
        <section style={{ padding: "10px 20px 0" }} aria-label="More shorts">
          <div className="vid-section-header">
            <span style={{ flex: 1, height: 1, background: "var(--line)" }} />
            <span className="mono" style={{ fontSize: 10, letterSpacing: "0.2em", color: "var(--gold)", textTransform: "uppercase" }}>
              More Shorts
            </span>
          </div>

          <div className="vid-grid">
            {restYt.map((v, i) => (
              <div key={v.id} className="vid-card">
                <div className="vid-thumb">
                  <iframe
                    src={`https://www.youtube.com/embed/${v.id}?rel=0&modestbranding=1`}
                    title={v.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                    style={{ width: "100%", height: "100%", border: 0 }}
                  />
                </div>
                <div className="vid-body">
                  <span className="mono" style={{ fontSize: 8, letterSpacing: "0.14em", color: TAG_COLORS[v.tag] ?? "var(--muted)" }}>
                    {v.tag}
                  </span>
                  <h3 className="disp vid-card-title">{v.title}</h3>
                  <span className="mono" style={{ fontSize: 9, letterSpacing: "0.08em", color: "var(--muted-2)" }}>
                    {v.views} views
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* YouTube subscribe CTA */}
        <div style={{ padding: "20px 20px 0" }}>
          <a
            href="https://www.youtube.com/@RaversGuilt"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex", alignItems: "center", gap: 12,
              background: "var(--surface)", border: "1px solid var(--line)",
              borderRadius: "var(--r-xl)", padding: "14px 18px",
              textDecoration: "none", color: "inherit",
            }}
          >
            <svg width="32" height="22" viewBox="0 0 32 22" fill="none" style={{ flexShrink: 0 }}>
              <rect width="32" height="22" rx="5" fill="#FF0000" />
              <path d="M13 7l9 4.5L13 16V7z" fill="white" />
            </svg>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: 13 }}>Subscribe on YouTube</div>
              <div className="mono" style={{ fontSize: 10, color: "var(--muted)", marginTop: 2, letterSpacing: "0.06em" }}>
                @RaversGuilt · New shorts dropping
              </div>
            </div>
            <span className="mono" style={{ fontSize: 10, letterSpacing: "0.12em", color: "var(--muted-2)", flexShrink: 0 }}>↗</span>
          </a>
        </div>

        {/* ═══════════════════════════════════════════
            INSTAGRAM REELS
        ═══════════════════════════════════════════ */}
        <section style={{ padding: "32px 20px 0" }} aria-label="Instagram reels">
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="var(--hot)" strokeWidth="1.7" />
              <circle cx="12" cy="12" r="4" stroke="var(--hot)" strokeWidth="1.7" />
              <circle cx="17.2" cy="6.8" r="1.2" fill="var(--hot)" />
            </svg>
            <span className="mono" style={{ fontSize: 10, letterSpacing: "0.2em", color: "var(--muted)" }}>
              INSTAGRAM REELS
            </span>
          </div>

          <div className="vid-ig-grid">
            {INSTAGRAM_REELS.map((code, i) => (
              <div key={code} className="vid-ig-card">
                <iframe
                  src={`https://www.instagram.com/reel/${code}/embed/`}
                  title={`Raversguilt Reel ${i + 1}`}
                  allowFullScreen
                  loading="lazy"
                  scrolling="no"
                  style={{ width: "100%", height: "100%", border: 0 }}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Instagram follow CTA */}
        <div style={{ padding: "20px 20px 60px" }}>
          <a
            href="https://instagram.com/raversguilt"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex", alignItems: "center", gap: 12,
              background: "var(--surface)", border: "1px solid var(--line)",
              borderRadius: "var(--r-xl)", padding: "14px 18px",
              textDecoration: "none", color: "inherit",
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
              <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="var(--hot)" strokeWidth="1.7" />
              <circle cx="12" cy="12" r="4" stroke="var(--hot)" strokeWidth="1.7" />
              <circle cx="17.2" cy="6.8" r="1.2" fill="var(--hot)" />
            </svg>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: 13 }}>Follow on Instagram</div>
              <div className="mono" style={{ fontSize: 10, color: "var(--muted)", marginTop: 2, letterSpacing: "0.06em" }}>
                @raversguilt · New reels weekly
              </div>
            </div>
            <span className="mono" style={{ fontSize: 10, letterSpacing: "0.12em", color: "var(--muted-2)", flexShrink: 0 }}>↗</span>
          </a>
        </div>
      </div>
    </main>
  );
}
