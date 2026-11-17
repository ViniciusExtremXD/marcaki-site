import React from "react";
import { ArrowUpRight, Eye } from "@phosphor-icons/react";
import { LINKS, pushEvent } from "../data/site";
import { Magnetic } from "./motion";

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

/* Botão principal: preenchimento que varre da esquerda e seta que troca de lugar. */
export function PrimaryCta({
  location,
  children = "Criar minha página grátis",
  size = "lg",
  tone = "roxo",
  className,
}: {
  location: string;
  children?: React.ReactNode;
  size?: "md" | "lg";
  tone?: "roxo" | "marca" | "white";
  className?: string;
}) {
  const pad = size === "lg" ? "h-14 pl-6 pr-2 text-[15px] sm:text-base" : "h-12 pl-5 pr-1.5 text-[15px]";
  const dot = size === "lg" ? "h-10 w-10" : "h-9 w-9";
  const colors = {
    roxo: { base: "bg-roxo-600 text-white shadow-roxo", sweep: "bg-roxo-800", dot: "bg-marca text-tinta" },
    marca: { base: "bg-marca text-tinta", sweep: "bg-white", dot: "bg-tinta text-marca" },
    white: { base: "bg-white text-tinta", sweep: "bg-marca", dot: "bg-roxo-600 text-white" },
  }[tone];
  return (
    <Magnetic strength={0.2}>
      <SignupLink
        location={location}
        className={`group relative inline-flex max-w-full items-center gap-4 overflow-hidden whitespace-nowrap rounded-full font-semibold ${colors.base} ${pad} ${className ?? ""}`}
      >
        <span className={`absolute inset-0 origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 ${colors.sweep}`} />
        <span className="relative truncate">{children}</span>
        <span className={`relative grid shrink-0 place-items-center overflow-hidden rounded-full ${colors.dot} ${dot}`}>
          <ArrowUpRight weight="bold" className="h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-6 group-hover:translate-x-6" />
          <ArrowUpRight weight="bold" className="absolute h-4 w-4 -translate-x-6 translate-y-6 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:translate-y-0" />
        </span>
      </SignupLink>
    </Magnetic>
  );
}

export function DemoCta({ location, tone = "light", className }: { location: string; tone?: "dark" | "light"; className?: string }) {
  const colors =
    tone === "dark"
      ? "border-white/20 text-white hover:border-white/50 hover:bg-white/5"
      : "border-roxo-600/20 bg-white/60 text-tinta hover:border-roxo-600/50 hover:bg-white";
  return (
    <Magnetic strength={0.16}>
      <DemoLink location={location} className={`group inline-flex h-14 max-w-full items-center gap-2.5 whitespace-nowrap rounded-full border px-6 text-[15px] font-semibold transition-colors sm:text-base ${colors} ${className ?? ""}`}>
        <Eye weight="bold" className="h-[18px] w-[18px] shrink-0 transition-transform duration-300 group-hover:scale-110" />
        <span className="truncate">Ver uma página de exemplo</span>
      </DemoLink>
    </Magnetic>
  );
}
