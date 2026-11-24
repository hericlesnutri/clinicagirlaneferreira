import { site, profissionais, depoimentos, revisadoEm } from './data/site.mjs';
import { servicos, servicosAtivos, categorias, pilares } from './data/servicos.mjs';
import { artigos } from './data/artigos.mjs';
import { esc, href, absoluta, whatsappUrl, enderecoLinha, mostrar, preenchido, pendente, mapsUrl, telLink, registroTexto, nomeCompleto, dataBR, setCaminho } from './lib.mjs';
import { pagina, icone, imagem, placeholder, trilha, faqHtml, ctaFinal, caixaAutor, blocoAntesDepois, antesDepois } from './layout.mjs';
import { fotoEquipe, capaServico, fotoClinica, fotosClinica, todosCasos, faltando } from './imagens.mjs';
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
  const bg = fotoClinica('hero-equipe');
  const mob = fotoClinica('hero-equipe-mobile');
  const textos = `
      <span class="hero-selo">${icone('selo')}Biomédica Esteta · CRBM-5 nº ${esc(g.conselho.numero)} · Joinville, SC</span>
      <h1>Envelhecer bem, <span class="texto-degrade">do seu jeito.</span></h1>
      <p class="lead">A ${esc(site.nome)} cria planos de tratamento para o rosto e o corpo que respeitam quem você é. Sem exagero, sem pressa, com acompanhamento.</p>
      <div class="botoes">
        <a class="botao botao-primario" href="${whatsappUrl()}" rel="noopener">${icone('whatsapp', 'icone-500')}Agendar consulta</a>
        <a class="botao botao-secundario" href="${href('/metodo')}">Conhecer o método</a>
      </div>`;
  if (!bg) return `<section class="hero"><div class="container">${textos}</div></section>`;
  return `<section class="hero hero-foto-fundo">
    <picture class="hero-fundo">
      ${mob ? `<source media="(max-width: 800px)" srcset="${href(mob.src)}" width="${mob.largura}" height="${mob.altura}">` : ''}
      <img src="${href(bg.src)}" alt="${esc(nomeCompleto(g))}, biomédica esteta, e ${esc(profissionais.hericles.nome)}, nutricionista, da Clínica Girlane Ferreira em Joinville" width="${bg.largura}" height="${bg.altura}" fetchpriority="high" decoding="async">
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

function cartaoArtigo(a) {
  return `<a class="cartao" href="${href('/conteudo/' + a.slug)}">
    <div class="cartao-corpo">
      <span class="tag tag-facial">${esc(a.categoria)}</span>
      <h3>${esc(a.titulo)}</h3>
      <p>${esc(a.resumo.split('. ')[0])}.</p>
      <span class="link-seta">Ler artigo · ${a.leitura} min ${icone('direita')}</span>
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

// ---------------------------------------------------------------- páginas
export function home() {
  const caminho = '/';
  setCaminho(caminho);
  const faqsHome = [
    { q: 'Onde fica a Clínica Girlane Ferreira?', a: `Em ${site.endereco.cidade}, Santa Catarina${preenchido(site.endereco.rua) ? `, na ${site.endereco.rua}, bairro ${site.endereco.bairro}` : ''}. O atendimento é com hora marcada.` },
    { q: 'Quem faz os procedimentos faciais?', a: `Todos os procedimentos injetáveis faciais são feitos pela ${nomeCompleto(g)}, biomédica esteta com registro no Conselho Regional de Biomedicina (CRBM).` },
    { q: 'Como funciona a primeira consulta?', a: 'A primeira consulta inclui conversa sobre seus objetivos e saúde, fotos padronizadas e análise do rosto. Você sai com um plano de tratamento por escrito, com etapas e investimento.' },
    { q: 'A clínica faz procedimentos isolados?', a: 'A clínica trabalha com planos de tratamento. Um procedimento pode ser a primeira etapa, mas a indicação sempre parte da análise do rosto inteiro, feita na consulta.' },
  ];
  const corpo = `
${heroHome()}

<section class="secao" aria-labelledby="titulo-metodo">
  <div class="container">
    <div class="cabecalho-secao centro">
      <span class="sobretitulo">O método</span>
      <h2 id="titulo-metodo">Três pilares. Um plano só seu.</h2>
      <p class="lead">O rosto envelhece em camadas. Por isso a gente trata em camadas, na ordem certa, em vez de correr atrás de uma ruga de cada vez.</p>
    </div>
    <div class="grade grade-3">
      ${Object.values(pilares).map((p, i) => `<article class="pilar"><span class="pilar-numero">0${i + 1}</span><small>${esc(p.resumo)}</small><h3>${esc(p.nome)}</h3><p>${esc(p.texto)}</p></article>`).join('')}
    </div>
    <p class="centro" style="margin-top:32px"><a class="link-seta" href="${href('/metodo')}">Como o plano de tratamento funciona ${icone('direita')}</a></p>
  </div>
</section>

<section class="secao secao-creme" aria-labelledby="titulo-tratamentos">
  <div class="container cabecalho-secao">
    <span class="sobretitulo">Tratamentos</span>
    <h2 id="titulo-tratamentos">Rosto, corpo e nutrição no mesmo lugar.</h2>
    <p class="lead">Cada tratamento tem uma página com indicações, como funciona, cuidados e respostas às dúvidas mais comuns.</p>
  </div>
  <div class="carrossel-envoltorio">
    <div class="carrossel" id="carrossel-tratamentos" tabindex="0" aria-label="Lista de tratamentos">
      ${servicosAtivos.map(cartaoServico).join('')}
    </div>
    <div class="container carrossel-setas">
      <button class="seta" type="button" data-carrossel="carrossel-tratamentos" data-direcao="-1" aria-label="Tratamentos anteriores">${icone('esquerda')}</button>
      <button class="seta" type="button" data-carrossel="carrossel-tratamentos" data-direcao="1" aria-label="Próximos tratamentos">${icone('direita')}</button>
    </div>
  </div>
</section>

${blocoAntesDepois({ servicos: facial, titulo: 'Resultados que continuam parecendo você.', texto: 'Casos reais de pacientes da clínica, publicados com autorização. Arraste para comparar.', pagina: 'home' })}

<section class="secao" aria-labelledby="titulo-dra">
  <div class="container perfil">
    <div class="perfil-foto">${imagem({ foto: fotoPro('girlane'), alt: `${nomeCompleto(g)}, biomédica esteta em Joinville`, largura: 960, altura: 1200 })}</div>
    <div>
      <span class="sobretitulo">Quem cuida de você</span>
      <h2 id="titulo-dra">${esc(nomeCompleto(g))}</h2>
      <p class="lead">${esc(g.bioCurta)}</p>
      <p><span class="credencial">${icone('selo')}${registroTexto(g)}</span><span class="credencial">${icone('check')}${esc(g.conselho.habilitacao)}</span></p>
      <a class="link-seta" href="${href('/dra-girlane-ferreira')}">Formação e trajetória ${icone('direita')}</a>
    </div>
  </div>
</section>

<section class="secao secao-creme" aria-labelledby="titulo-etapas">
  <div class="container">
    <div class="cabecalho-secao">
      <span class="sobretitulo">Como funciona</span>
      <h2 id="titulo-etapas">Da consulta ao acompanhamento.</h2>
    </div>
    <ol class="etapas">
      <li><h3>Consulta</h3><p>Conversa sem pressa, histórico de saúde e fotos padronizadas do rosto em repouso e em movimento.</p></li>
      <li><h3>Plano por escrito</h3><p>Prioridades, técnicas, número de sessões e investimento. Você decide com calma.</p></li>
      <li><h3>Tratamento</h3><p>Produtos com registro na Anvisa, lote anotado no prontuário e material descartável.</p></li>
      <li><h3>Acompanhamento</h3><p>Entre 15 e 30 dias depois, comparamos as fotos e definimos a manutenção.</p></li>
    </ol>
  </div>
</section>

<section class="secao" aria-labelledby="titulo-conteudo">
  <div class="container">
    <div class="cabecalho-secao">
      <span class="sobretitulo">Conteúdo educativo</span>
      <h2 id="titulo-conteudo">Antes de decidir, entenda.</h2>
      <p class="lead">Artigos escritos pela Dra. Girlane para quem quer saber como cada tratamento funciona de verdade.</p>
    </div>
    <div class="grade grade-3">${artigos.slice(0, 3).map(cartaoArtigo).join('')}</div>
    <p style="margin-top:32px"><a class="link-seta" href="${href('/conteudo')}">Todos os artigos ${icone('direita')}</a></p>
  </div>
</section>

<section class="secao secao-clara" aria-labelledby="titulo-faq">
  <div class="container-texto">
    <h2 id="titulo-faq">Perguntas frequentes</h2>
    ${faqHtml(faqsHome)}
    <p style="margin-top:24px"><a class="link-seta" href="${href('/perguntas-frequentes')}">Ver todas as perguntas ${icone('direita')}</a></p>
  </div>
</section>

<section class="secao" aria-labelledby="titulo-local">
  <div class="container">
    <div class="cabecalho-secao">
      <span class="sobretitulo">Visite a clínica</span>
      <h2 id="titulo-local">Clínica de estética em Joinville.</h2>
      <p class="lead">Atendemos pacientes de Joinville e região: ${esc(site.areasAtendidas.slice(1).join(', '))}.</p>
    </div>
    ${fotoClinica('recepcao') ? `<div class="foto-larga" style="margin-bottom:24px">${imagem({ foto: fotoClinica('recepcao'), alt: 'Recepção da Clínica Girlane Ferreira no Jardim Iririú, Joinville' })}</div>` : ''}
    ${galeria().length ? `<div class="galeria" style="margin-bottom:24px">${galeria().slice(0, 3).map((f) => `<figure class="foto-larga" style="margin:0">${imagem({ foto: f, alt: altClinica(f) })}</figure>`).join('')}</div>` : ''}
    ${blocoLocal()}
  </div>
</section>
${ctaFinal()}`;
  return {
    caminho,
    prioridade: '1.0',
    html: pagina({
      caminho,
      titulo: 'Clínica Girlane Ferreira | Estética avançada em Joinville, SC',
      descricao: 'Clínica de estética em Joinville com a biomédica esteta Dra. Girlane Ferreira: harmonização facial, bioestimuladores, botox, corpo e nutrição em um só plano.',
      corpo,
      schema: [...paginaSchema({ caminho, nome: site.nome, descricao: site.descricao }), faqSchema(caminho, faqsHome)],
    }),
  };
}

export function sobreGirlane() {
  const caminho = '/dra-girlane-ferreira';
  setCaminho(caminho);
  const faqs = [
    { q: 'Quem é a Dra. Girlane Ferreira?', a: `${nomeCompleto(g)} é biomédica esteta, fundadora e responsável técnica da ${site.nome}, em Joinville (SC). Trabalha com gerenciamento do envelhecimento facial por meio de planos de tratamento.` },
    { q: 'Qual o registro profissional da Dra. Girlane Ferreira?', a: pendente(g.conselho.numero) ? 'Ela é registrada no Conselho Regional de Biomedicina (CRBM), com habilitação em Biomedicina Estética.' : `${registroTexto(g).replace(/<[^>]+>/g, '')}, com ${g.conselho.habilitacao.toLowerCase()}.` },
    { q: 'Onde a Dra. Girlane Ferreira atende?', a: `Na ${site.nome}, em ${site.endereco.cidade} - ${site.endereco.uf}.` },
  ];
  const formacao = g.formacao.filter((f) => !pendente(f.titulo) || mostrar(f.titulo, 'Formação Girlane')).map((f) => `<li><div><strong>${mostrar(f.titulo, 'Formação')}</strong><br><span>${mostrar(f.instituicao, 'Instituição')}</span></div><span>${esc(f.ano)}</span></li>`).join('');
  const corpo = `
<section class="cabecalho-pagina">
  <div class="container">
    ${trilha([[caminho, nomeCompleto(g)]])}
    <div class="perfil">
      <div class="perfil-foto">${imagem({ foto: fotoPro('girlane'), alt: `${nomeCompleto(g)}, biomédica esteta, na clínica em Joinville`, largura: 960, altura: 1200, prioridade: true })}</div>
      <div>
        <span class="sobretitulo">${esc(g.cargo)}</span>
        <h1>${esc(nomeCompleto(g))}</h1>
        <p class="lead">${esc(g.bioCurta)}</p>
        <p><span class="credencial">${icone('selo')}${registroTexto(g)}</span><span class="credencial">${icone('check')}${esc(g.conselho.habilitacao)}</span>${g.anosDeExperiencia ? `<span class="credencial">${icone('relogio')}${g.anosDeExperiencia} anos de experiência</span>` : ''}</p>
        <div class="botoes" style="margin-top:16px"><a class="botao botao-primario" href="${whatsappUrl()}" rel="noopener">${icone('whatsapp', 'icone-500')}Agendar consulta</a><a class="botao botao-secundario" href="${g.instagram}" rel="me noopener">${icone('instagram')}@dra.girlaneferreira</a></div>
      </div>
    </div>
  </div>
</section>
<section class="secao">
  <div class="container-texto prosa">
    <h2>Como eu trabalho</h2>
    <p>Eu não acredito em procedimento solto. Uma paciente chega querendo tirar o bigode chinês, e muitas vezes o problema está na perda de suporte da maçã do rosto. Tratar só o sulco deixa o rosto pesado.</p>
    <p>Por isso todo atendimento começa com consulta e termina com um plano por escrito, organizado em três pilares: <strong>reestruturação</strong> (estrutura e volume), <strong>pele que toca</strong> (firmeza) e <strong>pele que se vê</strong> (linhas, manchas e textura). Às vezes o plano tem uma etapa. Às vezes tem quatro, ao longo de um ano.</p>
    <p>O que eu quero é que você continue se reconhecendo no espelho. E que, quando alguém disser que você está bem, não saiba dizer o que mudou.</p>
    ${fotoClinica('consultorio-dra-girlane') ? `<figure class="foto-larga" style="margin:2em 0">${imagem({ foto: fotoClinica('consultorio-dra-girlane'), alt: 'Consultório da Dra. Girlane Ferreira na clínica em Joinville' })}</figure>` : ''}

    ${formacao ? `<h2>Formação acadêmica</h2>
    <ul class="formacao">${formacao}</ul>` : ''}
    ${g.atualizacoes.length ? `<h3>Atualizações e cursos</h3><ul>${g.atualizacoes.map((a) => `<li>${esc(a)}</li>`).join('')}</ul>` : ''}

    <h2>Registro profissional</h2>
    <p>Biomédica registrada no Conselho Regional de Biomedicina sob o ${registroTexto(g)}, com ${esc(g.conselho.habilitacao.toLowerCase())}. O Conselho Federal de Biomedicina (CFBM) regulamenta a atuação do biomédico esteta em procedimentos estéticos não cirúrgicos, como toxina botulínica, preenchedores e bioestimuladores. ${g.conselho.url ? `<a href="${esc(g.conselho.url)}" rel="noopener">Consulte o registro no CRBM</a>.` : 'O registro pode ser consultado no site do CRBM da região.'}</p>

    <h2>Áreas de atuação</h2>
    <ul class="lista-check">${g.areas.map((a) => `<li>${icone('check')}<span>${esc(a)}</span></li>`).join('')}</ul>
    <p>Veja os <a href="${href('/tratamentos')}">tratamentos da clínica</a> ou leia os <a href="${href('/conteudo')}">artigos educativos</a> que escrevo.</p>

    <h2>Perguntas sobre a Dra. Girlane</h2>
    ${faqHtml(faqs)}
  </div>
</section>
${blocoAntesDepois({ servicos: ['harmonizacao-facial', 'bioestimuladores-de-colageno', ...facial], titulo: 'Casos atendidos pela Dra. Girlane', fundo: 'secao-creme', pagina: 'dra-girlane' })}
${ctaFinal()}`;
  return {
    caminho,
    prioridade: '0.9',
    html: pagina({
      caminho,
      titulo: 'Dra. Girlane Ferreira | Biomédica esteta em Joinville',
      descricao: `Conheça a Dra. Girlane Ferreira, biomédica esteta em Joinville (SC): formação, registro no CRBM, método de trabalho e áreas de atuação em envelhecimento facial.`,
      tipoOg: 'profile',
      corpo,
      schema: [
        ...paginaSchema({ caminho, nome: nomeCompleto(g), descricao: g.bioCurta, tipo: 'ProfilePage', trilha: [[caminho, nomeCompleto(g)]], extra: { mainEntity: { '@id': ID.girlane }, about: { '@id': ID.girlane } } }),
        pessoaSchema(g, true),
        faqSchema(caminho, faqs),
      ],
    }),
  };
}

export function metodo() {
  const caminho = '/metodo';
  setCaminho(caminho);
  const faqs = [
    { q: 'O que é um plano de tratamento facial?', a: 'É a organização, por escrito, do que vai ser feito no seu rosto, em que ordem e em quanto tempo, a partir de uma consulta completa. Inclui prioridades, técnicas, número estimado de sessões, acompanhamento e investimento.' },
    { q: 'Por que não fazer só um procedimento?', a: 'Porque o envelhecimento acontece em várias camadas ao mesmo tempo (osso, gordura, ligamentos e pele). Tratar só o sinal visível costuma dar resultado pesado ou de pouca duração.' },
    { q: 'Quanto tempo dura um plano?', a: 'Depende do objetivo. Há planos de uma etapa e planos distribuídos ao longo de 6 a 12 meses, com manutenção depois.' },
  ];
  const corpo = `
<section class="cabecalho-pagina"><div class="container">
  ${trilha([[caminho, 'Método']])}
  <span class="sobretitulo">Gerenciamento do envelhecimento</span>
  <h1>Um plano de tratamento, não um procedimento.</h1>
  <p class="lead">O método da ${esc(site.nome)} organiza o cuidado com o rosto em três pilares e em etapas, com acompanhamento a cada passo.</p>
</div></section>
<section class="secao"><div class="container-texto prosa">
  <div class="resumo-ia"><strong>Em resumo</strong>O método da Clínica Girlane Ferreira trata o envelhecimento facial em três pilares: reestruturação (estrutura e volume), pele que toca (firmeza) e pele que se vê (linhas, manchas e textura). Cada paciente recebe um plano por escrito, em etapas, com acompanhamento entre 15 e 30 dias depois de cada fase.</div>
  <h2>Por que trabalhar em pilares</h2>
  <p>O rosto muda por dentro antes de mudar por fora. O osso perde projeção, as bolsas de gordura diminuem e descem, os ligamentos afrouxam e a pele produz menos colágeno. <a href="${href('/conteudo/envelhecimento-facial-camadas')}">Neste artigo explicamos cada camada em detalhe</a>.</p>
  <p>Cada pilar responde a uma dessas mudanças:</p>
</div>
<div class="container" style="margin-top:32px"><div class="grade grade-3">
  ${Object.entries(pilares).map(([k, p], i) => {
    const lista = servicosAtivos.filter((s) => s.pilar === k);
    return `<article class="pilar"><span class="pilar-numero">0${i + 1}</span><small>${esc(p.resumo)}</small><h3>${esc(p.nome)}</h3><p>${esc(p.texto)}</p>${lista.length ? `<ul class="lista-check" style="margin-top:20px">${lista.map((s) => `<li>${icone('check')}<a href="${href('/tratamentos/' + s.slug)}">${esc(s.nome)}</a></li>`).join('')}</ul>` : ''}</article>`;
  }).join('')}
</div></div>
<div class="container-texto prosa" style="margin-top:64px">
  <h2>As etapas do atendimento</h2>
  <ol>
    <li><strong>Consulta.</strong> Conversa sobre o que incomoda e o que você não quer de jeito nenhum, histórico de saúde, medicamentos, procedimentos anteriores e fotos padronizadas.</li>
    <li><strong>Plano por escrito.</strong> Prioridades, técnicas, número estimado de sessões, intervalos e investimento.</li>
    <li><strong>Sessões.</strong> Produtos registrados na Anvisa, lote anotado no prontuário, material descartável aberto na sua frente.</li>
    <li><strong>Acompanhamento.</strong> Entre 15 e 30 dias, com novas fotos nas mesmas condições para comparar.</li>
    <li><strong>Manutenção.</strong> Um calendário para manter o resultado, com acompanhamento semestral.</li>
  </ol>
  <h2>Corpo e nutrição fazem parte</h2>
  <p>O plano pode incluir <a href="${href('/tratamentos/nutricao-estetica')}">acompanhamento nutricional</a> com o nutricionista da clínica e <a href="${href('/tratamentos/drenagem-linfatica')}">tratamentos corporais</a> com a esteticista. Colágeno precisa de proteína e micronutrientes para ser produzido, e inchaço pós-procedimento passa mais rápido com drenagem.</p>
  <h2>Perguntas sobre o método</h2>
  ${faqHtml(faqs)}
</div></section>
${blocoAntesDepois({ servicos: ['harmonizacao-facial', 'bioestimuladores-de-colageno', ...facial], titulo: 'O método na prática', texto: 'Planos em etapas, com acompanhamento e fotos padronizadas.', fundo: 'secao-creme', pagina: 'metodo' })}
${ctaFinal()}`;
  return {
    caminho,
    prioridade: '0.8',
    html: pagina({
      caminho,
      titulo: 'Método de tratamento facial em 3 pilares | Girlane Ferreira',
      descricao: 'O método da Clínica Girlane Ferreira em Joinville: plano facial em três pilares (estrutura, firmeza e qualidade da pele), com consulta e acompanhamento.',
      corpo,
      schema: [...paginaSchema({ caminho, nome: 'Método de tratamento', descricao: 'Plano de tratamento facial em três pilares.', tipo: 'MedicalWebPage', trilha: [[caminho, 'Método']] }), faqSchema(caminho, faqs)],
    }),
  };
}

export function tratamentos() {
  const caminho = '/tratamentos';
  setCaminho(caminho);
  const corpo = `
<section class="cabecalho-pagina"><div class="container">
  ${trilha([[caminho, 'Tratamentos']])}
  <h1>Tratamentos estéticos em Joinville</h1>
  <p class="lead">Rosto, corpo e nutrição. Cada tratamento entra no plano quando faz sentido para você, depois da consulta.</p>
</div></section>
${Object.entries(categorias).map(([k, c], i) => {
    const lista = servicosAtivos.filter((s) => s.categoria === k);
    if (!lista.length) return '';
    return `<section class="secao ${i % 2 ? 'secao-creme' : ''}" aria-labelledby="cat-${k}"><div class="container">
      <div class="cabecalho-secao"><h2 id="cat-${k}">${esc(c.nome)}</h2><p class="lead">${esc(c.descricao)}</p></div>
      <div class="grade grade-3">${lista.map(cartaoServico).join('')}</div>
    </div></section>`;
  }).join('')}
${blocoAntesDepois({ servicos: facial, titulo: 'Alguns resultados', pagina: 'tratamentos' })}
${ctaFinal('Não sabe por onde começar?', 'Na consulta a gente define juntas o que tratar primeiro. É para isso que ela existe.')}`;
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
      titulo: 'Tratamentos estéticos em Joinville | Clínica Girlane Ferreira',
      descricao: 'Harmonização facial, preenchimento, botox, bioestimuladores, skinbooster, manchas, microagulhamento, drenagem e nutrição estética em Joinville.',
      corpo,
      schema: [...paginaSchema({ caminho, nome: 'Tratamentos', descricao: 'Lista de tratamentos', tipo: 'CollectionPage', trilha: [[caminho, 'Tratamentos']], extra: { mainEntity: { '@id': absoluta(caminho) + '#lista' } } }), lista],
    }),
  };
}

export function paginaServico(s) {
  const caminho = '/tratamentos/' + s.slug;
  setCaminho(caminho);
  const p = profissionais[s.profissional];
  const cat = categorias[s.categoria];
  const pilar = s.pilar ? pilares[s.pilar] : null;
  const rel = s.relacionados.map((r) => servicoPorSlug[r]).filter((x) => x && x.ativo);
  const arts = (s.artigos || []).map((a) => artigoPorSlug[a]).filter(Boolean);
  const ficha = [['Duração', s.dados.duracao], ['Sessões', s.dados.sessoes], ['Recuperação', s.dados.recuperacao], ['Resultado', s.dados.resultado], ['Durabilidade', s.dados.durabilidade]];
  const urlAbs = absoluta(caminho);
  const ctaServico = s.profissional === 'hericles' && p.site
    ? `<a class="botao botao-primario" href="${p.site}" rel="noopener">Agendar com o nutricionista ${icone('seta', 'icone-500')}</a>`
    : `<a class="botao botao-primario" href="${whatsappUrl(`Olá! Vim pelo site e gostaria de agendar uma consulta para ${s.nome.toLowerCase()}.`)}" rel="noopener">${icone('whatsapp', 'icone-500')}Agendar consulta</a>`;
  const corpo = `
<section class="cabecalho-pagina"><div class="container">
  ${trilha([['/tratamentos', 'Tratamentos'], [caminho, s.nome]])}
  <span class="tag tag-${cat.cor}">${esc(cat.nome)}${pilar ? ' · ' + esc(pilar.nome) : ''}</span>
  <h1>${esc(s.h1)}</h1>
  <p class="lead">Com ${esc(nomeCompleto(p))}, ${esc(p.cargo.split(',')[0].toLowerCase())}.</p>
  <div class="botoes" style="margin-top:24px">${ctaServico}</div>
  ${capaServico(s.slug) ? `<div class="foto-larga capa-servico">${imagem({ foto: capaServico(s.slug), alt: `${s.nome} na Clínica Girlane Ferreira em Joinville`, prioridade: true })}</div>` : ''}
</div></section>
<article class="secao">
  <div class="container-texto prosa">
    <div class="resumo-ia"><strong>Resposta rápida</strong>${esc(s.resumo)}</div>
    <dl class="ficha">${ficha.map(([t, d]) => `<div><dt>${t}</dt><dd>${esc(d)}</dd></div>`).join('')}</dl>

    <h2>O que é ${esc(s.nome.toLowerCase())}?</h2>
    ${s.oQueE.map((t) => `<p>${esc(t)}</p>`).join('')}

    <h2>Para quem é indicado</h2>
    <ul class="lista-check">${s.indicacoes.map((t) => `<li>${icone('check')}<span>${esc(t)}</span></li>`).join('')}</ul>

    <h2>Como funciona na ${esc(site.nome)}</h2>
  </div>
  <div class="container" style="margin-block:24px 48px"><ol class="etapas">${s.etapas.map((e) => `<li><h3>${esc(e.titulo)}</h3><p>${esc(e.texto)}</p></li>`).join('')}</ol></div>
  <div class="container-texto prosa">
    ${s.contraindicacoes.length ? `<h2>Quando não fazer</h2><ul>${s.contraindicacoes.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>` : ''}
    ${s.cuidados.length ? `<h2>Cuidados depois do procedimento</h2><ul>${s.cuidados.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>` : ''}

    <h2>Perguntas frequentes sobre ${esc(s.nome.toLowerCase())}</h2>
    ${faqHtml(s.faqs)}

    ${arts.length ? `<h2>Para ler antes de decidir</h2><ul>${arts.map((a) => `<li><a href="${href('/conteudo/' + a.slug)}">${esc(a.titulo)}</a></li>`).join('')}</ul>` : ''}

    <p class="aviso">Os prazos e resultados descritos são médias e variam de pessoa para pessoa. A indicação de qualquer tratamento depende de consulta individual. Conteúdo revisado em ${dataBR(revisadoEm)}.</p>
    ${caixaAutor(s.profissional, 'Responsável pelo tratamento')}
  </div>
</article>
${blocoAntesDepois({ servicos: [s.slug, ...s.relacionados], titulo: `Antes e depois: ${s.nome.toLowerCase()}`, fundo: 'secao-clara', pagina: s.slug })}
${rel.length ? `<section class="secao secao-creme"><div class="container"><div class="cabecalho-secao"><h2>Tratamentos relacionados</h2></div><div class="grade grade-3">${rel.map(cartaoServico).join('')}</div></div></section>` : ''}
${ctaFinal()}`;

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
      corpo,
      schema: [
        ...paginaSchema({ caminho, nome: s.h1, descricao: s.metaDescription, tipo: 'MedicalWebPage', trilha: [['/tratamentos', 'Tratamentos'], [caminho, s.nome]], extra: { about: { '@id': urlAbs + '#procedimento' }, mainEntity: { '@id': urlAbs + '#servico' } } }),
        procedimento,
        servico,
        s.profissional !== 'girlane' ? pessoaSchema(p) : null,
        faqSchema(caminho, s.faqs),
      ].filter(Boolean),
    }),
  };
}

export function equipe() {
  const caminho = '/equipe';
  setCaminho(caminho);
  const corpo = `
<section class="cabecalho-pagina"><div class="container">
  ${trilha([[caminho, 'Equipe']])}
  <h1>Equipe</h1>
  <p class="lead">Rosto, corpo e nutrição tratados por quem é da área, conversando sobre o mesmo plano.</p>
</div></section>
<section class="secao"><div class="container grade" style="gap:96px">
  ${Object.values(profissionais).map((p, i) => `
  <article class="perfil" id="${p.slug}">
    <div class="perfil-foto">${imagem({ foto: fotoPro(chaveDe(p)), alt: `${nomeCompleto(p)}, ${p.cargo.toLowerCase()} da Clínica Girlane Ferreira em Joinville`, largura: 960, altura: 1200, prioridade: i === 0 })}</div>
    <div>
      <span class="sobretitulo">${esc(p.cargo)}</span>
      <h2>${esc(nomeCompleto(p))}</h2>
      <p class="lead">${esc(p.bioCurta)}</p>
      ${p.conselho && !pendente(p.conselho.numero) ? `<p><span class="credencial">${icone('selo')}${registroTexto(p)}</span></p>` : ''}
      <ul class="formacao">${p.formacao.filter((f) => !pendente(f.titulo) || mostrar(f.titulo, 'Formação ' + p.nome)).map((f) => `<li><div><strong>${mostrar(f.titulo, 'Formação ' + p.nome)}</strong><br><span>${mostrar(f.instituicao, 'Instituição ' + p.nome)}</span></div><span>${esc(f.ano)}</span></li>`).join('')}</ul>
      <p style="margin-top:20px">${servicosAtivos.filter((s) => s.profissional === Object.keys(profissionais).find((k) => profissionais[k] === p)).map((s) => `<a class="credencial" href="${href('/tratamentos/' + s.slug)}">${esc(s.nome)}</a>`).join('')}</p>
      ${p === g ? `<a class="link-seta" href="${href('/dra-girlane-ferreira')}">Conhecer a trajetória da Dra. Girlane ${icone('direita')}</a>` : ''}
      ${p.site ? `<a class="link-seta" href="${p.site}" rel="noopener">Site do ${esc(p.nome)} ${icone('direita')}</a>` : ''}
    </div>
  </article>`).join('')}
</div></section>
${blocoAntesDepois({ servicos: facial, fundo: 'secao-creme', pagina: 'equipe' })}
${ctaFinal()}`;
  return {
    caminho,
    prioridade: '0.7',
    html: pagina({
      caminho,
      titulo: 'Equipe da Clínica Girlane Ferreira em Joinville',
      descricao: 'A equipe da Clínica Girlane Ferreira em Joinville: biomédica esteta Dra. Girlane Ferreira, nutricionista e esteticista, com formação e registro.',
      corpo,
      schema: [...paginaSchema({ caminho, nome: 'Equipe', descricao: 'Profissionais da clínica', tipo: 'AboutPage', trilha: [[caminho, 'Equipe']] }), ...Object.values(profissionais).filter((p) => p !== g).map((p) => pessoaSchema(p, true))],
    }),
  };
}

export function resultados() {
  const caminho = '/resultados';
  setCaminho(caminho);
  const casos = todosCasos();
  const deps = depoimentos.length
    ? `<div class="grade grade-2">${depoimentos.map((d) => `<figure class="pilar" style="margin:0"><blockquote style="margin:0 0 16px;font-size:18px">"${esc(d.texto)}"</blockquote><figcaption style="color:var(--texto-2);font-size:15px">${esc(d.autor)}${d.fonte ? ' · avaliação no ' + esc(d.fonte) : ''}</figcaption></figure>`).join('')}</div>`
    : '';
  const porServico = servicosAtivos.map((sv) => ({ sv, lista: casos.filter((c) => c.servico === sv.slug) })).filter((x) => x.lista.length);
  const corpo = `
<section class="cabecalho-pagina"><div class="container">
  ${trilha([[caminho, 'Resultados']])}
  <h1>Antes e depois</h1>
  <p class="lead">Casos reais de pacientes da clínica, com o que foi feito e o tempo entre as fotos.</p>
</div></section>
<section class="secao"><div class="container-texto prosa">
  <div class="resumo-ia"><strong>Em resumo</strong>Todas as fotos de antes e depois da ${esc(site.nome)} são de pacientes reais que autorizaram o uso da imagem por escrito. As fotos não têm edição e são feitas com a mesma luz, o mesmo ângulo e a mesma distância. Cada caso informa a queixa, o tratamento, o número de sessões e o intervalo entre as fotos.</div>
  <h2>Como os resultados são registrados</h2>
  <ul class="lista-check">
    <li>${icone('check')}<span><strong>Fotos padronizadas</strong> antes de cada etapa e em cada acompanhamento, sempre nas mesmas condições.</span></li>
    <li>${icone('check')}<span><strong>Acompanhamento entre 15 e 30 dias</strong> para comparar e ajustar.</span></li>
    <li>${icone('check')}<span><strong>Produto e lote anotados</strong> no prontuário.</span></li>
    <li>${icone('check')}<span><strong>Autorização por escrito</strong> antes de qualquer foto ser publicada.</span></li>
  </ul>
  <p>Resultado não é promessa. Idade, qualidade da pele, hábitos e resposta de cada organismo mudam o que um mesmo tratamento entrega. As páginas de cada <a href="${href('/tratamentos')}">tratamento</a> explicam prazos médios, durabilidade e limitações.</p>
</div></section>
${porServico.map(({ sv, lista }, i) => `<section class="secao ${i % 2 ? '' : 'secao-creme'}" aria-labelledby="res-${sv.slug}"><div class="container">
  <div class="cabecalho-secao"><h2 id="res-${sv.slug}"><a href="${href('/tratamentos/' + sv.slug)}" style="color:inherit">${esc(sv.nome)}</a></h2></div>
  <div class="grade ${lista.length > 1 ? 'grade-2' : 'ad-unico'}">${lista.map((c) => antesDepois(c)).join('')}</div>
</div></section>`).join('')}
${deps || preenchido(site.perfis.googleMaps) ? `<section class="secao"><div class="container"><div class="cabecalho-secao"><h2>O que dizem as pacientes</h2></div>${deps}
  ${preenchido(site.perfis.googleMaps) ? `<div class="botoes" style="margin-top:28px"><a class="botao botao-secundario" href="${site.perfis.googleMaps}" rel="noopener">Ver avaliações no Google</a>${preenchido(site.perfis.googleAvaliar) ? `<a class="botao botao-secundario" href="${site.perfis.googleAvaliar}" rel="noopener">Deixar sua avaliação</a>` : ''}</div>` : ''}
</div></section>` : ''}
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
  <p class="meta-artigo"><span>Por <a href="${href('/' + autor.slug)}">${esc(nomeCompleto(autor))}</a>, ${esc(autor.profissao.toLowerCase())} esteta</span><span>Atualizado em <time datetime="${a.atualizado}">${dataBR(a.atualizado)}</time></span><span>${a.leitura} min de leitura</span></p>
</div></header>
<div class="secao"><div class="container-texto prosa">
  <div class="resumo-ia"><strong>Resposta rápida</strong>${esc(a.resumo)}</div>
  ${corpoArtigo.replace(/<table>/g, '<div class="tabela-rolagem"><table>').replace(/<\/table>/g, '</table></div>')}
  <h2>Perguntas frequentes</h2>
  ${faqHtml(a.faqs)}
  ${servs.length ? `<h2>Tratamentos relacionados</h2><ul>${servs.map((s) => `<li><a href="${href('/tratamentos/' + s.slug)}">${esc(s.h1)}</a></li>`).join('')}</ul>` : ''}
  <p class="aviso">Conteúdo educativo. Não substitui uma consulta individual.</p>
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
        faqSchema(caminho, a.faqs),
      ],
    }),
  };
}

export function perguntas() {
  const caminho = '/perguntas-frequentes';
  setCaminho(caminho);
  const gerais = [
    { q: 'Como agendar uma consulta?', a: 'Pelo WhatsApp da clínica. A equipe confirma o melhor horário e envia as orientações para o dia.' },
    { q: 'Preciso fazer consulta antes de qualquer procedimento?', a: 'Sim. A consulta é o que define se o procedimento é indicado, qual técnica usar e em que ordem. Nenhum procedimento injetável é feito sem ela.' },
    { q: 'Quem aplica os procedimentos injetáveis?', a: `A ${nomeCompleto(g)}, biomédica esteta com habilitação em Biomedicina Estética e registro no Conselho Regional de Biomedicina.` },
    { q: 'Os produtos usados são registrados na Anvisa?', a: 'Sim. Todos os produtos injetáveis têm registro na Anvisa, e o lote fica anotado no prontuário da paciente.' },
    { q: 'A clínica atende pacientes de outras cidades?', a: `Sim. Atendemos pacientes de ${site.areasAtendidas.join(', ')} e região.` },
    { q: 'Existe acompanhamento depois do procedimento?', a: 'Sim. O acompanhamento entre 15 e 30 dias faz parte do plano de tratamento, para comparar as fotos e ajustar detalhes.' },
    { q: 'As fotos de antes e depois são reais?', a: 'Sim. São pacientes da clínica que autorizaram por escrito o uso da imagem. As fotos não são editadas e são feitas com a mesma luz e o mesmo ângulo. Cada caso traz o que foi feito e o intervalo entre as fotos, porque o resultado varia de pessoa para pessoa.' },
  ];
  const porServico = servicosAtivos.map((s) => ({ s, faqs: s.faqs.slice(0, 2) }));
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
  <p>Este site não tem formulários nem cookies de publicidade. ${site.analyticsVercel ? 'Usamos o Vercel Web Analytics, que mede visitas de forma agregada e sem cookies.' : ''} Quando você clica para falar pelo WhatsApp, a conversa acontece no aplicativo, e os dados que você enviar serão usados apenas para agendamento e atendimento.</p>
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
