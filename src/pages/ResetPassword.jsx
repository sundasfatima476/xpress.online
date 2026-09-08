import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { FiCheck, FiArrowRight, FiLock } from "react-icons/fi";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "demo";
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const e2 = {};
    if (password.length < 6) e2.password = "Must be at least 6 characters";
    if (confirm !== password) e2.confirm = "Passwords do not match";
    setErrors(e2);
    if (Object.keys(e2).length) return;
    setDone(true);
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-160px)] px-6 py-16">
      <div className="w-full max-w-sm text-center">
        {!done ? (
          <>
            <div className="w-14 h-14 rounded-full bg-beige flex items-center justify-center mx-auto mb-6">
              <FiLock className="text-forest" size={22} />
            </div>
            <h1 className="font-serif text-3xl mb-3">Reset Password</h1>
            <p className="text-charcoal/60 text-sm mb-8">
              Enter and confirm your new password below to regain access to your account.
            </p>
            <form onSubmit={handleSubmit} className="space-y-5 text-left">
              <div>
                <label className="label-field">New Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                  placeholder="••••••••"
                />
                {errors.password && <p className="text-xs text-red-700 mt-1">{errors.password}</p>}
              </div>
              <div>
                <label className="label-field">Confirm Password</label>
                <input
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="input-field"
                  placeholder="••••••••"
                />
                {errors.confirm && <p className="text-xs text-red-700 mt-1">{errors.confirm}</p>}
              </div>
              <button type="submit" className="btn-primary w-full">
                Reset Password <FiArrowRight size={14} />
              </button>
            </form>
            <p className="text-[11px] text-charcoal/35 mt-6">Reset token: {token}</p>
          </>
        ) : (
          <>
            <div className="w-14 h-14 rounded-full bg-forest flex items-center justify-center mx-auto mb-6">
              <FiCheck className="text-ivory" size={22} />
            </div>
            <h1 className="font-serif text-3xl mb-3">Password Reset Successfully!</h1>
            <p className="text-charcoal/60 text-sm mb-8">
              Your password has been reset. You can now sign in with your new password.
            </p>
            <button onClick={() => navigate("/login")} className="btn-primary inline-flex">
              Go to Login <FiArrowRight size={14} />
            </button>
          </>
        )}
        {!done && (
          <Link to="/login" className="block text-sm text-forest mt-8 hover:underline underline-offset-2">
            Back to Sign In
          </Link>
        )}
      </div>
    </div>
  );
}
