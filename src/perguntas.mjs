// Perguntas frequentes editáveis num arquivo de texto só: perguntas-frequentes.txt
// (na pasta do projeto). Cada página procura o seu CÓDIGO no arquivo; se achar,
// usa as perguntas de lá; se não achar, usa as que estão no código.
//
// Formato do arquivo:
//   CÓDIGO: tratamentos/harmonizacao-facial      <- não mexer nesta linha
//   P: Pergunta?
//   R: Resposta (pode ocupar várias linhas)
//
// Para gerar o arquivo de novo a partir do site: node scripts/build.mjs --exportar-perguntas
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const arquivo = fileURLToPath(new URL('../perguntas-frequentes.txt', import.meta.url));

function ler() {
  if (!existsSync(arquivo)) return new Map();
  const mapa = new Map();
  let atual = null;
  let campo = null;
  for (const linhaBruta of readFileSync(arquivo, 'utf8').replace(/\r\n/g, '\n').split('\n')) {
    const linha = linhaBruta.trimEnd();
    const cod = linha.match(/^CÓDIGO:\s*(\S+)/i);
    if (cod) { atual = []; mapa.set(cod[1], atual); campo = null; continue; }
    if (!atual) continue;
    if (/^(=|-){5,}/.test(linha) || /^PÁGINA:/i.test(linha) || linha.startsWith('#')) { campo = null; continue; }
    const p = linha.match(/^P:\s*(.*)$/);
    const r = linha.match(/^R:\s*(.*)$/);
    if (p) { atual.push({ q: p[1], a: '' }); campo = 'q'; continue; }
    if (r && atual.length) { atual[atual.length - 1].a = r[1]; campo = 'a'; continue; }
    if (linha.trim() && campo && atual.length) {
      const ult = atual[atual.length - 1];
      ult[campo] = (ult[campo] + ' ' + linha.trim()).trim();
    }
  }
  for (const [k, lista] of mapa) mapa.set(k, lista.filter((x) => x.q.trim() && x.a.trim()));
  return mapa;
}

const doArquivo = ler();
const usados = new Map(); // código -> { pagina, faqs } (para exportar)

/** Perguntas da página: as do arquivo, se houver; senão, as do código. */
export function perguntasDe(codigo, pagina, padrao = []) {
  const lista = doArquivo.has(codigo) ? doArquivo.get(codigo) : padrao;
  if (!usados.has(codigo)) usados.set(codigo, { pagina, faqs: lista });
  return lista;
}

/** Escreve perguntas-frequentes.txt com as perguntas atuais de todas as páginas. */
export function exportarPerguntas() {
  const linhas = [
    '# PERGUNTAS FREQUENTES DO SITE — Clínica Girlane Ferreira',
    '#',
    '# Como editar:',
    '#  - Mude o texto depois de "P:" (pergunta) e de "R:" (resposta).',
    '#  - Para incluir uma pergunta, escreva uma nova linha "P:" e, logo abaixo, "R:".',
    '#  - Para tirar uma pergunta, apague as duas linhas (P: e R:).',
    '#  - NÃO mude as linhas "CÓDIGO:". Elas dizem em qual página cada bloco aparece.',
    '#  - Uma página sem nenhuma pergunta fica sem a seção de perguntas.',
    '',
  ];
  for (const [codigo, { pagina, faqs }] of usados) {
    linhas.push('==================================================', `PÁGINA: ${pagina}`, `CÓDIGO: ${codigo}`, '--------------------------------------------------');
    for (const f of faqs) linhas.push(`P: ${f.q}`, `R: ${f.a}`, '');
    if (!faqs.length) linhas.push('');
  }
  writeFileSync(arquivo, linhas.join('\n'), 'utf8');
  return usados.size;
}
