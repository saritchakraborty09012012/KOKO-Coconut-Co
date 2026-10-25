import { useEffect, useRef } from "react";
import { formatPrice, useCart } from "../lib/store";
import { PRODUCTS } from "../data/content";
import { scrollToTarget } from "../lib/smoothScroll";
import useFocusTrap from "../lib/useFocusTrap";
import CanArt from "./CanArt";
import { LeafDoodle, PalmIcon } from "./Doodles";

const FREE_SHIPPING = 999;

export default function CartDrawer() {
  const {
    items,
    subtotal,
    count,
    cartOpen,
    setCartOpen,
    setQty,
    removeItem,
    showToast,
  } = useCart();
  const drawerRef = useRef(null);

  useFocusTrap(cartOpen, drawerRef);

  useEffect(() => {
    if (!cartOpen) return;
    const onKey = (event) => {
      if (event.key === "Escape") setCartOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cartOpen, setCartOpen]);

  const remaining = Math.max(0, FREE_SHIPPING - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING) * 100);

  return (
    <>
      <div
        aria-hidden="true"
        onClick={() => setCartOpen(false)}
        className={`fixed inset-0 z-[145] bg-cocoa/45 backdrop-blur-[2px] transition-opacity duration-500 ${
          cartOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        ref={drawerRef}
        role="dialog"
        aria-modal={cartOpen ? "true" : undefined}
        aria-label="Shopping basket"
        aria-hidden={!cartOpen}
        inert={!cartOpen}
        tabIndex={-1}
        className={`fixed top-0 right-0 z-[155] flex h-[100dvh] w-[31.5rem] max-w-[100vw] flex-col bg-cream text-cocoa shadow-[-20px_0_80px_rgba(70,55,33,.18)] transition-transform duration-[650ms] ease-[cubic-bezier(.77,0,.18,1)] ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-cocoa/12 px-[2rem] py-[1.4rem] max-md:px-5">
          <div>
            <p className="eyebrow text-cocoa/50">KOKO coconut co.</p>
            <h2 className="font-display mt-1 text-[2.1rem] leading-[.85] font-semibold tracking-[-.04em]">
              YOUR CRATE{" "}
              <span className="font-hand text-[1.1rem] font-normal tracking-normal text-cocoa/45">
                ({count})
              </span>
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setCartOpen(false)}
            aria-label="Close basket"
            data-cursor="Close"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-cocoa/20 transition-colors hover:bg-beige"
          >
            <svg viewBox="0 0 18 18" fill="none" className="h-4 w-4">
              <path d="m4 4 10 10M14 4 4 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {items.length > 0 && (
          <div className="border-b border-cocoa/10 px-[2rem] py-[.9rem] max-md:px-5">
            <div className="flex items-center justify-between text-[.72rem]">
              <span className="font-hand text-[.95rem] text-cocoa/80">
                {remaining > 0
                  ? `${formatPrice(remaining)} away from free shipping`
                  : "Free shipping, on the house."}
              </span>
              <span className="text-cocoa/45">{Math.round(progress)}%</span>
            </div>
            <div className="mt-2 h-[3px] overflow-hidden rounded-full bg-cocoa/10">
              <div
                className="h-full rounded-full bg-gold transition-[width] duration-700"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <div className="hide-scrollbar flex-1 overflow-y-auto px-[2rem] max-md:px-5">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center pb-10 text-center">
              <div className="relative mb-6 flex h-[16rem] w-[16rem] items-center justify-center rounded-full bg-beige/25">
                <LeafDoodle className="absolute -left-4 bottom-6 h-20 w-20 -rotate-12 text-gold/50" />
                <div className="relative h-[13rem] w-[8rem] rotate-3 overflow-hidden rounded-t-[2.4rem] rounded-b-[1.8rem] border border-cocoa/10 bg-[#f5edcb] shadow-[0_22px_35px_rgba(70,55,33,.18)]">
                  <CanArt product={PRODUCTS[0]} transparent className="h-full w-full" />
                </div>
                <PalmIcon className="absolute -right-3 top-4 h-14 w-auto rotate-12 text-gold/40" />
              </div>
              <h3 className="font-display text-[2.4rem] leading-none font-semibold tracking-[-.04em]">
                NOTHING IN HERE.
              </h3>
              <p className="copy-sm mt-3 max-w-[19rem] text-cocoa/65">
                A fridge without KOKO is just a fridge. Let's fix that.
              </p>
              <button
                type="button"
                onClick={() => {
                  setCartOpen(false);
                  setTimeout(() => scrollToTarget("#flavours"), 450);
                }}
                className="pill-btn mt-6"
              >
                Explore flavours
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-cocoa/10">
              {items.map(({ id, qty, product }) => (
                <li key={id} className="flex gap-4 py-5">
                  <div className="h-[7.4rem] w-[5.6rem] shrink-0 overflow-hidden rounded-[.4rem]">
                    <CanArt product={product} className="h-full w-full" />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-display text-[1.25rem] leading-[.9] font-semibold tracking-[-.03em]">
                          {product.name}
                        </h3>
                        <p className="mt-1 text-[.68rem] uppercase tracking-[.12em] text-cocoa/45">
                          {product.size} · Pack of {qty}
                        </p>
                      </div>
                      <p className="shrink-0 font-hand text-[1.05rem]">
                        {formatPrice(product.price * qty)}
                      </p>
                    </div>
                    <p className="mt-1.5 font-hand text-[.85rem] text-cocoa/55">
                      {product.taste}
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex h-8 items-center rounded-full border border-cocoa/20">
                        <button
                          type="button"
                          onClick={() => setQty(id, qty - 1)}
                          aria-label={`Decrease ${product.name} quantity`}
                          className="flex h-full w-8 items-center justify-center text-lg leading-none transition-colors hover:text-gold"
                        >
                          −
                        </button>
                        <span className="w-6 text-center text-[.78rem] tabular-nums">
                          {qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQty(id, qty + 1)}
                          aria-label={`Increase ${product.name} quantity`}
                          className="flex h-full w-8 items-center justify-center text-lg leading-none transition-colors hover:text-gold"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(id)}
                        className="font-hand text-[.82rem] text-cocoa/40 underline decoration-cocoa/20 underline-offset-2 transition-colors hover:text-cocoa"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-cocoa/12 px-[2rem] py-[1.5rem] max-md:px-5">
          <div className="flex items-end justify-between">
            <div>
              <p className="eyebrow text-cocoa/45">Subtotal</p>
              <p className="font-display mt-1 text-[2.2rem] leading-[.8] font-semibold tracking-[-.04em]">
                {formatPrice(subtotal)}
              </p>
            </div>
            <p className="font-hand text-[.82rem] text-cocoa/50">
              Taxes & shipping
              <br />
              at checkout
            </p>
          </div>
          <button
            type="button"
            disabled={!items.length}
            onClick={() =>
              showToast("Demo store — your hydration is on the house.")
            }
            className="mt-4 flex h-13 w-full items-center justify-center gap-2 rounded-[.4rem] bg-cocoa px-5 font-hand text-[1.12rem] text-cream transition-all duration-300 hover:bg-[#5a472b] disabled:cursor-not-allowed disabled:opacity-35"
          >
            <span>Take me to checkout</span>
            <svg viewBox="0 0 28 16" fill="none" className="h-3 w-6">
              <path d="M1 8h25M19 2l7 6-7 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <p className="mt-3 text-center font-hand text-[.78rem] text-cocoa/40">
            Free shipping on boxes over {formatPrice(FREE_SHIPPING)}
          </p>
        </div>
      </aside>
    </>
  );
}
