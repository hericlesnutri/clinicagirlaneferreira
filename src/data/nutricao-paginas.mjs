// Páginas dos serviços do Hericles Ferreira no formato do site dele
// (nutrihericles.com.br): abertura, destaques, jornada de acompanhamento,
// "o que você encontra", perguntas, artigos dele.
// Conteúdo copiado das páginas dele em 27/11/2026 e adaptado ao site da clínica:
// - "avaliação física" virou "composição corporal" (regra do site: não usar "avaliação");
// - o endereço passou a ser o da clínica;
// - "Transformações reais": os mesmos casos do site dele (pedido da Dra. Girlane, 27/11/2026).
//   Autorização dos pacientes confirmada para o site da clínica. Sem dados de saúde nem de peso dos pacientes.
// O Hericles deve revisar antes de publicar.

const imgJornada = (nome) => `/img/nutricao/${nome}.webp`;

// Jornada de acompanhamento (igual nas páginas dele; a comportamental muda o tom)
export const jornadaBase = [
  { n: '01', rotulo: 'Pré-consulta', titulo: 'Sua consulta começa antes de você chegar', texto: 'No questionário pré-consulta eu levanto pontos importantes sobre sua saúde, hábitos e rotina. Assim, nosso encontro começa com contexto e aproveitamos melhor cada minuto da consulta.', img: imgJornada('pre-consulta') },
  { n: '02', rotulo: 'Consulta', titulo: 'Eu entendo a sua realidade', texto: 'Em consulta vou entender melhor seu histórico de saúde e comportamento, rotina, exames, dificuldades do dia a dia e tudo o que puder influenciar na sua evolução.', img: imgJornada('consulta') },
  { n: '03', rotulo: 'Composição corporal', titulo: 'Bioimpedância e dobras cutâneas', texto: 'Medimos a sua composição corporal para criar um ponto de partida e acompanhar sua evolução com dados, contexto e comparação: bioimpedância, circunferências e dobras cutâneas.', img: imgJornada('composicao-corporal') },
  { n: '04', rotulo: 'Plano alimentar', titulo: 'Plano personalizado e individualizado', texto: 'Após a consulta, eu elaboro o plano inicial com base no que conversamos, respeitando sua rotina, preferências e objetivo. Ele fica pronto em até 72 horas.', img: imgJornada('plano-alimentar') },
  { n: '05', rotulo: 'Check-in semanal', titulo: 'Toda sexta-feira', texto: 'No aplicativo de acompanhamento, olhamos como foi a semana, onde o planejamento funcionou, onde travou e como está sua adesão. Assim conseguimos ajustar o caminho.', img: imgJornada('check-in-semanal') },
  { n: '06', rotulo: 'Suporte', titulo: 'Acompanhamento entre os encontros', texto: 'Entre os encontros, você tem meu suporte pelo WhatsApp para tirar dúvidas e alterar o planejamento quando a rotina pedir um ajuste.', img: imgJornada('suporte') },
  { n: '07', rotulo: 'App exclusivo', titulo: 'Tudo organizado em um só lugar', texto: 'No aplicativo você acessa o planejamento alimentar, sua composição corporal, os dados dos nossos encontros e os materiais que usamos ao longo da jornada.', img: imgJornada('aplicativo') },
  { n: '08', rotulo: 'Recursos exclusivos', titulo: 'Caixa de Ferramentas do Nutri', texto: 'Você também recebe acesso à minha Caixa de Ferramentas, com recursos e materiais pensados para facilitar sua rotina e colocar o planejamento em prática.', img: imgJornada('caixa-de-ferramentas') },
];

// Antes e depois (do site dele). As imagens já trazem o antes e o depois lado a lado.
const casoImg = (n) => `/img/nutricao/casos/${n}.webp`;
const casos = {
  leonardo: { nome: 'Leonardo', idade: '24 anos', tempo: '3 meses', perfil: 'Falso magro', descricao: 'Definição corporal, perda de gordura e ganho de massa.', img: casoImg('leonardo') },
  daniela: { nome: 'Daniela', perfil: 'Reeducação alimentar', descricao: 'Reeducação alimentar e emagrecimento com acompanhamento nutricional.', img: casoImg('daniela') },
  gabriel: { nome: 'Gabriel', idade: '28 anos', tempo: '3 meses', perfil: 'Falso magro', descricao: 'Ganho de massa e redução de gordura.', img: casoImg('gabriel') },
  djonatan: { nome: 'Djonatan', idade: '30 anos', tempo: '5 meses', perfil: 'Falso magro', descricao: 'Perda de gordura e definição muscular.', img: casoImg('djonatan') },
  hericles: { nome: 'Hericles', idade: '30 anos', tempo: '5 meses', perfil: 'Obesidade', descricao: 'Recomposição corporal com maior perda de gordura. O próprio nutricionista.', img: casoImg('hericles') },
};
const todosCasos = [casos.leonardo, casos.daniela, casos.gabriel, casos.djonatan, casos.hericles];
const casosTreino = [casos.leonardo, casos.gabriel, casos.djonatan, casos.hericles];

export const destaques = [
  ['Presencial e on-line', 'Aqui na clínica, em Joinville, ou por videochamada'],
  ['Até 72h', 'Para receber seu plano alimentar depois da consulta'],
  ['Acompanhamento semanal', 'Para ajustar alimentação, treino e evolução'],
];

// Perguntas frequentes (do site dele), com o endereço da clínica
export const faq = {
  presencial: { q: 'Como funciona a consulta nutricional presencial?', a: 'Antes da consulta, você recebe o questionário pré-consulta. Na consulta, aqui na clínica, entendemos sua rotina, seus hábitos alimentares e seu comportamento, medimos a composição corporal e definimos como será o seu plano alimentar.' },
  online: { q: 'Como funciona a consultoria on-line?', a: 'A consultoria on-line começa com um questionário detalhado, que substitui a consulta presencial. Com base nas respostas, o nutricionista elabora o seu planejamento alimentar.' },
  cortar: { q: 'Preciso cortar pão, arroz e os alimentos de que gosto?', a: 'Não necessariamente. O planejamento alimentar considera suas preferências, sua rotina e suas necessidades.' },
  contato: { q: 'O acompanhamento inclui contato depois do plano alimentar?', a: 'Sim. Além do suporte pelo WhatsApp, você tem o check-in semanal.' },
  recomposicao: { q: 'É possível ganhar massa muscular e perder gordura?', a: 'Sim, dependendo do histórico e do contexto. Mudanças na composição corporal podem acontecer com planejamento alimentar e treinamento adequados, e a estratégia precisa ser individualizada.' },
  canetas: { q: 'Vocês acompanham quem usa Mounjaro, Ozempic ou tirzepatida?', a: 'Sim. O planejamento nutricional ajuda a organizar a alimentação, olhar a ingestão de proteínas e lidar com dificuldades nutricionais durante o tratamento.' },
  prazo: { q: 'Quanto tempo demora para receber o planejamento alimentar?', a: 'Depois da consulta, o planejamento alimentar e as orientações ficam prontos em até 72 horas.' },
  onde: { q: 'Onde encontro o plano e as orientações?', a: 'Você recebe o planejamento e as orientações pelo WhatsApp e tem acesso ao aplicativo Dietitian, onde ficam o plano alimentar, receitas, prescrições e exames.' },
  endereco: { q: 'Onde é o atendimento presencial?', a: 'Aqui na Clínica Girlane Ferreira, na Rua Areia Branca, 1035, Jardim Iririú, em Joinville (SC).' },
  whey: { q: 'Preciso usar whey para ganhar massa muscular?', a: 'Não necessariamente. A necessidade de suplementos depende da alimentação, da rotina e da análise individual.' },
  iniciante: { q: 'Atende quem está começando a musculação?', a: 'Sim. A estratégia é adaptada tanto a quem está começando quanto a quem já treina com regularidade.' },
  atletas: { q: 'O atendimento é apenas para atletas?', a: 'Não. Quem pratica atividade física e quer melhorar a alimentação e a composição corporal também pode se beneficiar.' },
  sairDoPlano: { q: 'E se eu sair do plano alimentar?', a: 'Não é tratado como fracasso. Usamos essas situações para entender o que precisa mudar e criar estratégias mais viáveis para a sua rotina.' },
  proibidos: { q: 'Vou ter uma lista de alimentos proibidos?', a: 'Não. O planejamento trabalha com flexibilidade, quantidades e frequência, sem proibições arbitrárias.' },
};

// Artigos do Hericles (no site dele)
export const artigo = {
  fome: { titulo: 'Como emagrecer sem passar fome?', resumo: 'Volume, saciedade e flexibilidade alimentar para construir uma rotina que realmente seja possível manter.', categoria: 'Emagrecimento', url: 'https://www.nutrihericles.com.br/artigos/como-emagrecer-sem-passar-fome/' },
  massa: { titulo: 'Como perder gordura sem perder massa muscular?', resumo: 'Proteína, treinamento e estratégia nutricional para preservar massa muscular durante o emagrecimento.', categoria: 'Composição corporal', url: 'https://www.nutrihericles.com.br/artigos/como-perder-gordura-sem-perder-massa-muscular/' },
  parei: { titulo: 'Por que parei de emagrecer mesmo fazendo dieta?', resumo: 'O que vale a pena observar antes de simplesmente comer menos ou aumentar ainda mais as restrições.', categoria: 'Metabolismo', url: 'https://www.nutrihericles.com.br/artigos/porque-parei-de-emagrecer-mesmo-fazendo-dieta/' },
  canetas: { titulo: 'Alimentação durante o uso de Mounjaro, Ozempic e tirzepatida', resumo: 'Como organizar a alimentação, preservar massa muscular e lidar com dificuldades nutricionais durante o tratamento.', categoria: 'Tratamento e alimentação', url: 'https://www.nutrihericles.com.br/artigos/alimentacao-mounjaro-ozempic-tirzepatida/' },
};

export const paginasNutricao = {
  emagrecimento: {
    sobretitulo: 'Emagrecimento em Joinville · CRN-10 12284',
    titulo: 'Emagrecimento com estratégia, sem dieta maluca',
    intro: 'Emagrecer não precisa significar cortar tudo o que você gosta. O acompanhamento considera sua rotina, preferências, histórico e objetivos para planejar mudanças que façam sentido na vida real.',
    destaques,
    jornadaTitulo: 'Sua jornada para emagrecer começa aqui',
    jornadaTexto: 'Do primeiro contato aos ajustes de cada semana, cada etapa foi pensada para transformar uma consulta em acompanhamento de verdade.',
    jornada: jornadaBase,
    beneficios: [
      ['Plano alimentar individualizado', 'Estratégias para reduzir gordura corporal sem transformar cada refeição em uma lista de proibições.'],
      ['Acompanhamento de verdade', 'Check-ins semanais para identificar dificuldades, acompanhar a evolução e orientar ajustes no planejamento.'],
      ['Evolução com dados', 'No atendimento presencial, a composição corporal complementa a análise de hábitos e medidas.'],
    ],
    casos: todosCasos,
    faqs: [faq.presencial, faq.online, faq.cortar, faq.contato, faq.recomposicao, faq.canetas, faq.prazo, faq.onde, faq.endereco],
    artigos: [artigo.fome, artigo.massa, artigo.parei, artigo.canetas],
  },

  hipertrofia: {
    sobretitulo: 'Hipertrofia em Joinville · CRN-10 12284',
    titulo: 'Ganho de massa muscular com estratégia',
    intro: 'Quer ganhar massa muscular ou melhorar a composição corporal? O acompanhamento e o planejamento consideram intensidade e frequência dos treinos, rotina e preferências alimentares.',
    destaques,
    jornadaTitulo: 'Sua jornada para ganhar massa começa aqui',
    jornadaTexto: 'Do primeiro contato aos ajustes de cada semana, cada etapa foi pensada para transformar uma consulta em acompanhamento de verdade.',
    jornada: jornadaBase,
    beneficios: [
      ['Estratégia para hipertrofia', 'Ajuste da ingestão de energia e de nutrientes de acordo com os seus objetivos e as suas necessidades individuais.'],
      ['Composição corporal', 'Acompanhamento de medidas, evolução física e sinais da rotina para orientar as decisões ao longo do processo.'],
      ['Cutting e bulking sem extremismos', 'Ganho de massa ou redução de gordura com metas realistas e adaptações conforme a sua resposta.'],
    ],
    casos: casosTreino,
    faqs: [faq.whey, faq.iniciante, faq.recomposicao, faq.presencial, faq.online, faq.contato, faq.prazo, faq.onde, faq.endereco],
    artigos: [artigo.massa],
  },

  'nutricao-esportiva': {
    sobretitulo: 'Nutrição esportiva em Joinville · CRN-10 12284',
    titulo: 'Alimentação alinhada aos seus treinos e objetivos',
    intro: 'Quer ganhar massa muscular, melhorar a composição corporal ou organizar a alimentação para os treinos? O acompanhamento e o planejamento consideram intensidade e frequência dos exercícios, rotina e preferências alimentares.',
    destaques,
    jornadaTitulo: 'Sua jornada para performance começa aqui',
    jornadaTexto: 'Do primeiro contato aos ajustes de cada semana, cada etapa foi pensada para transformar uma consulta em acompanhamento de verdade.',
    jornada: jornadaBase,
    beneficios: [
      ['Estratégia para hipertrofia', 'Ajuste da ingestão de energia e de nutrientes de acordo com os objetivos e as necessidades individuais.'],
      ['Composição corporal', 'Acompanhamento de medidas, evolução física e sinais da rotina para orientar decisões ao longo do processo.'],
      ['Praticidade para quem treina', 'Refeições e alternativas planejadas para conciliar alimentação, treino, trabalho e vida social.'],
    ],
    casos: casosTreino,
    faqs: [faq.atletas, faq.whey, faq.iniciante, faq.recomposicao, faq.presencial, faq.online, faq.contato, faq.prazo, faq.endereco],
    artigos: [artigo.massa],
  },

  // Estética: o site do Hericles não tem esta página; usa a mesma jornada e o
  // conteúdo que já tínhamos sobre nutrição estética (pele, colágeno, composição corporal).
  'nutricao-estetica': {
    sobretitulo: 'Nutrição estética em Joinville · CRN-10 12284',
    titulo: 'A pele também se cuida por dentro',
    intro: 'Colágeno precisa de matéria-prima. O acompanhamento ajusta proteína, vitaminas, minerais e hábitos que interferem na pele, na composição corporal e na resposta aos tratamentos da clínica.',
    destaques,
    jornadaTitulo: 'Sua jornada de cuidado por dentro começa aqui',
    jornadaTexto: 'Do primeiro contato aos ajustes de cada semana, cada etapa foi pensada para que a alimentação trabalhe junto com o seu plano de tratamento.',
    jornada: jornadaBase.map((p) => {
      if (p.rotulo === 'Consulta') return { ...p, titulo: 'Eu entendo a sua pele e a sua rotina', texto: 'Em consulta vou entender seu histórico de saúde, sua rotina, seus exames, os tratamentos que você faz aqui na clínica e os hábitos que podem interferir na pele e na composição corporal.' };
      return p;
    }),
    beneficios: [
      ['Nutrientes para a pele', 'Proteína, vitamina C, zinco e gorduras boas participam da produção de colágeno. O plano garante essa matéria-prima na sua rotina.'],
      ['Junto com os tratamentos', 'A nutrição faz parte do plano de tratamento. Quem faz bioestimulador e come pouca proteína, por exemplo, tende a responder pior.'],
      ['Composição corporal', 'Emagrecimento com preservação de massa magra e cuidado com as mudanças da menopausa.'],
    ],
    casos: todosCasos,
    faqs: [
      { q: 'Alimentação interfere no envelhecimento da pele?', a: 'Sim. Proteína, vitamina C, zinco e gorduras boas participam da produção de colágeno, e o excesso de açúcar acelera a glicação, processo que deixa as fibras de colágeno mais rígidas.' },
      { q: 'Preciso tomar colágeno?', a: 'Depende da sua alimentação e do objetivo. O nutricionista analisa se faz sentido e qual tipo e dose.' },
      faq.presencial, faq.online, faq.contato, faq.prazo, faq.onde, faq.endereco,
    ],
    artigos: [],
  },

  // Comportamental: mesma base da página de emagrecimento, com o tom ajustado
  'nutricao-comportamental': {
    sobretitulo: 'Nutrição comportamental em Joinville · CRN-10 12284',
    titulo: 'Uma relação mais leve com a comida',
    intro: 'Comer bem não precisa ser uma luta diária. O acompanhamento considera sua rotina, suas preferências, sua história com a comida e seus objetivos para construir mudanças que façam sentido na vida real, sem terrorismo nutricional.',
    destaques,
    jornadaTitulo: 'Sua jornada para comer em paz começa aqui',
    jornadaTexto: 'Do primeiro contato aos ajustes de cada semana, cada etapa foi pensada para que a mudança de hábitos aconteça no seu ritmo, com acompanhamento de verdade.',
    jornada: jornadaBase.map((p) => {
      if (p.rotulo === 'Consulta') return { ...p, titulo: 'Eu entendo a sua relação com a comida', texto: 'Em consulta vou entender seu histórico de saúde e comportamento, sua rotina, como você se sente em relação à comida e as dificuldades do dia a dia que influenciam as suas escolhas.' };
      if (p.rotulo === 'Plano alimentar') return { ...p, titulo: 'Um plano flexível, sem proibições', texto: 'Após a consulta, eu elaboro o plano inicial respeitando sua rotina, suas preferências e seu objetivo, com flexibilidade e sem lista de alimentos proibidos. Ele fica pronto em até 72 horas.' };
      if (p.rotulo === 'Check-in semanal') return { ...p, texto: 'No aplicativo de acompanhamento, olhamos como foi a semana: o que funcionou, onde travou e como você se sentiu. Sair do planejado não é fracasso; é informação para ajustar o caminho.' };
      return p;
    }),
    beneficios: [
      ['Sem proibições arbitrárias', 'O planejamento trabalha com flexibilidade, quantidades e frequência, sem transformar cada refeição em uma lista de proibições.'],
      ['Sem culpa quando sai do plano', 'Sair do planejado não é tratado como fracasso: usamos essas situações para entender o que precisa mudar.'],
      ['Acompanhamento de verdade', 'Check-ins semanais para identificar dificuldades, acompanhar a evolução e ajustar a estratégia com você.'],
    ],
    casos: todosCasos,
    faqs: [faq.sairDoPlano, faq.proibidos, faq.cortar, faq.contato, faq.presencial, faq.online, faq.prazo, faq.onde, faq.endereco],
    artigos: [artigo.fome, artigo.parei],
  },
};

// Página inicial de Nutrição (/nutricao): mesma estrutura da página inicial do site
// do Hericles (nutrihericles.com.br), com a identidade da clínica. Textos dele.
export const homeNutricao = {
  sobretitulo: 'Nutricionista em Joinville · CRN-10 12284 · On-line e presencial',
  palavras: ['alimentação', 'dieta', 'acompanhamento', 'planejamento'],
  tituloFim: 'que cabe na sua vida',
  intro: 'Emagrecimento e ganho de massa muscular com acompanhamento individualizado, sem dietas extremas e sem abrir mão do que você gosta.',
  jornadaPalavras: ['emagrecer', 'hipertrofiar', 'crescer', 'evoluir', 'viver de verdade'],
  jornadaTexto: 'Do primeiro contato aos ajustes de cada semana, cada etapa foi pensada para transformar uma consulta em acompanhamento de verdade. E a nossa jornada é assim:',
  jornadaFecho: 'Você não recebe apenas um plano alimentar. Recebe uma estratégia que continua sendo acompanhada depois da consulta.',
  quemSouTitulo: 'Atuação em metabolismo, emagrecimento e hipertrofia',
  quemSou: [
    'Sou Hericles Ferreira, nutricionista em Joinville/SC, formado pela Católica-SC e pós-graduado em Metabolismo e Emagrecimento pela Faculdade Uniguaçu.',
    'Apaixonado por comida e pelos momentos que envolvem comida, minha relação com a nutrição começou em um processo muito pessoal. Quando precisei de ajuda para emagrecer, encontrei muitas informações divergentes na internet e me deparei com profissionais que me passavam dietas irreais e promessas vazias. Por isso, aprofundei meus estudos em bioquímica, fisiologia, doenças metabólicas e composição corporal.',
  ],
  missao: 'Hoje minha missão é simples: ajudar você a emagrecer, ganhar massa magra e sustentar resultados com estratégia, clareza e sem terrorismo nutricional.',
  chamadaTitulo: 'Você não precisa tentar outra dieta da moda.',
  chamadaTitulo2: 'Precisa de estratégia para você.',
  chamadaTexto: 'Chega de planos genéricos. Agende sua consulta e receba um planejamento personalizado para evoluir de verdade.',
  faqs: [faq.presencial, faq.online, faq.cortar, faq.contato, faq.recomposicao, faq.canetas, faq.prazo, faq.onde, faq.endereco],
  artigos: [artigo.fome, artigo.massa, artigo.parei, artigo.canetas],
};
