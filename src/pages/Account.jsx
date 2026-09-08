import { Link } from "react-router-dom";
import { FiPackage, FiHeart, FiMapPin, FiArrowRight } from "react-icons/fi";
import AccountLayout from "../layouts/AccountLayout";
import ProductImage from "../components/ProductImage";
import { orders } from "../data/orders";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";
import { formatPrice } from "../utils/format";

const STATUS_STYLES = {
  Delivered: "bg-forest/10 text-forest",
  "Out for Delivery": "bg-gold/20 text-gold-dark",
  Shipped: "bg-gold/20 text-gold-dark",
  Processing: "bg-beige text-charcoal/70",
  "Order Confirmed": "bg-beige text-charcoal/70",
  "Order Placed": "bg-beige text-charcoal/70",
  Cancelled: "bg-charcoal/10 text-charcoal/50",
};

export default function Account() {
  const { user } = useAuth();
  const { ids } = useWishlist();
  const recentOrders = orders.slice(0, 3);

  return (
    <AccountLayout title={`Welcome back, ${(user?.name || "Amelia").split(" ")[0]}`}>
      <div className="grid sm:grid-cols-3 gap-5 mb-8">
        <div className="card-surface p-5 flex items-center gap-4">
          <div className="w-11 h-11 rounded-full bg-beige flex items-center justify-center shrink-0">
            <FiPackage className="text-forest" size={18} />
          </div>
          <div>
            <p className="text-2xl font-serif">{orders.length}</p>
            <p className="text-xs text-charcoal/55">Total Orders</p>
          </div>
        </div>
        <div className="card-surface p-5 flex items-center gap-4">
          <div className="w-11 h-11 rounded-full bg-beige flex items-center justify-center shrink-0">
            <FiHeart className="text-forest" size={18} />
          </div>
          <div>
            <p className="text-2xl font-serif">{ids.length}</p>
            <p className="text-xs text-charcoal/55">Wishlist Items</p>
          </div>
        </div>
        <div className="card-surface p-5 flex items-center gap-4">
          <div className="w-11 h-11 rounded-full bg-beige flex items-center justify-center shrink-0">
            <FiMapPin className="text-forest" size={18} />
          </div>
          <div>
            <p className="text-2xl font-serif">1</p>
            <p className="text-xs text-charcoal/55">Saved Address</p>
          </div>
        </div>
      </div>

      <div className="card-surface p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-serif text-xl">Recent Orders</h2>
          <Link to="/account/orders" className="text-sm text-forest flex items-center gap-1.5 hover:gap-2 transition-all">
            View All <FiArrowRight size={13} />
          </Link>
        </div>
        <div className="divide-y divide-charcoal/10">
          {recentOrders.map((order) => (
            <div key={order.orderNumber} className="py-4 flex items-center gap-4 flex-wrap">
              <div className="w-14 h-16 bg-beige shrink-0">
                <ProductImage seed={order.items[0].img} className="w-full h-full" iconSize={16} />
              </div>
              <div className="flex-1 min-w-[140px]">
                <p className="text-sm font-medium">#{order.orderNumber}</p>
                <p className="text-xs text-charcoal/55 mt-0.5">
                  {new Date(order.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </p>
              </div>
              <span className={`text-xs px-2.5 py-1 font-medium ${STATUS_STYLES[order.status]}`}>
                {order.status}
              </span>
              <span className="text-sm font-medium text-forest">{formatPrice(order.total)}</span>
              <Link to="/track-order" className="text-xs text-forest underline underline-offset-2 whitespace-nowrap">
                Track Order
              </Link>
            </div>
          ))}
        </div>
      </div>
    </AccountLayout>
  );
}
