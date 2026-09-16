/** Rotated "GUILTY PICK" border stamp — gold, tilted 9°. */
export default function VerdictStamp() {
  return (
    <div
      style={{
        transform: "rotate(9deg)",
        border: "2px solid var(--gold)",
        color: "var(--gold)",
        fontFamily: "var(--font-mono)",
        fontWeight: 700,
        fontSize: 11,
        letterSpacing: "0.16em",
        padding: "5px 8px",
        borderRadius: 6,
        whiteSpace: "nowrap",
        lineHeight: 1,
      }}
      aria-label="Guilty Pick"
    >
      GUILTY&nbsp;PICK
    </div>
  );
}
