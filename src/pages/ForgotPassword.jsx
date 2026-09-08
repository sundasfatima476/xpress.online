import { useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiCheck, FiMail } from "react-icons/fi";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setError("Enter a valid email address");
      return;
    }
    setError("");
    setSent(true);
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-160px)] px-6 py-16">
      <div className="w-full max-w-sm text-center">
        {!sent ? (
          <>
            <div className="w-14 h-14 rounded-full bg-beige flex items-center justify-center mx-auto mb-6">
              <FiMail className="text-forest" size={22} />
            </div>
            <h1 className="font-serif text-3xl mb-3">Forgot Password?</h1>
            <p className="text-charcoal/60 text-sm mb-8">
              Enter the email associated with your account and we'll send a link to reset your password.
            </p>
            <form onSubmit={handleSubmit} className="space-y-5 text-left">
              <div>
                <label className="label-field">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  placeholder="you@example.com"
                />
                {error && <p className="text-xs text-red-700 mt-1">{error}</p>}
              </div>
              <button type="submit" className="btn-primary w-full">
                Send Reset Link <FiArrowRight size={14} />
              </button>
            </form>
            <Link to="/login" className="block text-sm text-forest mt-8 hover:underline underline-offset-2">
              Back to Sign In
            </Link>
          </>
        ) : (
          <>
            <div className="w-14 h-14 rounded-full bg-forest flex items-center justify-center mx-auto mb-6">
              <FiCheck className="text-ivory" size={22} />
            </div>
            <h1 className="font-serif text-3xl mb-3">Check Your Inbox</h1>
            <p className="text-charcoal/60 text-sm mb-8">
              We've sent a password reset link to <span className="text-charcoal">{email}</span>. It may take
              a few minutes to arrive.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/reset-password?token=demo" className="btn-primary inline-flex">
                Open Reset Link
              </Link>
              <Link to="/login" className="btn-outline inline-flex">
                Back to Sign In
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
