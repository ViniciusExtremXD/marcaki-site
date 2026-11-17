import { ScrollLitText, SlotLabel } from "../components/motion";

/* Manifesto do Livro da Marca, acendendo palavra por palavra com a rolagem. */
export function Manifesto() {
  return (
    <section id="manifesto" className="relative overflow-hidden bg-roxo-900 py-24 text-white sm:py-32">
      <div className="glow pointer-events-none absolute -right-48 -top-40 h-[620px] w-[620px] [--glow:124_58_237] [--glow-a:0.5]" />
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SlotLabel time="09:00" tone="dark">
          Por que o Marcaki existe
        </SlotLabel>
        <ScrollLitText
          className="font-display mt-8 text-[1.75rem] font-semibold leading-[1.22] tracking-tight sm:text-4xl lg:text-[2.9rem]"
          text="Quem trabalha com beleza trabalha com as mãos. E no meio de uma escova o celular vibra: “oi, tem horário amanhã?”. Você para, seca a mão, procura no caderno, responde. O Marcaki existe para essa mensagem parar de chegar. Você manda o link uma vez, o cliente marca sozinho e você só abre a agenda."
        />
        <p className="font-display mt-10 text-3xl font-extrabold tracking-tight sm:text-5xl">
          Marcou, <span className="mk mk-full text-tinta">tá marcado.</span>
        </p>
      </div>
    </section>
  );
}
