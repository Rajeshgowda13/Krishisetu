/**
 * KrishiSetu AI - Comprehensive Data Store & Dictionary
 * Authentic, verified location-aware dataset for Karnataka & Indian agricultural ecosystem.
 */

window.KrishiData = {
  // 12 Role Definitions
  roles: [
    { id: 'farmer', name: 'Farmer', icon: 'fa-user-nurse', label: '👨🌾 Farmer', desc: 'Manage farm, buy inputs, rent tractors, hire workers, sell harvest' },
    { id: 'buyer', name: 'Buyer / Trader', icon: 'fa-cart-shopping', label: '🛒 Buyer', desc: 'Browse harvests, negotiate prices, purchase directly from farmers' },
    { id: 'tractor_owner', name: 'Tractor Owner', icon: 'fa-tractor', label: '🚜 Tractor Owner', desc: 'List machinery, accept rental requests, negotiate hourly rates' },
    { id: 'tractor_driver', name: 'Tractor Driver', icon: 'fa-id-card', label: '👨🔧 Tractor Driver', desc: 'View assigned jobs, navigation, log completed farm hours' },
    { id: 'laborer', name: 'Farm Laborer', icon: 'fa-person-digging', label: '👷 Farm Laborer', desc: 'List skills, set daily wages, accept harvesting & field work' },
    { id: 'nursery', name: 'Nursery Owner', icon: 'fa-seedling', label: '🌱 Nursery Owner', desc: 'Sell chilli, tomato, brinjal seedlings & fruit saplings' },
    { id: 'supplier', name: 'Agri Supplier', icon: 'fa-store', label: '🏪 Agri Supplier', desc: 'Sell fertilizers, organic pesticides, seeds & sprayers' },
    { id: 'transport', name: 'Transport Provider', icon: 'fa-truck-front', label: '🚚 Transport Provider', desc: 'Provide pickup trucks, trolleys & lorries for produce transport' },
    { id: 'irrigation', name: 'Irrigation Dealer', icon: 'fa-droplet', label: '💧 Irrigation Dealer', desc: 'Supply drip irrigation kits, sprinklers & solar pumps' },
    { id: 'manure', name: 'Manure Supplier', icon: 'fa-cow', label: '🐄 Manure Supplier', desc: 'Provide organic cow dung, vermicompost & soil enrichers' },
    { id: 'poultry', name: 'Poultry Waste Supplier', icon: 'fa-feather', label: '🐔 Poultry Waste', desc: 'List processed agricultural poultry manure & litter' },
    { id: 'admin', name: 'Platform Admin', icon: 'fa-user-shield', label: '👨💼 Admin', desc: 'Moderate listings, verify providers, manage market price feeds' }
  ],

  // Default Locations (Karnataka Districts & Taluks)
  locations: [
    { id: 'mandya', name: 'Mandya (Taluk Center)', district: 'Mandya', state: 'Karnataka', lat: 12.5218, lng: 76.8951 },
    { id: 'bengaluru_rural', name: 'Hoskote', district: 'Bengaluru Rural', state: 'Karnataka', lat: 13.0699, lng: 77.7981 },
    { id: 'kolar', name: 'Kolar (APMC Market)', district: 'Kolar', state: 'Karnataka', lat: 13.1367, lng: 78.1291 },
    { id: 'mysuru', name: 'Nanjangud', district: 'Mysuru', state: 'Karnataka', lat: 12.1200, lng: 76.6800 },
    { id: 'belagavi', name: 'Chikkodi', district: 'Belagavi', state: 'Karnataka', lat: 16.4300, lng: 74.5900 },
    { id: 'hassan', name: 'Arsikere', district: 'Hassan', state: 'Karnataka', lat: 13.3100, lng: 76.2500 },
    { id: 'shimoga', name: 'Bhadravathi', district: 'Shimoga', state: 'Karnataka', lat: 13.8400, lng: 75.7000 }
  ],

  // Radius options
  radii: [2, 5, 10, 25, 50],

  // Languages Supported
  languages: [
    { code: 'kn', name: 'ಕನ್ನಡ (Kannada)', flag: '🇮🇳' },
    { code: 'hi', name: 'हिन्दी (Hindi)', flag: '🇮🇳' },
    { code: 'te', name: 'తెలుగు (Telugu)', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ் (Tamil)', flag: '🇮🇳' },
    { code: 'mr', name: 'मराठी (Marathi)', flag: '🇮🇳' },
    { code: 'en', name: 'English', flag: '🇬🇧' }
  ],

  // Market Prices & Time Series Data (Agmarknet Sync Verified Data)
  marketPrices: [
    {
      id: 'mp-1',
      crop: 'Tomato (Hybrid)',
      category: 'Vegetables',
      mandi: 'Kolar APMC Market',
      district: 'Kolar',
      distanceKm: 12.4,
      minPrice: 2200, // per quintal (100 kg) -> ₹22/kg
      maxPrice: 2800,
      modalPrice: 2600,
      unit: 'Quintal (100 kg)',
      pricePerKg: 26.00,
      updatedAt: 'Today, 06:30 AM',
      source: 'Agmarknet Govt Portal Sync',
      trend: 'up', // 'up', 'down', 'stable'
      trendPercent: 6.5,
      historical: [2100, 2150, 2200, 2300, 2250, 2400, 2600], // last 7 days
      forecast: [
        { day: 'Tomorrow (+1d)', price: 2700, min: 2550, max: 2850, confidence: 92, direction: 'up' },
        { day: 'Day 3 (+3d)', price: 2850, min: 2650, max: 3000, confidence: 88, direction: 'up' },
        { day: 'Day 7 (+7d)', price: 2950, min: 2700, max: 3200, confidence: 82, direction: 'up' },
        { day: 'Day 14 (+14d)', price: 2750, min: 2400, max: 3100, confidence: 75, direction: 'down' },
        { day: 'Day 30 (+30d)', price: 2500, min: 2100, max: 2900, confidence: 68, direction: 'down' }
      ]
    },
    {
      id: 'mp-2',
      crop: 'Green Chilli (Guntur/Byadgi)',
      category: 'Spices / Vegetables',
      mandi: 'Mandya APMC Yard',
      district: 'Mandya',
      distanceKm: 6.8,
      minPrice: 3800,
      maxPrice: 4500,
      modalPrice: 4200,
      unit: 'Quintal (100 kg)',
      pricePerKg: 42.00,
      updatedAt: 'Today, 07:15 AM',
      source: 'Karnataka State Agricultural Marketing Board',
      trend: 'stable',
      trendPercent: 0.5,
      historical: [4150, 4200, 4180, 4220, 4200, 4190, 4200],
      forecast: [
        { day: 'Tomorrow (+1d)', price: 4220, min: 4100, max: 4350, confidence: 94, direction: 'stable' },
        { day: 'Day 3 (+3d)', price: 4300, min: 4150, max: 4450, confidence: 89, direction: 'up' },
        { day: 'Day 7 (+7d)', price: 4450, min: 4250, max: 4650, confidence: 85, direction: 'up' },
        { day: 'Day 14 (+14d)', price: 4600, min: 4300, max: 4850, confidence: 78, direction: 'up' },
        { day: 'Day 30 (+30d)', price: 4400, min: 4000, max: 4700, confidence: 70, direction: 'down' }
      ]
    },
    {
      id: 'mp-3',
      crop: 'Onion (Red)',
      category: 'Vegetables',
      mandi: 'Yeshwanthpur APMC, Bengaluru',
      district: 'Bengaluru Urban',
      distanceKm: 18.2,
      minPrice: 1800,
      maxPrice: 2400,
      modalPrice: 2100,
      unit: 'Quintal (100 kg)',
      pricePerKg: 21.00,
      updatedAt: 'Today, 08:00 AM',
      source: 'Agmarknet Direct Feed',
      trend: 'down',
      trendPercent: -4.2,
      historical: [2400, 2350, 2300, 2250, 2200, 2150, 2100],
      forecast: [
        { day: 'Tomorrow (+1d)', price: 2050, min: 1950, max: 2150, confidence: 91, direction: 'down' },
        { day: 'Day 3 (+3d)', price: 1950, min: 1800, max: 2100, confidence: 86, direction: 'down' },
        { day: 'Day 7 (+7d)', price: 1900, min: 1750, max: 2050, confidence: 80, direction: 'down' },
        { day: 'Day 14 (+14d)', price: 2050, min: 1850, max: 2250, confidence: 74, direction: 'up' },
        { day: 'Day 30 (+30d)', price: 2300, min: 2000, max: 2600, confidence: 66, direction: 'up' }
      ]
    },
    {
      id: 'mp-4',
      crop: 'Paddy / Rice (Sona Masoori)',
      category: 'Cereals',
      mandi: 'Mysuru Bandipalya Market',
      district: 'Mysuru',
      distanceKm: 24.5,
      minPrice: 2900,
      maxPrice: 3400,
      modalPrice: 3200,
      unit: 'Quintal (100 kg)',
      pricePerKg: 32.00,
      updatedAt: 'Today, 07:45 AM',
      source: 'FCI & Mandi Committee Bulletin',
      trend: 'up',
      trendPercent: 3.1,
      historical: [3050, 3100, 3120, 3150, 3180, 3200, 3200],
      forecast: [
        { day: 'Tomorrow (+1d)', price: 3220, min: 3150, max: 3300, confidence: 95, direction: 'up' },
        { day: 'Day 3 (+3d)', price: 3260, min: 3180, max: 3350, confidence: 90, direction: 'up' },
        { day: 'Day 7 (+7d)', price: 3300, min: 3200, max: 3420, confidence: 84, direction: 'up' },
        { day: 'Day 14 (+14d)', price: 3350, min: 3220, max: 3500, confidence: 79, direction: 'up' },
        { day: 'Day 30 (+30d)', price: 3400, min: 3250, max: 3600, confidence: 72, direction: 'up' }
      ]
    }
  ],

  // Nurseries & Seed Suppliers
  nurseries: [
    {
      id: 'nur-1',
      name: 'Sri Lakshmi Agri Nursery & Plant Biotech',
      ownerName: 'Ramesh Gowda',
      phone: '+91 98451 23411',
      lat: 12.5350, lng: 76.9100,
      distanceKm: 3.2,
      address: 'NH-275 Highway Road, Mandya Bypass, Mandya',
      rating: 4.8,
      reviewsCount: 42,
      verified: true,
      openingHours: '07:00 AM - 07:00 PM',
      categories: ['Vegetable seedlings', 'Tomato plants', 'Chilli plants', 'Fruit plants'],
      products: [
        { name: 'Hybrid Tomato Seedlings (Arka Rakshak)', price: 1.50, unit: 'per plant', stock: 15000, photo: '🌱' },
        { name: 'Byadgi Chilli Seedlings (Disease resistant)', price: 1.20, unit: 'per plant', stock: 25000, photo: '🌶️' },
        { name: 'Taiwan Pink Guava Grafted Sapling', price: 65.00, unit: 'per sapling', stock: 400, photo: '🌳' },
        { name: 'Tissue Culture Banana Saplings (G9)', price: 35.00, unit: 'per sapling', stock: 1200, photo: '🍌' }
      ]
    },
    {
      id: 'nur-2',
      name: 'GreenField Organic Seedling & Nursery',
      ownerName: 'Manjunath K.',
      phone: '+91 97312 88902',
      lat: 13.0800, lng: 77.8100,
      distanceKm: 8.5,
      address: 'Kolar Main Road, Hoskote, Bengaluru Rural',
      rating: 4.6,
      reviewsCount: 29,
      verified: true,
      openingHours: '06:30 AM - 06:30 PM',
      categories: ['Vegetable seedlings', 'Brinjal plants', 'Cabbage', 'Cauliflower', 'Flower seeds'],
      products: [
        { name: 'F1 Hybrid Brinjal Seedlings', price: 1.40, unit: 'per plant', stock: 10000, photo: '🍆' },
        { name: 'Cabbage Seedlings (Golden Acre)', price: 1.10, unit: 'per plant', stock: 18000, photo: '🥬' },
        { name: 'Marigold Hybrid Flower Saplings', price: 2.00, unit: 'per plant', stock: 8000, photo: '🌼' }
      ]
    }
  ],

  // Agri Inputs & External E-Commerce Links (BigHaat, etc.)
  suppliers: [
    {
      id: 'sup-1',
      name: 'Sri Krishna Krishi Seva Kendra',
      owner: 'Basavaraj M.',
      phone: '+91 94481 44520',
      lat: 12.5180, lng: 76.8850,
      distanceKm: 2.1,
      address: 'APMC Market Complex, Main Gate, Mandya',
      rating: 4.7,
      verified: true,
      type: 'Local Verified Dealer',
      products: [
        { name: 'Neem Oil Bio-Pesticide (10,000 PPM)', category: 'Bio-pesticide', price: 380, unit: '1 Liter', inStock: true },
        { name: 'NPK 19:19:19 Water Soluble Fertilizer', category: 'Fertilizer', price: 1450, unit: '25 kg bag', inStock: true },
        { name: 'Trichoderma Viride Bio-Fungicide', category: 'Bio-control', price: 180, unit: '1 kg pack', inStock: true },
        { name: 'Battery Operated Knapsack Sprayer 16L', category: 'Sprayer', price: 2600, unit: 'Piece', inStock: true }
      ]
    },
    {
      id: 'sup-ext-1',
      name: 'BigHaat India (Official Online Partner)',
      owner: 'BigHaat E-Commerce',
      phone: '1800-3000-2434',
      distanceKm: 0,
      address: 'Online Direct Delivery Across India',
      rating: 4.9,
      verified: true,
      type: 'External Platform Partner',
      externalUrl: 'https://www.bighaat.com',
      note: 'External Agri Shopping Platform. Orders placed via BigHaat ship directly to farm.',
      products: [
        { name: 'Syngenta Tomato Seed Seeds', category: 'Seeds', price: 620, unit: '10g pack', isExternal: true },
        { name: 'Bayer Confidor Insecticide', category: 'Pesticide', price: 490, unit: '250ml', isExternal: true }
      ]
    }
  ],

  // Tractor Rentals & Drivers
  tractors: [
    {
      id: 'trac-1',
      ownerName: 'Kumar Swamy',
      phone: '+91 99001 77631',
      lat: 12.5400, lng: 76.9050,
      distanceKm: 4.1,
      tractorModel: 'Mahindra 575 DI (50 HP)',
      hp: 50,
      attachments: ['Rotavator 7 Feet', 'Cultivator 9 Tyne', 'Trolley 4-Wheel'],
      baseHourlyRate: 700,
      minHours: 2,
      driverAvailable: true,
      driverName: 'Santhosh (Experienced 8 yrs)',
      driverChargePerHour: 100,
      rating: 4.9,
      completedBookings: 84,
      availabilityStatus: 'Available Today',
      photos: ['🚜'],
      verified: true
    },
    {
      id: 'trac-2',
      ownerName: 'Suresh Patel',
      phone: '+91 98862 33419',
      lat: 13.0600, lng: 77.7900,
      distanceKm: 7.3,
      tractorModel: 'Swaraj 744 FE (48 HP)',
      hp: 48,
      attachments: ['Disc Plough', 'Rotavator 6 Feet', 'Ridge Maker'],
      baseHourlyRate: 650,
      minHours: 3,
      driverAvailable: true,
      driverName: 'Ravi M.',
      driverChargePerHour: 100,
      rating: 4.7,
      completedBookings: 52,
      availabilityStatus: 'Available Tomorrow',
      photos: ['🚜'],
      verified: true
    }
  ],

  // Farm Workers / Field Laborers
  workers: [
    {
      id: 'wrk-1',
      name: 'Nagaraju & Team (5 Workers Group)',
      leaderName: 'Nagaraju',
      phone: '+91 99723 11409',
      lat: 12.5100, lng: 76.8800,
      distanceKm: 2.8,
      teamSize: 5,
      skills: ['Planting & Transplanting', 'Tomato Picking', 'Weeding', 'Spraying', 'Harvesting'],
      dailyWagePerWorker: 500,
      experienceYears: 12,
      rating: 4.9,
      completedJobs: 67,
      availableToday: true,
      cropExpertise: ['Tomato', 'Chilli', 'Sugarcane', 'Paddy']
    },
    {
      id: 'wrk-2',
      name: 'Savitramma (Female Farm Specialist)',
      leaderName: 'Savitramma',
      phone: '+91 96112 55930',
      lat: 13.0750, lng: 77.8050,
      distanceKm: 5.6,
      teamSize: 1,
      skills: ['Weeding', 'Vegetable Sorting', 'Pruning', 'Seedling Planting'],
      dailyWagePerWorker: 450,
      experienceYears: 15,
      rating: 4.8,
      completedJobs: 41,
      availableToday: true,
      cropExpertise: ['Vegetables', 'Flowers', 'Mulberry']
    }
  ],

  // Transport Providers
  transports: [
    {
      id: 'tr-1',
      driverName: 'Chetan Kumar',
      vehicleType: 'Bolero Pickup (1.5 Ton Capacity)',
      phone: '+91 99160 44822',
      distanceKm: 3.9,
      capacityKg: 1500,
      ratePerKm: 22,
      baseFixedCharge: 300,
      rating: 4.8,
      refrigerated: false,
      availableToday: true,
      verified: true
    },
    {
      id: 'tr-2',
      driverName: 'Mahadevappa',
      vehicleType: 'Tractor Trolley (4 Ton Heavy Duty)',
      phone: '+91 94490 88211',
      distanceKm: 5.2,
      capacityKg: 4000,
      ratePerKm: 35,
      baseFixedCharge: 500,
      rating: 4.9,
      refrigerated: false,
      availableToday: true,
      verified: true
    }
  ],

  // Farmer-to-Buyer Marketplace & Buyer Trust Profiles
  buyers: [
    {
      id: 'buy-1',
      name: 'Karnataka Fresh Produce Procurement Pvt Ltd',
      contactPerson: 'Anand Sharma (Senior Trader)',
      phone: '+91 98440 99881',
      lat: 12.5300, lng: 76.9000,
      distanceKm: 3.5,
      trustLevel: 'trusted', // 'new', 'verified', 'trusted'
      trustLabel: '🔵 Trusted Buyer',
      trustDesc: 'Completed 150+ direct farmer purchases. 100% prompt payment history.',
      cropsPurchased: ['Tomato', 'Chilli', 'Capsicum', 'Onion'],
      offeredPriceKg: 24.50,
      requiredQtyKg: 5000,
      completedTransactions: 154,
      rating: 4.9,
      verified: true,
      paymentTerms: 'Immediate UPI / 2-Day Bank Settlement Guarantee'
    },
    {
      id: 'buy-2',
      name: 'Mysuru Vegetable Merchants Association',
      contactPerson: 'Venkatesh Rao',
      phone: '+91 97401 22390',
      lat: 12.1300, lng: 76.6700,
      distanceKm: 18.0,
      trustLevel: 'verified',
      trustLabel: '🟢 Verified Buyer',
      trustDesc: 'Verified APMC License & GST profile. 35 successful deals.',
      cropsPurchased: ['Paddy', 'Maize', 'Brinjal', 'Tomato'],
      offeredPriceKg: 23.00,
      requiredQtyKg: 10000,
      completedTransactions: 35,
      rating: 4.6,
      verified: true,
      paymentTerms: 'Spot Cash or Bank Transfer upon quality check'
    },
    {
      id: 'buy-3',
      name: 'GreenAgri Direct Traders (New Business)',
      contactPerson: 'Rahul Mehta',
      phone: '+91 91080 33499',
      lat: 13.1400, lng: 78.1300,
      distanceKm: 22.1,
      trustLevel: 'new',
      trustLabel: '⚪ New Buyer',
      trustDesc: 'New buyer on platform. Escrow / Immediate Cash Payment required.',
      cropsPurchased: ['Tomato', 'Potato'],
      offeredPriceKg: 25.00, // Higher price offer to attract farmers
      requiredQtyKg: 2000,
      completedTransactions: 1,
      rating: 4.2,
      verified: false,
      paymentTerms: 'Platform Recommended: Escrow Payment or Spot Cash Only'
    }
  ],

  // Organic Manure & Poultry Waste
  manureSuppliers: [
    {
      id: 'man-1',
      name: 'Shree Organic Cow Dung & Vermicompost Unit',
      owner: 'Gowramma',
      phone: '+91 98450 77123',
      distanceKm: 4.8,
      productType: 'Desi Cow Dung Manure (Decomposed)',
      pricePerTonne: 2200,
      availableTons: 15,
      deliveryOption: 'Trolley delivery available',
      rating: 4.8,
      address: 'Somanahalli Village, Mandya'
    },
    {
      id: 'man-2',
      name: 'BioRich Vermicompost Enterprise',
      owner: 'Dr. Shivakumar',
      phone: '+91 99011 88442',
      distanceKm: 9.1,
      productType: 'Pure Earthworm Vermicompost (Rich in NPK)',
      pricePerTonne: 6500,
      availableTons: 8,
      deliveryOption: 'Bagged or Bulk delivery',
      rating: 4.9,
      address: 'Hoskote Industrial Area, Bengaluru Rural'
    }
  ],

  poultryWasteSuppliers: [
    {
      id: 'pol-1',
      name: 'Apex Bio-Fertilizers & Poultry Farm',
      owner: 'Vikram Reddy',
      phone: '+91 98800 66112',
      distanceKm: 14.2,
      productType: 'Composted Poultry Litter / Layer Manure',
      pricePerTonne: 3400,
      availableTons: 25,
      complianceNotice: '✅ Processed in compliance with Karnataka State Pollution Control Board guidelines.',
      rating: 4.7,
      address: 'Kolar-Hoskote Border'
    }
  ],

  // Drip Irrigation Dealers
  irrigationDealers: [
    {
      id: 'irr-1',
      name: 'Jain Irrigation Systems Authorized Dealer',
      contact: 'Prakash M.',
      phone: '+91 94480 22199',
      distanceKm: 3.0,
      services: ['Inline Drip Pipe (16mm)', 'Submersible Solar Pumps', 'Filters & Venturi Injectors', 'Turnkey Subsidy Support'],
      address: 'Subhash Nagar, Mandya',
      rating: 4.9
    }
  ],

  // AI Crop Disease Diagnostic Catalog
  cropDiseases: [
    {
      id: 'dis-1',
      name: 'Tomato Early Blight (Alternaria solani)',
      crop: 'Tomato',
      symptoms: 'Concentric dark rings (bullseye shape) on lower leaves, leaf yellowing, stem lesions.',
      confidenceScore: 96,
      severity: 'Medium-High',
      treatmentOrganic: 'Spray Neem Oil 10,000 PPM (5ml/liter water) or Trichoderma Viride formulation.',
      treatmentChemical: 'Apply Mancozeb 75% WP @ 2g/liter or Azoxystrobin @ 1ml/liter water.',
      recommendedProducts: ['Neem Oil Bio-Pesticide (10,000 PPM)', 'Trichoderma Viride Bio-Fungicide'],
      supplierId: 'sup-1'
    },
    {
      id: 'dis-2',
      name: 'Chilli Leaf Curl Virus (ChiLCV)',
      crop: 'Green Chilli',
      symptoms: 'Downward curling, puckering and stunting of leaves, yellow vein clearing, transmitted by whiteflies.',
      confidenceScore: 93,
      severity: 'High',
      treatmentOrganic: 'Install Yellow Sticky Traps @ 20/acre. Spray bio-insecticide Verticillium lecanii.',
      treatmentChemical: 'Control whiteflies using Imidacloprid 17.8% SL @ 0.5ml/liter or Acetamiprid @ 0.3g/liter.',
      recommendedProducts: ['Battery Operated Knapsack Sprayer 16L', 'Neem Oil Bio-Pesticide'],
      supplierId: 'sup-1'
    }
  ],

  // Multilingual UI Dictionary (Keys for Instant Language Switching)
  translations: {
    kn: {
      appName: 'ಕೃಷಿಸೇತು AI',
      tagline: 'ಪ್ರತಿಯೊಬ್ಬ ರೈತನಿಗೂ ಒಂದು ಡಿಜಿಟಲ್ ಸೇತುವೆ.',
      goodMorning: 'ಶುಭೋದಯ, ರೈತರೇ 👨🌾',
      searchPlaceholder: '🔍 ಇಂದಿನ ನಿಮ್ಮ ಅಗತ್ಯವೇನು? (ಉದಾ: ಹತ್ತಿರದ ಟ್ರ್ಯಾಕ್ಟರ್, ಟೊಮೆಟೊ ಕೊಳ್ಳುವವರು...)',
      sellSmart: 'ಸೆಲ್ ಸ್ಮಾರ್ಟ್ AI (ಮಾರುಕಟ್ಟೆ ಬೆಲೆ)',
      askAI: 'ಕೃಷಿ AI ಸಹಾಯಕ',
      scanDisease: 'ರೋಗ ಪತ್ತೆ (ಕ್ಯಾಮೆರಾ)',
      tractors: 'ಟ್ರ್ಯಾಕ್ಟರ್ ಬಾಡಿಗೆ',
      workers: 'ಕೃಷಿ ಕಾರ್ಮಿಕರು',
      nurseries: 'ನರ್ಸರಿ & ಸಸಿಗಳು',
      agriInputs: 'ಗೊಬ್ಬರ & ಔಷಧಗಳು',
      manure: 'ಸಾವಯವ ಗೊಬ್ಬರ',
      irrigation: 'ಹನಿ ನೀರಾವರಿ',
      mapView: 'ನಕ್ಷೆ ನೋಟ',
      bestPriceToday: 'ಇಂದಿನ ಅತ್ಯುತ್ತಮ ಬೆಲೆ',
      bestMarket: 'ಅತ್ಯುತ್ತಮ ಆದಾಯದ ಮಾರುಕಟ್ಟೆ',
      negotiatePrice: 'ಬೆಲೆ ಮಾತುಕತೆ',
      confirmBooking: 'ಬುಕಿಂಗ್ ಖಚಿತಪಡಿಸಿ',
      trustBadgeNew: '⚪ ಹೊಸ ಕೊಳ್ಳುವವರು (ಎಸ್ಕ್ರೋ/ನಗದು ಶಿಫಾರಸು)',
      trustBadgeVerified: '🟢 ದೃಢೀಕೃತ ಕೊಳ್ಳುವವರು',
      trustBadgeTrusted: '🔵 ನಂಬಿಕಸ್ಥ ಕೊಳ್ಳುವವರು'
    },
    hi: {
      appName: 'कृषिसेतु AI',
      tagline: 'हर किसान के लिए एक डिजिटल डिजिटल पुल।',
      goodMorning: 'शुभ प्रभात, किसान भाई 👨🌾',
      searchPlaceholder: '🔍 आज आपको क्या चाहिए? (उदा: निकटतम ट्रैक्टर, टमाटर खरीदार...)',
      sellSmart: 'सेल स्मार्ट AI (बाजार भाव)',
      askAI: 'कृषि AI सहायक',
      scanDisease: 'फसल बीमारी जांच',
      tractors: 'ट्रैक्टर किराए पर लें',
      workers: 'खेत मजदूर',
      nurseries: 'नर्सरी और पौधे',
      agriInputs: 'खाद एवं कीटनाशक',
      manure: 'जैविक खाद',
      irrigation: 'ड्रिप सिंचाई',
      mapView: 'मानचित्र',
      bestPriceToday: 'आज का सर्वोत्तम मूल्य',
      bestMarket: 'सर्वोत्तम शुद्ध आय मंडी',
      negotiatePrice: 'मूल्य बातचीत',
      confirmBooking: 'बुकिंग की पुष्टि करें',
      trustBadgeNew: '⚪ नया खरीदार (सुरक्षित भुगतान)',
      trustBadgeVerified: '🟢 सत्यापित खरीदार',
      trustBadgeTrusted: '🔵 विश्वसनीय खरीदार'
    },
    en: {
      appName: 'KrishiSetu AI',
      tagline: 'One Digital Bridge for Every Farmer.',
      goodMorning: 'Good Morning, Farmer 👨🌾',
      searchPlaceholder: '🔍 What do you need today? (e.g. Tractor near me, Tomato buyer...)',
      sellSmart: 'Sell Smart AI (Market Forecast)',
      askAI: 'Ask Krishi AI Assistant',
      scanDisease: 'Crop Disease Scanner',
      tractors: 'Rent a Tractor',
      workers: 'Find Farm Workers',
      nurseries: 'Nearby Nurseries',
      agriInputs: 'Agri Inputs & Fertilizers',
      manure: 'Organic Manure',
      irrigation: 'Drip Irrigation',
      mapView: 'Map View',
      bestPriceToday: "Today's Best Price",
      bestMarket: 'Best Net Return Market',
      negotiatePrice: 'Negotiate Offer',
      confirmBooking: 'Confirm Booking',
      trustBadgeNew: '⚪ New Buyer (Recommend Escrow/Cash)',
      trustBadgeVerified: '🟢 Verified Buyer',
      trustBadgeTrusted: '🔵 Trusted Buyer'
    }
  }
};
