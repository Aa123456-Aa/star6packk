import { useEffect, type ReactNode } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { ArrowRight, ChevronLeft } from "lucide-react";
import { toFaDigits } from "../lib/utils";

const spring = { type: "spring", stiffness: 260, damping: 24 } as const;

export function StepShell({
  index,
  title,
  subtitle,
  quote,
  onBack,
  onNext,
  nextLabel = "مرحله بعد",
  nextDisabled = false,
  shake = 0,
  children,
}: {
  index: number;
  title: string;
  subtitle?: string;
  quote: { emoji: string; text: string };
  onBack: () => void;
  onNext: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  shake?: number;
  children: ReactNode;
}) {
  const controls = useAnimationControls();

  useEffect(() => {
    if (shake > 0) {
      controls.start({
        x: [0, -12, 12, -8, 8, 0],
        transition: { duration: 0.45 },
      });
    }
  }, [shake, controls]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 44, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -32, scale: 0.98 }}
      transition={spring}
      className="overflow-hidden rounded-[26px] border border-navy-600/45 bg-navy-900/75 shadow-[0_28px_70px_rgba(6,11,28,0.65)] backdrop-blur-2xl"
    >
      {/* نوار بالای کارت */}
      <div className="flex items-center justify-between border-b border-navy-700/50 bg-navy-850/60 px-5 py-3">
        <span className="rounded-full border border-pink-500/40 bg-pink-500/12 px-3 py-1 text-[11px] font-extrabold tracking-wide text-pink-300">
          مرحله {toFaDigits(index)} از {toFaDigits(7)}
        </span>
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1 rounded-full px-2.5 py-1 text-[12px] font-bold text-navy-200 transition-colors hover:bg-navy-700/50 hover:text-ink"
        >
          <ArrowRight className="h-3.5 w-3.5" />
          قبلی
        </button>
      </div>

      <motion.div animate={controls} className="px-5 pb-6 pt-5 sm:px-7">
        <h2 className="font-display text-[1.6rem] leading-[1.35] text-ink sm:text-[1.9rem]">{title}</h2>
        {subtitle && <p className="mt-1.5 text-[13.5px] leading-6 text-navy-200">{subtitle}</p>}

        <div className="mt-5">{children}</div>

        {/* نقل‌قول انگیزشی مرحله */}
        <div className="mt-6 flex items-center gap-3 rounded-xl border-r-[3px] border-pink-500 bg-navy-850/70 px-4 py-3">
          <span className="text-xl">{quote.emoji}</span>
          <p className="text-[13px] font-semibold leading-6 text-pink-200">«{quote.text}»</p>
        </div>

        {/* ناوبری */}
        <div className="mt-6 flex gap-3">
          <motion.button
            type="button"
            onClick={onNext}
            disabled={nextDisabled}
            whileTap={nextDisabled ? undefined : { scale: 0.96 }}
            className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-6 py-4 text-base font-extrabold transition-all ${
              nextDisabled
                ? "cursor-not-allowed bg-navy-700/50 text-navy-200/50"
                : "animate-glow-pulse bg-gradient-to-l from-pink-600 to-pink-500 text-ink shadow-[0_14px_34px_rgba(255,46,136,0.4)] hover:brightness-110 active:brightness-95"
            }`}
          >
            {nextLabel}
            <ChevronLeft className="h-5 w-5" />
          </motion.button>
        </div>
      </motion.div>
    </motion.section>
  );
}
