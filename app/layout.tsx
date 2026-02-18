import type React from "react";
import type { Metadata } from "next";
import { Bebas_Neue, Roboto_Condensed } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import "./globals.css";
import { Suspense } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BackToTop } from "@/components/back-to-top";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
});

const robotoCondensed = Roboto_Condensed({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-roboto-condensed",
});

const GA_MEASUREMENT_ID = "G-GDEW9QXPGL";
const COOKIEBOT_DOMAIN_ID = "a120589d-903d-4ce8-9f4b-bd2d73643230";

export const metadata: Metadata = {
  title: "Matchtracker - Grassroots Football Match Tracking",
  description:
    "The easiest way for parents and coaches to track match results, record goalscorers, and celebrate assists in youth football.",
  alternates: {
    canonical: "https://www.matchtracker.co.uk",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${robotoCondensed.className} ${bebasNeue.variable} ${robotoCondensed.variable}`}
      >
        <Script
          id="Cookiebot"
          src="https://consent.cookiebot.com/uc.js"
          data-cbid={COOKIEBOT_DOMAIN_ID}
          data-blockingmode="auto"
          strategy="afterInteractive"
        />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
          data-cookieconsent="statistics"
        />
        <Script
          id="ga-gtag"
          strategy="afterInteractive"
          data-cookieconsent="statistics"
        >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        <Suspense fallback={null}>
          <Header />
          {children}
          <Footer />
        </Suspense>
        <BackToTop />
        <Analytics />
      </body>
    </html>
  );
}
