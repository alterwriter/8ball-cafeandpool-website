import bcrypt from 'bcryptjs';
import { createUser, getUser } from '../utils/dataStore.js';
import { createToken } from '../middleware/auth.js';

export async function register(req, res, next) {
  try {
    const { email, password, fullName, phone } = req.body;
    const user = await createUser({ email, password, fullName, phone });
    const token = createToken({ email: user.email });
    res.status(201).json({
      token,
      profile: {
        email: user.email,
        fullName: user.fullName,
        phone: user.phone,
        memberId: user.memberId,
        tier: user.tier,
        joinedAt: user.joinedAt,
      },
    });
  } catch (error) {
    if (error.message.includes('sudah terdaftar')) {
      error.status = 409;
    }
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = getUser(email);
    if (!user) {
      return res.status(401).json({ message: 'Email atau password salah.' });
    }
    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Email atau password salah.' });
    }
    const token = createToken({ email: user.email });
    res.json({
      token,
      profile: {
        email: user.email,
        fullName: user.fullName,
        phone: user.phone,
        memberId: user.memberId,
        tier: user.tier,
        joinedAt: user.joinedAt,
      },
    });
  } catch (error) {
    next(error);
  }
}

export function me(req, res) {
  res.json({ profile: req.user });
}
