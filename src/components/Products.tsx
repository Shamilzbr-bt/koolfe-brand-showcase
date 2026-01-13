import { Button } from "@/components/ui/button";
import { getWhatsAppLink, type Product } from "@/data/products";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ArrowRight, Loader2 } from "lucide-react";
import { useProducts } from "@/hooks/use-products";
import content from "@/data/content.json";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 border border-border/40 h-full flex flex-col">
      {/* Image Area */}
      <div className="relative aspect-[4/5] overflow-hidden bg-secondary/30 p-8 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-110 drop-shadow-md"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-primary font-bold px-4 py-1.5 rounded-full text-sm shadow-sm">
          {product.price}
        </div>
      </div>

      {/* Info Area */}
      <div className="p-6 flex flex-col flex-grow text-center">
        <h3 className="font-display text-2xl font-bold mb-2 text-primary group-hover:text-accent transition-colors">
          {product.name}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
          {product.description}
        </p>

        <Button
          className="w-full bg-primary text-white hover:bg-primary/90 rounded-xl py-6 group/btn"
          asChild
        >
          <a href={getWhatsAppLink(product.name)} target="_blank" rel="noopener noreferrer">
            Order Now
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
          </a>
        </Button>
      </div>
    </div>
  );
};

export const Products = () => {
  const { data: products, isLoading, error } = useProducts();

  return (
    <section id="products" className="py-24 md:py-32 bg-secondary/20 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#2a0a4a_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.03]" />

      <div className="container relative z-10 mx-auto px-4">
        <AnimatedSection className="text-center mb-20 max-w-3xl mx-auto">
          <span className="text-accent font-semibold tracking-widest uppercase text-sm">
            {content.products.section_highlight}
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary mt-3 mb-6">
            {content.products.section_title}
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full mb-6" />
          <p className="text-muted-foreground text-lg font-light leading-relaxed">
            {content.products.description}
          </p>
        </AnimatedSection>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="text-center text-red-500">
            Failed to load products. Please try again later.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products?.map((product, index) => (
              <AnimatedSection
                key={product.id}
                animation="fade-up"
                delay={index * 100}
              >
                <ProductCard product={product} />
              </AnimatedSection>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
