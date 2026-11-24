# Plano de SEO e IA: Clínica Girlane Ferreira

Site: https://www.clinicagirlaneferreira.com.br · Atualizado em 24/11/2026

Este plano cobre o que o site já faz sozinho (SEO técnico e conteúdo) e o que precisa ser feito fora dele: Perfil da Empresa no Google, citações, avaliações e referências externas. O site é a base, mas no SEO local quem mais pesa é o Perfil do Google e a consistência do nome, endereço e telefone pela internet.

---

## 1. O que já está pronto no site

| Item | Como foi feito |
|---|---|
| Indexação | HTML estático (o Google lê tudo sem precisar rodar JavaScript), URLs limpas, canonical em todas as páginas, `robots.txt` e `sitemap.xml` gerados automaticamente |
| Identidade profissional | Página própria da Dra. Girlane (`/dra-girlane-ferreira`) com formação, registro CRBM, habilitação e método; dados estruturados `Person` com `hasCredential`, `alumniOf`, `knowsAbout` e `sameAs` (Instagram) |
| Endereço e localização | Dados `MedicalClinic` + `HealthAndBeautyBusiness` com endereço, coordenadas, horários, área atendida (Joinville e 7 cidades vizinhas), rodapé com NAP em todas as páginas |
| Páginas por serviço | 10 páginas, cada uma mirando uma busca ("botox em Joinville", "bioestimulador de colágeno em Joinville" etc.), com resposta rápida no topo, ficha técnica, indicações, contraindicações, cuidados e FAQ |
| Conteúdo educativo | 6 artigos aprofundados com autoria, data de atualização, `Article` + `reviewedBy` e links para os serviços |
| Perguntas comuns | FAQ em cada serviço e artigo, página `/perguntas-frequentes` com tudo reunido, `FAQPage` em JSON-LD |
| E-E-A-T | Autoria em todas as páginas médicas, caixa do autor com registro, "conteúdo revisado em", aviso de que resultados variam, `MedicalWebPage` com `lastReviewed` |
| IAs (ChatGPT, Gemini, Perplexity, Claude) | `llms.txt` e `llms-full.txt`, robôs de IA liberados no `robots.txt`, bloco "Resposta rápida" de 40 a 60 palavras no início de cada página (é o trecho que as IAs costumam citar) |
| Resultados | Comparador de antes e depois (arrastar) em todas as páginas e galeria completa em `/resultados`, com contexto educativo (ver seção 7) |
| Desempenho | Sem frameworks, sem fontes externas, CSS de ~20 KB, imagens com `width/height` e `loading="lazy"`, cache longo nos arquivos estáticos |
| Acessibilidade | Contraste AA, foco visível, "pular para o conteúdo", modo escuro, respeito a "reduzir movimento" |

Ao rodar `npm run build`, o terminal lista tudo o que ainda está como PREENCHER. Dado pendente nunca entra nos dados estruturados.

---

## 2. Antes de publicar (checklist)

1. Preencher `src/data/site.mjs`: endereço completo, CEP, latitude/longitude, WhatsApp, telefone, e-mail, horários, número do CRBM e região, formação acadêmica, razão social e CNPJ, sobrenome e registro do Hericles (CRN-10) e formação da Diva.
2. Colocar as fotos em `public/img/` (ver seção 8) e preencher o campo `foto` de cada profissional e serviço.
3. A Dra. Girlane ler os 6 artigos e as páginas de serviço e ajustar com a própria voz. Experiência real escrita por ela é o que mais diferencia o conteúdo.
4. Confirmar com o CRBM as regras atuais de publicidade (ver seção 7).
5. `npm run validar` sem erros.

## 3. Publicação na Vercel

1. Na Vercel: **Add New → Project → Import** o repositório `hericlesnutri/clinicagirlaneferreira`. O `vercel.json` já define build e pasta de saída; não precisa escolher framework.
2. **Settings → Domains**: adicionar `www.clinicagirlaneferreira.com.br` (principal) e `clinicagirlaneferreira.com.br` com redirecionamento 308 para o www.
3. No registro.br, apontar o DNS conforme a Vercel indicar (registro A do domínio raiz e CNAME do www).
4. Opcional: **Analytics → Enable** e mudar `analyticsVercel: true` no `site.mjs` (sem cookies, não precisa de banner).

## 4. Google Search Console e Bing

1. search.google.com/search-console → **Adicionar propriedade → Domínio** → `clinicagirlaneferreira.com.br` → verificar pelo registro TXT no registro.br.
2. **Sitemaps** → enviar `sitemap.xml`.
3. **Inspeção de URL** → pedir indexação da home, da página da Dra. Girlane e das 10 páginas de serviço.
4. Testar 3 páginas em search.google.com/test/rich-results e validator.schema.org.
5. Bing Webmaster Tools → importar do Search Console (alimenta o Copilot e o ChatGPT Search).
6. A cada 15 dias, olhar **Desempenho**: consultas com muitas impressões e poucos cliques indicam título/descrição para melhorar.

Observação: desde 2023 o Google só mostra o FAQ expandido no resultado para sites governamentais e de saúde muito conhecidos. Os dados de FAQ continuam úteis porque organizam as respostas para o Google e para as IAs.

## 5. Perfil da Empresa no Google (prioridade máxima)

É ele que aparece no mapa e no "perto de mim".

- **Nome**: exatamente `Clínica Girlane Ferreira`. Não acrescentar palavras-chave ao nome (é contra as regras e pode suspender o perfil).
- **Categoria principal**: "Clínica de estética". **Secundárias**: "Serviço de harmonização facial" (se aparecer na lista), "Spa de estética facial", "Nutricionista", "Serviço de drenagem linfática". Testar as que o Google oferecer em português.
- **Endereço, telefone e site**: copiar do `site.mjs`. Site: `https://www.clinicagirlaneferreira.com.br`.
- **Horários** iguais aos do site, incluindo feriados.
- **Serviços**: cadastrar os 10 tratamentos com descrição curta e o link da página correspondente.
- **Descrição** (até 750 caracteres): quem é a Dra. Girlane, biomédica esteta, CRBM, método em três pilares, Joinville.
- **Fotos**: fachada (para as pessoas acharem a porta), recepção, salas, equipe, Dra. Girlane atendendo. Mínimo 15 no lançamento e 2 a 4 novas por mês. Nada de antes e depois.
- **Postagens**: uma por semana, reaproveitando os artigos e as campanhas (GF 001 Valoriza etc.), sempre com link para a página certa.
- **Perguntas e respostas**: publicar as 5 dúvidas mais comuns da Ana no WhatsApp e responder.
- **Link de agendamento**: o link do WhatsApp.

### Avaliações
- Meta: 30 avaliações nos primeiros 3 meses, depois 4 a 8 por mês. Ritmo constante conta mais que volume de uma vez.
- Pedir no retorno de 15 a 30 dias, quando a paciente já vê o resultado. A Ana envia o link curto do Google pelo WhatsApp no mesmo dia.
- Não oferecer brinde nem desconto em troca (proibido pelo Google).
- Responder todas em até 48 horas, sem confirmar procedimento nem dado de saúde na resposta pública (sigilo).
- Avaliações citando o serviço e a cidade ajudam ("fiz bioestimulador aqui em Joinville..."), mas isso vem naturalmente; não dê roteiro.

## 6. Citações e referências externas

**Consistência (NAP idêntico)**: Apple Business Connect (Apple Maps e Siri), Bing Places, Facebook, Instagram (bio com endereço e link do site), Waze, Doctoralia (se aceitar biomédicos esteta), TikTok, LinkedIn da Dra. Girlane, Lista de Empresas de Joinville / ACIJ.

**Autoridade (links de sites relevantes)**:
- Instagram e TikTok: link do site na bio; destaques apontando para os artigos.
- Parceiras da campanha GF 001 Valoriza (boutique da Lidi e loja de calçados): pedir um link para o site na página "parceiros" ou no post do blog delas.
- Imprensa local (NSC Total, ND+, A Notícia, rádios de Joinville): sugerir pauta sobre a inauguração e sobre "como escolher profissional de harmonização com segurança". Esse artigo já está no site e é o tipo de assunto que jornal cita.
- ACIJ, CDL Joinville, associações empresariais femininas: cadastro de associada com link.
- Instituições de formação da Dra. Girlane: perfil de egressa, depoimento, aula convidada.
- Fornecedores de produtos: listas de "clínicas parceiras" ou "profissionais certificados" costumam ter link.
- Eventos e palestras (congressos, workshops para leigos): página do evento com bio e link.
- Podcasts e lives com outros profissionais de saúde da cidade.

Evitar: compra de links, diretórios genéricos em massa, troca de link em rodapé.

**Entidade única para o Google e para as IAs**: usar sempre o mesmo nome ("Dra. Girlane Ferreira, biomédica esteta em Joinville") e a mesma foto de perfil no Instagram, Google, LinkedIn e site. Quanto mais fontes repetem esses fatos juntos, mais confiança as IAs têm para citar.

## 7. Antes e depois e conselho profissional

Decisão da clínica (24/11/2026): publicar de 1 a 2 casos de antes e depois em cada página.

Atenção: a Resolução CFBM nº 330/2020 vedava imagens de antes e depois na publicidade do biomédico. Confirmar com o CRBM-5 se há norma mais recente antes de publicar. Para reduzir o risco, cada caso no site segue o padrão que os conselhos usam como referência de caráter educativo:
- autorização por escrito da paciente, arquivada no prontuário;
- fotos sem edição, com mesma luz, ângulo e distância;
- rosto sem identificação sempre que possível;
- texto junto da foto com queixa, tratamento, sessões e intervalo entre as fotos (arquivo `src/data/antes-depois.mjs`);
- aviso fixo de que resultados variam e dependem de avaliação;
- sem preço, sem promoção e sem promessa de resultado junto das fotos.

Também por cautela: nome e registro da responsável técnica visíveis em todas as páginas (rodapé).

## 8. Imagens

- Formato WebP (ou AVIF), 1600 px no lado maior, até ~200 KB.
- Nome do arquivo descritivo: `dra-girlane-ferreira-biomedica-esteta-joinville.webp`, `sala-atendimento-clinica-girlane-ferreira.webp`, `fachada-clinica-girlane-ferreira-joinville.webp`.
- Texto alternativo já é gerado pelo site a partir do nome do serviço.
- Para importar: organizar as fotos nas pastas `equipe/`, `clinica/`, `tratamentos/` e `antes-depois/` e rodar `python3 tools/importar-fotos.py <pasta>`. O script converte para WebP, padroniza o tamanho do par antes/depois e remove os metadados (GPS, celular, data).
- Fotos reais da clínica e da equipe valem mais que banco de imagens para E-E-A-T. Uma sessão de fotos profissional cobre o site, o Google e o Instagram de uma vez.
- Retrato da Dra. Girlane em proporção 4:5; capas de serviço em 4:3.
- Quando houver vídeo (Reels explicativos), subir também no YouTube com título com cidade e serviço; o Google mostra vídeo nos resultados.

## 9. Calendário de conteúdo (próximos 3 meses)

Um artigo novo a cada 15 dias, sempre respondendo uma pergunta real que chegou no WhatsApp ou na consulta:

1. Quanto tempo dura o botox e por que varia de pessoa para pessoa
2. Olheira: quando o preenchimento resolve e quando não
3. Flacidez na menopausa: o que muda e o que tratar primeiro
4. Preenchimento labial natural: volume x hidratação
5. Protetor solar com cor: por que importa para melasma
6. Alimentação e colágeno: o que comer para responder melhor ao bioestimulador (Hericles)

Para publicar: adicionar o artigo em `src/data/artigos.mjs`, fazer commit; a Vercel publica e o sitemap atualiza sozinho.

## 10. Como medir

| Indicador | Onde | Meta em 90 dias |
|---|---|---|
| Páginas indexadas | Search Console → Páginas | 25 de 26 |
| Buscas de marca ("girlane ferreira") | Search Console | 1ª posição e painel do Google |
| "[serviço] em Joinville" | Search Console → Consultas | Top 10 em 4 serviços |
| Ações no Perfil (ligações, rotas, cliques no site) | Perfil da Empresa → Desempenho | Crescimento mês a mês |
| Avaliações | Perfil | 30+, nota ≥ 4,8 |
| Menções em IA | Perguntar ao ChatGPT, Gemini e Perplexity: "melhor clínica de harmonização facial em Joinville" | Clínica citada |
| Origem dos agendamentos | Ana pergunta "como nos conheceu?" e anota no CRM | Canal "Google/site" medido |
