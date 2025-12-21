import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Maria Rodriguez",
    location: "Scottsdale, AZ",
    rating: 5,
    text: "Our AC went out on the hottest day of the year. Desert Cool Air had a tech at our house within 2 hours and fixed it the same day. Lifesavers!",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "James Thompson",
    location: "Phoenix, AZ",
    rating: 5,
    text: "Very professional from start to finish. The quote was accurate, the installation was quick, and our new system is already saving us money on electric bills.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Sarah Chen",
    location: "Tempe, AZ",
    rating: 5,
    text: "I've used Desert Cool Air for years now. Their maintenance plan keeps our unit running perfectly, and whenever we need service, they're always prompt and fair.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-secondary">
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

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.name}
              className="bg-card border-border/50 hover:shadow-elevated transition-shadow duration-300"
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
                <p className="text-foreground mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-foreground">
                      {testimonial.name}
                    </div>
                    <div className="text-muted-foreground text-sm">
                      {testimonial.location}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 bg-card rounded-full px-6 py-3 shadow-soft">
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
