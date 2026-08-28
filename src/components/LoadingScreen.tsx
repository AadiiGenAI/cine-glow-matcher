import { motion } from "framer-motion";
import { useMemo } from "react";

export function LoadingScreen() {
  const particles = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => {
        const angle = (i / 28) * Math.PI * 2;
        const radius = 180 + (i % 5) * 40;
        return {
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius,
          delay: (i % 7) * 0.09,
        };
      }),
    [],
  );

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <motion.div
        className="absolute h-[26rem] w-[26rem] rounded-full blur-[100px]"
        style={{ background: "oklch(0.842 0.156 87.5 / 18%)" }}
        animate={{ scale: [0.8, 1.25, 0.8], opacity: [0.45, 0.9, 0.45] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      {particles.map((p, i) => (
        <motion.span
          key={i}
          className="absolute h-1.5 w-1.5 rounded-full"
          style={{ background: "var(--gold)" }}
          initial={{ x: p.x, y: p.y, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: [0, 1, 0], scale: [1, 0.4] }}
          transition={{
            duration: 1.5,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeIn",
          }}
        />
      ))}
      <motion.div
        className="relative flex flex-col items-center gap-5"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="h-20 w-20 rounded-full border-2 border-transparent"
          style={{ borderTopColor: "var(--gold)", borderRightColor: "var(--gold-soft)" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
        />
        <motion.p
          className="text-lg font-medium tracking-[0.18em] uppercase"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          Finding your matches…
        </motion.p>
      </motion.div>
    </div>
  );
}
