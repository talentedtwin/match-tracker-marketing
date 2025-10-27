import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function CTA() {
  return (
    <section className="py-20 md:py-32" id="cta">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-primary to-accent p-12 md:p-16 lg:p-20">
          <div className="absolute inset-0 bg-[url('/football-action.png')] bg-center opacity-20" />

          <div className="relative text-center max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bebas-neue text-primary-foreground text-balance">
              READY TO SIMPLIFY MATCH DAY?
            </h2>
            <p className="text-lg md:text-xl text-primary-foreground/90 leading-relaxed">
              Join hundreds of coaches and parents who are already tracking
              their grassroots football matches with MatchTracker.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#">
                <Image src="/GetItOnGooglePlay_Badge_Web_color_English.svg" alt="Get it on Google Play" width={155} height={40} />
              </Link>
              <Link href="#">
                <Image src="/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg" alt="Get it on the App Store" width={120} height={40} />
              </Link>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
