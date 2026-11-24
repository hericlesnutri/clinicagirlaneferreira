# Site da Clínica Girlane Ferreira

https://www.clinicagirlaneferreira.com.br · Joinville, SC

Site estático gerado por um script Node sem dependências. HTML puro, rápido e fácil para o Google e para as IAs lerem.

## Como editar

| O que mudar | Arquivo |
|---|---|
| Endereço, WhatsApp, horários, registro, formação, redes sociais, depoimentos | `src/data/site.mjs` |
| Tratamentos (textos, FAQ, ativar/desativar) | `src/data/servicos.mjs` |
| Artigos educativos | `src/data/artigos.mjs` |
| Visual (cores, espaçamentos) | `public/assets/styles.css` |
| Fotos | `public/img/` e o campo `foto` nos arquivos de dados |

Todo campo marcado como `PREENCHER` aparece como aviso no build e fica fora dos dados estruturados.

## Comandos

```bash
npm run build     # gera /dist (é o que a Vercel roda)
npm run preview   # gera /dist-preview com links .html para abrir direto no navegador
npm run validar   # build + checagem de links, títulos, H1 e JSON-LD
```

Requer Node 18 ou superior. Nenhum `npm install` necessário.

## Estrutura de URLs

- `/` início
- `/dra-girlane-ferreira` perfil profissional
- `/metodo` método em três pilares
- `/tratamentos` e `/tratamentos/<serviço>` (10 páginas)
- `/equipe`, `/resultados`, `/perguntas-frequentes`, `/contato`
- `/conteudo` e `/conteudo/<artigo>` (6 artigos)
- `/sitemap.xml`, `/robots.txt`, `/llms.txt`, `/llms-full.txt`

## Publicação (Cloudflare Pages)

Workers & Pages → Create → Pages → Connect to Git → `hericlesnutri/clinicagirlaneferreira`
- Framework preset: None
- Build command: `node scripts/build.mjs`
- Build output directory: `dist`
- Variável de ambiente: `NODE_VERSION` = `22`

Cabeçalhos e redirecionamentos ficam em `public/_headers` e `public/_redirects` (o `vercel.json` só é usado se o site voltar para a Vercel).
Depois: Custom domains → `www.clinicagirlaneferreira.com.br` e `clinicagirlaneferreira.com.br`. Search Console e Perfil do Google: ver `docs/PLANO-SEO.md`.

## Imagens da marca

`tools/gerar-imagens.py` gera a imagem de compartilhamento (`og-padrao.jpg`), o logo 512 px, o ícone da Apple e o favicon. Só precisa rodar de novo se a identidade mudar.
