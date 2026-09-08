import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  FiHeart,
  FiShoppingBag,
  FiMinus,
  FiPlus,
  FiTruck,
  FiRefreshCw,
  FiShield,
  FiChevronDown,
} from "react-icons/fi";
import Breadcrumb from "../components/Breadcrumb";
import ProductImage from "../components/ProductImage";
import RatingStars from "../components/RatingStars";
import ProductCard from "../components/ProductCard";
import SizeGuideModal from "../components/SizeGuideModal";
import { formatPrice } from "../utils/format";
import { getProductById, getRelatedProducts } from "../data/products";
import { getCategoryBySlug } from "../data/categories";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useToast } from "../context/ToastContext";

function AccordionItem({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-charcoal/10">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className="font-medium text-sm">{title}</span>
        <FiChevronDown className={`transition-transform ${open ? "rotate-180" : ""}`} size={16} />
      </button>
      {open && <div className="pb-5 text-sm text-charcoal/70 leading-relaxed">{children}</div>}
    </div>
  );
}

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProductById(id);
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const toast = useToast();
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  if (!product) {
    return (
      <div className="container-app py-24 text-center">
        <h1 className="font-serif text-3xl mb-4">Product not found</h1>
        <Link to="/shop" className="btn-primary inline-flex">
          Browse All Products
        </Link>
      </div>
    );
  }

  const category = getCategoryBySlug(product.category);
  const related = getRelatedProducts(product);
  const wishlisted = isWishlisted(product.id);
  const outOfStock = product.stock <= 0;
  const thumbnails = [product.img, `${product.img}-b`, `${product.img}-c`, `${product.img}-d`];

  const handleAddToCart = () => {
    if (outOfStock) return;
    if (!selectedSize) {
      toast?.showToast("Please select a size", "error");
      return;
    }
    addToCart(product, { size: selectedSize, color: selectedColor, qty });
  };

  const handleBuyNow = () => {
    if (outOfStock) return;
    if (!selectedSize) {
      toast?.showToast("Please select a size", "error");
      return;
    }
    addToCart(product, { size: selectedSize, color: selectedColor, qty });
    navigate("/checkout");
  };

  return (
    <div className="container-app py-8 md:py-10">
      <Breadcrumb
        items={[
          { label: "Shop", to: "/shop" },
          { label: category?.name || product.category, to: `/category/${product.category}` },
          { label: product.name },
        ]}
      />

      <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 mt-6">
        {/* Gallery */}
        <div>
          <div className="aspect-[4/5] bg-beige overflow-hidden mb-4">
            <ProductImage seed={thumbnails[activeImage]} label={product.name} className="w-full h-full" iconSize={64} />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {thumbnails.map((t, idx) => (
              <button
                key={t}
                onClick={() => setActiveImage(idx)}
                className={`aspect-square bg-beige overflow-hidden border-2 transition-colors ${
                  activeImage === idx ? "border-forest" : "border-transparent"
                }`}
                aria-label={`View image ${idx + 1}`}
              >
                <ProductImage seed={t} className="w-full h-full" iconSize={22} />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <p className="text-xs uppercase tracking-widest2 text-charcoal/45 mb-2">
            {category?.name || product.category}
          </p>
          <h1 className="font-serif text-3xl md:text-4xl leading-tight mb-3">{product.name}</h1>
          {outOfStock && (
            <span className="inline-block bg-charcoal text-ivory text-[10px] tracking-widest2 uppercase px-2.5 py-1 mb-3">
              Out of Stock
            </span>
          )}
          <div className="flex items-center gap-3 mb-5">
            <RatingStars rating={product.rating} showValue />
            <span className="text-charcoal/40 text-sm">•</span>
            <span className="text-sm text-charcoal/60">{product.reviews} reviews</span>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl text-forest font-medium">{formatPrice(product.price)}</span>
            {product.discount > 0 && (
              <>
                <span className="text-charcoal/40 line-through text-lg">
                  {formatPrice(product.originalPrice)}
                </span>
                <span className="bg-gold/20 text-gold-dark text-xs font-medium px-2.5 py-1">
                  Save {product.discount}%
                </span>
              </>
            )}
          </div>

          <p className="text-charcoal/65 text-sm leading-relaxed mb-7 max-w-lg">{product.description}</p>

          {/* Color selector */}
          <div className="mb-6">
            <p className="label-field">Color</p>
            <div className="flex items-center gap-3">
              {product.colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedColor(c)}
                  aria-label={`Select color ${c}`}
                  className={`w-9 h-9 rounded-full border-2 transition-all ${
                    selectedColor === c ? "border-gold scale-110" : "border-charcoal/15"
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          {/* Size selector */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <p className="label-field !mb-0">Size</p>
              <button
                onClick={() => setSizeGuideOpen(true)}
                className="text-xs text-forest underline underline-offset-2"
              >
                Size Guide
              </button>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`min-w-[44px] h-11 px-3 text-sm border transition-colors ${
                    selectedSize === s
                      ? "bg-forest text-ivory border-forest"
                      : "border-charcoal/20 text-charcoal/75 hover:border-forest"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-8">
            <p className="label-field">Quantity</p>
            <div className="flex items-center border border-charcoal/20 w-fit">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-11 h-11 flex items-center justify-center hover:bg-beige transition-colors"
                aria-label="Decrease quantity"
              >
                <FiMinus size={14} />
              </button>
              <span className="w-12 text-center text-sm">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="w-11 h-11 flex items-center justify-center hover:bg-beige transition-colors"
                aria-label="Increase quantity"
              >
                <FiPlus size={14} />
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <button
              onClick={handleAddToCart}
              disabled={outOfStock}
              className={`btn-primary flex-1 ${outOfStock ? "opacity-40 cursor-not-allowed" : ""}`}
            >
              <FiShoppingBag size={15} /> {outOfStock ? "Out of Stock" : "Add to Cart"}
            </button>
            <button
              onClick={handleBuyNow}
              disabled={outOfStock}
              className={`btn-gold flex-1 ${outOfStock ? "opacity-40 cursor-not-allowed" : ""}`}
            >
              Buy Now
            </button>
            <button
              onClick={() => toggleWishlist(product)}
              aria-label="Toggle wishlist"
              className={`btn-ghost !px-4 ${wishlisted ? "!border-forest text-forest" : ""}`}
            >
              <FiHeart size={16} className={wishlisted ? "fill-forest" : ""} />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3 border-t border-charcoal/10 pt-6">
            <div className="flex flex-col items-center text-center gap-2">
              <FiTruck className="text-forest" size={18} />
              <p className="text-xs text-charcoal/60">Free Shipping over $50</p>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <FiRefreshCw className="text-forest" size={18} />
              <p className="text-xs text-charcoal/60">30-Day Returns</p>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <FiShield className="text-forest" size={18} />
              <p className="text-xs text-charcoal/60">Secure Checkout</p>
            </div>
          </div>
        </div>
      </div>

      {/* Detail accordions */}
      <div className="max-w-3xl mt-16">
        <AccordionItem title="Description" defaultOpen>
          {product.description}
        </AccordionItem>
        <AccordionItem title="Product Details">
          <ul className="list-disc pl-5 space-y-1.5">
            {product.details.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </AccordionItem>
        <AccordionItem title="Material">{product.material}</AccordionItem>
        <AccordionItem title="Care Instructions">{product.care}</AccordionItem>
        <AccordionItem title="Shipping & Returns">
          Free standard shipping on orders over $50, delivered in 3–6 business days. Full-price
          items may be returned within 30 days for a full refund.{" "}
          <Link to="/shipping-returns" className="text-forest underline underline-offset-2">
            View full policy
          </Link>
          .
        </AccordionItem>
        <AccordionItem title={`Reviews (${product.reviews})`}>
          <div className="space-y-5">
            {[
              { name: "Sarah J.", text: "Beautiful fabric and true to size. Exceeded expectations.", rating: 5 },
              { name: "Michael T.", text: "Great fit, quick shipping. Will buy again.", rating: 4.5 },
            ].map((r) => (
              <div key={r.name} className="border-b border-charcoal/10 pb-4 last:border-0">
                <div className="flex items-center justify-between mb-1.5">
                  <p className="font-medium text-charcoal text-sm">{r.name}</p>
                  <RatingStars rating={r.rating} size={12} />
                </div>
                <p className="text-charcoal/65">{r.text}</p>
              </div>
            ))}
          </div>
        </AccordionItem>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div className="mt-20">
          <h2 className="font-serif text-2xl md:text-3xl mb-8">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      <SizeGuideModal open={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />
    </div>
  );
}
