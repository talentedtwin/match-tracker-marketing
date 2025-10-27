"use client";

import React from "react";
import { Shield, ArrowLeft, Home } from "lucide-react";
import Link from "next/link";
import PrivacyPolicy from "../../components/privacy-policy";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen">
      <main>
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                <h1 className="text-2xl font-bold text-gray-900">
                    Privacy Policy
                </h1>
            </div>
            <PrivacyPolicy />
        </section>
       
        
      </main>
    </div>
  );
}