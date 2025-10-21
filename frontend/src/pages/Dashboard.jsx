import { useEffect, useState } from 'react';
import { listBookings, listOrders } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';

function Dashboard() {
  const { profile } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([listBookings(), listOrders()])
      .then(([bookingData, orderData]) => {
        setBookings(bookingData);
        setOrders(orderData);
      })
      .catch(() => {
        setBookings([]);
        setOrders([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="container page">
      <header>
        <h1>Hi, {profile?.fullName}</h1>
        <p className="muted">Member ID: {profile?.memberId} • Tier: {profile?.tier}</p>
      </header>
      {loading ? (
        <p className="muted">Memuat aktivitas membership...</p>
      ) : (
        <div className="grid two-col">
          <div className="card">
            <h2>Booking Aktif</h2>
            {bookings.length === 0 ? (
              <p className="muted">Belum ada booking. Mulai reservasi untuk mengamankan meja favoritmu.</p>
            ) : (
              <ul className="timeline">
                {bookings.map((booking) => (
                  <li key={booking.id}>
                    <h4>{booking.serviceId}</h4>
                    <p>{new Date(booking.startTime).toLocaleString('id-ID')} • {booking.durationHours} jam</p>
                    <span className="chip subtle">Status: {booking.status}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="card">
            <h2>Order F&amp;B</h2>
            {orders.length === 0 ? (
              <p className="muted">Belum ada order. Pre-order menu agar siap saat kamu datang.</p>
            ) : (
              <ul className="timeline">
                {orders.map((order) => (
                  <li key={order.id}>
                    <h4>{order.id}</h4>
                    <p>Booking {order.bookingId} • {order.items.reduce((total, item) => total + item.quantity, 0)} item</p>
                    <span className="chip subtle">{order.status}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default Dashboard;
