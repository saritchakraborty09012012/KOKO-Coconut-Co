import { PRODUCTS } from "../data/content";
import { useCart } from "../lib/store";
import { SunDoodle, PalmIcon, WaveUnderline } from "./Doodles";
import CanArt from "./CanArt";

function PlusIcon() {
  return (
    <svg viewBox="0 0 28 28" fill="none" className="h-full w-full" aria-hidden="true">
      <path d="M14 2v24M2 14h24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export default function Flavours() {
  const { addItem } = useCart();

  return (
    <section
      id="flavours"
      data-nav-theme="dark"
      className="relative z-10 mt-[-1px] w-full bg-cocoa pb-[7vw] text-cream texture max-md:pb-[20vw]"
    >
      <div className="paddx pt-[4.5vw] max-md:pt-[12vw]">
        <div className="flex items-center justify-between gap-4" data-reveal>
          <h2 className="h150 leading-[.76] text-cream">EXPLORE ALL</h2>
          <SunDoodle className="h-[5.2vw] w-[5.2vw] shrink-0 text-gold max-md:h-10 max-md:w-10" />
          <h2 className="h150 leading-[.76] text-cream max-md:text-right">
            FLAVOURS
          </h2>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className="font-hand text-[1rem] text-sand/55">
            six flavours. one very good coconut.
          </span>
          <WaveUnderline className="h-3 w-[9rem] text-beige/60 max-md:hidden" />
          <span className="eyebrow text-sand/40">330 ml · cold pressed</span>
        </div>

        <div className="mt-[3vw] grid grid-cols-3 gap-x-[1.4vw] gap-y-[3vw] max-lg:grid-cols-2 max-md:flex max-md:snap-x max-md:snap-mandatory max-md:gap-4 max-md:overflow-x-auto max-md:pb-5 max-md:[-ms-overflow-style:none] max-md:[scrollbar-width:none]">
          {PRODUCTS.map((product, index) => (
            <article
              key={product.id}
              data-reveal
              className="group relative flex min-w-0 flex-col bg-cream text-cocoa max-md:w-[78vw] max-md:shrink-0 max-md:snap-center"
            >
              <div
                className="relative aspect-[.84] w-full overflow-hidden"
                style={{ backgroundColor: product.bg }}
              >
                <CanArt
                  product={product}
                  className="absolute inset-0 bg-transparent"
                  imgClassName="scale-[1.01] transition-transform duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.065] group-hover:-rotate-[1deg]"
                />
                <PalmIcon
                  className="absolute left-[.75rem] top-[.75rem] h-[1.8rem] w-auto opacity-30 transition-opacity duration-500 group-hover:opacity-70"
                  style={{ color: product.accent }}
                />
                <span
                  className="absolute right-[.7rem] top-[.7rem] rounded-full px-2 py-[.18rem] text-[.6rem] font-semibold uppercase tracking-[.12em]"
                  style={{
                    color: product.accent,
                    border: `1px solid ${product.accent}55`,
                  }}
                >
                  0{index + 1}
                </span>
                <div className="pointer-events-none absolute inset-x-[8%] bottom-[6%] h-[12%] rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(70,55,33,.2),transparent_70%)] blur-sm" />
              </div>

              <div className="flex h-[4.8rem] items-center justify-between border-t border-cocoa/10 px-[1.1rem] max-md:h-[4.2rem]">
                <div className="flex min-w-0 flex-col">
                  <h3 className="truncate font-hand text-[1.25rem] leading-none">
                    {product.short}
                  </h3>
                  <span className="mt-1 text-[.63rem] uppercase tracking-[.12em] text-cocoa/45">
                    {product.size} · ₹{product.price}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => addItem(product, 1)}
                  aria-label={`Add ${product.name} to basket`}
                  data-cursor="Add"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full p-2 transition-all duration-300 hover:rotate-90 hover:bg-beige"
                >
                  <PlusIcon />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
