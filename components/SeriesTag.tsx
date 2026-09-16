import type { Series } from "@/types/content";

interface SeriesTagProps {
  series: Series;
  /** "sm" for 9px pill (cards / rows), "md" for 10px inline tag (default) */
  size?: "sm" | "md";
  /** Override background for overlay contexts */
  bgOverride?: string;
}

/** Violet-bordered mono pill showing the series name in uppercase. */
export default function SeriesTag({
  series,
  size = "md",
  bgOverride,
}: SeriesTagProps) {
  const fontSize = size === "sm" ? 9 : 10;
  const padding = size === "sm" ? "4px 7px" : "5px 9px";

  return (
    <span
      className="mono"
      style={{
        fontSize,
        letterSpacing: "0.1em",
        color: "var(--violet)",
        background: bgOverride ?? "rgba(11,7,16,0.6)",
        border: "1px solid var(--violet-dim)",
        padding,
        borderRadius: "var(--r-pill)",
        whiteSpace: "nowrap",
        textTransform: "uppercase",
        display: "inline-block",
      }}
    >
      {series}
    </span>
  );
}
