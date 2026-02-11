import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Eye, ShoppingBag, Star } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "@/data/products";
import { useStore } from "@/context/StoreContext";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const { toggleWishlist, isWishlisted, addToCart } = useStore();
  const wishlisted = isWishlisted(product.id);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="group"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative rounded-2xl overflow-hidden bg-muted aspect-[3/4] mb-3">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />

          {product.badge && (
            <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-[10px] font-body font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
              {product.badge}
            </span>
          )}
          {discount > 0 && (
            <span className="absolute top-3 right-3 bg-foreground text-primary-foreground text-[10px] font-body font-bold px-2 py-1 rounded-full">
              -{discount}%
            </span>
          )}

          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <div className="flex gap-2">
              <button
                onClick={(e) => { e.preventDefault(); addToCart(product, product.sizes[0]); }}
                className="flex-1 bg-card/95 backdrop-blur-sm text-foreground font-body text-xs font-semibold py-2.5 rounded-full flex items-center justify-center gap-1.5 hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <ShoppingBag className="h-3.5 w-3.5" />
                Add to Cart
              </button>
              <Link to={`/product/${product.id}`} className="bg-card/95 backdrop-blur-sm text-foreground p-2.5 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">
                <Eye className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          <button
            onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
            className="absolute top-3 right-3 z-10 p-2 rounded-full bg-card/80 backdrop-blur-sm hover:bg-card transition-colors"
            style={{ right: discount > 0 ? "auto" : undefined, left: discount > 0 ? "auto" : undefined }}
          >
            <Heart
              className={`h-4 w-4 transition-colors ${wishlisted ? "fill-primary text-primary" : "text-foreground/60"}`}
            />
          </button>
        </div>

        <div className="px-1">
          <div className="flex items-center gap-1 mb-1">
            <Star className="h-3 w-3 fill-warm-gold text-warm-gold" />
            <span className="text-xs font-body text-muted-foreground">
              {product.rating} ({product.reviews})
            </span>
          </div>
          <h3 className="font-body text-sm font-medium text-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-xs font-body text-muted-foreground mt-0.5">{product.age}</p>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="font-body font-bold text-foreground">₹{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="font-body text-xs text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
