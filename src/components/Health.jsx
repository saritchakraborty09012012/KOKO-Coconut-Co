import { HEALTH, HEALTH_IMAGES } from "../data/content";
import { scrollToTarget } from "../lib/smoothScroll";
import {
  CoconutHalfDoodle,
  DropIcon,
  PalmIcon,
  ScribbleFrame,
  Sparkle,
} from "./Doodles";

function ScallopEdge() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-0">
      <div className="relative h-[5vw] w-full bg-cocoa max-md:h-[10vw]" />
      <div className="flex w-full items-start text-cocoa">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="relative aspect-square w-1/4 rounded-b-full bg-current md:hidden"
          />
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="relative hidden aspect-square w-1/6 rounded-b-full bg-current md:block"
          />
        ))}
      </div>
    </div>
  );
}

export default function Health() {
  return (
    <section
      id="benefits"
      className="relative z-[5] w-full overflow-x-clip bg-cream pt-[22vw] pb-[10vw] texture max-md:pt-[38vw] max-md:pb-[20vw]"
    >
      <ScallopEdge />

      <div className="paddx relative">
        <div className="flex items-center justify-center gap-3" data-reveal>
          <Sparkle className="h-3.5 w-3.5 text-gold" />
          <span className="eyebrow text-cocoa/45">Good for your insides</span>
          <Sparkle className="h-3.5 w-3.5 text-gold" />
        </div>

        <h2
          className="mx-auto mt-[1.2vw] max-w-[86rem] text-center text-[7.2vw] leading-[.82] font-semibold tracking-[-.05em] text-cocoa uppercase max-md:text-[14.5vw] max-md:leading-[.88]"
          data-reveal
        >
          YOU DESERVE THE BEST
          <br />
          FOR YOUR HEALTH.
        </h2>

        <div className="mt-[5.5vw] grid grid-cols-[.9fr_1.1fr] items-center gap-[4vw] max-lg:gap-10 max-md:grid-cols-1 max-md:gap-14">
          <div className="relative z-10">
            <p
              className="copy max-w-[27rem] text-cocoa/75 max-md:text-[1.05rem]"
              data-reveal
            >
              We want to make healthy, science-backed nutrition simple and
              accessible so you can feel better, perform better, and enjoy life
              every single day.
            </p>

            <button
              type="button"
              onClick={() => scrollToTarget("#flavours")}
              data-cursor="Sip"
              className="scribble-btn mt-6 h-[3.9rem] w-[12.6rem] max-md:mx-0"
            >
              <ScribbleFrame className="h-full w-full" />
              <span>Get Your Drink</span>
            </button>

            <div className="mt-12 flex flex-col gap-0 border-t border-cocoa/15">
              {HEALTH.map((item) => (
                <div
                  key={item.n}
                  className="group grid grid-cols-[2.6rem_1fr] gap-4 border-b border-cocoa/15 py-5"
                  data-reveal
                >
                  <span className="font-hand text-[.9rem] text-cocoa/35">
                    {item.n}
                  </span>
                  <div>
                    <h3 className="font-display text-[1.65rem] leading-none font-semibold tracking-[-.03em] text-cocoa transition-colors group-hover:text-gold">
                      {item.title}
                    </h3>
                    <p className="copy-sm mt-2 max-w-[23rem] text-cocoa/60">
                      {item.copy}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <CoconutHalfDoodle className="absolute -bottom-[8vw] -left-[3vw] hidden h-[17vw] w-[19vw] text-gold/45 lg:block" />
          </div>

          <div className="relative h-[47vw] w-full max-md:h-[105vw]" data-reveal>
            <div className="absolute left-[4%] top-[9%] w-[54%] rotate-[-4deg] border-[10px] border-sand bg-sand p-0 shadow-[0_28px_70px_rgba(70,55,33,.18)] transition-transform duration-700 hover:rotate-0 hover:scale-[1.02]">
              <img
                src={HEALTH_IMAGES[0].src}
                alt={HEALTH_IMAGES[0].alt}
                loading="lazy"
                className="aspect-[.83] w-full object-cover"
              />
              <span className="absolute -bottom-5 left-4 bg-cream px-2 py-1 font-hand text-[.85rem] text-cocoa/60">
                beach break, 11:42 am
              </span>
            </div>

            <div className="absolute right-[1%] top-[2%] w-[47%] rotate-[5deg] border-[10px] border-sand bg-sand shadow-[0_28px_70px_rgba(70,55,33,.16)] transition-transform duration-700 hover:rotate-0 hover:scale-[1.02]">
              <img
                src={HEALTH_IMAGES[2].src}
                alt={HEALTH_IMAGES[2].alt}
                loading="lazy"
                className="aspect-[.8] w-full object-cover"
              />
            </div>

            <div className="absolute bottom-[1%] right-[5%] w-[55%] rotate-[-2deg] border-[10px] border-sand bg-sand shadow-[0_28px_70px_rgba(70,55,33,.2)] transition-transform duration-700 hover:rotate-0 hover:scale-[1.02]">
              <img
                src={HEALTH_IMAGES[1].src}
                alt={HEALTH_IMAGES[1].alt}
                loading="lazy"
                className="aspect-[.92] w-full object-cover"
              />
              <span className="absolute -bottom-5 right-0 rotate-2 bg-cream px-2 py-1 font-hand text-[.85rem] text-cocoa/60">
                golden hour, somewhere south
              </span>
            </div>

            <div className="absolute left-[44%] top-[48%] z-20 flex h-[8.5vw] w-[8.5vw] rotate-[11deg] flex-col items-center justify-center rounded-full bg-beige text-center text-cocoa shadow-[0_15px_35px_rgba(70,55,33,.18)] max-md:h-[28vw] max-md:w-[28vw]">
              <PalmIcon className="h-[2.2vw] w-auto max-md:h-7" />
              <span className="mt-1 font-hand text-[.92vw] leading-[.95] max-md:text-[.78rem]">
                100% real
                <br />
                fruit + coconuts
              </span>
            </div>

            <DropIcon className="absolute bottom-[8%] left-[3%] h-[4.3vw] w-[4.3vw] -rotate-12 text-gold/50 max-md:h-10 max-md:w-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
