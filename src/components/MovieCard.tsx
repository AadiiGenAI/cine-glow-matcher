import { motion } from "framer-motion";
import { type Movie, posterGradient } from "@/data/movies";
import { StarRating } from "./StarRating";

type Props = {
  movie: Movie;
  rating: number;
  onRate: (rating: number) => void;
  highlighted?: boolean;
};

export function MovieCard({ movie, rating, onRate, highlighted }: Props) {
  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 34, scale: 0.94 },
        show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 260, damping: 26 } },
      }}
      whileHover={{ y: -10, scale: 1.03 }}
      whileTap={{ scale: 0.985 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      animate={highlighted ? { boxShadow: "var(--shadow-glow)" } : {}}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card/70 backdrop-blur-sm"
      style={{ boxShadow: "var(--shadow-cinema)" }}
    >
      <div
        className="relative aspect-2/3 w-full"
        style={{ backgroundImage: posterGradient(movie.id) }}
      >
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/25 to-transparent" />
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100"
          style={{ background: "radial-gradient(70% 50% at 50% 100%, var(--gold-soft), transparent)" }}
          transition={{ duration: 0.4 }}
        />
        <div className="absolute inset-x-0 bottom-0 p-3">
          <h3 className="text-sm leading-tight font-semibold text-foreground sm:text-base">
            {movie.title}
          </h3>
          <p className="mt-1 text-[11px] text-muted-foreground">
            {movie.year} · {movie.genre.join(" / ")}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center border-t border-border bg-black/40 px-2 py-3">
        <StarRating value={rating} onChange={onRate} size={20} />
      </div>
    </motion.article>
  );
}
