import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { List, X } from "@phosphor-icons/react";
import { LINKS, NAV_LINKS, assetUrl, pushEvent } from "../data/site";
import { lockScroll } from "../lib/smooth-scroll";
import { EASE_IN_OUT, EASE_OUT } from "./motion";
import { LoginLink, SignupLink } from "./cta";

/* ───────────── Abertura: o símbolo "carimba", a caneta passa em "tá marcado" e a cortina sobe ───────────── */

function introAlreadyPlayed() {
  try {
    return sessionStorage.getItem("marcaki-intro") === "1";
  } catch {
    return false;
  }
}

export function Preloader({ onDone }: { onDone: () => void }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (!show) return;
    lockScroll(true);
    const quick = introAlreadyPlayed();
    const t = setTimeout(() => {
      try {
        sessionStorage.setItem("marcaki-intro", "1");
      } catch {
        /* armazenamento bloqueado: a abertura completa toca de novo */
      }
      setShow(false);
      onDone();
    }, quick ? 350 : 1650);
    return () => clearTimeout(t);
  }, [show, onDone]);

  return (
    <AnimatePresence onExitComplete={() => lockScroll(false)}>
      {show && (
        <motion.div
          className="mk-preloader fixed inset-0 z-[100] grid place-items-center bg-roxo-900"
          initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ duration: 0.9, ease: EASE_IN_OUT }}
        >
          <div className="flex flex-col items-center px-6">
            <motion.img
              src={assetUrl("brand/marcaki-mark-white.svg")}
              alt=""
              width={96}
              height={96}
              className="h-20 w-20 sm:h-24 sm:w-24"
              initial={{ scale: 1.7, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            />
            <motion.p
              className="font-display mt-6 text-[26px] font-extrabold tracking-tight text-white sm:text-[32px]"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: EASE_OUT }}
            >
              Marcou,{" "}
              <span className="mk mk-full mk-anim text-tinta">tá marcado.</span>
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ───────────── Barra de progresso no topo ───────────── */

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });
  return <motion.div style={{ scaleX }} className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-roxo-600 via-roxo-500 to-marca" />;
}

/* ───────────── Navegação ───────────── */

export function Nav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setSolid(y > 40);
    setHidden(y > prev && y > 520 && !open);
  });

  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    return () => lockScroll(false);
  }, [open]);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 px-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-5"
        animate={{ y: hidden ? "-130%" : "0%" }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
      >
        <nav
          className={`mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 rounded-2xl border px-2.5 pl-4 backdrop-blur-md transition-[background-color,box-shadow,border-color] duration-500 sm:pl-5 ${
            solid ? "border-linha bg-white/90 shadow-card" : "border-white/60 bg-white/60 shadow-soft"
          }`}
          aria-label="Principal"
        >
          <a href="#topo" className="flex shrink-0 items-center" aria-label="Marcaki — início">
            <img src={assetUrl("brand/marcaki-logo.svg")} alt="Marcaki" width={576} height={154} className="h-7 w-auto min-[400px]:h-8 sm:h-9" />
          </a>

          <ul className="hidden items-center gap-0.5 lg:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="group relative block overflow-hidden whitespace-nowrap px-3 py-2 text-[15px] font-medium text-tinta transition-colors hover:text-roxo-700">
                  <span className="block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">{l.label}</span>
                  <span className="absolute inset-x-3 top-full block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[calc(100%+0.5rem)]">{l.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex min-w-0 items-center gap-1.5 sm:gap-2">
            <LoginLink location="nav" className="hidden whitespace-nowrap rounded-full px-3 py-2 text-[15px] font-semibold text-tinta transition-colors hover:text-roxo-700 sm:inline-block">
              Entrar
            </LoginLink>
            <SignupLink
              location="nav"
              className="inline-flex h-10 items-center whitespace-nowrap rounded-full bg-roxo-600 px-3.5 text-[13.5px] font-semibold text-white shadow-roxo transition-colors hover:bg-roxo-800 min-[400px]:h-11 min-[400px]:px-4 min-[400px]:text-[14px] sm:px-5 sm:text-[15px]"
            >
              <span className="hidden min-[400px]:inline">Teste grátis</span>
              <span className="min-[400px]:hidden">Criar grátis</span>
            </SignupLink>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-roxo-600/15 text-tinta min-[400px]:h-11 min-[400px]:w-11 lg:hidden"
              aria-label="Abrir menu"
              aria-expanded={open}
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[80] flex flex-col overflow-hidden bg-roxo-900 px-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-[max(1.5rem,env(safe-area-inset-top))]"
            initial={{ clipPath: "circle(0% at calc(100% - 44px) 44px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 44px) 44px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 44px) 44px)" }}
            transition={{ duration: 0.7, ease: EASE_IN_OUT }}
            data-lenis-prevent
          >
            <div className="flex items-center justify-between">
              <img src={assetUrl("brand/marcaki-logo-light.svg")} alt="Marcaki" className="h-8 w-auto" />
              <button type="button" onClick={() => setOpen(false)} className="grid h-11 w-11 place-items-center rounded-full border border-white/20 text-white" aria-label="Fechar menu">
                <X className="h-5 w-5" />
              </button>
            </div>
            <ul className="mt-12 flex flex-col gap-1">
              {NAV_LINKS.map((l, i) => (
                <li key={l.href} className="overflow-hidden">
                  <motion.a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="font-display block py-1.5 text-[2.4rem] font-bold leading-tight tracking-tight text-white"
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.25 + i * 0.06 }}
                  >
                    {l.label}
                  </motion.a>
                </li>
              ))}
            </ul>
            <motion.div className="mt-auto grid gap-3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6, ease: EASE_OUT }}>
              <SignupLink location="menu_mobile" className="flex h-14 items-center justify-center rounded-full bg-marca font-semibold text-tinta">
                Criar minha página grátis
              </SignupLink>
              <LoginLink location="menu_mobile" className="flex h-14 items-center justify-center rounded-full border border-white/20 font-semibold text-white">
                Já tenho conta · Entrar
              </LoginLink>
            </motion.div>
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
          className="fixed inset-x-0 bottom-0 z-40 border-t border-linha bg-white/90 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl md:hidden"
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
        >
          <SignupLink location="barra_mobile" className="flex h-12 items-center justify-center gap-2 rounded-full bg-roxo-600 text-[15px] font-semibold text-white">
            Criar minha página grátis
          </SignupLink>
          <p className="mt-1.5 text-center text-[11px] text-tinta-2">14 dias grátis · sem cartão</p>
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
          className="fixed inset-x-2 bottom-[max(0.5rem,env(safe-area-inset-bottom))] z-[45] rounded-2xl border border-linha bg-white/95 p-4 text-[13px] text-tinta shadow-lift backdrop-blur-xl md:inset-x-auto md:bottom-6 md:left-6 md:max-w-sm md:text-sm"
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 24, opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE_OUT }}
        >
          <p className="leading-relaxed text-tinta-2">
            Usamos cookies para entender como o site é usado e melhorar nossos anúncios. Você escolhe. Saiba mais na{" "}
            <a href={LINKS.privacy} className="font-semibold text-roxo-700 underline underline-offset-4">
              Política de Privacidade
            </a>
            .
          </p>
          <div className="mt-3 flex gap-2">
            <button type="button" onClick={() => choose(false)} className="h-10 flex-1 rounded-full border border-roxo-600/25 text-sm font-semibold text-tinta transition-colors hover:bg-roxo-50">
              Recusar
            </button>
            <button type="button" onClick={() => choose(true)} className="h-10 flex-1 rounded-full bg-roxo-600 text-sm font-semibold text-white transition-colors hover:bg-roxo-800">
              Aceitar
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
