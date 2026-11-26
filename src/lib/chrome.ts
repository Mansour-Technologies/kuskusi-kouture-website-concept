/** Site chrome: dialogs (menu, bag drawer), bag counters, reveal, header state, toast. */
import * as bag from './bag';

const BASE = import.meta.env.BASE_URL.replace(/\/?$/, '/');
const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => [...r.querySelectorAll<T>(s)];

export function announce(msg: string) {
  const live = $('[data-live]');
  if (live) {
    live.textContent = '';
    window.setTimeout(() => (live.textContent = msg), 30);
  }
}

let toastTimer = 0;
export function toast(msg: string, action?: { label: string; run: () => void }) {
  const t = $('[data-toast]');
  if (!t) return;
  t.innerHTML = '';
  const span = document.createElement('span');
  span.textContent = msg;
  t.append(span);
  if (action) {
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = action.label;
    b.addEventListener('click', () => { action.run(); t.hidden = true; });
    t.append(b);
  }
  t.hidden = false;
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => (t.hidden = true), 4200);
}

/** Accessible dialog open with focus return. Native showModal() traps focus + handles Escape. */
const openers = new WeakMap<HTMLDialogElement, Element | null>();
export function openDialog(d: HTMLDialogElement) {
  if (d.open) return;
  openers.set(d, document.activeElement);
  d.showModal();
  document.documentElement.style.overflow = 'hidden';
}
export function wireDialog(d: HTMLDialogElement) {
  d.addEventListener('close', () => {
    document.documentElement.style.overflow = '';
    const o = openers.get(d) as HTMLElement | null;
    if (o && document.contains(o)) o.focus();
  });
  // click on backdrop closes
  d.addEventListener('click', (e) => {
    if (e.target === d) d.close();
  });
  $$('[data-close]', d).forEach((b) => b.addEventListener('click', () => d.close()));
}

export const swatch = (c: { cloth: string; stitch: string; pattern?: string }, no: string) =>
  `<span class="bl__sw" style="--sw:${c.cloth};--swc:${c.stitch}" ${c.pattern ? 'data-pois' : ''} aria-hidden="true">${c.pattern ? '' : no}</span>`;

export function renderLines(host: HTMLElement, opts: { headingLevel?: number } = {}) {
  const list = bag.items();
  if (!list.length) {
    host.innerHTML = `<div class="empty"><h${opts.headingLevel ?? 3} class="serif">Votre sélection est vide.</h${opts.headingLevel ?? 3}>
      <p class="muted">Ajoutez des pièces depuis les créations pour préparer une demande à la maison.</p>
      <a class="link" href="${BASE}collections/">Voir les créations</a></div>`;
    return;
  }
  host.innerHTML = `<ul class="bl-list" style="list-style:none;margin:0;padding:0">${list
    .map((i) => {
      const { piece, line, colour } = bag.describe(i);
      const k = bag.lineKey(i);
      return `<li class="bl" data-key="${k}">
        ${swatch(colour, piece.no)}
        <div>
          <a class="bl__t" href="${BASE}creations/${piece.slug}/">${line.singular} — Étude n°${piece.no}</a>
          <p class="bl__m">${colour.name} · Taille ${i.size}</p>
          <div class="qty" role="group" aria-label="Quantité pour Étude n°${piece.no}">
            <button type="button" data-dec aria-label="Diminuer la quantité">−</button>
            <output aria-live="off">${i.qty}</output>
            <button type="button" data-inc aria-label="Augmenter la quantité" ${i.qty >= bag.MAX_QTY ? 'disabled' : ''}>+</button>
          </div>
        </div>
        <button type="button" class="bl__rm" data-rm>Retirer<span class="sr-only"> Étude n°${piece.no}</span></button>
      </li>`;
    })
    .join('')}</ul>`;
}

function wireLines(host: HTMLElement) {
  host.addEventListener('click', (e) => {
    const t = e.target as HTMLElement;
    const li = t.closest<HTMLElement>('[data-key]');
    if (!li) return;
    const key = li.dataset.key!;
    const cur = bag.items().find((x) => bag.lineKey(x) === key);
    if (!cur) return;
    const name = `Étude n°${bag.describe(cur).piece.no}`;
    if (t.closest('[data-inc]')) { bag.setQty(key, cur.qty + 1); announce(`${name} : quantité ${Math.min(bag.MAX_QTY, cur.qty + 1)}`); refocus(host, key, '[data-inc]'); }
    else if (t.closest('[data-dec]')) {
      if (cur.qty <= 1) removeWithUndo(cur, name, host);
      else { bag.setQty(key, cur.qty - 1); announce(`${name} : quantité ${cur.qty - 1}`); refocus(host, key, '[data-dec]'); }
    } else if (t.closest('[data-rm]')) removeWithUndo(cur, name, host);
  });
}
function refocus(host: HTMLElement, key: string, sel: string) {
  const el = host.querySelector<HTMLElement>(`[data-key="${CSS.escape(key)}"] ${sel}`);
  el?.focus();
}
function removeWithUndo(cur: bag.BagItem, name: string, host: HTMLElement) {
  bag.remove(bag.lineKey(cur));
  announce(`${name} retirée de la sélection`);
  toast(`${name} retirée.`, { label: 'Annuler', run: () => { bag.add(cur, cur.qty); announce(`${name} remise dans la sélection`); } });
  (host.querySelector<HTMLElement>('[data-rm], a') ?? host.closest('dialog')?.querySelector<HTMLElement>('[data-close]') ?? null)?.focus();
}

export function initChrome() {
  const menu = $<HTMLDialogElement>('#menu');
  const drawer = $<HTMLDialogElement>('#bag');
  [menu, drawer].forEach((d) => d && wireDialog(d));
  $$('[data-open-menu]').forEach((b) => b.addEventListener('click', () => menu && openDialog(menu)));
  $$('[data-open-bag]').forEach((b) => b.addEventListener('click', () => drawer && openDialog(drawer)));

  const list = $('[data-bag-list]');
  const foot = $('[data-bag-foot]');
  if (list) wireLines(list);
  $('[data-bag-clear]')?.addEventListener('click', () => {
    const snapshot = bag.items();
    bag.clear();
    announce('Sélection vidée');
    toast('Sélection vidée.', { label: 'Annuler', run: () => snapshot.forEach((s) => bag.add(s, s.qty)) });
  });

  let prev = -1;
  const sync = () => {
    const n = bag.count();
    $$('[data-bag-count]').forEach((c) => {
      c.textContent = String(n);
      if (prev >= 0 && n !== prev) { c.classList.remove('bump'); void c.offsetWidth; c.classList.add('bump'); }
    });
    prev = n;
    if (list) renderLines(list);
    if (foot) foot.hidden = n === 0;
  };
  document.addEventListener('bag:change', sync);
  window.addEventListener('storage', (e) => e.key === bag.KEY && sync());
  sync();

  // reveal on view
  const els = $$('.rv');
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const io = new IntersectionObserver((ents) => ents.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }), { rootMargin: '0px 0px -8% 0px' });
    els.forEach((e) => io.observe(e));
  } else els.forEach((e) => e.classList.add('in'));

  // header turns solid after the dark hero
  const hdr = $('[data-header]');
  const hero = $('[data-hero]');
  if (hdr && hero && 'IntersectionObserver' in window) {
    const h = new IntersectionObserver(([en]) => hdr.classList.toggle('is-solid', !en.isIntersecting), { rootMargin: '-56px 0px 0px 0px' });
    h.observe(hero);
  }
}

export { bag };
