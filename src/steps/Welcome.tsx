import { motion } from "framer-motion";
import { ChevronLeft, Sparkles } from "lucide-react";
import { QUOTES } from "../lib/data";
import { toFaDigits } from "../lib/utils";

const spring = { type: "spring", stiffness: 220, damping: 24 } as const;

export function Welcome({ onStart }: { onStart: () => void }) {
  const tickerItems = [...QUOTES, ...QUOTES];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.4 }}
      className="flex flex-1 flex-col justify-center py-4"
    >
      {/* بج معرفی */}
      <motion.span
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, ...spring }}
        className="inline-flex w-fit items-center gap-1.5 rounded-full border border-pink-500/40 bg-pink-500/12 px-3.5 py-1.5 text-[12px] font-extrabold text-pink-300 backdrop-blur-md"
      >
        <Sparkles className="h-3.5 w-3.5" />
        ارزیابی رایگان • برنامه‌ی اختصاصی تمرین و تغذیه
      </motion.span>

      {/* تیتر با رونمایی خطی */}
      <div className="mt-4 overflow-hidden">
        <motion.h2
          initial={{ y: "112%" }}
          animate={{ y: 0 }}
          transition={{ delay: 0.18, ...spring }}
          className="font-display text-[2.6rem] leading-[1.25] text-ink sm:text-6xl sm:leading-[1.2]"
        >
          به <span className="text-pink-500">Star6Pack</span>
        </motion.h2>
      </div>
      <div className="overflow-hidden">
        <motion.h2
          initial={{ y: "112%" }}
          animate={{ y: 0 }}
          transition={{ delay: 0.28, ...spring }}
          className="font-display text-[2.6rem] leading-[1.25] text-ink sm:text-6xl sm:leading-[1.2]"
        >
          خوش اومدی 💪⭐
        </motion.h2>
      </div>

      {/* متن خوش‌آمدگویی */}
      <motion.p
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.42, ...spring }}
        className="mt-5 max-w-xl text-[15px] leading-8 text-navy-200 sm:text-base sm:leading-9"
      >
        اگر آماده‌ای <b className="text-ink">قوی‌تر، سالم‌تر و خوش‌اندام‌تر</b> از همیشه باشی، جای درستی اومدی. اینجا
        فقط تغییر ظاهر نیست؛ اینجا شروع ساخت <b className="text-pink-300">بهترین نسخه‌ی خودته</b>. بیا با هم این مسیر رو
        شروع کنیم. 🚀
      </motion.p>

      {/* جمله انگیزشی */}
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.55, ...spring }}
        className="mt-6 w-fit rounded-xl border-r-4 border-pink-500 bg-navy-900/70 px-5 py-3.5 backdrop-blur-md"
      >
        <p className="font-display text-lg text-pink-200 sm:text-xl">«بهترین زمان برای شروع، همین امروزه.»</p>
      </motion.div>

      {/* دکمه شروع */}
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.68, ...spring }}
        className="mt-7 flex flex-col items-start gap-2.5"
      >
        <motion.button
          type="button"
          onClick={onStart}
          whileTap={{ scale: 0.95 }}
          className="animate-glow-pulse group flex items-center gap-2.5 rounded-xl bg-gradient-to-l from-pink-600 via-pink-500 to-pink-400 px-9 py-4.5 text-lg font-black text-ink shadow-[0_16px_44px_rgba(255,46,136,0.45)] transition-[filter] hover:brightness-110 active:brightness-95"
        >
          شروع ارزیابی
          <ChevronLeft className="h-5.5 w-5.5 transition-transform duration-300 group-hover:-translate-x-1" />
        </motion.button>
        <p className="text-[12px] font-semibold text-navy-200/80">
          فقط {toFaDigits(7)} مرحله‌ی کوتاه • کمتر از {toFaDigits(2)} دقیقه ⏱️
        </p>
      </motion.div>

      {/* ویژگی‌های مسیر */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.85 }}
        className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12.5px] font-bold text-navy-200"
      >
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-pink-500" /> محاسبه‌ی خودکار BMI
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-pink-500" /> برنامه‌ی متناسب با شرایط تو
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-pink-500" /> تمرین در خانه یا باشگاه
        </span>
      </motion.div>

      {/* نوار متحرک جملات انگیزشی */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-9 overflow-hidden border-y border-navy-700/50 bg-navy-900/50 py-2.5 backdrop-blur-sm"
        dir="ltr"
      >
        <div className="animate-marquee flex w-max items-center">
          {tickerItems.map((q, i) => (
            <span
              key={i}
              dir="rtl"
              className="mr-10 flex items-center gap-2 whitespace-nowrap text-[12.5px] font-bold text-navy-200"
            >
              <span className="text-pink-500">{q.emoji}</span> {q.text}
              <span className="mr-8 text-pink-600/70">✦</span>
            </span>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}
