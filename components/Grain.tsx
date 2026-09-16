/** Faint feTurbulence grain layer — covers the full viewport. */
export default function Grain() {
  return (
    <svg
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
        opacity: 0.06,
        mixBlendMode: "overlay",
      }}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <filter id="grain-noise">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.85"
          numOctaves={2}
          stitchTiles="stitch"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain-noise)" />
    </svg>
  );
}
