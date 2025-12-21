import { Helmet } from "react-helmet-async";
import Hero from "@/components/sections/Hero";
import ServicesGrid from "@/components/sections/ServicesGrid";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Testimonials from "@/components/sections/Testimonials";
import CTABanner from "@/components/sections/CTABanner";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Phoenix HVAC Services | AC Repair & Installation | Desert Cool Air</title>
        <meta
          name="description"
          content="Phoenix's trusted HVAC experts. 24/7 emergency AC repair, installation, and maintenance. Same-day service. Free estimates. Call (602) 555-2665."
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
    </>
  );
}
