import { site, profissionais, depoimentos, revisadoEm } from './data/site.mjs';
import { servicos, servicosAtivos, categorias, pilares, queixas, destaquesHome } from './data/servicos.mjs';
import { artigos } from './data/artigos.mjs';
import { paginasNutricao, jornadaBase, destaques as destaquesNutri, homeNutricao } from './data/nutricao-paginas.mjs';
import { perguntasDe } from './perguntas.mjs';
import { esc, href, absoluta, whatsappUrl, enderecoLinha, mostrar, preenchido, pendente, mapsUrl, telLink, registroTexto, nomeCompleto, dataBR, setCaminho } from './lib.mjs';
import { pagina, icone, imagem, placeholder, trilha, faqHtml, ctaFinal, caixaAutor, blocoAntesDepois, antesDepois } from './layout.mjs';
import { foto, fotoEquipe, capaServico, capaResultado, fotoClinica, fotosClinica, todosCasos, faltando } from './imagens.mjs';
const P_faltando = (x) => faltando.add(x);

const fotoPro = (chave) => fotoEquipe(chave) || (profissionais[chave].foto ? { src: profissionais[chave].foto, largura: 960, altura: 1200 } : null);
const chaveDe = (p) => Object.keys(profissionais).find((k) => profissionais[k] === p);
const facial = servicosAtivos.filter((s) => s.categoria === 'facial').map((s) => s.slug);
function fotoHero() { return fotoClinica('fachada') || fotoClinica('recepcao') || fotoClinica('sala-1'); }

const legendas = {
  'recepcao': 'Recepção da Clínica Girlane Ferreira',
  'atendimento-recepcao': 'Atendimento na recepção da Clínica Girlane Ferreira',
  'consultorio-dra-girlane': 'Consultório da Dra. Girlane Ferreira',
  'sala-de-espera': 'Sala de espera da Clínica Girlane Ferreira',
  'sala-tratamentos-corporais': 'Sala de tratamentos corporais e drenagem linfática',
  'detalhes': 'Enxoval com a marca da Clínica Girlane Ferreira',
};
const altClinica = (f) => `${legendas[f.nome] || f.nome.replace(/-/g, ' ')}, no Jardim Iririú, Joinville`;
const galeria = () => fotosClinica().filter((f) => !/^(fachada|hero)/.test(f.nome) && f !== fotoHero() && f.src !== (fotoHero() || {}).src);

function heroHome() {
  // Foto da Dra. Girlane (fundo claro). Se faltar, volta para a foto da equipe (fundo escuro).
  const claro = !!fotoClinica('hero-girlane');
  const bg = fotoClinica('hero-girlane') || fotoClinica('hero-equipe');
  const mob = claro ? fotoClinica('hero-girlane-mobile') : fotoClinica('hero-equipe-mobile');
  const altFoto = claro
    ? `${nomeCompleto(g)}, biomédica esteta, na Clínica Girlane Ferreira em Joinville`
    : `${nomeCompleto(g)}, biomédica esteta, e ${profissionais.hericles.nome}, nutricionista, da Clínica Girlane Ferreira em Joinville`;
  const textos = `
      <h1>Rejuvenescimento e harmonização facial <span class="texto-degrade">com naturalidade.</span></h1>
      <p class="lead">Criamos planos de tratamento para o seu rosto que respeitam quem você é. Sem exagero, sem pressa, com acompanhamento.</p>
      <div class="botoes">
        <a class="botao botao-primario" href="${whatsappUrl()}" rel="noopener">${icone('whatsapp', 'icone-500')}Agendar consulta</a>
      </div>`;
  if (!bg) return `<section class="hero"><div class="container">${textos}</div></section>`;
  return `<section class="hero hero-foto-fundo${claro ? ' hero-claro' : ''}">
    <picture class="hero-fundo">
      ${mob ? `<source media="(max-width: 800px)" srcset="${href(mob.src)}" width="${mob.largura}" height="${mob.altura}">` : ''}
      <img src="${href(bg.src)}" alt="${esc(altFoto)}" width="${bg.largura}" height="${bg.altura}" fetchpriority="high" decoding="async">
    </picture>
    <div class="container hero-conteudo">${textos}</div>
  </section>`;
}
import { paginaSchema, faqSchema, pessoaSchema, ID } from './schema.mjs';

const g = profissionais.girlane;
const servicoPorSlug = Object.fromEntries(servicos.map((s) => [s.slug, s]));
const artigoPorSlug = Object.fromEntries(artigos.map((a) => [a.slug, a]));

// ---------------------------------------------------------------- componentes
function cartaoServico(s) {
  const c = categorias[s.categoria];
  return `<a class="cartao" href="${href('/tratamentos/' + s.slug)}">
    <div class="cartao-midia">${imagem({ foto: capaServico(s.slug), alt: `${s.nome} na Clínica Girlane Ferreira em Joinville` })}</div>
    <div class="cartao-corpo">
      <span class="tag tag-${c.cor}">${esc(c.nome)}</span>
      <h3>${esc(s.nome)}</h3>
      <p>${esc(s.resumo.split('. ')[0])}.</p>
      <span class="link-seta">Saiba mais ${icone('direita')}</span>
    </div>
  </a>`;
}

function cartaoArtigo(a, { leitura = true } = {}) {
  return `<a class="cartao" href="${href('/conteudo/' + a.slug)}">
    <div class="cartao-corpo">
      <span class="tag tag-facial">${esc(a.categoria)}</span>
      <h3>${esc(a.titulo)}</h3>
      <p>${esc(a.resumo.split('. ')[0])}.</p>
      <span class="link-seta">Ler artigo${leitura ? ` · ${a.leitura} min` : ''} ${icone('direita')}</span>
    </div>
  </a>`;
}

function blocoLocal() {
  const temHorario = site.horarios.length > 0;
  const nomesDias = { Monday: 'Seg', Tuesday: 'Ter', Wednesday: 'Qua', Thursday: 'Qui', Friday: 'Sex', Saturday: 'Sáb', Sunday: 'Dom' };
  const horarioTxt = temHorario
    ? site.horarios.map((h) => `${h.dias.map((d) => nomesDias[d]).join(', ')}: ${h.abre} às ${h.fecha}`).join('<br>')
    : mostrar('PREENCHER: Horários de atendimento', 'Horários');
  return `<div class="local">
    <div class="local-item">${icone('pin')}<div><h3>Endereço</h3><address>${enderecoLinha()}${site.endereco.referencia ? `<br>${esc(site.endereco.referencia)}` : ''}</address><p style="margin-top:8px"><a class="link-seta" href="${mapsUrl()}" rel="noopener">Abrir no Google Maps ${icone('direita')}</a></p></div></div>
    <div class="local-item">${icone('relogio')}<div><h3>Horários</h3><p>${horarioTxt}<br>${esc(site.atendimentoObservacao)}</p></div></div>
    <div class="local-item">${icone('whatsapp')}<div><h3>Agendamento</h3><p><a href="${whatsappUrl()}" rel="noopener">WhatsApp ${preenchido(site.telefone) ? esc(site.telefone) : ''}</a>${preenchido(site.email) ? `<br><a href="mailto:${esc(site.email)}">${esc(site.email)}</a>` : ''}</p></div></div>
  </div>`;
}

// Página inicial: mapa do Google com "Como chegar" e endereço; horários e agendamento ao lado.
function blocoVisita() {
  const e = site.endereco;
  const enderecoBusca = `${e.rua} - ${e.bairro}, ${e.cidade} - ${e.uf}, ${e.cep}`;
  // Com o código do lugar e as coordenadas, o mapa mostra o perfil da clínica no Google;
  // sem eles, cai na busca pelo endereço.
  const lugar = site.perfis.googleMapsLugar;
  const temGeo = preenchido(e.latitude) && preenchido(e.longitude);
  const mapa = lugar && temGeo
    ? `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d600!2d${e.longitude}!3d${e.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s${encodeURIComponent(lugar)}!2s${encodeURIComponent(site.nome)}!5e0!3m2!1spt-BR!2sbr!4v1764240000000!5m2!1spt-BR!2sbr`
    : 'https://maps.google.com/maps?q=' + encodeURIComponent(enderecoBusca) + '&z=16&hl=pt-BR&output=embed';
  const rota = 'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(temGeo ? `${e.latitude},${e.longitude}` : enderecoBusca);
  const nomes = { Monday: 'segunda', Tuesday: 'terça', Wednesday: 'quarta', Thursday: 'quinta', Friday: 'sexta', Saturday: 'sábado', Sunday: 'domingo' };
  const cap = (t) => t.charAt(0).toUpperCase() + t.slice(1);
  const dias = (h) => cap(h.dias.length > 2 ? `${nomes[h.dias[0]]} a ${nomes[h.dias.at(-1)]}` : h.dias.map((d) => nomes[d]).join(' e '));
  const hora = (t) => t.replace(/^0/, '').replace(':00', 'h').replace(':', 'h');
  return `<div class="visita">
    <div class="cartao visita-mapa-cartao">
      <div class="visita-mapa">
        <iframe src="${mapa}" title="Mapa com a localização da ${esc(site.nome)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
        <a class="botao botao-primario visita-rota" href="${rota}" rel="noopener">${icone('pin', 'icone-500')}Como chegar</a>
      </div>
      <address class="visita-endereco">${icone('pin')}<span>${enderecoLinha()}${e.referencia ? `<br>${esc(e.referencia)}` : ''}</span></address>
    </div>
    <aside class="cartao visita-info" aria-labelledby="titulo-horarios">
      <h3 id="titulo-horarios">${icone('relogio')}Horários</h3>
      ${site.horarios.length
        ? `<dl class="visita-horarios">${site.horarios.map((h) => `<div><dt>${dias(h)}</dt><dd>${hora(h.abre)} às ${hora(h.fecha)}</dd></div>`).join('')}</dl>`
        : `<p>${mostrar('PREENCHER: Horários de atendimento', 'Horários')}</p>`}
      <p class="visita-obs">${esc(site.atendimentoObservacao)}</p>
      ${site.horarios.length ? `<p class="visita-resumo">${site.horarios.map((h) => `${dias(h)}, ${hora(h.abre)} às ${hora(h.fecha)}`).join(' · ')}. ${esc(site.atendimentoObservacao)}</p>` : ''}
      <a class="botao botao-primario visita-agendar" href="${whatsappUrl()}" rel="noopener">${icone('whatsapp', 'icone-500')}Agendar consulta</a>
      ${preenchido(site.telefone) ? `<p class="visita-tel">ou ligue <a href="${telLink()}">${esc(site.telefone)}</a></p>` : ''}
    </aside>
  </div>`;
}

// Etapas do atendimento (texto da Dra. Girlane). Usadas na página inicial e em Como funciona.
const etapasAtendimento = [
  { titulo: 'Consulta', texto: 'Conversamos sem pressa. Aqui entendemos suas queixas e os resultados que vamos construir juntos.' },
  { titulo: 'Tratamento', texto: 'Definimos as prioridades, a melhor técnica e o tratamento indicado para o seu caso.' },
  { titulo: 'Acompanhamento', texto: 'Depois do tratamento, acompanhamos você de perto para chegar ao melhor resultado.' },
];

// Avaliações do Google em faixas animadas (página inicial e Resultados)
function blocoAvaliacoes(fundo = '') {
  const av = site.avaliacoesGoogle && site.avaliacoesGoogle.total ? site.avaliacoesGoogle : null;
  if (!depoimentos.length && !av) return '';
  return `<section class="secao ${fundo}" aria-labelledby="titulo-depoimentos">
  <div class="container">
    <div class="cabecalho-secao">
      <h2 id="titulo-depoimentos">O que dizem as pacientes.</h2>
    </div>
  </div>
  ${depoimentos.length ? (() => {
    // Foto só de quem autorizou (campo "foto" em site.mjs); as demais ficam com a inicial do nome.
    const avatar = (d) => d.foto
      ? `<img class="avatar" src="${href(d.foto)}" alt="" width="36" height="36" loading="lazy" decoding="async">`
      : `<span class="avatar" aria-hidden="true">${esc(d.autor.trim().charAt(0).toUpperCase())}</span>`;
    const cartoes = (lista, oculto) => lista.map((d) => `<figure class="depoimento"${oculto ? ' aria-hidden="true"' : ''}><div class="estrelas"${oculto ? '' : ' role="img" aria-label="5 estrelas"'}>${icone('estrela').repeat(5)}</div><blockquote>“${esc(d.texto)}”</blockquote><figcaption>${avatar(d)}<span>${esc(d.autor)}${d.fonte ? ' · avaliação no ' + esc(d.fonte) : ''}</span></figcaption></figure>`).join('');
    // Duas faixas: a de cima anda para a esquerda, a de baixo para a direita.
    // Cada lista aparece duas vezes para o movimento emendar sem salto; a cópia fica escondida dos leitores de tela.
    const meio = Math.ceil(depoimentos.length / 2);
    const linhas = depoimentos.length > 3 ? [depoimentos.slice(0, meio), depoimentos.slice(meio)] : [depoimentos];
    const faixa = (lista, i) => `<div class="faixa-avaliacoes${i ? ' faixa-avaliacoes-direita' : ''}" tabindex="0" aria-label="Avaliações de pacientes no Google${linhas.length > 1 ? `, faixa ${i + 1} de ${linhas.length}` : ''}"><div class="faixa-avaliacoes-trilho" style="--duracao:${lista.length * 15}s">${cartoes(lista, false)}${cartoes(lista, true)}</div></div>`;
    return `<div class="faixas-avaliacoes">${linhas.map(faixa).join('')}</div>`;
  })() : ''}
  <div class="container">
    ${preenchido(site.perfis.googleMaps) ? `<p class="depoimentos-rodape"><a class="link-seta" href="${site.perfis.googleMaps}" rel="noopener">Ver todas as avaliações no Google ${icone('direita')}</a></p>` : ''}
  </div>
</section>`;
}

// ---------------------------------------------------------------- Nutrição (Hericles)
// Abertura com a foto de fundo do site do Hericles (escuro, ele à direita), usada
// na página inicial de Nutrição e nas páginas de cada serviço de nutrição.
function heroNutri({ trilhaHtml = '', sobretitulo = '', tituloHtml, intro, botoes }) {
  const bg = foto('img/nutricao/hero-nutri.webp');
  const mob = foto('img/nutricao/hero-nutri-mobile.webp');
  return `<section class="hero hero-foto-fundo hero-nutri">
    ${bg ? `<picture class="hero-fundo">
      ${mob ? `<source media="(max-width: 800px)" srcset="${href(mob.src)}" width="${mob.largura}" height="${mob.altura}">` : ''}
      <img src="${href(bg.src)}" alt="Hericles Ferreira, nutricionista da Clínica Girlane Ferreira em Joinville" width="${bg.largura}" height="${bg.altura}" fetchpriority="high" decoding="async">
    </picture>` : ''}
    <div class="container hero-conteudo">
      ${trilhaHtml}
      ${sobretitulo ? `<span class="hero-sobretitulo">${esc(sobretitulo)}</span>` : ''}
      <h1>${tituloHtml}</h1>
      <p class="lead">${esc(intro)}</p>
      <div class="botoes">${botoes}</div>
    </div>
  </section>`;
}
// Palavra que troca sozinha (como no site do Hericles). Leitores de tela ouvem só a primeira.
function rotador(palavras) {
  const lista = [...palavras, palavras[0]];
  return `<span class="visualmente-oculto">${esc(palavras[0])}</span><span class="rotador" aria-hidden="true"><span class="rotador-trilho rotador-${lista.length}">${lista.map((w) => `<span>${esc(w)}</span>`).join('')}</span></span>`;
}
function faixaDestaquesNutri() {
  const icones = ['pin', 'relogio', 'check'];
  return `<section class="faixa-confianca" aria-label="Como é o atendimento">
  <div class="container"><ul>
    ${destaquesNutri.map(([t, d], i) => `<li>${icone(icones[i] || 'check')}<span><strong>${esc(t)}</strong>${esc(d)}</span></li>`).join('')}
  </ul></div>
</section>`;
}

export function nutricao() {
  const caminho = '/nutricao';
  setCaminho(caminho);
  const h = homeNutricao;
  const pro = profissionais.hericles;
  const agendar = whatsappUrl(`Olá! Vim pelo site e gostaria de agendar com ${nomeCompleto(pro)}.`);
  const servs = servicosAtivos.filter((s) => s.categoria === 'nutricao');
  const perguntas = perguntasDe('nutricao', 'Nutrição (página inicial de nutrição)', h.faqs);
  const cartao = (s) => `<a class="cartao cartao-servico" href="${href('/tratamentos/' + s.slug)}">
    ${capaResultado(s.slug)
      ? `<div class="cartao-midia capa-resultado">${imagem({ foto: capaResultado(s.slug), alt: `Antes e depois de ${s.nome.toLowerCase()}` })}<span aria-hidden="true">Antes</span><span aria-hidden="true">Depois</span></div>`
      : `<div class="cartao-midia">${imagem({ foto: capaServico(s.slug), alt: s.nome })}</div>`}
    <div class="cartao-corpo"><h3>${esc(s.nome)}</h3><p>${esc(s.curto || '')}</p><span class="link-seta">Saiba mais ${icone('direita')}</span></div>
  </a>`;
  const corpo = `
${heroNutri({
  trilhaHtml: trilha([[caminho, 'Nutrição']]),
  sobretitulo: h.sobretitulo,
  tituloHtml: `${rotador(h.palavras)} <span class="titulo-linha">${esc(h.tituloFim)}</span>`,
  intro: h.intro,
  botoes: `<a class="botao botao-primario" href="${agendar}" rel="noopener">${icone('whatsapp', 'icone-500')}Agendar consulta</a><a class="botao botao-secundario" href="#quem-sou-eu">Conheça o nutri</a>`,
})}
${faixaDestaquesNutri()}

<section class="secao" aria-labelledby="titulo-jornada-nutri">
  <div class="container">
    <div class="cabecalho-secao">
      <span class="sobretitulo">Seu acompanhamento</span>
      <h2 id="titulo-jornada-nutri">Sua jornada para<br>${rotador(h.jornadaPalavras)}<br>começa aqui</h2>
      <p class="lead">${esc(h.jornadaTexto)}</p>
    </div>
    <ol class="jornada" tabindex="0" aria-label="Etapas do acompanhamento">
      ${jornadaBase.map((e) => `<li class="jornada-cartao">
        <div class="jornada-foto">${imagem({ src: e.img, alt: `${e.rotulo}: ${e.titulo}`, largura: 900, altura: 563 })}</div>
        <div class="jornada-corpo"><span class="jornada-rotulo"><b>${esc(e.n)}</b>${esc(e.rotulo)}</span><h3>${esc(e.titulo)}</h3><p>${esc(e.texto)}</p></div>
      </li>`).join('')}
    </ol>
    <div class="jornada-fecho"><p>${esc(h.jornadaFecho)}</p><a class="botao botao-primario" href="${agendar}" rel="noopener">${icone('whatsapp', 'icone-500')}Agendar consulta</a></div>
  </div>
</section>

<section class="secao secao-creme" aria-labelledby="titulo-servicos-nutri">
  <div class="container">
    <div class="cabecalho-secao"><span class="sobretitulo">Como posso te ajudar</span><h2 id="titulo-servicos-nutri">Serviços de nutrição</h2></div>
    <div class="grade grade-servicos">${servs.map(cartao).join('')}</div>
  </div>
</section>

<section class="secao" aria-labelledby="titulo-leituras-nutri">
  <div class="container">
    <div class="cabecalho-secao"><span class="sobretitulo">Leituras do nutri</span><h2 id="titulo-leituras-nutri">Artigos que escrevi recentemente</h2></div>
    <div class="grade grade-2">
      ${h.artigos.map((a) => `<a class="cartao" href="${a.url}" rel="noopener"><div class="cartao-corpo">
        <span class="tag tag-nutricao">${esc(a.categoria)}</span><h3>${esc(a.titulo)}</h3><p>${esc(a.resumo)}</p>
        <span class="link-seta">Ler artigo ${icone('direita')}</span></div></a>`).join('')}
    </div>
  </div>
</section>

<section class="secao secao-creme quem-sou-nutri" id="quem-sou-eu" aria-labelledby="titulo-quem-sou">
  <div class="container perfil">
    <div class="perfil-foto">${imagem({ foto: fotoPro('hericles'), alt: `${nomeCompleto(pro)}, nutricionista`, largura: 960, altura: 1200 })}</div>
    <div>
      <span class="sobretitulo">Quem sou eu</span>
      <h2 id="titulo-quem-sou">${esc(h.quemSouTitulo)}</h2>
      ${h.quemSou.map((t, i) => `<p class="${i ? 'apresentacao' : 'lead'}">${esc(t)}</p>`).join('')}
      <p class="apresentacao"><strong>${esc(h.missao)}</strong></p>
      <div class="equipe-tags">${['CRN-10 12284', 'Pós em Metabolismo e Emagrecimento', 'Joinville/SC', '@nutrihericles'].map((t) => `<span class="tag-servico">${esc(t)}</span>`).join('')}</div>
      <div class="botoes"><a class="botao botao-primario" href="${agendar}" rel="noopener">${icone('whatsapp', 'icone-500')}Fale comigo agora</a><a class="botao botao-secundario" href="${href('/equipe#' + pro.slug)}">Minha trajetória e formação</a></div>
    </div>
  </div>
</section>

<section class="secao chamada-nutri" aria-labelledby="titulo-chamada-nutri">
  <div class="container centro">
    <h2 id="titulo-chamada-nutri">${esc(h.chamadaTitulo)}<br>${esc(h.chamadaTitulo2.replace(/você\.$/, ''))}<em>você.</em></h2>
    <p class="lead" style="margin-inline:auto">${esc(h.chamadaTexto)}</p>
    <div class="botoes" style="justify-content:center;margin-top:24px"><a class="botao botao-primario" href="${agendar}" rel="noopener">${icone('whatsapp', 'icone-500')}Agendar consulta</a></div>
  </div>
</section>

${perguntas.length ? `<section class="secao secao-clara" aria-labelledby="titulo-faq-nutri">
  <div class="container-texto">
    <h2 id="titulo-faq-nutri">Perguntas frequentes</h2>
    ${faqHtml(perguntas)}
    <p style="margin-top:24px">Ainda tem dúvida sobre emagrecimento, hipertrofia ou consultoria on-line? <a href="${agendar}" rel="noopener">Fale no WhatsApp</a>.</p>
  </div>
</section>` : ''}

<section class="secao" aria-labelledby="titulo-onde-nutri">
  <div class="container">
    <div class="cabecalho-secao"><span class="sobretitulo">Atendimento presencial em Joinville</span><h2 id="titulo-onde-nutri">Onde fica o consultório?</h2>
    <p class="lead">O atendimento presencial é aqui na Clínica Girlane Ferreira, em um espaço preparado para medir a sua composição corporal, acompanhar a sua evolução e definir a sua estratégia nutricional.</p></div>
    ${blocoVisita()}
  </div>
</section>`;
  return {
    caminho,
    prioridade: '0.9',
    html: pagina({
      caminho,
      titulo: 'Nutricionista em Joinville | Hericles Ferreira na Clínica Girlane Ferreira',
      descricao: 'Nutricionista em Joinville, presencial e on-line: emagrecimento, ganho de massa muscular e acompanhamento semanal com Hericles Ferreira (CRN-10 12284).',
      corpo,
      schema: [
        ...paginaSchema({ caminho, nome: 'Nutrição', descricao: 'Nutrição com Hericles Ferreira na Clínica Girlane Ferreira', tipo: 'MedicalWebPage', trilha: [[caminho, 'Nutrição']] }),
        pessoaSchema(pro),
        perguntas.length ? faqSchema(caminho, perguntas) : null,
      ].filter(Boolean),
    }),
  };
}

// ---------------------------------------------------------------- páginas
export function home() {
  const caminho = '/';
  setCaminho(caminho);
  const av = site.avaliacoesGoogle && site.avaliacoesGoogle.total ? site.avaliacoesGoogle : null;
  const catDe = (q) => servicoPorSlug[q.servico]?.ativo && servicoPorSlug[q.servico].categoria;
  const sinaisRosto = queixas.filter((q) => catDe(q) === 'facial');
  const sinaisCorpo = queixas.filter((q) => catDe(q) && catDe(q) !== 'facial');
  const destaques = destaquesHome.map((slug) => servicoPorSlug[slug]).filter((sv) => sv && sv.ativo);
  const corpo = `
${heroHome()}

<section class="faixa-confianca" aria-label="Por que confiar em nós">
  <div class="container">
    <ul>
      ${g.anosDeExperiencia ? `<li>${icone('relogio')}<span><strong>${g.anosDeExperiencia} anos</strong>de experiência em estética</span></li>` : ''}
      <li>${icone('selo')}<span><strong>Biomédica esteta</strong>${registroTexto(g)}</span></li>
      <li>${icone('check')}<span><strong>Plano de reestruturação facial e corporal</strong>nada de procedimento solto</span></li>
    </ul>
  </div>
</section>

<section class="secao" aria-labelledby="titulo-metodo">
  <div class="container">
    <div class="cabecalho-secao centro">
      <h2 id="titulo-metodo">Três pilares. Um plano só seu.</h2>
    </div>
    <div class="grade pilares-lado">
      ${Object.values(pilares).map((p) => `<article class="pilar"><h3>${esc(p.nome)}</h3><p>${esc(p.texto)}</p></article>`).join('')}
    </div>
    <p class="centro" style="margin-top:32px"><a class="link-seta" href="${href('/metodo')}">Como o plano de tratamento funciona ${icone('direita')}</a></p>
  </div>
</section>

<section class="secao secao-creme" aria-labelledby="titulo-sinais">
  <div class="container">
    <div class="cabecalho-secao">
      <h2 id="titulo-sinais">Você reconhece esses sinais no seu rosto?</h2>
      <p class="lead">O envelhecimento é natural. O que tratamos é o que tira o equilíbrio do seu rosto.</p>
    </div>
    <div class="grade grade-3">
      ${sinaisRosto.map((q) => `<a class="sinal" href="${href('/tratamentos/' + q.servico)}"><h3>${esc(q.titulo)}</h3><p>${esc(q.texto)}</p></a>`).join('')}
    </div>
    ${sinaisCorpo.length ? `<h3 class="sinais-corpo-titulo">Para o corpo</h3><div class="grade grade-3">${sinaisCorpo.map((q) => `<a class="sinal" href="${href('/tratamentos/' + q.servico)}"><h3>${esc(q.titulo)}</h3><p>${esc(q.texto)}</p></a>`).join('')}</div>` : ''}
  </div>
</section>

<section class="secao" aria-labelledby="titulo-dra">
  <div class="container perfil">
    <div class="perfil-foto">${imagem({ foto: fotoPro('girlane'), alt: `${nomeCompleto(g)}, biomédica esteta em Joinville`, largura: 960, altura: 1200 })}</div>
    <div>
      <span class="sobretitulo">Quem cuida de você</span>
      <h2 id="titulo-dra">${esc(nomeCompleto(g))}</h2>
      ${(g.apresentacao || [g.bioCurta]).map((t, i) => `<p class="${i ? 'apresentacao' : 'lead'}">${esc(t)}</p>`).join('')}
      <p><span class="credencial">${icone('selo')}${registroTexto(g)}</span><span class="credencial">${icone('check')}${esc(g.conselho.habilitacao)}</span>${g.anosDeExperiencia ? `<span class="credencial">${icone('relogio')}${g.anosDeExperiencia} anos de experiência em estética</span>` : ''}</p>
      <a class="link-seta" href="${href('/equipe')}">Formação e trajetória ${icone('direita')}</a>
    </div>
  </div>
</section>

<section class="secao secao-creme" aria-labelledby="titulo-etapas">
  <div class="container">
    <div class="cabecalho-secao">
      <h2 id="titulo-etapas">Da consulta ao acompanhamento.</h2>
    </div>
    <ol class="etapas etapas-sem-numero">
      ${etapasAtendimento.map((e) => `<li><h3>${esc(e.titulo)}</h3><p>${esc(e.texto)}</p></li>`).join('')}
    </ol>
  </div>
</section>

<section class="secao" aria-labelledby="titulo-tratamentos">
  <div class="container cabecalho-secao">
    <h2 id="titulo-tratamentos">O <strong><em>rosto</em></strong> em primeiro lugar.<br>Corpo e nutrição complementam o cuidado.</h2>
    <p class="lead">Estes são os serviços que você encontra aqui.</p>
  </div>
  <div class="carrossel-envoltorio">
    <div class="carrossel" id="carrossel-tratamentos" tabindex="0" aria-label="Tratamentos em destaque">
      ${destaques.map(cartaoServico).join('')}
    </div>
    <div class="container carrossel-setas">
      <a class="botao botao-secundario" href="${href('/tratamentos')}">Ver todos os tratamentos</a>
      <span class="carrossel-setas-botoes">
        <button class="seta" type="button" data-carrossel="carrossel-tratamentos" data-direcao="-1" aria-label="Tratamentos anteriores">${icone('esquerda')}</button>
        <button class="seta" type="button" data-carrossel="carrossel-tratamentos" data-direcao="1" aria-label="Próximos tratamentos">${icone('direita')}</button>
      </span>
    </div>
  </div>
</section>

${blocoAvaliacoes('secao-creme')}

${blocoAntesDepois({ servicos: facial, titulo: 'Resultados que continuam parecendo você.', texto: 'Casos reais das nossas pacientes, publicados com autorização. Arraste para comparar.', pagina: 'home' })}

<section class="secao editorial" aria-labelledby="titulo-conteudo">
  <div class="container">
    <header class="editorial-cabecalho">
      <span class="editorial-rubrica">Escrito pela Dra. Girlane Ferreira</span>
      <h2 id="titulo-conteudo">Artigos que escrevi recentemente</h2>
      <a class="link-seta" href="${href('/conteudo')}">Todos os artigos ${icone('direita')}</a>
    </header>
    ${(() => {
      const [principal, ...outros] = artigos.slice(0, 4);
      const data = (x) => `<time datetime="${x.publicado}">${dataBR(x.publicado)}</time>`;
      const foto = g.foto ? { src: g.foto } : fotoPro('girlane');
      return `<div class="editorial-grade">
      <article class="materia materia-principal">
        <span class="materia-editoria">${esc(principal.categoria)}</span>
        <h3><a href="${href('/conteudo/' + principal.slug)}">${esc(principal.titulo)}</a></h3>
        <p class="materia-linha-fina">${esc(principal.resumo)}</p>
        <p class="materia-assinatura">${foto ? `<img src="${href(foto.src)}" alt="" width="44" height="44" loading="lazy" decoding="async">` : ''}<span>Por <strong>${esc(nomeCompleto(g))}</strong><br>Biomédica esteta, ${registroTexto(g)} · ${data(principal)}</span></p>
        <a class="link-seta" href="${href('/conteudo/' + principal.slug)}">Ler o artigo ${icone('direita')}</a>
      </article>
      <div class="materias-secundarias">
        ${outros.map((x) => `<article class="materia">
          <span class="materia-editoria">${esc(x.categoria)}</span>
          <h3><a href="${href('/conteudo/' + x.slug)}">${esc(x.titulo)}</a></h3>
          <p class="materia-data">Por Dra. Girlane Ferreira · ${data(x)}</p>
        </article>`).join('')}
      </div>
    </div>`;
    })()}
  </div>
</section>

<section class="secao secao-clara" aria-labelledby="titulo-local">
  <div class="container">
    <div class="cabecalho-secao">
      <span class="sobretitulo">Visite a clínica</span>
      <h2 id="titulo-local">Clínica de estética em Joinville.</h2>
      <p class="lead">Atendemos pacientes de Joinville e região: ${esc(site.areasAtendidas.slice(1).join(', '))}.</p>
    </div>
    ${(() => {
      // Computador: recepção grande + 3 fotos embaixo. Celular: todas num carrossel de arrastar.
      const fotos = [
        ...(fotoClinica('recepcao') ? [{ foto: fotoClinica('recepcao'), alt: 'Recepção da Clínica Girlane Ferreira no Jardim Iririú, Joinville' }] : []),
        ...galeria().slice(0, 3).map((f) => ({ foto: f, alt: altClinica(f) })),
      ];
      return fotos.length ? `<div class="visita-fotos" tabindex="0" aria-label="Fotos da clínica">${fotos.map((f) => `<figure class="foto-larga">${imagem(f)}</figure>`).join('')}</div>` : '';
    })()}
    ${blocoVisita()}
  </div>
</section>
${ctaFinal()}`;
  return {
    caminho,
    prioridade: '1.0',
    html: pagina({
      caminho,
      titulo: 'Clínica Girlane Ferreira | Rejuvenescimento e harmonização facial em Joinville',
      descricao: 'Rejuvenescimento e harmonização facial com naturalidade em Joinville, com a biomédica esteta Dra. Girlane Ferreira. Planos de tratamento para o seu rosto, com acompanhamento.',
      corpo,
      schema: [...paginaSchema({ caminho, nome: site.nome, descricao: site.descricao })],
    }),
  };
}

// Como funciona (endereço /metodo): pilares, etapas, corpo e nutrição, perguntas.
export function metodo() {
  const caminho = '/metodo';
  setCaminho(caminho);
  // etiqueta de serviço: [nome, slug] ou nome solto (sem página própria)
  const tag = (nome, slug) => slug
    ? `<a class="tag-servico" href="${href('/tratamentos/' + slug)}">${esc(nome)}</a>`
    : `<span class="tag-servico">${esc(nome)}</span>`;
  const tagsDe = (pro) => (pro.servicosTags || []).map((t) => {
    const [n, slug] = Array.isArray(t) ? t : [t, null];
    const s = slug ? servicoPorSlug[slug] : servicosAtivos.find((x) => x.nome.toLowerCase() === n.toLowerCase());
    return tag(n, s && s.ativo ? s.slug : null);
  }).join('');
  const parceiros = Object.values(profissionais).filter((pro) => pro !== g);
  const corpo = `
<section class="cabecalho-pagina"><div class="container">
  ${trilha([[caminho, 'Como funciona']])}
  <h1>Um plano de tratamento, não um procedimento.</h1>
  <p class="lead">Organizamos o seu cuidado em três pilares e em etapas, com acompanhamento a cada passo.</p>
</div></section>

<section class="secao" aria-labelledby="titulo-pilares">
  <div class="container-texto prosa">
    <h2 id="titulo-pilares">Por que trabalhamos em pilares</h2>
    <p>O rosto muda por dentro antes de mudar por fora. O osso perde projeção, as bolsas de gordura diminuem e descem, os ligamentos afrouxam e a pele produz menos colágeno. Explicamos cada camada no artigo <a href="${href('/conteudo/envelhecimento-facial-camadas')}">Por que o rosto envelhece</a>.</p>
    <p>Cada pilar responde a uma dessas mudanças:</p>
  </div>
  <div class="container" style="margin-top:32px">
    <div class="grade pilares-lado">
      ${Object.entries(pilares).map(([k, pl]) => {
        return `<article class="pilar"><h3>${esc(pl.nome)}</h3><p>${esc(pl.texto)}</p></article>`;
      }).join('')}
    </div>
  </div>
</section>

<section class="secao secao-creme" aria-labelledby="titulo-etapas-metodo">
  <div class="container">
    <div class="cabecalho-secao">
      <h2 id="titulo-etapas-metodo">Da consulta ao acompanhamento.</h2>
    </div>
    <ol class="etapas etapas-sem-numero">
      ${etapasAtendimento.map((e) => `<li><h3>${esc(e.titulo)}</h3><p>${esc(e.texto)}</p></li>`).join('')}
    </ol>
  </div>
</section>

${parceiros.length ? `<section class="secao" aria-labelledby="titulo-corpo-nutricao">
  <div class="container">
    <div class="cabecalho-secao">
      <h2 id="titulo-corpo-nutricao">Corpo e nutrição fazem parte do plano.</h2>
      <p class="lead">Colágeno precisa de proteína e micronutrientes para ser produzido, e o corpo também envelhece. Por isso o plano pode incluir nutrição e tratamentos corporais, com profissionais da nossa equipe.</p>
    </div>
    <div class="grade grade-2">
      ${parceiros.map((pro) => `<article class="pilar parceiro">
        <div class="parceiro-topo">
          ${pro.foto || fotoPro(chaveDe(pro)) ? `<img class="parceiro-foto" src="${href(pro.foto || fotoPro(chaveDe(pro)).src)}" alt="" width="56" height="56" loading="lazy" decoding="async">` : ''}
          <div><h3>${esc(nomeCompleto(pro))}</h3><span class="parceiro-cargo">${esc(pro.cargo)}</span></div>
        </div>
        <div class="pilar-tags">${tagsDe(pro)}</div>
        <a class="link-seta" href="${href('/equipe#' + pro.slug)}">Conheça na Equipe ${icone('direita')}</a>
      </article>`).join('')}
    </div>
  </div>
</section>` : ''}

${blocoAntesDepois({ servicos: ['harmonizacao-facial', 'bioestimuladores-de-colageno', ...facial], titulo: 'O método na prática', texto: 'Planos em etapas, com acompanhamento.', fundo: 'secao-creme', pagina: 'metodo' })}
${ctaFinal()}`;
  return {
    caminho,
    prioridade: '0.8',
    html: pagina({
      caminho,
      titulo: 'Como funciona: tratamento facial em 3 pilares | Clínica Girlane Ferreira',
      descricao: 'Como funciona o tratamento na Clínica Girlane Ferreira em Joinville: plano facial em três pilares (estrutura, firmeza e qualidade da pele), da consulta ao acompanhamento.',
      corpo,
      schema: [...paginaSchema({ caminho, nome: 'Como funciona', descricao: 'Plano de tratamento facial em três pilares, da consulta ao acompanhamento.', tipo: 'MedicalWebPage', trilha: [[caminho, 'Como funciona']] })],
    }),
  };
}

// Serviços (endereço /tratamentos): um bloco por área, com quem atende,
// cartões compactos e, no Corpo, os demais serviços da Diva.
export function tratamentos() {
  const caminho = '/tratamentos';
  setCaminho(caminho);
  const cartaoCompacto = (s) => `<a class="cartao cartao-servico" href="${href('/tratamentos/' + s.slug)}">
    ${capaResultado(s.slug)
      ? `<div class="cartao-midia capa-resultado">${imagem({ foto: capaResultado(s.slug), alt: `Antes e depois de ${s.nome.toLowerCase()} na Clínica Girlane Ferreira em Joinville` })}<span aria-hidden="true">Antes</span><span aria-hidden="true">Depois</span></div>`
      : `<div class="cartao-midia">${imagem({ foto: capaServico(s.slug), alt: `${s.nome} na Clínica Girlane Ferreira em Joinville` })}</div>`}
    <div class="cartao-corpo">
      <h3>${esc(s.nome)}</h3>
      <p>${esc(s.curto || s.resumo.split('. ')[0] + '.')}</p>
      <span class="link-seta">Saiba mais ${icone('direita')}</span>
    </div>
  </a>`;
  // selo "Com fulano" (foto, nome e cargo), que leva ao perfil na Equipe
  const selo = (chave) => {
    const pro = profissionais[chave];
    const foto = pro.foto || fotoPro(chave)?.src;
    return `<a class="servicos-quem" href="${href('/equipe#' + pro.slug)}">${foto ? `<img src="${href(foto)}" alt="" width="40" height="40" loading="lazy" decoding="async">` : ''}<span>Com ${esc(pro === g ? 'a ' + nomeCompleto(pro) : nomeCompleto(pro))}<small>${esc(pro.cargo.split(',')[0])}</small></span></a>`;
  };
  // um bloco por área; quando a área tem mais de um profissional (ex.: Corpo),
  // os cartões são separados por quem atende. Serviço feito pelos dois aparece nos dois.
  const blocos = Object.entries(categorias).map(([k, c], i) => {
    const lista = servicosAtivos.filter((s) => s.categoria === k);
    if (!lista.length) return '';
    const chaves = [...new Set(lista.flatMap((s) => [s.profissional, ...(s.tambem || [])]))];
    const doProfissional = (ch) => lista.filter((s) => s.profissional === ch || (s.tambem || []).includes(ch));
    const conteudo = chaves.length === 1
      ? `<div class="cabecalho-secao servicos-cabecalho"><h2 id="cat-${k}">${esc(c.nome)}</h2>${selo(chaves[0])}</div>
      <div class="grade grade-servicos">${lista.map(cartaoCompacto).join('')}</div>`
      : `<div class="cabecalho-secao servicos-cabecalho"><h2 id="cat-${k}">${esc(c.nome)}</h2></div>
      ${chaves.map((ch) => `<div class="servicos-subgrupo">
        <div class="servicos-subcabecalho">${selo(ch)}</div>
        <div class="grade grade-servicos">${doProfissional(ch).map(cartaoCompacto).join('')}</div>
      </div>`).join('')}`;
    return `<section class="secao ${i % 2 ? 'secao-creme' : ''}" aria-labelledby="cat-${k}"><div class="container">
      ${conteudo}
    </div></section>`;
  }).join('');
  const corpo = `
<section class="cabecalho-pagina"><div class="container">
  ${trilha([[caminho, 'Serviços']])}
  <h1>Serviços</h1>
  <p class="lead">Rosto, corpo e nutrição. Cada serviço entra no plano quando faz sentido para você, depois da consulta.</p>
</div></section>
${blocos}
${blocoAntesDepois({ servicos: facial, titulo: 'Alguns resultados', pagina: 'tratamentos' })}
${ctaFinal('Não sabe por onde começar?', 'Na consulta definimos juntos o que tratar primeiro. É para isso que ela existe.')}`;
  const lista = {
    '@type': 'ItemList',
    '@id': absoluta(caminho) + '#lista',
    itemListElement: servicosAtivos.map((s, i) => ({ '@type': 'ListItem', position: i + 1, url: absoluta('/tratamentos/' + s.slug), name: s.nome })),
  };
  return {
    caminho,
    prioridade: '0.9',
    html: pagina({
      caminho,
      titulo: 'Serviços de estética e nutrição em Joinville | Clínica Girlane Ferreira',
      descricao: 'Harmonização facial, preenchimento, botox, bioestimuladores, skinbooster, manchas, microagulhamento, drenagem, massagens e nutrição em Joinville.',
      corpo,
      schema: [...paginaSchema({ caminho, nome: 'Serviços', descricao: 'Serviços de estética e nutrição', tipo: 'CollectionPage', trilha: [[caminho, 'Serviços']], extra: { mainEntity: { '@id': absoluta(caminho) + '#lista' } } }), lista],
    }),
  };
}

export function paginaServico(s) {
  const nomeFrase = s.nomeTexto || s.nome.toLowerCase();
  // perguntas: do arquivo perguntas-frequentes.txt, se houver; senão, as do código
  const perguntasServico = perguntasDe('tratamentos/' + s.slug, s.nome, (paginasNutricao[s.slug] || s).faqs);
  const caminho = '/tratamentos/' + s.slug;
  setCaminho(caminho);
  const p = profissionais[s.profissional];
  const cat = categorias[s.categoria];
  const pilar = s.pilar ? pilares[s.pilar] : null;
  const rel = s.relacionados.map((r) => servicoPorSlug[r]).filter((x) => x && x.ativo);
  const arts = (s.artigos || []).map((a) => artigoPorSlug[a]).filter(Boolean);
  const ficha = [['Duração', s.dados.duracao], ['Sessões', s.dados.sessoes], ['Recuperação', s.dados.recuperacao], ['Resultado', s.dados.resultado], ['Durabilidade', s.dados.durabilidade]].filter(([, v]) => v);
  const urlAbs = absoluta(caminho);
  const ctaServico = s.profissional === 'hericles' && p.site
    ? `<a class="botao botao-primario" href="${p.site}" rel="noopener">Agendar com o nutricionista ${icone('seta', 'icone-500')}</a>`
    : `<a class="botao botao-primario" href="${whatsappUrl(`Olá! Vim pelo site e gostaria de agendar uma consulta para ${nomeFrase}.`)}" rel="noopener">${icone('whatsapp', 'icone-500')}Agendar consulta</a>`;
  const corpo = `
<section class="cabecalho-pagina"><div class="container">
  ${trilha([['/tratamentos', 'Serviços'], [caminho, s.nome]])}
  <h1>${esc(s.h1)}</h1>
  ${s.subtitulo ? `<p class="subtitulo-servico">${esc(s.subtitulo)}</p>` : ''}
  <p class="lead">Com ${[p, ...(s.tambem || []).map((k) => profissionais[k])].map((x) => `${esc(nomeCompleto(x))}, ${esc(x.cargo.split(',')[0].toLowerCase())}`).join(', e ')}.</p>
  <div class="botoes" style="margin-top:24px">${ctaServico}</div>
</div></section>
${blocoAntesDepois({ servicos: s.casosDe || [s.slug], titulo: 'Resultado', sobretitulo: '', fundo: 'secao-clara', pagina: s.slug, completar: false, max: s.casosMax || 2 })}
<article class="secao">
  <div class="container-texto prosa">

    <h2>${esc(s.oQueETitulo || `O que é ${nomeFrase}?`)}</h2>
    ${s.oQueE.map((t) => `<p>${esc(t)}</p>`).join('')}

    <h2>Para quem é indicado</h2>
    <ul class="lista-check">${s.indicacoes.map((t) => `<li>${icone('check')}<span>${esc(t)}</span></li>`).join('')}</ul>

    ${perguntasServico.length ? `<h2>Perguntas frequentes sobre ${esc(nomeFrase)}</h2>
    ${faqHtml(perguntasServico)}` : ''}

    ${arts.length ? `<h2>Para ler antes de decidir</h2><ul>${arts.map((a) => `<li><a href="${href('/conteudo/' + a.slug)}">${esc(a.titulo)}</a></li>`).join('')}</ul>` : ''}

    ${caixaAutor(s.profissional, 'Responsável pelo tratamento')}
  </div>
</article>
${rel.length ? `<section class="secao secao-creme"><div class="container"><div class="cabecalho-secao"><h2>Tratamentos relacionados</h2></div><div class="grade grade-3">${rel.map(cartaoServico).join('')}</div></div></section>` : ''}
${ctaFinal()}`;

  // Serviços do Hericles com página no formato do site dele (src/data/nutricao-paginas.mjs)
  const rico = paginasNutricao[s.slug];
  const corpoRico = rico ? (() => {
    const agendar = whatsappUrl(`Olá! Vim pelo site e gostaria de agendar com ${nomeCompleto(p)} (${nomeFrase}).`);
    const iconesDestaque = ['pin', 'relogio', 'check'];
    return `
${heroNutri({
  trilhaHtml: trilha([['/nutricao', 'Nutrição'], [caminho, s.nome]]),
  sobretitulo: rico.sobretitulo,
  tituloHtml: esc(rico.titulo),
  intro: rico.intro,
  botoes: `<a class="botao botao-primario" href="${agendar}" rel="noopener">${icone('whatsapp', 'icone-500')}Agendar consulta</a><a class="botao botao-secundario" href="${href('/nutricao#quem-sou-eu')}">Conheça o nutri</a>`,
})}
${faixaDestaquesNutri()}

${rico.casos && rico.casos.length ? `<section class="secao secao-creme" aria-labelledby="titulo-casos">
  <div class="container">
    <div class="cabecalho-secao">
      <h2 id="titulo-casos">Resultado</h2>
      <p class="lead">Histórias reais de pacientes acompanhados pelo ${esc(p.nome.split(' ')[0])}. Cada resultado depende do contexto, da adesão e das características de cada pessoa.</p>
    </div>
    <div class="casos" tabindex="0" aria-label="Casos de antes e depois">
      ${rico.casos.map((c) => `<article class="caso">
        <div class="caso-foto">${imagem({ src: c.img, alt: `Antes e depois de ${c.nome} no acompanhamento nutricional`, largura: 720, altura: 900 })}${c.tempo ? `<span class="caso-tempo">${esc(c.tempo)}</span>` : ''}<span class="caso-rotulos" aria-hidden="true"><span>Antes</span><span>Depois</span></span></div>
        <div class="caso-corpo">
          <h3>${esc(c.nome)}</h3>
          <span class="caso-perfil">${esc(c.perfil)}</span>
          ${c.idade || c.antes ? `<div class="caso-dados">${[c.idade, c.antes && 'Antes ' + c.antes, c.depois && 'Depois ' + c.depois].filter(Boolean).map((x) => `<span>${esc(x)}</span>`).join('')}</div>` : ''}
          <p>${esc(c.descricao)}</p>
        </div>
      </article>`).join('')}
    </div>
  </div>
</section>` : ''}

<section class="secao" aria-labelledby="titulo-jornada">
  <div class="container">
    <div class="cabecalho-secao">
      <span class="sobretitulo">Seu acompanhamento</span>
      <h2 id="titulo-jornada">${esc(rico.jornadaTitulo)}</h2>
      <p class="lead">${esc(rico.jornadaTexto)}</p>
    </div>
    <ol class="jornada" tabindex="0" aria-label="Etapas do acompanhamento">
      ${rico.jornada.map((e) => `<li class="jornada-cartao">
        <div class="jornada-foto">${imagem({ src: e.img, alt: `${e.rotulo}: ${e.titulo}`, largura: 900, altura: 563 })}</div>
        <div class="jornada-corpo">
          <span class="jornada-rotulo"><b>${esc(e.n)}</b>${esc(e.rotulo)}</span>
          <h3>${esc(e.titulo)}</h3>
          <p>${esc(e.texto)}</p>
        </div>
      </li>`).join('')}
    </ol>
  </div>
</section>

<section class="secao secao-clara" aria-labelledby="titulo-encontra">
  <div class="container">
    <div class="cabecalho-secao">
      <span class="sobretitulo">O que você encontra</span>
      <h2 id="titulo-encontra">Estratégia adaptada à sua realidade</h2>
    </div>
    <div class="grade pilares-lado">
      ${rico.beneficios.map(([t, d]) => `<article class="pilar"><h3>${esc(t)}</h3><p>${esc(d)}</p></article>`).join('')}
    </div>
  </div>
</section>

<section class="secao secao-creme" aria-labelledby="titulo-faq-servico">
  <div class="container-texto prosa">
    ${perguntasServico.length ? `<h2 id="titulo-faq-servico">Perguntas frequentes</h2>
    ${faqHtml(perguntasServico)}` : ''}
    ${caixaAutor(s.profissional, 'Responsável pelo atendimento')}
  </div>
</section>

${rico.artigos.length ? `<section class="secao" aria-labelledby="titulo-leituras">
  <div class="container">
    <div class="cabecalho-secao">
      <span class="sobretitulo">Leituras do nutri</span>
      <h2 id="titulo-leituras">Artigos do ${esc(p.nome.split(' ')[0])}</h2>
    </div>
    <div class="grade grade-2">
      ${rico.artigos.map((a) => `<a class="cartao" href="${a.url}" rel="noopener">
        <div class="cartao-corpo">
          <span class="tag tag-nutricao">${esc(a.categoria)}</span>
          <h3>${esc(a.titulo)}</h3>
          <p>${esc(a.resumo)}</p>
          <span class="link-seta">Ler no site do ${esc(p.nome.split(' ')[0])} ${icone('direita')}</span>
        </div>
      </a>`).join('')}
    </div>
  </div>
</section>` : ''}
${rel.length ? `<section class="secao secao-clara"><div class="container"><div class="cabecalho-secao"><h2>Serviços relacionados</h2></div><div class="grade grade-3">${rel.map(cartaoServico).join('')}</div></div></section>` : ''}
${ctaFinal()}`;
  })() : null;

  const procedimento = {
    '@type': s.categoria === 'nutricao' ? 'MedicalTherapy' : 'MedicalProcedure',
    '@id': urlAbs + '#procedimento',
    name: s.nome,
    description: s.resumo,
    url: urlAbs,
    ...(s.categoria === 'nutricao' ? {} : { procedureType: `https://schema.org/${s.procedimentoTipo}`, howPerformed: s.etapas.map((e) => `${e.titulo}: ${e.texto}`).join(' '), followup: s.cuidados.join('; ') || undefined }),
  };
  const servico = {
    '@type': 'Service',
    '@id': urlAbs + '#servico',
    name: `${s.nome} em Joinville`,
    serviceType: s.nome,
    description: s.metaDescription,
    url: urlAbs,
    category: cat.nome,
    provider: { '@id': ID.clinica },
    areaServed: site.areasAtendidas.map((c) => ({ '@type': 'City', name: c })),
    availableChannel: { '@type': 'ServiceChannel', serviceUrl: urlAbs, availableLanguage: 'pt-BR' },
    termsOfService: 'Indicação somente após consulta individual.',
  };
  return {
    caminho,
    prioridade: '0.8',
    llms: `${s.nome}: ${s.resumo}`,
    html: pagina({
      caminho,
      titulo: s.seoTitle,
      descricao: s.metaDescription,
      corpo: corpoRico || corpo,
      schema: [
        ...paginaSchema({ caminho, nome: s.h1, descricao: s.metaDescription, tipo: 'MedicalWebPage', trilha: [['/tratamentos', 'Serviços'], [caminho, s.nome]], extra: { about: { '@id': urlAbs + '#procedimento' }, mainEntity: { '@id': urlAbs + '#servico' } } }),
        procedimento,
        servico,
        s.profissional !== 'girlane' ? pessoaSchema(p) : null,
        perguntasServico.length ? faqSchema(caminho, perguntasServico) : null,
      ].filter(Boolean),
    }),
  };
}

// Equipe: cada profissional no mesmo formato, em blocos.
// Bloco = foto (esquerda) + apresentação (direita) e, embaixo, "Como eu trabalho".
// A Dra. Girlane vem primeiro (antes ficava em /dra-girlane-ferreira, que redireciona para cá).
export function equipe() {
  const caminho = '/equipe';
  setCaminho(caminho);
  const arrobaInsta = (url) => '@' + url.replace(/\/+$/, '').split('/').pop();
  const formacaoDe = (pro) => pro.formacao.filter((f) => !pendente(f.titulo) || mostrar(f.titulo, 'Formação ' + pro.nome)).map((f) => `<li><div><strong>${mostrar(f.titulo, 'Formação')}</strong><br><span>${mostrar(f.instituicao, 'Instituição')}</span></div><span>${esc(f.ano)}</span></li>`).join('');
  // destaca os nomes dos pilares no texto da Dra. Girlane
  const realce = (t) => esc(t).replace(/(reestruturação|pele que toca|pele que se vê)/g, '<strong>$1</strong>');
  const ordem = [g, ...Object.values(profissionais).filter((pro) => pro !== g)];

  const bloco = (pro, i) => {
    const ehG = pro === g;
    const chave = chaveDe(pro);
    const servicosPro = servicosAtivos.filter((s) => s.profissional === chave);
    const textoApresentacao = ehG && pro.apresentacao ? pro.apresentacao : [pro.bioCurta];
    const como = (pro.comoTrabalho || []).filter(Boolean);
    // Títulos: cargo, registro e tempo de experiência numa linha só
    const titulos = [esc(pro.cargo), pro.conselho && !pendente(pro.conselho.numero) ? registroTexto(pro) : '', pro.anosDeExperiencia ? `${pro.anosDeExperiencia} anos de experiência` : ''].filter(Boolean).join(' · ');
    // Serviços: as tags do profissional; as que têm página própria viram link
    const porNome = (n) => servicosAtivos.find((s) => s.nome.toLowerCase() === n.toLowerCase());
    // cada tag pode ser só o nome ou [nome, slug da página do tratamento]
    const tags = (pro.servicosTags || servicosPro.map((s) => s.nome)).map((t) => {
      const [n, slug] = Array.isArray(t) ? t : [t, null];
      const s = slug ? servicosAtivos.find((x) => x.slug === slug) : porNome(n);
      return s ? `<a class="tag-servico" href="${href('/tratamentos/' + s.slug)}">${esc(n)}</a>` : `<span class="tag-servico">${esc(n)}</span>`;
    }).join('');
    const msg = ehG ? site.whatsappMensagem : `Olá! Vim pelo site e gostaria de agendar com ${nomeCompleto(pro)}.`;
    return `
<section class="secao equipe-bloco${i % 2 ? ' secao-creme' : ''}" id="${pro.slug}" aria-labelledby="nome-${pro.slug}">
  <div class="container">
    <div class="perfil">
      <div class="perfil-foto">${imagem({ foto: fotoPro(chave), alt: `${nomeCompleto(pro)}, ${pro.cargo.toLowerCase()} da Clínica Girlane Ferreira em Joinville`, largura: 960, altura: 1200, prioridade: i === 0 })}</div>
      <div class="equipe-apresentacao">
        <span class="sobretitulo equipe-titulos">${titulos}</span>
        <h2 id="nome-${pro.slug}">${esc(nomeCompleto(pro))}</h2>
        ${textoApresentacao.map((t, j) => `<p class="${j ? 'apresentacao' : 'lead'}">${esc(t)}</p>`).join('')}
        ${tags ? `<div class="equipe-tags" aria-label="Serviços">${tags}</div>` : ''}
        <div class="botoes equipe-botoes">
          <a class="botao botao-primario" href="${whatsappUrl(msg)}" rel="noopener">${icone('whatsapp', 'icone-500')}Agendar consulta</a>
          ${pro.instagram ? `<a class="botao botao-secundario" href="${pro.instagram}" rel="${ehG ? 'me ' : ''}noopener">${icone('instagram', 'icone-500')}Instagram</a>` : ''}
          ${pro.site ? `<a class="botao botao-secundario" href="${pro.site}" rel="noopener">${icone('seta', 'icone-500')}Site</a>` : ''}
        </div>
      </div>
    </div>
    ${como.length ? `<div class="equipe-como">
      <h3>Como eu trabalho</h3>
      <div class="equipe-como-texto">${como.map((t) => `<p>${ehG ? realce(t) : esc(t)}</p>`).join('')}</div>
    </div>` : ''}
  </div>
</section>`;
  };

  const corpo = `
<section class="cabecalho-pagina"><div class="container">
  ${trilha([[caminho, 'Equipe']])}
  <h1>Equipe</h1>
  <p class="lead">Rosto, corpo e nutrição tratados por quem é da área, conversando sobre o mesmo plano.</p>
</div></section>
${ordem.map(bloco).join('')}
${blocoAntesDepois({ servicos: ['harmonizacao-facial', 'bioestimuladores-de-colageno', ...facial], titulo: 'Casos atendidos pela Dra. Girlane', fundo: ordem.length % 2 ? 'secao-creme' : '', pagina: 'equipe' })}
<section class="secao secao-creme cta-final cta-equipe" aria-labelledby="titulo-cta-equipe">
  <div class="container">
    <h2 id="titulo-cta-equipe">Vamos começar o seu cuidado.</h2>
    <div class="botoes" style="justify-content:center;margin-top:28px">
      ${ordem.map((pro) => {
        const ehG = pro === g;
        const nome = ehG ? 'Dra. Girlane' : pro.nome.split(' ')[0];
        const msg = ehG ? site.whatsappMensagem : `Olá! Vim pelo site e gostaria de agendar com ${nomeCompleto(pro)}.`;
        return `<a class="botao ${ehG ? 'botao-primario' : 'botao-secundario'}" href="${whatsappUrl(msg)}" rel="noopener">${icone('whatsapp', 'icone-500')}Agendar com ${esc(nome)}</a>`;
      }).join('')}
    </div>
  </div>
</section>`;
  return {
    caminho,
    prioridade: '0.9',
    html: pagina({
      caminho,
      titulo: 'Equipe | Dra. Girlane Ferreira, biomédica esteta em Joinville',
      descricao: 'Conheça a Dra. Girlane Ferreira, biomédica esteta em Joinville (SC), com 12 anos de experiência em estética, e a equipe da clínica: nutrição e tratamentos corporais.',
      tipoOg: 'profile',
      corpo,
      schema: [
        ...paginaSchema({ caminho, nome: 'Equipe', descricao: 'A Dra. Girlane Ferreira e a equipe da Clínica Girlane Ferreira', tipo: 'AboutPage', trilha: [[caminho, 'Equipe']], extra: { about: { '@id': ID.girlane } } }),
        ...ordem.map((pro) => pessoaSchema(pro, true)),
      ],
    }),
  };
}

export function resultados() {
  const caminho = '/resultados';
  setCaminho(caminho);
  const casos = todosCasos();
  const porServico = servicosAtivos.map((sv) => ({ sv, lista: casos.filter((c) => c.servico === sv.slug) })).filter((x) => x.lista.length);
  const corpo = `
<section class="cabecalho-pagina"><div class="container">
  ${trilha([[caminho, 'Resultados']])}
  <h1>Antes e depois</h1>
  <p class="lead">Casos reais de pacientes da clínica, com o que foi feito e o tempo entre as fotos.</p>
</div></section>
${porServico.map(({ sv, lista }, i) => `<section class="secao ${i % 2 ? 'secao-creme' : ''}" aria-labelledby="res-${sv.slug}"><div class="container">
  <div class="cabecalho-secao"><h2 id="res-${sv.slug}"><a href="${href('/tratamentos/' + sv.slug)}" style="color:inherit">${esc(sv.nome)}</a></h2></div>
  <div class="grade ${lista.length > 2 ? 'grade-3' : lista.length > 1 ? 'grade-2' : 'ad-unico'}">${lista.map((c) => antesDepois(c)).join('')}</div>
</div></section>`).join('')}
${blocoAvaliacoes(porServico.length % 2 ? 'secao-creme' : '')}
${ctaFinal()}`;
  if (!casos.length) P_faltando('resultados');
  return {
    caminho,
    prioridade: '0.8',
    html: pagina({
      caminho,
      titulo: 'Antes e depois | Clínica Girlane Ferreira, Joinville',
      descricao: 'Antes e depois reais de harmonização facial, preenchimento, botox, bioestimuladores e tratamentos de pele na Clínica Girlane Ferreira, em Joinville.',
      corpo,
      schema: [
        ...paginaSchema({ caminho, nome: 'Antes e depois', descricao: 'Resultados de pacientes', tipo: 'CollectionPage', trilha: [[caminho, 'Resultados']] }),
        ...(casos.length ? [{ '@type': 'ImageGallery', '@id': absoluta(caminho) + '#galeria', name: 'Antes e depois da Clínica Girlane Ferreira', image: casos.flatMap((c) => [c.antes, c.depois].map((f) => ({ '@type': 'ImageObject', contentUrl: absoluta(f.src), width: f.largura, height: f.altura, copyrightHolder: { '@id': ID.clinica } }))) }] : []),
      ],
    }),
  };
}

export function listaConteudo() {
  const caminho = '/conteudo';
  setCaminho(caminho);
  const corpo = `
<section class="cabecalho-pagina"><div class="container">
  ${trilha([[caminho, 'Conteúdo']])}
  <h1>Conteúdo educativo</h1>
  <p class="lead">Explicações diretas sobre envelhecimento, pele e tratamentos estéticos, escritas por quem faz os procedimentos.</p>
</div></section>
<section class="secao"><div class="container grade grade-3">${artigos.map(cartaoArtigo).join('')}</div></section>
${blocoAntesDepois({ servicos: facial, fundo: 'secao-creme', pagina: 'conteudo' })}
${ctaFinal()}`;
  return {
    caminho,
    prioridade: '0.7',
    html: pagina({
      caminho,
      titulo: 'Conteúdo educativo sobre estética facial | Dra. Girlane Ferreira',
      descricao: 'Artigos da Dra. Girlane Ferreira sobre envelhecimento facial, harmonização natural, botox, preenchimento, bioestimuladores, melasma e segurança em estética.',
      corpo,
      schema: [
        ...paginaSchema({ caminho, nome: 'Conteúdo educativo', descricao: 'Artigos', tipo: 'CollectionPage', trilha: [[caminho, 'Conteúdo']] }),
        { '@type': 'ItemList', itemListElement: artigos.map((a, i) => ({ '@type': 'ListItem', position: i + 1, url: absoluta('/conteudo/' + a.slug), name: a.titulo })) },
      ],
    }),
  };
}

export function paginaArtigo(a) {
  const perguntasArtigo = perguntasDe('conteudo/' + a.slug, 'Artigo: ' + a.titulo, a.faqs || []);
  const caminho = '/conteudo/' + a.slug;
  setCaminho(caminho);
  const autor = profissionais[a.autor];
  const urlAbs = absoluta(caminho);
  const servs = a.servicos.map((x) => servicoPorSlug[x]).filter((x) => x && x.ativo);
  const outros = artigos.filter((x) => x.slug !== a.slug).slice(0, 3);
  // links internos dentro do corpo passam por href()
  const corpoArtigo = a.corpo.replace(/href="(\/[^"]*)"/g, (_, p) => `href="${href(p)}"`);
  const corpo = `
<article>
<header class="cabecalho-pagina"><div class="container-texto">
  ${trilha([['/conteudo', 'Conteúdo'], [caminho, a.titulo]])}
  <span class="tag tag-facial">${esc(a.categoria)}</span>
  <h1>${esc(a.titulo)}</h1>
  ${servs[0] && capaServico(servs[0].slug) ? `<div class="foto-larga capa-servico" style="margin-bottom:24px">${imagem({ foto: capaServico(servs[0].slug), alt: a.titulo, prioridade: true })}</div>` : ''}
  <p class="meta-artigo"><span>Por <a href="${href(autor === g ? '/equipe' : '/equipe#' + autor.slug)}">${esc(nomeCompleto(autor))}</a>, ${esc(autor.profissao.toLowerCase())} esteta</span><span>Atualizado em <time datetime="${a.atualizado}">${dataBR(a.atualizado)}</time></span><span>${a.leitura} min de leitura</span></p>
</div></header>
<div class="secao"><div class="container-texto prosa">
  <div class="resumo-ia"><strong>Resposta rápida</strong>${esc(a.resumo)}</div>
  ${corpoArtigo.replace(/<table>/g, '<div class="tabela-rolagem"><table>').replace(/<\/table>/g, '</table></div>')}
  ${perguntasArtigo.length ? `<h2>Perguntas frequentes</h2>
  ${faqHtml(perguntasArtigo)}` : ''}
  ${servs.length ? `<h2>Tratamentos relacionados</h2><ul>${servs.map((s) => `<li><a href="${href('/tratamentos/' + s.slug)}">${esc(s.h1)}</a></li>`).join('')}</ul>` : ''}
  ${caixaAutor(a.autor)}
</div></div>
</article>
${blocoAntesDepois({ servicos: a.servicos, titulo: 'Na prática', texto: 'Casos reais ligados a este assunto, publicados com autorização.', fundo: 'secao-clara', pagina: 'artigo-' + a.slug })}
<section class="secao secao-creme"><div class="container"><div class="cabecalho-secao"><h2>Continue lendo</h2></div><div class="grade grade-3">${outros.map(cartaoArtigo).join('')}</div></div></section>
${ctaFinal()}`;
  return {
    caminho,
    prioridade: '0.7',
    lastmod: a.atualizado,
    llms: `${a.titulo}: ${a.resumo}`,
    html: pagina({
      caminho,
      titulo: a.seoTitle,
      descricao: a.metaDescription,
      tipoOg: 'article',
      publicado: a.publicado,
      atualizado: a.atualizado,
      corpo,
      schema: [
        ...paginaSchema({ caminho, nome: a.titulo, descricao: a.metaDescription, tipo: 'MedicalWebPage', trilha: [['/conteudo', 'Conteúdo'], [caminho, a.titulo]], extra: { mainEntity: { '@id': urlAbs + '#artigo' } } }),
        {
          '@type': 'Article',
          '@id': urlAbs + '#artigo',
          headline: a.titulo,
          description: a.metaDescription,
          abstract: a.resumo,
          image: absoluta('/assets/og/og-padrao.jpg'),
          datePublished: a.publicado,
          dateModified: a.atualizado,
          inLanguage: 'pt-BR',
          author: { '@id': ID.pessoa(autor) },
          reviewedBy: { '@id': ID.girlane },
          publisher: { '@id': ID.clinica },
          mainEntityOfPage: { '@id': urlAbs + '#pagina' },
          articleSection: a.categoria,
          wordCount: a.corpo.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length,
          about: servs.map((s) => ({ '@id': absoluta('/tratamentos/' + s.slug) + '#procedimento' })),
        },
        perguntasArtigo.length ? faqSchema(caminho, perguntasArtigo) : null,
      ],
    }),
  };
}

export function perguntas() {
  const caminho = '/perguntas-frequentes';
  setCaminho(caminho);
  const geraisPadrao = [
    { q: 'Como agendar uma consulta?', a: 'Pelo WhatsApp da clínica. A equipe confirma o melhor horário e envia as orientações para o dia.' },
    { q: 'Preciso fazer consulta antes de qualquer procedimento?', a: 'Sim. A consulta é o que define se o procedimento é indicado, qual técnica usar e em que ordem. Nenhum procedimento injetável é feito sem ela.' },
    { q: 'Quem aplica os procedimentos injetáveis?', a: `A ${nomeCompleto(g)}, biomédica esteta com habilitação em Biomedicina Estética e registro no Conselho Regional de Biomedicina.` },
    { q: 'Os produtos usados são registrados na Anvisa?', a: 'Sim. Todos os produtos injetáveis têm registro na Anvisa, e o lote fica anotado no prontuário da paciente.' },
    { q: 'A clínica atende pacientes de outras cidades?', a: `Sim. Atendemos pacientes de ${site.areasAtendidas.join(', ')} e região.` },
    { q: 'Existe acompanhamento depois do procedimento?', a: 'Sim. O acompanhamento entre 15 e 30 dias faz parte do plano de tratamento, para comparar as fotos e ajustar detalhes.' },
    { q: 'As fotos de antes e depois são reais?', a: 'Sim. São pacientes da clínica que autorizaram por escrito o uso da imagem. As fotos não são editadas e são feitas com a mesma luz e o mesmo ângulo. Cada caso traz o que foi feito e o intervalo entre as fotos, porque o resultado varia de pessoa para pessoa.' },
  ];
  const gerais = perguntasDe('perguntas-frequentes', 'Perguntas frequentes (sobre a clínica e o atendimento)', geraisPadrao);
  const porServico = servicosAtivos.map((s) => ({ s, faqs: perguntasDe('tratamentos/' + s.slug, s.nome, (paginasNutricao[s.slug] || s).faqs).slice(0, 2) })).filter((x) => x.faqs.length);
  const todas = [...gerais, ...porServico.flatMap((x) => x.faqs)];
  const corpo = `
<section class="cabecalho-pagina"><div class="container-texto">
  ${trilha([[caminho, 'Perguntas frequentes']])}
  <h1>Perguntas frequentes</h1>
  <p class="lead">Respostas diretas para as dúvidas que mais chegam pelo WhatsApp e nas consultas.</p>
</div></section>
<section class="secao"><div class="container-texto prosa">
  <h2>Sobre a clínica e o atendimento</h2>
  ${faqHtml(gerais)}
  ${porServico.map(({ s, faqs }) => `<h2><a href="${href('/tratamentos/' + s.slug)}" style="color:inherit">${esc(s.nome)}</a></h2>${faqHtml(faqs)}`).join('')}
</div></section>
${blocoAntesDepois({ servicos: facial, max: 1, pagina: 'perguntas' })}
${ctaFinal('Ficou alguma dúvida?', 'Mande pelo WhatsApp. A gente responde e, se fizer sentido, agenda sua consulta.')}`;
  return {
    caminho,
    prioridade: '0.7',
    html: pagina({
      caminho,
      titulo: 'Perguntas frequentes | Clínica Girlane Ferreira',
      descricao: 'Dúvidas sobre harmonização facial, botox, preenchimento, bioestimuladores, manchas e corpo, respondidas pela Clínica Girlane Ferreira em Joinville.',
      corpo,
      schema: [...paginaSchema({ caminho, nome: 'Perguntas frequentes', descricao: 'FAQ', trilha: [[caminho, 'Perguntas frequentes']] }), faqSchema(caminho, todas)],
    }),
  };
}

export function contato() {
  const caminho = '/contato';
  setCaminho(caminho);
  const corpo = `
<section class="cabecalho-pagina"><div class="container">
  ${trilha([[caminho, 'Contato']])}
  <h1>Contato e localização</h1>
  <p class="lead">${esc(site.nome)} · ${esc(site.endereco.cidade)}, ${esc(site.endereco.uf)}. ${esc(site.atendimentoObservacao)}</p>
  <div class="botoes" style="margin-top:24px">
    <a class="botao botao-primario" href="${whatsappUrl()}" rel="noopener">${icone('whatsapp', 'icone-500')}Agendar pelo WhatsApp</a>
    ${telLink() ? `<a class="botao botao-secundario" href="${telLink()}">${icone('telefone')}Ligar</a>` : ''}
    <a class="botao botao-secundario" href="${mapsUrl()}" rel="noopener">${icone('pin')}Como chegar</a>
  </div>
</div></section>
<section class="secao"><div class="container">
  ${fotoHero() ? `<div class="foto-larga" style="margin-bottom:32px">${imagem({ foto: fotoHero(), alt: `${fotoClinica('fachada') ? 'Fachada' : 'Recepção'} da Clínica Girlane Ferreira na Rua Areia Branca, 1035, Jardim Iririú, Joinville`, prioridade: true })}</div>` : ''}
  ${blocoLocal()}
  ${galeria().length ? `<h2 style="margin-top:64px">Conheça o espaço</h2><div class="galeria">${galeria().map((f) => `<figure class="foto-larga" style="margin:0">${imagem({ foto: f, alt: altClinica(f) })}</figure>`).join('')}</div>` : ''}
  <div class="container-texto prosa" style="margin-top:64px;margin-inline:0">
    <h2>Atendemos Joinville e região</h2>
    <p>Pacientes vêm de ${esc(site.areasAtendidas.join(', '))}. Como o atendimento é com hora marcada, combine o horário pelo WhatsApp antes de vir.</p>
    <p>Responsável técnica: ${esc(nomeCompleto(g))}, biomédica esteta, ${registroTexto(g)}.${preenchido(site.cnpj) ? ` CNPJ ${esc(site.cnpj)}.` : ''}</p>
  </div>
</div></section>
${blocoAntesDepois({ servicos: facial, fundo: 'secao-creme', pagina: 'contato' })}`;
  return {
    caminho,
    prioridade: '0.8',
    html: pagina({
      caminho,
      titulo: 'Contato e endereço | Clínica Girlane Ferreira, Joinville',
      descricao: `Endereço, horários e WhatsApp da Clínica Girlane Ferreira em Joinville (SC). Agende sua consulta com a biomédica esteta Dra. Girlane Ferreira.`,
      corpo,
      schema: paginaSchema({ caminho, nome: 'Contato', descricao: 'Contato e localização', tipo: 'ContactPage', trilha: [[caminho, 'Contato']] }),
    }),
  };
}

export function privacidade() {
  const caminho = '/politica-de-privacidade';
  setCaminho(caminho);
  const corpo = `
<section class="cabecalho-pagina"><div class="container-texto">${trilha([[caminho, 'Política de privacidade']])}<h1>Política de privacidade</h1></div></section>
<section class="secao"><div class="container-texto prosa">
  <p>Esta política explica como a ${esc(site.nome)} (${mostrar(site.razaoSocial, 'Razão social')}, CNPJ ${mostrar(site.cnpj, 'CNPJ')}) trata dados pessoais, de acordo com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).</p>
  <h2>Dados que coletamos pelo site</h2>
  <p>Este site não tem formulários nem cookies de publicidade. ${site.analyticsVercel ? 'Usamos o Vercel Web Analytics, que mede visitas de forma agregada e sem cookies.' : ''} A página inicial mostra um mapa do Google Maps; ao carregá-lo, o Google pode registrar dados de navegação conforme a política de privacidade dele. Quando você clica para falar pelo WhatsApp, a conversa acontece no aplicativo, e os dados que você enviar serão usados apenas para agendamento e atendimento.</p>
  <h2>Dados de saúde</h2>
  <p>Informações de saúde e fotos feitas na clínica são dados sensíveis. Ficam no prontuário, com acesso restrito à equipe responsável pelo seu atendimento, e não são divulgadas sem autorização expressa e por escrito.</p>
  <h2>Seus direitos</h2>
  <p>Você pode pedir acesso, correção ou exclusão dos seus dados, respeitados os prazos legais de guarda de prontuário, pelo e-mail ${mostrar(site.email, 'E-mail')} ou pelo WhatsApp da clínica.</p>
  <p>Última atualização: ${dataBR(revisadoEm)}.</p>
</div></section>`;
  return {
    caminho,
    prioridade: '0.2',
    html: pagina({ caminho, titulo: 'Política de privacidade | Clínica Girlane Ferreira', descricao: 'Como a Clínica Girlane Ferreira trata dados pessoais e de saúde, de acordo com a LGPD.', corpo, schema: paginaSchema({ caminho, nome: 'Política de privacidade', descricao: 'LGPD' }) }),
  };
}

export function naoEncontrada() {
  const caminho = '/404';
  setCaminho(caminho);
  const corpo = `<section class="hero"><div class="container"><h1>Página não encontrada.</h1><p class="lead">O endereço pode ter mudado. Estes caminhos devem ajudar:</p><div class="botoes" style="justify-content:center"><a class="botao botao-primario" href="${href('/')}">Página inicial</a><a class="botao botao-secundario" href="${href('/tratamentos')}">Tratamentos</a><a class="botao botao-secundario" href="${href('/contato')}">Contato</a></div></div></section>`;
  return { caminho, semSitemap: true, html: pagina({ caminho, titulo: 'Página não encontrada | Clínica Girlane Ferreira', descricao: 'A página que você procurou não existe ou mudou de endereço. Veja os tratamentos e o contato da Clínica Girlane Ferreira em Joinville.', corpo, noindex: true }) };
}
