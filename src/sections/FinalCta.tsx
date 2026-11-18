import { PRICE } from "../data/site";
import { Lines, ParallaxImage, Reveal } from "../components/motion";
import { DemoCta, PrimaryCta } from "../components/cta";

/* Fecho: foto do caderno de horários em tela cheia, escurecida, com o convite por cima. */
export function FinalCta() {
  return (
    <section id="comecar" className="relative">
      <div className="container-x pb-24 sm:pb-32">
        <div className="relative overflow-hidden rounded-[20px] bg-noite">
          <div className="absolute inset-0">
            <ParallaxImage
              src="caderno"
              alt="Mãos anotando horários num caderno com o celular ao lado"
              amount={6}
              position="center 60%"
              className="h-full w-full"
              imgClassName="opacity-45"
              sizes="(min-width: 1240px) 1180px, 100vw"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-noite via-noite/80 to-noite/20" />
          <div className="relative px-6 py-20 sm:px-12 sm:py-28 lg:px-16 lg:py-32">
            <h2 className="font-display max-w-3xl text-[2.5rem] font-normal leading-[1.04] tracking-[-0.02em] text-white sm:text-6xl lg:text-[4.2rem]">
              <Lines
                lines={["Seu próximo cliente", "pode marcar hoje", "à noite."]}
              />
            </h2>
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-white/75">
                Cadastre seu negócio, informe serviços e horários e comece a
                receber agendamentos hoje mesmo. {PRICE.trialDays} dias grátis,
                sem cartão de crédito e sem fidelidade.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <PrimaryCta location="cta_final" tone="white" />
                <DemoCta location="cta_final" tone="dark" />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
