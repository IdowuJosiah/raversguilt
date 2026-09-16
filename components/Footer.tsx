/** Site footer: logo + they/them tag + social icons. */
export default function Footer() {
  return (
    <footer style={{ position: "relative", marginTop: 28, padding: "22px 20px 30px" }}>
      {/* Wavy top edge */}
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

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: 12,
        }}
      >
        <div>
          <div className="disp" style={{ fontWeight: 800, fontSize: 15, letterSpacing: "0.02em" }}>
            RAVERSGUILT
          </div>
          <div
            className="mono"
            style={{ fontSize: 10, letterSpacing: "0.1em", color: "var(--muted-2)", marginTop: 4 }}
          >
            they/them · the rave jury
          </div>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <a
            href="https://instagram.com/raversguilt"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 40,
              height: 40,
              borderRadius: "var(--r-md)",
              border: "1px solid var(--line)",
            }}
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="var(--text)" strokeWidth="1.7" />
              <circle cx="12" cy="12" r="4" stroke="var(--text)" strokeWidth="1.7" />
              <circle cx="17.2" cy="6.8" r="1.2" fill="var(--text)" />
            </svg>
          </a>
          <a
            href="https://tiktok.com/@raversguilt"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 40,
              height: 40,
              borderRadius: "var(--r-md)",
              border: "1px solid var(--line)",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M14 3v10.5a3.5 3.5 0 11-3-3.46" stroke="var(--text)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M14 3c.5 2.8 2.3 4.4 5 4.7" stroke="var(--text)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
