# Kuskusi Kouture — showcase website concept (unofficial)

> **Concept de site internet proposé par Mansour Technologies — Démonstration non officielle.**
> An unsolicited design proposal. It is **not** the official website of Kuskusi Kouture, was not commissioned, and implies no partnership or endorsement.

Live: https://mansour-technologies.github.io/kuskusi-kouture-website-concept/

## Overview
A luxurious, static brand showcase ("site vitrine") for a Moroccan house presenting **gandouras, djellabas, kaftans and tenues** — the four lines named on its public page. French, mobile-first. No shop, no bag, no prices, no accounts, no stored state.

**Home (single long page)**
1. **Hero** — bottle-green field, oversized Bodoni wordmark with a letter-by-letter entrance, art-directed plate.
2. **La maison** — editorial statement and verified facts only.
3. **Collections** — four chapters (Kaftans, Djellabas, Gandouras, Tenues) in asymmetric galleries; every image opens an accessible lightbox (native `<dialog>`: focus trap, Escape, focus return, arrows, swipe) with a "Demander ce modèle" Instagram DM link.
4. **Créations** — what the house makes, with "à confirmer" for sur-mesure / delays.
5. **Lookbook teaser** → `/lookbook/` (a magazine-style sequence; kept because it genuinely adds to the presentation).
6. **En ligne** — the official Instagram account and a press mention.
7. **Demandes & commandes** — large Instagram DM call-to-action (`https://ig.me/m/kuskusikouture`) and profile link.

## Channels configuration (`src/data/site.ts`)
- `instagram` — verified official account, rendered.
- `whatsapp: null` — **WhatsApp number to be inserted on the house's approval.** The button only renders when set.
- `facebook: null` — a public page "Kuskusi Zhor Kouture" exists but no cross-link to the Instagram account was observed; it will be shown once the house confirms it.

## Wordmark, references & imagery
- The "KUSKUSI *Kouture*" typographic treatment is a **proposal**, not the house's logo.
- Gallery references (KA-01, DJ-01…) and the lookbook chapter "Vert, blanc & pois" are **demonstration content / proposed creative direction**.
- No brand photograph is used or rehosted. All visuals are original SVG compositions (`src/components/Plate.astro`), each describing the photograph to commission — to be replaced by the house's own images on approval.
- Fonts: Bodoni Moda and Hanken Grotesk (SIL OFL), self-hosted via Fontsource.

## Stack & commands
Astro (static) · TypeScript · CSS custom properties · one small vanilla TS module (menu, lightbox, reveal) · Playwright.

```bash
npm ci
npm run dev                 # http://localhost:4321/kuskusi-kouture-website-concept/
npm run build               # -> dist/
npx playwright test         # serves dist/ via scripts/serve.mjs
BASE_URL=https://mansour-technologies.github.io/kuskusi-kouture-website-concept/ npx playwright test
node scripts/shots.mjs <url> <outDir>   # screenshot set
npm run og                  # re-render public/og.png
```
Deployed by GitHub Actions (`.github/workflows/deploy.yml`) to GitHub Pages on push to `main`. Internal URLs go through `src/lib/url.ts` (base path).

## Known limitations
- Placeholders stand in for all photography; copy about materials, sur-mesure and delays is marked "à confirmer".
- `noindex, nofollow` on every page and `robots.txt` disallows crawling (demo).

## Attribution
Concept digital proposé par [Mansour Technologies](https://mansourtechnologies.com/).

All rights reserved — Mansour Technologies. No open-source licence is granted.
