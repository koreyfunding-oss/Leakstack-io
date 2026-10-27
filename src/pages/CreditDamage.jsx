import { useState } from "react";
import { ArrowRight, CreditCard, TrendingDown } from "lucide-react";
import EmailModal from "../components/EmailModal";
import {
  CREDIT_EVENTS,
  calcCreditDamage,
  scoreColor,
  scoreRating,
} from "../lib/calc";

export default function CreditDamage() {
  const [score, setScore] = useState(720);
  const [events, setEvents] = useState([]);
  const [utilization, setUtilization] = useState(30);
  const [showModal, setShowModal] = useState(false);
  const [result, setResult] = useState(null);

  const toggleEvent = (id) =>
    setEvents((prev) => (prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (events.length !== 0) setShowModal(true);
  };

  const handleUnlock = () => {
    setResult(calcCreditDamage(score, events, utilization));
    setShowModal(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {showModal && (
        <EmailModal
          formName="credit-damage"
          tool="credit-damage"
          onSubmit={handleUnlock}
          onClose={() => setShowModal(false)}
        />
      )}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-full px-3 py-1 text-red-400 text-xs font-semibold mb-4">
          <CreditCard size={12} /> SCORE IMPACT SIMULATOR
        </div>
        <h1 className="text-4xl sm:text-5xl font-black mb-2">
          Credit Damage <span className="text-electric">Simulator</span>
        </h1>
        <p className="text-gray-400">
          See exactly how much a negative event tanks your credit score.
        </p>
      </div>

      {result ? (
        <div className="flex flex-col gap-5">
          <div className="card py-8">
            <div className="grid grid-cols-3 gap-4 items-center text-center">
              <div>
                <p className="section-label">Before</p>
                <p className="text-4xl font-black" style={{ color: scoreColor(score) }}>
                  {score}
                </p>
                <p className="text-xs text-gray-500">{scoreRating(score)}</p>
              </div>
              <div>
                <TrendingDown size={28} className="text-red-400 mx-auto" />
                <p className="text-red-400 font-black text-xl">-{result.totalDrop} pts</p>
              </div>
              <div>
                <p className="section-label">Estimated After</p>
                <p className="text-4xl font-black" style={{ color: scoreColor(result.newScore) }}>
                  {result.newScore}
                </p>
                <p className={`text-xs font-semibold ${result.ratingColor}`}>{result.rating}</p>
              </div>
            </div>
          </div>
          <div className="card">
            <h3 className="font-bold text-white mb-3">Damage by Event</h3>
            <div className="flex flex-col gap-3">
              {result.eventDetails.map((detail) => (
                <div key={detail.label} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-300 font-medium">{detail.label}</p>
                    <p className="text-xs text-gray-600">Recovery: {detail.recovery}</p>
                  </div>
                  <span className="text-red-400 font-black text-lg">-{detail.drop}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="card border-orange-500/30 bg-orange-950/20">
            <h3 className="font-bold text-orange-300 mb-1">Recovery Timeline</h3>
            <p className="text-gray-400 text-sm">
              Based on your events, expect a{" "}
              <span className="text-orange-300 font-bold">{result.recovery}</span> full recovery
              timeline. Take action now to minimize long-term damage.
            </p>
          </div>
          <div className="card border-electric/30 bg-electric/5 text-center py-8">
            <h3 className="text-2xl font-black text-white mb-2">Talk to Credit Repair Masterz</h3>
            <p className="text-gray-400 text-sm mb-5">
              Get a free consultation and start rebuilding today.
            </p>
            <a
              href="https://creditrepairmasterz.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center justify-center gap-2 max-w-xs mx-auto"
            >
              Get Free Consultation <ArrowRight size={16} />
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
          <div className="card flex flex-col gap-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="section-label">Current Credit Score</label>
                <span className="font-black text-2xl" style={{ color: scoreColor(score) }}>
                  {score}
                </span>
              </div>
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>300</span>
                <span>{scoreRating(score)}</span>
                <span>850</span>
              </div>
              <input
                type="range"
                min="300"
                max="850"
                value={score}
                onChange={(e) => setScore(Number(e.target.value))}
                className="w-full accent-electric cursor-pointer"
              />
            </div>
            <div>
              <label className="section-label mb-3 block">What Happened? (select all that apply)</label>
              <div className="grid sm:grid-cols-2 gap-3">
                {CREDIT_EVENTS.map((event) => (
                  <label
                    key={event.id}
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                      events.includes(event.id)
                        ? "border-electric/60 bg-electric/5 text-white"
                        : "border-gray-800 text-gray-400 hover:border-gray-600"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="accent-electric"
                      checked={events.includes(event.id)}
                      onChange={() => toggleEvent(event.id)}
                    />
                    <div>
                      <p className="font-semibold text-sm">{event.label}</p>
                      <p className="text-xs text-gray-500">Recovery: {event.recovery}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="section-label">Current Credit Utilization</label>
                <span
                  className={`font-bold text-lg ${
                    utilization > 30 ? "text-red-400" : "text-green-400"
                  }`}
                >
                  {utilization}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={utilization}
                onChange={(e) => setUtilization(Number(e.target.value))}
                className="w-full accent-electric cursor-pointer"
              />
              <p className="text-xs text-gray-600 mt-1">
                Recommended: under 30%. Above 30% adds additional damage.
              </p>
            </div>
          </div>
          {events.length === 0 && (
            <p className="text-yellow-500 text-xs text-center">Select at least one event above.</p>
          )}
          <button type="submit" className="btn-primary text-lg py-4" disabled={events.length === 0}>
            <TrendingDown size={20} /> Simulate the Damage
          </button>
        </form>
      )}
    </div>
  );
}
