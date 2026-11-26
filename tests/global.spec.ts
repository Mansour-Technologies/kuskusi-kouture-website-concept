import { test, expect } from '@playwright/test';
import { pages, NOTICE } from './pages';

for (const path of pages) {
  test(`page /${path} — notice, noindex, no errors, no 404 assets, no overflow`, async ({ page, baseURL }) => {
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
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(0);
    expect(errors, errors.join('\n')).toEqual([]);
    expect(bad, bad.join('\n')).toEqual([]);
  });
}

test('every internal link resolves (no broken links, no href="#")', async ({ page, request, baseURL }) => {
  const origin = new URL(baseURL!).origin;
  const seen = new Set<string>();
  for (const path of pages) {
    await page.goto(path);
    const hrefs = await page.$$eval('a[href]', (as) => as.map((a) => (a as HTMLAnchorElement).getAttribute('href')!));
    expect(hrefs.filter((h) => h === '#' || h === '')).toEqual([]);
    for (const h of await page.$$eval('a[href]', (as) => as.map((a) => (a as HTMLAnchorElement).href))) {
      if (h.startsWith(origin)) seen.add(h.split('#')[0].split('?')[0]);
    }
  }
  for (const u of seen) {
    const r = await request.get(u);
    expect(r.status(), u).toBe(200);
  }
});

test('responsive widths have no horizontal overflow', async ({ page }) => {
  for (const w of [320, 375, 390, 430, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width: w, height: 900 });
    for (const p of ['', 'collections/', 'creations/etude-01/', 'lookbook/', 'selection/']) {
      await page.goto(p);
      const o = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(o, `${w}px /${p}`).toBeLessThanOrEqual(0);
    }
  }
});

test('robots.txt disallows all', async ({ request }) => {
  const r = await request.get('robots.txt');
  expect(await r.text()).toContain('Disallow: /');
});
