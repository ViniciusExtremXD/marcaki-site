import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, Moon } from "@phosphor-icons/react";
import { PRICE } from "../data/site";
import { EASE_OUT, SplitWords, TiltCard, useCycle } from "../components/motion";
import { DemoCta, PrimaryCta } from "../components/cta";
import { BookingFlow, ChatBubble, PhoneFrame } from "../components/product";

/*
 * Topo: a promessa com o marca-texto e, ao lado, o produto funcionando (o cliente marca sozinho
 * e a confirmação chega no WhatsApp). Nada de ilustração genérica.
 */
export function Hero({ ready }: { ready: boolean }) {
  const [step, setStep] = useState(0);
  const onStep = useCallback((s: number) => setStep(s), []);
  const confirmed = step === 6;

  return (
    <section id="topo" className="relative overflow-hidden pb-16 pt-28 sm:pt-32 lg:pb-24 lg:pt-36">
      <div className="bg-grid mask-fade-b pointer-events-none absolute inset-0 opacity-70" />
      <div className="glow pointer-events-none absolute -right-40 top-10 h-[680px] w-[680px] [--glow:124_58_237] [--glow-a:0.16]" />
      <div className="glow pointer-events-none absolute -left-40 bottom-0 h-[480px] w-[480px] [--glow:255_225_77] [--glow-a:0.22]" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)] items-center gap-14 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-10 lg:px-8">
        <div className="min-w-0">
          <motion.p
            className="inline-flex max-w-full items-center gap-2 rounded-full border border-roxo-600/15 bg-white px-3 py-1.5 text-[12.5px] font-semibold text-roxo-700 shadow-soft"
            initial={{ opacity: 0, y: 10 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.6, ease: EASE_OUT }}
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-roxo-500" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-roxo-600" />
            </span>
            <span className="truncate">Para salões, barbearias e clínicas de estética</span>
          </motion.p>

          <h1 className="font-display mt-6 text-[2.6rem] font-extrabold leading-[0.98] tracking-tightest text-tinta min-[400px]:text-[2.95rem] sm:text-6xl lg:text-[4.6rem] xl:text-[5.1rem]">
            <SplitWords text="Sua agenda enche sozinha. ==Você só atende.==" immediate={ready} delay={0.1} />
          </h1>

          <motion.p
            className="mt-6 max-w-xl text-pretty text-[17px] leading-relaxed text-tinta-2 sm:text-lg"
            initial={{ opacity: 0, y: 16 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.8, delay: 0.55, ease: EASE_OUT }}
          >
            Seu cliente marca pelo link a qualquer hora, recebe confirmação e lembrete no WhatsApp e não esquece. Você para de perder atendimento por mensagem sem resposta, por cliente que faltou e por horário anotado errado.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.8, delay: 0.7, ease: EASE_OUT }}
          >
            <PrimaryCta location="hero" />
            <DemoCta location="hero" />
          </motion.div>

          <motion.ul
            className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-[14px] font-medium text-tinta-2"
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : undefined}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            {[`${PRICE.trialDays} dias grátis`, "Sem cartão de crédito", "Sem fidelidade", "No ar em minutos"].map((t) => (
              <li key={t} className="flex items-center gap-1.5">
                <CheckCircle weight="fill" className="h-4 w-4 shrink-0 text-roxo-600" />
                {t}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Palco do produto */}
        <motion.div
          className="relative mx-auto w-full max-w-[420px] min-w-0"
          initial={{ opacity: 0, y: 40 }}
          animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 1.1, delay: 0.3, ease: EASE_OUT }}
        >
          <TiltCard className="relative px-6 sm:px-10">
            <PhoneFrame className="max-w-[290px]">
              <BookingFlow onStep={onStep} />
            </PhoneFrame>
          </TiltCard>

          {/* Mensagem que chega quando o horário é marcado */}
          <div className="pointer-events-none absolute -right-1 top-[56%] w-[min(250px,70%)] sm:-right-6">
            <AnimatePresence>
              {confirmed && (
                <motion.div
                  initial={{ opacity: 0, y: 24, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, transition: { duration: 0.3 } }}
                  transition={{ type: "spring", stiffness: 320, damping: 22, delay: 0.5 }}
                >
                  <ChatBubble title="WhatsApp · confirmação" time="agora">
                    Oi, Ana! <b>Tá marcado</b> ✓ Escova com a Maria, <span className="tnum">qui 19/11 às 15:15</span>.
                  </ChatBubble>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Agendamentos fora do expediente, flutuando */}
          <div className="absolute -left-1 bottom-[12%] sm:-left-8">
            <NightChip />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const NIGHT = [
  { time: "23:47", text: "com o salão fechado" },
  { time: "06:12", text: "antes de você acordar" },
  { time: "Dom", text: "no seu dia de folga" },
];

/* O ganho que ninguém vê: gente marcando quando você não poderia responder. */
function NightChip() {
  const ref = useRef<HTMLDivElement>(null);
  const step = useCycle(ref, [3000, 3000, 3000]);
  const n = NIGHT[step];
  return (
    <div ref={ref} className="animate-float flex items-center gap-2 rounded-2xl border border-linha bg-white px-3 py-2 shadow-card">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-roxo-900 text-marca">
        <Moon weight="fill" className="h-4 w-4" />
      </span>
      <span className="relative block h-[30px] w-[150px] overflow-hidden text-[12px] leading-tight">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span key={n.time} className="absolute inset-0" initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -24, opacity: 0 }} transition={{ duration: 0.5, ease: EASE_OUT }}>
            <b className="block text-tinta">
              Marcado <span className="tnum">{n.time === "Dom" ? "no domingo" : `às ${n.time}`}</span>
            </b>
            <span className="text-tinta-2">{n.text}</span>
          </motion.span>
        </AnimatePresence>
      </span>
    </div>
  );
}
