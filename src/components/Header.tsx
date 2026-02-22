import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, User, Heart, ShoppingBag } from "lucide-react";
import TopBar from "./TopBar";
import MegaMenu from "./MegaMenu";
import SearchOverlay from "./SearchOverlay";
import { navigationItems } from "@/data/navigation";
import { useStore } from "@/context/StoreContext";

const Header = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const { user, setShowLogin, cartCount, wishlistCount } = useStore();

  return (
    <>
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button onClick={() => setSearchOpen(true)} className="p-2 hover:bg-muted rounded-full transition-colors">
              <Search className="h-5 w-5 text-foreground" />
            </button>

            <Link to="/" className="absolute left-1/2 -translate-x-1/2">
              <img src="/logo.png" alt="Spanco Kids Fashion" className="h-16 md:h-20 w-auto object-contain" />
            </Link>

            <div className="flex items-center gap-1">
              {user ? (
                <Link to="/profile" className="p-2 hover:bg-muted rounded-full transition-colors">
                  <User className="h-5 w-5 text-foreground" />
                </Link>
              ) : (
                <button onClick={() => setShowLogin(true)} className="p-2 hover:bg-muted rounded-full transition-colors">
                  <User className="h-5 w-5 text-foreground" />
                </button>
              )}
              <Link to="/wishlist" className="p-2 hover:bg-muted rounded-full transition-colors relative">
                <Heart className="h-5 w-5 text-foreground" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <Link to="/cart" className="p-2 hover:bg-muted rounded-full transition-colors relative">
                <ShoppingBag className="h-5 w-5 text-foreground" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        <nav className="border-t border-border hidden md:block">
          <div className="container mx-auto px-4">
            <ul className="flex items-center justify-center gap-4">
              {navigationItems.map((item) => (
                <li
                  key={item.title}
                  className="relative"
                  onMouseEnter={() => setActiveMenu(item.title)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <Link
                    to={item.href}
                    className="flex items-center gap-1.5 px-2 py-3 text-base font-body font-medium text-foreground/80 hover:text-primary transition-colors relative group"
                  >
                    <span>{item.title}</span>
                    {item.badge && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 bg-primary text-primary-foreground rounded-full leading-none">
                        {item.badge}
                      </span>
                    )}
                    <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  </Link>

                  {item.megaMenu && activeMenu === item.title && (
                    <MegaMenu groups={item.megaMenu} />
                  )}
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>

      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

export default Header;
