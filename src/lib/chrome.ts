/** Showcase chrome: menu dialog, piece dialog, click-to-load Instagram embeds, scroll reveal, header state. No storage. */
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

interface PieceData { id: string; name: string; date: string; caption: string; echo: string; post: string; embed: string; swatches: { name: string; hex: string }[] }

/** Builds Instagram's official embed iframe (only ever called from a user click). */
function igFrame(src: string, title: string) {
  const f = document.createElement('iframe');
  f.src = src;
  f.title = title;
  f.loading = 'lazy';
  f.setAttribute('scrolling', 'no');
  f.setAttribute('allowtransparency', 'true');
  f.referrerPolicy = 'strict-origin-when-cross-origin';
  const box = document.createElement('div');
  box.className = 'igf';
  box.append(f);
  return box;
}

function initLightbox() {
  const lb = $<HTMLDialogElement>('#lightbox');
  const dataEl = $('#pieces-data');
  if (!lb || !dataEl) return;
  const data: PieceData[] = JSON.parse(dataEl.textContent || '[]');
  wireDialog(lb);
  const stage = $('[data-lb-stage]', lb)!;
  const embedBtn = $<HTMLButtonElement>('[data-lb-embed]', lb)!;
  const post = $<HTMLAnchorElement>('[data-lb-post]', lb)!;
  const set = (sel: string, t: string) => { $(sel, lb)!.textContent = t; };
  let i = 0;
  const show = (n: number) => {
    i = (n + data.length) % data.length;
    const d = data[i];
    const tpl = $<HTMLTemplateElement>(`#tpl-${d.id}`);
    stage.replaceChildren(tpl ? tpl.content.cloneNode(true) : document.createTextNode(''));
    set('[data-lb-name]', d.name);
    set('[data-lb-date]', d.date);
    set('[data-lb-caption]', `« ${d.caption} »`);
    set('[data-lb-echo]', d.echo);
    set('[data-lb-count]', `${i + 1} / ${data.length}`);
    post.href = d.post;
    embedBtn.hidden = false;
    lb.dataset.piece = d.id;
    $('[data-lb-swatches]', lb)!.replaceChildren(...d.swatches.map((s) => {
      const li = document.createElement('li');
      const dot = document.createElement('i');
      dot.style.background = s.hex;
      dot.setAttribute('aria-hidden', 'true');
      li.append(dot, s.name);
      return li;
    }));
  };
  embedBtn.addEventListener('click', () => {
    const d = data[i];
    stage.replaceChildren(igFrame(d.embed, `Publication Instagram officielle : ${d.name}`));
    embedBtn.hidden = true;
    post.focus();
  });
  $$<HTMLElement>('[data-fiche]').forEach((b) =>
    b.addEventListener('click', () => {
      const n = data.findIndex((d) => d.id === b.dataset.fiche);
      show(n < 0 ? 0 : n);
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
    if (Math.abs(dx) > 40 && stage.querySelector('.plate')) show(i + (dx < 0 ? 1 : -1));
  });
}

/** Inline click-to-load facades for official Instagram posts. */
function initEmbeds() {
  $$<HTMLButtonElement>('[data-embed]').forEach((b) =>
    b.addEventListener('click', () => {
      const box = b.closest('[data-embed-box]')!;
      const f = igFrame(b.dataset.embed!, b.dataset.title ?? 'Publication Instagram officielle');
      box.classList.add('is-loaded');
      b.replaceWith(f);
    }),
  );
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
    new IntersectionObserver(([en]) => hdr.classList.toggle('is-solid', !en.isIntersecting), { rootMargin: '-56px 0px 0px 0px' }).observe(hero);
  }
}
