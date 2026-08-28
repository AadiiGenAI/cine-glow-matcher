import { posterGradient } from "@/data/movies";

type Props = {
  id: string;
  title: string;
  year?: number;
  compact?: boolean;
};

/** Dynamic gradient poster artwork with the title set in large cinematic type. */
export function PosterArt({ id, title, year, compact }: Props) {
  const words = title.split(" ");
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ backgroundImage: posterGradient(id) }}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(120% 80% at 20% -10%, rgba(255,255,255,0.22), transparent 60%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.14] mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(115deg, #fff 0 1px, transparent 1px 7px)",
        }}
      />
      <div className="absolute inset-0 flex flex-col justify-center px-3 text-center">
        <span
          className={`font-black tracking-tight text-balance uppercase ${
            compact ? "text-[10px] leading-3" : "text-base leading-[1.05] sm:text-xl"
          }`}
          style={{ color: "rgba(255,255,255,0.92)", textShadow: "0 2px 18px rgba(0,0,0,0.65)" }}
        >
          {words.join(" ")}
        </span>
        {year && !compact && (
          <span
            className="mt-1.5 text-[10px] tracking-[0.3em]"
            style={{ color: "var(--gold)" }}
          >
            {year}
          </span>
        )}
      </div>
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent" />
    </div>
  );
}
