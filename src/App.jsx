import { useCallback, useEffect, useState } from "react";
import { gsap, ScrollTrigger } from "./lib/gsap";
import {
  createSmoothScroll,
  destroySmoothScroll,
  lockScroll,
} from "./lib/smoothScroll";
import { CartProvider, useCart } from "./lib/store";
import Preloader from "./components/Preloader";
import CustomCursor from "./components/CustomCursor";
import Header from "./components/Header";
import MenuOverlay from "./components/MenuOverlay";
import CartDrawer from "./components/CartDrawer";
import Toast from "./components/Toast";
import GyroPill from "./components/GyroPill";
import CoconutSequence from "./components/CoconutSequence";
import Introduction from "./components/Introduction";
import Flavours from "./components/Flavours";
import Health from "./components/Health";
import Reviews from "./components/Reviews";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function Site() {
  const [started, setStarted] = useState(prefersReducedMotion);
  const [loaderVisible, setLoaderVisible] = useState(
    () => !prefersReducedMotion(),
  );
  const { cartOpen, menuOpen } = useCart();

  const handleReady = useCallback(() => setStarted(true), []);
  const handleLifted = useCallback(() => setLoaderVisible(false), []);

  useEffect(() => {
    createSmoothScroll();
    return () => destroySmoothScroll();
  }, []);

  useEffect(() => {
    lockScroll(!started || cartOpen || menuOpen);
  }, [started, cartOpen, menuOpen]);

  useEffect(() => {
    if (!started) return;
    ScrollTrigger.refresh();
    const shape = window.setTimeout(() => ScrollTrigger.refresh(), 700);

    if (prefersReducedMotion()) {
      return () => window.clearTimeout(shape);
    }

    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-reveal]").forEach((element) => {
        gsap.fromTo(
          element,
          { y: 46, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 1.05,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              once: true,
            },
          },
        );
      });
    }, document.body);

    return () => {
      window.clearTimeout(shape);
      ctx.revert();
    };
  }, [started]);

  return (
    <>
      <a
        href="#story"
        className="fixed top-3 left-3 z-[250] -translate-y-24 rounded bg-cocoa px-4 py-2 font-hand text-cream transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>

      {loaderVisible && (
        <Preloader onReady={handleReady} onLifted={handleLifted} />
      )}
      <CustomCursor />
      <Header />
      <MenuOverlay />
      <CartDrawer />
      <Toast />
      <GyroPill />

      <main id="top" className="relative w-full overflow-x-clip">
        <CoconutSequence started={started} />
        <Introduction />
        <Flavours />
        <Health />
        <Reviews />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <CartProvider>
      <Site />
    </CartProvider>
  );
}
