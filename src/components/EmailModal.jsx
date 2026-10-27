import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Lock, X } from "lucide-react";

/**
 * Shared email-gate modal. Unlike the original, this modal is dismissible:
 *  - X button (top right)
 *  - clicking the dark backdrop
 *  - pressing Escape
 * On submit, the email is POSTed to Netlify Forms (form-name + email + tool).
 * Results are always unlocked after submit, even if the POST fails, so the
 * tool never traps a visitor behind a broken network request.
 */
export async function submitLead(formName, email, tool) {
  try {
    await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        "form-name": formName,
        email,
        tool,
      }).toString(),
    });
  } catch {
    // Offline / local preview: Netlify Forms is not reachable. The lead is
    // lost in that environment, but the tool must still unlock the results.
  }
}

export default function EmailModal({ formName, tool, onSubmit, onClose }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    await submitLead(formName, email, tool);
    onSubmit(email);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-md bg-bg-card border border-electric/30 rounded-2xl p-8 shadow-glow">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 p-1 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X size={20} />
        </button>
        <div className="flex justify-center mb-5">
          <div className="w-16 h-16 rounded-full bg-electric/10 border border-electric/30 flex items-center justify-center shadow-glow">
            <Lock size={28} className="text-electric" />
          </div>
        </div>
        <h2 className="text-2xl font-black text-white text-center mb-1">Your Report is Ready</h2>
        <p className="text-gray-400 text-center text-sm mb-6">
          Enter your email to unlock your personalized results instantly.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="email"
            className="input-field"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            autoFocus
          />
          {error && <p className="text-red-400 text-xs">{error}</p>}
          <button type="submit" className="btn-primary">
            Unlock My Results
          </button>
        </form>
        <p className="text-gray-600 text-xs text-center mt-4">
          No spam. Unsubscribe anytime. We protect your privacy.{" "}
          <Link to="/privacy" onClick={onClose} className="text-electric hover:underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
