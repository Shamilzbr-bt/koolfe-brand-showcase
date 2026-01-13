import { brandInfo } from "@/data/products";
import logo from "@/assets/koolfe-logo.jpg";

const footerLinks = [
  { href: "#home", label: "Home" },
  { href: "#products", label: "Products" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
    window.history.pushState(null, "", href);
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-custom py-12">
        <div className="grid justify-items-center gap-8">
          {/* Logo */}
          <a href="#home" onClick={(e) => handleNavClick(e, "#home")}>
            <img 
              src={logo} 
              alt={brandInfo.name} 
              className="h-12 rounded-lg" 
            />
          </a>

          {/* Navigation */}
          <nav>
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-sm text-primary-foreground/80 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href={`https://instagram.com/${brandInfo.instagram.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary-foreground/80 hover:text-accent transition-colors"
            >
              Instagram
            </a>
            <div className="h-4 w-px bg-primary-foreground/20"></div>
            <a
              href="tel:+96556571366"
              className="text-sm text-primary-foreground/80 hover:text-accent transition-colors"
            >
              +965 5657 1366
            </a>
          </div>
          
          {/* Copyright & Tagline */}
          <div className="mt-8 pt-8 border-t border-primary-foreground/10 text-center w-full">
            <p className="text-sm text-primary-foreground/60">
              {brandInfo.tagline}
            </p>
            <p className="text-xs text-primary-foreground/40 mt-2">
              © {currentYear} {brandInfo.name}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
