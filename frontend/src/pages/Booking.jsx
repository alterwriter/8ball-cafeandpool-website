import BookingForm from '../components/BookingForm.jsx';
import ServiceCard from '../components/ServiceCard.jsx';
import { useHomeContent } from '../hooks/useHomeContent.js';

function Booking() {
  const { data } = useHomeContent();

  return (
    <section className="container page">
      <header>
        <h1>Reservasi Meja</h1>
        <p className="muted">Pilih layanan favoritmu dan konfirmasi booking secara instan.</p>
      </header>
      <div className="service-grid">
        {data.services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
      <BookingForm />
    </section>
  );
}

export default Booking;
