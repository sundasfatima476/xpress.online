import { Link } from "react-router-dom";
import {
  FiInstagram,
  FiFacebook,
  FiTwitter,
  FiYoutube,
  FiCreditCard,
} from "react-icons/fi";
import { SiVisa, SiMastercard, SiPaypal, SiApplepay } from "react-icons/si";
import Logo from "./Logo";

const FOOTER_COLUMNS = [
  {
    title: "Shop",
    links: [
      { label: "Men", to: "/category/men" },
      { label: "Women", to: "/category/women" },
      { label: "New Arrivals", to: "/shop?filter=new" },
      { label: "Collections", to: "/shop?filter=bestsellers" },
    ],
  },
  {
    title: "Customer Service",
    links: [
      { label: "Contact", to: "/contact" },
      { label: "FAQ", to: "/faq" },
      { label: "Shipping", to: "/shipping-returns" },
      { label: "Returns", to: "/shipping-returns" },
      { label: "Track Order", to: "/track-order" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Privacy Policy", to: "/privacy-policy" },
      { label: "Terms & Conditions", to: "/terms" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-forest text-ivory">
      <div className="container-app py-14 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          <div className="col-span-2 md:col-span-2 pr-6">
            <Link to="/" className="flex items-center gap-2.5 font-serif text-2xl tracking-wide text-ivory">
              <Logo size={32} />
              MAISON <span className="text-gold-light">NOIR</span>
            </Link>
            <p className="text-ivory/60 text-sm mt-4 max-w-xs leading-relaxed">
              Elevated everyday fashion, crafted with intention. Premium fabrics, timeless
              silhouettes, considered details.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {[FiInstagram, FiFacebook, FiTwitter, FiYoutube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="w-9 h-9 flex items-center justify-center border border-ivory/20 hover:border-gold hover:text-gold-light transition-colors"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs uppercase tracking-widest2 text-gold-light mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-sm text-ivory/70 hover:text-ivory transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="container-app py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-ivory/50 order-2 sm:order-1">
            &copy; {new Date().getFullYear()} Maison Noir. All rights reserved.
          </p>
          <div className="flex items-center gap-3 text-ivory/50 order-1 sm:order-2">
            <SiVisa size={26} />
            <SiMastercard size={26} />
            <SiPaypal size={22} />
            <SiApplepay size={26} />
            <FiCreditCard size={20} />
          </div>
        </div>
      </div>
    </footer>
  );
}
