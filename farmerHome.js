/**
 * KrishiSetu AI — Farmer Home Dashboard v3
 * Uses live auth user data. Adds quick farm-type editor card.
 */
window.KrishiFarmerHome = {
  render() {
    const user = KrishiAuth.getCurrentUser();
    const p    = user || window.KrishiStore.state.farmerProfile;
    const r    = window.KrishiStore.state.searchRadiusKm;
    const loc  = window.KrishiStore.state.currentLocation;

    const name   = p.name || p.fullName || 'Farmer';
    const acres  = p.farmSizeAcres || '—';
    const soil   = p.soilType || 'Mixed Soil';
    const crops  = Array.isArray(p.currentCrops) ? p.currentCrops : ['Tomato', 'Chilli'];
    const irr    = p.irrigationType || 'Drip';
    const method = p.farmingMethod || 'Conventional';

    return `
    <div class="anim-in" style="display:flex;flex-direction:column;gap:1.25rem;">

      <!-- ══ HERO ══ -->
      <div class="banner-emerald" style="border-radius:var(--radius-2xl);padding:1.5rem;position:relative;overflow:hidden;">
        <div style="position:absolute;right:-3rem;top:-3rem;width:12rem;height:12rem;background:rgba(255,255,255,0.04);border-radius:50%;pointer-events:none;"></div>
        <div style="position:absolute;right:3rem;bottom:-4rem;width:8rem;height:8rem;background:rgba(245,158,11,0.07);border-radius:50%;pointer-events:none;"></div>

        <div style="position:relative;z-index:1;display:flex;flex-wrap:wrap;align-items:flex-start;justify-content:space-between;gap:1rem;">
          <div>
            <!-- App name + Kannada + Tagline -->
            <div style="margin-bottom:0.875rem;">
              <div style="display:flex;align-items:center;gap:0.625rem;flex-wrap:wrap;margin-bottom:0.35rem;">
                <span style="font-size:1.05rem;font-weight:900;color:#fff;letter-spacing:-0.02em;">KrishiSetu <span style="color:#fbbf24;">AI</span></span>
                <span style="font-size:0.72rem;font-weight:600;color:rgba(255,255,255,0.5);">|</span>
                <span style="font-size:1rem;font-weight:800;color:#fcd34d;letter-spacing:0.01em;">ಕೃಷಿಸೇತು AI</span>
              </div>
              <!-- Highlighted Tagline -->
              <div style="display:inline-flex;align-items:center;gap:0.5rem;background:linear-gradient(135deg,rgba(245,158,11,0.25),rgba(251,191,36,0.15));border:1px solid rgba(245,158,11,0.45);border-radius:99px;padding:0.3rem 0.875rem;">
                <span style="width:6px;height:6px;border-radius:50%;background:#34d399;flex-shrink:0;"></span>
                <span style="font-size:0.75rem;font-weight:800;color:#fcd34d;letter-spacing:0.04em;">One Digital Bridge for Every Farmer</span>
                <span style="font-size:0.68rem;color:rgba(255,255,255,0.5);">·</span>
                <span style="font-size:0.7rem;font-weight:600;color:rgba(255,255,255,0.7);">ಪ್ರತಿ ರೈತನಿಗೂ ಒಂದು ಡಿಜಿಟಲ್ ಸೇತುವೆ</span>
              </div>
            </div>

            <div style="display:inline-flex;align-items:center;gap:0.4rem;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.15);border-radius:99px;padding:0.25rem 0.75rem;margin-bottom:0.75rem;">
              <span style="width:6px;height:6px;border-radius:50%;background:#34d399;"></span>
              <span style="font-size:0.7rem;font-weight:700;color:rgba(255,255,255,0.85);letter-spacing:0.05em;text-transform:uppercase;">${acres} Acres • ${soil}</span>
            </div>
            <h2 style="font-size:clamp(1.3rem,4vw,2rem);font-weight:900;color:#fff;letter-spacing:-0.025em;line-height:1.15;margin-bottom:0.5rem;">
              Good Morning,<br><span style="color:#fcd34d;">${name.split(' ')[0]}</span> 👨‍🌾
            </h2>
            <p style="font-size:0.82rem;color:rgba(255,255,255,0.65);flex-wrap:wrap;line-height:1.5;">
              Crops: <strong style="color:rgba(255,255,255,0.9);">${crops.join(' · ')}</strong>
            </p>
            <p style="font-size:0.78rem;color:rgba(255,255,255,0.55);margin-top:0.2rem;">${irr} · ${method}</p>
          </div>

          <div style="display:flex;flex-direction:column;gap:0.5rem;">
            <!-- Weather widget -->
            <div class="glass-info" style="min-width:10rem;">
              <div style="display:flex;align-items:center;gap:0.75rem;">
                <div style="font-size:2rem;">🌦️</div>
                <div>
                  <div style="font-size:1.3rem;font-weight:900;color:#fff;">28°C</div>
                  <div style="font-size:0.7rem;color:rgba(255,255,255,0.65);">Partly Cloudy</div>
                </div>
              </div>
              <div style="margin-top:0.5rem;padding-top:0.5rem;border-top:1px solid rgba(255,255,255,0.1);font-size:0.7rem;color:rgba(255,255,255,0.65);">
                Humidity 68% · Rain 20%<br>
                <span style="color:#fcd34d;font-weight:700;">💡 Spraying: Optimal Today</span>
              </div>
            </div>

            <!-- Quick edit farm button -->
            <button onclick="KrishiFarmerHome.openFarmEditor()" style="display:flex;align-items:center;gap:0.5rem;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:var(--radius-md);padding:0.45rem 0.75rem;cursor:pointer;font-family:var(--font);font-size:0.75rem;font-weight:700;color:rgba(255,255,255,0.85);transition:background 0.15s;" onmouseover="this.style.background='rgba(255,255,255,0.2)'" onmouseout="this.style.background='rgba(255,255,255,0.1)'">
              <i class="fa-solid fa-pen-to-square" style="font-size:0.85rem;color:#fbbf24;"></i> Edit My Farm
            </button>
          </div>
        </div>
      </div>

      <!-- ══ AI SEARCH ══ -->
      <div class="card" style="padding:1.25rem;">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.625rem;">
          <p style="font-size:0.8rem;font-weight:700;color:var(--text-muted);">🔍 What do you need today?</p>
          <span style="font-size:0.7rem;background:var(--green-100);color:var(--green-700);padding:0.15rem 0.5rem;border-radius:99px;border:1px solid var(--green-200);">Within ${r} km</span>
        </div>
        <div style="display:flex;gap:0.5rem;">
          <input id="hs-input" type="text" placeholder="Tractor near me · Tomato buyer · Chilli seeds · Workers today…" class="input" style="border-radius:var(--radius-lg);font-size:0.88rem;" onkeypress="if(event.key==='Enter')KrishiFarmerHome.doSearch(this.value)">
          <button onclick="KrishiFarmerHome.voiceSearch()" class="btn btn-gold" style="padding:0.75rem;border-radius:var(--radius-lg);flex-shrink:0;" title="Voice Search">
            <i class="fa-solid fa-microphone"></i>
          </button>
          <button onclick="KrishiFarmerHome.doSearch(document.getElementById('hs-input').value)" class="btn btn-primary" style="border-radius:var(--radius-lg);flex-shrink:0;">Search</button>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:0.4rem;margin-top:0.75rem;align-items:center;">
          <span style="font-size:0.7rem;font-weight:600;color:var(--text-muted);">Quick:</span>
          <button onclick="KrishiFarmerHome.doSearch('tractor')" class="search-chip chip-blue">🚜 Tractor</button>
          <button onclick="KrishiFarmerHome.doSearch('tomato buyer')" class="search-chip chip-green">🥕 Tomato buyer</button>
          <button onclick="KrishiFarmerHome.doSearch('chilli seedlings')" class="search-chip chip-amber">🌱 Seedlings</button>
          <button onclick="KrishiFarmerHome.doSearch('farm workers')" class="search-chip chip-rose">👷 Workers</button>
          <button onclick="KrishiFarmerHome.doSearch('cold storage')" class="search-chip chip-blue">🧊 Cold Storage</button>
        </div>
      </div>

      <!-- ══ FEATURE BANNERS ══ -->
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(15rem,1fr));gap:1rem;">
        <div onclick="KrishiStore.setTab('sell_smart')" class="card card-interactive" style="background:linear-gradient(135deg,#78350f,#b45309,#d97706);border:none;padding:1.25rem;cursor:pointer;">
          <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:0.75rem;">
            <div>
              <span style="font-size:0.62rem;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;color:rgba(255,255,255,0.6);">AI Market Intelligence</span>
              <h3 style="font-size:1.1rem;font-weight:900;color:#fff;margin:0.25rem 0 0.3rem;">SELL SMART AI 📈</h3>
              <p style="font-size:0.75rem;color:rgba(255,255,255,0.75);line-height:1.4;">Price forecasts, mandi comparison & best net-return buyer ranking.</p>
            </div>
            <div style="font-size:2rem;opacity:0.7;flex-shrink:0;">💰</div>
          </div>
          <div style="margin-top:0.875rem;display:inline-flex;align-items:center;gap:0.4rem;background:rgba(255,255,255,0.15);border:1px solid rgba(255,255,255,0.25);border-radius:var(--radius-md);padding:0.4rem 0.75rem;font-size:0.75rem;font-weight:700;color:#fff;">
            View 30-Day Forecast <i class="fa-solid fa-arrow-right" style="font-size:0.65rem;"></i>
          </div>
        </div>

        <div onclick="KrishiStore.setTab('krishi_ai')" class="card card-interactive" style="background:linear-gradient(135deg,#0a1f14,#153d27,#1e5436);border:none;padding:1.25rem;cursor:pointer;">
          <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:0.75rem;">
            <div>
              <span style="font-size:0.62rem;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;color:rgba(255,255,255,0.5);">Voice & Text AI</span>
              <h3 style="font-size:1.1rem;font-weight:900;color:#fff;margin:0.25rem 0 0.3rem;">Ask Krishi AI 🤖</h3>
              <p style="font-size:0.75rem;color:rgba(255,255,255,0.65);line-height:1.4;">Speak in Kannada or Hindi for crop advice, disease fixes & market tips.</p>
            </div>
            <div style="font-size:2rem;opacity:0.7;flex-shrink:0;">🗣️</div>
          </div>
          <div style="margin-top:0.875rem;display:inline-flex;align-items:center;gap:0.4rem;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:var(--radius-md);padding:0.4rem 0.75rem;font-size:0.75rem;font-weight:700;color:#fff;">
            Start Voice Assistant <i class="fa-solid fa-arrow-right" style="font-size:0.65rem;"></i>
          </div>
        </div>
      </div>

      <!-- ══ 18 SERVICE TILES ══ -->
      <div>
        <div class="section-header">
          <h3 class="section-title"><i class="fa-solid fa-grip" style="color:var(--green-600);"></i> Everything Your Farm Needs</h3>
          <span class="section-badge">Within ${r} km</span>
        </div>
        <div class="service-grid">
          ${[
            { em:'🌾', label:'Seeds',         sub:'Hybrids & Certified',    tab:'seeds',         cl:'tile-green' },
            { em:'🌿', label:'Nurseries',     sub:'Seedlings & Saplings',   tab:'directory',     cl:'tile-green' },
            { em:'🧪', label:'Fertilizers',  sub:'NPK & Organic',          tab:'directory',     cl:'tile-amber' },
            { em:'🛡️', label:'Pesticides',   sub:'Bio & Chemical',         tab:'pesticides',    cl:'tile-purple' },
            { em:'🚜', label:'Tractors',     sub:'Negotiate Rate/hr',      tab:'tractors',      cl:'tile-blue', star:true },
            { em:'👷', label:'Farm Workers', sub:'Available Today',        tab:'workers',       cl:'tile-rose' },
            { em:'🚚', label:'Transport',    sub:'Pickup & Lorries',       tab:'transport',     cl:'tile-blue' },
            { em:'🥕', label:'Veg Buyers',   sub:'Direct Purchase',        tab:'buyers',        cl:'tile-green', star:true },
            { em:'🍎', label:'Fruit Buyers', sub:'Farm Gate Sale',         tab:'buyers',        cl:'tile-green' },
            { em:'💰', label:'Mkt Prices',   sub:'Agmarknet Sync',         tab:'sell_smart',    cl:'tile-amber', star:true },
            { em:'🏪', label:'APMC Mandis',  sub:'Map + Mandi List',       tab:'map',           cl:'tile-teal' },
            { em:'💧', label:'Drip Irrig.',  sub:'AI Advisor',             tab:'irrigation',    cl:'tile-blue' },
            { em:'🐄', label:'Cow Dung',     sub:'Organic Manure',         tab:'directory',     cl:'tile-amber' },
            { em:'🐔', label:'Poultry Waste',sub:'Soil Enricher',          tab:'directory',     cl:'tile-amber' },
            { em:'📊', label:'Profit Calc',  sub:'Cost vs Revenue',        tab:'profit_calc',   cl:'tile-teal' },
            { em:'🧊', label:'Cold Storage', sub:'Preserve Yield',         tab:'cold_storage',  cl:'tile-purple' },
            { em:'🗺️', label:'Agri Map',     sub:'Live GPS Pins',          tab:'map',           cl:'tile-slate' },
            { em:'📝', label:'List Business',sub:'Register Service',       tab:'provider_reg',  cl:'tile-slate' },
          ].map(t => `
            <div class="service-tile ${t.cl}" onclick="KrishiStore.setTab('${t.tab}')" style="${t.star ? 'border:2px solid var(--green-300);' : ''}">
              <div class="tile-icon">${t.em}</div>
              <div class="tile-label">${t.label}</div>
              <div class="tile-sub">${t.sub}</div>
            </div>
          `).join('')}
        </div>
      </div>

    </div>`;
  },

  /* ── Quick Farm Editor Modal ── */
  openFarmEditor() {
    const user = KrishiAuth.getCurrentUser();
    if (!user) return KrishiUtils.toast('Please log in first.', 'warn');
    const crops  = Array.isArray(user.currentCrops) ? user.currentCrops.join(', ') : '';

    KrishiUtils.openModal(`
      <h3 style="font-size:1.05rem;font-weight:900;color:var(--text-main);display:flex;align-items:center;gap:0.5rem;margin-bottom:0.25rem;padding-right:2rem;">
        <i class="fa-solid fa-tractor" style="color:var(--green-600);"></i> Edit My Farm Details
      </h3>
      <p style="font-size:0.78rem;color:var(--text-muted);margin-bottom:1.125rem;">Update your farm information to get better AI recommendations and buyer matches.</p>

      <div style="display:flex;flex-direction:column;gap:0.75rem;">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.625rem;">
          <div>
            <label style="font-size:0.78rem;font-weight:700;color:var(--text-muted);display:block;margin-bottom:0.3rem;">Farm Size (Acres)</label>
            <input id="fe-acres" type="number" step="0.5" value="${user.farmSizeAcres || 2}" class="input" style="font-weight:700;">
          </div>
          <div>
            <label style="font-size:0.78rem;font-weight:700;color:var(--text-muted);display:block;margin-bottom:0.3rem;">Soil Type</label>
            <select id="fe-soil" class="input select" style="font-weight:600;">
              ${['Red Loamy Soil','Black Cotton Soil','Sandy Loam','Clay Soil','Alluvial Soil','Laterite Soil'].map(s => `<option ${s === user.soilType ? 'selected' : ''}>${s}</option>`).join('')}
            </select>
          </div>
        </div>

        <div>
          <label style="font-size:0.78rem;font-weight:700;color:var(--text-muted);display:block;margin-bottom:0.3rem;">Current Crops <span style="font-weight:400;">(comma separated)</span></label>
          <input id="fe-crops" type="text" value="${crops}" placeholder="e.g. Tomato, Chilli, Sugarcane" class="input">
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.625rem;">
          <div>
            <label style="font-size:0.78rem;font-weight:700;color:var(--text-muted);display:block;margin-bottom:0.3rem;">Irrigation Type</label>
            <select id="fe-irr" class="input select" style="font-weight:600;">
              ${['Drip & Borewell','Drip Only','Flood Irrigation','Canal Water','Borewell','Rainwater Harvesting','No Irrigation'].map(s => `<option ${s === user.irrigationType ? 'selected' : ''}>${s}</option>`).join('')}
            </select>
          </div>
          <div>
            <label style="font-size:0.78rem;font-weight:700;color:var(--text-muted);display:block;margin-bottom:0.3rem;">Farming Method</label>
            <select id="fe-method" class="input select" style="font-weight:600;">
              ${['Conventional','Semi-Organic','Fully Organic','Natural Farming','Integrated Farming'].map(s => `<option ${s === user.farmingMethod ? 'selected' : ''}>${s}</option>`).join('')}
            </select>
          </div>
        </div>

        <div>
          <label style="font-size:0.78rem;font-weight:700;color:var(--text-muted);display:block;margin-bottom:0.3rem;">Village / Taluk</label>
          <input id="fe-village" type="text" value="${user.village || user.taluk || ''}" placeholder="e.g. Somanahalli, Maddur Taluk" class="input">
        </div>
      </div>

      <button onclick="KrishiFarmerHome.saveFarm('${user.id}')" class="btn btn-primary btn-full" style="margin-top:1.125rem;">
        <i class="fa-solid fa-floppy-disk"></i> Save Farm Details
      </button>
    `);
  },

  saveFarm(userId) {
    const crops = document.getElementById('fe-crops')?.value?.split(',').map(s => s.trim()).filter(Boolean) || [];
    KrishiAuth.updateProfile({
      id:            userId,
      farmSizeAcres: parseFloat(document.getElementById('fe-acres')?.value) || 0,
      soilType:      document.getElementById('fe-soil')?.value,
      currentCrops:  crops,
      irrigationType:document.getElementById('fe-irr')?.value,
      farmingMethod: document.getElementById('fe-method')?.value,
      village:       document.getElementById('fe-village')?.value,
    });
    KrishiUtils.toast('✅ Farm details updated!', 'success');
    KrishiUtils.closeModal();
    KrishiRouter.render();
  },

  doSearch(q) {
    if (!q?.trim()) return;
    const v = q.toLowerCase();
    if (v.includes('tractor') || v.includes('machine'))           KrishiStore.setTab('tractors');
    else if (v.includes('worker') || v.includes('labor'))         KrishiStore.setTab('workers');
    else if (v.includes('buyer') || v.includes('sell'))           KrishiStore.setTab('buyers');
    else if (v.includes('price') || v.includes('mandi'))          KrishiStore.setTab('sell_smart');
    else if (v.includes('disease') || v.includes('scan'))         KrishiStore.setTab('disease_scan');
    else if (v.includes('irrigation') || v.includes('drip'))      KrishiStore.setTab('irrigation');
    else if (v.includes('transport') || v.includes('lorry'))      KrishiStore.setTab('transport');
    else if (v.includes('cold') || v.includes('storage'))         KrishiStore.setTab('cold_storage');
    else if (v.includes('seed') || v.includes('seedling'))        KrishiStore.setTab('seeds');
    else if (v.includes('pesticide') || v.includes('pest'))       KrishiStore.setTab('pesticides');
    else                                                           KrishiStore.setTab('directory');
    KrishiUtils.toast(`🔍 Searching "${q}" near ${window.KrishiStore.state.currentLocation.name}`, 'info');
  },

  voiceSearch() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return KrishiUtils.toast('Voice not supported in this browser.', 'warn');
    const rec = new SR();
    rec.lang = window.KrishiStore.state.currentLanguage === 'kn' ? 'kn-IN' : 'en-IN';
    KrishiUtils.toast('🎙️ Listening… Speak your query!', 'info');
    rec.start();
    rec.onresult = e => {
      const txt = e.results[0][0].transcript;
      document.getElementById('hs-input').value = txt;
      this.doSearch(txt);
    };
    rec.onerror = () => KrishiUtils.toast('Voice recognition failed. Please try again.', 'warn');
  }
};
