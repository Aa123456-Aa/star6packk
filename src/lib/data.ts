import { faNumber, parseNum } from "./utils";

/* ─────────────── نقل‌قول‌های انگیزشی ─────────────── */

export const QUOTES = [
  { emoji: "💪", text: "هر تکرار، تو را به هدفت نزدیک‌تر می‌کند." },
  { emoji: "🔥", text: "بدنت قوی‌تر از بهانه‌هایت است." },
  { emoji: "❤️", text: "تغییرهای بزرگ با یک تصمیم کوچک شروع می‌شوند." },
  { emoji: "😄", text: "تنها چیزی که اینجا از دست می‌دهی، چربی‌های اضافه است!" },
  { emoji: "🏆", text: "نسخه بهتر خودت منتظر توست." },
];

/* ─────────────── مدل داده‌ی فرم ─────────────── */

export type YesNo = "" | "yes" | "no";
export type Location = "" | "home" | "gym";

export interface FormData {
  height: string;
  weight: string;
  age: string;
  history: YesNo;
  injury: YesNo;
  injuryNote: string;
  allergy: YesNo;
  allergyNote: string;
  disease: YesNo;
  diseaseNote: string;
  location: Location;
}

export const INITIAL_DATA: FormData = {
  height: "",
  weight: "",
  age: "",
  history: "",
  injury: "",
  injuryNote: "",
  allergy: "",
  allergyNote: "",
  disease: "",
  diseaseNote: "",
  location: "",
};

/* ─────────────── BMI ─────────────── */

export type BmiCategory = "under" | "normal" | "over" | "obese";

export interface BmiInfo {
  value: number;
  category: BmiCategory;
  label: string;
  message: string;
}

export const computeBmi = (heightStr: string, weightStr: string): BmiInfo | null => {
  const h = parseNum(heightStr);
  const w = parseNum(weightStr);
  if (h === null || w === null || h <= 0) return null;
  const meters = h / 100;
  const value = w / (meters * meters);
  if (!Number.isFinite(value)) return null;

  let category: BmiCategory;
  if (value < 18.5) category = "under";
  else if (value < 25) category = "normal";
  else if (value < 30) category = "over";
  else category = "obese";

  const meta: Record<BmiCategory, { label: string; message: string }> = {
    under: {
      label: "کمبود وزن",
      message: "بدنت آماده رشد و عضله‌سازیه؛ فقط یه برنامه اصولی لازم داری. 💪",
    },
    normal: {
      label: "وزن نرمال",
      message: "عالیه! پایه محکمی داری، حالا وقت ساختن بهترین فرم بدنه. 🔥",
    },
    over: {
      label: "اضافه وزن",
      message: "نگران نباش؛ هر بدن زیبایی از یه نقطه شروع شده. ❤️",
    },
    obese: {
      label: "چاقی",
      message: "امروز اولین قدم برای تغییر زندگیته، ما کنارت هستیم. 🌟",
    },
  };

  return { value, category, ...meta[category] };
};

/* ─────────────── واتساپ ─────────────── */

const WHATSAPP_NUMBER = "989302314148";

export const buildWhatsAppLink = (data: FormData): string => {
  const bmi = computeBmi(data.height, data.weight);
  const yesNo = (v: YesNo) => (v === "yes" ? "بله" : "خیر");
  const note = (v: string) => v.trim() || "—";
  const location = data.location === "home" ? "خانه 🏠" : "باشگاه 🏋️";

  const lines = [
    "سلام Star6Pack 💪",
    "",
    "یک فرم جدید ثبت شد.",
    "",
    "📊 نتیجه BMI:",
    bmi ? `${faNumber(bmi.value, 1)} (${bmi.label})` : "—",
    "",
    "👤 سن:",
    data.age ? `${faNumber(parseNum(data.age) ?? 0)} سال` : "—",
    "",
    "📏 قد:",
    data.height ? `${faNumber(parseNum(data.height) ?? 0)} سانتی‌متر` : "—",
    "",
    "⚖️ وزن:",
    data.weight ? `${faNumber(parseNum(data.weight) ?? 0)} کیلوگرم` : "—",
    "",
    "🏋️ سابقه ورزشی:",
    yesNo(data.history),
    "",
    "🩹 آسیب‌دیدگی:",
    yesNo(data.injury),
    "",
    "📝 توضیحات آسیب:",
    note(data.injuryNote),
    "",
    "🥗 حساسیت غذایی:",
    yesNo(data.allergy),
    "",
    "📝 توضیحات حساسیت:",
    note(data.allergyNote),
    "",
    "🩺 بیماری خاص:",
    yesNo(data.disease),
    "",
    "📝 توضیحات بیماری:",
    note(data.diseaseNote),
    "",
    "🏠 محل تمرین:",
    location,
    "",
    "لطفاً برای این کاربر برنامه اختصاصی طراحی شود.",
  ];

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
};
