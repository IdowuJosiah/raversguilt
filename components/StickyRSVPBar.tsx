import Link from "next/link";

interface StickyRSVPBarProps {
  priceLabel?: string;
  ticketUrl?: string;
}

/** Sticky bottom bar on the event detail page. */
export default function StickyRSVPBar({ priceLabel, ticketUrl }: StickyRSVPBarProps) {
  return (
    <div
      style={{
        position: "sticky",
        bottom: 0,
        zIndex: 10,
        background: "linear-gradient(180deg, transparent, var(--bg) 26%)",
        padding: "14px 20px 20px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {priceLabel && (
          <div style={{ flexShrink: 0 }}>
            <div
              className="mono"
              style={{ fontSize: 10, color: "var(--muted-2)", letterSpacing: "0.1em" }}
            >
              FROM
            </div>
            <div className="disp" style={{ fontWeight: 800, fontSize: 18 }}>
              {priceLabel}
            </div>
          </div>
        )}
        {ticketUrl ? (
          <Link
            href={ticketUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: 1,
              textAlign: "center",
              background: "var(--gold)",
              color: "#0b0710",
              fontWeight: 700,
              fontSize: 15,
              padding: "15px",
              borderRadius: "var(--r-lg)",
              display: "block",
            }}
          >
            RSVP / Get tickets
          </Link>
        ) : (
          <button
            disabled
            style={{
              flex: 1,
              textAlign: "center",
              background: "var(--surface-2)",
              color: "var(--muted)",
              fontWeight: 700,
              fontSize: 15,
              padding: "15px",
              borderRadius: "var(--r-lg)",
              border: "1px solid var(--line)",
              cursor: "not-allowed",
            }}
          >
            Tickets coming soon
          </button>
        )}
      </div>
    </div>
  );
}
