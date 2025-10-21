import MenuSection from '../components/MenuSection.jsx';
import { useHomeContent } from '../hooks/useHomeContent.js';

function Menu() {
  const { data } = useHomeContent();

  return (
    <section className="container page">
      <header>
        <h1>Menu Signature</h1>
        <p className="muted">Dari espresso craft hingga mocktail smoked infusion.</p>
      </header>
      <div className="menu-grid">
        {data.menuSections.map((section) => (
          <MenuSection key={section.id} section={section} />
        ))}
      </div>
    </section>
  );
}

export default Menu;
