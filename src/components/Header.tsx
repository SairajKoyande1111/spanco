import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, User, Heart, ShoppingBag } from "lucide-react";
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
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between gap-4">
            {/* Logo on Left */}
            <div className="flex-shrink-0">
              <Link to="/">
                <img src="/logo.png" alt="Spanco Kids Fashion" className="h-20 md:h-28 w-auto object-contain" />
              </Link>
            </div>

            {/* Navigation in Middle */}
            <nav className="hidden lg:block flex-grow">
              <ul className="flex items-center justify-center gap-6">
                {navigationItems.map((item) => (
                  <li
                    key={item.title}
                    className="relative"
                    onMouseEnter={() => setActiveMenu(item.title)}
                    onMouseLeave={() => setActiveMenu(null)}
                  >
                    <Link
                      to={item.href}
                      className="flex items-center gap-1.5 px-2 py-3 text-base font-body font-medium text-foreground/80 hover:text-primary transition-colors relative group whitespace-nowrap"
                    >
                      <span>{item.title}</span>
                      <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                    </Link>

                    {item.megaMenu && activeMenu === item.title && (
                      <MegaMenu groups={item.megaMenu} />
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            {/* Actions on Right */}
            <div className="flex items-center gap-1 flex-shrink-0">
              <button onClick={() => setSearchOpen(true)} className="p-2 hover:bg-muted rounded-full transition-colors">
                <Search className="h-5 w-5 text-foreground" />
              </button>
              
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
      </header>

      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

export default Header;