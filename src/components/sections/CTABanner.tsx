import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, ArrowRight } from "lucide-react";

export default function CTABanner() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary to-brand-navy relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-foreground/10 rounded-full blur-3xl" />

      <div className="container relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary-foreground mb-4">
              Don't Sweat It — We've Got You Covered
            </h2>
            <p className="text-primary-foreground/80 text-lg">
              Schedule your free estimate today and stay comfortable year-round.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="hero-outline"
              size="xl"
              asChild
            >
              <a href="tel:6026092300" className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Call (602) 609-2300
              </a>
            </Button>
            <Button
              variant="hero"
              size="xl"
              asChild
              className="group"
            >
              <Link to="/contact">
                Request Estimate
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
