import { User, Mail, Phone, ShoppingBag, Heart, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useStore } from "@/context/StoreContext";

const ProfilePage = () => {
  const { user, logout, setShowLogin, cartCount, wishlistCount } = useStore();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-20 text-center">
          <User className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
          <p className="font-body text-lg text-muted-foreground mb-4">Please sign in to view your profile</p>
          <button onClick={() => setShowLogin(true)} className="gradient-cta text-primary-foreground font-body font-bold text-sm px-8 py-3 rounded-full">
            Sign In
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8">My Profile</h1>

        <div className="bg-card rounded-2xl p-6 md:p-8 shadow-soft mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full gradient-cta flex items-center justify-center">
              <span className="text-primary-foreground font-display text-2xl font-bold">{user.name.charAt(0).toUpperCase()}</span>
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-foreground">{user.name}</h2>
              <p className="font-body text-sm text-muted-foreground">Member</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
              <Mail className="h-4 w-4 text-primary" />
              <div>
                <p className="font-body text-xs text-muted-foreground">Email</p>
                <p className="font-body text-sm text-foreground">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
              <Phone className="h-4 w-4 text-primary" />
              <div>
                <p className="font-body text-xs text-muted-foreground">Phone</p>
                <p className="font-body text-sm text-foreground">{user.phone}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <Link to="/cart" className="bg-card rounded-2xl p-5 shadow-soft hover:shadow-card transition-shadow text-center">
            <ShoppingBag className="h-6 w-6 text-primary mx-auto mb-2" />
            <p className="font-body text-2xl font-bold text-foreground">{cartCount}</p>
            <p className="font-body text-xs text-muted-foreground">Cart Items</p>
          </Link>
          <Link to="/wishlist" className="bg-card rounded-2xl p-5 shadow-soft hover:shadow-card transition-shadow text-center">
            <Heart className="h-6 w-6 text-primary mx-auto mb-2" />
            <p className="font-body text-2xl font-bold text-foreground">{wishlistCount}</p>
            <p className="font-body text-xs text-muted-foreground">Wishlist</p>
          </Link>
        </div>

        <button
          onClick={() => { logout(); navigate("/"); }}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full border-2 border-border font-body text-sm font-semibold text-foreground hover:border-destructive hover:text-destructive transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;
