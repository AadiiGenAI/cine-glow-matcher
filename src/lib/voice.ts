const NUMBER_WORDS: Record<string, number> = {
  zero: 0,
  one: 1,
  two: 2,
  to: 2,
  too: 2,
  three: 3,
  four: 4,
  for: 4,
  five: 5,
  "1": 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
};

export function normalize(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Extract a star rating (1-5) from a transcript, if present. */
export function parseRating(transcript: string): number | null {
  const t = normalize(transcript);
  const m = t.match(/\b(zero|one|two|to|too|three|four|for|five|[0-5])\b\s*(star|stars|out of five)?/g);
  if (!m) return null;
  // Prefer an explicit "<n> star(s)" mention.
  const explicit = t.match(/\b(zero|one|two|to|too|three|four|for|five|[0-5])\b\s*stars?\b/);
  const token = explicit ? explicit[1] : m[m.length - 1].trim().split(" ")[0];
  const value = NUMBER_WORDS[token];
  return value === undefined || value < 0 || value > 5 ? null : value;
}

/** Fuzzy-match a spoken phrase against a list of titles. */
export function matchTitle<T extends { id: string; title: string }>(
  transcript: string,
  items: T[],
): T | null {
  const t = normalize(transcript)
    .replace(/\b(zero|one|two|to|too|three|four|for|five|[0-5])\b/g, " ")
    .replace(/\b(stars?|rate|rating|give|out of|please)\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!t) return null;

  let best: { item: T; score: number } | null = null;
  for (const item of items) {
    const title = normalize(item.title);
    const short = title.replace(/^the /, "");
    let score = 0;
    if (title === t || short === t) score = 100;
    else if (t.includes(title) || t.includes(short)) score = 80 + title.length;
    else if (title.includes(t) && t.length > 3) score = 60 + t.length;
    else {
      const words = short.split(" ").filter((w) => w.length > 2);
      const hits = words.filter((w) => t.includes(w)).length;
      if (hits) score = (hits / words.length) * 50;
    }
    if (score > 25 && (!best || score > best.score)) best = { item, score };
  }
  return best?.item ?? null;
}
