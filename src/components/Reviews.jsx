import { REVIEWS } from "../data/content";
import { LeafDoodle, PalmIcon } from "./Doodles";

function QuoteMark() {
  return (
    <svg viewBox="0 0 52 44" fill="none" className="h-[2.4vw] w-[2.8vw] max-md:h-7 max-md:w-8" aria-hidden="true">
      <path d="M3 26C3 13 11 4 24 1l2 6C17 10 12 15 12 24h11v19H3V26Z" fill="#b9902e" />
      <path d="M27 26C27 13 35 4 48 1l2 6c-9 3-14 8-14 17h11v19H27V26Z" fill="#b9902e" opacity=".86" />
    </svg>
  );
}

function ReviewCard({ review }) {
  return (
    <article
      className="group relative mx-[.55vw] flex w-[25.5vw] shrink-0 flex-col items-center rounded-[15px] border border-cocoa/35 bg-cream px-[2.3vw] py-[2.1vw] text-center shadow-[0_1px_0_rgba(70,55,33,.04)] transition-all duration-500 hover:-translate-y-1 hover:rotate-0 hover:border-cocoa/65 max-md:mx-2 max-md:w-[78vw] max-md:px-6 max-md:py-8"
      style={{ rotate: review.rotate }}
      data-cursor="Read"
    >
      <span className="absolute left-4 top-4 h-[.52rem] w-[.52rem] rounded-full bg-cocoa/80" />
      <span className="absolute right-4 top-4 h-[.52rem] w-[.52rem] rounded-full bg-cocoa/80" />
      <QuoteMark />
      <h3 className="font-display mt-[1.4vw] text-[1.55vw] leading-[.95] font-semibold tracking-[-.035em] uppercase max-md:mt-5 max-md:text-[1.55rem]">
        {review.quote}
      </h3>
      <p className="mt-[1.2vw] font-hand text-[1.02vw] text-cocoa/60 max-md:mt-4 max-md:text-[.95rem]">
        {review.handle}
      </p>
    </article>
  );
}

export default function Reviews() {
  const doubled = [...REVIEWS, ...REVIEWS];

  return (
    <section
      id="reviews"
      className="relative z-10 w-full overflow-x-clip bg-cream pt-[2vw] pb-[9vw] texture max-md:pt-[12vw] max-md:pb-[22vw]"
    >
      <div className="paddx" data-reveal>
        <div className="flex items-end justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <PalmIcon className="h-4 w-auto text-gold" />
              <span className="eyebrow text-cocoa/45">Word on the shore</span>
            </div>
            <h2 className="text-[8.6vw] leading-[.78] font-semibold tracking-[-.055em] text-cocoa uppercase max-md:text-[16vw]">
              SIPPERS SAY !
            </h2>
          </div>
          <div className="mb-2 flex max-w-[13rem] flex-col items-end gap-2 max-md:hidden">
            <span className="font-hand text-[1rem] leading-tight text-cocoa/55">
              real people, real sips, no paid opinions
            </span>
            <span className="h-[1px] w-12 bg-cocoa/25" />
          </div>
        </div>
      </div>

      <div className="marquee-hover mask-fade-x mt-[3.5vw] overflow-hidden py-3 max-md:mt-9">
        <div className="marquee-track">
          {doubled.map((review, index) => (
            <ReviewCard key={`${review.handle}-${index}`} review={review} />
          ))}
        </div>
      </div>

      <div className="paddx mt-[2vw] flex items-center justify-between max-md:mt-8">
        <div className="flex items-center gap-3">
          <span className="h-[1px] w-[4vw] bg-cocoa/25" />
          <span className="font-hand text-[.95rem] text-cocoa/50">
            hover to stop and read
          </span>
        </div>
        <LeafDoodle className="h-[3.2vw] w-[3.2vw] rotate-[18deg] text-gold/55 max-md:h-10 max-md:w-10" />
      </div>
    </section>
  );
}
