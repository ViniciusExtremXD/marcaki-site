import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  animate,
  type MotionValue,
} from "framer-motion";
import { useElementProgress } from "../lib/scroll-progress";

export const EASE_OUT = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;
/* "Encaixe": o horário cai no lugar com um pequeno quique (Livro da Marca, Movimento). */
export const SNAP = { type: "spring", stiffness: 520, damping: 26, mass: 0.7 } as const;

/* Sobe e aparece ao entrar na tela. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "p" | "span";
}) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.9, ease: EASE_OUT, delay }}
    >
      {children}
    </Comp>
  );
}

/*
 * Marca-texto: a caneta amarela passa da esquerda para a direita quando a palavra entra na tela.
 * No HTML pré-renderizado já vem cheia (--mk: 100%); o efeito só zera e anima depois de hidratar.
 */
export function Highlight({ children, delay = 0.25, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const [armed, setArmed] = useState(false);
  useEffect(() => setArmed(true), []);
  useEffect(() => {
    const el = ref.current;
    if (!el || !armed) return;
    if (!inView) {
      el.style.setProperty("--mk", "0%");
      return;
    }
    const controls = animate(0, 100, {
      duration: 0.9,
      delay,
      ease: EASE_OUT,
      onUpdate: (v) => el.style.setProperty("--mk", `${v}%`),
    });
    return () => controls.stop();
  }, [inView, armed, delay]);
  return (
    <span ref={ref} className={`mk ${className ?? ""}`}>
      {children}
    </span>
  );
}

/*
 * Títulos palavra por palavra, subindo de dentro de uma máscara.
 * Trechos entre ==sinais de igual== ganham o marca-texto (pode ter mais de uma palavra).
 */
export function SplitWords({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.055,
  immediate = false,
  dark = false,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  immediate?: boolean;
  /** Fundo escuro: a caneta cobre a palavra inteira e o texto marcado fica em tinta. */
  dark?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const show = immediate || inView;
  const plain = text.replace(/==/g, "");
  // Separa em grupos: [{ words, marked }]
  const parts = text.split("==").map((chunk, i) => ({ words: chunk.split(" ").filter(Boolean), marked: i % 2 === 1 }));
  let index = 0;
  const total = plain.split(" ").length;
  return (
    <span ref={ref} className={className} aria-label={plain} role="text">
      {parts.map((part, pi) => {
        const words = part.words.map((word, wi) => {
          const i = index++;
          const last = i === total - 1;
          // O espaço fica fora do inline-block: dentro dele o navegador o descarta no fim da palavra.
          const space = !last && (!part.marked || wi < part.words.length - 1) ? " " : "";
          return (
            <React.Fragment key={`${pi}-${wi}`}>
              <span aria-hidden className="inline-block overflow-hidden pb-[0.14em] align-bottom">
                <motion.span
                  className={`inline-block ${dark && part.marked ? "text-tinta" : wordClassName ?? ""}`}
                  initial={{ y: "115%", rotate: 4 }}
                  animate={show ? { y: "0%", rotate: 0 } : undefined}
                  transition={{ duration: 1.0, ease: EASE_OUT, delay: delay + i * stagger }}
                >
                  {word}
                </motion.span>
              </span>
              {space}
            </React.Fragment>
          );
        });
        if (!part.marked) return <React.Fragment key={pi}>{words}</React.Fragment>;
        return (
          <React.Fragment key={pi}>
            <Highlight delay={delay + index * stagger + 0.25} className={dark ? "mk-full" : undefined}>
              {words}
            </Highlight>{" "}
          </React.Fragment>
        );
      })}
    </span>
  );
}

/* Parágrafo cujas palavras "acendem" conforme a rolagem. ==palavra== = marca-texto. */
export function ScrollLitText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const progress = useElementProgress(ref, ["start 85%", "end 50%"]);
  const tokens = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {tokens.map((word, i) => (
        <LitWord key={i} progress={progress} range={[i / tokens.length, (i + 1) / tokens.length]}>
          {word}
        </LitWord>
      ))}
    </p>
  );
}

function LitWord({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const marked = /^==.*==[.,!?:]?$/.test(children);
  const clean = children.replace(/==/g, "");
  if (marked) {
    return (
      <>
        <motion.span style={{ opacity }} className="mk">
          {clean}
        </motion.span>{" "}
      </>
    );
  }
  return <motion.span style={{ opacity }}>{clean} </motion.span>;
}

/* Puxa o filho na direção do ponteiro — usado nos CTAs principais. */
export function Magnetic({ children, strength = 0.3, className }: { children: React.ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div ref={ref} style={{ x: sx, y: sy }} onPointerMove={onMove} onPointerLeave={reset} className={`inline-block ${className ?? ""}`}>
      {children}
    </motion.div>
  );
}

/* Conta até o número quando aparece (ou quando `to` muda). Começa no valor final para o HTML pré-renderizado ter o número real. */
export function Counter({
  to,
  duration = 1.2,
  className,
  decimals = 0,
}: {
  to: number;
  duration?: number;
  className?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const [value, setValue] = useState(to);
  const from = useRef(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(from.current, to, {
      duration,
      ease: EASE_OUT,
      onUpdate: (v) => {
        from.current = v;
        setValue(v);
      },
    });
    return () => controls.stop();
  }, [inView, to, duration]);
  return (
    <span ref={ref} className={`tnum ${className ?? ""}`}>
      {value.toLocaleString("pt-BR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
    </span>
  );
}

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

/* Faixa infinita que acelera e inverte com a velocidade da rolagem. Só anda enquanto está perto da tela. */
export function VelocityMarquee({ children, baseVelocity = -2, className }: { children: React.ReactNode; baseVelocity?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "160px 0px 160px 0px" });
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 1.1], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    if (!inView) return;
    let moveBy = direction.current * baseVelocity * (Math.min(delta, 64) / 1000);
    const vf = velocityFactor.get();
    if (vf < 0) direction.current = -1;
    else if (vf > 0) direction.current = 1;
    moveBy += direction.current * moveBy * vf;
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div ref={ref} className={`flex overflow-hidden whitespace-nowrap ${className ?? ""}`}>
      <motion.div className="flex flex-nowrap" style={{ x, willChange: "transform" }}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex shrink-0 items-center" aria-hidden={i > 0}>
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* Rótulo de seção no formato de horário de agenda: "09:00 · Como funciona". */
export function SlotLabel({ time, children, tone = "light" }: { time?: string; children: React.ReactNode; tone?: "dark" | "light" }) {
  return (
    <Reveal y={12}>
      <div
        className={`inline-flex items-center gap-2.5 rounded-full border px-3 py-1.5 text-[12px] font-semibold uppercase tracking-[0.16em] ${
          tone === "dark" ? "border-white/15 text-roxo-200" : "border-roxo-600/15 bg-white text-roxo-700"
        }`}
      >
        {time && <span className={`tnum font-display text-[13px] tracking-normal ${tone === "dark" ? "text-marca" : "text-tinta"}`}>{time}</span>}
        {time && <span className={tone === "dark" ? "text-white/25" : "text-roxo-300"}>·</span>}
        {children}
      </div>
    </Reveal>
  );
}

/* Imagem que desliza levemente durante a rolagem (parallax). Usa <picture> com WebP em 3 larguras. */
export function ParallaxImage({
  src,
  alt,
  className,
  imgClassName,
  amount = 8,
  eager = false,
  position = "center",
  sizes = "(min-width: 1024px) 40vw, 100vw",
}: {
  src: string; // nome base em public/images, ex. "salao" -> salao-800.webp, salao-1200.webp, salao-1800.webp
  alt: string;
  className?: string;
  imgClassName?: string;
  amount?: number;
  eager?: boolean;
  position?: string;
  sizes?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const progress = useElementProgress(ref, ["start end", "end start"]);
  const y = useTransform(progress, [0, 1], [`-${amount}%`, `${amount}%`]);
  const base = `${import.meta.env.BASE_URL}images/${src}`;
  return (
    <div ref={ref} className={`relative overflow-hidden ${className ?? ""}`}>
      <motion.img
        src={`${base}-1200.webp`}
        srcSet={`${base}-800.webp 800w, ${base}-1200.webp 1200w, ${base}-1800.webp 1800w`}
        sizes={sizes}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        style={{ y, scale: 1 + amount / 40, objectPosition: position }}
        className={`h-full w-full object-cover ${imgClassName ?? ""}`}
      />
    </div>
  );
}

/* Revela imagens e painéis com um recorte (clip-path). */
export function ClipReveal({
  children,
  className,
  delay = 0,
  from = "bottom",
  radius = 24,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  from?: "bottom" | "left" | "right";
  radius?: number;
}) {
  const hidden = {
    bottom: `inset(100% 0% 0% 0% round ${radius}px)`,
    left: `inset(0% 100% 0% 0% round ${radius}px)`,
    right: `inset(0% 0% 0% 100% round ${radius}px)`,
  }[from];
  return (
    <motion.div
      className={className}
      initial={{ clipPath: hidden }}
      whileInView={{ clipPath: `inset(0% 0% 0% 0% round ${radius}px)` }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.1, ease: EASE_IN_OUT, delay }}
    >
      {children}
    </motion.div>
  );
}

/* Cartão que inclina em 3D seguindo o ponteiro (só com mouse). */
export function TiltCard({ children, className, max = 6 }: { children: React.ReactNode; className?: string; max?: number }) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 18 });
  const sry = useSpring(ry, { stiffness: 200, damping: 18 });
  return (
    <motion.div
      className={className}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 1000 }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        ry.set(((e.clientX - r.left) / r.width - 0.5) * max * 2);
        rx.set(-((e.clientY - r.top) / r.height - 0.5) * max * 2);
      }}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/* Roda um ciclo de passos (0..n-1) só enquanto o elemento está perto da tela. */
export function useCycle(ref: React.RefObject<Element>, steps: number[], start = true) {
  const inView = useInView(ref, { margin: "80px 0px 80px 0px" });
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!inView || !start) return;
    const t = window.setTimeout(() => setStep((s) => (s + 1) % steps.length), steps[step]);
    return () => window.clearTimeout(t);
  }, [inView, start, step, steps]);
  return step;
}
