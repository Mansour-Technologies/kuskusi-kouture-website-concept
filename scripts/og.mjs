// Renders public/og.png (1200x630) from an original typographic composition.
import { chromium } from '@playwright/test';
import { fileURLToPath } from 'node:url';
import { readFileSync } from 'node:fs';
const nm = (p) => `data:font/woff2;base64,${readFileSync(fileURLToPath(new URL(`../node_modules/${p}`, import.meta.url))).toString('base64')}`;
const html = `<!doctype html><html><head><style>
@font-face{font-family:B;src:url(${nm('@fontsource-variable/bodoni-moda/files/bodoni-moda-latin-opsz-normal.woff2')});font-weight:400 900}
@font-face{font-family:B;font-style:italic;src:url(${nm('@fontsource-variable/bodoni-moda/files/bodoni-moda-latin-opsz-italic.woff2')});font-weight:400 900}
@font-face{font-family:H;src:url(${nm('@fontsource-variable/hanken-grotesk/files/hanken-grotesk-latin-wght-normal.woff2')});font-weight:100 900}
body{margin:0;width:1200px;height:630px;background:#17362a;color:#f6f4ee;font-family:H;position:relative;overflow:hidden}
.k{position:absolute;left:56px;top:150px;font:400 228px/0.8 B;font-variation-settings:'opsz' 96;letter-spacing:-.045em;text-transform:uppercase}
.i{position:absolute;right:300px;top:330px;font:italic 400 120px/1 B;font-variation-settings:'opsz' 96;letter-spacing:-.03em}
.top{position:absolute;left:60px;top:52px;font:600 15px/1 H;letter-spacing:.18em;text-transform:uppercase;color:#cfdad2}
.bot{position:absolute;left:60px;bottom:46px;right:60px;display:flex;justify-content:space-between;font:500 17px/1.3 H;color:#d5ddd7;border-top:1px solid rgba(246,244,238,.3);padding-top:20px}
.pl{position:absolute;right:56px;top:46px;width:210px;height:300px;background:#a8b9a7}
.pl svg{width:100%;height:100%}
</style></head><body>
<div class="pl"><svg viewBox="0 0 300 400"><path fill="#1f4636" d="M104 50 L134 40 Q150 62 166 40 L196 50 C228 70 262 150 276 214 L232 226 C222 190 212 160 204 140 C212 230 226 320 238 386 L62 386 C74 320 88 230 96 140 C88 160 78 190 68 226 L24 214 C38 150 72 70 104 50 Z"/><g fill="#f6f4ee">${Array.from({length:18},(_,i)=>`<circle cx="150" cy="${66+i*13}" r="3"/>`).join('')}</g></svg></div>
<p class="top">Gandouras · Djellabas · Kaftans · Tenues</p>
<div class="k">Kuskusi</div><div class="i">Kouture</div>
<div class="bot"><span>Concept de site internet — démonstration non officielle</span><span>Proposé par Mansour Technologies</span></div>
</body></html>`;
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
await p.setContent(html, { waitUntil: 'load' });
await p.evaluate(() => document.fonts.ready);
await p.waitForTimeout(300);
await p.screenshot({ path: fileURLToPath(new URL('../public/og.png', import.meta.url)) });
await b.close();
console.log('public/og.png written');
