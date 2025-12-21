import { Head } from "vite-react-ssg";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Target, Heart, Users, Award, CheckCircle } from "lucide-react";
import CTABanner from "@/components/sections/CTABanner";

const values = [
  {
    icon: Shield,
    title: "Integrity",
    description: "We do the right thing, even when no one's watching",
  },
  {
    icon: Target,
    title: "Excellence",
    description: "Good enough isn't in our vocabulary",
  },
  {
    icon: Users,
    title: "Community",
    description: "Phoenix is our home. We give back.",
  },
  {
    icon: Heart,
    title: "Reliability",
    description: "We show up. On time. Every time.",
  },
];

const certifications = [
  "NATE Certified Technicians",
  "EPA 608 Universal Certified",
  "BBB Accredited Business (A+ Rating)",
  "Arizona ROC Licensed",
  "Factory Authorized: Trane, Carrier, Lennox",
];

const serviceAreas = [
  "Phoenix",
  "Scottsdale",
  "Mesa",
  "Tempe",
  "Chandler",
  "Gilbert",
  "Glendale",
  "Peoria",
  "Surprise",
  "Avondale",
  "Goodyear",
  "Buckeye",
];

export default function About() {
  return (
    <>
      <Head>
        <title>About Desert Cool Air | Phoenix HVAC Company Since 2010</title>
        <meta
          name="description"
          content="Family-owned Phoenix HVAC company serving the Valley since 2010. NATE certified technicians, BBB accredited, ROC licensed. Meet our team."
        />
        <link rel="canonical" href="https://desertcoolair.com/about" />
      </Head>

      {/* Hero Section */}
      <section 
        className="relative h-80 flex items-center overflow-hidden"
        style={{
          backgroundImage: `url('/images/hero-about-team.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/95 via-brand-navy/80 to-brand-navy/60" />
        <div className="container relative z-10">
          <div className="max-w-3xl pt-8 md:pt-0">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">
              About Us
            </span>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mt-2 mb-4">
              About Desert Cool Air
            </h1>
            <p className="text-primary-foreground/80 text-lg">
              Your neighbors keeping Phoenix comfortable since 2010
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 lg:py-24 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                <p>
                  Desert Cool Air was founded with a simple mission: provide honest, reliable HVAC service to Phoenix families and businesses. What started as a one-truck operation has grown into a team of certified technicians serving the entire Valley.
                </p>
                <p>
                  We're not a franchise or a big corporate chain. We're your neighbors who understand what it means to lose AC during a 115° summer day. That's why we answer our phones 24/7, show up when we say we will, and charge fair prices with no surprises.
                </p>
                <p>
                  Every technician on our team is NATE certified, drug tested, and background checked. When we send someone to your home, we send someone we'd trust in our own.
                </p>
              </div>
              <Button variant="accent" size="lg" className="mt-8" asChild>
                <Link to="/contact">Get a Free Estimate</Link>
              </Button>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-elevated">
                <img
                  src="/images/comfortable-home.jpg"
                  alt="Comfortable Arizona home"
                  className="w-full aspect-square object-cover"
                />
              </div>
              {/* Stats Overlay */}
              <div className="absolute -bottom-8 -left-8 bg-card p-6 rounded-xl shadow-elevated border border-border">
                <div className="text-4xl font-heading font-bold text-primary">15+</div>
                <div className="text-muted-foreground">Years Serving Phoenix</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 lg:py-24 bg-secondary">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              Our Values
            </h2>
            <p className="text-muted-foreground text-lg">
              These principles guide everything we do, from how we train our 
              technicians to how we interact with customers.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-card rounded-xl p-8 text-center shadow-soft hover:shadow-elevated transition-shadow duration-300"
              >
                <div className="w-16 h-16 rounded-xl bg-gradient-hero flex items-center justify-center mx-auto mb-6">
                  <value.icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-20 lg:py-24 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
                Certifications & Credentials
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                We invest in training and certifications so you can trust that your HVAC system is in expert hands.
              </p>
              <ul className="space-y-4">
                {certifications.map((cert) => (
                  <li key={cert} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-brand-success/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-brand-success" />
                    </div>
                    <span className="text-foreground font-medium">{cert}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-hero rounded-2xl p-10 text-primary-foreground">
              <Award className="h-16 w-16 text-accent mb-6" />
              <h3 className="text-2xl font-heading font-bold mb-4">
                Why Certifications Matter
              </h3>
              <p className="text-primary-foreground/80 leading-relaxed">
                Certified technicians have proven their expertise through rigorous testing. They understand the latest technologies, safety protocols, and industry best practices. When you choose Desert Cool Air, you're choosing technicians who take their craft seriously.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Area Section */}
      <section className="py-20 lg:py-24 bg-secondary">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              Proudly Serving the Phoenix Metro
            </h2>
            <p className="text-muted-foreground text-lg">
              We service homes and businesses throughout the Valley.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {serviceAreas.map((area) => (
              <span
                key={area}
                className="bg-card px-5 py-2.5 rounded-full text-foreground font-medium shadow-soft border border-border/50"
              >
                {area}
              </span>
            ))}
          </div>

          <p className="text-center text-muted-foreground mt-8">
            Don't see your area? <Link to="/contact" className="text-primary hover:text-accent transition-colors font-medium">Contact us</Link> — we may still be able to help!
          </p>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
