import { Link } from "react-router-dom";
import { FiHeart, FiShoppingBag } from "react-icons/fi";
import ProductImage from "./ProductImage";
import RatingStars from "./RatingStars";
import { formatPrice } from "../utils/format";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  const outOfStock = product.stock <= 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (outOfStock) return;
    addToCart(product);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    toggleWishlist(product);
  };

  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="relative overflow-hidden bg-beige aspect-[3/4]">
        <ProductImage
          seed={product.img}
          label={product.name}
          className="w-full h-full transition-transform duration-500 ease-out group-hover:scale-105"
          iconSize={48}
        />
        {outOfStock && (
          <div className="absolute inset-0 bg-softwhite/55 flex items-center justify-center">
            <span className="bg-charcoal text-ivory text-[10px] tracking-widest2 uppercase px-3 py-1.5">
              Out of Stock
            </span>
          </div>
        )}

        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNew && !outOfStock && (
            <span className="bg-forest text-ivory text-[10px] tracking-widest2 uppercase px-2.5 py-1">
              New
            </span>
          )}
          {product.discount > 0 && !outOfStock && (
            <span className="bg-gold text-forest-dark text-[10px] tracking-widest2 uppercase px-2.5 py-1">
              -{product.discount}%
            </span>
          )}
        </div>

        <button
          onClick={handleWishlist}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-softwhite/90 hover:bg-softwhite transition-colors"
        >
          <FiHeart size={15} className={wishlisted ? "fill-forest text-forest" : "text-charcoal"} />
        </button>

        {!outOfStock && (
          <button
            onClick={handleAddToCart}
            className="absolute left-0 right-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out bg-forest text-ivory text-xs tracking-widest2 uppercase py-3 flex items-center justify-center gap-2"
          >
            <FiShoppingBag size={14} /> Add to Cart
          </button>
        )}
      </div>

      <div className="pt-3.5">
        <p className="text-[11px] uppercase tracking-widest2 text-charcoal/45 mb-1">
          {product.category.replace("-", " ")}
        </p>
        <h3 className="font-serif text-lg text-charcoal leading-snug group-hover:text-forest transition-colors">
          {product.name}
        </h3>
        <div className="mt-1.5">
          <RatingStars rating={product.rating} reviews={product.reviews} />
        </div>
        <div className="mt-1.5 flex items-center gap-2">
          <span className="text-forest font-medium">{formatPrice(product.price)}</span>
          {product.discount > 0 && (
            <span className="text-charcoal/40 line-through text-sm">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
