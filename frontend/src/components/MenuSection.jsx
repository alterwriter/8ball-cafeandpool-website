function MenuSection({ section }) {
  return (
    <section className="card menu-section">
      <header>
        <h3>{section.name}</h3>
      </header>
      <ul className="menu-items">
        {section.items.map((item) => (
          <li key={item.id}>
            <div>
              <h4>{item.name}</h4>
              <p className="muted">{item.description}</p>
            </div>
            <span className="price">IDR {item.price.toLocaleString('id-ID')}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default MenuSection;
