function Section({ id, eyebrow, title, children }) {
  return (
    <section id={id} className="space-y-6">
      <div>
        <p className="uppercase tracking-[0.4em] text-xs text-teal/70">{eyebrow}</p>
        <h2 className="font-heading text-3xl md:text-4xl text-charcoal">{title}</h2>
      </div>
      <div className="space-y-6">{children}</div>
    </section>
  );
}

export default Section;
