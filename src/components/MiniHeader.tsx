import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Logo from "@/assets/oglogo.png";

type MiniHeaderProps = {
  trustMessages?: string[];
};

export const INOSITOL_TRUST_MESSAGES = [
  "🔒 Guaranteed Predictable Cycles in 90 Days",
  "⭐ 4.9/5 Rating from 103+ Kenyan Women",
  "⚖️ Perfect 40:1 Inositol Blend",
  "📦 Discreet Delivery Across Kenya (24-48 hrs)",
  "🩸 Say Goodbye to Dreaded Month-Long Spotting",
  "🛑 Clear Deep Jawline Breakouts & Chin Hair at the Root",
];

export const isInositolCartItem = (item: { id: string; name?: string }) =>
  item.id.startsWith("france-shgrace-myo-d-chiro-inositol") ||
  Boolean(item.name?.toLowerCase().includes("inositol"));

const MiniHeader = ({ trustMessages = ["Secure checkout · Fast, discreet delivery across Kenya"] }: MiniHeaderProps) => {
  const { itemCount } = useCart();

  return (
    <header className="border-b border-border bg-background">
      <div className="h-1.5 bg-primary" />
      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-4 py-2">
        <img
          src={Logo}
          alt="Organic Bloom"
          width={2170}
          height={725}
          className="h-8 w-auto object-contain"
        />
        <Link
          to="/cart"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground hover:text-primary"
          aria-label={`Cart${itemCount ? `, ${itemCount} items` : ""}`}
        >
          <ShoppingCart className="h-5 w-5" />
          {itemCount > 0 && (
            <span className="absolute -right-2 -top-2 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
              {itemCount}
            </span>
          )}
        </Link>
      </div>
      <div className="mini-header-assurances overflow-hidden bg-[#2c5e43] px-4 py-1.5 text-base font-medium leading-tight text-white">
        <span className="sr-only">{trustMessages.join(" | ")}</span>
        <div className="mini-header-assurances-track flex w-max" aria-hidden="true">
          {[0, 1].map((copy) => (
            <div key={copy} className="mini-header-assurances-group flex shrink-0">
              {trustMessages.map((message, index) => (
                <span key={message} className="flex shrink-0 items-center gap-4">
                  {index > 0 && <span aria-hidden="true">|</span>}
                  {message}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
};

export default MiniHeader;
