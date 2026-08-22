/**
 * KrishiSetu AI — Navigation Component v3 (All issues fixed)
 */
window.KrishiNav = {

  renderTopHeader() {
    const el = document.getElementById('top-header');
    if (!el) return;

    const user     = KrishiAuth.getCurrentUser();
    const lang     = window.KrishiData.languages.find(l => l.code === window.KrishiStore.state.currentLanguage) || window.KrishiData.languages[0];
    const avatar   = user ? (user.profilePhoto || '👤') : '👤';
    const userName = user ? user.name.split(' ')[0] : 'Guest';
    const roleMap  = { farmer:'👨‍🌾 Farmer', buyer:'🛒 Buyer', tractor_owner:'🚜 Tractor Owner', tractor_driver:'🚗 Driver', farm_laborer:'👷 Worker', nursery:'🌱 Nursery', agri_store:'🏪 Agri Store', transport:'🚚 Transport', irrigation:'💧 Irrigation', manure:'🐄 Manure', admin:'⚙️ Admin' };
    const roleLabel = user ? (roleMap[user.role] || user.role) : '—';

    el.innerHTML = `
      <div style="max-width:1100px;margin:0 auto;padding:0 0.875rem;">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:0.75rem;height:3.75rem;">

          <!-- Brand -->
          <button onclick="KrishiStore.setTab('home')" style="display:flex;align-items:center;gap:0.625rem;background:none;border:none;cursor:pointer;padding:0;flex-shrink:0;">
            <div style="width:2.25rem;height:2.25rem;border-radius:0.75rem;background:linear-gradient(135deg,#f59e0b,#d97706);display:flex;align-items:center;justify-content:center;font-size:1.1rem;box-shadow:0 4px 12px rgba(245,158,11,0.4);flex-shrink:0;">🌾</div>
            <div style="text-align:left;">
              <div style="display:flex;align-items:baseline;gap:0.4rem;flex-wrap:nowrap;">
                <span style="font-size:1rem;font-weight:900;color:#fff;letter-spacing:-0.025em;line-height:1.1;white-space:nowrap;">KrishiSetu <span style="color:#fbbf24;">AI</span></span>
                <span style="font-size:0.78rem;font-weight:700;color:#fcd34d;letter-spacing:0.01em;white-space:nowrap;">ಕೃಷಿಸೇತು</span>
              </div>
              <div style="font-size:0.6rem;color:rgba(255,255,255,0.5);font-weight:600;letter-spacing:0.02em;white-space:nowrap;">One Digital Bridge for Every Farmer</div>
            </div>
          </button>

          <!-- Controls -->
          <div style="display:flex;align-items:center;gap:0.375rem;flex-shrink:0;">

            <!-- Notification bell -->
            <button onclick="KrishiNotifs.showPanel()" style="position:relative;width:2.25rem;height:2.25rem;border-radius:50%;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;transition:background 0.15s;" onmouseover="this.style.background='rgba(255,255,255,0.2)'" onmouseout="this.style.background='rgba(255,255,255,0.1)'" title="Notifications">
              <i class="fa-solid fa-bell" style="color:rgba(255,255,255,0.85);font-size:0.95rem;"></i>
              ${KrishiNotifs.unreadCount() > 0 ? `
                <span style="position:absolute;top:-3px;right:-3px;min-width:1.1rem;height:1.1rem;border-radius:99px;background:#ef4444;color:#fff;font-size:0.6rem;font-weight:800;display:flex;align-items:center;justify-content:center;border:1.5px solid var(--green-900);">${KrishiNotifs.unreadCount()}</span>
              ` : ''}
            </button>

            <!-- Language -->
            <select onchange="KrishiStore.setLanguage(this.value)" class="input select" style="width:auto;padding:0.4rem 1.75rem 0.4rem 0.6rem;font-size:0.72rem;font-weight:700;background-color:rgba(255,255,255,0.1);color:#fff;border-color:rgba(255,255,255,0.18);border-radius:0.625rem;cursor:pointer;">
              ${window.KrishiData.languages.map(l => `<option value="${l.code}" ${l.code === lang.code ? 'selected' : ''} style="background:#0d2b1c;color:#fff;">${l.flag} ${l.code.toUpperCase()}</option>`).join('')}
            </select>

            <!-- User pill with dropdown -->
            <div style="position:relative;">
              <button onclick="KrishiNav.toggleUserMenu()" style="display:flex;align-items:center;gap:0.5rem;background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.22);border-radius:2rem;padding:0.35rem 0.75rem 0.35rem 0.4rem;cursor:pointer;font-family:var(--font);transition:background 0.15s;" onmouseover="this.style.background='rgba(255,255,255,0.2)'" onmouseout="this.style.background='rgba(255,255,255,0.12)'">
                <div style="width:1.75rem;height:1.75rem;border-radius:50%;background:rgba(255,255,255,0.15);border:1.5px solid rgba(255,255,255,0.3);display:flex;align-items:center;justify-content:center;font-size:0.9rem;flex-shrink:0;">${avatar}</div>
                <div style="text-align:left;line-height:1.2;">
                  <div style="font-size:0.75rem;font-weight:800;color:#fff;">${userName}</div>
                  <div style="font-size:0.62rem;color:rgba(255,255,255,0.55);">${roleLabel}</div>
                </div>
                <i class="fa-solid fa-chevron-down" style="font-size:0.6rem;color:rgba(255,255,255,0.6);"></i>
              </button>

              <!-- User dropdown -->
              <div id="user-menu" style="display:none;position:absolute;right:0;top:calc(100% + 0.5rem);width:15rem;background:#fff;border-radius:var(--radius-xl);border:1px solid var(--border);box-shadow:var(--shadow-xl);padding:0.375rem;z-index:300;animation:fadeSlideUp 0.18s ease;">
                <!-- Role switcher header -->
                <div style="padding:0.5rem 0.75rem 0.375rem;border-bottom:1px solid var(--border);margin-bottom:0.25rem;">
                  <p style="font-size:0.62rem;font-weight:700;color:var(--text-muted);letter-spacing:0.07em;text-transform:uppercase;">Switch Role / Perspective</p>
                </div>
                <div style="max-height:14rem;overflow-y:auto;">
                  ${Object.entries(roleMap).map(([id, label]) => `
                    <button onclick="KrishiNav.switchRole('${id}')" style="display:flex;align-items:center;gap:0.6rem;width:100%;padding:0.5rem 0.625rem;border-radius:var(--radius-md);border:none;background:${user && user.role===id ? '#f0fdf4' : 'transparent'};cursor:pointer;font-family:var(--font);transition:background 0.12s;text-align:left;" onmouseover="this.style.background='#f1f5f9'" onmouseout="this.style.background='${user && user.role===id ? '#f0fdf4' : 'transparent'}'">
                      <span style="font-size:1rem;">${label.split(' ')[0]}</span>
                      <span style="font-size:0.78rem;font-weight:${user && user.role===id ? '800' : '600'};color:${user && user.role===id ? 'var(--green-800)' : 'var(--text-main)'};">${label.substring(label.indexOf(' ')+1)}</span>
                      ${user && user.role===id ? '<i class="fa-solid fa-check" style="margin-left:auto;color:var(--green-600);font-size:0.75rem;"></i>' : ''}
                    </button>
                  `).join('')}
                </div>
                <div style="height:1px;background:var(--border);margin:0.375rem 0;"></div>
                <button onclick="KrishiStore.setTab('profile');KrishiNav.closeUserMenu();" style="display:flex;align-items:center;gap:0.625rem;width:100%;padding:0.5rem 0.625rem;border-radius:var(--radius-md);border:none;background:transparent;cursor:pointer;font-family:var(--font);font-size:0.8rem;font-weight:700;color:var(--text-main);" onmouseover="this.style.background='#f1f5f9'" onmouseout="this.style.background='transparent'">
                  <i class="fa-solid fa-user-pen" style="color:var(--green-600);"></i> Edit My Profile
                </button>
                <button onclick="KrishiProfile.logout();KrishiNav.closeUserMenu();" style="display:flex;align-items:center;gap:0.625rem;width:100%;padding:0.5rem 0.625rem;border-radius:var(--radius-md);border:none;background:transparent;cursor:pointer;font-family:var(--font);font-size:0.8rem;font-weight:700;color:#b91c1c;" onmouseover="this.style.background='#fef2f2'" onmouseout="this.style.background='transparent'">
                  <i class="fa-solid fa-right-from-bracket" style="color:#b91c1c;"></i> Sign Out
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    `;
  },

  renderLocationBar() {
    const el = document.getElementById('location-bar');
    if (!el) return;
    const loc = window.KrishiStore.state.currentLocation;
    const r   = window.KrishiStore.state.searchRadiusKm;

    el.innerHTML = `
      <div style="max-width:1100px;margin:0 auto;padding:0.5rem 0.875rem;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:0.5rem;">
        <div style="display:flex;align-items:center;gap:0.5rem;font-size:0.78rem;color:rgba(255,255,255,0.85);">
          <i class="fa-solid fa-location-dot" style="color:#fbbf24;"></i>
          <span><span style="opacity:0.6;">Farm:</span> <strong style="color:#fff;">${loc.name}, ${loc.district}</strong></span>
          <button onclick="KrishiNav.openLocationModal()" style="font-size:0.72rem;color:#fbbf24;font-weight:700;background:none;border:none;cursor:pointer;text-decoration:underline;font-family:var(--font);">Change</button>
          <button onclick="KrishiNav.useGPS()" style="font-size:0.72rem;color:rgba(255,255,255,0.7);font-weight:700;background:none;border:none;cursor:pointer;font-family:var(--font);display:flex;align-items:center;gap:0.25rem;">
            <i class="fa-solid fa-crosshairs" style="font-size:0.75rem;color:#34d399;"></i> GPS
          </button>
        </div>
        <div style="display:flex;align-items:center;gap:0.375rem;">
          <span style="font-size:0.72rem;color:rgba(255,255,255,0.5);margin-right:0.2rem;">Radius:</span>
          ${[2,5,10,25,50].map(v => `
            <button onclick="KrishiStore.setRadius(${v})" style="padding:0.2rem 0.55rem;border-radius:99px;font-size:0.72rem;font-weight:700;cursor:pointer;font-family:var(--font);border:none;transition:all 0.15s;${v===r ? 'background:#f59e0b;color:#fff;box-shadow:0 2px 8px rgba(245,158,11,0.4);' : 'background:rgba(255,255,255,0.1);color:rgba(255,255,255,0.65);'}">${v}km</button>
          `).join('')}
        </div>
      </div>
    `;
  },

  renderBottomNav() {
    const el = document.getElementById('bottom-nav');
    if (!el) return;
    const tab = window.KrishiStore.state.currentTab;

    const items = [
      { id:'home',         icon:'fa-house',       label:'Home'     },
      { id:'sell_smart',   icon:'fa-chart-line',  label:'Prices'   },
      { id:'tractors',     icon:'fa-tractor',     label:'Tractors' },
      { id:'buyers',       icon:'fa-handshake',   label:'Buyers'   },
      { id:'disease_scan', icon:'fa-camera',      label:'Scan'     },
      { id:'profile',      icon:'fa-user',        label:'Profile'  },
    ];

    el.innerHTML = `
      <div style="display:grid;grid-template-columns:repeat(6,1fr);max-width:1100px;margin:0 auto;">
        ${items.map(it => `
          <button onclick="KrishiStore.setTab('${it.id}')" class="bnav-item ${it.id === tab ? 'active' : ''}">
            <i class="fa-solid ${it.icon}" style="font-size:1.1rem;"></i>
            <span>${it.label}</span>
          </button>
        `).join('')}
      </div>
    `;
  },

  switchRole(roleId) {
    KrishiStore.state.currentRole = roleId;
    // Also update user's stored role so dash reflects correctly
    const user = KrishiAuth.getCurrentUser();
    if (user) KrishiAuth.updateProfile({ id: user.id, role: roleId });
    this.closeUserMenu();
    KrishiRouter.render();
    KrishiUtils.toast(`✅ Switched to ${roleId.replace('_',' ')} view`, 'success');
  },

  toggleUserMenu() {
    const dd = document.getElementById('user-menu');
    if (!dd) return;
    const isOpen = dd.style.display !== 'none';
    dd.style.display = isOpen ? 'none' : 'block';
    if (!isOpen) {
      setTimeout(() => {
        document.addEventListener('click', function h(e) {
          if (!dd.contains(e.target)) { dd.style.display = 'none'; document.removeEventListener('click', h); }
        });
      }, 50);
    }
  },

  closeUserMenu() {
    const dd = document.getElementById('user-menu');
    if (dd) dd.style.display = 'none';
  },

  /* ── Real GPS using browser Geolocation API ── */
  useGPS() {
    if (!navigator.geolocation) return KrishiUtils.toast('❌ GPS not supported in this browser.', 'warn');
    KrishiUtils.toast('📡 Detecting your GPS location…', 'info');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: lat, longitude: lng, accuracy } = pos.coords;
        // Find nearest location from KrishiData
        const nearest = KrishiData.locations.reduce((best, loc) => {
          const d = Math.hypot(loc.lat - lat, loc.lng - lng);
          return d < Math.hypot(best.lat - lat, best.lng - lng) ? loc : best;
        });
        KrishiStore.state.currentLocation = { ...nearest, lat, lng, gps: true, accuracy: Math.round(accuracy) };
        KrishiUtils.toast(`📍 GPS located: ${nearest.name} (±${Math.round(accuracy)}m accuracy)`, 'success');
        KrishiRouter.render();
      },
      (err) => {
        const msgs = { 1:'Location permission denied. Please allow location access in browser settings.', 2:'GPS signal unavailable. Try again outdoors.', 3:'GPS timed out. Please try again.' };
        KrishiUtils.toast(`❌ ${msgs[err.code] || 'GPS error.'}`, 'warn');
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  },

  openLocationModal() {
    const loc = window.KrishiStore.state.currentLocation;
    KrishiUtils.openModal(`
      <h3 style="font-size:1.05rem;font-weight:900;color:var(--text-main);display:flex;align-items:center;gap:0.5rem;margin-bottom:0.25rem;padding-right:2rem;">
        <i class="fa-solid fa-map-location-dot" style="color:var(--gold-600);"></i> Select Farm Location
      </h3>
      <p style="font-size:0.8rem;color:var(--text-muted);margin-bottom:1.125rem;">Select the nearest village or town to your farm to discover local services.</p>

      <!-- GPS Button (live) -->
      <button onclick="KrishiNav.useGPS();KrishiUtils.closeModal();" style="width:100%;display:flex;align-items:center;gap:0.875rem;padding:0.875rem 1rem;background:linear-gradient(135deg,#0a1f14,#153d27);border:none;border-radius:var(--radius-lg);cursor:pointer;margin-bottom:1rem;font-family:var(--font);">
        <div style="width:2.5rem;height:2.5rem;border-radius:var(--radius-md);background:rgba(52,211,153,0.2);border:1px solid rgba(52,211,153,0.4);display:flex;align-items:center;justify-content:center;font-size:1.2rem;flex-shrink:0;">📡</div>
        <div style="text-align:left;">
          <p style="font-size:0.88rem;font-weight:800;color:#fff;">Use Live GPS (Most Accurate)</p>
          <p style="font-size:0.72rem;color:rgba(255,255,255,0.55);">Detect exact coordinates using your device's GPS sensor.</p>
        </div>
        <i class="fa-solid fa-chevron-right" style="color:rgba(255,255,255,0.4);margin-left:auto;"></i>
      </button>

      <p style="font-size:0.72rem;font-weight:700;color:var(--text-muted);letter-spacing:0.06em;text-transform:uppercase;margin-bottom:0.625rem;">— Or Pick Nearest Village —</p>

      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:0.5rem;max-height:16rem;overflow-y:auto;">
        ${window.KrishiData.locations.map(l => `
          <button onclick="KrishiStore.setLocation('${l.id}');KrishiUtils.closeModal();KrishiUtils.toast('📍 Location set to ${l.name}');" style="padding:0.75rem;border-radius:var(--radius-lg);text-align:left;border:2px solid ${l.id===loc.id ? 'var(--green-500)' : 'var(--border)'};background:${l.id===loc.id ? '#f0fdf4' : 'var(--surface)'};cursor:pointer;transition:all 0.15s;font-family:var(--font);">
            <div style="font-size:0.82rem;font-weight:700;color:var(--text-main);">${l.name}</div>
            <div style="font-size:0.68rem;color:var(--text-muted);margin-top:0.15rem;">${l.district}, ${l.state}</div>
            ${l.id===loc.id ? '<div style="font-size:0.65rem;color:var(--green-700);font-weight:700;margin-top:0.15rem;">✅ Current</div>' : ''}
          </button>
        `).join('')}
      </div>
    `);
  }
};
