import { useState } from "react";
import { ArrowRight, Check, Copy, RefreshCw, Sparkles } from "lucide-react";
import EmailModal from "../components/EmailModal";
import { getExcuses } from "../lib/excuses";

const TONES = [
  { value: "professional", label: "💼 Professional" },
  { value: "funny", label: "😂 Funny" },
  { value: "believable", label: "🎭 Believable" },
  { value: "savage", label: "🔥 Savage" },
];

const RECIPIENTS = [
  { value: "boss", label: "👔 Boss" },
  { value: "client", label: "🤝 Client" },
  { value: "spouse", label: "💑 Spouse / Partner" },
  { value: "friend", label: "🍕 Friend" },
];

const TONE_EMOJI = { professional: "💼", funny: "😂", believable: "🎭", savage: "🔥" };
const RECIPIENT_EMOJI = { boss: "👔", client: "🤝", spouse: "💑", friend: "🍕" };

export default function ExcuseGenerator() {
  const [form, setForm] = useState({ situation: "", tone: "professional", recipient: "boss" });
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [excuses, setExcuses] = useState(null);
  const [copied, setCopied] = useState(null);

  const set = (key, value) => setForm((v) => ({ ...v, [key]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleUnlock = async () => {
    setShowModal(false);
    setLoading(true);
    // The original shows a short "AI is crafting" beat before revealing.
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setExcuses(getExcuses(form.tone, form.recipient));
    setLoading(false);
  };

  const copyExcuse = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(index);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      setCopied(null);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {showModal && (
        <EmailModal
          formName="excuse-generator"
          tool="excuse-generator"
          onSubmit={handleUnlock}
          onClose={() => setShowModal(false)}
        />
      )}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-3 py-1 text-purple-400 text-xs font-semibold mb-4">
          <Sparkles size={12} /> AI EXCUSE ENGINE
        </div>
        <h1 className="text-4xl sm:text-5xl font-black mb-2">
          AI Excuse <span className="text-electric">Generator</span>
        </h1>
        <p className="text-gray-400">
          3 perfectly crafted excuses delivered instantly. Pick your tone, pick your target.
        </p>
      </div>

      {!excuses && !loading ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="card flex flex-col gap-4">
            <div>
              <label className="section-label">What Happened? (optional context)</label>
              <textarea
                className="input-field resize-none"
                rows={3}
                placeholder="I missed the meeting, forgot to reply, showed up late..."
                value={form.situation}
                onChange={(e) => set("situation", e.target.value)}
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="section-label">Tone</label>
                <select
                  className="input-field"
                  value={form.tone}
                  onChange={(e) => set("tone", e.target.value)}
                >
                  {TONES.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="section-label">Who&apos;s Receiving It?</label>
                <select
                  className="input-field"
                  value={form.recipient}
                  onChange={(e) => set("recipient", e.target.value)}
                >
                  {RECIPIENTS.map((r) => (
                    <option key={r.value} value={r.value}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <button type="submit" className="btn-primary text-lg py-4">
            <Sparkles size={20} /> Generate My Excuses
          </button>
        </form>
      ) : loading ? (
        <div className="card text-center py-16">
          <div className="w-10 h-10 border-2 border-electric border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">AI is crafting your excuses...</p>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <p className="text-gray-500 text-sm">
              {TONE_EMOJI[form.tone]} <span className="capitalize">{form.tone}</span> excuses for
              your {RECIPIENT_EMOJI[form.recipient]}{" "}
              <span className="capitalize">{form.recipient}</span>
            </p>
            <button
              onClick={() => setExcuses(null)}
              className="flex items-center gap-1 text-gray-500 hover:text-electric text-xs transition-colors"
            >
              <RefreshCw size={12} /> Regenerate
            </button>
          </div>
          {excuses.map((excuse, i) => (
            <div key={i} className="card border-gray-700 hover:border-electric/40 transition-all">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="text-xs text-electric font-bold mb-2">EXCUSE #{i + 1}</p>
                  <p className="text-gray-200 leading-relaxed text-sm sm:text-base">{excuse}</p>
                </div>
                <button
                  onClick={() => copyExcuse(excuse, i)}
                  className={`shrink-0 p-2 rounded-lg border transition-all ${
                    copied === i
                      ? "border-green-500 text-green-400 bg-green-500/10"
                      : "border-gray-700 text-gray-500 hover:border-electric hover:text-electric"
                  }`}
                  aria-label="Copy excuse"
                >
                  {copied === i ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>
            </div>
          ))}
          <div className="card border-electric/30 bg-electric/5 text-center py-8 mt-2">
            <h3 className="text-2xl font-black text-white mb-2">Need AI That Helps With Real Life?</h3>
            <p className="text-gray-400 text-sm mb-5">
              SYCCO builds AI systems that actually move your business forward.
            </p>
            <a
              href="https://sycco.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center justify-center gap-2 max-w-xs mx-auto"
            >
              Try SYCCO <ArrowRight size={16} />
            </a>
          </div>
          <button
            onClick={() => setExcuses(null)}
            className="text-gray-600 hover:text-gray-400 text-sm transition-colors"
          >
            ← Start Over
          </button>
        </div>
      )}
    </div>
  );
}
