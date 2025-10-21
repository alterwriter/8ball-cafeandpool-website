import { membershipTiers } from '../data/services.js';
import { users } from '../data/users.js';

export function getTiers(_req, res) {
  res.json({ tiers: membershipTiers });
}

export function profile(req, res) {
  const user = users.find((item) => item.id === req.user.id);
  if (!user) {
    return res.status(404).json({ message: 'Member tidak ditemukan' });
  }

  res.json({
    member: {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      membershipTier: user.membershipTier,
    },
  });
}
