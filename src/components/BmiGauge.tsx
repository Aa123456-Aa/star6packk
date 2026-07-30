import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { faNumber } from "../lib/utils";
import type { BmiInfo } from "../lib/data";

const MIN = 14;
const MAX = 40;
const clampRatio = (bmi: number) => Math.min(1, Math.max(0, (bmi - MIN) / (MAX - MIN)));

/** موقعیت نقطه روی کمان بر اساس زاویه (درجه، ۰ = وسط بالا) */
const polar = (angleDeg: number, r: number, cx: number, cy: number) => {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
};

export function BmiGauge({ info }: { info: BmiInfo }) {
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(reduceMotion ? info.value : 0);
  const fromRef = useRef(0);

  useEffect(() => {
    if (reduceMotion) {
      setDisplay(info.value);
      return;
    }
    const from = fromRef.current;
    const to = info.value;
    const start = performance.now();
    const dur = 900;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(from + (to - from) * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
      else fromRef.current = to;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [info.value, reduceMotion]);

  const ratio = clampRatio(info.value);
  const needleAngle = -90 + ratio * 180;
  const arcLen = Math.PI * 88; // طول کمان
  const progress = ratio * arcLen;

  // خطوط نشانه‌ی مرز دسته‌ها
  const marks = [18.5, 25, 30].map((v) => {
    const a = -180 + clampRatio(v) * 180; // زاویه از راست
    const rad = (a * Math.PI) / 180;
    const x1 = 110 + 76 * Math.cos(rad);
    const y1 = 110 + 76 * Math.sin(rad);
    const x2 = 110 + 98 * Math.cos(rad);
    const y2 = 110 + 98 * Math.sin(rad);
    return { v, x1, y1, x2, y2 };
  });

  return (
    <div className="relative mx-auto w-full max-w-[300px]">
      <svg viewBox="0 0 220 126" className="w-full">
        <defs>
          <linearGradient id="bmiGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4a63a8" />
            <stop offset="55%" stopColor="#b30d5c" />
            <stop offset="100%" stopColor="#ff2e88" />
          </linearGradient>
        </defs>

        {/* کمان پس‌زمینه */}
        <path
          d="M 22 110 A 88 88 0 0 1 198 110"
          fill="none"
          stroke="rgba(74,99,168,0.22)"
          strokeWidth="13"
          strokeLinecap="round"
        />
        {/* کمان پیشرفت */}
        <path
          d="M 22 110 A 88 88 0 0 1 198 110"
          fill="none"
          stroke="url(#bmiGrad)"
          strokeWidth="13"
          strokeLinecap="round"
          strokeDasharray={arcLen}
          strokeDashoffset={arcLen - progress}
          style={{ transition: reduceMotion ? "none" : "stroke-dashoffset 0.9s cubic-bezier(0.33,1,0.68,1)" }}
        />

        {/* نشانه‌های مرز دسته‌ها */}
        {marks.map((m) => (
          <line key={m.v} x1={m.x1} y1={m.y1} x2={m.x2} y2={m.y2} stroke="rgba(242,245,255,0.35)" strokeWidth="2" strokeLinecap="round" />
        ))}

        {/* عقربه */}
        <g
          style={{
            transform: `rotate(${needleAngle}deg)`,
            transformOrigin: "110px 110px",
            transition: reduceMotion ? "none" : "transform 1s cubic-bezier(0.34,1.4,0.64,1)",
          }}
        >
          <line x1="110" y1="110" x2="110" y2="34" stroke="#f2f5ff" strokeWidth="3" strokeLinecap="round" />
          <circle cx="110" cy="34" r="5" fill="#ff2e88" />
        </g>
        <circle cx="110" cy="110" r="9" fill="#101b3c" stroke="#ff2e88" strokeWidth="3" />
      </svg>

      {/* عدد BMI با شمارش متحرک */}
      <div className="pointer-events-none absolute inset-x-0 top-[46%] text-center">
        <p className="font-display text-[2.6rem] leading-none text-ink drop-shadow-[0_0_18px_rgba(255,46,136,0.45)]">
          {faNumber(display, 1)}
        </p>
        <p className="mt-0.5 text-[10px] font-extrabold tracking-[0.3em] text-navy-200">BMI</p>
      </div>
    </div>
  );
}

/** راهنمای دسته‌ها زیر گیج */
export function BmiLegend({ active }: { active: BmiInfo["category"] }) {
  const items: { key: BmiInfo["category"]; label: string }[] = [
    { key: "under", label: "کمبود وزن" },
    { key: "normal", label: "نرمال" },
    { key: "over", label: "اضافه وزن" },
    { key: "obese", label: "چاقی" },
  ];
  return (
    <div className="mt-2 grid grid-cols-4 gap-1.5">
      {items.map((it) => (
        <span
          key={it.key}
          className={`rounded-lg border px-1 py-1.5 text-center text-[10.5px] font-bold transition-all duration-300 ${
            active === it.key
              ? "border-pink-500/70 bg-pink-500/15 text-pink-300"
              : "border-navy-600/40 bg-navy-850/50 text-navy-200/60"
          }`}
        >
          {it.label}
        </span>
      ))}
    </div>
  );
}

export { polar };
