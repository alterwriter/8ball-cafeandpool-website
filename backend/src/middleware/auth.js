import jwt from 'jsonwebtoken';
import { getUser } from '../utils/dataStore.js';

const JWT_SECRET = process.env.JWT_SECRET || 'local-dev-secret-change-me';

export function createToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '4h' });
}

export function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization header tidak valid.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = getUser(decoded.email);
    if (!user) {
      return res.status(401).json({ message: 'Membership tidak ditemukan.' });
    }
    req.user = { email: user.email, memberId: user.memberId, fullName: user.fullName, tier: user.tier };
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Token kadaluarsa atau tidak valid.' });
  }
}
