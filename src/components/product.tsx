import React, { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, CheckCircle, Clock, Link as LinkIcon, InstagramLogo, WhatsappLogo, CalendarBlank, User, Phone as PhoneIcon } from "@phosphor-icons/react";
import { DEMO_BUSINESS } from "../data/site";
import { EASE_OUT, SNAP, useCycle } from "./motion";

/*
 * Mockups do produto, feitos em React (nada de print): o fluxo real da página de agendamento
 * (serviço → horário → nome e telefone → tá marcado), a mensagem de confirmação e a agenda da equipe.
 * Serviços, preços e durações são os da página de exemplo (Salão da Maria). Nomes de clientes são ilustrativos.
 */

/* ───────────── Moldura de celular ───────────── */

export function PhoneFrame({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative mx-auto aspect-[9/18.6] w-full max-w-[300px] rounded-[44px] bg-tinta p-[10px] shadow-phone ${className ?? ""}`}>
      <div className="absolute left-1/2 top-[18px] z-20 h-[22px] w-[86px] -translate-x-1/2 rounded-full bg-tinta" />
      <div className="relative h-full w-full overflow-hidden rounded-[35px] bg-white">{children}</div>
    </div>
  );
}

/* Topo da página de agendamento (como no app: selo do tipo, nome, frase). */
function BizHeader({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`border-b border-linha px-4 ${compact ? "pb-3 pt-11" : "pb-4 pt-12"}`}>
      <div className="flex items-center gap-2">
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-roxo-600 text-[13px] font-bold text-white">S</span>
        <span className="rounded-full bg-roxo-100 px-2 py-0.5 text-[10px] font-semibold text-roxo-700">{DEMO_BUSINESS.type}</span>
      </div>
      <p className="font-display mt-2 text-[19px] font-bold leading-tight tracking-tight text-tinta">{DEMO_BUSINESS.name}</p>
      {!compact && <p className="text-[11px] text-tinta-2">{DEMO_BUSINESS.tagline}</p>}
    </div>
  );
}

const SLOTS = ["09:00", "09:45", "10:30", "11:15", "13:00", "13:45", "14:30", "15:15", "16:00"];
const TAKEN = new Set(["09:00", "10:30", "11:15", "14:30"]);
const CHOSEN = "15:15";

function Tap({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.span
          className="pointer-events-none absolute right-3 top-1/2 h-7 w-7 -translate-y-1/2 rounded-full bg-roxo-600/25"
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: [0.4, 1.2, 1], opacity: [0, 1, 0.8] }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      )}
    </AnimatePresence>
  );
}

/* ───────────── Telas do fluxo do cliente ───────────── */

function ScreenService({ picked }: { picked: boolean }) {
  return (
    <div className="px-4 pt-3">
      <p className="text-[11px] font-semibold text-tinta">1. Qual serviço você quer?</p>
      <div className="mt-2 grid gap-1.5">
        {DEMO_BUSINESS.services.map((s) => {
          const on = picked && s.name === "Escova";
          return (
            <div
              key={s.name}
              className={`relative rounded-xl border px-3 py-2 transition-colors duration-300 ${on ? "border-roxo-600 bg-roxo-50" : "border-linha bg-white"}`}
            >
              <p className="text-[12px] font-semibold text-tinta">{s.name}</p>
              <p className="tnum text-[10.5px] text-tinta-2">
                {s.duration} · {s.price}
              </p>
              {s.name === "Escova" && <Tap show={picked} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ScreenTime({ picked }: { picked: boolean }) {
  return (
    <div className="px-4 pt-3">
      <div className="flex items-center justify-between rounded-xl border border-roxo-600 bg-roxo-50 px-3 py-1.5">
        <span className="text-[11.5px] font-semibold text-tinta">Escova</span>
        <span className="tnum text-[10.5px] text-tinta-2">45 min · R$ 60,00</span>
      </div>
      <p className="mt-3 text-[11px] font-semibold text-tinta">2. Escolha o dia e o horário</p>
      <div className="no-scrollbar mt-2 flex gap-1.5 overflow-hidden">
        {[
          ["Qua", "18"],
          ["Qui", "19"],
          ["Sex", "20"],
          ["Sáb", "21"],
        ].map(([d, n], i) => (
          <div key={n} className={`grid w-[52px] shrink-0 place-items-center rounded-xl border py-1.5 ${i === 1 ? "border-tinta bg-tinta text-white" : "border-linha text-tinta-2"}`}>
            <span className="text-[9.5px] uppercase">{d}</span>
            <span className="tnum font-display text-[15px] font-bold leading-none">{n}</span>
          </div>
        ))}
      </div>
      <div className="mt-2.5 grid grid-cols-3 gap-1.5">
        {SLOTS.map((t) => {
          const taken = TAKEN.has(t);
          const on = picked && t === CHOSEN;
          return (
            <motion.span
              key={t}
              animate={on ? { scale: [1, 1.12, 1] } : { scale: 1 }}
              transition={SNAP}
              className={`tnum rounded-full border py-1.5 text-center text-[11px] font-medium transition-colors duration-300 ${
                taken ? "border-roxo-50 bg-roxo-50 text-roxo-300 line-through" : on ? "border-marca bg-marca text-tinta" : "border-linha text-tinta-2"
              }`}
            >
              {t}
            </motion.span>
          );
        })}
      </div>
      <p className="mt-2 flex items-center gap-1 text-[9.5px] text-tinta-3">
        <Clock className="h-3 w-3" /> Só aparecem os horários livres de verdade
      </p>
    </div>
  );
}

function ScreenForm({ typed }: { typed: boolean }) {
  return (
    <div className="px-4 pt-3">
      <div className="rounded-xl border border-linha bg-roxo-50/60 px-3 py-2">
        <p className="text-[11.5px] font-semibold text-tinta">Escova · Qui, 19 nov · 15:15</p>
        <p className="text-[10px] text-tinta-2">45 min · R$ 60,00</p>
      </div>
      <p className="mt-3 text-[11px] font-semibold text-tinta">3. Seu nome e telefone</p>
      <div className="mt-2 grid gap-2">
        <Field icon={<User className="h-3.5 w-3.5" />} value={typed ? "Ana" : ""} placeholder="Nome" />
        <Field icon={<PhoneIcon className="h-3.5 w-3.5" />} value={typed ? "(11) 9 •••• ••21" : ""} placeholder="Telefone (WhatsApp)" />
      </div>
      <p className="mt-2 text-[9.5px] text-tinta-3">Sem aplicativo e sem criar conta.</p>
      <div className={`mt-4 rounded-xl py-2.5 text-center text-[12.5px] font-semibold transition-colors duration-300 ${typed ? "bg-roxo-600 text-white" : "bg-roxo-100 text-roxo-300"}`}>
        Confirmar agendamento
      </div>
    </div>
  );
}

function Field({ icon, value, placeholder }: { icon: React.ReactNode; value: string; placeholder: string }) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-linha bg-white px-3 py-2 text-[11.5px]">
      <span className="text-tinta-3">{icon}</span>
      {value ? (
        <motion.span initial={{ clipPath: "inset(0 100% 0 0)" }} animate={{ clipPath: "inset(0 0% 0 0)" }} transition={{ duration: 0.7, ease: "linear" }} className="tnum text-tinta">
          {value}
        </motion.span>
      ) : (
        <span className="text-tinta-3">{placeholder}</span>
      )}
    </div>
  );
}

function ScreenDone() {
  return (
    <div className="flex h-full flex-col items-center px-5 pt-8 text-center">
      <motion.span
        className="grid h-16 w-16 place-items-center rounded-full bg-roxo-600 text-white shadow-roxo"
        initial={{ scale: 1.8, opacity: 0, rotate: -12 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 380, damping: 16 }}
      >
        <Check weight="bold" className="h-8 w-8" />
      </motion.span>
      <p className="font-display mt-4 text-[24px] font-extrabold leading-none tracking-tight text-tinta">
        <span className="mk">Tá marcado.</span>
      </p>
      <p className="mt-2 text-[11px] leading-snug text-tinta-2">Mandamos a confirmação no seu WhatsApp.</p>
      <div className="mt-4 w-full rounded-xl border border-linha p-3 text-left">
        <p className="text-[11.5px] font-semibold text-tinta">Escova com a Maria</p>
        <p className="tnum text-[10.5px] text-tinta-2">Qui, 19 nov · 15:15 · 45 min</p>
        <p className="text-[10.5px] text-tinta-2">{DEMO_BUSINESS.name}</p>
      </div>
    </div>
  );
}

/* ───────────── Fluxo completo, em loop, só quando visível ───────────── */

const FLOW_TIMES = [1300, 1100, 1500, 1300, 1100, 1700, 3400];
// 0 serviços · 1 toca Escova · 2 horários · 3 toca 15:15 · 4 formulário · 5 digitado · 6 tá marcado

export function BookingFlow({ onStep }: { onStep?: (step: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const step = useCycle(ref, FLOW_TIMES);
  React.useEffect(() => onStep?.(step), [step, onStep]);
  const screen = step <= 1 ? "service" : step <= 3 ? "time" : step <= 5 ? "form" : "done";
  return (
    <div ref={ref} className="flex h-full flex-col">
      <BizHeader compact={screen !== "service"} />
      <div className="relative flex-1">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={screen}
            className="absolute inset-0"
            initial={{ x: "40%", opacity: 0 }}
            animate={{ x: "0%", opacity: 1 }}
            exit={{ x: "-30%", opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
          >
            {screen === "service" && <ScreenService picked={step === 1} />}
            {screen === "time" && <ScreenTime picked={step === 3} />}
            {screen === "form" && <ScreenForm typed={step === 5} />}
            {screen === "done" && <ScreenDone />}
          </motion.div>
        </AnimatePresence>
      </div>
      <p className="pb-4 text-center text-[9.5px] text-tinta-3">
        Agendamento online por <span className="font-semibold text-roxo-700">Marcaki</span>
      </p>
    </div>
  );
}

/* ───────────── Mensagem (estilo conversa de WhatsApp, sem imitar a interface) ───────────── */

export function ChatBubble({
  children,
  time,
  from = "them",
  className,
  title,
}: {
  children: React.ReactNode;
  time?: string;
  from?: "them" | "me";
  className?: string;
  title?: string;
}) {
  return (
    <div
      className={`max-w-[290px] rounded-2xl px-3.5 py-2.5 text-[13.5px] leading-snug shadow-card ${
        from === "me" ? "rounded-br-md bg-roxo-600 text-white" : "rounded-bl-md border border-linha bg-white text-tinta"
      } ${className ?? ""}`}
    >
      {title && (
        <p className={`mb-1 flex items-center gap-1.5 text-[11px] font-semibold ${from === "me" ? "text-roxo-100" : "text-ok"}`}>
          <WhatsappLogo weight="fill" className="h-3.5 w-3.5" /> {title}
        </p>
      )}
      {children}
      {time && <span className={`tnum mt-1 block text-right text-[10px] ${from === "me" ? "text-roxo-200" : "text-tinta-3"}`}>{time}</span>}
    </div>
  );
}

export function ConfirmationBubble({ className }: { className?: string }) {
  return (
    <ChatBubble title="WhatsApp · confirmação" time="14:02" className={className}>
      Oi, Ana! <b>Tá marcado</b> ✓<br />
      Escova com a Maria
      <br />
      <span className="tnum">Qui, 19/11 às 15:15</span> · {DEMO_BUSINESS.name}
    </ChatBubble>
  );
}

export function ReminderBubble({ className }: { className?: string }) {
  return (
    <ChatBubble title="WhatsApp · lembrete" time="09:00" className={className}>
      Ana, amanhã às <span className="tnum">15:15</span> tem escova no {DEMO_BUSINESS.name}. Te esperamos!
    </ChatBubble>
  );
}

/* ───────────── Agenda da equipe se preenchendo ───────────── */

type Block = { col: number; start: number; len: number; label: string; tone: "roxo" | "marca" | "lavanda" };
const PROS = ["Maria", "João", "Bia"];
const HOURS = ["09", "10", "11", "12", "13", "14"];
// start/len em meias horas a partir das 09:00
const BLOCKS: Block[] = [
  { col: 0, start: 0, len: 4, label: "Coloração", tone: "roxo" },
  { col: 1, start: 0, len: 1, label: "Corte masc.", tone: "lavanda" },
  { col: 2, start: 1, len: 2, label: "Manicure", tone: "lavanda" },
  { col: 1, start: 2, len: 2, label: "Corte fem.", tone: "roxo" },
  { col: 0, start: 5, len: 2, label: "Escova", tone: "lavanda" },
  { col: 2, start: 4, len: 2, label: "Escova", tone: "roxo" },
  { col: 1, start: 6, len: 1, label: "Corte masc.", tone: "lavanda" },
  { col: 0, start: 8, len: 2, label: "Escova", tone: "marca" },
  { col: 2, start: 8, len: 2, label: "Manicure", tone: "lavanda" },
  { col: 1, start: 9, len: 2, label: "Corte fem.", tone: "roxo" },
];

export function AgendaBoard({ className, dark = false, label = "Qui, 19 nov" }: { className?: string; dark?: boolean; label?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const times = React.useMemo(() => [...BLOCKS.map((_, i) => (i === 0 ? 700 : 520)), 3200], []);
  const step = useCycle(ref, times);
  const visible = step; // quantos blocos já entraram
  const ROW = 22; // px por meia hora
  return (
    <div ref={ref} className={`rounded-2xl border p-3 sm:p-4 ${dark ? "border-white/10 bg-white/[0.04] text-white" : "border-linha bg-white text-tinta shadow-card"} ${className ?? ""}`}>
      <div className="flex items-center justify-between gap-2">
        <p className="flex min-w-0 items-center gap-1.5 text-[12px] font-semibold">
          <CalendarBlank weight="bold" className="h-4 w-4 shrink-0 text-roxo-500" /> <span className="truncate">Agenda · {label}</span>
        </p>
        <span className={`tnum shrink-0 rounded-full px-2 py-0.5 text-[10.5px] font-semibold ${dark ? "bg-white/10 text-roxo-100" : "bg-roxo-100 text-roxo-700"}`}>
          {Math.min(visible, BLOCKS.length)} marcados
        </span>
      </div>
      <div className="mt-3 grid grid-cols-[28px_repeat(3,minmax(0,1fr))] gap-x-1.5">
        <span />
        {PROS.map((p) => (
          <span key={p} className={`truncate pb-1.5 text-[11px] font-semibold ${dark ? "text-roxo-100" : "text-tinta-2"}`}>
            {p}
          </span>
        ))}
        <div className="relative" style={{ height: ROW * 12 }}>
          {HOURS.map((h, i) => (
            <span key={h} className={`tnum absolute left-0 text-[9.5px] ${dark ? "text-white/40" : "text-tinta-3"}`} style={{ top: i * ROW * 2 - 5 }}>
              {h}h
            </span>
          ))}
        </div>
        {PROS.map((p, col) => (
          <div key={p} className={`relative rounded-lg ${dark ? "bg-white/[0.03]" : "bg-roxo-50/60"}`} style={{ height: ROW * 12 }}>
            {HOURS.map((h, i) => (
              <span key={h} className={`absolute inset-x-0 border-t ${dark ? "border-white/[0.06]" : "border-roxo-600/[0.07]"}`} style={{ top: i * ROW * 2 }} />
            ))}
            <AnimatePresence>
              {BLOCKS.map((b, i) =>
                b.col === col && i < visible ? (
                  <motion.div
                    key={i}
                    className={`absolute inset-x-0.5 overflow-hidden rounded-md px-1.5 py-1 text-[9.5px] font-semibold leading-tight ${
                      b.tone === "roxo" ? "bg-roxo-600 text-white" : b.tone === "marca" ? "bg-marca text-tinta" : dark ? "bg-roxo-300/30 text-white" : "bg-roxo-200 text-roxo-800"
                    }`}
                    style={{ top: b.start * ROW + 1, height: b.len * ROW - 2 }}
                    initial={{ y: -14, opacity: 0, scale: 0.9 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.25 } }}
                    transition={SNAP}
                  >
                    <span className="block truncate">{b.label}</span>
                  </motion.div>
                ) : null,
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ───────────── Telas do dono (Como funciona) ───────────── */

export function OwnerScreenSignup() {
  return (
    <div className="flex h-full flex-col px-4 pt-12">
      <p className="font-display text-[20px] font-bold leading-tight tracking-tight text-tinta">Crie sua página</p>
      <p className="text-[11px] text-tinta-2">Leva um minuto.</p>
      <div className="mt-4 grid gap-2.5">
        <Labeled label="Nome do negócio" value="Salão da Maria" />
        <Labeled label="Tipo de negócio" value="Salão de beleza" chip />
        <div>
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-tinta-3">Endereço da página</p>
          <div className="flex min-w-0 items-center rounded-xl border border-roxo-600 bg-roxo-50 px-3 py-2 text-[11.5px]">
            <span className="shrink-0 text-tinta-3">marcaki.app/t/</span>
            <span className="truncate font-semibold text-tinta">salao-da-maria</span>
          </div>
        </div>
      </div>
      <div className="mt-auto mb-6 rounded-xl bg-roxo-600 py-2.5 text-center text-[12.5px] font-semibold text-white">Continuar</div>
    </div>
  );
}

function Labeled({ label, value, chip }: { label: string; value: string; chip?: boolean }) {
  return (
    <div>
      <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-tinta-3">{label}</p>
      <div className="rounded-xl border border-linha px-3 py-2 text-[12px] text-tinta">{chip ? <span className="rounded-full bg-roxo-100 px-2 py-0.5 text-[11px] font-semibold text-roxo-700">{value}</span> : value}</div>
    </div>
  );
}

export function OwnerScreenServices() {
  return (
    <div className="flex h-full flex-col px-4 pt-12">
      <p className="font-display text-[20px] font-bold leading-tight tracking-tight text-tinta">Serviços</p>
      <div className="mt-3 grid gap-1.5">
        {DEMO_BUSINESS.services.slice(0, 4).map((s) => (
          <div key={s.name} className="flex items-center justify-between gap-2 rounded-xl border border-linha px-3 py-2">
            <span className="truncate text-[12px] font-semibold text-tinta">{s.name}</span>
            <span className="tnum shrink-0 text-[10.5px] text-tinta-2">
              {s.duration} · {s.price}
            </span>
          </div>
        ))}
      </div>
      <p className="font-display mt-4 text-[15px] font-bold text-tinta">Horário de funcionamento</p>
      <div className="mt-2 grid gap-1">
        {[
          ["Ter a sex", "09:00 – 19:00"],
          ["Sábado", "08:00 – 14:00"],
          ["Dom e seg", "Fechado"],
        ].map(([d, h]) => (
          <div key={d} className="flex justify-between text-[11.5px]">
            <span className="text-tinta-2">{d}</span>
            <span className="tnum font-medium text-tinta">{h}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function OwnerScreenShare() {
  return (
    <div className="flex h-full flex-col px-4 pt-12">
      <p className="font-display text-[20px] font-bold leading-tight tracking-tight text-tinta">
        Sua página <span className="mk">está no ar</span>
      </p>
      <div className="mt-3 flex min-w-0 items-center gap-2 rounded-xl border border-linha bg-roxo-50 px-3 py-2.5">
        <LinkIcon weight="bold" className="h-4 w-4 shrink-0 text-roxo-600" />
        <span className="truncate text-[11.5px] font-semibold text-tinta">marcaki.app/t/salao-da-maria</span>
      </div>
      <p className="mt-4 text-[10px] font-semibold uppercase tracking-wider text-tinta-3">Compartilhe em</p>
      <div className="mt-2 grid gap-1.5">
        {[
          [<InstagramLogo key="i" weight="bold" className="h-4 w-4" />, "Bio do Instagram"],
          [<WhatsappLogo key="w" weight="bold" className="h-4 w-4" />, "Status do WhatsApp"],
          [<CheckCircle key="c" weight="bold" className="h-4 w-4" />, "Cartão e adesivo no balcão"],
        ].map(([icon, label], i) => (
          <div key={i} className="flex items-center gap-2 rounded-xl border border-linha px-3 py-2 text-[12px] text-tinta">
            <span className="text-roxo-600">{icon}</span>
            {label}
          </div>
        ))}
      </div>
      <div className="mt-auto mb-6 rounded-xl bg-tinta py-2.5 text-center text-[12.5px] font-semibold text-white">Copiar link</div>
    </div>
  );
}
