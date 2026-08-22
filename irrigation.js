/**
 * KrishiSetu AI — Smart Irrigation Advisor v2 (Premium)
 */
window.KrishiIrrigation = {
  render() {
    const dealers = window.KrishiData.irrigationDealers;
    const p = window.KrishiStore.state.farmerProfile;
    return `
    <div class="anim-in" style="max-width:800px;margin:0 auto;display:flex;flex-direction:column;gap:1.25rem;">

      <!-- Banner -->
      <div style="background:linear-gradient(135deg,#0c4a6e,#0369a1,#0284c7);border-radius:var(--radius-2xl);padding:1.5rem;display:flex;align-items:center;justify-content:space-between;gap:1rem;overflow:hidden;position:relative;">
        <div style="position:absolute;right:-2rem;top:-2rem;width:9rem;height:9rem;background:rgba(255,255,255,0.05);border-radius:50%;"></div>
        <div style="position:relative;z-index:1;">
          <span style="font-size:0.65rem;font-weight:800;letter-spacing:0.07em;text-transform:uppercase;color:rgba(255,255,255,0.6);">💧 Water & Drip Intelligence</span>
          <h2 style="font-size:clamp(1.3rem,3.5vw,1.875rem);font-weight:900;color:#fff;letter-spacing:-0.025em;margin:0.3rem 0 0.375rem;">Smart Irrigation Advisor 🌊</h2>
          <p style="font-size:0.82rem;color:rgba(255,255,255,0.7);">Crop water requirement calculator, drip schedule & authorized dealer locator.</p>
        </div>
        <div style="font-size:3.5rem;opacity:0.25;flex-shrink:0;">🚰</div>
      </div>

      <!-- AI Recommendation Card -->
      <div class="card" style="padding:1.375rem;border-top:3px solid #0284c7;">
        <div style="margin-bottom:1rem;">
          <span class="badge badge-blue" style="margin-bottom:0.5rem;">🤖 AI Water Schedule for ${p.currentCrops[0]}</span>
          <h3 style="font-size:0.95rem;font-weight:800;color:var(--text-main);">Irrigation Recommendation — ${p.farmSizeAcres} Acres, ${p.soilType}</h3>
          <p style="font-size:0.75rem;color:var(--text-muted);margin-top:0.2rem;">Weather: 28°C, 20% rain probability · Optimal drip window: 05:30–07:30 AM</p>
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(11rem,1fr));gap:0.875rem;">
          ${[
            { icon:'💧', label:'Recommended Frequency', val:'Every 2 Days', sub:'Drip run: 45 mins', bg:'#eff6ff', border:'#bfdbfe', color:'#1e40af' },
            { icon:'💰', label:'Water Saved with Drip', val:'45% Savings', sub:'vs flood irrigation', bg:'#f0fdf4', border:'#bbf7d0', color:'#14532d' },
            { icon:'🏛️', label:'Govt Subsidy Available', val:'Up to 75%', sub:'PM Krishi Sinchayee', bg:'#fffbeb', border:'#fde68a', color:'#78350f' },
          ].map(st => `
            <div style="padding:1rem;background:${st.bg};border-radius:var(--radius-lg);border:1px solid ${st.border};text-align:center;">
              <div style="font-size:1.5rem;margin-bottom:0.375rem;">${st.icon}</div>
              <p style="font-size:0.65rem;color:var(--text-muted);font-weight:700;text-transform:uppercase;letter-spacing:0.05em;">${st.label}</p>
              <p style="font-size:1rem;font-weight:900;color:${st.color};margin:0.25rem 0 0.125rem;">${st.val}</p>
              <p style="font-size:0.7rem;color:var(--text-muted);">${st.sub}</p>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Dealer List -->
      <div>
        <div class="section-header">
          <h3 class="section-title"><i class="fa-solid fa-droplet" style="color:#0284c7;"></i> Authorized Drip & Solar Irrigation Dealers</h3>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(20rem,1fr));gap:1rem;">
          ${dealers.map(d => `
            <div class="card" style="padding:1.25rem;display:flex;flex-direction:column;gap:0.875rem;border-top:3px solid #0284c7;">
              <div style="display:flex;justify-content:space-between;align-items:flex-start;">
                <div>
                  <h4 style="font-size:0.92rem;font-weight:800;color:var(--text-main);">${d.name}</h4>
                  <p style="font-size:0.72rem;color:var(--text-muted);">Contact: ${d.contact} · ${d.distanceKm} km</p>
                  <p style="font-size:0.72rem;color:var(--text-muted);">${d.address}</p>
                </div>
                <span class="badge badge-blue">⭐ ${d.rating}</span>
              </div>
              <div style="display:flex;flex-wrap:wrap;gap:0.375rem;">
                ${d.services.map(s => `<span class="badge badge-blue" style="font-size:0.68rem;">${s}</span>`).join('')}
              </div>
              <button onclick="KrishiUtils.toast('📞 Calling ${d.name}: ${d.phone}');" class="btn btn-primary btn-sm btn-full">
                Call for Quotation & Subsidy Details
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    </div>`;
  }
};
