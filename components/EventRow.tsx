import Link from "next/link";
import type { RaveEvent } from "@/types/content";
import { getDayOfWeek, getDayNumber, getMonthShort, getTimeLabel } from "@/lib/events";
import SeriesTag from "./SeriesTag";
import styles from "./EventRow.module.css";

interface EventRowProps {
  event: RaveEvent;
  /** "home" = compact, "calendar" = full (default) */
  variant?: "home" | "calendar";
}

export default function EventRow({ event, variant = "calendar" }: EventRowProps) {
  const dow = getDayOfWeek(event.startsAt);
  const day = getDayNumber(event.startsAt);
  const mon = getMonthShort(event.startsAt);
  const time = getTimeLabel(event);

  const isCalendar = variant === "calendar";

  return (
    <Link
      href={`/events/${event.slug}`}
      className={`${styles.row} ${isCalendar ? styles.rowFull : ""}`}
    >
      {/* Date block */}
      <div className={`${styles.dateBlock} ${isCalendar ? styles.dateBlockFull : ""}`}>
        <div className={styles.dow}>{dow}</div>
        <div className={`${styles.dayNum} ${isCalendar ? styles.dayNumFull : ""}`}>{day}</div>
        {isCalendar && <div className={styles.monthShort}>{mon}</div>}
      </div>

      {/* Vertical divider */}
      <div className={styles.divider} aria-hidden="true" />

      {/* Content */}
      <div className={styles.content}>
        {isCalendar ? (
          <>
            <div className={styles.titleRow}>
              <SeriesTag series={event.series} size="sm" bgOverride="transparent" />
              {event.guiltyPick && <span className={styles.pick}>★ PICK</span>}
            </div>
            <div className={styles.titleFull}>{event.title}</div>
            <div className={styles.meta}>
              {event.venueName} · {event.area ?? "Lagos"} · {time}
            </div>
          </>
        ) : (
          <>
            <div className={styles.title}>{event.title}</div>
            <div className={styles.meta}>
              {event.venueName} · {time}
            </div>
          </>
        )}
      </div>

      {/* Series tag on compact home rows */}
      {!isCalendar && (
        <SeriesTag series={event.series} size="sm" bgOverride="transparent" />
      )}
    </Link>
  );
}
