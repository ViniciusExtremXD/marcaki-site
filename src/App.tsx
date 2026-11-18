import { useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";
import { bindAnchorLinks, initSmoothScroll } from "./lib/smooth-scroll";
import { pauseOffscreenAnimations } from "./lib/visibility";
import { pushEvent } from "./data/site";
import { CookieNotice, MobileBar, Nav } from "./components/chrome";
import { Hero } from "./sections/Hero";
import { Conta } from "./sections/Conta";
import { Solucao } from "./sections/Solucao";
import { HowItWorks } from "./sections/HowItWorks";
import { Audience } from "./sections/Audience";
import { Pricing } from "./sections/Pricing";
import { Faq } from "./sections/Faq";
import { FinalCta } from "./sections/FinalCta";
import { Footer } from "./sections/Footer";

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
    const stopScroll = initSmoothScroll();
    const unbind = bindAnchorLinks();
    const stopPause = pauseOffscreenAnimations();

    // Quais partes da página o visitante chega a ver (uma vez por seção). Só GA4.
    const seen = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (!entry.isIntersecting || seen.has(id)) continue;
          seen.add(id);
          pushEvent("section_view", { section_id: id });
        }
      },
      { threshold: 0.3 },
    );
    document.querySelectorAll("main section[id]").forEach((el) => io.observe(el));

    return () => {
      stopScroll();
      unbind();
      stopPause();
      io.disconnect();
    };
  }, []);

  return (
    // Movimento é parte da proposta; muitos PCs Windows informam "reduzir movimento" só por terem efeitos desligados.
    <MotionConfig reducedMotion="never">
      <Nav />
      <main>
        <Hero ready={ready} />
        <Conta />
        <Solucao />
        <HowItWorks />
        <Audience />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <MobileBar />
      <CookieNotice />
    </MotionConfig>
  );
}
