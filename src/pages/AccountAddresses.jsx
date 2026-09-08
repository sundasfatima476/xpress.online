import { FiMapPin, FiEdit2, FiPlus } from "react-icons/fi";
import AccountLayout from "../layouts/AccountLayout";

export default function AccountAddresses() {
  return (
    <AccountLayout title="Addresses">
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="card-surface p-5">
          <div className="flex items-start justify-between mb-3">
            <span className="text-xs uppercase tracking-widest2 bg-forest text-ivory px-2.5 py-1">Default</span>
            <button aria-label="Edit address" className="text-charcoal/50 hover:text-forest">
              <FiEdit2 size={15} />
            </button>
          </div>
          <p className="font-medium text-sm mb-1 flex items-center gap-2">
            <FiMapPin size={14} className="text-forest" /> Amelia Hart
          </p>
          <p className="text-sm text-charcoal/65 leading-relaxed">
            214 Willow Creek Lane
            <br />
            Austin, TX 78701
            <br />
            United States
          </p>
        </div>
        <button className="card-surface p-5 flex flex-col items-center justify-center gap-2 text-charcoal/50 hover:text-forest hover:border-forest transition-colors border-dashed">
          <FiPlus size={20} />
          <span className="text-sm">Add New Address</span>
        </button>
      </div>
    </AccountLayout>
  );
}
