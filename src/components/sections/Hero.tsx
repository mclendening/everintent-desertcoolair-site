import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, Shield, Clock, Award } from "lucide-react";

const trustBadges = [
  { icon: Shield, text: "Licensed & Insured" },
  { icon: Clock, text: "24/7 Emergency" },
  { icon: Award, text: "20+ Years Experience" },
];

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1631545806609-9e040a44b3b1?q=80&w=2070&auto=format&fit=crop')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/95 via-brand-navy/80 to-brand-navy/40" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />

      <div className="container relative z-10">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-primary-foreground/20 animate-fade-in-up">
            <span className="w-2 h-2 bg-brand-success rounded-full animate-pulse" />
            <span className="text-primary-foreground text-sm font-medium">
              Serving Phoenix Since 2005
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-primary-foreground leading-tight mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Phoenix's Most Trusted{" "}
            <span className="text-accent">HVAC Experts</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Beat the Arizona heat with fast, reliable AC repair and installation. 
            Expert technicians, upfront pricing, and 100% satisfaction guaranteed.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <Button variant="hero" size="xl" asChild>
              <Link to="/contact">Get Free Estimate</Link>
            </Button>
            <Button variant="hero-outline" size="xl" asChild>
              <a href="tel:6025552665" className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                (602) 555-2665
              </a>
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-6 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            {trustBadges.map((badge) => (
              <div
                key={badge.text}
                className="flex items-center gap-2 text-primary-foreground/80"
              >
                <badge.icon className="h-5 w-5 text-accent" />
                <span className="text-sm font-medium">{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
