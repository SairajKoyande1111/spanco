import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="relative w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="w-full"
        >
          <img
            src="/hero-banner.png"
            alt="Spanco Kids Fashion Banner"
            className="w-full h-auto object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;