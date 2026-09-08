import { useState } from "react";
import AccountLayout from "../layouts/AccountLayout";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

export default function AccountProfile() {
  const { user } = useAuth();
  const toast = useToast();
  const [name, setName] = useState(user?.name || "Amelia Hart");
  const [email, setEmail] = useState(user?.email || "customer@example.com");
  const [phone, setPhone] = useState("+1 555 010 4820");

  const handleSave = (e) => {
    e.preventDefault();
    toast?.showToast("Profile updated successfully", "success");
  };

  return (
    <AccountLayout title="Profile">
      <form onSubmit={handleSave} className="card-surface p-6 md:p-8 max-w-xl space-y-5">
        <div>
          <label className="label-field">Full Name</label>
          <input className="input-field" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label className="label-field">Email</label>
          <input type="email" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label className="label-field">Phone</label>
          <input className="input-field" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <button type="submit" className="btn-primary">
          Save Changes
        </button>
      </form>
    </AccountLayout>
  );
}
