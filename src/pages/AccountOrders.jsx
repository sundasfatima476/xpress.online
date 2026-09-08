import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FiTruck, FiChevronRight } from "react-icons/fi";
import AccountLayout from "../layouts/AccountLayout";
import ProductImage from "../components/ProductImage";
import { orders } from "../data/orders";
import { formatPrice } from "../utils/format";

const STATUS_STYLES = {
  Delivered: "bg-forest/10 text-forest",
  "Out for Delivery": "bg-gold/20 text-gold-dark",
  Shipped: "bg-gold/20 text-gold-dark",
  Processing: "bg-beige text-charcoal/70",
  Cancelled: "bg-charcoal/10 text-charcoal/50",
};

const TABS = ["All", "Processing", "Shipped", "Delivered", "Cancelled"];

export default function AccountOrders() {
  const [tab, setTab] = useState("All");

  const filtered = useMemo(() => {
    if (tab === "All") return orders;
    if (tab === "Shipped") return orders.filter((o) => ["Shipped", "Out for Delivery"].includes(o.status));
    return orders.filter((o) => o.status === tab);
  }, [tab]);

  return (
    <AccountLayout title="Order History">
      <div className="flex flex-wrap gap-2 mb-6">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-xs uppercase tracking-widest2 border transition-colors ${
              tab === t ? "bg-forest text-ivory border-forest" : "border-charcoal/15 text-charcoal/60 hover:border-forest"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="card-surface p-10 text-center">
          <p className="font-serif text-xl mb-2">No {tab.toLowerCase()} orders</p>
          <p className="text-sm text-charcoal/55">Orders in this status will show up here.</p>
        </div>
      ) : (
        <div className="space-y-5">
          {filtered.map((order) => (
            <div key={order.orderNumber} className="card-surface p-5 md:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-charcoal/10">
                <div>
                  <p className="text-sm font-medium">Order #{order.orderNumber}</p>
                  <p className="text-xs text-charcoal/55 mt-0.5">
                    Placed on{" "}
                    {new Date(order.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </p>
                </div>
                <span className={`text-xs px-2.5 py-1 font-medium ${STATUS_STYLES[order.status] || "bg-beige text-charcoal/70"}`}>
                  {order.status}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-4 mb-4">
                {order.items.map((item) => (
                  <Link key={item.id} to={`/product/${item.id}`} className="w-14 h-16 bg-beige shrink-0 overflow-hidden">
                    <ProductImage seed={item.img} className="w-full h-full" iconSize={16} />
                  </Link>
                ))}
                <div className="text-sm text-charcoal/60">
                  {order.items.length} {order.items.length === 1 ? "item" : "items"}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <p className="text-base font-medium text-forest">{formatPrice(order.total)}</p>
                <div className="flex items-center gap-3">
                  <Link to="/track-order" className="btn-ghost !px-4 !py-2 text-xs">
                    <FiTruck size={13} /> Track Order
                  </Link>
                  <button className="text-xs text-forest flex items-center gap-1 hover:gap-1.5 transition-all">
                    View Details <FiChevronRight size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AccountLayout>
  );
}
