import React, { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Robot, ShieldCheck, UserCircle, Headset, ArrowRight } from "@phosphor-icons/react";
import { FEATURES, PRICE } from "../data/site";
import { Reveal, SlotLabel, SplitWords, SNAP, useCycle } from "../components/motion";
import { AgendaBoard, ConfirmationBubble, ReminderBubble } from "../components/product";

/* Recursos em grade "bento": cada cartão mostra o recurso funcionando, não um ícone genérico. */
export function Features() {
  return (
    <section id="recursos" className="relative bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <SlotLabel time="10:00">O que vem junto</SlotLabel>
          <h2 className="font-display mt-5 text-4xl font-extrabold leading-[1.02] tracking-tightest text-tinta sm:text-5xl lg:text-6xl">
            <SplitWords text="Tudo incluso. ==Nada para configurar== à parte." />
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-4 md:grid-cols-6">
          {/* WhatsApp */}
          <Reveal className="min-w-0 md:col-span-4">
            <Card dark>
              <div className="grid h-full grid-cols-[minmax(0,1fr)] gap-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] sm:items-center">
                <div className="min-w-0">
                  <Tag dark>Mensagens automáticas</Tag>
                  <h3 className="font-display mt-4 text-2xl font-bold tracking-tight sm:text-3xl">{FEATURES.whatsapp.title}</h3>
                  <p className="mt-3 text-[15.5px] leading-relaxed text-roxo-100">{FEATURES.whatsapp.text}</p>
                  <p className="mt-5 inline-flex items-baseline gap-2 rounded-xl bg-white/10 px-3 py-2">
                    <span className="font-display tnum text-3xl font-extrabold text-marca">{PRICE.freeMessages}</span>
                    <span className="text-[13px] text-roxo-100">envios grátis por mês no plano</span>
                  </p>
                </div>
                <MessageStack />
              </div>
            </Card>
          </Reveal>

          {/* Horários reais */}
          <Reveal className="min-w-0 md:col-span-2" delay={0.08}>
            <Card>
              <Tag>Sem conflito</Tag>
              <h3 className="font-display mt-4 text-2xl font-bold tracking-tight text-tinta">{FEATURES.slots.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-tinta-2">{FEATURES.slots.text}</p>
              <SlotMath />
            </Card>
          </Reveal>

          {/* Equipe */}
          <Reveal className="min-w-0 md:col-span-3">
            <Card>
              <Tag>Equipe</Tag>
              <h3 className="font-display mt-4 text-2xl font-bold tracking-tight text-tinta">{FEATURES.team.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-tinta-2">{FEATURES.team.text}</p>
              <AgendaBoard className="mt-5 !shadow-none" label="hoje" />
            </Card>
          </Reveal>

          {/* Sem conta */}
          <Reveal className="min-w-0 md:col-span-3" delay={0.08}>
            <Card>
              <Tag>Sem aplicativo</Tag>
              <h3 className="font-display mt-4 text-2xl font-bold tracking-tight text-tinta">{FEATURES.noAccount.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-tinta-2">{FEATURES.noAccount.text}</p>
              <div className="mt-5 grid gap-2 rounded-2xl border border-linha bg-papel p-4">
                <p className="text-[12px] font-semibold uppercase tracking-wider text-tinta-3">É só isso que o cliente preenche</p>
                <div className="flex items-center gap-2.5 rounded-xl border border-linha bg-white px-3 py-2.5 text-[14px] text-tinta">
                  <UserCircle className="h-5 w-5 text-tinta-3" /> Nome
                </div>
                <div className="flex items-center gap-2.5 rounded-xl border border-linha bg-white px-3 py-2.5 text-[14px] text-tinta">
                  <span className="tnum text-tinta-3">+55</span> Telefone (WhatsApp)
                </div>
                <p className="flex items-center gap-1.5 text-[12.5px] text-tinta-2">
                  <ArrowRight className="h-3.5 w-3.5" /> Conta é opcional: histórico e cancelamento pelo site.
                </p>
              </div>
            </Card>
          </Reveal>

          {/* Suporte */}
          <Reveal className="min-w-0 md:col-span-3">
            <Card>
              <Tag>Suporte</Tag>
              <h3 className="font-display mt-4 text-2xl font-bold tracking-tight text-tinta">{FEATURES.support.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-tinta-2">{FEATURES.support.text}</p>
              <div className="mt-5 grid gap-2">
                <div className="flex items-center gap-3 rounded-xl bg-roxo-50 px-3 py-2.5 text-[14px]">
                  <Robot weight="fill" className="h-5 w-5 shrink-0 text-roxo-600" />
                  <span className="min-w-0 text-tinta">Dúvida de uso: <b>resposta na hora</b></span>
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-marca/40 px-3 py-2.5 text-[14px]">
                  <Headset weight="fill" className="h-5 w-5 shrink-0 text-tinta" />
                  <span className="min-w-0 text-tinta">Precisa de gente: <b>fila humana</b></span>
                </div>
              </div>
            </Card>
          </Reveal>

          {/* LGPD */}
          <Reveal className="min-w-0 md:col-span-3" delay={0.08}>
            <Card>
              <Tag>LGPD</Tag>
              <div className="mt-4 flex items-start gap-4">
                <ShieldCheck weight="duotone" className="h-12 w-12 shrink-0 text-roxo-600" />
                <div className="min-w-0">
                  <h3 className="font-display text-2xl font-bold tracking-tight text-tinta">{FEATURES.lgpd.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-tinta-2">{FEATURES.lgpd.text}</p>
                </div>
              </div>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Card({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return <div className={`h-full rounded-3xl p-6 sm:p-8 ${dark ? "bg-roxo-900 text-white" : "border border-linha bg-papel"}`}>{children}</div>;
}

function Tag({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <span className={`inline-block rounded-full px-2.5 py-1 text-[11.5px] font-semibold uppercase tracking-[0.12em] ${dark ? "bg-white/10 text-marca" : "bg-roxo-100 text-roxo-700"}`}>
      {children}
    </span>
  );
}

/* Confirmação chega na hora; o lembrete, antes do horário. */
function MessageStack() {
  const ref = useRef<HTMLDivElement>(null);
  const step = useCycle(ref, [600, 1400, 3200]);
  return (
    <div ref={ref} className="relative grid min-h-[230px] content-center gap-3">
      <AnimatePresence>
        {step >= 1 && (
          <motion.div key="c" initial={{ opacity: 0, y: 20, scale: 0.94 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }} transition={SNAP}>
            <ConfirmationBubble />
          </motion.div>
        )}
        {step >= 2 && (
          <motion.div key="r" className="sm:ml-6" initial={{ opacity: 0, y: 20, scale: 0.94 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }} transition={SNAP}>
            <ReminderBubble />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* Expediente − já marcado = horários livres. */
function SlotMath() {
  const all = ["09:00", "09:45", "10:30", "11:15", "13:00", "13:45"];
  const taken = new Set(["09:45", "11:15"]);
  return (
    <div className="mt-5 rounded-2xl border border-linha bg-white p-4">
      <div className="grid grid-cols-3 gap-1.5">
        {all.map((t) => (
          <span
            key={t}
            className={`tnum rounded-full border py-1.5 text-center text-[12.5px] font-medium ${taken.has(t) ? "border-roxo-600 bg-roxo-600 text-white" : "border-linha text-tinta-2"}`}
          >
            {t}
          </span>
        ))}
      </div>
      <p className="mt-3 text-[12.5px] text-tinta-2">
        <b className="text-tinta">Expediente</b> − <b className="text-roxo-700">já marcado</b> = só o que está livre aparece para o cliente.
      </p>
    </div>
  );
}
