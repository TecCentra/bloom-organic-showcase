// import { ArrowRight } from "lucide-react";
// import { Link } from "react-router-dom";

// interface CategoryCardProps {
//   title: string;
//   description: string;
//   image: string;
//   to?: string;
// }

// const CategoryCard = ({ title, description, image, to }: CategoryCardProps) => {
//   return (
//     <Link to={to || '#'} className="group block relative bg-card rounded-xl overflow-hidden border border-border hover-lift cursor-pointer h-[400px] focus:outline-none focus:ring-2 focus:ring-primary">
//       <div className="absolute inset-0">
//         <img
//           src={image}
//           alt={title}
//           className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent"></div>
//       </div>
      
//       <div className="relative h-full flex flex-col justify-end p-6">
//         <h3 className="text-2xl font-heading font-semibold text-white mb-3">
//           {title}
//         </h3>
//         <p className="text-white/90 mb-4 line-clamp-2">
//           {description}
//         </p>
//         <button className="flex items-center gap-2 text-white font-medium group/btn w-fit">
//           <span className="relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-white after:origin-bottom-right after:transition-transform after:duration-300 group-hover/btn:after:scale-x-100 group-hover/btn:after:origin-bottom-left">
//             Explore
//           </span>
//           <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
//         </button>
//       </div>
//     </Link>
//   );
// };

// export default CategoryCard;

import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface CategoryCardProps {
  title: string;
  description: string;
  image: string;
  to?: string;
}

const CategoryCard = ({ title, description, image, to }: CategoryCardProps) => {
  return (
    <Link 
      to={to || '#'} 
      className="group block relative bg-card rounded-xl overflow-hidden border border-border hover-lift cursor-pointer h-[400px] focus:outline-none focus:ring-2 focus:ring-primary"
    >
      <div className="absolute inset-0">
        <img
          src={image}
          alt={title}
          // The image itself takes full space within its container, object-cover centers and fills.
          // We'll rely more on the gradient to manage text contrast.
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" // Slightly less aggressive zoom
        />
        {/* Adjusted Gradient: 
            - Starts with a strong dark at the bottom for text.
            - Fades more gently to transparent to show more of the image in the upper half.
            - Using 'from-black/80' to ensure text contrast, and 'via-black/20' and 'to-transparent'
              to allow more image visibility towards the top.
        */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
      </div>
      
      {/* Ensure the text content is positioned correctly relative to the image */}
      <div className="relative h-full flex flex-col justify-end p-6 z-10"> {/* Added z-10 to ensure text is above gradient */}
        <h3 className="text-2xl font-heading font-semibold text-white mb-3">
          {title}
        </h3>
        <p className="text-white/90 mb-4 line-clamp-2">
          {description}
        </p>
        <button className="flex items-center gap-2 text-white font-medium group/btn w-fit">
          <span className="relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-white after:origin-bottom-right after:transition-transform after:duration-300 group-hover/btn:after:scale-x-100 group-hover/btn:after:origin-bottom-left">
            Explore
          </span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
        </button>
      </div>
    </Link>
  );
};

export default CategoryCard;