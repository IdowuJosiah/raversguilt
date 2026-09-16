interface WavyDividerProps {
  /** Extra wrapper padding override, e.g. "22px 20px 4px" */
  padding?: string;
  /** Optional class on the wrapper (e.g. to hide on desktop) */
  className?: string;
}

/** Two-stroke wavy section separator (violet + gold). */
export default function WavyDivider({ padding = "22px 20px 4px", className }: WavyDividerProps) {
  return (
    <div className={className} style={{ padding }} aria-hidden="true">
      <svg
        width="100%"
        height="30"
        viewBox="0 0 350 30"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M0 18 C 30 6, 60 6, 90 16 C 120 26, 150 26, 180 16 C 210 6, 240 6, 270 16 C 300 26, 330 22, 350 14"
          stroke="#6f4bb0"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.8"
        />
        <path
          d="M0 22 C 30 12, 60 12, 90 20 C 120 30, 150 30, 180 20 C 210 10, 240 10, 270 20 C 300 30, 330 26, 350 18"
          stroke="#e0aa47"
          strokeWidth="1.3"
          strokeLinecap="round"
          opacity="0.5"
        />
      </svg>
    </div>
  );
}
