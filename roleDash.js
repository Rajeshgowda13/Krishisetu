/**
 * KrishiSetu AI — Role-Specific Home Dashboards
 * Each role sees a completely different home view.
 */
window.KrishiRoleDash = {

  render() {
    const user = KrishiAuth.getCurrentUser();
    if (!user) return KrishiFarmerHome.render();

    switch(user.role) {
      case 'farmer':        return KrishiFarmerHome.render();
      case 'buyer':         return this.buyer(user);
      case 'tractor_owner': return this.tractorOwner(user);
      case 'tractor_driver':return this.tractorDriver(user);
      case 'farm_laborer':  return this.farmLaborer(user);
      case 'nursery':       return this.nurseryOwner(user);
      case 'agri_store':    return this.agriStore(user);
      case 'transport':     return this.transportProvider(user);
      case 'irrigation':    return this.irrigationDealer(user);
      case 'manure':        return this.manureSupplier(user);
      default:              return KrishiFarmerHome.render();
    }
  },

  /* ─────────────────────────────────────────────────
     BUYER DASHBOARD
  ───────────────────────────────────────────────── */
  buyer(user) {
    const listings = KrishiStore.state.cropListings || [];
    return `
    <div class="anim-in" style="display:flex;flex-direction:column;gap:1.25rem;">

      <div class="banner-emerald" style="border-radius:var(--radius-2xl);padding:1.5rem;position:relative;overflow:hidden;">
        <div style="position:absolute;right:-3rem;top:-3rem;width:12rem;height:12rem;background:rgba(255,255,255,0.04);border-radius:50%;"></div>
        <div style="position:relative;z-index:1;display:flex;flex-wrap:wrap;align-items:flex-start;justify-content:space-between;gap:1rem;">
          <div>
            <div style="display:inline-flex;align-items:center;gap:0.4rem;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:99px;padding:0.25rem 0.75rem;margin-bottom:0.75rem;">
              <span style="font-size:1rem;">🛒</span>
              <span style="font-size:0.7rem;font-weight:700;color:rgba(255,255,255,0.85);letter-spacing:0.04em;">BUYER DASHBOARD</span>
            </div>
            <h2 style="font-size:clamp(1.3rem,4vw,1.875rem);font-weight:900;color:#fff;letter-spacing:-0.025em;margin-bottom:0.5rem;">Welcome, ${user.name.split(' ')[0]} 🛒</h2>
            <p style="font-size:0.82rem;color:rgba(255,255,255,0.65);">Browse verified crop listings · Post purchase requirements · Manage offers</p>
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:0.5rem;">
            <div style="padding:0.875rem 1rem;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.15);border-radius:var(--radius-lg);text-align:center;">
              <p style="font-size:1.5rem;font-weight:900;color:#fff;">${listings.length}</p>
              <p style="font-size:0.65rem;color:rgba(255,255,255,0.6);">Active Listings</p>
            </div>
            <div style="padding:0.875rem 1rem;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.15);border-radius:var(--radius-lg);text-align:center;">
              <p style="font-size:1.5rem;font-weight:900;color:#fbbf24;">4</p>
              <p style="font-size:0.65rem;color:rgba(255,255,255,0.6);">Open Negotiations</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(11rem,1fr));gap:0.875rem;">
        ${[
          { icon:'🥕', label:'Browse Crop Listings', sub:'Fresh harvest near you', tab:'buyers', color:'#dcfce7', border:'#86efac', textColor:'#14532d' },
          { icon:'📢', label:'Post Buy Requirement', sub:'Let farmers reach you', tab:'buyers', color:'#dbeafe', border:'#93c5fd', textColor:'#1e3a8a' },
          { icon:'💰', label:'Track Offers', sub:'4 active negotiations', tab:'sell_smart', color:'#fffbeb', border:'#fde68a', textColor:'#78350f' },
          { icon:'🗺️', label:'Farmer Locations Map', sub:'Nearby farms with GPS', tab:'map', color:'#f3e8ff', border:'#e9d5ff', textColor:'#6b21a8' },
        ].map(t => `
          <div onclick="KrishiStore.setTab('${t.tab}')" class="card card-interactive" style="padding:1.125rem;background:${t.color};border:1.5px solid ${t.border};cursor:pointer;">
            <div style="font-size:1.75rem;margin-bottom:0.5rem;">${t.icon}</div>
            <p style="font-size:0.82rem;font-weight:800;color:${t.textColor};">${t.label}</p>
            <p style="font-size:0.7rem;color:${t.textColor};opacity:0.75;margin-top:0.2rem;">${t.sub}</p>
          </div>
        `).join('')}
      </div>

      <!-- Available Crop Listings -->
      <div class="section-header">
        <h3 class="section-title"><i class="fa-solid fa-wheat-awn" style="color:var(--green-600);"></i> Fresh Crop Listings Nearby</h3>
        <span class="section-badge">${listings.length} Available</span>
      </div>

      <div style="display:flex;flex-direction:column;gap:0.75rem;">
        ${listings.map(l => `
          <div class="card" style="padding:1.125rem;display:flex;align-items:center;justify-content:space-between;gap:1rem;flex-wrap:wrap;border-left:4px solid var(--green-500);">
            <div style="display:flex;align-items:center;gap:0.875rem;">
              <span style="font-size:2rem;">${l.photos?.[0] || '🌾'}</span>
              <div>
                <p style="font-size:0.92rem;font-weight:800;color:var(--text-main);">${l.crop} — ${l.variety}</p>
                <p style="font-size:0.72rem;color:var(--text-muted);">${l.quantityKg.toLocaleString()} kg · ${l.qualityGrade} · ${l.location}</p>
                <p style="font-size:0.72rem;color:var(--text-muted);">${l.farmerName} · ${l.farmerPhone}</p>
              </div>
            </div>
            <div style="display:flex;align-items:center;gap:0.875rem;flex-shrink:0;">
              <div style="text-align:right;">
                <p style="font-size:1.1rem;font-weight:900;color:var(--green-700);">₹${l.expectedPricePerKg}/kg</p>
                ${l.isOrganic ? `<span class="badge badge-green" style="font-size:0.65rem;">🌿 Organic</span>` : ''}
              </div>
              <button onclick="KrishiBuyers.openNegotiationModal('b-1')" class="btn btn-gold btn-sm">Negotiate</button>
            </div>
          </div>
        `).join('')}
        ${listings.length === 0 ? `<div class="card" style="padding:2rem;text-align:center;"><p style="font-size:0.85rem;color:var(--text-muted);">No crop listings yet. Check back soon or widen your search radius.</p></div>` : ''}
      </div>
    </div>`;
  },

  /* ─────────────────────────────────────────────────
     TRACTOR OWNER DASHBOARD
  ───────────────────────────────────────────────── */
  tractorOwner(user) {
    return `
    <div class="anim-in" style="display:flex;flex-direction:column;gap:1.25rem;">

      <div style="background:linear-gradient(135deg,#1e3a5f,#1e40af,#1d4ed8);border-radius:var(--radius-2xl);padding:1.5rem;overflow:hidden;position:relative;">
        <div style="position:absolute;right:-2rem;top:-2rem;width:10rem;height:10rem;background:rgba(255,255,255,0.05);border-radius:50%;"></div>
        <div style="position:relative;z-index:1;display:flex;flex-wrap:wrap;align-items:flex-start;justify-content:space-between;gap:1rem;">
          <div>
            <div style="background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:99px;padding:0.25rem 0.75rem;display:inline-flex;align-items:center;gap:0.4rem;margin-bottom:0.75rem;">
              <span>🚜</span><span style="font-size:0.7rem;font-weight:700;color:rgba(255,255,255,0.85);">TRACTOR OWNER DASHBOARD</span>
            </div>
            <h2 style="font-size:clamp(1.3rem,4vw,1.875rem);font-weight:900;color:#fff;letter-spacing:-0.025em;margin-bottom:0.4rem;">Hello, ${user.name.split(' ')[0]}!</h2>
            <p style="font-size:0.82rem;color:rgba(255,255,255,0.65);">${user.tractorModel || 'Your Tractor'} · ${user.hp || '—'} HP · ₹${user.baseHourlyRate || '—'}/hr</p>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.5rem;font-size:0.8rem;">
            ${[['₹14,200','This Week'],['8','Total Bookings'],['4.8 ⭐','Rating'],['Available','Status']].map(([v,l]) => `
              <div style="padding:0.625rem 0.875rem;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.15);border-radius:var(--radius-md);text-align:center;">
                <p style="font-weight:900;color:#fff;">${v}</p>
                <p style="font-size:0.65rem;color:rgba(255,255,255,0.6);">${l}</p>
              </div>`).join('')}
          </div>
        </div>
      </div>

      <!-- Booking Requests -->
      <div class="section-header">
        <h3 class="section-title"><i class="fa-solid fa-calendar" style="color:#3b82f6;"></i> Incoming Booking Requests</h3>
        <span class="badge badge-blue">3 Pending</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:0.75rem;">
        ${[
          { farmer:'Ravi Kumar', village:'Somanahalli (3.2 km)', date:'Tomorrow 6AM–10AM', hours:4, rate:700, status:'pending', crop:'Ploughing – 2 Acres' },
          { farmer:'Shivanna', village:'Kirugavalu (6.1 km)', date:'Aug 19, 7AM–1PM', hours:6, rate:650, status:'negotiating', crop:'Rotavating – 3 Acres' },
          { farmer:'Sunitha Devi', village:'Pandavapura (9.8 km)', date:'Aug 20, 6AM–8AM', hours:2, rate:700, status:'confirmed', crop:'Seeding – 1 Acre' },
        ].map(b => `
          <div class="card" style="padding:1.125rem;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:0.875rem;border-left:4px solid ${b.status==='confirmed'?'var(--green-500)':b.status==='negotiating'?'var(--gold-500)':'#3b82f6'};">
            <div>
              <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.25rem;">
                <p style="font-size:0.9rem;font-weight:800;color:var(--text-main);">${b.farmer}</p>
                <span class="badge ${b.status==='confirmed'?'badge-green':b.status==='negotiating'?'badge-gold':'badge-blue'}" style="font-size:0.65rem;">${b.status.toUpperCase()}</span>
              </div>
              <p style="font-size:0.75rem;color:var(--text-muted);">${b.village} · ${b.date}</p>
              <p style="font-size:0.75rem;color:var(--text-muted);">${b.crop} · ${b.hours}hrs · ₹${b.rate}/hr</p>
            </div>
            <div style="display:flex;gap:0.5rem;">
              <button onclick="KrishiUtils.toast('✅ Booking accepted!','success');" class="btn btn-primary btn-sm">Accept</button>
              <button onclick="KrishiUtils.toast('📞 Calling ${b.farmer}...','info');" class="btn btn-light btn-sm">Call</button>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Quick actions -->
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(12rem,1fr));gap:0.875rem;">
        <div onclick="KrishiStore.setTab('tractors')" class="card card-interactive" style="padding:1.125rem;background:#eff6ff;border:1.5px solid #bfdbfe;cursor:pointer;text-align:center;">
          <div style="font-size:1.75rem;margin-bottom:0.375rem;">📋</div>
          <p style="font-size:0.82rem;font-weight:800;color:#1e40af;">Edit My Listing</p>
          <p style="font-size:0.7rem;color:#3b82f6;">Update rate & availability</p>
        </div>
        <div onclick="KrishiStore.setTab('profit_calc')" class="card card-interactive" style="padding:1.125rem;background:#f0fdf4;border:1.5px solid #86efac;cursor:pointer;text-align:center;">
          <div style="font-size:1.75rem;margin-bottom:0.375rem;">💰</div>
          <p style="font-size:0.82rem;font-weight:800;color:#14532d;">Earnings Calculator</p>
          <p style="font-size:0.7rem;color:var(--green-700);">See weekly / monthly income</p>
        </div>
      </div>
    </div>`;
  },

  /* ─────────────────────────────────────────────────
     FARM LABORER DASHBOARD
  ───────────────────────────────────────────────── */
  farmLaborer(user) {
    return `
    <div class="anim-in" style="display:flex;flex-direction:column;gap:1.25rem;">

      <div style="background:linear-gradient(135deg,#881337,#be123c,#e11d48);border-radius:var(--radius-2xl);padding:1.5rem;overflow:hidden;position:relative;">
        <div style="position:relative;z-index:1;display:flex;flex-wrap:wrap;align-items:flex-start;justify-content:space-between;gap:1rem;">
          <div>
            <div style="background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:99px;padding:0.25rem 0.75rem;display:inline-flex;align-items:center;gap:0.4rem;margin-bottom:0.75rem;">
              <span>👷</span><span style="font-size:0.7rem;font-weight:700;color:rgba(255,255,255,0.85);">FARM WORKER DASHBOARD</span>
            </div>
            <h2 style="font-size:clamp(1.3rem,4vw,1.875rem);font-weight:900;color:#fff;letter-spacing:-0.025em;margin-bottom:0.4rem;">Hello, ${user.name.split(' ')[0]}!</h2>
            <p style="font-size:0.82rem;color:rgba(255,255,255,0.65);">Team of ${user.teamSize || '—'} · ₹${user.dailyWage || '—'}/day · ${(user.skills||[]).join(' · ')}</p>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.5rem;">
            ${[['₹8,500','This Month'],['3','Jobs Done'],['Available','Today'],['4.9 ⭐','Rating']].map(([v,l]) => `
              <div style="padding:0.625rem 0.875rem;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:var(--radius-md);text-align:center;">
                <p style="font-weight:900;color:#fff;">${v}</p><p style="font-size:0.65rem;color:rgba(255,255,255,0.6);">${l}</p>
              </div>`).join('')}
          </div>
        </div>
      </div>

      <!-- Available Jobs -->
      <div class="section-header">
        <h3 class="section-title"><i class="fa-solid fa-briefcase" style="color:#be123c;"></i> Farm Jobs Near You</h3>
        <span class="badge" style="background:#ffe4e6;color:#9f1239;border:1px solid #fecdd3;">3 New</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:0.75rem;">
        ${[
          { farmer:'Basavanagowda Patil', village:'Somanahalli (2.4 km)', date:'Tomorrow, 6AM–12PM', task:'Tomato Harvesting', workers:5, wage:500, perks:'Lunch Provided' },
          { farmer:'Ravi Kumar', village:'Kirugavalu (5.1 km)', date:'Aug 19, 7AM–1PM', task:'Transplanting Paddy', workers:8, wage:450, perks:'' },
          { farmer:'Sunitha Devi', village:'Pandavapura (8.3 km)', date:'Aug 20, All Day', task:'Chilli Weeding', workers:4, wage:480, perks:'Transport Provided' },
        ].map(j => `
          <div class="card" style="padding:1.125rem;border-left:4px solid #e11d48;">
            <div style="display:flex;flex-wrap:wrap;align-items:flex-start;justify-content:space-between;gap:0.75rem;margin-bottom:0.75rem;">
              <div>
                <p style="font-size:0.9rem;font-weight:800;color:var(--text-main);">${j.task}</p>
                <p style="font-size:0.75rem;color:var(--text-muted);">${j.farmer} · ${j.village}</p>
                <p style="font-size:0.75rem;color:var(--text-muted);">${j.date} · Needs ${j.workers} workers</p>
                ${j.perks ? `<span class="badge badge-green" style="font-size:0.65rem;margin-top:0.3rem;">✅ ${j.perks}</span>` : ''}
              </div>
              <div style="text-align:right;flex-shrink:0;">
                <p style="font-size:1.2rem;font-weight:900;color:#be123c;">₹${j.wage}<span style="font-size:0.72rem;font-weight:600;color:var(--text-muted);">/day</span></p>
              </div>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.5rem;">
              <button onclick="KrishiUtils.toast('✅ Job application sent!','success');" class="btn btn-gold btn-sm">Accept Job</button>
              <button onclick="KrishiUtils.toast('📞 Calling farmer...','info');" class="btn btn-light btn-sm">Call Farmer</button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>`;
  },

  /* ─────────────────────────────────────────────────
     NURSERY OWNER DASHBOARD
  ───────────────────────────────────────────────── */
  nurseryOwner(user) {
    return `
    <div class="anim-in" style="display:flex;flex-direction:column;gap:1.25rem;">

      <div class="banner-emerald" style="border-radius:var(--radius-2xl);padding:1.5rem;overflow:hidden;position:relative;">
        <div style="position:relative;z-index:1;display:flex;flex-wrap:wrap;align-items:flex-start;justify-content:space-between;gap:1rem;">
          <div>
            <div style="background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:99px;padding:0.25rem 0.75rem;display:inline-flex;align-items:center;gap:0.4rem;margin-bottom:0.75rem;">
              <span>🌱</span><span style="font-size:0.7rem;font-weight:700;color:rgba(255,255,255,0.85);">NURSERY DASHBOARD</span>
            </div>
            <h2 style="font-size:clamp(1.3rem,4vw,1.875rem);font-weight:900;color:#fff;letter-spacing:-0.025em;margin-bottom:0.4rem;">${user.name}</h2>
            <p style="font-size:0.82rem;color:rgba(255,255,255,0.65);">${user.speciality || 'Plant Nursery'} · ${user.address || user.district}</p>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.5rem;">
            ${[['24','Enquiries Today'],['₹12,400','This Week'],['18','Plant Varieties'],['4.9 ⭐','Rating']].map(([v,l]) => `
              <div style="padding:0.625rem 0.875rem;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.15);border-radius:var(--radius-md);text-align:center;">
                <p style="font-weight:900;color:#fff;">${v}</p><p style="font-size:0.65rem;color:rgba(255,255,255,0.6);">${l}</p>
              </div>`).join('')}
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(12rem,1fr));gap:0.875rem;">
        ${[
          { icon:'🌿', label:'Manage Plant Catalog', sub:'Add / edit plants & prices', tab:'directory', bg:'#f0fdf4', border:'#86efac', text:'#14532d' },
          { icon:'📦', label:'Pending Orders', sub:'5 orders awaiting dispatch', tab:'directory', bg:'#fffbeb', border:'#fde68a', text:'#78350f' },
          { icon:'📢', label:'Run Seasonal Offer', sub:'Promote seedling sales', tab:'provider_reg', bg:'#dbeafe', border:'#93c5fd', text:'#1e3a8a' },
          { icon:'🗺️', label:'View on Map', sub:'Your nursery GPS pin', tab:'map', bg:'#f3e8ff', border:'#e9d5ff', text:'#6b21a8' },
        ].map(t => `
          <div onclick="KrishiStore.setTab('${t.tab}')" class="card card-interactive" style="padding:1.125rem;background:${t.bg};border:1.5px solid ${t.border};cursor:pointer;">
            <div style="font-size:1.75rem;margin-bottom:0.5rem;">${t.icon}</div>
            <p style="font-size:0.82rem;font-weight:800;color:${t.text};">${t.label}</p>
            <p style="font-size:0.7rem;color:${t.text};opacity:0.75;margin-top:0.2rem;">${t.sub}</p>
          </div>
        `).join('')}
      </div>

      <!-- Top Selling Plants -->
      <div class="card" style="padding:1.375rem;">
        <div class="section-header">
          <h3 class="section-title"><i class="fa-solid fa-ranking-star" style="color:var(--green-600);"></i> Top Selling Seedlings</h3>
        </div>
        ${[
          { name:'Arka Rakshak Tomato Seedlings', sold:1240, price:4.50, stock:3200 },
          { name:'Byadgi Chilli Seedlings', sold:860, price:3.00, stock:1800 },
          { name:'Taiwan Pink Guava Saplings', sold:340, price:45.00, stock:280 },
          { name:'Hybrid Brinjal Seedlings', sold:720, price:3.50, stock:2100 },
        ].map(p => `
          <div class="product-row">
            <div><p class="product-name">🌱 ${p.name}</p><p class="product-sub">Sold: ${p.sold.toLocaleString()} · Stock: ${p.stock.toLocaleString()}</p></div>
            <p class="product-price">₹${p.price}/sapling</p>
          </div>
        `).join('')}
      </div>
    </div>`;
  },

  /* ─────────────────────────────────────────────────
     AGRI STORE DASHBOARD
  ───────────────────────────────────────────────── */
  agriStore(user) {
    return `
    <div class="anim-in" style="display:flex;flex-direction:column;gap:1.25rem;">

      <div style="background:linear-gradient(135deg,#78350f,#b45309,#d97706);border-radius:var(--radius-2xl);padding:1.5rem;overflow:hidden;position:relative;">
        <div style="position:relative;z-index:1;display:flex;flex-wrap:wrap;align-items:flex-start;justify-content:space-between;gap:1rem;">
          <div>
            <div style="background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:99px;padding:0.25rem 0.75rem;display:inline-flex;align-items:center;gap:0.4rem;margin-bottom:0.75rem;">
              <span>🏪</span><span style="font-size:0.7rem;font-weight:700;color:rgba(255,255,255,0.85);">AGRI STORE DASHBOARD</span>
            </div>
            <h2 style="font-size:clamp(1.3rem,4vw,1.875rem);font-weight:900;color:#fff;letter-spacing:-0.025em;margin-bottom:0.4rem;">${user.name}</h2>
            <p style="font-size:0.82rem;color:rgba(255,255,255,0.75);">${user.address || user.district} · Brands: ${(user.brands||[]).join(' · ')}</p>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.5rem;">
            ${[['31','Enquiries Today'],['₹28,600','This Week'],['45+','Products Listed'],['4.7 ⭐','Rating']].map(([v,l]) => `
              <div style="padding:0.625rem 0.875rem;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:var(--radius-md);text-align:center;">
                <p style="font-weight:900;color:#fff;">${v}</p><p style="font-size:0.65rem;color:rgba(255,255,255,0.65);">${l}</p>
              </div>`).join('')}
          </div>
        </div>
      </div>

      <!-- Low Stock Alert -->
      <div class="card" style="padding:1.125rem;border-left:4px solid #f97316;background:#fffbeb;">
        <div style="display:flex;align-items:center;gap:0.75rem;">
          <i class="fa-solid fa-triangle-exclamation" style="color:#d97706;font-size:1.25rem;flex-shrink:0;"></i>
          <div>
            <p style="font-size:0.9rem;font-weight:800;color:#78350f;">⚠️ Low Stock Alert — 3 Products</p>
            <p style="font-size:0.75rem;color:#92400e;">Urea 45kg bags (18 left), Neem Oil 1L (7 left), Azadirachtin 500ml (4 left). Re-order from distributor.</p>
          </div>
          <button onclick="KrishiUtils.toast('📦 Re-order request sent!','success');" class="btn btn-gold btn-sm" style="flex-shrink:0;">Re-Order</button>
        </div>
      </div>

      <!-- Actions Grid -->
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(12rem,1fr));gap:0.875rem;">
        ${[
          { icon:'📦', label:'Manage Inventory', sub:'Update products & stock', tab:'directory', bg:'#fffbeb', border:'#fde68a', text:'#78350f' },
          { icon:'🛒', label:'Pending Orders', sub:'8 customer orders', tab:'directory', bg:'#f0fdf4', border:'#86efac', text:'#14532d' },
          { icon:'📢', label:'Add New Product', sub:'List new agri inputs', tab:'provider_reg', bg:'#dbeafe', border:'#93c5fd', text:'#1e3a8a' },
          { icon:'📊', label:'Sales Report', sub:'Weekly profit overview', tab:'profit_calc', bg:'#f3e8ff', border:'#e9d5ff', text:'#6b21a8' },
        ].map(t => `
          <div onclick="KrishiStore.setTab('${t.tab}')" class="card card-interactive" style="padding:1.125rem;background:${t.bg};border:1.5px solid ${t.border};cursor:pointer;">
            <div style="font-size:1.75rem;margin-bottom:0.5rem;">${t.icon}</div>
            <p style="font-size:0.82rem;font-weight:800;color:${t.text};">${t.label}</p>
            <p style="font-size:0.7rem;color:${t.text};opacity:0.75;margin-top:0.2rem;">${t.sub}</p>
          </div>
        `).join('')}
      </div>
    </div>`;
  },

  /* ─────────────────────────────────────────────────
     TRANSPORT PROVIDER DASHBOARD
  ───────────────────────────────────────────────── */
  transportProvider(user) {
    return `
    <div class="anim-in" style="display:flex;flex-direction:column;gap:1.25rem;">

      <div style="background:linear-gradient(135deg,#0f172a,#1e293b,#0f2027);border-radius:var(--radius-2xl);padding:1.5rem;overflow:hidden;position:relative;">
        <div style="position:relative;z-index:1;display:flex;flex-wrap:wrap;align-items:flex-start;justify-content:space-between;gap:1rem;">
          <div>
            <div style="background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:99px;padding:0.25rem 0.75rem;display:inline-flex;align-items:center;gap:0.4rem;margin-bottom:0.75rem;">
              <span>🚚</span><span style="font-size:0.7rem;font-weight:700;color:rgba(255,255,255,0.85);">TRANSPORT DASHBOARD</span>
            </div>
            <h2 style="font-size:clamp(1.3rem,4vw,1.875rem);font-weight:900;color:#fff;letter-spacing:-0.025em;margin-bottom:0.4rem;">${user.name}</h2>
            <p style="font-size:0.82rem;color:rgba(255,255,255,0.65);">Service Area: ${user.serviceArea || user.district} · ${(user.vehicles||[]).length} Vehicle(s)</p>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.5rem;">
            ${[['5','Trips Today'],['₹18,400','This Week'],['2','Vehicles Active'],['4.8 ⭐','Rating']].map(([v,l]) => `
              <div style="padding:0.625rem 0.875rem;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.15);border-radius:var(--radius-md);text-align:center;">
                <p style="font-weight:900;color:#fff;">${v}</p><p style="font-size:0.65rem;color:rgba(255,255,255,0.55);">${l}</p>
              </div>`).join('')}
          </div>
        </div>
      </div>

      <!-- Transport requests -->
      <div class="section-header">
        <h3 class="section-title"><i class="fa-solid fa-truck" style="color:#475569;"></i> Pending Transport Requests</h3>
        <span class="badge badge-blue">3 Requests</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:0.75rem;">
        ${[
          { from:'Mandya Farm', to:'Kolar APMC', farmer:'Basavanagowda Patil', load:'1,500 kg Tomato', date:'Tomorrow 5AM', dist:'82 km', budget:'₹2,200', urgent:true },
          { from:'Somanahalli', to:'Yeshwanthpur APMC', farmer:'Ravi Kumar', load:'900 kg Onion', date:'Aug 19, 4AM', dist:'138 km', budget:'₹3,400', urgent:false },
          { from:'Kirugavalu', to:'Mandya Cold Storage', farmer:'Sunitha Devi', load:'600 kg Green Chilli', date:'Aug 20, 6AM', dist:'18 km', budget:'₹900', urgent:false },
        ].map(t => `
          <div class="card" style="padding:1.125rem;border-left:4px solid ${t.urgent?'#f59e0b':'#64748b'};">
            <div style="display:flex;flex-wrap:wrap;align-items:flex-start;justify-content:space-between;gap:0.75rem;margin-bottom:0.75rem;">
              <div>
                ${t.urgent ? `<span class="badge badge-gold" style="font-size:0.65rem;margin-bottom:0.375rem;">⚡ URGENT</span><br>` : ''}
                <p style="font-size:0.9rem;font-weight:800;color:var(--text-main);">${t.from} → ${t.to}</p>
                <p style="font-size:0.75rem;color:var(--text-muted);">${t.farmer} · ${t.load}</p>
                <p style="font-size:0.75rem;color:var(--text-muted);">${t.date} · ${t.dist} · Budget: <strong style="color:var(--green-700);">${t.budget}</strong></p>
              </div>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:0.5rem;">
              <button onclick="KrishiUtils.toast('✅ Trip accepted!','success');" class="btn btn-primary btn-sm">Accept</button>
              <button onclick="KrishiUtils.toast('💬 Negotiation opened...','info');" class="btn btn-gold btn-sm">Counter</button>
              <button onclick="KrishiUtils.toast('📞 Calling farmer...','info');" class="btn btn-light btn-sm">Call</button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>`;
  },

  /* ─────────────────────────────────────────────────
     IRRIGATION DEALER DASHBOARD
  ───────────────────────────────────────────────── */
  irrigationDealer(user) {
    return `
    <div class="anim-in" style="display:flex;flex-direction:column;gap:1.25rem;">

      <div style="background:linear-gradient(135deg,#0c4a6e,#0369a1,#0284c7);border-radius:var(--radius-2xl);padding:1.5rem;overflow:hidden;position:relative;">
        <div style="position:relative;z-index:1;display:flex;flex-wrap:wrap;align-items:flex-start;justify-content:space-between;gap:1rem;">
          <div>
            <div style="background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:99px;padding:0.25rem 0.75rem;display:inline-flex;align-items:center;gap:0.4rem;margin-bottom:0.75rem;">
              <span>💧</span><span style="font-size:0.7rem;font-weight:700;color:rgba(255,255,255,0.85);">IRRIGATION DEALER DASHBOARD</span>
            </div>
            <h2 style="font-size:clamp(1.3rem,4vw,1.875rem);font-weight:900;color:#fff;letter-spacing:-0.025em;margin-bottom:0.4rem;">${user.name}</h2>
            <p style="font-size:0.82rem;color:rgba(255,255,255,0.65);">Brands: ${(user.brands||[]).join(', ')} · ${user.subsidyAssist ? '✅ Subsidy Assistance' : ''}</p>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.5rem;">
            ${[['12','New Enquiries'],['₹1.4L','This Month'],['7','Installations Done'],['3','Pending Subsidies']].map(([v,l]) => `
              <div style="padding:0.625rem 0.875rem;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.15);border-radius:var(--radius-md);text-align:center;">
                <p style="font-weight:900;color:#fff;">${v}</p><p style="font-size:0.65rem;color:rgba(255,255,255,0.6);">${l}</p>
              </div>`).join('')}
          </div>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(12rem,1fr));gap:0.875rem;">
        ${[
          { icon:'💧', label:'Manage Products', sub:'Drip, sprinkler & pipes', tab:'irrigation', bg:'#eff6ff', border:'#bfdbfe', text:'#1e40af' },
          { icon:'🏛️', label:'Subsidy Applications', sub:'3 pending with PMKSY', tab:'irrigation', bg:'#f0fdf4', border:'#86efac', text:'#14532d' },
          { icon:'🗓️', label:'Schedule Installation', sub:'7 jobs upcoming', tab:'irrigation', bg:'#fffbeb', border:'#fde68a', text:'#78350f' },
          { icon:'📊', label:'Sales Report', sub:'Monthly revenue overview', tab:'profit_calc', bg:'#f3e8ff', border:'#e9d5ff', text:'#6b21a8' },
        ].map(t => `
          <div onclick="KrishiStore.setTab('${t.tab}')" class="card card-interactive" style="padding:1.125rem;background:${t.bg};border:1.5px solid ${t.border};cursor:pointer;">
            <div style="font-size:1.75rem;margin-bottom:0.5rem;">${t.icon}</div>
            <p style="font-size:0.82rem;font-weight:800;color:${t.text};">${t.label}</p>
            <p style="font-size:0.7rem;color:${t.text};opacity:0.75;margin-top:0.2rem;">${t.sub}</p>
          </div>
        `).join('')}
      </div>
    </div>`;
  },

  manureSupplier(user) {
    return `<div class="anim-in"><div class="banner-emerald" style="border-radius:var(--radius-2xl);padding:1.5rem;margin-bottom:1.25rem;"><div style="position:relative;z-index:1;"><h2 style="font-size:1.5rem;font-weight:900;color:#fff;">Welcome, ${user.name.split(' ')[0]} 🐄</h2><p style="font-size:0.82rem;color:rgba(255,255,255,0.65);">Manure Supplier Dashboard — Manage listings & delivery requests.</p></div></div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(12rem,1fr));gap:0.875rem;">
      <div onclick="KrishiStore.setTab('directory')" class="card card-interactive" style="padding:1.125rem;background:#fffbeb;border:1.5px solid #fde68a;cursor:pointer;"><div style="font-size:1.75rem;margin-bottom:0.5rem;">🐄</div><p style="font-size:0.82rem;font-weight:800;color:#78350f;">My Manure Listings</p><p style="font-size:0.7rem;color:#92400e;margin-top:0.2rem;">Update price & availability</p></div>
      <div onclick="KrishiStore.setTab('map')" class="card card-interactive" style="padding:1.125rem;background:#f0fdf4;border:1.5px solid #86efac;cursor:pointer;"><div style="font-size:1.75rem;margin-bottom:0.5rem;">🗺️</div><p style="font-size:0.82rem;font-weight:800;color:#14532d;">Delivery Map</p><p style="font-size:0.7rem;color:var(--green-700);margin-top:0.2rem;">Track delivery routes</p></div>
    </div></div>`;
  }
};
