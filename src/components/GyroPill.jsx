import { useEffect, useState } from "react";
import { useCart } from "../lib/store";

export default function GyroPill() {
  const [hidden, setHidden] = useState(false);
  const [coarse, setCoarse] = useState(false);
  const { showToast, cartOpen, menuOpen } = useCart();

  useEffect(() => {
    const query = window.matchMedia("(pointer: coarse)");
    const update = () => setCoarse(query.matches);
    update();
    query.addEventListener?.("change", update);
    return () => query.removeEventListener?.("change", update);
  }, []);

  if (!coarse || hidden || cartOpen || menuOpen) return null;

  const handleClick = async () => {
    if (
      typeof DeviceOrientationEvent !== "undefined" &&
      typeof DeviceOrientationEvent.requestPermission === "function"
    ) {
      try {
        const state = await DeviceOrientationEvent.requestPermission();
        if (state === "granted") {
          showToast("Tilt away — the coconut is listening.");
        } else {
          showToast("Motion access wasn't granted.");
        }
      } catch {
        showToast("Motion sensors aren't available here.");
      }
    } else {
      showToast("Move your cursor — the can follows.");
    }
  };

  return (
    <aside className="fixed bottom-5 left-5 z-40 max-md:bottom-4 max-md:left-4">
      <div className="flex items-center gap-2 rounded-full border border-cocoa/15 bg-cream/80 py-1 pr-2 pl-1 shadow-[0_10px_30px_rgba(70,55,33,.12)] backdrop-blur-md">
        <button
          type="button"
          onClick={handleClick}
          data-cursor="Tilt"
          className="flex items-center gap-2 rounded-full py-1 pr-2 pl-2 text-left transition-colors hover:bg-beige/40"
        >
          <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-beige">
            <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
              <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M12 6.5v11M6.5 12h11" stroke="currentColor" strokeWidth="1" opacity=".5" />
              <path d="m12 12 3-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
          </span>
          <span className="font-hand text-[.94rem] leading-none">GYRO SENSOR</span>
          <span className="hidden text-[.66rem] uppercase tracking-[.12em] text-cocoa/50 sm:inline">
            Tilt to explore
          </span>
        </button>
        <button
          type="button"
          aria-label="Dismiss gyro prompt"
          onClick={() => setHidden(true)}
          className="flex h-6 w-6 items-center justify-center rounded-full text-cocoa/45 transition-colors hover:bg-cocoa/5 hover:text-cocoa"
        >
          <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none">
            <path d="m3 3 10 10M13 3 3 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </aside>
  );
}
