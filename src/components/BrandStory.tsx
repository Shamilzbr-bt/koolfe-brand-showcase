import { Check } from "lucide-react";
import brandStoryImage from "@/assets/brand-story.jpg";
import { AnimatedSection } from "@/components/AnimatedSection";

const features = [
  {
    title: "Traditional Recipes",
    description: "Passed down through generations, our recipes preserve the authentic taste of heritage kulfi.",
  },
  {
    title: "Premium Ingredients",
    description: "We source the finest pistachios, saffron, and spices from trusted suppliers worldwide.",
  },
  {
    title: "Slow-Cooked Perfection",
    description: "Each batch is slow-cooked for hours to achieve the rich, dense texture that defines true kulfi.",
  },
];

export const BrandStory = () => {
  return (
    <section id="about" className="section">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <AnimatedSection animation="slide-right">
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-elevated">
                <img
                  src={brandStoryImage}
                  alt="Kulfi preparation ingredients - pistachio and saffron"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full -z-10" />
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-accent/10 rounded-full -z-10" />
            </div>
          </AnimatedSection>

          {/* Content */}
          <AnimatedSection animation="slide-left" delay={200}>
            <p className="text-primary font-medium tracking-widest uppercase mb-3">
              Our Story
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 text-foreground">
              Crafting Tradition, <br />
              <span className="text-primary">One Kulfi at a Time</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Born from a passion for authentic flavors, Koolfe brings the rich heritage of traditional kulfi to Kuwait. Every batch is a tribute to the artisans who perfected this frozen delicacy centuries ago.
            </p>

            {/* Features */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <AnimatedSection
                  key={index}
                  animation="fade-up"
                  delay={300 + index * 100}
                >
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Check className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-lg text-foreground mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};
