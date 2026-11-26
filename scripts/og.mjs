// Renders public/og.png (1200x630) from an original typographic composition.
import { chromium } from '@playwright/test';
import { fileURLToPath } from 'node:url';
import { readFileSync } from 'node:fs';
const nm = (p) => `data:font/woff2;base64,${readFileSync(fileURLToPath(new URL(`../node_modules/${p}`, import.meta.url))).toString('base64')}`;
const html = `<!doctype html><html><head><style>
@font-face{font-family:B;src:url(${nm('@fontsource-variable/bodoni-moda/files/bodoni-moda-latin-opsz-normal.woff2')});font-weight:400 900}
@font-face{font-family:B;font-style:italic;src:url(${nm('@fontsource-variable/bodoni-moda/files/bodoni-moda-latin-opsz-italic.woff2')});font-weight:400 900}
@font-face{font-family:H;src:url(${nm('@fontsource-variable/hanken-grotesk/files/hanken-grotesk-latin-wght-normal.woff2')});font-weight:100 900}
body{margin:0;width:1200px;height:630px;background:#f2ebe1;color:#1d2447;font-family:H;position:relative;overflow:hidden}
.kk{position:absolute;left:64px;top:70px;font:400 120px/0.8 B;font-variation-settings:'opsz' 96;display:flex}
.kk span:first-child{transform:scaleX(-1);display:inline-block;margin-right:-.1em}
.lk{position:absolute;left:66px;top:178px;font:500 13px/1 H;letter-spacing:.42em;text-transform:uppercase}
.t{position:absolute;left:62px;top:250px;font:400 78px/0.98 B;font-variation-settings:'opsz' 96;letter-spacing:-.03em;width:560px}
.t em{font-style:italic}
.bot{position:absolute;left:64px;bottom:46px;width:520px;font:500 16px/1.4 H;color:#474c66;border-top:1px solid rgba(29,36,71,.25);padding-top:16px}
.ar{position:absolute;bottom:0;display:flex;gap:18px;right:56px;align-items:flex-end}
.ar svg{display:block}
</style></head><body>
<div class="kk"><span>K</span><span>K</span></div><div class="lk">Kuskusi Kouture</div>
<div class="t">Une touche marocaine <em>dans chaque détail.</em></div>
<div class="bot">Concept de site internet — démonstration non officielle, proposée par Mansour Technologies</div>
<div class="ar">
${[['#EDC6C6',150,200,'#FBF8F3'],['#E4B007',210,280,'#F7F1E8'],['#A9C43A',150,200,'#FBF8F3']].map(([c,w,h,bg],i)=>`<svg width="${w}" height="${h*1.6}" viewBox="0 0 300 400" preserveAspectRatio="none" style="margin-bottom:${i===1?40:110}px"><path d="M0 400 V150 C0 72 62 20 150 4 C238 20 300 72 300 150 V400 Z" fill="${bg}" stroke="#d6ccbd" stroke-width="3"/><path d="M120 80 L180 80 C190 160 200 290 212 386 L88 386 C100 290 110 160 120 80 Z" fill="${c}"/><ellipse cx="150" cy="46" rx="14" ry="18" fill="#C79B7D"/></svg>`).join('')}
</div>
</body></html>`;
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
await p.setContent(html, { waitUntil: 'load' });
await p.evaluate(() => document.fonts.ready);
await p.waitForTimeout(300);
await p.screenshot({ path: fileURLToPath(new URL('../public/og.png', import.meta.url)) });
await b.close();
console.log('public/og.png written');
