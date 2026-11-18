import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { STEPS } from "../data/site";
import { EASE_OUT, Reveal, SectionHead } from "../components/motion";
import { OwnerScreenServices, OwnerScreenShare, OwnerScreenSignup, PhoneFrame } from "../components/product";
import { PrimaryCta } from "../components/cta";

const SCREENS = [OwnerScreenSignup, OwnerScreenServices, OwnerScreenShare];
const STEP_MS = 4800;

/*
 * Três passos numerados (uma sequência de verdade). Os passos avançam sozinhos enquanto a seção está na tela;
 * clicar em um passo mostra a tela dele. O traço sob o passo ativo marca o tempo até o próximo.
 */
export function HowItWorks() {
  const [active, setActive] = useState(0);
  const [cycle, setCycle] = useState(0); // reinicia a barra ao clicar
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px -20% 0px" });

  useEffect(() => {
    if (!inView) return;
    const t = window.setTimeout(() => setActive((a) => (a + 1) % STEPS.length), STEP_MS);
    return () => window.clearTimeout(t);
  }, [inView, active, cycle]);

  const Screen = SCREENS[active];

  return (
    <section id="como-funciona" className="relative bg-nevoa py-24 sm:py-32 lg:py-36">
      <div className="container-x">
        <SectionHead title={["No ar hoje,", "em cinco minutos."]} intro="Tudo pelo celular. Sem instalação, sem curva de aprendizado e sem precisar de ninguém para configurar." />

        <div ref={ref} className="mt-14 grid grid-cols-[minmax(0,1fr)] items-center gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-8">
          <ol className="lg:col-span-5">
            {STEPS.map((s, i) => {
              const on = active === i;
              return (
                <li key={s.n} className="border-t border-linha last:border-b">
                  <button
                    type="button"
                    onClick={() => {
                      setActive(i);
                      setCycle((c) => c + 1);
                    }}
                    aria-current={on ? "step" : undefined}
                    className="relative block w-full py-7 text-left"
                  >
                    <span className="flex items-baseline gap-5">
                      <span className={`font-display tnum text-[15px] transition-colors duration-500 ${on ? "text-roxo-600" : "text-tinta-3"}`}>0{s.n}</span>
                      <span className="min-w-0">
                        <span className={`font-display block text-[1.7rem] leading-tight tracking-[-0.01em] transition-colors duration-500 ${on ? "text-tinta" : "text-tinta-3"}`}>{s.title}</span>
                        <AnimatePresence initial={false}>
                          {on && (
                            <motion.span
                              className="block overflow-hidden"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.5, ease: EASE_OUT }}
                            >
                              <span className="block pt-3 text-[16px] leading-relaxed text-tinta-2">{s.text}</span>
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </span>
                    </span>
                    {on && (
                      <motion.span
                        key={`${active}-${cycle}-${inView}`}
                        className="absolute -top-px left-0 h-px bg-tinta"
                        initial={{ width: "0%" }}
                        animate={{ width: inView ? "100%" : "0%" }}
                        transition={{ duration: STEP_MS / 1000, ease: "linear" }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ol>

          <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.1}>
            <div className="grid place-items-center">
              <PhoneFrame className="max-w-[270px]">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={active}
                    className="absolute inset-0"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.6, ease: EASE_OUT }}
                  >
                    <Screen />
                  </motion.div>
                </AnimatePresence>
              </PhoneFrame>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-14">
          <PrimaryCta location="como_funciona" />
        </Reveal>
      </div>
    </section>
  );
}
