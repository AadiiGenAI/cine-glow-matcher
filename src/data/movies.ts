export type Movie = {
  id: string;
  title: string;
  year: number;
  genre: string[];
  poster_url: string;
  rating: number;
};

// Placeholder posters are rendered from a deterministic gradient palette so the
// app looks cinematic without external assets. Swap poster_url with real URLs
// when wiring a backend.
export const RATING_POOL: Movie[] = [
  { id: "1", title: "Inception", year: 2010, genre: ["Sci-Fi", "Thriller"], poster_url: "", rating: 0 },
  { id: "2", title: "The Dark Knight", year: 2008, genre: ["Action", "Crime"], poster_url: "", rating: 0 },
  { id: "3", title: "Interstellar", year: 2014, genre: ["Sci-Fi", "Drama"], poster_url: "", rating: 0 },
  { id: "4", title: "Parasite", year: 2019, genre: ["Thriller", "Drama"], poster_url: "", rating: 0 },
  { id: "5", title: "The Matrix", year: 1999, genre: ["Sci-Fi", "Action"], poster_url: "", rating: 0 },
  { id: "6", title: "Pulp Fiction", year: 1994, genre: ["Crime", "Drama"], poster_url: "", rating: 0 },
  { id: "7", title: "Spirited Away", year: 2001, genre: ["Animation", "Fantasy"], poster_url: "", rating: 0 },
  { id: "8", title: "The Godfather", year: 1972, genre: ["Crime", "Drama"], poster_url: "", rating: 0 },
  { id: "9", title: "La La Land", year: 2016, genre: ["Romance", "Musical"], poster_url: "", rating: 0 },
  { id: "10", title: "Whiplash", year: 2014, genre: ["Drama", "Music"], poster_url: "", rating: 0 },
];

export type Recommendation = Movie & { match: number };

export const RECOMMENDATIONS: Recommendation[] = [
  { id: "r1", title: "Blade Runner 2049", year: 2017, genre: ["Sci-Fi", "Mystery"], poster_url: "", rating: 8.0, match: 98 },
  { id: "r2", title: "Prisoners", year: 2013, genre: ["Thriller", "Crime"], poster_url: "", rating: 8.1, match: 96 },
  { id: "r3", title: "Arrival", year: 2016, genre: ["Sci-Fi", "Drama"], poster_url: "", rating: 7.9, match: 94 },
  { id: "r4", title: "Oldboy", year: 2003, genre: ["Thriller", "Mystery"], poster_url: "", rating: 8.3, match: 92 },
  { id: "r5", title: "Se7en", year: 1995, genre: ["Crime", "Thriller"], poster_url: "", rating: 8.6, match: 90 },
  { id: "r6", title: "Your Name.", year: 2016, genre: ["Animation", "Romance"], poster_url: "", rating: 8.4, match: 88 },
  { id: "r7", title: "Heat", year: 1995, genre: ["Crime", "Action"], poster_url: "", rating: 8.3, match: 86 },
  { id: "r8", title: "Sicario", year: 2015, genre: ["Thriller", "Action"], poster_url: "", rating: 7.6, match: 84 },
  { id: "r9", title: "Birdman", year: 2014, genre: ["Drama", "Comedy"], poster_url: "", rating: 7.7, match: 82 },
  { id: "r10", title: "Drive", year: 2011, genre: ["Crime", "Drama"], poster_url: "", rating: 7.8, match: 80 },
];

const PALETTES = [
  ["oklch(0.42 0.14 264)", "oklch(0.18 0.05 264)"],
  ["oklch(0.38 0.12 30)", "oklch(0.16 0.04 30)"],
  ["oklch(0.44 0.11 180)", "oklch(0.16 0.04 200)"],
  ["oklch(0.40 0.15 330)", "oklch(0.16 0.05 320)"],
  ["oklch(0.46 0.13 90)", "oklch(0.17 0.04 80)"],
  ["oklch(0.36 0.10 150)", "oklch(0.15 0.03 150)"],
];

export function posterGradient(id: string) {
  const n = id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const [a, b] = PALETTES[n % PALETTES.length];
  return `linear-gradient(150deg, ${a} 0%, ${b} 70%)`;
}
