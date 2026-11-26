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
    'Concept de site vitrine non officiel pour Kuskusi Kouture — jellabas, kimonos, gandouras et robes, « une touche marocaine dans chaque détail ». Démonstration proposée par Mansour Technologies.',
  themeColor: '#f2ebe1',
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
   * Facebook page "Kuskusi Zhor Kouture" exists publicly but no cross-link to the Instagram
   * account was observed: left null (not rendered) until the house confirms it.
   * Candidate: https://www.facebook.com/KuskusiZhorKouture/
   */
  facebook: null as string | null,
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
  { label: 'La maison', href: '#maison' },
  { label: 'Le vestiaire', href: '#vestiaire' },
  { label: 'Le détail', href: '#detail' },
  { label: 'Sur Instagram', href: '#instagram' },
  { label: 'Écrire', href: '#contact' },
] as const;
