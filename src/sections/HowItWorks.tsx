import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { STEPS } from "../data/site";
import { EASE_OUT, Reveal, SlotLabel, SplitWords } from "../components/motion";
import { OwnerScreenServices, OwnerScreenShare, OwnerScreenSignup, PhoneFrame } from "../components/product";
import { PrimaryCta } from "../components/cta";

const SCREENS = [OwnerScreenSignup, OwnerScreenServices, OwnerScreenShare];

/*
 * Palco fixo: no desktop o celular fica parado e troca de tela conforme o passo que está no meio da janela
 * (IntersectionObserver, sem medir layout a cada frame). No celular, cada passo leva a própria tela.
 */
export function HowItWorks() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.step));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const Screen = SCREENS[active];

  return (
    <section id="como-funciona" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <SlotLabel time="09:30">Como funciona</SlotLabel>
          <h2 className="font-display mt-5 text-4xl font-extrabold leading-[1.02] tracking-tightest text-tinta sm:text-5xl lg:text-6xl">
            <SplitWords text="Três passos e ==sua página está no ar.==" />
          </h2>
          <Reveal>
            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-tinta-2">Tudo pelo celular, em menos de cinco minutos. Sem instalação e sem curva de aprendizado.</p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:gap-16">
          <div className="min-w-0">
            {STEPS.map((s, i) => (
              <div
                key={s.n}
                ref={(el) => (refs.current[i] = el)}
                data-step={i}
                className="flex min-h-0 flex-col justify-center border-t border-linha py-10 first:border-t-0 lg:min-h-[62vh] lg:py-0"
              >
                <div className="flex items-start gap-5 sm:gap-7">
                  <span
                    className={`font-display tnum grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-2xl font-extrabold transition-colors duration-500 sm:h-16 sm:w-16 sm:text-3xl ${
                      active === i ? "bg-roxo-600 text-white shadow-roxo" : "bg-roxo-100 text-roxo-700"
                    }`}
                  >
                    {s.n}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-3xl font-bold tracking-tight text-tinta sm:text-4xl">{s.title}</h3>
                    <p className="mt-3 max-w-md text-[17px] leading-relaxed text-tinta-2">{s.text}</p>
                  </div>
                </div>
                {/* Celular: cada passo mostra a própria tela */}
                <div className="mt-8 lg:hidden">
                  <PhoneFrame className="max-w-[250px]">
                    {i === 0 ? <OwnerScreenSignup /> : i === 1 ? <OwnerScreenServices /> : <OwnerScreenShare />}
                  </PhoneFrame>
                </div>
              </div>
            ))}
            <div className="pt-6">
              <PrimaryCta location="como_funciona" />
            </div>
          </div>

          {/* Desktop: palco fixo */}
          <div className="relative hidden lg:block">
            <div className="sticky top-[14vh]">
              <div className="glow absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 [--glow:124_58_237] [--glow-a:0.14]" />
              <PhoneFrame className="max-w-[300px]">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={active}
                    className="absolute inset-0"
                    initial={{ y: "18%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "-12%", opacity: 0 }}
                    transition={{ duration: 0.6, ease: EASE_OUT }}
                  >
                    <Screen />
                  </motion.div>
                </AnimatePresence>
              </PhoneFrame>
              <div className="mt-6 flex justify-center gap-2">
                {STEPS.map((s, i) => (
                  <span key={s.n} className={`h-1.5 rounded-full transition-all duration-500 ${active === i ? "w-8 bg-roxo-600" : "w-3 bg-roxo-200"}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
