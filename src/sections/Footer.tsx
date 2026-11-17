import { ShieldCheck, WhatsappLogo, EnvelopeSimple } from "@phosphor-icons/react";
import { BRAND, CONTACT, LINKS, NAV_LINKS, assetUrl, pushEvent } from "../data/site";
import { LoginLink, SignupLink } from "../components/cta";

export function Footer() {
  const year = 2026;
  return (
    <footer className="relative overflow-hidden bg-tinta pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-16 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-12 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div className="min-w-0">
            <img src={assetUrl("brand/marcaki-logo-light.svg")} alt="Marcaki" width={576} height={154} className="h-10 w-auto" loading="lazy" />
            <p className="font-display mt-6 text-2xl font-bold tracking-tight">
              Marcou, <span className="mk mk-full text-tinta">tá marcado.</span>
            </p>
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-white/60">Agendamento online para salões, barbearias e clínicas de estética. O cliente marca sozinho; você só abre a agenda.</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <SignupLink location="rodape" className="inline-flex h-11 items-center rounded-full bg-marca px-5 text-[15px] font-semibold text-tinta">
                Criar minha página grátis
              </SignupLink>
              <LoginLink location="rodape" className="inline-flex h-11 items-center rounded-full border border-white/20 px-5 text-[15px] font-semibold text-white hover:border-white/50">
                Entrar
              </LoginLink>
            </div>
          </div>

          <nav aria-label="Rodapé" className="min-w-0">
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-white/40">No site</p>
            <ul className="mt-4 grid gap-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-[15px] text-white/80 hover:text-marca">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="min-w-0">
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-white/40">Contato comercial</p>
            {/* Espaço reservado: o Marcaki ainda não tem contato comercial (ver CONTACT em src/data/site.ts). */}
            <ul className="mt-4 grid gap-2.5 text-[15px]">
              <li className="flex min-w-0 items-center gap-2 text-white/80">
                <WhatsappLogo className="h-4 w-4 shrink-0 text-marca" />
                <span className="truncate">{CONTACT.whatsappDisplay}</span>
              </li>
              <li className="flex min-w-0 items-center gap-2 text-white/80">
                <EnvelopeSimple className="h-4 w-4 shrink-0 text-marca" />
                <span className="truncate">{CONTACT.email}</span>
              </li>
              {CONTACT.placeholder && (
                <li>
                  <span className="inline-block rounded-full border border-dashed border-white/30 px-2.5 py-1 text-[11.5px] font-semibold uppercase tracking-wider text-white/50">em breve</span>
                </li>
              )}
            </ul>
            <p className="mt-6 flex items-start gap-2 text-[13.5px] leading-relaxed text-white/60">
              <ShieldCheck weight="fill" className="mt-0.5 h-4 w-4 shrink-0 text-marca" />
              <span>
                Seus dados e os dos seus clientes protegidos, em conformidade com a LGPD.{" "}
                <a href={LINKS.privacy} className="underline underline-offset-4 hover:text-white">
                  Saiba mais
                </a>
                .
              </span>
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-[13.5px] text-white/50 md:flex-row md:items-center md:justify-between">
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            <li>
              <a href={LINKS.privacy} className="hover:text-white">
                Privacidade
              </a>
            </li>
            <li>
              <a href={LINKS.terms} className="hover:text-white">
                Termos
              </a>
            </li>
            <li>
              <a href={LINKS.dataDeletion} className="hover:text-white">
                Exclusão de dados
              </a>
            </li>
            <li>
              <button type="button" onClick={() => window.dispatchEvent(new Event("marcaki:cookies"))} className="hover:text-white">
                Preferências de cookies
              </button>
            </li>
          </ul>
          <p>
            © {year} {BRAND.name} · Desenvolvido por{" "}
            <a href={LINKS.maverick} target="_blank" rel="noopener" onClick={() => pushEvent("maverick_click", { location: "rodape" })} className="font-semibold text-white/70 hover:text-white">
              {BRAND.maker}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
