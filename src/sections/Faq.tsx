import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "@phosphor-icons/react";
import { FAQ, pushEvent } from "../data/site";
import { EASE_OUT, Reveal, SlotLabel, SplitWords } from "../components/motion";

/* Respostas reais do site atual (marcaki.app). */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="perguntas" className="relative py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)] gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16 lg:px-8">
        <div className="min-w-0">
          <SlotLabel time="11:30">Perguntas</SlotLabel>
          <h2 className="font-display mt-5 text-4xl font-extrabold leading-[1.02] tracking-tightest text-tinta sm:text-5xl">
            <SplitWords text="O que todo mundo ==pergunta antes.==" />
          </h2>
        </div>
        <div className="min-w-0 border-t border-linha">
          {FAQ.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 0.04}>
                <div className="border-b border-linha">
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`faq-${i}`}
                      onClick={() => {
                        setOpen(isOpen ? null : i);
                        if (!isOpen) pushEvent("faq_open", { question: i + 1 });
                      }}
                      className="flex w-full items-center justify-between gap-6 py-6 text-left"
                    >
                      <span className="font-display text-xl font-bold leading-snug tracking-tight text-tinta sm:text-2xl">{f.q}</span>
                      <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-colors duration-300 ${isOpen ? "border-roxo-600 bg-roxo-600 text-white" : "border-linha text-tinta"}`}>
                        <Plus weight="bold" className={`h-4 w-4 transition-transform duration-500 ${isOpen ? "rotate-45" : ""}`} />
                      </span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: EASE_OUT }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-7 text-[17px] leading-relaxed text-tinta-2">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
