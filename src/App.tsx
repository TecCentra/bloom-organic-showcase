import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { MaterialUIProvider } from "@/components/MaterialUIProvider";
import { ToastProvider } from "@/hooks/useMaterialToast";
import { ConfirmProvider } from "@/hooks/useMaterialConfirm";
import ScrollToTop from "./components/ScrollToTop";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
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
import { UserAuthProvider } from "./context/UserAuthContext";
import AllProducts from "./pages/AllProducts";
import CategoriesPage from "./pages/CategoriesPage";
import CategoryProducts from "./pages/CategoryProducts";
import ForgotPassword from "./pages/ForgotPassword";
import UserProfile from "./pages/UserProfile";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <MaterialUIProvider>
      <ToastProvider>
        <ConfirmProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <UserAuthProvider>
                <CartProvider>
                  <ScrollToTop />
                  <FloatingWhatsApp />
                  <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/blogs" element={<FeaturedBlogs />} />
                <Route path="/blog/:id" element={<BlogDetail />} />
                <Route path="/faqs" element={<FAQs />} />
                <Route path="/shop" element={<AllProducts />} />
                <Route path="/products" element={<CategoriesPage />} />
                <Route path="/products/:slug" element={<CategoryProducts />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/signup" element={<RegisterForm />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/admin/*" element={
                  <AdminAuthProvider>
                    <AdminPanel />
                  </AdminAuthProvider>
                } />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
                
                </Routes>
                </CartProvider>
              </UserAuthProvider>
            </BrowserRouter>
          </TooltipProvider>
        </ConfirmProvider>
      </ToastProvider>
    </MaterialUIProvider>
  </QueryClientProvider>
);

export default App;