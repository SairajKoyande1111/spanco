import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    image: "/images/hero-1.jpg",
    title: "Dress Them",
    subtitle: "In Love",
    description: "Premium kids fashion crafted with care. Soft fabrics, elegant designs, and styles they'll love to wear.",
    ctaText: "Shop Best Sellers",
    ctaLink: "/category/best-seller",
    secondaryCtaText: "Festive Collection",
    secondaryCtaLink: "/category/festive"
  },
  {
    image: "/images/hero-2.jpg",
    title: "New Season",
    subtitle: "Playful Vibes",
    description: "Discover our latest collection designed for active kids. Style meets comfort in every stitch.",
    ctaText: "New Arrivals",
    ctaLink: "/category/new-arrivals",
    secondaryCtaText: "Explore More",
    secondaryCtaLink: "/category/all"
  },
  {
    image: "/images/hero-3.png",
    title: "Festive Joy",
    subtitle: "Celebrations",
    description: "Make every occasion special with our exclusive festive wear. Perfect for memories that last.",
    ctaText: "Shop Festive",
    ctaLink: "/category/festive",
    secondaryCtaText: "Sale Items",
    secondaryCtaLink: "/category/sale"
  }
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative h-[70vh] md:h-[80vh] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <img
            src={slides[current].image}
            alt={slides[current].title}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      <div className="container mx-auto px-4 relative z-10 h-full flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.5 }}
            className="max-w-xl text-foreground"
          >
            <span className="inline-block text-sm font-body font-medium tracking-[0.2em] uppercase mb-4 text-primary">
              New Season Collection
            </span>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6">
              {slides[current].title}
              <br />
              <span className="text-primary">{slides[current].subtitle}</span>
            </h1>

            <p className="font-body text-lg mb-8 max-w-md text-muted-foreground">
              {slides[current].description}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to={slides[current].ctaLink}
                className="inline-flex items-center justify-center bg-primary text-primary-foreground font-body font-semibold text-sm px-8 py-3.5 rounded-full hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                {slides[current].ctaText}
              </Link>
              <Link
                to={slides[current].secondaryCtaLink}
                className="inline-flex items-center justify-center bg-secondary text-secondary-foreground border border-border font-body font-semibold text-sm px-8 py-3.5 rounded-full hover:bg-muted transition-all duration-300"
              >
                {slides[current].secondaryCtaText}
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              current === i ? "bg-primary w-6" : "bg-primary/30"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
