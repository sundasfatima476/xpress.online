import { FiTruck, FiRefreshCw, FiRepeat, FiDollarSign } from "react-icons/fi";
import Breadcrumb from "../components/Breadcrumb";

const SECTIONS = [
  {
    icon: FiTruck,
    title: "Shipping Information",
    content: [
      "Standard shipping: 3–6 business days, free on orders over $50 ($8 flat rate below).",
      "Express shipping: 1–2 business days, flat $18 rate.",
      "International shipping available to 40+ countries, rates calculated at checkout.",
      "Orders are processed within 24 hours on business days.",
    ],
  },
  {
    icon: FiRefreshCw,
    title: "Return Policy",
    content: [
      "Returns accepted within 30 days of delivery.",
      "Items must be unworn, unwashed, and have original tags attached.",
      "Final sale items are not eligible for return.",
      "Return shipping is free for domestic orders using our prepaid label.",
    ],
  },
  {
    icon: FiRepeat,
    title: "Exchange Policy",
    content: [
      "Exchanges for a different size or color can be requested within 30 days.",
      "Subject to availability — we recommend exchanging early in the return window.",
      "Exchanges are processed within 3–5 business days of receiving your return.",
    ],
  },
  {
    icon: FiDollarSign,
    title: "Refund Policy",
    content: [
      "Refunds are issued to your original payment method within 5–7 business days of us receiving your return.",
      "Shipping charges are non-refundable, except in cases of our error.",
      "You'll receive an email confirmation once your refund has been processed.",
    ],
  },
];

export default function ShippingReturns() {
  return (
    <div className="container-app py-8 md:py-10">
      <Breadcrumb items={[{ label: "Shipping & Returns" }]} />
      <div className="text-center max-w-xl mx-auto mt-6 mb-14">
        <p className="eyebrow mb-3">Policies</p>
        <h1 className="font-serif text-3xl md:text-4xl mb-4">Shipping & Returns</h1>
        <p className="text-charcoal/60 text-sm">
          Everything you need to know about how we ship, and how to return or exchange an item.
        </p>
      </div>

      <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-6">
        {SECTIONS.map((s) => (
          <div key={s.title} className="card-surface p-6">
            <div className="w-11 h-11 rounded-full bg-beige flex items-center justify-center mb-4">
              <s.icon className="text-forest" size={18} />
            </div>
            <h2 className="font-serif text-xl mb-3">{s.title}</h2>
            <ul className="space-y-2 text-sm text-charcoal/65 list-disc pl-4">
              {s.content.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
