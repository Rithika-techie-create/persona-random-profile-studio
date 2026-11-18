import { Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <span className="badge">
        <Sparkles size={14} aria-hidden="true" />
        RANDOM PROFILE DISCOVERY
      </span>
      <h1 id="hero-title" className="hero__title">
        Meet someone <span className="hero__highlight">new.</span>
      </h1>
      <p className="hero__subtitle">
        Discover random people from around the world. Explore their stories, personalities, and
        details.
      </p>
    </section>
  );
}
