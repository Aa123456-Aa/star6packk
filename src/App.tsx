import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Backdrop } from "./components/Backdrop";
import { Logo } from "./components/Logo";
import { Stepper } from "./components/Stepper";
import { Welcome } from "./steps/Welcome";
import { BmiStep } from "./steps/BmiStep";
import { InfoStep } from "./steps/InfoStep";
import { YesNoStep, type YesNoConfig } from "./steps/YesNoStep";
import { LocationStep } from "./steps/LocationStep";
import { SuccessStep } from "./steps/SuccessStep";
import { INITIAL_DATA, QUOTES, type FormData, type YesNo } from "./lib/data";

/**
 * صفحه‌ها: 0 = خوش‌آمدگویی، 1..7 = مراحل فرم، 8 = موفقیت
 */

const YES_NO_CONFIGS: Record<3 | 4 | 5 | 6, {
  config: YesNoConfig;
  valueKey: "history" | "injury" | "allergy" | "disease";
  noteKey: "injuryNote" | "allergyNote" | "diseaseNote";
}> = {
  3: {
    valueKey: "history",
    noteKey: "injuryNote",
    config: {
      index: 3,
      title: "سابقه‌ی ورزشیت چطوره؟ 🏋️",
      question: "آیا سابقه ورزش منظم داری؟",
      yesLabel: "بله 💪",
      noLabel: "خیر 🙂",
      noteLabel: "",
      notePlaceholder: "",
      quote: QUOTES[2],
    },
  },
  4: {
    valueKey: "injury",
    noteKey: "injuryNote",
    config: {
      index: 4,
      title: "یه چکِ سلامت بکنیم 🩹",
      question: "آیا جایی از بدنت آسیب‌دیده یا درد مزمن داری؟",
      yesLabel: "بله",
      noLabel: "خیر",
      noteLabel: "محل آسیب و توضیحات رو بنویس:",
      notePlaceholder: "مثلاً: زانوی راست، کمردرد و...",
      quote: QUOTES[3],
    },
  },
  5: {
    valueKey: "allergy",
    noteKey: "allergyNote",
    config: {
      index: 5,
      title: "تغذیه‌ات رو بشناسیم 🥗",
      question: "آیا غذایی وجود دارد که به آن حساسیت داشته باشی یا نتوانی مصرف کنی؟",
      yesLabel: "بله",
      noLabel: "خیر",
      noteLabel: "کدوم غذاها رو نمی‌تونی مصرف کنی؟",
      notePlaceholder: "مثلاً: لبنیات، گلوتن، آجیل و...",
      quote: QUOTES[4],
    },
  },
  6: {
    valueKey: "disease",
    noteKey: "diseaseNote",
    config: {
      index: 6,
      title: "شرایط خاص سلامتی 🩺",
      question: "آیا بیماری خاص یا مصرف داروی دائمی داری؟",
      yesLabel: "بله",
      noLabel: "خیر",
      noteLabel: "اگه راحتی، توضیح بده تا برنامه امن‌تری بگیری:",
      notePlaceholder: "مثلاً: فشار خون، دیابت، داروی تیروئید و...",
      quote: QUOTES[0],
    },
  },
};

export default function App() {
  const [screen, setScreen] = useState(0);
  const [data, setData] = useState<FormData>(INITIAL_DATA);

  const patch = (p: Partial<FormData>) => setData((d) => ({ ...d, ...p }));

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [screen]);

  const go = (s: number) => setScreen(s);

  const restart = () => {
    setData(INITIAL_DATA);
    setScreen(0);
  };

  const yearFa = new Intl.DateTimeFormat("fa-IR", { year: "numeric" }).format(new Date());

  return (
    <div className="relative min-h-dvh overflow-x-clip">
      <Backdrop />

      <div className="relative z-10 mx-auto flex min-h-dvh w-full max-w-2xl flex-col px-4 pb-7 pt-5 sm:px-6">
        {/* هدر */}
        <header className="mb-5 flex items-center justify-between">
          <Logo />
          {screen >= 1 && screen <= 7 && (
            <span className="hidden rounded-full border border-navy-600/50 bg-navy-900/60 px-3.5 py-1.5 text-[11px] font-bold text-navy-200 backdrop-blur-md sm:block">
              فرم ارزیابی اولیه ⭐
            </span>
          )}
        </header>

        {/* Stepper + Progress Bar */}
        {screen >= 1 && screen <= 7 && (
          <div className="mb-5">
            <Stepper current={screen} />
          </div>
        )}

        <main className="flex flex-1 flex-col">
          <AnimatePresence mode="wait">
            {screen === 0 && <Welcome key="welcome" onStart={() => go(1)} />}

            {screen === 1 && (
              <BmiStep key="bmi" data={data} patch={patch} onBack={() => go(0)} onNext={() => go(2)} />
            )}

            {screen === 2 && (
              <InfoStep key="info" data={data} patch={patch} onBack={() => go(1)} onNext={() => go(3)} />
            )}

            {(screen === 3 || screen === 4 || screen === 5 || screen === 6) && (
              <YesNoStep
                key={`yn-${screen}`}
                config={YES_NO_CONFIGS[screen].config}
                value={data[YES_NO_CONFIGS[screen].valueKey] as YesNo}
                note={screen === 3 ? "" : data[YES_NO_CONFIGS[screen].noteKey]}
                onValue={(v) => patch({ [YES_NO_CONFIGS[screen].valueKey]: v } as Partial<FormData>)}
                onNote={(v) => patch({ [YES_NO_CONFIGS[screen].noteKey]: v } as Partial<FormData>)}
                onBack={() => go(screen - 1)}
                onNext={() => go(screen + 1)}
              />
            )}

            {screen === 7 && (
              <LocationStep key="location" data={data} patch={patch} onBack={() => go(6)} onSubmit={() => go(8)} />
            )}

            {screen === 8 && <SuccessStep key="success" data={data} onRestart={restart} />}
          </AnimatePresence>
        </main>

        {/* فوتر */}
        <footer className="mt-6 border-t border-navy-700/40 pt-4 text-center">
          <p className="text-[11px] font-semibold text-navy-200/60">
            © {yearFa} <span className="font-display text-[12.5px] text-pink-400">Star6Pack</span> — قوی‌تر از دیروزت باش ⭐
          </p>
        </footer>
      </div>
    </div>
  );
}
