/** Base-aware internal URL helper (GitHub Pages project site). */
const BASE = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;
export const url = (path = '') => `${BASE}${path.replace(/^\/+/, '')}`;
