import React from "react";
import { LINKS, pushEvent } from "../data/site";

/*
 * Todo CTA é um <a> real para marcaki.app (gatilho de clique em link do GTM funciona).
 * Cada clique envia ao dataLayer (ver TRACKING.md):
 *  - cta_click { cta, location } sempre
 *  - begin_signup { location } quando vai para /conta/cadastro
 *  - view_demo { location } quando abre a página de exemplo
 * Nenhum dado pessoal.
 */

type AnchorProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

export function SignupLink({ location, children, onClick, ...rest }: AnchorProps & { location: string }) {
  return (
    <a
      href={LINKS.signup}
      data-cta="signup"
      data-cta-location={location}
      onClick={(e) => {
        pushEvent("cta_click", { cta: "signup", location });
        pushEvent("begin_signup", { location });
        onClick?.(e);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}

export function DemoLink({ location, children, onClick, ...rest }: AnchorProps & { location: string }) {
  return (
    <a
      href={LINKS.demo}
      target="_blank"
      rel="noopener"
      data-cta="demo"
      data-cta-location={location}
      onClick={(e) => {
        pushEvent("cta_click", { cta: "demo", location });
        pushEvent("view_demo", { location });
        onClick?.(e);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}

export function LoginLink({ location, children, ...rest }: AnchorProps & { location: string }) {
  return (
    <a href={LINKS.login} onClick={() => pushEvent("cta_click", { cta: "login", location })} {...rest}>
      {children}
    </a>
  );
}

/* Botões institucionais: pílula sólida (principal) e contorno (secundário). */
export function PrimaryCta({
  location,
  children = "Criar conta grátis",
  tone = "dark",
  className,
}: {
  location: string;
  children?: React.ReactNode;
  tone?: "dark" | "roxo" | "white";
  className?: string;
}) {
  const colors = {
    dark: "bg-tinta text-white hover:bg-roxo-700",
    roxo: "bg-roxo-600 text-white hover:bg-roxo-700",
    white: "bg-white text-tinta hover:bg-roxo-100",
  }[tone];
  return (
    <SignupLink
      location={location}
      className={`inline-flex h-[52px] max-w-full items-center justify-center whitespace-nowrap rounded-full px-7 text-[15.5px] font-medium transition-colors duration-300 ${colors} ${className ?? ""}`}
    >
      <span className="truncate">{children}</span>
    </SignupLink>
  );
}

export function DemoCta({
  location,
  tone = "light",
  className,
  children = "Ver uma página de exemplo",
}: {
  location: string;
  tone?: "dark" | "light";
  className?: string;
  children?: React.ReactNode;
}) {
  const colors = tone === "dark" ? "border-white/25 text-white hover:border-white/70" : "border-tinta/20 text-tinta hover:border-tinta/70";
  return (
    <DemoLink
      location={location}
      className={`inline-flex h-[52px] max-w-full items-center justify-center whitespace-nowrap rounded-full border px-7 text-[15.5px] font-medium transition-colors duration-300 ${colors} ${className ?? ""}`}
    >
      <span className="truncate">{children}</span>
    </DemoLink>
  );
}
