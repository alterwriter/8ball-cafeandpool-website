import { createBooking, listBookingsByEmail, getServices } from '../utils/dataStore.js';

export function listServices(_req, res) {
  res.json({ services: getServices() });
}

export function create(req, res, next) {
  try {
    const { serviceId, startTime, durationHours, notes } = req.body;
    const service = getServices().find((item) => item.id === serviceId);
    if (!service) {
      return res.status(400).json({ message: 'Layanan tidak ditemukan.' });
    }
    const booking = createBooking({
      userEmail: req.user.email,
      serviceId,
      startTime,
      durationHours,
      notes,
    });
    res.status(201).json({
      booking,
      message: 'Booking berhasil dibuat. Tunjukkan Booking ID saat tiba di kasir untuk konfirmasi pembayaran.',
    });
  } catch (error) {
    next(error);
  }
}

export function list(req, res, next) {
  try {
    const bookings = listBookingsByEmail(req.user.email);
    res.json({ bookings });
  } catch (error) {
    next(error);
  }
}
