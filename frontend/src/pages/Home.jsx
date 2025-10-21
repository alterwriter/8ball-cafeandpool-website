import Hero from '../components/Hero.jsx';
import ServiceCard from '../components/ServiceCard.jsx';
import MenuSection from '../components/MenuSection.jsx';
import BookingForm from '../components/BookingForm.jsx';
import OrderForm from '../components/OrderForm.jsx';
import { useHomeContent } from '../hooks/useHomeContent.js';

function Home({ onBookNow }) {
  const { data, loading, error } = useHomeContent();

  if (loading) {
    return (
      <div className="container">
        <p className="muted">Memuat pengalaman 8Ball Cafe...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <p className="alert error">{error}</p>
      </div>
    );
  }

  return (
    <>
      <Hero hero={data.hero} onBookNow={onBookNow} />
      <section className="container story" id="about">
        <div className="story-card card">
          <h2>{data.story.title}</h2>
          <p>{data.story.description}</p>
          <div className="values">
            {data.values.map((value) => (
              <article key={value.id}>
                <h4>{value.title}</h4>
                <p className="muted">{value.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container staff-grid">
        {data.staffHighlights.map((staff) => (
          <article key={staff.id} className="card staff-card">
            <img src={`https://source.unsplash.com/600x600/?portrait,${staff.name.split(' ')[0]}`} alt={staff.name} loading="lazy" />
            <div>
              <h3>{staff.name}</h3>
              <p className="muted">{staff.title}</p>
              <p>{staff.bio}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="container service-grid">
        {data.services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </section>

      <section className="container menu-grid" id="menu">
        {data.menuSections.map((section) => (
          <MenuSection key={section.id} section={section} />
        ))}
      </section>

      <section className="container forms-grid">
        <BookingForm />
        <OrderForm />
      </section>
    </>
  );
}

export default Home;
