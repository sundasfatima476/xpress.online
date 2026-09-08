import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiUser,
  FiHeart,
  FiShoppingBag,
  FiMenu,
  FiX,
  FiChevronDown,
  FiTruck,
  FiHelpCircle,
} from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { categories } from "../data/categories";
import Logo from "./Logo";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "Categories", to: "/shop", hasMenu: true },
  { label: "New Arrivals", to: "/shop?filter=new" },
  { label: "Collections", to: "/shop?filter=bestsellers" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export default function Header() {
  const { itemCount } = useCart();
  const { ids } = useWishlist();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [mobileOpen]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
      setMobileOpen(false);
    }
  };

  return (
    <header className={`sticky top-0 z-50 bg-softwhite transition-shadow ${scrolled ? "shadow-soft" : ""}`}>
      {/* Announcement bar */}
      <div className="bg-forest text-ivory text-xs">
        <div className="container-app flex items-center justify-between py-2">
          <p className="tracking-wide truncate">Free shipping on orders over $50</p>
          <div className="hidden sm:flex items-center gap-5">
            <Link to="/track-order" className="flex items-center gap-1.5 hover:text-gold-light transition-colors">
              <FiTruck size={13} /> Track Order
            </Link>
            <Link to="/faq" className="flex items-center gap-1.5 hover:text-gold-light transition-colors">
              <FiHelpCircle size={13} /> Help
            </Link>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="border-b border-charcoal/10">
        <div className="container-app flex items-center justify-between py-4 md:py-5">
          <button
            className="lg:hidden -ml-2 p-2"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <FiMenu size={22} />
          </button>

          <Link to="/" className="flex items-center gap-2.5 select-none">
            <Logo size={34} className="shrink-0" />
            <span className="font-serif text-2xl md:text-3xl tracking-wide text-forest">
              MAISON<span className="text-gold-dark">&nbsp;NOIR</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8" aria-label="Primary">
            {NAV_LINKS.map((link) =>
              link.hasMenu ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setCategoryMenuOpen(true)}
                  onMouseLeave={() => setCategoryMenuOpen(false)}
                >
                  <button className="flex items-center gap-1 text-sm text-charcoal hover:text-forest transition-colors py-2">
                    {link.label} <FiChevronDown size={13} />
                  </button>
                  {categoryMenuOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[560px]">
                      <div className="bg-softwhite border border-charcoal/10 shadow-soft p-6 grid grid-cols-2 gap-x-8 gap-y-3">
                        {categories.map((c) => (
                          <Link
                            key={c.slug}
                            to={`/category/${c.slug}`}
                            className="flex items-center justify-between text-sm text-charcoal/80 hover:text-forest py-1 group"
                          >
                            {c.name}
                            <span className="text-gold-dark opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  key={link.label}
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    `text-sm transition-colors py-2 ${
                      isActive ? "text-forest font-medium" : "text-charcoal hover:text-forest"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              )
            )}
          </nav>

          <div className="flex items-center gap-1 md:gap-2">
            <button
              onClick={() => setSearchOpen((s) => !s)}
              aria-label="Search"
              className="p-2 md:p-2.5 hover:text-forest transition-colors"
            >
              <FiSearch size={19} />
            </button>
            <Link to="/account" aria-label="Account" className="p-2 md:p-2.5 hover:text-forest transition-colors hidden sm:inline-flex">
              <FiUser size={19} />
            </Link>
            <Link to="/wishlist" aria-label="Wishlist" className="relative p-2 md:p-2.5 hover:text-forest transition-colors">
              <FiHeart size={19} />
              {ids.length > 0 && (
                <span className="absolute top-0.5 right-0.5 bg-gold text-forest-dark text-[9px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">
                  {ids.length}
                </span>
              )}
            </Link>
            <Link to="/cart" aria-label="Cart" className="relative p-2 md:p-2.5 hover:text-forest transition-colors">
              <FiShoppingBag size={19} />
              {itemCount > 0 && (
                <span className="absolute top-0.5 right-0.5 bg-forest text-ivory text-[9px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Search overlay bar */}
        {searchOpen && (
          <div className="border-t border-charcoal/10 bg-softwhite animate-fade-up">
            <div className="container-app py-4">
              <form onSubmit={handleSearchSubmit} className="flex items-center gap-3 max-w-2xl mx-auto">
                <FiSearch className="text-charcoal/40 shrink-0" size={18} />
                <input
                  autoFocus
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for products, categories..."
                  className="flex-1 bg-transparent border-b border-charcoal/20 focus:border-forest py-2 text-sm focus:outline-none"
                />
                <button type="button" onClick={() => setSearchOpen(false)} aria-label="Close search">
                  <FiX size={18} className="text-charcoal/50" />
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-charcoal/50" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-[86%] max-w-sm bg-softwhite animate-slide-in flex flex-col">
            <div className="flex items-center justify-between px-5 py-4 border-b border-charcoal/10">
              <span className="flex items-center gap-2 font-serif text-xl text-forest">
                <Logo size={26} /> MAISON NOIR
              </span>
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu" className="p-1.5">
                <FiX size={22} />
              </button>
            </div>
            <form onSubmit={handleSearchSubmit} className="px-5 py-4 border-b border-charcoal/10 flex items-center gap-2">
              <FiSearch className="text-charcoal/40" size={17} />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products..."
                className="flex-1 bg-transparent text-sm focus:outline-none"
              />
            </form>
            <nav className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-1">
              {NAV_LINKS.filter((l) => !l.hasMenu).map((link) => (
                <NavLink
                  key={link.label}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="py-3 text-base border-b border-charcoal/5 text-charcoal"
                >
                  {link.label}
                </NavLink>
              ))}
              <p className="pt-4 pb-1 text-xs uppercase tracking-widest2 text-charcoal/40">Categories</p>
              {categories.map((c) => (
                <NavLink
                  key={c.slug}
                  to={`/category/${c.slug}`}
                  onClick={() => setMobileOpen(false)}
                  className="py-2.5 text-sm text-charcoal/75"
                >
                  {c.name}
                </NavLink>
              ))}
              <div className="mt-4 pt-4 border-t border-charcoal/10 flex flex-col gap-1">
                <Link to="/track-order" onClick={() => setMobileOpen(false)} className="py-2.5 text-sm flex items-center gap-2 text-forest font-medium">
                  <FiTruck size={15} /> Track Order
                </Link>
                <Link to="/account" onClick={() => setMobileOpen(false)} className="py-2.5 text-sm flex items-center gap-2 text-charcoal/75">
                  <FiUser size={15} /> My Account
                </Link>
                <Link to="/faq" onClick={() => setMobileOpen(false)} className="py-2.5 text-sm flex items-center gap-2 text-charcoal/75">
                  <FiHelpCircle size={15} /> Help
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
