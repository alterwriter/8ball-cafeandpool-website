import { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { createOrder, fetchMenu, listBookings } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';

function OrderForm() {
  const { isAuthenticated } = useAuth();
  const [menuSections, setMenuSections] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      bookingId: '',
      notes: '',
      items: [{ menuItemId: '', quantity: 1 }],
    },
  });
  const { fields, append, remove } = useFieldArray({ control, name: 'items' });

  useEffect(() => {
    if (!isAuthenticated) return;
    listBookings().then(setBookings).catch(() => setBookings([]));
  }, [isAuthenticated]);

  useEffect(() => {
    fetchMenu().then(setMenuSections).catch(() => setMenuSections([]));
  }, []);

  const menuItems = menuSections.flatMap((section) => section.items);

  const onSubmit = handleSubmit(async (values) => {
    setFeedback(null);
    try {
      const response = await createOrder(values);
      setFeedback({ type: 'success', message: `${response.message} Order ID: ${response.order.id}` });
      reset();
    } catch (error) {
      const message = error.response?.data?.message || 'Gagal membuat order.';
      setFeedback({ type: 'error', message });
    }
  });

  return (
    <section className="card form-card">
      <header>
        <h2>Order Food &amp; Beverage</h2>
        <p className="muted">Pilih menu favorit untuk disiapkan sebelum kamu sampai di meja.</p>
      </header>
      {!isAuthenticated ? <p className="alert">Login membership untuk membuat order.</p> : null}
      <form onSubmit={onSubmit} className="form-grid">
        <label>
          Pilih Booking ID
          <select {...register('bookingId', { required: 'Pilih booking yang aktif' })}>
            <option value="">Booking aktif</option>
            {bookings.map((booking) => (
              <option key={booking.id} value={booking.id}>
                {booking.id} — {booking.serviceId} ({new Date(booking.startTime).toLocaleString('id-ID')})
              </option>
            ))}
          </select>
          {errors.bookingId && <span className="error">{errors.bookingId.message}</span>}
        </label>

        {fields.map((field, index) => (
          <div key={field.id} className="item-row">
            <label className="full">
              Menu Item
              <select
                {...register(`items.${index}.menuItemId`, { required: 'Pilih menu' })}
              >
                <option value="">Pilih menu</option>
                {menuItems.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name} — IDR {item.price.toLocaleString('id-ID')}
                  </option>
                ))}
              </select>
              {errors.items?.[index]?.menuItemId && (
                <span className="error">{errors.items[index].menuItemId.message}</span>
              )}
            </label>
            <label>
              Qty
              <input type="number" min="1" max="10" {...register(`items.${index}.quantity`, { required: true, valueAsNumber: true })} />
              {errors.items?.[index]?.quantity && <span className="error">Qty 1-10</span>}
            </label>
            {fields.length > 1 ? (
              <button type="button" className="button ghost" onClick={() => remove(index)}>
                Hapus
              </button>
            ) : null}
          </div>
        ))}

        <div className="form-actions">
          <button type="button" className="button ghost" onClick={() => append({ menuItemId: '', quantity: 1 })}>
            Tambah Item
          </button>
        </div>

        <label className="full">
          Catatan Khusus
          <textarea rows="3" {...register('notes')} placeholder="Contoh: tanpa gula, extra ice" />
        </label>
        <button type="submit" className="button primary" disabled={isSubmitting || !isAuthenticated}>
          {isSubmitting ? 'Memproses…' : 'Buat Order'}
        </button>
      </form>
      {feedback ? <p className={`alert ${feedback.type}`}>{feedback.message}</p> : null}
    </section>
  );
}

export default OrderForm;
