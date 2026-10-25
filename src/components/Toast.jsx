import { useCart } from "../lib/store";
import { PalmIcon } from "./Doodles";

export default function Toast() {
  const { toast } = useCart();

  return (
    <div
      className={`pointer-events-none fixed bottom-[2.4rem] left-1/2 z-[210] -translate-x-1/2 transition-all duration-500 ${
        toast ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
      }`}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center gap-3 rounded-full border border-beige/30 bg-cocoa px-5 py-3 text-sand shadow-[0_18px_50px_rgba(0,0,0,.24)]">
        <PalmIcon className="h-4 w-auto text-beige" />
        <span className="font-hand text-[1.02rem] leading-none">{toast}</span>
      </div>
    </div>
  );
}
