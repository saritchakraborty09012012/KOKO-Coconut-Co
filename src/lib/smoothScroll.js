import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./gsap";

let lenis = null;

export function createSmoothScroll() {
  if (lenis) return lenis;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return null;

  lenis = new Lenis({
    duration: 1.1,
    smoothWheel: true,
    wheelMultiplier: 0.95,
    touchMultiplier: 1.4,
    infinite: false,
  });

  lenis.on("scroll", ScrollTrigger.update);

  const tick = (time) => lenis?.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  window.__lenis = lenis;
  window.__lenisTick = tick;

  return lenis;
}

export function destroySmoothScroll() {
  if (!lenis) return;
  if (window.__lenisTick) gsap.ticker.remove(window.__lenisTick);
  lenis.destroy();
  lenis = null;
  delete window.__lenis;
  delete window.__lenisTick;
}

export function scrollToTarget(target, options = {}) {
  const element =
    typeof target === "string" ? document.querySelector(target) : target;
  if (!element) return;

  const header = document.querySelector("header");
  const clearance = (header?.getBoundingClientRect().height ?? 72) + 14;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (window.__lenis) {
    window.__lenis.scrollTo(element, {
      offset: -clearance,
      duration: 1.4,
      ...options,
    });
  } else {
    const top =
      window.scrollY + element.getBoundingClientRect().top - clearance;
    window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
  }
}

export function lockScroll(locked) {
  document.body.classList.toggle("is-locked", locked);
  if (!window.__lenis) return;
  if (locked) window.__lenis.stop();
  else window.__lenis.start();
}
