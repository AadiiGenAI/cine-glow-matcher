import { motion } from "framer-motion";

export function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <motion.div
        className="absolute -left-40 top-[-10%] h-[38rem] w-[38rem] rounded-full blur-[120px]"
        style={{ background: "oklch(0.842 0.156 87.5 / 12%)" }}
        animate={{ x: [0, 80, -30, 0], y: [0, 60, 20, 0], scale: [1, 1.15, 0.95, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-15%] top-[30%] h-[32rem] w-[32rem] rounded-full blur-[130px]"
        style={{ background: "oklch(0.45 0.16 300 / 16%)" }}
        animate={{ x: [0, -70, 40, 0], y: [0, -50, 30, 0], scale: [1, 0.9, 1.1, 1] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-20%] left-[30%] h-[30rem] w-[30rem] rounded-full blur-[140px]"
        style={{ background: "oklch(0.4 0.12 220 / 16%)" }}
        animate={{ x: [0, 50, -60, 0], y: [0, -40, 10, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />
      <div
        className="absolute inset-0 opacity-[0.16] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
