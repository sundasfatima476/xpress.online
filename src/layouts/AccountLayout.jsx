import { NavLink, useNavigate } from "react-router-dom";
import {
  FiGrid,
  FiPackage,
  FiTruck,
  FiHeart,
  FiMapPin,
  FiCreditCard,
  FiUser,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import Breadcrumb from "../components/Breadcrumb";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

const LINKS = [
  { label: "Overview", to: "/account", icon: FiGrid, end: true },
  { label: "Orders", to: "/account/orders", icon: FiPackage },
  { label: "Track Order", to: "/track-order", icon: FiTruck },
  { label: "Wishlist", to: "/wishlist", icon: FiHeart },
  { label: "Addresses", to: "/account/addresses", icon: FiMapPin },
  { label: "Payment Methods", to: "/account/payment", icon: FiCreditCard },
  { label: "Profile", to: "/account/profile", icon: FiUser },
  { label: "Settings", to: "/account/settings", icon: FiSettings },
];

export default function AccountLayout({ title, children }) {
  const { user, logout } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast?.showToast("You've been signed out", "info");
    navigate("/");
  };

  return (
    <div className="bg-beige/30 min-h-[70vh]">
      <div className="container-app py-8 md:py-10">
        <Breadcrumb items={[{ label: "Account" }]} />
        <h1 className="font-serif text-3xl md:text-4xl mt-3 mb-8">{title || "My Account"}</h1>

        <div className="grid lg:grid-cols-[260px_1fr] gap-8">
          <aside className="card-surface p-5 h-fit lg:sticky lg:top-28">
            <div className="flex items-center gap-3 pb-4 mb-4 border-b border-charcoal/10">
              <div className="w-11 h-11 rounded-full bg-forest text-ivory flex items-center justify-center font-serif text-lg shrink-0">
                {(user?.name || "A H").split(" ").map((n) => n[0]).slice(0, 2).join("")}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{user?.name || "Amelia Hart"}</p>
                <p className="text-xs text-charcoal/50 truncate">{user?.email || "customer@example.com"}</p>
              </div>
            </div>
            <nav className="flex flex-col gap-1" aria-label="Account">
              {LINKS.map((l) => (
                <NavLink
                  key={l.label}
                  to={l.to}
                  end={l.end}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 text-sm transition-colors ${
                      isActive ? "bg-forest text-ivory" : "text-charcoal/75 hover:bg-beige"
                    }`
                  }
                >
                  <l.icon size={16} /> {l.label}
                </NavLink>
              ))}
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-3 py-2.5 text-sm text-charcoal/75 hover:bg-beige transition-colors text-left mt-2 border-t border-charcoal/10 pt-3"
              >
                <FiLogOut size={16} /> Logout
              </button>
            </nav>
          </aside>

          <div className="min-w-0">{children}</div>
        </div>
      </div>
    </div>
  );
}
