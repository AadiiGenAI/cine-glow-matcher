import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { HeroScreen } from "@/components/HeroScreen";
import { LoadingScreen } from "@/components/LoadingScreen";
import { RatingScreen } from "@/components/RatingScreen";
import { ResultsScreen } from "@/components/ResultsScreen";

export const Route = createFileRoute("/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "CineMatch — Rate a few. Discover your next favorite." },
      {
        name: "description",
        content:
          "CineMatch is a cinematic movie recommendation experience: rate a handful of films and get your top 10 personalized matches.",
      },
      { property: "og:title", content: "CineMatch — Discover your next favorite film" },
      {
        property: "og:description",
        content: "Rate a few movies and get 10 personalized, ranked recommendations.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CineMatch,
});

type Screen = "hero" | "rating" | "loading" | "results";

const pageTransition = {
  initial: { opacity: 0, y: 24, filter: "blur(12px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -24, filter: "blur(12px)" },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
};

function CineMatch() {
  const [screen, setScreen] = useState<Screen>("hero");

  useEffect(() => {
    if (screen !== "loading") return;
    const t = setTimeout(() => setScreen("results"), 1900);
    return () => clearTimeout(t);
  }, [screen]);

  return (
    <main className="relative min-h-screen overflow-x-hidden text-foreground">
      <AnimatedBackground />
      <AnimatePresence mode="wait">
        <motion.div key={screen} {...pageTransition}>
          {screen === "hero" && <HeroScreen onStart={() => setScreen("rating")} />}
          {screen === "rating" && <RatingScreen onComplete={() => setScreen("loading")} />}
          {screen === "loading" && <LoadingScreen />}
          {screen === "results" && <ResultsScreen onRestart={() => setScreen("rating")} />}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
