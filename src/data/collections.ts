/**
 * The house's real pieces, as published on the official Instagram account @kuskusikouture
 * (public posts, 29 March – 10 April 2026 — dates re-read from the post pages on 2026-11-27, geotagged Casablanca). Captions are quoted verbatim from
 * the posts. The visuals on this site are ORIGINAL art-directed drawings that echo each piece
 * (colour, silhouette, details); the real photograph is only ever shown through Instagram's
 * official embed, loaded on click. High-res originals: see README "Assets to replace on approval".
 */
export type Garment = 'wrap' | 'jellabaHood' | 'jellaba' | 'kimonoSatin' | 'kimonoLace' | 'bomber' | 'gandoura' | 'kimonoPrint';
export type Scene = 'riad' | 'chaux' | 'velours' | 'cedre' | 'salon';

export interface Piece {
  id: string;
  /** Instagram shortcode of the official public post. */
  code: string;
  /** Publication date as shown by Instagram. */
  date: string;
  /** Name of the piece, in the house's own words where possible. */
  name: string;
  /** Verbatim caption (first sentence(s)) from the post. */
  caption: string;
  /** What our drawing echoes — shown as alt text / description. */
  echo: string;
  garment: Garment;
  scene: Scene;
  /** Main colour, secondary colour, accent. */
  colors: [string, string, string];
  swatches: { name: string; hex: string }[];
  chapter: 'robes' | 'jellabas' | 'kimonos' | 'gandouras';
}

export const pieces: Piece[] = [
  {
    id: 'robe-safran', code: 'DW9OnKljNCm', date: '10 avril 2026', chapter: 'robes',
    name: 'Robe longue portefeuille — safran',
    caption: 'Une coupe fluide, un décolleté aux finitions perlées et un bas à volants pour un tombé impeccable. Une pièce essentielle à avoir dans son dressing.',
    echo: 'Robe longue jaune safran, col V croisé, manches longues bouffantes, lien à la taille et bas à volants, dans la cour d’un riad aux arches blanches et au sol en zellige.',
    garment: 'wrap', scene: 'riad', colors: ['#E4B007', '#C99500', '#F4D35E'],
    swatches: [{ name: 'Safran', hex: '#E4B007' }, { name: 'Chaux', hex: '#F2EBE1' }, { name: 'Zellige', hex: '#2F6B5E' }],
  },
  {
    id: 'robe-rose', code: 'DW55YkiDbrK', date: '9 avril 2026', chapter: 'robes',
    name: 'Robe longue portefeuille — rose dragée',
    caption: 'Une coupe fluide, un décolleté aux finitions perlées et un bas à volants pour un tombé impeccable. Une pièce essentielle à avoir dans son dressing.',
    echo: 'La même robe portefeuille en rose poudré, lumière de fenêtre dans une pièce blanche.',
    garment: 'wrap', scene: 'chaux', colors: ['#EDC6C6', '#D9A3A6', '#F7DEDC'],
    swatches: [{ name: 'Rose dragée', hex: '#EDC6C6' }, { name: 'Blanc', hex: '#FBF8F3' }],
  },
  {
    id: 'jellaba-citron', code: 'DWzf6NTDaio', date: '6 avril 2026', chapter: 'jellabas',
    name: 'Jellaba deux pièces — vert citron',
    caption: 'Jellaba deux pièces très légère, parfaite pour le printemps et l’été.',
    echo: 'Jellaba à capuche vert chartreuse, panneaux brodés bleu nuit sur le buste, encolure fendue gansée et pompon.',
    garment: 'jellabaHood', scene: 'chaux', colors: ['#A9C43A', '#8EA72A', '#1F2A55'],
    swatches: [{ name: 'Vert citron', hex: '#A9C43A' }, { name: 'Bleu nuit', hex: '#1F2A55' }],
  },
  {
    id: 'jellaba-ivoire', code: 'DWytRK9DEOI', date: '6 avril 2026', chapter: 'jellabas',
    name: 'Jellaba sans capuche — ivoire & noir',
    caption: 'Jellaba sans capuche, entre simplicité et modernité.',
    echo: 'Jellaba ivoire sans capuche, rangée de petits boutons noirs du col à l’ourlet, poignets noirs.',
    garment: 'jellaba', scene: 'chaux', colors: ['#F3EEE4', '#E2DACB', '#151515'],
    swatches: [{ name: 'Ivoire', hex: '#F3EEE4' }, { name: 'Noir', hex: '#151515' }],
  },
  {
    id: 'kimono-satin', code: 'DWwpkzzjRtA', date: '5 avril 2026', chapter: 'kimonos',
    name: 'Kimono en satin de soie, ceinturé',
    caption: 'Kimono en satin de soie avec ceinture avec une touche marocaine dans chaque détail, pour une allure qui traverse le temps.',
    echo: 'Kimono long en satin champagne, col châle, ceinture nouée, porté sur un pantalon clair.',
    garment: 'kimonoSatin', scene: 'chaux', colors: ['#E9DECB', '#CDBB9C', '#F7F0E3'],
    swatches: [{ name: 'Champagne', hex: '#E9DECB' }, { name: 'Sable', hex: '#CDBB9C' }],
  },
  {
    id: 'bomber-menthe', code: 'DWwHpdsDC0i', date: '5 avril 2026', chapter: 'kimonos',
    name: 'Veste bomber — jacquard menthe',
    caption: 'Veste bomber toujours avec notre touche marocaine.',
    echo: 'Bomber en jacquard vert menthe, bande basse brodée or, bords côtes, porté sur un pantalon écru.',
    garment: 'bomber', scene: 'chaux', colors: ['#B9DCC6', '#8FC1A6', '#C9A45C'],
    swatches: [{ name: 'Menthe', hex: '#B9DCC6' }, { name: 'Or', hex: '#C9A45C' }],
  },
  {
    id: 'kimono-dentelle', code: 'DWeUgdIDHps', date: '29 mars 2026', chapter: 'kimonos',
    name: 'Kimono court en dentelle, capuchon beldi',
    caption: 'Kimono court en dentelle, confortable et facile à porter. Avec capuchon beldi inspiré de la jelaba pour une touche marocaine moderne.',
    echo: 'Kimono court en dentelle blanche à ourlet festonné, capuche beldi, porté sur du noir devant une porte en cèdre sculpté.',
    garment: 'kimonoLace', scene: 'cedre', colors: ['#FBF9F4', '#E7E1D6', '#141414'],
    swatches: [{ name: 'Dentelle blanche', hex: '#FBF9F4' }, { name: 'Noir', hex: '#141414' }, { name: 'Cèdre', hex: '#6B3F26' }],
  },
  {
    id: 'kimono-lin', code: 'DWgkzH5jEBB', date: '30 mars 2026', chapter: 'kimonos',
    name: 'Ensemble kimono & pantalon en lin',
    caption: 'Ensemble kimono avec pantalon en lin, simple et efficace, parfait pour le printemps et l’été !',
    echo: 'Kimono à imprimé feuillage tropical vert et terracotta, pantalon en lin beige, sous une arche en cèdre.',
    garment: 'kimonoPrint', scene: 'cedre', colors: ['#F1E8D6', '#3E6B4A', '#C2703F'],
    swatches: [{ name: 'Feuillage', hex: '#3E6B4A' }, { name: 'Terracotta', hex: '#C2703F' }, { name: 'Lin', hex: '#D8C8AC' }],
  },
  {
    id: 'gandoura-doree', code: 'DWg-jvTjRne', date: '30 mars 2026', chapter: 'gandouras',
    name: 'Gandoura dorée, épaules dénudées',
    caption: 'Une gandoura qui sublime la tradition avec une touche moderne. Élégance dorée, héritage revisité.',
    echo: 'Gandoura en jacquard champagne et or, encolure bateau à liens, devant un rideau de velours bordeaux.',
    garment: 'gandoura', scene: 'velours', colors: ['#E6D6AE', '#C9A45C', '#F4ECD6'],
    swatches: [{ name: 'Or pâle', hex: '#E6D6AE' }, { name: 'Velours', hex: '#6E1E26' }],
  },
  {
    id: 'gandoura-jacquard', code: 'DWi0NMeDcqd', date: '31 mars 2026', chapter: 'gandouras',
    name: 'Gandoura jacquard, liens à pompons',
    caption: 'Une touche marocaine dans chaque détail, pour une allure qui traverse le temps.',
    echo: 'Gandoura en jacquard blanc et vert d’eau, épaules dénudées, liens terminés par des pompons, devant un tableau au cadre doré.',
    garment: 'gandoura', scene: 'salon', colors: ['#EEF1E8', '#BFD0BE', '#9DB59A'],
    swatches: [{ name: 'Vert d’eau', hex: '#BFD0BE' }, { name: 'Blanc', hex: '#EEF1E8' }],
  },
  {
    id: 'gandoura-fleurie', code: 'DWox_IvjPDW', date: '2 avril 2026', chapter: 'gandouras',
    name: 'Gandoura fleurie, encolure brodée rose',
    caption: 'Une touche marocaine dans chaque détail, pour une allure qui traverse le temps.',
    echo: 'Gandoura blanche à fleurs roses et feuillage vert, encolure brodée rose, devant un mur ocre et un drapé de velours.',
    garment: 'gandoura', scene: 'velours', colors: ['#FAF6F1', '#E58FA8', '#7FA77A'],
    swatches: [{ name: 'Fleur', hex: '#E58FA8' }, { name: 'Feuille', hex: '#7FA77A' }],
  },
  {
    id: 'gandoura-satin', code: 'DWlkfCYDJHa', date: '1 avril 2026', chapter: 'gandouras',
    name: 'Gandoura en satin, salon marocain',
    caption: 'Une touche marocaine dans chaque détail, pour une allure qui traverse le temps.',
    echo: 'Gandoura en satin rosé champagne, portée allongée sur une banquette de salon marocain, rideaux de velours.',
    garment: 'gandoura', scene: 'salon', colors: ['#E8CFC2', '#CFAE9C', '#F3E2D8'],
    swatches: [{ name: 'Satin rosé', hex: '#E8CFC2' }, { name: 'Brocart', hex: '#3E6E68' }],
  },
];

export const chapters = [
  { id: 'robes', title: 'Robes', kicker: 'Longues, fluides, à volants' },
  { id: 'jellabas', title: 'Jellabas', kicker: 'Avec ou sans capuche' },
  { id: 'kimonos', title: 'Kimonos & vestes', kicker: 'Satin, dentelle, lin, jacquard' },
  { id: 'gandouras', title: 'Gandouras', kicker: 'Épaules dénudées, liens, pompons' },
] as const;

export const byId = (id: string) => pieces.find((p) => p.id === id)!;
export const igPost = (code: string) => `https://www.instagram.com/p/${code}/`;
export const igEmbed = (code: string) => `https://www.instagram.com/p/${code}/embed/`;

/** Signature details observed in the posts — the "touche marocaine" the house keeps repeating. */
export const details = [
  { term: 'Capuchon beldi', from: 'Kimono court en dentelle', note: '« inspiré de la jelaba »', piece: 'kimono-dentelle', draw: 'hood' },
  { term: 'Rangée de boutons noirs', from: 'Jellaba sans capuche', note: 'du col à l’ourlet, poignets assortis', piece: 'jellaba-ivoire', draw: 'buttons' },
  { term: 'Finitions perlées', from: 'Robe longue portefeuille', note: 'au décolleté', piece: 'robe-safran', draw: 'pearls' },
  { term: 'Bas à volants', from: 'Robe longue portefeuille', note: '« pour un tombé impeccable »', piece: 'robe-rose', draw: 'ruffle' },
  { term: 'Panneaux brodés', from: 'Jellaba deux pièces', note: 'bleu nuit sur vert citron', piece: 'jellaba-citron', draw: 'panel' },
  { term: 'Liens à pompons', from: 'Gandoura jacquard', note: 'à l’encolure dénudée', piece: 'gandoura-jacquard', draw: 'tassel' },
] as const;
