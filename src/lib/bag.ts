/**
 * Demo "sélection" (enquiry bag) — localStorage, robust to corrupt / foreign data.
 * Nothing is ever sent anywhere.
 */
import { pieces, colours, sizes, lines } from '../data/pieces';

export const KEY = 'kk-selection-v1';
export const MAX_QTY = 9;

export interface BagItem {
  slug: string;
  colour: string;
  size: string;
  qty: number;
}

const valid = (x: unknown): x is BagItem => {
  if (!x || typeof x !== 'object') return false;
  const i = x as Record<string, unknown>;
  const p = pieces.find((pp) => pp.slug === i.slug);
  return (
    !!p &&
    typeof i.colour === 'string' &&
    p.colours.includes(i.colour) &&
    typeof i.size === 'string' &&
    sizes.includes(i.size) &&
    Number.isInteger(i.qty) &&
    (i.qty as number) >= 1
  );
};

export const lineKey = (i: Pick<BagItem, 'slug' | 'colour' | 'size'>) => `${i.slug}|${i.colour}|${i.size}`;

export function read(): BagItem[] {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(KEY);
  } catch {
    return [];
  }
  if (!raw) return [];
  try {
    const data = JSON.parse(raw);
    if (!Array.isArray(data)) throw new Error('shape');
    const merged = new Map<string, BagItem>();
    for (const it of data.filter(valid)) {
      const k = lineKey(it);
      const prev = merged.get(k);
      merged.set(k, { slug: it.slug, colour: it.colour, size: it.size, qty: Math.min(MAX_QTY, (prev?.qty ?? 0) + it.qty) });
    }
    return [...merged.values()];
  } catch {
    try { localStorage.removeItem(KEY); } catch { /* ignore */ }
    return [];
  }
}

function write(items: BagItem[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(items));
  } catch { /* storage unavailable: state lives for this page only */ }
  memory = items;
  document.dispatchEvent(new CustomEvent('bag:change', { detail: items }));
}

let memory: BagItem[] | null = null;
export const items = () => (memory = read());
export const count = () => items().reduce((n, i) => n + i.qty, 0);

export function add(it: Omit<BagItem, 'qty'>, qty = 1) {
  if (!valid({ ...it, qty })) return false;
  const list = items();
  const found = list.find((x) => lineKey(x) === lineKey(it));
  if (found) found.qty = Math.min(MAX_QTY, found.qty + qty);
  else list.push({ ...it, qty });
  write(list);
  return true;
}
export function setQty(key: string, qty: number) {
  const list = items();
  const it = list.find((x) => lineKey(x) === key);
  if (!it) return;
  if (qty < 1) return remove(key);
  it.qty = Math.min(MAX_QTY, Math.floor(qty));
  write(list);
}
export function remove(key: string) {
  write(items().filter((x) => lineKey(x) !== key));
}
export function clear() {
  write([]);
}

export const describe = (i: BagItem) => {
  const p = pieces.find((pp) => pp.slug === i.slug)!;
  const l = lines.find((ll) => ll.slug === p.line)!;
  const c = colours[i.colour];
  return { piece: p, line: l, colour: c };
};
