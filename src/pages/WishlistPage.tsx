import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useStore } from "@/context/StoreContext";

const WishlistPage = () => {
  const { wishlist } = useStore();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8">My Wishlist</h1>

        {wishlist.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
            <p className="font-body text-lg text-muted-foreground mb-4">Your wishlist is empty</p>
            <Link to="/" className="gradient-cta text-primary-foreground font-body font-bold text-sm px-8 py-3 rounded-full inline-block">
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {wishlist.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default WishlistPage;
