import { Link } from "react-router-dom";
import { FiHeart, FiShoppingBag, FiTrash2 } from "react-icons/fi";
import Breadcrumb from "../components/Breadcrumb";
import ProductImage from "../components/ProductImage";
import RatingStars from "../components/RatingStars";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { getProductById } from "../data/products";
import { formatPrice } from "../utils/format";

export default function Wishlist() {
  const { ids, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const products = ids.map(getProductById).filter(Boolean);

  return (
    <div className="container-app py-8 md:py-10">
      <Breadcrumb items={[{ label: "Wishlist" }]} />
      <h1 className="font-serif text-3xl md:text-4xl mt-3 mb-8">My Wishlist</h1>

      {products.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-20 h-20 rounded-full bg-beige flex items-center justify-center mx-auto mb-6">
            <FiHeart className="text-forest" size={26} />
          </div>
          <h2 className="font-serif text-2xl mb-3">Your wishlist is empty</h2>
          <p className="text-charcoal/55 mb-8">Save the pieces you love — they'll be waiting for you here.</p>
          <Link to="/shop" className="btn-primary inline-flex">
            Discover Products
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((product) => (
            <div key={product.id} className="card-surface p-4 flex gap-4">
              <Link to={`/product/${product.id}`} className="w-24 h-28 bg-beige shrink-0 overflow-hidden">
                <ProductImage seed={product.img} className="w-full h-full" iconSize={22} />
              </Link>
              <div className="flex-1 min-w-0 flex flex-col">
                <Link to={`/product/${product.id}`} className="font-serif text-base hover:text-forest transition-colors truncate">
                  {product.name}
                </Link>
                <div className="mt-1">
                  <RatingStars rating={product.rating} size={11} />
                </div>
                <p className="text-forest font-medium mt-1.5">{formatPrice(product.price)}</p>
                <div className="flex items-center gap-2 mt-auto pt-3">
                  <button onClick={() => addToCart(product)} className="btn-primary !text-[11px] !px-3 !py-2 flex-1">
                    <FiShoppingBag size={12} /> Add to Cart
                  </button>
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    aria-label="Remove from wishlist"
                    className="w-9 h-9 flex items-center justify-center border border-charcoal/15 hover:border-red-700 hover:text-red-700 transition-colors shrink-0"
                  >
                    <FiTrash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
