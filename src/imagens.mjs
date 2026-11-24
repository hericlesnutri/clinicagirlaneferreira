// Fotos do site. Os arquivos ficam em public/img e são descobertos pelo nome:
//   img/equipe/<chave>.webp                  (girlane, hericles, diva)
//   img/clinica/<nome>.webp                   (fachada, recepcao, sala-1 ...)
//   img/tratamentos/<slug>.webp               (capa do tratamento)
//   img/antes-depois/<slug>-<n>-antes.webp    e  <slug>-<n>-depois.webp
// O manifest.json (gerado por tools/importar-fotos.py) guarda largura e altura.
import { readFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { casosInfo } from './data/antes-depois.mjs';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const arqManifest = join(raiz, 'public/img/manifest.json');
const manifest = existsSync(arqManifest) ? JSON.parse(readFileSync(arqManifest, 'utf8')) : {};

export const faltando = new Set();

// ?v=<hash> muda sempre que a foto muda, para o navegador não mostrar a versão antiga do cache.
const versoes = {};
const versao = (caminho) => (versoes[caminho] ??= createHash('sha1').update(readFileSync(join(raiz, 'public', caminho))).digest('hex').slice(0, 8));

export function foto(caminho) {
  const m = manifest[caminho];
  return m ? { src: '/' + caminho + '?v=' + versao(caminho), largura: m[0], altura: m[1] } : null;
}

export const fotoEquipe = (chave) => foto(`img/equipe/${chave}.webp`);
export const capaServico = (slug) => foto(`img/tratamentos/${slug}.webp`);
export const fotoClinica = (nome) => foto(`img/clinica/${nome}.webp`);
export const fotosClinica = () => Object.keys(manifest).filter((k) => k.startsWith('img/clinica/')).map((k) => ({ nome: k.split('/').pop().replace('.webp', ''), ...foto(k) }));

// Casos de antes e depois
const casos = [];
for (const k of Object.keys(manifest)) {
  const m = k.match(/^img\/antes-depois\/(.+)-(\d+)-antes\.webp$/);
  if (!m) continue;
  const depois = foto(`img/antes-depois/${m[1]}-${m[2]}-depois.webp`);
  if (!depois) continue;
  const id = `${m[1]}-${m[2]}`;
  casos.push({ id, servico: m[1], antes: foto(k), depois, ...(casosInfo[id] || {}) });
}
casos.sort((a, b) => a.id.localeCompare(b.id, 'pt', { numeric: true }));

export const todosCasos = () => casos;

/** Até `max` casos dos serviços pedidos, na ordem; completa com outros se `completar`. */
export function casosPara(servicos = [], max = 2, completar = true) {
  const lista = servicos.flatMap((s) => casos.filter((c) => c.servico === s));
  if (completar) for (const c of casos) if (!lista.includes(c)) lista.push(c);
  return [...new Set(lista)].slice(0, max);
}
