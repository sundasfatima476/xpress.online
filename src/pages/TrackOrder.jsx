import { useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiSearch, FiMapPin, FiCalendar, FiUser, FiPackage } from "react-icons/fi";
import Breadcrumb from "../components/Breadcrumb";
import ProductImage from "../components/ProductImage";
import OrderTimeline from "../components/OrderTimeline";
import { findOrder } from "../data/orders";
import { formatPrice } from "../utils/format";

export default function TrackOrder() {
  const [orderNumber, setOrderNumber] = useState("");
  const [contact, setContact] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null); // "not-found" | order object

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!orderNumber.trim() || !contact.trim()) return;
    const found = findOrder(orderNumber, contact);
    setResult(found || "not-found");
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setResult(null);
    setOrderNumber("");
    setContact("");
  };

  return (
    <div className="bg-beige/30 min-h-[70vh]">
      <div className="container-app py-8 md:py-10">
        <Breadcrumb items={[{ label: "Track Order" }]} />

        <div className="max-w-xl mx-auto text-center mt-6 mb-10">
          <p className="eyebrow mb-3">Order Status</p>
          <h1 className="font-serif text-3xl md:text-4xl mb-4">Track Your Order</h1>
          <p className="text-charcoal/60 text-sm">
            Enter your order number and the email or phone used at checkout to see live status.
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto card-surface p-6 md:p-8">
            <div className="mb-5">
              <label className="label-field">Order Number</label>
              <input
                required
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                placeholder="#NX-10482"
                className="input-field"
              />
            </div>
            <div className="mb-7">
              <label className="label-field">Email Address / Phone Number</label>
              <input
                required
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="customer@example.com"
                className="input-field"
              />
            </div>
            <button type="submit" className="btn-primary w-full">
              Track Order <FiArrowRight size={14} />
            </button>
            <p className="text-xs text-charcoal/45 text-center mt-4">
              Try order <span className="text-charcoal">#NX-10482</span> with{" "}
              <span className="text-charcoal">customer@example.com</span>
            </p>
          </form>
        ) : result === "not-found" ? (
          <div className="max-w-md mx-auto card-surface p-8 text-center">
            <div className="w-14 h-14 rounded-full bg-beige flex items-center justify-center mx-auto mb-5">
              <FiSearch className="text-charcoal/50" size={22} />
            </div>
            <h2 className="font-serif text-2xl mb-2">Order not found</h2>
            <p className="text-charcoal/60 text-sm mb-7">
              We couldn't find an order matching those details. Please double-check your order number
              and contact information.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button onClick={handleReset} className="btn-primary">
                Try Again
              </button>
              <Link to="/contact" className="btn-outline">
                Contact Support
              </Link>
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="card-surface p-6 md:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-charcoal/10">
                <div>
                  <p className="text-xs uppercase tracking-widest2 text-charcoal/45">Order</p>
                  <p className="font-serif text-2xl text-forest mt-1">#{result.orderNumber}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs uppercase tracking-widest2 text-charcoal/45">Placed On</p>
                  <p className="text-sm mt-1">{new Date(result.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
                </div>
              </div>

              <h3 className="eyebrow mb-4">Order Status</h3>
              <OrderTimeline status={result.status} />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="card-surface p-6">
                <h3 className="eyebrow mb-4 flex items-center gap-2">
                  <FiPackage size={14} /> Product Information
                </h3>
                <div className="space-y-4">
                  {result.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <div className="w-14 h-16 bg-beige shrink-0">
                        <ProductImage seed={item.img} className="w-full h-full" iconSize={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.name}</p>
                        <p className="text-xs text-charcoal/55">
                          Size {item.size} · Qty {item.qty}
                        </p>
                      </div>
                      <span className="text-sm text-forest font-medium">{formatPrice(item.price)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card-surface p-6">
                <h3 className="eyebrow mb-4 flex items-center gap-2">
                  <FiMapPin size={14} /> Shipping Information
                </h3>
                <div className="space-y-3 text-sm">
                  <p className="flex items-center gap-2 text-charcoal/75">
                    <FiUser size={13} className="text-forest shrink-0" /> {result.customerName}
                  </p>
                  <p className="flex items-start gap-2 text-charcoal/75">
                    <FiMapPin size={13} className="text-forest shrink-0 mt-0.5" /> {result.address}
                  </p>
                  <p className="flex items-center gap-2 text-charcoal/75">
                    <FiCalendar size={13} className="text-forest shrink-0" /> Est. Delivery: {result.estimatedDelivery}
                  </p>
                </div>
                <div className="border-t border-charcoal/10 mt-5 pt-4 flex justify-between text-sm">
                  <span className="text-charcoal/60">Order Total</span>
                  <span className="font-medium text-forest">{formatPrice(result.total)}</span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button onClick={handleReset} className="btn-outline">
                Track Another Order
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
