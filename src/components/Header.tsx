import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingBag } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Featured Blogs", path: "/blogs" },
    { name: "Contact Us", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <ShoppingBag className="w-8 h-8 text-primary transition-transform duration-300 group-hover:scale-110" />
            <span className="text-2xl font-heading font-semibold text-foreground">
              Organic Bloom
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isContact = link.name === "Contact Us";
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
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-foreground hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-border animate-fade-in">
            {navLinks.map((link) => {
              const isContact = link.name === "Contact Us";
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={
                    isContact
                      ? `block w-full text-center mt-2 px-4 py-2 rounded-xl border ${
                          isActive(link.path)
                            ? "border-primary text-primary"
                            : "border-foreground/30 text-foreground hover:border-primary hover:text-primary"
                        } transition-colors font-body font-medium`
                      : `block py-2 font-body font-medium transition-colors duration-300 ${
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
