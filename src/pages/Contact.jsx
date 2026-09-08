import { useState } from "react";
import { FiMail, FiPhone, FiMapPin, FiSend, FiClock, FiInstagram, FiFacebook, FiTwitter } from "react-icons/fi";
import Breadcrumb from "../components/Breadcrumb";
import { useToast } from "../context/ToastContext";

const CONTACT_INFO = [
  { icon: FiMail, label: "Email", value: "support@maisonnoir.com" },
  { icon: FiPhone, label: "Phone", value: "+1 (800) 555-0148" },
  { icon: FiMapPin, label: "Studio", value: "482 Greene Street, New York, NY" },
  { icon: FiClock, label: "Hours", value: "Mon–Fri, 9am–6pm EST" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const toast = useToast();

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const e2 = {};
    if (!form.name) e2.name = "Required";
    if (!form.email.includes("@")) e2.email = "Enter a valid email";
    if (!form.message) e2.message = "Required";
    setErrors(e2);
    if (Object.keys(e2).length) return;
    setSent(true);
    toast?.showToast("Your message has been sent", "success");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="container-app py-8 md:py-10">
      <Breadcrumb items={[{ label: "Contact" }]} />
      <div className="text-center max-w-xl mx-auto mt-6 mb-12">
        <p className="eyebrow mb-3">Get In Touch</p>
        <h1 className="font-serif text-3xl md:text-4xl mb-4">We'd Love to Hear From You</h1>
        <p className="text-charcoal/60 text-sm">
          Questions about an order, sizing, or a collaboration? Our team typically responds within 24 hours.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr_380px] gap-10">
        <form onSubmit={handleSubmit} className="card-surface p-6 md:p-8 space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="label-field">Name</label>
              <input className="input-field" value={form.name} onChange={update("name")} />
              {errors.name && <p className="text-xs text-red-700 mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="label-field">Email</label>
              <input type="email" className="input-field" value={form.email} onChange={update("email")} />
              {errors.email && <p className="text-xs text-red-700 mt-1">{errors.email}</p>}
            </div>
          </div>
          <div>
            <label className="label-field">Subject</label>
            <input className="input-field" value={form.subject} onChange={update("subject")} placeholder="Order inquiry, sizing help, etc." />
          </div>
          <div>
            <label className="label-field">Message</label>
            <textarea rows={6} className="input-field resize-none" value={form.message} onChange={update("message")} />
            {errors.message && <p className="text-xs text-red-700 mt-1">{errors.message}</p>}
          </div>
          <button type="submit" className="btn-primary">
            Send Message <FiSend size={13} />
          </button>
          {sent && <p className="text-sm text-forest">Thank you — we'll be in touch shortly.</p>}
        </form>

        <div className="card-surface p-6 md:p-8 h-fit">
          <h2 className="font-serif text-xl mb-6">Customer Support</h2>
          <div className="space-y-5">
            {CONTACT_INFO.map((c) => (
              <div key={c.label} className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-beige flex items-center justify-center shrink-0">
                  <c.icon className="text-forest" size={15} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest2 text-charcoal/45">{c.label}</p>
                  <p className="text-sm text-charcoal mt-0.5">{c.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-charcoal/10 mt-6 pt-6">
            <p className="text-xs uppercase tracking-widest2 text-charcoal/45 mb-3">Follow Us</p>
            <div className="flex items-center gap-3">
              {[FiInstagram, FiFacebook, FiTwitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="w-9 h-9 flex items-center justify-center border border-charcoal/15 hover:border-forest hover:text-forest transition-colors"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
