import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "@phosphor-icons/react";
import { FAQ, pushEvent } from "../data/site";
import { EASE_OUT, Lines, Reveal } from "../components/motion";

/* Respostas reais do site atual (marcaki.app). */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="perguntas" className="relative py-24 sm:py-32 lg:py-36">
      <div className="container-x grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="min-w-0 lg:col-span-4">
          <h2 className="font-display text-[2.35rem] font-normal leading-[1.04] tracking-[-0.02em] text-tinta sm:text-5xl">
            <Lines lines={["Perguntas", "frequentes"]} />
          </h2>
        </div>
        <div className="min-w-0 border-t border-linha lg:col-span-7 lg:col-start-6">
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
                      className="group flex w-full items-start justify-between gap-6 py-7 text-left"
                    >
                      <span className="font-display text-[1.4rem] leading-snug tracking-[-0.01em] text-tinta sm:text-[1.6rem]">{f.q}</span>
                      <Plus weight="light" className={`mt-1.5 h-5 w-5 shrink-0 text-tinta transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? "rotate-45" : ""}`} />
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
                        <p className="max-w-2xl pb-8 text-[17px] leading-relaxed text-tinta-2">{f.a}</p>
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
