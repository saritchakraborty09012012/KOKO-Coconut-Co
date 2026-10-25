const palmPaths = [
  "M277.092 287.522L245.263 399.581L218.361 390.494L239.606 419.495L201.243 554.522C168.118 513.043 154.848 454.355 170.874 397.958C186.897 341.53 228.253 301.325 277.092 287.522Z",
  "M103.415 239.474C157.405 208.979 218.871 215.871 273.502 251.532L111.253 343.181L93.7865 296.4L90.1138 355.127L2.44079e-05 406.036C13.6111 331.805 49.4243 269.968 103.415 239.474Z",
  "M208.565 133.999L163.197 163.698L124.48 138.82L144.267 92.6644L98.9187 122.376L18.5067 70.6849C67.6015 28.2433 133.909 20.2124 190.768 56.7573C247.628 93.3141 279.895 164.727 279.238 238.309L188.778 180.141L208.565 133.999Z",
  "M396.393 71.7699L422.723 105.798L302.498 245.312C288.192 180.678 303.813 106.961 347.994 55.7056C392.172 4.43934 453.144 -10.6948 505.07 10.2686L442.601 82.755L396.393 71.7699Z",
  "M449.012 222.22C500.592 240.23 537.353 290.902 548.572 350.682L490.342 330.346L481.041 295.881L474.335 324.775L422.226 306.586L411.391 266.372L403.553 300.076L309.091 267.121C344.373 223.573 397.414 204.232 449.012 222.22Z",
  "M304.516 289.092L319.911 283.862C395.457 361.945 393.499 553.082 393.499 553.082L337.396 540.843C362.958 447.172 314.664 307.33 304.516 289.092Z",
];

export function PalmIcon({ className = "", ...rest }) {
  return (
    <svg
      viewBox="0 0 549 555"
      fill="currentColor"
      className={className}
      aria-hidden="true"
      {...rest}
    >
      {palmPaths.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}

export function PalmMark({ className = "" }) {
  return (
    <span className={`inline-flex items-center gap-[.55rem] ${className}`}>
      <PalmIcon className="h-[2.6rem] w-auto" />
      <span className="font-display text-[1.42rem] leading-none font-semibold tracking-[-0.04em]">
        KOKO
      </span>
    </span>
  );
}

export function ScribbleFrame({ className = "", dark = false }) {
  return (
    <svg
      viewBox="0 0 300 70"
      fill="none"
      className={className}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M18 38C8 20 39 8 84 7c48-2 130-2 165 7 23 6 37 15 33 26-4 12-39 20-90 22-52 2-122 1-157-8-14-4-20-9-18-16 2-8 19-14 46-18"
        stroke={dark ? "#ffe386" : "#463721"}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M199 63c19 4 42 3 60-1"
        stroke={dark ? "#ffe386" : "#463721"}
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity=".7"
      />
    </svg>
  );
}

export function ArrowCurve({ className = "" }) {
  return (
    <svg
      viewBox="0 0 130 92"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M10 8c37 2 72 17 91 39 9 11 13 24 11 39"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="m91 72 21 15 10-20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SmileyDoodle({ className = "" }) {
  return (
    <svg viewBox="0 0 112 112" className={className} aria-hidden="true">
      <circle cx="56" cy="56" r="48" fill="#e2bd4f" stroke="#f8f8f0" strokeWidth="2" />
      <circle cx="56" cy="56" r="43" fill="none" stroke="#6b5125" strokeWidth="1.4" strokeLinecap="round" strokeDasharray="150 10" />
      <path
        d="M35 53c3.8-5.8 11.2-5.8 15 0M63 53c3.8-5.8 11.2-5.8 15 0"
        fill="none"
        stroke="#43351e"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      <path
        d="M33 67c6.7 11.4 18.4 16.7 30.4 13.5 6.4-1.7 11.8-5.8 15.6-12"
        fill="none"
        stroke="#43351e"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      <path
        d="M62 78c2.6 7 9.8 7.6 12.4 1.3.9-2.2.8-4.6.2-6.6-4.2 3.5-8.5 5.3-12.6 5.3Z"
        fill="#bd8b46"
        stroke="#43351e"
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IceCubeDoodle({ className = "" }) {
  return (
    <svg viewBox="0 0 150 140" fill="none" className={className} aria-hidden="true">
      <path
        d="M35 23l68 8 25 27-8 61-71-9-31-31 4-50 13-6Z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path
        d="M35 23l9 60 76 36M44 83l-22 27M44 83l68-54"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        opacity=".8"
      />
      <path
        d="M86 43l-5 51M98 48l-5 47M61 100l1-10"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity=".6"
      />
    </svg>
  );
}

export function CrumpledCanDoodle({ className = "" }) {
  return (
    <svg viewBox="0 0 170 200" fill="none" className={className} aria-hidden="true">
      <path
        d="M53 12c19-6 43-7 61-2l20 9-7 16c10 11 14 26 12 41l-7 80c-2 17-8 31-18 35-16 7-42 8-59 1-12-5-18-16-19-31l-5-75c-2-17 0-33 7-46l-9-13 24-15Z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path
        d="M62 9l7 177M101 7l7 180M55 61c19 10 45 11 65 3M53 148c19 11 45 12 66 2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        opacity=".8"
      />
      <path
        d="M72 35l-7 29 20-17 10 17 10-11M60 128l18-13-4 20 17-8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity=".6"
      />
    </svg>
  );
}

export function CoconutHalfDoodle({ className = "" }) {
  return (
    <svg viewBox="0 0 300 280" fill="none" className={className} aria-hidden="true">
      <path
        d="M36 202c-18-48 28-97 99-118 62-18 125-6 139 26 8 18-14 40-42 55-36 19-83 28-121 22-27-4-47-23-38-41 8-16 38-25 70-26"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <path
        d="M47 211c-3 17 8 31 26 38 16 6 35 7 53 3M218 173c19-10 35-23 36-37 1-12-9-20-25-26"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M84 104c-16 9-29 21-36 34M124 86c18-2 36 0 52 5M111 150c20 2 44-2 64-10M198 108c15 3 28 8 38 15M74 193l153-55M93 224l123-46"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity=".7"
      />
    </svg>
  );
}

export function SunDoodle({ className = "" }) {
  const rays = Array.from({ length: 28 }, (_, i) => i * (360 / 28));
  return (
    <svg viewBox="0 0 140 140" className={className} aria-hidden="true">
      <g stroke="currentColor" strokeWidth="2.1" strokeLinecap="round">
        {rays.map((a) => (
          <line
            key={a}
            x1="70"
            y1="70"
            x2="70"
            y2={a % 2 ? "18" : "10"}
            transform={`rotate(${a} 70 70)`}
            opacity={a % 2 ? 0.7 : 1}
          />
        ))}
      </g>
      <circle cx="70" cy="70" r="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeDasharray="3 5" />
    </svg>
  );
}

export function LeafDoodle({ className = "" }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} aria-hidden="true">
      <path
        d="M14 84C8 46 33 14 82 10c6 41-13 77-68 74Z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path d="M18 80C40 59 57 39 76 20M37 61l-2-19M50 48l20 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function DropIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <path d="M24 4C17 14 9 21 9 29a15 15 0 0 0 30 0c0-8-8-15-15-25Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M18 32c2 4 6 6 11 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function BoltIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <path d="M27 3 10 27h13l-2 18 17-25H25l2-17Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
    </svg>
  );
}

export function SugarIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <path d="m8 18 11-9 21 6-3 21-21 3-8-21Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
      <path d="m8 18 12 4 21-7M20 22l4 17M32 22l5 14" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="m11 37 27-29" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}

export function CoconutIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <circle cx="24" cy="26" r="17" stroke="currentColor" strokeWidth="2.2" />
      <path d="M18 12c2-5 10-5 12 0M21 25c1.5-2 4.5-2 6 0M17 32c4 4 10 4 14 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function WaveUnderline({ className = "" }) {
  return (
    <svg viewBox="0 0 220 14" fill="none" className={className} aria-hidden="true">
      <path
        d="M3 9c24-12 48 8 72-1s51-9 73 1c18 8 39 5 69-3"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Sparkle({ className = "" }) {
  return (
    <svg viewBox="0 0 60 60" fill="none" className={className} aria-hidden="true">
      <path d="M30 3v54M3 30h54M11 11l38 38M49 11 11 49" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="30" cy="30" r="5" fill="currentColor" />
    </svg>
  );
}

export function StrawIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 40 100" fill="none" className={className} aria-hidden="true">
      <path d="m10 96 14-59 5 2L16 98l-6-2Z" fill="currentColor" opacity=".9" />
      <path d="M24 39c8-17 9-27 4-35" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
    </svg>
  );
}
