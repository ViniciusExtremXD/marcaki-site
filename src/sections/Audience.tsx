import { AUDIENCES } from "../data/site";
import { ParallaxImage, Reveal, SectionHead } from "../components/motion";

/* Para quem é: três colunas editoriais, cada uma com a foto de quem atende e a frase do segmento. */
export function Audience() {
  return (
    <section id="para-quem" className="relative py-24 sm:py-32 lg:py-36">
      <div className="container-x">
        <SectionHead title={["Feito para quem atende", "com as mãos ocupadas."]} intro="Salões, barbearias e clínicas de estética: cada serviço com a duração certa, e o cliente só vê o horário em que ele cabe." />

        <div className="mt-14 grid grid-cols-[minmax(0,1fr)] gap-14 md:grid-cols-3 md:gap-8 lg:mt-20">
          {AUDIENCES.map((a, i) => {
            // A foto do salão já abre o site; aqui o salão aparece pela manicure.
            const img = a.id === "saloes" ? a.inset : a.image;
            const alt = a.id === "saloes" ? a.insetAlt : a.alt;
            return (
              <Reveal key={a.id} delay={i * 0.1}>
                <article id={a.id} className="group">
                  <div className="overflow-hidden rounded-[16px]">
                    <ParallaxImage
                      src={img}
                      alt={alt}
                      amount={4}
                      className="aspect-[4/5] bg-nevoa transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                      sizes="(min-width: 768px) 33vw, 100vw"
                    />
                  </div>
                  <p className="mt-6 text-[14px] text-tinta-3">{a.label}</p>
                  <h3 className="font-display mt-2 text-[1.65rem] leading-[1.15] tracking-[-0.01em] text-tinta">{a.title}</h3>
                  <p className="mt-3 text-[15.5px] leading-relaxed text-tinta-2">{a.text}</p>
                  <p className="mt-4 border-t border-linha pt-4 text-[14px] text-tinta-2">{a.services.join(" · ")}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
