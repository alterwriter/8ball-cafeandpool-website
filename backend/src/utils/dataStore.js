import { v4 as uuid } from 'uuid';
import bcrypt from 'bcryptjs';

const users = new Map();
const bookings = new Map();
const orders = new Map();

const staffHighlights = [
  {
    id: 'coach-ari',
    name: 'Ari Saputra',
    title: 'Head Coach & Trickshot Artist',
    bio: 'Mantan juara nasional dengan pengalaman 12 tahun yang siap membantu kamu naik level.',
    photo: '/images/staff/ari-saputra.jpg',
  },
  {
    id: 'mixologist-lia',
    name: 'Lia Pramesti',
    title: 'Lead Mixologist',
    bio: 'Menghadirkan signature mocktail dan kopi dengan sentuhan craft yang modern.',
    photo: '/images/staff/lia-pramesti.jpg',
  },
  {
    id: 'concierge-raka',
    name: 'Raka Hartono',
    title: 'Guest Experience Concierge',
    bio: 'Menjaga suasana nyaman dari pintu masuk hingga meja billiard favoritmu.',
    photo: '/images/staff/raka-hartono.jpg',
  },
];

const services = [
  {
    id: 'classic-table',
    name: 'Classic Pool Table',
    description: 'Meja premium 9 kaki dengan cloth Simonis, cocok untuk casual match atau practice.',
    ratePerHour: 85000,
    perks: ['Cue premium', 'Chalk master', 'Pendingin udara'],
  },
  {
    id: 'vip-lounge',
    name: 'VIP Lounge Table',
    description: 'Area semi-private dengan sofa lounge dan speaker personal.',
    ratePerHour: 135000,
    perks: ['Asisten pribadi', 'Handuk microfiber', 'Minuman selamat datang'],
  },
  {
    id: 'pro-arena',
    name: 'Pro Arena Suite',
    description: 'Set standar turnamen lengkap dengan streaming camera untuk live replay.',
    ratePerHour: 185000,
    perks: ['Pencahayaan pro', 'Perekaman sesi', 'Pelatih pendamping 15 menit'],
  },
];

const menuSections = [
  {
    id: 'signature-coffee',
    name: 'Signature Coffee',
    items: [
      { id: 'cold-brew-tonic', name: 'Cold Brew Citrus Tonic', price: 45000, description: 'Cold brew single origin dengan tonic, jeruk sunkist, dan rosemary.' },
      { id: 'creme-brulee-latte', name: 'Crème Brûlée Latte', price: 42000, description: 'Espresso blend dengan foam vanilla bean dan caramelized sugar crust.' },
    ],
  },
  {
    id: 'comfort-bites',
    name: 'Comfort Bites',
    items: [
      { id: 'truffle-fries', name: 'Black Truffle Fries', price: 49000, description: 'Kentang goreng rustic dengan parmesan dan aioli truffle.' },
      { id: 'wagyu-sliders', name: 'Mini Wagyu Sliders', price: 69000, description: 'Slider wagyu dengan brioche toasted, cheddar tua, dan onion jam.' },
    ],
  },
  {
    id: 'mocktail-bar',
    name: 'Craft Mocktails',
    items: [
      { id: 'smoked-berry', name: 'Smoked Berry Spark', price: 55000, description: 'Mix berries, lapsang infused syrup, dan ginger ale.' },
      { id: 'mango-basil', name: 'Mango Basil Cooler', price: 52000, description: 'Puree mangga harum manis, basil segar, dan sparkling water.' },
    ],
  },
];

export const content = {
  hero: {
    headline: 'Cafe modern dengan atmosfer billiard yang stylish',
    subheadline: 'Nikmati racikan kopi artisan, craft mocktail, dan meja billiard pro-grade di satu destinasi lifestyle Jakarta.',
    ctaPrimary: 'Booking Meja',
    ctaSecondary: 'Lihat Menu',
  },
  story: {
    title: 'Cerita 8Ball Cafe & Pool',
    description:
      'Berawal dari komunitas pecinta billiard yang menginginkan tempat berkualitas dengan ambience hangout yang hangat. Kami meramu pengalaman cafe modern dengan pelayanan hospitality hotel untuk menciptakan momen terbaikmu.',
  },
  values: [
    { id: 'craft', title: 'Crafted Hospitality', body: 'Tim kami terlatih memberikan pengalaman personal dari reservasi hingga akhir sesi.' },
    { id: 'quality', title: 'Quality Tables', body: 'Seluruh meja menggunakan cloth standar turnamen dengan perawatan rutin mingguan.' },
    { id: 'culinary', title: 'Elevated Culinary', body: 'Menu dirancang chef patisserie hotel bintang lima dengan bahan premium lokal.' },
  ],
  staffHighlights,
  services,
  menuSections,
};

export async function createUser({ email, password, fullName, phone }) {
  if (users.has(email)) {
    throw new Error('Email sudah terdaftar.');
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const memberId = `MBR-${uuid().split('-')[0].toUpperCase()}`;
  const profile = {
    email,
    fullName,
    phone,
    passwordHash,
    memberId,
    tier: 'Emerald',
    joinedAt: new Date().toISOString(),
  };
  users.set(email, profile);
  return profile;
}

export function getUser(email) {
  return users.get(email);
}

export function createBooking({ userEmail, serviceId, startTime, durationHours, notes }) {
  const id = `BKG-${uuid().split('-')[0].toUpperCase()}`;
  const booking = {
    id,
    userEmail,
    serviceId,
    startTime,
    durationHours,
    notes: notes || '',
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  };
  bookings.set(id, booking);
  return booking;
}

export function listBookingsByEmail(email) {
  return Array.from(bookings.values()).filter((booking) => booking.userEmail === email);
}

export function createOrder({ userEmail, items, notes, bookingId }) {
  const id = `ORD-${uuid().split('-')[0].toUpperCase()}`;
  const order = {
    id,
    userEmail,
    items,
    notes: notes || '',
    bookingId,
    status: 'pending-payment',
    createdAt: new Date().toISOString(),
  };
  orders.set(id, order);
  return order;
}

export function listOrdersByEmail(email) {
  return Array.from(orders.values()).filter((order) => order.userEmail === email);
}

export function getBookingById(id) {
  return bookings.get(id);
}

export function getServices() {
  return services;
}

export function getMenuSections() {
  return menuSections;
}
