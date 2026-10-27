import { useNavigate } from "react-router-dom";
import { ArrowRight, CreditCard, Home as HomeIcon, Sparkles, TrendingDown, Zap } from "lucide-react";

const TOOLS = [
  {
    icon: <TrendingDown size={28} className="text-electric" />,
    title: "Business Leak Detector",
    desc: "Find out exactly how much revenue is bleeding out of your business every month.",
    to: "/leak-detector",
    badge: "Most Popular",
  },
  {
    icon: <HomeIcon size={28} className="text-electric" />,
    title: "Honest Mortgage Calculator",
    desc: "See your REAL monthly payment — principal, interest, taxes, insurance, and HOA.",
    to: "/mortgage",
    badge: null,
  },
  {
    icon: <CreditCard size={28} className="text-electric" />,
    title: "Credit Damage Simulator",
    desc: "Instantly see how a late payment, collection, or bankruptcy tanks your score.",
    to: "/credit-damage",
    badge: null,
  },
  {
    icon: <Sparkles size={28} className="text-electric" />,
    title: "AI Excuse Generator",
    desc: "Generate 3 AI-crafted excuses for any situation. Professional, funny, or savage.",
    to: "/excuse-generator",
    badge: "🔥 Fan Favorite",
  },
];

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      <div className="inline-flex items-center gap-2 bg-electric/10 border border-electric/30 rounded-full px-4 py-1.5 text-electric text-xs font-semibold mb-6 tracking-wide">
        <Zap size={12} /> FREE TOOLS — NO BS
      </div>
      <h1 className="text-5xl sm:text-6xl font-black mb-4 leading-tight">
        Stop Guessing.
        <br />
        <span className="text-electric">Start Calculating.</span>
      </h1>
      <p className="text-gray-400 text-lg mb-14 max-w-xl mx-auto">
        4 precision tools built to show you the money hiding in plain sight. No fluff. Just math.
      </p>
      <div className="grid sm:grid-cols-2 gap-5 text-left">
        {TOOLS.map((tool) => (
          <button
            key={tool.to}
            onClick={() => navigate(tool.to)}
            className="card group hover:border-electric/40 hover:shadow-glow transition-all duration-200 text-left relative overflow-hidden"
          >
            {tool.badge && (
              <span className="absolute top-4 right-4 text-xs bg-electric/20 text-electric border border-electric/30 rounded-full px-2 py-0.5 font-semibold">
                {tool.badge}
              </span>
            )}
            <div className="mb-4">{tool.icon}</div>
            <h3 className="text-white font-bold text-lg mb-1 group-hover:text-electric transition-colors">
              {tool.title}
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">{tool.desc}</p>
            <div className="flex items-center gap-1 text-electric text-sm font-semibold">
              Launch Tool <ArrowRight size={14} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
