import { Card } from "@/components/ui/card"

const steps = [
  {
    number: "01",
    title: "Create Your Team",
    description: "Add your team name and player roster in minutes. Import from a spreadsheet or add manually.",
    image: "/mobile-app-showing-team-roster-with-player-names.jpg",
  },
  {
    number: "02",
    title: "Record Match Data",
    description: "During or after the match, quickly log goals, assists, and the final score. Simple tap interface.",
    image: "/mobile-app-showing-match-score-entry-interface.jpg",
  },
  {
    number: "03",
    title: "View Stats & Share",
    description: "Instantly see player stats, team performance, and share match reports with parents via link or PDF.",
    image: "/mobile-app-showing-player-statistics-and-match-rep.jpg",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            HOW IT <span className="text-primary">WORKS</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Three simple steps to transform how you track grassroots football matches.
          </p>
        </div>

        <div className="space-y-16 lg:space-y-24">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className={`space-y-6 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                <div className="inline-block">
                  <span className="text-6xl md:text-7xl font-bold text-primary/20">{step.number}</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-foreground">{step.title}</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                <Card className="overflow-hidden border-border shadow-xl">
                  <img src={step.image || "/placeholder.svg"} alt={step.title} className="w-full h-auto" />
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
