import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import Contact from "./pages/Contact";
import FeaturedBlogs from "./pages/FeaturedBlogs";
import BlogDetail from "./pages/BlogDetail";
import FAQs from "./pages/FAQs";
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/productid";
import CheckoutPage from "./pages/checkoutPage";
import CartPage from "./pages/cartPage";
import RegisterForm from "./pages/signup";
import AdminPanel from "./pages/admin";
import { AdminAuthProvider } from "./context/AdminAuthContext";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <CartProvider>
          <ScrollToTop />
          <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blogs" element={<FeaturedBlogs />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/signup" element={<RegisterForm />} />
          <Route path="/admin/*" element={
            <AdminAuthProvider>
              <AdminPanel />
            </AdminAuthProvider>
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
          
          </Routes>
        </CartProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;