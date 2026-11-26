/**
 * Central configuration — identity, links, navigation, theme references.
 * Every brand fact here is sourced from public pages (see README "Sources").
 * Anything not verified is labelled as demonstration content in the UI.
 */
export const site = {
  name: 'Kuskusi Kouture',
  wordmark: { main: 'Kuskusi', italic: 'Kouture' },
  /** Public page description: "Les nouveautés, modèles et créations de Zhor Kuskusi." */
  designer: 'Zhor Kuskusi',
  lang: 'fr',
  locale: 'fr_FR',
  description:
    'Concept de site non officiel pour Kuskusi Kouture — gandouras, djellabas, kaftans et tenues. Démonstration proposée par Mansour Technologies.',
  themeColor: '#17362a',
  /** Verified public channel (official Instagram account). */
  instagram: {
    handle: 'kuskusikouture',
    url: 'https://www.instagram.com/kuskusikouture/',
  },
  notice: 'Concept de site internet proposé par Mansour Technologies — Démonstration non officielle.',
  attribution: {
    label: 'Concept digital proposé par Mansour Technologies.',
    url: 'https://mansourtechnologies.com/',
  },
} as const;

export const nav = [
  { label: 'Créations', href: 'collections/' },
  { label: 'Lookbook', href: 'lookbook/' },
  { label: 'La maison', href: 'maison/' },
  { label: 'Contact', href: 'contact/' },
] as const;
