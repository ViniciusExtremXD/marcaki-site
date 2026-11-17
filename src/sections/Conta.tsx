import { useMemo, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarX, ChatCircleDots, UserMinus } from "@phosphor-icons/react";
import { CALC, CHAOS_MESSAGES, PAINS, PRICE, pushEvent } from "../data/site";
import { calcResults, setCalc, useCalc, type CalcValues } from "../lib/calc-store";
import { Counter, EASE_OUT, Reveal, SlotLabel, SNAP, SplitWords, useCycle } from "../components/motion";
import { PrimaryCta } from "../components/cta";

const ICONS = { parado: ChatCircleDots, vazio: CalendarX, desiste: UserMinus } as const;

/*
 * A dor em dinheiro: as três perdas da agenda no improviso e uma calculadora com os números do próprio visitante.
 * Nada de estatística inventada: o resultado é só a conta, com as premissas escritas logo abaixo.
 */
export function Conta() {
  return (
    <section id="a-conta" className="relative overflow-hidden bg-roxo-900 py-24 text-white sm:py-32">
      <div className="glow pointer-events-none absolute -right-48 -top-40 h-[640px] w-[640px] [--glow:124_58_237] [--glow-a:0.5]" />
      <div className="glow pointer-events-none absolute -left-40 bottom-0 h-[460px] w-[460px] [--glow:220_38_38] [--glow-a:0.12]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <SlotLabel time="08:30" tone="dark">
            A conta
          </SlotLabel>
          <h2 className="font-display mt-5 text-4xl font-extrabold leading-[1.02] tracking-tightest sm:text-5xl lg:text-6xl">
            <SplitWords text="Agenda no improviso ==custa dinheiro.==" wordClassName="text-white" dark />
          </h2>
          <Reveal>
            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-roxo-100">Custa todo dia, em três lugares. Coloque os números do seu negócio e veja quanto escapa por mês.</p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-14">
          <div className="min-w-0">
            <ol className="grid gap-6">
              {PAINS.map((p, i) => {
                const Icon = ICONS[p.id as keyof typeof ICONS];
                return (
                  <Reveal as="li" key={p.id} delay={i * 0.1} className="flex gap-4">
                    <motion.span
                      className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/10 text-marca"
                      initial={{ rotate: 0 }}
                      whileInView={{ rotate: [0, -14, 11, -7, 0] }}
                      viewport={{ once: true, margin: "0px 0px -20% 0px" }}
                      transition={{ duration: 0.7, delay: 0.3 + i * 0.12 }}
                    >
                      <Icon weight="duotone" className="h-6 w-6" />
                    </motion.span>
                    <div className="min-w-0">
                      <h3 className="font-display text-xl font-bold tracking-tight sm:text-2xl">{p.title}</h3>
                      <p className="mt-1.5 text-[15.5px] leading-relaxed text-roxo-100">{p.text}</p>
                    </div>
                  </Reveal>
                );
              })}
            </ol>
            <Reveal delay={0.15}>
              <ChaosPanel />
            </Reveal>
          </div>

          <div className="min-w-0">
            <Reveal delay={0.1}>
              <Calculator />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* As mensagens chegando sem parar (o inimigo da marca). */
function ChaosPanel() {
  const ref = useRef<HTMLDivElement>(null);
  const times = useMemo(() => [...CHAOS_MESSAGES.map(() => 900), 2600], []);
  const step = useCycle(ref, times);
  const shown = CHAOS_MESSAGES.slice(0, step);
  return (
    <div ref={ref} className="relative mt-8 h-[262px] overflow-hidden rounded-2xl bg-white p-3 text-tinta shadow-lift">
      <div className="flex items-center justify-between border-b border-linha pb-2.5">
        <p className="flex items-center gap-2 text-[13px] font-semibold">
          <ChatCircleDots weight="fill" className="h-5 w-5 text-tinta-3" /> Conversas, enquanto você atende
        </p>
        <motion.span key={shown.length} initial={{ scale: 1.5 }} animate={{ scale: 1 }} transition={SNAP} className="tnum grid h-6 min-w-6 place-items-center rounded-full bg-furo px-1.5 text-[11px] font-bold text-white">
          {shown.length}
        </motion.span>
      </div>
      <div className="mt-2 flex flex-col-reverse gap-1">
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
                  <b className="truncate text-[13px]">{m.who}</b>
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

const brl = (v: number) => v.toLocaleString("pt-BR", { maximumFractionDigits: 0 });

function Calculator() {
  const v = useCalc();
  const r = calcResults(v);
  const touched = useRef(false);

  const change = (k: keyof CalcValues, value: number) => {
    setCalc({ [k]: value });
    if (!touched.current) {
      touched.current = true;
      pushEvent("calculator_use", { field: k });
    }
  };

  return (
    <div className="rounded-[28px] bg-white p-5 text-tinta shadow-lift sm:p-8">
      <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-roxo-700">Calculadora</p>
      <h3 className="font-display mt-2 text-2xl font-bold tracking-tight sm:text-[1.75rem]">Quanto escapa da sua agenda por mês?</h3>

      <div className="mt-6 grid gap-6">
        <Slider label="Valor médio de um atendimento" value={v.ticket} min={20} max={300} step={5} format={(n) => `R$ ${brl(n)}`} onChange={(n) => change("ticket", n)} />
        <Slider label="Faltas e desmarcações em cima da hora, por semana" value={v.noShows} min={0} max={15} step={1} format={(n) => `${n}`} onChange={(n) => change("noShows", n)} />
        <Slider label="Mensagens perguntando horário, por dia" value={v.chats} min={0} max={60} step={1} format={(n) => `${n}`} onChange={(n) => change("chats", n)} />
      </div>

      <MonthGrid noShows={v.noShows} />

      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-furo/[0.07] p-4">
          <p className="font-display text-[1.7rem] font-extrabold leading-none tracking-tight text-furo min-[400px]:text-3xl sm:text-[2.4rem]">
            R$&nbsp;<Counter to={r.lostMoney} duration={0.6} />
          </p>
          <p className="mt-2 text-[13px] leading-snug text-tinta-2">por mês em horários que ficaram vazios</p>
        </div>
        <div className="rounded-2xl bg-roxo-50 p-4">
          <p className="font-display text-[1.7rem] font-extrabold leading-none tracking-tight text-roxo-700 min-[400px]:text-3xl sm:text-[2.4rem]">
            <Counter to={Math.round(r.lostHours)} duration={0.6} />
            &nbsp;h
          </p>
          <p className="mt-2 text-[13px] leading-snug text-tinta-2">por mês trocando mensagem para marcar</p>
        </div>
      </div>

      <div className="mt-3 rounded-2xl bg-marca p-4 sm:p-5">
        <p className="text-[15px] leading-snug text-tinta sm:text-base">
          O Marcaki custa <b className="tnum">R$ 49,90</b> por mês. Com atendimento médio de <b className="tnum">R$ {brl(v.ticket)}</b>,{" "}
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.b key={r.payback} className="inline-block" initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} transition={{ duration: 0.35, ease: EASE_OUT }}>
              {r.payback === 1 ? "um atendimento a mais já paga o mês." : `${r.payback} atendimentos a mais já pagam o mês.`}
            </motion.b>
          </AnimatePresence>
        </p>
      </div>

      <div className="mt-6">
        <PrimaryCta location="a_conta">Parar de perder horário</PrimaryCta>
      </div>

      <p className="mt-5 text-[12px] leading-relaxed text-tinta-3">
        Conta com {CALC.weeksPerMonth} semanas, {CALC.workDaysPerMonth / CALC.weeksPerMonth} dias de trabalho por semana e {CALC.minutesPerChat} minutos por conversa. O Marcaki não acaba com toda falta: o lembrete ajuda o cliente a não esquecer, e a página tira de você a troca de mensagens para marcar. Plano de R$ {PRICE.monthly.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}/mês.
      </p>
    </div>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  format,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  format: (n: number) => string;
  onChange: (n: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <label className="block">
      <span className="flex items-end justify-between gap-3">
        <span className="text-[14px] font-medium leading-snug text-tinta-2">{label}</span>
        <motion.span key={value} initial={{ y: -6, opacity: 0.4 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.25 }} className="font-display tnum shrink-0 text-xl font-bold text-tinta">
          {format(value)}
        </motion.span>
      </span>
      <input
        type="range"
        className="range mt-3 w-full"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ ["--p" as string]: `${pct}%` }}
      />
    </label>
  );
}

/* O mês em horários: cada linha é uma semana; em vermelho, o horário que ficou vazio. */
const PER_WEEK = 10;
const ORDER = [3, 7, 1, 8, 5, 0, 9, 4, 2, 6];
function MonthGrid({ noShows }: { noShows: number }) {
  const shown = Math.min(noShows, PER_WEEK);
  const extra = noShows - shown;
  return (
    <div className="mt-6 rounded-2xl border border-linha bg-papel p-4">
      <div className="flex items-center justify-between gap-3 text-[12px] font-semibold text-tinta-2">
        <span>Seu mês</span>
        <span className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <i className="h-2.5 w-2.5 rounded-full bg-roxo-400" /> atendido
          </span>
          <span className="flex items-center gap-1.5">
            <i className="h-2.5 w-2.5 rounded-full bg-furo" /> vazio
          </span>
        </span>
      </div>
      <div className="mt-3 grid gap-1.5">
        {[0, 1, 2, 3].map((w) => {
          const order = [...ORDER.slice(w * 3 % PER_WEEK), ...ORDER.slice(0, (w * 3) % PER_WEEK)];
          const holes = new Set(order.slice(0, shown));
          return (
            <div key={w} className="flex items-center gap-1">
              {Array.from({ length: PER_WEEK }, (_, j) => {
                const hole = holes.has(j);
                return (
                  <motion.span
                    key={j}
                    className="h-3 flex-1 rounded-full"
                    initial={false}
                    animate={{ backgroundColor: hole ? "#DC2626" : "#A684F7", scaleY: hole ? 0.55 : 1, opacity: hole ? 1 : 0.85 }}
                    transition={{ ...SNAP, delay: (w * PER_WEEK + j) * 0.006 }}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
      {extra > 0 && <p className="tnum mt-2 text-right text-[12px] font-semibold text-furo">+{extra} por semana</p>}
    </div>
  );
}
