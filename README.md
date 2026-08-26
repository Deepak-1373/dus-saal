# Dus Saal — दस साल

**Check whether your PF years actually count toward a pension.**

> ### ▶ Live demo: Will be available soon
>
> No signup. Any UAN, any six digits as the code. A scenario picker on the sign-in screen lets you try all three cases in under twenty seconds.

Built for Build what moves India 

---

## ⚠️ Please read first

This is a **prototype built with entirely invented data**. It does not connect to EPFO or any government system.

- All names, UANs, employers, balances and dates are fictional. No real person's data appears anywhere.
- No live government system is contacted, queried, scraped or reverse-engineered. No APIs, documented or otherwise.
- No Aadhaar, PAN, password, OTP or payment data is collected. The code field accepts any six digits and validates nothing.
- Nothing is stored. No database, no analytics, no cookies. State lives in memory for the length of your session.
- **Not affiliated with, endorsed by, or connected to EPFO, the Ministry of Labour and Employment, or any government body.** No government logos or emblems are used anywhere in this project.

---

## The problem

Since July 2026, EPFO transfers your provident fund automatically when you change jobs. It works — but only if four conditions are all true at once: your Aadhaar is linked and verified on your UAN, your name and date of birth match across old and new employer records, your previous employer has recorded your date of exit, and your new employer has made at least one PF deposit. If any one of them fails, the transfer silently doesn't happen. There is no error, no notification, and no failed state shown anywhere.

This matters more than the money. Part of every PF contribution funds EPS, the pension scheme, and **ten years of recognised service are required to qualify for a monthly pension for life**. Those years only count if your service history stitches together across employers — and your balance can be entirely correct while your service history is not merged. So the portal shows a healthy figure, everything looks fine, and pension eligibility is quietly broken. Most people find out when they file for pension. At 58. Roughly thirty years too late to fix it.

## What Dus Saal does

It shows the number the portal never shows you: **recognised service against the ten years you need.** Then it identifies which of the four conditions failed, and gives the one specific next step for that failure.

The most useful thing it surfaces: if a former employer never recorded your last working day, you don't need them — you can mark your own date of exit on the EPFO member portal roughly two months after your final contribution there. Very few members know this.

**Why it's better than the current experience:** it converts a silent failure into a visible one, and it checks the conditions *before* a claim is filed rather than rejecting it weeks afterwards.

## Try these three scenarios

| Scenario | What you'll see |
|---|---|
| **Priya** | A transfer blocked because an old employer never recorded her exit date. 2 years 2 months not counting. |
| **Rahul** | A name mismatch with Aadhaar. Balance correct on every account, service fragmented across all three jobs. |
| **Anjali** | Everything in order. 7 years 1 month recognised, on track. |

## Stack

React 18 · TypeScript · Vite · Tailwind CSS · React Router

No backend, no database, no authentication. All data is static fixtures in `src/data/`. Deployed on Vercel.

**Built for real conditions:** mobile-first from 320px, under 150KB of JS, tested on throttled 3G, full keyboard navigation, WCAG AA contrast throughout, English and Hindi.

## Run locally

```bash
git clone https://github.com/[your-username]/dus-saal.git
cd dus-saal
npm install
npm run dev
```

Open http://localhost:5173

## Project structure

```
src/
├── types/index.ts      Data contract — shared by everything
├── data/personas.ts    The three synthetic scenarios
├── lib/service.ts      Service calculation (pure, no React)
├── lib/format.ts       Paise → ₹, months → "4 years 2 months"
├── i18n/strings.ts     English and Hindi
├── components/         Shared UI primitives
└── routes/             The seven screens
```

## Planning documents

Both are in the repo root and open in any browser:

- **`dus-saal-build-plan.html`** — problem statement, screen specs, data contract, and the twelve-ticket sprint backlog
- **`dus-saal-design-system.html`** — colour tokens with measured contrast ratios, type scale, component specs, and every screen rendered at 360px

## Deliberately out of scope

Naming what we didn't build:

- **Duplicate UANs** — a separate and messier problem requiring the older UAN to be formally closed before balances can move.
- **Exempted establishments** — companies running private PF trusts follow a different process with different timelines.
- **Annexure K reconciliation** — we flag that service history can lag a settled transfer, but we don't reconcile it.
- **Any real claim filing** — this is a diagnostic, not a submission tool.

## A note on accuracy

The four-condition logic reflects publicly reported EPFO rules **as of August 2026**. Rules changed substantially this year — the EPF Scheme 2026 replaced the 1952 scheme on 29 June 2026, EPS 2026 replaced EPS 1995 the same day, and the member portal went through a migration in late June — and they continue to change.

**Verify anything actionable at [epfindia.gov.in](https://www.epfindia.gov.in) before acting on it.** Nothing here is financial or legal advice.

## Team

**Tanisha** <br />
**Deepak**

## License

MIT
