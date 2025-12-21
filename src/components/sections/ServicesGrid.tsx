import { Link } from "react-router-dom";
import { Wrench, PlusCircle, Flame, ShieldCheck, Clock, Wind } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Wrench,
    title: "AC Repair",
    description: "Fast diagnosis and repair for all AC brands. Most repairs completed same-day.",
    link: "/services#repair",
  },
  {
    icon: PlusCircle,
    title: "AC Installation",
    description: "Energy-efficient systems professionally installed. Free in-home estimates.",
    link: "/services#installation",
  },
  {
    icon: Flame,
    title: "Heating Services",
    description: "Furnace repair, heat pump service, and heating system installation.",
    link: "/services#heating",
  },
  {
    icon: ShieldCheck,
    title: "Maintenance Plans",
    description: "Preventive maintenance to extend equipment life and prevent breakdowns.",
    link: "/services#maintenance",
  },
  {
    icon: Clock,
    title: "Emergency Service",
    description: "24/7 emergency repairs. We're here when you need us most.",
    link: "/services#emergency",
  },
  {
    icon: Wind,
    title: "Indoor Air Quality",
    description: "Air purifiers, filtration systems, and duct cleaning for healthier air.",
    link: "/services#air-quality",
  },
];

export default function ServicesGrid() {
  return (
    <section className="py-20 lg:py-24 bg-secondary">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-2 mb-4">
            Complete HVAC Solutions
          </h2>
          <p className="text-muted-foreground text-lg">
            From emergency repairs to full system installations, we've got you covered 
            with comprehensive heating and cooling services.
          </p>
        </div>

        {/* Services Grid - 3x2 desktop, 2x3 tablet, 1x6 mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card
              key={service.title}
              className="group bg-card hover:shadow-elevated transition-all duration-300 border-border/50 hover:border-primary/30 hover:-translate-y-1"
            >
              <CardHeader>
                <div className="w-14 h-14 rounded-xl bg-gradient-hero flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl font-heading group-hover:text-primary transition-colors">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <Link
                  to={service.link}
                  className="text-primary font-medium text-sm hover:text-accent transition-colors inline-flex items-center gap-1 group/link"
                >
                  Learn More
                  <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button variant="accent" size="lg" asChild>
            <Link to="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
