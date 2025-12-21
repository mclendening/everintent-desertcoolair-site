import { Check, Users, Clock, DollarSign, Shield, ThumbsUp, Headphones } from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "Same-Day Service",
    description: "We know AC emergencies can't wait. Most calls are addressed the same day.",
  },
  {
    icon: DollarSign,
    title: "Upfront Pricing",
    description: "No surprises. Get a clear quote before any work begins.",
  },
  {
    icon: Shield,
    title: "Licensed & Insured",
    description: "ROC Licensed, fully insured, and background-checked technicians.",
  },
  {
    icon: Users,
    title: "Experienced Team",
    description: "20+ years serving Phoenix. Our techs average 10 years experience each.",
  },
  {
    icon: ThumbsUp,
    title: "Satisfaction Guaranteed",
    description: "Not happy? We'll make it right or your money back.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Round-the-clock emergency service and customer support.",
  },
];

const stats = [
  { value: "15,000+", label: "Homes Served" },
  { value: "4.9/5", label: "Customer Rating" },
  { value: "24/7", label: "Emergency Service" },
  { value: "100%", label: "Satisfaction" },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-2 mb-6">
              The Phoenix HVAC Team You Can Trust
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              When your AC breaks down in the Arizona heat, you need a team that responds fast, 
              works efficiently, and stands behind their work. That's Desert Cool Air.
            </p>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature) => (
                <div key={feature.title} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Stats Card */}
          <div className="relative">
            <div className="bg-gradient-hero rounded-2xl p-8 md:p-12 text-primary-foreground shadow-elevated">
              <h3 className="font-heading font-bold text-2xl mb-8">
                By The Numbers
              </h3>
              <div className="grid grid-cols-2 gap-8">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="text-3xl md:text-4xl font-heading font-extrabold text-accent mb-2">
                      {stat.value}
                    </div>
                    <div className="text-primary-foreground/70 text-sm">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Checklist */}
              <div className="mt-10 pt-8 border-t border-primary-foreground/20">
                <h4 className="font-semibold mb-4">Every Service Includes:</h4>
                <ul className="space-y-3">
                  {[
                    "Free diagnostic with repair",
                    "1-year labor warranty",
                    "EPA-certified technicians",
                    "Clean, professional service",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-accent flex-shrink-0" />
                      <span className="text-primary-foreground/90 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Decorative Element */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-accent/20 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
