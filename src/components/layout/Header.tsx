import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, Menu, Snowflake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export default function Header() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? "bg-brand-navy/95 backdrop-blur-md shadow-lg" 
          : "bg-transparent"
      }`}
    >
      <div className="container flex h-20 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm border border-white/30">
            <Snowflake className="h-6 w-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading text-lg font-bold text-white leading-tight drop-shadow-md">
              Desert Cool Air
            </span>
            <span className="text-xs text-white/70">
              HVAC Experts
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-accent drop-shadow-sm ${
                location.pathname === link.path
                  ? "text-accent"
                  : "text-white/90"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="tel:6026092300"
            className="flex items-center gap-2 text-sm font-semibold text-white hover:text-accent transition-colors drop-shadow-sm"
          >
            <Phone className="h-4 w-4" />
            (602) 609-2300
          </a>
          <Button variant="accent" asChild>
            <Link to="/contact">Get Free Estimate</Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <div className="flex flex-col gap-6 mt-6">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-hero">
                  <Snowflake className="h-6 w-6 text-primary-foreground" />
                </div>
                <span className="font-heading text-lg font-bold text-brand-navy">
                  Desert Cool Air
                </span>
              </div>

              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.path}>
                    <Link
                      to={link.path}
                      className={`text-lg font-medium transition-colors hover:text-primary py-2 ${
                        location.pathname === link.path
                          ? "text-primary"
                          : "text-foreground"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </SheetClose>
                ))}
              </nav>

              <div className="flex flex-col gap-4 mt-4 pt-4 border-t">
                <a
                  href="tel:6026092300"
                  className="flex items-center gap-2 text-lg font-semibold text-brand-navy"
                >
                  <Phone className="h-5 w-5" />
                  (602) 609-2300
                </a>
                <SheetClose asChild>
                  <Button variant="accent" size="lg" asChild>
                    <Link to="/contact">Get Free Estimate</Link>
                  </Button>
                </SheetClose>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
