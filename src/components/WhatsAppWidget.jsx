import { useState } from "react";
import { Link } from "react-router-dom";
import { FiX, FiSend, FiTruck, FiPackage, FiMaximize2, FiRefreshCw } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const SHORTCUTS = [
  { label: "Track My Order", icon: FiTruck, to: "/track-order" },
  { label: "Product Availability", icon: FiPackage, to: "/shop" },
  { label: "Size Guide", icon: FiMaximize2, to: "/size-guide" },
  { label: "Returns & Exchanges", icon: FiRefreshCw, to: "/shipping-returns" },
];

export default function WhatsAppWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    window.open(
      `https://wa.me/18005550148?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );
    setMessage("");
  };

  return (
    <div className="fixed bottom-5 left-5 z-40">
      {open && (
        <div className="absolute bottom-16 left-0 w-[88vw] max-w-[320px] bg-softwhite shadow-soft border border-charcoal/10 overflow-hidden animate-fade-up">
          <div className="bg-forest text-ivory px-4 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-full bg-ivory/15 flex items-center justify-center">
                <FaWhatsapp size={16} />
              </span>
              <div>
                <p className="text-sm font-medium leading-tight">Chat with us</p>
                <p className="text-[11px] text-ivory/60 leading-tight">We're here to help</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close chat" className="p-1">
              <FiX size={16} />
            </button>
          </div>

          <div className="p-4">
            <div className="bg-beige/50 rounded p-3 text-sm text-charcoal/75 mb-4">
              Hi! How can we help you today? Choose a topic below or send us a message.
            </div>
            <div className="space-y-2 mb-4">
              {SHORTCUTS.map((s) => (
                <Link
                  key={s.label}
                  to={s.to}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2.5 text-sm border border-charcoal/10 hover:border-forest hover:text-forest transition-colors"
                >
                  <s.icon size={14} /> {s.label}
                </Link>
              ))}
            </div>
            <form onSubmit={handleSend} className="flex items-center gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="input-field flex-1 !py-2.5"
              />
              <button type="submit" aria-label="Send" className="btn-primary !px-3 !py-2.5">
                <FiSend size={14} />
              </button>
            </form>
            <p className="text-[10px] text-charcoal/40 mt-2 text-center">
              Opens WhatsApp in a new tab
            </p>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Chat on WhatsApp"
        className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-soft hover:scale-105 transition-transform"
      >
        {open ? <FiX size={22} /> : <FaWhatsapp size={26} />}
      </button>
    </div>
  );
}
