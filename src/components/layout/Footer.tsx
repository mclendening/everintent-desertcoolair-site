import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Snowflake, Facebook, Instagram, Linkedin } from "lucide-react";

const quickLinks = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "About Us", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const services = [
  { name: "AC Repair", path: "/services#repair" },
  { name: "AC Installation", path: "/services#installation" },
  { name: "Maintenance", path: "/services#maintenance" },
  { name: "Heating Services", path: "/services#heating" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-primary-foreground">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-foreground/10">
                <Snowflake className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="font-heading text-xl font-bold">
                Desert Cool Air
              </span>
            </Link>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Phoenix's most trusted HVAC experts. Providing reliable heating and cooling solutions since 2005.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="h-10 w-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="h-10 w-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="h-10 w-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.path}>
                  <Link
                    to={service.path}
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <a
                    href="tel:6025552665"
                    className="text-primary-foreground hover:text-accent transition-colors font-medium"
                  >
                    (602) 555-2665
                  </a>
                  <p className="text-primary-foreground/50 text-xs">24/7 Emergency Service</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:info@desertcoolair.com"
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm"
                >
                  info@desertcoolair.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-primary-foreground/70 text-sm">
                  Serving Phoenix Metro Area<br />
                  Phoenix, AZ 85001
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/50">
            <p>© {new Date().getFullYear()} Desert Cool Air. All rights reserved.</p>
            <p>
              A service of{" "}
              <a href="#" className="hover:text-primary-foreground transition-colors">
                EverIntent LLC
              </a>
            </p>
            <div className="flex gap-6">
              <Link to="/privacy" className="hover:text-primary-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-primary-foreground transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
