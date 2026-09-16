"use client";

import { useState, useMemo } from "react";
import type { GalleryNight, Series } from "@/types/content";
import { getSeriesInEvents } from "@/lib/events";
import type { RaveEvent } from "@/types/content";
import FilterChips from "./FilterChips";
import GalleryTile from "./GalleryTile";
import LiquidField from "./LiquidField";
import styles from "./GalleryView.module.css";

interface GalleryViewProps {
  nights: GalleryNight[];
}

// Helper to get unique series from gallery nights
function getGallerySeries(nights: GalleryNight[]): Series[] {
  const seen = new Set<Series>();
  for (const n of nights) seen.add(n.series);
  return Array.from(seen);
}

export default function GalleryView({ nights }: GalleryViewProps) {
  const [filter, setFilter] = useState<string>("all");

  const featured = nights.find((n) => n.featured);
  const seriesList = useMemo(() => getGallerySeries(nights), [nights]);

  const filteredNights = useMemo(
    () =>
      filter === "all"
        ? nights.filter((n) => !n.featured)
        : nights.filter((n) => !n.featured && n.series === (filter as Series)),
    [nights, filter]
  );

  return (
    <>
      {/* Filter chips */}
      <FilterChips
        series={seriesList}
        active={filter}
        onChange={setFilter}
        allLabel="All nights"
      />

      {/* Featured recap card */}
      {featured && (filter === "all" || filter === featured.series) && (
        <div className={styles.featured}>
          <a href="#" className={styles.featuredCard}>
            <div className={styles.featuredImg}>
              {/* Blobs */}
              <LiquidField
                style={{ position: "absolute", top: -40, right: -30, width: 230, height: 230 }}
                fill="#ff4d6d"
                opacity={0.46}
                circles={[
                  { cx: 100, cy: 92, r: 44 },
                  { cx: 134, cy: 118, r: 30 },
                  { cx: 76, cy: 122, r: 24 },
                ]}
              />
              <LiquidField
                style={{ position: "absolute", bottom: -50, left: -30, width: 240, height: 240 }}
                fill="#a86bff"
                opacity={0.58}
                circles={[
                  { cx: 100, cy: 98, r: 46 },
                  { cx: 134, cy: 124, r: 30 },
                  { cx: 76, cy: 126, r: 26 },
                  { cx: 136, cy: 74, r: 20 },
                ]}
              />
              {/* Curve trail */}
              <svg
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
                viewBox="0 0 350 200"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M-10 110 C 90 50, 150 160, 250 100 C 320 60, 360 110, 355 160"
                  stroke="var(--text)"
                  strokeWidth="1.2"
                  opacity="0.22"
                  strokeLinecap="round"
                />
              </svg>

              {featured.recapLength && (
                <div className={styles.recapBadge}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M8 5v14l11-7z" fill="var(--hot)" />
                  </svg>
                  <span className={styles.recapLabel}>RECAP · {featured.recapLength}</span>
                </div>
              )}

              <div className={styles.featuredMeta}>
                <div className={styles.featuredSeries}>
                  {new Date(featured.date).toLocaleDateString("en-GB", {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                  }).toUpperCase()} · {featured.series}
                </div>
                <div className={styles.featuredTitle}>{featured.title}</div>
              </div>
            </div>
          </a>
        </div>
      )}

      {/* Gallery grid */}
      <div className={styles.gridSection}>
        <div className={styles.gridLabel}>Recent exhibits</div>

        {filteredNights.length === 0 ? (
          <p className={styles.empty}>No exhibits filed for this series yet.</p>
        ) : (
          <div className={styles.grid}>
            {filteredNights.map((night, i) => (
              <GalleryTile key={night.slug} night={night} height={200} waveOverlay={i % 3 === 0} />
            ))}
          </div>
        )}
      </div>

      {/* Load more */}
      <div className={styles.loadMore}>
        <button className={styles.loadMoreBtn}>Load older nights</button>
      </div>
    </>
  );
}
