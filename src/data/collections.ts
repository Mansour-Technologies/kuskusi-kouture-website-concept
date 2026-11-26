/**
 * Collections gallery.
 * VERIFIED: the four lines (gandouras, djellabas, kaftans, tenues) come from the house's public
 * Facebook page description. Every visual is an original placeholder ("plate") describing the
 * photograph to commission; references are demonstration labels. No prices, no stock.
 */
export type Silhouette = 'kaftan' | 'djellaba' | 'gandoura' | 'tenue';
export type Crop = 'full' | 'detail' | 'back' | 'motion';

export interface Colour { id: string; name: string; cloth: string; stitch: string; field: string; pattern?: 'pois'; }

export const colours: Record<string, Colour> = {
  vert: { id: 'vert', name: 'Vert bouteille', cloth: '#1f4636', stitch: '#f6f4ee', field: '#d9ddd3' },
  blanc: { id: 'blanc', name: 'Blanc cassé', cloth: '#f3f1ea', stitch: '#17362a', field: '#1f4636' },
  noir: { id: 'noir', name: 'Noir', cloth: '#161615', stitch: '#f6f4ee', field: '#c9c7bf' },
  pois: { id: 'pois', name: 'Pois noir & blanc', cloth: '#f3f1ea', stitch: '#161615', field: '#161615', pattern: 'pois' },
  eau: { id: 'eau', name: "Vert d'eau", cloth: '#a8b9a7', stitch: '#17362a', field: '#f3f1ea' },
  brique: { id: 'brique', name: 'Brique', cloth: '#8e3b28', stitch: '#f6f4ee', field: '#e7e4dc' },
  nuit: { id: 'nuit', name: 'Bleu nuit', cloth: '#1d2534', stitch: '#e9e6dc', field: '#a8b9a7' },
};

export interface Look { ref: string; colour: string; crop: Crop; shot: string; }
export interface Line {
  slug: string; name: string; singular: string; no: string; silhouette: Silhouette;
  /** Neutral description of the garment type — not a claim about the house's techniques. */
  about: string;
  intro: string;
  looks: Look[];
}

export const lines: Line[] = [
  {
    slug: 'kaftans', name: 'Kaftans', singular: 'Kaftan', no: '01', silhouette: 'kaftan',
    about: 'La robe longue des grandes occasions, ouverte ou boutonnée sur le devant.',
    intro: 'La pièce de cérémonie, présentée comme une galerie : en pied, puis au plus près des boutons et de la broderie.',
    looks: [
      { ref: 'KA-01', colour: 'vert', crop: 'full', shot: 'kaftan vert à broderie blanche, en pied, fond pâle, lumière du nord' },
      { ref: 'KA-02', colour: 'pois', crop: 'full', shot: 'kaftan à pois contre un mur noir, flash direct' },
      { ref: 'KA-03', colour: 'pois', crop: 'detail', shot: 'macro sur la rangée de boutons et le motif à pois' },
      { ref: 'KA-04', colour: 'nuit', crop: 'motion', shot: 'kaftan bleu nuit en mouvement, lumière de soirée' },
    ],
  },
  {
    slug: 'djellabas', name: 'Djellabas', singular: 'Djellaba', no: '02', silhouette: 'djellaba',
    about: 'Le vêtement long à capuche, au tombé droit, du quotidien comme des jours de fête.',
    intro: 'La silhouette du quotidien élevée au rang de pièce de maison : capuche, longueur, tombé.',
    looks: [
      { ref: 'DJ-01', colour: 'eau', crop: 'full', shot: 'djellaba vert d’eau, capuche relevée, contre-jour' },
      { ref: 'DJ-02', colour: 'noir', crop: 'back', shot: 'djellaba noire de dos, lumière rasante' },
      { ref: 'DJ-03', colour: 'brique', crop: 'full', shot: 'djellaba brique dans une ruelle blanche' },
    ],
  },
  {
    slug: 'gandouras', name: 'Gandouras', singular: 'Gandoura', no: '03', silhouette: 'gandoura',
    about: 'La tunique longue et légère, à manches courtes ou sans manches.',
    intro: 'Légèreté et ligne droite : la gandoura se lit dans l’encolure et le tombé.',
    looks: [
      { ref: 'GA-01', colour: 'blanc', crop: 'full', shot: 'gandoura blanche sur fond vert bouteille, plan large' },
      { ref: 'GA-02', colour: 'eau', crop: 'detail', shot: 'cadrage serré sur l’encolure brodée' },
      { ref: 'GA-03', colour: 'pois', crop: 'motion', shot: 'gandoura à pois au vent, terrasse' },
    ],
  },
  {
    slug: 'tenues', name: 'Tenues', singular: 'Tenue', no: '04', silhouette: 'tenue',
    about: 'Ensembles et pièces coordonnées, tunique et pantalon.',
    intro: 'Les ensembles : la manière dont la maison associe volumes, couleurs et imprimés.',
    looks: [
      { ref: 'TE-01', colour: 'vert', crop: 'full', shot: 'ensemble vert, debout, cadrage mi-corps' },
      { ref: 'TE-02', colour: 'brique', crop: 'full', shot: 'tenue brique, assise sur un banc de pierre' },
      { ref: 'TE-03', colour: 'pois', crop: 'detail', shot: 'détail de la jonction tunique et pantalon' },
      { ref: 'TE-04', colour: 'noir', crop: 'back', shot: 'ensemble noir de dos, ombre portée nette' },
    ],
  },
];
