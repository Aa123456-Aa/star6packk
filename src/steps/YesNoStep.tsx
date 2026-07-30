import { StepShell } from "../components/StepShell";
import { NoteArea, OptionCards } from "../components/fields";
import type { YesNo } from "../lib/data";

export interface YesNoConfig {
  index: number;
  title: string;
  question: string;
  yesLabel: string;
  noLabel: string;
  noteLabel: string;
  notePlaceholder: string;
  quote: { emoji: string; text: string };
}

export function YesNoStep({
  config,
  value,
  note,
  onValue,
  onNote,
  onBack,
  onNext,
}: {
  config: YesNoConfig;
  value: YesNo;
  note: string;
  onValue: (v: YesNo) => void;
  onNote: (v: string) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <StepShell
      index={config.index}
      title={config.title}
      quote={config.quote}
      onBack={onBack}
      onNext={onNext}
      nextDisabled={value === ""}
    >
      <p className="mb-4 rounded-xl bg-navy-850/70 px-4 py-3 text-[14.5px] font-bold leading-7 text-ink">
        {config.question}
      </p>

      <OptionCards
        options={[
          { value: "yes", label: config.yesLabel, emoji: "✅" },
          { value: "no", label: config.noLabel, emoji: "🚫" },
        ]}
        value={value}
        onChange={(v) => onValue(v as YesNo)}
      />

      {config.noteLabel !== "" && (
        <NoteArea
          open={value === "yes"}
          value={note}
          onChange={onNote}
          label={config.noteLabel}
          placeholder={config.notePlaceholder}
        />
      )}

      {value === "" && (
        <p className="mt-4 text-center text-[12px] font-semibold text-navy-200/70">
          برای ادامه، یکی از گزینه‌ها رو انتخاب کن 👆
        </p>
      )}
    </StepShell>
  );
}
