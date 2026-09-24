import Link from "next/link";

type NavKey = "home" | "calendar" | "gallery" | "about" | "shop";

interface TopBarProps {
  /** "home" renders logo + search/menu; "inner" renders back chevron + title + docket label (mobile only) */
  variant?: "home" | "inner";
  title?: string;
  docketLabel?: string;
  /** href for the back chevron (default: "/") */
  backHref?: string;
  /** which nav item is active on the desktop nav */
  active?: NavKey;
}

const NAV: { key: NavKey; label: string; href: string }[] = [
  { key: "home", label: "Home", href: "/" },
  { key: "calendar", label: "Calendar", href: "/calendar" },
  { key: "gallery", label: "Gallery", href: "/gallery" },
  { key: "shop", label: "Shop", href: "/shop" },
  { key: "about", label: "About", href: "/about" },
];

function Tick() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2l2.4 1.8 3-.2 1 2.8 2.4 1.7-.9 2.9.9 2.9-2.4 1.7-1 2.8-3-.2L12 22l-2.4-1.8-3 .2-1-2.8L3.2 14l.9-2.9-.9-2.9L5.6 6.4l1-2.8 3 .2L12 2z"
        fill="var(--violet)"
      />
      <path d="M8.5 12.2l2.3 2.3 4.5-4.8" stroke="#0b0710" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function TopBar({
  variant = "home",
  title,
  docketLabel,
  backHref = "/",
  active = "home",
}: TopBarProps) {
  return (
    <>
      {/* ---------- Desktop nav (>=900px) ---------- */}
      <header className="rg-desktop-nav">
        <div className="rg-nav-inner">
          <Link href="/" className="rg-nav-logo" aria-label="Raversguilt home">
            <span className="disp">RAVERSGUILT</span>
            <Tick />
          </Link>
          <nav className="rg-nav-links" aria-label="Primary">
            {NAV.map((n) => (
              <Link
                key={n.key}
                href={n.href}
                className="rg-nav-link"
                aria-current={active === n.key ? "page" : undefined}
                data-active={active === n.key ? "true" : undefined}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="rg-nav-actions">
            <button className="rg-icon-btn" aria-label="Search">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="11" cy="11" r="7" stroke="var(--text)" strokeWidth="1.8" />
                <path d="M20 20l-3.2-3.2" stroke="var(--text)" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
            <a href="https://instagram.com/raversguilt" target="_blank" rel="noopener noreferrer" className="rg-follow-btn">
              Follow
            </a>
          </div>
        </div>
      </header>

      {/* ---------- Mobile bar (<900px) ---------- */}
      {variant === "inner" ? (
        <header className="rg-mobile-bar rg-mobile-bar--inner">
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Link href={backHref} aria-label="Go back" style={{ display: "flex", alignItems: "center", justifyContent: "center", minWidth: 44, minHeight: 44 }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M15 5l-7 7 7 7" stroke="var(--text)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            {title && <div className="disp" style={{ fontWeight: 800, fontSize: 17 }}>{title}</div>}
          </div>
          {docketLabel && (
            <span className="mono" style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--gold)" }}>{docketLabel}</span>
          )}
        </header>
      ) : (
        <header className="rg-mobile-bar">
          {/* Left: hamburger */}
          <button aria-label="Menu" className="rg-mobile-icon-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 7h16M4 12h10M4 17h16" stroke="var(--text)" strokeWidth="1.9" strokeLinecap="round" />
            </svg>
          </button>

          {/* Center: logo */}
          <Link href="/" className="rg-mobile-logo" aria-label="Raversguilt home">
            <span className="disp" style={{ fontWeight: 800, fontSize: 17, letterSpacing: "0.02em" }}>RAVERSGUILT</span>
            <Tick />
          </Link>

          {/* Right: search */}
          <button aria-label="Search" className="rg-mobile-icon-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="11" cy="11" r="7" stroke="var(--text)" strokeWidth="1.9" />
              <path d="M20 20l-3.2-3.2" stroke="var(--text)" strokeWidth="1.9" strokeLinecap="round" />
            </svg>
          </button>
        </header>
      )}
    </>
  );
}
