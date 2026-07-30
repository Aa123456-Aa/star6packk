import { motion } from "framer-motion";
import { toFaDigits } from "../lib/utils";

const STEP_TITLES = ["محاسبه BMI", "اطلاعات فردی", "سابقه ورزشی", "آسیب‌دیدگی", "حساسیت غذایی", "بیماری خاص", "محل تمرین"];

export function Stepper({ current }: { current: number }) {
  const percent = Math.round((current / 7) * 100);

  return (
    <div className="rounded-2xl border border-navy-600/40 bg-navy-900/70 px-4 py-3 shadow-[0_10px_36px_rgba(6,11,28,0.6)] backdrop-blur-xl">
      <div className="mb-2.5 flex items-center justify-between gap-2">
        <span className="text-[11.5px] font-bold text-navy-200">
          مرحله {toFaDigits(current)} از {toFaDigits(7)}
          <span className="mx-2 text-pink-500">•</span>
          <span className="text-pink-300">{STEP_TITLES[current - 1]}</span>
        </span>
        <span className="font-display text-base text-pink-400">{toFaDigits(percent)}٪</span>
      </div>

      {/* Stepper_SEGMENTی */}
      <div className="flex gap-1.5" dir="ltr">
        {Array.from({ length: 7 }, (_, i) => {
          const state = i + 1 < current ? "done" : i + 1 === current ? "active" : "todo";
          return (
            <div key={i} className="h-[7px] flex-1 overflow-hidden rounded-full bg-navy-700/60">
              <motion.div
                className={`h-full rounded-full ${
                  state === "todo"
                    ? ""
                    : "bg-gradient-to-r from-pink-600 via-pink-500 to-pink-400 shadow-[0_0_10px_rgba(255,46,136,0.6)]"
                }`}
                initial={false}
                animate={{ width: state === "done" ? "100%" : state === "active" ? "55%" : "0%" }}
                transition={{ type: "spring", stiffness: 120, damping: 22 }}
              />
            </div>
          );
        })}
      </div>

      {/* Progress Bar کلی */}
      <div className="mt-2.5 h-1 overflow-hidden rounded-full bg-navy-800">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-navy-600 via-pink-600 to-pink-400"
          initial={false}
          animate={{ width: `${percent}%` }}
          transition={{ type: "spring", stiffness: 90, damping: 24 }}
        />
      </div>
    </div>
  );
}
