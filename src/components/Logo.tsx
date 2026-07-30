import logoImage from "../assets/logo.png";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <img
        src={logoImage}
        alt="لوگوی Star6Pack"
        className={`${compact ? "h-10 w-10" : "h-12 w-12"} rounded-xl mix-blend-screen drop-shadow-[0_0_14px_rgba(255,46,136,0.35)]`}
      />
      <div className="leading-none">
        <p className="font-display text-xl tracking-wide text-ink sm:text-2xl">
          Star<span className="text-pink-500">6</span>Pack
        </p>
        {!compact && <p className="mt-1 text-[10px] font-semibold tracking-[0.28em] text-navy-200/80">FITNESS • NUTRITION • PLAN</p>}
      </div>
    </div>
  );
}
