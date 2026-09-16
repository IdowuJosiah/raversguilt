import type { Metadata } from "next";
import { ALL_SERIES } from "@/lib/events";
import TopBar from "@/components/TopBar";
import LiquidField from "@/components/LiquidField";
import WavyDivider from "@/components/WavyDivider";
import ScribbleUnderline from "@/components/ScribbleUnderline";
import MailingSignup from "@/components/MailingSignup";

export const metadata: Metadata = {
  title: "About",
  description:
    "Raversguilt is a Lagos collective and rave desk. Part promoter, part jury, part getaway car.",
};

export default function AboutPage() {
  return (
    <main className="page-outer">
      {/* Blob decorations */}
      <LiquidField
        style={{ position: "absolute", top: -40, right: -70, width: 300, height: 300 }}
        fill="#a86bff"
        opacity={0.42}
        circles={[
          { cx: 110, cy: 88, r: 46 },
          { cx: 144, cy: 114, r: 32 },
          { cx: 84, cy: 120, r: 26 },
          { cx: 146, cy: 66, r: 22 },
        ]}
      />
      <LiquidField
        style={{ position: "absolute", top: 160, left: -80, width: 240, height: 240 }}
        fill="#e0aa47"
        opacity={0.2}
        circles={[
          { cx: 94, cy: 96, r: 42 },
          { cx: 126, cy: 122, r: 30 },
          { cx: 72, cy: 126, r: 24 },
        ]}
        delay="-9s"
      />

      {/* Flowing curves over hero */}
      <svg
        style={{
          position: "absolute",
          top: 70,
          left: -30,
          width: 470,
          height: 300,
          zIndex: 1,
          pointerEvents: "none",
        }}
        viewBox="0 0 470 300"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M-20 130 C 120 50, 210 200, 350 120 C 430 74, 470 130, 450 220"
          stroke="#a86bff"
          strokeWidth="1.6"
          opacity="0.35"
          strokeLinecap="round"
        />
        <path
          d="M-20 170 C 130 100, 220 240, 360 150 C 440 100, 480 160, 460 250"
          stroke="#e0aa47"
          strokeWidth="1.2"
          opacity="0.25"
          strokeLinecap="round"
        />
      </svg>

      <div className="page-content">
        <TopBar variant="inner" title="About" docketLabel="THE FILE" active="about" />

        {/* Manifesto */}
        <section className="about-manifesto" style={{ padding: "28px 20px 6px" }} aria-label="Manifesto">
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <svg width="26" height="12" viewBox="0 0 26 12" fill="none" aria-hidden="true">
              <path
                d="M1 7 C 4 2, 7 2, 10 6 C 13 10, 16 10, 19 6 C 22 2, 24 4, 25 6"
                stroke="#e0aa47"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
            <span
              className="mono"
              style={{
                fontSize: 11,
                letterSpacing: "0.22em",
                color: "var(--gold)",
                textTransform: "uppercase",
              }}
            >
              Case No. 001 · The Rave Jury
            </span>
          </div>

          <h1
            className="disp"
            style={{ margin: "16px 0 0", fontWeight: 800, fontSize: 40, lineHeight: 1 }}
          >
            We plead{" "}
            <span style={{ position: "relative", color: "var(--violet)" }}>
              guilty
              <ScribbleUnderline width={120} />
            </span>
            .
          </h1>

          <p style={{ margin: "22px 0 0", fontSize: 16, lineHeight: 1.6, color: "#d9d1e6" }}>
            Raversguilt is a Lagos collective and rave desk. We find the nights
            worth losing sleep over, put them on trial, and hand down a verdict —
            then bring you along. Part promoter, part jury, part getaway car.
          </p>

          <div style={{ display: "flex", gap: 10, marginTop: 18, flexWrap: "wrap" }}>
            {[
              { label: "they/them", color: "var(--violet)", border: "var(--violet-dim)" },
              { label: "Est. Lagos", color: "var(--muted)", border: "var(--line)" },
              { label: "777+ jurors", color: "var(--muted)", border: "var(--line)" },
            ].map(({ label, color, border }) => (
              <span
                key={label}
                className="mono"
                style={{
                  fontSize: 10,
                  letterSpacing: "0.1em",
                  color,
                  border: `1px solid ${border}`,
                  padding: "6px 11px",
                  borderRadius: "var(--r-pill)",
                }}
              >
                {label}
              </span>
            ))}
          </div>
        </section>

        <WavyDivider padding="26px 20px 4px" />

        {/* What we do */}
        <section style={{ padding: "6px 20px 6px" }} aria-label="What we do">
          <div className="about-cards" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              {
                iconEl: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect x="3.5" y="5" width="17" height="15" rx="2.5" stroke="var(--violet)" strokeWidth="1.7" />
                    <path d="M3.5 9.5h17M8 3v3M16 3v3" stroke="var(--violet)" strokeWidth="1.7" strokeLinecap="round" />
                  </svg>
                ),
                title: "We keep the docket",
                body: "A live calendar of every rave on our radar — with the details, before they sell out.",
              },
              {
                iconEl: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 21V6a2 2 0 012-2h5l1.5 2H19a2 2 0 012 2v4" stroke="var(--gold)" strokeWidth="1.7" strokeLinecap="round" />
                    <path d="M5 21l2.5-8h15L20 21z" stroke="var(--gold)" strokeWidth="1.7" strokeLinejoin="round" />
                  </svg>
                ),
                title: "We hand down picks",
                body: '"Guilty Picks" — the nights the jury actually vouches for.',
              },
              {
                iconEl: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="9" cy="8" r="3" stroke="var(--hot)" strokeWidth="1.7" />
                    <circle cx="16.5" cy="9.5" r="2.4" stroke="var(--hot)" strokeWidth="1.7" />
                    <path d="M4 19a5 5 0 0110 0M14.5 19a4 4 0 015.5-3.7" stroke="var(--hot)" strokeWidth="1.7" strokeLinecap="round" />
                  </svg>
                ),
                title: "We run the residencies",
                body: "Our own recurring nights — from 303 Garage to Void House.",
              },
            ].map(({ iconEl, title, body }) => (
              <div
                key={title}
                style={{
                  display: "flex",
                  gap: 14,
                  background: "var(--surface)",
                  border: "1px solid var(--line)",
                  borderRadius: "var(--r-lg)",
                  padding: 16,
                }}
              >
                <div style={{ flexShrink: 0 }}>{iconEl}</div>
                <div>
                  <div className="disp" style={{ fontWeight: 700, fontSize: 16 }}>
                    {title}
                  </div>
                  <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 4, lineHeight: 1.5 }}>
                    {body}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Residencies */}
        <section style={{ padding: "26px 20px 6px" }} aria-label="Residencies">
          <h2 className="disp" style={{ margin: "0 0 14px", fontWeight: 700, fontSize: 20 }}>
            The residencies
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {ALL_SERIES.map((s) => (
              <span
                key={s}
                style={{
                  fontSize: 12,
                  color: "var(--text)",
                  background: "var(--surface-2)",
                  border: "1px solid var(--line)",
                  padding: "9px 13px",
                  borderRadius: "var(--r-pill)",
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </section>

        <div className="about-submit-row">
        {/* Submit an event */}
        <div style={{ padding: "26px 20px 6px" }}>
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              border: "1px solid var(--violet-dim)",
              borderRadius: "var(--r-xl)",
              padding: 20,
              background: "var(--surface)",
            }}
          >
            <LiquidField
              style={{
                position: "absolute",
                top: -40,
                right: -30,
                width: 190,
                height: 190,
                zIndex: 0,
              }}
              fill="#a86bff"
              opacity={0.4}
              circles={[
                { cx: 104, cy: 92, r: 40 },
                { cx: 134, cy: 116, r: 28 },
                { cx: 78, cy: 120, r: 22 },
              ]}
            />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div className="disp" style={{ fontWeight: 800, fontSize: 20 }}>
                Throwing a rave?
              </div>
              <p style={{ margin: "8px 0 0", fontSize: 14, color: "var(--muted)", lineHeight: 1.5 }}>
                Submit it to the jury. If it&apos;s good, it lands on the docket —
                and maybe becomes a Guilty Pick.
              </p>
              <a
                href="mailto:submit@raversguilt.com"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  marginTop: 16,
                  background: "var(--violet)",
                  color: "#0b0710",
                  fontWeight: 700,
                  fontSize: 14,
                  padding: 14,
                  borderRadius: "var(--r-md)",
                }}
              >
                Submit an event
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="#0b0710"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Mailing signup (client component) */}
        <div style={{ padding: "14px 20px 6px" }}>
          <MailingSignup />
        </div>

        </div>{/* about-submit-row */}

        {/* Socials */}
        <div style={{ padding: "26px 20px 6px" }}>
          <div style={{ display: "flex", gap: 10 }}>
            <a
              href="https://instagram.com/raversguilt"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                gap: 12,
                background: "var(--surface)",
                border: "1px solid var(--line)",
                borderRadius: 14,
                padding: 15,
                color: "inherit",
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="var(--text)" strokeWidth="1.7" />
                <circle cx="12" cy="12" r="4" stroke="var(--text)" strokeWidth="1.7" />
                <circle cx="17.2" cy="6.8" r="1.2" fill="var(--text)" />
              </svg>
              <div>
                <div style={{ fontWeight: 600, fontSize: 13 }}>Instagram</div>
                <div className="mono" style={{ fontSize: 10, color: "var(--muted)", marginTop: 2 }}>
                  @raversguilt
                </div>
              </div>
            </a>
            <a
              href="https://tiktok.com/@raversguilt"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                gap: 12,
                background: "var(--surface)",
                border: "1px solid var(--line)",
                borderRadius: 14,
                padding: 15,
                color: "inherit",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M14 3v10.5a3.5 3.5 0 11-3-3.46"
                  stroke="var(--text)"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14 3c.5 2.8 2.3 4.4 5 4.7"
                  stroke="var(--text)"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div>
                <div style={{ fontWeight: 600, fontSize: 13 }}>TikTok</div>
                <div className="mono" style={{ fontSize: 10, color: "var(--muted)", marginTop: 2 }}>
                  @raversguilt
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* Footer */}
        <footer
          style={{
            position: "relative",
            marginTop: 22,
            padding: "24px 20px 32px",
            textAlign: "center",
          }}
        >
          <svg
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 22 }}
            viewBox="0 0 390 22"
            preserveAspectRatio="none"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M0 14 C 40 4, 80 4, 130 12 C 190 22, 250 22, 310 12 C 350 5, 380 9, 390 12"
              stroke="var(--line)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <div style={{ paddingTop: 14 }}>
            <div
              className="disp"
              style={{ fontWeight: 800, fontSize: 16, letterSpacing: "0.02em" }}
            >
              RAVERSGUILT
            </div>
            <div
              className="mono"
              style={{
                fontSize: 10,
                letterSpacing: "0.12em",
                color: "var(--muted-2)",
                marginTop: 6,
              }}
            >
              GUILTY OF LOVING THE RAVE · LAGOS
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
