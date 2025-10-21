import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { addHours } from 'date-fns';
import { createBooking, fetchServices } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';

function BookingForm() {
  const { isAuthenticated } = useAuth();
  const [services, setServices] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      serviceId: '',
      startTime: '',
      durationHours: 2,
      notes: '',
    },
  });

  useEffect(() => {
    fetchServices().then(setServices).catch(() => setServices([]));
  }, []);

  const onSubmit = handleSubmit(async (values) => {
    setFeedback(null);
    try {
      const payload = {
        ...values,
        startTime: new Date(values.startTime),
      };
      const { booking, message } = await createBooking(payload);
      setFeedback({ type: 'success', message: `${message} Booking ID: ${booking.id}` });
      reset();
    } catch (error) {
      const message = error.response?.data?.message || 'Gagal membuat booking. Pastikan kamu sudah login.';
      setFeedback({ type: 'error', message });
    }
  });

  const minStart = addHours(new Date(), 2).toISOString().slice(0, 16);

  return (
    <section id="booking" className="card form-card">
      <header>
        <h2>Reservasi Meja Billiard</h2>
        <p className="muted">Booking per jam dengan pilihan layanan berbeda sesuai kebutuhanmu.</p>
      </header>
      {!isAuthenticated ? (
        <p className="alert">Login membership untuk melakukan booking.</p>
      ) : null}
      <form onSubmit={onSubmit} className="form-grid">
        <label>
          Layanan
          <select {...register('serviceId', { required: 'Pilih layanan' })}>
            <option value="">Pilih layanan</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name} — IDR {service.ratePerHour.toLocaleString('id-ID')} / jam
              </option>
            ))}
          </select>
          {errors.serviceId && <span className="error">{errors.serviceId.message}</span>}
        </label>
        <label>
          Waktu Mulai
          <input
            type="datetime-local"
            step="1800"
            min={minStart}
            {...register('startTime', { required: 'Waktu mulai wajib dipilih' })}
          />
          {errors.startTime && <span className="error">{errors.startTime.message}</span>}
        </label>
        <label>
          Durasi (Jam)
          <input type="number" min="1" max="6" {...register('durationHours', { required: true, valueAsNumber: true })} />
          {errors.durationHours && <span className="error">Durasi antara 1-6 jam.</span>}
        </label>
        <label className="full">
          Catatan untuk Tim
          <textarea rows="3" placeholder="Contoh: butuh meja dekat jendela" {...register('notes')} />
        </label>
        <button type="submit" className="button primary" disabled={isSubmitting || !isAuthenticated}>
          {isSubmitting ? 'Memproses…' : 'Konfirmasi Booking'}
        </button>
      </form>
      {feedback ? <p className={`alert ${feedback.type}`}>{feedback.message}</p> : null}
    </section>
  );
}

export default BookingForm;
