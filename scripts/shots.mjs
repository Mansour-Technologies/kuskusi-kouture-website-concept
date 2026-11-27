// Usage: node scripts/shots.mjs <baseUrl> <outDir>
// Captures home, nav, sections with the official embeds rendered, contact, and viewport-by-viewport
// segments of the whole page (seg-*.png) for stitching a full-page image. Headless Chromium leaves
// cross-origin iframes blank in a single fullPage capture, so full pages are stitched from segments.
import { chromium } from '@playwright/test';
import { mkdirSync, writeFileSync } from 'node:fs';
const base = (process.argv[2] ?? 'http://localhost:4330/kuskusi-kouture-website-concept/').replace(/\/?$/, '/');
const out = process.argv[3] ?? 'shots';
mkdirSync(out, { recursive: true });
const browser = await chromium.launch(process.env.PW_EXEC ? { executablePath: process.env.PW_EXEC } : {});
const own = [];
let thirdParty = 0;

for (const [name, w, h] of [['desktop', 1440, 900], ['mobile', 375, 812]]) {
  const c = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, isMobile: name === 'mobile', hasTouch: name === 'mobile' });
  const p = await c.newPage();
  p.on('console', (m) => {
    if (m.type() !== 'error') return;
    if (/instagram|facebook|fbcdn/.test(`${m.location()?.url ?? ''} ${m.text()}`)) thirdParty++;
    else own.push(`${name}: ${m.text()}`);
  });
  p.on('pageerror', (e) => own.push(`${name}: ${e.message}`));
  await p.goto(base, { waitUntil: 'networkidle' });
  await p.waitForTimeout(2500);
  await p.screenshot({ path: `${out}/${name}-home.png` });
  if (name === 'mobile') {
    await p.locator('.hdr__menu').click();
    await p.waitForTimeout(900);
    await p.screenshot({ path: `${out}/mobile-nav-open.png` });
    await p.keyboard.press('Escape');
  }
  // Walk the page so every embed loads, saving one segment per viewport (header made static).
  await p.addStyleTag({ content: 'html{scroll-behavior:auto!important}.hdr{position:relative!important}' });
  const total = await p.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0, i = 0; y < total; y += h, i++) {
    await p.evaluate((y) => window.scrollTo(0, y), y);
    await p.waitForTimeout(i < 2 ? 6000 : 4000);
    await p.screenshot({ path: `${out}/seg-${name}-${String(i).padStart(2, '0')}.png` });
  }
  writeFileSync(`${out}/seg-${name}.json`, JSON.stringify({ total: await p.evaluate(() => document.documentElement.scrollHeight), h }));
  await p.addStyleTag({ content: '.hdr{position:sticky!important}' });
  for (const [sel, file] of [['#creations', 'creations'], ['#details', 'details'], ['#lookbook', 'lookbook'], ['#contact', 'contact']]) {
    await p.locator(sel).evaluate((el) => el.scrollIntoView({ block: 'start' }));
    await p.waitForTimeout(2500);
    await p.screenshot({ path: `${out}/${name}-${file}.png` });
  }
  console.log(name, 'iframes', await p.locator('[data-ig-src] iframe').count(), 'rendered', await p.locator('.ig__box.is-in').count());
  await c.close();
}
await browser.close();
console.log(`third-party (Instagram embed) console errors: ${thirdParty}`);
console.log(own.length ? 'OWN ERRORS:\n' + own.join('\n') : 'no console errors from our code');
