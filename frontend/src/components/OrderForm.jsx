import { useMemo, useState } from 'react';

function OrderForm({ menu, mutation }) {
  const [bookingId, setBookingId] = useState('');
  const [selectedItems, setSelectedItems] = useState({});
  const [receipt, setReceipt] = useState();

  const menuLookup = useMemo(() => Object.fromEntries(menu.map((item) => [item.id, item])), [menu]);

  const total = useMemo(() => {
    return Object.entries(selectedItems).reduce((sum, [menuId, quantity]) => {
      const item = menuLookup[menuId];
      if (!item) return sum;
      return sum + item.price * quantity;
    }, 0);
  }, [menuLookup, selectedItems]);

  const handleQuantityChange = (menuId, value) => {
    const qty = Number(value);
    setSelectedItems((prev) => {
      const next = { ...prev };
      if (!qty) {
        delete next[menuId];
      } else {
        next[menuId] = qty;
      }
      return next;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setReceipt(undefined);
    try {
      const payload = {
        bookingId,
        items: Object.entries(selectedItems).map(([menuId, quantity]) => ({ menuId, quantity })),
      };
      const result = await mutation.mutateAsync(payload);
      setReceipt(result.order);
      setSelectedItems({});
      setBookingId('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mt-16 bg-white/80 border border-white/60 rounded-3xl shadow-soft p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h3 className="font-heading text-2xl text-charcoal">Order makanan &amp; minuman</h3>
          <p className="text-slate-600">Input booking ID dan pilih menu favoritmu. Pembayaran dilakukan di kasir.</p>
        </div>
        {receipt && (
          <div className="rounded-2xl border border-teal/40 bg-teal/10 px-5 py-3 text-sm">
            Order tercatat • Total Rp {receipt.orderTotal.toLocaleString('id-ID')}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="text-sm font-medium text-slate-700">Booking ID</label>
            <input
              required
              value={bookingId}
              onChange={(event) => setBookingId(event.target.value.toUpperCase())}
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 bg-white focus:border-teal focus:outline-none"
              placeholder="Contoh: Q2024-1A2B"
            />
          </div>
          <div className="flex-1">
            <label className="text-sm font-medium text-slate-700">Total Estimasi</label>
            <div className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 bg-slate-50 text-teal font-semibold">
              Rp {total.toLocaleString('id-ID')}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {menu.map((item) => (
            <div key={item.id} className="rounded-2xl border border-slate-200 bg-white/80 p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-heading text-lg text-charcoal">{item.name}</p>
                  <p className="text-sm text-slate-600 mt-1">{item.description}</p>
                </div>
                <span className="text-sm text-teal font-semibold">Rp {item.price.toLocaleString('id-ID')}</span>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <label className="text-xs uppercase tracking-[0.3em] text-slate-400">Qty</label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  value={selectedItems[item.id] ?? ''}
                  onChange={(event) => handleQuantityChange(item.id, event.target.value)}
                  className="w-24 rounded-2xl border border-slate-200 px-3 py-2 focus:border-teal focus:outline-none"
                />
              </div>
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={mutation.isLoading}
          className="inline-flex items-center gap-2 bg-teal text-white px-6 py-3 rounded-2xl font-semibold hover:bg-teal/80 transition disabled:opacity-60"
        >
          {mutation.isLoading ? 'Mencatat order...' : 'Submit Order'}
        </button>
        {mutation.error && <p className="text-sm text-rose-500">{mutation.error.message}</p>}
      </form>
    </div>
  );
}

export default OrderForm;
