// Informações de cada caso de antes e depois.
// A chave é o nome do arquivo sem "-antes/-depois": <slug-do-tratamento>-<número>.
// Ex.: as fotos img/antes-depois/harmonizacao-facial-1-antes.webp e -depois.webp
// usam a entrada 'harmonizacao-facial-1'.
//
// Para cada caso publique SOMENTE com:
//  · autorização por escrito da paciente para uso da imagem
//  · fotos sem edição, mesma luz, mesmo ângulo e mesma distância
//  · rosto sem identificação quando possível (recorte, sem olhos/tatuagens)
//
// Campos (todos opcionais, mas quanto mais contexto, mais educativo e confiável):
//  queixa:     o que a paciente queria tratar
//  tratamento: o que foi feito (técnica / produto genérico, sem marca)
//  sessoes:    quantas sessões
//  intervalo:  tempo entre a foto "antes" e a "depois"
//  observacao: limitações, o que ainda pode evoluir, efeitos esperados

export const casosInfo = {
  // Botox: as três regiões da mesma foto, separadas em três casos
  'toxina-botulinica-1': { queixa: 'Linhas ao redor dos olhos (pés de galinha)' },
  'toxina-botulinica-2': { queixa: 'Linhas entre as sobrancelhas' },
  'toxina-botulinica-3': { queixa: 'Linhas da testa' },
  'rinomodelacao-1': { tratamento: 'Rinomodelação, harmonização do queixo (mento) e preenchimento labial' },
  'preenchimento-labial-1': { tratamento: 'Preenchimento labial e micropigmentação labial' },
  'reestruturacao-facial-1': { tratamento: 'Reestruturação facial masculina, com plano de tratamento individualizado' },
  'reestruturacao-facial-2': { tratamento: 'Rejuvenescimento facial' },
  'olheiras-1': { tratamento: 'Protocolo Reset Eyes' },
  // 'harmonizacao-facial-1': {
  //   queixa: 'Perda de contorno da mandíbula e olhar cansado',
  //   tratamento: 'Ácido hialurônico em malar, mandíbula e queixo',
  //   sessoes: '1 sessão + acompanhamento',
  //   intervalo: '30 dias',
  //   observacao: 'Leve inchaço nos primeiros 3 dias. Manutenção prevista em 12 meses.',
  // },
};
