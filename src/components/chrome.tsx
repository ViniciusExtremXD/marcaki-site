import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { List, X } from "@phosphor-icons/react";
import { LINKS, NAV_LINKS, assetUrl, pushEvent } from "../data/site";
import { lockScroll } from "../lib/smooth-scroll";
import { EASE_IN_OUT, EASE_OUT } from "./motion";
import { LoginLink, SignupLink } from "./cta";

/* ───────────── Navegação: barra branca de largura total, linha fina ao rolar ───────────── */

export function Nav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setSolid(y > 24);
    setHidden(y > prev && y > 640 && !open);
  });

  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    return () => lockScroll(false);
  }, [open]);

  return (
    <>
      <motion.header
        className={`fixed inset-x-0 top-0 z-50 border-b pt-[env(safe-area-inset-top)] transition-[background-color,border-color] duration-500 ${
          solid ? "border-linha bg-white/95 backdrop-blur-md" : "border-transparent bg-white"
        }`}
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
      >
        <nav className="container-x flex h-[68px] items-center justify-between gap-4 lg:h-[76px]" aria-label="Principal">
          <a href="#topo" className="flex shrink-0 items-center" aria-label="Marcaki, início">
            <img src={assetUrl("brand/marcaki-logo.svg")} alt="Marcaki" width={576} height={154} className="h-7 w-auto sm:h-8" />
          </a>

          <ul className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="relative whitespace-nowrap py-2 text-[15px] text-tinta-2 transition-colors after:absolute after:inset-x-0 after:bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-tinta after:transition-transform after:duration-500 hover:text-tinta hover:after:scale-x-100"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex min-w-0 items-center gap-1 sm:gap-5">
            <LoginLink location="nav" className="hidden whitespace-nowrap text-[15px] text-tinta transition-colors hover:text-roxo-700 sm:inline-block">
              Entrar
            </LoginLink>
            <SignupLink
              location="nav"
              className="inline-flex h-10 items-center whitespace-nowrap rounded-full bg-tinta px-4 text-[14px] font-medium text-white transition-colors hover:bg-roxo-700 sm:h-11 sm:px-5 sm:text-[15px]"
            >
              <span className="hidden min-[380px]:inline">Criar conta grátis</span>
              <span className="min-[380px]:hidden">Criar conta</span>
            </SignupLink>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-tinta lg:hidden"
              aria-label="Abrir menu"
              aria-expanded={open}
            >
              <List className="h-6 w-6" />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[80] flex flex-col bg-white px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-[env(safe-area-inset-top)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE_IN_OUT }}
            data-lenis-prevent
          >
            <div className="flex h-[68px] items-center justify-between border-b border-linha">
              <img src={assetUrl("brand/marcaki-logo.svg")} alt="Marcaki" className="h-7 w-auto" />
              <button type="button" onClick={() => setOpen(false)} className="grid h-10 w-10 place-items-center rounded-full text-tinta" aria-label="Fechar menu">
                <X className="h-6 w-6" />
              </button>
            </div>
            <ul className="mt-2">
              {NAV_LINKS.map((l, i) => (
                <motion.li
                  key={l.href}
                  className="border-b border-linha"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.05 + i * 0.04 }}
                >
                  <a href={l.href} onClick={() => setOpen(false)} className="font-display block py-4 text-[1.9rem] leading-tight tracking-[-0.01em] text-tinta">
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="mt-auto grid gap-3">
              <SignupLink location="menu_mobile" className="flex min-h-[52px] items-center justify-center rounded-full bg-tinta font-medium text-white">
                Criar conta grátis
              </SignupLink>
              <LoginLink location="menu_mobile" className="flex min-h-[52px] items-center justify-center rounded-full border border-linha font-medium text-tinta">
                Já tenho conta
              </LoginLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ───────────── Barra fixa no celular depois do topo ───────────── */

export function MobileBar() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => {
    const nearEnd = y + window.innerHeight > document.documentElement.scrollHeight - 900;
    setVisible(y > 760 && !nearEnd);
  });
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-x-0 bottom-0 z-40 border-t border-linha bg-white/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md md:hidden"
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
        >
          <SignupLink location="barra_mobile" className="flex h-12 items-center justify-center rounded-full bg-tinta text-[15px] font-medium text-white">
            Testar 14 dias grátis
          </SignupLink>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ───────────── Cookies (LGPD) com Consent Mode v2 ───────────── */

const CONSENT_KEY = "marcaki-consent";

function applyConsent(granted: boolean) {
  const v = granted ? "granted" : "denied";
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  w.gtag?.("consent", "update", { ad_storage: v, ad_user_data: v, ad_personalization: v, analytics_storage: v, personalization_storage: v });
  pushEvent("consent_update", { consent_state: v });
}

export function CookieNotice() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let seen: string | null = null;
    try {
      seen = localStorage.getItem(CONSENT_KEY);
    } catch {
      seen = null;
    }
    if (seen) return;
    const timer = window.setTimeout(() => setOpen(true), 2600);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const reopen = () => setOpen(true);
    window.addEventListener("marcaki:cookies", reopen);
    return () => window.removeEventListener("marcaki:cookies", reopen);
  }, []);

  const choose = (granted: boolean) => {
    try {
      localStorage.setItem(CONSENT_KEY, granted ? "granted" : "denied");
    } catch {
      /* modo privado: só fecha */
    }
    applyConsent(granted);
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="region"
          aria-label="Aviso de cookies"
          className="fixed inset-x-2 bottom-[max(0.5rem,env(safe-area-inset-bottom))] z-[45] rounded-2xl border border-linha bg-white p-5 text-[13.5px] text-tinta shadow-lift md:inset-x-auto md:bottom-6 md:left-6 md:max-w-sm md:text-sm"
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 16, opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE_OUT }}
        >
          <p className="leading-relaxed text-tinta-2">
            Usamos cookies para entender como o site é usado e melhorar nossos anúncios. Você escolhe. Saiba mais na{" "}
            <a href={LINKS.privacy} className="text-tinta underline underline-offset-4">
              Política de Privacidade
            </a>
            .
          </p>
          <div className="mt-4 flex gap-2">
            <button type="button" onClick={() => choose(false)} className="h-10 flex-1 rounded-full border border-linha text-sm font-medium text-tinta transition-colors hover:border-tinta/40">
              Recusar
            </button>
            <button type="button" onClick={() => choose(true)} className="h-10 flex-1 rounded-full bg-tinta text-sm font-medium text-white transition-colors hover:bg-roxo-700">
              Aceitar
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
