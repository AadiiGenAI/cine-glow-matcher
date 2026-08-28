import { motion } from "framer-motion";

type Props = {
  value: number;
  onChange: (value: number) => void;
  size?: number;
};

export function StarRating({ value, onChange, size = 22 }: Props) {
  return (
    <div className="flex items-center gap-1" role="group" aria-label="Star rating">
      {[1, 2, 3, 4, 5].map((star) => {
        const active = star <= value;
        return (
          <motion.button
            key={star}
            type="button"
            aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              onChange(star === value ? 0 : star);
            }}
            whileHover={{ scale: 1.25, rotate: -6 }}
            whileTap={{ scale: 0.85 }}
            transition={{ type: "spring", stiffness: 480, damping: 16 }}
            className="cursor-pointer p-0.5"
          >
            <motion.svg
              width={size}
              height={size}
              viewBox="0 0 24 24"
              initial={false}
              animate={{
                fill: active ? "var(--gold)" : "transparent",
                filter: active
                  ? "drop-shadow(0 0 6px var(--gold-soft))"
                  : "drop-shadow(0 0 0px transparent)",
              }}
              transition={{ duration: 0.25 }}
              stroke={active ? "var(--gold)" : "var(--muted-foreground)"}
              strokeWidth={1.6}
              strokeLinejoin="round"
            >
              <path d="M12 2.6l2.9 5.9 6.5.95-4.7 4.58 1.11 6.47L12 17.45 6.19 20.5 7.3 14.03 2.6 9.45l6.5-.95L12 2.6z" />
            </motion.svg>
          </motion.button>
        );
      })}
    </div>
  );
}
