import { useState } from "react";
import { NAV_LINKS } from "../data/content";
import { useCart } from "../lib/store";
import { scrollToTarget } from "../lib/smoothScroll";
import { PalmIcon } from "./Doodles";

export default function Footer() {
  const [score, setScore] = useState(0);
  const { showToast } = useCart();

  const hitScore = () => {
    const next = score + 1;
    setScore(next);
    if (next === 5) {
      showToast("You found the secret grove. Shhh.");
    } else if (next === 12) {
      showToast("Okay, the coconut is impressed.");
    }
  };

  return (
    <footer
      id="contact"
      data-nav-theme="dark"
      className="relative z-20 flex min-h-[100dvh] w-full flex-col overflow-hidden text-cream"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[10vw] max-md:h-[12vw]"
        aria-hidden="true"
      >
        <svg
          className="h-full w-full text-cocoa"
          viewBox="0 0 600 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M0,0 C15,75 35,100 50,100 C65,100 85,75 100,0 C115,75 135,100 150,100 C165,100 185,75 200,0 C215,75 235,100 250,100 C265,100 285,75 300,0 C315,75 335,100 350,100 C365,100 385,75 400,0 C415,75 435,100 450,100 C465,100 485,75 500,0 C515,75 535,100 550,100 C565,100 585,75 600,0 L600,100 L0,100 Z"
          />
        </svg>
      </div>
      <div
        className="absolute inset-x-0 bottom-0 top-[10vw] bg-cocoa texture max-md:top-[12vw]"
        aria-hidden="true"
      />
      <div className="relative z-10 px-[3vw] pt-[17vw] max-md:px-[5vw] max-md:pt-[30vw]">
        <div className="flex items-start justify-between">
          <div>
            <p className="eyebrow text-beige/70">KOKO coconut co.</p>
            <p className="mt-2 max-w-[24rem] text-[1.1rem] leading-[1.12] tracking-[-.035em] text-cream/80">
              Cold Pressed, Never Concentrated.
              <br />
              Picked Ripe, Sipped Cold.
            </p>
          </div>
          <img
            src="/assets/fruits/strawberry.webp"
            alt=""
            aria-hidden="true"
            className="mt-2 w-[4.3rem] rotate-[-12deg] drop-shadow-xl max-md:w-10"
          />
        </div>

        <nav aria-label="Footer" className="mt-[3vw] flex justify-end max-md:mt-6">
          <ul className="flex items-center gap-5 text-[.72rem] uppercase tracking-[.13em] text-cream/65 max-md:flex-wrap max-md:justify-end max-md:gap-x-4 max-md:gap-y-2 max-md:text-[.62rem]">
            <li>
              <a
                href="#top"
                onClick={(event) => {
                  event.preventDefault();
                  scrollToTarget("#top");
                }}
                className="transition-colors hover:text-beige"
              >
                Home
              </a>
            </li>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(event) => {
                    event.preventDefault();
                    scrollToTarget(link.href);
                  }}
                  className="transition-colors hover:text-beige"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="relative flex flex-1 items-center justify-center overflow-hidden px-[3vw] pb-[8vw] max-md:pb-[28vw]">
        <PalmIcon className="absolute bottom-[-27vw] left-[-9vw] h-[67vw] w-auto -rotate-[16deg] text-[#7c653d] opacity-90 max-md:bottom-[-5vw] max-md:left-[-32vw] max-md:h-[95vw]" />
        <PalmIcon className="absolute bottom-[-31vw] right-[-8vw] h-[74vw] w-auto rotate-[18deg] text-[#7c653d] opacity-80 max-md:bottom-[-2vw] max-md:right-[-35vw] max-md:h-[105vw]" />

        <div className="relative z-10 text-center">
          <h2 className="font-display text-[22vw] leading-[.62] font-semibold tracking-[-.07em] text-beige max-md:text-[29vw]">
            KOKO
          </h2>
          <p className="mx-auto mt-[1.4vw] max-w-[34rem] font-hand text-[1.02rem] leading-tight text-cream/55">
            Good water. Good fruit. Good mood.
          </p>
        </div>

        <button
          type="button"
          onClick={hitScore}
          data-cursor="Tap"
          aria-label={`KOKO score: ${score}. Tap to add a point.`}
          className="absolute right-[3vw] bottom-[5vw] z-20 flex items-center gap-3 rounded-full border border-cream/15 px-4 py-2 text-[.64rem] uppercase tracking-[.14em] text-cream/55 transition-colors hover:border-beige/40 hover:text-beige max-md:bottom-[16vw] max-md:right-[5vw]"
        >
          <span>Score</span>
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-beige px-1.5 font-hand text-[.72rem] tracking-normal text-cocoa">
            {score}
          </span>
          <span className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="h-1 w-1 rounded-full bg-current opacity-60"
              />
            ))}
          </span>
        </button>

        <img
          src="/assets/fruits/lychee.webp"
          alt=""
          aria-hidden="true"
          className="absolute right-[26%] bottom-[27%] w-[4vw] rotate-12 opacity-80 max-md:w-9"
        />
      </div>

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden" aria-hidden="true">
        <span className="rotate-[-15deg] select-none whitespace-nowrap text-[14vw] font-extrabold uppercase tracking-[0.2em] text-cream/12 max-lg:text-[16vw] max-md:text-[18vw] max-sm:text-[20vw]">
          SAMPLE
        </span>
      </div>
      <div className="relative z-10 px-[3vw] pb-[2vw] max-md:px-[5vw] max-md:pb-[6vw]">
        <div className="flex items-center justify-between rounded-[.55rem] bg-[#f6f2db]/10 px-4 py-2 text-[.68rem] text-cream/50 backdrop-blur-sm">
          <span>© 2026 NDE. All Rights Reserved.</span>
          <span className="font-hand text-[.9rem] text-cream/60">
            Made Under The Sun
          </span>
          <a
            href="mailto:hello@koko.co.in"
            className="hidden transition-colors hover:text-beige sm:block"
          >
            hello@koko.co.in
          </a>
        </div>
      </div>
    </footer>
  );
}
