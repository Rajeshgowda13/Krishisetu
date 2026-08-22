/**
 * KrishiSetu AI — Sell Smart AI Module v2 (Premium)
 */
window.KrishiSellSmart = {
  sel: 'mp-1',

  render() {
    const prices = window.KrishiData.marketPrices;
    const item = prices.find(p => p.id === this.sel) || prices[0];
    const trendIcon = item.trend === 'up' ? '📈' : item.trend === 'down' ? '📉' : '➡️';
    const trendCls  = item.trend === 'up' ? 'chip-up' : item.trend === 'down' ? 'chip-down' : 'chip-flat';

    return `
    <div class="anim-in" style="display:flex;flex-direction:column;gap:1.25rem;">

      <!-- Banner -->
      <div class="banner-gold" style="border-radius:var(--radius-2xl);padding:1.5rem;position:relative;overflow:hidden;">
        <div style="position:absolute;right:-2rem;top:-2rem;width:10rem;height:10rem;background:rgba(255,255,255,0.05);border-radius:50%;"></div>
        <div style="position:relative;z-index:1;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:1rem;">
          <div>
            <span style="font-size:0.65rem;font-weight:800;letter-spacing:0.07em;text-transform:uppercase;color:rgba(255,255,255,0.65);">🤖 AI Market Intelligence Engine</span>
            <h2 style="font-size:clamp(1.4rem,4vw,2rem);font-weight:900;color:#fff;letter-spacing:-0.025em;margin:0.3rem 0 0.4rem;">SELL SMART AI 📈</h2>
            <p style="font-size:0.82rem;color:rgba(255,255,255,0.75);max-width:36rem;">30-day price trend forecasting, mandi net-return comparison & trusted buyer matchmaking.</p>
          </div>

          <!-- Crop tab pills -->
          <div style="display:flex;flex-wrap:wrap;gap:0.375rem;background:rgba(0,0,0,0.2);border-radius:var(--radius-lg);padding:0.3rem;">
            ${prices.map(p => `
              <button onclick="KrishiSellSmart.sel='${p.id}';KrishiRouter.render();" style="padding:0.375rem 0.875rem;border-radius:var(--radius-md);font-size:0.78rem;font-weight:700;border:none;cursor:pointer;font-family:var(--font);transition:all 0.15s;${p.id===this.sel ? 'background:#fff;color:#78350f;box-shadow:0 2px 8px rgba(0,0,0,0.15);' : 'background:transparent;color:rgba(255,255,255,0.75);'}">
                ${p.crop.split(' ')[0]}
              </button>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- ── TODAY'S PRICE HIGHLIGHT ── -->
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(10rem,1fr));gap:0.875rem;">

        <div class="card" style="padding:1.25rem;border-left:4px solid var(--green-500);">
          <p style="font-size:0.68rem;font-weight:700;color:var(--text-muted);letter-spacing:0.05em;text-transform:uppercase;margin-bottom:0.375rem;">Today's Modal Price</p>
          <div style="display:flex;align-items:baseline;gap:0.375rem;">
            <span style="font-size:2rem;font-weight:900;color:var(--text-main);letter-spacing:-0.03em;">${KrishiUtils.formatINR(item.modalPrice)}</span>
            <span style="font-size:0.72rem;color:var(--text-muted);">/ ${item.unit}</span>
          </div>
          <div style="display:flex;align-items:center;gap:0.5rem;margin-top:0.375rem;">
            <span class="${trendCls}">${trendIcon} ${Math.abs(item.trendPercent)}% vs yesterday</span>
          </div>
          <p style="font-size:0.7rem;color:var(--text-muted);margin-top:0.25rem;">${item.mandi}</p>
        </div>

        <div class="card" style="padding:1.25rem;border-left:4px solid var(--gold-400);">
          <p style="font-size:0.68rem;font-weight:700;color:var(--text-muted);letter-spacing:0.05em;text-transform:uppercase;margin-bottom:0.375rem;">Mandi Range Today</p>
          <div style="display:flex;align-items:center;gap:0.625rem;margin-top:0.25rem;">
            <span style="font-size:1.2rem;font-weight:800;color:#b45309;">${KrishiUtils.formatINR(item.minPrice)}</span>
            <span style="color:#d1d5db;">—</span>
            <span style="font-size:1.2rem;font-weight:800;color:var(--green-700);">${KrishiUtils.formatINR(item.maxPrice)}</span>
          </div>
          <p style="font-size:0.7rem;color:var(--text-muted);margin-top:0.375rem;">Source: <strong>${item.source}</strong></p>
          <p style="font-size:0.7rem;color:var(--text-muted);">Updated: ${item.updatedAt}</p>
        </div>

        <div class="card" style="padding:1.25rem;border-left:4px solid #3b82f6;display:flex;flex-direction:column;justify-content:space-between;">
          <div>
            <p style="font-size:0.68rem;font-weight:700;color:var(--text-muted);letter-spacing:0.05em;text-transform:uppercase;margin-bottom:0.375rem;">Set Price Alert</p>
            <p style="font-size:0.85rem;font-weight:700;color:var(--text-main);">Get notified when ${item.crop.split(' ')[0]} hits ₹30/kg</p>
          </div>
          <button onclick="KrishiUtils.toast('🔔 Alert set for ${item.crop.split(' ')[0]} @ ₹30/kg!');" class="btn btn-primary btn-sm" style="margin-top:0.875rem;">
            <i class="fa-solid fa-bell"></i> Set Alert
          </button>
        </div>
      </div>

      <!-- ── AI PRICE CHART ── -->
      <div class="card" style="padding:1.5rem;">
        <div style="display:flex;flex-wrap:wrap;align-items:flex-start;justify-content:space-between;gap:0.75rem;margin-bottom:1rem;">
          <div>
            <span style="font-size:0.68rem;font-weight:800;letter-spacing:0.07em;text-transform:uppercase;color:var(--gold-700);background:var(--gold-100);padding:0.2rem 0.6rem;border-radius:99px;border:1px solid var(--gold-200);">AI Forecast Model · XGBoost + SARIMA</span>
            <h3 style="font-size:1.05rem;font-weight:800;color:var(--text-main);margin-top:0.5rem;">${item.crop} — Historical Prices + 30-Day AI Forecast</h3>
          </div>
        </div>

        ${KrishiUtils.renderChart(item.historical, item.forecast)}

        <!-- Forecast cards row -->
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(8rem,1fr));gap:0.625rem;margin-top:1rem;">
          ${item.forecast.map(f => `
            <div class="forecast-card">
              <div class="fc-day">${f.day.split(' ')[0]}</div>
              <div class="fc-price">₹${f.price}</div>
              <div class="fc-range">₹${f.min}–₹${f.max}</div>
              <div style="margin-top:0.35rem;">
                <span class="${f.direction==='up' ? 'chip-up' : f.direction==='down' ? 'chip-down' : 'chip-flat'}" style="font-size:0.62rem;">
                  ${f.direction==='up' ? '📈' : f.direction==='down' ? '📉' : '➡️'} ${f.confidence}%
                </span>
              </div>
            </div>
          `).join('')}
        </div>

        <div style="margin-top:1rem;padding:0.75rem 0.875rem;background:#fffbeb;border-radius:var(--radius-md);border:1px solid var(--gold-200);display:flex;gap:0.625rem;align-items:flex-start;">
          <i class="fa-solid fa-triangle-exclamation" style="color:var(--gold-600);flex-shrink:0;margin-top:0.1rem;"></i>
          <p style="font-size:0.75rem;color:#78350f;line-height:1.45;"><strong>Disclaimer:</strong> AI forecasts are estimates based on historical mandi trends and weather models. Not guaranteed future prices. Always cross-verify with Agmarknet.gov.in.</p>
        </div>
      </div>

      <!-- ── BEST TIME TO SELL + NET RETURN ── -->
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(18rem,1fr));gap:1rem;">

        <!-- Best Time to Sell -->
        <div class="card" style="padding:1.375rem;">
          <h3 style="font-size:0.95rem;font-weight:800;color:var(--text-main);display:flex;align-items:center;gap:0.5rem;margin-bottom:0.875rem;">
            <i class="fa-solid fa-clock" style="color:var(--green-600);"></i> Best Time to Sell
          </h3>

          <div style="padding:1rem;background:#f0fdf4;border-radius:var(--radius-lg);border:1px solid #bbf7d0;display:flex;gap:0.75rem;margin-bottom:0.875rem;">
            <div style="width:2.5rem;height:2.5rem;border-radius:var(--radius-md);background:var(--green-600);display:flex;align-items:center;justify-content:center;color:#fff;font-size:1.1rem;flex-shrink:0;">💡</div>
            <div>
              <p style="font-size:0.85rem;font-weight:800;color:#14532d;">Recommendation: Hold 3–5 Days</p>
              <p style="font-size:0.75rem;color:#166534;line-height:1.4;margin-top:0.2rem;">Mandi arrivals in Kolar & Mandya are down 12%. Price expected to rise from ₹26 → ₹28.50/kg by Friday.</p>
            </div>
          </div>

          <div style="display:flex;flex-direction:column;gap:0.5rem;">
            ${[
              { label:'Option A — Sell Today @ ₹26/kg', note:'Low risk · Immediate cash', best:false },
              { label:'Option B — Wait 3–5 Days (~₹28.50/kg)', note:'🏆 Best estimated profit', best:true },
              { label:'Option C — Partial Sale (Sell 50% now)', note:'Balanced hedging strategy', best:false },
            ].map(o => `
              <div style="padding:0.75rem 0.875rem;border-radius:var(--radius-md);border:${o.best ? '2px solid #86efac;background:#f0fdf4;' : '1px solid var(--border);background:var(--earth-50);'}">
                <p style="font-size:0.82rem;font-weight:${o.best ? '800' : '600'};color:${o.best ? '#14532d' : 'var(--text-main)'};">${o.label}</p>
                <p style="font-size:0.7rem;color:${o.best ? '#16a34a' : 'var(--text-muted)'};">${o.note}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Net Return Calculator -->
        <div class="card" style="padding:1.375rem;">
          <h3 style="font-size:0.95rem;font-weight:800;color:var(--text-main);display:flex;align-items:center;gap:0.5rem;margin-bottom:0.875rem;">
            <i class="fa-solid fa-calculator" style="color:var(--gold-600);"></i> Best Market Net Return
          </h3>
          <p style="font-size:0.75rem;color:var(--text-muted);margin-bottom:0.875rem;">Ranks mandis by <em>actual profit</em> after deducting transport, loading & mandi fees.</p>

          <div style="display:flex;flex-direction:column;gap:0.625rem;">
            <div class="net-return-row best">
              <div>
                <p style="font-size:0.82rem;font-weight:800;color:var(--text-main);">🥇 Kolar APMC Market</p>
                <p style="font-size:0.7rem;color:var(--text-muted);">12.4 km · Gross ₹26,000 − Costs ₹2,200</p>
              </div>
              <div style="text-align:right;">
                <p style="font-size:1rem;font-weight:900;color:var(--green-700);">₹23,800</p>
                <p style="font-size:0.65rem;color:var(--text-muted);">Net Return</p>
              </div>
            </div>

            <div class="net-return-row">
              <div>
                <p style="font-size:0.82rem;font-weight:700;color:var(--text-main);">🥈 Mandya APMC Yard</p>
                <p style="font-size:0.7rem;color:var(--text-muted);">6.8 km · Gross ₹24,000 − Costs ₹1,300</p>
              </div>
              <div style="text-align:right;">
                <p style="font-size:1rem;font-weight:800;color:var(--text-main);">₹22,700</p>
                <p style="font-size:0.65rem;color:var(--text-muted);">Net Return</p>
              </div>
            </div>

            <div class="net-return-row">
              <div>
                <p style="font-size:0.82rem;font-weight:700;color:var(--text-main);">🥉 Yeshwanthpur APMC</p>
                <p style="font-size:0.7rem;color:var(--text-muted);">18.2 km · Gross ₹25,000 − Costs ₹3,100</p>
              </div>
              <div style="text-align:right;">
                <p style="font-size:1rem;font-weight:800;color:var(--text-main);">₹21,900</p>
                <p style="font-size:0.65rem;color:var(--text-muted);">Net Return</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ── BEST BUYER MATCHMAKER ── -->
      <div class="card" style="padding:1.5rem;">
        <div class="section-header">
          <h3 class="section-title"><i class="fa-solid fa-handshake" style="color:var(--green-600);"></i> Verified Buyer Offers — ${item.crop}</h3>
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(15rem,1fr));gap:1rem;">
          ${window.KrishiData.buyers.map(b => `
            <div class="card buyer-card-${b.trustLevel}" style="padding:1.25rem;display:flex;flex-direction:column;gap:0.875rem;">
              <div style="display:flex;align-items:center;justify-content:space-between;">
                <span class="badge ${b.trustLevel==='trusted' ? 'trust-trusted' : b.trustLevel==='verified' ? 'trust-verified' : 'trust-new'}">${b.trustLabel}</span>
                <span style="font-size:0.72rem;color:var(--text-muted);font-weight:600;">${b.distanceKm} km</span>
              </div>
              <div>
                <p style="font-size:0.88rem;font-weight:800;color:var(--text-main);line-height:1.2;">${b.name}</p>
                <p style="font-size:0.75rem;color:var(--text-muted);margin-top:0.2rem;">${b.contactPerson}</p>
              </div>
              ${b.trustLevel === 'new' ? `
                <div style="padding:0.6rem 0.75rem;background:#fffbeb;border-radius:var(--radius-md);border:1px solid #fde68a;display:flex;gap:0.5rem;align-items:flex-start;">
                  <i class="fa-solid fa-triangle-exclamation" style="color:var(--gold-600);font-size:0.85rem;flex-shrink:0;margin-top:0.1rem;"></i>
                  <p style="font-size:0.7rem;color:#78350f;line-height:1.35;">New buyer. Recommend Escrow or Spot Cash payment.</p>
                </div>
              ` : ''}
              <div style="padding:0.75rem;background:var(--earth-50);border-radius:var(--radius-md);border:1px solid var(--border);">
                <div style="display:flex;justify-content:space-between;align-items:center;">
                  <span style="font-size:0.72rem;color:var(--text-muted);">Offered Price:</span>
                  <span style="font-size:1.1rem;font-weight:900;color:var(--green-700);">₹${b.offeredPriceKg}/kg</span>
                </div>
                <p style="font-size:0.68rem;color:var(--text-muted);margin-top:0.2rem;">${b.paymentTerms}</p>
              </div>
              <button onclick="KrishiBuyers.openNegotiationModal('${b.id}')" class="btn btn-primary btn-sm btn-full">
                <i class="fa-solid fa-comments-dollar"></i> Negotiate & Sell
              </button>
            </div>
          `).join('')}
        </div>
      </div>

    </div>`;
  }
};
