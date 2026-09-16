import Link from "next/link";
import type { RaveEvent } from "@/types/content";
import { formatEventDate, getTimeLabel } from "@/lib/events";
import SeriesTag from "./SeriesTag";
import VerdictStamp from "./VerdictStamp";
import LiquidField from "./LiquidField";
import styles from "./EventCard.module.css";

interface EventCardProps {
  event: RaveEvent;
  caseNumber?: string;
}

export default function EventCard({ event, caseNumber }: EventCardProps) {
  return (
    <div style={{ padding: "8px 20px 8px" }}>
      <div className={styles.header}>
        <span
          className="mono"
          style={{
            fontSize: 11,
            letterSpacing: "0.2em",
            color: "var(--muted-2)",
            textTransform: "uppercase",
          }}
        >
          Next on the docket
        </span>
        {caseNumber && (
          <span
            className="mono"
            style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--gold)" }}
          >
            {caseNumber}
          </span>
        )}
      </div>

      <div className={styles.card}>
        {/* Flyer */}
        <div className={styles.flyer}>
          {event.flyerUrl ? (
            <img src={event.flyerUrl} alt={`${event.title} flyer`} className={styles.flyerImg} />
          ) : (
            <>
              {/* Liquid blobs inside flyer */}
              <LiquidField
                style={{ position: "absolute", top: -20, left: -30, width: 200, height: 200 }}
                fill="#ff4d6d"
                opacity={0.55}
                circles={[
                  { cx: 90, cy: 90, r: 40 },
                  { cx: 122, cy: 116, r: 28 },
                  { cx: 70, cy: 120, r: 24 },
                ]}
              />
              <LiquidField
                style={{ position: "absolute", bottom: -40, right: -20, width: 230, height: 230 }}
                fill="#a86bff"
                opacity={0.7}
                circles={[
                  { cx: 110, cy: 96, r: 46 },
                  { cx: 140, cy: 122, r: 32 },
                  { cx: 84, cy: 126, r: 26 },
                  { cx: 140, cy: 74, r: 22 },
                ]}
              />
              {/* Flowing curve trail */}
              <svg
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
                viewBox="0 0 360 210"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M-10 120 C 90 60, 150 170, 250 110 C 320 68, 370 120, 360 180"
                  stroke="var(--text)"
                  strokeWidth="1.2"
                  opacity="0.22"
                  strokeLinecap="round"
                />
              </svg>
              <div className={styles.flyerPlaceholder}>[ EVENT FLYER ]</div>
            </>
          )}

          <div className={styles.flyerTags}>
            <SeriesTag series={event.series} />
          </div>
          {event.guiltyPick && (
            <div className={styles.flyerStamp}>
              <VerdictStamp />
            </div>
          )}
        </div>

        {/* Body */}
        <div className={styles.body}>
          <h3 className={`${styles.title} disp`}>{event.title}</h3>

          <ul className={styles.metaList}>
            <li className={styles.metaRow}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="3.5" y="5" width="17" height="15" rx="2.5" stroke="var(--violet)" strokeWidth="1.7" />
                <path d="M3.5 9.5h17M8 3v3M16 3v3" stroke="var(--violet)" strokeWidth="1.7" strokeLinecap="round" />
              </svg>
              <span>
                <span className={styles.metaRowText}>
                  <time dateTime={event.startsAt}>{formatEventDate(event.startsAt)}</time>
                </span>{" "}
                · {getTimeLabel(event)}
              </span>
            </li>
            <li className={styles.metaRow}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 21s7-5.5 7-11a7 7 0 10-14 0c0 5.5 7 11 7 11z" stroke="var(--violet)" strokeWidth="1.7" />
                <circle cx="12" cy="10" r="2.4" stroke="var(--violet)" strokeWidth="1.7" />
              </svg>
              <span>
                <span className={styles.metaRowText}>{event.venueName}</span>
                {event.area && ` · ${event.area}`}
              </span>
            </li>
          </ul>

          <div className={styles.actions}>
            {event.ticketUrl ? (
              <Link href={event.ticketUrl} target="_blank" rel="noopener noreferrer" className={styles.rsvpBtn}>
                RSVP / Tickets
              </Link>
            ) : (
              <span className={styles.rsvpBtn} style={{ opacity: 0.6 }}>RSVP / Tickets</span>
            )}
            <Link
              href={`/events/${event.slug}`}
              className={styles.shareBtn}
              aria-label={`View ${event.title}`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 12v7a1 1 0 001 1h14a1 1 0 001-1v-7" stroke="var(--text)" strokeWidth="1.7" strokeLinecap="round" />
                <path d="M12 3v12M8 7l4-4 4 4" stroke="var(--text)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
