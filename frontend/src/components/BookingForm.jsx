import { useState } from 'react';
import dayjs from 'dayjs';

const initialState = {
  customerName: '',
  email: '',
  phone: '',
  packageId: '',
  bookingDate: dayjs().add(1, 'day').format('YYYY-MM-DD'),
  startHour: 18,
  durationHours: 2,
  notes: '',
};

function BookingForm({ packages, mutation }) {
  const [formData, setFormData] = useState(initialState);
  const [success, setSuccess] = useState();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccess(undefined);
    try {
      const payload = {
        ...formData,
        startHour: Number(formData.startHour),
        durationHours: Number(formData.durationHours),
      };
      const result = await mutation.mutateAsync(payload);
      setSuccess(result.booking.id);
      setFormData(initialState);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white/80 border border-white/60 rounded-3xl shadow-soft p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h3 className="font-heading text-2xl text-charcoal">Booking lounge favoritmu</h3>
          <p className="text-slate-600">Isi detail di bawah dan dapatkan booking ID instan untuk ditunjukkan ke host kami.</p>
        </div>
        {success && (
          <div className="px-5 py-3 rounded-full bg-teal/15 text-teal font-semibold border border-teal/30">
            Booking ID: {success}
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-slate-700">Nama Lengkap</label>
          <input
            required
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            className="rounded-2xl border border-slate-200 px-4 py-3 bg-white focus:border-teal focus:outline-none"
            placeholder="Contoh: Raka Wiradipa"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-slate-700">Email</label>
          <input
            required
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="rounded-2xl border border-slate-200 px-4 py-3 bg-white focus:border-teal focus:outline-none"
            placeholder="nama@domain.com"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-slate-700">Nomor WhatsApp</label>
          <input
            required
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="rounded-2xl border border-slate-200 px-4 py-3 bg-white focus:border-teal focus:outline-none"
            placeholder="08xx"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-slate-700">Pilih Paket</label>
          <select
            required
            name="packageId"
            value={formData.packageId}
            onChange={handleChange}
            className="rounded-2xl border border-slate-200 px-4 py-3 bg-white focus:border-teal focus:outline-none"
          >
            <option value="" disabled>
              Pilih paket
            </option>
            {packages.map((pkg) => (
              <option key={pkg.id} value={pkg.id}>
                {pkg.name} — Rp {pkg.pricePerHour.toLocaleString('id-ID')} / jam
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-slate-700">Tanggal</label>
          <input
            required
            type="date"
            name="bookingDate"
            value={formData.bookingDate}
            onChange={handleChange}
            className="rounded-2xl border border-slate-200 px-4 py-3 bg-white focus:border-teal focus:outline-none"
            min={dayjs().format('YYYY-MM-DD')}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-slate-700">Mulai Jam</label>
          <input
            required
            type="number"
            min="10"
            max="24"
            name="startHour"
            value={formData.startHour}
            onChange={handleChange}
            className="rounded-2xl border border-slate-200 px-4 py-3 bg-white focus:border-teal focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-slate-700">Durasi (jam)</label>
          <input
            required
            type="number"
            min="1"
            max="6"
            name="durationHours"
            value={formData.durationHours}
            onChange={handleChange}
            className="rounded-2xl border border-slate-200 px-4 py-3 bg-white focus:border-teal focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-2 md:col-span-2">
          <label className="text-sm font-medium text-slate-700">Catatan tambahan</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={3}
            className="rounded-2xl border border-slate-200 px-4 py-3 bg-white focus:border-teal focus:outline-none"
            placeholder="Contoh: request billiard coach, setup event, dll"
          />
        </div>
        <button
          type="submit"
          disabled={mutation.isLoading}
          className="md:col-span-2 inline-flex items-center justify-center gap-2 bg-charcoal text-latte px-6 py-3 rounded-2xl font-semibold hover:bg-black transition disabled:opacity-60"
        >
          {mutation.isLoading ? 'Memproses...' : 'Kirim Booking'}
        </button>
        {mutation.error && (
          <p className="md:col-span-2 text-sm text-rose-500">{mutation.error.message}</p>
        )}
      </form>
    </div>
  );
}

export default BookingForm;
