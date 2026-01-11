import { Metadata } from "next";
import React from "react";
import PrivacyPolicy from "../../components/privacy-policy";

export const metadata: Metadata = {
  title: "Privacy Policy | Matchtracker - Grassroots Football Match Tracking",
  description:
    "The easiest way for parents and coaches to track match results, record goalscorers, and celebrate assists in youth football.",
  alternates: {
    canonical: "https://www.matchtracker.co.uk/privacy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen">
      <main>
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
          <PrivacyPolicy />
        </section>
      </main>
    </div>
  );
}
