import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Award, Users, Clock, Shield, Target, Heart } from "lucide-react";
import CTABanner from "@/components/sections/CTABanner";

const values = [
  {
    icon: Shield,
    title: "Integrity",
    description:
      "We provide honest assessments and fair pricing. No upselling, no unnecessary repairs.",
  },
  {
    icon: Target,
    title: "Excellence",
    description:
      "We hire the best technicians and invest in ongoing training to deliver superior service.",
  },
  {
    icon: Heart,
    title: "Customer First",
    description:
      "Your comfort and satisfaction drive everything we do. We're not happy until you are.",
  },
];

const team = [
  {
    name: "Mike Johnson",
    role: "Founder & CEO",
    bio: "20+ years in HVAC. Started Desert Cool Air in 2005 with a single truck and a commitment to honest service.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
  },
  {
    name: "Sarah Martinez",
    role: "Operations Manager",
    bio: "Ensures every job runs smoothly and every customer receives the attention they deserve.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face",
  },
  {
    name: "David Chen",
    role: "Lead Technician",
    bio: "NATE-certified with 15 years experience. Specializes in complex diagnostics and installations.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
  },
];

const milestones = [
  { year: "2005", event: "Desert Cool Air founded in Phoenix" },
  { year: "2010", event: "Expanded to 10 service vehicles" },
  { year: "2015", event: "Reached 5,000 customers served" },
  { year: "2020", event: "Launched 24/7 emergency services" },
  { year: "2024", event: "Celebrating 15,000+ happy customers" },
];

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Desert Cool Air | Phoenix HVAC Company Since 2005</title>
        <meta
          name="description"
          content="Learn about Desert Cool Air, Phoenix's trusted HVAC company since 2005. Meet our team, discover our values, and see why 15,000+ customers trust us."
        />
        <link rel="canonical" href="https://desertcoolair.com/about" />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-hero py-20">
        <div className="container">
          <div className="max-w-3xl">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">
              About Us
            </span>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mt-2 mb-6">
              Keeping Phoenix Cool Since 2005
            </h1>
            <p className="text-primary-foreground/80 text-lg">
              What started as a one-man operation has grown into one of Phoenix's 
              most trusted HVAC companies. But our commitment to honest, quality 
              service has never changed.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-heading font-bold text-foreground mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Desert Cool Air was founded by Mike Johnson in 2005 with a simple 
                  mission: provide honest HVAC service at fair prices. After years 
                  working for larger companies, Mike saw too many customers being 
                  overcharged or sold services they didn't need.
                </p>
                <p>
                  He started Desert Cool Air with one truck, a toolbox, and a 
                  commitment to treating every customer like a neighbor. That 
                  philosophy resonated with Phoenix homeowners, and word spread 
                  quickly.
                </p>
                <p>
                  Today, we have a team of skilled technicians, a fleet of fully-stocked 
                  service vehicles, and have served over 15,000 homes across the 
                  Phoenix metro area. But we've never forgotten our roots—every 
                  customer still gets the same honest, personal service that built 
                  our reputation.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-secondary flex items-center justify-center overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&h=600&fit=crop"
                  alt="HVAC technician at work"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Stats Overlay */}
              <div className="absolute -bottom-8 -left-8 bg-card p-6 rounded-xl shadow-elevated">
                <div className="text-3xl font-heading font-bold text-primary">20+</div>
                <div className="text-muted-foreground text-sm">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-secondary">
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

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-card rounded-xl p-8 text-center shadow-soft"
              >
                <div className="w-16 h-16 rounded-xl bg-gradient-hero flex items-center justify-center mx-auto mb-6">
                  <value.icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              Our Journey
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border" />
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={`relative flex items-center gap-8 mb-8 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div
                    className={`flex-1 ${
                      index % 2 === 0 ? "md:text-right" : "md:text-left"
                    } pl-12 md:pl-0`}
                  >
                    <div className="text-2xl font-heading font-bold text-primary mb-1">
                      {milestone.year}
                    </div>
                    <p className="text-muted-foreground">{milestone.event}</p>
                  </div>
                  <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background" />
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-secondary">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              Meet Our Team
            </h2>
            <p className="text-muted-foreground text-lg">
              Our success is built on the skills and dedication of our team members.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-card rounded-xl overflow-hidden shadow-soft group"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-heading font-bold text-foreground mb-1">
                    {member.name}
                  </h3>
                  <p className="text-accent font-medium text-sm mb-3">
                    {member.role}
                  </p>
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
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
