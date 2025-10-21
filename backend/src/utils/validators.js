import { celebrate, Joi, Segments } from 'celebrate';

export const registerValidator = celebrate({
  [Segments.BODY]: Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().min(8).max(64).pattern(/[A-Z]/).pattern(/[a-z]/).pattern(/[0-9]/).required()
      .messages({ 'string.pattern.base': 'Password harus mengandung huruf besar, huruf kecil, dan angka.' }),
    fullName: Joi.string().min(3).max(60).required(),
    phone: Joi.string().pattern(/^[0-9+\-\s]{8,18}$/).required(),
  }),
});

export const loginValidator = celebrate({
  [Segments.BODY]: Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().min(8).max(64).required(),
  }),
});

export const bookingValidator = celebrate({
  [Segments.BODY]: Joi.object({
    serviceId: Joi.string().required(),
    startTime: Joi.date().iso().greater('now').required(),
    durationHours: Joi.number().integer().min(1).max(6).required(),
    notes: Joi.string().allow('').max(240).optional(),
  }),
});

export const orderValidator = celebrate({
  [Segments.BODY]: Joi.object({
    bookingId: Joi.string().required(),
    items: Joi.array()
      .items(
        Joi.object({
          menuItemId: Joi.string().required(),
          quantity: Joi.number().integer().min(1).max(10).required(),
        })
      )
      .min(1)
      .required(),
    notes: Joi.string().allow('').max(240).optional(),
  }),
});
