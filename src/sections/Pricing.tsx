import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "@phosphor-icons/react";
import { INCLUDED, PRICE, pushEvent } from "../data/site";
import { calcResults, useCalc } from "../lib/calc-store";
import { Counter, Reveal, SlotLabel, SplitWords } from "../components/motion";
import { PrimaryCta } from "../components/cta";

type Billing = "mensal" | "anual";

/* Preço simples, sem letra miúda. Alternar mensal/anual anima o número (evento pricing_toggle). */
export function Pricing() {
  const [billing, setBilling] = useState<Billing>("mensal");
  const yearly = billing === "anual";
  const calc = useCalc();
  const { payback } = calcResults(calc);

  const choose = (b: Billing) => {
    if (b === billing) return;
    setBilling(b);
    pushEvent("pricing_toggle", { billing: b });
  };

  return (
    <section id="preco" className="relative overflow-hidden bg-roxo-900 py-24 text-white sm:py-32">
      <div className="glow pointer-events-none absolute -left-40 top-0 h-[620px] w-[620px] [--glow:124_58_237] [--glow-a:0.55]" />
      <div className="glow pointer-events-none absolute -right-32 bottom-0 h-[420px] w-[420px] [--glow:255_225_77] [--glow-a:0.12]" />
      <div className="relative mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)] gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:px-8">
        <div className="min-w-0">
          <SlotLabel time="11:00" tone="dark">
            Preço
          </SlotLabel>
          <h2 className="font-display mt-5 text-4xl font-extrabold leading-[1.02] tracking-tightest sm:text-5xl lg:text-6xl">
            <SplitWords text="Se paga com ==os horários que você salva.==" wordClassName="text-white" dark />
          </h2>
          <Reveal>
            <p className="mt-5 max-w-md text-[17px] leading-relaxed text-roxo-100">
              Plano único, com tudo incluso. Um ou dois horários salvos no mês já pagam o plano. Teste {PRICE.trialDays} dias grátis, sem cartão de crédito, sem fidelidade e sem multa para cancelar.
            </p>
          </Reveal>
        </div>

        <Reveal className="min-w-0" delay={0.1}>
          <div className="rounded-[28px] bg-white p-6 text-tinta shadow-lift sm:p-9">
            {/* Alternar mensal/anual */}
            <div role="radiogroup" aria-label="Forma de pagamento" className="relative grid grid-cols-2 rounded-full bg-roxo-100 p-1">
              <motion.span
                className="absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-white shadow-soft"
                animate={{ x: yearly ? "100%" : "0%" }}
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
              {(["mensal", "anual"] as Billing[]).map((b) => (
                <button
                  key={b}
                  type="button"
                  role="radio"
                  aria-checked={billing === b}
                  onClick={() => choose(b)}
                  className={`relative z-10 flex h-11 items-center justify-center gap-2 rounded-full text-[15px] font-semibold capitalize transition-colors ${billing === b ? "text-tinta" : "text-tinta-2"}`}
                >
                  {b}
                  {b === "anual" && <span className="hidden rounded-full bg-marca px-2 py-0.5 text-[11px] font-bold normal-case text-tinta min-[400px]:inline-block">2 meses grátis</span>}
                </button>
              ))}
            </div>

            <p className="mt-2 text-center text-[12.5px] font-semibold text-tinta-2 min-[400px]:hidden">
              No anual, <span className="mk">2 meses saem grátis</span>.
            </p>

            <div className="mt-8">
              <p className="flex flex-wrap items-baseline gap-x-2">
                <span className="font-display text-2xl font-bold text-tinta-2">R$</span>
                <span className="font-display text-[4.2rem] font-extrabold leading-none tracking-tightest text-tinta sm:text-[5rem]">
                  <Counter to={yearly ? PRICE.yearly : PRICE.monthly} decimals={yearly ? 0 : 2} duration={0.7} />
                </span>
                <span className="text-lg font-semibold text-tinta-2">/{yearly ? "ano" : "mês"}</span>
              </p>
              <p className="mt-2 h-6 text-[15px] text-tinta-2">
                {yearly ? (
                  <>
                    equivale a <b className="tnum text-roxo-700">R$ 41,58/mês</b>
                  </>
                ) : (
                  <>ou R$ 499 por ano, o equivalente a dois meses grátis</>
                )}
              </p>
            </div>

            <a href="#a-conta" className="mt-5 flex items-center gap-3 rounded-2xl bg-marca/60 px-4 py-3 text-[14px] leading-snug text-tinta transition-colors hover:bg-marca">
              <span className="font-display tnum grid h-9 w-9 shrink-0 place-items-center rounded-full bg-tinta text-[15px] font-extrabold text-marca">{payback}</span>
              <span>
                Com atendimento médio de <b className="tnum">R$ {calc.ticket.toLocaleString("pt-BR")}</b>, {payback === 1 ? "um atendimento paga" : `${payback} atendimentos pagam`} o mês.{" "}
                <span className="font-semibold text-roxo-700 underline decoration-roxo-300 underline-offset-2">Refazer a conta</span>
              </span>
            </a>

            <ul className="mt-7 grid gap-3 border-t border-linha pt-7">
              {INCLUDED.map((t) => (
                <li key={t} className="flex gap-3 text-[15px] text-tinta">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-roxo-600 text-white">
                    <Check weight="bold" className="h-3 w-3" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col items-start gap-3">
              <PrimaryCta location="preco">Começar teste grátis</PrimaryCta>
              <p className="text-[13px] text-tinta-2">{PRICE.trialDays} dias grátis · sem cartão · cancele quando quiser</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
