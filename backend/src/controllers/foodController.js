import Joi from 'joi';
import { cafeSpecials } from '../data/services.js';

const orderSchema = Joi.object({
  bookingId: Joi.string().required(),
  items: Joi.array()
    .items(
      Joi.object({
        menuId: Joi.string().required(),
        quantity: Joi.number().integer().min(1).required(),
      })
    )
    .min(1)
    .required(),
});

export function listMenu(_req, res) {
  res.json({ menu: cafeSpecials });
}

export function createOrder(req, res) {
  const { error, value } = orderSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }

  const items = [];
  for (const orderItem of value.items) {
    const menuItem = cafeSpecials.find((item) => item.id === orderItem.menuId);
    if (!menuItem) {
      return res.status(404).json({ message: `Menu dengan ID ${orderItem.menuId} tidak ditemukan` });
    }
    items.push({
      ...menuItem,
      quantity: orderItem.quantity,
      lineTotal: menuItem.price * orderItem.quantity,
    });
  }

  const orderTotal = items.reduce((sum, item) => sum + item.lineTotal, 0);

  res.status(201).json({
    message: 'Order dicatat. Silakan selesaikan pembayaran di kasir.',
    order: {
      bookingId: value.bookingId,
      items,
      orderTotal,
      createdAt: new Date().toISOString(),
      paymentMethod: 'Pay at counter',
    },
  });
}
