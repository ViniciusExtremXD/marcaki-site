import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useTransform, type MotionValue } from "framer-motion";
import { ArrowRight, Check, CheckCircle, DeviceMobile, Headset, LinkSimple, Moon, ShieldCheck, Storefront } from "@phosphor-icons/react";
import { EXTRAS, SOLUTIONS } from "../data/site";
import { useElementProgress } from "../lib/scroll-progress";
import { EASE_OUT, Reveal, SlotLabel, SNAP, SplitWords, useCycle } from "../components/motion";
import { AgendaBoard, ConfirmationBubble, ReminderBubble } from "../components/product";
import { PrimaryCta } from "../components/cta";

type Tone = "light" | "dark" | "lavanda";

const ROWS: { key: keyof typeof SOLUTIONS; tone: Tone; Demo: () => React.ReactElement }[] = [
  { key: "selfBooking", tone: "light", Demo: NightBookings },
  { key: "reminders", tone: "dark", Demo: ReminderTimeline },
  { key: "agenda", tone: "lavanda", Demo: AgendaDemo },
];

/*
 * Como resolve: cada cartão risca a dor que resolve (vinda da seção "A conta") e mostra o produto funcionando.
 * No desktop os cartões se empilham durante a rolagem (sticky) e o de baixo encolhe um pouco.
 */
export function Solucao() {
  const listRef = useRef<HTMLDivElement>(null);
  const progress = useElementProgress(listRef, ["start 20%", "end end"]);
  const lg = useIsLg();

  return (
    <section id="solucao" className="relative bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <SlotLabel time="09:00">Como o Marcaki resolve</SlotLabel>
          <h2 className="font-display mt-5 text-4xl font-extrabold leading-[1.02] tracking-tightest text-tinta sm:text-5xl lg:text-6xl">
            <SplitWords text="Menos mensagem, menos falta, ==mais horário vendido.==" />
          </h2>
          <Reveal>
            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-tinta-2">Cada parte do Marcaki existe para fechar uma dessas contas. Sem configurar nada à parte.</p>
          </Reveal>
        </div>

        <div ref={listRef} className="relative mt-14 grid gap-6 lg:gap-10">
          {ROWS.map((row, i) => (
            <StackCard key={row.key} i={i} n={ROWS.length} progress={progress} active={lg} tone={row.tone}>
              <Row data={SOLUTIONS[row.key]} tone={row.tone} Demo={row.Demo} />
            </StackCard>
          ))}
        </div>

        <ul className="mt-10 grid grid-cols-[minmax(0,1fr)] gap-3 min-[480px]:grid-cols-2 lg:grid-cols-4">
          {EXTRAS.map((e, i) => {
            const Icon = { pagina: Storefront, semapp: DeviceMobile, suporte: Headset, lgpd: ShieldCheck }[e.id] ?? Check;
            return (
              <Reveal as="li" key={e.id} delay={i * 0.07}>
                <div className="group flex h-full items-center gap-3 rounded-2xl border border-linha bg-papel px-4 py-4 transition-all duration-300 hover:-translate-y-1 hover:border-roxo-300 hover:shadow-card">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-roxo-100 text-roxo-700 transition-colors duration-300 group-hover:bg-roxo-600 group-hover:text-white">
                    <Icon weight="duotone" className="h-5 w-5" />
                  </span>
                  <span className="text-[14.5px] font-semibold leading-snug text-tinta">{e.title}</span>
                </div>
              </Reveal>
            );
          })}
        </ul>

        <Reveal className="mt-12 flex justify-center">
          <PrimaryCta location="solucao">Quero minha agenda assim</PrimaryCta>
        </Reveal>
      </div>
    </section>
  );
}

function useIsLg() {
  const [lg, setLg] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const on = () => setLg(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return lg;
}

const TONES: Record<Tone, string> = {
  light: "border border-linha bg-papel text-tinta",
  dark: "bg-roxo-900 text-white",
  lavanda: "bg-roxo-100 text-tinta",
};

function StackCard({ i, n, progress, active, tone, children }: { i: number; n: number; progress: MotionValue<number>; active: boolean; tone: Tone; children: React.ReactNode }) {
  const target = 1 - (n - 1 - i) * 0.045;
  const scale = useTransform(progress, [i / n, 1], [1, target]);
  const shade = useTransform(progress, [i / n, 1], [0, (n - 1 - i) * 0.1]);
  return (
    <div className="lg:sticky" style={{ top: `calc(6.5rem + ${i * 1.4}rem)` }}>
      <Reveal y={48}>
        <motion.div className={`relative origin-top overflow-hidden rounded-[32px] ${TONES[tone]}`} style={active ? { scale } : undefined}>
          {children}
          {active && <motion.div className="pointer-events-none absolute inset-0 bg-roxo-950" style={{ opacity: shade }} />}
        </motion.div>
      </Reveal>
    </div>
  );
}

function Row({ data, tone, Demo }: { data: (typeof SOLUTIONS)[keyof typeof SOLUTIONS]; tone: Tone; Demo: () => React.ReactElement }) {
  const dark = tone === "dark";
  return (
    <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-8 p-6 sm:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12 lg:p-12">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`text-[12px] font-semibold uppercase tracking-[0.14em] ${dark ? "text-roxo-200" : "text-tinta-3"}`}>Resolve</span>
          {data.solves.map((s, j) => (
            <Struck key={s} dark={dark} delay={0.35 + j * 0.25}>
              {s}
            </Struck>
          ))}
        </div>
        <h3 className="font-display mt-5 text-balance text-[1.9rem] font-extrabold leading-[1.04] tracking-tight sm:text-4xl lg:text-[2.6rem]">
          <SplitWords text={data.title} dark={dark} wordClassName={dark ? "text-white" : undefined} stagger={0.04} />
        </h3>
        <Reveal>
          <p className={`mt-4 text-[16.5px] leading-relaxed ${dark ? "text-roxo-100" : "text-tinta-2"}`}>{data.text}</p>
          <p className={`mt-5 flex gap-2.5 text-[15.5px] font-semibold leading-snug ${dark ? "text-white" : "text-tinta"}`}>
            <ArrowRight weight="bold" className={`mt-0.5 h-5 w-5 shrink-0 ${dark ? "text-marca" : "text-roxo-600"}`} />
            {data.gain}
          </p>
        </Reveal>
      </div>
      <div className="min-w-0">
        <Demo />
      </div>
    </div>
  );
}

/* A dor riscada: a linha vermelha passa por cima e aparece o visto. */
function Struck({ children, delay, dark }: { children: React.ReactNode; delay: number; dark: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[13px] font-semibold ${dark ? "border-white/15 text-roxo-100" : "border-linha bg-white text-tinta-2"}`}>
      <span className="relative">
        {children}
        <motion.span
          aria-hidden
          className="absolute -left-0.5 -right-0.5 top-1/2 h-[2px] origin-left rounded-full bg-furo"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "0px 0px -20% 0px" }}
          transition={{ duration: 0.5, delay, ease: EASE_OUT }}
        />
      </span>
      <motion.span
        className={`grid h-4 w-4 place-items-center rounded-full ${dark ? "bg-marca text-tinta" : "bg-ok text-white"}`}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "0px 0px -20% 0px" }}
        transition={{ ...SNAP, delay: delay + 0.4 }}
      >
        <Check weight="bold" className="h-2.5 w-2.5" />
      </motion.span>
    </span>
  );
}

/* ───────────── Demos ───────────── */

const NIGHT = [
  { clock: "23:47", day: "Quarta", who: "Ana", service: "Escova", slot: "qui, 15:15" },
  { clock: "06:12", day: "Sábado", who: "Rafa", service: "Corte masculino", slot: "sáb, 09:00" },
  { clock: "20:30", day: "Domingo", who: "Jéssica", service: "Manicure", slot: "ter, 10:30" },
];

/* O negócio fechado, a página aberta: agendamentos chegando fora do horário. */
function NightBookings() {
  const ref = useRef<HTMLDivElement>(null);
  const step = useCycle(ref, [2800, 2800, 2800]);
  const b = NIGHT[step];
  return (
    <div ref={ref} className="relative overflow-hidden rounded-3xl bg-roxo-950 p-5 text-white shadow-lift sm:p-6">
      <div className="glow pointer-events-none absolute -right-20 -top-24 h-[300px] w-[300px] [--glow:124_58_237] [--glow-a:0.6]" />
      <div className="relative flex items-start justify-between gap-3">
        <div>
          <p className="flex items-center gap-1.5 text-[12px] font-semibold text-roxo-200">
            <Moon weight="fill" className="h-4 w-4 text-marca" /> Seu negócio: fechado
          </p>
          <div className="font-display tnum mt-1 h-[3.4rem] overflow-hidden text-[3.2rem] font-extrabold leading-none tracking-tight sm:h-[4rem] sm:text-[3.8rem]">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span key={b.clock} className="block" initial={{ y: "100%" }} animate={{ y: "0%" }} exit={{ y: "-100%" }} transition={{ duration: 0.6, ease: EASE_OUT }}>
                {b.clock}
              </motion.span>
            </AnimatePresence>
          </div>
          <p className="mt-1 text-[13px] text-roxo-200">{b.day}</p>
        </div>
        <p className="flex shrink-0 items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[11.5px] font-semibold">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-[#4ADE80]" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#4ADE80]" />
          </span>
          Página aberta
        </p>
      </div>

      <div className="relative mt-5 flex items-center gap-2 rounded-xl bg-white/[0.06] px-3 py-2 text-[12.5px] text-roxo-100">
        <LinkSimple weight="bold" className="h-4 w-4 shrink-0 text-marca" />
        <span className="truncate">marcaki.app/t/seu-negocio</span>
      </div>

      <div className="relative mt-3 h-[92px]">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={b.who}
            className="absolute inset-x-0 top-0 flex items-center gap-3 rounded-2xl bg-white p-3.5 text-tinta shadow-card"
            initial={{ y: 40, opacity: 0, scale: 0.94 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -30, opacity: 0, scale: 0.96 }}
            transition={SNAP}
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-roxo-600 text-white">
              <CheckCircle weight="fill" className="h-6 w-6" />
            </span>
            <span className="min-w-0">
              <span className="block text-[11.5px] font-semibold uppercase tracking-wider text-ok">Novo agendamento</span>
              <span className="block truncate text-[14.5px] font-semibold">
                {b.who} · {b.service}
              </span>
              <span className="tnum block text-[13px] text-tinta-2">{b.slot}</span>
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
      <p className="relative text-[12px] text-roxo-200">Nomes ilustrativos.</p>
    </div>
  );
}

/* Do agendamento ao cliente na cadeira, sem você digitar nada. */
function ReminderTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const step = useCycle(ref, [500, 1500, 1500, 3400]);
  const items = [
    { when: "Ao marcar", node: <ConfirmationBubble className="!max-w-none" /> },
    { when: "Antes do horário", node: <ReminderBubble className="!max-w-none" /> },
    {
      when: "Qui, 15:15",
      node: (
        <div className="inline-flex items-center gap-2 rounded-full bg-marca px-3.5 py-2 text-[14px] font-bold text-tinta shadow-card">
          <Check weight="bold" className="h-4 w-4" /> Ana na cadeira, no horário
        </div>
      ),
    },
  ];
  return (
    <div ref={ref} className="relative grid min-h-[380px] content-start gap-4 pl-7">
      <span className="absolute bottom-3 left-[9px] top-3 w-[2px] rounded-full bg-white/15" />
      <motion.span
        className="absolute left-[9px] top-3 w-[2px] origin-top rounded-full bg-marca"
        animate={{ height: `${Math.max(0, step - 1) * 42}%` }}
        transition={{ duration: 0.8, ease: EASE_OUT }}
      />
      {items.map((it, i) => (
        <div key={it.when} className="relative">
          <motion.span
            className="absolute -left-7 top-1 grid h-5 w-5 place-items-center rounded-full border-2"
            animate={step > i ? { backgroundColor: "#FFE14D", borderColor: "#FFE14D", scale: 1 } : { backgroundColor: "#2A1065", borderColor: "rgba(255,255,255,0.25)", scale: 0.8 }}
            transition={SNAP}
          />
          <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-roxo-200">{it.when}</p>
          <AnimatePresence>
            {step > i && (
              <motion.div className="mt-2" initial={{ opacity: 0, y: 16, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }} transition={SNAP}>
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
      <AgendaBoard className="shadow-lift" label="hoje" />
      <p className="mt-4 rounded-2xl bg-white px-4 py-3 text-[13.5px] leading-snug text-tinta-2 shadow-soft">
        <b className="text-tinta">Expediente</b> − <b className="text-roxo-700">já marcado</b> = <b className="text-tinta">só o que está livre</b> aparece para o cliente.
      </p>
    </div>
  );
}
