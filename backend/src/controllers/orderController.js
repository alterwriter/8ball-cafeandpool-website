import { createOrder, listOrdersByEmail, getMenuSections, getBookingById } from '../utils/dataStore.js';

export function listMenu(_req, res) {
  res.json({ sections: getMenuSections() });
}

export function create(req, res, next) {
  try {
    const { items, notes, bookingId } = req.body;
    const booking = getBookingById(bookingId);
    if (!booking || booking.userEmail !== req.user.email) {
      return res.status(400).json({ message: 'Booking ID tidak ditemukan untuk akun ini.' });
    }
    const order = createOrder({
      userEmail: req.user.email,
      items,
      notes,
      bookingId,
    });
    res.status(201).json({
      order,
      message: 'Order tercatat. Silakan lakukan pembayaran di kasir dengan membawa Booking ID dan Order ID.',
    });
  } catch (error) {
    next(error);
  }
}

export function list(req, res, next) {
  try {
    const orders = listOrdersByEmail(req.user.email);
    res.json({ orders });
  } catch (error) {
    next(error);
  }
}
