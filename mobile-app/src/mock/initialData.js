// LAX360 Demo Initial Seed Data - React Native Mobile App

export const INITIAL_CATEGORIES = [
  {
    id: 'cat-groceries',
    name: 'Fruits & Vegetables',
    slug: 'fruits-vegetables',
    icon: 'apple',
    itemCount: 8,
    badge: 'Farm Fresh',
    isActive: true,
    banner: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=600&auto=format&fit=crop&q=80',
    description: 'Crisp organic veggies and sweet handpicked fruits delivered in 10 minutes.'
  },
  {
    id: 'cat-dairy',
    name: 'Dairy, Bread & Eggs',
    slug: 'dairy-bread-eggs',
    icon: 'coffee',
    itemCount: 8,
    badge: 'Daily Need',
    isActive: true,
    banner: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&auto=format&fit=crop&q=80',
    description: 'Fresh toned milk, artisanal cheeses, farm eggs, and wholesome bakery loafs.'
  },
  {
    id: 'cat-munchies',
    name: 'Snacks & Munchies',
    slug: 'snacks-munchies',
    icon: 'gift',
    itemCount: 8,
    badge: 'Trending',
    isActive: true,
    banner: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=600&auto=format&fit=crop&q=80',
    description: 'Crunchy chips, dry-roasted nuts, dark chocolate cookies, and dips.'
  },
  {
    id: 'cat-drinks',
    name: 'Cold Drinks & Juices',
    slug: 'cold-drinks-juices',
    icon: 'droplet',
    itemCount: 6,
    badge: 'Chilled',
    isActive: true,
    banner: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop&q=80',
    description: '100% cold-pressed juices, sparkling sodas, and cooling hydration.'
  },
  {
    id: 'cat-personal',
    name: 'Personal & Skin Care',
    slug: 'personal-care',
    icon: 'heart',
    itemCount: 6,
    badge: 'Glow Essentials',
    isActive: true,
    banner: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80',
    description: 'Dermatologist-approved cleansers, sunscreens, and personal hygiene essentials.'
  },
  {
    id: 'cat-cleaning',
    name: 'Home & Cleaning',
    slug: 'home-cleaning',
    icon: 'home',
    itemCount: 6,
    badge: 'Sparkle Clean',
    isActive: true,
    banner: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=600&auto=format&fit=crop&q=80',
    description: 'Disinfectant sprays, microfiber cloths, detergents, and trash liners.'
  },
  {
    id: 'cat-electronics',
    name: 'Electronics & Gadgets',
    slug: 'electronics',
    icon: 'headphones',
    itemCount: 6,
    badge: '10-Min Fast',
    isActive: true,
    banner: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
    description: 'High-speed cables, adapters, wireless earbuds, and portable power.'
  }
];

export const INITIAL_PRODUCTS = [
  {
    id: 'prod-001',
    name: 'Fresh Alphonso Mangoes',
    categoryId: 'cat-groceries',
    subcategory: 'Fruits',
    brand: 'Ratnagiri Farms',
    unit: '2 pcs (approx. 500g)',
    price: 249,
    mrp: 320,
    discountPercent: 22,
    stock: 24,
    rating: 4.9,
    ratingCount: 312,
    isVeg: true,
    sku: 'FRU-MNG-001',
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=500&auto=format&fit=crop&q=80',
    description: 'Hand-picked naturally ripened Alphonso mangoes from Devgad orchards. Incomparably sweet and aromatic.',
    storage: 'Store at room temperature until ripe, then refrigerate.'
  },
  {
    id: 'prod-002',
    name: 'Organic Robusta Bananas',
    categoryId: 'cat-groceries',
    subcategory: 'Fruits',
    brand: 'LAX Fresh',
    unit: '1 kg (approx. 6-7 pcs)',
    price: 65,
    mrp: 80,
    discountPercent: 19,
    stock: 45,
    rating: 4.8,
    ratingCount: 520,
    isVeg: true,
    sku: 'FRU-BNN-002',
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500&auto=format&fit=crop&q=80',
    description: 'Sweet, energy-rich golden bananas grown without synthetic pesticides.',
    storage: 'Store in a cool dry place away from direct sunlight.'
  },
  {
    id: 'prod-003',
    name: 'Hydroponic English Cucumbers',
    categoryId: 'cat-groceries',
    subcategory: 'Vegetables',
    brand: 'Urban Greens',
    unit: '500g (2 pcs)',
    price: 49,
    mrp: 70,
    discountPercent: 30,
    stock: 30,
    rating: 4.7,
    ratingCount: 194,
    isVeg: true,
    sku: 'VEG-CUC-003',
    image: 'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=500&auto=format&fit=crop&q=80',
    description: 'Crisp, tender, and virtually seedless hydroponically cultivated cucumbers.',
    storage: 'Keep refrigerated in the crisper drawer.'
  },
  {
    id: 'prod-004',
    name: 'Vine-Ripened Hybrid Tomatoes',
    categoryId: 'cat-groceries',
    subcategory: 'Vegetables',
    brand: 'LAX Farm Direct',
    unit: '1 kg',
    price: 42,
    mrp: 60,
    discountPercent: 30,
    stock: 60,
    rating: 4.6,
    ratingCount: 680,
    isVeg: true,
    sku: 'VEG-TOM-004',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&fit=crop&q=80',
    description: 'Plump, juicy red tomatoes packed with rich lycopene.',
    storage: 'Store at room temperature for maximum sweetness.'
  },
  {
    id: 'prod-005',
    name: 'Homogenised Toned Fresh Milk',
    categoryId: 'cat-dairy',
    subcategory: 'Milk',
    brand: 'Pride Dairy',
    unit: '1 Litre',
    price: 68,
    mrp: 72,
    discountPercent: 5,
    stock: 80,
    rating: 4.9,
    ratingCount: 1420,
    isVeg: true,
    sku: 'DRY-MLK-005',
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500&auto=format&fit=crop&q=80',
    description: 'Pasteurized, vitamin A & D fortified fresh toned milk with 3.0% fat.',
    storage: 'Refrigerate below 4°C.'
  },
  {
    id: 'prod-006',
    name: 'Farm Fresh Brown Free-Range Eggs',
    categoryId: 'cat-dairy',
    subcategory: 'Eggs',
    brand: 'Valley Farms',
    unit: 'Pack of 6',
    price: 85,
    mrp: 105,
    discountPercent: 19,
    stock: 50,
    rating: 4.8,
    ratingCount: 890,
    isVeg: false,
    sku: 'DRY-EGG-006',
    image: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=500&auto=format&fit=crop&q=80',
    description: 'Cruelty-free, grain-fed hen eggs with deep golden yolks.',
    storage: 'Keep refrigerated.'
  },
  {
    id: 'prod-007',
    name: 'Artisanal Sourdough Country Loaf',
    categoryId: 'cat-dairy',
    subcategory: 'Bread',
    brand: 'Bakers Craft',
    unit: '400g',
    price: 135,
    mrp: 160,
    discountPercent: 15,
    stock: 18,
    rating: 4.9,
    ratingCount: 245,
    isVeg: true,
    sku: 'DRY-BRD-007',
    image: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?w=500&auto=format&fit=crop&q=80',
    description: 'Slow-fermented for 36 hours using organic wild yeast.',
    storage: 'Keep in an airtight bag at room temperature.'
  },
  {
    id: 'prod-009',
    name: 'Himalayan Pink Salt Kettle Chips',
    categoryId: 'cat-munchies',
    subcategory: 'Chips',
    brand: 'Crispology',
    unit: '130g',
    price: 85,
    mrp: 99,
    discountPercent: 14,
    stock: 42,
    rating: 4.8,
    ratingCount: 780,
    isVeg: true,
    sku: 'SNK-CHP-009',
    image: 'https://images.unsplash.com/photo-1527842891421-42eec6e703ea?w=500&auto=format&fit=crop&q=80',
    description: 'Batch-cooked thick cut potato chips seasoned with Himalayan salt.',
    storage: 'Store in an airtight container.'
  },
  {
    id: 'prod-012',
    name: 'Cold Pressed Valencia Orange Juice',
    categoryId: 'cat-drinks',
    subcategory: 'Juices',
    brand: 'Raw Oasis',
    unit: '250ml',
    price: 110,
    mrp: 130,
    discountPercent: 15,
    stock: 30,
    rating: 4.8,
    ratingCount: 470,
    isVeg: true,
    sku: 'DRK-ORG-012',
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=500&auto=format&fit=crop&q=80',
    description: 'Pure 100% juice extracted using cold hydraulic pressure.',
    storage: 'Keep refrigerated.'
  },
  {
    id: 'prod-017',
    name: 'Braided 65W Fast Charging Type-C Cable',
    categoryId: 'cat-electronics',
    subcategory: 'Cables',
    brand: 'VoltSync',
    unit: '1.8m (6 Feet)',
    price: 349,
    mrp: 699,
    discountPercent: 50,
    stock: 14,
    rating: 4.7,
    ratingCount: 380,
    isVeg: true,
    sku: 'ELC-CBL-017',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=80',
    description: 'Tough Kevlar-reinforced braided nylon outer jacket with 65W PD fast charging.',
    storage: 'Coil neatly after use.'
  }
];

export const INITIAL_DELIVERY_PARTNERS = [
  {
    id: 'partner-001',
    name: 'Vikram Sharma',
    phone: '+91 98201 54321',
    vehicle: 'Honda Activa 6G (MH 02 CD 4192)',
    rating: 4.9,
    totalDeliveries: 1240,
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    status: 'On Delivery',
    activeOrderId: 'LX-83910'
  },
  {
    id: 'partner-002',
    name: 'Amit Patel',
    phone: '+91 98199 87654',
    vehicle: 'TVS Jupiter (MH 02 EF 1029)',
    rating: 4.8,
    totalDeliveries: 890,
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    status: 'Available',
    activeOrderId: null
  }
];

export const INITIAL_COUPONS = [
  {
    code: 'LAXFIRST',
    discountType: 'flat',
    discountValue: 100,
    minOrderValue: 299,
    description: 'Get Flat ₹100 OFF on your first grocery haul above ₹299.',
    isActive: true
  },
  {
    code: 'FREEDEL',
    discountType: 'flat',
    discountValue: 25,
    minOrderValue: 199,
    description: 'Free instant 10-minute delivery on any order above ₹199.',
    isActive: true
  }
];

export const INITIAL_CUSTOMER = {
  id: 'cust-001',
  name: 'Rahul Verma',
  email: 'rahul.verma@lax360demo.com',
  phone: '+91 98765 43210',
  addresses: [
    {
      id: 'addr-001',
      tag: 'Home',
      isDefault: true,
      flat: 'Flat 402, Sea Green Heights',
      street: '14th Road, Off Linking Road',
      area: 'Bandra West',
      city: 'Mumbai',
      pincode: '400050'
    },
    {
      id: 'addr-002',
      tag: 'Office',
      isDefault: false,
      flat: 'LAX Tech Hub, Suite 701, Tower B',
      street: 'BKC, Bandra East',
      area: 'BKC',
      city: 'Mumbai',
      pincode: '400051'
    }
  ]
};

export const INITIAL_ORDERS = [
  {
    id: 'LX-83910',
    createdAt: new Date(Date.now() - 1000 * 60 * 8).toISOString(),
    customer: {
      name: 'Rahul Verma',
      phone: '+91 98765 43210'
    },
    items: [
      {
        id: 'prod-001',
        name: 'Fresh Alphonso Mangoes',
        unit: '2 pcs (approx. 500g)',
        price: 249,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=500&auto=format&fit=crop&q=80'
      },
      {
        id: 'prod-009',
        name: 'Himalayan Pink Salt Kettle Chips',
        unit: '130g',
        price: 85,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1527842891421-42eec6e703ea?w=500&auto=format&fit=crop&q=80'
      }
    ],
    deliveryAddress: {
      tag: 'Home',
      flat: 'Flat 402, Sea Green Heights',
      street: '14th Road, Off Linking Road',
      area: 'Bandra West, Mumbai 400050'
    },
    deliveryPartner: {
      id: 'partner-001',
      name: 'Vikram Sharma',
      phone: '+91 98201 54321',
      vehicle: 'Honda Activa 6G (MH 02 CD 4192)',
      rating: 4.9,
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'
    },
    status: 'Out for Delivery',
    paymentMethod: 'UPI (GPay)',
    paymentStatus: 'Paid',
    billSummary: {
      itemsTotal: 419,
      deliveryFee: 0,
      handlingFee: 5,
      tip: 20,
      discount: 25,
      couponCode: 'FREEDEL',
      grandTotal: 419
    },
    estimatedDeliveryTime: 'Arriving in 4 mins',
    trackingSimulation: {
      progress: 68,
      etaMinutes: 4,
      currentStreet: 'Passing Khar Telephone Exchange, 14th Rd',
      isPlaying: true
    },
    timeline: [
      { status: 'Placed', timestamp: '11:22 AM', done: true },
      { status: 'Confirmed', timestamp: '11:23 AM', done: true },
      { status: 'Preparing', timestamp: '11:24 AM', done: true },
      { status: 'Packed', timestamp: '11:26 AM', done: true },
      { status: 'Ready for Pickup', timestamp: '11:27 AM', done: true },
      { status: 'Partner Assigned', timestamp: '11:27 AM', done: true },
      { status: 'Picked Up', timestamp: '11:28 AM', done: true },
      { status: 'Out for Delivery', timestamp: '11:29 AM', done: true },
      { status: 'Delivered', timestamp: 'Pending', done: false }
    ]
  }
];

export const ORDER_STAGES = [
  'Placed',
  'Confirmed',
  'Preparing',
  'Packed',
  'Ready for Pickup',
  'Partner Assigned',
  'Picked Up',
  'Out for Delivery',
  'Delivered'
];
