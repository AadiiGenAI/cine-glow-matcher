# CineMatch Hub

Build a heavily animated, dark-themed movie recommendation web app called "CineMatch" using React.js, Framer Motion, and Three.js, optimized for mobile and desktop. IMDB-inspired aesthetic: deep charcoal/black background (#0d0d0d), gold/amber accent (#f5c518). Smooth animated transitions between screens, cinematic and fluid — no jank.

Screens (each a distinct animated experience, not static):

Hero / Landing Screen:

- App name "CineMatch" with animated gradient blur background

- Subtle Three.js 3D element (floating film reel, abstract particle sphere, or animated icon) reacting slightly to mouse movement

- Tagline "Rate a few. Discover your next favorite." with Framer Motion entrance animation

- Glowing animated "Get Started" button with motion blur/scale on hover

Rating Screen:

- Grid of 8-10 movie poster cards (use placeholder posters: Inception, The Dark Knight, Interstellar, Parasite, The Matrix, Pulp Fiction, Spirited Away, The Godfather, La La Land, Whiplash)

- Cards lift and glow on hover with a smooth scale animation

- 5-star rating selector per card with animated fill on selection

- Floating progress pill showing "X/5 rated" that updates with a spring animation

- Animated microphone button (pulsing glow ring while "listening") for voice search — this triggers browser voice input to find/rate a movie by speaking its name

- Cards fade/slide in with staggered entrance animation on page load

Loading Transition:

- Full-screen cinematic loading animation ("Finding your matches...") — animated gradient blur pulse or particle convergence effect, 1.5-2 seconds, feels like a mini experience not a spinner

Results Screen:

- Ranked list of 10 recommended movies as cards: poster, title, year, genre tags, gold "Match %" badge

- Staggered fade/slide-up entrance animation, cards animate in sequence top to bottom

- Hover state: card lifts with shadow and slight glow

- "Rate More Movies" button with glow/hover animation to restart flow

Visual/UX Requirements:

- Animated gradient blur backgrounds throughout, subtle and dark

- Full page transitions between Hero → Rating → Loading → Results should be seamless, not hard cuts — fade/slide combined transitions

- Fully responsive for mobile and tablet

- Micro-interactions everywhere: button hover states, tap feedback, animated star fills

- Keep it premium and cinematic — shadows, gradient overlays on posters, no generic flat UI

Structure with clean reusable components (MovieCard, StarRating, RecommendationCard, VoiceButton, LoadingScreen) using mock data in shape: {id, title, year, genre[], poster_url, rating} — so I can wire in a real backend API afterward.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/62b47d85-ea93-41ea-9be4-54c335dd589e).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
