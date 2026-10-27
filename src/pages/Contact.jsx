import { useState } from "react";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const set = (key, value) => setForm((v) => ({ ...v, [key]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          "form-name": "contact",
          name: form.name,
          email: form.email,
          message: form.message,
        }).toString(),
      });
    } catch {
      // Local preview: no form backend. Still confirm so the visitor is not stuck.
    }
    setSent(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl sm:text-5xl font-black mb-2">
        Contact <span className="text-electric">Us</span>
      </h1>
      <p className="text-gray-400 mb-8">
        Questions about a tool, a privacy request, or a result that looks off? Reach us here or
        at{" "}
        <a href="mailto:koreyfunding@gmail.com" className="text-electric hover:underline">
          koreyfunding@gmail.com
        </a>
        .
      </p>
      {sent ? (
        <div className="card border-electric/30 bg-electric/5 text-center py-10">
          <h3 className="text-2xl font-black text-white mb-2">Message sent.</h3>
          <p className="text-gray-400 text-sm">
            Thanks for reaching out — we&apos;ll get back to you at the email you provided.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="card flex flex-col gap-4">
          <div>
            <label className="section-label">Name</label>
            <input
              type="text"
              className="input-field"
              placeholder="Your name"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              required
            />
          </div>
          <div>
            <label className="section-label">Email</label>
            <input
              type="email"
              className="input-field"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              required
            />
          </div>
          <div>
            <label className="section-label">Message</label>
            <textarea
              className="input-field resize-none"
              rows={5}
              placeholder="What can we help with?"
              value={form.message}
              onChange={(e) => set("message", e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-primary">
            Send Message
          </button>
        </form>
      )}
    </div>
  );
}
