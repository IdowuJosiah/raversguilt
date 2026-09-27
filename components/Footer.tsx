import Link from "next/link";

const NAV_COLS = [
  {
    heading: "Explore",
    links: [
      { label: "Home", href: "/" },
      { label: "Calendar", href: "/calendar" },
      { label: "Gallery", href: "/gallery" },
    ],
  },
  {
    heading: "Info",
    links: [
      { label: "Articles", href: "/articles" },
      { label: "About", href: "/about" },
    ],
  },
];

function Tick() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2l2.4 1.8 3-.2 1 2.8 2.4 1.7-.9 2.9.9 2.9-2.4 1.7-1 2.8-3-.2L12 22l-2.4-1.8-3 .2-1-2.8L3.2 14l.9-2.9-.9-2.9L5.6 6.4l1-2.8 3 .2L12 2z"
        fill="var(--violet)"
      />
      <path d="M8.5 12.2l2.3 2.3 4.5-4.8" stroke="#0b0710" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      {/* Top border wave */}
      <svg
        className="footer-wave"
        viewBox="0 0 1200 22"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M0 14 C 120 4, 240 20, 420 12 C 600 4, 780 22, 960 12 C 1080 5, 1150 10, 1200 12"
          stroke="var(--line)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>

      <div className="footer-inner">
        {/* Brand block */}
        <div className="footer-brand">
          <Link href="/" className="footer-logo" aria-label="Raversguilt home">
            <span className="disp" style={{ fontWeight: 800, fontSize: 22, letterSpacing: "0.01em" }}>
              RAVERSGUILT
            </span>
            <Tick />
          </Link>
          <p className="footer-tagline mono">
            The underground dance docket.<br />
            Case by case, night by night.
          </p>
          <div className="mono" style={{ fontSize: 10, letterSpacing: "0.12em", color: "var(--muted-2)", marginTop: 10 }}>
            EST. LAGOS · 2024
          </div>

          {/* Social icons */}
          <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
            <a
              href="https://instagram.com/raversguilt"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="footer-social-btn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
              className="footer-social-btn"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M14 3v10.5a3.5 3.5 0 11-3-3.46" stroke="var(--text)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14 3c.5 2.8 2.3 4.4 5 4.7" stroke="var(--text)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>

        {/* Nav columns */}
        <div className="footer-nav">
          {NAV_COLS.map((col) => (
            <div key={col.heading} className="footer-nav-col">
              <div className="mono footer-nav-heading">{col.heading}</div>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="footer-nav-link">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact block */}
          <div className="footer-nav-col">
            <div className="mono footer-nav-heading">Contact</div>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              <li>
                <a href="mailto:raversguilt@gmail.com" className="footer-nav-link">
                  Email us
                </a>
              </li>
              <li>
                <a href="https://instagram.com/raversguilt" target="_blank" rel="noopener noreferrer" className="footer-nav-link">
                  Instagram DM
                </a>
              </li>
              <li>
                <a href="mailto:raversguilt@gmail.com?subject=Gear hire" className="footer-nav-link">
                  Gear hire
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <span className="mono" style={{ fontSize: 10, letterSpacing: "0.1em", color: "var(--muted-2)" }}>
          © {year} RAVERSGUILT · ALL RIGHTS RESERVED
        </span>
        <span className="mono" style={{ fontSize: 10, letterSpacing: "0.1em", color: "var(--muted-2)" }}>
          LAGOS, NIGERIA
        </span>
      </div>
    </footer>
  );
}
