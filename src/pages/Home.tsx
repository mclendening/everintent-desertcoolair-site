import { Helmet } from "react-helmet-async";
import Hero from "@/components/sections/Hero";
import ServicesGrid from "@/components/sections/ServicesGrid";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Testimonials from "@/components/sections/Testimonials";
import CTABanner from "@/components/sections/CTABanner";
import ContactForm from "@/components/sections/ContactForm";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Desert Cool Air | Phoenix's Trusted HVAC Experts</title>
        <meta
          name="description"
          content="Phoenix's most trusted HVAC company. Expert AC repair, installation, and maintenance with 24/7 emergency service. Free estimates. Call (602) 555-2665."
        />
        <meta
          name="keywords"
          content="HVAC Phoenix, AC repair Phoenix, air conditioning Phoenix, heating cooling Arizona, Desert Cool Air"
        />
        <link rel="canonical" href="https://desertcoolair.com" />
      </Helmet>

      <Hero />
      <ServicesGrid />
      <WhyChooseUs />
      <Testimonials />
      <CTABanner />
      <ContactForm />
    </>
  );
}
