import type { Metadata } from "next";
import { allGalleryNights } from "@/lib/events";
import TopBar from "@/components/TopBar";
import LiquidField from "@/components/LiquidField";
import GalleryView from "@/components/GalleryView";
import ScribbleUnderline from "@/components/ScribbleUnderline";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Every night Raversguilt filed — photos, clips, and set times from past raves.",
};

export default function GalleryPage() {
  return (
    <main className="page-outer">
      {/* Blob decorations */}
      <LiquidField
        style={{ position: "absolute", top: -50, left: -70, width: 250, height: 250 }}
        fill="#e0aa47"
        opacity={0.2}
        circles={[
          { cx: 96, cy: 94, r: 42 },
          { cx: 128, cy: 120, r: 30 },
          { cx: 72, cy: 124, r: 24 },
        ]}
      />
      <LiquidField
        style={{ position: "absolute", top: 10, right: -70, width: 230, height: 230 }}
        fill="#a86bff"
        opacity={0.34}
        circles={[
          { cx: 104, cy: 90, r: 44 },
          { cx: 138, cy: 116, r: 30 },
          { cx: 78, cy: 120, r: 26 },
          { cx: 140, cy: 68, r: 20 },
        ]}
        delay="-7s"
      />

      <div className="page-content">
        <TopBar variant="inner" title="Gallery" docketLabel="EXHIBITS" active="gallery" />

        {/* Heading */}
        <div style={{ padding: "22px 20px 6px" }}>
          <h1
            className="disp"
            style={{ position: "relative", margin: 0, fontWeight: 800, fontSize: 32, lineHeight: 1 }}
          >
            The evidence
            <ScribbleUnderline width={145} />
          </h1>
          <p style={{ margin: "16px 0 0", fontSize: 14, color: "var(--muted)", maxWidth: 290 }}>
            Every night we filed. Tap an exhibit to open the full recap — photos,
            clips, and the set times.
          </p>
        </div>

        <GalleryView nights={allGalleryNights} />
      </div>
    </main>
  );
}
