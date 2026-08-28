import { motion } from "framer-motion";
import { RECOMMENDATIONS } from "@/data/movies";
import { RecommendationCard } from "./RecommendationCard";

export function ResultsScreen({ onRestart }: { onRestart: () => void }) {
  return (
    <section className="mx-auto min-h-screen w-full max-w-3xl px-4 pt-14 pb-24 sm:px-6">
      <motion.header
        initial={{ opacity: 0, y: -18, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.7 }}
        className="text-center"
      >
        <p className="text-[11px] tracking-[0.32em] text-muted-foreground uppercase">
          Curated for you
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Your top 10 matches</h2>
      </motion.header>

      <motion.div
        className="mt-10 flex flex-col gap-4"
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.09, delayChildren: 0.2 } } }}
      >
        {RECOMMENDATIONS.map((movie, i) => (
          <RecommendationCard key={movie.id} movie={movie} rank={i + 1} />
        ))}
      </motion.div>

      <div className="mt-12 flex justify-center">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          whileHover={{ scale: 1.06, filter: "brightness(1.1)" }}
          whileTap={{ scale: 0.94 }}
          onClick={onRestart}
          className="relative cursor-pointer rounded-full px-8 py-3.5 text-sm font-bold tracking-wide text-primary-foreground uppercase"
          style={{ background: "var(--gold)" }}
        >
          <motion.span
            className="absolute inset-0 -z-10 rounded-full blur-xl"
            style={{ background: "var(--gold)" }}
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
          Rate More Movies
        </motion.button>
      </div>
    </section>
  );
}
