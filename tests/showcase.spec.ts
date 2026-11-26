import { test, expect, type Page } from '@playwright/test';
import { pages, removed, NOTICE, VERIFIED_HOSTS, SECTIONS } from './pages';

const isMobile = (p: Page) => (p.viewportSize()?.width ?? 1440) <= 1024;

for (const path of pages) {
  test(`/${path} loads: notice, noindex, attribution, no console errors, no 404 assets`, async ({ page, baseURL }) => {
    const errors: string[] = [];
    const bad: string[] = [];
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
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
  await menu.getByRole('link', { name: /Contact/ }).click();
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

test('gallery lightbox: opens on click, next/prev + arrows, Escape closes, focus returns', async ({ page }) => {
  await page.goto('');
  const items = page.locator('[data-lb]');
  expect(await items.count()).toBe(14);
  const first = items.nth(0);
  await first.scrollIntoViewIfNeeded();
  await first.click();
  const lb = page.locator('#lightbox');
  await expect(lb).toBeVisible();
  await expect(lb.locator('[data-lb-ref]')).toHaveText('KA-01');
  await expect(lb.locator('[data-lb-count]')).toHaveText('1 / 14');
  await expect(lb.locator('[data-lb-stage] .plate')).toHaveCount(1);
  await lb.locator('[data-lb-next]').click();
  await expect(lb.locator('[data-lb-ref]')).toHaveText('KA-02');
  await page.keyboard.press('ArrowLeft');
  await page.keyboard.press('ArrowLeft');
  await expect(lb.locator('[data-lb-ref]')).toHaveText('TE-04');
  await expect(lb.locator('a.lb__cta')).toHaveAttribute('href', 'https://ig.me/m/kuskusikouture');
  await page.keyboard.press('Escape');
  await expect(lb).toBeHidden();
  await expect(first).toBeFocused();
});

test('every external contact/social link is https, verified host, new tab with noopener', async ({ page }) => {
  for (const p of pages) {
    await page.goto(p);
    const links = await page.$$eval('a[href^="http"]', (as) => as.map((a) => ({ href: (a as HTMLAnchorElement).href, target: a.getAttribute('target'), rel: a.getAttribute('rel') ?? '' })));
    const ext = links.filter((l) => !l.href.includes('mansour-technologies.github.io') && !l.href.startsWith('http://localhost'));
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
