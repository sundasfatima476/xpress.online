import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import Breadcrumb from "../components/Breadcrumb";

const FAQ_SECTIONS = [
  {
    title: "Orders",
    items: [
      { q: "How do I place an order?", a: "Browse our shop, select your size and color, and proceed through checkout. You'll receive a confirmation email once your order is placed." },
      { q: "Can I modify or cancel my order?", a: "Orders can be modified or cancelled within 1 hour of placement. Contact support immediately for assistance." },
      { q: "How do I track my order?", a: "Visit our Track Order page and enter your order number along with the email or phone used at checkout." },
    ],
  },
  {
    title: "Shipping",
    items: [
      { q: "What are your shipping options?", a: "We offer standard shipping (3–6 business days, free over $50) and express shipping (1–2 business days, $18)." },
      { q: "Do you ship internationally?", a: "Yes, we ship to over 40 countries. Rates and delivery times vary by destination and are calculated at checkout." },
    ],
  },
  {
    title: "Returns",
    items: [
      { q: "What is your return policy?", a: "We accept returns within 30 days of delivery for unworn items with tags attached. Refunds are issued to the original payment method." },
      { q: "How do I start a return?", a: "Visit our Shipping & Returns page for full instructions, or contact our support team to initiate a return." },
    ],
  },
  {
    title: "Payments",
    items: [
      { q: "What payment methods do you accept?", a: "We accept all major credit and debit cards, PayPal, and Apple Pay." },
      { q: "Is my payment information secure?", a: "Yes, all transactions are encrypted and processed through PCI-compliant payment gateways." },
    ],
  },
  {
    title: "Products",
    items: [
      { q: "Are your products true to size?", a: "Most items fit true to size. Check our Size Guide on each product page for detailed measurements." },
      { q: "What materials do you use?", a: "We prioritize natural, responsibly sourced fibers including cotton, linen, wool, and cashmere." },
    ],
  },
  {
    title: "Sizes",
    items: [
      { q: "Where can I find the size guide?", a: "Our full size guide is available on every product page, and as a standalone reference at /size-guide." },
      { q: "What if I'm between sizes?", a: "We generally recommend sizing up for a relaxed fit, or down for a tailored fit. Contact us for personal sizing advice." },
    ],
  },
  {
    title: "Account",
    items: [
      { q: "How do I create an account?", a: "Click 'Create Account' at the top of the site, or during checkout, to save your details for faster future orders." },
      { q: "How do I reset my password?", a: "Use the 'Forgot Password' link on the login page to receive a reset link via email." },
    ],
  },
];

function AccordionRow({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-charcoal/10">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between py-5 text-left"
      >
        <span className="font-medium text-charcoal pr-6">{item.q}</span>
        <FiChevronDown className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`} size={16} />
      </button>
      {open && <p className="pb-5 text-sm text-charcoal/65 leading-relaxed max-w-2xl">{item.a}</p>}
    </div>
  );
}

export default function FAQ() {
  return (
    <div className="container-app py-8 md:py-10">
      <Breadcrumb items={[{ label: "FAQ" }]} />
      <div className="text-center max-w-xl mx-auto mt-6 mb-14">
        <p className="eyebrow mb-3">Support</p>
        <h1 className="font-serif text-3xl md:text-4xl mb-4">Frequently Asked Questions</h1>
        <p className="text-charcoal/60 text-sm">Find answers to common questions, organized by topic.</p>
      </div>

      <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-x-12">
        {FAQ_SECTIONS.map((section) => (
          <div key={section.title} className="mb-10">
            <h2 className="font-serif text-xl mb-2 text-forest">{section.title}</h2>
            <div>
              {section.items.map((item) => (
                <AccordionRow key={item.q} item={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
