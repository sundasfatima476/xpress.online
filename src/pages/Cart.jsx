import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiTrash2, FiHeart, FiMinus, FiPlus, FiArrowRight, FiArrowLeft } from "react-icons/fi";
import Breadcrumb from "../components/Breadcrumb";
import ProductImage from "../components/ProductImage";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { getProductById } from "../data/products";
import { formatPrice } from "../utils/format";
import { useToast } from "../context/ToastContext";

export default function Cart() {
  const { items, removeFromCart, updateQty, subtotal } = useCart();
  const { toggleWishlist } = useWishlist();
  const toast = useToast();
  const navigate = useNavigate();
  const [promo, setPromo] = useState("");
  const [discount, setDiscount] = useState(0);

  const shipping = subtotal > 50 || subtotal === 0 ? 0 : 8;
  const total = Math.max(subtotal - discount + shipping, 0);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promo.trim().toUpperCase() === "STYLE10") {
      const d = Math.round(subtotal * 0.1);
      setDiscount(d);
      toast?.showToast("Promo code applied — 10% off", "success");
    } else {
      toast?.showToast("Invalid promo code", "error");
    }
  };

  const handleMoveToWishlist = (item) => {
    const product = getProductById(item.id);
    if (product) toggleWishlist(product);
    removeFromCart(item.lineId);
  };

  if (items.length === 0) {
    return (
      <div className="container-app py-8 md:py-10">
        <Breadcrumb items={[{ label: "Cart" }]} />
        <div className="text-center py-20">
          <div className="w-20 h-20 rounded-full bg-beige flex items-center justify-center mx-auto mb-6">
            <FiArrowLeft className="text-forest" size={26} />
          </div>
          <h1 className="font-serif text-3xl mb-3">Your cart is empty</h1>
          <p className="text-charcoal/55 mb-8">Looks like you haven't added anything yet.</p>
          <Link to="/shop" className="btn-primary inline-flex">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-app py-8 md:py-10">
      <Breadcrumb items={[{ label: "Cart" }]} />
      <h1 className="font-serif text-3xl md:text-4xl mt-3 mb-8">Shopping Cart</h1>

      <div className="grid lg:grid-cols-[1fr_380px] gap-10">
        <div>
          <div className="hidden md:grid grid-cols-[100px_1fr_120px_100px_40px] gap-4 pb-3 border-b border-charcoal/10 text-xs uppercase tracking-widest2 text-charcoal/45">
            <span>Product</span>
            <span>Details</span>
            <span>Quantity</span>
            <span className="text-right">Price</span>
            <span />
          </div>
          <div className="divide-y divide-charcoal/10">
            {items.map((item) => (
              <div key={item.lineId} className="grid grid-cols-[80px_1fr] md:grid-cols-[100px_1fr_120px_100px_40px] gap-4 py-5 items-center">
                <Link to={`/product/${item.id}`} className="w-20 h-24 md:w-[100px] md:h-[120px] bg-beige overflow-hidden shrink-0">
                  <ProductImage seed={item.img} className="w-full h-full" iconSize={26} />
                </Link>
                <div className="min-w-0">
                  <Link to={`/product/${item.id}`} className="font-serif text-lg hover:text-forest transition-colors">
                    {item.name}
                  </Link>
                  <div className="flex items-center gap-3 mt-1.5 text-xs text-charcoal/55">
                    <span>Size: {item.size}</span>
                    <span className="flex items-center gap-1">
                      Color:{" "}
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-charcoal/15 inline-block"
                        style={{ backgroundColor: item.color }}
                      />
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-3 md:hidden">
                    <div className="flex items-center border border-charcoal/20">
                      <button onClick={() => updateQty(item.lineId, item.qty - 1)} className="w-8 h-8 flex items-center justify-center">
                        <FiMinus size={11} />
                      </button>
                      <span className="w-8 text-center text-sm">{item.qty}</span>
                      <button onClick={() => updateQty(item.lineId, item.qty + 1)} className="w-8 h-8 flex items-center justify-center">
                        <FiPlus size={11} />
                      </button>
                    </div>
                    <span className="text-forest font-medium text-sm">{formatPrice(item.price * item.qty)}</span>
                  </div>
                  <div className="flex items-center gap-4 mt-3 md:hidden">
                    <button onClick={() => handleMoveToWishlist(item)} className="flex items-center gap-1.5 text-xs text-charcoal/55">
                      <FiHeart size={13} /> Wishlist
                    </button>
                    <button onClick={() => removeFromCart(item.lineId)} className="flex items-center gap-1.5 text-xs text-charcoal/55">
                      <FiTrash2 size={13} /> Remove
                    </button>
                  </div>
                </div>
                <div className="hidden md:flex items-center border border-charcoal/20 w-fit h-fit">
                  <button onClick={() => updateQty(item.lineId, item.qty - 1)} className="w-9 h-9 flex items-center justify-center hover:bg-beige">
                    <FiMinus size={12} />
                  </button>
                  <span className="w-9 text-center text-sm">{item.qty}</span>
                  <button onClick={() => updateQty(item.lineId, item.qty + 1)} className="w-9 h-9 flex items-center justify-center hover:bg-beige">
                    <FiPlus size={12} />
                  </button>
                </div>
                <span className="hidden md:block text-right font-medium text-forest">
                  {formatPrice(item.price * item.qty)}
                </span>
                <div className="hidden md:flex flex-col items-center gap-2">
                  <button onClick={() => handleMoveToWishlist(item)} aria-label="Move to wishlist" className="hover:text-forest transition-colors">
                    <FiHeart size={16} />
                  </button>
                  <button onClick={() => removeFromCart(item.lineId)} aria-label="Remove item" className="hover:text-red-700 transition-colors">
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-forest mt-8 hover:gap-3 transition-all">
            <FiArrowLeft size={14} /> Continue Shopping
          </Link>
        </div>

        {/* Order summary */}
        <div className="card-surface p-6 h-fit">
          <h2 className="font-serif text-xl mb-5">Order Summary</h2>
          <form onSubmit={handleApplyPromo} className="flex gap-2 mb-5">
            <input
              type="text"
              value={promo}
              onChange={(e) => setPromo(e.target.value)}
              placeholder="Promo code (try STYLE10)"
              className="input-field flex-1 !py-2.5"
            />
            <button type="submit" className="btn-ghost !px-4 !py-2.5 whitespace-nowrap">
              Apply
            </button>
          </form>
          <div className="space-y-3 text-sm border-t border-charcoal/10 pt-5">
            <div className="flex justify-between text-charcoal/70">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-charcoal/70">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-forest">
                <span>Discount</span>
                <span>-{formatPrice(discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-base font-medium border-t border-charcoal/10 pt-3">
              <span>Total</span>
              <span className="text-forest">{formatPrice(total)}</span>
            </div>
          </div>
          <button onClick={() => navigate("/checkout")} className="btn-primary w-full mt-6">
            Proceed to Checkout <FiArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
