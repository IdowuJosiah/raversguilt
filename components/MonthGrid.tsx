import type { RaveEvent } from "@/types/content";
import styles from "./MonthGrid.module.css";

interface MonthGridProps {
  year: number;
  month: number; // 0-indexed
  events: RaveEvent[];
  selectedDay?: number | null;
  onDayClick?: (day: number) => void;
}

const WEEKDAY_LABELS = ["M", "T", "W", "T", "F", "S", "S"];

/** Convert JS getDay() (0=Sun) to Mon-based index (0=Mon, 6=Sun) */
function toMonBasedIndex(jsDay: number): number {
  return (jsDay + 6) % 7;
}

export default function MonthGrid({
  year,
  month,
  events,
  selectedDay,
  onDayClick,
}: MonthGridProps) {
  const firstDate = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0).getDate();
  const startOffset = toMonBasedIndex(firstDate.getDay());

  // Build a map: day → event(s)
  const dayEventMap = new Map<number, RaveEvent[]>();
  for (const e of events) {
    const d = new Date(e.startsAt);
    if (d.getFullYear() === year && d.getMonth() === month) {
      const day = d.getDate();
      if (!dayEventMap.has(day)) dayEventMap.set(day, []);
      dayEventMap.get(day)!.push(e);
    }
  }

  // Build flat cell array: null for empty offset slots, then day numbers
  const cells: Array<number | null> = [
    ...Array(startOffset).fill(null),
    ...Array.from({ length: lastDay }, (_, i) => i + 1),
  ];

  return (
    <div className={styles.grid}>
      {/* Weekday headers */}
      <div className={styles.weekdays} aria-hidden="true">
        {WEEKDAY_LABELS.map((label, i) => (
          <div
            key={i}
            className={`${styles.weekday} ${i >= 5 ? styles.weekdayWeekend : ""}`}
          >
            {label}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className={styles.days}>
        {cells.map((day, i) => {
          if (day === null) {
            return <div key={`empty-${i}`} className={`${styles.day} ${styles.dayEmpty}`} />;
          }

          const eventsOnDay = dayEventMap.get(day) ?? [];
          const isSelected = day === selectedDay;
          const hasGuiltyPick = eventsOnDay.some((e) => e.guiltyPick);
          const hasRave = eventsOnDay.some((e) => !e.guiltyPick);

          return (
            <div
              key={day}
              className={`${styles.day} ${eventsOnDay.length ? styles.dayHasEvent : ""} ${isSelected ? styles.daySelected : ""}`}
              onClick={() => onDayClick?.(day)}
              role={onDayClick ? "button" : undefined}
              tabIndex={onDayClick ? 0 : undefined}
              onKeyDown={
                onDayClick
                  ? (e) => (e.key === "Enter" || e.key === " ") && onDayClick(day)
                  : undefined
              }
              aria-label={`${day} ${eventsOnDay.length ? `— ${eventsOnDay.length} event${eventsOnDay.length > 1 ? "s" : ""}` : ""}`}
            >
              {day}
              {/* Dot indicator */}
              {hasGuiltyPick && (
                <span
                  className={`${styles.dot} ${isSelected ? styles.dotDark : styles.dotGold}`}
                />
              )}
              {!hasGuiltyPick && hasRave && (
                <span
                  className={`${styles.dot} ${isSelected ? styles.dotDark : styles.dotViolet}`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
