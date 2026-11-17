import { MARQUEE } from "../data/site";
import { VelocityMarquee } from "../components/motion";

/* Faixa de serviços como pílulas de horário: livre (contorno), marcado (roxo) e acabou de marcar (amarelo). */
export function Ticker() {
  const hours = ["09:00", "09:45", "10:30", "11:15", "13:00", "13:45", "14:30", "15:15", "16:00", "16:45", "17:30", "18:15"];
  return (
    <div className="relative border-y border-linha bg-white py-5" aria-label="Serviços que cabem no Marcaki">
      <VelocityMarquee baseVelocity={-1.6} className="mask-fade-x">
        {MARQUEE.map((s, i) => {
          const tone = i % 5 === 2 ? "bg-marca text-tinta border-marca" : i % 3 === 0 ? "bg-roxo-600 text-white border-roxo-600" : "bg-white text-tinta border-linha";
          return (
            <span key={s} className={`mx-1.5 inline-flex items-center gap-2.5 rounded-full border px-4 py-2 text-[15px] font-semibold ${tone}`}>
              <span className="tnum font-display text-[13px] opacity-70">{hours[i % hours.length]}</span>
              {s}
            </span>
          );
        })}
      </VelocityMarquee>
    </div>
  );
}
