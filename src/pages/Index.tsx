import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CategoryGrid from "@/components/CategoryGrid";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import PromoBanner from "@/components/PromoBanner";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const ProductSection = ({ title, category, limit = 4 }: { title: string, category: string, limit?: number }) => {
  const filteredProducts = products
    .filter(p => p.category.toLowerCase() === category.toLowerCase() || (category === "Best Seller" && p.isBestSeller))
    .slice(0, limit);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <h2 className="font-display text-3xl font-bold text-foreground">{title}</h2>
          <Link to={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`} className="text-primary font-medium hover:underline">View All →</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {filteredProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <CategoryGrid />
        
        <ProductSection title="Best Sellers" category="Best Seller" />
        <ProductSection title="Boys Collection" category="Boys" />
        <ProductSection title="Girls Collection" category="Girls" />
        <ProductSection title="Infant Collection" category="Infant" />

        <PromoBanner />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
