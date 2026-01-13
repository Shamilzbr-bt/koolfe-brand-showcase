import { Phone, Clock, MapPin, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { brandInfo, getWhatsAppLink } from "@/data/products";
import { AnimatedSection } from "@/components/AnimatedSection";

const contactItems = [
  {
    icon: Phone,
    title: "Phone / WhatsApp",
    content: brandInfo.phone,
    link: getWhatsAppLink(),
  },
  {
    icon: Instagram,
    title: "Instagram",
    content: brandInfo.instagram,
    link: `https://instagram.com/${brandInfo.instagram.replace("@", "")}`,
  },
  {
    icon: Clock,
    title: "Business Hours",
    content: (
      <>
        <span className="block">Sun-Thu: {brandInfo.hours.weekdays}</span>
        <span className="block">Fri-Sat: {brandInfo.hours.weekends}</span>
      </>
    ),
  },
  {
    icon: MapPin,
    title: "Location",
    content: brandInfo.location.name,
  },
];

export const Contact = () => {
  return (
    <section id="contact" className="section py-20">
      <div className="container-custom">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-16">
          <p className="text-primary font-medium tracking-widest uppercase mb-3">
            Get in Touch
          </p>
          <h2 className="section-heading">Contact Us</h2>
          <div className="decorative-line mt-4 mb-6" />
          <p className="section-subheading">
            Ready to taste the difference? Reach out to place an order or learn more about our offerings.
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <div className="grid sm:grid-cols-2 gap-6">
            {contactItems.map((item, index) => (
              <AnimatedSection
                key={index}
                animation="fade-up"
                delay={index * 100}
              >
                <div className="bg-card rounded-2xl p-6 shadow-soft h-full">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2 text-foreground">
                    {item.title}
                  </h3>
                  {item.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {item.content}
                    </a>
                  ) : (
                    <p className="text-muted-foreground">{item.content}</p>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Map */}
          <AnimatedSection animation="slide-left" delay={300}>
            <div className="rounded-2xl overflow-hidden shadow-card h-[400px] bg-muted">
              <iframe
                src={brandInfo.location.mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Koolfe Location"
              />
            </div>
          </AnimatedSection>
        </div>

        {/* CTA */}
        <AnimatedSection animation="fade-up" delay={400} className="mt-16 text-center">
          <Button variant="whatsapp" size="xl" asChild>
            <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
              Start Your Order on WhatsApp
            </a>
          </Button>
        </AnimatedSection>
      </div>
    </section>
  );
};
