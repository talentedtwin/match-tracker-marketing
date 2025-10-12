import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTA() {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-accent p-12 md:p-16 lg:p-20">
          <div className="absolute inset-0 bg-[url('/abstract-football-pattern.png')] opacity-10" />

          <div className="relative text-center max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground text-balance">
              READY TO SIMPLIFY MATCH DAY?
            </h2>
            <p className="text-lg md:text-xl text-primary-foreground/90 leading-relaxed">
              Join hundreds of coaches and parents who are already tracking their grassroots football matches with
              GoalTrack. Free to start, no credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-base h-12 px-8">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-base h-12 px-8 bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
              >
                Schedule a Demo
              </Button>
            </div>
            <p className="text-sm text-primary-foreground/70">
              Free forever for single teams • Premium plans available for clubs
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
