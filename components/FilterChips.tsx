"use client";

import type { Series } from "@/types/content";
import styles from "./FilterChips.module.css";

interface FilterChipsProps {
  series: Series[];
  active: string;
  onChange: (value: string) => void;
  allLabel?: string;
}

export default function FilterChips({
  series,
  active,
  onChange,
  allLabel = "All",
}: FilterChipsProps) {
  return (
    <div className={styles.list} role="group" aria-label="Filter by series">
      <button
        className={`${styles.chip} ${active === "all" ? styles.chipActive : ""}`}
        onClick={() => onChange("all")}
        aria-pressed={active === "all"}
      >
        {allLabel}
      </button>
      {series.map((s) => (
        <button
          key={s}
          className={`${styles.chip} ${active === s ? styles.chipActive : ""}`}
          onClick={() => onChange(s)}
          aria-pressed={active === s}
        >
          {s}
        </button>
      ))}
    </div>
  );
}
