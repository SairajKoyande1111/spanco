import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import categoryInfant from "@/assets/category-infant.jpg";
import categoryBoys from "@/assets/category-boys.jpg";
import categoryGirls from "@/assets/category-girls.jpg";
import categoryEthnic from "@/assets/category-ethnic.jpg";

const categories = [
  { title: "Infant", subtitle: "Soft & Gentle", image: categoryInfant, href: "/category/infant" },
  { title: "Boys", subtitle: "Cool & Trendy", image: categoryBoys, href: "/category/boys" },
  { title: "Girls", subtitle: "Sweet & Pretty", image: categoryGirls, href: "/category/girls" },
  { title: "Ethnic Wear", subtitle: "Traditional", image: categoryEthnic, href: "/category/ethnic-wear" },
];

const CategoryGrid = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
            Shop by Category
          </h2>
          <p className="font-body text-muted-foreground">
            Find the perfect outfit for every occasion
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Link
                to={cat.href}
                className="group block relative rounded-2xl overflow-hidden aspect-[3/4]"
              >
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="font-display text-xl font-bold text-primary-foreground">
                    {cat.title}
                  </h3>
                  <p className="font-body text-xs text-primary-foreground/80 mt-1">
                    {cat.subtitle}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
