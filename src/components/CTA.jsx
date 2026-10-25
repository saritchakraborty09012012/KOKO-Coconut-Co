import { useState } from "react";
import { PRODUCTS } from "../data/content";
import { useCart } from "../lib/store";
import { scrollToTarget } from "../lib/smoothScroll";
import { PalmIcon, ScribbleFrame } from "./Doodles";
import CanArt from "./CanArt";

function Rivet({ style }) {
  return (
    <span
      className="absolute h-[.48rem] w-[.48rem] rounded-full bg-cocoa/80"
      style={style}
    />
  );
}

export default function CTA() {
  const [selected, setSelected] = useState(0);
  const { addItem, setCartOpen } = useCart();
  const product = PRODUCTS[selected];

  const step = (direction) => {
    setSelected(
      (current) =>
        (current + direction + PRODUCTS.length) % PRODUCTS.length,
    );
  };

  return (
    <section className="texture relative z-10 w-full overflow-hidden bg-cream px-[3vw] pt-[2vw] pb-[13vw] max-md:px-[4vw] max-md:pt-[10vw] max-md:pb-[28vw]">
      <div className="grid min-h-[43vw] grid-cols-2 gap-[1.4vw] max-md:min-h-0 max-md:grid-cols-1 max-md:gap-4">
        <div className="texture relative flex flex-col justify-between overflow-hidden rounded-[.8rem] bg-beige p-[3vw] text-cocoa max-md:p-6">
          <Rivet style={{ left: "1rem", bottom: "1rem" }} />
          <Rivet style={{ right: "1rem", bottom: "1rem" }} />
          <div>
            <div className="flex items-center gap-2">
              <PalmIcon className="h-[1.6rem] w-auto" />
              <span className="eyebrow">Straight from the shell</span>
            </div>
            <h2 className="mt-4 text-[7.3vw] leading-[.8] font-semibold tracking-[-.055em] uppercase max-md:text-[15vw]">
              THE OASIS OF
              <br />
              HEALTH.
            </h2>
            <p className="copy-sm mt-[2vw] max-w-[21rem] text-cocoa/75 max-md:mt-5">
              Chilled, clean, ready to sip. Order before the batch runs dry.
            </p>
            <div className="mt-[2.4vw] flex flex-wrap items-center gap-2 max-md:mt-6">
              <button
                type="button"
                onClick={() => {
                  addItem(product, 6);
                  setCartOpen(true);
                }}
                data-cursor="Stock up"
                className="scribble-btn h-[3.8rem] w-[12.2rem]"
              >
                <ScribbleFrame className="h-full w-full" />
                <span>Get Your Drink</span>
              </button>
              <button
                type="button"
                onClick={() => scrollToTarget("#flavours")}
                className="scribble-btn h-[3.8rem] w-[12.2rem]"
              >
                <ScribbleFrame className="h-full w-full" />
                <span>Explore Flavors</span>
              </button>
            </div>
          </div>
          <div className="mt-[3vw] flex items-center gap-2 font-hand text-[.92rem] text-cocoa/50 max-md:mt-8">
            <span className="h-[1px] w-7 bg-cocoa/30" />
            A six-pack of the good stuff
          </div>
        </div>

        <div className="relative flex min-h-[43vw] flex-col overflow-hidden rounded-[.8rem] bg-[#8b6b40] text-cream max-md:min-h-[100vw]">
          <Rivet style={{ left: "1rem", top: "1rem" }} />
          <Rivet style={{ right: "1rem", top: "1rem" }} />
          <Rivet style={{ left: "1rem", bottom: "1rem" }} />
          <Rivet style={{ right: "1rem", bottom: "1rem" }} />

          <div className="absolute inset-x-0 top-[5%] flex items-center justify-between px-[7%]">
            <span className="eyebrow text-cream/50">The fridge favourite</span>
            <span className="font-hand text-[.95rem] text-cream/60">
              0{selected + 1} / 0{PRODUCTS.length}
            </span>
          </div>

          <div className="relative flex flex-1 items-center justify-center pb-12">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous flavour"
              data-cursor="Prev"
              className="absolute left-[5%] top-1/2 z-20 flex h-[4vw] w-[4vw] -translate-y-1/2 items-center justify-center rounded-full bg-cocoa text-cream shadow-lg transition-transform duration-300 hover:scale-110 max-md:h-12 max-md:w-12"
            >
              <svg viewBox="0 0 28 16" fill="none" className="h-3.5 w-7">
                <path d="M27 8H2M9 2 2 8l7 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div key={product.id} className="can-stage relative h-[37vw] w-[57%] max-md:h-[78vw]">
              <div
                className="absolute inset-x-[8%] bottom-[7%] h-[5%] rounded-[50%] bg-cocoa/25 blur-md"
                aria-hidden="true"
              />
              <CanArt
                product={product}
                eager
                transparent
                className="relative h-full w-full"
                imgClassName="drop-shadow-[0_30px_28px_rgba(30,20,10,.28)]"
              />
            </div>

            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next flavour"
              data-cursor="Next"
              className="absolute right-[5%] top-1/2 z-20 flex h-[4vw] w-[4vw] -translate-y-1/2 items-center justify-center rounded-full bg-cocoa text-cream shadow-lg transition-transform duration-300 hover:scale-110 max-md:h-12 max-md:w-12"
            >
              <svg viewBox="0 0 28 16" fill="none" className="h-3.5 w-7">
                <path d="M1 8h25M19 2l7 6-7 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <div className="flex items-end justify-between border-t border-cream/15 px-[7%] py-[4%]">
            <div>
              <p className="font-display text-[1.5rem] leading-none font-semibold tracking-[-.03em] text-cream">
                {product.name}
              </p>
              <p className="mt-1 font-hand text-[.9rem] text-cream/50">
                {product.taste}
              </p>
            </div>
            <span className="font-hand text-[1.1rem] text-beige">
              ₹{product.price}
            </span>
          </div>
        </div>
      </div>

    </section>
  );
}
