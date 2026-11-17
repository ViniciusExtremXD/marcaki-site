import { AUDIENCES } from "../data/site";
import { ClipReveal, ParallaxImage, Reveal, SlotLabel, SplitWords } from "../components/motion";

/* Para quem é: salões, barbearias e clínicas, cada um com a sua frase do Livro da Marca e uma foto real de trabalho. */
export function Audience() {
  return (
    <section id="para-quem" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <SlotLabel time="10:00">Para quem é</SlotLabel>
          <h2 className="font-display mt-5 text-4xl font-extrabold leading-[1.02] tracking-tightest text-tinta sm:text-5xl lg:text-6xl">
            <SplitWords text="Para quem atende com ==as mãos ocupadas.==" />
          </h2>
        </div>

        <div className="mt-14 grid gap-16 sm:gap-20">
          {AUDIENCES.map((a, i) => (
            <article key={a.id} id={a.id} className={`grid grid-cols-[minmax(0,1fr)] items-center gap-8 lg:grid-cols-2 lg:gap-14`}>
              <div className={`relative min-w-0 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <ClipReveal from={i % 2 === 1 ? "right" : "left"}>
                  <div className="relative">
                    <ParallaxImage src={a.image} alt={a.alt} className="aspect-[4/3] rounded-3xl bg-roxo-100 sm:aspect-[5/4]" sizes="(min-width: 1024px) 46vw, 100vw" />
                    <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[13px] font-semibold text-tinta shadow-soft">{a.label}</span>
                  </div>
                </ClipReveal>
                {/* Detalhe: fica fora do recorte do ClipReveal para poder sair da borda */}
                <Reveal delay={0.35} className={`absolute -bottom-6 hidden w-[34%] sm:block ${i % 2 === 1 ? "-left-3" : "-right-3"}`}>
                  <div className="overflow-hidden rounded-2xl border-4 border-papel bg-roxo-100 shadow-lift">
                    <ParallaxImage src={a.inset} alt={a.insetAlt} amount={5} className="aspect-square" sizes="240px" />
                  </div>
                </Reveal>
              </div>
              <div className="min-w-0">
                <Reveal>
                  <p className="font-display tnum text-[15px] font-bold text-roxo-600">0{i + 1}</p>
                  <h3 className="font-display mt-2 text-balance text-3xl font-extrabold leading-[1.05] tracking-tight text-tinta sm:text-4xl">{a.title}</h3>
                  <p className="mt-4 max-w-lg text-[17px] leading-relaxed text-tinta-2">{a.text}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {a.services.map((s, j) => (
                      <li key={s} className={`rounded-full border px-3.5 py-1.5 text-[14px] font-semibold ${j === 0 ? "border-marca bg-marca text-tinta" : "border-linha bg-white text-tinta"}`}>
                        {s}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
