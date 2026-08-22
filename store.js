/**
 * KrishiSetu AI - Application State & Storage Engine
 */

window.KrishiStore = {
  state: {
    currentRole: 'farmer',
    currentLanguage: 'kn', // Default Kannada for Karnataka emphasis
    currentLocation: window.KrishiData.locations[0], // Mandya
    searchRadiusKm: 10,
    currentTab: 'home', // 'home', 'search', 'market', 'sell_smart', 'krishi_ai', 'services', 'disease_scan', 'tractors', 'workers', 'buyers', 'directory', 'profit_calc', 'map', 'admin', 'provider_reg'
    
    // Farmer Registration Profile
    farmerProfile: {
      fullName: 'Basavanagowda Patil',
      phone: '+91 98450 11223',
      village: 'Somanahalli',
      taluk: 'Mandya',
      district: 'Mandya',
      state: 'Karnataka',
      farmSizeAcres: 4.5,
      soilType: 'Red Loamy Soil',
      currentCrops: ['Tomato (Hybrid)', 'Green Chilli', 'Sugarcane'],
      irrigationType: 'Drip & Borewell',
      farmingMethod: 'Semi-Organic'
    },

    // Dynamic Lists (LocalStorage Synced)
    negotiations: [],
    bookings: [],
    cropListings: [
      {
        id: 'list-1',
        farmerName: 'Basavanagowda Patil',
        farmerPhone: '+91 98450 11223',
        crop: 'Tomato (Hybrid)',
        variety: 'Arka Rakshak',
        quantityKg: 2500,
        qualityGrade: 'Grade A (Firm, Red, Uniform)',
        expectedPricePerKg: 25.00,
        harvestDate: '2026-08-18',
        location: 'Mandya Farm (4.1 km away)',
        isOrganic: true,
        photos: ['🍅'],
        status: 'Active'
      }
    ],
    priceAlerts: [
      { id: 'pa-1', crop: 'Tomato (Hybrid)', targetPrice: 28.00, status: 'Active' }
    ],
    reviews: []
  },

  listeners: [],

  init() {
    const savedState = localStorage.getItem('krishisetu_store_v1');
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        this.state = { ...this.state, ...parsed };
      } catch (e) {
        console.error('Failed to parse local storage state', e);
      }
    }
  },

  save() {
    localStorage.setItem('krishisetu_store_v1', JSON.stringify({
      currentRole: this.state.currentRole,
      currentLanguage: this.state.currentLanguage,
      currentLocation: this.state.currentLocation,
      searchRadiusKm: this.state.searchRadiusKm,
      farmerProfile: this.state.farmerProfile,
      negotiations: this.state.negotiations,
      bookings: this.state.bookings,
      cropListings: this.state.cropListings,
      priceAlerts: this.state.priceAlerts
    }));
    this.notify();
  },

  subscribe(listener) {
    this.listeners.push(listener);
  },

  notify() {
    this.listeners.forEach(fn => fn(this.state));
  },

  setRole(roleId) {
    this.state.currentRole = roleId;
    this.save();
  },

  setLanguage(langCode) {
    this.state.currentLanguage = langCode;
    this.save();
  },

  setLocation(locId) {
    const loc = window.KrishiData.locations.find(l => l.id === locId);
    if (loc) {
      this.state.currentLocation = loc;
      this.save();
    }
  },

  setRadius(radiusKm) {
    this.state.searchRadiusKm = Number(radiusKm);
    this.save();
  },

  setTab(tabId) {
    this.state.currentTab = tabId;
    this.notify();
  },

  addNegotiation(negotiationObj) {
    this.state.negotiations.unshift(negotiationObj);
    this.save();
  },

  updateNegotiation(id, updates) {
    const idx = this.state.negotiations.findIndex(n => n.id === id);
    if (idx !== -1) {
      this.state.negotiations[idx] = { ...this.state.negotiations[idx], ...updates };
      this.save();
    }
  },

  addBooking(bookingObj) {
    this.state.bookings.unshift(bookingObj);
    this.save();
  },

  addCropListing(listingObj) {
    this.state.cropListings.unshift(listingObj);
    this.save();
  }
};

window.KrishiStore.init();
