/**
 * KrishiSetu AI — Profile Edit Page (all roles)
 */
window.KrishiProfile = {
  render() {
    const user = KrishiAuth.getCurrentUser();
    if (!user) return '<p>Please log in first.</p>';

    const roleFields = this._roleFields(user);

    return `
    <div class="anim-in" style="max-width:680px;margin:0 auto;display:flex;flex-direction:column;gap:1.25rem;">

      <!-- Banner -->
      <div class="banner-emerald" style="border-radius:var(--radius-2xl);padding:1.5rem;">
        <div style="position:relative;z-index:1;display:flex;align-items:center;gap:1rem;flex-wrap:wrap;justify-content:space-between;">
          <div style="display:flex;align-items:center;gap:1rem;">
            <div style="width:4rem;height:4rem;border-radius:var(--radius-xl);background:rgba(255,255,255,0.15);border:2px solid rgba(255,255,255,0.3);display:flex;align-items:center;justify-content:center;font-size:2rem;">${user.profilePhoto || '👤'}</div>
            <div>
              <h2 style="font-size:1.2rem;font-weight:900;color:#fff;letter-spacing:-0.02em;">${user.name}</h2>
              <p style="font-size:0.78rem;color:rgba(255,255,255,0.65);">${this._roleLabel(user.role)} · ${user.district || '—'}, ${user.state || 'Karnataka'}</p>
            </div>
          </div>
          <button onclick="KrishiProfile.logout()" class="btn btn-ghost btn-sm">
            <i class="fa-solid fa-right-from-bracket"></i> Sign Out
          </button>
        </div>
      </div>

      <!-- Basic Info -->
      <div class="card" style="padding:1.5rem;">
        <h3 style="font-size:0.95rem;font-weight:800;color:var(--text-main);margin-bottom:1rem;padding-bottom:0.75rem;border-bottom:1px solid var(--border);">Personal Information</h3>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(14rem,1fr));gap:0.875rem;">
          <div>
            <label style="font-size:0.78rem;font-weight:700;color:var(--text-muted);display:block;margin-bottom:0.35rem;">Full Name</label>
            <input id="pf-name" type="text" value="${user.name || ''}" class="input">
          </div>
          <div>
            <label style="font-size:0.78rem;font-weight:700;color:var(--text-muted);display:block;margin-bottom:0.35rem;">Phone / WhatsApp</label>
            <input id="pf-phone" type="tel" value="${user.phone || ''}" class="input">
          </div>
          <div>
            <label style="font-size:0.78rem;font-weight:700;color:var(--text-muted);display:block;margin-bottom:0.35rem;">Email Address</label>
            <input id="pf-email" type="email" value="${user.email || ''}" class="input">
          </div>
          <div>
            <label style="font-size:0.78rem;font-weight:700;color:var(--text-muted);display:block;margin-bottom:0.35rem;">Village / Area</label>
            <input id="pf-village" type="text" value="${user.village || user.address || ''}" class="input">
          </div>
          <div>
            <label style="font-size:0.78rem;font-weight:700;color:var(--text-muted);display:block;margin-bottom:0.35rem;">District</label>
            <input id="pf-district" type="text" value="${user.district || ''}" class="input">
          </div>
          <div>
            <label style="font-size:0.78rem;font-weight:700;color:var(--text-muted);display:block;margin-bottom:0.35rem;">State</label>
            <input id="pf-state" type="text" value="${user.state || 'Karnataka'}" class="input">
          </div>
        </div>
      </div>

      <!-- Role-Specific Fields -->
      <div class="card" style="padding:1.5rem;">
        <h3 style="font-size:0.95rem;font-weight:800;color:var(--text-main);margin-bottom:1rem;padding-bottom:0.75rem;border-bottom:1px solid var(--border);">
          ${this._roleLabel(user.role)} Profile Details
        </h3>
        ${roleFields}
      </div>

      <!-- Change Password -->
      <div class="card" style="padding:1.5rem;">
        <h3 style="font-size:0.95rem;font-weight:800;color:var(--text-main);margin-bottom:1rem;padding-bottom:0.75rem;border-bottom:1px solid var(--border);">Change Password</h3>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(14rem,1fr));gap:0.875rem;">
          <div>
            <label style="font-size:0.78rem;font-weight:700;color:var(--text-muted);display:block;margin-bottom:0.35rem;">New Password</label>
            <input id="pf-pw1" type="password" placeholder="New password (min 6 chars)" class="input">
          </div>
          <div>
            <label style="font-size:0.78rem;font-weight:700;color:var(--text-muted);display:block;margin-bottom:0.35rem;">Confirm Password</label>
            <input id="pf-pw2" type="password" placeholder="Repeat new password" class="input">
          </div>
        </div>
      </div>

      <!-- Save Button -->
      <button onclick="KrishiProfile.save('${user.id}')" class="btn btn-gold btn-full btn-lg">
        <i class="fa-solid fa-floppy-disk"></i> Save Profile Changes
      </button>
    </div>`;
  },

  _roleLabel(role) {
    const m = { farmer:'👨‍🌾 Farmer', buyer:'🛒 Crop Buyer', tractor_owner:'🚜 Tractor Owner', tractor_driver:'🚗 Tractor Driver', farm_laborer:'👷 Farm Worker', nursery:'🌱 Nursery Owner', agri_store:'🏪 Agri Shop', transport:'🚚 Transport Provider', irrigation:'💧 Irrigation Dealer', manure:'🐄 Manure Supplier', admin:'⚙️ Admin' };
    return m[role] || role;
  },

  _roleFields(user) {
    const r = user.role;
    if (r === 'farmer') return `
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(14rem,1fr));gap:0.875rem;">
        <div><label style="font-size:0.78rem;font-weight:700;color:var(--text-muted);display:block;margin-bottom:0.35rem;">Farm Size (Acres)</label><input id="pf-r1" type="number" value="${user.farmSizeAcres||''}" class="input"></div>
        <div><label style="font-size:0.78rem;font-weight:700;color:var(--text-muted);display:block;margin-bottom:0.35rem;">Soil Type</label><input id="pf-r2" type="text" value="${user.soilType||''}" class="input"></div>
        <div><label style="font-size:0.78rem;font-weight:700;color:var(--text-muted);display:block;margin-bottom:0.35rem;">Irrigation Type</label><input id="pf-r3" type="text" value="${user.irrigationType||''}" class="input"></div>
        <div><label style="font-size:0.78rem;font-weight:700;color:var(--text-muted);display:block;margin-bottom:0.35rem;">Farming Method</label><input id="pf-r4" type="text" value="${user.farmingMethod||''}" class="input"></div>
        <div style="grid-column:1/-1;"><label style="font-size:0.78rem;font-weight:700;color:var(--text-muted);display:block;margin-bottom:0.35rem;">Current Crops (comma separated)</label><input id="pf-r5" type="text" value="${(user.currentCrops||[]).join(', ')}" class="input"></div>
      </div>`;
    if (r === 'buyer') return `
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(14rem,1fr));gap:0.875rem;">
        <div><label style="font-size:0.78rem;font-weight:700;color:var(--text-muted);display:block;margin-bottom:0.35rem;">Business Name</label><input id="pf-r1" type="text" value="${user.businessName||''}" class="input"></div>
        <div><label style="font-size:0.78rem;font-weight:700;color:var(--text-muted);display:block;margin-bottom:0.35rem;">GST Number</label><input id="pf-r2" type="text" value="${user.gstNumber||''}" class="input"></div>
        <div><label style="font-size:0.78rem;font-weight:700;color:var(--text-muted);display:block;margin-bottom:0.35rem;">Payment Terms</label><input id="pf-r3" type="text" value="${user.paymentTerms||''}" class="input"></div>
        <div style="grid-column:1/-1;"><label style="font-size:0.78rem;font-weight:700;color:var(--text-muted);display:block;margin-bottom:0.35rem;">Crops Purchased (comma separated)</label><input id="pf-r4" type="text" value="${(user.cropsPurchased||[]).join(', ')}" class="input"></div>
      </div>`;
    if (r === 'tractor_owner') return `
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(14rem,1fr));gap:0.875rem;">
        <div><label style="font-size:0.78rem;font-weight:700;color:var(--text-muted);display:block;margin-bottom:0.35rem;">Tractor Model</label><input id="pf-r1" type="text" value="${user.tractorModel||''}" class="input"></div>
        <div><label style="font-size:0.78rem;font-weight:700;color:var(--text-muted);display:block;margin-bottom:0.35rem;">Horse Power (HP)</label><input id="pf-r2" type="number" value="${user.hp||''}" class="input"></div>
        <div><label style="font-size:0.78rem;font-weight:700;color:var(--text-muted);display:block;margin-bottom:0.35rem;">Base Hourly Rate (₹)</label><input id="pf-r3" type="number" value="${user.baseHourlyRate||''}" class="input"></div>
        <div style="grid-column:1/-1;"><label style="font-size:0.78rem;font-weight:700;color:var(--text-muted);display:block;margin-bottom:0.35rem;">Attachments (comma separated)</label><input id="pf-r4" type="text" value="${(user.attachments||[]).join(', ')}" class="input"></div>
      </div>`;
    if (r === 'farm_laborer') return `
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(14rem,1fr));gap:0.875rem;">
        <div><label style="font-size:0.78rem;font-weight:700;color:var(--text-muted);display:block;margin-bottom:0.35rem;">Team Size</label><input id="pf-r1" type="number" value="${user.teamSize||''}" class="input"></div>
        <div><label style="font-size:0.78rem;font-weight:700;color:var(--text-muted);display:block;margin-bottom:0.35rem;">Daily Wage (₹/person)</label><input id="pf-r2" type="number" value="${user.dailyWage||''}" class="input"></div>
        <div style="grid-column:1/-1;"><label style="font-size:0.78rem;font-weight:700;color:var(--text-muted);display:block;margin-bottom:0.35rem;">Skills (comma separated)</label><input id="pf-r3" type="text" value="${(user.skills||[]).join(', ')}" class="input"></div>
      </div>`;
    if (r === 'transport') return `
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(14rem,1fr));gap:0.875rem;">
        <div><label style="font-size:0.78rem;font-weight:700;color:var(--text-muted);display:block;margin-bottom:0.35rem;">Service Area</label><input id="pf-r1" type="text" value="${user.serviceArea||''}" class="input"></div>
        <div><label style="font-size:0.78rem;font-weight:700;color:var(--text-muted);display:block;margin-bottom:0.35rem;">Number of Vehicles</label><input id="pf-r2" type="number" value="${(user.vehicles||[]).length||1}" class="input"></div>
      </div>`;
    // Generic fallback
    return `<div style="padding:0.75rem;background:var(--earth-50);border-radius:var(--radius-lg);font-size:0.82rem;color:var(--text-muted);">Role-specific fields will appear here for your account type. Basic profile info above applies to all roles.</div>`;
  },

  save(userId) {
    const updates = {
      id:       userId,
      name:     document.getElementById('pf-name')?.value?.trim(),
      phone:    document.getElementById('pf-phone')?.value?.trim(),
      email:    document.getElementById('pf-email')?.value?.trim(),
      village:  document.getElementById('pf-village')?.value?.trim(),
      district: document.getElementById('pf-district')?.value?.trim(),
      state:    document.getElementById('pf-state')?.value?.trim(),
    };

    // Role-specific
    const user = KrishiAuth.getCurrentUser();
    if (user.role === 'farmer') {
      updates.farmSizeAcres  = Number(document.getElementById('pf-r1')?.value);
      updates.soilType       = document.getElementById('pf-r2')?.value;
      updates.irrigationType = document.getElementById('pf-r3')?.value;
      updates.farmingMethod  = document.getElementById('pf-r4')?.value;
      updates.currentCrops   = document.getElementById('pf-r5')?.value?.split(',').map(s => s.trim()).filter(Boolean);
    } else if (user.role === 'buyer') {
      updates.businessName   = document.getElementById('pf-r1')?.value;
      updates.gstNumber      = document.getElementById('pf-r2')?.value;
      updates.paymentTerms   = document.getElementById('pf-r3')?.value;
      updates.cropsPurchased = document.getElementById('pf-r4')?.value?.split(',').map(s => s.trim()).filter(Boolean);
    } else if (user.role === 'tractor_owner') {
      updates.tractorModel    = document.getElementById('pf-r1')?.value;
      updates.hp              = Number(document.getElementById('pf-r2')?.value);
      updates.baseHourlyRate  = Number(document.getElementById('pf-r3')?.value);
      updates.attachments     = document.getElementById('pf-r4')?.value?.split(',').map(s => s.trim()).filter(Boolean);
    } else if (user.role === 'farm_laborer') {
      updates.teamSize  = Number(document.getElementById('pf-r1')?.value);
      updates.dailyWage = Number(document.getElementById('pf-r2')?.value);
      updates.skills    = document.getElementById('pf-r3')?.value?.split(',').map(s => s.trim()).filter(Boolean);
    }

    // Password change
    const pw1 = document.getElementById('pf-pw1')?.value;
    const pw2 = document.getElementById('pf-pw2')?.value;
    if (pw1) {
      if (pw1.length < 6) return KrishiUtils.toast('Password must be at least 6 characters.', 'warn');
      if (pw1 !== pw2)    return KrishiUtils.toast('Passwords do not match.', 'warn');
      updates.password = pw1;
    }

    KrishiAuth.updateProfile(updates);
    KrishiUtils.toast('✅ Profile updated successfully!', 'success');
    KrishiNav.renderTopHeader();
  },

  logout() {
    KrishiAuth.logout();
    KrishiUtils.toast('👋 Signed out. See you soon!', 'info');
    setTimeout(() => KrishiApp.boot(), 600);
  }
};
