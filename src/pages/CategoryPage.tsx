import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronRight, SlidersHorizontal, X } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

const filters = {
  age: ["0-6 Months", "6-12 Months", "1-3 Years", "3-5 Years", "5-8 Years", "8-12 Years"],
  size: ["0-3M", "3-6M", "6-9M", "1Y", "2Y", "3Y", "4Y", "5Y", "6Y", "7Y", "8Y"],
  price: ["Under ₹500", "₹500 - ₹999", "₹1000 - ₹1999", "₹2000 - ₹2999", "Above ₹3000"],
  color: ["Pink", "Blue", "White", "Yellow", "Red", "Green", "Cream", "Lavender"],
  occasion: ["Daily Wear", "Party Wear", "Festive", "Night Wear"],
};

const categoryMap: Record<string, string> = {
  infant: "Infant",
  boys: "Boys",
  girls: "Girls",
  "ethnic-wear": "Ethnic Wear",
  "western-wear": "Western Wear",
};

const CategoryPage = () => {
  const { category, subcategory } = useParams();
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("popularity");
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});

  const categoryTitle = category
    ? category.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
    : "All Products";

  const subcategoryTitle = subcategory
    ? subcategory.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
    : null;

  // Filter products by category and selected filters
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (category === "best-seller") {
      result = products.filter(p => p.badge === "Best Seller" || p.rating >= 4.7);
    } else if (category === "sale") {
      result = products.filter(p => p.originalPrice || p.badge === "Sale");
    } else if (category === "festive") {
      result = products.filter(p => p.badge === "Festive" || p.category === "Ethnic Wear");
    } else if (category && categoryMap[category]) {
      result = products.filter(p => p.category === categoryMap[category]);
    }

    // Age filter
    if (selectedFilters.age?.length > 0) {
      result = result.filter(p => selectedFilters.age.includes(p.age));
    }

    // Size filter (assuming product has sizes array or string)
    if (selectedFilters.size?.length > 0) {
      result = result.filter(p => p.sizes?.some(s => selectedFilters.size.includes(s)));
    }

    // Price filter
    if (selectedFilters.price?.length > 0) {
      result = result.filter(p => {
        return selectedFilters.price.some(range => {
          if (range === "Under ₹500") return p.price < 500;
          if (range === "₹500 - ₹999") return p.price >= 500 && p.price <= 999;
          if (range === "₹1000 - ₹1999") return p.price >= 1000 && p.price <= 1999;
          if (range === "₹2000 - ₹2999") return p.price >= 2000 && p.price <= 2999;
          if (range === "Above ₹3000") return p.price > 3000;
          return true;
        });
      });
    }

    // Color filter
    if (selectedFilters.color?.length > 0) {
      result = result.filter(p => p.colors?.some(c => selectedFilters.color.includes(c)));
    }

    // Occasion filter - Map badge/category since occasion field is missing in data
    if (selectedFilters.occasion?.length > 0) {
      result = result.filter(p => {
        if (selectedFilters.occasion.includes("Festive") && (p.badge === "Festive" || p.category === "Ethnic Wear")) return true;
        if (selectedFilters.occasion.includes("Party Wear") && p.price > 2000) return true;
        if (selectedFilters.occasion.includes("Daily Wear") && p.price < 1500) return true;
        return false;
      });
    }

    // Sort
    if (sortBy === "price-low") result.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-high") result.sort((a, b) => b.price - a.price);
    else if (sortBy === "newest") result.reverse();

    return result;
  }, [category, subcategory, sortBy, selectedFilters]);

  const toggleFilter = (group: string, value: string) => {
    setSelectedFilters((prev) => {
      const current = prev[group] || [];
      return { ...prev, [group]: current.includes(value) ? current.filter((v) => v !== value) : [...current, value] };
    });
  };

  const FilterSection = ({ title, options, groupKey }: { title: string; options: string[]; groupKey: string }) => (
    <div className="mb-6">
      <h4 className="font-body text-sm font-semibold text-foreground mb-3">{title}</h4>
      <div className="space-y-2">
        {options.map((option) => {
          const isSelected = (selectedFilters[groupKey] || []).includes(option);
          return (
            <label key={option} className="flex items-center gap-2.5 cursor-pointer group">
              <div
                className={`w-4 h-4 rounded border-2 transition-colors flex items-center justify-center ${isSelected ? "bg-primary border-primary" : "border-border group-hover:border-primary/50"}`}
                onClick={() => toggleFilter(groupKey, option)}
              >
                {isSelected && (
                  <svg className="w-2.5 h-2.5 text-primary-foreground" fill="currentColor" viewBox="0 0 12 12">
                    <path d="M10 3L4.5 8.5 2 6" stroke="currentColor" strokeWidth="2" fill="none" />
                  </svg>
                )}
              </div>
              <span className="font-body text-sm text-muted-foreground group-hover:text-foreground transition-colors">{option}</span>
            </label>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-6">
        <nav className="flex items-center gap-2 text-sm font-body text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          {subcategoryTitle ? (
            <>
              <Link to={`/category/${category}`} className="hover:text-primary transition-colors">{categoryTitle}</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-foreground font-medium">{subcategoryTitle}</span>
            </>
          ) : (
            <span className="text-foreground font-medium">{categoryTitle}</span>
          )}
        </nav>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              {subcategoryTitle || categoryTitle}
            </h1>
            <p className="font-body text-sm text-muted-foreground mt-1">{filteredProducts.length} products</p>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => setShowFilters(!showFilters)} className="md:hidden flex items-center gap-2 px-4 py-2 border border-border rounded-full font-body text-sm">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </button>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-card border border-border rounded-full px-4 py-2 font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20">
              <option value="popularity">Sort by Popularity</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest First</option>
            </select>
          </div>
        </div>

        <div className="flex gap-8">
          <aside className="hidden md:block w-60 flex-shrink-0">
            <div className="sticky top-40">
              <h3 className="font-display text-lg font-bold text-foreground mb-6">Filters</h3>
              <FilterSection title="Age Group" options={filters.age} groupKey="age" />
              <FilterSection title="Size" options={filters.size} groupKey="size" />
              <FilterSection title="Price Range" options={filters.price} groupKey="price" />
              <FilterSection title="Color" options={filters.color} groupKey="color" />
              <FilterSection title="Occasion" options={filters.occasion} groupKey="occasion" />
            </div>
          </aside>

          {showFilters && (
            <div className="fixed inset-0 z-50 md:hidden">
              <div className="absolute inset-0 bg-foreground/30" onClick={() => setShowFilters(false)} />
              <div className="absolute right-0 top-0 bottom-0 w-80 bg-card p-6 overflow-y-auto shadow-card">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display text-lg font-bold text-foreground">Filters</h3>
                  <button onClick={() => setShowFilters(false)}><X className="h-5 w-5 text-foreground" /></button>
                </div>
                <FilterSection title="Age Group" options={filters.age} groupKey="age" />
                <FilterSection title="Size" options={filters.size} groupKey="size" />
                <FilterSection title="Price Range" options={filters.price} groupKey="price" />
                <FilterSection title="Color" options={filters.color} groupKey="color" />
                <FilterSection title="Occasion" options={filters.occasion} groupKey="occasion" />
              </div>
            </div>
          )}

          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {filteredProducts.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="font-body text-lg text-muted-foreground mb-4">No products found in this category yet</p>
                <Link to="/" className="gradient-cta text-primary-foreground font-body font-bold text-sm px-8 py-3 rounded-full inline-block">
                  Browse All Products
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CategoryPage;
