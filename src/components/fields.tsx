import { AnimatePresence, motion } from "framer-motion";

/* ─────────────── فیلد عددی ─────────────── */

export function NumField({
  label,
  value,
  onChange,
  suffix,
  placeholder,
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  suffix: string;
  placeholder: string;
  error?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-extrabold text-ink">{label}</span>
      <div
        className={`flex items-stretch overflow-hidden rounded-xl border bg-navy-950/70 transition-all focus-within:shadow-[0_0_0_3px_rgba(255,46,136,0.18)] ${
          error ? "border-pink-500/70" : "border-navy-600/50 focus-within:border-pink-500/70"
        }`}
      >
        <input
          type="text"
          inputMode="decimal"
          dir="ltr"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full min-w-0 bg-transparent px-4 py-3.5 text-center text-lg font-extrabold text-ink outline-none placeholder:text-navy-400/70"
        />
        <span className="flex items-center border-l border-navy-600/50 bg-navy-850/80 px-3.5 text-[12px] font-bold text-navy-200">
          {suffix}
        </span>
      </div>
      <AnimatePresence>
        {error && (
          <motion.span
            initial={{ opacity: 0, y: -6, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -6, height: 0 }}
            className="mt-1.5 block text-[11.5px] font-bold text-pink-400"
          >
            ⚠️ {error}
          </motion.span>
        )}
      </AnimatePresence>
    </label>
  );
}

/* ─────────────── کارت‌های گزینه‌ای ─────────────── */

export interface Option {
  value: string;
  label: string;
  emoji?: string;
  desc?: string;
}

export function OptionCards({
  options,
  value,
  onChange,
  big = false,
}: {
  options: Option[];
  value: string;
  onChange: (v: string) => void;
  big?: boolean;
}) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {options.map((opt, i) => {
        const selected = value === opt.value;
        return (
          <motion.button
            key={opt.value}
            type="button"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.08, type: "spring", stiffness: 280, damping: 22 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onChange(opt.value)}
            aria-pressed={selected}
            className={`relative flex flex-col items-center gap-1 overflow-hidden rounded-2xl border px-3 text-center transition-all duration-300 ${
              big ? "py-6 sm:py-8" : "py-5"
            } ${
              selected
                ? "border-pink-500/80 bg-gradient-to-b from-pink-500/25 to-navy-800/40 shadow-[0_10px_34px_rgba(255,46,136,0.3)]"
                : "border-navy-600/45 bg-navy-850/60 hover:border-pink-500/40 hover:bg-navy-800/60"
            }`}
          >
            {opt.emoji && <span className={big ? "text-4xl sm:text-5xl" : "text-3xl"}>{opt.emoji}</span>}
            <span className={`font-extrabold text-ink ${big ? "text-lg" : "text-[15px]"}`}>{opt.label}</span>
            {opt.desc && <span className="text-[11px] leading-5 text-navy-200">{opt.desc}</span>}
            <AnimatePresence>
              {selected && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 18 }}
                  className="absolute left-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-pink-600 text-[11px] font-black text-ink shadow-lg"
                >
                  ✓
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        );
      })}
    </div>
  );
}

/* ─────────────── کادر توضیحات بازشو ─────────────── */

export function NoteArea({
  open,
  value,
  onChange,
  placeholder,
  label,
}: {
  open: boolean;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  label: string;
}) {
  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0, y: -8 }}
          animate={{ opacity: 1, height: "auto", y: 0 }}
          exit={{ opacity: 0, height: 0, y: -8 }}
          transition={{ type: "spring", stiffness: 220, damping: 26 }}
          className="overflow-hidden"
        >
          <label className="mt-4 block">
            <span className="mb-1.5 block text-[13px] font-extrabold text-pink-300">{label}</span>
            <textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              rows={3}
              className="w-full resize-none rounded-xl border border-pink-500/40 bg-navy-950/70 px-4 py-3 text-[14px] leading-6 text-ink outline-none transition-all placeholder:text-navy-400/70 focus:border-pink-500/80 focus:shadow-[0_0_0_3px_rgba(255,46,136,0.18)]"
            />
          </label>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
