import { motion } from "framer-motion";
import { Suspense, lazy } from "react";

const FilmReelScene = lazy(() =>
  import("./FilmReelScene").then((m) => ({ default: m.FilmReelScene })),
);

export function HeroScreen({ onStart }: { onStart: () => void }) {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 py-16 text-center">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-80">
        <div className="h-[30rem] w-full max-w-3xl">
          <Suspense fallback={null}>
            <FilmReelScene />
          </Suspense>
        </div>
      </div>

      <motion.div
        className="relative flex flex-col items-center"
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } } }}
      >
        <motion.span
          variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.6 }}
          className="rounded-full border border-border bg-card/60 px-3 py-1 text-[11px] tracking-[0.3em] text-muted-foreground uppercase backdrop-blur"
        >
          Your taste, decoded
        </motion.span>

        <motion.h1
          variants={{ hidden: { opacity: 0, y: 28, filter: "blur(14px)" }, show: { opacity: 1, y: 0, filter: "blur(0px)" } }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 text-6xl font-black tracking-tight sm:text-7xl md:text-8xl"
          style={{
            background: "linear-gradient(120deg, #fff 20%, var(--gold) 55%, #fff 90%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          CineMatch
        </motion.h1>

        <motion.p
          variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.7 }}
          className="mt-5 max-w-md text-base text-muted-foreground sm:text-lg"
        >
          Rate a few. Discover your next favorite.
        </motion.p>

        <motion.button
          variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
          onClick={onStart}
          whileHover={{ scale: 1.06, filter: "brightness(1.1)" }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 380, damping: 18 }}
          className="relative mt-10 cursor-pointer rounded-full px-9 py-4 text-sm font-bold tracking-wide text-primary-foreground uppercase"
          style={{ background: "var(--gold)" }}
        >
          <motion.span
            className="absolute inset-0 -z-10 rounded-full blur-xl"
            style={{ background: "var(--gold)" }}
            animate={{ opacity: [0.35, 0.75, 0.35], scale: [1, 1.12, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
          Get Started
        </motion.button>
      </motion.div>
    </section>
  );
}
