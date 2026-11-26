/** Showcase chrome: menu dialog, gallery lightbox, scroll reveal, header state. No storage, no app state. */
const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => [...r.querySelectorAll<T>(s)];

const openers = new WeakMap<HTMLDialogElement, Element | null>();
function openDialog(d: HTMLDialogElement) {
  if (d.open) return;
  openers.set(d, document.activeElement);
  d.showModal();
  document.documentElement.style.overflow = 'hidden';
}
function wireDialog(d: HTMLDialogElement, restoreFocus = true) {
  d.addEventListener('close', () => {
    document.documentElement.style.overflow = '';
    const o = openers.get(d) as HTMLElement | null;
    if (restoreFocus && o && document.contains(o)) o.focus({ preventScroll: true });
  });
  d.addEventListener('click', (e) => {
    if (e.target === d) d.close();
  });
  $$('[data-close]', d).forEach((b) => b.addEventListener('click', () => d.close()));
}

function initLightbox() {
  const lb = $<HTMLDialogElement>('#lightbox');
  const items = $$<HTMLButtonElement>('[data-lb]');
  if (!lb || !items.length) return;
  wireDialog(lb);
  const stage = $('[data-lb-stage]', lb)!;
  const ref = $('[data-lb-ref]', lb)!;
  const line = $('[data-lb-line]', lb)!;
  const shot = $('[data-lb-shot]', lb)!;
  const count = $('[data-lb-count]', lb)!;
  let i = 0;
  const show = (n: number) => {
    i = (n + items.length) % items.length;
    const b = items[i];
    const fig = b.querySelector('.plate')!.cloneNode(true) as HTMLElement;
    fig.style.removeProperty('view-transition-name');
    stage.replaceChildren(fig);
    ref.textContent = b.dataset.ref ?? '';
    line.textContent = b.dataset.line ?? '';
    shot.textContent = b.dataset.shot ?? '';
    count.textContent = `${i + 1} / ${items.length}`;
  };
  items.forEach((b, n) =>
    b.addEventListener('click', () => {
      show(n);
      openDialog(lb);
    }),
  );
  $('[data-lb-prev]', lb)!.addEventListener('click', () => show(i - 1));
  $('[data-lb-next]', lb)!.addEventListener('click', () => show(i + 1));
  lb.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); show(i + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); show(i - 1); }
  });
  let x0: number | null = null;
  stage.addEventListener('pointerdown', (e) => { x0 = e.clientX; });
  stage.addEventListener('pointerup', (e) => {
    if (x0 === null) return;
    const dx = e.clientX - x0;
    x0 = null;
    if (Math.abs(dx) > 40) show(i + (dx < 0 ? 1 : -1));
  });
}

export function initChrome() {
  const menu = $<HTMLDialogElement>('#menu');
  if (menu) {
    wireDialog(menu, false);
    $$('[data-open-menu]').forEach((b) => b.addEventListener('click', () => openDialog(menu)));
    // Links close the menu; the browser then follows the anchor / page link.
    $$('a', menu).forEach((a) => a.addEventListener('click', () => menu.close()));
    // Escape / Fermer: return focus to the button that opened it.
    menu.addEventListener('cancel', () => (openers.get(menu) as HTMLElement | null)?.focus());
    $$('[data-close]', menu).forEach((b) => b.addEventListener('click', () => (openers.get(menu) as HTMLElement | null)?.focus()));
  }
  initLightbox();

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
    new IntersectionObserver(([en]) => hdr.classList.toggle('is-solid', !en.isIntersecting), { rootMargin: '-56px 0px 0px 0px' }).observe(hero);
  }
}
