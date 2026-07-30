import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { Confetti } from "../components/Confetti";
import { buildWhatsAppLink, computeBmi, type FormData } from "../lib/data";
import { faNumber, toFaDigits } from "../lib/utils";

const spring = { type: "spring", stiffness: 240, damping: 22 } as const;

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

export function SuccessStep({ data, onRestart }: { data: FormData; onRestart: () => void }) {
  const bmi = computeBmi(data.height, data.weight);
  const waLink = buildWhatsAppLink(data);

  const recap = [
    { label: "BMI", value: bmi ? `${faNumber(bmi.value, 1)} • ${bmi.label}` : "—" },
    { label: "سن", value: data.age ? `${toFaDigits(data.age)} سال` : "—" },
    { label: "قد", value: data.height ? `${toFaDigits(data.height)} سانتی‌متر` : "—" },
    { label: "وزن", value: data.weight ? `${toFaDigits(data.weight)} کیلوگرم` : "—" },
    { label: "محل تمرین", value: data.location === "home" ? "خانه 🏠" : "باشگاه 🏋️" },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 48, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ ...spring, damping: 24 }}
      className="relative overflow-hidden rounded-[26px] border border-pink-500/30 bg-navy-900/80 px-5 py-8 text-center shadow-[0_28px_70px_rgba(6,11,28,0.7)] backdrop-blur-2xl sm:px-9"
    >
      <Confetti />

      <div
        className="pointer-events-none absolute -top-28 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(255,46,136,0.5), transparent 70%)" }}
      />

      <motion.div
        initial={{ scale: 0, rotate: -25 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.15, ...spring }}
        className="relative mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-pink-700 text-4xl shadow-[0_16px_44px_rgba(255,46,136,0.5)] ring-4 ring-pink-300/20"
      >
        🏆
      </motion.div>

      <div className="overflow-hidden">
        <motion.h2
          initial={{ y: "112%" }}
          animate={{ y: 0 }}
          transition={{ delay: 0.22, ...spring }}
          className="font-display text-[1.9rem] leading-[1.4] text-ink sm:text-4xl"
        >
          تبریک! اطلاعاتت با موفقیت ثبت شد. 🎉
        </motion.h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="mx-auto mt-4 max-w-md space-y-2 text-[14px] leading-7 text-navy-200"
      >
        <p>
          خیلی خوشحالیم که <b className="text-pink-300">Star6Pack</b> رو برای شروع مسیر تناسب اندامت انتخاب کردی.
        </p>
        <p>از اینجا به بعد، ما کنار تو هستیم تا با برنامه‌ای اصولی به هدفت برسی.</p>
        <p className="pt-1 font-bold text-ink">یادت باشه...</p>
        <p className="text-pink-200">نتیجه از شانس به دست نمیاد...</p>
        <p className="font-display text-xl text-pink-300">از استمرار به دست میاد. 💪🔥</p>
      </motion.div>

      {/* خلاصه‌ی اطلاعات */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, ...spring }}
        className="mx-auto mt-6 max-w-md divide-y divide-navy-700/50 rounded-2xl border border-navy-600/45 bg-navy-950/60 text-start"
      >
        {recap.map((r, i) => (
          <motion.div
            key={r.label}
            initial={{ opacity: 0, x: 22 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.72 + i * 0.09, ...spring }}
            className="flex items-center justify-between px-4 py-3"
          >
            <span className="text-[12.5px] font-bold text-navy-200">{r.label}</span>
            <span className="text-[13px] font-extrabold text-ink">{r.value}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* دکمه‌ی واتساپ */}
      <motion.a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 24, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 1.05, ...spring }}
        whileTap={{ scale: 0.96 }}
        className="animate-glow-pulse mt-7 flex w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-l from-pink-600 via-pink-500 to-pink-400 px-6 py-4.5 text-lg font-black text-ink shadow-[0_16px_44px_rgba(255,46,136,0.45)] transition-[filter] hover:brightness-110 active:brightness-95"
      >
        <WhatsAppIcon className="h-6 w-6" />
        ارسال اطلاعات به واتساپ
      </motion.a>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.25 }}
        className="mt-2.5 text-[11.5px] font-semibold text-navy-200/70"
      >
        با یه لمس، واتساپ با پیامِ آماده باز می‌شه؛ فقط دکمه‌ی ارسال رو بزن 😉
      </motion.p>

      <motion.button
        type="button"
        onClick={onRestart}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        whileTap={{ scale: 0.94 }}
        className="mx-auto mt-6 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-bold text-navy-200/70 transition-colors hover:text-ink"
      >
        <RotateCcw className="h-3.5 w-3.5" />
        ثبت یک ارزیابی جدید
      </motion.button>
    </motion.section>
  );
}
