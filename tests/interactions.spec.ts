import { test, expect, type Page } from '@playwright/test';

const isMobile = (p: Page) => (p.viewportSize()?.width ?? 1440) < 861;
const openBag = async (page: Page) => {
  await page.locator(isMobile(page) ? '.thumb [data-open-bag]' : '.hdr__bag').click();
  await expect(page.locator('#bag')).toBeVisible();
};

test.beforeEach(async ({ page }) => {
  await page.goto('');
  await page.evaluate(() => localStorage.clear());
});

test('collection navigation: home → line → piece → back to line', async ({ page }) => {
  await page.goto('collections/');
  await page.locator('.c-lines a', { hasText: 'Djellabas' }).click();
  await expect(page).toHaveURL(/collections\/djellabas\/$/);
  await expect(page.locator('h1')).toHaveText('Djellabas');
  await expect(page.locator('.card')).toHaveCount(3);
  await page.locator('.card__a').first().click();
  await expect(page).toHaveURL(/creations\/etude-04\/$/);
  await page.locator('.crumbs a', { hasText: 'Djellabas' }).click();
  await expect(page).toHaveURL(/collections\/djellabas\/$/);
});

test('product filtering by line and colour, with empty state and reset', async ({ page }) => {
  await page.goto('collections/');
  const visible = page.locator('[data-grid] .card:visible');
  await expect(visible).toHaveCount(12);
  await page.locator('button[data-line="kaftans"]').click();
  await expect(page.locator('button[data-line="kaftans"]')).toHaveAttribute('aria-pressed', 'true');
  await expect(visible).toHaveCount(3);
  await expect(page).toHaveURL(/ligne=kaftans/);
  await page.selectOption('[data-colour]', 'pois');
  await expect(visible).toHaveCount(1);
  await page.locator('button[data-line="djellabas"]').click();
  await expect(visible).toHaveCount(0);
  await expect(page.locator('[data-empty]')).toBeVisible();
  await page.locator('[data-reset]').click();
  await expect(visible).toHaveCount(12);
  // deep link
  await page.goto('collections/?ligne=tenues');
  await expect(visible).toHaveCount(3);
});

test('gallery: thumbnails / swipe track, counter, zoom dialog with Escape + focus return', async ({ page }) => {
  await page.goto('creations/etude-01/');
  const set = page.locator('.gal__set:not([hidden])');
  if (!isMobile(page)) {
    await set.locator('[data-go="2"]').click();
    await expect(set.locator('[data-go="2"]')).toHaveAttribute('aria-current', 'true');
  } else {
    await set.locator('[data-track]').evaluate((t) => t.scrollTo({ left: t.clientWidth * 2 }));
  }
  await expect(set.locator('[data-counter]')).toHaveText('3 / 4');
  const zoomBtn = set.locator('[data-zoom]').nth(2);
  await zoomBtn.click();
  const z = page.locator('#zoom');
  await expect(z).toBeVisible();
  await z.locator('[data-zoom-toggle]').click();
  await expect(z.locator('[data-zoom-toggle]')).toHaveAttribute('aria-pressed', 'true');
  await page.keyboard.press('Escape');
  await expect(z).toBeHidden();
  await expect(zoomBtn).toBeFocused();
});

test('variant selection: colour swaps gallery, size required, size guide dialog', async ({ page }) => {
  await page.goto('creations/etude-01/');
  await expect(page.locator('[data-colour-name]')).toHaveText('Vert bouteille');
  await page.locator('label.sw__i').nth(2).click();
  await expect(page.locator('[data-colour-name]')).toHaveText('Bleu nuit');
  await expect(page.locator('[data-set="nuit"]')).toBeVisible();
  await expect(page.locator('[data-set="vert"]')).toBeHidden();
  await page.locator('button.add').click();
  await expect(page.locator('[data-size-err]')).toBeVisible();
  await page.locator('.sz__i', { hasText: '42' }).click();
  await expect(page.locator('[data-size-name]')).toHaveText('42');
  await expect(page.locator('[data-size-err]')).toBeHidden();
  await page.locator('[data-open-guide]').click();
  await expect(page.locator('#guide')).toBeVisible();
  await expect(page.locator('#guide table tbody tr')).toHaveCount(6);
  await page.keyboard.press('Escape');
  await expect(page.locator('#guide')).toBeHidden();
  await expect(page.locator('[data-open-guide]')).toBeFocused();
});

test('add to bag, quantity, remove, empty state, persistence across reload', async ({ page }) => {
  await page.goto('creations/etude-02/');
  await page.locator('.sz__i', { hasText: '38' }).click();
  await page.locator('[data-q="1"]').click();
  await page.locator('button.add').click();
  await expect(page.locator('[data-bag-count]').first()).toHaveText('2');
  await page.goto('creations/etude-07/');
  await page.locator('.sz__i', { hasText: 'Sur mesure' }).click();
  await page.locator('button.add').click();
  await expect(page.locator('[data-bag-count]').first()).toHaveText('3');
  await page.reload();
  await expect(page.locator('[data-bag-count]').first()).toHaveText('3');
  await openBag(page);
  const lines = page.locator('#bag .bl');
  await expect(lines).toHaveCount(2);
  await lines.first().locator('[data-inc]').click();
  await expect(lines.first().locator('output')).toHaveText('3');
  await lines.first().locator('[data-dec]').click();
  await expect(lines.first().locator('output')).toHaveText('2');
  await lines.nth(1).locator('[data-rm]').click();
  await expect(lines).toHaveCount(1);
  await page.keyboard.press('Escape');
  await page.goto('selection/');
  await expect(page.locator('[data-sel-list] .bl')).toHaveCount(1);
  await page.locator('[data-compose]').click();
  await expect(page.locator('[data-msg-text]')).toHaveValue(/Étude n°02.*taille 38.*quantité 2/);
  await page.locator('[data-sel-list] [data-rm]').click();
  await expect(page.locator('[data-sel-list] .empty')).toBeVisible();
  await expect(page.locator('[data-sel-side]')).toBeHidden();
});

test('bag is robust to corrupt and foreign localStorage data', async ({ page }) => {
  await page.evaluate(() => localStorage.setItem('kk-selection-v1', '{not json'));
  await page.goto('selection/');
  await expect(page.locator('[data-sel-list] .empty')).toBeVisible();
  await page.evaluate(() => localStorage.setItem('kk-selection-v1', JSON.stringify([
    { slug: 'etude-01', colour: 'vert', size: '40', qty: 1 },
    { slug: 'hack', colour: 'x', size: '40', qty: 5 },
    { slug: 'etude-01', colour: 'pois', size: '40', qty: 1 },
    { slug: 'etude-03', colour: 'nuit', size: '99', qty: 1 },
    { slug: 'etude-03', colour: 'nuit', size: '40', qty: -2 },
  ])));
  await page.reload();
  await expect(page.locator('[data-sel-list] .bl')).toHaveCount(1);
  await expect(page.locator('[data-bag-count]').first()).toHaveText('1');
  await page.locator('[data-reset-demo]').click();
  await expect(page.locator('[data-sel-list] .empty')).toBeVisible();
});

test('mobile menu / desktop nav: keyboard accessible, Escape closes, focus returns', async ({ page }) => {
  await page.goto('');
  if (isMobile(page)) {
    const btn = page.locator('.thumb [data-open-menu]');
    await btn.focus();
    await page.keyboard.press('Enter');
    const menu = page.locator('#menu');
    await expect(menu).toBeVisible();
    await expect(menu.getByRole('link', { name: /Lookbook/ })).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(menu).toBeHidden();
    await expect(btn).toBeFocused();
    await btn.click();
    await menu.getByRole('link', { name: /Créations/ }).click();
    await expect(page).toHaveURL(/collections\/$/);
  } else {
    await page.keyboard.press('Tab'); // skip link
    await expect(page.locator('.skip')).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.locator('.hdr__nav a').first()).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/collections\/$/);
  }
});

test('tap targets of primary controls are at least 44px', async ({ page }) => {
  test.skip(!isMobile(page), 'mobile only');
  await page.goto('creations/etude-01/');
  const boxes = await page.$$eval('.thumb > *, .sz__i, .sw__i, .qty button, button.add, .acc summary', (els) =>
    els.map((e) => { const r = e.getBoundingClientRect(); return Math.min(r.width, r.height); }));
  expect(Math.min(...boxes)).toBeGreaterThanOrEqual(44);
});
