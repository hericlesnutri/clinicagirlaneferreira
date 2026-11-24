// Utilitários de renderização (sem dependências)
import { site, profissionais } from './data/site.mjs';

export const avisos = new Set();

export const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const pendente = (v) => typeof v === 'string' && v.trim().startsWith('PREENCHER');
export const preenchido = (v) => v !== null && v !== undefined && v !== '' && !pendente(v);

/** Texto visível: se o dado estiver pendente, destaca e registra aviso. */
export function mostrar(v, rotulo = '') {
  if (pendente(v)) {
    // Dado pendente nunca aparece no site publicado: só vira aviso no build.
    avisos.add(`${rotulo ? rotulo + ': ' : ''}${v}`);
    return '';
  }
  return esc(v ?? '');
}

/** Remove chaves vazias/pendentes de objetos JSON-LD (recursivo). */
export function limpar(obj) {
  if (Array.isArray(obj)) {
    const arr = obj.map(limpar).filter((x) => x !== undefined);
    return arr.length ? arr : undefined;
  }
  if (obj && typeof obj === 'object') {
    const out = {};
    for (const [k, v] of Object.entries(obj)) {
      const c = limpar(v);
      if (c !== undefined) out[k] = c;
    }
    const chaves = Object.keys(out).filter((k) => !k.startsWith('@'));
    return chaves.length ? out : undefined;
  }
  if (obj === null || obj === undefined || obj === '' || pendente(obj)) return undefined;
  return obj;
}

// ---------------- URLs ----------------
// No modo "preview" (para visualizar fora da Vercel) os links viram relativos com .html.
let modoPreview = false;
let caminhoAtual = '/';
export const setPreview = (v) => (modoPreview = v);
export const setCaminho = (p) => (caminhoAtual = p);

export const arquivoDe = (p) => (p === '/' ? 'index.html' : p.replace(/^\//, '') + '.html');
export const absoluta = (p) => site.dominio + (p === '/' ? '/' : p);

export function href(p) {
  if (!modoPreview || /^(https?:|mailto:|tel:|#)/.test(p)) return p;
  const [caminho, ancora = ''] = p.split('#');
  const de = arquivoDe(caminhoAtual).split('/').slice(0, -1);
  let alvo = caminho.startsWith('/assets') || /\.[a-z0-9]+$/i.test(caminho) ? caminho.replace(/^\//, '') : arquivoDe(caminho || '/');
  const partes = alvo.split('/');
  let i = 0;
  while (i < de.length && de[i] === partes[i]) i++;
  const rel = [...de.slice(i).map(() => '..'), ...partes.slice(i)].join('/');
  return rel + (ancora ? '#' + ancora : '');
}

// ---------------- Contato ----------------
export function whatsappUrl(msg = site.whatsappMensagem) {
  const num = pendente(site.whatsapp) ? '' : site.whatsapp.replace(/\D/g, '');
  if (!num) avisos.add('WhatsApp: número não preenchido (os botões apontam para a página de contato)');
  return num ? `https://wa.me/${num}?text=${encodeURIComponent(msg)}` : href('/contato');
}
export const telLink = () => (preenchido(site.telefone) ? 'tel:' + site.telefone.replace(/[^\d+]/g, '') : '');

export function enderecoLinha() {
  const e = site.endereco;
  const cep = mostrar(e.cep, 'CEP');
  return [e.rua, e.complemento, e.bairro].filter(Boolean).map((x) => mostrar(x, 'Endereço')).filter(Boolean).join(', ') +
    ` · ${esc(e.cidade)} - ${esc(e.uf)}${cep ? ', CEP ' + cep : ''}`;
}
export function mapsUrl() {
  if (preenchido(site.perfis.googleMaps)) return site.perfis.googleMaps;
  const e = site.endereco;
  const q = preenchido(e.rua) ? `${site.nome}, ${e.rua}, ${e.cidade} - ${e.uf}` : `${site.nome} ${e.cidade}`;
  return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(q);
}

export const nomeCompleto = (p) => [p.tratamento, p.nome].filter(Boolean).join(' ');
export function registroTexto(p) {
  if (!p.conselho) return '';
  const c = p.conselho;
  const reg = pendente(c.regiao) ? c.sigla : `${c.sigla}-${c.regiao.replace(/\D/g, '') || c.regiao}`;
  if (pendente(c.numero)) { mostrar(c.numero, `Registro ${p.nome}`); return reg; }
  return `${reg} nº ${esc(c.numero)}`;
}
export function registroPlano(p) {
  if (!p.conselho || pendente(p.conselho.numero)) return '';
  const c = p.conselho;
  const reg = pendente(c.regiao) ? c.sigla : `${c.sigla}-${c.regiao.replace(/\D/g, '') || c.regiao}`;
  return `${reg} nº ${c.numero}`;
}

export const dataBR = (iso) => {
  const [a, m, d] = iso.split('-');
  const meses = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
  return `${Number(d)} de ${meses[Number(m) - 1]} de ${a}`;
};

export const textoPuro = (html) => html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

export { site, profissionais };
