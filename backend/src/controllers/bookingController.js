import { v4 as uuid } from 'uuid';
import Joi from 'joi';
import { billiardPackages } from '../data/services.js';

const bookingSchema = Joi.object({
  customerName: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(8).required(),
  packageId: Joi.string().required(),
  bookingDate: Joi.date().iso().required(),
  startHour: Joi.number().integer().min(10).max(24).required(),
  durationHours: Joi.number().integer().min(1).max(6).required(),
  notes: Joi.string().allow('').max(240).optional(),
});

const bookings = new Map();

export function createBooking(req, res) {
  const { error, value } = bookingSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }

  const selectedPackage = billiardPackages.find((item) => item.id === value.packageId);
  if (!selectedPackage) {
    return res.status(404).json({ message: 'Paket tidak ditemukan' });
  }

  const bookingId = `Q${new Date().getFullYear()}-${uuid().split('-')[0]}`.toUpperCase();
  const totalCost = selectedPackage.pricePerHour * value.durationHours;

  const booking = {
    id: bookingId,
    ...value,
    package: selectedPackage,
    totalCost,
    status: 'reserved',
    createdAt: new Date().toISOString(),
  };

  bookings.set(bookingId, booking);

  res.status(201).json({
    message: 'Booking berhasil dibuat',
    booking,
  });
}

export function listBookings(_req, res) {
  res.json({
    bookings: Array.from(bookings.values()),
  });
}
