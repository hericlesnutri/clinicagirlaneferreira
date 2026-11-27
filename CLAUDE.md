# Site da Clínica Girlane Ferreira

Site estático de www.clinicagirlaneferreira.com.br (Joinville, SC), gerado por Node sem dependências. Hospedado na Cloudflare: **todo push para a branch principal publica o site**. Detalhes de onde editar cada coisa estão no README.md; plano de SEO em docs/PLANO-SEO.md.

## Como trabalhar

- Quem pede as mudanças é a Dra. Girlane Ferreira, dona da clínica. Ela não é programadora: responda em português, sem jargão.
- Rode `npm run dev` (ou o servidor "site" da prévia): gera /dist, serve em http://localhost:4321 e gera de novo a cada mudança em src/ ou public/.
- Mostre o resultado na prévia do site. Ela não quer capturas de tela.
- Antes de qualquer commit, rode `npm run validar` e só siga com 0 erros.
- **Nunca faça push sem a aprovação dela na conversa.** Junte várias mudanças num push só, para não gastar deploys.
- Trabalhamos página por página. Ordem combinada: partes comuns (menu e rodapé) → início → Dra. Girlane → método → equipe → tratamentos → contato, perguntas frequentes e resultados → artigos.

## Como escrever

- Fale direto com a paciente ("você") e com a clínica na primeira pessoa do plural ("criamos", "tratamos", "nossas pacientes"). Não fale da clínica na terceira pessoa ("a clínica faz…").
- Exceção: nos quadros "Em resumo" (que Google e IAs copiam) cite o nome uma vez, em primeira pessoa: "Na Clínica Girlane Ferreira, tratamos…".
- Use "consulta" para o primeiro atendimento e "acompanhamento" para o que vem depois. Nunca "avaliação", "reavaliação" ou "consulta de retorno".
- A clínica trabalha com planos de tratamento, não com procedimentos isolados. Método facial em três pilares: reestruturação (estrutura e volume), pele que toca (firmeza), pele que se vê (linhas, manchas, textura).
- Não prometa resultado nem invente dados, depoimentos ou formação. Campos com `PREENCHER` ficam para a clínica completar.

## Design

Inspiração: www.apple.com. Elegante, limpo e minimalista. **Só tema claro**: o site não tem modo escuro (decisão da Dra. Girlane, 27/11/2026); não crie regras `prefers-color-scheme: dark`. Cores da marca: principais #9E7F60 e #333333; apoio #DFD7CC e #F5F3E7.

Ao terminar uma mudança de interface, confira estes 10 itens no que você alterou e diga quais aplicou:

1. Raio concêntrico: elemento arredondado dentro de outro usa o raio de fora menos o espaçamento entre eles (cartão 24px com padding 8px → dentro `calc(24px - 8px)`). Nunca o mesmo raio nos dois.
2. Bordas com transparência: `rgb(0 0 0 / 0.12)` (ou `0.07` nas suaves), no lugar de hex sólido.
3. Paletas em OKLCH, não HSL: cores irmãs com mesmo L e C, mudando só o H. C dentro do sRGB.
4. Degradês com `in oklch` (ou `in oklab` se surgir um matiz que não está nas pontas), com a mesma linha sem o `in` logo antes como reserva.
5. Traço do ícone acompanha o peso do texto ao lado. Ícone 20px com texto 16px: peso 400 = 1.75, 500 = 2, 600 = 2.5, 700 = 2.75. Outros tamanhos: haste do texto em px × 24 ÷ tamanho do ícone.
6. Carrosséis e listas com rolagem horizontal somem nas pontas com `mask-image` (e `-webkit-mask-image`) `linear-gradient(90deg, transparent, #000 15% 85%, transparent)`. Setas ficam fora do elemento com máscara.
7. Troca de ícone (menu/fechar etc.): os dois no mesmo lugar, o escondido com `opacity: 0` e `filter: blur(4px)`, transição de 200ms, e `transition: none` em `prefers-reduced-motion: reduce`.
8. (Sem modo escuro.) Profundidade com superfícies em camadas: página branca, seções creme e cartões brancos com borda suave, sombra só bem leve.
9. Tela cheia: `min-height: 100vh` seguido de `min-height: 100dvh`, nunca 100vh sozinho (100svh se a seção pular com a barra do navegador).
10. Foto de produto com fundo branco sobre fundo claro colorido: `mix-blend-mode: multiply` na img e `isolation: isolate` no cartão. Nunca em fundo escuro.

Texto no celular (até 600px): corpo 16px, títulos contidos, no estilo do iPhone. Na abertura da página inicial, o texto não pode ficar sobre os rostos da foto.
