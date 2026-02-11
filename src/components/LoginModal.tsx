import { useState } from "react";
import { X } from "lucide-react";
import { useStore } from "@/context/StoreContext";

const LoginModal = () => {
  const { showLogin, setShowLogin, login } = useStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!showLogin) return null;

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Name is required";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Valid email is required";
    if (!phone.trim() || !/^\d{10}$/.test(phone.replace(/\D/g, ""))) e.phone = "Valid 10-digit number is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      login({ name: name.trim(), email: email.trim(), phone: phone.trim() });
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-foreground/30 backdrop-blur-sm" onClick={() => setShowLogin(false)} />
      <div className="relative bg-card rounded-2xl p-8 w-full max-w-md shadow-card animate-fade-in mx-4">
        <button onClick={() => setShowLogin(false)} className="absolute top-4 right-4 p-2 hover:bg-muted rounded-full">
          <X className="h-5 w-5 text-foreground" />
        </button>

        <h2 className="font-display text-2xl font-bold text-foreground mb-1">Welcome to Spanco</h2>
        <p className="font-body text-sm text-muted-foreground mb-6">Sign in to continue shopping</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-body text-sm font-medium text-foreground block mb-1.5">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              maxLength={100}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="Enter your name"
            />
            {errors.name && <p className="text-xs text-destructive mt-1 font-body">{errors.name}</p>}
          </div>

          <div>
            <label className="font-body text-sm font-medium text-foreground block mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              maxLength={255}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-xs text-destructive mt-1 font-body">{errors.email}</p>}
          </div>

          <div>
            <label className="font-body text-sm font-medium text-foreground block mb-1.5">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              maxLength={15}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="10-digit mobile number"
            />
            {errors.phone && <p className="text-xs text-destructive mt-1 font-body">{errors.phone}</p>}
          </div>

          <button type="submit" className="w-full gradient-cta text-primary-foreground font-body font-bold text-sm py-3.5 rounded-full hover:shadow-hover transition-all mt-2">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
