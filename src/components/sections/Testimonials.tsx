import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Maria R.",
    location: "Scottsdale",
    rating: 5,
    text: "Our AC died during a 115° week. Desert Cool Air had a tech here in 2 hours and got us cool by dinner. Lifesavers!",
  },
  {
    name: "James T.",
    location: "Mesa",
    rating: 5,
    text: "Fair pricing, no upselling, and they actually showed up on time. Hard to find these days. Highly recommend.",
  },
  {
    name: "The Henderson Family",
    location: "Gilbert",
    rating: 5,
    text: "They've maintained our system for 5 years. Never had a breakdown. Worth every penny of the maintenance plan.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 lg:py-24 bg-secondary">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-2 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground text-lg">
            Don't just take our word for it. Here's what Phoenix homeowners have to say 
            about their experience with Desert Cool Air.
          </p>
        </div>

        {/* Testimonials Grid - 3 columns on desktop */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.name}
              className="bg-card border-border/50 hover:shadow-elevated transition-all duration-300"
            >
              <CardContent className="p-8">
                {/* Quote Icon */}
                <Quote className="h-10 w-10 text-primary/20 mb-4" />

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-accent text-accent"
                    />
                  ))}
                </div>

                {/* Text */}
                <p className="text-foreground mb-6 leading-relaxed text-lg">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="border-t border-border pt-4">
                  <div className="font-semibold text-foreground">
                    — {testimonial.name}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    {testimonial.location}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 bg-card rounded-full px-6 py-3 shadow-soft">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-accent text-accent" />
              ))}
            </div>
            <span className="text-foreground font-semibold">4.9/5</span>
            <span className="text-muted-foreground">from 500+ reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
}
