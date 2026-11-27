// Servidor local para editar o site: gera /dist, serve em http://localhost:4321
// e gera de novo sempre que algo muda em src/ ou public/. Sem dependências.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { watch } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join, extname, resolve } from 'node:path';

const raiz = resolve(import.meta.dirname, '..');
const dist = join(raiz, 'dist');
const porta = Number(process.env.PORT) || 4321;

const tipos = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.ico': 'image/x-icon',
};

function gerar() {
  const r = spawnSync(process.execPath, [join(raiz, 'scripts', 'build.mjs')], { cwd: raiz, encoding: 'utf8' });
  process.stdout.write(r.stdout.split('\n').slice(0, 1).join('\n') + '\n');
  if (r.status !== 0) process.stderr.write(r.stderr);
}

async function arquivo(url) {
  const caminho = decodeURIComponent(new URL(url, 'http://x').pathname);
  const candidatos = caminho.endsWith('/') ? [caminho + 'index.html'] : [caminho, caminho + '.html', caminho + '/index.html'];
  for (const c of candidatos) {
    const p = join(dist, c);
    if (!p.startsWith(dist)) break;
    try { if ((await stat(p)).isFile()) return p; } catch {}
  }
  return null;
}

gerar();
createServer(async (req, res) => {
  const p = await arquivo(req.url);
  const alvo = p || join(dist, '404.html');
  res.writeHead(p ? 200 : 404, { 'content-type': tipos[extname(alvo)] || 'application/octet-stream', 'cache-control': 'no-store' });
  res.end(await readFile(alvo));
}).listen(porta, () => console.log(`Site rodando em http://localhost:${porta}`));

let espera;
for (const pasta of ['src', 'public']) {
  watch(join(raiz, pasta), { recursive: true }, () => { clearTimeout(espera); espera = setTimeout(gerar, 150); });
}
