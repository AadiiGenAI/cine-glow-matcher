import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useState } from "react";
import { RATING_POOL } from "@/data/movies";
import { MovieCard } from "./MovieCard";
import { VoiceButton } from "./VoiceButton";

const TARGET = 5;

export function RatingScreen({ onComplete }: { onComplete: (ratings: Record<string, number>) => void }) {
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [highlighted, setHighlighted] = useState<string | null>(null);

  const count = Object.values(ratings).filter((r) => r > 0).length;
  const ready = count >= TARGET;

  const handleVoice = useCallback((transcript: string) => {
    const q = transcript.toLowerCase().replace(/[^a-z0-9 ]/g, "").trim();
    const match =
      RATING_POOL.find((m) => m.title.toLowerCase().includes(q)) ??
      RATING_POOL.find((m) => q.includes(m.title.toLowerCase().replace(/^the /, "")));
    if (!match) return;
    setHighlighted(match.id);
    document
      .getElementById(`movie-${match.id}`)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => setHighlighted(null), 2800);
  }, []);

  return (
    <section className="relative mx-auto min-h-screen w-full max-w-6xl px-4 pt-14 pb-40 sm:px-6">
      <motion.header
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Rate what you've seen</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Give us {TARGET} ratings — or tap the mic and say a title.
        </p>
      </motion.header>

      <motion.div
        className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } } }}
      >
        {RATING_POOL.map((movie) => (
          <div key={movie.id} id={`movie-${movie.id}`}>
            <MovieCard
              movie={movie}
              rating={ratings[movie.id] ?? 0}
              highlighted={highlighted === movie.id}
              onRate={(r) => setRatings((prev) => ({ ...prev, [movie.id]: r }))}
            />
          </div>
        ))}
      </motion.div>

      <div className="fixed inset-x-0 bottom-6 z-20 flex items-end justify-center gap-4 px-4">
        <motion.div
          layout
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          className="flex items-center gap-3 rounded-full border border-border bg-card/85 px-5 py-3 backdrop-blur-xl"
          style={{ boxShadow: ready ? "var(--shadow-glow)" : "var(--shadow-cinema)" }}
        >
          <motion.span
            key={count}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 520, damping: 15 }}
            className="text-sm font-bold"
            style={{ color: "var(--gold)" }}
          >
            {Math.min(count, TARGET)}/{TARGET}
          </motion.span>
          <span className="text-sm text-muted-foreground">rated</span>
          <div className="h-1.5 w-24 overflow-hidden rounded-full bg-secondary">
            <motion.div
              className="h-full rounded-full"
              style={{ background: "var(--gold)" }}
              animate={{ width: `${Math.min(count / TARGET, 1) * 100}%` }}
              transition={{ type: "spring", stiffness: 200, damping: 26 }}
            />
          </div>
          <AnimatePresence>
            {ready && (
              <motion.button
                initial={{ opacity: 0, width: 0, scale: 0.8 }}
                animate={{ opacity: 1, width: "auto", scale: 1 }}
                exit={{ opacity: 0, width: 0, scale: 0.8 }}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => onComplete(ratings)}
                className="ml-1 cursor-pointer overflow-hidden rounded-full px-4 py-2 text-xs font-bold whitespace-nowrap text-primary-foreground uppercase"
                style={{ background: "var(--gold)" }}
              >
                See matches
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>

        <VoiceButton onResult={handleVoice} />
      </div>
    </section>
  );
}
