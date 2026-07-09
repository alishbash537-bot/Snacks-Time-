import { MenuItem } from './types';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'pepperoni-pizza',
    name: 'Pepperoni Pizza',
    category: 'pizza',
    description: 'Fresh hot pizza crust loaded with double pepperoni layers, real shredded mozzarella cheese, and our signature tangy tomato sauce baked to a perfect golden brown.',
    price: 450,
    prices: {
      Small: 250,
      Medium: 450,
      Large: 800
    },
    addons: [
      { name: 'Extra Cheese', price: 100 },
      { name: 'Dip Sauce', price: 40 }
    ],
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&q=80&w=800',
    tags: ['Pizza', 'Pepperoni', 'Cheesy'],
    highlights: [
      'DOUBLE PEPPERONI LAYERS',
      '100% SHREDDED MOZZARELLA',
      'GOLDEN BAKED CRUST'
    ]
  },
  {
    id: 'malai-boti-pizza',
    name: 'Malai Boti Pizza',
    category: 'pizza',
    description: 'Tender chicken malai boti chunks, creamy sauce, sliced onions, and green bell peppers on a thick baked crust, smothered with premium mozzarella cheese.',
    price: 450,
    prices: {
      Small: 250,
      Medium: 450,
      Large: 800
    },
    addons: [
      { name: 'Extra Cheese', price: 100 },
      { name: 'Dip Sauce', price: 40 }
    ],
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800',
    tags: ['Pizza', 'Malai Boti', 'Creamy'],
    highlights: [
      'JUICY CHICKEN MALAI BOTI CHUNKS',
      'SWEET SLICED ONIONS',
      'CREAMY WHITE SAUCE BASE'
    ]
  },
  {
    id: 'afghani-pizza',
    name: 'Afghani Pizza',
    category: 'pizza',
    description: 'Smoked chicken tikka chunks with a rich Afghani seasoning, jalapenos, onions, drizzled with our signature white garlic sauce and loaded with melty cheese.',
    price: 450,
    prices: {
      Small: 250,
      Medium: 450,
      Large: 800
    },
    addons: [
      { name: 'Extra Cheese', price: 100 },
      { name: 'Dip Sauce', price: 40 }
    ],
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&q=80&w=800',
    tags: ['Pizza', 'Afghani', 'Spicy'],
    highlights: [
      'AFGHANI CHICKEN TIKKA',
      'SPICY JALAPENO SLICES',
      'SIGNATURE GARLIC SAUCE'
    ]
  },
  {
    id: 'supreme-pizza',
    name: 'Supreme Pizza',
    category: 'pizza',
    description: 'The ultimate combo pizza loaded with pepperoni, smoked sausage chunks, fresh green bell peppers, mushrooms, black olives, onions, and lots of mozzarella.',
    price: 450,
    prices: {
      Small: 250,
      Medium: 450,
      Large: 800
    },
    addons: [
      { name: 'Extra Cheese', price: 100 },
      { name: 'Dip Sauce', price: 40 }
    ],
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=800',
    tags: ['Pizza', 'Supreme', 'Loaded'],
    highlights: [
      'PEPPERONI & SMOKED SAUSAGE',
      'FRESH VEGGIE MEDLEY',
      'EXTRA MOZZARELLA CHEESE'
    ]
  },
  {
    id: 'classic-cheese-pizza',
    name: 'Classic Cheese Pizza',
    category: 'pizza',
    description: 'Our standard fast-food favorite! Perfectly melted, golden-brown mozzarella cheese layered over our rich herb tomato pizza sauce.',
    price: 450,
    prices: {
      Small: 250,
      Medium: 450,
      Large: 800
    },
    addons: [
      { name: 'Extra Cheese', price: 100 },
      { name: 'Dip Sauce', price: 40 }
    ],
    image: 'https://images.unsplash.com/photo-1571066811602-71683a3f680d?auto=format&fit=crop&q=80&w=800',
    tags: ['Pizza', 'Cheese', 'Classic'],
    highlights: [
      'MELTED MOZZARELLA FEAST',
      'HERB-INFUSED PIZZA SAUCE',
      'FRESH HOT BAKED CRUST'
    ]
  },
  {
    id: 'zinger-burger',
    name: 'Zinger Burger',
    category: 'burgers',
    description: 'Super crispy, golden fried chicken breast fillet with a spicy coating, layered with fresh lettuce and dynamic creamy mayo in a toasted bun.',
    price: 370,
    addons: [
      { name: 'Extra Cheese Slice', price: 50 },
      { name: 'Add Egg', price: 30 }
    ],
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&q=80&w=800',
    tags: ['Burger', 'Zinger', 'Crispy', 'Spicy'],
    highlights: [
      'EXTRA CRISPY SPICY FILLET',
      'FRESH ICEBERG LETTUCE',
      'CLASSIC ZINGER SAUCE'
    ]
  },
  {
    id: 'chicken-burger',
    name: 'Chicken Burger',
    category: 'burgers',
    description: 'Our classic grilled chicken patty seasoned to perfection, served with crisp lettuce, onion rings, and a dollop of creamy dressing.',
    price: 300,
    addons: [
      { name: 'Extra Cheese Slice', price: 50 },
      { name: 'Add Egg', price: 30 }
    ],
    image: 'https://images.unsplash.com/photo-1513185158878-8d8c2a2a3d3e?auto=format&fit=crop&q=80&w=800',
    tags: ['Burger', 'Chicken', 'Classic'],
    highlights: [
      'FLAVORFUL CHICKEN PATTY',
      'CRISP FRESH LETTUCE',
      'SOFT TOASTED BUN'
    ]
  },
  {
    id: 'beef-burger',
    name: 'Beef Burger',
    category: 'burgers',
    description: 'Juicy, flame-grilled beef patty topped with melted cheddar cheese, sliced pickles, onions, and our special burger house sauce.',
    price: 350,
    addons: [
      { name: 'Extra Cheese Slice', price: 50 },
      { name: 'Add Egg', price: 30 }
    ],
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800',
    tags: ['Burger', 'Beef', 'Cheese'],
    highlights: [
      'FLAME-GRILLED BEEF PATTY',
      'MELTED CHEDDAR CHEESE',
      'SIGNATURE HOUSE SAUCE'
    ]
  },
  {
    id: 'chicken-chapli-burger',
    name: 'Chicken Chapli Burger',
    category: 'burgers',
    description: 'Traditional spiced chicken chapli kebab patty with coriander, pomegranate seeds, and green chilies, served with a mint chutney spread in a toasted bun.',
    price: 300,
    addons: [
      { name: 'Extra Cheese Slice', price: 50 },
      { name: 'Add Egg', price: 30 }
    ],
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&q=80&w=800',
    tags: ['Burger', 'Chapli', 'Spicy', 'Desi'],
    highlights: [
      'SPICED CHAPLI KEBAB PATTY',
      'MINT CHUTNEY SPREAD',
      'GREEN CHILI AND CORIANDER KICK'
    ]
  },
  {
    id: 'shami-kebab-burger',
    name: 'Shami Kebab Burger',
    category: 'burgers',
    description: 'A street-food legend! Classic pan-fried beef lentils shami kebab patty topped with fresh cabbage slaw, onion rings, and spicy green chutney.',
    price: 200,
    addons: [
      { name: 'Extra Cheese Slice', price: 50 },
      { name: 'Add Egg', price: 30 }
    ],
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=800',
    tags: ['Burger', 'Shami', 'Desi', 'Legend'],
    highlights: [
      'TRADITIONAL SHAMI KEBAB',
      'CRISP CABBAGE SLAW',
      'Mouthwatering Mint & Coriander Chutney'
    ]
  }
];
