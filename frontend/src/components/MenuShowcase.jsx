function MenuShowcase({ menu }) {
  const categories = Array.from(new Set(menu.map((item) => item.category)));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3 text-sm">
        {categories.map((category) => (
          <span key={category} className="px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-600">
            {category}
          </span>
        ))}
      </div>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {menu.map((item) => (
          <article
            key={item.id}
            className="bg-white/80 border border-white/60 rounded-3xl p-6 shadow-soft hover:shadow-lg transition"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-heading text-xl text-charcoal">{item.name}</h3>
                <p className="text-sm text-slate-600 mt-2">{item.description}</p>
              </div>
              <span className="text-teal font-semibold">Rp {item.price.toLocaleString('id-ID')}</span>
            </div>
            <div className="mt-6 flex gap-2 text-xs text-slate-500">
              {item.dietary.map((note) => (
                <span key={note} className="px-3 py-1 rounded-full bg-teal/10 text-teal border border-teal/20">
                  {note}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default MenuShowcase;
