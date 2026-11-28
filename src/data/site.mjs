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
    latitude: -26.2634218,                    // do Perfil da Empresa no Google
    longitude: -48.8037049,
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
    googleMaps: 'https://maps.google.com/?cid=12780584382842996891', // Perfil da Empresa no Google
    googleMapsLugar: '0x94deafed6802f801:0xb15dc1c82143089b', // código do lugar no Google (o mapa da página inicial mostra este perfil)
    googleAvaliar: '',     // link "Pedir avaliações" do Perfil da Empresa
    facebook: '',
    tiktok: '',
    youtube: '',
    linkedin: '',
  },

  // Dados legais (política de privacidade)
  razaoSocial: '',
  cnpj: '30.344.954/0001-82',

  // Nota no Google (copiar do Perfil da Empresa e atualizar de vez em quando).
  // O perfil ainda aparece com o nome antigo, "Mais que Rubis Studio".
  // Fica só no texto da página, fora dos dados estruturados: o Google não
  // aceita que o próprio site marque as suas avaliações.
  avaliacoesGoogle: { nota: '5,0', total: 47, nomeNoGoogle: 'Mais que Rubis Studio', conferidoEm: '2026-11-27' },

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
    anosDeExperiencia: 12,                  // atuação em estética
    foto: '/img/equipe/girlane-perfil.webp',   // foto de perfil (enviada pela Dra. Girlane), usada nos cartões de autor e selos
    instagram: 'https://www.instagram.com/dra.girlaneferreira/',
    areas: ['Gerenciamento do envelhecimento facial', 'Harmonização facial', 'Preenchimento com ácido hialurônico', 'Toxina botulínica', 'Bioestimuladores de colágeno', 'Qualidade de pele'],
    // Apresentação em primeira pessoa (página inicial, seção "Quem cuida de você")
    apresentacao: [
      'Sou biomédica esteta e há 12 anos trabalho com estética. Nesse tempo, aprendi que um rosto bonito não vem de procedimentos soltos, e sim de um plano pensado para cada pessoa, feito na ordem certa e acompanhado de perto.',
      'Foi com essa experiência que criei a Clínica Girlane Ferreira, em Joinville. Meu trabalho não é mudar quem você é: é cuidar para que o que é seu permaneça, com naturalidade e critério.',
    ],
    // Tags de serviços na página Equipe: [nome que aparece, página do tratamento]
    servicosTags: [
      ['Harmonização facial e corporal', 'harmonizacao-facial'],
      ['Reestruturação facial', 'reestruturacao-facial'],
      ['Preenchimento labial', 'preenchimento-labial'],
      ['Micropigmentação labial', 'micropigmentacao-labial'],
      ['Micropigmentação de sobrancelhas', 'micropigmentacao-de-sobrancelhas'],
      ['Botox', 'toxina-botulinica'],
      ['Estímulo de colágeno', 'bioestimuladores-de-colageno'],
      ['Manchas e melasma', 'tratamento-de-manchas'],
      ['Bigode chinês', 'bigode-chines'],
      ['Olheiras', 'olheiras'],
      ['Vasinhos', 'tratamento-de-vasinhos'],
      ['Empina bumbum', 'empina-bumbum'],
      ['Gordura localizada', 'gordura-localizada'],
      ['Flacidez', 'flacidez-corporal'],
      ['Estrias', 'estrias'],
    ],
    // Página Equipe, bloco "Como eu trabalho" (primeira pessoa)
    comoTrabalho: [
      'Não acredito em procedimento solto. Começo sempre por uma consulta, para entender suas queixas e alinhar expectativas, e organizo o tratamento em três pilares: reestruturação, pele que toca e pele que se vê. O objetivo é que você continue se reconhecendo no espelho.',
    ],
    bioCurta:
      'Biomédica esteta e fundadora da Clínica Girlane Ferreira, em Joinville. Trabalha com planos de tratamento para o rosto, pensados para acompanhar o envelhecimento com naturalidade, em vez de procedimentos soltos.',
  },
  // Dados tirados do site do Hericles (nutrihericles.com.br, repositório hericlesnutricionista-site), em 27/11/2026.
  hericles: {
    slug: 'nutricionista-hericles',
    nome: 'Hericles Ferreira',
    tratamento: '',
    cargo: 'Nutricionista',
    profissao: 'Nutricionista',
    conselho: { sigla: 'CRN', regiao: '10', numero: '12284', habilitacao: '', url: '' },
    formacao: [
      { titulo: 'Graduação em Nutrição', instituicao: 'Católica de Santa Catarina', ano: '' },
      { titulo: 'Pós-graduação em Metabolismo e Emagrecimento', instituicao: 'Faculdade Uniguaçu', ano: '' },
    ],
    atualizacoes: [],
    foto: '/img/equipe/hericles-perfil.webp',   // foto de perfil (do site dele), usada nos cartões de autor
    instagram: 'https://www.instagram.com/nutrihericles/',
    linkedin: 'https://www.linkedin.com/in/hericlesnutri',
    site: 'https://nutrihericles.com.br',   // página própria do Hericles
    areas: ['Nutrição estética', 'Emagrecimento', 'Ganho de massa muscular (hipertrofia)', 'Composição corporal', 'Metabolismo', 'Alimentação e envelhecimento da pele'],
    // Tags de serviços na página Equipe (as que têm página própria viram link)
    servicosTags: ['Emagrecimento', 'Hipertrofia', 'Nutrição esportiva', 'Nutrição estética', 'Nutrição comportamental'],
    comoTrabalho: [
      'Antes de montar o seu planejamento, procuro entender sua rotina, suas preferências e suas dificuldades. Trabalho em três etapas (entender, planejar e acompanhar), com atendimento aqui na clínica ou on-line, e o plano alimentar fica pronto em até 72 horas.',
    ],
    bioCurta:
      'Nutricionista formado pela Católica de Santa Catarina e pós-graduado em Metabolismo e Emagrecimento. Na clínica, cuida da parte de dentro do plano: alimentação, composição corporal e hábitos que interferem na pele e na resposta aos tratamentos, sem dietas extremas e com acompanhamento individualizado.',
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
    foto: '/img/equipe/diva-perfil.webp',   // foto de perfil, usada nos cartões de autor e selos
    instagram: '',
    areas: ['Drenagem linfática', 'Massagem modeladora', 'Tratamentos corporais'],
    servicosTags: ['Drenagem linfática', 'Massagem relaxante', 'Massagem terapêutica', 'Massagem modeladora', 'Criolipólise', 'Ultrassom microfocado', 'Estrias', 'Celulite'],
    comoTrabalho: [],                       // PREENCHER: como a Diva trabalha (primeira pessoa)
    bioCurta:
      'Esteticista responsável pelos tratamentos corporais: drenagem linfática, massagem modeladora e protocolos para o corpo.',
  },
};

// ---------------- Depoimentos ----------------
// Use só depoimentos reais, com autorização por escrito da paciente,
// de preferência copiados das avaliações do Google. Sem promessa de
// resultado e sem fotos de antes e depois.
// Ex.: { texto: 'Fui muito bem orientada desde a consulta...', autor: 'Mariana S.', fonte: 'Google', data: '2026-12-01' }
// Foto da paciente: só com autorização dela. Salve a imagem em
// public/img/depoimentos/ e preencha, por ex.: foto: '/img/depoimentos/ana-carolina.webp'.
// Sem foto, o cartão mostra a inicial do nome. As fotos atuais vieram do
// perfil de cada paciente no Google, com autorização (27/11/2026).
export const depoimentos = [
  // Copiados das avaliações do Google (perfil da clínica), em 27/11/2026.
  { texto: 'Eu amei o atendimento, desde a recepção até chegar à Dra. Girlane, que é muito atenciosa e amorosa! (…) Vou voltar e indicar para muitas pessoas!', autor: 'Ana Carolina', foto: '/img/depoimentos/ana-carolina.jpg', fonte: 'Google', data: '2026-11' },
  { texto: 'Sem palavras, começando pelo atendimento maravilhoso da Gi, e o ambiente super aconchegante, com canções que alegram seu coração e te fazem relaxar. Muito profissional, super indico!', autor: 'Fernanda F.', fonte: 'Google', data: '2023' },
  { texto: 'A clínica é impecável em todos os aspectos, da estrutura ao atendimento! Só agradecer e indicar esse trabalho maravilhoso!', autor: 'Kami N.', foto: '/img/depoimentos/kami-n.jpg', fonte: 'Google', data: '2026-11' },
  { texto: 'Top! Nota 10! Fiz minha sobrancelha com a Gi e super recomendo!', autor: 'Milli P.', fonte: 'Google', data: '2023' },
  { texto: 'A clínica é maravilhosa, fui muito bem recebida. Profissionais competentes e atendimento responsável.', autor: 'Margarete Z.', fonte: 'Google', data: '2026-11' },
  { texto: 'Excelente atendimento. Fazem tudo com muito amor e profissionalismo. Recomendo.', autor: 'Marilia O.', foto: '/img/depoimentos/marilia-o.jpg', fonte: 'Google', data: '2022' },
  { texto: 'Cada cantinho é muito lindo e aconchegante! Profissionalismo do digital ao presencial… recomendo muito.', autor: 'Evellyn K.', foto: '/img/depoimentos/evellyn-k.jpg', fonte: 'Google', data: '2026-11' },
  { texto: 'Lugar maravilhoso, pessoas queridas, excelente profissional, carinhosa, atenciosa. Espaço limpo e organizado. Estão de parabéns, super recomendo!', autor: 'Aline F.', foto: '/img/depoimentos/aline-f.jpg', fonte: 'Google', data: '2022' },
  { texto: 'Excelentes profissionais! Um local onde você se sente muito bem acolhida.', autor: 'Marcia B.', foto: '/img/depoimentos/marcia-b.jpg', fonte: 'Google', data: '2023' },
  { texto: 'Presta um ótimo atendimento. (…) Minha esposa fez a micropigmentação de sobrancelhas e parece bem natural.', autor: 'Tiago A.', fonte: 'Google', data: '2023' },
  { texto: 'Lugar maravilhoso, pessoas atenciosas, fui muito bem recebida.', autor: 'Julie Cristine S.', fonte: 'Google', data: '2026-11' },
  { texto: 'Atendimento maravilhoso, profissionais excelentes, amei o trabalho.', autor: 'Anah D.', fonte: 'Google', data: '2023' },
  { texto: 'Melhor lugar para estética! As meninas são super atenciosas, me sinto muito bem cuidada.', autor: 'Adriana F.', fonte: 'Google', data: '2024' },
  { texto: 'Super indico! Atendimento excelente e com qualidade.', autor: 'Jenifer F.', fonte: 'Google', data: '2024' },
];

// Data da última revisão geral do conteúdo (aparece nas páginas)
export const revisadoEm = '2026-11-24';
