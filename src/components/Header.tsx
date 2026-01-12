import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { brandInfo, getWhatsAppLink } from "@/data/products";
import logo from "@/assets/koolfe-logo.jpg";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#products", label: "Our Collection" },
  { href: "#about", label: "Story" },
  { href: "#contact", label: "Visit Us" },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
    // Update URL hash without jumping
    window.history.pushState(null, "", href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${isScrolled ? "glass py-3" : "bg-transparent py-6"
        }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="relative z-50 flex items-center gap-3 group">
          <img
            src={logo}
            alt={brandInfo.name}
            className="h-10 w-auto rounded-md shadow-md transition-transform group-hover:scale-105"
          />
          <span
            className={`font-display font-bold text-2xl tracking-wide transition-colors ${isScrolled ? "text-primary" : "text-white"
              }`}
          >
            {brandInfo.name}
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`text-sm font-medium transition-colors hover:text-accent relative group ${isScrolled ? "text-primary" : "text-white/90"
                }`}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <Button
            className="rounded-full bg-accent hover:bg-accent/90 text-primary font-semibold px-6"
            asChild
          >
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
            >
              Order Now
            </a>
          </Button>
        </nav>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button
                className={`p-2 transition-colors ${isScrolled || isOpen ? "text-primary" : "text-white"
                  }`}
                aria-label="Toggle menu"
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
              >
                <Menu />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-[300px] border-l-0" id="mobile-menu">
              <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
              <div className="flex flex-col items-center justify-center h-full gap-8 p-8">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="font-display text-4xl text-primary font-bold hover:text-accent transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
