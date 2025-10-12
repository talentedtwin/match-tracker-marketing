export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold">GT</span>
              </div>
              <span className="font-bold text-lg">GoalTrack</span>
            </div>
            <p className="text-secondary-foreground/70 text-sm leading-relaxed">
              Making grassroots football tracking simple for coaches and parents
              everywhere.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-secondary-foreground/70 hover:text-secondary-foreground transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-secondary-foreground/70 hover:text-secondary-foreground transition-colors"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-secondary-foreground/70 hover:text-secondary-foreground transition-colors"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-secondary-foreground/70 hover:text-secondary-foreground transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-secondary-foreground/70 hover:text-secondary-foreground transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-secondary-foreground/70 hover:text-secondary-foreground transition-colors"
                >
                  Privacy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-secondary-foreground/70 hover:text-secondary-foreground transition-colors"
                >
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-secondary-foreground/10 text-center text-sm text-secondary-foreground/70">
          <p>© 2025 Match Tracker. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
