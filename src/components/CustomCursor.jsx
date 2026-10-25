import { useEffect, useRef, useState } from "react";
import { gsap } from "../lib/gsap";

export default function CustomCursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const [enabled] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: fine)").matches,
  );
  const [label, setLabel] = useState("");
  const [hovering, setHovering] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (!enabled || !dot.current || !ring.current) return;
    document.documentElement.classList.add("has-custom-cursor");

    const dotX = gsap.quickTo(dot.current, "x", { duration: 0.09, ease: "power2.out" });
    const dotY = gsap.quickTo(dot.current, "y", { duration: 0.09, ease: "power2.out" });
    const ringX = gsap.quickTo(ring.current, "x", { duration: 0.42, ease: "power3.out" });
    const ringY = gsap.quickTo(ring.current, "y", { duration: 0.42, ease: "power3.out" });

    gsap.set([dot.current, ring.current], { opacity: 0 });

    const onMove = (event) => {
      dotX(event.clientX);
      dotY(event.clientY);
      ringX(event.clientX);
      ringY(event.clientY);
      gsap.to([dot.current, ring.current], {
        opacity: 1,
        duration: 0.22,
        overwrite: "auto",
      });
      const target =
        event.target instanceof Element
          ? event.target.closest("[data-cursor]")
          : null;
      if (target) {
        setHovering(true);
        setLabel(target.getAttribute("data-cursor") || "");
      } else {
        setHovering(false);
        setLabel("");
      }
      setDark(
        Boolean(
          event.target instanceof Element &&
            event.target.closest('[data-nav-theme="dark"]'),
        ),
      );
    };

    const onLeave = () => {
      gsap.to([dot.current, ring.current], { opacity: 0, duration: 0.2 });
    };

    const onDown = () => {
      gsap.to(ring.current, { scale: 0.72, duration: 0.18 });
    };
    const onUp = () => {
      gsap.to(ring.current, { scale: 1, duration: 0.24 });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseout", onLeave);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true">
      <div ref={dot} className="cursor-dot" />
      <div
        ref={ring}
        className={`cursor-ring${hovering ? " cursor-hover" : ""}${
          dark ? " cursor-dark" : ""
        }`}
      >
        <span>{label && label !== "true" ? label : ""}</span>
      </div>
    </div>
  );
}
