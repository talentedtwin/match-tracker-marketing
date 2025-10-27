import { Button } from "@/components/ui/button";
import { MobileMenu } from "@/components/mobile-menu";
import Image from "next/image";
import Link  from "next/link";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Link href="/">
              <Image
                src="/match-tracker.webp"
                alt="Match Tracker"
                width={40}
                height={40}
              />
              </Link>
            </div>
            <Link href="/">
            <span className="font-bebas-neue text-xl md:text-2xl text-foreground">
              MatchTracker
            </span>
            </Link>
          </div>

          {/* <nav className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              How It Works
            </a>
            {/* <a
              href="#testimonials"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Testimonials
            </a> 
          </nav>

          <div className="flex items-center gap-4">
            <Button variant="ghost" className="hidden md:inline-flex">
              Sign In
            </Button>
            <Button className="hidden md:inline-flex">Get Started</Button>
            <MobileMenu />
          </div> */}
        </div>
      </div>
    </header>
  );
}
