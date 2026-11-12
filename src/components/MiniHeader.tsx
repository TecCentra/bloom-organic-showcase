import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Logo from "@/assets/oglogo.png";

type MiniHeaderProps = {
  trustMessages?: string[];
};

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
      <div
        className={`flex gap-4 overflow-x-auto bg-primary px-4 py-1.5 text-[10px] font-medium leading-tight text-primary-foreground ${
          trustMessages.length === 1 ? "justify-center" : ""
        }`}
        aria-label="Product assurances"
      >
        {trustMessages.map((message, index) => (
          <span key={message} className="flex shrink-0 items-center gap-4">
            {index > 0 && <span aria-hidden="true">|</span>}
            {message}
          </span>
        ))}
      </div>
    </header>
  );
};

export default MiniHeader;
