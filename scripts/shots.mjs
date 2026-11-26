// Usage: node scripts/shots.mjs <baseUrl> <outDir>
import { chromium } from '@playwright/test';
import { mkdirSync } from 'node:fs';
const base = (process.argv[2] ?? 'http://localhost:4330/kuskusi-kouture-website-concept/').replace(/\/?$/, '/');
const out = process.argv[3] ?? 'shots';
mkdirSync(out, { recursive: true });
const browser = await chromium.launch();
const errors = [];
async function ctx(w, h, mobile = false) {
  const c = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: mobile ? 2 : 1, isMobile: mobile, hasTouch: mobile });
  const p = await c.newPage();
  p.on('console', (m) => m.type() === 'error' && errors.push(`${p.url()}: ${m.text()}`));
  p.on('pageerror', (e) => errors.push(`${p.url()}: ${e.message}`));
  return p;
}
const settle = async (p) => {
  await p.waitForLoadState('networkidle');
  await p.evaluate(() => document.querySelectorAll('.rv').forEach((e) => e.classList.add('in')));
  await p.waitForTimeout(2200);
};
const at = async (p, sel, file) => {
  await p.evaluate((s) => document.querySelector(s).scrollIntoView({ behavior: 'instant', block: 'start' }), sel);
  await p.waitForTimeout(500);
  await p.screenshot({ path: `${out}/${file}` });
};

for (const [name, w, h, m] of [['desktop', 1440, 900, false], ['mobile', 375, 812, true]]) {
  const p = await ctx(w, h, m);
  await p.goto(base);
  await settle(p);
  await p.screenshot({ path: `${out}/${name}-home.png` });
  await p.screenshot({ path: `${out}/${name}-home-full.png`, fullPage: true });
  await at(p, '#maison', `${name}-maison.png`);
  await at(p, '#kaftans', `${name}-gallery.png`);
  await p.locator('[data-lb]').nth(1).click();
  await p.waitForTimeout(800);
  await p.screenshot({ path: `${out}/${name}-lightbox.png` });
  await p.keyboard.press('Escape');
  await at(p, '#creations', `${name}-creations.png`);
  await at(p, '#presence', `${name}-presence.png`);
  await at(p, '#contact', `${name}-contact.png`);
  if (m) {
    await p.evaluate(() => window.scrollTo(0, 0));
    await p.locator('.hdr__menu').click();
    await p.waitForTimeout(900);
    await p.screenshot({ path: `${out}/mobile-nav-open.png` });
    await p.keyboard.press('Escape');
  }
  await p.goto(base + 'lookbook/');
  await settle(p);
  await p.screenshot({ path: `${out}/${name}-lookbook-full.png`, fullPage: true });
}
await browser.close();
console.log(errors.length ? 'ERRORS:\n' + errors.join('\n') : 'no console errors');
