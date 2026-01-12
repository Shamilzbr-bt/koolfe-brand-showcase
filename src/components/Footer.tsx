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

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
    window.history.pushState(null, "", href);
  };

  return (
    <footer className="bg-brand-purple-dark text-white py-12">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & Tagline */}
          <div className="text-center md:text-left">
            <a href="#home" className="flex items-center gap-3 justify-center md:justify-start mb-2">
              <img
                src={logo}
                alt={brandInfo.name}
                className="h-10 w-auto object-contain rounded-lg"
              />
            </a>
            <p className="text-white/70 text-sm">
              {brandInfo.tagline}
            </p>
          </div>

          {/* Navigation */}
          <nav>
            <ul className="flex flex-wrap justify-center gap-6">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-white/70 hover:text-brand-yellow transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social / Contact */}
          <div className="text-center md:text-right flex flex-col gap-2">
            <a
              href={`https://instagram.com/${brandInfo.instagram.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-brand-yellow transition-colors text-sm"
            >
              {brandInfo.instagram}
            </a>
            <a
              href="tel:+96556571366"
              className="text-white/70 hover:text-brand-yellow transition-colors text-sm"
            >
              +965 5657 1366
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-white/10 text-center">
          <p className="text-white/50 text-sm">
            © {currentYear} {brandInfo.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
