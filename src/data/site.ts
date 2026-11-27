/**
 * Central configuration — identity, verified channels, navigation.
 * Every brand fact is sourced from public pages (see README "Sources").
 */
export const site = {
  name: 'Kuskusi Kouture',
  /** Public Facebook page description: "Les nouveautés, modèles et créations de Zhor Kuskusi." */
  designer: 'Zhor Kuskusi',
  lang: 'fr',
  locale: 'fr_FR',
  description:
    'Concept de site vitrine non officiel pour Kuskusi Kouture, Casablanca : les créations de la maison telles qu’elle les publie, « une touche marocaine dans chaque détail ». Démonstration proposée par Mansour Technologies.',
  themeColor: '#e4b007',
  /** Official Instagram bio (public, 2026-11-26). */
  bio: 'At Kuskusi Kouture, we blend simplicity with sophistication while honoring our Moroccan heritage.',
  /** Recurring caption line on the official posts (March–April 2026). */
  signature: 'Une touche marocaine dans chaque détail, pour une allure qui traverse le temps.',
  /** Posts are geotagged Casablanca. */
  city: 'Casablanca',
  /** Bio pin: "📍@houseofchiki.official (Marrakech)". */
  stockist: { name: 'House of Chiki', handle: 'houseofchiki.official', city: 'Marrakech', url: 'https://www.instagram.com/houseofchiki.official/' },
  /** Tagged by @mooonstudio_ (post DW_ZmP1jQhR) and listed by MWN Lifestyle, 16 April 2026. */
  popup: {
    label: 'Spring Pop-Up — Mooon Studio, Casablanca',
    dates: '18 & 19 avril 2026',
    post: 'https://www.instagram.com/p/DW_ZmP1jQhR/',
    press: 'https://mwnlifestyle.com/2026/04/16/casablancas-spring-pop-up-spotlights-new-moroccan-labels/',
  },
  /** Verified public channel (official Instagram account, confirmed). */
  instagram: {
    handle: 'kuskusikouture',
    url: 'https://www.instagram.com/kuskusikouture/',
    dm: 'https://ig.me/m/kuskusikouture',
  },
  /**
   * Facebook page "Kuskusi Zhor Kouture" — matched to the Instagram house by content (checked 2026-11-27,
   * logged out): the same Ramadan 2024 collection posted on both (FB 9–10 March 2024: "available in three
   * colors. Baby pink baby blue and Kaki"; IG 12 March 2024: "our Kaki Gandoura … available in two other
   * colors"), the same model and riad salon, the same English caption wording. No explicit cross-link.
   */
  facebook: { name: 'Kuskusi Zhor Kouture', url: 'https://www.facebook.com/KuskusiZhorKouture/' } as { name: string; url: string } | null,
  /** WhatsApp number to be inserted on the house's approval — not rendered while null. */
  whatsapp: null as string | null,
  notice: 'Concept de site internet proposé par Mansour Technologies — Démonstration non officielle.',
  attribution: {
    label: 'Concept digital proposé par Mansour Technologies.',
    url: 'https://mansourtechnologies.com/',
  },
} as const;

/** Section anchors on the single home page. */
export const nav = [
  { label: 'Créations', href: '#creations' },
  { label: 'Détails', href: '#details' },
  { label: 'Lookbook', href: '#lookbook' },
  { label: 'La maison', href: '#maison' },
  { label: 'Contact', href: '#contact' },
] as const;
