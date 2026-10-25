import { useEffect, useState } from "react";
import {
  CrumpledCanDoodle,
  IceCubeDoodle,
  SmileyDoodle,
  Sparkle,
} from "./Doodles";

const WORDS = ["FRESH", "PURE", "CLEAN"];

export default function Introduction() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(
      () => setWordIndex((index) => (index + 1) % WORDS.length),
      2400,
    );
    return () => window.clearInterval(id);
  }, []);

  return (
    <section
      id="story"
      data-nav-theme="dark"
      className="relative z-10 mt-[-1px] overflow-hidden bg-cocoa py-[13vw] text-cream texture max-md:py-[28vw]"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[.055] [background-image:radial-gradient(#ffe386_1px,transparent_1px)] [background-size:8px_8px]" />

      <div className="relative z-10 mx-auto flex max-w-[82rem] flex-col items-center px-[3vw] text-center max-md:px-[5vw]">
        <div className="mb-7 flex items-center gap-2.5" data-reveal>
          <Sparkle className="h-3.5 w-3.5 text-beige" />
          <span className="eyebrow text-beige/60">
            Pure coconut water · naturally
          </span>
          <Sparkle className="h-3.5 w-3.5 text-beige" />
        </div>

        <h2
          className="h150 text-balance font-semibold text-cream"
          data-reveal
        >
          PURE COCONUT WATER. NATURALLY HYDRATING, REFRESHINGLY{" "}
          <span className="relative inline-block -rotate-2 bg-gold px-[.4em] text-cocoa shadow-[0_8px_22px_rgba(30,20,8,.22)]">
            <span key={WORDS[wordIndex]} className="word-in inline-block">
              {WORDS[wordIndex]},
            </span>
          </span>{" "}
          FROM NATURE'S SOURCE.
        </h2>

        <p
          className="mt-8 max-w-[24rem] font-hand text-[1.15rem] leading-[1.3] text-sand/70"
          data-reveal
        >
          One ingredient. A thousand tiny green flags. This is hydration the way
          the tree intended.
        </p>

        <div className="mt-8 flex items-center gap-3" data-reveal>
          <a
            href="#flavours"
            className="pill-btn"
            data-cursor="Sip"
          >
            Meet the flavours
          </a>
          <span className="font-hand text-[.9rem] text-cream/40">
            no concentrates, ever
          </span>
        </div>
      </div>

      <SmileyDoodle className="absolute top-[9vw] left-[4vw] h-[6.7vw] w-[6.7vw] rotate-[-9deg] opacity-95 max-md:top-[9vw] max-md:left-[6vw] max-md:h-[17vw] max-md:w-[17vw]" />
      <CrumpledCanDoodle className="absolute top-[5vw] right-[5vw] h-[13vw] w-[11vw] rotate-[14deg] text-[#8f7440] opacity-60 max-md:top-[12vw] max-md:right-[2vw] max-md:h-[32vw] max-md:w-[27vw]" />
      <IceCubeDoodle className="absolute bottom-[8vw] left-[5vw] h-[11vw] w-[12vw] -rotate-[8deg] text-[#927b49] opacity-60 max-md:bottom-[13vw] max-md:left-[4vw] max-md:h-[28vw] max-md:w-[30vw]" />

      <div className="absolute right-[7vw] bottom-[8vw] flex flex-col items-end gap-2 text-right max-md:right-[6vw] max-md:bottom-[6vw]">
        <span className="h-[1px] w-[5vw] rotate-[-8deg] bg-beige/50" />
        <p className="font-hand text-[1.1rem] leading-[1.05] text-beige/80">
          That's Why People
          <br />
          Love To Drink It !
        </p>
      </div>
    </section>
  );
}
