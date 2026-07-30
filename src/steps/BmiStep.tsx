import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { StepShell } from "../components/StepShell";
import { NumField } from "../components/fields";
import { BmiGauge, BmiLegend } from "../components/BmiGauge";
import { computeBmi, QUOTES, type FormData } from "../lib/data";
import { parseNum, toFaDigits } from "../lib/utils";

export function BmiStep({
  data,
  patch,
  onBack,
  onNext,
}: {
  data: FormData;
  patch: (p: Partial<FormData>) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const [errors, setErrors] = useState<{ height?: string; weight?: string }>({});
  const [shake, setShake] = useState(0);

  const bmi = computeBmi(data.height, data.weight);

  const validate = () => {
    const e: typeof errors = {};
    const h = parseNum(data.height);
    const w = parseNum(data.weight);
    if (!data.height.trim() || h === null) e.height = "قدت رو به سانتی‌متر وارد کن";
    else if (h < 100 || h > 230) e.height = "قد باید بین ۱۰۰ تا ۲۳۰ سانتی‌متر باشه";
    if (!data.weight.trim() || w === null) e.weight = "وزنت رو به کیلوگرم وارد کن";
    else if (w < 25 || w > 250) e.weight = "وزن باید بین ۲۵ تا ۲۵۰ کیلوگرم باشه";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (validate()) onNext();
    else setShake((s) => s + 1);
  };

  return (
    <StepShell
      index={1}
      title="اول از همه، BMI بدنت رو ببین 📊"
      subtitle="قد و وزنت رو وارد کن تا همین حالا شاخص توده‌ی بدنی‌ات رو محاسبه کنیم."
      quote={QUOTES[0]}
      onBack={onBack}
      onNext={next}
      nextLabel="تأیید و ادامه"
      shake={shake}
    >
      <div className="grid grid-cols-2 gap-3">
        <NumField
          label="قد"
          value={data.height}
          onChange={(v) => patch({ height: v })}
          suffix="cm"
          placeholder="مثلاً ۱۷۵"
          error={errors.height}
        />
        <NumField
          label="وزن"
          value={data.weight}
          onChange={(v) => patch({ weight: v })}
          suffix="kg"
          placeholder="مثلاً ۷۰"
          error={errors.weight}
        />
      </div>

      {/* کارت نتیجه BMI */}
      <AnimatePresence initial={false}>
        {bmi && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 240, damping: 24 }}
            className="mt-5 rounded-2xl border border-pink-500/35 bg-gradient-to-b from-navy-850/90 to-navy-900/90 p-5 shadow-[0_16px_44px_rgba(255,46,136,0.14)]"
          >
            <p className="mb-1 text-center text-[12px] font-extrabold tracking-wide text-navy-200">
              شاخص توده‌ی بدنی تو
            </p>
            <BmiGauge info={bmi} />
            <BmiLegend active={bmi.category} />
            <div className="mt-4 flex items-center justify-center gap-2">
              <span className="rounded-full bg-gradient-to-l from-pink-600 to-pink-500 px-4 py-1.5 text-[13px] font-black text-ink shadow-[0_6px_20px_rgba(255,46,136,0.4)]">
                {bmi.label}
              </span>
            </div>
            <motion.p
              key={bmi.category}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 text-center text-[13.5px] font-semibold leading-7 text-pink-200"
            >
              {bmi.message}
            </motion.p>
            <p className="mt-2 text-center text-[10.5px] text-navy-200/60">
              BMI سالم معمولاً بین {toFaDigits("18.5")} تا {toFaDigits("24.9")} است
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {!bmi && (
        <p className="mt-5 rounded-xl border border-dashed border-navy-600/60 bg-navy-850/40 px-4 py-3.5 text-center text-[12.5px] font-semibold text-navy-200/80">
          به‌محض وارد کردن قد و وزن، نتیجه همین‌جا ظاهر می‌شه ⚡
        </p>
      )}
    </StepShell>
  );
}
