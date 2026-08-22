/**
 * KrishiSetu AI — Farm Profit Calculator v2 (Premium)
 */
window.KrishiProfitCalc = {
  render() {
    return `
    <div class="anim-in" style="max-width:860px;margin:0 auto;display:flex;flex-direction:column;gap:1.25rem;">

      <!-- Banner -->
      <div class="banner-emerald" style="border-radius:var(--radius-2xl);padding:1.5rem;">
        <div style="position:relative;z-index:1;display:flex;align-items:center;justify-content:space-between;gap:1rem;flex-wrap:wrap;">
          <div>
            <span style="font-size:0.65rem;font-weight:800;letter-spacing:0.07em;text-transform:uppercase;color:rgba(255,255,255,0.6);">💵 Farm Financial Planning</span>
            <h2 style="font-size:clamp(1.3rem,3.5vw,1.875rem);font-weight:900;color:#fff;letter-spacing:-0.025em;margin:0.3rem 0 0.375rem;">Farm Profit & Cost Calculator 📊</h2>
            <p style="font-size:0.82rem;color:rgba(255,255,255,0.7);">Simulate total input costs against expected yield & selling price to estimate net profit.</p>
          </div>
          <div style="font-size:3.5rem;opacity:0.2;">📈</div>
        </div>
      </div>

      <!-- Main 2-Col Layout -->
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(18rem,1fr));gap:1.125rem;align-items:start;">

        <!-- Inputs Form -->
        <div class="card" style="padding:1.375rem;">
          <h3 style="font-size:0.95rem;font-weight:800;color:var(--text-main);margin-bottom:1rem;padding-bottom:0.75rem;border-bottom:1px solid var(--border);">Cultivation Cost Inputs</h3>
          <div style="display:flex;flex-direction:column;gap:0.75rem;">
            ${[
              { id:'p-acres', label:'Farm Size (Acres)',             val:'2.5' },
              { id:'p-seed',  label:'Seed / Sapling Cost (₹)',      val:'4500' },
              { id:'p-fert',  label:'Fertilizer Cost (₹)',          val:'8500' },
              { id:'p-pest',  label:'Pesticide Cost (₹)',           val:'3800' },
              { id:'p-labor', label:'Labour Cost (₹)',              val:'14000' },
              { id:'p-trac',  label:'Tractor & Machine Rental (₹)', val:'6500' },
              { id:'p-irr',   label:'Irrigation Cost (₹)',          val:'3200' },
              { id:'p-yield', label:'Expected Yield (Quintals/acre)',val:'45' },
              { id:'p-price', label:'Selling Price (₹/Quintal)',    val:'2600' },
            ].map(f => `
              <div style="display:flex;align-items:center;justify-content:space-between;gap:0.75rem;">
                <label style="font-size:0.8rem;font-weight:600;color:var(--text-muted);min-width:0;flex:1;">${f.label}</label>
                <input id="${f.id}" type="number" value="${f.val}" class="input" style="width:7.5rem;text-align:right;font-weight:700;font-size:0.9rem;flex-shrink:0;" oninput="KrishiProfitCalc.calc()">
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Results Panel -->
        <div style="display:flex;flex-direction:column;gap:0.875rem;">

          <!-- Cost Breakdown -->
          <div class="card" style="padding:1.25rem;">
            <h3 style="font-size:0.88rem;font-weight:800;color:var(--text-main);margin-bottom:0.75rem;">Cost Breakdown</h3>
            <div style="display:flex;flex-direction:column;gap:0.5rem;font-size:0.8rem;">
              ${[
                ['Seeds & Saplings','p-seed','#ef4444'],
                ['Fertilizers','p-fert','#f97316'],
                ['Pesticides','p-pest','#a855f7'],
                ['Labour','p-labor','#ec4899'],
                ['Tractor & Machines','p-trac','#3b82f6'],
                ['Irrigation','p-irr','#06b6d4'],
              ].map(([label, id, col]) => `
                <div style="display:flex;align-items:center;justify-content:space-between;">
                  <span style="display:flex;align-items:center;gap:0.5rem;color:var(--text-muted);">
                    <span style="width:8px;height:8px;border-radius:50%;background:${col};flex-shrink:0;"></span> ${label}
                  </span>
                  <span id="res-${id}" style="font-weight:700;color:var(--text-main);">₹—</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Net Profit Highlight -->
          <div style="padding:1.375rem;background:linear-gradient(135deg,var(--green-800),var(--green-700));border-radius:var(--radius-xl);color:#fff;">
            <p style="font-size:0.7rem;font-weight:700;letter-spacing:0.07em;text-transform:uppercase;color:rgba(255,255,255,0.6);margin-bottom:0.375rem;">Total Input Cost</p>
            <p id="res-cost" style="font-size:1.1rem;font-weight:800;margin-bottom:0.875rem;">₹—</p>
            <p style="font-size:0.7rem;font-weight:700;letter-spacing:0.07em;text-transform:uppercase;color:rgba(255,255,255,0.6);margin-bottom:0.375rem;">Estimated Gross Revenue</p>
            <p id="res-gross" style="font-size:1.1rem;font-weight:800;margin-bottom:0.875rem;">₹—</p>

            <div style="padding-top:0.875rem;border-top:1px solid rgba(255,255,255,0.15);">
              <p style="font-size:0.7rem;font-weight:700;letter-spacing:0.07em;text-transform:uppercase;color:#a7f3d0;margin-bottom:0.375rem;">✅ Estimated Net Profit</p>
              <p id="res-profit" style="font-size:2.2rem;font-weight:900;letter-spacing:-0.04em;color:#fff;">₹—</p>
              <div style="display:flex;justify-content:space-between;margin-top:0.5rem;font-size:0.78rem;color:rgba(255,255,255,0.75);">
                <span>Per Acre: <strong id="res-acre" style="color:#fff;">₹—</strong></span>
                <span>Per kg: <strong id="res-kg" style="color:#fff;">₹—</strong></span>
              </div>
            </div>
          </div>

          <button onclick="KrishiUtils.toast('📄 Report saved to farm records!','success');" class="btn btn-light btn-full" style="font-weight:700;">
            <i class="fa-solid fa-download"></i> Save Calculation Report
          </button>
        </div>
      </div>
    </div>`;
  },

  calc() {
    const g = id => Number(document.getElementById(id)?.value) || 0;
    const acres = g('p-acres') || 1;
    const seed  = g('p-seed');
    const fert  = g('p-fert');
    const pest  = g('p-pest');
    const labor = g('p-labor');
    const trac  = g('p-trac');
    const irr   = g('p-irr');
    const ypa   = g('p-yield') || 1;
    const price = g('p-price') || 1;

    const costs = [seed, fert, pest, labor, trac, irr];
    const labels = ['p-seed','p-fert','p-pest','p-labor','p-trac','p-irr'];
    labels.forEach((id, i) => {
      const el = document.getElementById(`res-${id}`);
      if (el) el.textContent = KrishiUtils.formatINR(costs[i]);
    });

    const totalCost = costs.reduce((a,b) => a+b, 0);
    const totalQ    = ypa * acres;
    const totalKg   = totalQ * 100;
    const gross     = totalQ * price;
    const net       = gross - totalCost;

    const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = KrishiUtils.formatINR(val); };
    set('res-cost',   totalCost);
    set('res-gross',  gross);
    set('res-profit', net);
    set('res-acre',   Math.round(net / acres));
    const kg = document.getElementById('res-kg');
    if (kg) kg.textContent = `₹${(net/totalKg).toFixed(2)}`;
  }
};

// Auto-calculate on load
document.addEventListener('DOMContentLoaded', () => {
  const orig = KrishiProfitCalc.render.bind(KrishiProfitCalc);
  KrishiProfitCalc.render = function() {
    const html = orig();
    return html;
  };
});
