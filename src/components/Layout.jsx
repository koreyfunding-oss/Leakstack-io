import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { Menu, X, Zap } from "lucide-react";

const NAV_LINKS = [
  { to: "/leak-detector", label: "Leak Detector" },
  { to: "/mortgage", label: "Mortgage Calc" },
  { to: "/credit-damage", label: "Credit Damage" },
  { to: "/excuse-generator", label: "Excuse Gen" },
];

export default function Layout() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
      isActive ? "text-electric bg-electric/10" : "text-gray-400 hover:text-white hover:bg-white/5"
    }`;

  return (
    <div className="flex flex-col min-h-screen bg-bg-main">
      <nav className="sticky top-0 z-50 border-b border-gray-800 backdrop-blur-md bg-bg-main/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 group" onClick={() => setOpen(false)}>
              <div className="w-8 h-8 bg-electric rounded-lg flex items-center justify-center shadow-glow">
                <Zap size={16} className="text-black" />
              </div>
              <span className="font-black text-lg tracking-tight">
                Leak<span className="text-electric">Stack</span>.io
              </span>
            </Link>
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((d) => (
                <NavLink key={d.to} to={d.to} className={linkClass}>
                  {d.label}
                </NavLink>
              ))}
            </div>
            <button
              className="md:hidden p-2 text-gray-400 hover:text-white"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
          {open && (
            <div className="md:hidden pb-4 flex flex-col gap-1">
              {NAV_LINKS.map((d) => (
                <NavLink
                  key={d.to}
                  to={d.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-lg text-sm font-medium transition-all duration-150 ${
                      isActive
                        ? "text-electric bg-electric/10"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`
                  }
                >
                  {d.label}
                </NavLink>
              ))}
            </div>
          )}
        </div>
      </nav>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="text-center py-6 text-gray-600 text-sm border-t border-gray-900 mt-12">
        <p>
          © 2026 LeakStack.io — Powered by <span className="text-electric font-semibold">SYCCO</span>
        </p>
        <p className="mt-2 flex items-center justify-center gap-4">
          <Link to="/privacy" className="hover:text-electric transition-colors">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:text-electric transition-colors">
            Terms of Use
          </Link>
          <Link to="/contact" className="hover:text-electric transition-colors">
            Contact
          </Link>
        </p>
      </footer>
    </div>
  );
}
