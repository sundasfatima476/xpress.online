import { Link } from "react-router-dom";
import { FiHome, FiShoppingBag } from "react-icons/fi";
import ProductImage from "../components/ProductImage";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

export default function NotFound() {
  const recommended = products.filter((p) => p.bestSeller).slice(0, 4);

  return (
    <div className="container-app py-16 md:py-24">
      <div className="max-w-lg mx-auto text-center mb-20">
        <div className="w-40 h-40 mx-auto mb-8 relative rounded-full overflow-hidden">
          <ProductImage seed="404" className="w-full h-full" iconSize={40} />
        </div>
        <h1 className="font-serif text-6xl md:text-8xl text-forest mb-4">404</h1>
        <p className="font-serif text-2xl mb-3">Looks like this page went out of style.</p>
        <p className="text-charcoal/55 mb-9 text-sm">
          The page you're looking for may have been moved, renamed, or is no longer available.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/" className="btn-primary">
            <FiHome size={14} /> Back Home
          </Link>
          <Link to="/shop" className="btn-outline">
            <FiShoppingBag size={14} /> Shop Collection
          </Link>
        </div>
      </div>

      {recommended.length > 0 && (
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-2xl text-center mb-10">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6">
            {recommended.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
