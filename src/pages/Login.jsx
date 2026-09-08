import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import ProductImage from "../components/ProductImage";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState({});
  const { login } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const e2 = {};
    if (!email.includes("@")) e2.email = "Enter a valid email";
    if (password.length < 4) e2.password = "Enter your password";
    setErrors(e2);
    if (Object.keys(e2).length) return;

    login(email);
    toast?.showToast("Welcome back!", "success");
    navigate(location.state?.from || "/account");
  };

  return (
    <div className="grid lg:grid-cols-2 min-h-[calc(100vh-160px)]">
      <div className="hidden lg:block relative">
        <ProductImage seed="login-editorial" className="w-full h-full" iconSize={64} />
        <div className="absolute inset-0 bg-forest/30 flex items-end p-12">
          <p className="font-serif text-2xl text-ivory max-w-sm leading-snug">
            "Style is a way to say who you are without having to speak."
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          <p className="eyebrow mb-3">Welcome Back</p>
          <h1 className="font-serif text-3xl mb-8">Sign In</h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="label-field">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="you@example.com"
              />
              {errors.email && <p className="text-xs text-red-700 mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="label-field">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="••••••••"
              />
              {errors.password && <p className="text-xs text-red-700 mt-1">{errors.password}</p>}
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-charcoal/70 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={() => setRemember((r) => !r)}
                  className="accent-forest"
                />
                Remember me
              </label>
              <Link to="/forgot-password" className="text-forest hover:underline underline-offset-2">
                Forgot password?
              </Link>
            </div>
            <button type="submit" className="btn-primary w-full">
              Login <FiArrowRight size={14} />
            </button>
          </form>

          <p className="text-sm text-charcoal/60 text-center mt-8">
            Don't have an account?{" "}
            <Link to="/signup" className="text-forest font-medium hover:underline underline-offset-2">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
