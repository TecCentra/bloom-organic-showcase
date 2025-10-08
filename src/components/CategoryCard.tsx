import { ArrowRight } from "lucide-react";

interface CategoryCardProps {
  title: string;
  description: string;
  image: string;
}

const CategoryCard = ({ title, description, image }: CategoryCardProps) => {
  return (
    <div className="group relative bg-card rounded-xl overflow-hidden border border-border hover-lift cursor-pointer h-[400px]">
      <div className="absolute inset-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent"></div>
      </div>
      
      <div className="relative h-full flex flex-col justify-end p-6">
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
    </div>
  );
};

export default CategoryCard;
