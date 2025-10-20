// // import { ShoppingCart } from "lucide-react";
// // import { useNavigate } from "react-router-dom";
// // import { Button } from "@/components/ui/button";
// // import { Badge } from "@/components/ui/badge";



// // interface ProductCardProps {
// //   name: string;
// //   price: string;
// //   image: string;
// //   category: string;
// //   id: string;
// // }


// // const ProductCard = ({ name, price, image, category, id }: ProductCardProps) => {
// //   const navigate = useNavigate();

// //   const handleClick = () => {
// //     navigate(`/product/${id}`, { state: { image } });
// //   };
// //   return (
// //     <div className="group bg-card rounded-xl overflow-hidden border border-border hover-lift cursor-pointer"
// //      onClick={handleClick} 
// //     >
// //       <div className="relative overflow-hidden aspect-square">
// //         <img
// //           src={image}
// //           alt={name}
// //           className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
// //         />
// //         <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
// //           <button className="bg-background text-foreground px-6 py-2 rounded-full font-medium flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
// //             <ShoppingCart className="w-4 h-4" />
// //             Add to Cart
// //           </button>
// //         </div>
// //       </div>
// //       <div className="p-5">
// //         <p className="text-xs font-medium text-primary uppercase tracking-wider mb-2">
// //           {category}
// //         </p>
// //         <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
// //           {name}
// //         </h3>
// //         <p className="text-xl font-semibold text-primary">{price}</p>
// //       </div>
// //       {/* Animated underline on hover - spans full bottom inside rounded corners */}
// //       <div className="absolute left-0 right-0 bottom-0 h-[4px] bg-gradient-to-r from-primary via-amber-400 to-primary scale-x-0 origin-left transition-transform duration-500 ease-in-out group-hover:scale-x-100 will-change-transform"></div>
// //     </div>
// //   );
// // };

// // export default ProductCard;
// // ProductCard.tsx
// import React from 'react';

// interface ProductCardProps {
//   id: string;
//   name: string;
//   price: string;
//   image: string;
//   category: string;
// }

// const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, image, category }) => {
//   return (
//     <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
//       <img 
//         src={image} 
//         alt={name} 
//         className="w-full h-48 object-cover"
//       />
//       <div className="p-4">
//         <span className="text-xs text-muted-foreground uppercase">{category}</span>
//         <h3 className="text-lg font-semibold mt-1">{name}</h3>
//         <p className="text-xl font-bold text-primary mt-2">{price}</p>
//         <button className="w-full mt-4 bg-primary text-white py-2 rounded hover:bg-primary/90 transition-colors">
//           View Details
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  price: string; // e.g., "Ksh 12.34"
  image: string;
  category: string;
}

const ProductCard = ({ id, name, price, image, category }: ProductCardProps) => {
  const { addToCart } = useCart();

  // Parse price to cents (e.g., "Ksh 12.34" -> 1234)
  const numericPrice = parseFloat(price.replace("Ksh ", "")) * 100;

  const handleAddToCart = () => {
    addToCart({
      id,
      name,
      price: numericPrice,
      image,
      quantity: 1,
    });
    // Optional: Add toast/notification for UX
    console.log(`${name} added to cart`); // Replace with actual toast if implemented
  };

  return (
    <div className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-primary/50">
      <div className="relative h-48">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
        />
        <Badge 
          variant="secondary" 
          className="absolute top-3 right-3 bg-primary/90 text-primary-foreground"
        >
          {category}
        </Badge>
      </div>
      <div className="p-4 md:p-6">
        <h3 className="font-semibold text-base md:text-lg mb-2 line-clamp-2 text-foreground">
          {name}
        </h3>
        <p className="text-xl md:text-2xl font-bold text-primary mb-4">{price}</p>
        <Button 
          onClick={handleAddToCart} 
          className="w-full group-hover:bg-primary/90 transition-colors duration-200"
          size="sm"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;