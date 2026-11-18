import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PRICE } from "../data/site";
import { EASE_OUT, Lines, ParallaxImage } from "../components/motion";
import { DemoCta, PrimaryCta } from "../components/cta";
import { BookingFlow, ChatBubble, PhoneFrame } from "../components/product";

const FACTS = [
  { value: "R$ 49,90", label: "por mês. Plano único, com tudo incluso." },
  { value: `${PRICE.trialDays} dias`, label: "grátis para testar, sem cartão de crédito." },
  { value: `${PRICE.freeMessages}`, label: "mensagens de WhatsApp por mês inclusas." },
  { value: "Sem fidelidade", label: "Cancele quando quiser, sem multa." },
];

/*
 * Topo: título editorial em duas linhas, foto grande de quem atende e o produto funcionando por cima.
 * É o único "momento" orquestrado do site: as linhas sobem, a foto se abre e o celular entra.
 */
export function Hero({ ready }: { ready: boolean }) {
  const [step, setStep] = useState(0);
  const onStep = useCallback((s: number) => setStep(s), []);
  const confirmed = step === 6;

  return (
    <section id="topo" className="relative pt-[68px] lg:pt-[76px]">
      <div className="container-x pt-12 sm:pt-16 lg:pt-20">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-12 lg:items-end">
          <h1 className="font-display text-[2.9rem] font-normal leading-[1] tracking-[-0.025em] text-tinta min-[400px]:text-[3.3rem] sm:text-7xl lg:col-span-8 lg:text-[5.2rem] xl:text-[5.8rem]">
            <Lines lines={["Sua agenda enche", "sozinha. Você", "só atende."]} immediate={ready} delay={0.1} />
          </h1>
          <motion.div
            className="lg:col-span-4 lg:pb-3"
            initial={{ opacity: 0, y: 14 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 1, delay: 0.45, ease: EASE_OUT }}
          >
            <p className="text-pretty text-[17px] leading-relaxed text-tinta-2">
              Página de agendamento própria para salões, barbearias e clínicas de estética. O cliente marca pelo link a qualquer hora e recebe confirmação e lembrete no WhatsApp.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <PrimaryCta location="hero" />
              <DemoCta location="hero">Ver exemplo</DemoCta>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Foto e produto */}
      <div className="container-x mt-12 lg:mt-16">
        <div className="relative pb-[170px] sm:pb-[150px] lg:pb-[110px]">
          <motion.div
            initial={{ clipPath: "inset(10% 5% 0% 5% round 20px)", opacity: 0.5 }}
            animate={ready ? { clipPath: "inset(0% 0% 0% 0% round 20px)", opacity: 1 } : undefined}
            transition={{ duration: 1.4, delay: 0.2, ease: EASE_OUT }}
          >
            <ParallaxImage
              src="salao"
              alt="Cabeleireira finalizando uma escova em uma cliente"
              eager
              amount={5}
              position="center 35%"
              className="aspect-[3/4] rounded-[20px] bg-nevoa min-[480px]:aspect-[4/3] lg:aspect-[21/9]"
              sizes="(min-width: 1240px) 1180px, 100vw"
            />
          </motion.div>

          <div className="absolute bottom-0 left-1/2 w-[200px] -translate-x-1/2 sm:w-[230px] lg:left-auto lg:right-16 lg:w-[250px] lg:translate-x-0">
            <motion.div initial={{ opacity: 0, y: 60 }} animate={ready ? { opacity: 1, y: 0 } : undefined} transition={{ duration: 1.2, delay: 0.6, ease: EASE_OUT }}>
              <PhoneFrame>
                <BookingFlow onStep={onStep} />
              </PhoneFrame>
            </motion.div>
          </div>

          <div className="pointer-events-none absolute bottom-[190px] right-[calc(4rem+250px+28px)] hidden w-[270px] lg:block">
            <AnimatePresence>
              {confirmed && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8, transition: { duration: 0.3 } }}
                  transition={{ duration: 0.6, delay: 0.4, ease: EASE_OUT }}
                >
                  <ChatBubble title="WhatsApp · confirmação" time="agora">
                    Oi, Ana! Seu horário está confirmado: escova com a Maria, <span className="tnum">qui 19/11 às 15:15</span>.
                  </ChatBubble>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Condições, como num quadro de tarifas */}
        <dl className="grid grid-cols-2 border-t border-linha lg:grid-cols-4">
          {FACTS.map((f, i) => (
            <div
              key={f.value}
              className={`py-7 lg:py-9 ${i % 2 === 1 ? "border-l border-linha pl-4 sm:pl-6" : "pr-4"} ${i >= 2 ? "border-t border-linha lg:border-t-0" : ""} ${
                i === 2 ? "lg:border-l lg:pl-6" : ""
              } lg:pr-6`}
            >
              <dt className="font-display text-[1.6rem] leading-tight tracking-[-0.01em] text-tinta sm:text-[2rem]">{f.value}</dt>
              <dd className="mt-2 text-[14px] leading-snug text-tinta-2">{f.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
