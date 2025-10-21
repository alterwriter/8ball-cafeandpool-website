import bcrypt from 'bcryptjs';
import Joi from 'joi';
import { users } from '../data/users.js';
import { generateToken } from '../utils/tokens.js';

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

export function login(req, res) {
  const { error, value } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }

  const { email, password } = value;
  const user = users.find((item) => item.email === email);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Email atau password salah' });
  }

  const token = generateToken({
    id: user.id,
    email: user.email,
    membershipTier: user.membershipTier,
  });

  res.json({
    token,
    member: {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      membershipTier: user.membershipTier,
    },
  });
}
