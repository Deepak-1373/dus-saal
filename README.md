# Dus Saal — दस साल

**Check whether your PF years actually count toward a pension.**

> ### ▶ Live demo: https://dus-saal.vercel.app/
>
> No signup. Any UAN, any six digits as the code. A scenario picker on the sign-in screen lets you try all three cases in under twenty seconds.

Built for Build what moves India

---

## ⚠️ Please read first

This is a **prototype built with entirely invented data**. It does not connect to EPFO or any government system. A banner saying *"Demo — mock data. Not connected to any EPFO system."* is fixed to every screen and cannot be dismissed.

- All names, UANs, employers, balances and dates are invented. No real person's data appears anywhere.
- No live government system is contacted, queried or scraped. No APIs, documented or otherwise.
- No Aadhaar, PAN, password, OTP or payment data is collected. The OTP field accepts any six digits and validates nothing.
- Nothing is stored. No database, no analytics, no cookies. State lives in memory for the length of your session.
- **Not affiliated with, endorsed by, or connected to EPFO, the Ministry of Labour and Employment, or any government body.** No government logos or emblems are used anywhere in this project.
- The four-condition logic reflects publicly reported EPFO rules as of August 2026. Rules changed substantially this year and continue to change; verify anything actionable at [epfindia.gov.in](https://www.epfindia.gov.in).
- Out of scope: duplicate UANs, exempted establishments with private PF trusts, Annexure K reconciliation, and any real claim filing.

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

## Run locally

Requires **Node 20.19+ or 22.12+** (Vite 7). Nothing else — no environment variables, no services, no accounts.

```bash
git clone https://github.com/[your-username]/dus-saal.git
cd dus-saal
npm install
npm run dev
```

Open http://localhost:5173.

| Script | What it does |
|---|---|
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Type-check, then production build into `dist/` |
| `npm run typecheck` | Type-check only |
| `npm run preview` | Serve the production build locally |

## Screens

Seven routes, all reachable from the list at the bottom of every page until the app shell lands in DUS-104.

| Route | Screen | Ticket |
|---|---|---|
| `/` | Landing | DUS-301 |
| `/sign-in` | Mock sign-in and scenario picker | DUS-301 |
| `/verdict` | The verdict — recognised service against ten years | DUS-201 |
| `/fix` | Fix the broken condition | DUS-202 |
| `/timeline` | Employment timeline | DUS-302 |
| `/tracker` | Tracker | DUS-303 |
| `/about` | About and full disclosure | DUS-401 |

## Stack

React 19 · TypeScript · Vite · Tailwind CSS · React Router

No backend, no database, no authentication. All data is static fixtures in `src/data/`. Deployed on Vercel.

**Targets we hold ourselves to:** mobile-first from 320px, under 150KB of JS, usable on throttled 3G, full keyboard navigation, WCAG AA contrast throughout, English and Hindi.

## Project structure

Files marked *pending* are scheduled in the sprint backlog and do not exist yet.

```
src/
├── types/index.ts      Data contract — shared by everything (DUS-101)
├── App.tsx             Router and route index (DUS-101)
├── data/personas.ts    The three synthetic scenarios (pending, DUS-102)
├── lib/service.ts      Service calculation, pure, no React (pending, DUS-103)
├── lib/format.ts       Paise → ₹, months → "4 years 2 months" (pending, DUS-103)
├── i18n/strings.ts     English and Hindi (pending, DUS-402)
├── components/         Shared UI primitives (pending, DUS-104)
└── routes/             The seven screens (DUS-101, filled in later tickets)
```

`src/types/index.ts` is the contract between both of us. **Never edit it without messaging the other person first.**

## Deploying

Vercel, connected to this GitHub repo. `vercel.json` pins the framework, build command, output directory, and an SPA rewrite so deep links like `/verdict` resolve on refresh.

The production domain is reserved but was serving a 404 until this ticket, because `main` had no application to build. Once this lands, confirm:

1. The production URL loads in a private window with no login prompt.
2. `/verdict` still resolves after a hard refresh — that is the SPA rewrite doing its job.

Every push to `main` redeploys production automatically. Pull requests get their own preview URL.

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
