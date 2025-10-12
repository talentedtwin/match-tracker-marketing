"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function MobileMenu() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <nav className="flex flex-col gap-6 mt-8">
          <a
            href="#features"
            className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setOpen(false)}
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setOpen(false)}
          >
            How It Works
          </a>
          <a
            href="#testimonials"
            className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setOpen(false)}
          >
            Testimonials
          </a>
          <div className="flex flex-col gap-3 pt-4 border-t border-border">
            <Button variant="outline" className="w-full bg-transparent">
              Sign In
            </Button>
            <Button className="w-full">Get Started</Button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
