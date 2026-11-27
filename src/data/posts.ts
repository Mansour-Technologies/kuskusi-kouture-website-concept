/**
 * The twelve real publications shown on the page, through Instagram's OFFICIAL embed only
 * (https://www.instagram.com/p/<code>/embed/), unmodified, lazy-loaded when scrolled near.
 * Nothing is rehosted. Captions are quoted verbatim; dates were re-read from each public post
 * page on 2026-11-27. Every embed was checked to render in a clean, logged-out browser.
 *
 * `ratio` = height/width of the media inside Instagram's embed (3:4 posts → 4/3, square → 1,
 * reels and 4:5 posts → 5/4). Instagram adds a fixed 208 px of header + footer chrome, measured
 * at widths 300–540 px; the page reserves exactly that space so nothing shifts when it loads.
 */
export interface Post {
  code: string;
  author: 'kuskusikouture' | 'mooonstudio_';
  kind: 'photo' | 'reel';
  ratio: number;
  /** Publication date as shown by Instagram. */
  date: string;
  iso: string;
  /** Title: the house's own name for the piece when it gave one (`named`), otherwise a plain description. */
  title: string;
  named?: boolean;
  /** Verbatim caption excerpt and its language. */
  caption: string;
  lang: 'fr' | 'en';
  /** Our proposed French translation for English captions (labelled as such on the page). */
  fr?: string;
  /** What to look at in the photograph (observation, not a claim). */
  look: string;
}

const P34 = 4 / 3;
const P11 = 1;
const P45 = 5 / 4;

export const posts = {
  robe: {
    code: 'DW9OnKljNCm', author: 'kuskusikouture', kind: 'photo', ratio: P34, date: '10 avril 2026', iso: '2026-04-10',
    title: 'Robe longue', named: true, lang: 'fr',
    caption: 'Une coupe fluide, un décolleté aux finitions perlées et un bas à volants pour un tombé impeccable. Une pièce essentielle à avoir dans son dressing.',
    look: 'Safran, dans la cour d’un riad : décolleté croisé perlé, lien à la taille, volant au bas.',
  },
  citron: {
    code: 'DWzf6NTDaio', author: 'kuskusikouture', kind: 'photo', ratio: P34, date: '6 avril 2026', iso: '2026-04-06',
    title: 'Jellaba deux pièces', named: true, lang: 'fr',
    caption: 'Jellaba deux pièces très légère, parfaite pour le printemps et l’été.',
    look: 'Vert citron, capuche, panneaux brodés bleu nuit sur le buste, un pompon à l’encolure.',
  },
  ivoire: {
    code: 'DWytRK9DEOI', author: 'kuskusikouture', kind: 'photo', ratio: P34, date: '6 avril 2026', iso: '2026-04-06',
    title: 'Jellaba sans capuche', named: true, lang: 'fr',
    caption: 'Jellaba sans capuche, entre simplicité et modernité.',
    look: 'Ivoire, une rangée de petits boutons noirs du col à l’ourlet, poignets noirs.',
  },
  doree: {
    code: 'DWg-jvTjRne', author: 'kuskusikouture', kind: 'photo', ratio: P11, date: '30 mars 2026', iso: '2026-03-30',
    title: 'Gandoura', named: true, lang: 'fr',
    caption: 'Une gandoura qui sublime la tradition avec une touche moderne. Élégance dorée, héritage revisité.',
    look: 'Jacquard doré, épaules dégagées, liens à l’encolure, devant un rideau de velours.',
  },
  dentelle: {
    code: 'DWeUgdIDHps', author: 'kuskusikouture', kind: 'photo', ratio: P34, date: '29 mars 2026', iso: '2026-03-29',
    title: 'Kimono court en dentelle', named: true, lang: 'fr',
    caption: 'Kimono court en dentelle, confortable et facile à porter. Avec capuchon beldi inspiré de la jelaba pour une touche marocaine moderne.',
    look: 'Dentelle blanche sur noir, devant une porte en cèdre sculpté.',
  },
  tanyla: {
    code: 'C4dlFITNdz6', author: 'kuskusikouture', kind: 'reel', ratio: P45, date: '13 mars 2024', iso: '2024-03-13',
    title: 'Gandoura Tanyla', named: true, lang: 'en',
    caption: 'Our gandoura Tanyla, available in only Emerald green, perfect for this Ramadan.',
    fr: 'Notre gandoura Tanyla, uniquement en vert émeraude, parfaite pour ce Ramadan.',
    look: 'Gros plan : passementerie ivoire et rangée de boutons sur le vert émeraude.',
  },
  tanila: {
    code: 'C4gtHKgNwx1', author: 'kuskusikouture', kind: 'reel', ratio: P45, date: '14 mars 2024', iso: '2024-03-14',
    title: 'Bad3ia Tanila', named: true, lang: 'en',
    caption: 'Our Bad3ia Tanila is here ! Available in just one color.',
    fr: 'Notre Bad3ia Tanila est arrivée ! Disponible dans une seule couleur.',
    look: 'Col montant noir, attaches noires sur le côté, sur un gris perle.',
  },
  pompons: {
    code: 'DWi0NMeDcqd', author: 'kuskusikouture', kind: 'photo', ratio: P11, date: '31 mars 2026', iso: '2026-03-31',
    title: 'Gandoura, liens à pompons', lang: 'fr',
    caption: 'Une touche marocaine dans chaque détail, pour une allure qui traverse le temps.',
    look: 'Jacquard blanc et vert d’eau ; les liens de l’encolure finissent en pompons.',
  },
  thairy: {
    code: 'C4YMaPOtaSP', author: 'kuskusikouture', kind: 'reel', ratio: P45, date: '11 mars 2024', iso: '2024-03-11',
    title: 'Gandoura Thairy', named: true, lang: 'en',
    caption: 'Perfect for Ramadan iftar and family gatherings during this holy month, our Thairy gandoura is available in two other colors.',
    fr: 'Parfaite pour l’iftar et les réunions de famille pendant ce mois sacré, notre gandoura Thairy existe en deux autres couleurs.',
    look: 'Dans un salon marocain : banquette de brocart, tableau au cadre doré.',
  },
  kaki: {
    code: 'C4arM39NlkD', author: 'kuskusikouture', kind: 'reel', ratio: P45, date: '12 mars 2024', iso: '2024-03-12',
    title: 'Gandoura kaki', named: true, lang: 'en',
    caption: 'Check out our Kaki Gandoura , perfect for the Ramadan. Available in two other colors. DM for orders!',
    fr: 'Découvrez notre gandoura kaki, parfaite pour le Ramadan. Existe en deux autres couleurs. Commandes en DM !',
    look: 'Kaki, encolure lacée à pompons, sous un plafond de cèdre peint.',
  },
  resort: {
    code: 'C9IImR7tfYQ', author: 'kuskusikouture', kind: 'reel', ratio: P45, date: '7 juillet 2024', iso: '2024-07-07',
    title: 'Resort Collection', named: true, lang: 'en',
    caption: 'Featuring chic striped sets, breezy linen ensembles, and sophisticated dresses…',
    fr: 'Des ensembles rayés, des tenues en lin légères et des robes habillées…',
    look: 'Le film d’annonce : la mer, et le nom de la maison en capitales espacées.',
  },
  popup: {
    code: 'DW_ZmP1jQhR', author: 'mooonstudio_', kind: 'photo', ratio: P45, date: '11 avril 2026', iso: '2026-04-11',
    title: 'Spring Pop-Up — Mooon Studio', lang: 'en',
    caption: '123, Ibnou Majat — Casablanca · April 18–19 · Meet the brands: @kuskusikouture…',
    fr: '123, rue Ibnou Majat, Casablanca · 18 et 19 avril · Les marques présentes : @kuskusikouture…',
    look: 'L’affiche du pop-up publiée par Mooon Studio, qui identifie la maison.',
  },
} satisfies Record<string, Post>;

export type PostKey = keyof typeof posts;
export const igPost = (code: string) => `https://www.instagram.com/p/${code}/`;
export const igEmbed = (code: string) => `https://www.instagram.com/p/${code}/embed/`;

/** Public chronology, from the captions and dates of the house's own posts. */
export const chronology = [
  { when: 'Mars 2024', what: 'Collection Ramadan', note: 'légendes en anglais ; pièces nommées Thairy, Tanyla, Nelya, Bad3ia Tanila ; « Orders via DM ».' },
  { when: 'Mai 2024', what: 'Gandouras pour l’Aïd, puis « Summer 24 Collection »', note: '« our first summer collection », annoncée par trois films.' },
  { when: 'Juillet 2024', what: 'Resort Collection', note: 'ensembles rayés, lin, robes.' },
  { when: 'Mars – avril 2026', what: 'Printemps 2026', note: 'légendes en français, publications géolocalisées à Casablanca.' },
  { when: '18 – 19 avril 2026', what: 'Spring Pop-Up, Mooon Studio', note: 'Casablanca, quartier des Princesses.' },
] as const;
