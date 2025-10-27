import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { HowItWorks } from "@/components/how-it-works";
import { CTA } from "@/components/cta";

export default function Home() {
  return (
    <div className="min-h-screen">
      
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <CTA />
      </main>
      
    </div>
  );
}
