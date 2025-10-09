import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";



interface ProductCardProps {
  name: string;
  price: string;
  image: string;
  category: string;
  id: string;
}


const ProductCard = ({ name, price, image, category, id }: ProductCardProps) => {
  const navigate = useNavigate();

  // Convert product name to URL-friendly slug
  const getProductSlug = (name: string) => {
    return name.toLowerCase().replace(/\s+/g, '-');
  };

  const handleClick = () => {
    navigate(`/product/${getProductSlug(name)}`);
  };
  return (
    <div className="group bg-card rounded-xl overflow-hidden border border-border hover-lift cursor-pointer"
     onClick={handleClick} 
    >
      <div className="relative overflow-hidden aspect-square">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
          <button className="bg-background text-foreground px-6 py-2 rounded-full font-medium flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>
      <div className="p-5">
        <p className="text-xs font-medium text-primary uppercase tracking-wider mb-2">
          {category}
        </p>
        <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
          {name}
        </h3>
        <p className="text-xl font-semibold text-primary">{price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
