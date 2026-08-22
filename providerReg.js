/**
 * KrishiSetu AI — Provider Registration v2 (Premium)
 */
window.KrishiProviderReg = {
  render() {
    return `
    <div class="anim-in" style="max-width:680px;margin:0 auto;display:flex;flex-direction:column;gap:1.25rem;">

      <div class="banner-emerald" style="border-radius:var(--radius-2xl);padding:1.5rem;text-align:center;">
        <div style="position:relative;z-index:1;">
          <div style="width:3.5rem;height:3.5rem;border-radius:var(--radius-xl);background:rgba(255,255,255,0.15);border:1px solid rgba(255,255,255,0.25);display:flex;align-items:center;justify-content:center;font-size:1.5rem;margin:0 auto 0.875rem;">🏪</div>
          <h2 style="font-size:clamp(1.2rem,3vw,1.75rem);font-weight:900;color:#fff;letter-spacing:-0.025em;margin-bottom:0.375rem;">List Your Business on KrishiSetu</h2>
          <p style="font-size:0.82rem;color:rgba(255,255,255,0.7);max-width:32rem;margin:0 auto;">Connect with thousands of nearby farmers. Register your nursery, tractor, farm labor team, shop or transport service today.</p>
        </div>
      </div>

      <div class="card" style="padding:1.5rem;">
        <h3 style="font-size:0.95rem;font-weight:800;color:var(--text-main);margin-bottom:1rem;padding-bottom:0.75rem;border-bottom:1px solid var(--border);">Business Details & Verification</h3>

        <div style="display:flex;flex-direction:column;gap:0.875rem;">
          <div>
            <label style="font-size:0.8rem;font-weight:700;color:var(--text-muted);display:block;margin-bottom:0.375rem;">Service Category</label>
            <select id="reg-type" class="input select" style="font-size:0.9rem;font-weight:600;">
              <option>🌱 Plant Nursery / Seedlings</option>
              <option>🚜 Tractor & Machinery Rental</option>
              <option>👷 Farm Worker / Labour Team</option>
              <option>🛒 Wholesale Produce Buyer</option>
              <option>🧪 Agri Inputs / Fertilizers Shop</option>
              <option>🚚 Agricultural Transport</option>
              <option>🐄 Organic Manure Supplier</option>
              <option>💧 Drip Irrigation Dealer</option>
              <option>🐔 Poultry Waste Supplier</option>
            </select>
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;">
            <div>
              <label style="font-size:0.8rem;font-weight:700;color:var(--text-muted);display:block;margin-bottom:0.375rem;">Full Name / Contact Person</label>
              <input id="reg-name" type="text" placeholder="e.g. Ramesh Gowda" class="input" style="font-size:0.9rem;">
            </div>
            <div>
              <label style="font-size:0.8rem;font-weight:700;color:var(--text-muted);display:block;margin-bottom:0.375rem;">WhatsApp / Phone</label>
              <input id="reg-phone" type="tel" placeholder="+91 98XXX XXXXX" class="input" style="font-size:0.9rem;">
            </div>
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;">
            <div>
              <label style="font-size:0.8rem;font-weight:700;color:var(--text-muted);display:block;margin-bottom:0.375rem;">Business / Shop Name</label>
              <input id="reg-biz" type="text" placeholder="e.g. Sri Lakshmi Nursery" class="input" style="font-size:0.9rem;">
            </div>
            <div>
              <label style="font-size:0.8rem;font-weight:700;color:var(--text-muted);display:block;margin-bottom:0.375rem;">District & State</label>
              <input id="reg-dist" type="text" placeholder="e.g. Mandya, Karnataka" class="input" style="font-size:0.9rem;">
            </div>
          </div>

          <div>
            <label style="font-size:0.8rem;font-weight:700;color:var(--text-muted);display:block;margin-bottom:0.375rem;">Products / Services & Price List</label>
            <textarea id="reg-desc" rows="3" class="input" placeholder="Describe your plants, hourly rate, vehicle capacity, or fertilizer brands & prices…" style="resize:vertical;font-size:0.88rem;line-height:1.5;"></textarea>
          </div>

          <div>
            <label style="font-size:0.8rem;font-weight:700;color:var(--text-muted);display:block;margin-bottom:0.375rem;">Verification Documents <span style="font-weight:400;color:var(--text-muted);">(APMC License / Aadhaar / GST Certificate)</span></label>
            <input type="file" class="input" style="padding:0.5rem;font-size:0.85rem;cursor:pointer;">
          </div>
        </div>

        <div style="height:1px;background:var(--border);margin:1.125rem 0;"></div>

        <button onclick="KrishiProviderReg.submit()" class="btn btn-gold btn-full btn-lg">
          <i class="fa-solid fa-rocket"></i> Submit for Admin Verification
        </button>
        <p style="font-size:0.72rem;color:var(--text-muted);text-align:center;margin-top:0.625rem;">Admin review typically takes 1–2 hours. You'll receive an SMS confirmation once approved.</p>
      </div>
    </div>`;
  },

  submit() {
    const biz = document.getElementById('reg-biz')?.value || 'Your Agri Service';
    KrishiUtils.toast(`✅ "${biz}" submitted for verification!`, 'success');
    setTimeout(() => KrishiStore.setTab('home'), 1500);
  }
};
