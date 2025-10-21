import clsx from 'classnames';

function Hero({ loading, hero, highlights, gallery }) {
  if (loading) {
    return (
      <section className="max-w-6xl mx-auto px-6 py-24 text-latte">
        <div className="animate-pulse space-y-6">
          <div className="h-10 w-2/3 bg-white/30 rounded-full" />
          <div className="h-24 w-full bg-white/20 rounded-3xl" />
          <div className="grid md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, idx) => (
              <div key={idx} className="h-40 bg-white/20 rounded-3xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-6 pb-24 pt-10 text-latte">
      <p className="uppercase tracking-[0.35em] text-sm text-gold/90">{hero?.subheading}</p>
      <h2 className="font-heading text-4xl md:text-5xl font-semibold leading-tight max-w-3xl mt-4">
        {hero?.headline}
      </h2>
      <div className="mt-8 grid md:grid-cols-[1.3fr,0.7fr] gap-8 items-start">
        <div>
          <ul className="space-y-4 text-lg text-latte/90">
            {highlights.map((item) => (
              <li key={item} className="flex gap-3 items-start">
                <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-gold"></span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {gallery.map((image, index) => (
            <div
              key={image}
              className={clsx(
                'aspect-[4/5] rounded-3xl overflow-hidden border border-white/20 shadow-soft',
                index % 2 === 0 ? 'translate-y-4' : '-translate-y-4'
              )}
            >
              <img src={image} alt="Suasana 8Ball" className="h-full w-full object-cover" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
