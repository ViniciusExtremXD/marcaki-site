import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "@phosphor-icons/react";
import { INCLUDED, PRICE, pushEvent } from "../data/site";
import { calcResults, useCalc } from "../lib/calc-store";
import { Counter, Lines, Reveal } from "../components/motion";
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
    <section id="preco" className="relative bg-noite py-24 text-white sm:py-32 lg:py-36">
      <div className="container-x grid grid-cols-[minmax(0,1fr)] gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="min-w-0 lg:col-span-5">
          <h2 className="font-display text-[2.35rem] font-normal leading-[1.04] tracking-[-0.02em] sm:text-5xl lg:text-[3.6rem]">
            <Lines lines={["Um preço só.", "Tudo incluso."]} />
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-[17px] leading-relaxed text-white/70">
              Sem taxa de adesão, sem fidelidade e sem multa para cancelar. Teste {PRICE.trialDays} dias grátis, sem cartão de crédito.
            </p>
            <a href="#a-conta" className="mt-10 block max-w-md border-t border-white/15 pt-6 text-[16px] leading-relaxed text-white/85 transition-colors hover:text-white">
              Com atendimento médio de <span className="tnum">R$ {calc.ticket.toLocaleString("pt-BR")}</span>,{" "}
              {payback === 1 ? "um horário salvo no mês já paga o plano." : `${payback} horários salvos no mês já pagam o plano.`}{" "}
              <span className="text-white underline decoration-white/40 underline-offset-4">Refazer a conta</span>
            </a>
          </Reveal>
        </div>

        <Reveal className="min-w-0 lg:col-span-6 lg:col-start-7" delay={0.1}>
          <div className="rounded-[20px] bg-white p-6 text-tinta sm:p-10">
            <div role="radiogroup" aria-label="Forma de pagamento" className="relative grid grid-cols-2 rounded-full border border-linha p-1">
              <motion.span
                className="absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-tinta"
                animate={{ x: yearly ? "100%" : "0%" }}
                transition={{ type: "spring", stiffness: 380, damping: 36 }}
              />
              {(["mensal", "anual"] as Billing[]).map((b) => (
                <button
                  key={b}
                  type="button"
                  role="radio"
                  aria-checked={billing === b}
                  onClick={() => choose(b)}
                  className={`relative z-10 h-10 rounded-full text-[15px] font-medium capitalize transition-colors duration-300 ${billing === b ? "text-white" : "text-tinta-2"}`}
                >
                  {b}
                </button>
              ))}
            </div>

            <div className="mt-9">
              <p className="flex flex-wrap items-baseline gap-x-2">
                <span className="font-display text-2xl text-tinta-2">R$</span>
                <span className="font-display text-[4.2rem] leading-none tracking-[-0.03em] text-tinta sm:text-[5.2rem]">
                  <Counter to={yearly ? PRICE.yearly : PRICE.monthly} decimals={yearly ? 0 : 2} duration={0.7} />
                </span>
                <span className="text-[17px] text-tinta-2">/{yearly ? "ano" : "mês"}</span>
              </p>
              <p className="mt-3 min-h-[1.5rem] text-[15px] text-tinta-2">
                {yearly ? (
                  <>
                    Equivale a <span className="tnum text-tinta">R$ 41,58 por mês</span>: dois meses grátis.
                  </>
                ) : (
                  <>Ou R$ 499 por ano, o equivalente a dois meses grátis.</>
                )}
              </p>
            </div>

            <ul className="mt-8 grid gap-3.5 border-t border-linha pt-8">
              {INCLUDED.map((t) => (
                <li key={t} className="flex gap-3 text-[15.5px] leading-snug text-tinta">
                  <Check weight="bold" className="mt-1 h-3.5 w-3.5 shrink-0 text-roxo-600" />
                  {t}
                </li>
              ))}
            </ul>

            <div className="mt-9">
              <PrimaryCta location="preco" className="w-full">
                Começar teste grátis
              </PrimaryCta>
              <p className="mt-3 text-center text-[13.5px] text-tinta-2">{PRICE.trialDays} dias grátis, sem cartão de crédito.</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
