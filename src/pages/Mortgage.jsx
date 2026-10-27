import { useState } from "react";
import { AlertTriangle, ArrowRight, Home as HomeIcon } from "lucide-react";
import EmailModal from "../components/EmailModal";
import { calcMortgage, money, pctOf } from "../lib/calc";

export default function Mortgage() {
  const [input, setInput] = useState({
    homePrice: "",
    downPayment: "",
    interestRate: "",
    loanTerm: "30",
    propertyTax: "",
    homeInsurance: "",
    hoa: "0",
  });
  const [showModal, setShowModal] = useState(false);
  const [result, setResult] = useState(null);

  const set = (key, value) => setInput((v) => ({ ...v, [key]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleUnlock = () => {
    setResult(calcMortgage(input));
    setShowModal(false);
  };

  const breakdown = result
    ? [
        { label: "Principal & Interest", value: result.pi, color: "bg-electric" },
        { label: "Property Tax", value: result.taxes, color: "bg-blue-500" },
        { label: "Home Insurance", value: result.insurance, color: "bg-purple-500" },
        { label: "HOA Fees", value: result.hoa, color: "bg-gray-500" },
      ]
    : [];

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {showModal && (
        <EmailModal
          formName="mortgage"
          tool="mortgage"
          onSubmit={handleUnlock}
          onClose={() => setShowModal(false)}
        />
      )}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-3 py-1 text-blue-400 text-xs font-semibold mb-4">
          <HomeIcon size={12} /> HONEST NUMBERS ONLY
        </div>
        <h1 className="text-4xl sm:text-5xl font-black mb-2">
          Honest Mortgage <span className="text-electric">Calculator</span>
        </h1>
        <p className="text-gray-400">See your TRUE monthly cost — not the pretty bank number.</p>
      </div>

      {result ? (
        <div className="flex flex-col gap-5">
          <div className="card border-electric/30 bg-electric/5 text-center py-10">
            <p className="section-label">True Monthly Payment</p>
            <div className="text-6xl sm:text-7xl font-black text-electric my-2">
              {money(result.trueMonthly)}
            </div>
            <p className="text-gray-500 text-sm">per month — all costs included</p>
          </div>
          <div className="card">
            <h3 className="font-bold text-white mb-4">Payment Breakdown</h3>
            <div className="flex flex-col gap-3">
              {breakdown.map((row) => (
                <div key={row.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">{row.label}</span>
                    <span className="text-white font-semibold">{money(row.value)}/mo</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${row.color} rounded-full`}
                      style={{ width: `${pctOf(row.value, result.trueMonthly)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="card border-orange-500/30 bg-orange-950/20">
            <div className="flex items-start gap-3">
              <AlertTriangle size={20} className="text-orange-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-orange-300 mb-1">⚠ Hidden Cost Warning</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Over {input.loanTerm} years, you&apos;ll pay{" "}
                  <span className="text-orange-300 font-bold">{money(result.totalInterest)}</span>{" "}
                  in interest alone — on top of your {money(result.principal)} loan. That&apos;s
                  the number banks don&apos;t put on billboards.
                </p>
              </div>
            </div>
          </div>
          <div className="card border-electric/30 bg-electric/5 text-center py-8">
            <h3 className="text-2xl font-black text-white mb-2">Get a Smarter Home-Buying Plan</h3>
            <p className="text-gray-400 text-sm mb-5">
              Work with advisors who tell you the whole truth.
            </p>
            <a
              href="https://sycco.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center justify-center gap-2 max-w-xs mx-auto"
            >
              Get My Smart Plan <ArrowRight size={16} />
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
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="section-label">Home Price ($)</label>
                <input
                  type="number"
                  className="input-field"
                  placeholder="350000"
                  value={input.homePrice}
                  onChange={(e) => set("homePrice", e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="section-label">Down Payment ($)</label>
                <input
                  type="number"
                  className="input-field"
                  placeholder="70000"
                  value={input.downPayment}
                  onChange={(e) => set("downPayment", e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="section-label">Interest Rate (%)</label>
                <input
                  type="number"
                  step="0.01"
                  className="input-field"
                  placeholder="6.75"
                  value={input.interestRate}
                  onChange={(e) => set("interestRate", e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="section-label">Loan Term</label>
                <select
                  className="input-field"
                  value={input.loanTerm}
                  onChange={(e) => set("loanTerm", e.target.value)}
                >
                  <option value="30">30 Years</option>
                  <option value="15">15 Years</option>
                </select>
              </div>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="section-label">Property Tax / Year ($)</label>
                <input
                  type="number"
                  className="input-field"
                  placeholder="4200"
                  value={input.propertyTax}
                  onChange={(e) => set("propertyTax", e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="section-label">Home Insurance / Year ($)</label>
                <input
                  type="number"
                  className="input-field"
                  placeholder="1800"
                  value={input.homeInsurance}
                  onChange={(e) => set("homeInsurance", e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="section-label">HOA / Month ($)</label>
                <input
                  type="number"
                  className="input-field"
                  placeholder="0"
                  value={input.hoa}
                  onChange={(e) => set("hoa", e.target.value)}
                />
              </div>
            </div>
          </div>
          <button type="submit" className="btn-primary text-lg py-4">
            <HomeIcon size={20} /> Show Me the Real Number
          </button>
        </form>
      )}
    </div>
  );
}
