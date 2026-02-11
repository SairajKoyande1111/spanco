import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground/80">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-display text-2xl font-bold text-primary-foreground mb-2">
              SPANCO
            </h3>
            <p className="text-xs tracking-[0.2em] text-primary-foreground/50 uppercase mb-4">
              Kids Fashion
            </p>
            <p className="font-body text-sm text-primary-foreground/60 mb-6">
              Premium children's clothing crafted with love, comfort, and style.
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 rounded-full border border-primary-foreground/20 hover:border-primary-foreground/50 transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-full border border-primary-foreground/20 hover:border-primary-foreground/50 transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-full border border-primary-foreground/20 hover:border-primary-foreground/50 transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-body text-sm font-semibold text-primary-foreground uppercase tracking-wider mb-4">
              Shop
            </h4>
            <ul className="space-y-2.5">
              {[
                { name: "Infant", path: "/shop/infant" },
                { name: "Boys", path: "/shop/boys" },
                { name: "Girls", path: "/shop/girls" },
                { name: "Ethnic Wear", path: "/shop/ethnic-wear" },
                { name: "Sale", path: "/shop/sale" }
              ].map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className="font-body text-sm hover:text-primary-foreground transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-body text-sm font-semibold text-primary-foreground uppercase tracking-wider mb-4">
              Help
            </h4>
            <ul className="space-y-2.5">
              {[
                { name: "Size Guide", path: "/help/size-guide" },
                { name: "Track Order", path: "/help/track-order" },
                { name: "Returns", path: "/help/returns" },
                { name: "FAQs", path: "/help/faqs" },
                { name: "Contact Us", path: "/help/contact" }
              ].map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className="font-body text-sm hover:text-primary-foreground transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-body text-sm font-semibold text-primary-foreground uppercase tracking-wider mb-4">
              Stay Updated
            </h4>
            <p className="font-body text-sm text-primary-foreground/60 mb-4">
              Get 10% off your first order when you sign up.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-primary-foreground/10 border border-primary-foreground/20 rounded-l-full px-4 py-2.5 text-sm font-body text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-primary"
              />
              <button className="bg-primary text-primary-foreground font-body text-sm font-semibold px-5 py-2.5 rounded-r-full hover:bg-primary/90 transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center">
          <p className="font-body text-xs text-primary-foreground/40">
            © 2026 Spanco Brand. All rights reserved. Crafted with ♥ for little ones.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
