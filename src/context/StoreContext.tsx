import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
}

export interface User {
  name: string;
  email: string;
  phone: string;
}

interface StoreContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  cart: CartItem[];
  addToCart: (product: Product, size: string, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  cartCount: number;
  cartTotal: number;
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isWishlisted: (productId: string) => boolean;
  wishlistCount: number;
  showLogin: boolean;
  setShowLogin: (v: boolean) => void;
}

const StoreContext = createContext<StoreContextType>({} as StoreContextType);

export const useStore = () => useContext(StoreContext);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("spanco_user");
    return saved ? JSON.parse(saved) : null;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("spanco_cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const saved = localStorage.getItem("spanco_wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => { localStorage.setItem("spanco_user", JSON.stringify(user)); }, [user]);
  useEffect(() => { localStorage.setItem("spanco_cart", JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem("spanco_wishlist", JSON.stringify(wishlist)); }, [wishlist]);

  const login = (u: User) => { setUser(u); setShowLogin(false); };
  const logout = () => { setUser(null); };

  const addToCart = (product: Product, size: string, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(i => i.product.id === product.id && i.size === size);
      if (existing) {
        return prev.map(i => i.product.id === product.id && i.size === size ? { ...i, quantity: i.quantity + quantity } : i);
      }
      return [...prev, { product, quantity, size }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(i => i.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) return removeFromCart(productId);
    setCart(prev => prev.map(i => i.product.id === productId ? { ...i, quantity } : i));
  };

  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);
  const cartTotal = cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  const toggleWishlist = (product: Product) => {
    setWishlist(prev =>
      prev.find(p => p.id === product.id)
        ? prev.filter(p => p.id !== product.id)
        : [...prev, product]
    );
  };

  const isWishlisted = (productId: string) => wishlist.some(p => p.id === productId);
  const wishlistCount = wishlist.length;

  return (
    <StoreContext.Provider value={{
      user, login, logout,
      cart, addToCart, removeFromCart, updateCartQuantity, cartCount, cartTotal,
      wishlist, toggleWishlist, isWishlisted, wishlistCount,
      showLogin, setShowLogin,
    }}>
      {children}
    </StoreContext.Provider>
  );
};
