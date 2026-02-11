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
          <div className="absolute inset-0 bg-black/30" />
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
            className="max-w-xl text-white"
          >
            <span className="inline-block text-sm font-body font-medium tracking-[0.2em] uppercase mb-4 opacity-90">
              New Season Collection
            </span>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 drop-shadow-md">
              {slides[current].title}
              <br />
              <span className="text-primary-foreground">{slides[current].subtitle}</span>
            </h1>

            <p className="font-body text-lg mb-8 max-w-md opacity-90 drop-shadow-sm">
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
                className="inline-flex items-center justify-center bg-white/20 backdrop-blur-sm border border-white/30 text-white font-body font-semibold text-sm px-8 py-3.5 rounded-full hover:bg-white/30 transition-all duration-300"
              >
                {slides[current].secondaryCtaText}
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-colors text-white"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-colors text-white"
      >
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              current === i ? "bg-white w-6" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
