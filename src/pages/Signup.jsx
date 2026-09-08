import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import ProductImage from "../components/ProductImage";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

export default function Signup() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const { signup } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const e2 = {};
    if (!form.firstName) e2.firstName = "Required";
    if (!form.lastName) e2.lastName = "Required";
    if (!form.email.includes("@")) e2.email = "Enter a valid email";
    if (form.password.length < 6) e2.password = "At least 6 characters";
    if (form.confirm !== form.password) e2.confirm = "Passwords do not match";
    setErrors(e2);
    if (Object.keys(e2).length) return;

    signup(form.firstName, form.lastName, form.email);
    toast?.showToast("Account created — welcome to Maison Noir!", "success");
    navigate("/account");
  };

  return (
    <div className="grid lg:grid-cols-2 min-h-[calc(100vh-160px)]">
      <div className="flex items-center justify-center px-6 py-16 order-2 lg:order-1">
        <div className="w-full max-w-sm">
          <p className="eyebrow mb-3">Join Us</p>
          <h1 className="font-serif text-3xl mb-8">Create Account</h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label-field">First Name</label>
                <input className="input-field" value={form.firstName} onChange={update("firstName")} />
                {errors.firstName && <p className="text-xs text-red-700 mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <label className="label-field">Last Name</label>
                <input className="input-field" value={form.lastName} onChange={update("lastName")} />
                {errors.lastName && <p className="text-xs text-red-700 mt-1">{errors.lastName}</p>}
              </div>
            </div>
            <div>
              <label className="label-field">Email</label>
              <input type="email" className="input-field" value={form.email} onChange={update("email")} placeholder="you@example.com" />
              {errors.email && <p className="text-xs text-red-700 mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="label-field">Password</label>
              <input type="password" className="input-field" value={form.password} onChange={update("password")} placeholder="••••••••" />
              {errors.password && <p className="text-xs text-red-700 mt-1">{errors.password}</p>}
            </div>
            <div>
              <label className="label-field">Confirm Password</label>
              <input type="password" className="input-field" value={form.confirm} onChange={update("confirm")} placeholder="••••••••" />
              {errors.confirm && <p className="text-xs text-red-700 mt-1">{errors.confirm}</p>}
            </div>
            <button type="submit" className="btn-primary w-full">
              Create Account <FiArrowRight size={14} />
            </button>
          </form>

          <p className="text-sm text-charcoal/60 text-center mt-8">
            Already have an account?{" "}
            <Link to="/login" className="text-forest font-medium hover:underline underline-offset-2">
              Sign In
            </Link>
          </p>
        </div>
      </div>
      <div className="hidden lg:block relative order-1 lg:order-2">
        <ProductImage seed="signup-editorial" className="w-full h-full" iconSize={64} />
        <div className="absolute inset-0 bg-forest/30 flex items-end p-12">
          <p className="font-serif text-2xl text-ivory max-w-sm leading-snug">
            Join a community that values craft, quality, and considered design.
          </p>
        </div>
      </div>
    </div>
  );
}
