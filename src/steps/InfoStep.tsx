import { useState } from "react";
import { StepShell } from "../components/StepShell";
import { NumField } from "../components/fields";
import { QUOTES, type FormData } from "../lib/data";
import { parseNum } from "../lib/utils";

export function InfoStep({
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
  const [errors, setErrors] = useState<{ age?: string; height?: string; weight?: string }>({});
  const [shake, setShake] = useState(0);

  const validate = () => {
    const e: typeof errors = {};
    const age = parseNum(data.age);
    const h = parseNum(data.height);
    const w = parseNum(data.weight);
    if (!data.age.trim() || age === null) e.age = "سنت رو وارد کن";
    else if (age < 10 || age > 90) e.age = "سن باید بین ۱۰ تا ۹۰ سال باشه";
    if (h === null || h < 100 || h > 230) e.height = "قد باید بین ۱۰۰ تا ۲۳۰ سانتی‌متر باشه";
    if (w === null || w < 25 || w > 250) e.weight = "وزن باید بین ۲۵ تا ۲۵۰ کیلوگرم باشه";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (validate()) onNext();
    else setShake((s) => s + 1);
  };

  return (
    <StepShell
      index={2}
      title="یه کم بیشتر درباره خودت بگو 👤"
      subtitle="سن، قد و وزنت رو ثبت کن تا برنامه دقیقاً برای خودت طراحی بشه."
      quote={QUOTES[1]}
      onBack={onBack}
      onNext={next}
      shake={shake}
    >
      <div className="grid gap-3 sm:grid-cols-3">
        <NumField
          label="سن"
          value={data.age}
          onChange={(v) => patch({ age: v })}
          suffix="سال"
          placeholder="مثلاً ۲۵"
          error={errors.age}
        />
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
      <p className="mt-3 text-[11.5px] font-semibold text-navy-200/70">
        💡 قد و وزن از مرحله قبل پر شده؛ اگه تغییری داشته، همین‌جا ویرایشش کن.
      </p>
    </StepShell>
  );
}
