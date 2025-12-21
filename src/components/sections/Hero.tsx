import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/hero-desert.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-black/45" />
      </div>

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center lg:text-left lg:mx-0">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-primary-foreground/20 animate-fade-in-up">
            <span className="w-2 h-2 bg-brand-success rounded-full animate-pulse" />
            <span className="text-primary-foreground text-sm font-medium">
              Serving the Valley Since 2010 • Licensed • Bonded • Insured
            </span>
          </div>

          {/* Heading */}
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-extrabold text-primary-foreground leading-tight mb-6 animate-fade-in-up drop-shadow-lg" 
            style={{ animationDelay: "0.1s" }}
          >
            Phoenix's Most Trusted{" "}
            <span className="text-accent">HVAC Experts</span>
          </h1>

          {/* Subhead */}
          <p 
            className="text-lg md:text-xl lg:text-2xl text-primary-foreground/90 mb-4 leading-relaxed animate-fade-in-up font-medium drop-shadow-md" 
            style={{ animationDelay: "0.2s" }}
          >
            24/7 Emergency Service • Same-Day Appointments • 100% Satisfaction Guaranteed
          </p>

          {/* Description */}
          <p 
            className="text-base md:text-lg text-primary-foreground/70 mb-10 leading-relaxed animate-fade-in-up max-w-2xl" 
            style={{ animationDelay: "0.25s" }}
          >
            Beat the Arizona heat with fast, reliable AC repair and installation. 
            Expert technicians, upfront pricing, and service you can count on.
          </p>

          {/* CTA Buttons */}
          <div 
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8 animate-fade-in-up" 
            style={{ animationDelay: "0.3s" }}
          >
            <Button variant="hero" size="xl" asChild>
              <Link to="/contact">Schedule Your Free Estimate</Link>
            </Button>
            <Button variant="hero-outline" size="xl" asChild>
              <a href="tel:6025552665" className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                (602) 555-2665
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-8 w-8 text-primary-foreground/60" />
      </div>
    </section>
  );
}
