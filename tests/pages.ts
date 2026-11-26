export const pages = [
  '', 'collections/', 'collections/kaftans/', 'collections/djellabas/', 'collections/gandouras/', 'collections/tenues/',
  ...Array.from({ length: 12 }, (_, i) => `creations/etude-${String(i + 1).padStart(2, '0')}/`),
  'lookbook/', 'maison/', 'contact/', 'selection/',
];
export const NOTICE = 'Concept de site internet proposé par Mansour Technologies — Démonstration non officielle.';
