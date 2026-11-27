import { test, expect, type Page } from '@playwright/test';
import { pages, removed, NOTICE, VERIFIED_HOSTS, SECTIONS, POSTS, THIRD_PARTY } from './pages';

const isMobile = (p: Page) => (p.viewportSize()?.width ?? 1440) <= 1024;

for (const path of pages) {
  test(`/${path} loads: notice, noindex, attribution, no console errors from our code, no 404 assets`, async ({ page, baseURL }) => {
    const errors: string[] = [];
    const bad: string[] = [];
    // Instagram's embed documents log their own errors (permissions policy etc.): recorded separately, not ours.
    page.on('console', (m) => m.type() === 'error' && !THIRD_PARTY.test(`${m.location()?.url ?? ''} ${m.text()}`) && errors.push(`${m.text()} @ ${m.location()?.url}`));
    page.on('pageerror', (e) => errors.push(e.message));
    page.on('response', (r) => { if (r.status() >= 400 && r.url().startsWith(new URL(baseURL!).origin)) bad.push(`${r.status()} ${r.url()}`); });
    const res = await page.goto(path);
    expect(res?.status()).toBe(200);
    await page.waitForLoadState('networkidle');
    await expect(page.locator('[data-notice]')).toHaveText(NOTICE);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
    await expect(page.locator('footer a[href="https://mansourtechnologies.com/"]')).toHaveText('Concept digital proposé par Mansour Technologies.');
    await expect(page.locator('h1')).toHaveCount(1);
    expect(await page.evaluate(() => Object.keys(localStorage).length)).toBe(0);
    expect(errors, errors.join('\n')).toEqual([]);
    expect(bad, bad.join('\n')).toEqual([]);
  });
}

test('no horizontal overflow at all target widths', async ({ page }) => {
  for (const w of [320, 375, 390, 430, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width: w, height: 900 });
    for (const p of pages) {
      await page.goto(p);
      const o = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(o, `${w}px /${p}`).toBeLessThanOrEqual(0);
    }
  }
});

test('anchor navigation scrolls to each section', async ({ page }) => {
  test.skip(isMobile(page), 'desktop nav; mobile covered by menu test');
  await page.goto('');
  for (const id of SECTIONS) {
    await page.locator(`.hdr__nav a[href$="#${id}"]`).click();
    await page.waitForTimeout(100);
    await expect(page).toHaveURL(new RegExp(`#${id}$`));
    await expect.poll(async () => page.locator(`#${id}`).evaluate((el) => Math.round(el.getBoundingClientRect().top))).toBeLessThan(120);
  }
});

test('mobile menu: keyboard open, Escape closes with focus return, link navigates to section', async ({ page }) => {
  test.skip(!isMobile(page), 'mobile only');
  await page.goto('');
  const btn = page.locator('.hdr__menu');
  await btn.focus();
  await page.keyboard.press('Enter');
  const menu = page.locator('#menu');
  await expect(menu).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(menu).toBeHidden();
  await expect(btn).toBeFocused();
  await btn.click();
  await menu.locator('.menu__list a[href$="#contact"]').click();
  await expect(menu).toBeHidden();
  await expect(page).toHaveURL(/#contact$/);
  await expect.poll(async () => page.locator('#contact').evaluate((el) => Math.round(el.getBoundingClientRect().top))).toBeLessThan(120);
});

test('desktop nav is keyboard reachable after the skip link', async ({ page }) => {
  test.skip(isMobile(page), 'desktop only');
  await page.goto('');
  await page.keyboard.press('Tab');
  await expect(page.locator('.skip')).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.locator('.hdr__nav a').first()).toBeFocused();
});

test('hero is drawn, not embedded: KK lockup, the house caption, CTA to the creations', async ({ page }) => {
  await page.goto('');
  const hero = page.locator('[data-hero]');
  await expect(hero.locator('h1')).toHaveText(/Une touche marocaine\s*dans chaque détail/);
  await expect(hero.locator('iframe')).toHaveCount(0);
  await expect(hero.locator('.plate svg[role="img"]').first()).toHaveAttribute('aria-label', /Croquis original/);
  const cta = hero.getByRole('link', { name: 'Découvrir les créations' });
  await cta.click();
  await expect(page).toHaveURL(/#creations$/);
});

test('12 official Instagram embeds: space reserved, lazy-loaded on scroll, unmodified official URLs', async ({ page }) => {
  await page.goto('');
  const boxes = page.locator('[data-ig-src]');
  await expect(boxes).toHaveCount(12);
  expect(await boxes.evaluateAll((els) => els.map((e) => (e as HTMLElement).dataset.igSrc))).toEqual(POSTS.map((c) => `https://www.instagram.com/p/${c}/embed/`));
  // Space is reserved before any iframe exists: height = ratio × width + 208 px (measured Instagram chrome).
  const dims = await boxes.evaluateAll((els) => els.map((e) => { const r = e.getBoundingClientRect(); return { w: r.width, h: r.height, k: parseFloat(getComputedStyle(e.parentElement!).getPropertyValue('--r')) }; }));
  for (const d of dims) expect(Math.abs(d.h - (d.k * d.w + 208))).toBeLessThan(2);
  await page.waitForLoadState('load');
  await page.waitForTimeout(400);
  // Far-below embeds are not loaded at the top of the page.
  await expect(page.locator('#maison iframe, #lookbook iframe')).toHaveCount(0);
  // Scrolling brings them in, no click needed.
  for (const id of ['creations', 'details', 'lookbook', 'maison']) {
    await page.locator(`#${id}`).evaluate((el) => el.scrollIntoView({ block: 'start', behavior: 'instant' }));
    await page.mouse.wheel(0, 1600);
    await page.waitForTimeout(250);
    await page.mouse.wheel(0, 1600);
    await page.waitForTimeout(250);
  }
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await expect(page.locator('[data-ig-src] iframe')).toHaveCount(12, { timeout: 15000 });
  const srcs = await page.locator('[data-ig-src] iframe').evaluateAll((fs) => fs.map((f) => (f as HTMLIFrameElement).src));
  for (const s of srcs) expect(s).toMatch(/^https:\/\/www\.instagram\.com\/p\/[\w-]+\/embed\/$/);
  await expect(page.locator('[data-ig-src] iframe').first()).toHaveAttribute('title', /Publication Instagram officielle de @kuskusikouture/);
  // A plain link to every post stays available (no-JS fallback / failure path).
  await expect(page.locator('a.ig__wait[href^="https://www.instagram.com/p/"]')).toHaveCount(12);
});

test('every external contact/social link is https, verified host, new tab with noopener', async ({ page }) => {
  for (const p of pages) {
    await page.goto(p);
    const links = await page.$$eval('a[href^="http"]', (as) => as.map((a) => ({ href: (a as HTMLAnchorElement).href, target: a.getAttribute('target'), rel: a.getAttribute('rel') ?? '' })));
    const ext = links.filter((l) => !l.href.includes('mansour-technologies.github.io') && !l.href.startsWith('http://localhost'));
    expect(ext.filter((l) => /cdninstagram|scontent|fbcdn/.test(l.href))).toEqual([]);
    expect(ext.length).toBeGreaterThan(3);
    for (const l of ext) {
      const u = new URL(l.href);
      expect(u.protocol, l.href).toBe('https:');
      expect(VERIFIED_HOSTS, l.href).toContain(u.hostname);
      if (u.hostname !== 'mansourtechnologies.com') {
        expect(l.target, l.href).toBe('_blank');
        expect(l.rel, l.href).toContain('noopener');
      }
    }
  }
  await page.goto('');
  await expect(page.locator('#contact a.ct__dm')).toHaveAttribute('href', 'https://ig.me/m/kuskusikouture');
  await expect(page.locator('#contact a[href="https://www.facebook.com/KuskusiZhorKouture/"]')).toHaveCount(1);
  await expect(page.locator('.hdr__dm, .hero a[href="https://ig.me/m/kuskusikouture"]').first()).toBeAttached();
  await expect(page.locator('a[href*="wa.me"]')).toHaveCount(0); // WhatsApp hidden until approved
});

test('internal links resolve', async ({ page, request, baseURL }) => {
  const origin = new URL(baseURL!).origin;
  const seen = new Set<string>();
  for (const p of pages) {
    await page.goto(p);
    const hrefs = await page.$$eval('a[href]', (as) => as.map((a) => a.getAttribute('href')!));
    expect(hrefs.filter((h) => h === '#' || h === '')).toEqual([]);
    for (const h of await page.$$eval('a[href]', (as) => as.map((a) => (a as HTMLAnchorElement).href))) if (h.startsWith(origin)) seen.add(h.split('#')[0]);
    for (const id of (await page.$$eval('a[href*="#"]', (as) => as.map((a) => (a as HTMLAnchorElement).hash.slice(1)))).filter(Boolean)) {
      if (new URL(page.url()).pathname.endsWith('/kuskusi-kouture-website-concept/')) expect(await page.locator(`[id="${id}"]`).count(), `#${id}`).toBe(1);
    }
  }
  for (const u of seen) expect((await request.get(u)).status(), u).toBe(200);
});

test('removed app routes are gone (404)', async ({ request }) => {
  for (const r of removed) expect((await request.get(r)).status(), r).toBe(404);
});

test('robots.txt disallows all', async ({ request }) => {
  expect(await (await request.get('robots.txt')).text()).toContain('Disallow: /');
});
