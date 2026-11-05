// // // // // import { useState } from "react";
// // // // // import { Link, useLocation } from "react-router-dom";
// // // // // import { Menu, X } from "lucide-react";
// // // // // import Logo from "@/assets/logo.jpeg";

// // // // // const Header = () => {
// // // // //   const [isMenuOpen, setIsMenuOpen] = useState(false);
// // // // //   const location = useLocation();

// // // // //   const navLinks = [
// // // // //     { name: "Home", path: "/" },
// // // // //     { name: "Featured Blogs", path: "/blogs" },
// // // // //     { name: "FAQs", path: "/faqs" },
// // // // //     { name: "Contact Us", path: "/contact" },
// // // // //   ];

// // // // //   const isActive = (path: string) => location.pathname === path;

// // // // //   return (
// // // // //     <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
// // // // //       <nav className="container mx-auto px-4 py-4">
// // // // //         <div className="flex items-center justify-between">
// // // // //           <Link to="/" className="flex items-center gap-3 group">
// // // // //             <img 
// // // // //               src={Logo} 
// // // // //               alt="Organic Bloom Logo" 
// // // // //               className="w-20 h-20 rounded-full object-cover transition-transform duration-300 group-hover:scale-110"
// // // // //             />
// // // // //             <span className="text-2xl font-heading font-semibold text-foreground">
// // // // //               Organic<br/>Bloom
// // // // //             </span>
// // // // //           </Link>

// // // // //           {/* Desktop Navigation */}
// // // // //           <div className="hidden md:flex items-center gap-8">
// // // // //             {navLinks.map((link) => {
// // // // //               const isContact = link.name === "Contact Us";
// // // // //               return (
// // // // //                 <Link
// // // // //                   key={link.path}
// // // // //                   to={link.path}
// // // // //                   className={
// // // // //                     isContact
// // // // //                       ? `px-4 py-2 rounded-xl border ${
// // // // //                           isActive(link.path)
// // // // //                             ? "border-primary text-primary"
// // // // //                             : "border-foreground/30 text-foreground hover:border-primary hover:text-primary"
// // // // //                         } transition-colors font-body font-medium`
// // // // //                       : `relative font-body font-medium transition-colors duration-300 ${
// // // // //                           isActive(link.path)
// // // // //                             ? "text-primary"
// // // // //                             : "text-foreground hover:text-primary"
// // // // //                         } after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left ${
// // // // //                           isActive(link.path) ? "after:scale-x-100" : ""
// // // // //                         }`
// // // // //                   }
// // // // //                 >
// // // // //                   {link.name}
// // // // //                 </Link>
// // // // //               );
// // // // //             })}
// // // // //           </div>

// // // // //           {/* Mobile Menu Button */}
// // // // //           <button
// // // // //             onClick={() => setIsMenuOpen(!isMenuOpen)}
// // // // //             className="md:hidden text-foreground hover:text-primary transition-colors"
// // // // //             aria-label="Toggle menu"
// // // // //           >
// // // // //             {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
// // // // //           </button>
// // // // //         </div>

// // // // //         {/* Mobile Navigation */}
// // // // //         {isMenuOpen && (
// // // // //           <div className="md:hidden mt-4 py-4 border-t border-border animate-fade-in">
// // // // //             {navLinks.map((link) => {
// // // // //               const isContact = link.name === "Contact Us";
// // // // //               return (
// // // // //                 <Link
// // // // //                   key={link.path}
// // // // //                   to={link.path}
// // // // //                   onClick={() => setIsMenuOpen(false)}
// // // // //                   className={
// // // // //                     isContact
// // // // //                       ? `block w-full text-center mt-2 px-4 py-2 rounded-xl border ${
// // // // //                           isActive(link.path)
// // // // //                             ? "border-primary text-primary"
// // // // //                             : "border-foreground/30 text-foreground hover:border-primary hover:text-primary"
// // // // //                         } transition-colors font-body font-medium`
// // // // //                       : `block py-2 font-body font-medium transition-colors duration-300 ${
// // // // //                           isActive(link.path)
// // // // //                             ? "text-primary"
// // // // //                             : "text-foreground hover:text-primary"
// // // // //                         }`
// // // // //                   }
// // // // //                 >
// // // // //                   {link.name}
// // // // //                 </Link>
// // // // //               );
// // // // //             })}
// // // // //           </div>
// // // // //         )}
// // // // //       </nav>
// // // // //     </header>
// // // // //   );
// // // // // };

// // // // // export default Header;
// // // // import React, { useState, useEffect } from "react";
// // // // import { Link, useLocation } from "react-router-dom";
// // // // import { Menu, X, ChevronDown, ShoppingCart, User } from "lucide-react";
// // // // import { useCart } from "@/context/CartContext";
// // // // import Logo from "@/assets/logo.jpeg";

// // // // const Header = () => {
// // // //   const [isMenuOpen, setIsMenuOpen] = useState(false);
// // // //   const [isDesktopProductsOpen, setIsDesktopProductsOpen] = useState(false);
// // // //   const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
// // // //   const [isLoggedIn, setIsLoggedIn] = useState(false);
// // // //   const location = useLocation();
// // // //   const { itemCount } = useCart();

// // // //   // Check if user is logged in
// // // //   useEffect(() => {
// // // //     const checkAuth = () => {
// // // //       const token = localStorage.getItem('token');
// // // //       setIsLoggedIn(!!token);
// // // //     };

// // // //     // Check on mount
// // // //     checkAuth();

// // // //     // Listen for storage changes (e.g., login/logout in another tab)
// // // //     window.addEventListener('storage', checkAuth);

// // // //     // Custom event for same-tab login/logout
// // // //     window.addEventListener('authChange', checkAuth);

// // // //     return () => {
// // // //       window.removeEventListener('storage', checkAuth);
// // // //       window.removeEventListener('authChange', checkAuth);
// // // //     };
// // // //   }, []);

// // // //   const productCategories = [
// // // //     {
// // // //       name: "Weight Management Products",
// // // //       description: "Flat tummy, upper body fat, full weight loss packages",
// // // //       path: "/products/weight-management"
// // // //     },
// // // //     {
// // // //       name: "Yoni & Female Fertility Care",
// // // //       description: "Steam herbs, washes, tightening pearls & more",
// // // //       path: "/products/female-care"
// // // //     },
// // // //     {
// // // //       name: "Men's Boosters & Fertility Support",
// // // //       description: "Stamina, libido, and reproductive health",
// // // //       path: "/products/mens-health"
// // // //     },
// // // //     {
// // // //       name: "Natural Skin Care",
// // // //       description: "Healing soaps, oils, scrubs, and glow enhancers",
// // // //       path: "/products/skin-care"
// // // //     },
// // // //     {
// // // //       name: "Nutritional Supplements",
// // // //       description: "Essential vitamins and health supplements",
// // // //       path: "/products/supplements"
// // // //     },
// // // //     {
// // // //       name: "Organic Herbs",
// // // //       description: "Pure, sustainably sourced herbs for wellness and rituals",
// // // //       path: "/products/organic-herbs"
// // // //     },
// // // //     {
// // // //       name: "Pure Honey & Honey Products",
// // // //       description: "Discover the natural goodness of pure, unprocessed honey and a curated selection of honey-based products. Sourced with care, our honey retains its rich flavor, golden color, and essential nutrients, making it perfect for everyday use.",
// // // //       path: "/products/pure-honey"
// // // //     }
// // // //   ];

// // // //   const navLinks = [
// // // //     { name: "Home", path: "/" },
// // // //     { name: "Products", path: "/products", hasDropdown: true },
// // // //     { name: "Featured Blogs", path: "/blogs" },
// // // //     { name: "FAQs", path: "/faqs" },
// // // //     { name: "Contact Us", path: "/contact" },
// // // //   ];

// // // //   const isActive = (path: string) => location.pathname === path;

// // // //   return (
// // // //     <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
// // // //       <nav className="container mx-auto px-3 py-1 md:px-4 md:py-3">
// // // //         <div className="flex items-center justify-between">
// // // //           <Link to="/" className="flex items-center gap-3 group">
// // // //             <img 
// // // //               src={Logo} 
// // // //               alt="Organic Bloom Logo" 
// // // //               className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full object-cover transition-transform duration-300 group-hover:scale-110"
// // // //             />
// // // //             <span className="text-sm md:text-lg lg:text-xl font-heading font-semibold text-foreground leading-tight">
// // // //               Organic<br/>Bloom
// // // //             </span>
// // // //           </Link>

// // // //           {/* Desktop Navigation */}
// // // //           <div className="hidden md:flex items-center gap-8">
// // // //             {navLinks.map((link) => {
// // // //               const isProducts = link.hasDropdown;
              
// // // //               if (isProducts) {
// // // //                 return (
// // // //                   <div
// // // //                     key={link.path}
// // // //                     className="relative"
// // // //                     onMouseEnter={() => setIsDesktopProductsOpen(true)}
// // // //                     onMouseLeave={() => setIsDesktopProductsOpen(false)}
// // // //                   >
// // // //                     <button
// // // //                       type="button"
// // // //                       className={`relative font-body font-medium transition-colors duration-300 flex items-center gap-1 ${
// // // //                         location.pathname.startsWith("/products")
// // // //                           ? "text-primary"
// // // //                           : "text-foreground hover:text-primary"
// // // //                       } after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left ${
// // // //                         location.pathname.startsWith("/products") ? "after:scale-x-100" : ""
// // // //                       }`}
// // // //                       aria-haspopup="menu"
// // // //                       onClick={() => setIsDesktopProductsOpen((v) => !v)}
// // // //                     >
// // // //                       {link.name}
// // // //                       <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isDesktopProductsOpen ? 'rotate-180' : ''}`} />
// // // //                     </button>
                    
// // // //                     {isDesktopProductsOpen && (
// // // //                       <div className="absolute top-full left-0 mt-2 w-80 bg-background border border-border rounded-xl shadow-lg overflow-hidden animate-fade-in">
// // // //                         {productCategories.map((category) => (
// // // //                           <Link
// // // //                             key={category.path}
// // // //                             to={category.path}
// // // //                             onClick={(e) => { e.stopPropagation(); setIsDesktopProductsOpen(false); }}
// // // //                             className="block px-6 py-4 hover:bg-primary/5 transition-colors border-b border-border last:border-b-0"
// // // //                           >
// // // //                             <div className="font-body font-semibold text-foreground mb-1">
// // // //                               {category.name}
// // // //                             </div>
// // // //                             <div className="text-sm text-foreground/60">
// // // //                               {category.description}
// // // //                             </div>
// // // //                           </Link>
// // // //                         ))}
// // // //                       </div>
// // // //                     )}
// // // //                   </div>
// // // //                 );
// // // //               }
              
// // // //               return (
// // // //                 <Link
// // // //                   key={link.path}
// // // //                   to={link.path}
// // // //                   className={`relative font-body font-medium transition-colors duration-300 ${
// // // //                     isActive(link.path)
// // // //                       ? "text-primary"
// // // //                       : "text-foreground hover:text-primary"
// // // //                   } after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left ${
// // // //                     isActive(link.path) ? "after:scale-x-100" : ""
// // // //                   }`}
// // // //                 >
// // // //                   {link.name}
// // // //                 </Link>
// // // //               );
// // // //             })}
// // // //             {/* Login Button (Desktop) - Appears last after all nav links */}
// // // //             {!isLoggedIn && (
// // // //               <Link
// // // //                 to="/login"
// // // //                 className={`px-4 py-2 rounded-xl border ${
// // // //                   isActive("/login")
// // // //                     ? "border-primary text-primary"
// // // //                     : "border-foreground/30 text-foreground hover:border-primary hover:text-primary"
// // // //                 } transition-colors font-body font-medium`}
// // // //               >
// // // //                 Login
// // // //               </Link>
// // // //             )}
// // // //             {/* Profile Icon (Desktop) - Only show when logged in */}
// // // //             {isLoggedIn && (
// // // //               <Link to="/profile" className="relative group" aria-label="Profile">
// // // //                 <User className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
// // // //               </Link>
// // // //             )}
// // // //             {/* Cart Icon (Desktop) */}
// // // //             <Link to="/cart" className="relative group" aria-label="Cart">
// // // //               <ShoppingCart className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
// // // //               {itemCount > 0 && (
// // // //                 <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 rounded-full bg-primary text-white text-xs flex items-center justify-center">
// // // //                   {itemCount}
// // // //                 </span>
// // // //               )}
// // // //             </Link>
// // // //           </div>

// // // //           {/* Mobile Menu Button */}
// // // //           <div className="md:hidden flex items-center gap-2">
// // // //             {/* Profile Icon (Mobile) - Only show when logged in */}
// // // //             {isLoggedIn && (
// // // //               <Link to="/profile" className="relative" aria-label="Profile">
// // // //                 <User className="w-4 h-4 text-foreground" />
// // // //               </Link>
// // // //             )}
// // // //             {/* Cart Icon (Mobile) */}
// // // //             <Link to="/cart" className="relative" aria-label="Cart">
// // // //               <ShoppingCart className="w-4 h-4 text-foreground" />
// // // //               {itemCount > 0 && (
// // // //                 <span className="absolute -top-2 -right-2 min-w-[16px] h-[16px] px-1 rounded-full bg-primary text-white text-[10px] flex items-center justify-center">
// // // //                   {itemCount}
// // // //                 </span>
// // // //               )}
// // // //             </Link>
// // // //             <button
// // // //             onClick={() => setIsMenuOpen(!isMenuOpen)}
// // // //             className="md:hidden text-foreground hover:text-primary transition-colors"
// // // //             aria-label="Toggle menu"
// // // //           >
// // // //               {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
// // // //             </button>
// // // //           </div>
// // // //         </div>

// // // //         {/* Mobile Navigation */}
// // // //         {isMenuOpen && (
// // // //           <div className="md:hidden mt-1 py-1 border-t border-border animate-fade-in">
// // // //             {navLinks.map((link) => {
// // // //               const isProducts = link.hasDropdown;
              
// // // //               if (isProducts) {
// // // //                 return (
// // // //                   <div key={link.path} className="mb-1">
// // // //                     <button
// // // //                       onClick={() => setIsMobileProductsOpen(!isMobileProductsOpen)}
// // // //                       className={`block w-full text-left py-1 font-body font-medium transition-colors duration-300 flex items-center gap-1.5 ${
// // // //                         isActive(link.path) || location.pathname.startsWith("/products")
// // // //                           ? "text-primary"
// // // //                           : "text-foreground hover:text-primary"
// // // //                       }`}
// // // //                     >
// // // //                       {link.name}
// // // //                       <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isMobileProductsOpen ? 'rotate-180' : ''}`} />
// // // //                     </button>
// // // //                     {isMobileProductsOpen && (
// // // //                       <div className="ml-3 mt-1 space-y-1 animate-fade-in">
// // // //                         {productCategories.map((category) => (
// // // //                           <Link
// // // //                             key={category.path}
// // // //                             to={category.path}
// // // //                             onClick={() => {setIsMobileProductsOpen(false); setIsMenuOpen(false);}}
// // // //                             className="block py-1 px-2 rounded-lg hover:bg-primary/5 transition-colors text-xs"
// // // //                           >
// // // //                             <div className="font-body font-medium text-xs text-foreground">
// // // //                               {category.name}
// // // //                             </div>
// // // //                             <div className="text-[11px] text-foreground/60 mt-0.5">
// // // //                               {category.description}
// // // //                             </div>
// // // //                           </Link>
// // // //                         ))}
// // // //                       </div>
// // // //                     )}
// // // //                   </div>
// // // //                 );
// // // //               }
              
// // // //               return (
// // // //                 <Link
// // // //                   key={link.path}
// // // //                   to={link.path}
// // // //                   onClick={() => setIsMenuOpen(false)}
// // // //                   className={`block py-1.5 text-xs font-body font-medium transition-colors duration-300 ${
// // // //                     isActive(link.path)
// // // //                       ? "text-primary"
// // // //                       : "text-foreground hover:text-primary"
// // // //                   }`}
// // // //                 >
// // // //                   {link.name}
// // // //                 </Link>
// // // //               );
// // // //             })}
// // // //             {/* Login Button (Mobile) - Appears last after all nav links */}
// // // //             {!isLoggedIn && (
// // // //               <Link
// // // //                 to="/login"
// // // //                 onClick={() => setIsMenuOpen(false)}
// // // //                 className={`block w-full text-center mt-1 px-2.5 py-1.5 rounded-xl border text-xs ${
// // // //                   isActive("/login")
// // // //                     ? "border-primary text-primary"
// // // //                     : "border-foreground/30 text-foreground hover:border-primary hover:text-primary"
// // // //                 } transition-colors font-body font-medium`}
// // // //               >
// // // //                 Login
// // // //               </Link>
// // // //             )}
// // // //           </div>
// // // //         )}
// // // //       </nav>
// // // //     </header>
// // // //   );
// // // // };

// // // // export default Header;
// // // import React, { useState, useEffect, useRef } from "react";
// // // import { Link, useLocation, useNavigate } from "react-router-dom";
// // // import { Menu, X, ChevronDown, ShoppingCart, User, Search } from "lucide-react";
// // // import { useCart } from "@/context/CartContext";
// // // import Logo from "@/assets/logo.jpeg";
// // // import { AuthModal } from "@/components/AuthModal";

// // // const Header = () => {
// // //   const [isMenuOpen, setIsMenuOpen] = useState(false);
// // //   const [isDesktopProductsOpen, setIsDesktopProductsOpen] = useState(false);
// // //   const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
// // //   const [isLoggedIn, setIsLoggedIn] = useState(false);
// // //   const [showAuthModal, setShowAuthModal] = useState(false);
// // //   const [searchQuery, setSearchQuery] = useState("");
// // //   const location = useLocation();
// // //   const navigate = useNavigate();
// // //   const { itemCount } = useCart();
// // //   const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

// // //   useEffect(() => {
// // //     const checkAuth = () => {
// // //       const token = localStorage.getItem("token");
// // //       setIsLoggedIn(!!token);
// // //     };
// // //     checkAuth();
// // //     window.addEventListener("storage", checkAuth);
// // //     window.addEventListener("authChange", checkAuth);
// // //     return () => {
// // //       window.removeEventListener("storage", checkAuth);
// // //       window.removeEventListener("authChange", checkAuth);
// // //     };
// // //   }, []);

// // //   // Close dropdown when route changes
// // //   useEffect(() => {
// // //     setIsDesktopProductsOpen(false);
// // //     setIsMenuOpen(false);
// // //     setIsMobileProductsOpen(false);
// // //   }, [location.pathname]);

// // //   const handleMouseEnter = () => {
// // //     if (closeTimer.current) clearTimeout(closeTimer.current);
// // //     setIsDesktopProductsOpen(true);
// // //   };

// // //   const handleMouseLeave = () => {
// // //     closeTimer.current = setTimeout(() => {
// // //       setIsDesktopProductsOpen(false);
// // //     }, 120); // small delay prevents accidental close when crossing the gap
// // //   };

// // //   const productCategories = [
// // //     {
// // //       name: "Weight Management Products",
// // //       description: "Flat tummy, upper body fat, full weight loss packages",
// // //       path: "/products/weight-management",
// // //     },
// // //     {
// // //       name: "Yoni & Female Fertility Care",
// // //       description: "Steam herbs, washes, tightening pearls & more",
// // //       path: "/products/female-care",
// // //     },
// // //     {
// // //       name: "Herbal Medicated Oils",
// // //       description: "Natural support for pain relief, joint care, skin & overall wellness.",
// // //       path: "/products/herbal-medicated-oils",
// // //     },
// // //     {
// // //       name: "Men's Boosters & Fertility Support",
// // //       description: "Stamina, libido, and reproductive health",
// // //       path: "/products/mens-health",
// // //     },
// // //     {
// // //       name: "Natural Skin Care",
// // //       description: "Healing soaps, oils, scrubs, and glow enhancers",
// // //       path: "/products/skin-care",
// // //     },
// // //     {
// // //       name: "Nutritional Supplements",
// // //       description: "Essential vitamins and health supplements",
// // //       path: "/products/supplements",
// // //     },
// // //     {
// // //       name: "Organic Herbs",
// // //       description: "Pure, sustainably sourced herbs for wellness and rituals",
// // //       path: "/products/organic-herbs",
// // //     },
// // //     {
// // //       name: "Pure Honey & Honey Products",
// // //       description:
// // //         "Natural goodness of pure, unprocessed honey and honey-based products",
// // //       path: "/products/pure-honey",
// // //     },
// // //   ];

// // //   const navLinks = [
// // //     { name: "Home", path: "/" },
// // //     { name: "Products", path: "/products", hasDropdown: true },
// // //     { name: "Featured Blogs", path: "/blogs" },
// // //     { name: "FAQs", path: "/faqs" },
// // //     { name: "Contact Us", path: "/contact" },
// // //   ];

// // //   const isActive = (path: string) => location.pathname === path;

// // //   return (
// // //     <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
// // //       <nav className="container mx-auto px-3 py-1 md:px-4 md:py-3">
// // //         <div className="flex items-center justify-between">
// // //           {/* Logo */}
// // //           <Link to="/" className="flex items-center gap-3 group">
// // //             <img
// // //               src={Logo}
// // //               alt="Organic Bloom Logo"
// // //               className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full object-cover transition-transform duration-300 group-hover:scale-110"
// // //             />
// // //             <span className="text-sm md:text-lg lg:text-xl font-heading font-semibold text-foreground leading-tight">
// // //               Organic
// // //               <br />
// // //               Bloom
// // //             </span>
// // //           </Link>

// // //           {/* ── Desktop Navigation ── */}
// // //           <div className="hidden md:flex items-center gap-8">
// // //             {navLinks.map((link) => {
// // //               if (link.hasDropdown) {
// // //                 return (
// // //                   <div
// // //                     key={link.path}
// // //                     className="relative"
// // //                     onMouseEnter={handleMouseEnter}
// // //                     onMouseLeave={handleMouseLeave}
// // //                   >
// // //                     <button
// // //                       type="button"
// // //                       onClick={() => setIsDesktopProductsOpen((v) => !v)}
// // //                       className={`relative font-body font-medium transition-colors duration-300 flex items-center gap-1 ${
// // //                         location.pathname.startsWith("/products")
// // //                           ? "text-primary"
// // //                           : "text-foreground hover:text-primary"
// // //                       } after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left ${
// // //                         location.pathname.startsWith("/products")
// // //                           ? "after:scale-x-100"
// // //                           : ""
// // //                       }`}
// // //                       aria-haspopup="menu"
// // //                       aria-expanded={isDesktopProductsOpen}
// // //                     >
// // //                       {link.name}
// // //                       <ChevronDown
// // //                         className={`w-4 h-4 transition-transform duration-300 ${
// // //                           isDesktopProductsOpen ? "rotate-180" : ""
// // //                         }`}
// // //                       />
// // //                     </button>

// // //                     {/* Invisible bridge to prevent gap-triggered close */}
// // //                     {isDesktopProductsOpen && (
// // //                       <div className="absolute top-full left-0 w-full h-2" />
// // //                     )}

// // //                     {isDesktopProductsOpen && (
// // //                       <div
// // //                         className="absolute top-[calc(100%+8px)] left-0 w-80 bg-background border border-border rounded-xl shadow-lg overflow-hidden animate-fade-in"
// // //                         onMouseEnter={handleMouseEnter}
// // //                         onMouseLeave={handleMouseLeave}
// // //                       >
// // //                         {productCategories.map((category) => (
// // //                           <Link
// // //                             key={category.path}
// // //                             to={category.path}
// // //                             onClick={() => setIsDesktopProductsOpen(false)}
// // //                             className="block px-6 py-4 hover:bg-primary/5 transition-colors border-b border-border last:border-b-0"
// // //                           >
// // //                             <div className="font-body font-semibold text-foreground mb-1">
// // //                               {category.name}
// // //                             </div>
// // //                             <div className="text-sm text-foreground/60">
// // //                               {category.description}
// // //                             </div>
// // //                           </Link>
// // //                         ))}
// // //                       </div>
// // //                     )}
// // //                   </div>
// // //                 );
// // //               }

// // //               return (
// // //                 <Link
// // //                   key={link.path}
// // //                   to={link.path}
// // //                   className={`relative font-body font-medium transition-colors duration-300 ${
// // //                     isActive(link.path)
// // //                       ? "text-primary"
// // //                       : "text-foreground hover:text-primary"
// // //                   } after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left ${
// // //                     isActive(link.path) ? "after:scale-x-100" : ""
// // //                   }`}
// // //                 >
// // //                   {link.name}
// // //                 </Link>
// // //               );
// // //             })}

// // //             {/* Search box (Desktop) */}
// // //             <form
// // //               className="relative"
// // //               onSubmit={(e) => {
// // //                 e.preventDefault();
// // //                 navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
// // //                 setSearchQuery("");
// // //               }}
// // //             >
// // //               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/50 pointer-events-none" />
// // //               <input
// // //                 type="search"
// // //                 placeholder="Search products…"
// // //                 value={searchQuery}
// // //                 onChange={(e) => setSearchQuery(e.target.value)}
// // //                 className="w-40 lg:w-56 pl-9 pr-3 py-2 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary"
// // //               />
// // //             </form>

// // //             {!isLoggedIn && (
// // //               <button
// // //                 onClick={() => setShowAuthModal(true)}
// // //                 className={`px-4 py-2 rounded-xl border ${
// // //                   isActive("/login")
// // //                     ? "border-primary text-primary"
// // //                     : "border-foreground/30 text-foreground hover:border-primary hover:text-primary"
// // //                 } transition-colors font-body font-medium`}
// // //               >
// // //                 Login
// // //               </button>
// // //             )}
// // //             {isLoggedIn && (
// // //               <Link to="/profile" className="relative group" aria-label="Profile">
// // //                 <User className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
// // //               </Link>
// // //             )}
// // //             <Link to="/cart" className="relative group" aria-label="Cart">
// // //               <ShoppingCart className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
// // //               {itemCount > 0 && (
// // //                 <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 rounded-full bg-primary text-white text-xs flex items-center justify-center">
// // //                   {itemCount}
// // //                 </span>
// // //               )}
// // //             </Link>
// // //           </div>

// // //           {/* ── Mobile Menu Button ── */}
// // //           <div className="md:hidden flex items-center gap-2">
// // //             {isLoggedIn && (
// // //               <Link to="/profile" className="relative" aria-label="Profile">
// // //                 <User className="w-4 h-4 text-foreground" />
// // //               </Link>
// // //             )}
// // //             <Link to="/cart" className="relative" aria-label="Cart">
// // //               <ShoppingCart className="w-4 h-4 text-foreground" />
// // //               {itemCount > 0 && (
// // //                 <span className="absolute -top-2 -right-2 min-w-[16px] h-[16px] px-1 rounded-full bg-primary text-white text-[10px] flex items-center justify-center">
// // //                   {itemCount}
// // //                 </span>
// // //               )}
// // //             </Link>
// // //             <button
// // //               onClick={() => setIsMenuOpen(!isMenuOpen)}
// // //               className="text-foreground hover:text-primary transition-colors"
// // //               aria-label="Toggle menu"
// // //             >
// // //               {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
// // //             </button>
// // //           </div>
// // //         </div>

// // //         {/* ── Mobile Navigation ── */}
// // //         {isMenuOpen && (
// // //           <div className="md:hidden mt-1 py-1 border-t border-border animate-fade-in">
// // //             {/* Search box (Mobile) */}
// // //             <form
// // //               className="px-1 pb-2"
// // //               onSubmit={(e) => {
// // //                 e.preventDefault();
// // //                 navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
// // //                 setSearchQuery("");
// // //                 setIsMenuOpen(false);
// // //               }}
// // //             >
// // //               <div className="relative">
// // //                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/50 pointer-events-none" />
// // //                 <input
// // //                   type="search"
// // //                   placeholder="Search products…"
// // //                   value={searchQuery}
// // //                   onChange={(e) => setSearchQuery(e.target.value)}
// // //                   className="w-full pl-9 pr-3 py-2 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary"
// // //                 />
// // //               </div>
// // //             </form>
// // //             {navLinks.map((link) => {
// // //               if (link.hasDropdown) {
// // //                 return (
// // //                   <div key={link.path} className="mb-1">
// // //                     <button
// // //                       onClick={() => setIsMobileProductsOpen((v) => !v)}
// // //                       className={`block w-full text-left py-1 font-body font-medium transition-colors duration-300 flex items-center gap-1.5 ${
// // //                         location.pathname.startsWith("/products")
// // //                           ? "text-primary"
// // //                           : "text-foreground hover:text-primary"
// // //                       }`}
// // //                     >
// // //                       {link.name}
// // //                       <ChevronDown
// // //                         className={`w-3.5 h-3.5 transition-transform duration-300 ${
// // //                           isMobileProductsOpen ? "rotate-180" : ""
// // //                         }`}
// // //                       />
// // //                     </button>
// // //                     {isMobileProductsOpen && (
// // //                       <div className="ml-3 mt-1 space-y-1 animate-fade-in">
// // //                         {productCategories.map((category) => (
// // //                           <Link
// // //                             key={category.path}
// // //                             to={category.path}
// // //                             onClick={() => {
// // //                               setIsMobileProductsOpen(false);
// // //                               setIsMenuOpen(false);
// // //                             }}
// // //                             className="block py-1 px-2 rounded-lg hover:bg-primary/5 transition-colors"
// // //                           >
// // //                             <div className="font-body font-medium text-xs text-foreground">
// // //                               {category.name}
// // //                             </div>
// // //                             <div className="text-[11px] text-foreground/60 mt-0.5">
// // //                               {category.description}
// // //                             </div>
// // //                           </Link>
// // //                         ))}
// // //                       </div>
// // //                     )}
// // //                   </div>
// // //                 );
// // //               }

// // //               return (
// // //                 <Link
// // //                   key={link.path}
// // //                   to={link.path}
// // //                   onClick={() => setIsMenuOpen(false)}
// // //                   className={`block py-1.5 text-xs font-body font-medium transition-colors duration-300 ${
// // //                     isActive(link.path)
// // //                       ? "text-primary"
// // //                       : "text-foreground hover:text-primary"
// // //                   }`}
// // //                 >
// // //                   {link.name}
// // //                 </Link>
// // //               );
// // //             })}
// // //             {!isLoggedIn && (
// // //               <button
// // //                 onClick={() => {
// // //                   setIsMenuOpen(false);
// // //                   setShowAuthModal(true);
// // //                 }}
// // //                 className={`block w-full text-center mt-1 px-2.5 py-1.5 rounded-xl border text-xs ${
// // //                   isActive("/login")
// // //                     ? "border-primary text-primary"
// // //                     : "border-foreground/30 text-foreground hover:border-primary hover:text-primary"
// // //                 } transition-colors font-body font-medium`}
// // //               >
// // //                 Login
// // //               </button>
// // //             )}
// // //           </div>
// // //         )}
// // //       </nav>
      
// // //       {/* Auth Modal */}
// // //       <AuthModal 
// // //         open={showAuthModal} 
// // //         onOpenChange={setShowAuthModal}
// // //         onSuccess={() => {
// // //           // Refresh the page or update login state
// // //           window.location.reload();
// // //         }}
// // //       />
// // //     </header>
// // //   );
// // // };

// // // export default Header;
// // import React, { useState, useEffect, useRef } from "react";
// // import { Link, useLocation, useNavigate } from "react-router-dom";
// // import {
// //   Menu,
// //   X,
// //   ChevronDown,
// //   ShoppingCart,
// //   User,
// //   Search,
// //   Store,
// //   MapPin,
// // } from "lucide-react";
// // import { useCart } from "@/context/CartContext";
// // import Logo from "@/assets/logo.jpeg";
// // import { AuthModal } from "@/components/AuthModal";

// // // ── Types ─────────────────────────────────────────────────────────────────────

// // interface NavChild {
// //   name: string;
// //   description?: string;
// //   path: string;
// // }

// // interface NavItem {
// //   name: string;
// //   path: string;
// //   children?: NavChild[];
// // }

// // // ── Data ──────────────────────────────────────────────────────────────────────

// // const STORE_LINE_1 = "Visit our store";
// // const STORE_LINE_2 = "Tom Mboya St, Nairobi CBD";

// // const allCategories: NavChild[] = [
// //   {
// //     name: "Weight Management Products",
// //     description: "Flat tummy, upper body fat, full weight loss packages",
// //     path: "/products/weight-management",
// //   },
// //   {
// //     name: "Yoni & Female Fertility Care",
// //     description: "Steam herbs, washes, tightening pearls & more",
// //     path: "/products/female-care",
// //   },
// //   {
// //     name: "Herbal Medicated Oils",
// //     description: "Natural support for pain relief, joint care, skin & overall wellness.",
// //     path: "/products/herbal-medicated-oils",
// //   },
// //   {
// //     name: "Men's Boosters & Fertility Support",
// //     description: "Stamina, libido, and reproductive health",
// //     path: "/products/mens-health",
// //   },
// //   {
// //     name: "Natural Skin Care",
// //     description: "Healing soaps, oils, scrubs, and glow enhancers",
// //     path: "/products/skin-care",
// //   },
// //   {
// //     name: "Nutritional Supplements",
// //     description: "Essential vitamins and health supplements",
// //     path: "/products/supplements",
// //   },
// //   {
// //     name: "Organic Herbs",
// //     description: "Pure, sustainably sourced herbs for wellness and rituals",
// //     path: "/products/organic-herbs",
// //   },
// //   {
// //     name: "Pure Honey & Honey Products",
// //     description: "Natural goodness of pure, unprocessed honey and honey-based products",
// //     path: "/products/pure-honey",
// //   },
// // ];

// // const navItems: NavItem[] = [
// //   { name: "Home", path: "/" },
// //   {
// //     name: "All Products",
// //     path: "/products",
// //     children: [
// //       { name: "View All Products", description: "Browse the full collection", path: "/products" },
// //       ...allCategories,
// //     ],
// //   },
// //   {
// //     name: "Ladies",
// //     path: "/products/female-care",
// //     children: [
// //       {
// //         name: "Yoni & Female Fertility Care",
// //         description: "Steam herbs, washes, tightening pearls & more",
// //         path: "/products/female-care",
// //       },
// //     ],
// //   },
// //   {
// //     name: "Men's",
// //     path: "/products/mens-health",
// //     children: [
// //       {
// //         name: "Men's Boosters & Fertility Support",
// //         description: "Stamina, libido, and reproductive health",
// //         path: "/products/mens-health",
// //       },
// //     ],
// //   },
// //   { name: "Nutritional Supplements", path: "/products/supplements" },
// //   { name: "Contact Us", path: "/contact" },
// // ];

// // // ── Component ─────────────────────────────────────────────────────────────────

// // const Header = () => {
// //   const [isMenuOpen, setIsMenuOpen] = useState(false);
// //   const [openMenu, setOpenMenu] = useState<string | null>(null); // desktop dropdown
// //   const [mobileOpen, setMobileOpen] = useState<string | null>(null); // mobile accordion
// //   const [isLoggedIn, setIsLoggedIn] = useState(false);
// //   const [showAuthModal, setShowAuthModal] = useState(false);
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const location = useLocation();
// //   const navigate = useNavigate();
// //   const { itemCount } = useCart();
// //   const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

// //   useEffect(() => {
// //     const checkAuth = () => {
// //       const token = localStorage.getItem("token");
// //       setIsLoggedIn(!!token);
// //     };
// //     checkAuth();
// //     window.addEventListener("storage", checkAuth);
// //     window.addEventListener("authChange", checkAuth);
// //     return () => {
// //       window.removeEventListener("storage", checkAuth);
// //       window.removeEventListener("authChange", checkAuth);
// //     };
// //   }, []);

// //   // Close menus when route changes
// //   useEffect(() => {
// //     setOpenMenu(null);
// //     setIsMenuOpen(false);
// //     setMobileOpen(null);
// //   }, [location.pathname]);

// //   const handleMouseEnter = (name: string) => {
// //     if (closeTimer.current) clearTimeout(closeTimer.current);
// //     setOpenMenu(name);
// //   };

// //   const handleMouseLeave = () => {
// //     closeTimer.current = setTimeout(() => setOpenMenu(null), 120);
// //   };

// //   const isItemActive = (item: NavItem) => {
// //     if (location.pathname === item.path) return true;
// //     // "All Products" shouldn't light up for every category page
// //     if (item.path === "/products") return false;
// //     return !!item.children?.some((c) => location.pathname === c.path);
// //   };

// //   const handleSearch = (e: React.FormEvent<HTMLFormElement>, closeMobile = false) => {
// //     e.preventDefault();
// //     navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
// //     setSearchQuery("");
// //     if (closeMobile) setIsMenuOpen(false);
// //   };

// //   const underline =
// //     "after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-3 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left";

// //   return (
// //     <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
// //       {/* Top accent bar */}
// //       <div className="h-1.5 bg-primary" />

// //       <nav className="container mx-auto px-3 md:px-4">
// //         {/* ── Row 1: logo · search · account · cart ── */}
// //         <div className="flex items-center justify-between gap-4 lg:gap-8 py-1 md:py-4">
// //           {/* Logo */}
// //           <Link to="/" className="flex items-center gap-3 group shrink-0">
// //             <img
// //               src={Logo}
// //               alt="Organic Bloom Logo"
// //               className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full object-cover transition-transform duration-300 group-hover:scale-110"
// //             />
// //             <span className="text-sm md:text-lg lg:text-xl font-heading font-semibold text-foreground leading-tight">
// //               Organic
// //               <br />
// //               Bloom
// //             </span>
// //           </Link>

// //           {/* Search (Desktop) */}
// //           <form
// //             className="hidden md:block relative flex-1 max-w-3xl"
// //             onSubmit={(e) => handleSearch(e)}
// //           >
// //             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/70 pointer-events-none" />
// //             <input
// //               type="search"
// //               placeholder="Search for..."
// //               value={searchQuery}
// //               onChange={(e) => setSearchQuery(e.target.value)}
// //               className="w-full h-12 pl-12 pr-4 rounded-md border border-border bg-background text-base text-foreground placeholder:text-foreground/50 focus:outline-none focus:border-primary"
// //             />
// //           </form>

// //           {/* Account + Cart (Desktop) */}
// //           <div className="hidden md:flex items-center gap-3 shrink-0">
// //             {isLoggedIn ? (
// //               <Link
// //                 to="/profile"
// //                 className="flex items-center gap-2 h-12 px-5 rounded-md border border-foreground/80 text-foreground font-body font-medium hover:border-primary hover:text-primary transition-colors"
// //               >
// //                 <User className="w-5 h-5" />
// //                 Account
// //               </Link>
// //             ) : (
// //               <button
// //                 type="button"
// //                 onClick={() => setShowAuthModal(true)}
// //                 className="flex items-center gap-2 h-12 px-5 rounded-md border border-foreground/80 text-foreground font-body font-medium hover:border-primary hover:text-primary transition-colors"
// //               >
// //                 <User className="w-5 h-5" />
// //                 Account
// //               </button>
// //             )}

// //             <Link
// //               to="/cart"
// //               aria-label="Cart"
// //               className="flex items-center gap-2 h-12 px-5 rounded-md bg-foreground text-background font-body font-medium hover:bg-foreground/90 transition-colors"
// //             >
// //               <ShoppingCart className="w-5 h-5" />
// //               Cart ({itemCount})
// //             </Link>
// //           </div>

// //           {/* Icons + menu button (Mobile) */}
// //           <div className="md:hidden flex items-center gap-2">
// //             {isLoggedIn && (
// //               <Link to="/profile" className="relative" aria-label="Profile">
// //                 <User className="w-4 h-4 text-foreground" />
// //               </Link>
// //             )}
// //             <Link to="/cart" className="relative" aria-label="Cart">
// //               <ShoppingCart className="w-4 h-4 text-foreground" />
// //               {itemCount > 0 && (
// //                 <span className="absolute -top-2 -right-2 min-w-[16px] h-[16px] px-1 rounded-full bg-primary text-white text-[10px] flex items-center justify-center">
// //                   {itemCount}
// //                 </span>
// //               )}
// //             </Link>
// //             <button
// //               onClick={() => setIsMenuOpen(!isMenuOpen)}
// //               className="text-foreground hover:text-primary transition-colors"
// //               aria-label="Toggle menu"
// //             >
// //               {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
// //             </button>
// //           </div>
// //         </div>

// //         {/* ── Row 2 (Desktop): navigation · location ── */}
// //         <div className="hidden md:flex items-center justify-between border-t border-border">
// //           <div className="flex items-center gap-8 lg:gap-10">
// //             {navItems.map((item) => {
// //               const active = isItemActive(item);
// //               const textColor = active
// //                 ? "text-primary"
// //                 : "text-foreground hover:text-primary";

// //               if (item.children) {
// //                 return (
// //                   <div
// //                     key={item.name}
// //                     className="relative"
// //                     onMouseEnter={() => handleMouseEnter(item.name)}
// //                     onMouseLeave={handleMouseLeave}
// //                   >
// //                     <button
// //                       type="button"
// //                       onClick={() =>
// //                         setOpenMenu((v) => (v === item.name ? null : item.name))
// //                       }
// //                       className={`relative py-4 font-body font-medium text-base transition-colors duration-300 flex items-center gap-1.5 ${textColor} ${underline} ${
// //                         active ? "after:scale-x-100" : ""
// //                       }`}
// //                       aria-haspopup="menu"
// //                       aria-expanded={openMenu === item.name}
// //                     >
// //                       {item.name}
// //                       <ChevronDown
// //                         className={`w-4 h-4 transition-transform duration-300 ${
// //                           openMenu === item.name ? "rotate-180" : ""
// //                         }`}
// //                       />
// //                     </button>

// //                     {openMenu === item.name && (
// //                       <div
// //                         className="absolute top-full left-0 w-80 bg-background border border-border rounded-xl shadow-lg overflow-hidden animate-fade-in"
// //                         onMouseEnter={() => handleMouseEnter(item.name)}
// //                         onMouseLeave={handleMouseLeave}
// //                       >
// //                         {item.children.map((child) => (
// //                           <Link
// //                             key={child.path + child.name}
// //                             to={child.path}
// //                             onClick={() => setOpenMenu(null)}
// //                             className="block px-6 py-4 hover:bg-primary/5 transition-colors border-b border-border last:border-b-0"
// //                           >
// //                             <div className="font-body font-semibold text-foreground mb-1">
// //                               {child.name}
// //                             </div>
// //                             {child.description && (
// //                               <div className="text-sm text-foreground/60">
// //                                 {child.description}
// //                               </div>
// //                             )}
// //                           </Link>
// //                         ))}
// //                       </div>
// //                     )}
// //                   </div>
// //                 );
// //               }

// //               return (
// //                 <Link
// //                   key={item.name}
// //                   to={item.path}
// //                   className={`relative py-4 font-body font-medium text-base transition-colors duration-300 ${textColor} ${underline} ${
// //                     active ? "after:scale-x-100" : ""
// //                   }`}
// //                 >
// //                   {item.name}
// //                 </Link>
// //               );
// //             })}
// //           </div>

// //           {/* Store location */}
// //           <Link
// //             to="/contact"
// //             className="hidden lg:flex items-center gap-3 py-2 group"
// //             aria-label="Store location"
// //           >
// //             <Store className="w-9 h-9 text-foreground/80 group-hover:text-primary transition-colors" />
// //             <div className="leading-tight">
// //               <div className="text-xs text-foreground/70">{STORE_LINE_1}</div>
// //               <div className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
// //                 {STORE_LINE_2}
// //               </div>
// //             </div>
// //           </Link>
// //         </div>

// //         {/* ── Mobile Navigation ── */}
// //         {isMenuOpen && (
// //           <div className="md:hidden mt-1 py-1 border-t border-border animate-fade-in">
// //             {/* Search (Mobile) */}
// //             <form className="px-1 pb-2" onSubmit={(e) => handleSearch(e, true)}>
// //               <div className="relative">
// //                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/50 pointer-events-none" />
// //                 <input
// //                   type="search"
// //                   placeholder="Search for..."
// //                   value={searchQuery}
// //                   onChange={(e) => setSearchQuery(e.target.value)}
// //                   className="w-full pl-9 pr-3 py-2 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary"
// //                 />
// //               </div>
// //             </form>

// //             {navItems.map((item) => {
// //               const active = isItemActive(item);
// //               const textColor = active
// //                 ? "text-primary"
// //                 : "text-foreground hover:text-primary";

// //               if (item.children) {
// //                 return (
// //                   <div key={item.name} className="mb-1">
// //                     <button
// //                       onClick={() =>
// //                         setMobileOpen((v) => (v === item.name ? null : item.name))
// //                       }
// //                       className={`w-full text-left py-1.5 text-xs font-body font-medium transition-colors duration-300 flex items-center gap-1.5 ${textColor}`}
// //                     >
// //                       {item.name}
// //                       <ChevronDown
// //                         className={`w-3.5 h-3.5 transition-transform duration-300 ${
// //                           mobileOpen === item.name ? "rotate-180" : ""
// //                         }`}
// //                       />
// //                     </button>
// //                     {mobileOpen === item.name && (
// //                       <div className="ml-3 mt-1 space-y-1 animate-fade-in">
// //                         {item.children.map((child) => (
// //                           <Link
// //                             key={child.path + child.name}
// //                             to={child.path}
// //                             onClick={() => {
// //                               setMobileOpen(null);
// //                               setIsMenuOpen(false);
// //                             }}
// //                             className="block py-1 px-2 rounded-lg hover:bg-primary/5 transition-colors"
// //                           >
// //                             <div className="font-body font-medium text-xs text-foreground">
// //                               {child.name}
// //                             </div>
// //                             {child.description && (
// //                               <div className="text-[11px] text-foreground/60 mt-0.5">
// //                                 {child.description}
// //                               </div>
// //                             )}
// //                           </Link>
// //                         ))}
// //                       </div>
// //                     )}
// //                   </div>
// //                 );
// //               }

// //               return (
// //                 <Link
// //                   key={item.name}
// //                   to={item.path}
// //                   onClick={() => setIsMenuOpen(false)}
// //                   className={`block py-1.5 text-xs font-body font-medium transition-colors duration-300 ${textColor}`}
// //                 >
// //                   {item.name}
// //                 </Link>
// //               );
// //             })}

// //             {/* Store location (Mobile) */}
// //             <Link
// //               to="/contact"
// //               onClick={() => setIsMenuOpen(false)}
// //               className="flex items-center gap-2 py-2 mt-1 border-t border-border text-xs text-foreground"
// //             >
// //               <MapPin className="w-4 h-4 text-primary shrink-0" />
// //               <span>
// //                 <span className="text-foreground/60">{STORE_LINE_1}: </span>
// //                 <span className="font-semibold">{STORE_LINE_2}</span>
// //               </span>
// //             </Link>

// //             {!isLoggedIn && (
// //               <button
// //                 onClick={() => {
// //                   setIsMenuOpen(false);
// //                   setShowAuthModal(true);
// //                 }}
// //                 className="block w-full text-center mt-1 px-2.5 py-1.5 rounded-xl border border-foreground/30 text-foreground hover:border-primary hover:text-primary text-xs transition-colors font-body font-medium"
// //               >
// //                 Login
// //               </button>
// //             )}
// //           </div>
// //         )}
// //       </nav>

// //       {/* Auth Modal */}
// //       <AuthModal
// //         open={showAuthModal}
// //         onOpenChange={setShowAuthModal}
// //         onSuccess={() => {
// //           // Refresh the page or update login state
// //           window.location.reload();
// //         }}
// //       />
// //     </header>
// //   );
// // };

// // export default Header;
// import React, { useState, useEffect, useRef } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import {
//   Menu,
//   X,
//   ChevronDown,
//   ShoppingCart,
//   User,
//   Search,
//   Store,
//   MapPin,
// } from "lucide-react";
// import { useCart } from "@/context/CartContext";
// import Logo from "@/assets/logo.jpeg";
// import { AuthModal } from "@/components/AuthModal";

// // ── Types ─────────────────────────────────────────────────────────────────────

// interface NavChild {
//   name: string;
//   description?: string;
//   path: string;
// }

// interface NavItem {
//   name: string;
//   path: string;
//   children?: NavChild[];
// }

// // ── Data ──────────────────────────────────────────────────────────────────────

// const STORE_LINE_1 = "Visit our store";
// const STORE_LINE_2 = "KTDA Farmers Building, 7th Floor, Suite 730";

// const allCategories: NavChild[] = [
//   {
//     name: "Weight Management Products",
//     description: "Flat tummy, upper body fat, full weight loss packages",
//     path: "/products/weight-management",
//   },
//   {
//     name: "Yoni & Female Fertility Care",
//     description: "Steam herbs, washes, tightening pearls & more",
//     path: "/products/female-care",
//   },
//   {
//     name: "Herbal Medicated Oils",
//     description: "Natural support for pain relief, joint care, skin & overall wellness.",
//     path: "/products/herbal-medicated-oils",
//   },
//   {
//     name: "Men's Boosters & Fertility Support",
//     description: "Stamina, libido, and reproductive health",
//     path: "/products/mens-health",
//   },
//   {
//     name: "Natural Skin Care",
//     description: "Healing soaps, oils, scrubs, and glow enhancers",
//     path: "/products/skin-care",
//   },
//   {
//     name: "Nutritional Supplements",
//     description: "Essential vitamins and health supplements",
//     path: "/products/supplements",
//   },
//   {
//     name: "Organic Herbs",
//     description: "Pure, sustainably sourced herbs for wellness and rituals",
//     path: "/products/organic-herbs",
//   },
//   {
//     name: "Pure Honey & Honey Products",
//     description: "Natural goodness of pure, unprocessed honey and honey-based products",
//     path: "/products/pure-honey",
//   },
// ];

// const navItems: NavItem[] = [
//   { name: "Home", path: "/" },
//   {
//     name: "All Products",
//     path: "/products",
//     children: [
//       { name: "View All Products", description: "Browse the full collection", path: "/products" },
//       ...allCategories,
//     ],
//   },
//   {
//     name: "Ladies",
//     path: "/products/female-care",
//     children: [
//       {
//         name: "Yoni & Female Fertility Care",
//         description: "Steam herbs, washes, tightening pearls & more",
//         path: "/products/female-care",
//       },
//     ],
//   },
//   {
//     name: "Men's",
//     path: "/products/mens-health",
//     children: [
//       {
//         name: "Men's Boosters & Fertility Support",
//         description: "Stamina, libido, and reproductive health",
//         path: "/products/mens-health",
//       },
//     ],
//   },
//   { name: "Nutritional Supplements", path: "/products/supplements" },
//   { name: "Contact Us", path: "/contact" },
// ];

// // ── Component ─────────────────────────────────────────────────────────────────

// const Header = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [openMenu, setOpenMenu] = useState<string | null>(null); // desktop dropdown
//   const [mobileOpen, setMobileOpen] = useState<string | null>(null); // mobile accordion
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [showAuthModal, setShowAuthModal] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { itemCount } = useCart();
//   const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

//   useEffect(() => {
//     const checkAuth = () => {
//       const token = localStorage.getItem("token");
//       setIsLoggedIn(!!token);
//     };
//     checkAuth();
//     window.addEventListener("storage", checkAuth);
//     window.addEventListener("authChange", checkAuth);
//     return () => {
//       window.removeEventListener("storage", checkAuth);
//       window.removeEventListener("authChange", checkAuth);
//     };
//   }, []);

//   // Close menus when route changes
//   useEffect(() => {
//     setOpenMenu(null);
//     setIsMenuOpen(false);
//     setMobileOpen(null);
//   }, [location.pathname]);

//   const handleMouseEnter = (name: string) => {
//     if (closeTimer.current) clearTimeout(closeTimer.current);
//     setOpenMenu(name);
//   };

//   const handleMouseLeave = () => {
//     closeTimer.current = setTimeout(() => setOpenMenu(null), 120);
//   };

//   const isItemActive = (item: NavItem) => {
//     if (location.pathname === item.path) return true;
//     // "All Products" shouldn't light up for every category page
//     if (item.path === "/products") return false;
//     return !!item.children?.some((c) => location.pathname === c.path);
//   };

//   const handleSearch = (e: React.FormEvent<HTMLFormElement>, closeMobile = false) => {
//     e.preventDefault();
//     navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
//     setSearchQuery("");
//     if (closeMobile) setIsMenuOpen(false);
//   };

//   const underline =
//     "after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-3 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left";

//   return (
//     <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
//       {/* Top accent bar */}
//       <div className="h-1.5 bg-primary" />

//       <nav className="container mx-auto px-3 md:px-4">
//         {/* ── Row 1: logo · search · account · cart ── */}
//         <div className="flex items-center justify-between gap-4 lg:gap-8 py-1 md:py-4">
//           {/* Logo */}
//           <Link
//             to="/"
//             className="flex items-center gap-3 md:flex-col md:gap-1 group shrink-0"
//           >
//             <img
//               src={Logo}
//               alt="Organic Bloom Logo"
//               className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full object-cover transition-transform duration-300 group-hover:scale-110"
//             />
//             <span className="text-sm md:text-base lg:text-lg font-heading font-semibold text-foreground leading-tight md:text-center md:whitespace-nowrap">
//               Organic
//               <br className="md:hidden" />{" "}
//               Bloom
//             </span>
//           </Link>

//           {/* Search (Desktop) */}
//           <form
//             className="hidden md:flex flex-1 max-w-3xl items-stretch rounded-md border-2 border-primary bg-background shadow-md overflow-hidden focus-within:ring-4 focus-within:ring-primary/20 transition-shadow"
//             onSubmit={(e) => handleSearch(e)}
//           >
//             <input
//               type="search"
//               placeholder="Search for products..."
//               aria-label="Search products"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="flex-1 min-w-0 h-12 px-5 bg-transparent text-base text-foreground placeholder:text-foreground/60 focus:outline-none"
//             />
//             <button
//               type="submit"
//               aria-label="Search"
//               className="flex items-center gap-2 px-6 bg-primary text-primary-foreground font-body font-medium hover:bg-primary/90 transition-colors"
//             >
//               <Search className="w-5 h-5" />
//               <span className="hidden lg:inline">Search</span>
//             </button>
//           </form>

//           {/* Account + Cart (Desktop) */}
//           <div className="hidden md:flex items-center gap-3 shrink-0">
//             {isLoggedIn ? (
//               <Link
//                 to="/profile"
//                 className="flex items-center gap-2 h-12 px-5 rounded-md border border-foreground/80 text-foreground font-body font-medium hover:border-primary hover:text-primary transition-colors"
//               >
//                 <User className="w-5 h-5" />
//                 Account
//               </Link>
//             ) : (
//               <button
//                 type="button"
//                 onClick={() => setShowAuthModal(true)}
//                 className="flex items-center gap-2 h-12 px-5 rounded-md border border-foreground/80 text-foreground font-body font-medium hover:border-primary hover:text-primary transition-colors"
//               >
//                 <User className="w-5 h-5" />
//                 Account
//               </button>
//             )}

//             <Link
//               to="/cart"
//               aria-label="Cart"
//               className="flex items-center gap-2 h-12 px-5 rounded-md bg-foreground text-background font-body font-medium hover:bg-foreground/90 transition-colors"
//             >
//               <ShoppingCart className="w-5 h-5" />
//               Cart ({itemCount})
//             </Link>
//           </div>

//           {/* Icons + menu button (Mobile) */}
//           <div className="md:hidden flex items-center gap-2">
//             {isLoggedIn && (
//               <Link to="/profile" className="relative" aria-label="Profile">
//                 <User className="w-4 h-4 text-foreground" />
//               </Link>
//             )}
//             <Link to="/cart" className="relative" aria-label="Cart">
//               <ShoppingCart className="w-4 h-4 text-foreground" />
//               {itemCount > 0 && (
//                 <span className="absolute -top-2 -right-2 min-w-[16px] h-[16px] px-1 rounded-full bg-primary text-white text-[10px] flex items-center justify-center">
//                   {itemCount}
//                 </span>
//               )}
//             </Link>
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="text-foreground hover:text-primary transition-colors"
//               aria-label="Toggle menu"
//             >
//               {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
//             </button>
//           </div>
//         </div>

//         {/* ── Row 2 (Desktop): navigation · location ── */}
//         <div className="hidden md:flex items-center justify-between border-t border-border">
//           <div className="flex items-center gap-8 lg:gap-10">
//             {navItems.map((item) => {
//               const active = isItemActive(item);
//               const textColor = active
//                 ? "text-primary"
//                 : "text-foreground hover:text-primary";

//               if (item.children) {
//                 return (
//                   <div
//                     key={item.name}
//                     className="relative"
//                     onMouseEnter={() => handleMouseEnter(item.name)}
//                     onMouseLeave={handleMouseLeave}
//                   >
//                     <button
//                       type="button"
//                       onClick={() =>
//                         setOpenMenu((v) => (v === item.name ? null : item.name))
//                       }
//                       className={`relative py-4 font-body font-medium text-base transition-colors duration-300 flex items-center gap-1.5 ${textColor} ${underline} ${
//                         active ? "after:scale-x-100" : ""
//                       }`}
//                       aria-haspopup="menu"
//                       aria-expanded={openMenu === item.name}
//                     >
//                       {item.name}
//                       <ChevronDown
//                         className={`w-4 h-4 transition-transform duration-300 ${
//                           openMenu === item.name ? "rotate-180" : ""
//                         }`}
//                       />
//                     </button>

//                     {openMenu === item.name && (
//                       <div
//                         className="absolute top-full left-0 w-80 bg-background border border-border rounded-xl shadow-lg overflow-hidden animate-fade-in"
//                         onMouseEnter={() => handleMouseEnter(item.name)}
//                         onMouseLeave={handleMouseLeave}
//                       >
//                         {item.children.map((child) => (
//                           <Link
//                             key={child.path + child.name}
//                             to={child.path}
//                             onClick={() => setOpenMenu(null)}
//                             className="block px-6 py-4 hover:bg-primary/5 transition-colors border-b border-border last:border-b-0"
//                           >
//                             <div className="font-body font-semibold text-foreground mb-1">
//                               {child.name}
//                             </div>
//                             {child.description && (
//                               <div className="text-sm text-foreground/60">
//                                 {child.description}
//                               </div>
//                             )}
//                           </Link>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 );
//               }

//               return (
//                 <Link
//                   key={item.name}
//                   to={item.path}
//                   className={`relative py-4 font-body font-medium text-base transition-colors duration-300 ${textColor} ${underline} ${
//                     active ? "after:scale-x-100" : ""
//                   }`}
//                 >
//                   {item.name}
//                 </Link>
//               );
//             })}
//           </div>

//           {/* Store location */}
//           <Link
//             to="/contact"
//             className="hidden lg:flex items-center gap-3 py-2 group"
//             aria-label="Store location"
//           >
//             <Store className="w-9 h-9 text-foreground/80 group-hover:text-primary transition-colors" />
//             <div className="leading-tight">
//               <div className="text-xs text-foreground/70">{STORE_LINE_1}</div>
//               <div className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
//                 {STORE_LINE_2}
//               </div>
//             </div>
//           </Link>
//         </div>

//         {/* ── Mobile Navigation ── */}
//         {isMenuOpen && (
//           <div className="md:hidden mt-1 py-1 border-t border-border animate-fade-in">
//             {/* Search (Mobile) */}
//             <form className="px-1 pb-2" onSubmit={(e) => handleSearch(e, true)}>
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/50 pointer-events-none" />
//                 <input
//                   type="search"
//                   placeholder="Search for..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="w-full pl-9 pr-3 py-2 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary"
//                 />
//               </div>
//             </form>

//             {navItems.map((item) => {
//               const active = isItemActive(item);
//               const textColor = active
//                 ? "text-primary"
//                 : "text-foreground hover:text-primary";

//               if (item.children) {
//                 return (
//                   <div key={item.name} className="mb-1">
//                     <button
//                       onClick={() =>
//                         setMobileOpen((v) => (v === item.name ? null : item.name))
//                       }
//                       className={`w-full text-left py-1.5 text-xs font-body font-medium transition-colors duration-300 flex items-center gap-1.5 ${textColor}`}
//                     >
//                       {item.name}
//                       <ChevronDown
//                         className={`w-3.5 h-3.5 transition-transform duration-300 ${
//                           mobileOpen === item.name ? "rotate-180" : ""
//                         }`}
//                       />
//                     </button>
//                     {mobileOpen === item.name && (
//                       <div className="ml-3 mt-1 space-y-1 animate-fade-in">
//                         {item.children.map((child) => (
//                           <Link
//                             key={child.path + child.name}
//                             to={child.path}
//                             onClick={() => {
//                               setMobileOpen(null);
//                               setIsMenuOpen(false);
//                             }}
//                             className="block py-1 px-2 rounded-lg hover:bg-primary/5 transition-colors"
//                           >
//                             <div className="font-body font-medium text-xs text-foreground">
//                               {child.name}
//                             </div>
//                             {child.description && (
//                               <div className="text-[11px] text-foreground/60 mt-0.5">
//                                 {child.description}
//                               </div>
//                             )}
//                           </Link>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 );
//               }

//               return (
//                 <Link
//                   key={item.name}
//                   to={item.path}
//                   onClick={() => setIsMenuOpen(false)}
//                   className={`block py-1.5 text-xs font-body font-medium transition-colors duration-300 ${textColor}`}
//                 >
//                   {item.name}
//                 </Link>
//               );
//             })}

//             {/* Store location (Mobile) */}
//             <Link
//               to="/contact"
//               onClick={() => setIsMenuOpen(false)}
//               className="flex items-center gap-2 py-2 mt-1 border-t border-border text-xs text-foreground"
//             >
//               <MapPin className="w-4 h-4 text-primary shrink-0" />
//               <span>
//                 <span className="text-foreground/60">{STORE_LINE_1}: </span>
//                 <span className="font-semibold">{STORE_LINE_2}</span>
//               </span>
//             </Link>

//             {!isLoggedIn && (
//               <button
//                 onClick={() => {
//                   setIsMenuOpen(false);
//                   setShowAuthModal(true);
//                 }}
//                 className="block w-full text-center mt-1 px-2.5 py-1.5 rounded-xl border border-foreground/30 text-foreground hover:border-primary hover:text-primary text-xs transition-colors font-body font-medium"
//               >
//                 Login
//               </button>
//             )}
//           </div>
//         )}
//       </nav>

//       {/* Auth Modal */}
//       <AuthModal
//         open={showAuthModal}
//         onOpenChange={setShowAuthModal}
//         onSuccess={() => {
//           // Refresh the page or update login state
//           window.location.reload();
//         }}
//       />
//     </header>
//   );
// };

// export default Header;
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  ChevronDown,
  ShoppingCart,
  User,
  Search,
  Store,
  Package,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import Logo from "@/assets/logo.png";
import { AuthModal } from "@/components/AuthModal";

// ── Types ─────────────────────────────────────────────────────────────────────

interface NavChild {
  name: string;
  description?: string;
  path: string;
}

interface NavItem {
  name: string;
  path: string;
  children?: NavChild[];
}

// ── Data ──────────────────────────────────────────────────────────────────────

const STORE_LINE_1 = "Visit our store";
const STORE_LINE_2 = "KTDA Farmers Building, 7th Floor, Suite 730";
const STORE_SHORT = "KTDA Farmers Building"; // compact label for mobile

const allCategories: NavChild[] = [
  {
    name: "Weight Management Products",
    description: "Flat tummy, upper body fat, full weight loss packages",
    path: "/products/weight-management",
  },
  {
    name: "Yoni & Female Fertility Care",
    description: "Steam herbs, washes, tightening pearls & more",
    path: "/products/female-care",
  },
  {
    name: "Herbal Medicated Oils",
    description: "Natural support for pain relief, joint care, skin & overall wellness.",
    path: "/products/herbal-medicated-oils",
  },
  {
    name: "Men's Boosters & Fertility Support",
    description: "Stamina, libido, and reproductive health",
    path: "/products/mens-health",
  },
  {
    name: "Natural Skin Care",
    description: "Healing soaps, oils, scrubs, and glow enhancers",
    path: "/products/skin-care",
  },
  {
    name: "Nutritional Supplements",
    description: "Essential vitamins and health supplements",
    path: "/products/supplements",
  },
  {
    name: "Organic Herbs",
    description: "Pure, sustainably sourced herbs for wellness and rituals",
    path: "/products/organic-herbs",
  },
  {
    name: "Pure Honey & Honey Products",
    description: "Natural goodness of pure, unprocessed honey and honey-based products",
    path: "/products/pure-honey",
  },
];

const navItems: NavItem[] = [
  { name: "Home", path: "/" },
  {
    name: "All Products",
    path: "/products",
    children: [
      { name: "View All Products", description: "Browse the full collection", path: "/products" },
      ...allCategories,
    ],
  },
  {
    name: "Ladies",
    path: "/products/female-care",
    children: [
      {
        name: "Yoni & Female Fertility Care",
        description: "Steam herbs, washes, tightening pearls & more",
        path: "/products/female-care",
      },
    ],
  },
  {
    name: "Men's",
    path: "/products/mens-health",
    children: [
      {
        name: "Men's Boosters & Fertility Support",
        description: "Stamina, libido, and reproductive health",
        path: "/products/mens-health",
      },
    ],
  },
  { name: "Nutritional Supplements", path: "/products/supplements" },
  { name: "Contact Us", path: "/contact" },
];

// ── Component ─────────────────────────────────────────────────────────────────

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // mobile hamburger panel
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false); // mobile categories panel
  const [openMenu, setOpenMenu] = useState<string | null>(null); // desktop dropdown
  const [mobileOpen, setMobileOpen] = useState<string | null>(null); // mobile accordion
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { itemCount } = useCart();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };
    checkAuth();
    window.addEventListener("storage", checkAuth);
    window.addEventListener("authChange", checkAuth);
    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("authChange", checkAuth);
    };
  }, []);

  // Close menus when route changes
  useEffect(() => {
    setOpenMenu(null);
    setIsMenuOpen(false);
    setIsCategoriesOpen(false);
    setMobileOpen(null);
  }, [location.pathname]);

  const handleMouseEnter = (name: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(name);
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 120);
  };

  const isItemActive = (item: NavItem) => {
    if (location.pathname === item.path) return true;
    // "All Products" shouldn't light up for every category page
    if (item.path === "/products") return false;
    return !!item.children?.some((c) => location.pathname === c.path);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>, closeMobile = false) => {
    e.preventDefault();
    navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    setSearchQuery("");
    if (closeMobile) {
      setIsMenuOpen(false);
      setIsCategoriesOpen(false);
    }
  };

  const toggleMenuPanel = () => {
    setIsMenuOpen((v) => !v);
    setIsCategoriesOpen(false);
  };

  const toggleCategoriesPanel = () => {
    setIsCategoriesOpen((v) => !v);
    setIsMenuOpen(false);
  };

  const underline =
    "after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-3 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left";

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      {/* Top accent bar */}
      <div className="h-1.5 bg-primary" />

      <nav className="container mx-auto px-3 md:px-4">
        {/* ═══════════════ MOBILE HEADER (< md) ═══════════════ */}
        <div className="md:hidden">
          {/* Row 1: hamburger · logo · account · cart */}
          <div className="grid grid-cols-[1fr_auto_1fr] items-center py-2">
            {/* Hamburger (left) */}
            <div className="flex items-center justify-start">
              <button
                type="button"
                onClick={toggleMenuPanel}
                className="p-1 -ml-1 text-foreground hover:text-primary transition-colors"
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
              </button>
            </div>

            {/* Logo (center) */}
            <Link to="/" className="flex items-center gap-2 justify-center">
              <img
                src={Logo}
                alt="Organic Bloom Logo"
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="text-base font-heading font-semibold text-foreground leading-tight">
                Organic
                <br />
                Bloom
              </span>
            </Link>

            {/* Account + Cart (right) */}
            <div className="flex items-center justify-end gap-4">
              {isLoggedIn ? (
                <Link to="/profile" aria-label="Profile" className="text-foreground">
                  <User className="w-6 h-6" />
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowAuthModal(true)}
                  aria-label="Login"
                  className="text-foreground"
                >
                  <User className="w-6 h-6" />
                </button>
              )}

              <Link to="/cart" className="relative text-foreground" aria-label="Cart">
                <ShoppingCart className="w-6 h-6" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 rounded-full bg-foreground text-background text-[10px] font-semibold flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Row 2: search (always visible) */}
          <form className="pb-3" onSubmit={(e) => handleSearch(e, true)}>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground pointer-events-none" />
              <input
                type="search"
                placeholder="Search for..."
                aria-label="Search products"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-12 pr-4 rounded-lg border border-border bg-background text-base text-foreground placeholder:text-foreground/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </form>

          {/* Row 3: store · categories */}
          <div className="flex items-center justify-between gap-3 border-t border-border py-2.5">
            {/* Store */}
            <Link
              to="/contact"
              className="flex items-center gap-2.5 min-w-0 flex-1"
              aria-label="Store location"
            >
              <Store className="w-8 h-8 text-foreground shrink-0" />
              <div className="leading-tight min-w-0">
                <div className="text-xs text-foreground/80 truncate">{STORE_LINE_1}</div>
                <div className="text-sm font-semibold text-foreground truncate">
                  {STORE_SHORT}
                </div>
              </div>
            </Link>

            {/* Categories */}
            <button
              type="button"
              onClick={toggleCategoriesPanel}
              aria-expanded={isCategoriesOpen}
              className="flex items-center gap-2.5 shrink-0 text-left"
            >
              <Package className="w-8 h-8 text-foreground shrink-0" />
              <div className="leading-tight">
                <div className="text-xs text-foreground/80">Select Product</div>
                <div className="text-sm font-semibold text-foreground flex items-center gap-1">
                  All Categories
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      isCategoriesOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </div>
            </button>
          </div>

          {/* Mobile: categories panel */}
          {isCategoriesOpen && (
            <div className="border-t border-border py-1 animate-fade-in max-h-[60vh] overflow-y-auto">
              <Link
                to="/products"
                onClick={() => setIsCategoriesOpen(false)}
                className="block py-2 px-2 rounded-lg hover:bg-primary/5 transition-colors"
              >
                <div className="font-body font-semibold text-sm text-foreground">
                  View All Products
                </div>
                <div className="text-xs text-foreground/60 mt-0.5">
                  Browse the full collection
                </div>
              </Link>
              {allCategories.map((cat) => (
                <Link
                  key={cat.path}
                  to={cat.path}
                  onClick={() => setIsCategoriesOpen(false)}
                  className="block py-2 px-2 rounded-lg hover:bg-primary/5 transition-colors"
                >
                  <div className="font-body font-medium text-sm text-foreground">
                    {cat.name}
                  </div>
                  {cat.description && (
                    <div className="text-xs text-foreground/60 mt-0.5">
                      {cat.description}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          )}

          {/* Mobile: hamburger navigation panel */}
          {isMenuOpen && (
            <div className="border-t border-border py-2 animate-fade-in max-h-[60vh] overflow-y-auto">
              {navItems.map((item) => {
                const active = isItemActive(item);
                const textColor = active
                  ? "text-primary"
                  : "text-foreground hover:text-primary";

                if (item.children) {
                  return (
                    <div key={item.name} className="mb-1">
                      <button
                        onClick={() =>
                          setMobileOpen((v) => (v === item.name ? null : item.name))
                        }
                        className={`w-full text-left py-2 text-sm font-body font-medium transition-colors duration-300 flex items-center gap-1.5 ${textColor}`}
                      >
                        {item.name}
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-300 ${
                            mobileOpen === item.name ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {mobileOpen === item.name && (
                        <div className="ml-3 mt-1 space-y-1 animate-fade-in">
                          {item.children.map((child) => (
                            <Link
                              key={child.path + child.name}
                              to={child.path}
                              onClick={() => {
                                setMobileOpen(null);
                                setIsMenuOpen(false);
                              }}
                              className="block py-1.5 px-2 rounded-lg hover:bg-primary/5 transition-colors"
                            >
                              <div className="font-body font-medium text-sm text-foreground">
                                {child.name}
                              </div>
                              {child.description && (
                                <div className="text-xs text-foreground/60 mt-0.5">
                                  {child.description}
                                </div>
                              )}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block py-2 text-sm font-body font-medium transition-colors duration-300 ${textColor}`}
                  >
                    {item.name}
                  </Link>
                );
              })}

              {!isLoggedIn && (
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    setShowAuthModal(true);
                  }}
                  className="block w-full text-center mt-2 px-3 py-2 rounded-xl border border-foreground/30 text-foreground hover:border-primary hover:text-primary text-sm transition-colors font-body font-medium"
                >
                  Login
                </button>
              )}
            </div>
          )}
        </div>

        {/* ═══════════════ DESKTOP HEADER (≥ md) — unchanged ═══════════════ */}
        {/* ── Row 1: logo · search · account · cart ── */}
        <div className="hidden md:flex items-center justify-between gap-4 lg:gap-8 py-4">
          {/* Logo */}
          <Link to="/" className="flex md:flex-col md:gap-1 items-center group shrink-0">
            <img
              src={Logo}
              alt="Organic Bloom Logo"
              className="md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <span className="md:text-base lg:text-lg font-heading font-semibold text-foreground leading-tight md:text-center md:whitespace-nowrap">
              Your health Your wealth
            </span>
          </Link>

          {/* Search (Desktop) */}
          <form
            className="flex flex-1 max-w-3xl items-stretch rounded-md border-2 border-primary bg-background shadow-md overflow-hidden focus-within:ring-4 focus-within:ring-primary/20 transition-shadow"
            onSubmit={(e) => handleSearch(e)}
          >
            <input
              type="search"
              placeholder="Search for products..."
              aria-label="Search products"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 min-w-0 h-12 px-5 bg-transparent text-base text-foreground placeholder:text-foreground/60 focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Search"
              className="flex items-center gap-2 px-6 bg-primary text-primary-foreground font-body font-medium hover:bg-primary/90 transition-colors"
            >
              <Search className="w-5 h-5" />
              <span className="hidden lg:inline">Search</span>
            </button>
          </form>

          {/* Account + Cart (Desktop) */}
          <div className="flex items-center gap-3 shrink-0">
            {isLoggedIn ? (
              <Link
                to="/profile"
                className="flex items-center gap-2 h-12 px-5 rounded-md border border-foreground/80 text-foreground font-body font-medium hover:border-primary hover:text-primary transition-colors"
              >
                <User className="w-5 h-5" />
                Account
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => setShowAuthModal(true)}
                className="flex items-center gap-2 h-12 px-5 rounded-md border border-foreground/80 text-foreground font-body font-medium hover:border-primary hover:text-primary transition-colors"
              >
                <User className="w-5 h-5" />
                Account
              </button>
            )}

            <Link
              to="/cart"
              aria-label="Cart"
              className="flex items-center gap-2 h-12 px-5 rounded-md bg-foreground text-background font-body font-medium hover:bg-foreground/90 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              Cart ({itemCount})
            </Link>
          </div>
        </div>

        {/* ── Row 2 (Desktop): navigation · location ── */}
        <div className="hidden md:flex items-center justify-between border-t border-border">
          <div className="flex items-center gap-8 lg:gap-10">
            {navItems.map((item) => {
              const active = isItemActive(item);
              const textColor = active
                ? "text-primary"
                : "text-foreground hover:text-primary";

              if (item.children) {
                return (
                  <div
                    key={item.name}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(item.name)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenMenu((v) => (v === item.name ? null : item.name))
                      }
                      className={`relative py-4 font-body font-medium text-base transition-colors duration-300 flex items-center gap-1.5 ${textColor} ${underline} ${
                        active ? "after:scale-x-100" : ""
                      }`}
                      aria-haspopup="menu"
                      aria-expanded={openMenu === item.name}
                    >
                      {item.name}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${
                          openMenu === item.name ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {openMenu === item.name && (
                      <div
                        className="absolute top-full left-0 w-80 bg-background border border-border rounded-xl shadow-lg overflow-hidden animate-fade-in"
                        onMouseEnter={() => handleMouseEnter(item.name)}
                        onMouseLeave={handleMouseLeave}
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.path + child.name}
                            to={child.path}
                            onClick={() => setOpenMenu(null)}
                            className="block px-6 py-4 hover:bg-primary/5 transition-colors border-b border-border last:border-b-0"
                          >
                            <div className="font-body font-semibold text-foreground mb-1">
                              {child.name}
                            </div>
                            {child.description && (
                              <div className="text-sm text-foreground/60">
                                {child.description}
                              </div>
                            )}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`relative py-4 font-body font-medium text-base transition-colors duration-300 ${textColor} ${underline} ${
                    active ? "after:scale-x-100" : ""
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Store location */}
          <Link
            to="/contact"
            className="hidden lg:flex items-center gap-3 py-2 group"
            aria-label="Store location"
          >
            <Store className="w-9 h-9 text-foreground/80 group-hover:text-primary transition-colors" />
            <div className="leading-tight">
              <div className="text-xs text-foreground/70">{STORE_LINE_1}</div>
              <div className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                {STORE_LINE_2}
              </div>
            </div>
          </Link>
        </div>
      </nav>

      {/* Auth Modal */}
      <AuthModal
        open={showAuthModal}
        onOpenChange={setShowAuthModal}
        onSuccess={() => {
          // Refresh the page or update login state
          window.location.reload();
        }}
      />
    </header>
  );
};

export default Header;