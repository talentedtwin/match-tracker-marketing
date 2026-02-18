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
const SHOW_COOKIEBOT_DEBUG = process.env.NODE_ENV !== "production";

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
      <head>
        <Script
          id="Cookiebot"
          src="https://consent.cookiebot.com/uc.js"
          data-cbid={COOKIEBOT_DOMAIN_ID}
          data-blockingmode="auto"
          strategy="beforeInteractive"
        />
      </head>
      <body
        className={`${robotoCondensed.className} ${bebasNeue.variable} ${robotoCondensed.variable}`}
      >
        <Script id="cookiebot-debug" strategy="afterInteractive">
          {`
            setTimeout(function () {
              var hasCookiebot = typeof window !== 'undefined' && !!window.Cookiebot;
              var consent = hasCookiebot ? window.Cookiebot.consent : null;
              console.log('[Cookiebot] loaded:', hasCookiebot, 'consent:', consent);
            }, 0);
          `}
        </Script>
        {SHOW_COOKIEBOT_DEBUG && (
          <>
            <button
              id="cookiebot-reset"
              type="button"
              style={{
                position: "fixed",
                left: 16,
                bottom: 16,
                zIndex: 9999,
                padding: "8px 12px",
                borderRadius: 6,
                border: "1px solid #111",
                background: "#fff",
                color: "#111",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Reset cookie consent
            </button>
            <Script id="cookiebot-reset-handler" strategy="afterInteractive">
              {`
                (function () {
                  var button = document.getElementById('cookiebot-reset');
                  if (!button) return;
                  button.addEventListener('click', function () {
                    var cookiesToClear = ['CookieConsent', 'CookieConsentBulkSetting'];
                    cookiesToClear.forEach(function (name) {
                      document.cookie = name + '=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
                      document.cookie = name + '=; path=/; domain=localhost; expires=Thu, 01 Jan 1970 00:00:00 GMT';
                      document.cookie = name + '=; path=/; domain=127.0.0.1; expires=Thu, 01 Jan 1970 00:00:00 GMT';
                    });
                    if (window.Cookiebot && typeof window.Cookiebot.renew === 'function') {
                      window.Cookiebot.renew();
                      return;
                    }
                    window.location.reload();
                  });
                })();
              `}
            </Script>
          </>
        )}
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
