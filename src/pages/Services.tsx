import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Snowflake,
  Flame,
  Wrench,
  Settings,
  Wind,
  ThermometerSun,
  Check,
  Phone,
} from "lucide-react";
import CTABanner from "@/components/sections/CTABanner";

const services = [
  {
    id: "repair",
    icon: Snowflake,
    title: "AC Repair",
    description:
      "Is your AC blowing warm air or making strange noises? Our expert technicians diagnose and repair all makes and models quickly and efficiently.",
    features: [
      "Same-day service available",
      "All major brands serviced",
      "Upfront pricing, no surprises",
      "1-year labor warranty",
    ],
  },
  {
    id: "installation",
    icon: Settings,
    title: "AC Installation",
    description:
      "Upgrade to a new, energy-efficient cooling system. We'll help you choose the right size and model for your home and budget.",
    features: [
      "Free in-home consultation",
      "Energy-efficient options",
      "Professional installation",
      "Manufacturer warranties",
    ],
  },
  {
    id: "maintenance",
    icon: Wrench,
    title: "Preventive Maintenance",
    description:
      "Keep your HVAC system running at peak performance with regular maintenance. Catch small problems before they become expensive repairs.",
    features: [
      "Bi-annual tune-ups",
      "Priority scheduling",
      "15% discount on repairs",
      "Extended equipment life",
    ],
  },
  {
    id: "heating",
    icon: Flame,
    title: "Heating Services",
    description:
      "From heat pumps to furnaces, we keep you warm on those cool Arizona nights. Repair, maintenance, and installation available.",
    features: [
      "All heating systems serviced",
      "Energy efficiency upgrades",
      "Carbon monoxide testing",
      "24/7 emergency service",
    ],
  },
  {
    id: "air-quality",
    icon: Wind,
    title: "Indoor Air Quality",
    description:
      "Breathe easier with our air quality solutions. We offer filtration, purification, and humidity control for healthier indoor air.",
    features: [
      "Air quality testing",
      "HEPA filtration systems",
      "UV air purifiers",
      "Whole-home humidifiers",
    ],
  },
  {
    id: "thermostats",
    icon: ThermometerSun,
    title: "Smart Thermostats",
    description:
      "Control your comfort and save energy with a smart thermostat. We install and configure all major brands.",
    features: [
      "Nest, Ecobee, Honeywell",
      "Remote control via app",
      "Energy savings reports",
      "Professional setup",
    ],
  },
];

export default function Services() {
  return (
    <>
      <Helmet>
        <title>HVAC Services Phoenix | AC Repair & Installation | Desert Cool Air</title>
        <meta
          name="description"
          content="Comprehensive HVAC services in Phoenix: AC repair, installation, maintenance, heating, and indoor air quality. Licensed technicians, same-day service available."
        />
        <link rel="canonical" href="https://desertcoolair.com/services" />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-hero py-20">
        <div className="container">
          <div className="max-w-3xl">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">
              Our Services
            </span>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mt-2 mb-6">
              Complete HVAC Solutions for Phoenix Homes
            </h1>
            <p className="text-primary-foreground/80 text-lg mb-8">
              From emergency AC repairs to complete system installations, Desert Cool Air 
              provides comprehensive heating and cooling services for residential and 
              commercial properties throughout the Phoenix metro area.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" asChild>
                <Link to="/contact">Get Free Estimate</Link>
              </Button>
              <Button variant="hero-outline" size="lg" asChild>
                <a href="tel:6025552665">
                  <Phone className="h-5 w-5" />
                  (602) 555-2665
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="space-y-16">
            {services.map((service, index) => (
              <div
                key={service.id}
                id={service.id}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="w-16 h-16 rounded-xl bg-gradient-hero flex items-center justify-center mb-6">
                    <service.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
                    {service.title}
                  </h2>
                  <p className="text-muted-foreground text-lg mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-brand-success/20 flex items-center justify-center flex-shrink-0">
                          <Check className="h-3 w-3 text-brand-success" />
                        </div>
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button variant="accent" asChild>
                    <Link to="/contact">Schedule Service</Link>
                  </Button>
                </div>
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <Card className="bg-secondary border-0 overflow-hidden">
                    <CardContent className="p-0">
                      <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                        <service.icon className="h-24 w-24 text-primary/30" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
