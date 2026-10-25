import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap";
import { useCart } from "../lib/store";
import { scrollToTarget } from "../lib/smoothScroll";
import { clamp } from "../lib/utils";
import { BENEFITS } from "../data/content";
import CoconutExperience from "../three/CoconutExperience";
import {
  ArrowCurve,
  BoltIcon,
  CoconutIcon,
  DropIcon,
  PalmIcon,
  ScribbleFrame,
  SugarIcon,
  SunDoodle,
} from "./Doodles";

const BENEFIT_ICONS = {
  bolt: BoltIcon,
  drop: DropIcon,
  sugar: SugarIcon,
  coconut: CoconutIcon,
};

export default function CoconutSequence({ started }) {
  const wrapper = useRef(null);
  const stage = useRef(null);
  const progressRef = useRef(0);
  const fill = useRef(null);
  const pct = useRef(null);
  const phaseLabel = useRef(null);
  const phaseDots = useRef([]);
  const { addItem, setCartOpen } = useCart();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".hero-rise", { yPercent: 118 });
      gsap.set(".hero-fade", { opacity: 0, y: 18 });
      gsap.set(".benefits-panel", { autoAlpha: 0 });
      gsap.set(".benefits-copy", { autoAlpha: 0 });
      gsap.set(".benefit-badge", { autoAlpha: 0, scale: 0.55 });
      gsap.set(".sequence-copy", { autoAlpha: 0, y: 14 });
      gsap.set(".sequence-title", { autoAlpha: 0, scale: 1.35 });
      gsap.set(".keep-copy", { autoAlpha: 0 });
      gsap.set(".keep-word", { autoAlpha: 0, xPercent: (i) => (i ? 18 : -18) });
      gsap.set(".transition-scallop", { yPercent: 105 });
      gsap.set(".seq-panel", { autoAlpha: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      tl.to(".hero-panel", { autoAlpha: 0, y: -55, duration: 0.06 }, 0.155)
        .to(
          ".benefits-panel",
          { autoAlpha: 1, duration: 0.035 },
          0.225,
        )
        .fromTo(
          ".benefits-heading-line",
          { yPercent: 108 },
          { yPercent: 0, stagger: 0.035, duration: 0.08, ease: "power3.out" },
          0.23,
        )
        .to(
          ".benefits-copy",
          { autoAlpha: 1, y: 0, duration: 0.05 },
          0.265,
        )
        .to(
          ".benefit-badge",
          {
            autoAlpha: 1,
            scale: 1,
            stagger: 0.03,
            duration: 0.045,
            ease: "back.out(1.7)",
          },
          0.285,
        )
        .to(".benefit-badge", { autoAlpha: 0, scale: 0.8, duration: 0.03 }, 0.43)
        .to(".benefits-panel", { autoAlpha: 0, duration: 0.03 }, 0.45)
        .to(
          ".sequence-title",
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.06,
            ease: "power3.out",
          },
          0.53,
        )
        .to(".seq-panel", { autoAlpha: 1, duration: 0.04 }, 0.53)
        .to(".sequence-copy", { autoAlpha: 1, y: 0, duration: 0.045 }, 0.57)
        .to(".sequence-copy", { autoAlpha: 0, y: -12, duration: 0.04 }, 0.65)
        .to(".sequence-title", { autoAlpha: 0, scale: 1.08, duration: 0.05 }, 0.67)
        .to(".seq-panel", { autoAlpha: 0, duration: 0.04 }, 0.69)
        .to(
          ".keep-word",
          {
            autoAlpha: 1,
            xPercent: 0,
            stagger: 0.04,
            duration: 0.07,
            ease: "power3.out",
          },
          0.72,
        )
        .to(".keep-copy", { autoAlpha: 1, duration: 0.05 }, 0.85)
        .to(".keep-copy", { autoAlpha: 0, duration: 0.02 }, 0.985)
        .to(".keep-word", { autoAlpha: 0, duration: 0.02 }, 0.985)
        .to(".transition-scallop", { yPercent: 0, duration: 0.08 }, 0.88)
        .to({}, { duration: 0.001 }, 1);

      ScrollTrigger.create({
        trigger: wrapper.current,
        start: "top top",
        end: "bottom bottom",
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          progressRef.current = self.progress;
          const phase = clamp((self.progress - 0.37) / 0.24);
          if (fill.current) fill.current.style.transform = `scaleX(${phase})`;
          if (pct.current)
            pct.current.textContent = `${String(Math.round(phase * 100)).padStart(3, "0")}%`;

          let index = 0;
          if (phase > 0.34) index = 1;
          if (phase > 0.67) index = 2;
          if (phaseLabel.current) {
            phaseLabel.current.textContent = [
              "WHOLE COCONUT",
              "CRACKING OPEN",
              "CANNED & COLD",
            ][index];
          }
          phaseDots.current.forEach((dot, i) => {
            if (!dot) return;
            dot.style.opacity = i === index ? "1" : "0.24";
            dot.style.transform = i === index ? "scale(1.2)" : "scale(1)";
          });
        },
      });
    }, wrapper);

    const refresh = () => ScrollTrigger.refresh();
    if (document.fonts?.ready) document.fonts.ready.then(refresh);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    if (!started) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(".hero-rise", { yPercent: 0 });
      gsap.set(".hero-fade", { opacity: 1, y: 0 });
      return;
    }
    const ctx = gsap.context(() => {
      gsap
        .timeline({ delay: 0.1 })
        .to(".hero-rise", {
          yPercent: 0,
          duration: 1.25,
          stagger: 0.09,
          ease: "power4.out",
        })
        .to(
          ".hero-fade",
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.09,
            ease: "power3.out",
          },
          "-=.85",
        );
    }, wrapper);
    return () => ctx.revert();
  }, [started]);

  const onStageDown = (event) => {
    if (event.target.closest("button, a, input, [data-no-shake]")) return;
    window.dispatchEvent(new Event("palmo:shake"));
  };

  return (
    <section
      id="coconut-sequence"
      ref={wrapper}
      className="relative w-full bg-cream texture"
      style={{ height: "620vh" }}
    >
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">
        <div
          ref={stage}
          onPointerDown={onStageDown}
          className="absolute inset-0 z-0 cursor-grab active:cursor-grabbing"
        >
          <CoconutExperience progressRef={progressRef} />
        </div>

        <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
          {/* HERO */}
          <div className="hero-panel paddx absolute inset-0">
            <div className="relative pt-[8.5vw] max-md:pt-[27vw]">
              <h1 className="h180 max-w-[67vw] text-cocoa max-md:max-w-full max-md:text-center">
                <span className="line-mask">
                  <span className="hero-rise line-inner">PARADISE IN</span>
                </span>
                <span className="line-mask">
                  <span className="hero-rise line-inner">EVERY SIP.</span>
                </span>
              </h1>
              <PalmIcon className="absolute top-[-1vw] right-[4vw] h-[30vw] w-auto rotate-[8deg] text-beige/90 max-md:top-[38vw] max-md:right-[-10vw] max-md:h-[65vw] max-md:opacity-60" />
            </div>

            <div className="hero-fade absolute bottom-[13vh] left-[30vw] flex flex-col items-center max-md:hidden">
              <ArrowCurve className="h-[5.2vw] w-[6vw] -rotate-[8deg] text-cocoa/80" />
              <span className="mt-1 font-hand text-[1.15rem] leading-[1.05] text-cocoa">
                Rich In Electrolytes
                <br />
                No Added Sugar
              </span>
            </div>

            <div className="hero-fade absolute right-[3vw] bottom-[12.5vh] w-[24rem] max-md:inset-x-0 max-md:right-0 max-md:bottom-[16vh] max-md:mx-auto max-md:w-[86%] max-md:text-center max-md:min-[480px]:bottom-[8vh]">
              <p className="copy max-w-[23rem] text-cocoa max-md:mx-auto max-md:text-[1.04rem]">
                Quench Your Thirst With Pure Coconut Bliss, Packed With Natural
                Electrolytes And Zero Added Sugar, For A Cool Sip Every Time.
              </p>
              <button
                type="button"
                onClick={() => scrollToTarget("#flavours")}
                data-cursor="Explore"
                className="scribble-btn pointer-events-auto mt-4 h-[3.7rem] w-[11.8rem] max-md:mx-auto max-md:mt-5"
              >
                <ScribbleFrame className="h-full w-full" />
                <span>Discover Flavors</span>
              </button>
            </div>

            <div className="hero-fade absolute bottom-[4.5vh] left-[3vw] flex items-center gap-3 max-md:hidden">
              <span className="font-hand text-[.95rem] text-cocoa/60">
                Scroll to crack it open
              </span>
              <span className="relative h-8 w-[1px] overflow-hidden bg-cocoa/20">
                <span className="absolute inset-x-0 top-0 h-3 animate-[scrollHint_1.8s_ease-in-out_infinite] bg-cocoa/70" />
              </span>
            </div>
          </div>

          {/* BENEFITS */}
          <div className="benefits-panel paddx absolute inset-0">
            <div className="relative pt-[7.5vw] max-md:pt-[16vw]">
              <h2 className="h180 text-cocoa max-md:text-[14.4vw]">
                <span className="line-mask">
                  <span className="benefits-heading-line line-inner">THE REAL</span>
                </span>
                <span className="line-mask text-right">
                  <span className="benefits-heading-line line-inner">
                    SOURCE OF
                  </span>
                </span>
                <span className="line-mask text-right">
                  <span className="benefits-heading-line line-inner">
                    EVERY SIP.
                  </span>
                </span>
              </h2>
            </div>

            <div className="benefits-copy absolute top-[39vh] left-[3vw] max-w-[24rem] max-md:bottom-[7vh] max-md:top-auto max-md:left-[5vw] max-md:max-w-[80%]">
              <p className="copy-sm max-w-[19rem] text-cocoa/80">
                For Centuries, Coconuts Have Carried Their Own Perfectly
                Balanced Source Of Refreshment.
              </p>
              <div className="mt-4 flex items-center gap-2">
                <span className="h-[1px] w-9 bg-cocoa/30" />
                <span className="font-hand text-[.9rem] text-cocoa/55">
                  nothing added, nothing taken away
                </span>
              </div>
            </div>

            {BENEFITS.map((benefit) => {
              const Icon = BENEFIT_ICONS[benefit.icon];
              return (
                <div
                  key={benefit.label}
                  className={`benefit-badge absolute ${benefit.className} flex aspect-square w-[7.6vw] flex-col items-center justify-center rounded-full border border-cocoa/10 text-center shadow-[0_18px_40px_rgba(70,55,33,.12)] max-md:w-[6.5rem]`}
                  style={{
                    background: benefit.bg,
                    rotate: benefit.rotate,
                    color: benefit.dark ? "#f8f8f0" : "#463721",
                  }}
                >
                  <Icon className="absolute left-1/2 top-[16%] h-[1.35vw] w-[1.35vw] -translate-x-1/2 text-current opacity-40 max-md:h-4 max-md:w-4" />
                  <span className="font-display mt-[.7vw] text-[2.7vw] leading-[.65] font-semibold tracking-[-.05em] max-md:mt-1 max-md:text-[2rem]">
                    {benefit.value}
                  </span>
                  <span className="mt-[.15vw] text-[.58rem] font-semibold uppercase tracking-[.16em] text-current opacity-55">
                    {benefit.unit}
                  </span>
                  <span className="mt-[.32vw] max-w-[70%] font-hand text-[.9vw] leading-[.95] text-current opacity-80 max-md:text-[.62rem]">
                    {benefit.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* COCONUT SEQUENCE */}
          <div className="seq-panel absolute inset-0">
            <div className="absolute top-[6.5vw] left-[3vw] flex items-center gap-[1.4vw] max-md:top-[20vw] max-md:left-[5vw] max-md:gap-3">
              <h2 className="sequence-title font-display text-[8.5vw] leading-[.8] font-semibold tracking-[-.055em] text-cocoa max-md:text-[13vw]">
                COCONUT
              </h2>
              <SunDoodle className="h-[3.3vw] w-[3.3vw] text-gold max-md:h-8 max-md:w-8" />
            </div>

            <div className="sequence-copy absolute top-[16.5vw] left-[3vw] w-[22vw] max-md:top-[38vw] max-md:left-[5vw] max-md:w-[80%]">
              <span className="eyebrow text-cocoa/45">The whole story</span>
              <p className="mt-2 font-hand text-[1.1rem] leading-[1.2] text-cocoa/80">
                One green coconut, opened and pressed within a day of harvest.
                100% raw, with 500mg of potassium.
              </p>
            </div>
            <div className="sequence-copy absolute right-[3vw] bottom-[21vh] w-[20vw] text-right max-md:hidden">
              <span className="eyebrow text-cocoa/45">And then some</span>
              <p className="mt-2 font-hand text-[1.1rem] leading-[1.2] text-cocoa/80">
                Six flavours, each one pressed with real fruit. Mango, lychee,
                guava and three more worth meeting.
              </p>
            </div>

            <div className="absolute bottom-[8vh] left-[3vw] right-[3vw] max-md:bottom-[10vh]">
              <div className="mb-3 flex items-end justify-between">
                <div className="flex items-center gap-3">
                  <span
                    ref={phaseLabel}
                    className="font-hand text-[1rem] leading-none text-cocoa/80"
                  >
                    WHOLE COCONUT
                  </span>
                  <span className="flex gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        ref={(node) => {
                          phaseDots.current[i] = node;
                        }}
                        className="block h-1.5 w-1.5 rounded-full bg-cocoa transition-all duration-300"
                        style={{ opacity: i === 0 ? 1 : 0.24 }}
                      />
                    ))}
                  </span>
                </div>
                <span
                  ref={pct}
                  className="font-display text-[1.5rem] leading-none font-semibold tracking-[-.04em] text-cocoa/55 tabular-nums"
                >
                  000%
                </span>
              </div>
              <div className="relative h-px w-full bg-cocoa/20">
                <div
                  ref={fill}
                  className="absolute inset-0 origin-left bg-cocoa"
                  style={{ transform: "scaleX(0)" }}
                />
                <span className="absolute -top-[2px] left-0 h-[5px] w-[5px] -translate-x-1/2 rounded-full bg-cocoa" />
                <span className="absolute -top-[2px] right-0 h-[5px] w-[5px] translate-x-1/2 rounded-full bg-cocoa/30" />
              </div>
            </div>
          </div>

          {/* KEEP SIPPING */}
          <div className="absolute inset-0">
            <div className="absolute top-[31vh] left-[18vw] right-[8vw] z-10 flex justify-between max-md:top-[18vh] max-md:left-[5vw] max-md:right-[5vw]">
              <h2 className="keep-word font-display text-[8vw] leading-[.8] font-semibold tracking-[-.06em] text-cocoa max-md:text-[15vw]">
                KEEP
              </h2>
              <h2 className="keep-word font-display text-[8vw] leading-[.8] font-semibold tracking-[-.06em] text-cocoa max-md:text-[15vw]">
                SIPPING..
              </h2>
            </div>

            <div className="keep-copy pointer-events-auto absolute bottom-[17vh] left-[3vw] z-10 flex w-[24rem] flex-col items-start text-left max-md:hidden">
              <span className="font-hand text-[.95rem] text-cocoa/55">
                The cold-pressed crowd favourite
              </span>
              <p className="copy-sm mt-2 max-w-[23rem] text-cocoa/80">
                Chilled, clean, ready to sip. Order before the batch runs dry.
              </p>
              <div className="mt-4 flex items-center gap-3 max-md:flex-col max-md:items-start">
                <button
                  type="button"
                  onClick={() => {
                    addItem(
                      {
                        id: "natural",
                        name: "Natural Pure",
                        price: 149,
                      },
                      1,
                    );
                    setCartOpen(true);
                  }}
                  className="pill-btn"
                  data-cursor="Stock up"
                >
                  Add a can — ₹149
                </button>
                <button
                  type="button"
                  onClick={() => scrollToTarget("#flavours")}
                  className="font-hand text-[1rem] text-cocoa/60 underline decoration-cocoa/25 underline-offset-4 transition-colors hover:text-cocoa"
                >
                  See all 6 flavours
                </button>
              </div>
            </div>

            <div className="transition-scallop absolute inset-x-0 bottom-0 z-0 leading-none">
              <div className="flex w-full items-end text-cocoa">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="relative h-[7.4vw] w-[16.6667%] rounded-t-full bg-current max-md:h-[13vw]"
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 top-0 h-[22vh] bg-gradient-to-b from-cream/55 to-transparent" />
        </div>
      </div>
    </section>
  );
}
