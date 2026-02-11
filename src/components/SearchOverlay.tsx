import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, X } from "lucide-react";
import { products } from "@/data/products";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchOverlay = ({ isOpen, onClose }: SearchOverlayProps) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filtered = query.trim().length > 1
    ? products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.age.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="fixed inset-0 z-[90] flex flex-col">
      <div className="absolute inset-0 bg-foreground/30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card w-full max-w-2xl mx-auto mt-20 rounded-2xl shadow-card overflow-hidden animate-fade-in mx-4">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
          <Search className="h-5 w-5 text-muted-foreground" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            maxLength={100}
            placeholder="Search for products, categories..."
            className="flex-1 bg-transparent font-body text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
          <button onClick={onClose} className="p-1.5 hover:bg-muted rounded-full">
            <X className="h-4 w-4 text-foreground" />
          </button>
        </div>

        {filtered.length > 0 && (
          <div className="max-h-80 overflow-y-auto p-3">
            {filtered.map(product => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                onClick={onClose}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted transition-colors"
              >
                <img src={product.image} alt={product.name} className="w-14 h-14 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="font-body text-sm font-medium text-foreground truncate">{product.name}</p>
                  <p className="font-body text-xs text-muted-foreground">{product.category} • {product.age}</p>
                </div>
                <span className="font-body text-sm font-bold text-foreground">₹{product.price.toLocaleString()}</span>
              </Link>
            ))}
          </div>
        )}

        {query.trim().length > 1 && filtered.length === 0 && (
          <div className="p-8 text-center">
            <p className="font-body text-sm text-muted-foreground">No products found for "{query}"</p>
          </div>
        )}

        {query.trim().length <= 1 && (
          <div className="p-6">
            <p className="font-body text-xs text-muted-foreground mb-3">Popular Searches</p>
            <div className="flex flex-wrap gap-2">
              {["Frocks", "Kurta", "Party Wear", "Rompers", "Cotton"].map(tag => (
                <button key={tag} onClick={() => setQuery(tag)} className="px-3 py-1.5 rounded-full border border-border font-body text-xs text-muted-foreground hover:bg-muted transition-colors">
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchOverlay;
