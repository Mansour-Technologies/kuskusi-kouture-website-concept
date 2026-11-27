/** Showcase chrome: menu dialog, lazy official Instagram embeds, scroll reveal, header state. No storage. */
const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => [...r.querySelectorAll<T>(s)];

function initMenu() {
  const menu = $<HTMLDialogElement>('#menu');
  if (!menu) return;
  let opener: HTMLElement | null = null;
  const close = () => {
    menu.close();
  };
  menu.addEventListener('close', () => {
    document.documentElement.style.overflow = '';
  });
  $$('[data-open-menu]').forEach((b) =>
    b.addEventListener('click', () => {
      opener = b;
      menu.showModal();
      document.documentElement.style.overflow = 'hidden';
    }),
  );
  menu.addEventListener('click', (e) => { if (e.target === menu) close(); });
  // Links close the menu; the browser then follows the anchor.
  $$('a', menu).forEach((a) => a.addEventListener('click', close));
  // Escape / Fermer: return focus to the button that opened it.
  menu.addEventListener('cancel', () => opener?.focus());
  $$('[data-close]', menu).forEach((b) => b.addEventListener('click', () => { close(); opener?.focus(); }));
}

/**
 * Official Instagram embeds, created only when their reserved box comes near the viewport
 * (observation starts after the page has loaded, so the hero and its LCP never wait on Instagram).
 * Instagram's embed posts a MEASURE message with its real height; the box adopts it if it differs.
 */
function initEmbeds() {
  const boxes = $$('[data-ig-src]');
  if (!boxes.length) return;
  const frames = new Map<Window, HTMLElement>();
  const load = (box: HTMLElement) => {
    if (box.dataset.loaded) return;
    box.dataset.loaded = 'true';
    const f = document.createElement('iframe');
    f.src = box.dataset.igSrc!;
    f.title = box.dataset.igTitle ?? 'Publication Instagram officielle';
    f.setAttribute('scrolling', 'no');
    f.setAttribute('allowtransparency', 'true');
    f.referrerPolicy = 'strict-origin-when-cross-origin';
    f.addEventListener('load', () => box.classList.add('is-in'), { once: true });
    box.append(f);
    if (f.contentWindow) frames.set(f.contentWindow, box);
  };
  window.addEventListener('message', (e) => {
    if (e.origin !== 'https://www.instagram.com') return;
    const box = frames.get(e.source as Window);
    if (!box) return;
    let d: { type?: string; details?: { height?: number } } | null = null;
    try { d = typeof e.data === 'string' ? JSON.parse(e.data) : e.data; } catch { return; }
    const h = d?.type === 'MEASURE' ? Number(d.details?.height) : 0;
    if (h > 200 && Math.abs(h - box.getBoundingClientRect().height) > 2) box.style.height = `${h}px`;
  });
  if (!('IntersectionObserver' in window)) { boxes.forEach(load); return; }
  const io = new IntersectionObserver(
    (ents) => ents.forEach((en) => { if (en.isIntersecting) { load(en.target as HTMLElement); io.unobserve(en.target); } }),
    { rootMargin: '320px 0px' },
  );
  const start = () => boxes.forEach((b) => io.observe(b));
  if (document.readyState === 'complete') start();
  else window.addEventListener('load', start, { once: true });
}

export function initChrome() {
  initMenu();
  initEmbeds();

  const els = $$('.rv');
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const io = new IntersectionObserver(
      (ents) => ents.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }),
      { rootMargin: '0px 0px -8% 0px' },
    );
    els.forEach((e) => io.observe(e));
  } else els.forEach((e) => e.classList.add('in'));

  const hdr = $('[data-header]');
  const hero = $('[data-hero]');
  if (hdr && hero && 'IntersectionObserver' in window) {
    new IntersectionObserver(([en]) => hdr.classList.toggle('is-solid', !en.isIntersecting), { rootMargin: '-64px 0px 0px 0px' }).observe(hero);
  }
}
