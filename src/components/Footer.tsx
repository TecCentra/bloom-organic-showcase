import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/share/1CR19eGtNV/", label: "Facebook" },
    { icon: Instagram, href: "https://www.instagram.com/organicpurebloomke?igsh=MWdsdHp3bHFxODMybw==", label: "Instagram" },
    // { icon: Twitter, href: "#", label: "Twitter" },
  ];

  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <h3 className="text-xl font-heading font-semibold mb-4 text-foreground">
              Organic Bloom
            </h3>
            <p className="text-muted-foreground mb-4">
              Your trusted source for premium organic products. Nurturing health, naturally.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  target="blankcu"
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover-scale"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-4 text-foreground">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/blogs"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  Featured Blogs
                </Link>
              </li>
              <li>
                <Link
                  to="/faqs"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-4 text-foreground">
              Contact Info
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>KTDA Farmers Building, 7th Floor, Suite 730 – Nairobi CBD, along Tom Mboya Street (near Gill House and R.O.G Bus Terminus).
Use the lift to the 7th floor and find Suite 730.</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <span>+254704086080</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <span>purebloomhavenke@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-border text-center text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Organic Bloom. All rights reserved. |{' '}
            Powered By{' '}
            <a
              href="https://www.mabcaslabs.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              mabcaslabs
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
