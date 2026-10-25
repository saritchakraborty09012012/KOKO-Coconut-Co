import { useEffect, useRef } from "react";
import { NAV_LINKS, PRODUCTS } from "../data/content";
import { useCart } from "../lib/store";
import { scrollToTarget } from "../lib/smoothScroll";
import useFocusTrap from "../lib/useFocusTrap";
import { PalmIcon } from "./Doodles";
import CanArt from "./CanArt";

export default function MenuOverlay() {
  const { menuOpen, setMenuOpen, setCartOpen } = useCart();
  const panelRef = useRef(null);

  useFocusTrap(menuOpen, panelRef);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen, setMenuOpen]);

  const go = (href) => {
    setMenuOpen(false);
    window.setTimeout(() => scrollToTarget(href), 620);
  };

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal={menuOpen ? "true" : undefined}
      aria-label="Site menu"
      tabIndex={-1}
      inert={!menuOpen}
      data-nav-theme={menuOpen ? "dark" : undefined}
      className={`fixed inset-0 z-[150] overflow-y-auto bg-cocoa text-cream ${
        menuOpen ? "visible" : "invisible"
      }`}
      style={{
        clipPath: menuOpen ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
        transition: menuOpen
          ? "clip-path .9s cubic-bezier(.77,0,.18,1), visibility 0s"
          : "clip-path .9s cubic-bezier(.77,0,.18,1), visibility 0s linear .9s",
      }}
      aria-hidden={!menuOpen}
    >
      <div className="pointer-events-none absolute inset-0 opacity-[.05] [background-image:radial-gradient(#ffe386_1px,transparent_1px)] [background-size:7px_7px]" />
      <div className="relative flex min-h-full flex-col px-[3vw] pt-[1.6vw] pb-[2vw] max-md:min-h-[100dvh] max-md:px-[5vw] max-md:pt-[5vw] max-md:pb-[8vw]">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => go("#top")}
            className="flex items-center gap-2 text-beige"
            aria-label="KOKO home"
          >
            <PalmIcon className="h-[2.8rem] w-auto" />
            <span className="font-display text-[1.35rem] font-semibold tracking-[-0.04em]">
              KOKO
            </span>
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            data-cursor="Close"
            className="flex h-[2.9rem] items-center gap-2 rounded-[.48rem] bg-beige px-4 text-cocoa transition-colors duration-300 hover:bg-[#ffeba6]"
          >
            <span className="font-hand text-[1.08rem] leading-none">CLOSE</span>
            <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none">
              <path d="m3 3 10 10M13 3 3 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="grid flex-1 grid-cols-[1.25fr_.75fr] items-center gap-[5vw] py-[4vh] max-lg:grid-cols-[1.1fr_.9fr] max-md:grid-cols-1 max-md:gap-10 max-md:py-12">
          <nav aria-label="Main menu">
            <ul className="flex flex-col">
              {NAV_LINKS.map((link, index) => (
                <li key={link.href} className="overflow-hidden">
                  <button
                    type="button"
                    onClick={() => go(link.href)}
                    data-cursor="Go"
                    className={`group flex w-full items-baseline gap-[1.5vw] border-b border-cream/12 py-[.6vw] text-left transition-all duration-700 hover:pl-[1vw] max-md:gap-4 max-md:py-3 ${
                      menuOpen
                        ? "translate-y-0 opacity-100"
                        : "translate-y-[110%] opacity-0"
                    }`}
                    style={{
                      transitionDelay: menuOpen ? `${150 + index * 65}ms` : "0ms",
                    }}
                  >
                    <span className="font-hand text-[.9rem] text-beige/55 max-md:text-[.8rem]">
                      0{index + 1}
                    </span>
                    <span className="font-display text-[6.3vw] leading-[.78] font-semibold tracking-[-0.055em] text-cream transition-colors duration-300 group-hover:text-beige max-md:text-[15vw]">
                      {link.label}
                    </span>
                    <svg
                      viewBox="0 0 40 40"
                      fill="none"
                      className="ml-auto h-[2.2vw] w-[2.2vw] -rotate-45 text-beige opacity-0 transition-all duration-300 group-hover:rotate-0 group-hover:opacity-100 max-md:h-7 max-md:w-7"
                    >
                      <path d="M7 20h26M23 9l10 11-10 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>

            <div
              className={`mt-[3vw] flex flex-wrap items-center gap-3 transition-all duration-700 max-md:mt-8 ${
                menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: menuOpen ? "560ms" : "0ms" }}
            >
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  setCartOpen(true);
                }}
                className="flex h-11 items-center rounded-[.45rem] bg-beige px-5 font-hand text-[1.05rem] text-cocoa transition-colors hover:bg-[#ffeba6]"
              >
                Stock the fridge
              </button>
              <a
                href="mailto:hello@koko.co.in"
                className="font-hand text-[1.05rem] text-sand/75 underline decoration-sand/30 underline-offset-4 transition-colors hover:text-beige"
              >
                hello@koko.co.in
              </a>
            </div>
          </nav>

          <div
            className={`relative mx-auto w-full max-w-[27rem] transition-all duration-700 max-md:max-w-[20rem] ${
              menuOpen ? "translate-y-0 rotate-0 opacity-100" : "translate-y-8 rotate-3 opacity-0"
            }`}
            style={{ transitionDelay: menuOpen ? "300ms" : "0ms" }}
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[.8rem] bg-[#d3b57b] shadow-[0_40px_80px_rgba(0,0,0,.25)]">
              <CanArt
                product={PRODUCTS[0]}
                eager
                transparent
                className="absolute inset-0"
                imgClassName="scale-[1.02]"
              />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-cocoa/70 to-transparent p-4 pt-16">
                <span className="font-hand text-[1.05rem] leading-tight text-cream">
                  Fresh from the grove
                  <br />
                  to your fridge.
                </span>
                <span className="font-display text-[1.2rem] font-semibold text-beige">
                  330 ML
                </span>
              </div>
            </div>
            <div className="absolute -right-4 -top-4 flex h-[4.7rem] w-[4.7rem] rotate-12 items-center justify-center rounded-full bg-beige text-center font-hand text-[.86rem] leading-[.95] text-cocoa shadow-lg max-md:-right-2 max-md:-top-3 max-md:h-16 max-md:w-16 max-md:text-[.7rem]">
              100%
              <br />
              natural
            </div>
            <img
              src="/assets/fruits/pineapple.webp"
              alt=""
              aria-hidden="true"
              className="absolute -bottom-8 -left-8 w-[7rem] rotate-[-18deg] drop-shadow-xl max-md:w-20"
            />
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-cream/15 pt-4 text-[.68rem] uppercase tracking-[.14em] text-sand/50">
          <span>Pune · India</span>
          <span className="hidden sm:block">Cold pressed. Never concentrated.</span>
          <span>Est. 2026</span>
        </div>
      </div>
    </div>
  );
}
