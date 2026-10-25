import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap";
import { PalmIcon } from "./Doodles";

export default function Preloader({ onReady, onLifted }) {
  const root = useRef(null);
  const inner = useRef(null);
  const counter = useRef(null);
  const word = useRef(null);
  const line = useRef(null);
  const [count, setCount] = useState(0);
  const [ready, setReady] = useState(false);
  const [lifted, setLifted] = useState(false);
  const finished = useRef(false);
  const callbacks = useRef({ onReady, onLifted });

  callbacks.current = { onReady, onLifted };

  useEffect(() => {
    const state = { value: 0 };
    const ctx = gsap.context(() => {
      gsap.set(word.current, { yPercent: 115, rotate: 3 });
      gsap.set(".loader-meta", { opacity: 0, y: 14 });
      gsap.set(line.current, { scaleX: 0, transformOrigin: "left center" });

      const tl = gsap.timeline({
        onComplete: () => {
          if (finished.current) return;
          finished.current = true;
          document.documentElement.classList.remove("is-loading");
          window.scrollTo(0, 0);
          ScrollTrigger.refresh();
          setReady(true);
          callbacks.current.onReady?.();
        },
      });

      tl.to(word.current, {
        yPercent: 0,
        rotate: 0,
        duration: 1.15,
        ease: "power4.out",
      })
        .to(
          ".loader-meta",
          { opacity: 1, y: 0, stagger: 0.12, duration: 0.6 },
          0.35,
        )
        .to(
          state,
          {
            value: 100,
            duration: 1.85,
            ease: "power2.inOut",
            onUpdate: () => {
              const next = Math.round(state.value);
              setCount(next);
              if (counter.current)
                counter.current.textContent = String(next).padStart(3, "0");
            },
          },
          0.25,
        )
        .to(
          line.current,
          { scaleX: 1, duration: 1.85, ease: "power2.inOut" },
          0.25,
        )
        .to(
          ".loader-lift-hint",
          { opacity: 1, duration: 0.5, ease: "power2.out" },
          2.05,
        );
    }, root);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!ready) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.refresh();
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: () => `+=${Math.max(window.innerHeight * 0.62, 360)}`,
          scrub: 0.45,
          invalidateOnRefresh: true,
          onLeave: () => {
            setLifted(true);
            callbacks.current.onLifted?.();
          },
        },
      });

      tl.to(
        ".loader-lift-hint",
        { autoAlpha: 0, y: 10, duration: 0.12 },
        0,
      ).to(
        inner.current,
        {
          yPercent: -104,
          rotateX: 12,
          scale: 1.015,
          transformPerspective: 1600,
          transformOrigin: "top center",
          ease: "none",
          duration: 1,
        },
        0,
      );
    }, root);

    return () => ctx.revert();
  }, [ready]);

  if (lifted) return null;

  return (
    <div
      ref={root}
      className={`fixed inset-0 z-[200] overflow-hidden ${
        ready ? "pointer-events-none" : ""
      }`}
      aria-hidden="true"
    >
      <div
        ref={inner}
        className="texture relative flex h-full w-full flex-col overflow-hidden bg-cocoa text-sand will-change-transform"
      >
        <div className="loader-top flex items-center justify-between px-[3vw] pt-[2.4vw] max-md:px-[5vw] max-md:pt-[6vw]">
          <div className="flex items-center gap-3">
            <PalmIcon className="h-[2.4rem] w-auto text-beige" />
            <span className="font-display text-[1.1rem] font-semibold tracking-[-0.03em] text-beige">
              KOKO COCONUT CO.
            </span>
          </div>
          <span className="loader-meta font-hand text-[1.05rem] text-sand/70">
            Poured fresh since 2026
          </span>
        </div>

        <div className="relative flex flex-1 items-center justify-center">
          <div className="overflow-hidden px-[3vw]">
            <div
              ref={word}
              className="font-display text-[22vw] leading-[0.7] font-semibold tracking-[-0.065em] text-beige"
            >
              KOKO
            </div>
          </div>
          <div className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2">
            <PalmIcon className="h-[18vw] w-auto text-cocoa/90" />
          </div>
          <div className="absolute left-[3vw] top-[38%] hidden max-md:block">
            <span className="font-hand text-[1.1rem] text-sand/70">
              cracking open something good
            </span>
          </div>
        </div>

        <div className="loader-bottom px-[3vw] pb-[2.4vw] max-md:px-[5vw] max-md:pb-[6vw]">
          <div className="mb-4 flex items-end justify-between">
            <p className="loader-meta max-w-[25rem] font-hand text-[1.1rem] leading-tight text-sand/75">
              Cold pressed, never concentrated.
              <br />
              Picked ripe, sipped cold.
            </p>
            <div className="flex items-end gap-2 text-beige">
              <span
                ref={counter}
                className="font-display text-[6rem] leading-[0.6] font-semibold tabular-nums tracking-[-0.05em] max-md:text-[4rem]"
              >
                000
              </span>
              <span className="mb-1 font-hand text-[1.1rem]">%</span>
            </div>
          </div>
          <div className="relative h-px w-full bg-sand/25">
            <div ref={line} className="absolute inset-0 bg-beige" />
          </div>
          <div className="mt-3 flex justify-between text-[0.64rem] uppercase tracking-[0.16em] text-sand/55">
            <span>Paradise in every sip</span>
            <span className="flex items-center gap-2">
              <span>
                {ready ? "Scroll to lift the curtain" : "Loading the good stuff"}
              </span>
              <span className="relative h-3 w-2 overflow-hidden">
                <svg
                  viewBox="0 0 10 14"
                  fill="none"
                  className="loader-lift-hint absolute inset-0 h-3 w-2 animate-[curtainHint_1.7s_ease-in-out_infinite] text-beige opacity-0"
                >
                  <path
                    d="M5 13V1M1 5l4-4 4 4"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
