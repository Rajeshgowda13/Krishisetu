/**
 * KrishiSetu AI — Transport, Cold Storage, Seeds & Pesticides Pages
 * (Previously these incorrectly redirected to the map)
 */

/* ══════════════════════════════════════════════════════
   TRANSPORT PAGE
══════════════════════════════════════════════════════ */
window.KrishiTransport = {
  render() {
    return `
    <div class="anim-in" style="display:flex;flex-direction:column;gap:1.25rem;">

      <div style="background:linear-gradient(135deg,#0f172a,#1e293b,#1e3a5f);border-radius:var(--radius-2xl);padding:1.5rem;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:1rem;overflow:hidden;position:relative;">
        <div style="position:absolute;right:-2rem;top:-2rem;width:9rem;height:9rem;background:rgba(255,255,255,0.04);border-radius:50%;"></div>
        <div style="position:relative;z-index:1;">
          <span style="font-size:0.65rem;font-weight:800;letter-spacing:0.07em;text-transform:uppercase;color:rgba(255,255,255,0.55);">🚚 Agricultural Logistics</span>
          <h2 style="font-size:clamp(1.3rem,3.5vw,1.875rem);font-weight:900;color:#fff;letter-spacing:-0.025em;margin:0.3rem 0 0.375rem;">Find Agri Transport Near You</h2>
          <p style="font-size:0.82rem;color:rgba(255,255,255,0.65);">Book pickup trucks, mini-lorries & tippers for mandi deliveries · Compare per-km rates.</p>
        </div>
        <button onclick="KrishiTransport.postRequest()" class="btn btn-gold" style="flex-shrink:0;">
          <i class="fa-solid fa-plus"></i> Post a Trip Request
        </button>
      </div>

      <!-- Vehicle Cards -->
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(20rem,1fr));gap:1.125rem;">
        ${[
          { name:'Gowda Transport', owner:'Ravi Gowda', phone:'+91 98450 77889', vehicles:[{type:'Mini Lorry (1 Ton)',number:'KA-11-C-1234',rate:18},{type:'Tata 407 (2 Ton)',number:'KA-11-D-5678',rate:22}], dist:3.2, rating:4.8, trips:142, area:'Mandya → Bangalore · Mysuru', available:true },
          { name:'Krishnamurthy Carriers', owner:'Suresh K', phone:'+91 94481 66778', vehicles:[{type:'Tempo Traveller (500 kg)',number:'KA-09-E-9012',rate:14},{type:'Mini Truck (1.5 Ton)',number:'KA-09-F-3456',rate:20}], dist:6.7, rating:4.6, trips:98, area:'Mandya · Kolar · Hassan', available:true },
          { name:'Siddaraju Lorry Service', owner:'Siddaraju', phone:'+91 94481 33221', vehicles:[{type:'Tipper Lorry (5 Ton)',number:'KA-14-G-7890',rate:35}], dist:11.4, rating:4.5, trips:67, area:'Mandya → Bengaluru APMC', available:false },
        ].map(v => `
          <div class="card" style="padding:1.375rem;display:flex;flex-direction:column;gap:1rem;border-top:3px solid ${v.available?'#22c55e':'#94a3b8'};">
            <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:0.75rem;">
              <div>
                <h3 style="font-size:0.95rem;font-weight:800;color:var(--text-main);">${v.name}</h3>
                <p style="font-size:0.72rem;color:var(--text-muted);">Contact: ${v.owner} · ${v.dist} km away</p>
                <p style="font-size:0.72rem;color:var(--text-muted);">Routes: ${v.area}</p>
              </div>
              <span class="badge" style="${v.available?'background:#dcfce7;color:#15803d;border:1px solid #86efac;':'background:#f1f5f9;color:#64748b;border:1px solid #e2e8f0;'}">${v.available ? '🟢 Available' : '🔴 Busy'}</span>
            </div>

            <div style="border:1px solid var(--border);border-radius:var(--radius-lg);overflow:hidden;">
              ${v.vehicles.map(vh => `
                <div style="display:flex;align-items:center;justify-content:space-between;padding:0.6rem 0.875rem;border-bottom:1px solid var(--border);">
                  <div>
                    <p style="font-size:0.82rem;font-weight:700;color:var(--text-main);">🚚 ${vh.type}</p>
                    <p style="font-size:0.7rem;color:var(--text-muted);">Reg: ${vh.number}</p>
                  </div>
                  <p style="font-size:0.9rem;font-weight:800;color:var(--green-700);">₹${vh.rate}/km</p>
                </div>
              `).join('')}
            </div>

            <div style="display:flex;justify-content:space-between;align-items:center;font-size:0.78rem;">
              <span style="color:var(--text-muted);">⭐ ${v.rating} · ${v.trips} trips completed</span>
            </div>

            <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.625rem;border-top:1px solid var(--border);padding-top:0.75rem;">
              <button onclick="KrishiTransport.bookVehicle('${v.name}')" class="btn btn-primary btn-sm"><i class="fa-solid fa-truck"></i> Book Trip</button>
              <button onclick="KrishiUtils.toast('📞 Calling ${v.owner}: ${v.phone}');" class="btn btn-light btn-sm">Call Owner</button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>`;
  },

  bookVehicle(name) {
    KrishiUtils.openModal(`
      <h3 style="font-size:1.05rem;font-weight:900;color:var(--text-main);margin-bottom:1rem;padding-right:2rem;">📦 Book Trip — ${name}</h3>
      <div style="display:flex;flex-direction:column;gap:0.75rem;margin-bottom:1rem;">
        <div><label style="font-size:0.78rem;font-weight:700;color:var(--text-muted);display:block;margin-bottom:0.3rem;">Pickup Location</label><input type="text" placeholder="e.g. My Farm, Somanahalli" class="input"></div>
        <div><label style="font-size:0.78rem;font-weight:700;color:var(--text-muted);display:block;margin-bottom:0.3rem;">Drop Location (APMC / Buyer)</label><input type="text" placeholder="e.g. Kolar APMC Yard" class="input"></div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.5rem;">
          <div><label style="font-size:0.78rem;font-weight:700;color:var(--text-muted);display:block;margin-bottom:0.3rem;">Date & Time</label><input type="datetime-local" class="input"></div>
          <div><label style="font-size:0.78rem;font-weight:700;color:var(--text-muted);display:block;margin-bottom:0.3rem;">Load Weight (kg)</label><input type="number" placeholder="1500" class="input"></div>
        </div>
        <div><label style="font-size:0.78rem;font-weight:700;color:var(--text-muted);display:block;margin-bottom:0.3rem;">Produce Type</label><input type="text" placeholder="e.g. Tomato, Onion" class="input"></div>
      </div>
      <button onclick="KrishiUtils.toast('✅ Trip request sent to ${name}!','success');KrishiUtils.closeModal();" class="btn btn-primary btn-full">
        <i class="fa-solid fa-paper-plane"></i> Send Booking Request
      </button>
    `);
  },

  postRequest() {
    KrishiUtils.openModal(`
      <h3 style="font-size:1.05rem;font-weight:900;color:var(--text-main);margin-bottom:1rem;padding-right:2rem;">📢 Post a Transport Request</h3>
      <p style="font-size:0.78rem;color:var(--text-muted);margin-bottom:1rem;">All registered transport providers will see your request and contact you directly.</p>
      <div style="display:flex;flex-direction:column;gap:0.75rem;margin-bottom:1rem;">
        <div><label style="font-size:0.78rem;font-weight:700;color:var(--text-muted);display:block;margin-bottom:0.3rem;">From → To (Route)</label><input type="text" placeholder="e.g. Mandya → Kolar APMC" class="input"></div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.5rem;">
          <div><label style="font-size:0.78rem;font-weight:700;color:var(--text-muted);display:block;margin-bottom:0.3rem;">Date & Time</label><input type="datetime-local" class="input"></div>
          <div><label style="font-size:0.78rem;font-weight:700;color:var(--text-muted);display:block;margin-bottom:0.3rem;">Budget (₹)</label><input type="number" placeholder="2500" class="input"></div>
        </div>
      </div>
      <button onclick="KrishiUtils.toast('✅ Request posted! Transport owners will call you.','success');KrishiUtils.closeModal();" class="btn btn-gold btn-full">Post Request</button>
    `);
  }
};

/* ══════════════════════════════════════════════════════
   COLD STORAGE PAGE
══════════════════════════════════════════════════════ */
window.KrishiColdStorage = {
  render() {
    return `
    <div class="anim-in" style="display:flex;flex-direction:column;gap:1.25rem;">

      <div style="background:linear-gradient(135deg,#1e3a8a,#1d4ed8,#2563eb);border-radius:var(--radius-2xl);padding:1.5rem;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:1rem;overflow:hidden;position:relative;">
        <div style="position:relative;z-index:1;">
          <span style="font-size:0.65rem;font-weight:800;letter-spacing:0.07em;text-transform:uppercase;color:rgba(255,255,255,0.6);">🧊 Post-Harvest Preservation</span>
          <h2 style="font-size:clamp(1.3rem,3.5vw,1.875rem);font-weight:900;color:#fff;letter-spacing:-0.025em;margin:0.3rem 0 0.375rem;">Cold Storage & Warehouse Facilities</h2>
          <p style="font-size:0.82rem;color:rgba(255,255,255,0.7);">Book refrigerated storage space · Preserve harvest quality · Wait for better prices.</p>
        </div>
        <div style="background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:var(--radius-lg);padding:0.75rem 1rem;font-size:0.82rem;color:#fff;flex-shrink:0;">
          <p style="font-weight:800;">💡 Tip: Cold storage reduces crop loss by <span style="color:#fbbf24;">up to 40%</span></p>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(20rem,1fr));gap:1.125rem;">
        ${[
          { name:'Karnataka State Warehousing Cold Store', location:'APMC Yard, Mandya', dist:1.4, temp:'-2°C to 4°C', capacity:500, available:120, pricePerQtl:45, crops:['Tomato','Potato','Onion'], rating:4.7, phone:'+91 820 2224455', certPhi:true },
          { name:'Mandya DCCB Cold Storage Facility', location:'Near KSRTC Bus Stand, Mandya', dist:2.8, temp:'0°C to 8°C', capacity:800, available:340, pricePerQtl:38, crops:['Vegetables','Fruits','Grains'], rating:4.4, phone:'+91 820 2230033', certPhi:false },
          { name:'Sri Venkateshwara Refrigerated Godown', location:'Mysuru Road, Kirugavalu', dist:14.6, temp:'-1°C to 6°C', capacity:300, available:60, pricePerQtl:50, crops:['Tomato','Chilli','Leafy Greens'], rating:4.9, phone:'+91 94481 88990', certPhi:true },
        ].map(s => `
          <div class="card" style="padding:1.375rem;display:flex;flex-direction:column;gap:1rem;border-top:3px solid #2563eb;">
            <div>
              <h3 style="font-size:0.92rem;font-weight:800;color:var(--text-main);line-height:1.3;margin-bottom:0.3rem;">${s.name}</h3>
              <p style="font-size:0.72rem;color:var(--text-muted);">${s.location} · ${s.dist} km away</p>
              ${s.certPhi ? `<span class="badge badge-green" style="font-size:0.65rem;margin-top:0.3rem;">✅ FSSAI Certified</span>` : ''}
            </div>

            <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:0.5rem;font-size:0.78rem;">
              <div style="padding:0.625rem;background:#eff6ff;border-radius:var(--radius-md);text-align:center;">
                <p style="font-weight:800;color:#1d4ed8;">🌡️ ${s.temp}</p>
                <p style="font-size:0.65rem;color:#3b82f6;">Temperature Range</p>
              </div>
              <div style="padding:0.625rem;background:#f0fdf4;border-radius:var(--radius-md);text-align:center;">
                <p style="font-weight:800;color:var(--green-700);">${s.available}T Free</p>
                <p style="font-size:0.65rem;color:var(--green-600);">of ${s.capacity}T Capacity</p>
              </div>
            </div>

            <div style="padding:0.875rem;background:var(--earth-50);border-radius:var(--radius-lg);border:1px solid var(--border);">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.375rem;">
                <span style="font-size:0.75rem;color:var(--text-muted);">Storage Rate:</span>
                <span style="font-size:1rem;font-weight:900;color:var(--green-700);">₹${s.pricePerQtl}/quintal/month</span>
              </div>
              <div style="font-size:0.72rem;color:var(--text-muted);">Crops Accepted: <strong style="color:var(--text-main);">${s.crops.join(' · ')}</strong></div>
              <div style="font-size:0.72rem;color:var(--text-muted);margin-top:0.2rem;">⭐ ${s.rating} · 24/7 Security · CCTV</div>
            </div>

            <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.625rem;">
              <button onclick="KrishiColdStorage.book('${s.name}')" class="btn btn-primary btn-sm">🧊 Book Space</button>
              <button onclick="KrishiUtils.toast('📞 Calling: ${s.phone}');" class="btn btn-light btn-sm">Call Now</button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>`;
  },

  book(name) {
    KrishiUtils.openModal(`
      <h3 style="font-size:1.05rem;font-weight:900;color:var(--text-main);margin-bottom:1rem;padding-right:2rem;">🧊 Book Cold Storage — ${name.split(' ').slice(0,3).join(' ')}…</h3>
      <div style="display:flex;flex-direction:column;gap:0.75rem;margin-bottom:1rem;">
        <div><label style="font-size:0.78rem;font-weight:700;color:var(--text-muted);display:block;margin-bottom:0.3rem;">Crop Name</label><input type="text" placeholder="e.g. Tomato (Hybrid)" class="input"></div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.5rem;">
          <div><label style="font-size:0.78rem;font-weight:700;color:var(--text-muted);display:block;margin-bottom:0.3rem;">Quantity (Quintals)</label><input type="number" placeholder="50" class="input" id="cs-qty" oninput="KrishiColdStorage.calcCost(45)"></div>
          <div><label style="font-size:0.78rem;font-weight:700;color:var(--text-muted);display:block;margin-bottom:0.3rem;">Duration (Months)</label><input type="number" placeholder="1" class="input" id="cs-mon" oninput="KrishiColdStorage.calcCost(45)"></div>
        </div>
        <div><label style="font-size:0.78rem;font-weight:700;color:var(--text-muted);display:block;margin-bottom:0.3rem;">Entry Date</label><input type="date" class="input"></div>
      </div>
      <div style="padding:0.875rem;background:#f0fdf4;border-radius:var(--radius-lg);border:1px solid #86efac;display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
        <span style="font-size:0.85rem;font-weight:700;color:#14532d;">Estimated Cost:</span>
        <span id="cs-cost" style="font-size:1.2rem;font-weight:900;color:var(--green-700);">₹—</span>
      </div>
      <button onclick="KrishiUtils.toast('✅ Cold storage booked! You will receive an SMS confirmation.','success');KrishiUtils.closeModal();" class="btn btn-primary btn-full">Confirm Booking</button>
    `);
  },

  calcCost(rate) {
    const qty = Number(document.getElementById('cs-qty')?.value) || 0;
    const mon = Number(document.getElementById('cs-mon')?.value) || 0;
    const el  = document.getElementById('cs-cost');
    if (el) el.textContent = KrishiUtils.formatINR(qty * rate * mon);
  }
};

/* ══════════════════════════════════════════════════════
   SEEDS PAGE
══════════════════════════════════════════════════════ */
window.KrishiSeeds = {
  render() {
    return `
    <div class="anim-in" style="display:flex;flex-direction:column;gap:1.25rem;">

      <div class="banner-emerald" style="border-radius:var(--radius-2xl);padding:1.5rem;overflow:hidden;position:relative;">
        <div style="position:relative;z-index:1;">
          <span style="font-size:0.65rem;font-weight:800;letter-spacing:0.07em;text-transform:uppercase;color:rgba(255,255,255,0.6);">🌾 Certified Seed & Grain Marketplace</span>
          <h2 style="font-size:clamp(1.3rem,3.5vw,1.875rem);font-weight:900;color:#fff;letter-spacing:-0.025em;margin:0.3rem 0 0.375rem;">Seeds, Hybrids & Grain Varieties</h2>
          <p style="font-size:0.82rem;color:rgba(255,255,255,0.7);">Certified hybrid seeds from verified dealers · Compare germination rates & prices nearby.</p>
        </div>
      </div>

      <!-- AI Recommendation -->
      <div class="card" style="padding:1.375rem;border:1.5px solid #86efac;background:#f0fdf4;">
        <span class="badge badge-green" style="margin-bottom:0.625rem;">🤖 AI Recommendation — August Kharif Season</span>
        <p style="font-size:0.85rem;color:#14532d;font-weight:600;line-height:1.5;">Based on Mandya's <strong>Red Loamy Soil</strong>, <strong>monsoon forecast</strong> and current mandi prices, the top 3 seeds to buy this month are: <strong>Arka Rakshak Tomato</strong>, <strong>Byadgi Chilli</strong>, and <strong>NMH-803 Maize hybrid</strong>.</p>
      </div>

      <!-- Seed Catalog -->
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(20rem,1fr));gap:1.125rem;">
        ${[
          { name:'Arka Rakshak F1 Tomato Seeds', brand:'IIHR / Bayer', unit:'10g packet', price:180, germination:92, season:'Year-round', bestFor:'High blight resistance · Mandya / Kolar region', available:true, dealer:'Sri Krishna Agri Centre' },
          { name:'Byadgi Chilli NS-1701 Seeds', brand:'Namdhari Seeds', unit:'10g packet', price:220, germination:88, season:'June–August', bestFor:'Dry powder · High yield · Dharwad / Mandya', available:true, dealer:'Ramesh Agri Store' },
          { name:'NMH-803 Maize Hybrid Seeds', brand:'Nuziveedu Seeds', unit:'4 kg bag', price:850, germination:95, season:'May–July', bestFor:'FCI MSP support · Drought tolerant', available:true, dealer:'Sri Krishna Agri Centre' },
          { name:'Pusa-1 Paddy Variety Seeds', brand:'ICAR / Govt Approved', unit:'5 kg bag', price:340, germination:90, season:'June–Sept', bestFor:'Kharif crop · Mandya / Mysuru river belt', available:false, dealer:'Govt Seed Corporation, Mandya' },
          { name:'Arka Nidhi Brinjal Seeds', brand:'IIHR', unit:'5g packet', price:95, germination:87, season:'All Season', bestFor:'Purple-firm · High shelf life', available:true, dealer:'Sri Lakshmi Nursery' },
          { name:'Taiwan Pink Guava Seeds', brand:'Tamil Nadu Agri Uni.', unit:'25 seeds', price:280, germination:82, season:'Feb–June', bestFor:'Perennial fruit crop · High profitability', available:true, dealer:'Sri Lakshmi Nursery' },
        ].map(s => `
          <div class="card" style="padding:1.25rem;display:flex;flex-direction:column;gap:0.875rem;border-left:4px solid ${s.available?'var(--green-500)':'#94a3b8'};">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:0.75rem;">
              <div>
                <h3 style="font-size:0.9rem;font-weight:800;color:var(--text-main);line-height:1.3;">${s.name}</h3>
                <p style="font-size:0.72rem;color:var(--text-muted);">${s.brand} · ${s.unit}</p>
              </div>
              <span class="badge ${s.available?'badge-green':'badge-rose'}">${s.available?'✅ In Stock':'❌ Out of Stock'}</span>
            </div>
            <div style="padding:0.875rem;background:var(--earth-50);border-radius:var(--radius-lg);border:1px solid var(--border);font-size:0.78rem;display:flex;flex-direction:column;gap:0.35rem;">
              <div style="display:flex;justify-content:space-between;"><span style="color:var(--text-muted);">Germination Rate:</span><strong style="color:var(--green-700);">${s.germination}%</strong></div>
              <div style="display:flex;justify-content:space-between;"><span style="color:var(--text-muted);">Best Season:</span><strong>${s.season}</strong></div>
              <div style="color:var(--text-muted);">Best For: <strong style="color:var(--text-main);">${s.bestFor}</strong></div>
            </div>
            <div style="display:flex;align-items:center;justify-content:space-between;">
              <div><p style="font-size:0.68rem;color:var(--text-muted);">Dealer: ${s.dealer}</p></div>
              <p style="font-size:1.15rem;font-weight:900;color:var(--green-700);">₹${s.price}</p>
            </div>
            <button onclick="KrishiUtils.toast('📦 Added to cart — ${s.name}!','success');" class="btn ${s.available?'btn-primary':'btn-light'} btn-sm btn-full" ${!s.available?'disabled':''}>
              ${s.available ? '<i class="fa-solid fa-cart-plus"></i> Order from Dealer' : 'Currently Unavailable'}
            </button>
          </div>
        `).join('')}
      </div>
    </div>`;
  }
};

/* ══════════════════════════════════════════════════════
   PESTICIDES & CROP PROTECTION PAGE
══════════════════════════════════════════════════════ */
window.KrishiPesticides = {
  sub: 'bio',

  render() {
    return `
    <div class="anim-in" style="display:flex;flex-direction:column;gap:1.25rem;">

      <div style="background:linear-gradient(135deg,#3b0764,#5b21b6,#6d28d9);border-radius:var(--radius-2xl);padding:1.5rem;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:1rem;overflow:hidden;position:relative;">
        <div style="position:relative;z-index:1;">
          <span style="font-size:0.65rem;font-weight:800;letter-spacing:0.07em;text-transform:uppercase;color:rgba(255,255,255,0.6);">🛡️ Integrated Pest Management</span>
          <h2 style="font-size:clamp(1.3rem,3.5vw,1.875rem);font-weight:900;color:#fff;letter-spacing:-0.025em;margin:0.3rem 0 0.375rem;">Pesticides & Crop Protection</h2>
          <p style="font-size:0.82rem;color:rgba(255,255,255,0.7);">Compare bio and chemical pest controls · Get AI-suggested dosage · Locate nearest dealer.</p>
        </div>
        <button onclick="KrishiStore.setTab('disease_scan')" class="btn btn-ghost btn-sm" style="flex-shrink:0;">
          <i class="fa-solid fa-camera"></i> Scan My Crop
        </button>
      </div>

      <!-- Subtabs -->
      <div style="display:flex;">
        <div class="subtab-bar">
          <button onclick="KrishiPesticides.sub='bio';KrishiRouter.render();" class="subtab-btn ${this.sub==='bio'?'active':''}">🌿 Bio / Organic</button>
          <button onclick="KrishiPesticides.sub='chemical';KrishiRouter.render();" class="subtab-btn ${this.sub==='chemical'?'active':''}">🧪 Chemical</button>
          <button onclick="KrishiPesticides.sub='fungicide';KrishiRouter.render();" class="subtab-btn ${this.sub==='fungicide'?'active':''}">🍄 Fungicides</button>
          <button onclick="KrishiPesticides.sub='dealers';KrishiRouter.render();" class="subtab-btn ${this.sub==='dealers'?'active':''}">🏪 Dealers</button>
        </div>
      </div>

      ${this.sub === 'bio'      ? this._bio()      : ''}
      ${this.sub === 'chemical' ? this._chemical() : ''}
      ${this.sub === 'fungicide'? this._fungicide(): ''}
      ${this.sub === 'dealers'  ? this._dealers()  : ''}
    </div>`;
  },

  _productCard(p) {
    return `
      <div class="card" style="padding:1.25rem;display:flex;flex-direction:column;gap:0.875rem;border-top:3px solid ${p.borderColor};">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:0.75rem;">
          <div>
            <span class="badge ${p.organic ? 'badge-green' : 'badge-purple'}" style="margin-bottom:0.5rem;">${p.tag}</span>
            <h3 style="font-size:0.9rem;font-weight:800;color:var(--text-main);line-height:1.3;">${p.name}</h3>
            <p style="font-size:0.72rem;color:var(--text-muted);">${p.brand} · ${p.unit}</p>
          </div>
          <p style="font-size:1.1rem;font-weight:900;color:var(--green-700);flex-shrink:0;">₹${p.price}</p>
        </div>
        <div style="padding:0.75rem;background:var(--earth-50);border-radius:var(--radius-md);border:1px solid var(--border);font-size:0.78rem;">
          <p style="color:var(--text-muted);">Targets: <strong style="color:var(--text-main);">${p.targets}</strong></p>
          <p style="color:var(--text-muted);margin-top:0.2rem;">Dose: <strong style="color:var(--text-main);">${p.dose}</strong></p>
          <p style="color:var(--text-muted);margin-top:0.2rem;">PHI: <strong style="color:var(--text-main);">${p.phi}</strong></p>
        </div>
        <button onclick="KrishiUtils.toast('📦 Added to cart — ${p.name}!','success');" class="btn btn-primary btn-sm btn-full">Order from Dealer</button>
      </div>`;
  },

  _bio() {
    const products = [
      { name:'Neem Oil Extract (1000ppm)', brand:'Multiplex / AgroTech', unit:'1 Litre', price:220, targets:'Aphids · Whitefly · Mites · Thrips', dose:'5ml/litre water', phi:'0 days (organic safe)', tag:'🌿 Bio-Pesticide', organic:true, borderColor:'#22c55e' },
      { name:'Azadirachtin 0.03% EC', brand:'Godrej Agrovet', unit:'500 ml', price:380, targets:'Leaf miner · Thrips · Whitefly', dose:'2ml/litre', phi:'3 days', tag:'🌿 Neem Based', organic:true, borderColor:'#22c55e' },
      { name:'Beauveria bassiana 1% WP', brand:'T Stanes Biocraft', unit:'250g', price:280, targets:'Borers · White grub · Cutworm', dose:'5g/litre', phi:'0 days', tag:'🦠 Entomopathogen', organic:true, borderColor:'#16a34a' },
      { name:'Bacillus thuringiensis (Bt) WP', brand:'Biopesticides Ltd', unit:'500g', price:320, targets:'Diamond Back Moth · Helicoverpa', dose:'1.5g/litre', phi:'1 day', tag:'🦠 Biological', organic:true, borderColor:'#16a34a' },
    ];
    return `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(18rem,1fr));gap:1rem;">${products.map(p => this._productCard(p)).join('')}</div>`;
  },

  _chemical() {
    const products = [
      { name:'Imidacloprid 17.8% SL', brand:'Bayer CropScience', unit:'100ml', price:180, targets:'Sucking pests · BPH · Jassids', dose:'0.3ml/litre', phi:'7 days', tag:'⚠️ Systemic', organic:false, borderColor:'#f59e0b' },
      { name:'Chlorpyrifos 20% EC', brand:'Dhanuka Agritech', unit:'500ml', price:210, targets:'Stem borer · Cutworm · Termite', dose:'2.5ml/litre', phi:'14 days', tag:'⚠️ Contact+Systemic', organic:false, borderColor:'#f59e0b' },
      { name:'Lambda-cyhalothrin 4.9% CS', brand:'Syngenta India', unit:'50ml', price:145, targets:'Bollworm · Helicoverpa · Thrips', dose:'0.75ml/litre', phi:'7 days', tag:'⚠️ Pyrethroid', organic:false, borderColor:'#ef4444' },
      { name:'Fipronil 5% SC', brand:'BASF India', unit:'200ml', price:285, targets:'Brown planthopper · Stem borer', dose:'1.5ml/litre', phi:'10 days', tag:'⚠️ Phenylpyrazole', organic:false, borderColor:'#ef4444' },
    ];
    return `
      <div style="padding:0.75rem 0.875rem;background:#fffbeb;border-radius:var(--radius-lg);border:1px solid #fde68a;display:flex;gap:0.625rem;margin-bottom:0.5rem;">
        <i class="fa-solid fa-triangle-exclamation" style="color:#d97706;flex-shrink:0;margin-top:0.1rem;"></i>
        <p style="font-size:0.78rem;color:#78350f;line-height:1.45;"><strong>Safety Notice:</strong> Always wear protective gear. Follow label PHI (Pre-Harvest Interval). Never spray near water bodies. Dispose empty containers safely. Rotate chemicals to prevent resistance.</p>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(18rem,1fr));gap:1rem;">${products.map(p => this._productCard(p)).join('')}</div>`;
  },

  _fungicide() {
    const products = [
      { name:'Mancozeb 75% WP', brand:'UPL India', unit:'500g', price:145, targets:'Early blight · Downy mildew · Late blight', dose:'2.5g/litre', phi:'7 days', tag:'🍄 Protectant', organic:false, borderColor:'#8b5cf6' },
      { name:'Metalaxyl + Mancozeb 72% WP', brand:'Syngenta', unit:'500g', price:280, targets:'Late blight · Damping-off · Phytophthora', dose:'2g/litre', phi:'7 days', tag:'🍄 Systemic+Contact', organic:false, borderColor:'#8b5cf6' },
      { name:'Trichoderma viride 1.5% WP', brand:'T Stanes Biocraft', unit:'250g', price:180, targets:'Root rot · Fusarium wilt · Collar rot', dose:'5g/kg soil', phi:'0 days', tag:'🌿 Bio-Fungicide', organic:true, borderColor:'#22c55e' },
    ];
    return `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(18rem,1fr));gap:1rem;">${products.map(p => this._productCard(p)).join('')}</div>`;
  },

  _dealers() {
    return `
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(20rem,1fr));gap:1rem;">
        ${window.KrishiData.suppliers.map(s => `
          <div class="card" style="padding:1.25rem;display:flex;flex-direction:column;gap:0.875rem;border-top:3px solid #7c3aed;">
            <div>
              <span class="badge badge-purple" style="margin-bottom:0.5rem;">${s.type}</span>
              <h3 style="font-size:0.9rem;font-weight:800;color:var(--text-main);">${s.name}</h3>
              <p style="font-size:0.72rem;color:var(--text-muted);">${s.address}</p>
            </div>
            <div style="border:1px solid var(--border);border-radius:var(--radius-md);overflow:hidden;">
              ${s.products.slice(0,3).map(pr => `
                <div class="product-row" style="padding:0.5rem 0.875rem;">
                  <div><p class="product-name">${pr.name}</p><p class="product-sub">${pr.category}</p></div>
                  <p class="product-price">₹${pr.price}</p>
                </div>
              `).join('')}
            </div>
            <button onclick="KrishiUtils.toast('📞 Calling ${s.name}: ${s.phone}');" class="btn btn-primary btn-sm btn-full">Call Verified Dealer</button>
          </div>
        `).join('')}
      </div>`;
  }
};
