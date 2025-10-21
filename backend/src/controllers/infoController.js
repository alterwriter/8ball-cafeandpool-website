import { content } from '../utils/dataStore.js';

export function getHomeContent(_req, res) {
  res.json({ content });
}

export function getOperatingHours(_req, res) {
  res.json({
    hours: [
      { day: 'Senin - Kamis', open: '10:00', close: '23:00' },
      { day: 'Jumat', open: '10:00', close: '24:00' },
      { day: 'Sabtu', open: '09:00', close: '24:00' },
      { day: 'Minggu', open: '09:00', close: '22:00' },
    ],
  });
}

export function getContactDetails(_req, res) {
  res.json({
    phone: '+62 812-8000-888',
    whatsapp: 'https://wa.me/628128000888',
    instagram: 'https://instagram.com/8ballcafe.id',
    address: 'Jl. Antasari Raya No. 88, Cipete, Jakarta Selatan',
    mapEmbedUrl: 'https://maps.google.com/?q=8Ball+Cafe+Pool+Jakarta',
  });
}
