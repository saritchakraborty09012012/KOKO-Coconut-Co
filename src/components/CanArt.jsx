import { useState } from "react";
import { PalmIcon } from "./Doodles";

export default function CanArt({
  product,
  className = "",
  imgClassName = "",
  eager = false,
  transparent = false,
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={{ background: transparent ? "transparent" : product.tint }}
    >
      {!failed ? (
        <img
          src={product.can}
          alt={`${product.name} coconut water`}
          width="1100"
          height="1650"
          loading={eager ? "eager" : "lazy"}
          draggable="false"
          onError={() => setFailed(true)}
          className={`h-full w-full object-contain select-none ${imgClassName}`}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center p-[12%]">
          <div
            className="relative flex h-[82%] w-[42%] flex-col items-center justify-between overflow-hidden rounded-[2.2rem] px-[9%] py-[12%] shadow-[0_25px_40px_rgba(70,55,33,.22)]"
            style={{
              background: `linear-gradient(90deg, rgba(0,0,0,.17), transparent 17%, rgba(255,255,255,.4) 48%, transparent 72%, rgba(0,0,0,.2)), ${product.bg}`,
              color: product.ink,
            }}
          >
            <div className="w-full text-center">
              <PalmIcon className="mx-auto mb-[8%] h-auto w-[23%]" />
              <p className="font-display text-[1.25rem] leading-[.8] font-semibold tracking-[-.04em]">
                KOKO
              </p>
              <p
                className="mt-[4%] text-[.38rem] font-semibold uppercase tracking-[.24em]"
                style={{ color: product.accent }}
              >
                {product.short}
              </p>
            </div>
            <p className="font-hand text-[.65rem] opacity-60">naturally refreshing</p>
            <p className="text-[.42rem] uppercase tracking-[.18em] opacity-60">
              {product.size}
            </p>
            <div className="pointer-events-none absolute inset-x-0 top-[46%] h-[22%] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,.55),transparent_65%)]" />
          </div>
        </div>
      )}
    </div>
  );
}
