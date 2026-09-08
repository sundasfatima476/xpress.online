import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiCheck, FiArrowRight, FiArrowLeft, FiLock } from "react-icons/fi";
import Breadcrumb from "../components/Breadcrumb";
import ProductImage from "../components/ProductImage";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { formatPrice } from "../utils/format";

const STEPS = ["Information", "Shipping", "Payment", "Review"];

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const toast = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [promo, setPromo] = useState("");
  const [discount, setDiscount] = useState(0);

  const [info, setInfo] = useState({ firstName: "", lastName: "", email: "", phone: "" });
  const [address, setAddress] = useState({ address: "", city: "", state: "", zip: "", country: "United States" });
  const [deliveryMethod, setDeliveryMethod] = useState("standard");
  const [payment, setPayment] = useState({ method: "card", cardNumber: "", expiry: "", cvc: "", nameOnCard: "" });
  const [errors, setErrors] = useState({});

  const shippingCost = deliveryMethod === "express" ? 18 : subtotal > 50 ? 0 : 8;
  const total = Math.max(subtotal - discount + shippingCost, 0);

  if (items.length === 0) {
    return (
      <div className="container-app py-24 text-center">
        <h1 className="font-serif text-3xl mb-4">Your cart is empty</h1>
        <p className="text-charcoal/55 mb-8">Add something to your bag before checking out.</p>
        <Link to="/shop" className="btn-primary inline-flex">
          Continue Shopping
        </Link>
      </div>
    );
  }

  const validateStep = () => {
    const e = {};
    if (step === 0) {
      if (!info.firstName) e.firstName = "Required";
      if (!info.lastName) e.lastName = "Required";
      if (!info.email.includes("@")) e.email = "Valid email required";
    }
    if (step === 1) {
      if (!address.address) e.address = "Required";
      if (!address.city) e.city = "Required";
      if (!address.zip) e.zip = "Required";
    }
    if (step === 2) {
      if (payment.method === "card") {
        if (payment.cardNumber.replace(/\s/g, "").length < 12) e.cardNumber = "Invalid card number";
        if (!payment.expiry) e.expiry = "Required";
        if (!payment.cvc) e.cvc = "Required";
        if (!payment.nameOnCard) e.nameOnCard = "Required";
      }
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promo.trim().toUpperCase() === "STYLE10") {
      setDiscount(Math.round(subtotal * 0.1));
      toast?.showToast("Promo code applied", "success");
    } else {
      toast?.showToast("Invalid promo code", "error");
    }
  };

  const handlePlaceOrder = () => {
    const orderNumber = `NX-${Math.floor(10000 + Math.random() * 89999)}`;
    clearCart();
    navigate("/order-success", {
      state: {
        orderNumber,
        total,
        email: info.email,
        items,
      },
    });
  };

  return (
    <div className="container-app py-8 md:py-10">
      <Breadcrumb items={[{ label: "Cart", to: "/cart" }, { label: "Checkout" }]} />
      <h1 className="font-serif text-3xl md:text-4xl mt-3 mb-8">Checkout</h1>

      {/* Stepper */}
      <div className="flex items-center mb-10 max-w-2xl">
        {STEPS.map((s, idx) => (
          <div key={s} className={`flex items-center ${idx === STEPS.length - 1 ? "" : "flex-1"}`}>
            <div className="flex flex-col items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium shrink-0 ${
                  idx < step ? "bg-forest text-ivory" : idx === step ? "bg-gold text-forest-dark" : "bg-beige text-charcoal/40"
                }`}
              >
                {idx < step ? <FiCheck size={14} /> : idx + 1}
              </div>
              <span className={`text-[11px] uppercase tracking-wide ${idx <= step ? "text-charcoal" : "text-charcoal/40"}`}>
                {s}
              </span>
            </div>
            {idx !== STEPS.length - 1 && (
              <div className={`flex-1 h-[2px] mx-2 mb-5 ${idx < step ? "bg-forest" : "bg-beige"}`} />
            )}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_380px] gap-10">
        <div className="card-surface p-6 md:p-8">
          {step === 0 && (
            <div>
              <h2 className="font-serif text-xl mb-6">Contact Information</h2>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="label-field">First Name</label>
                  <input
                    className="input-field"
                    value={info.firstName}
                    onChange={(e) => setInfo({ ...info, firstName: e.target.value })}
                  />
                  {errors.firstName && <p className="text-xs text-red-700 mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <label className="label-field">Last Name</label>
                  <input
                    className="input-field"
                    value={info.lastName}
                    onChange={(e) => setInfo({ ...info, lastName: e.target.value })}
                  />
                  {errors.lastName && <p className="text-xs text-red-700 mt-1">{errors.lastName}</p>}
                </div>
                <div>
                  <label className="label-field">Email Address</label>
                  <input
                    type="email"
                    className="input-field"
                    value={info.email}
                    onChange={(e) => setInfo({ ...info, email: e.target.value })}
                  />
                  {errors.email && <p className="text-xs text-red-700 mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="label-field">Phone</label>
                  <input
                    className="input-field"
                    value={info.phone}
                    onChange={(e) => setInfo({ ...info, phone: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <h2 className="font-serif text-xl mb-6">Shipping Address</h2>
              <div className="grid gap-5">
                <div>
                  <label className="label-field">Street Address</label>
                  <input
                    className="input-field"
                    value={address.address}
                    onChange={(e) => setAddress({ ...address, address: e.target.value })}
                  />
                  {errors.address && <p className="text-xs text-red-700 mt-1">{errors.address}</p>}
                </div>
                <div className="grid sm:grid-cols-3 gap-5">
                  <div>
                    <label className="label-field">City</label>
                    <input
                      className="input-field"
                      value={address.city}
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    />
                    {errors.city && <p className="text-xs text-red-700 mt-1">{errors.city}</p>}
                  </div>
                  <div>
                    <label className="label-field">State</label>
                    <input
                      className="input-field"
                      value={address.state}
                      onChange={(e) => setAddress({ ...address, state: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="label-field">ZIP Code</label>
                    <input
                      className="input-field"
                      value={address.zip}
                      onChange={(e) => setAddress({ ...address, zip: e.target.value })}
                    />
                    {errors.zip && <p className="text-xs text-red-700 mt-1">{errors.zip}</p>}
                  </div>
                </div>
              </div>

              <h3 className="font-serif text-lg mt-8 mb-4">Delivery Method</h3>
              <div className="space-y-3">
                {[
                  { id: "standard", label: "Standard Shipping", time: "3–6 business days", cost: subtotal > 50 ? 0 : 8 },
                  { id: "express", label: "Express Shipping", time: "1–2 business days", cost: 18 },
                ].map((m) => (
                  <label
                    key={m.id}
                    className={`flex items-center justify-between p-4 border cursor-pointer transition-colors ${
                      deliveryMethod === m.id ? "border-forest bg-beige/40" : "border-charcoal/15"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="delivery"
                        checked={deliveryMethod === m.id}
                        onChange={() => setDeliveryMethod(m.id)}
                        className="accent-forest"
                      />
                      <div>
                        <p className="text-sm font-medium">{m.label}</p>
                        <p className="text-xs text-charcoal/55">{m.time}</p>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-forest">{m.cost === 0 ? "Free" : formatPrice(m.cost)}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="font-serif text-xl mb-6">Payment Method</h2>
              <div className="flex gap-3 mb-6">
                {["card", "paypal"].map((m) => (
                  <button
                    key={m}
                    onClick={() => setPayment({ ...payment, method: m })}
                    className={`flex-1 py-3 text-sm border capitalize transition-colors ${
                      payment.method === m ? "border-forest bg-beige/40 text-forest font-medium" : "border-charcoal/15 text-charcoal/60"
                    }`}
                  >
                    {m === "card" ? "Credit / Debit Card" : "PayPal"}
                  </button>
                ))}
              </div>

              {payment.method === "card" ? (
                <div className="grid gap-5">
                  <div>
                    <label className="label-field">Name on Card</label>
                    <input
                      className="input-field"
                      value={payment.nameOnCard}
                      onChange={(e) => setPayment({ ...payment, nameOnCard: e.target.value })}
                    />
                    {errors.nameOnCard && <p className="text-xs text-red-700 mt-1">{errors.nameOnCard}</p>}
                  </div>
                  <div>
                    <label className="label-field">Card Number</label>
                    <input
                      className="input-field"
                      placeholder="1234 5678 9012 3456"
                      value={payment.cardNumber}
                      onChange={(e) => setPayment({ ...payment, cardNumber: e.target.value })}
                    />
                    {errors.cardNumber && <p className="text-xs text-red-700 mt-1">{errors.cardNumber}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className="label-field">Expiry Date</label>
                      <input
                        className="input-field"
                        placeholder="MM/YY"
                        value={payment.expiry}
                        onChange={(e) => setPayment({ ...payment, expiry: e.target.value })}
                      />
                      {errors.expiry && <p className="text-xs text-red-700 mt-1">{errors.expiry}</p>}
                    </div>
                    <div>
                      <label className="label-field">CVC</label>
                      <input
                        className="input-field"
                        placeholder="123"
                        value={payment.cvc}
                        onChange={(e) => setPayment({ ...payment, cvc: e.target.value })}
                      />
                      {errors.cvc && <p className="text-xs text-red-700 mt-1">{errors.cvc}</p>}
                    </div>
                  </div>
                  <p className="flex items-center gap-2 text-xs text-charcoal/50">
                    <FiLock size={12} /> Your payment information is encrypted and secure.
                  </p>
                </div>
              ) : (
                <div className="bg-beige/50 p-6 text-sm text-charcoal/70 text-center">
                  You'll be redirected to PayPal to complete your purchase securely.
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="font-serif text-xl mb-6">Review Your Order</h2>
              <div className="space-y-6">
                <div>
                  <p className="eyebrow mb-2">Contact</p>
                  <p className="text-sm text-charcoal/75">
                    {info.firstName} {info.lastName} · {info.email}
                  </p>
                </div>
                <div>
                  <p className="eyebrow mb-2">Shipping To</p>
                  <p className="text-sm text-charcoal/75">
                    {address.address}, {address.city} {address.state} {address.zip}
                  </p>
                  <p className="text-sm text-charcoal/55 mt-1 capitalize">
                    {deliveryMethod} shipping
                  </p>
                </div>
                <div>
                  <p className="eyebrow mb-2">Payment</p>
                  <p className="text-sm text-charcoal/75 capitalize">
                    {payment.method === "card"
                      ? `Card ending in ${payment.cardNumber.slice(-4) || "••••"}`
                      : "PayPal"}
                  </p>
                </div>
                <div>
                  <p className="eyebrow mb-3">Items ({items.length})</p>
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div key={item.lineId} className="flex items-center gap-3">
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
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mt-8 pt-6 border-t border-charcoal/10">
            {step > 0 ? (
              <button onClick={() => setStep((s) => s - 1)} className="btn-ghost">
                <FiArrowLeft size={14} /> Back
              </button>
            ) : (
              <Link to="/cart" className="btn-ghost">
                <FiArrowLeft size={14} /> Back to Cart
              </Link>
            )}
            {step < STEPS.length - 1 ? (
              <button onClick={handleNext} className="btn-primary">
                Continue <FiArrowRight size={14} />
              </button>
            ) : (
              <button onClick={handlePlaceOrder} className="btn-gold">
                Place Order <FiCheck size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Order summary sidebar */}
        <div className="card-surface p-6 h-fit lg:sticky lg:top-28">
          <h2 className="font-serif text-xl mb-5">Order Summary</h2>
          <div className="space-y-3 max-h-56 overflow-y-auto scrollbar-thin mb-5">
            {items.map((item) => (
              <div key={item.lineId} className="flex items-center gap-3">
                <div className="relative w-12 h-14 bg-beige shrink-0">
                  <ProductImage seed={item.img} className="w-full h-full" iconSize={14} />
                  <span className="absolute -top-1.5 -right-1.5 bg-forest text-ivory text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {item.qty}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate">{item.name}</p>
                  <p className="text-[11px] text-charcoal/50">Size {item.size}</p>
                </div>
                <span className="text-xs text-forest font-medium">{formatPrice(item.price * item.qty)}</span>
              </div>
            ))}
          </div>
          <form onSubmit={handleApplyPromo} className="flex gap-2 mb-5">
            <input
              type="text"
              value={promo}
              onChange={(e) => setPromo(e.target.value)}
              placeholder="Promo code"
              className="input-field flex-1 !py-2.5"
            />
            <button type="submit" className="btn-ghost !px-4 !py-2.5">
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
              <span>{shippingCost === 0 ? "Free" : formatPrice(shippingCost)}</span>
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
        </div>
      </div>
    </div>
  );
}
