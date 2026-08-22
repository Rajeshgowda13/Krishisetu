/**
 * KrishiSetu AI — Agri Directory v2: Nurseries, Agri Inputs, Manure & Poultry (Premium)
 */
window.KrishiDirectory = {
  sub: 'nurseries',

  render() {
    return `
    <div class="anim-in" style="display:flex;flex-direction:column;gap:1.25rem;">

      <!-- Banner -->
      <div class="banner-emerald" style="border-radius:var(--radius-2xl);padding:1.5rem;">
        <div style="position:relative;z-index:1;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:1rem;">
          <div>
            <span style="font-size:0.65rem;font-weight:800;letter-spacing:0.07em;text-transform:uppercase;color:rgba(255,255,255,0.6);">🌱 Agri Directory & Store</span>
            <h2 style="font-size:clamp(1.3rem,3.5vw,1.875rem);font-weight:900;color:#fff;letter-spacing:-0.025em;margin:0.3rem 0 0.375rem;">Nurseries, Fertilizers & Organic Inputs</h2>
            <p style="font-size:0.82rem;color:rgba(255,255,255,0.7);">Locate nearby nurseries, verified agri-input shops, organic manure & poultry waste suppliers.</p>
          </div>

          <!-- Subtabs -->
          <div class="subtab-bar">
            <button onclick="KrishiDirectory.sub='nurseries';KrishiRouter.render();" class="subtab-btn ${this.sub==='nurseries'?'active':''}">🌿 Nurseries</button>
            <button onclick="KrishiDirectory.sub='inputs';KrishiRouter.render();" class="subtab-btn ${this.sub==='inputs'?'active':''}">🧪 Agri Store</button>
            <button onclick="KrishiDirectory.sub='manure';KrishiRouter.render();" class="subtab-btn ${this.sub==='manure'?'active':''}">🐄 Manure</button>
            <button onclick="KrishiDirectory.sub='poultry';KrishiRouter.render();" class="subtab-btn ${this.sub==='poultry'?'active':''}">🐔 Poultry</button>
          </div>
        </div>
      </div>

      <!-- Sub-content -->
      ${this.sub === 'nurseries' ? this._nurseries() : ''}
      ${this.sub === 'inputs'    ? this._inputs()    : ''}
      ${this.sub === 'manure'    ? this._manure()    : ''}
      ${this.sub === 'poultry'   ? this._poultry()   : ''}
    </div>`;
  },

  _nurseries() {
    const nurseries = window.KrishiData.nurseries;
    return `
      <!-- AI Planting Recommendation -->
      <div class="card" style="padding:1.375rem;background:linear-gradient(135deg,#f0fdf4,#ecfdf5);border:1.5px solid #86efac;">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:0.75rem;margin-bottom:1rem;">
          <div>
            <span class="badge badge-green" style="margin-bottom:0.5rem;">🤖 August Season AI Advisor</span>
            <h3 style="font-size:1rem;font-weight:800;color:var(--text-main);">What Should I Plant This Season?</h3>
            <p style="font-size:0.78rem;color:var(--text-muted);margin-top:0.2rem;">Based on ${window.KrishiStore.state.currentLocation.district} soil, rain forecast & mandi demand.</p>
          </div>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(14rem,1fr));gap:0.75rem;">
          ${[
            { rank:'🥇', name:'Tomato (Arka Rakshak Seedlings)', note:'High blight-resistance. Strong Kolar APMC demand.', profit:'₹1.2L/acre' },
            { rank:'🥈', name:'Byadgi Green Chilli', note:'Stable mandi price, high drying quality.', profit:'₹95K/acre' },
            { rank:'🥉', name:'Taiwan Pink Guava Saplings', note:'Perennial fruit crop, 12-month payback.', profit:'₹1.5L/acre' },
          ].map(c => `
            <div style="padding:0.875rem;background:#fff;border-radius:var(--radius-lg);border:1px solid #bbf7d0;">
              <p style="font-size:0.85rem;font-weight:800;color:var(--text-main);">${c.rank} ${c.name}</p>
              <p style="font-size:0.72rem;color:var(--text-muted);margin-top:0.25rem;line-height:1.4;">${c.note}</p>
              <p style="font-size:0.8rem;font-weight:800;color:var(--green-700);margin-top:0.375rem;">Est. Profit: ${c.profit}</p>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Nursery cards -->
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(20rem,1fr));gap:1.125rem;">
        ${nurseries.map(n => `
          <div class="card" style="padding:1.375rem;display:flex;flex-direction:column;gap:0.875rem;border-top:3px solid var(--green-500);">
            <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:0.75rem;">
              <div>
                <h3 style="font-size:0.95rem;font-weight:800;color:var(--text-main);line-height:1.2;">${n.name}</h3>
                <p style="font-size:0.72rem;color:var(--text-muted);margin-top:0.2rem;"><i class="fa-solid fa-location-dot" style="color:var(--gold-500);"></i> ${n.address}</p>
                <p style="font-size:0.72rem;color:var(--text-muted);">${n.openingHours} · ${n.distanceKm} km away</p>
              </div>
              <span class="badge badge-green" style="flex-shrink:0;">⭐ ${n.rating} (${n.reviewsCount})</span>
            </div>

            <div style="border:1px solid var(--border);border-radius:var(--radius-lg);overflow:hidden;">
              ${n.products.map(pr => `
                <div class="product-row" style="padding:0.6rem 0.875rem;">
                  <div><p class="product-name">${pr.photo} ${pr.name}</p><p class="product-sub">${pr.unit} · Stock: ${pr.stock.toLocaleString()}</p></div>
                  <p class="product-price">₹${pr.price}</p>
                </div>
              `).join('')}
            </div>

            <div style="display:flex;gap:0.625rem;">
              <a href="https://maps.google.com/?q=${n.lat},${n.lng}" target="_blank" class="btn btn-light btn-sm" style="flex:1;">
                <i class="fa-solid fa-map-location-dot" style="color:var(--gold-600);"></i> Google Maps
              </a>
              <button onclick="KrishiUtils.toast('📞 Calling ${n.name}: ${n.phone}');" class="btn btn-primary btn-sm" style="flex:1;">
                Call Nursery
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },

  _inputs() {
    const suppliers = window.KrishiData.suppliers;
    return `
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(20rem,1fr));gap:1.125rem;">
        ${suppliers.map(s => `
          <div class="card" style="padding:1.375rem;display:flex;flex-direction:column;gap:0.875rem;border-top:3px solid ${s.type.includes('External') ? 'var(--gold-500)' : 'var(--green-500)'};">
            <div>
              <span class="badge ${s.type.includes('External') ? 'badge-gold' : 'badge-green'}" style="margin-bottom:0.5rem;">${s.type}</span>
              <h3 style="font-size:0.95rem;font-weight:800;color:var(--text-main);">${s.name}</h3>
              <p style="font-size:0.72rem;color:var(--text-muted);">${s.address}</p>
              ${s.note ? `<p style="font-size:0.72rem;color:#92400e;background:#fffbeb;border:1px solid #fde68a;border-radius:var(--radius-sm);padding:0.4rem 0.6rem;margin-top:0.4rem;line-height:1.4;">${s.note}</p>` : ''}
            </div>
            <div style="border:1px solid var(--border);border-radius:var(--radius-lg);overflow:hidden;">
              ${s.products.map(pr => `
                <div class="product-row" style="padding:0.6rem 0.875rem;">
                  <div><p class="product-name">${pr.name}</p><p class="product-sub">${pr.category} · ${pr.unit}</p></div>
                  <p class="product-price">₹${pr.price}</p>
                </div>
              `).join('')}
            </div>
            ${s.externalUrl
              ? `<a href="${s.externalUrl}" target="_blank" class="btn btn-gold btn-sm btn-full"><i class="fa-solid fa-arrow-up-right-from-square"></i> Visit BigHaat Webstore</a>`
              : `<button onclick="KrishiUtils.toast('📞 Calling ${s.name}: ${s.phone}');" class="btn btn-primary btn-sm btn-full">Call Verified Dealer</button>`
            }
          </div>
        `).join('')}
      </div>
    `;
  },

  _manure() {
    return `
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(20rem,1fr));gap:1.125rem;">
        ${window.KrishiData.manureSuppliers.map(m => `
          <div class="card" style="padding:1.375rem;display:flex;flex-direction:column;gap:0.875rem;border-top:3px solid #d97706;">
            <div style="display:flex;align-items:center;gap:0.75rem;">
              <div style="width:2.75rem;height:2.75rem;border-radius:var(--radius-md);background:var(--gold-100);display:flex;align-items:center;justify-content:center;font-size:1.4rem;flex-shrink:0;">🐄</div>
              <div>
                <h3 style="font-size:0.95rem;font-weight:800;color:var(--text-main);">${m.name}</h3>
                <p style="font-size:0.72rem;color:var(--text-muted);">${m.address} · ${m.distanceKm} km</p>
              </div>
            </div>
            <div style="padding:0.875rem;background:var(--gold-50);border-radius:var(--radius-lg);border:1px solid var(--gold-200);">
              <p style="font-size:0.85rem;font-weight:700;color:var(--text-main);">${m.productType}</p>
              <div style="display:flex;justify-content:space-between;margin-top:0.5rem;font-size:0.8rem;">
                <span style="color:var(--text-muted);">Price: <strong style="color:var(--gold-800);">₹${m.pricePerTonne}/tonne</strong></span>
                <span style="color:var(--text-muted);">Stock: <strong>${m.availableTons}T</strong></span>
              </div>
              <p style="font-size:0.72rem;color:var(--text-muted);margin-top:0.375rem;">${m.deliveryOption}</p>
            </div>
            <button onclick="KrishiUtils.toast('📞 Calling ${m.name}: ${m.phone}');" class="btn btn-gold btn-sm btn-full">Call for Delivery</button>
          </div>
        `).join('')}
      </div>
    `;
  },

  _poultry() {
    return `
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(20rem,1fr));gap:1.125rem;">
        ${window.KrishiData.poultryWasteSuppliers.map(p => `
          <div class="card" style="padding:1.375rem;display:flex;flex-direction:column;gap:0.875rem;border-top:3px solid #64748b;">
            <div style="display:flex;align-items:center;gap:0.75rem;">
              <div style="width:2.75rem;height:2.75rem;border-radius:var(--radius-md);background:#f1f5f9;display:flex;align-items:center;justify-content:center;font-size:1.4rem;flex-shrink:0;">🐔</div>
              <div>
                <h3 style="font-size:0.95rem;font-weight:800;color:var(--text-main);">${p.name}</h3>
                <p style="font-size:0.72rem;color:var(--text-muted);">${p.address} · ${p.distanceKm} km</p>
              </div>
            </div>
            <p style="font-size:0.78rem;color:var(--green-800);background:#f0fdf4;border:1px solid #bbf7d0;border-radius:var(--radius-md);padding:0.5rem 0.75rem;font-weight:600;">${p.complianceNotice}</p>
            <div style="padding:0.875rem;background:var(--earth-50);border-radius:var(--radius-lg);border:1px solid var(--border);display:flex;justify-content:space-between;font-size:0.8rem;">
              <span style="color:var(--text-muted);">Price:</span>
              <strong style="color:var(--text-main);">₹${p.pricePerTonne}/tonne (${p.availableTons}T available)</strong>
            </div>
            <button onclick="KrishiUtils.toast('📞 Calling ${p.name}: ${p.phone}');" class="btn btn-primary btn-sm btn-full">Contact Supplier</button>
          </div>
        `).join('')}
      </div>
    `;
  }
};
