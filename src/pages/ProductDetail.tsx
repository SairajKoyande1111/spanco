import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronRight, Heart, Minus, Plus, Star, Truck, RotateCcw, Shield } from "lucide-react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { useStore } from "@/context/StoreContext";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id) || products[0];
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "");
  const [quantity, setQuantity] = useState(1);
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const wishlisted = isWishlisted(product.id);
  const [activeAccordion, setActiveAccordion] = useState<string | null>("description");

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const similarProducts = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-6">
        <nav className="flex items-center gap-2 text-sm font-body text-muted-foreground mb-8">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to={`/category/${product.category.toLowerCase().replace(" ", "-")}`} className="hover:text-primary transition-colors">
            {product.category}
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground font-medium line-clamp-1">{product.name}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <div className="rounded-2xl overflow-hidden bg-muted aspect-[3/4] relative group cursor-zoom-in">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              {product.badge && (
                <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-body font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">{product.badge}</span>
              )}
            </div>
            <div className="flex gap-3 mt-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={`rounded-xl overflow-hidden bg-muted aspect-square w-20 cursor-pointer border-2 transition-colors ${i === 1 ? "border-primary" : "border-transparent hover:border-primary/30"}`}>
                  <img src={product.image} alt={`${product.name} view ${i}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-warm-gold text-warm-gold" : "text-border"}`} />
                ))}
              </div>
              <span className="font-body text-sm text-muted-foreground">{product.rating} ({product.reviews} reviews)</span>
            </div>

            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">{product.name}</h1>
            <p className="font-body text-muted-foreground mb-4">{product.category} • {product.age}</p>

            <div className="flex items-baseline gap-3 mb-8">
              <span className="font-display text-3xl font-bold text-foreground">₹{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <>
                  <span className="font-body text-lg text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
                  <span className="font-body text-sm font-semibold text-primary">{discount}% OFF</span>
                </>
              )}
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="font-body text-sm font-semibold text-foreground">Select Size</span>
                <button className="font-body text-xs text-primary underline underline-offset-2">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button key={size} onClick={() => setSelectedSize(size)} className={`px-4 py-2.5 rounded-full text-sm font-body font-medium border-2 transition-all ${selectedSize === size ? "border-primary bg-primary text-primary-foreground" : "border-border text-foreground hover:border-primary/50"}`}>
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <span className="font-body text-sm font-semibold text-foreground mb-3 block">Colors Available</span>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <span key={color} className="px-3 py-1.5 rounded-full text-xs font-body border border-border text-muted-foreground">{color}</span>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <span className="font-body text-sm font-semibold text-foreground mb-3 block">Quantity</span>
              <div className="flex items-center gap-3">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"><Minus className="h-4 w-4" /></button>
                <span className="font-body font-semibold text-foreground w-8 text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"><Plus className="h-4 w-4" /></button>
              </div>
            </div>

            <div className="flex gap-3 mb-8">
              <button onClick={() => addToCart(product, selectedSize, quantity)} className="flex-1 gradient-cta text-primary-foreground font-body font-bold text-sm py-4 rounded-full hover:shadow-hover transition-all duration-300 hover:-translate-y-0.5">
                Add to Cart
              </button>
              <button onClick={() => toggleWishlist(product)} className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all ${wishlisted ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}>
                <Heart className={`h-5 w-5 transition-colors ${wishlisted ? "fill-primary text-primary" : "text-foreground"}`} />
              </button>
            </div>

            <div className="flex items-center gap-6 py-6 border-t border-b border-border mb-8">
              <div className="flex items-center gap-2"><Truck className="h-4 w-4 text-primary" /><span className="font-body text-xs text-muted-foreground">Free Delivery</span></div>
              <div className="flex items-center gap-2"><RotateCcw className="h-4 w-4 text-primary" /><span className="font-body text-xs text-muted-foreground">Easy Returns</span></div>
              <div className="flex items-center gap-2"><Shield className="h-4 w-4 text-primary" /><span className="font-body text-xs text-muted-foreground">Secure Payment</span></div>
            </div>

            {[
              { key: "description", title: "Description", content: "This beautifully crafted outfit is made from premium quality fabric that's soft on your child's delicate skin. Designed with attention to detail, featuring elegant finishes and comfortable fit perfect for all-day wear." },
              { key: "size-guide", title: "Size Guide", content: "Please refer to our size chart for the best fit. We recommend measuring your child before ordering. Our sizes are designed to be true to fit with a little room for growth." },
              { key: "care", title: "Care Instructions", content: "Machine wash cold with similar colors. Gentle cycle recommended. Do not bleach. Tumble dry low. Iron on low heat if needed. Do not dry clean." },
            ].map((section) => (
              <div key={section.key} className="border-b border-border">
                <button onClick={() => setActiveAccordion(activeAccordion === section.key ? null : section.key)} className="w-full flex items-center justify-between py-4">
                  <span className="font-body text-sm font-semibold text-foreground">{section.title}</span>
                  <ChevronRight className={`h-4 w-4 text-muted-foreground transition-transform ${activeAccordion === section.key ? "rotate-90" : ""}`} />
                </button>
                {activeAccordion === section.key && (
                  <div className="pb-4 animate-fade-in">
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">{section.content}</p>
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        </div>

        <section className="mt-20 mb-12">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {similarProducts.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
