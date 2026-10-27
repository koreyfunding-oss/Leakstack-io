import { useState } from "react";
import { AlertTriangle, ArrowRight, TrendingDown } from "lucide-react";
import EmailModal from "../components/EmailModal";
import {
  BUSINESS_TYPES,
  RESPONSE_TIMES,
  calcLeak,
  money,
  severityColor,
} from "../lib/calc";

export default function LeakDetector() {
  const [input, setInput] = useState({
    businessType: "Agency",
    revenue: "",
    leadValue: "",
    missedLeads: "",
    closeRate: "",
    responseTime: "medium",
    hasCRM: false,
    hasFollowUp: false,
  });
  const [showModal, setShowModal] = useState(false);
  const [result, setResult] = useState(null);

  const set = (key, value) => setInput((v) => ({ ...v, [key]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.leadValue || !input.missedLeads || !input.closeRate) return;
    setShowModal(true);
  };

  const handleUnlock = () => {
    setResult(calcLeak(input));
    setShowModal(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {showModal && (
        <EmailModal
          formName="leak-detector"
          tool="leak-detector"
          onSubmit={handleUnlock}
          onClose={() => setShowModal(false)}
        />
      )}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-full px-3 py-1 text-red-400 text-xs font-semibold mb-4">
          <TrendingDown size={12} /> REVENUE LEAK AUDIT
        </div>
        <h1 className="text-4xl sm:text-5xl font-black mb-2">
          Business Leak <span className="text-electric">Detector</span>
        </h1>
        <p className="text-gray-400">
          Find out exactly how much money is walking out your door every month.
        </p>
      </div>

      {result ? (
        <div className="flex flex-col gap-5 animate-fade-in">
          <div className="card border-red-500/30 bg-red-950/20 text-center py-10">
            <p className="section-label text-red-400">Annual Revenue Leak</p>
            <div className="text-6xl sm:text-7xl font-black text-red-400 my-2">
              {money(result.yearlyLeak)}
            </div>
            <p className="text-gray-500 text-sm">is walking out your door every year</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="card text-center">
              <p className="section-label">Monthly Leak</p>
              <p className="text-2xl font-black text-electric">{money(result.monthlyLeak)}</p>
            </div>
            <div className="card text-center">
              <p className="section-label">Lost Deals/Mo</p>
              <p className="text-2xl font-black text-white">{Math.round(result.lostDeals)}</p>
            </div>
            <div className="card text-center">
              <p className="section-label">Severity</p>
              <p className={`text-2xl font-black ${severityColor(result.severity)}`}>
                {result.severity}/100
              </p>
            </div>
          </div>
          <div className="card">
            <h3 className="font-bold text-white mb-3 flex items-center gap-2">
              <AlertTriangle size={18} className="text-orange-400" /> Top Problems Detected
            </h3>
            <ul className="flex flex-col gap-2">
              {result.problems.map((problem, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                  <span className="text-red-400 mt-0.5">→</span> {problem}
                </li>
              ))}
            </ul>
          </div>
          <div className="card border-electric/30 bg-electric/5 text-center py-8">
            <p className="text-gray-400 text-sm mb-2">Ready to plug the leaks for good?</p>
            <h3 className="text-2xl font-black text-white mb-4">Get a Free Leak Audit from SYCCO</h3>
            <a
              href="https://sycco.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center justify-center gap-2 max-w-xs mx-auto"
            >
              Book My Free Audit <ArrowRight size={16} />
            </a>
          </div>
          <button
            onClick={() => setResult(null)}
            className="text-gray-600 hover:text-gray-400 text-sm transition-colors"
          >
            ← Start Over
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="card flex flex-col gap-4">
            <div>
              <label className="section-label">Business Type</label>
              <select
                className="input-field"
                value={input.businessType}
                onChange={(e) => set("businessType", e.target.value)}
              >
                {BUSINESS_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="section-label">Monthly Revenue ($)</label>
                <input
                  type="number"
                  className="input-field"
                  placeholder="50000"
                  value={input.revenue}
                  onChange={(e) => set("revenue", e.target.value)}
                />
              </div>
              <div>
                <label className="section-label">Average Lead Value ($)</label>
                <input
                  type="number"
                  className="input-field"
                  placeholder="2000"
                  value={input.leadValue}
                  onChange={(e) => set("leadValue", e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="section-label">Missed Leads / Week</label>
                <input
                  type="number"
                  className="input-field"
                  placeholder="5"
                  value={input.missedLeads}
                  onChange={(e) => set("missedLeads", e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="section-label">Average Close Rate (%)</label>
                <input
                  type="number"
                  className="input-field"
                  placeholder="25"
                  min="1"
                  max="100"
                  value={input.closeRate}
                  onChange={(e) => set("closeRate", e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <label className="section-label">Average Response Time to Leads</label>
              <select
                className="input-field"
                value={input.responseTime}
                onChange={(e) => set("responseTime", e.target.value)}
              >
                {RESPONSE_TIMES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-5 h-5 accent-electric"
                  checked={input.hasCRM}
                  onChange={(e) => set("hasCRM", e.target.checked)}
                />
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                  Using a CRM
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-5 h-5 accent-electric"
                  checked={input.hasFollowUp}
                  onChange={(e) => set("hasFollowUp", e.target.checked)}
                />
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                  Automated Follow-Up Active
                </span>
              </label>
            </div>
          </div>
          <button type="submit" className="btn-primary text-lg py-4">
            <TrendingDown size={20} /> Detect My Revenue Leaks
          </button>
        </form>
      )}
    </div>
  );
}
