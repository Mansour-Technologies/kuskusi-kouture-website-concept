/**
 * Demonstration catalogue.
 * VERIFIED: the four lines (gandouras, djellabas, kaftans, tenues) come from the house's public
 * Facebook page description. EVERYTHING ELSE (piece names, colourways, sizes, copy) is
 * demonstration content, labelled as such in the UI, to be replaced by the house's real pieces.
 * No prices, no stock: enquiry only.
 */
export type Silhouette = 'kaftan' | 'djellaba' | 'gandoura' | 'tenue';

export interface Colour {
  id: string;
  name: string;
  cloth: string; // garment fill
  stitch: string; // embroidery / buttons
  field: string; // plate background
  pattern?: 'pois';
}

export const colours: Record<string, Colour> = {
  vert: { id: 'vert', name: 'Vert bouteille', cloth: '#1f4636', stitch: '#f6f4ee', field: '#d9ddd3' },
  blanc: { id: 'blanc', name: 'Blanc cassé', cloth: '#f3f1ea', stitch: '#17362a', field: '#1f4636' },
  noir: { id: 'noir', name: 'Noir', cloth: '#161615', stitch: '#f6f4ee', field: '#c9c7bf' },
  pois: { id: 'pois', name: 'Pois noir & blanc', cloth: '#f3f1ea', stitch: '#161615', field: '#161615', pattern: 'pois' },
  eau: { id: 'eau', name: "Vert d'eau", cloth: '#a8b9a7', stitch: '#17362a', field: '#f3f1ea' },
  brique: { id: 'brique', name: 'Brique', cloth: '#8e3b28', stitch: '#f6f4ee', field: '#e7e4dc' },
  nuit: { id: 'nuit', name: 'Bleu nuit', cloth: '#1d2534', stitch: '#e9e6dc', field: '#a8b9a7' },
};

export interface Line {
  slug: string;
  name: string;
  singular: string;
  no: string;
  silhouette: Silhouette;
  intro: string;
  shot: string;
}

export const lines: Line[] = [
  {
    slug: 'kaftans',
    name: 'Kaftans',
    singular: 'Kaftan',
    no: '01',
    silhouette: 'kaftan',
    intro:
      "La pièce de cérémonie. Ici, une présentation pensée comme une galerie : chaque kaftan photographié en pied, puis au plus près de la broderie et des boutons.",
    shot: 'Kaftan en pied, fond uni, lumière latérale douce',
  },
  {
    slug: 'djellabas',
    name: 'Djellabas',
    singular: 'Djellaba',
    no: '02',
    silhouette: 'djellaba',
    intro:
      "La silhouette du quotidien élevée au rang de pièce de maison. Capuche, longueur, tombé : une mise en page qui laisse le vêtement respirer.",
    shot: 'Djellaba en mouvement, capuche relevée, extérieur architectural',
  },
  {
    slug: 'gandouras',
    name: 'Gandouras',
    singular: 'Gandoura',
    no: '03',
    silhouette: 'gandoura',
    intro:
      "Légèreté et ligne droite. La gandoura se lit dans le détail : encolure, finitions, matière — à documenter avec la maison.",
    shot: 'Gandoura de trois-quarts, cadrage serré sur l’encolure',
  },
  {
    slug: 'tenues',
    name: 'Tenues',
    singular: 'Tenue',
    no: '04',
    silhouette: 'tenue',
    intro:
      "Ensembles et pièces coordonnées. Un espace pour montrer la manière dont la maison associe les volumes, les couleurs et les imprimés.",
    shot: 'Ensemble coordonné, assis, cadrage mi-corps',
  },
];

export interface Piece {
  slug: string;
  no: string;
  line: string; // line slug
  title: string;
  colours: string[];
  lead: string;
  views: { label: string; shot: string; crop: 'full' | 'detail' | 'back' | 'motion' }[];
}

const defaultSizes = ['36', '38', '40', '42', '44', '46'];
export const sizes = [...defaultSizes, 'Sur mesure'];

const mk = (
  no: string,
  line: string,
  title: string,
  cols: string[],
  lead: string,
  focus: string,
): Piece => ({
  slug: `etude-${no}`,
  no,
  line,
  title,
  colours: cols,
  lead,
  views: [
    { label: 'Face', shot: `Pièce en pied, face — ${focus}`, crop: 'full' },
    { label: 'Détail', shot: `Macro sur ${focus}`, crop: 'detail' },
    { label: 'Dos', shot: 'Pièce de dos, même lumière, même fond', crop: 'back' },
    { label: 'Mouvement', shot: 'Pièce portée en marche, vitesse lente, léger flou', crop: 'motion' },
  ],
});

export const pieces: Piece[] = [
  mk('01', 'kaftans', 'Kaftan vert, broderie blanche', ['vert', 'blanc', 'nuit'],
    "Long kaftan aux manches amples, rangée de boutons sur le devant et broderie claire sur fond sombre. Texte d’illustration : la description réelle sera rédigée avec la maison.",
    'la broderie du plastron'),
  mk('02', 'kaftans', 'Kaftan à pois', ['pois', 'noir'],
    "Imprimé graphique noir et blanc sur une coupe traditionnelle : l’alliance du classique et de l’inattendu. Texte d’illustration à remplacer.",
    'le motif à pois et les boutons'),
  mk('03', 'kaftans', 'Kaftan nuit', ['nuit', 'noir', 'brique'],
    "Une proposition de soirée, sombre et profonde, pensée pour la lumière artificielle. Texte d’illustration à remplacer.",
    'la manche et sa finition'),
  mk('04', 'djellabas', 'Djellaba capuche, ligne droite', ['eau', 'vert', 'blanc'],
    "Djellaba longue à capuche, tombé droit, fermeture boutonnée. Texte d’illustration : matière et finitions à confirmer.",
    'la capuche et l’encolure'),
  mk('05', 'djellabas', 'Djellaba noire', ['noir', 'nuit'],
    "Le noir comme écrin pour la passementerie claire. Texte d’illustration à remplacer.",
    'la passementerie du devant'),
  mk('06', 'djellabas', 'Djellaba brique', ['brique', 'eau'],
    "Une couleur chaude et franche, portée simplement. Texte d’illustration à remplacer.",
    'le poignet et les boutons'),
  mk('07', 'gandouras', 'Gandoura blanche', ['blanc', 'eau'],
    "Gandoura légère à encolure brodée, coupe droite et fluide. Texte d’illustration à remplacer.",
    'l’encolure brodée'),
  mk('08', 'gandouras', 'Gandoura vert d’eau', ['eau', 'vert'],
    "Une teinte fraîche pour une silhouette de jour. Texte d’illustration à remplacer.",
    'la fente latérale'),
  mk('09', 'gandouras', 'Gandoura à pois', ['pois', 'blanc'],
    "Le pois, signature graphique, sur une forme simple. Texte d’illustration à remplacer.",
    'le motif et l’ourlet'),
  mk('10', 'tenues', 'Tenue deux pièces, vert', ['vert', 'noir'],
    "Tunique et pantalon large coordonnés. Texte d’illustration : composition et tailles à confirmer.",
    'la jonction tunique / pantalon'),
  mk('11', 'tenues', 'Tenue noir & blanc', ['pois', 'noir'],
    "Un ensemble graphique, pensé pour les fêtes comme pour la ville. Texte d’illustration à remplacer.",
    'le contraste des matières'),
  mk('12', 'tenues', 'Tenue brique', ['brique', 'nuit'],
    "Ensemble ample à la couleur affirmée. Texte d’illustration à remplacer.",
    'la ceinture et les plis'),
];

export const lineBySlug = (slug: string) => lines.find((l) => l.slug === slug)!;
export const pieceBySlug = (slug: string) => pieces.find((p) => p.slug === slug);
export const piecesOf = (line: string) => pieces.filter((p) => p.line === line);
export const related = (p: Piece, n = 3) => {
  const same = pieces.filter((x) => x.line === p.line && x.slug !== p.slug);
  const other = pieces.filter((x) => x.line !== p.line && x.colours.some((c) => p.colours.includes(c)));
  return [...same, ...other].slice(0, n);
};
