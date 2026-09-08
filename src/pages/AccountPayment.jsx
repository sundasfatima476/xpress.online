import { FiCreditCard, FiPlus, FiTrash2 } from "react-icons/fi";
import AccountLayout from "../layouts/AccountLayout";

export default function AccountPayment() {
  return (
    <AccountLayout title="Payment Methods">
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="card-surface p-5">
          <div className="flex items-center justify-between mb-4">
            <FiCreditCard className="text-forest" size={22} />
            <button aria-label="Remove card" className="text-charcoal/40 hover:text-red-700">
              <FiTrash2 size={15} />
            </button>
          </div>
          <p className="font-serif text-lg tracking-widest mb-1">•••• •••• •••• 4242</p>
          <p className="text-xs text-charcoal/55">Expires 08/28 · Visa</p>
        </div>
        <button className="card-surface p-5 flex flex-col items-center justify-center gap-2 text-charcoal/50 hover:text-forest hover:border-forest transition-colors border-dashed">
          <FiPlus size={20} />
          <span className="text-sm">Add Payment Method</span>
        </button>
      </div>
    </AccountLayout>
  );
}
