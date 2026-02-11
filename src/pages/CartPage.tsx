import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useStore } from "@/context/StoreContext";

const CartPage = () => {
  const { cart, removeFromCart, updateCartQuantity, cartTotal } = useStore();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8">Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingBag className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
            <p className="font-body text-lg text-muted-foreground mb-4">Your cart is empty</p>
            <Link to="/" className="gradient-cta text-primary-foreground font-body font-bold text-sm px-8 py-3 rounded-full inline-block">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cart.map(item => (
                <div key={item.product.id + item.size} className="flex gap-4 bg-card rounded-2xl p-4 shadow-soft">
                  <Link to={`/product/${item.product.id}`}>
                    <img src={item.product.image} alt={item.product.name} className="w-24 h-28 rounded-xl object-cover" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link to={`/product/${item.product.id}`}>
                      <h3 className="font-body text-sm font-semibold text-foreground truncate hover:text-primary">{item.product.name}</h3>
                    </Link>
                    <p className="font-body text-xs text-muted-foreground mt-0.5">Size: {item.size}</p>
                    <p className="font-body font-bold text-foreground mt-2">₹{item.product.price.toLocaleString()}</p>
                    <div className="flex items-center gap-3 mt-3">
                      <button onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)} className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-muted">
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="font-body text-sm font-semibold w-6 text-center">{item.quantity}</span>
                      <button onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)} className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-muted">
                        <Plus className="h-3 w-3" />
                      </button>
                      <button onClick={() => removeFromCart(item.product.id)} className="ml-auto p-2 text-muted-foreground hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-soft h-fit sticky top-40">
              <h3 className="font-display text-lg font-bold text-foreground mb-4">Order Summary</h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between font-body text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground font-medium">₹{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-body text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-primary font-medium">Free</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between font-body">
                  <span className="font-semibold text-foreground">Total</span>
                  <span className="font-bold text-foreground text-lg">₹{cartTotal.toLocaleString()}</span>
                </div>
              </div>
              <button className="w-full gradient-cta text-primary-foreground font-body font-bold text-sm py-3.5 rounded-full hover:shadow-hover transition-all">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
