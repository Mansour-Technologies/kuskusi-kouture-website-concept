# Kuskusi Kouture — website concept (unofficial)

> **Concept de site internet proposé par Mansour Technologies — Démonstration non officielle.**
> This is an unsolicited design proposal. It is **not** the official website of Kuskusi Kouture, was not commissioned, and implies no partnership or endorsement.

Live demo: https://mansour-technologies.github.io/kuskusi-kouture-website-concept/

## Overview
An editorial "digital flagship" concept for a Moroccan house presenting **gandouras, djellabas, kaftans and tenues** (the four lines named on the house's public page). French-language, mobile-first, built to feel like a fashion app when opened from Instagram or WhatsApp.

- **Home** — full-height bottle-green hero with an oversized typographic wordmark, the four lines as an editorial index, chosen pieces in an asymmetric grid, lookbook strip, enquiry path.
- **Créations** — filter by line and colour (URL-synced, View Transitions), line pages with editorial intros.
- **Piece pages** (`/creations/etude-XX/`) — swipeable gallery with thumbnails, full-screen zoom, colour swatches that swap the gallery, size selection, accessible size-guide dialog, "à confirmer" detail sections, related pieces.
- **Lookbook** — magazine sequencing: full-bleed, offset pairs, typographic interlude, horizontal contact sheet (native scroll, no hijacking).
- **Ma sélection** (bag demo) — add / remove / quantity / variants, `localStorage` persistence (validated, corruption-safe, reset control), drawer (side panel on desktop, bottom sheet on mobile), and a composer that prepares a message to paste into Instagram DMs. **Nothing is ordered, paid or sent.**
- **La maison / Contact** — only verified facts; everything else listed as "à écrire / à confirmer avec la maison".

## Wordmark & creative direction
The "KUSKUSI *Kouture*" typographic treatment (Bodoni Moda) is a **proposal**, not the house's logo. "Études n°01–12" and the lookbook chapter "Vert, blanc & pois" are **demonstration content / proposed creative direction**. No prices, stock, materials or craftsmanship claims are made.

## Imagery & asset licensing
No photograph of the brand is used or rehosted. All visuals are original SVG compositions ("plates": silhouettes, stitch dots, numerals, grain) generated in `src/components/Plate.astro`, each captioned "Photographie à venir" with the proposed shot. They are meant to be replaced by the house's own photography on approval.
Fonts: Bodoni Moda and Hanken Grotesk (SIL Open Font License), self-hosted via Fontsource.

## Stack
Astro (static) · TypeScript · CSS custom properties · vanilla TS islands · Playwright.

```bash
npm ci
npm run dev        # http://localhost:4321/kuskusi-kouture-website-concept/
npm run build      # -> dist/
npx playwright test            # builds must exist; serves dist/ via scripts/serve.mjs
BASE_URL=https://mansour-technologies.github.io/kuskusi-kouture-website-concept/ npx playwright test   # against production
npm run og         # re-render public/og.png
```

Deployment: GitHub Actions (`.github/workflows/deploy.yml`) builds on push to `main` and publishes to GitHub Pages. All internal URLs go through `src/lib/url.ts` to respect the `/kuskusi-kouture-website-concept/` base.

Central configuration: `src/data/site.ts` (identity, verified channel, nav, notices) and `src/data/pieces.ts` (lines, demo pieces, colourways, sizes).

## Known limitations
- Demonstration catalogue; real pieces, names, photos, sizes and copy must come from the house.
- No checkout, no payment, no order transmission (by design).
- The size guide is an illustrative layout, explicitly marked "à confirmer".
- `noindex, nofollow` on every page and `robots.txt` disallows all crawling.

## Attribution
Concept digital proposé par [Mansour Technologies](https://mansourtechnologies.com/).

All rights reserved — Mansour Technologies. No open-source licence is granted.
