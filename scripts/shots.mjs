// Usage: node scripts/shots.mjs <baseUrl> <outDir> [--embed]
import { chromium } from '@playwright/test';
import { mkdirSync } from 'node:fs';
const base = (process.argv[2] ?? 'http://localhost:4330/kuskusi-kouture-website-concept/').replace(/\/?$/, '/');
const out = process.argv[3] ?? 'shots';
const withEmbed = process.argv.includes('--embed');
mkdirSync(out, { recursive: true });
const browser = await chromium.launch(process.env.PW_EXEC ? { executablePath: process.env.PW_EXEC } : {});
const errors = [];
async function ctx(w, h, mobile = false) {
  const c = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: mobile ? 2 : 1, isMobile: mobile, hasTouch: mobile });
  const p = await c.newPage();
  p.on('console', (m) => m.type() === 'error' && !/instagram|cdninstagram|facebook/i.test(m.location()?.url ?? '') && errors.push(`${p.url()}: ${m.text()}`));
  p.on('pageerror', (e) => errors.push(`${p.url()}: ${e.message}`));
  return p;
}
const settle = async (p) => {
  await p.waitForLoadState('networkidle');
  await p.evaluate(() => document.querySelectorAll('.rv').forEach((e) => e.classList.add('in')));
  await p.waitForTimeout(1800);
};
const at = async (p, sel, file) => {
  await p.evaluate((s) => document.querySelector(s).scrollIntoView({ behavior: 'instant', block: 'start' }), sel);
  await p.waitForTimeout(500);
  await p.screenshot({ path: `${out}/${file}` });
};

for (const [name, w, h, m] of [['desktop', 1440, 900, false], ['mobile', 375, 812, true]]) {
  const p = await ctx(w, h, m);
  await p.goto(base);
  await p.addStyleTag({ content: 'html{scroll-behavior:auto!important}' });
  await settle(p);
  await p.screenshot({ path: `${out}/${name}-home.png` });
  await p.screenshot({ path: `${out}/${name}-home-full.png`, fullPage: true });
  await at(p, '#maison', `${name}-maison.png`);
  await at(p, '#vestiaire', `${name}-vestiaire.png`);
  await p.locator('.card [data-fiche]').nth(2).click();
  await p.waitForTimeout(900);
  await p.screenshot({ path: `${out}/${name}-lightbox.png` });
  if (withEmbed) {
    await p.locator('[data-lb-embed]').click();
    await p.waitForTimeout(6000);
    await p.screenshot({ path: `${out}/${name}-lightbox-official-embed.png` });
  }
  await p.keyboard.press('Escape');
  await at(p, '#detail', `${name}-detail.png`);
  await at(p, '#instagram', `${name}-instagram.png`);
  if (withEmbed) {
    await p.locator('[data-embed]').first().click();
    await p.waitForTimeout(6000);
    await p.locator('#instagram .ig__grid').scrollIntoViewIfNeeded();
    await p.screenshot({ path: `${out}/${name}-instagram-embed-loaded.png` });
  }
  await at(p, '#contact', `${name}-contact.png`);
  if (m) {
    await p.evaluate(() => window.scrollTo(0, 0));
    await p.locator('.hdr__menu').click();
    await p.waitForTimeout(900);
    await p.screenshot({ path: `${out}/mobile-nav-open.png` });
    await p.keyboard.press('Escape');
  }
}
await browser.close();
console.log(errors.length ? 'ERRORS:\n' + errors.join('\n') : 'no console errors');
