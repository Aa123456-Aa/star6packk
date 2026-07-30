import { StepShell } from "../components/StepShell";
import { OptionCards } from "../components/fields";
import { QUOTES, type FormData, type Location } from "../lib/data";

export function LocationStep({
  data,
  patch,
  onBack,
  onSubmit,
}: {
  data: FormData;
  patch: (p: Partial<FormData>) => void;
  onBack: () => void;
  onSubmit: () => void;
}) {
  return (
    <StepShell
      index={7}
      title="آخرین قدم! محل تمرینت رو انتخاب کن 📍"
      subtitle="برنامه‌ات دقیقاً بر اساس جایی که تمرین می‌کنی طراحی می‌شه."
      quote={QUOTES[1]}
      onBack={onBack}
      onNext={onSubmit}
      nextLabel="ثبت نهایی اطلاعات 🎉"
      nextDisabled={data.location === ""}
    >
      <p className="mb-4 rounded-xl bg-navy-850/70 px-4 py-3 text-[14.5px] font-bold leading-7 text-ink">
        ترجیح میدی کجا تمرین کنی؟
      </p>

      <OptionCards
        big
        options={[
          {
            value: "home",
            label: "خانه",
            emoji: "🏠",
            desc: "با حداقل تجهیزات، برنامه‌ی خانگی و منعطف",
          },
          {
            value: "gym",
            label: "باشگاه",
            emoji: "🏋️",
            desc: "دسترسی کامل به دستگاه‌ها و وزنه‌ها",
          },
        ]}
        value={data.location}
        onChange={(v) => patch({ location: v as Location })}
      />

      {data.location === "" && (
        <p className="mt-4 text-center text-[12px] font-semibold text-navy-200/70">
          یکی از دو گزینه رو انتخاب کن تا ثبت نهایی فعال بشه 👆
        </p>
      )}
    </StepShell>
  );
}
