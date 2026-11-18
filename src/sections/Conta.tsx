import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarX, ChatCircleDots, UserMinus } from "@phosphor-icons/react";
import { CALC, PAINS, PRICE, pushEvent } from "../data/site";
import { calcResults, setCalc, useCalc, type CalcValues } from "../lib/calc-store";
import { Counter, EASE_OUT, Reveal, SectionHead } from "../components/motion";
import { PrimaryCta } from "../components/cta";

const ICONS = { parado: ChatCircleDots, vazio: CalendarX, desiste: UserMinus } as const;

/*
 * A dor em dinheiro: as três perdas da agenda no improviso e uma calculadora com os números do próprio visitante.
 * Nada de estatística inventada: o resultado é só a conta, com as premissas escritas logo abaixo.
 */
export function Conta() {
  return (
    <section id="a-conta" className="relative bg-nevoa py-24 sm:py-32 lg:py-36">
      <div className="container-x">
        <SectionHead title={["Agenda no improviso", "custa caro."]} intro="Custa todo dia, em três lugares. Coloque os números do seu negócio e veja quanto escapa por mês." />

        <div className="mt-14 grid grid-cols-[minmax(0,1fr)] gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-8">
          <ul className="lg:col-span-4">
            {PAINS.map((p, i) => {
              const Icon = ICONS[p.id as keyof typeof ICONS];
              return (
                <Reveal as="li" key={p.id} delay={i * 0.08} className="border-t border-linha py-7 first:pt-7 last:border-b">
                  <Icon weight="light" className="h-7 w-7 text-roxo-600" />
                  <h3 className="font-display mt-4 text-[1.6rem] leading-tight tracking-[-0.01em] text-tinta">{p.title}</h3>
                  <p className="mt-2 text-[15.5px] leading-relaxed text-tinta-2">{p.text}</p>
                </Reveal>
              );
            })}
          </ul>

          <Reveal className="min-w-0 lg:col-span-7 lg:col-start-6" delay={0.1}>
            <Calculator />
          </Reveal>
        </div>
      </div>
    </section>
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

  const max = Math.max(r.lostMoney, PRICE.monthly);
  const lostPct = (r.lostMoney / max) * 100;
  const pricePct = Math.max(1.5, (PRICE.monthly / max) * 100);

  return (
    <div className="rounded-[20px] border border-linha bg-white p-6 sm:p-10">
      <p className="text-[14px] text-tinta-2">Calculadora</p>
      <h3 className="font-display mt-1 text-[1.9rem] leading-tight tracking-[-0.015em] text-tinta sm:text-[2.3rem]">Quanto escapa da sua agenda por mês?</h3>

      <div className="mt-9 grid gap-7">
        <Slider label="Valor médio de um atendimento" value={v.ticket} min={20} max={300} step={5} format={(n) => `R$ ${brl(n)}`} onChange={(n) => change("ticket", n)} />
        <Slider label="Faltas e desmarcações em cima da hora, por semana" value={v.noShows} min={0} max={15} step={1} format={(n) => `${n}`} onChange={(n) => change("noShows", n)} />
        <Slider label="Mensagens perguntando horário, por dia" value={v.chats} min={0} max={60} step={1} format={(n) => `${n}`} onChange={(n) => change("chats", n)} />
      </div>

      <div className="mt-10 grid grid-cols-2 border-y border-linha">
        <div className="py-6 pr-4">
          <p className="font-display tnum text-[2.2rem] leading-none tracking-[-0.02em] text-tinta sm:text-[3.2rem]">
            R$&nbsp;<Counter to={r.lostMoney} duration={0.6} />
          </p>
          <p className="mt-3 text-[14px] leading-snug text-tinta-2">por mês em horários que ficaram vazios</p>
        </div>
        <div className="border-l border-linha py-6 pl-4 sm:pl-6">
          <p className="font-display tnum text-[2.2rem] leading-none tracking-[-0.02em] text-tinta sm:text-[3.2rem]">
            <Counter to={Math.round(r.lostHours)} duration={0.6} />
            &nbsp;h
          </p>
          <p className="mt-3 text-[14px] leading-snug text-tinta-2">por mês trocando mensagem para marcar</p>
        </div>
      </div>

      {/* Comparação: o que escapa x o que o Marcaki custa */}
      <div className="mt-8 grid gap-4">
        <Bar label="Horários vazios" value={`R$ ${brl(r.lostMoney)}`} pct={lostPct} className="bg-tinta" />
        <Bar label="Marcaki" value="R$ 49,90" pct={pricePct} className="bg-roxo-600" />
      </div>

      <p className="mt-8 text-[16px] leading-relaxed text-tinta">
        Com atendimento médio de <span className="tnum">R$ {brl(v.ticket)}</span>,{" "}
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={r.payback}
            className="inline-block font-semibold"
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -8, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
          >
            {r.payback === 1 ? "um atendimento a mais já paga o mês." : `${r.payback} atendimentos a mais já pagam o mês.`}
          </motion.span>
        </AnimatePresence>
      </p>

      <div className="mt-7">
        <PrimaryCta location="a_conta">Testar 14 dias grátis</PrimaryCta>
      </div>

      <p className="mt-6 text-[12.5px] leading-relaxed text-tinta-3">
        Conta com {CALC.weeksPerMonth} semanas, {CALC.workDaysPerMonth / CALC.weeksPerMonth} dias de trabalho por semana e {CALC.minutesPerChat} minutos por conversa. O Marcaki não acaba com toda falta: o lembrete ajuda o cliente a não esquecer, e a página tira de você a troca de mensagens para marcar.
      </p>
    </div>
  );
}

function Bar({ label, value, pct, className }: { label: string; value: string; pct: number; className: string }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3 text-[13.5px]">
        <span className="text-tinta-2">{label}</span>
        <span className="tnum font-medium text-tinta">{value}</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-nevoa">
        <motion.div className={`h-full rounded-full ${className}`} initial={false} animate={{ width: `${pct}%` }} transition={{ duration: 0.7, ease: EASE_OUT }} />
      </div>
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
      <span className="flex items-end justify-between gap-4">
        <span className="text-[15px] leading-snug text-tinta-2">{label}</span>
        <span className="font-display tnum shrink-0 text-[1.6rem] leading-none text-tinta">{format(value)}</span>
      </span>
      <input
        type="range"
        className="range mt-4 w-full"
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
