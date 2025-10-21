function Hero({ hero, onBookNow }) {
  if (!hero) return null;
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Premium Cafe &amp; Pool Experience</p>
          <h1>{hero.headline}</h1>
          <p className="hero-sub">{hero.subheadline}</p>
          <div className="hero-actions">
            <a className="button primary" href="#booking" onClick={onBookNow}>
              {hero.ctaPrimary}
            </a>
            <a className="button ghost" href="#menu">
              {hero.ctaSecondary}
            </a>
          </div>
        </div>
        <div className="hero-visual">
          <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200" alt="Cafe ambience" loading="lazy" />
          <div className="hero-card">
            <p>“Tempat paling cozy buat main billiard sambil ngopi signature.”</p>
            <span>- Dira, Emerald Member</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
