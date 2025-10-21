import { billiardPackages, cafeSpecials, membershipTiers } from '../data/services.js';

const galleryImages = [
  'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=80',
];

export function overview(_req, res) {
  res.json({
    hero: {
      headline: '8Ball Café & Pool House',
      subheading: 'Premium billiard club dan artisan café di pusat Jakarta Selatan.',
      highlights: [
        '12 meja turnamen berstandar internasional',
        'Signature mocktail dan dessert pairing',
        'Live DJ every Friday',
      ],
    },
    sections: {
      packages: billiardPackages,
      specials: cafeSpecials.slice(0, 3),
      memberships: membershipTiers,
      gallery: galleryImages,
    },
    contact: {
      whatsapp: '+62 812-8888-0828',
      instagram: '@8ballcafe.id',
      address: 'Jl. Dharmawangsa VIII No. 18, Jakarta Selatan',
      openHours: 'Setiap hari 10.00 - 01.00 WIB',
    },
  });
}
