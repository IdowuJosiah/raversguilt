"use client";

import { useState, useMemo } from "react";
import type { RaveEvent, Series } from "@/types/content";
import { getMonthLong, getEventsForMonth, getSeriesInEvents } from "@/lib/events";
import MonthGrid from "./MonthGrid";
import FilterChips from "./FilterChips";
import EventRow from "./EventRow";
import WavyDivider from "./WavyDivider";
import styles from "./CalendarView.module.css";

interface CalendarViewProps {
  events: RaveEvent[];
}

export default function CalendarView({ events }: CalendarViewProps) {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [filter, setFilter] = useState<string>("all");
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const seriesList = useMemo(() => getSeriesInEvents(events), [events]);

  const monthEvents = useMemo(
    () => getEventsForMonth(year, month),
    [year, month, events]
  );

  const filteredEvents = useMemo(
    () =>
      filter === "all"
        ? monthEvents
        : monthEvents.filter((e) => e.series === (filter as Series)),
    [monthEvents, filter]
  );

  // All upcoming events in agenda (current month onwards)
  const agendaEvents = useMemo(() => {
    const base = filter === "all" ? monthEvents : monthEvents.filter((e) => e.series === filter);
    return [...base].sort(
      (a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime()
    );
  }, [monthEvents, filter]);

  function prevMonth() {
    if (month === 0) {
      setYear((y) => y - 1);
      setMonth(11);
    } else {
      setMonth((m) => m - 1);
    }
    setSelectedDay(null);
  }

  function nextMonth() {
    if (month === 11) {
      setYear((y) => y + 1);
      setMonth(0);
    } else {
      setMonth((m) => m + 1);
    }
    setSelectedDay(null);
  }

  return (
    <>
      {/* Month nav */}
      <div className={styles.monthHeader}>
        <h1 className={`disp ${styles.monthTitle}`}>
          {getMonthLong(year, month)}{" "}
          <span className={styles.monthYear}>'{String(year).slice(2)}</span>
          {/* Scribble underline on month name */}
          <svg
            className={styles.monthScribble}
            style={{ width: 150, height: 16 }}
            viewBox="0 0 150 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M3 9 C 34 3, 66 3, 96 8 C 116 11, 134 7, 147 9"
              stroke="var(--violet)"
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.85"
            />
          </svg>
        </h1>
        <div className={styles.navBtns}>
          <button className={styles.navBtn} onClick={prevMonth} aria-label="Previous month">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M14 6l-6 6 6 6" stroke="var(--text)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button className={styles.navBtn} onClick={nextMonth} aria-label="Next month">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M10 6l6 6-6 6" stroke="var(--text)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Filter chips */}
      <FilterChips
        series={seriesList}
        active={filter}
        onChange={(v) => { setFilter(v); setSelectedDay(null); }}
      />

      <div className={styles.calGrid}>
      <div className={styles.calLeft}>
      {/* Month grid */}
      <MonthGrid
        year={year}
        month={month}
        events={filteredEvents}
        selectedDay={selectedDay}
        onDayClick={setSelectedDay}
      />

      {/* Legend */}
      <div className={styles.legend} aria-label="Calendar legend">
        <div className={styles.legendItem}>
          <span className={styles.legendDot} style={{ background: "var(--violet)" }} />
          <span className={styles.legendLabel}>Rave</span>
        </div>
        <div className={styles.legendItem}>
          <span className={styles.legendDot} style={{ background: "var(--gold)" }} />
          <span className={styles.legendLabel}>Guilty Pick</span>
        </div>
      </div>
      </div>{/* calLeft */}

      <WavyDivider padding="14px 20px 4px" className={styles.mobileOnly} />

      {/* Agenda */}
      <div className={`${styles.agenda} ${styles.calRight}`}>
        <div className={styles.agendaHeader}>
          Upcoming — {agendaEvents.length} filed
        </div>
        {agendaEvents.length === 0 ? (
          <p className={styles.empty}>Nothing on the docket yet for this month.</p>
        ) : (
          <div className={styles.agendaList}>
            {agendaEvents.map((e) => (
              <EventRow key={e.slug} event={e} variant="calendar" />
            ))}
          </div>
        )}
      </div>
      </div>{/* calGrid */}
    </>
  );
}
