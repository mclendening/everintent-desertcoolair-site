import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, ArrowRight } from "lucide-react";

export default function CTABanner() {
  return (
    <section className="py-16 bg-gradient-hero relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-foreground/10 rounded-full blur-3xl" />

      <div className="container relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground mb-4">
              Ready to Beat the Heat?
            </h2>
            <p className="text-primary-foreground/80 text-lg max-w-xl">
              Get a free, no-obligation estimate today. Our team is standing by 
              to help with all your HVAC needs.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="hero"
              size="xl"
              asChild
              className="group"
            >
              <Link to="/contact">
                Get Free Estimate
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              variant="hero-outline"
              size="xl"
              asChild
            >
              <a href="tel:6025552665" className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                (602) 555-2665
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
