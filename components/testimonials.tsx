import { Card } from "@/components/ui/card"
import { Star } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "U10 Coach",
    image: "/female-football-coach-portrait.jpg",
    content:
      "GoalTrack has completely changed how I manage match day. I can focus on coaching while quickly logging results. The parents love getting instant match reports!",
    rating: 5,
  },
  {
    name: "James Thompson",
    role: "Parent & Team Manager",
    image: "/male-parent-at-football-match.jpg",
    content:
      "As a parent helping manage the team, this app is a lifesaver. No more messy notebooks or forgotten stats. Everything is organized and easy to share.",
    rating: 5,
  },
  {
    name: "Emma Rodriguez",
    role: "U12 Coach",
    image: "/female-coach-with-clipboard.jpg",
    content:
      "The player stats feature is brilliant. Kids love seeing their goals and assists tracked. It really motivates them and celebrates their achievements.",
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            LOVED BY COACHES & <span className="text-primary">PARENTS</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Join hundreds of grassroots teams already using GoalTrack every weekend.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 bg-card border-border">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-foreground leading-relaxed mb-6">"{testimonial.content}"</p>
              <div className="flex items-center gap-3">
                <Image
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
