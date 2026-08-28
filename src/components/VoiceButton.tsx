import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useRef, useState } from "react";

type Props = { onResult: (transcript: string) => void };

export function VoiceButton({ onResult }: Props) {
  const [listening, setListening] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  const start = useCallback(() => {
    if (listening) {
      recognitionRef.current?.stop();
      return;
    }
    const SR =
      typeof window !== "undefined" &&
      ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);
    if (!SR) {
      setMessage("Voice search isn't supported in this browser");
      setTimeout(() => setMessage(null), 2600);
      return;
    }
    const recognition = new SR();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript as string;
      setMessage(`Heard "${transcript}"`);
      setTimeout(() => setMessage(null), 2600);
      onResult(transcript);
    };
    recognition.onerror = () => {
      setMessage("Didn't catch that — try again");
      setTimeout(() => setMessage(null), 2600);
    };
    recognition.onend = () => setListening(false);
    recognitionRef.current = recognition;
    setListening(true);
    setMessage("Listening…");
    recognition.start();
  }, [listening, onResult]);

  return (
    <div className="relative flex flex-col items-center">
      <motion.button
        type="button"
        onClick={start}
        aria-label="Search a movie by voice"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        transition={{ type: "spring", stiffness: 420, damping: 18 }}
        className="relative flex h-14 w-14 items-center justify-center rounded-full border border-border bg-card/80 backdrop-blur-md"
        style={{ boxShadow: listening ? "var(--shadow-glow)" : "var(--shadow-cinema)" }}
      >
        {listening && (
          <>
            <motion.span
              className="absolute inset-0 rounded-full border"
              style={{ borderColor: "var(--gold)" }}
              animate={{ scale: [1, 1.6], opacity: [0.7, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
            />
            <motion.span
              className="absolute inset-0 rounded-full border"
              style={{ borderColor: "var(--gold)" }}
              animate={{ scale: [1, 1.6], opacity: [0.7, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut", delay: 0.8 }}
            />
          </>
        )}
        <motion.svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke={listening ? "var(--gold)" : "currentColor"}
          strokeWidth="1.8"
          strokeLinecap="round"
          animate={listening ? { scale: [1, 1.12, 1] } : { scale: 1 }}
          transition={{ duration: 1.1, repeat: listening ? Infinity : 0 }}
        >
          <rect x="9" y="2.5" width="6" height="11" rx="3" />
          <path d="M5 11a7 7 0 0 0 14 0M12 18v3.5" />
        </motion.svg>
      </motion.button>

      <AnimatePresence>
        {message && (
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            className="absolute top-full mt-2 w-max max-w-[16rem] rounded-full border border-border bg-card/90 px-3 py-1 text-center text-[11px] text-muted-foreground backdrop-blur"
          >
            {message}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
