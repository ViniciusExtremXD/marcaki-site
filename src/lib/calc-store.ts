import { useSyncExternalStore } from "react";
import { CALC, PRICE } from "../data/site";

/*
 * Números que o visitante coloca na calculadora ("A conta"). Ficam só na memória da página
 * e são reaproveitados no Preço ("com o seu valor médio, N atendimentos pagam o mês").
 */
export type CalcValues = { ticket: number; noShows: number; chats: number };

let state: CalcValues = { ...CALC.defaults };
const listeners = new Set<() => void>();

export function setCalc(patch: Partial<CalcValues>) {
  state = { ...state, ...patch };
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

const server = (): CalcValues => CALC.defaults;

export function useCalc(): CalcValues {
  return useSyncExternalStore(subscribe, () => state, server);
}

export function calcResults(v: CalcValues) {
  const lostMoney = v.noShows * CALC.weeksPerMonth * v.ticket;
  const lostHours = (v.chats * CALC.minutesPerChat * CALC.workDaysPerMonth) / 60;
  const payback = Math.max(1, Math.ceil(PRICE.monthly / Math.max(v.ticket, 1)));
  return { lostMoney, lostHours, payback };
}
