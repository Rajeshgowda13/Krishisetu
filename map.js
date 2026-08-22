/**
 * KrishiSetu AI — Map + Mandi List v3
 * Shows full mandi details list ABOVE the interactive Leaflet map.
 */
window.KrishiMap = {
  map: null,
  view: 'list', // 'list' | 'map'

  render() {
    const loc = window.KrishiStore.state.currentLocation;

    return `
    <div class="anim-in" style="display:flex;flex-direction:column;gap:1.25rem;">

      <!-- Banner -->
      <div style="background:linear-gradient(135deg,#0a1f14,#0d2b1c,#0f3521);border-radius:var(--radius-2xl);padding:1.25rem 1.5rem;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:1rem;border:1px solid rgba(255,255,255,0.07);">
        <div>
          <h2 style="font-size:1.2rem;font-weight:900;color:#fff;display:flex;align-items:center;gap:0.625rem;letter-spacing:-0.02em;">
            <i class="fa-solid fa-map-location-dot" style="color:#fbbf24;"></i> APMC Mandis & Agri Map
          </h2>
          <p style="font-size:0.78rem;color:rgba(255,255,255,0.5);margin-top:0.25rem;">
            Mandis · Nurseries · Tractors · Buyers · Workers — all near <strong style="color:#fbbf24;">${loc.name}, ${loc.district}</strong>
          </p>
        </div>

        <!-- View toggle -->
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.25rem;background:rgba(255,255,255,0.08);border-radius:var(--radius-lg);padding:0.25rem;">
          <button onclick="KrishiMap.view='list';KrishiRouter.render();" style="padding:0.5rem 1.25rem;border-radius:var(--radius-md);font-size:0.82rem;font-weight:800;border:none;cursor:pointer;font-family:var(--font);transition:all 0.15s;${this.view==='list' ? 'background:#fff;color:var(--green-800);box-shadow:0 2px 8px rgba(0,0,0,0.15);' : 'background:transparent;color:rgba(255,255,255,0.6);'}">
            <i class="fa-solid fa-list"></i> Mandi List
          </button>
          <button onclick="KrishiMap.view='map';KrishiRouter.render();" style="padding:0.5rem 1.25rem;border-radius:var(--radius-md);font-size:0.82rem;font-weight:800;border:none;cursor:pointer;font-family:var(--font);transition:all 0.15s;${this.view==='map' ? 'background:#fff;color:var(--green-800);box-shadow:0 2px 8px rgba(0,0,0,0.15);' : 'background:transparent;color:rgba(255,255,255,0.6);'}">
            <i class="fa-solid fa-map"></i> Live Map
          </button>
        </div>
      </div>

      ${this.view === 'list' ? this._mandiList(loc) : this._mapView(loc)}
    </div>`;
  },

  _mandiList(loc) {
    const mandis = [
      { name:'Mandya APMC Yard (Main)',   dist:1.4,  address:'APMC Road, Mandya 571401', phone:'08232-222401', commodities:['Tomato','Onion','Potato','Paddy','Sugarcane','Maize'], openDays:'Mon–Sat', timing:'6AM–1PM', marketFee:'1% + 0.5% Cess', facilities:['Cold Room','Weighbridge','Loading Bay','Canteen'], todayArrivals:'248 MT', verified:true, pinColor:'#22c55e', lat:12.5220, lng:76.8951 },
      { name:'Maddur Sub-Yard APMC',      dist:18.2, address:'Market Road, Maddur 571428', phone:'08232-256789', commodities:['Tomato','Chilli','Coconut','Ragi'], openDays:'Mon·Wed·Fri', timing:'6AM–12PM', marketFee:'1% + 0.5% Cess', facilities:['Weighbridge','Loading Bay'], todayArrivals:'64 MT', verified:true, pinColor:'#22c55e', lat:12.5766, lng:77.0444 },
      { name:'Pandavapura Sub-APMC',      dist:22.7, address:'NH-275, Pandavapura 571434', phone:'08232-278890', commodities:['Paddy','Ragi','Maize','Sugarcane'], openDays:'Tue·Thu·Sat', timing:'7AM–12PM', marketFee:'1% + 0.5% Cess', facilities:['Weighbridge'], todayArrivals:'38 MT', verified:true, pinColor:'#3b82f6', lat:12.4830, lng:76.6970 },
      { name:'Nagamangala APMC',          dist:38.4, address:'Market Circle, Nagamangala 571432', phone:'08234-232222', commodities:['Tomato','Onion','Potato','Garlic','Groundnut'], openDays:'Daily', timing:'5AM–2PM', marketFee:'1% + 0.5% Cess', facilities:['Cold Room','Weighbridge','Loading Bay'], todayArrivals:'112 MT', verified:true, pinColor:'#22c55e', lat:12.8196, lng:76.7521 },
      { name:'Kolar APMC (Tomato Mkt)',   dist:82.3, address:'APMC Yard, Kolar 563101', phone:'08152-243456', commodities:['Tomato (Specialist)','Potato','Capsicum'], openDays:'Daily', timing:'4AM–3PM', marketFee:'1% + 0.5% Cess', facilities:['Cold Room','Auction Hall','Processing Unit','Canteen'], todayArrivals:'1,240 MT', verified:true, pinColor:'#f59e0b', lat:13.1357, lng:78.1297 },
      { name:'Yeshwanthpur APMC (BNG)',   dist:138.0, address:'Tumkur Road, Yeshwanthpur, Bengaluru 560022', phone:'080-23374233', commodities:['All Vegetables','Fruits','Grains'], openDays:'Daily', timing:'3AM–6PM', marketFee:'1.5% + 0.5% Cess', facilities:['Cold Storage','Auction Halls','Labs','Canteen','ATM'], todayArrivals:'4,800 MT', verified:true, pinColor:'#f59e0b', lat:13.0216, lng:77.5570 },
    ];

    return `
    <!-- Mandi Cards -->
    <div style="display:flex;flex-direction:column;gap:1rem;">
      ${mandis.map(m => `
        <div class="card" style="padding:1.375rem;border-left:4px solid ${m.pinColor};">
          <div style="display:flex;flex-wrap:wrap;align-items:flex-start;justify-content:space-between;gap:0.875rem;margin-bottom:1rem;">
            <div>
              <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.3rem;flex-wrap:wrap;">
                <h3 style="font-size:0.95rem;font-weight:800;color:var(--text-main);">${m.name}</h3>
                ${m.verified ? `<span class="badge badge-green" style="font-size:0.62rem;">✅ Verified</span>` : ''}
              </div>
              <p style="font-size:0.72rem;color:var(--text-muted);">
                <i class="fa-solid fa-location-dot" style="color:#f59e0b;"></i> ${m.address}
              </p>
              <p style="font-size:0.72rem;color:var(--text-muted);margin-top:0.15rem;">
                📞 ${m.phone} &nbsp;·&nbsp; 📅 ${m.openDays} &nbsp;·&nbsp; 🕐 ${m.timing}
              </p>
            </div>
            <div style="text-align:right;flex-shrink:0;">
              <p style="font-size:0.65rem;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.05em;">Distance</p>
              <p style="font-size:1.2rem;font-weight:900;color:var(--text-main);">${m.dist} <span style="font-size:0.7rem;font-weight:600;color:var(--text-muted);">km</span></p>
              <p style="font-size:0.68rem;color:var(--text-muted);">📦 ${m.todayArrivals} today</p>
            </div>
          </div>

          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(13rem,1fr));gap:0.75rem;margin-bottom:1rem;">
            <div style="padding:0.75rem;background:var(--earth-50);border-radius:var(--radius-md);border:1px solid var(--border);">
              <p style="font-size:0.68rem;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.375rem;">Commodities Traded</p>
              <div style="display:flex;flex-wrap:wrap;gap:0.3rem;">
                ${m.commodities.map(c => `<span style="font-size:0.7rem;font-weight:700;color:var(--green-800);background:var(--green-100);border:1px solid var(--green-200);border-radius:99px;padding:0.15rem 0.5rem;">${c}</span>`).join('')}
              </div>
            </div>
            <div style="padding:0.75rem;background:#fffbeb;border-radius:var(--radius-md);border:1px solid #fde68a;">
              <p style="font-size:0.68rem;font-weight:700;color:#78350f;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.375rem;">Market Fee</p>
              <p style="font-size:0.85rem;font-weight:800;color:#92400e;">${m.marketFee}</p>
              <p style="font-size:0.68rem;font-weight:700;color:#78350f;text-transform:uppercase;letter-spacing:0.05em;margin:0.5rem 0 0.25rem;">Facilities</p>
              <p style="font-size:0.72rem;color:#92400e;">${m.facilities.join(' · ')}</p>
            </div>
          </div>

          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:0.5rem;">
            <a href="https://maps.google.com/?q=${m.lat},${m.lng}" target="_blank" class="btn btn-light btn-sm">
              <i class="fa-solid fa-map-location-dot" style="color:#f59e0b;"></i> Google Maps
            </a>
            <button onclick="KrishiUtils.toast('📞 Calling ${m.name}: ${m.phone}');" class="btn btn-primary btn-sm">
              Call APMC
            </button>
            <button onclick="KrishiStore.setTab('transport')" class="btn btn-gold btn-sm">
              🚚 Book Transport
            </button>
          </div>
        </div>
      `).join('')}
    </div>`;
  },

  _mapView(loc) {
    return `
    <!-- Legend -->
    <div style="display:flex;flex-wrap:wrap;gap:0.625rem;padding:0.75rem 1rem;background:var(--surface);border-radius:var(--radius-lg);border:1px solid var(--border);">
      ${[['📍','Your Farm','#22c55e'],['🏪','APMC Mandi','#f59e0b'],['🌱','Nursery','#16a34a'],['🚜','Tractor','#3b82f6'],['🛒','Buyer','#8b5cf6'],['👷','Worker','#e11d48']].map(([e,l,c]) => `
        <span style="display:flex;align-items:center;gap:0.35rem;font-size:0.72rem;font-weight:700;color:var(--text-muted);">${e} <span style="color:var(--text-main);">${l}</span></span>
      `).join('')}
    </div>

    <!-- Map -->
    <div id="agri-map" style="width:100%;height:520px;border-radius:var(--radius-2xl);overflow:hidden;border:1.5px solid var(--border);box-shadow:var(--shadow-lg);"></div>
    `;
  },

  initLeaflet() {
    const el = document.getElementById('agri-map');
    if (!el || typeof L === 'undefined') return;
    if (this.map) { try { this.map.remove(); } catch(e){} this.map = null; }

    const loc  = window.KrishiStore.state.currentLocation;
    this.map   = L.map('agri-map', { zoomControl: true }).setView([loc.lat, loc.lng], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18, attribution: '© OpenStreetMap | KrishiSetu AI'
    }).addTo(this.map);

    const makeIcon = (emoji, bg = '#fff') => L.divIcon({
      className: '',
      html: `<div style="width:2.25rem;height:2.25rem;border-radius:50%;background:${bg};box-shadow:0 3px 12px rgba(0,0,0,0.25);display:flex;align-items:center;justify-content:center;font-size:1.1rem;border:2.5px solid rgba(0,0,0,0.1);">${emoji}</div>`,
      iconSize:[36,36], iconAnchor:[18,36]
    });

    // Farm
    L.marker([loc.lat, loc.lng], { icon: makeIcon('📍','#dcfce7') }).addTo(this.map)
      .bindPopup(`<b>👨‍🌾 Your Farm</b><br>${loc.name}, ${loc.district}`).openPopup();

    // APMC mandis
    [
      { name:'Mandya APMC Main',         lat:12.5220, lng:76.8951 },
      { name:'Maddur Sub-APMC',          lat:12.5766, lng:77.0444 },
      { name:'Pandavapura Sub-APMC',     lat:12.4830, lng:76.6970 },
    ].forEach(m => L.marker([m.lat, m.lng], { icon: makeIcon('🏪','#fef3c7') }).addTo(this.map)
      .bindPopup(`<b>🏪 ${m.name}</b><br>APMC Market Yard`));

    // Nurseries
    window.KrishiData.nurseries.forEach(n =>
      L.marker([n.lat, n.lng], { icon: makeIcon('🌱','#dcfce7') }).addTo(this.map)
        .bindPopup(`<b>🌱 ${n.name}</b><br>${n.address}<br>⭐ ${n.rating} · <a href="tel:${n.phone}">📞 Call</a>`));

    // Tractors
    window.KrishiData.tractors.forEach(t =>
      L.marker([t.lat, t.lng], { icon: makeIcon('🚜','#dbeafe') }).addTo(this.map)
        .bindPopup(`<b>🚜 ${t.tractorModel}</b><br>Owner: ${t.ownerName}<br>₹${t.baseHourlyRate}/hr · ${t.hp} HP`));

    // Buyers
    window.KrishiData.buyers.forEach(b =>
      L.marker([b.lat, b.lng], { icon: makeIcon('🛒','#f3e8ff') }).addTo(this.map)
        .bindPopup(`<b>🛒 ${b.name}</b><br>${b.trustLabel}<br>₹${b.offeredPriceKg}/kg`));

    // Workers
    window.KrishiData.workers.forEach(w =>
      L.marker([w.lat, w.lng], { icon: makeIcon('👷','#ffe4e6') }).addTo(this.map)
        .bindPopup(`<b>👷 ${w.name}</b><br>${w.skills?.join(', ')}<br>₹${w.dailyWagePerWorker}/day`));
  }
};
