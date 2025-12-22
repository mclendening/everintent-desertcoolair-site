import { Head } from "vite-react-ssg";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Wrench,
  PlusCircle,
  Flame,
  ShieldCheck,
  Clock,
  Wind,
  Check,
  Phone,
  AlertTriangle,
} from "lucide-react";
import CTABanner from "@/components/sections/CTABanner";

const services = [
  {
    id: "repair",
    icon: Wrench,
    title: "Air Conditioning Repair",
    description:
      "When your AC fails in the Arizona heat, you need fast, reliable service. Our certified technicians diagnose and repair all brands and models, with most repairs completed the same day you call.",
    features: [
      "Refrigerant leaks and recharging",
      "Compressor and fan motor issues",
      "Thermostat problems",
      "Electrical component failures",
      "Frozen evaporator coils",
      "Drainage issues",
    ],
    cta: "Schedule AC Repair",
    image: "/images/service-ac-repair.jpg",
  },
  {
    id: "installation",
    icon: PlusCircle,
    title: "AC Installation & Replacement",
    description:
      "Whether you're replacing an aging system or installing AC in a new home, we help you choose the right system for your space and budget. We install all major brands including Trane, Carrier, Lennox, and Goodman.",
    features: [
      "Free in-home estimates",
      "Energy-efficient options (up to 21 SEER)",
      "Financing available",
      "10-year parts warranty",
      "Proper sizing for maximum efficiency",
    ],
    cta: "Get Installation Quote",
    image: "/images/service-ac-installation.jpg",
  },
  {
    id: "heating",
    icon: Flame,
    title: "Heating Services",
    description:
      "Phoenix winters can get cold. Our heating experts service and install furnaces, heat pumps, and dual-fuel systems to keep you comfortable year-round.",
    features: [
      "Furnace repair and installation",
      "Heat pump service",
      "Gas and electric systems",
      "Pilot light and ignition issues",
      "Ductwork inspection",
    ],
    cta: "Schedule Heating Service",
    image: "/images/service-heating.jpg",
  },
  {
    id: "maintenance",
    icon: ShieldCheck,
    title: "Preventive Maintenance Plans",
    description:
      "The best repair is the one you never need. Our maintenance plans keep your system running efficiently, extend equipment life, and catch small problems before they become expensive emergencies.",
    features: [
      "Complete system inspection",
      "Filter replacement",
      "Coil cleaning",
      "Refrigerant check",
      "Electrical testing",
      "Thermostat calibration",
      "Priority scheduling",
      "15% discount on repairs",
    ],
    cta: "Join Maintenance Plan",
    image: "/images/service-maintenance.jpg",
  },
  {
    id: "emergency",
    icon: Clock,
    title: "24/7 Emergency Service",
    description:
      "AC emergencies don't wait for business hours, and neither do we. Our emergency team is available around the clock to restore your comfort as quickly as possible.",
    features: [
      "Answer every call, day or night",
      "Fast response times",
      "Upfront emergency pricing",
      "Fully stocked service vehicles",
      "Certified technicians",
    ],
    cta: "Call Emergency Line",
    image: "/images/service-emergency.jpg",
  },
  {
    id: "air-quality",
    icon: Wind,
    title: "Indoor Air Quality",
    description:
      "The air inside your home can be more polluted than outdoor air. We offer solutions to remove allergens, dust, and pollutants so your family breathes easier.",
    features: [
      "HEPA air purifiers",
      "UV germicidal lights",
      "Whole-home humidifiers/dehumidifiers",
      "Duct cleaning",
      "Air quality testing",
    ],
    cta: "Improve Your Air Quality",
    image: "/images/service-air-quality.jpg",
  },
];

export default function Services() {
  return (
    <>
      <Head>
        <title>HVAC Services in Phoenix | AC Repair, Installation, Heating | Desert Cool Air</title>
        <meta name="description" content="Complete HVAC services for Phoenix homes and businesses. AC repair, installation, heating, maintenance, and indoor air quality. Licensed and insured." />
        <link rel="canonical" href="https://desertcoolair.com/services" />
        <meta property="og:title" content="HVAC Services in Phoenix | AC Repair, Installation, Heating | Desert Cool Air" />
        <meta property="og:description" content="Complete HVAC services for Phoenix homes and businesses. AC repair, installation, heating, maintenance, and indoor air quality." />
        <meta property="og:url" content="https://desertcoolair.com/services" />
        <meta name="twitter:title" content="HVAC Services in Phoenix | AC Repair, Installation, Heating | Desert Cool Air" />
        <meta name="twitter:description" content="Complete HVAC services for Phoenix homes and businesses. AC repair, installation, heating, maintenance." />
      </Head>

      {/* Hero Section */}
      <section 
        className="relative h-80 flex items-center overflow-hidden"
        style={{
          backgroundImage: `url('/images/hero-services-trucks.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/95 via-brand-navy/80 to-brand-navy/60" />
        <div className="container relative z-10">
          <div className="max-w-3xl pt-8 md:pt-0">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">
              Our Services
            </span>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mt-2 mb-4">
              Our HVAC Services
            </h1>
            <p className="text-primary-foreground/80 text-lg">
              Comprehensive heating and cooling solutions for Phoenix homes and businesses
            </p>
          </div>
        </div>
      </section>

      {/* Services List - Alternating Layout */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="space-y-24">
            {services.map((service, index) => (
              <div
                key={service.id}
                id={service.id}
                className="scroll-mt-24"
              >
                <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
                  index % 2 === 1 ? "" : ""
                }`}>
                  {/* Content */}
                  <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                    <div className="w-16 h-16 rounded-xl bg-gradient-hero flex items-center justify-center mb-6">
                      <service.icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                      {service.title}
                    </h2>
                    <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    
                    <div className="mb-8">
                      <h3 className="font-heading font-semibold text-foreground mb-4">
                        {service.id === "repair" ? "What We Fix:" : 
                         service.id === "installation" ? "Benefits:" :
                         service.id === "maintenance" ? "Maintenance Includes:" :
                         service.id === "emergency" ? "Our Promise:" :
                         "Services Include:"}
                      </h3>
                      <ul className="grid sm:grid-cols-2 gap-3">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-3">
                            <div className="w-5 h-5 rounded-full bg-brand-success/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Check className="h-3 w-3 text-brand-success" />
                            </div>
                            <span className="text-foreground text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Emergency Call Banner - only for emergency service */}
                    {service.id === "emergency" ? (
                      <a
                        href="tel:6026092300"
                        className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-accent/10 border border-accent/20 hover:bg-accent/15 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                            <AlertTriangle className="h-5 w-5 text-accent" />
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">AC Emergency?</p>
                            <p className="text-sm text-accent">We answer 24/7 — don't wait!</p>
                          </div>
                        </div>
                        <Button variant="accent" size="lg" className="w-full sm:w-auto">
                          <Phone className="h-4 w-4" />
                          Call Now: (602) 609-2300
                        </Button>
                      </a>
                    ) : (
                      <Button variant="accent" size="lg" asChild>
                        <Link to="/contact">{service.cta}</Link>
                      </Button>
                    )}
                  </div>
                  
                  {/* Image */}
                  <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                    <div className="rounded-2xl overflow-hidden shadow-elevated">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full aspect-[4/3] object-cover"
                      />
                    </div>
                  </div>
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
