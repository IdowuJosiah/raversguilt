interface ScribbleUnderlineProps {
  /** Width of the SVG in px (default 130) */
  width?: number;
  /** Colour (default gold) */
  color?: string;
}

/**
 * Rough-marker stroke absolutely positioned under a word.
 * Wrap the target word in `<span style={{ position:"relative" }}>…<ScribbleUnderline /></span>`.
 */
export default function ScribbleUnderline({
  width = 130,
  color = "#e0aa47",
}: ScribbleUnderlineProps) {
  return (
    <svg
      style={{
        position: "absolute",
        left: -4,
        bottom: -14,
        width,
        height: 20,
      }}
      viewBox="0 0 130 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 12 C 30 3, 55 3, 78 9 C 95 13, 112 8, 126 11"
        stroke={color}
        strokeWidth="3.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
