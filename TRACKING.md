# Medição (fase 2 — só depois de o site ser aprovado)

Mesmo desenho do projeto da Crescer: o site só envia eventos ao `dataLayer`; toda tag fica no GTM. **Nenhuma conta (GTM, GA4, Google Ads, Meta) foi criada.** Isso depende de autorização.

## O que já está no código

- **Consent Mode v2:** tudo negado (`ad_storage`, `ad_user_data`, `ad_personalization`, `analytics_storage`, `personalization_storage`) antes de o GTM carregar. O aviso de cookies envia `consent update` e `consent_update`; a escolha fica em `localStorage` (`marcaki-consent`). "Preferências de cookies" no rodapé reabre o aviso. `url_passthrough` e `ads_data_redaction` ligados.
- **GTM só em produção:** o snippet do `index.html` só carrega em `marcaki.app` (ou numa prévia com `?gtm_debug=x` / `?track=1`) e nunca com o ID `GTM-XXXXXXX`. O ID vem de `VITE_GTM_ID` no `.env`.

## Eventos

| Evento | Quando | Parâmetros |
|---|---|---|
| `cta_click` | qualquer CTA (cadastro, exemplo, entrar) | `cta` (`signup`/`demo`/`login`), `location` |
| **`begin_signup`** | clique que leva a `/conta/cadastro` | `location` |
| `view_demo` | clique na página de exemplo | `location` |
| `pricing_toggle` | troca mensal/anual | `billing` (`mensal`/`anual`) |
| `faq_open` | abre uma pergunta | `question` (número) |
| `section_view` | seção vista pela 1ª vez | `section_id` |
| `consent_update` | Aceitar/Recusar | `consent_state` |
| `maverick_click` | crédito da Maverick no rodapé | `location` |

`location`: `nav`, `menu_mobile`, `hero`, `como_funciona`, `preco`, `cta_final`, `rodape`, `barra_mobile`.

Nenhum evento leva dado pessoal. Os links são `<a>` reais com `data-cta` e `data-cta-location`.

## Pendência com a Maverick

A conversão de verdade (cadastro concluído) acontece **dentro do app**, depois do clique. Para medir, o app precisa disparar `sign_up` (no `dataLayer` do mesmo contêiner GTM, ou via GA4 Measurement Protocol) quando a conta é criada, sem dado pessoal. Sem isso, a otimização de anúncios só enxerga `begin_signup`.

## Para ligar (quando autorizado)

1. Criar o contêiner Web no GTM e colocar o ID em `.env` (`VITE_GTM_ID=GTM-…`).
2. Tags: GA4 (configuração + eventos acima), conversão de anúncios em `begin_signup` (provisória) e `sign_up` (quando o app disparar).
3. Pré-visualizar com `?gtm_debug=x`, conferir que nada sai antes do Aceitar, publicar.
