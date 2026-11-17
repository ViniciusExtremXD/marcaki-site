import { motion } from "framer-motion";
import { Check } from "@phosphor-icons/react";
import { PRICE } from "../data/site";
import { ClipReveal, ParallaxImage, Reveal, SplitWords } from "../components/motion";
import { DemoCta, PrimaryCta } from "../components/cta";

/* Fecho: a pergunta do site atual e o selo "tá marcado" carimbando. */
export function FinalCta() {
  return (
    <section id="comecar" className="relative overflow-hidden py-24 sm:py-32">
      <div className="bg-grid mask-fade-b pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto inline-flex items-center gap-3 rounded-full bg-roxo-600 py-2 pl-2 pr-5 text-white shadow-roxo"
          initial={{ scale: 1.6, opacity: 0, rotate: -8 }}
          whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
          viewport={{ once: true, margin: "0px 0px -20% 0px" }}
          transition={{ type: "spring", stiffness: 320, damping: 15 }}
        >
          <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-roxo-600">
            <Check weight="bold" className="h-5 w-5" />
          </span>
          <span className="font-display text-lg font-bold">Tá marcado</span>
        </motion.div>
        <h2 className="font-display mt-8 text-balance text-4xl font-extrabold leading-[1.02] tracking-tightest text-tinta sm:text-6xl lg:text-7xl">
          <SplitWords text="Seu próximo cliente pode ==marcar hoje à noite.==" />
        </h2>
        <Reveal>
          <p className="mx-auto mt-6 max-w-xl text-[17px] leading-relaxed text-tinta-2 sm:text-lg">
            Cadastre seu negócio, informe seus serviços e horários, e comece a receber agendamentos hoje mesmo.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <PrimaryCta location="cta_final">Criar meu Marcaki</PrimaryCta>
            <DemoCta location="cta_final" />
          </div>
          <p className="mt-5 text-[14px] text-tinta-2">
            {PRICE.trialDays} dias grátis · sem cartão de crédito · sem fidelidade
          </p>
        </Reveal>
        <ClipReveal className="mx-auto mt-14 max-w-4xl" radius={28}>
          <div className="relative">
            <ParallaxImage
              src="caderno"
              alt="Mãos anotando horários num caderno com o celular ao lado"
              className="aspect-[16/9] rounded-[28px] bg-roxo-100 sm:aspect-[21/9]"
              position="center 60%"
              sizes="(min-width: 1024px) 900px, 100vw"
            />
            <span className="absolute bottom-4 left-4 max-w-[80%] rounded-full bg-white/95 px-3.5 py-1.5 text-left text-[13px] font-semibold text-tinta shadow-soft">
              O caderno pode <span className="mk">se aposentar</span>.
            </span>
          </div>
        </ClipReveal>
      </div>
    </section>
  );
}
