# LeakStack.io — Clean Rebuild (WEB ONLY, NOT DEPLOYED)

Vite + React + React Router rebuild of leakstack.io's 4 free tools, with the
original's bugs fixed. Local files only — nothing here has been deployed,
pushed to any repo, or published anywhere.

## Run / build

- `npm install`
- `npm run dev` — local dev server
- `npm run build` — production build into `dist/`

## What was fixed vs. the original

1. **Email modal is dismissible** — X button, backdrop click, and Escape key.
   The original had none of these; reloading was the only exit.
2. **Emails actually go somewhere** — modal submit POSTs to Netlify Forms
   (`form-name` + `email` + `tool`), one form per tool. The original only ran
   `console.log` and discarded the address.
3. **Real legal pages** — `/privacy`, `/terms`, `/contact` (contact form via
   Netlify Forms + the on-record business email).
4. **Real sitemap + 404** — `public/sitemap.xml` lists all 8 routes; unknown
   paths render a real 404 page via the React catch-all route.

## Deploy notes (for whoever deploys this later)

- Deploy the `dist/` directory to Netlify. Do NOT deploy `src/` alone.
- `dist/netlify-forms.html` MUST be included in the deploy: Netlify only
  registers a form if a matching `<form data-netlify="true">` exists in the
  deployed files. The visible modals submit via fetch; the hidden definitions
  in that file are what make detection work.
- `dist/_redirects` (`/* /index.html 200`) is required so client-side routes
  (`/privacy`, `/leak-detector`, etc.) resolve on refresh and direct visits.
  Real static files (`sitemap.xml`, `netlify-forms.html`, `favicon.svg`) are
  served directly before that rule.
- After first deploy, verify in Netlify Dashboard → Forms that all five forms
  appear (`leak-detector`, `mortgage`, `credit-damage`, `excuse-generator`,
  `contact`), then submit one test email per tool and confirm it lands.
  Until the site is on Netlify, form POSTs fail silently by design and the
  tools still unlock results — that is intentional, not a bug.
- The previous production deploy remains the rollback: Netlify Dashboard →
  Deploys → restore the prior production deploy if anything misbehaves.

## Fidelity notes

- All four tools' math was extracted verbatim from the original production
  bundle (see `src/lib/calc.js` and `src/lib/excuses.js`), including the
  original's quirks: monthly revenue and business type are collected but
  unused by the leak formula, and the excuse generator ignores the free-text
  situation field when picking excuses.
- No secrets, API keys, backend, analytics, or invented business details.
  Result-page CTAs still point to https://sycco.ai and
  https://creditrepairmasterz.com, exactly as the original did.
