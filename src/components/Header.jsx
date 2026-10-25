import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "../lib/gsap";
import { toggleAmbient } from "../lib/ambience";
import { useCart } from "../lib/store";
import { scrollToTarget } from "../lib/smoothScroll";
import { PalmIcon } from "./Doodles";

function SoundIcon({ on }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-[1.2rem] w-[1.2rem]"
      aria-hidden="true"
    >
      <path
        d="M4.2 9.4h3.1L11 6.2v11.6l-3.7-3.2H4.2V9.4Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      {on ? (
        <>
          <path
            d="M14.4 9.3a4.3 4.3 0 0 1 0 5.4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M17.2 6.8a8.1 8.1 0 0 1 0 10.4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </>
      ) : (
        <path
          d="m15.2 9.6 4.6 4.8m0-4.8-4.6 4.8"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[1.15rem] w-[1.15rem]" aria-hidden="true">
      <path
        d="M5.5 8.2h13l-1.1 11.4a1.5 1.5 0 0 1-1.5 1.3H8.1a1.5 1.5 0 0 1-1.5-1.3L5.5 8.2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M8.6 9V6.6a3.4 3.4 0 0 1 6.8 0V9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Header() {
  const { count, setCartOpen, setMenuOpen, menuOpen, cartOpen } = useCart();
  const [dark, setDark] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const activeSections = useRef(new Set());

  const handleSound = async () => {
    const next = await toggleAmbient();
    setSoundOn(next);
  };

  useEffect(() => {
    const triggers = [];
    const sections = Array.from(
      document.querySelectorAll('[data-nav-theme="dark"]'),
    );

    sections.forEach((section, index) => {
      triggers.push(
        ScrollTrigger.create({
          trigger: section,
          start: "top 80px",
          end: "bottom 80px",
          onToggle: (self) => {
            if (self.isActive) activeSections.current.add(index);
            else activeSections.current.delete(index);
            setDark(activeSections.current.size > 0);
          },
        }),
      );
    });

    return () => triggers.forEach((trigger) => trigger.kill());
  }, []);

  const navClass = dark ? "text-beige" : "text-cocoa";
  const buttonClass = dark
    ? "bg-beige text-cocoa shadow-[0_2px_0_rgba(0,0,0,.12)] hover:bg-[#ffeba6]"
    : "bg-cocoa text-beige shadow-[0_2px_0_rgba(70,55,33,.16)] hover:bg-molasses";

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-[100]">
      <div className="flex items-center justify-between px-[3vw] pt-[1.6vw] pb-[1vw] max-md:px-[5vw] max-md:pt-[5vw]">
        <button
          type="button"
          onClick={() => scrollToTarget("#top", { duration: 1.6 })}
          data-cursor="Top"
          aria-label="KOKO home"
          className={`pointer-events-auto flex items-center gap-2 transition-colors duration-500 ${navClass}`}
        >
          <PalmIcon className="h-[3rem] w-auto max-md:h-[2.5rem]" />
        </button>

        <div className="pointer-events-auto flex items-center gap-2">
          <button
            type="button"
            onClick={handleSound}
            aria-label={soundOn ? "Mute ambient sound" : "Enable ambient sound"}
            aria-pressed={soundOn}
            data-cursor={soundOn ? "Mute" : "Sound"}
            className={`flex h-[2.9rem] w-[2.9rem] items-center justify-center rounded-[.48rem] transition-all duration-300 hover:-translate-y-px max-md:h-[2.7rem] max-md:w-[2.7rem] ${buttonClass}`}
          >
            <SoundIcon on={soundOn} />
          </button>
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            aria-label={`Open basket, ${count} items`}
            data-cursor="Basket"
            className={`relative flex h-[2.9rem] items-center gap-2 rounded-[.48rem] px-3.5 transition-all duration-300 hover:-translate-y-px max-md:h-[2.7rem] max-md:px-3 ${buttonClass}`}
          >
            <CartIcon />
            <span className="font-hand text-[1.05rem] leading-none">CART</span>
            <span
              className={`ml-0.5 flex h-[1.15rem] min-w-[1.15rem] items-center justify-center rounded-full px-1 text-[.58rem] font-semibold transition-transform duration-300 ${
                dark ? "bg-cocoa text-beige" : "bg-beige text-cocoa"
              } ${count > 0 ? "scale-100" : "scale-0"}`}
            >
              {count}
            </span>
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            data-cursor="Menu"
            className={`flex h-[2.9rem] w-[6.2rem] items-center justify-center rounded-[.48rem] transition-all duration-300 hover:-translate-y-px max-md:h-[2.7rem] max-md:w-[5.2rem] ${buttonClass}`}
          >
            <span className="font-hand text-[1.08rem] leading-none">MENU</span>
          </button>
        </div>
      </div>
      <span className="sr-only" aria-live="polite">
        {cartOpen ? "Basket open" : ""}
      </span>
    </header>
  );
}
