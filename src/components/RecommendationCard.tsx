import { motion } from "framer-motion";
import { type Recommendation, posterGradient } from "@/data/movies";

export function RecommendationCard({ movie, rank }: { movie: Recommendation; rank: number }) {
  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 40 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 240, damping: 26 } },
      }}
      whileHover={{ y: -6, scale: 1.015 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="group relative flex gap-4 overflow-hidden rounded-2xl border border-border bg-card/70 p-3 backdrop-blur-sm sm:p-4"
      style={{ boxShadow: "var(--shadow-cinema)" }}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100"
        style={{ background: "radial-gradient(60% 120% at 0% 50%, var(--gold-soft), transparent)" }}
        transition={{ duration: 0.35 }}
      />
      <div
        className="relative h-28 w-20 shrink-0 overflow-hidden rounded-xl sm:h-32 sm:w-22"
        style={{ backgroundImage: posterGradient(movie.id) }}
      >
        <div className="absolute inset-0 bg-linear-to-t from-black/85 to-transparent" />
        <span className="absolute bottom-1 left-2 text-lg font-black text-foreground/80">
          {rank}
        </span>
      </div>

      <div className="relative flex min-w-0 flex-1 flex-col justify-center">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold sm:text-lg">{movie.title}</h3>
            <p className="text-xs text-muted-foreground">
              {movie.year} · ★ {movie.rating.toFixed(1)}
            </p>
          </div>
          <motion.span
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 18, delay: 0.15 }}
            className="shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold text-primary-foreground"
            style={{ background: "var(--gold)", boxShadow: "0 0 18px var(--gold-soft)" }}
          >
            {movie.match}% match
          </motion.span>
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {movie.genre.map((g) => (
            <span
              key={g}
              className="rounded-full border border-border bg-secondary/60 px-2 py-0.5 text-[10px] tracking-wide text-muted-foreground uppercase"
            >
              {g}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
