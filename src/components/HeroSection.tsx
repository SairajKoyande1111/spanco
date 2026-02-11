import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    image: "/hero-bg.jpg",
    title: "Dress Them",
    subtitle: "In Love",
    description: "Premium kids fashion crafted with care. Soft fabrics, elegant designs, and styles they'll love to wear.",
    ctaText: "Shop Best Sellers",
    ctaLink: "/category/best-seller",
    secondaryCtaText: "Festive Collection",
    secondaryCtaLink: "/category/festive"
  },
  {
    image: "/hero-bg-2.jpg",
    title: "New Arrivals",
    subtitle: "Spring Style",
    description: "Discover our latest collection for the new season. Comfortable and trendy outfits for every child.",
    ctaText: "Shop Now",
    ctaLink: "/category/new-arrivals",
    secondaryCtaText: "View Collection",
    secondaryCtaLink: "/category/spring-collection"
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
    <section className="relative overflow-hidden bg-white">
      <div className="relative aspect-[21/9] w-full">
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

        <div className="absolute inset-0 z-10 flex items-end justify-center pb-8 md:pb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <div className="flex flex-wrap justify-center gap-4 px-4">
                <Link
                  to={slides[current].ctaLink}
                  className="inline-flex items-center justify-center bg-primary text-primary-foreground font-body font-semibold text-sm px-8 py-3.5 rounded-full hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap shadow-md"
                >
                  {slides[current].ctaText}
                </Link>
                <Link
                  to={slides[current].secondaryCtaLink}
                  className="inline-flex items-center justify-center bg-white/90 backdrop-blur-sm text-primary border border-white font-body font-semibold text-sm px-8 py-3.5 rounded-full hover:bg-white transition-all duration-300 whitespace-nowrap shadow-md"
                >
                  {slides[current].secondaryCtaText}
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="flex justify-center gap-2 py-4">
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
