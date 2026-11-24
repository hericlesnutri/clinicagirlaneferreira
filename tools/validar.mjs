import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';
const dist = process.argv[2] || 'dist';
const arquivos = [];
const andar = (d) => readdirSync(d).forEach((f) => { const p = join(d, f); statSync(p).isDirectory() ? andar(p) : p.endsWith('.html') && arquivos.push(p); });
andar(dist);
let erros = 0;
const tipos = {};
for (const a of arquivos) {
  const h = readFileSync(a, 'utf8');
  const ld = [...h.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)];
  for (const m of ld) { try { const j = JSON.parse(m[1]); j['@graph'].forEach((n) => [].concat(n['@type']).forEach((t) => (tipos[t] = (tipos[t] || 0) + 1))); } catch (e) { erros++; console.log('JSON-LD inválido', a, e.message); } }
  const t = h.match(/<title>(.*?)<\/title>/)[1]; const d = h.match(/name="description" content="(.*?)"/)[1];
  if (t.length > 65) console.log(`título longo (${t.length}): ${a}: ${t}`);
  if (d.length > 160 || d.length < 70) console.log(`description (${d.length}): ${a}`);
  if ((h.match(/<h1[ >]/g) || []).length !== 1) { erros++; console.log('h1 != 1', a); }
  for (const [, l] of h.matchAll(/href="(\/[^"#?]*)/g)) {
    if (l.startsWith('/_vercel')) continue;
    const alvo = l === '/' ? 'index.html' : l.replace(/^\//, '');
    if (!existsSync(join(dist, alvo)) && !existsSync(join(dist, alvo + '.html'))) { erros++; console.log('link quebrado', a, l); }
  }
  for (const [img] of h.matchAll(/<img [^>]*>/g)) if (!/alt="/.test(img)) { erros++; console.log('img sem alt', a); }
}
console.log(arquivos.length, 'páginas,', erros, 'erros'); console.log(tipos);
