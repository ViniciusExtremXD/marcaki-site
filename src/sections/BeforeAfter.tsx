import { useMemo, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, X, ChatCircleDots } from "@phosphor-icons/react";
import { AFTER, BEFORE, CHAOS_MESSAGES } from "../data/site";
import { Reveal, SlotLabel, SplitWords, useCycle } from "../components/motion";
import { AgendaBoard } from "../components/product";

/* O inimigo da marca é a mensagem "tem horário?". Antes: mensagens chegando sem parar. Depois: a agenda se preenche sozinha. */
export function BeforeAfter() {
  return (
    <section id="antes-e-depois" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <SlotLabel time="08:30">Antes e depois</SlotLabel>
          <h2 className="font-display mt-5 text-4xl font-extrabold leading-[1.02] tracking-tightest text-tinta sm:text-5xl lg:text-6xl">
            <SplitWords text="Do jeito antigo ==pra esse aqui.==" />
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-5 lg:grid-cols-2">
          <Reveal className="min-w-0">
            <div className="h-full rounded-3xl border border-linha bg-[#F4F2F8] p-5 sm:p-7">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-tinta-2">Sem o Marcaki</p>
                <span className="rounded-full bg-furo/10 px-2.5 py-1 text-[12px] font-semibold text-furo">o dia inteiro assim</span>
              </div>
              <ChaosPanel />
              <ul className="mt-6 grid gap-3">
                {BEFORE.map((t) => (
                  <li key={t} className="flex gap-3 text-[15px] text-tinta-2">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-furo/10 text-furo">
                      <X weight="bold" className="h-3 w-3" />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal className="min-w-0" delay={0.12}>
            <div className="h-full rounded-3xl bg-roxo-900 p-5 text-white sm:p-7">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-roxo-200">Com o Marcaki</p>
                <span className="rounded-full bg-marca px-2.5 py-1 text-[12px] font-semibold text-tinta">a agenda se organiza</span>
              </div>
              <AgendaBoard dark className="mt-5" />
              <ul className="mt-6 grid gap-3">
                {AFTER.map((t) => (
                  <li key={t} className="flex gap-3 text-[15px] text-roxo-100">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-marca text-tinta">
                      <Check weight="bold" className="h-3 w-3" />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ChaosPanel() {
  const ref = useRef<HTMLDivElement>(null);
  const times = useMemo(() => [...CHAOS_MESSAGES.map(() => 900), 2600], []);
  const step = useCycle(ref, times);
  const shown = CHAOS_MESSAGES.slice(0, step);
  return (
    <div ref={ref} className="relative mt-5 h-[296px] overflow-hidden rounded-2xl border border-linha bg-white p-3 shadow-card">
      <div className="flex items-center justify-between border-b border-linha pb-2.5">
        <p className="flex items-center gap-2 text-[13px] font-semibold text-tinta">
          <ChatCircleDots weight="fill" className="h-5 w-5 text-tinta-3" /> Conversas
        </p>
        <motion.span key={shown.length} initial={{ scale: 1.4 }} animate={{ scale: 1 }} className="tnum grid h-6 min-w-6 place-items-center rounded-full bg-furo px-1.5 text-[11px] font-bold text-white">
          {shown.length}
        </motion.span>
      </div>
      <div className="mt-2 flex flex-col-reverse gap-1.5">
        <AnimatePresence initial={false}>
          {[...shown].reverse().map((m) => (
            <motion.div
              key={m.time + m.who}
              layout
              initial={{ opacity: 0, x: -24, height: 0 }}
              animate={{ opacity: 1, x: 0, height: "auto" }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 420, damping: 30 }}
              className="flex items-center gap-2.5 rounded-xl px-1.5 py-1.5"
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-roxo-100 text-[12px] font-bold text-roxo-700">{m.who[0]}</span>
              <span className="min-w-0 flex-1">
                <span className="flex items-baseline justify-between gap-2">
                  <b className="truncate text-[13px] text-tinta">{m.who}</b>
                  <span className="tnum shrink-0 text-[10.5px] text-tinta-3">{m.time}</span>
                </span>
                <span className="block truncate text-[13px] text-tinta-2">{m.text}</span>
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white to-transparent" />
    </div>
  );
}
