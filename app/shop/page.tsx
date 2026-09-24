import type { Metadata } from "next";
import TopBar from "@/components/TopBar";
import shopData from "@/data/shop.json";

export const metadata: Metadata = {
  title: "Shop",
  description: "Gear and equipment for hire from Raversguilt.",
};

export default function ShopPage() {
  return (
    <main className="page-outer">
      <div className="page-content">
        <TopBar active="shop" />

        {/* Page header */}
        <div className="shop-header">
          <span className="mono" style={{ fontSize: 10, letterSpacing: "0.22em", color: "var(--violet)", textTransform: "uppercase" }}>
            Inventory
          </span>
          <h1 className="disp shop-h1">
            Gear for<br />Hire
          </h1>
          <p style={{ fontSize: 14, color: "var(--muted)", marginTop: 10, maxWidth: 340 }}>
            Production equipment available for your next event. Reach out to book.
          </p>
        </div>

        {/* Filter chips */}
        <div style={{ display: "flex", gap: 8, padding: "0 20px 24px", flexWrap: "wrap" }}>
          {["All", "Comms", "Lighting", "Audio"].map((cat) => (
            <span
              key={cat}
              className="mono"
              style={{
                fontSize: 11,
                letterSpacing: "0.12em",
                padding: "7px 14px",
                borderRadius: 99,
                border: `1px solid ${cat === "All" ? "var(--violet)" : "var(--line)"}`,
                background: cat === "All" ? "var(--violet)" : "transparent",
                color: cat === "All" ? "#0b0710" : "var(--muted)",
                fontWeight: cat === "All" ? 700 : 400,
              }}
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Product grid */}
        <div className="shop-grid" style={{ padding: "0 20px 80px" }}>
          {shopData.map((item) => (
            <article key={item.slug} className="shop-card">
              {/* Image */}
              <div className="shop-card-img">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                {/* Category badge */}
                <span className="shop-badge mono">
                  {item.category}
                </span>
                {/* Condition pill */}
                <span
                  className="mono"
                  style={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    fontSize: 9,
                    letterSpacing: "0.14em",
                    padding: "4px 10px",
                    borderRadius: 99,
                    background: "rgba(11,7,16,0.6)",
                    backdropFilter: "blur(6px)",
                    border: "1px solid var(--line)",
                    color: "var(--gold)",
                  }}
                >
                  {item.condition}
                </span>
              </div>

              {/* Body */}
              <div className="shop-card-body">
                <div className="mono" style={{ fontSize: 9, letterSpacing: "0.18em", color: "var(--muted-2)", marginBottom: 6 }}>
                  {item.subtitle}
                </div>
                <h2 className="disp" style={{ margin: 0, fontWeight: 800, fontSize: 20, lineHeight: 1.1 }}>
                  {item.name}
                </h2>
                <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 10, lineHeight: 1.6 }}>
                  {item.description}
                </p>

                {/* Tags */}
                <div style={{ display: "flex", gap: 6, marginTop: 12, flexWrap: "wrap" }}>
                  {item.tags.map((t) => (
                    <span
                      key={t}
                      className="mono"
                      style={{
                        fontSize: 9,
                        letterSpacing: "0.1em",
                        padding: "4px 9px",
                        borderRadius: 6,
                        background: "var(--surface)",
                        border: "1px solid var(--line)",
                        color: "var(--muted)",
                        textTransform: "uppercase",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Price + CTA */}
                <div className="shop-card-footer">
                  <div>
                    <div className="mono" style={{ fontSize: 9, letterSpacing: "0.14em", color: "var(--muted-2)" }}>
                      {item.unit.toUpperCase()}
                    </div>
                    <div className="disp" style={{ fontWeight: 800, fontSize: 26, marginTop: 2 }}>
                      {item.priceLabel}
                    </div>
                  </div>
                  <a
                    href={`mailto:raversguilt@gmail.com?subject=Gear hire — ${item.name}&body=Hi, I'd like to book the ${item.name} (${item.unit}) at ${item.priceLabel}.`}
                    className="shop-book-btn"
                  >
                    Book now
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
