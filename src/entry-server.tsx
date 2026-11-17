import React from "react";
import { renderToString } from "react-dom/server";
import App from "./App";
import { BRAND, FAQ, LINKS, PRICE, SITE_URL } from "./data/site";

/* Só no build: scripts/prerender.mjs injeta este HTML e o JSON-LD em dist/index.html. */

export function render() {
  return renderToString(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}

export function structuredData() {
  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}#organizacao`,
    name: BRAND.name,
    url: SITE_URL,
    logo: `${SITE_URL}brand/marcaki-mark.svg`,
    slogan: BRAND.signature,
    parentOrganization: { "@type": "Organization", name: BRAND.maker, url: LINKS.maverick },
  };

  const app = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: BRAND.name,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Agendamento online",
    operatingSystem: "Web",
    url: SITE_URL,
    inLanguage: "pt-BR",
    description:
      "Página de agendamento online para salões, barbearias e clínicas de estética. O cliente escolhe o horário livre sozinho, sem aplicativo e sem conta, e recebe confirmação e lembrete pelo WhatsApp.",
    publisher: { "@id": `${SITE_URL}#organizacao` },
    offers: [
      {
        "@type": "Offer",
        name: "Plano mensal",
        price: PRICE.monthly.toFixed(2),
        priceCurrency: "BRL",
        url: LINKS.signup,
        priceSpecification: { "@type": "UnitPriceSpecification", price: PRICE.monthly.toFixed(2), priceCurrency: "BRL", billingDuration: "P1M" },
      },
      {
        "@type": "Offer",
        name: "Plano anual",
        price: PRICE.yearly.toFixed(2),
        priceCurrency: "BRL",
        url: LINKS.signup,
        priceSpecification: { "@type": "UnitPriceSpecification", price: PRICE.yearly.toFixed(2), priceCurrency: "BRL", billingDuration: "P1Y" },
      },
    ],
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  const website = { "@context": "https://schema.org", "@type": "WebSite", name: BRAND.name, url: SITE_URL, inLanguage: "pt-BR", publisher: { "@id": `${SITE_URL}#organizacao` } };

  return [org, app, faq, website];
}
