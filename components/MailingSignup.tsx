"use client";

/** Mailing list signup stub — wire to a provider later. */
export default function MailingSignup() {
  return (
    <div
      style={{
        border: "1px solid var(--line)",
        borderRadius: "var(--r-xl)",
        padding: 20,
        background: "var(--surface)",
      }}
    >
      <div className="disp" style={{ fontWeight: 700, fontSize: 17 }}>
        Get the weekly verdict
      </div>
      <p style={{ margin: "7px 0 0", fontSize: 13, color: "var(--muted)", lineHeight: 1.5 }}>
        Every Tuesday: the week&apos;s raves, straight to your inbox.
      </p>
      <form
        style={{ display: "flex", gap: 8, marginTop: 14 }}
        onSubmit={(e) => {
          e.preventDefault();
          // TODO: wire to mailing list provider
        }}
      >
        <div style={{ flex: 1 }}>
          <label htmlFor="email-signup" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0,0,0,0)" }}>
            Email address
          </label>
          <input
            id="email-signup"
            type="email"
            placeholder="you@email.com"
            style={{
              width: "100%",
              height: 46,
              background: "var(--bg)",
              border: "1px solid var(--line)",
              borderRadius: 11,
              padding: "0 14px",
              color: "var(--text)",
              fontFamily: "var(--font-mono)",
              fontSize: 13,
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            background: "var(--gold)",
            color: "#0b0710",
            fontWeight: 700,
            fontSize: 13,
            padding: "13px 16px",
            borderRadius: 11,
            border: "none",
            cursor: "pointer",
            fontFamily: "var(--font-body)",
            flexShrink: 0,
          }}
        >
          Join
        </button>
      </form>
    </div>
  );
}
