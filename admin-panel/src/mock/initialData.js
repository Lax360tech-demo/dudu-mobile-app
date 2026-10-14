// LAX360 Demo Initial Seed Data - Multi-Category Quick-Commerce

export const INITIAL_CATEGORIES = [
  {
    id: 'cat-groceries',
    name: 'Fruits & Vegetables',
    slug: 'fruits-vegetables',
    icon: 'Apple',
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
    icon: 'Milk',
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
    icon: 'Cookie',
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
    icon: 'CupSoda',
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
    icon: 'Sparkles',
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
    icon: 'SprayCan',
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
    icon: 'Headphones',
    itemCount: 6,
    badge: '10-Min Fast',
    isActive: true,
    banner: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
    description: 'High-speed cables, adapters, wireless earbuds, and portable power.'
  }
];

export const INITIAL_PRODUCTS = [
  // Fruits & Vegetables
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
    storage: 'Store at room temperature until ripe, then refrigerate.',
    tags: ['Best Seller', 'Summer Special', 'Organic']
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
    description: 'Sweet, energy-rich golden bananas grown without synthetic pesticides. Perfect pre-workout snack.',
    storage: 'Store in a cool dry place away from direct sunlight.',
    tags: ['Daily Essential', 'Potassium Rich']
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
    description: 'Crisp, tender, and virtually seedless hydroponically cultivated cucumbers. Clean and ready to slice.',
    storage: 'Keep refrigerated in the crisper drawer.',
    tags: ['Low Calorie', 'Hydration']
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
    description: 'Plump, juicy red tomatoes packed with rich lycopene. Ideal for fresh salads, curries, and sauces.',
    storage: 'Store at room temperature for maximum sweetness.',
    tags: ['Staple', 'Farm Direct']
  },

  // Dairy, Bread & Eggs
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
    description: 'Pasteurized, vitamin A & D fortified fresh toned milk with 3.0% fat. Chilled at 4°C at all times.',
    storage: 'Refrigerate below 4°C. Consume within 48 hours of opening.',
    tags: ['Daily Need', 'Essential']
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
    description: 'Cruelty-free, grain-fed hen eggs with deep golden yolks. Rich source of protein and choline.',
    storage: 'Keep refrigerated in the egg carton.',
    tags: ['High Protein', 'Free Range']
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
    description: 'Slow-fermented for 36 hours using organic wild yeast. Crusty exterior with an airy, pillowy crumb.',
    storage: 'Keep in an airtight bag at room temperature.',
    tags: ['Artisanal', 'Gut Friendly']
  },
  {
    id: 'prod-008',
    name: 'Greek Yogurt Natural High Protein',
    categoryId: 'cat-dairy',
    subcategory: 'Yogurt',
    brand: 'PureFit',
    unit: '200g',
    price: 90,
    mrp: 100,
    discountPercent: 10,
    stock: 35,
    rating: 4.7,
    ratingCount: 412,
    isVeg: true,
    sku: 'DRY-YOG-008',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500&auto=format&fit=crop&q=80',
    description: 'Velvety smooth, authentic strained Greek yogurt delivering 12g protein per cup without added sugars.',
    storage: 'Refrigerate at 2-5°C.',
    tags: ['High Protein', 'Zero Added Sugar']
  },

  // Snacks & Munchies
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
    description: 'Batch-cooked thick cut potato chips seasoned with authentic mineral-rich Himalayan pink salt.',
    storage: 'Store in an airtight container after breaking the seal.',
    tags: ['Party Favorite', 'Gluten Free']
  },
  {
    id: 'prod-010',
    name: 'Slow Roasted California Almonds',
    categoryId: 'cat-munchies',
    subcategory: 'Dry Fruits',
    brand: 'NutriHarvest',
    unit: '200g',
    price: 299,
    mrp: 380,
    discountPercent: 21,
    stock: 28,
    rating: 4.9,
    ratingCount: 390,
    isVeg: true,
    sku: 'SNK-ALM-010',
    image: 'https://images.unsplash.com/photo-1508061252445-5350f3ab0a55?w=500&auto=format&fit=crop&q=80',
    description: 'Jumbo size Nonpareil almonds dry roasted to crunchy perfection without oils or preservatives.',
    storage: 'Store in a cool, dry airtight jar.',
    tags: ['Superfood', 'Heart Healthy']
  },
  {
    id: 'prod-011',
    name: 'Dark Chocolate Sea Salt Cookies',
    categoryId: 'cat-munchies',
    subcategory: 'Cookies',
    brand: 'ChocoArt',
    unit: '150g (6 jumbo cookies)',
    price: 149,
    mrp: 180,
    discountPercent: 17,
    stock: 22,
    rating: 4.9,
    ratingCount: 610,
    isVeg: true,
    sku: 'SNK-CKI-011',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500&auto=format&fit=crop&q=80',
    description: 'Loaded with 70% Belgian dark chocolate chunks and finished with crunchy French fleur de sel crystals.',
    storage: 'Keep cool and dry.',
    tags: ['Gourmet', 'Indulgence']
  },

  // Cold Drinks & Juices
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
    description: 'Pure 100% juice extracted using hydraulic pressure. No added sugar, no heat treatment, no water.',
    storage: 'Keep refrigerated below 4°C. Consume within 24 hours of opening.',
    tags: ['Immunity Booster', '100% Raw']
  },
  {
    id: 'prod-013',
    name: 'Natural Tender Coconut Water',
    categoryId: 'cat-drinks',
    subcategory: 'Coconut Water',
    brand: 'CocoFresh',
    unit: '200ml Tetra Pack',
    price: 55,
    mrp: 65,
    discountPercent: 15,
    stock: 65,
    rating: 4.7,
    ratingCount: 1100,
    isVeg: true,
    sku: 'DRK-COC-013',
    image: 'https://images.unsplash.com/photo-1544378730-8b5104b18790?w=500&auto=format&fit=crop&q=80',
    description: 'Natural electrolytes straight from fresh green Pollachi coconuts. Zero added sugar and fat free.',
    storage: 'Serve chilled.',
    tags: ['Electrolytes', 'Daily Hydration']
  },

  // Personal Care
  {
    id: 'prod-014',
    name: 'Gentle Hydrating Foaming Cleanser',
    categoryId: 'cat-personal',
    subcategory: 'Skincare',
    brand: 'Dermacare',
    unit: '150ml',
    price: 349,
    mrp: 420,
    discountPercent: 17,
    stock: 19,
    rating: 4.9,
    ratingCount: 820,
    isVeg: true,
    sku: 'SKN-CLN-014',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&auto=format&fit=crop&q=80',
    description: 'Formulated with Ceramides and Hyaluronic Acid to gently cleanse without stripping the skin moisture barrier.',
    storage: 'Store in a cool dry place.',
    tags: ['Derm Recommended', 'Sensitive Skin']
  },
  {
    id: 'prod-015',
    name: 'Broad Spectrum SPF 50+ Invisible Sunscreen',
    categoryId: 'cat-personal',
    subcategory: 'Sunscreen',
    brand: 'SolarShield',
    unit: '50g',
    price: 499,
    mrp: 599,
    discountPercent: 16,
    stock: 15,
    rating: 4.8,
    ratingCount: 510,
    isVeg: true,
    sku: 'SKN-SUN-015',
    image: 'https://images.unsplash.com/photo-1567928804479-f4175374b509?w=500&auto=format&fit=crop&q=80',
    description: 'Ultralight water-gel formulation leaving zero white cast. Protection against UVA, UVB, and blue light.',
    storage: 'Keep away from direct heat.',
    tags: ['Zero White Cast', 'Non Sticky']
  },

  // Home & Cleaning
  {
    id: 'prod-016',
    name: 'Multi-Surface Citrus Disinfectant Spray',
    categoryId: 'cat-cleaning',
    subcategory: 'Surface Cleaners',
    brand: 'PureHome 360',
    unit: '500ml Spray Bottle',
    price: 199,
    mrp: 249,
    discountPercent: 20,
    stock: 25,
    rating: 4.8,
    ratingCount: 430,
    isVeg: true,
    sku: 'CLN-SPR-016',
    image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500&auto=format&fit=crop&q=80',
    description: 'Kills 99.9% of bacteria and viruses in 60 seconds with essential oil infusion of Italian lemon zest.',
    storage: 'Store out of reach of children.',
    tags: ['Antibacterial', 'Pleasant Aroma']
  },

  // Electronics & Gadgets
  {
    id: 'prod-017',
    name: 'Braided 65W Fast Charging USB-C to C Cable',
    categoryId: 'cat-electronics',
    subcategory: 'Cables & Adapters',
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
    description: 'Tough Kevlar-reinforced braided nylon outer jacket with E-Marker chip supporting up to 65W PD fast charging.',
    storage: 'Coil neatly after use.',
    tags: ['Fast Charging', 'Tough Braided']
  },
  {
    id: 'prod-018',
    name: 'True Wireless Noise-Cancelling Earbuds',
    categoryId: 'cat-electronics',
    subcategory: 'Audio',
    brand: 'Acoustic360',
    unit: '1 Pair with Charging Case',
    price: 1499,
    mrp: 2999,
    discountPercent: 50,
    stock: 8,
    rating: 4.8,
    ratingCount: 640,
    isVeg: true,
    sku: 'ELC-EAR-018',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=80',
    description: 'Crisp titanium audio drivers with 32dB active noise cancellation and 28-hour extended battery playtime.',
    storage: 'Charge using 5V standard adapter.',
    tags: ['ANC Powered', 'IPX5 Water Resistant']
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
    currentLocation: { lat: 19.0596, lng: 72.8295, address: 'Linking Rd, Bandra West' },
    batteryLevel: '88%',
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
    currentLocation: { lat: 19.0544, lng: 72.8402, address: 'Near Bandra Station Hub' },
    batteryLevel: '95%',
    activeOrderId: null
  },
  {
    id: 'partner-003',
    name: 'Rohan Gupta',
    phone: '+91 98334 11223',
    vehicle: 'Ather 450X EV (MH 01 AB 8391)',
    rating: 4.95,
    totalDeliveries: 1650,
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    status: 'Available',
    currentLocation: { lat: 19.0601, lng: 72.8360, address: 'Pali Hill Hub 3' },
    batteryLevel: '72%',
    activeOrderId: null
  },
  {
    id: 'partner-004',
    name: 'Priya Singh',
    phone: '+91 98920 33445',
    vehicle: 'Ola S1 Pro (MH 03 GH 5544)',
    rating: 4.9,
    totalDeliveries: 740,
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
    status: 'On Delivery',
    currentLocation: { lat: 19.0678, lng: 72.8320, address: 'Turner Rd, Bandra' },
    batteryLevel: '64%',
    activeOrderId: 'LX-83918'
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
    code: 'SUPERFAST',
    discountType: 'percentage',
    discountValue: 15,
    maxDiscount: 150,
    minOrderValue: 499,
    description: '15% instant discount up to ₹150 on orders above ₹499.',
    isActive: true
  },
  {
    code: 'FREEDEL',
    discountType: 'flat',
    discountValue: 25,
    minOrderValue: 199,
    description: 'Free instant 10-minute delivery on any order above ₹199.',
    isActive: true
  },
  {
    code: 'LAX360VIP',
    discountType: 'percentage',
    discountValue: 20,
    maxDiscount: 250,
    minOrderValue: 799,
    description: '20% super saver for executive orders above ₹799.',
    isActive: true
  }
];

export const INITIAL_CUSTOMER = {
  id: 'cust-001',
  name: 'Rahul Verma',
  email: 'rahul.verma@lax360demo.com',
  phone: '+91 98765 43210',
  walletBalance: 250,
  addresses: [
    {
      id: 'addr-001',
      tag: 'Home',
      isDefault: true,
      flat: 'Flat 402, Sea Green Heights',
      street: '14th Road, Off Linking Road',
      area: 'Bandra West',
      city: 'Mumbai',
      pincode: '400050',
      landmark: 'Behind Khar Police Station',
      lat: 19.0655,
      lng: 72.8328
    },
    {
      id: 'addr-002',
      tag: 'Office',
      isDefault: false,
      flat: 'LAX Tech Hub, Suite 701, Tower B',
      street: 'G Block, Bandra Kurla Complex',
      area: 'BKC',
      city: 'Mumbai',
      pincode: '400051',
      landmark: 'Opposite Diamond Bourse',
      lat: 19.0660,
      lng: 72.8680
    },
    {
      id: 'addr-003',
      tag: 'Parents',
      isDefault: false,
      flat: 'Bungalow 7, Sunrise Enclave',
      street: '17th Road, Khar Danda',
      area: 'Khar West',
      city: 'Mumbai',
      pincode: '400052',
      landmark: 'Near Sacred Heart Church',
      lat: 19.0712,
      lng: 72.8340
    }
  ]
};

export const INITIAL_ORDERS = [
  {
    id: 'LX-83910',
    createdAt: new Date(Date.now() - 1000 * 60 * 8).toISOString(), // 8 minutes ago
    customer: {
      name: 'Rahul Verma',
      phone: '+91 98765 43210',
      email: 'rahul.verma@lax360demo.com'
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
    status: 'Out for Delivery', // Placed, Confirmed, Preparing, Packed, Ready for Pickup, Partner Assigned, Picked Up, Out for Delivery, Delivered
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
    deliveryInstructions: 'Leave with security guard if not answering bell',
    estimatedDeliveryTime: 'Arriving in 4 mins',
    trackingSimulation: {
      progress: 68, // percentage 0 - 100
      etaMinutes: 4,
      currentStreet: 'Passing Khar Telephone Exchange, 14th Rd',
      distanceRemainingKm: 0.6,
      isPlaying: true,
      speed: 1
    },
    timeline: [
      { status: 'Placed', timestamp: new Date(Date.now() - 1000 * 60 * 8).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), done: true },
      { status: 'Confirmed', timestamp: new Date(Date.now() - 1000 * 60 * 7).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), done: true },
      { status: 'Preparing', timestamp: new Date(Date.now() - 1000 * 60 * 6).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), done: true },
      { status: 'Packed', timestamp: new Date(Date.now() - 1000 * 60 * 4).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), done: true },
      { status: 'Ready for Pickup', timestamp: new Date(Date.now() - 1000 * 60 * 3).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), done: true },
      { status: 'Partner Assigned', timestamp: new Date(Date.now() - 1000 * 60 * 3).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), done: true },
      { status: 'Picked Up', timestamp: new Date(Date.now() - 1000 * 60 * 2).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), done: true },
      { status: 'Out for Delivery', timestamp: new Date(Date.now() - 1000 * 60 * 1).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), done: true },
      { status: 'Delivered', timestamp: 'Pending', done: false }
    ]
  },
  {
    id: 'LX-83918',
    createdAt: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
    customer: {
      name: 'Pooja Nair',
      phone: '+91 98190 22334',
      email: 'pooja.n@gmail.com'
    },
    items: [
      {
        id: 'prod-005',
        name: 'Homogenised Toned Fresh Milk',
        unit: '1 Litre',
        price: 68,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500&auto=format&fit=crop&q=80'
      },
      {
        id: 'prod-006',
        name: 'Farm Fresh Brown Free-Range Eggs',
        unit: 'Pack of 6',
        price: 85,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=500&auto=format&fit=crop&q=80'
      },
      {
        id: 'prod-007',
        name: 'Artisanal Sourdough Country Loaf',
        unit: '400g',
        price: 135,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?w=500&auto=format&fit=crop&q=80'
      }
    ],
    deliveryAddress: {
      tag: 'Apartment',
      flat: 'Penthouse 1102, Silver Arch',
      street: 'Perry Cross Road',
      area: 'Bandra West, Mumbai 400050'
    },
    deliveryPartner: {
      id: 'partner-004',
      name: 'Priya Singh',
      phone: '+91 98920 33445',
      vehicle: 'Ola S1 Pro (MH 03 GH 5544)',
      rating: 4.9,
      photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80'
    },
    status: 'Preparing',
    paymentMethod: 'Credit Card (Visa)',
    paymentStatus: 'Paid',
    billSummary: {
      itemsTotal: 356,
      deliveryFee: 25,
      handlingFee: 5,
      tip: 10,
      discount: 0,
      couponCode: null,
      grandTotal: 396
    },
    deliveryInstructions: 'Ring doorbell twice please',
    estimatedDeliveryTime: 'Arriving in 11 mins',
    trackingSimulation: {
      progress: 25,
      etaMinutes: 11,
      currentStreet: 'LAX Dark Store 02 Fulfillment Dock',
      distanceRemainingKm: 2.1,
      isPlaying: false,
      speed: 1
    },
    timeline: [
      { status: 'Placed', timestamp: new Date(Date.now() - 1000 * 60 * 18).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), done: true },
      { status: 'Confirmed', timestamp: new Date(Date.now() - 1000 * 60 * 17).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), done: true },
      { status: 'Preparing', timestamp: new Date(Date.now() - 1000 * 60 * 12).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), done: true },
      { status: 'Packed', timestamp: 'Pending', done: false },
      { status: 'Ready for Pickup', timestamp: 'Pending', done: false },
      { status: 'Partner Assigned', timestamp: 'Pending', done: false },
      { status: 'Picked Up', timestamp: 'Pending', done: false },
      { status: 'Out for Delivery', timestamp: 'Pending', done: false },
      { status: 'Delivered', timestamp: 'Pending', done: false }
    ]
  },
  {
    id: 'LX-83890',
    createdAt: new Date(Date.now() - 1000 * 60 * 95).toISOString(),
    customer: {
      name: 'Aditya Roy',
      phone: '+91 99304 88771',
      email: 'aditya.roy@yahoo.com'
    },
    items: [
      {
        id: 'prod-017',
        name: 'Braided 65W Fast Charging USB-C to C Cable',
        unit: '1.8m (6 Feet)',
        price: 349,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=80'
      },
      {
        id: 'prod-012',
        name: 'Cold Pressed Valencia Orange Juice',
        unit: '250ml',
        price: 110,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=500&auto=format&fit=crop&q=80'
      }
    ],
    deliveryAddress: {
      tag: 'Office',
      flat: 'Co-work Cabin 4A, Innovate Tower',
      street: 'Hill Road',
      area: 'Bandra West, Mumbai 400050'
    },
    deliveryPartner: {
      id: 'partner-003',
      name: 'Rohan Gupta',
      phone: '+91 98334 11223',
      vehicle: 'Ather 450X EV (MH 01 AB 8391)',
      rating: 4.95,
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80'
    },
    status: 'Delivered',
    paymentMethod: 'UPI (Paytm)',
    paymentStatus: 'Paid',
    billSummary: {
      itemsTotal: 569,
      deliveryFee: 0,
      handlingFee: 5,
      tip: 30,
      discount: 100,
      couponCode: 'LAXFIRST',
      grandTotal: 504
    },
    deliveryInstructions: 'Hand over at reception',
    estimatedDeliveryTime: 'Delivered in 9 mins',
    trackingSimulation: {
      progress: 100,
      etaMinutes: 0,
      currentStreet: 'Delivered to Customer Doorstep',
      distanceRemainingKm: 0,
      isPlaying: false,
      speed: 1
    },
    timeline: [
      { status: 'Placed', timestamp: '10:45 AM', done: true },
      { status: 'Confirmed', timestamp: '10:46 AM', done: true },
      { status: 'Preparing', timestamp: '10:47 AM', done: true },
      { status: 'Packed', timestamp: '10:49 AM', done: true },
      { status: 'Ready for Pickup', timestamp: '10:50 AM', done: true },
      { status: 'Partner Assigned', timestamp: '10:50 AM', done: true },
      { status: 'Picked Up', timestamp: '10:51 AM', done: true },
      { status: 'Out for Delivery', timestamp: '10:52 AM', done: true },
      { status: 'Delivered', timestamp: '10:54 AM', done: true }
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
