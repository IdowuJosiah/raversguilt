import type { GalleryNight } from "@/types/content";
import { getTileColor } from "@/lib/events";
import styles from "./GalleryTile.module.css";

interface GalleryTileProps {
  night: GalleryNight;
  height?: number;
  /** Show liquid-curve wave overlay (used on taller tiles) */
  waveOverlay?: boolean;
}

export default function GalleryTile({ night, height = 200, waveOverlay }: GalleryTileProps) {
  const bg = getTileColor(night.series);

  return (
    <div className={styles.tile} style={{ height, background: bg }}>
      {night.coverUrl && (
        <img src={night.coverUrl} alt={night.title} className={styles.img} />
      )}

      {waveOverlay && (
        <svg
          className={styles.wave}
          viewBox="0 0 180 200"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M-10 120 C 50 70, 90 160, 150 110 C 180 84, 200 120, 190 170"
            stroke="var(--violet)"
            strokeWidth="1.4"
            opacity="0.4"
            strokeLinecap="round"
          />
          <path
            d="M-10 150 C 50 100, 90 190, 150 140"
            stroke="var(--gold)"
            strokeWidth="1"
            opacity="0.3"
            strokeLinecap="round"
          />
        </svg>
      )}

      <span className={styles.tag}>{night.series} · {night.title}</span>
    </div>
  );
}
