import type { Metadata } from "next";
import { Baloo_2, Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import Grain from "@/components/Grain";

const baloo2 = Baloo_2({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Raversguilt",
    template: "%s — Raversguilt",
  },
  description:
    "The underground dance docket. We track every rave worth showing up to, hand down the verdict, and file it here — case by case, night by night.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${baloo2.variable} ${spaceGrotesk.variable} ${spaceMono.variable}`}
    >
      <body>
        {/* Shared goo filter — defined once, referenced everywhere via url(#goo) */}
        <svg
          width="0"
          height="0"
          style={{ position: "absolute", overflow: "hidden" }}
          aria-hidden="true"
        >
          <defs>
            <filter id="goo" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="b" />
              <feColorMatrix
                in="b"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 26 -12"
              />
            </filter>
          </defs>
        </svg>

        {/* Global grain overlay */}
        <Grain />

        {children}
      </body>
    </html>
  );
}
