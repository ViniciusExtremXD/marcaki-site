import { BRAND, CONTACT, LINKS, NAV_LINKS, assetUrl, pushEvent } from "../data/site";
import { LoginLink, SignupLink } from "../components/cta";

/* Rodapé institucional: marca, navegação, contato e a linha legal. */
export function Footer() {
  const year = 2026;
  return (
    <footer className="relative border-t border-linha bg-white pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-16 text-tinta sm:pt-20">
      <div className="container-x">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-12 md:grid-cols-12 md:gap-8">
          <div className="min-w-0 md:col-span-5">
            <img src={assetUrl("brand/marcaki-logo.svg")} alt="Marcaki" width={576} height={154} className="h-8 w-auto" loading="lazy" />
            <p className="font-display mt-6 text-[1.6rem] leading-tight tracking-[-0.01em]">{BRAND.signature}</p>
            <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-tinta-2">Agendamento online para salões, barbearias e clínicas de estética.</p>
          </div>

          <nav aria-label="Rodapé" className="min-w-0 md:col-span-3 md:col-start-7">
            <p className="text-[14px] text-tinta-3">Site</p>
            <ul className="mt-4 grid gap-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-[15px] text-tinta-2 transition-colors hover:text-tinta">
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <SignupLink location="rodape" className="text-[15px] text-tinta-2 transition-colors hover:text-tinta">
                  Criar conta
                </SignupLink>
              </li>
              <li>
                <LoginLink location="rodape" className="text-[15px] text-tinta-2 transition-colors hover:text-tinta">
                  Entrar
                </LoginLink>
              </li>
            </ul>
          </nav>

          <div className="min-w-0 md:col-span-3">
            <p className="text-[14px] text-tinta-3">Contato comercial</p>
            {/* Espaço reservado: o Marcaki ainda não tem contato comercial (ver CONTACT em src/data/site.ts). */}
            <ul className="mt-4 grid gap-2.5 text-[15px] text-tinta-2">
              <li className="truncate">{CONTACT.whatsappDisplay}</li>
              <li className="truncate">{CONTACT.email}</li>
              {CONTACT.placeholder && <li className="text-[13px] text-tinta-3">Em breve</li>}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-linha pt-6 text-[13.5px] text-tinta-3 md:flex-row md:items-center md:justify-between">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <a href={LINKS.privacy} className="hover:text-tinta">
                Privacidade
              </a>
            </li>
            <li>
              <a href={LINKS.terms} className="hover:text-tinta">
                Termos
              </a>
            </li>
            <li>
              <a href={LINKS.dataDeletion} className="hover:text-tinta">
                Exclusão de dados
              </a>
            </li>
            <li>
              <button type="button" onClick={() => window.dispatchEvent(new Event("marcaki:cookies"))} className="hover:text-tinta">
                Preferências de cookies
              </button>
            </li>
          </ul>
          <p>
            © {year} {BRAND.name}. Desenvolvido por{" "}
            <a href={LINKS.maverick} target="_blank" rel="noopener" onClick={() => pushEvent("maverick_click", { location: "rodape" })} className="text-tinta-2 hover:text-tinta">
              {BRAND.maker}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
