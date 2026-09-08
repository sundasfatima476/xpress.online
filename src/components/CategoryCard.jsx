import { Link } from "react-router-dom";
import ProductImage from "./ProductImage";
import { FiArrowUpRight } from "react-icons/fi";

export default function CategoryCard({ category }) {
  return (
    <Link to={`/category/${category.slug}`} className="group block relative overflow-hidden">
      <div className="relative aspect-[4/5] overflow-hidden bg-beige">
        <ProductImage
          seed={category.slug}
          label={category.name}
          className="w-full h-full transition-transform duration-500 ease-out group-hover:scale-105"
          iconSize={40}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-charcoal/0 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
          <div>
            <h3 className="font-serif text-xl md:text-2xl text-softwhite">{category.name}</h3>
            <p className="text-softwhite/70 text-xs mt-1 hidden sm:block">{category.description}</p>
          </div>
          <span className="w-9 h-9 rounded-full bg-softwhite/90 flex items-center justify-center shrink-0 group-hover:bg-gold transition-colors">
            <FiArrowUpRight className="text-forest" size={16} />
          </span>
        </div>
      </div>
    </Link>
  );
}
