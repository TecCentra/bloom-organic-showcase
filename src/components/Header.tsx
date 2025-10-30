// import { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { Menu, X } from "lucide-react";
// import Logo from "@/assets/logo.jpeg";

// const Header = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const location = useLocation();

//   const navLinks = [
//     { name: "Home", path: "/" },
//     { name: "Featured Blogs", path: "/blogs" },
//     { name: "FAQs", path: "/faqs" },
//     { name: "Contact Us", path: "/contact" },
//   ];

//   const isActive = (path: string) => location.pathname === path;

//   return (
//     <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
//       <nav className="container mx-auto px-4 py-4">
//         <div className="flex items-center justify-between">
//           <Link to="/" className="flex items-center gap-3 group">
//             <img 
//               src={Logo} 
//               alt="Organic Bloom Logo" 
//               className="w-20 h-20 rounded-full object-cover transition-transform duration-300 group-hover:scale-110"
//             />
//             <span className="text-2xl font-heading font-semibold text-foreground">
//               Organic<br/>Bloom
//             </span>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center gap-8">
//             {navLinks.map((link) => {
//               const isContact = link.name === "Contact Us";
//               return (
//                 <Link
//                   key={link.path}
//                   to={link.path}
//                   className={
//                     isContact
//                       ? `px-4 py-2 rounded-xl border ${
//                           isActive(link.path)
//                             ? "border-primary text-primary"
//                             : "border-foreground/30 text-foreground hover:border-primary hover:text-primary"
//                         } transition-colors font-body font-medium`
//                       : `relative font-body font-medium transition-colors duration-300 ${
//                           isActive(link.path)
//                             ? "text-primary"
//                             : "text-foreground hover:text-primary"
//                         } after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left ${
//                           isActive(link.path) ? "after:scale-x-100" : ""
//                         }`
//                   }
//                 >
//                   {link.name}
//                 </Link>
//               );
//             })}
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             className="md:hidden text-foreground hover:text-primary transition-colors"
//             aria-label="Toggle menu"
//           >
//             {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//           </button>
//         </div>

//         {/* Mobile Navigation */}
//         {isMenuOpen && (
//           <div className="md:hidden mt-4 py-4 border-t border-border animate-fade-in">
//             {navLinks.map((link) => {
//               const isContact = link.name === "Contact Us";
//               return (
//                 <Link
//                   key={link.path}
//                   to={link.path}
//                   onClick={() => setIsMenuOpen(false)}
//                   className={
//                     isContact
//                       ? `block w-full text-center mt-2 px-4 py-2 rounded-xl border ${
//                           isActive(link.path)
//                             ? "border-primary text-primary"
//                             : "border-foreground/30 text-foreground hover:border-primary hover:text-primary"
//                         } transition-colors font-body font-medium`
//                       : `block py-2 font-body font-medium transition-colors duration-300 ${
//                           isActive(link.path)
//                             ? "text-primary"
//                             : "text-foreground hover:text-primary"
//                         }`
//                   }
//                 >
//                   {link.name}
//                 </Link>
//               );
//             })}
//           </div>
//         )}
//       </nav>
//     </header>
//   );
// };

// export default Header;
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, ShoppingCart, User } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Logo from "@/assets/logo.jpeg";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const { itemCount } = useCart();

  // Check if user is logged in
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    };

    // Check on mount
    checkAuth();

    // Listen for storage changes (e.g., login/logout in another tab)
    window.addEventListener('storage', checkAuth);

    // Custom event for same-tab login/logout
    window.addEventListener('authChange', checkAuth);

    return () => {
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener('authChange', checkAuth);
    };
  }, []);

  const productCategories = [
    {
      name: "Weight Management Products",
      description: "Flat tummy, upper body fat, full weight loss packages",
      path: "/products/weight-management"
    },
    {
      name: "Yoni & Female Fertility Care",
      description: "Steam herbs, washes, tightening pearls & more",
      path: "/products/female-care"
    },
    {
      name: "Men's Boosters & Fertility Support",
      description: "Stamina, libido, and reproductive health",
      path: "/products/mens-health"
    },
    {
      name: "Natural Skin Care",
      description: "Healing soaps, oils, scrubs, and glow enhancers",
      path: "/products/skin-care"
    },
    {
      name: "Nutritional Supplements",
      description: "Essential vitamins and health supplements",
      path: "/products/supplements"
    }
  ];

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products", hasDropdown: true },
    { name: "Featured Blogs", path: "/blogs" },
    { name: "FAQs", path: "/faqs" },
    { name: "Contact Us", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <nav className="container mx-auto px-3 py-1 md:px-4 md:py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src={Logo} 
              alt="Organic Bloom Logo" 
              className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <span className="text-sm md:text-lg lg:text-xl font-heading font-semibold text-foreground leading-tight">
              Organic<br/>Bloom
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isContact = link.name === "Contact Us";
              const isProducts = link.hasDropdown;
              
              if (isProducts) {
                return (
                  <div
                    key={link.path}
                    className="relative"
                    onMouseEnter={() => setIsProductsOpen(true)}
                    onMouseLeave={() => setIsProductsOpen(false)}
                  >
                    <button
                      type="button"
                      className={`relative font-body font-medium transition-colors duration-300 flex items-center gap-1 ${
                        location.pathname.startsWith("/products")
                          ? "text-primary"
                          : "text-foreground hover:text-primary"
                      } after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left ${
                        location.pathname.startsWith("/products") ? "after:scale-x-100" : ""
                      }`}
                      aria-haspopup="menu"
                      onClick={() => setIsProductsOpen((v) => !v)}
                    >
                      {link.name}
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isProductsOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {isProductsOpen && (
                      <div className="absolute top-full left-0 mt-2 w-80 bg-background border border-border rounded-xl shadow-lg overflow-hidden animate-fade-in">
                        {productCategories.map((category) => (
                          <Link
                            key={category.path}
                            to={category.path}
                            onClick={(e) => { e.stopPropagation(); setIsProductsOpen(false); }}
                            className="block px-6 py-4 hover:bg-primary/5 transition-colors border-b border-border last:border-b-0"
                          >
                            <div className="font-body font-semibold text-foreground mb-1">
                              {category.name}
                            </div>
                            <div className="text-sm text-foreground/60">
                              {category.description}
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={
                    isContact
                      ? `px-4 py-2 rounded-xl border ${
                          isActive(link.path)
                            ? "border-primary text-primary"
                            : "border-foreground/30 text-foreground hover:border-primary hover:text-primary"
                        } transition-colors font-body font-medium`
                      : `relative font-body font-medium transition-colors duration-300 ${
                          isActive(link.path)
                            ? "text-primary"
                            : "text-foreground hover:text-primary"
                        } after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left ${
                          isActive(link.path) ? "after:scale-x-100" : ""
                        }`
                  }
                >
                  {link.name}
                </Link>
              );
            })}
            {/* Profile Icon (Desktop) - Only show when logged in */}
            {isLoggedIn && (
              <Link to="/profile" className="relative group" aria-label="Profile">
                <User className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
              </Link>
            )}
            {/* Cart Icon (Desktop) */}
            <Link to="/cart" className="relative group" aria-label="Cart">
              <ShoppingCart className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 rounded-full bg-primary text-white text-xs flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            {/* Profile Icon (Mobile) - Only show when logged in */}
            {isLoggedIn && (
              <Link to="/profile" className="relative" aria-label="Profile">
                <User className="w-4 h-4 text-foreground" />
              </Link>
            )}
            {/* Cart Icon (Mobile) */}
            <Link to="/cart" className="relative" aria-label="Cart">
              <ShoppingCart className="w-4 h-4 text-foreground" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 min-w-[16px] h-[16px] px-1 rounded-full bg-primary text-white text-[10px] flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-foreground hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
              {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-1 py-1 border-t border-border animate-fade-in">
            {navLinks.map((link) => {
              const isContact = link.name === "Contact Us";
              const isProducts = link.hasDropdown;
              
              if (isProducts) {
                return (
                  <div key={link.path} className="mb-1">
                    <button
                      onClick={() => setIsProductsOpen(!isProductsOpen)}
                      className={`block w-full text-left py-1 font-body font-medium transition-colors duration-300 flex items-center gap-1.5 ${
                        isActive(link.path) || location.pathname.startsWith("/products")
                          ? "text-primary"
                          : "text-foreground hover:text-primary"
                      }`}
                    >
                      {link.name}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isProductsOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isProductsOpen && (
                      <div className="ml-3 mt-1 space-y-1 animate-fade-in">
                        {productCategories.map((category) => (
                          <Link
                            key={category.path}
                            to={category.path}
                            onClick={() => setIsMenuOpen(false)}
                            className="block py-1 px-2 rounded-lg hover:bg-primary/5 transition-colors text-xs"
                          >
                            <div className="font-body font-medium text-xs text-foreground">
                              {category.name}
                            </div>
                            <div className="text-[11px] text-foreground/60 mt-0.5">
                              {category.description}
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={
                    isContact
                      ? `block w-full text-center mt-1 px-2.5 py-1.5 rounded-xl border text-xs ${
                          isActive(link.path)
                            ? "border-primary text-primary"
                            : "border-foreground/30 text-foreground hover:border-primary hover:text-primary"
                        } transition-colors font-body font-medium`
                      : `block py-1.5 text-xs font-body font-medium transition-colors duration-300 ${
                          isActive(link.path)
                            ? "text-primary"
                            : "text-foreground hover:text-primary"
                        }`
                  }
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;