import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StoreProvider } from "@/context/StoreContext";
import LoginModal from "@/components/LoginModal";
import Index from "./pages/Index";
import CategoryPage from "./pages/CategoryPage";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";
import Infant from "./pages/shop/Infant";
import Boys from "./pages/shop/Boys";
import Girls from "./pages/shop/Girls";
import EthnicWear from "./pages/shop/EthnicWear";
import Sale from "./pages/shop/Sale";
import SizeGuide from "./pages/help/SizeGuide";
import TrackOrder from "./pages/help/TrackOrder";
import Returns from "./pages/help/Returns";
import FAQs from "./pages/help/FAQs";
import ContactUs from "./pages/help/ContactUs";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <StoreProvider>
        <Toaster />
        <Sonner />
        <LoginModal />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/category/:category/:subcategory" element={<CategoryPage />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/shop/infant" element={<CategoryPage />} />
            <Route path="/shop/boys" element={<CategoryPage />} />
            <Route path="/shop/girls" element={<CategoryPage />} />
            <Route path="/shop/ethnic-wear" element={<CategoryPage />} />
            <Route path="/shop/sale" element={<CategoryPage />} />
            <Route path="/help/size-guide" element={<SizeGuide />} />
            <Route path="/help/track-order" element={<TrackOrder />} />
            <Route path="/help/returns" element={<Returns />} />
            <Route path="/help/faqs" element={<FAQs />} />
            <Route path="/help/contact" element={<ContactUs />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </StoreProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
