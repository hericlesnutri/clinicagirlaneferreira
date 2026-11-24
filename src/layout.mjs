import { pendente, site, profissionais, esc, href, absoluta, whatsappUrl, enderecoLinha, mostrar, telLink, preenchido, registroTexto, nomeCompleto } from './lib.mjs';
import { servicosAtivos } from './data/servicos.mjs';
import { grafoBase } from './schema.mjs';
import { casosPara, faltando } from './imagens.mjs';

// Ícones em traço (24x24), renderizados a 20px. Classe controla o stroke-width (ajuste 5).
const paths = {
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  fechar: '<path d="M6 6l12 12M18 6L6 18"/>',
  whatsapp: '<path d="M3.5 20.5l1.3-4.2A8.5 8.5 0 1 1 8 19.4z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.4-2-1-1 .9c-1-.4-1.9-1.3-2.3-2.3l.9-1-1-2z"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  esquerda: '<path d="M15 6l-6 6 6 6"/>',
  direita: '<path d="M9 6l6 6-6 6"/>',
  pin: '<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  relogio: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  telefone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
  selo: '<path d="M12 3l2.4 1.8 3-.2.9 2.9 2.4 1.8-1 2.8 1 2.8-2.4 1.8-.9 2.9-3-.2L12 21l-2.4-1.8-3 .2-.9-2.9-2.4-1.8 1-2.8-1-2.8 2.4-1.8.9-2.9 3 .2z"/><path d="M9 12l2 2 4-4"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  instagram: '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".6"/>',
  email: '<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M3.5 6.5l8.5 6.5 8.5-6.5"/>',
  livro: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20"/>',
};
export const icone = (nome, extra = '') =>
  `<svg class="icone ${extra}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${paths[nome]}</svg>`;

// Monograma da marca (também usado como favicon)
export const simbolo = (cls = 'marca-simbolo') =>
  `<svg class="${cls}" viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="30" fill="none" stroke="#9E7F60" stroke-width="2"/><text x="32" y="41" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="25" letter-spacing="1" fill="#9E7F60">GF</text></svg>`;

export const placeholder = (rotulo = '') =>
  `<div class="placeholder-visual" role="img" aria-label="${esc(rotulo || 'Imagem ilustrativa')}">${simbolo('')}</div>`;

export function imagem({ src, alt, largura = 1200, altura = 900, prioridade = false, foto = null }) {
  if (foto) ({ src, largura, altura } = foto);
  if (!src) return placeholder(alt);
  return `<img src="${href(src)}" alt="${esc(alt)}" width="${largura}" height="${altura}" ${prioridade ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
}

const menu = [
  ['/tratamentos', 'Tratamentos'],
  ['/metodo', 'Método'],
  ['/dra-girlane-ferreira', 'Dra. Girlane'],
  ['/equipe', 'Equipe'],
  ['/resultados', 'Resultados'],
  ['/conteudo', 'Conteúdo'],
  ['/contato', 'Contato'],
];

function cabecalho(caminho) {
  const ativo = (p) => (caminho === p || caminho.startsWith(p + '/') ? ' aria-current="page"' : '');
  return `
<a class="pular" href="#conteudo-principal">Pular para o conteúdo</a>
<header class="nav">
  <nav class="container" aria-label="Principal">
    <a class="marca" href="${href('/')}" aria-label="${esc(site.nome)}, página inicial"><img class="logo" src="${href('/assets/logo-horizontal.png')}" alt="${esc(site.nome)}" width="879" height="223"></a>
    <ul class="nav-links" id="menu-principal">
      ${menu.map(([p, t]) => `<li><a href="${href(p)}"${ativo(p)}>${t}</a></li>`).join('')}
    </ul>
    <div class="nav-acoes">
      <a class="botao botao-primario botao-pequeno botao-nav" href="${whatsappUrl()}" rel="noopener">Agendar avaliação</a>
      <button class="menu-botao" type="button" aria-expanded="false" aria-controls="menu-principal" aria-label="Abrir menu">
        ${icone('menu', 'icone-menu')}${icone('fechar', 'icone-fechar')}
      </button>
    </div>
  </nav>
</header>`;
}

function rodape() {
  const g = profissionais.girlane;
  const ano = new Date().getFullYear();
  return `
<footer class="rodape">
  <div class="container">
    <div class="rodape-grade">
      <div>
        <h2><img class="logo-rodape" src="${href('/assets/logo-principal.png')}" alt="${esc(site.nome)}" width="756" height="386" loading="lazy"></h2>
        <address>${enderecoLinha()}</address>
        ${preenchido(site.telefone) ? `<p><a href="${telLink()}">${esc(site.telefone)}</a></p>` : ''}
        <p>Responsável técnica: ${esc(nomeCompleto(g))}, ${esc(g.profissao.toLowerCase())} esteta, ${registroTexto(g)}</p>
      </div>
      <div>
        <h2>Tratamentos</h2>
        <ul>${servicosAtivos.slice(0, 7).map((s) => `<li><a href="${href('/tratamentos/' + s.slug)}">${esc(s.nome)}</a></li>`).join('')}
        <li><a href="${href('/tratamentos')}">Ver todos</a></li></ul>
      </div>
      <div>
        <h2>A clínica</h2>
        <ul>
          <li><a href="${href('/dra-girlane-ferreira')}">Dra. Girlane Ferreira</a></li>
          <li><a href="${href('/metodo')}">Nosso método</a></li>
          <li><a href="${href('/equipe')}">Equipe</a></li>
          <li><a href="${href('/resultados')}">Antes e depois</a></li>
          <li><a href="${href('/perguntas-frequentes')}">Perguntas frequentes</a></li>
          <li><a href="${href('/conteudo')}">Conteúdo educativo</a></li>
        </ul>
      </div>
      <div>
        <h2>Contato</h2>
        <ul>
          <li><a href="${whatsappUrl()}" rel="noopener">WhatsApp</a></li>
          <li><a href="${site.perfis.instagram}" rel="me noopener">Instagram @dra.girlaneferreira</a></li>
          <li><a href="${href('/contato')}">Como chegar</a></li>
        </ul>
      </div>
    </div>
    <div class="rodape-base">
      <span>© ${ano} ${esc(site.nome)}. ${esc(site.nomeCurto)} em ${esc(site.endereco.cidade)}, ${esc(site.endereco.uf)}.</span>
      <span>As informações deste site são educativas e não substituem uma avaliação individual. · <a href="${href('/politica-de-privacidade')}">Privacidade</a></span>
    </div>
  </div>
</footer>
<a class="botao botao-primario whats-flutuante" href="${whatsappUrl()}" rel="noopener" aria-label="Agendar avaliação pelo WhatsApp">${icone('whatsapp', 'icone-500')}Agendar</a>`;
}

/**
 * Página completa.
 * @param {object} o { caminho, titulo, descricao, corpo, schema: [], tipoOg, imagemOg, noindex, publicado, atualizado }
 */
export function pagina(o) {
  const canonica = absoluta(o.caminho);
  const titulo = o.titulo.length > 62 ? o.titulo : o.titulo; // mantenha títulos em até ~60 caracteres
  const imagemOg = absoluta(o.imagemOg || '/assets/og/og-padrao.jpg');
  const grafo = { '@context': 'https://schema.org', '@graph': [...grafoBase(), ...(o.schema || [])] };
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(titulo)}</title>
<meta name="description" content="${esc(o.descricao)}">
<link rel="canonical" href="${canonica}">
<meta name="robots" content="${o.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'}">
<meta name="theme-color" content="#F5F3E7" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#1c1a18" media="(prefers-color-scheme: dark)">
<meta name="author" content="${esc(nomeCompleto(profissionais.girlane))}">
<meta name="geo.region" content="BR-SC">
<meta name="geo.placename" content="Joinville">
${preenchido(site.endereco.latitude) ? `<meta name="geo.position" content="${site.endereco.latitude};${site.endereco.longitude}">\n<meta name="ICBM" content="${site.endereco.latitude}, ${site.endereco.longitude}">` : ''}
${site.googleVerificacao ? `<meta name="google-site-verification" content="${esc(site.googleVerificacao)}">` : ''}
<meta property="og:locale" content="pt_BR">
<meta property="og:site_name" content="${esc(site.nome)}">
<meta property="og:type" content="${o.tipoOg || 'website'}">
<meta property="og:title" content="${esc(o.tituloOg || titulo)}">
<meta property="og:description" content="${esc(o.descricao)}">
<meta property="og:url" content="${canonica}">
<meta property="og:image" content="${imagemOg}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(site.nome)}, clínica de estética em Joinville">
${o.publicado ? `<meta property="article:published_time" content="${o.publicado}">\n<meta property="article:modified_time" content="${o.atualizado || o.publicado}">` : ''}
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="${href('/favicon.ico')}" sizes="32x32">
<link rel="apple-touch-icon" href="${href('/apple-touch-icon.png')}">
<link rel="manifest" href="${href('/site.webmanifest')}">
<link rel="alternate" type="text/plain" href="${href('/llms.txt')}" title="Resumo do site para IAs">
<link rel="stylesheet" href="${href('/assets/styles.css')}">
<script type="application/ld+json">${JSON.stringify(grafo).replace(/</g, '\\u003c')}</script>
</head>
<body>
${cabecalho(o.caminho)}
<main id="conteudo-principal">
${o.corpo}
</main>
${rodape()}
<script src="${href('/assets/site.js')}" defer></script>
${site.analyticsVercel ? '<script defer src="/_vercel/insights/script.js"></script>' : ''}
</body>
</html>`;
}

export function trilha(itens) {
  // itens: [[caminho, nome], ...] (o último é a página atual)
  return `<nav class="trilha" aria-label="Você está em"><ol>
    <li><a href="${href('/')}">Início</a></li>
    ${itens.map(([p, n], i) => (i === itens.length - 1 ? `<li aria-current="page">${esc(n)}</li>` : `<li><a href="${href(p)}">${esc(n)}</a></li>`)).join('')}
  </ol></nav>`;
}

export function faqHtml(faqs) {
  return `<div class="faq">${faqs
    .map((f) => `<details><summary>${esc(f.q)}</summary><div class="resposta"><p>${esc(f.a)}</p></div></details>`)
    .join('')}</div>`;
}

export function ctaFinal(titulo = 'O primeiro passo é uma avaliação.', texto = 'Conversamos sobre o que você quer, avaliamos seu rosto com calma e você sai com um plano por escrito. Sem pressa para decidir.') {
  return `
<section class="secao secao-creme cta-final">
  <div class="container">
    <h2>${esc(titulo)}</h2>
    <p class="lead" style="margin-inline:auto">${esc(texto)}</p>
    <div class="botoes" style="justify-content:center;margin-top:28px">
      <a class="botao botao-primario" href="${whatsappUrl()}" rel="noopener">${icone('whatsapp', 'icone-500')}Agendar pelo WhatsApp</a>
      <a class="botao botao-secundario" href="${href('/contato')}">Endereço e horários</a>
    </div>
  </div>
</section>`;
}

export function caixaAutor(chave, rotulo = 'Escrito e revisado por') {
  const p = profissionais[chave];
  return `
<aside class="caixa-autor" aria-label="Autoria">
  <div class="avatar">${p.foto ? `<img src="${href(p.foto)}" alt="${esc(nomeCompleto(p))}" width="72" height="72" loading="lazy">` : placeholder(nomeCompleto(p))}</div>
  <div>
    <p>${rotulo}</p>
    <strong><a href="${href('/' + (chave === 'girlane' ? p.slug : 'equipe#' + p.slug))}">${esc(nomeCompleto(p))}</a></strong>
    <p>${esc(p.cargo)}${p.conselho && !pendente(p.conselho.numero) ? ' · ' + registroTexto(p) : ''}</p>
  </div>
</aside>`;
}

// ---------------- Antes e depois ----------------
const nomesServico = {};
for (const sv of servicosAtivos) nomesServico[sv.slug] = sv.nome;

export function antesDepois(c, prioridade = false) {
  const nome = nomesServico[c.servico] || c.servico.replace(/-/g, ' ');
  const alt = (q) => `${q} do tratamento de ${nome.toLowerCase()} na Clínica Girlane Ferreira, Joinville`;
  const detalhes = [
    c.queixa && ['Queixa', c.queixa],
    c.tratamento && ['Tratamento', c.tratamento],
    c.sessoes && ['Sessões', c.sessoes],
    c.intervalo && ['Intervalo entre as fotos', c.intervalo],
  ].filter(Boolean);
  return `<figure class="cartao ad" id="caso-${esc(c.id)}">
  <div class="ad-palco" style="aspect-ratio:${c.depois.largura} / ${c.depois.altura}">
    <img class="ad-depois" src="${href(c.depois.src)}" alt="${esc(alt('Depois'))}" width="${c.depois.largura}" height="${c.depois.altura}" ${prioridade ? '' : 'loading="lazy"'} decoding="async">
    <img class="ad-antes" src="${href(c.antes.src)}" alt="${esc(alt('Antes'))}" width="${c.antes.largura}" height="${c.antes.altura}" ${prioridade ? '' : 'loading="lazy"'} decoding="async">
    <span class="ad-rotulo ad-rotulo-antes" aria-hidden="true">Antes</span><span class="ad-rotulo ad-rotulo-depois" aria-hidden="true">Depois</span>
    <span class="ad-linha" aria-hidden="true"></span>
    <input class="ad-controle" type="range" min="0" max="100" value="50" aria-label="Comparar antes e depois: arraste para a esquerda ou direita">
  </div>
  <figcaption class="cartao-corpo">
    <a class="tag tag-facial" href="${href('/tratamentos/' + c.servico)}">${esc(nome)}</a>
    ${detalhes.length ? `<dl class="ad-detalhes">${detalhes.map(([t, d]) => `<div><dt>${t}</dt><dd>${esc(d)}</dd></div>`).join('')}</dl>` : ''}
    ${c.observacao ? `<p>${esc(c.observacao)}</p>` : ''}
    <p class="ad-nota">Imagem publicada com autorização da paciente, sem edição. Resultados variam de pessoa para pessoa e dependem de avaliação individual.</p>
  </figcaption>
</figure>`;
}

/** Seção com 1 ou 2 casos. `servicos` define a prioridade; sem casos, não renderiza nada. */
export function blocoAntesDepois({ servicos = [], max = 2, titulo = 'Resultados reais', texto = '', fundo = '', pagina = '' } = {}) {
  const lista = casosPara(servicos, max);
  if (!lista.length) { faltando.add(pagina || servicos.join(',') || 'geral'); return ''; }
  return `<section class="secao ${fundo}" aria-labelledby="ad-${esc(pagina || 'x').replace(/\W/g, '')}">
  <div class="container">
    <div class="cabecalho-secao"><span class="sobretitulo">Antes e depois</span><h2 id="ad-${esc(pagina || 'x').replace(/\W/g, '')}">${esc(titulo)}</h2>${texto ? `<p class="lead">${esc(texto)}</p>` : ''}</div>
    <div class="grade ${lista.length > 1 ? 'grade-2' : 'ad-unico'}">${lista.map((c) => antesDepois(c)).join('')}</div>
    <p style="margin-top:24px"><a class="link-seta" href="${href('/resultados')}">Ver mais resultados ${icone('direita')}</a></p>
  </div>
</section>`;
}
