import { Card } from "@/components/ui/card"
import { Trophy, Users, BarChart3, Clock, Share2, Award } from "lucide-react"

const features = [
  {
    icon: Trophy,
    title: "Track Match Results",
    description: "Record scores, goalscorers, and assists in seconds. Never lose track of your team's performance.",
  },
  {
    icon: Users,
    title: "Team Management",
    description: "Manage multiple teams and players effortlessly. Perfect for coaches handling several age groups.",
  },
  {
    icon: BarChart3,
    title: "Player Statistics",
    description: "Automatic stats tracking for every player. See who's scoring, assisting, and improving.",
  },
  {
    icon: Clock,
    title: "Quick Entry",
    description: "Log match data in under 2 minutes. Designed for busy parents and coaches on match day.",
  },
  {
    icon: Share2,
    title: "Share with Parents",
    description: "Instantly share match reports with parents. Keep everyone informed and engaged.",
  },
  {
    icon: Award,
    title: "Celebrate Achievements",
    description: "Highlight milestones and achievements. Make every goal and assist count.",
  },
]

export function Features() {
  return (
    <section id="features" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            EVERYTHING YOU NEED FOR <span className="text-primary">MATCH DAY</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Built specifically for grassroots football. No complicated features, just what you need to track and
            celebrate your team.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow bg-card border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
