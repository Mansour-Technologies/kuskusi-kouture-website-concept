# Kuskusi Kouture — showcase website concept (unofficial)

> **Concept de site internet proposé par Mansour Technologies — Démonstration non officielle.**
> An unsolicited design proposal. It is **not** the official website of Kuskusi Kouture, was not commissioned, and implies no partnership or endorsement.

Live: https://mansour-technologies.github.io/kuskusi-kouture-website-concept/

## Overview
A static, single-page brand showcase ("site vitrine") for Kuskusi Kouture. It is built from what the house actually publishes on its official Instagram account [@kuskusikouture](https://www.instagram.com/kuskusikouture/):
- its bio line, *"simplicity with sophistication… honoring our Moroccan heritage"*
- its recurring caption, *« Une touche marocaine dans chaque détail »*
- its real spring 2026 pieces: jellabas, kimonos, a bomber, gandouras, long wrap dresses
- its colours, and the riad settings of its photos

The site is in French, designed mobile-first, and has no shop, bag, prices, accounts or stored state.

**Sections**
1. **Hero — "l'arcade".** Three riad arches hold original drawings of three real pieces: the saffron wrap dress, the blush wrap dress, and the lime hooded jellaba. They sit under the house's own caption line. Each arch is a button that opens the piece.
2. **Nuancier.** The season's real colours (safran, vert citron, rose dragée, ivoire & noir, or pâle, menthe). Each colour opens its piece.
3. **01 La maison.**
   - The bio, quoted.
   - Sourced facts:
     - Casablanca geotag
     - House of Chiki, Marrakech, as pinned in the bio
     - Spring Pop-Up at Mooon Studio, 18–19 April 2026
     - a "Kids" story highlight
   - The designer's name, marked "à confirmer".
4. **02 Le vestiaire.** 12 real pieces in four chapters: Robes, Jellabas, Kimonos & vestes, Gandouras. Each is an original drawing that echoes the official post: its colour, cut, signature detail and setting.
   - Clicking a piece opens an accessible dialog (native `<dialog>`, focus trap, Escape, focus return, arrows, swipe) with:
     - the house's verbatim caption
     - the post date
     - the colours observed
     - **"Afficher la photo officielle"**, which loads Instagram's official embed on click
     - "Ouvrir sur Instagram"
     - "Demander ce modèle" (Instagram DM)
5. **03 Le détail.** The "touche marocaine", detail by detail, as it appears in the posts: capuchon beldi, row of black buttons, beaded neckline, ruffled hem, embroidered panels, tassel ties.
6. **04 Sur Instagram.** Three click-to-load facades for official embeds of public posts. No request reaches Instagram before the click (this is tested).
7. **05 Écrire à la maison.** A large Instagram DM card (`https://ig.me/m/kuskusikouture`), a three-step "Repérer / Écrire / Échanger" sequence, and an example message labelled as proposed.

## Photography & embeds policy
- **No photograph of the house is committed, copied or rehosted.** The real photographs appear only through Instagram's official embed iframe (`https://www.instagram.com/p/<code>/embed/`), created only after a user click.
- The arch drawings (`src/components/Plate.astro`) are original SVG illustrations. Each one's alt text states which official post it echoes. The data, with the verbatim captions and shortcodes, is in `src/data/collections.ts`.
- The header and footer "KK" lockup is a typographic *evocation* of the house's monogram, set in Bodoni Moda. It is to be replaced by the official vector logo.

## Assets to replace on approval
| Placement | Current | Recommended replacement (high-res original from the house) |
|---|---|---|
| Header / footer / favicon lockup | typeset reversed-K + K | Official KK monogram (vector) |
| Hero centre arch | drawing of post `DW9OnKljNCm` (9 Apr 2026) | Saffron wrap dress in the riad courtyard (that post) |
| Hero left / right arches | drawings of `DW55YkiDbrK`, `DWzf6NTDaio` | Blush wrap dress; lime hooded jellaba |
| Vestiaire (12 arches) | drawings of the 12 posts in `collections.ts` | The 12 corresponding photographs (portrait 3:4 crops) |
| Détail icons | line drawings | Close-up detail shots (buttons, hood, tassels, embroidered panels) |
| Sur Instagram (3 facades) | drawings and official embeds on click | Keep the embeds, or swap in approved photos |
| Designer name | "Zhor Kuskusi — à confirmer" | Confirmation by the house |
| WhatsApp | `site.whatsapp = null` (not rendered) | **WhatsApp number to be inserted on the house's approval** |
| Facebook | `site.facebook = null` (not rendered) | Page "Kuskusi Zhor Kouture" once the house confirms it is theirs |

## Stack & commands
Astro (static) · TypeScript · CSS custom properties · one small vanilla TS module (menu, piece dialog, embed facades, reveal) · Playwright. Fonts: Bodoni Moda and Hanken Grotesk (SIL OFL), self-hosted via Fontsource.

```bash
npm ci
npm run dev                 # http://localhost:4321/kuskusi-kouture-website-concept/
npm run build               # -> dist/
npx playwright test         # serves dist/ via scripts/serve.mjs
BASE_URL=https://mansour-technologies.github.io/kuskusi-kouture-website-concept/ npx playwright test
node scripts/shots.mjs <url> <outDir> [--embed]   # screenshot set
npm run og                  # re-render public/og.png
```
GitHub Actions (`.github/workflows/deploy.yml`) deploys to GitHub Pages on every push to `main`. Internal URLs go through `src/lib/url.ts`, which applies the base path.

## Known limitations
- The drawings are interpretations. True luxury depends on the house's own photographs, which are shown only via the official embed until approval.
- The Instagram embed depends on Meta: content, availability and cookies are under Instagram's control.
- `noindex, nofollow` is set on every page, and `robots.txt` disallows crawling (demo).

## Attribution
Concept digital proposé par [Mansour Technologies](https://mansourtechnologies.com/).

All rights reserved — Mansour Technologies. No open-source licence is granted.
