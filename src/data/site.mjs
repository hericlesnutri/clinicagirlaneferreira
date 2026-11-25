// =====================================================================
// DADOS DA CLÍNICA: ESTE É O ÚNICO ARQUIVO QUE PRECISA SER PREENCHIDO
// =====================================================================
// Tudo o que estiver como "PREENCHER" aparece como aviso quando o site é
// gerado (npm run build) e é omitido automaticamente dos dados
// estruturados (JSON-LD), para o Google nunca ler um dado falso.
//
// Regra de ouro do SEO local: nome, endereço e telefone (NAP) precisam
// ser IDÊNTICOS aqui, no Perfil da Empresa no Google, no Instagram e em
// qualquer diretório. Copie e cole, não reescreva.
// =====================================================================

export const site = {
  nome: 'Clínica Girlane Ferreira',
  nomeCurto: 'Girlane Ferreira',
  dominio: 'https://www.clinicagirlaneferreira.com.br',
  idioma: 'pt-BR',
  slogan: 'O que a gente cuida, permanece.',
  descricao:
    'Clínica de estética avançada em Joinville (SC) dirigida pela biomédica esteta Dra. Girlane Ferreira. Planos de tratamento facial, corporal e nutricional para envelhecer bem, com naturalidade.',
  fundacao: '2026-11', // inauguração
  faixaDePreco: '$$$',

  // ---------------- Endereço (NAP) ----------------
  endereco: {
    rua: 'Rua Areia Branca, 1035',
    complemento: '',                          // ex.: 'Sala 501, Edifício X'
    bairro: 'Jardim Iririú',
    cidade: 'Joinville',
    uf: 'SC',
    cep: '89224-090',
    pais: 'BR',
    // Copie do Google Maps (clique com o botão direito no pin da clínica)
    latitude: null,                           // ex.: -26.3044
    longitude: null,                          // ex.: -48.8487
    referencia: '',                           // ex.: 'Em frente ao Shopping Mueller'
  },

  // ---------------- Contato ----------------
  telefone: '(47) 98465-0951',
  whatsapp: '5547984650951',
  whatsappMensagem: 'Olá! Vim pelo site e gostaria de agendar uma consulta.',
  email: '',                                 // ex.: contato@clinicagirlaneferreira.com.br

  // ---------------- Horários ----------------
  // Deixe a lista vazia enquanto não tiver certeza. Horário errado no
  // Google gera avaliação negativa.
  horarios: [
    { dias: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], abre: '09:00', fecha: '20:00' },
  ],
  atendimentoObservacao: 'Atendimento com hora marcada.',

  // ---------------- Presença on-line (sameAs) ----------------
  // Cada perfil listado aqui ajuda o Google e as IAs a confirmar que a
  // clínica e a Dra. Girlane são a mesma entidade em toda a internet.
  perfis: {
    instagram: 'https://www.instagram.com/dra.girlaneferreira/',
    instagramClinica: 'https://www.instagram.com/clinicagirlaneferreira/',
    googleMaps: '',        // link "Compartilhar" do Perfil da Empresa no Google
    googleAvaliar: '',     // link "Pedir avaliações" do Perfil da Empresa
    facebook: '',
    tiktok: '',
    youtube: '',
    linkedin: '',
  },

  // Dados legais (política de privacidade)
  razaoSocial: '',
  cnpj: '30.344.954/0001-82',

  // Ferramentas
  googleVerificacao: '',   // código da meta tag do Search Console (se não usar verificação por DNS)
  analyticsVercel: false,  // true depois de ativar o Web Analytics no painel da Vercel (não usa cookies)

  // Áreas atendidas (ajuda em buscas como "harmonização facial perto de mim")
  areasAtendidas: ['Joinville', 'Araquari', 'São Francisco do Sul', 'Garuva', 'Guaramirim', 'Jaraguá do Sul', 'Itapoá', 'Barra Velha'],
};

// ---------------- Profissionais ----------------
export const profissionais = {
  girlane: {
    slug: 'dra-girlane-ferreira',
    nome: 'Girlane Ferreira',
    tratamento: 'Dra.',
    cargo: 'Biomédica Esteta, fundadora e responsável técnica',
    profissao: 'Biomédica',
    conselho: {
      sigla: 'CRBM',
      regiao: '5',
      numero: '12022',
      habilitacao: 'Habilitação em Biomedicina Estética',
      url: '',                              // link da consulta pública do CRBM, se houver
    },
    // Formação acadêmica: entra no site e nos dados estruturados (alumniOf)
    formacao: [
      { titulo: 'PREENCHER: Graduação em Biomedicina', instituicao: 'PREENCHER: Instituição', ano: '' },
      // { titulo: 'Pós-graduação em Biomedicina Estética', instituicao: '...', ano: '2020' },
      // { titulo: 'Especialização em Harmonização Orofacial', instituicao: '...', ano: '2022' },
    ],
    // Cursos, congressos, títulos de especialista, prêmios
    atualizacoes: [
      // 'Congresso XYZ de Estética Avançada (2025)',
    ],
    anosDeExperiencia: null,                // ex.: 8
    foto: null,                             // ex.: '/img/dra-girlane-ferreira-biomedica-esteta-joinville.webp'
    instagram: 'https://www.instagram.com/dra.girlaneferreira/',
    areas: ['Gerenciamento do envelhecimento facial', 'Harmonização facial', 'Preenchimento com ácido hialurônico', 'Toxina botulínica', 'Bioestimuladores de colágeno', 'Qualidade de pele'],
    bioCurta:
      'Biomédica esteta e fundadora da Clínica Girlane Ferreira, em Joinville. Trabalha com planos de tratamento para o rosto, pensados para acompanhar o envelhecimento com naturalidade, em vez de procedimentos soltos.',
  },
  hericles: {
    slug: 'nutricionista-hericles',
    nome: 'Hericles',                       // PREENCHER sobrenome
    tratamento: '',
    cargo: 'Nutricionista',
    profissao: 'Nutricionista',
    conselho: { sigla: 'CRN', regiao: '10', numero: 'PREENCHER: 00000', habilitacao: '', url: '' },
    formacao: [{ titulo: 'PREENCHER: Graduação em Nutrição', instituicao: 'PREENCHER', ano: '' }],
    atualizacoes: [],
    foto: null,
    instagram: '',
    site: 'https://nutrihericles.com.br',   // página própria do Hericles
    areas: ['Nutrição estética', 'Composição corporal', 'Alimentação e envelhecimento da pele'],
    bioCurta:
      'Nutricionista da clínica. Cuida da parte de dentro do plano: alimentação, composição corporal e hábitos que interferem na pele e na resposta aos tratamentos.',
  },
  diva: {
    slug: 'esteticista-diva',
    nome: 'Diva',                           // PREENCHER sobrenome
    tratamento: '',
    cargo: 'Esteticista',
    profissao: 'Esteticista',
    conselho: null,
    formacao: [{ titulo: 'PREENCHER: Formação em Estética', instituicao: 'PREENCHER', ano: '' }],
    atualizacoes: [],
    foto: null,
    instagram: '',
    areas: ['Drenagem linfática', 'Massagem modeladora', 'Tratamentos corporais'],
    bioCurta:
      'Esteticista responsável pelos tratamentos corporais: drenagem linfática, massagem modeladora e protocolos para o corpo.',
  },
};

// ---------------- Depoimentos ----------------
// Use só depoimentos reais, com autorização por escrito da paciente,
// de preferência copiados das avaliações do Google. Sem promessa de
// resultado e sem fotos de antes e depois.
// Ex.: { texto: 'Fui muito bem orientada desde a consulta...', autor: 'Mariana S.', fonte: 'Google', data: '2026-12-01' }
export const depoimentos = [];

// Data da última revisão geral do conteúdo (aparece nas páginas)
export const revisadoEm = '2026-11-24';
