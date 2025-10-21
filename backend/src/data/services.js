export const billiardPackages = [
  {
    id: 'classic-hour',
    name: 'Classic Hour',
    description: 'Standard 9-foot table with professional cues and fresh chalk.',
    pricePerHour: 85000,
    perks: ['Standard table', '2 complimentary mineral waters'],
  },
  {
    id: 'signature-lounge',
    name: 'Signature Lounge',
    description: 'Private lounge with Italian felt table and curated playlist.',
    pricePerHour: 125000,
    perks: ['Dedicated host', 'Welcome mocktails', 'Priority queue'],
  },
  {
    id: 'tournament-suite',
    name: 'Tournament Suite',
    description: 'Tournament-ready double table suite with spectator seating.',
    pricePerHour: 185000,
    perks: ['Referee on request', 'Digital scoreboard', 'Chef tasting bites'],
  },
];

export const cafeSpecials = [
  {
    id: 'crema-latte',
    name: 'Crema Brûlée Latte',
    category: 'Coffee & Espresso',
    description: 'Rich espresso layered with house-made brûlée cream and torched sugar top.',
    price: 42000,
    dietary: ['Contains dairy'],
  },
  {
    id: 'matcha-fizz',
    name: 'Yuzu Matcha Fizz',
    category: 'Signature Drinks',
    description: 'Ceremonial matcha shaken with yuzu cordial and tonic for an uplifting sparkle.',
    price: 39000,
    dietary: ['Vegan'],
  },
  {
    id: 'cue-burger',
    name: 'Smoked Gouda Cue Burger',
    category: 'Mains',
    description: 'Charcoal brioche bun, dry-aged beef, smoked gouda, truffle aioli, caramelized onions.',
    price: 78000,
    dietary: ['Contains gluten'],
  },
  {
    id: 'midnight-nachos',
    name: 'Midnight Brisket Nachos',
    category: 'Shared Plates',
    description: 'Slow-smoked brisket, aged cheddar, pico de gallo, jalapeño crema.',
    price: 69000,
    dietary: ['Gluten-free'],
  },
  {
    id: 'velvet-tiramisu',
    name: 'Velvet Espresso Tiramisu',
    category: 'Desserts',
    description: 'Mascarpone mousse, espresso-soaked ladyfingers, cocoa dust, cacao nib crunch.',
    price: 52000,
    dietary: ['Contains dairy'],
  },
];

export const membershipTiers = [
  {
    id: 'silver',
    name: 'Silver Breaker',
    pricePerYear: 350000,
    benefits: ['5% table discount', 'Priority booking window', 'Birthday dessert'],
  },
  {
    id: 'gold',
    name: 'Golden Rack',
    pricePerYear: 550000,
    benefits: ['10% cafe discount', 'Complimentary upgrade once a month', 'Exclusive tasting events'],
  },
  {
    id: 'platinum',
    name: 'Platinum Cue Master',
    pricePerYear: 850000,
    benefits: ['Private locker rental', 'Curated concierge booking', 'Monthly masterclass invite'],
  },
];
