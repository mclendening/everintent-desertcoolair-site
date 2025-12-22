import { Head } from "vite-react-ssg";
import Hero from "@/components/sections/Hero";
import ServicesGrid from "@/components/sections/ServicesGrid";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Testimonials from "@/components/sections/Testimonials";
import CTABanner from "@/components/sections/CTABanner";

export default function Home() {
  return (
    <>
      <Head>
        <title>Phoenix HVAC Services | AC Repair & Installation | Desert Cool Air</title>
        <meta name="description" content="Phoenix's trusted HVAC experts. 24/7 emergency AC repair, installation, and maintenance. Same-day service. Free estimates. Call (602) 609-2300." />
        <meta name="keywords" content="HVAC Phoenix, AC repair Phoenix, air conditioning Phoenix, heating cooling Arizona, Desert Cool Air" />
        <link rel="canonical" href="https://desertcoolair.com" />
        <meta property="og:title" content="Phoenix HVAC Services | AC Repair & Installation | Desert Cool Air" />
        <meta property="og:description" content="Phoenix's trusted HVAC experts. 24/7 emergency AC repair, installation, and maintenance. Same-day service. Free estimates." />
        <meta property="og:url" content="https://desertcoolair.com" />
        <meta property="og:image" content="https://desertcoolair.com/images/hero-desert.jpg" />
        <meta name="twitter:title" content="Phoenix HVAC Services | AC Repair & Installation | Desert Cool Air" />
        <meta name="twitter:description" content="Phoenix's trusted HVAC experts. 24/7 emergency AC repair, installation, and maintenance." />
        <meta name="twitter:image" content="https://desertcoolair.com/images/hero-desert.jpg" />
      </Head>

      <Hero />
      <ServicesGrid />
      <WhyChooseUs />
      <Testimonials />
      <CTABanner />
    </>
  );
}
