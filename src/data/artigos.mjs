// Conteúdo educativo. Cada artigo vira /conteudo/<slug>.
// Antes de publicar, a Dra. Girlane deve ler e ajustar o texto com a voz dela:
// o Google valoriza experiência real (o primeiro "E" de E-E-A-T).

export const artigos = [
  {
    slug: 'envelhecimento-facial-camadas',
    titulo: 'Por que o rosto envelhece: pele, gordura, músculo e osso',
    seoTitle: 'Como o rosto envelhece: as 4 camadas do envelhecimento facial',
    metaDescription: 'Por que o rosto envelhece em camadas (osso, gordura, músculo e pele) e por que tratar só a ruga não resolve. Pela biomédica esteta Dra. Girlane Ferreira.',
    resumo: 'O rosto envelhece em quatro camadas ao mesmo tempo: o osso reabsorve, as bolsas de gordura diminuem e descem, os ligamentos afrouxam e a pele perde colágeno. Por isso tratar só a ruga raramente resolve. Um bom plano olha para estrutura, firmeza e superfície.',
    publicado: '2026-11-24',
    atualizado: '2026-11-24',
    autor: 'girlane',
    categoria: 'Envelhecimento',
    leitura: 7,
    servicos: ['harmonizacao-facial', 'bioestimuladores-de-colageno', 'preenchimento-labial'],
    corpo: `
<h2>O que muda no rosto com a idade?</h2>
<p>Quando a gente se olha no espelho e nota que "algo mudou", quase sempre aponta para uma ruga ou para o bigode chinês. Só que essa marca é a parte visível de mudanças que começam bem mais fundo.</p>
<p>O envelhecimento facial acontece em quatro camadas, e cada uma tem um ritmo:</p>
<h3>1. Osso</h3>
<p>O esqueleto do rosto também envelhece. A órbita dos olhos alarga, a maxila (osso da região das maçãs e do nariz) perde projeção e a mandíbula diminui de altura e de ângulo. Com menos "cabide", tudo o que está por cima perde apoio.</p>
<h3>2. Gordura</h3>
<p>O rosto tem bolsas de gordura separadas, superficiais e profundas. Com o tempo, as profundas diminuem e as superficiais descem. É daí que vem a perda de volume nas maçãs do rosto e o acúmulo perto do sulco nasogeniano e da mandíbula.</p>
<h3>3. Ligamentos e músculos</h3>
<p>Os ligamentos que seguram os tecidos afrouxam. Alguns músculos de expressão ficam mais ativos em certas áreas (testa, entre as sobrancelhas, ao redor dos olhos) e vão marcando a pele de tanto dobrar no mesmo lugar.</p>
<h3>4. Pele</h3>
<p>A partir dos 25 anos a produção de colágeno cai aos poucos, algo em torno de 1% ao ano, e acelera na menopausa. A pele fica mais fina, menos elástica e mais seca. Sol, cigarro, açúcar em excesso e sono ruim aceleram tudo isso.</p>

<h2>Por que tratar só a ruga não resolve</h2>
<p>Imagine um sulco nasogeniano profundo. Encher o sulco diretamente costuma dar um resultado pesado, porque a causa está em cima: perda de suporte no malar e descida da gordura. Repor estrutura no lugar certo muitas vezes suaviza o sulco sem tocar nele.</p>
<p>É por isso que, na clínica, a gente trabalha com <strong>plano de tratamento</strong> e não com procedimento avulso.</p>

<h2>Os três pilares do nosso método</h2>
<p>Organizamos o plano em três frentes, que conversam com as camadas acima:</p>
<ul>
<li><strong>Reestruturação</strong>: devolver estrutura e volume onde osso e gordura mudaram. Normalmente com ácido hialurônico de maior sustentação.</li>
<li><strong>Pele que toca</strong>: recuperar firmeza e densidade com bioestimuladores de colágeno.</li>
<li><strong>Pele que se vê</strong>: cuidar do que aparece na superfície, como linhas de expressão (toxina botulínica), manchas, poros e viço (peelings, microagulhamento, skinbooster).</li>
</ul>
<p>Nem toda paciente precisa dos três pilares ao mesmo tempo. Aos 30, o foco costuma ser pele e prevenção. Aos 50, estrutura e firmeza vêm primeiro.</p>

<h2>O que dá para fazer em casa</h2>
<ul>
<li>Protetor solar todos os dias, inclusive em dias nublados e dentro de casa perto de janelas.</li>
<li>Proteína suficiente na alimentação. Sem matéria-prima, o corpo não fabrica colágeno.</li>
<li>Retinoides tópicos, com orientação, para estimular renovação da pele.</li>
<li>Dormir bem e não fumar. Parece básico, e é. Também é o que mais aparece no rosto depois dos 40.</li>
</ul>

<h2>Resumo</h2>
<p>O rosto não envelhece só na superfície. Osso, gordura, ligamentos e pele mudam juntos. Um tratamento natural respeita essa ordem: primeiro entende a causa, depois escolhe a técnica.</p>
`,
    faqs: [
      { q: 'Com que idade o rosto começa a envelhecer?', a: 'A queda de colágeno começa por volta dos 25 anos. As mudanças de gordura e osso ficam mais visíveis a partir dos 35 a 40 e aceleram na menopausa.' },
      { q: 'Qual o melhor tratamento para o envelhecimento facial?', a: 'Não existe um único. O tratamento depende de qual camada mais mudou no seu rosto. Por isso a consulta vem antes de qualquer procedimento.' },
    ],
  },
  {
    slug: 'harmonizacao-facial-natural',
    titulo: 'Harmonização facial natural: o que é e como evitar exageros',
    seoTitle: 'Harmonização facial natural: como evitar o resultado artificial',
    metaDescription: 'O que é harmonização facial natural, por que alguns resultados ficam artificiais e como planejar um tratamento que preserva sua identidade.',
    resumo: 'Harmonização facial natural é aquela em que o rosto continua reconhecível: as pessoas notam que você está descansada, não que você "fez algo". O resultado artificial costuma vir de três erros: excesso de produto, tratar áreas sem olhar o conjunto e repetir procedimentos sem acompanhamento.',
    publicado: '2026-11-24',
    atualizado: '2026-11-24',
    autor: 'girlane',
    categoria: 'Harmonização',
    leitura: 6,
    servicos: ['harmonizacao-facial', 'preenchimento-labial', 'toxina-botulinica'],
    corpo: `
<h2>De onde vem a "cara de harmonização"</h2>
<p>Quase todo mundo já viu um rosto que parece igual a outros cem: maçãs muito altas, lábios projetados, mandíbula quadrada demais. O problema não é a harmonização em si. É um tipo de planejamento que segue tendência, e não a anatomia da pessoa.</p>
<p>Os erros mais comuns:</p>
<ul>
<li><strong>Volume acima do necessário.</strong> Cada seringa a mais soma. Sem acompanhamento, o excesso vai se acumulando ao longo dos anos.</li>
<li><strong>Área isolada.</strong> Encher o lábio sem olhar o queixo, ou o malar sem olhar a têmpora, quebra a proporção.</li>
<li><strong>Padrão de beleza importado.</strong> Um rosto oval e delicado não precisa de mandíbula marcada só porque está na moda.</li>
</ul>

<h2>Como a gente planeja uma harmonização natural</h2>
<p>Na Clínica Girlane Ferreira, o caminho é sempre o mesmo, e é proposital que seja lento:</p>
<ol>
<li><strong>Escuta.</strong> O que te incomoda e o que você não quer de jeito nenhum. Essa segunda parte é tão importante quanto a primeira.</li>
<li><strong>Fotos padronizadas e análise.</strong> Mesma luz, mesmo ângulo, rosto em repouso e em movimento. É a base para comparar depois.</li>
<li><strong>Plano por etapas.</strong> Prioridades primeiro. Às vezes a primeira etapa é só toxina e pele, e o volume fica para depois.</li>
<li><strong>Acompanhamento.</strong> Entre 15 e 30 dias. É nele que decidimos se vale acrescentar, e muitas vezes a resposta é não.</li>
</ol>

<h2>Sinais de que o plano está indo bem</h2>
<ul>
<li>Você se reconhece nas fotos.</li>
<li>Amigas dizem que você está com cara de quem dormiu bem, mas não conseguem dizer o que mudou.</li>
<li>O sorriso e as expressões continuam seus.</li>
</ul>

<h2>Quando dizer não</h2>
<p>Parte do trabalho é recusar. Quando o pedido vai deixar o rosto desproporcional, ou quando a expectativa não cabe no que o procedimento entrega, a resposta honesta é explicar o porquê e propor outro caminho, ou nenhum.</p>
`,
    faqs: [
      { q: 'Harmonização facial é reversível?', a: 'O ácido hialurônico pode ser dissolvido com hialuronidase. A toxina botulínica perde o efeito sozinha em alguns meses. Bioestimuladores não são reversíveis, por isso exigem mais cuidado na indicação.' },
      { q: 'Quanto produto é "demais"?', a: 'Não existe número fixo. Depende da anatomia e do objetivo. O sinal mais confiável é o acompanhamento: se a cada sessão o plano pede mais volume, algo está errado.' },
    ],
  },
  {
    slug: 'toxina-botulinica-ou-preenchimento',
    titulo: 'Botox ou preenchimento: qual a diferença e quando usar cada um',
    seoTitle: 'Botox ou preenchimento? Diferenças e quando usar cada um',
    metaDescription: 'Toxina botulínica (botox) e preenchimento com ácido hialurônico tratam problemas diferentes. Veja quando usar cada um, quanto tempo duram e se dá para combinar.',
    resumo: 'Botox (toxina botulínica) relaxa músculos e trata rugas que aparecem com o movimento, como testa e pés de galinha. Preenchimento com ácido hialurônico repõe volume e estrutura, como em lábios, olheiras e mandíbula. Um não substitui o outro, e muitas vezes os dois entram no mesmo plano.',
    publicado: '2026-11-24',
    atualizado: '2026-11-24',
    autor: 'girlane',
    categoria: 'Procedimentos',
    leitura: 5,
    servicos: ['toxina-botulinica', 'preenchimento-labial'],
    corpo: `
<h2>A diferença em uma frase</h2>
<p>A toxina trata o <strong>movimento</strong>. O preenchimento trata a <strong>falta de estrutura</strong>.</p>

<h2>Toxina botulínica</h2>
<p>Age no músculo. Diminui a contração e, com isso, a pele para de dobrar no mesmo ponto o tempo todo. É indicada para rugas dinâmicas: aquelas que aparecem quando você franze a testa, levanta as sobrancelhas ou sorri com os olhos.</p>
<ul>
<li>Começa a agir em 3 a 7 dias.</li>
<li>Efeito completo em cerca de 15 dias.</li>
<li>Dura em média de 4 a 6 meses.</li>
</ul>

<h2>Preenchimento com ácido hialurônico</h2>
<p>Age como suporte. Repõe o volume que osso e gordura perderam, ou corrige proporções. Serve para lábios, olheiras de sulco, malar, mandíbula, queixo e alguns sulcos.</p>
<ul>
<li>Efeito imediato, final em cerca de 15 dias.</li>
<li>Dura de 6 a 18 meses, conforme área e produto.</li>
<li>Pode ser dissolvido com hialuronidase.</li>
</ul>

<h2>Comparação rápida</h2>
<table>
<thead><tr><th></th><th>Toxina botulínica</th><th>Ácido hialurônico</th></tr></thead>
<tbody>
<tr><td>Trata</td><td>Rugas de movimento</td><td>Perda de volume e estrutura</td></tr>
<tr><td>Áreas comuns</td><td>Testa, glabela, pés de galinha</td><td>Lábios, olheiras, malar, mandíbula, queixo</td></tr>
<tr><td>Começo do efeito</td><td>3 a 7 dias</td><td>Imediato</td></tr>
<tr><td>Duração média</td><td>4 a 6 meses</td><td>6 a 18 meses</td></tr>
<tr><td>Reversível</td><td>Passa sozinha</td><td>Sim, com hialuronidase</td></tr>
</tbody>
</table>

<h2>Dá para fazer os dois?</h2>
<p>Dá, e é comum. Uma ruga na testa que já está marcada mesmo com o rosto parado, por exemplo, pode pedir toxina para tirar o movimento e um pouco de hidratação ou preenchimento para suavizar o vinco. Quem decide a combinação e a ordem é a consulta.</p>
`,
    faqs: [
      { q: 'Botox preenche ruga?', a: 'Não. Ele impede que a ruga continue sendo marcada pelo movimento. Se o vinco já está fixo, pode ser preciso associar outro tratamento.' },
      { q: 'Preenchimento trata ruga da testa?', a: 'Raramente é a primeira escolha. A ruga da testa é causada principalmente pelo músculo, então a toxina costuma ser o tratamento principal.' },
    ],
  },
  {
    slug: 'bioestimuladores-de-colageno-como-funcionam',
    titulo: 'Bioestimuladores de colágeno: como funcionam e quando aparece o resultado',
    seoTitle: 'Bioestimulador de colágeno: como funciona, resultado e duração',
    metaDescription: 'Como os bioestimuladores de colágeno tratam a flacidez, em quanto tempo aparece o resultado, quantas sessões são necessárias e quem pode fazer.',
    resumo: 'Bioestimuladores de colágeno, como ácido poli-L-lático e hidroxiapatita de cálcio, fazem o próprio corpo produzir colágeno novo. O resultado é gradual: começa por volta de 30 dias e fica mais evidente entre 60 e 90. Normalmente são 2 ou 3 sessões, e o efeito pode durar de 12 a 24 meses.',
    publicado: '2026-11-24',
    atualizado: '2026-11-24',
    autor: 'girlane',
    categoria: 'Firmeza',
    leitura: 6,
    servicos: ['bioestimuladores-de-colageno', 'nutricao-estetica'],
    corpo: `
<h2>O que é um bioestimulador</h2>
<p>É um produto injetável que provoca uma reação controlada no tecido. O corpo responde produzindo colágeno ao redor das partículas. Com o tempo, a pele ganha densidade e firmeza.</p>
<p>Os mais usados no Brasil são o <strong>ácido poli-L-lático</strong> e a <strong>hidroxiapatita de cálcio</strong>. Existem outros, como a policaprolactona. Cada um tem diluição, técnica e indicação próprias.</p>

<h2>Por que o resultado demora</h2>
<p>Porque quem trabalha é o seu organismo. A produção de colágeno é lenta, leva semanas. Isso tem um lado bom: a mudança é tão gradual que ninguém percebe um "antes e depois" brusco. Você só nota que a pele está mais firme.</p>

<h2>Quem responde melhor</h2>
<ul>
<li>Flacidez leve a moderada. Flacidez muito acentuada pode precisar de outras abordagens.</li>
<li>Quem come proteína suficiente e dorme bem.</li>
<li>Quem não fuma.</li>
<li>Quem começa antes de a flacidez ficar avançada. Prevenção funciona bem aqui.</li>
</ul>

<h2>Como é o protocolo</h2>
<ol>
<li>Análise do grau de flacidez e da espessura da pele.</li>
<li>Duas ou três sessões com intervalo de 30 a 60 dias.</li>
<li>Manutenção, em geral uma sessão por ano.</li>
</ol>

<h2>Bioestimulador e alimentação</h2>
<p>Colágeno é feito de aminoácidos e precisa de vitamina C, zinco e cobre para se formar. Quem faz bioestimulador e come pouca proteína está pedindo ao corpo que construa sem material. É por isso que, na clínica, a nutrição faz parte do plano.</p>
`,
    faqs: [
      { q: 'Bioestimulador dói?', a: 'Usamos anestésico e, em geral, cânula. A sensação é de pressão e ardência leve.' },
      { q: 'Bioestimulador funciona no corpo?', a: 'Sim. É usado em braços, abdome, glúteos, coxas e colo para tratar flacidez.' },
    ],
  },
  {
    slug: 'melasma-por-que-volta',
    titulo: 'Melasma: por que volta e como tratar com constância',
    seoTitle: 'Melasma tem cura? Por que volta e como controlar',
    metaDescription: 'Entenda o que causa o melasma, por que ele volta depois do tratamento e como controlar a mancha com peelings, microagulhamento, ativos e proteção solar.',
    resumo: 'Melasma é uma mancha crônica, ligada a sol, luz visível, calor e hormônios. Não tem cura definitiva, mas pode ser controlado com tratamento em etapas (ativos clareadores, peelings, microagulhamento) e manutenção. Ele volta quando os gatilhos continuam presentes, por isso a fase de manutenção faz parte do tratamento.',
    publicado: '2026-11-24',
    atualizado: '2026-11-24',
    autor: 'girlane',
    categoria: 'Pele',
    leitura: 6,
    servicos: ['tratamento-de-manchas', 'microagulhamento'],
    corpo: `
<h2>O que é o melasma</h2>
<p>É uma mancha acastanhada, geralmente simétrica, que aparece na testa, nas maçãs do rosto, no buço e no queixo. É mais comum em mulheres, em peles morenas e em quem tem histórico na família.</p>
<p>Os melanócitos (células que produzem pigmento) dessas regiões ficam hiper-reativos. Qualquer estímulo vira mancha.</p>

<h2>Os gatilhos</h2>
<ul>
<li><strong>Sol</strong>, mesmo pouco e mesmo indireto.</li>
<li><strong>Luz visível</strong>, incluindo a de telas e a que entra pela janela. É por isso que o protetor com cor faz diferença: os pigmentos do filtro bloqueiam essa luz.</li>
<li><strong>Calor</strong>: cozinha, sauna, academia quente, secador perto do rosto.</li>
<li><strong>Hormônios</strong>: gestação, anticoncepcional, reposição hormonal.</li>
</ul>

<h2>Por que ele volta</h2>
<p>Porque o tratamento clareia a mancha, mas não muda a tendência da sua pele. Um verão sem cuidado e a mancha reaparece. Ninguém falhou, é assim que o melasma funciona.</p>

<h2>Como a gente trata</h2>
<ol>
<li><strong>Diagnóstico.</strong> Confirmar que é melasma e não outra mancha.</li>
<li><strong>Preparo.</strong> Algumas semanas de rotina em casa com clareadores e protetor solar.</li>
<li><strong>Sessões.</strong> Peelings e microagulhamento com ativos, sem agressividade. Tratamento que irrita demais costuma escurecer a mancha.</li>
<li><strong>Manutenção.</strong> Rotina contínua e sessões espaçadas, principalmente antes e depois do verão.</li>
</ol>

<h2>O que evitar</h2>
<ul>
<li>Receitas caseiras com limão ou bicarbonato.</li>
<li>Pomadas com corticoide sem acompanhamento.</li>
<li>Procedimentos que aquecem muito a pele sem consulta prévia.</li>
</ul>
`,
    faqs: [
      { q: 'Protetor solar comum resolve para melasma?', a: 'Ajuda, mas o ideal é protetor com cor (com óxido de ferro), que também bloqueia luz visível, reaplicado ao longo do dia.' },
      { q: 'Melasma some depois da gravidez?', a: 'Às vezes clareia sozinho, às vezes não. Quando persiste, pode ser tratado depois da amamentação.' },
    ],
  },
  {
    slug: 'como-escolher-profissional-estetica-injetavel',
    titulo: 'Como escolher um profissional de estética injetável com segurança',
    seoTitle: 'Como escolher profissional para harmonização facial com segurança',
    metaDescription: 'Checklist para escolher onde fazer harmonização, botox ou preenchimento com segurança: registro profissional, produto com Anvisa, consulta e acompanhamento.',
    resumo: 'Antes de fazer qualquer procedimento injetável, confira cinco coisas: registro ativo no conselho profissional, produtos com registro na Anvisa e lote rastreável, consulta antes da aplicação, ambiente adequado e acompanhamento depois. Preço muito abaixo da média e promessa de resultado garantido são sinais de alerta.',
    publicado: '2026-11-24',
    atualizado: '2026-11-24',
    autor: 'girlane',
    categoria: 'Segurança',
    leitura: 5,
    servicos: ['harmonizacao-facial', 'preenchimento-labial', 'toxina-botulinica'],
    corpo: `
<h2>1. Registro no conselho</h2>
<p>Procedimentos injetáveis estéticos são feitos por profissionais de saúde habilitados, como médicos, biomédicos, dentistas, enfermeiros e farmacêuticos, cada um dentro das normas do próprio conselho. Peça o número do registro e confira no site do conselho regional. No caso de biomédicos, a consulta é feita no Conselho Regional de Biomedicina (CRBM) da região.</p>

<h2>2. Produto com registro na Anvisa</h2>
<p>Pergunte a marca do produto. Todo preenchedor, toxina e bioestimulador vendido legalmente no Brasil tem registro na Anvisa. Peça para ver a caixa e a etiqueta com o lote, que deve ir para o seu prontuário.</p>

<h2>3. Consulta antes de aplicar</h2>
<p>Desconfie de quem aplica sem perguntar sobre sua saúde, medicamentos, alergias e procedimentos anteriores. Consulta não é burocracia, é o que evita complicação.</p>

<h2>4. Ambiente e material</h2>
<ul>
<li>Sala limpa, com estrutura para o procedimento.</li>
<li>Agulhas e cânulas descartáveis, abertas na sua frente.</li>
<li>Protocolo para intercorrências, incluindo hialuronidase disponível quando se usa ácido hialurônico.</li>
</ul>

<h2>5. Acompanhamento depois</h2>
<p>Você precisa saber a quem chamar se algo acontecer na madrugada seguinte. Acompanhamento agendado e canal de contato direto fazem parte de um atendimento sério.</p>

<h2>Sinais de alerta</h2>
<ul>
<li>Preço muito abaixo do praticado na cidade.</li>
<li>Promessa de resultado garantido.</li>
<li>Aplicação em casa, em festa ou em ambiente improvisado.</li>
<li>Pressão para fechar na hora.</li>
</ul>

<h2>Como funciona na Clínica Girlane Ferreira</h2>
<p>Todos os procedimentos injetáveis são feitos pela Dra. Girlane Ferreira, biomédica esteta com registro no CRBM, com produtos registrados na Anvisa, lote anotado em prontuário, consulta prévia e acompanhamento agendado.</p>
`,
    faqs: [
      { q: 'Como consultar o registro de um biomédico?', a: 'No site do Conselho Regional de Biomedicina da região em que o profissional atua, pelo nome ou número de registro.' },
      { q: 'Como saber se o produto é original?', a: 'Peça para ver a embalagem lacrada, a marca e o número do lote, e confira o registro do produto na consulta pública da Anvisa.' },
    ],
  },
];
