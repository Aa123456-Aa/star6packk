import { useMemo } from "react";
import bgImage from "../assets/bg.jpg";

interface Particle {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export function Backdrop() {
  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 2 + Math.random() * 4,
        duration: 12 + Math.random() * 14,
        delay: -Math.random() * 26,
        opacity: 0.15 + Math.random() * 0.4,
      })),
    []
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* بک‌گراند تمام‌صفحه با حرکت آرام Ken Burns */}
      <img
        src={bgImage}
        alt=""
        className="animate-kenburns absolute inset-0 h-full w-full object-cover"
      />

      {/* لایه‌ی Overlay تیره برای خوانایی متن‌ها */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(200deg, rgba(6,11,28,0.88) 0%, rgba(10,17,40,0.82) 40%, rgba(13,10,32,0.9) 75%, rgba(6,11,28,0.96) 100%)",
        }}
      />

      {/* هاله‌ی صورتی برند */}
      <div
        className="absolute -top-40 left-1/2 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(255,46,136,0.5) 0%, transparent 65%)" }}
      />
      <div
        className="absolute bottom-0 right-0 h-96 w-96 translate-x-1/3 translate-y-1/3 rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(39,64,126,0.9) 0%, transparent 70%)" }}
      />

      {/* ذرات صعودکننده */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            top: 0,
            width: p.size,
            height: p.size,
            background: p.id % 3 === 0 ? "#ff2e88" : "#4a63a8",
            boxShadow: p.id % 3 === 0 ? "0 0 10px 2px rgba(255,46,136,0.4)" : "0 0 8px 2px rgba(74,99,168,0.35)",
            animation: `rise ${p.duration}s linear ${p.delay}s infinite`,
            ["--o" as string]: p.opacity,
            opacity: 0,
          }}
        />
      ))}

      {/* نویز ظریف */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
        }}
      />

      {/* ویگنت پایین */}
      <div
        className="absolute inset-x-0 bottom-0 h-64"
        style={{ background: "linear-gradient(to top, rgba(6,11,28,0.9), transparent)" }}
      />
    </div>
  );
}
