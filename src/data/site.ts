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
    'Concept de site vitrine non officiel pour Kuskusi Kouture — gandouras, djellabas, kaftans et tenues. Démonstration proposée par Mansour Technologies.',
  themeColor: '#17362a',
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

/** Section anchors on the home page, plus the lookbook page. */
export const nav = [
  { label: 'La maison', href: '#maison' },
  { label: 'Collections', href: '#collections' },
  { label: 'Créations', href: '#creations' },
  { label: 'Lookbook', href: 'lookbook/' },
  { label: 'Contact', href: '#contact' },
] as const;
