import { Link } from "react-router-dom";

export default function Privacy() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl sm:text-5xl font-black mb-2">
        Privacy <span className="text-electric">Policy</span>
      </h1>
      <p className="text-gray-500 text-sm mb-8">Last updated: October 2026</p>
      <div className="card flex flex-col gap-5 text-gray-300 leading-relaxed text-sm sm:text-base">
        <p>
          LeakStack.io provides free calculators and tools. This policy explains what we collect
          when you use them, and what we do with it. No fluff — just the facts.
        </p>
        <section>
          <h2 className="font-bold text-white mb-2">What we collect</h2>
          <ul className="list-disc pl-5 flex flex-col gap-1">
            <li>
              <strong className="text-white">Your email address</strong> — only if you enter it
              to unlock your tool results. You can close the prompt instead; nothing is collected
              unless you submit it.
            </li>
            <li>
              <strong className="text-white">Which tool you used</strong> — so we know which
              results to send and which follow-up, if any, is relevant.
            </li>
          </ul>
          <p className="mt-3">
            Everything else you type into a tool — revenue figures, lead values, mortgage numbers,
            credit details, excuse context — is computed in your browser and never sent to us.
            We do not ask for, and do not collect, payment information, passwords, or account
            credentials.
          </p>
        </section>
        <section>
          <h2 className="font-bold text-white mb-2">How it is stored</h2>
          <p>
            Emails submitted through the tools are collected via Netlify Forms and stored in the
            site&apos;s form dashboard, accessible only to the site operator. No third-party
            advertising trackers or analytics are installed on this site.
          </p>
        </section>
        <section>
          <h2 className="font-bold text-white mb-2">How it is used</h2>
          <p>
            Your email is used to deliver the results you requested and, at most, to follow up
            about the tool you used. We do not sell, rent, or trade your email address, and we do
            not share it with third parties except the form service that stores it.
          </p>
        </section>
        <section>
          <h2 className="font-bold text-white mb-2">Unsubscribe and deletion</h2>
          <p>
            No spam. Unsubscribe anytime by replying to any follow-up email, or ask us to delete
            your address entirely via the{" "}
            <Link to="/contact" className="text-electric hover:underline">
              contact page
            </Link>
            . Deletion requests are honored promptly.
          </p>
        </section>
        <section>
          <h2 className="font-bold text-white mb-2">Questions</h2>
          <p>
            Reach us through the{" "}
            <Link to="/contact" className="text-electric hover:underline">
              contact page
            </Link>
            . This policy may be updated from time to time; the date above reflects the latest
            version.
          </p>
        </section>
      </div>
    </div>
  );
}
