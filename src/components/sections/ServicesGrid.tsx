import { Link } from "react-router-dom";
import { Snowflake, Flame, Wrench, Settings, Wind, ThermometerSun } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Snowflake,
    title: "AC Repair",
    description: "Fast, reliable AC repair for all makes and models. Same-day service available.",
    link: "/services#repair",
  },
  {
    icon: Settings,
    title: "AC Installation",
    description: "Expert installation of high-efficiency cooling systems with warranty protection.",
    link: "/services#installation",
  },
  {
    icon: Wrench,
    title: "Maintenance",
    description: "Preventive maintenance plans to keep your system running at peak efficiency.",
    link: "/services#maintenance",
  },
  {
    icon: Flame,
    title: "Heating Services",
    description: "Complete heating solutions for those cool Arizona nights.",
    link: "/services#heating",
  },
  {
    icon: Wind,
    title: "Air Quality",
    description: "Improve your indoor air quality with advanced filtration and purification.",
    link: "/services#air-quality",
  },
  {
    icon: ThermometerSun,
    title: "Smart Thermostats",
    description: "Save energy and enhance comfort with smart thermostat installation.",
    link: "/services#thermostats",
  },
];

export default function ServicesGrid() {
  return (
    <section className="py-20 bg-secondary">
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

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card
              key={service.title}
              className="group bg-card hover:shadow-elevated transition-all duration-300 border-border/50 hover:border-primary/30"
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
                  className="text-primary font-medium text-sm hover:text-accent transition-colors inline-flex items-center gap-1 group"
                >
                  Learn More
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
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
