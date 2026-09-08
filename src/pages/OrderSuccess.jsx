import { Link, useLocation, Navigate } from "react-router-dom";
import { FiCheck, FiTruck, FiArrowRight } from "react-icons/fi";
import ProductImage from "../components/ProductImage";
import { formatPrice } from "../utils/format";

export default function OrderSuccess() {
  const { state } = useLocation();

  if (!state) return <Navigate to="/" replace />;

  const { orderNumber, total, email, items = [] } = state;
  const estimatedDelivery = new Date(Date.now() + 6 * 86400000).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="container-app py-14 md:py-20">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <div className="w-16 h-16 rounded-full bg-forest flex items-center justify-center mx-auto mb-6">
          <FiCheck className="text-ivory" size={28} />
        </div>
        <p className="eyebrow mb-3">Thank you</p>
        <h1 className="font-serif text-3xl md:text-4xl mb-4">Order Confirmed</h1>
        <p className="text-charcoal/60">
          A confirmation email has been sent to <span className="text-charcoal">{email || "your inbox"}</span>.
          We're already preparing your order.
        </p>
      </div>

      <div className="max-w-2xl mx-auto card-surface p-6 md:p-8 mb-10">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-charcoal/10 mb-6">
          <div>
            <p className="text-xs uppercase tracking-widest2 text-charcoal/45">Order Number</p>
            <p className="font-serif text-2xl text-forest mt-1">#{orderNumber}</p>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-widest2 text-charcoal/45">Estimated Delivery</p>
            <p className="text-sm mt-1 flex items-center gap-1.5 justify-end">
              <FiTruck size={14} className="text-forest" /> {estimatedDelivery}
            </p>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          {items.map((item) => (
            <div key={item.lineId} className="flex items-center gap-4">
              <div className="w-14 h-16 bg-beige shrink-0">
                <ProductImage seed={item.img} className="w-full h-full" iconSize={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{item.name}</p>
                <p className="text-xs text-charcoal/55">Size {item.size} · Qty {item.qty}</p>
              </div>
              <span className="text-sm text-forest font-medium">{formatPrice(item.price * item.qty)}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center border-t border-charcoal/10 pt-5">
          <span className="font-medium">Total Paid</span>
          <span className="font-serif text-xl text-forest">{formatPrice(total)}</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link to="/track-order" className="btn-primary">
          Track Order <FiArrowRight size={14} />
        </Link>
        <Link to="/shop" className="btn-outline">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
