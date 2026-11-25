// Gera o site estático em /dist. Sem dependências: node scripts/build.mjs
// Opção --preview: links relativos (.html) para abrir os arquivos fora da Vercel.
import { mkdir, writeFile, cp, rm } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { site, profissionais, revisadoEm } from '../src/data/site.mjs';
import { servicosAtivos } from '../src/data/servicos.mjs';
import { artigos } from '../src/data/artigos.mjs';
import { avisos, arquivoDe, absoluta, setPreview, nomeCompleto, registroPlano, preenchido, textoPuro } from '../src/lib.mjs';
import * as P from '../src/paginas.mjs';
import { faltando, todosCasos } from '../src/imagens.mjs';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const preview = process.argv.includes('--preview');
const saida = join(raiz, preview ? 'dist-preview' : 'dist');
setPreview(preview);

await rm(saida, { recursive: true, force: true });
await mkdir(saida, { recursive: true });
await cp(join(raiz, 'public'), saida, { recursive: true });

const paginas = [
  P.home(),
  P.sobreGirlane(),
  P.metodo(),
  P.tratamentos(),
  ...servicosAtivos.map(P.paginaServico),
  P.equipe(),
  P.resultados(),
  P.listaConteudo(),
  ...artigos.map(P.paginaArtigo),
  P.perguntas(),
  P.contato(),
  P.privacidade(),
  P.naoEncontrada(),
];

for (const p of paginas) {
  const arquivo = join(saida, arquivoDe(p.caminho));
  await mkdir(dirname(arquivo), { recursive: true });
  await writeFile(arquivo, p.html);
}

// ---------------- sitemap.xml ----------------
const urls = paginas.filter((p) => !p.semSitemap && p.caminho !== '/politica-de-privacidade');
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((p) => `  <url><loc>${absoluta(p.caminho)}</loc><lastmod>${p.lastmod || revisadoEm}</lastmod><priority>${p.prioridade || '0.5'}</priority></url>`).join('\n')}
</urlset>
`;
await writeFile(join(saida, 'sitemap.xml'), sitemap);

// ---------------- robots.txt ----------------
// Libera buscadores e os robôs de IA que citam fontes (ChatGPT, Claude, Perplexity, Gemini).
const robots = `# ${site.nome}
User-agent: *
Allow: /
Disallow: /404

# Robôs de IA: liberados para que a clínica possa ser citada em respostas
User-agent: GPTBot
Allow: /
User-agent: OAI-SearchBot
Allow: /
User-agent: ChatGPT-User
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: Claude-SearchBot
Allow: /
User-agent: Claude-User
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: Perplexity-User
Allow: /
User-agent: Google-Extended
Allow: /
User-agent: Applebot-Extended
Allow: /
User-agent: Bingbot
Allow: /

Sitemap: ${site.dominio}/sitemap.xml
`;
await writeFile(join(saida, 'robots.txt'), robots);

// ---------------- llms.txt (resumo do site para IAs) ----------------
const g = profissionais.girlane;
const e = site.endereco;
const end = [e.rua, e.complemento, e.bairro].filter((x) => preenchido(x)).join(', ');
const llms = `# ${site.nome}

> ${site.descricao}

- Responsável técnica: ${nomeCompleto(g)}, biomédica esteta${registroPlano(g) ? ` (${registroPlano(g)})` : ' (registro no CRBM)'}, ${g.conselho.habilitacao.toLowerCase()}.
- Localização: ${end ? end + ', ' : ''}${e.cidade} - ${e.uf}${preenchido(e.cep) ? ', CEP ' + e.cep : ''}, Brasil.
- Atende também: ${site.areasAtendidas.slice(1).join(', ')}.
${preenchido(site.telefone) ? `- Telefone/WhatsApp: ${site.telefone}\n` : ''}- Instagram da clínica: ${site.perfis.instagramClinica}
- Instagram da Dra. Girlane: ${site.perfis.instagram}
- Método: planos de tratamento facial em três pilares (reestruturação, pele que toca, pele que se vê), com consulta, plano por escrito e acompanhamento entre 15 e 30 dias.
- Equipe: ${Object.values(profissionais).map((p) => `${nomeCompleto(p)} (${p.cargo.toLowerCase()})`).join('; ')}.

## Páginas principais
- [Dra. Girlane Ferreira](${absoluta('/dra-girlane-ferreira')}): formação, registro e método de trabalho
- [Método](${absoluta('/metodo')}): como funciona o plano de tratamento
- [Tratamentos](${absoluta('/tratamentos')}): lista completa
- [Perguntas frequentes](${absoluta('/perguntas-frequentes')})
- [Contato](${absoluta('/contato')}): endereço, horários e WhatsApp

## Tratamentos
${servicosAtivos.map((s) => `- [${s.h1}](${absoluta('/tratamentos/' + s.slug)}): ${s.resumo}`).join('\n')}

## Conteúdo educativo
${artigos.map((a) => `- [${a.titulo}](${absoluta('/conteudo/' + a.slug)}): ${a.resumo}`).join('\n')}

## Optional
- [Texto completo do site](${absoluta('/llms-full.txt')})
`;
await writeFile(join(saida, 'llms.txt'), llms);

const full = [
  llms,
  ...servicosAtivos.map((s) => `\n\n# ${s.h1}\nURL: ${absoluta('/tratamentos/' + s.slug)}\n\n${s.resumo}\n\n${s.oQueE.join('\n\n')}\n\nIndicações: ${s.indicacoes.join('; ')}.\nDuração: ${s.dados.duracao}. Sessões: ${s.dados.sessoes}. Recuperação: ${s.dados.recuperacao}. Resultado: ${s.dados.resultado}. Durabilidade: ${s.dados.durabilidade}.\n${s.contraindicacoes.length ? 'Contraindicações: ' + s.contraindicacoes.join('; ') + '.\n' : ''}\n${s.faqs.map((f) => `P: ${f.q}\nR: ${f.a}`).join('\n\n')}`),
  ...artigos.map((a) => `\n\n# ${a.titulo}\nURL: ${absoluta('/conteudo/' + a.slug)}\nAutor: ${nomeCompleto(profissionais[a.autor])}. Atualizado em ${a.atualizado}.\n\n${a.resumo}\n\n${textoPuro(a.corpo)}\n\n${a.faqs.map((f) => `P: ${f.q}\nR: ${f.a}`).join('\n\n')}`),
].join('');
await writeFile(join(saida, 'llms-full.txt'), full);

// ---------------- manifest ----------------
await writeFile(
  join(saida, 'site.webmanifest'),
  JSON.stringify({ name: site.nome, short_name: site.nomeCurto, lang: 'pt-BR', start_url: '/', display: 'browser', background_color: '#F5F3E7', theme_color: '#F5F3E7', icons: [{ src: '/assets/logo-512.png', sizes: '512x512', type: 'image/png' }, { src: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }] }, null, 2)
);

console.log(`✓ ${paginas.length} páginas geradas em ${saida.replace(raiz + '/', '')}`);
console.log(`📷 ${todosCasos().length} caso(s) de antes e depois encontrados.`);
if (faltando.size) console.log(`⚠ ${faltando.size} página(s) sem antes e depois por falta de fotos: ${[...faltando].join(', ')}`);
if (avisos.size) {
  console.log(`\n⚠ ${avisos.size} dado(s) para preencher em src/data/site.mjs:`);
  for (const a of avisos) console.log('  · ' + a);
}
