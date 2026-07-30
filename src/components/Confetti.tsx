import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

const COLORS = ["#ff2e88", "#ff5c9e", "#ff9ec4", "#4a63a8", "#27407e", "#f2f5ff", "#ffc2da"];

interface Piece {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  shape: "rect" | "circle" | "star";
  rot: number;
  vr: number;
  wobble: number;
  wobbleSpeed: number;
}

function drawStar(ctx: CanvasRenderingContext2D, s: number) {
  ctx.beginPath();
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? s : s * 0.45;
    const a = (Math.PI / 5) * i - Math.PI / 2;
    const x = Math.cos(a) * r;
    const y = Math.sin(a) * r;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();
}

export function Confetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let pieces: Piece[] = [];
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const burst = (count: number) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      for (let i = 0; i < count; i++) {
        const roll = Math.random();
        pieces.push({
          x: Math.random() * w,
          y: -30 - Math.random() * h * 0.35,
          vx: (Math.random() - 0.5) * 1.6,
          vy: 1.6 + Math.random() * 2.8,
          size: 5 + Math.random() * 8,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          shape: roll < 0.3 ? "star" : roll < 0.65 ? "rect" : "circle",
          rot: Math.random() * Math.PI * 2,
          vr: (Math.random() - 0.5) * 0.16,
          wobble: Math.random() * Math.PI * 2,
          wobbleSpeed: 0.02 + Math.random() * 0.05,
        });
      }
    };

    burst(150);
    const t1 = window.setTimeout(() => burst(80), 1000);
    const t2 = window.setTimeout(() => burst(60), 2100);

    const tick = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);
      pieces = pieces.filter((p) => p.y < h + 40);
      for (const p of pieces) {
        p.wobble += p.wobbleSpeed;
        p.x += p.vx + Math.sin(p.wobble) * 0.8;
        p.y += p.vy;
        p.rot += p.vr;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        if (p.shape === "rect") ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * 0.66);
        else if (p.shape === "circle") {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else drawStar(ctx, p.size);
        ctx.restore();
      }
      if (pieces.length > 0) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("resize", resize);
    };
  }, [reduceMotion]);

  if (reduceMotion) return null;
  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-40" aria-hidden="true" />;
}
