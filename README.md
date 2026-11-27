# Kuskusi Kouture — showcase website concept (unofficial)

> **Concept de site internet proposé par Mansour Technologies — Démonstration non officielle.**
> An unsolicited design proposal. It is **not** the official website of Kuskusi Kouture, was not commissioned, and implies no partnership or endorsement.

Live: https://mansour-technologies.github.io/kuskusi-kouture-website-concept/

## Overview
A static, single-page fashion showcase ("site vitrine") for Kuskusi Kouture (Casablanca), built around the house's **own published pieces**. Twelve real posts are shown through Instagram's official embed, unmodified, with the house's verbatim captions and dates. French copy; no shop, prices, accounts or stored state.

**Sections**
1. **Hero.** A saffron field (the colour of the house's April 2026 *Robe longue*), the KK lockup with "KUSKUSI KOUTURE" in spaced capitals, and the house's caption as the title: « Une touche marocaine dans chaque détail ». Original croquis of the two jellabas published on 6 April 2026 stand in front of a tone-on-tone KK. "Découvrir les créations" and "Contacter la maison". The hero never waits on Instagram.
2. **01 Les créations (printemps 2026).** *Robe longue* (10 Apr), the two jellabas published the same day (6 Apr), *Gandoura* (30 Mar), *Kimono court en dentelle* (29 Mar). Asymmetric editorial layout; each post carries its number, date, Casablanca geotag, verbatim caption and a short note on what to look at.
3. **02 Détails & matières.** The details the house repeats (capuchon beldi, row of black buttons, beaded neckline, ruffled hem, embroidered panels, tassel ties), each linked to its post, beside three close looks: *gandoura Tanyla* and *Bad3ia Tanila* (March 2024) and the tasselled jacquard gandoura (March 2026). English captions get a labelled proposed translation.
4. **03 Lookbook 2024.** Ramadan 2024 in the riad salon (*gandoura Thairy*, *gandoura kaki*) and the *Resort Collection* film (July 2024).
5. **04 La maison.** The Instagram bio, Casablanca, Marrakech (House of Chiki, pinned in the bio), the Mooon Studio Spring Pop-Up (official post by @mooonstudio_ and MWN Lifestyle), the designer name from Facebook ("à confirmer"), and a public chronology of the collections built from the post dates.
6. **05 Contact.** "Contacter la maison": Instagram DM (`https://ig.me/m/kuskusikouture`), the profile, and the Facebook page. The house's own words on ordering are quoted ("Orders via DM. We deliver everywhere in Morocco.", 11 March 2024). No prices or terms are stated.

## Photography & embeds policy
- **No photograph of the house is committed, copied, rehosted or hotlinked.** Real images appear only through Instagram's official embed iframe `https://www.instagram.com/p/<code>/embed/`, unmodified: no crop, no overlay, Instagram's header, footer and links intact.
- Embeds load **lazily on scroll** (IntersectionObserver, started after the page `load` event, 320 px margin), not behind a click. Each box reserves its exact height before loading: `ratio × width + 208 px` (3:4 posts 4/3, square 1, reels and 4:5 posts 5/4), measured from Instagram's own `MEASURE` message at widths 300–540 px. The box then adopts the height Instagram reports, if it differs.
- Every embed keeps a plain "Voir sur Instagram" link (no-JS fallback) and an "Intégration officielle Instagram · @account ↗" source line.
- All twelve embeds were checked to render in a clean, logged-out Chromium (2026-11-27).
- The croquis (`src/components/Plate.astro`) are original drawings after real pieces, labelled as such; they are never presented as products.
- The KK lockup is a typeset evocation of the house's monogram (Bodoni Moda); to be replaced by the official vector.

## Posts shown (`src/data/posts.ts`)
| # | Post | Date | Piece (house's words) | Section |
|---|---|---|---|---|
| 1 | `DW9OnKljNCm` | 10 Apr 2026 | Robe longue, saffron, riad courtyard | Créations (opening) |
| 2 | `DWzf6NTDaio` | 6 Apr 2026 | Jellaba deux pièces, lime | Créations |
| 3 | `DWytRK9DEOI` | 6 Apr 2026 | Jellaba sans capuche, ivory, black buttons | Créations |
| 4 | `DWg-jvTjRne` | 30 Mar 2026 | Gandoura, gold jacquard | Créations |
| 5 | `DWeUgdIDHps` | 29 Mar 2026 | Kimono court en dentelle, capuchon beldi | Créations |
| 6 | `C4dlFITNdz6` | 13 Mar 2024 | Gandoura Tanyla, emerald (reel) | Détails |
| 7 | `C4gtHKgNwx1` | 14 Mar 2024 | Bad3ia Tanila (reel) | Détails |
| 8 | `DWi0NMeDcqd` | 31 Mar 2026 | Gandoura, tassel ties | Détails |
| 9 | `C4YMaPOtaSP` | 11 Mar 2024 | Gandoura Thairy (reel) | Lookbook |
| 10 | `C4arM39NlkD` | 12 Mar 2024 | Gandoura kaki (reel) | Lookbook |
| 11 | `C9IImR7tfYQ` | 7 Jul 2024 | Resort Collection (reel) | Lookbook |
| 12 | `DW_ZmP1jQhR` | 11 Apr 2026 | Spring Pop-Up flyer, by @mooonstudio_ | La maison |

## Assets to replace on approval
| Placement | Current | Recommended replacement (from the house) |
|---|---|---|
| Header / hero / footer / favicon lockup | typeset reversed-K + K | Official KK monogram (vector) |
| Hero | croquis of `DWytRK9DEOI` and `DWzf6NTDaio` | High-res campaign image: the saffron Robe longue in the riad (`DW9OnKljNCm`), or the 2024 riad-salon shoot |
| Créations, Détails, Lookbook | official embeds of the posts above | High-res originals of posts 1–5, 6, 7, 9, 10 (portrait crops), and detail close-ups (aakad trim, frog closures, tassels, beldi hood) |
| Lookbook | Resort film embed | Stills of the Resort Collection (striped sets, linen) |
| Designer name | "Zhor Kuskusi — à confirmer" | Confirmation by the house |
| WhatsApp | `site.whatsapp = null` (not rendered) | **WhatsApp number to be inserted on the house's approval** |
| Facebook | linked (content match with Instagram, see `src/data/site.ts`) | Confirmation by the house |

## Stack & commands
Astro (static) · TypeScript · CSS custom properties · one small vanilla TS module (menu, lazy embeds, reveal) · Playwright. Fonts: Bodoni Moda and Hanken Grotesk (SIL OFL), self-hosted via Fontsource.

```bash
npm ci
npm run dev                 # http://localhost:4321/kuskusi-kouture-website-concept/
npm run build               # -> dist/
npx playwright test         # serves dist/ via scripts/serve.mjs
BASE_URL=https://mansour-technologies.github.io/kuskusi-kouture-website-concept/ npx playwright test
node scripts/shots.mjs <url> <outDir>   # screenshots + viewport segments for stitched full pages
npm run og                  # re-render public/og.png
```
GitHub Actions (`.github/workflows/deploy.yml`) deploys to GitHub Pages on every push to `main`. Internal URLs go through `src/lib/url.ts`, which applies the base path.

## Known limitations
- The photographs depend on Meta: Instagram's embed brings its own UI ("View profile", likes), its own cookies once loaded, and its own console errors (permissions-policy noise from Instagram's scripts, not this site's code). If Instagram changes the embed, the reserved heights may need re-measuring.
- Reels show Instagram's poster frame with "Watch on Instagram"; playback happens on Instagram.
- `noindex, nofollow` is set on every page and `robots.txt` disallows crawling (demo).

## Attribution
Concept digital proposé par [Mansour Technologies](https://mansourtechnologies.com/).

All rights reserved — Mansour Technologies. No open-source licence is granted.
