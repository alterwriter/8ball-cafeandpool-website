import bcrypt from 'bcryptjs';

const password = bcrypt.hashSync('playhard123', 10);

export const users = [
  {
    id: 'member-01',
    email: 'delia@8ballclub.id',
    fullName: 'Delia Maheswari',
    membershipTier: 'gold',
    password,
  },
  {
    id: 'member-02',
    email: 'raka@8ballclub.id',
    fullName: 'Raka Wiradipa',
    membershipTier: 'silver',
    password,
  },
];
