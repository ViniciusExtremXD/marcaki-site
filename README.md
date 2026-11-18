# Marcaki — site de vendas

Site institucional/de vendas do **Marcaki** (página de agendamento online para salões, barbearias e clínicas de estética, da Maverick Software Solutions).
Mesma stack dos sites da Crescer e da Extin Seven: **Vite + React + TypeScript + Tailwind + framer-motion + Lenis + Phosphor**, com HTML pré-renderizado no build (SEO).

Direção visual (v2, 18/11/2026): institucional, com acabamento de banco. Títulos em Newsreader (serifa), texto em Hanken Grotesk, linhas finas, superfícies branco e névoa (#F5F4F8), roxo #7C3AED só em destaque e noite (#170D33) nas seções escuras. Assinatura "Marcou, tá marcado." no rodapé. Substitui a tipografia Bricolage/Inter do Livro da Marca no site.

## Comandos

```bash
npm install
npm run dev          # http://localhost:5180
npm run build        # dist/ com HTML pré-renderizado + JSON-LD
npm run deploy:gh    # publica a prévia no GitHub Pages (base /marcaki-site/)
```

## Estrutura

```
src/data/site.ts          todo o conteúdo: links do app, preço, recursos, público, FAQ (respostas reais do site atual)
src/sections/*            uma seção por arquivo (Hero, Ticker, Conta [dor + calculadora], Solucao [como resolve], HowItWorks, Audience, Pricing, Faq, FinalCta, Footer)
src/components/motion     animações reutilizáveis (SplitWords, Highlight, ScrollLitText, VelocityMarquee, ParallaxImage, ClipReveal, TiltCard, Magnetic, Counter, useCycle)
src/components/product    mockups do produto em React: fluxo de agendamento, mensagens de confirmação/lembrete, agenda da equipe, telas do dono
src/components/chrome     abertura, menu, barra de progresso, barra fixa no celular, aviso de cookies (Consent Mode v2)
src/components/cta        links de CTA com medição (cadastro, página de exemplo, entrar)
public/brand              logo vetorizado a partir do PNG oficial (símbolo, lockup, versões clara e branca)
public/images             fotos tratadas em WebP (800/1200/1800) — créditos em CREDITS.md
scripts/                  prerender, tratamento das fotos (process-photos.py) e og-image (make-og.py)
```

## Regras de conteúdo

- **Nada inventado:** sem depoimentos, números de clientes, logos de clientes ou avaliações. A prova é o produto (demo ao vivo, preço à vista, teste grátis).
- Textos jurídicos ficam no app: os links do rodapé apontam para /privacidade, /termos e /exclusao-de-dados de marcaki.app.
- Nomes de clientes nos mockups (Ana, Carla…) são ilustrativos. Serviços, preços e durações vêm da página de exemplo (Salão da Maria).

## Performance das animações

- Animações infinitas só rodam perto da tela (`src/lib/visibility.ts`); ciclos dos mockups (`useCycle`) param fora da tela.
- `src/lib/scroll-progress.ts` substitui `useScroll({ target })`.
- Brilhos com `.glow` (gradiente radial), sem `blur-[120px]`; `backdrop-filter` só no menu, na barra do celular e no aviso de cookies.
- `MotionConfig reducedMotion="never"` de propósito (muitos PCs Windows reportam "reduzir movimento" sem o usuário pedir).

## Logo

Vetorizado (potrace) a partir dos arquivos públicos: ícone de 240 px (`marcaki-icon.m2ks3tjtkg.png`) e lockup do `og-card.png`. Sem redesenho. O wordmark do og-card parece composto em Segoe UI Bold; **pedir à Maverick o vetor original** e confirmar qual é o wordmark oficial. Quando chegar, substituir os arquivos de `public/brand` e `public/favicon.svg`.

## Pendências

- [ ] **Contato comercial:** ainda não existe. O rodapé mostra um espaço reservado (`CONTACT` em `src/data/site.ts`, `placeholder: true`).
- [ ] **Logo em vetor** da Maverick (ver acima).
- [ ] **Preço por equipe:** o site diz "plano único, tudo incluso" (fato do site atual). Antes de prometer "o preço não sobe com a equipe", confirmar com a Maverick se há limite de profissionais.
- [ ] **Onde publicar em produção:** hoje a raiz de marcaki.app é o app (Blazor). A prévia vai para o GitHub Pages; produção depende de combinar com a Maverick (servir `dist/` na raiz ou usar outro domínio). `canonical`, `og:url` e o GTM já apontam para marcaki.app.
- [ ] **Medição:** só depois de o site ser aprovado (TRACKING.md). A conversão real (`sign_up`) acontece dentro do app e precisa ser disparada lá pela Maverick.
- [ ] Fotos: conferir o secador da foto `salao` (marca pequena gravada) se ela for usada grande em anúncio.
