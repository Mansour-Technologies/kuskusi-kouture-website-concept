// Minimal static server mirroring GitHub Pages: dist/ served under the repo base path, 404.html fallback.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
const BASE = '/kuskusi-kouture-website-concept';
const port = Number(process.env.PORT ?? 4330);
const root = fileURLToPath(new URL('../dist/', import.meta.url));
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.woff2': 'font/woff2', '.txt': 'text/plain', '.json': 'application/json' };
createServer(async (req, res) => {
  const u = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (!u.startsWith(BASE)) { res.writeHead(404); return res.end('not found'); }
  let p = normalize(join(root, u.slice(BASE.length)));
  if (!p.startsWith(root)) { res.writeHead(403); return res.end(); }
  try {
    if ((await stat(p)).isDirectory()) {
      if (!u.endsWith('/')) { res.writeHead(301, { Location: u + '/' }); return res.end(); }
      p = join(p, 'index.html');
    }
    const body = await readFile(p);
    res.writeHead(200, { 'Content-Type': types[extname(p)] ?? 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(await readFile(join(root, '404.html')).catch(() => 'not found'));
  }
}).listen(port, () => console.log(`serving dist on http://localhost:${port}${BASE}/`));
