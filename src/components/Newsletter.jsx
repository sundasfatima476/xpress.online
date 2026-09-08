import { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { useToast } from "../context/ToastContext";

export default function Newsletter({ dark = true }) {
  const [email, setEmail] = useState("");
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.includes("@")) {
      toast?.showToast("Please enter a valid email address", "error");
      return;
    }
    toast?.showToast("You're on the list — welcome to the Style Loop.", "success");
    setEmail("");
  };

  return (
    <section className={dark ? "bg-forest text-ivory" : "bg-beige text-charcoal"}>
      <div className="container-app py-16 md:py-20 text-center">
        <p className="eyebrow mb-3">Newsletter</p>
        <h2 className="text-3xl md:text-4xl mb-4">Stay in the Style Loop</h2>
        <p className={`max-w-md mx-auto mb-8 text-sm ${dark ? "text-ivory/70" : "text-charcoal/60"}`}>
          Be first to know about new arrivals, exclusive collections, and members-only offers.
        </p>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            aria-label="Email address"
            className={`flex-1 px-4 py-3.5 text-sm bg-transparent border ${
              dark ? "border-ivory/30 placeholder:text-ivory/40 text-ivory" : "border-charcoal/25 placeholder:text-charcoal/40"
            } focus:outline-none focus:border-gold`}
          />
          <button type="submit" className="btn-gold whitespace-nowrap">
            Subscribe <FiArrowRight size={14} />
          </button>
        </form>
      </div>
    </section>
  );
}
