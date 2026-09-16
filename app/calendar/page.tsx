import type { Metadata } from "next";
import { allEvents } from "@/lib/events";
import TopBar from "@/components/TopBar";
import LiquidField from "@/components/LiquidField";
import CalendarView from "@/components/CalendarView";

export const metadata: Metadata = {
  title: "Calendar",
  description: "Every upcoming rave on the Raversguilt docket — filter by series, browse by month.",
};

export default function CalendarPage() {
  return (
    <main className="page-outer">
      {/* Blob decorations */}
      <LiquidField
        style={{ position: "absolute", top: -50, right: -70, width: 280, height: 280 }}
        fill="#a86bff"
        opacity={0.42}
        circles={[
          { cx: 108, cy: 88, r: 44 },
          { cx: 142, cy: 114, r: 32 },
          { cx: 82, cy: 120, r: 26 },
          { cx: 146, cy: 66, r: 22 },
        ]}
      />
      <LiquidField
        style={{ position: "absolute", top: 70, left: -80, width: 230, height: 230 }}
        fill="#e0aa47"
        opacity={0.2}
        circles={[
          { cx: 94, cy: 96, r: 42 },
          { cx: 126, cy: 120, r: 30 },
          { cx: 72, cy: 126, r: 24 },
        ]}
        delay="-8s"
      />

      <div className="page-content">
        <TopBar variant="inner" title="Calendar" docketLabel="THE DOCKET" active="calendar" />
        {/* CalendarView is a client component that handles month nav + filter state */}
        <CalendarView events={allEvents} />
      </div>
    </main>
  );
}
