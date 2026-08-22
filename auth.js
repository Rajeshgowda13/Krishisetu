/**
 * KrishiSetu AI — Authentication System (localStorage-based)
 */
window.KrishiAuth = {
  STORAGE_KEY: 'ks_auth_v1',
  USERS_KEY:   'ks_users_v1',

  /* ── Seed demo users ── */
  _seedUsers() {
    if (localStorage.getItem(this.USERS_KEY)) return;
    const demo = [
      { id:'u-1', role:'farmer',        name:'Basavanagowda Patil',   phone:'+91 98450 11223', email:'farmer@demo.com',    password:'demo1234', district:'Mandya',   state:'Karnataka', farmSizeAcres:4.5,  soilType:'Red Loamy Soil',   currentCrops:['Tomato (Hybrid)','Green Chilli','Sugarcane'],  irrigationType:'Drip & Borewell',   farmingMethod:'Semi-Organic', profilePhoto:'👨‍🌾', village:'Somanahalli', taluk:'Mandya' },
      { id:'u-2', role:'buyer',         name:'Suresh Merchants',      phone:'+91 98220 33445', email:'buyer@demo.com',     password:'demo1234', district:'Bangalore', state:'Karnataka', businessName:'Suresh Wholesale Pvt Ltd', cropsPurchased:['Tomato','Onion','Chilli'], paymentTerms:'Spot Cash', profilePhoto:'🛒', gstNumber:'29ABCDE1234F1Z5' },
      { id:'u-3', role:'tractor_owner', name:'Kumar Swamy',           phone:'+91 94481 55667', email:'tractor@demo.com',   password:'demo1234', district:'Mandya',   state:'Karnataka', tractorModel:'Mahindra 575 DI', hp:50, attachments:['Plough','Rotavator','Seeder'], baseHourlyRate:700, profilePhoto:'🚜', village:'Kirugavalu', taluk:'Maddur' },
      { id:'u-4', role:'farm_laborer',  name:'Nagaraju',              phone:'+91 94481 77889', email:'worker@demo.com',    password:'demo1234', district:'Mandya',   state:'Karnataka', teamSize:5, skills:['Harvesting','Weeding','Transplanting'], dailyWage:500, profilePhoto:'👷', village:'Pandavapura', taluk:'Pandavapura' },
      { id:'u-5', role:'nursery',       name:'Sri Lakshmi Nursery',   phone:'+91 94481 22334', email:'nursery@demo.com',   password:'demo1234', district:'Mandya',   state:'Karnataka', ownerName:'Lakshmi Devi',  openingHours:'7AM–7PM', speciality:'Vegetable & Fruit Saplings', profilePhoto:'🌱', address:'Mandya Main Road' },
      { id:'u-6', role:'agri_store',    name:'Ramesh Agri Centre',    phone:'+91 94481 44556', email:'store@demo.com',     password:'demo1234', district:'Mandya',   state:'Karnataka', ownerName:'Ramesh Gowda', brands:['Bayer','UPL','Syngenta'], profilePhoto:'🏪', address:'Near APMC Yard, Mandya' },
      { id:'u-7', role:'transport',     name:'Gowda Transport',       phone:'+91 98450 77889', email:'transport@demo.com', password:'demo1234', district:'Mandya',   state:'Karnataka', ownerName:'Ravi Gowda',   vehicles:[{type:'Mini Lorry 1T',number:'KA-11-C-1234',ratePerKm:18},{type:'Tata 407 2T',number:'KA-11-D-5678',ratePerKm:22}], profilePhoto:'🚚', serviceArea:'Mandya to Bangalore' },
      { id:'u-8', role:'irrigation',    name:'AquaFlow Irrigation',   phone:'+91 94481 99001', email:'irr@demo.com',       password:'demo1234', district:'Mandya',   state:'Karnataka', ownerName:'Pradeep Kumar', brands:['Netafim','Jain','NaanDan'], subsidyAssist:true, profilePhoto:'💧', address:'Mysuru Road, Mandya' },
    ];
    localStorage.setItem(this.USERS_KEY, JSON.stringify(demo));
  },

  init() {
    this._seedUsers();
    return this.getSession();
  },

  getSession() {
    try { return JSON.parse(localStorage.getItem(this.STORAGE_KEY)); } catch { return null; }
  },

  getUsers() {
    try { return JSON.parse(localStorage.getItem(this.USERS_KEY)) || []; } catch { return []; }
  },

  saveUsers(users) {
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  },

  login(identifier, password) {
    const users = this.getUsers();
    const user  = users.find(u => (u.email === identifier || u.phone === identifier) && u.password === password);
    if (!user) return { ok: false, error: 'Invalid credentials. Check your Email/Phone and Password.' };
    const session = { userId: user.id, role: user.role, name: user.name };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(session));
    return { ok: true, user };
  },

  register(data) {
    const users = this.getUsers();
    if (users.find(u => u.email === data.email)) return { ok: false, error: 'An account with this email already exists.' };
    const user = { ...data, id: 'u-' + Date.now() };
    users.push(user);
    this.saveUsers(users);
    const session = { userId: user.id, role: user.role, name: user.name };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(session));
    return { ok: true, user };
  },

  logout() {
    localStorage.removeItem(this.STORAGE_KEY);
  },

  getCurrentUser() {
    const s = this.getSession();
    if (!s) return null;
    return this.getUsers().find(u => u.id === s.userId) || null;
  },

  updateProfile(updates) {
    const users = this.getUsers();
    const idx   = users.findIndex(u => u.id === updates.id);
    if (idx === -1) return false;
    users[idx] = { ...users[idx], ...updates };
    this.saveUsers(users);
    return true;
  }
};
