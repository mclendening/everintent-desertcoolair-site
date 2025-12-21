import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Snowflake, Facebook, Instagram } from "lucide-react";

const quickLinks = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "About Us", path: "/about" },
  { name: "Contact", path: "/contact" },
  { name: "Privacy Policy", path: "/privacy" },
  { name: "Terms of Service", path: "/terms" },
];

const services = [
  { name: "AC Repair", path: "/services#repair" },
  { name: "AC Installation", path: "/services#installation" },
  { name: "Heating Services", path: "/services#heating" },
  { name: "Maintenance Plans", path: "/services#maintenance" },
  { name: "Emergency Service", path: "/services#emergency" },
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
              Keeping Phoenix Cool Since 2010
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://google.com/maps"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                aria-label="Google Reviews"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
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
            <h3 className="font-heading font-bold text-lg mb-4">Services</h3>
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
            <h3 className="font-heading font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <div>
                <a
                    href="tel:6026092300"
                    className="text-primary-foreground hover:text-accent transition-colors font-medium"
                  >
                    (602) 609-2300
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
                  Phoenix Metro Area
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar with EverIntent Disclosure */}
      <div className="border-t border-primary-foreground/10">
        <div className="container py-8">
          <div className="text-center space-y-4 text-sm text-primary-foreground/50">
            <p>© 2025 Desert Cool Air. Professional HVAC Services in Phoenix.</p>
            <p className="max-w-3xl mx-auto">
              This website is operated by EverIntent LLC. Services are performed by licensed independent third-party providers in your area.
            </p>
            <div className="pt-2 border-t border-primary-foreground/10 inline-block">
              <p className="text-xs">
                EverIntent LLC<br />
                2892 N Bellflower Blvd PMB 1018, Long Beach, CA 90815<br />
                <a href="tel:5626859500" className="hover:text-primary-foreground transition-colors">(562) 685-9500</a>
                {" | "}
                <Link to="/privacy" className="hover:text-primary-foreground transition-colors">Privacy Policy</Link>
                {" | "}
                <Link to="/terms" className="hover:text-primary-foreground transition-colors">Terms of Service</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
