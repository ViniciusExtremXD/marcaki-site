import React, { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, DeviceMobile, Headset, Moon, ShieldCheck, Storefront } from "@phosphor-icons/react";
import { EXTRAS, SOLUTIONS } from "../data/site";
import { EASE_OUT, Reveal, SectionHead, useCycle } from "../components/motion";
import { AgendaBoard, ConfirmationBubble, ReminderBubble } from "../components/product";

const ROWS: { key: keyof typeof SOLUTIONS; Demo: () => React.ReactElement }[] = [
  { key: "selfBooking", Demo: NightBookings },
  { key: "reminders", Demo: ReminderTimeline },
  { key: "agenda", Demo: AgendaDemo },
];

const EXTRA_TEXT: Record<string, string> = {
  pagina: "O endereço é seu: marcaki.app/t/seu-negocio.",
  semapp: "Abre no navegador do celular. Nome e telefone bastam.",
  suporte: "Dúvida de uso tem resposta na hora; o resto vai para uma pessoa.",
  lgpd: "Seus dados e os dos seus clientes protegidos.",
};

/* Como resolve: três linhas alternadas, texto de um lado e o produto funcionando do outro. */
export function Solucao() {
  return (
    <section id="solucao" className="relative py-24 sm:py-32 lg:py-36">
      <div className="container-x">
        <SectionHead title={["Menos mensagem, menos", "falta, mais horário vendido."]} intro="Cada parte do Marcaki existe para fechar uma dessas contas, sem nada para configurar à parte." />

        <div className="mt-16 grid gap-20 sm:gap-24 lg:mt-24 lg:gap-32">
          {ROWS.map(({ key, Demo }, i) => {
            const d = SOLUTIONS[key];
            const flip = i % 2 === 1;
            return (
              <article key={key} className="grid grid-cols-[minmax(0,1fr)] items-center gap-10 lg:grid-cols-12 lg:gap-8">
                <div className={`min-w-0 lg:col-span-5 ${flip ? "lg:order-2 lg:col-start-8" : ""}`}>
                  <Reveal>
                    <p className="text-[14px] text-tinta-3">Resolve: {d.solves.join(", ").toLowerCase()}</p>
                    <h3 className="font-display mt-4 text-[2rem] leading-[1.08] tracking-[-0.015em] text-tinta sm:text-[2.6rem]">{d.title.replace(/==/g, "")}</h3>
                    <p className="mt-5 text-[17px] leading-relaxed text-tinta-2">{d.text}</p>
                    <p className="mt-6 border-l-2 border-roxo-600 pl-4 text-[16px] leading-relaxed text-tinta">{d.gain}</p>
                  </Reveal>
                </div>
                <div className={`min-w-0 lg:col-span-6 ${flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-7"}`}>
                  <Reveal delay={0.1}>
                    <div className="grid min-h-[420px] place-items-center rounded-[20px] bg-nevoa px-4 py-10 sm:px-10 sm:py-14">
                      <div className="w-full max-w-[420px]">
                        <Demo />
                      </div>
                    </div>
                  </Reveal>
                </div>
              </article>
            );
          })}
        </div>

        <ul className="mt-24 grid grid-cols-[minmax(0,1fr)] border-t border-linha sm:grid-cols-2 lg:mt-32 lg:grid-cols-4">
          {EXTRAS.map((e, i) => {
            const Icon = { pagina: Storefront, semapp: DeviceMobile, suporte: Headset, lgpd: ShieldCheck }[e.id] ?? CheckCircle;
            return (
              <Reveal
                as="li"
                key={e.id}
                delay={i * 0.06}
                className={`border-b border-linha py-8 sm:pr-6 lg:border-b-0 ${i % 2 === 1 ? "sm:border-l sm:pl-6" : ""} ${i === 2 ? "lg:border-l lg:pl-6" : ""}`}
              >
                <Icon weight="light" className="h-7 w-7 text-roxo-600" />
                <h4 className="mt-4 text-[16px] font-semibold leading-snug text-tinta">{e.title}</h4>
                <p className="mt-1.5 text-[15px] leading-relaxed text-tinta-2">{EXTRA_TEXT[e.id]}</p>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ───────────── Demos ───────────── */

const NIGHT = [
  { clock: "23:47", day: "Quarta-feira", who: "Ana", service: "Escova", slot: "Qui, 15:15" },
  { clock: "06:12", day: "Sábado", who: "Rafael", service: "Corte masculino", slot: "Sáb, 09:00" },
  { clock: "20:30", day: "Domingo", who: "Jéssica", service: "Manicure", slot: "Ter, 10:30" },
];

/* O negócio fechado, a página aberta: agendamentos chegando fora do horário. */
function NightBookings() {
  const ref = useRef<HTMLDivElement>(null);
  const step = useCycle(ref, [3000, 3000, 3000]);
  const b = NIGHT[step];
  return (
    <div ref={ref} className="rounded-2xl border border-linha bg-white p-5 shadow-card sm:p-6">
      <div className="flex flex-wrap-reverse items-start justify-between gap-3">
        <div>
          <p className="flex items-center gap-1.5 text-[13px] text-tinta-2">
            <Moon weight="fill" className="h-3.5 w-3.5 text-roxo-600" /> Seu negócio está fechado
          </p>
          <div className="font-display tnum mt-2 h-[3.6rem] overflow-hidden text-[3.6rem] leading-none tracking-[-0.02em] text-tinta">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span key={b.clock} className="block" initial={{ y: "100%" }} animate={{ y: "0%" }} exit={{ y: "-100%" }} transition={{ duration: 0.7, ease: EASE_OUT }}>
                {b.clock}
              </motion.span>
            </AnimatePresence>
          </div>
          <p className="mt-1 text-[13px] text-tinta-3">{b.day}</p>
        </div>
        <p className="flex shrink-0 items-center gap-1.5 text-[12.5px] text-tinta-2">
          <span className="h-1.5 w-1.5 rounded-full bg-ok" /> Página aberta
        </p>
      </div>

      <div className="relative mt-6 h-[78px] border-t border-linha pt-4">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={b.who}
            className="absolute inset-x-0 top-4 flex items-center gap-3"
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-roxo-100 text-[14px] font-semibold text-roxo-700">{b.who[0]}</span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[15px] font-medium text-tinta">
                {b.who} marcou {b.service.toLowerCase()}
              </span>
              <span className="tnum block text-[13px] text-tinta-2">{b.slot}</span>
            </span>
            <span className="shrink-0 rounded-full bg-nevoa px-2.5 py-1 text-[12px] text-tinta-2">Novo</span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* Do agendamento ao cliente na cadeira, sem você digitar nada. */
function ReminderTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const step = useCycle(ref, [600, 1600, 1600, 3600]);
  const items = [
    { when: "Ao marcar", node: <ConfirmationBubble className="!max-w-none" /> },
    { when: "Antes do horário", node: <ReminderBubble className="!max-w-none" /> },
    {
      when: "Qui, 15:15",
      node: (
        <p className="inline-flex items-center gap-2 rounded-full border border-linha bg-white px-3.5 py-2 text-[14px] text-tinta">
          <CheckCircle weight="fill" className="h-4 w-4 text-ok" /> Ana chegou no horário
        </p>
      ),
    },
  ];
  return (
    <div ref={ref} className="relative grid min-h-[360px] content-start gap-5 pl-8">
      <span className="absolute bottom-2 left-[7px] top-2 w-px bg-linha" />
      {items.map((it, i) => (
        <div key={it.when} className="relative">
          <motion.span
            className="absolute -left-8 top-[3px] h-[15px] w-[15px] rounded-full border"
            animate={step > i ? { backgroundColor: "#7C3AED", borderColor: "#7C3AED" } : { backgroundColor: "#FFFFFF", borderColor: "#D4D0DE" }}
            transition={{ duration: 0.4 }}
          />
          <p className="text-[13px] text-tinta-2">{it.when}</p>
          <AnimatePresence>
            {step > i && (
              <motion.div className="mt-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease: EASE_OUT }}>
                {it.node}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

/* A agenda da equipe se preenchendo, com a regra que impede horário em dobro. */
function AgendaDemo() {
  return (
    <div>
      <AgendaBoard className="!shadow-card" label="hoje" />
      <p className="mt-4 text-center text-[13.5px] leading-snug text-tinta-2">Expediente menos o que já está marcado: só o horário livre aparece para o cliente.</p>
    </div>
  );
}
