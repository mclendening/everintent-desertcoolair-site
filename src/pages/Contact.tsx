import { Helmet } from "react-helmet-async";
import ContactForm from "@/components/sections/ContactForm";

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact Desert Cool Air | Free HVAC Estimate Phoenix</title>
        <meta
          name="description"
          content="Get a free HVAC estimate from Desert Cool Air. Contact us for AC repair, installation, and maintenance in Phoenix. Call (602) 555-2665 or fill out our form."
        />
        <link rel="canonical" href="https://desertcoolair.com/contact" />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-hero py-16">
        <div className="container">
          <div className="max-w-2xl">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">
              Contact Us
            </span>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mt-2 mb-4">
              Let's Talk About Your HVAC Needs
            </h1>
            <p className="text-primary-foreground/80 text-lg">
              Get your free estimate or schedule service today. Our team is here to help 
              with all your heating and cooling needs.
            </p>
          </div>
        </div>
      </section>

      <ContactForm />

      {/* Map Section */}
      <section className="py-16 bg-secondary">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">
              Service Area
            </h2>
            <p className="text-muted-foreground">
              We proudly serve Phoenix and the surrounding metro area, including 
              Scottsdale, Tempe, Mesa, Gilbert, Chandler, Glendale, and more.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-elevated">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d425345.40085746116!2d-112.40400527099942!3d33.60543267839046!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x872b12ed50a179cb%3A0x8c69c7f8354a1bac!2sPhoenix%2C%20AZ!5e0!3m2!1sen!2sus!4v1703184000000!5m2!1sen!2sus"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Phoenix Service Area Map"
            />
          </div>
        </div>
      </section>
    </>
  );
}
