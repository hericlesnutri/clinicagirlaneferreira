// Dados estruturados (schema.org em JSON-LD).
// Tudo o que estiver vazio ou "PREENCHER" é removido por limpar().
import { site, profissionais, revisadoEm } from './data/site.mjs';
import { servicosAtivos, categorias } from './data/servicos.mjs';
import { limpar, absoluta, preenchido, registroPlano, nomeCompleto, pendente } from './lib.mjs';

export const ID = {
  site: `${site.dominio}/#website`,
  clinica: `${site.dominio}/#clinica`,
  girlane: `${site.dominio}/dra-girlane-ferreira#pessoa`,
  pessoa: (p) => (p.slug === profissionais.girlane.slug ? `${site.dominio}/dra-girlane-ferreira#pessoa` : `${site.dominio}/equipe#${p.slug}`),
};

const sameAs = () => Object.values(site.perfis).filter((u) => preenchido(u) && /^https?:/.test(u));

function endereco() {
  const e = site.endereco;
  return {
    '@type': 'PostalAddress',
    streetAddress: [e.rua, e.complemento].filter((x) => preenchido(x)).join(', ') || undefined,
    addressLocality: e.cidade,
    addressRegion: e.uf,
    postalCode: e.cep,
    addressCountry: e.pais,
  };
}

function horarios() {
  return site.horarios.map((h) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: h.dias.map((d) => `https://schema.org/${d}`), opens: h.abre, closes: h.fecha }));
}

export function pessoaSchema(p, completo = false) {
  const c = p.conselho;
  const credenciais = [];
  if (c && !pendente(c.numero)) {
    credenciais.push({
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Registro profissional',
      name: registroPlano(p),
      identifier: c.numero,
      url: c.url,
      recognizedBy: { '@type': 'Organization', name: c.sigla === 'CRBM' ? 'Conselho Regional de Biomedicina' : c.sigla === 'CRN' ? 'Conselho Regional de Nutricionistas' : c.sigla },
    });
    if (c.habilitacao) credenciais.push({ '@type': 'EducationalOccupationalCredential', credentialCategory: 'Habilitação', name: c.habilitacao, recognizedBy: { '@type': 'Organization', name: 'Conselho Federal de Biomedicina', url: 'https://cfbm.gov.br' } });
  }
  for (const f of p.formacao || []) {
    if (!pendente(f.titulo)) credenciais.push({ '@type': 'EducationalOccupationalCredential', credentialCategory: 'degree', name: f.titulo, dateCreated: f.ano, recognizedBy: pendente(f.instituicao) ? undefined : { '@type': 'EducationalOrganization', name: f.instituicao } });
  }
  return limpar({
    '@type': 'Person',
    '@id': ID.pessoa(p),
    name: nomeCompleto(p).replace(/^Dra\.\s*/, ''),
    honorificPrefix: p.tratamento,
    jobTitle: p.cargo,
    description: p.bioCurta,
    image: p.foto ? absoluta(p.foto) : undefined,
    url: p.slug === profissionais.girlane.slug ? absoluta('/dra-girlane-ferreira') : absoluta('/equipe') + '#' + p.slug,
    worksFor: { '@id': ID.clinica },
    hasOccupation: { '@type': 'Occupation', name: p.profissao === 'Biomédica' ? 'Biomédica esteta' : p.profissao, occupationLocation: { '@type': 'City', name: 'Joinville' } },
    knowsAbout: p.areas,
    hasCredential: completo ? credenciais : credenciais.slice(0, 1),
    alumniOf: (p.formacao || []).filter((f) => !pendente(f.instituicao)).map((f) => ({ '@type': 'EducationalOrganization', name: f.instituicao })),
    sameAs: [p.instagram].filter((u) => preenchido(u)),
  });
}

export function clinicaSchema() {
  const e = site.endereco;
  return limpar({
    '@type': ['MedicalClinic', 'HealthAndBeautyBusiness'],
    '@id': ID.clinica,
    name: site.nome,
    alternateName: ['Clínica Girlane', 'Dra. Girlane Ferreira'],
    description: site.descricao,
    slogan: site.slogan,
    url: site.dominio + '/',
    logo: { '@type': 'ImageObject', url: absoluta('/assets/logo-512.png'), width: 512, height: 512 },
    image: [absoluta('/assets/og/og-padrao.jpg')],
    telephone: site.telefone,
    email: site.email,
    address: endereco(),
    geo: preenchido(e.latitude) ? { '@type': 'GeoCoordinates', latitude: e.latitude, longitude: e.longitude } : undefined,
    hasMap: preenchido(site.perfis.googleMaps) ? site.perfis.googleMaps : undefined,
    openingHoursSpecification: horarios(),
    priceRange: site.faixaDePreco,
    currenciesAccepted: 'BRL',
    foundingDate: site.fundacao,
    founder: { '@id': ID.girlane },
    employee: Object.values(profissionais).map((p) => ({ '@id': ID.pessoa(p) })),
    areaServed: site.areasAtendidas.map((c) => ({ '@type': 'City', name: c })),
    isAcceptingNewPatients: true,
    knowsAbout: ['Gerenciamento do envelhecimento facial', 'Harmonização facial', 'Estética facial', 'Estética corporal', 'Nutrição estética'],
    sameAs: sameAs(),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Tratamentos',
      itemListElement: Object.entries(categorias).map(([k, c]) => ({
        '@type': 'OfferCatalog',
        name: c.nome,
        itemListElement: servicosAtivos.filter((s) => s.categoria === k).map((s) => ({ '@type': 'Offer', itemOffered: { '@id': absoluta('/tratamentos/' + s.slug) + '#servico' } })),
      })),
    },
  });
}

export function grafoBase() {
  return [
    { '@type': 'WebSite', '@id': ID.site, url: site.dominio + '/', name: site.nome, inLanguage: 'pt-BR', publisher: { '@id': ID.clinica } },
    clinicaSchema(),
    pessoaSchema(profissionais.girlane, false),
  ];
}

export function paginaSchema({ caminho, nome, descricao, tipo = 'WebPage', trilha = [], extra = {} }) {
  const url = absoluta(caminho);
  const nodes = [
    limpar({
      '@type': tipo,
      '@id': url + '#pagina',
      url,
      name: nome,
      description: descricao,
      inLanguage: 'pt-BR',
      isPartOf: { '@id': ID.site },
      about: { '@id': ID.clinica },
      primaryImageOfPage: { '@type': 'ImageObject', url: absoluta('/assets/og/og-padrao.jpg') },
      breadcrumb: trilha.length ? { '@id': url + '#trilha' } : undefined,
      lastReviewed: tipo === 'MedicalWebPage' ? revisadoEm : undefined,
      reviewedBy: tipo === 'MedicalWebPage' ? { '@id': ID.girlane } : undefined,
      ...extra,
    }),
  ];
  if (trilha.length) {
    nodes.push({
      '@type': 'BreadcrumbList',
      '@id': url + '#trilha',
      itemListElement: [['/', 'Início'], ...trilha].map(([p, n], i) => ({ '@type': 'ListItem', position: i + 1, name: n, item: absoluta(p) })),
    });
  }
  return nodes;
}

export const faqSchema = (caminho, faqs) => ({
  '@type': 'FAQPage',
  '@id': absoluta(caminho) + '#faq',
  mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
});
