/**
 * KrishiSetu AI — Buyers Marketplace & Trust System v2 (Premium)
 */
window.KrishiBuyers = {
  render() {
    const buyers = window.KrishiData.buyers;
    const listings = window.KrishiStore.state.cropListings;
    return `
    <div class="anim-in" style="display:flex;flex-direction:column;gap:1.25rem;">

      <!-- Banner -->
      <div style="background:linear-gradient(135deg,#0a1f14,#153d27,#0f6642);border-radius:var(--radius-2xl);padding:1.5rem;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:1rem;overflow:hidden;position:relative;">
        <div style="position:absolute;right:-2rem;top:-2rem;width:10rem;height:10rem;background:rgba(255,255,255,0.04);border-radius:50%;"></div>
        <div style="position:relative;z-index:1;">
          <span style="font-size:0.65rem;font-weight:800;letter-spacing:0.07em;text-transform:uppercase;color:rgba(255,255,255,0.6);">🛒 Farmer-to-Buyer Direct Commerce</span>
          <h2 style="font-size:clamp(1.3rem,3.5vw,1.875rem);font-weight:900;color:#fff;letter-spacing:-0.025em;margin:0.3rem 0 0.375rem;">Sell Produce & Compare Buyer Offers 🥕</h2>
          <p style="font-size:0.82rem;color:rgba(255,255,255,0.7);">Discover verified buyers, negotiate prices & trade safely with 3-tier trust badges.</p>
        </div>
        <button onclick="KrishiBuyers.openCreateListing()" class="btn btn-gold" style="flex-shrink:0;">
          <i class="fa-solid fa-plus"></i> Post Harvest Listing
        </button>
      </div>

      <!-- Active Crop Listings -->
      ${listings.length > 0 ? `
        <div>
          <div class="section-header">
            <h3 class="section-title"><i class="fa-solid fa-wheat-awn" style="color:var(--green-600);"></i> Your Active Crop Listings</h3>
            <span class="section-badge">${listings.length} Active</span>
          </div>
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(18rem,1fr));gap:0.875rem;">
            ${listings.map(l => `
              <div class="card" style="padding:1.125rem;border-left:4px solid var(--green-500);">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.75rem;">
                  <div style="display:flex;align-items:center;gap:0.625rem;">
                    <span style="font-size:1.75rem;">${l.photos[0]}</span>
                    <div>
                      <p style="font-size:0.92rem;font-weight:800;color:var(--text-main);">${l.crop}</p>
                      <p style="font-size:0.72rem;color:var(--text-muted);">${l.variety}</p>
                    </div>
                  </div>
                  ${l.isOrganic ? `<span class="badge badge-green">🌿 Organic</span>` : ''}
                </div>
                <div style="display:flex;justify-content:space-between;padding:0.75rem;background:var(--earth-50);border-radius:var(--radius-md);border:1px solid var(--border);font-size:0.8rem;">
                  <div><p style="color:var(--text-muted);">Quantity</p><p style="font-weight:800;color:var(--text-main);">${l.quantityKg} kg</p></div>
                  <div style="text-align:right;"><p style="color:var(--text-muted);">Expected Price</p><p style="font-weight:900;color:var(--green-700);font-size:0.95rem;">₹${l.expectedPricePerKg}/kg</p></div>
                </div>
                <p style="font-size:0.7rem;color:var(--text-muted);margin-top:0.5rem;">${l.qualityGrade} · ${l.location}</p>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <!-- Buyer Discovery -->
      <div>
        <div class="section-header">
          <h3 class="section-title"><i class="fa-solid fa-shield-halved" style="color:#3b82f6;"></i> Verified Nearby Buyers & Trust Index</h3>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(19rem,1fr));gap:1.125rem;">
          ${buyers.map(b => {
            const borderColor = b.trustLevel==='trusted' ? '#3b82f6' : b.trustLevel==='verified' ? '#22c55e' : '#94a3b8';
            return `
            <div class="card buyer-card-${b.trustLevel}" style="padding:1.375rem;display:flex;flex-direction:column;gap:0.875rem;">

              <!-- Trust badge + distance -->
              <div style="display:flex;align-items:center;justify-content:space-between;">
                <span class="badge ${b.trustLevel==='trusted' ? 'trust-trusted' : b.trustLevel==='verified' ? 'trust-verified' : 'trust-new'}">${b.trustLabel}</span>
                <span style="font-size:0.72rem;color:var(--text-muted);font-weight:600;"><i class="fa-solid fa-location-dot" style="color:var(--gold-500);"></i> ${b.distanceKm} km</span>
              </div>

              <!-- Buyer name -->
              <div>
                <h4 style="font-size:0.92rem;font-weight:800;color:var(--text-main);line-height:1.25;">${b.name}</h4>
                <p style="font-size:0.75rem;color:var(--text-muted);margin-top:0.2rem;">${b.contactPerson}</p>
                <p style="font-size:0.72rem;color:var(--text-muted);margin-top:0.1rem;line-height:1.35;">${b.trustDesc}</p>
              </div>

              <!-- Escrow warning for new buyers -->
              ${b.trustLevel === 'new' ? `
                <div style="padding:0.6rem 0.75rem;background:#fffbeb;border-radius:var(--radius-md);border:1px solid #fde68a;display:flex;gap:0.5rem;align-items:flex-start;">
                  <i class="fa-solid fa-triangle-exclamation" style="color:#d97706;font-size:0.9rem;flex-shrink:0;margin-top:0.1rem;"></i>
                  <p style="font-size:0.72rem;color:#78350f;line-height:1.35;font-weight:600;">New buyer. Recommend <strong>Escrow</strong> or <strong>Spot Cash</strong> for your safety.</p>
                </div>
              ` : ''}

              <!-- Offer price box -->
              <div style="padding:0.875rem;background:var(--earth-50);border-radius:var(--radius-lg);border:1px solid var(--border);">
                <div style="display:flex;justify-content:space-between;align-items:center;">
                  <span style="font-size:0.75rem;color:var(--text-muted);">Offered Price:</span>
                  <span style="font-size:1.15rem;font-weight:900;color:var(--green-700);">₹${b.offeredPriceKg}/kg</span>
                </div>
                <p style="font-size:0.68rem;color:var(--text-muted);margin-top:0.25rem;">${b.paymentTerms}</p>
                <div style="display:flex;justify-content:space-between;margin-top:0.375rem;font-size:0.72rem;color:var(--text-muted);">
                  <span>Crops: <strong style="color:var(--text-main);">${b.cropsPurchased.join(', ')}</strong></span>
                  <span>⭐ ${b.rating} (${b.completedTransactions} deals)</span>
                </div>
              </div>

              <!-- Offer accepted OR negotiate button -->
              ${KrishiNotifs.isAccepted('buyer-'+b.id) ? `
                <div style="padding:0.875rem;background:#f0fdf4;border-radius:var(--radius-lg);border:2px solid #22c55e;text-align:center;">
                  <p style="font-size:0.88rem;font-weight:800;color:#14532d;">✅ ${b.contactPerson} Accepted Your Offer!</p>
                  <p style="font-size:0.72rem;color:#166534;margin-top:0.2rem;">Confirm pickup time &amp; delivery details directly with the buyer.</p>
                  <button onclick="KrishiUtils.toast('📞 Calling ${b.contactPerson}: ${b.phone}');" class="btn btn-primary btn-sm" style="margin-top:0.625rem;">
                    <i class="fa-solid fa-phone"></i> Call Buyer
                  </button>
                </div>
              ` : `
                <button onclick="KrishiBuyers.openNegotiationModal('${b.id}')" class="btn btn-primary btn-sm btn-full">
                  <i class="fa-solid fa-comments-dollar"></i> Negotiate &amp; Sell Harvest
                </button>
              `}
            </div>`;
          }).join('')}
        </div>
      </div>
    </div>`;
  },

  openCreateListing() {
    KrishiUtils.openModal(`
      <h3 style="font-size:1.05rem;font-weight:900;color:var(--text-main);margin-bottom:1rem;padding-right:2rem;">Post New Harvest Listing</h3>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;margin-bottom:0.75rem;">
        <div><label style="font-size:0.78rem;font-weight:700;color:var(--text-muted);display:block;margin-bottom:0.3rem;">Crop Name</label><input id="lc" type="text" value="Tomato (Hybrid)" class="input" style="font-size:0.88rem;"></div>
        <div><label style="font-size:0.78rem;font-weight:700;color:var(--text-muted);display:block;margin-bottom:0.3rem;">Variety</label><input id="lv" type="text" value="Arka Ananya" class="input" style="font-size:0.88rem;"></div>
        <div><label style="font-size:0.78rem;font-weight:700;color:var(--text-muted);display:block;margin-bottom:0.3rem;">Quantity (kg)</label><input id="lq" type="number" value="1500" class="input" style="font-size:0.88rem;"></div>
        <div><label style="font-size:0.78rem;font-weight:700;color:var(--text-muted);display:block;margin-bottom:0.3rem;">Expected Price (₹/kg)</label><input id="lp" type="number" value="26" class="input" style="font-size:0.88rem;"></div>
      </div>
      <button onclick="KrishiBuyers.saveListing()" class="btn btn-gold btn-full">
        <i class="fa-solid fa-broadcast-tower"></i> Publish to Nearby Buyers
      </button>
    `);
  },

  saveListing() {
    KrishiStore.addCropListing({
      id: 'l-' + Date.now(),
      farmerName: KrishiStore.state.farmerProfile.fullName,
      farmerPhone: KrishiStore.state.farmerProfile.phone,
      crop: document.getElementById('lc')?.value || 'Tomato',
      variety: document.getElementById('lv')?.value || '',
      quantityKg: Number(document.getElementById('lq')?.value) || 1000,
      qualityGrade: 'Grade A',
      expectedPricePerKg: Number(document.getElementById('lp')?.value) || 25,
      harvestDate: '2026-08-20',
      location: KrishiStore.state.currentLocation.name,
      isOrganic: true,
      photos: ['🍅'],
      status: 'Active'
    });
    KrishiUtils.toast('✅ Listing published! Nearby buyers notified.', 'success');
    KrishiUtils.closeModal();
    KrishiRouter.render();
  },

  openNegotiationModal(id) {
    const b = window.KrishiData.buyers.find(x => x.id === id) || window.KrishiData.buyers[0];
    KrishiUtils.openModal(`
      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:0.75rem;margin-bottom:1rem;padding-right:2rem;padding-bottom:0.875rem;border-bottom:1px solid var(--border);">
        <div>
          <h3 style="font-size:1rem;font-weight:900;color:var(--text-main);">${b.name}</h3>
          <p style="font-size:0.75rem;color:var(--text-muted);margin-top:0.2rem;">${b.contactPerson} · Buyer offer: <strong style="color:var(--green-700);">₹${b.offeredPriceKg}/kg</strong></p>
        </div>
        <span class="badge ${b.trustLevel==='trusted' ? 'trust-trusted' : b.trustLevel==='verified' ? 'trust-verified' : 'trust-new'}">${b.trustLabel}</span>
      </div>

      <!-- Negotiation chat -->
      <div class="neg-chat" id="bc-chat" style="margin-bottom:1rem;">
        <div class="neg-msg neg-msg-owner"><strong>${b.contactPerson}:</strong> "Ready to buy 1,000 kg at ₹${b.offeredPriceKg}/kg. Direct farm pickup. When can we finalize?"</div>
      </div>

      <div style="padding:1rem;background:#fffbeb;border-radius:var(--radius-lg);border:1px solid #fde68a;margin-bottom:1rem;">
        <label style="font-size:0.8rem;font-weight:700;color:#78350f;display:block;margin-bottom:0.5rem;">Your Counter Price (₹/kg):</label>
        <div style="display:flex;align-items:center;gap:0.625rem;">
          <input type="number" id="bc-inp" value="${b.offeredPriceKg + 1.5}" step="0.5" class="input" style="width:8rem;font-size:1rem;font-weight:800;text-align:center;">
          <span style="font-size:0.82rem;color:var(--text-muted);font-weight:600;">/kg</span>
          <button onclick="KrishiBuyers.sendCounter('${b.id}')" class="btn btn-gold btn-sm" style="margin-left:auto;">Send Counter</button>
        </div>
      </div>

      <!-- Deal confirm (shown after counter) -->
      <div id="bc-deal" style="display:none;padding:1rem;background:#f0fdf4;border-radius:var(--radius-lg);border:1px solid #86efac;margin-bottom:1rem;">
        <h4 style="font-size:0.9rem;font-weight:800;color:#14532d;margin-bottom:0.625rem;">✅ Buyer Agreed to Deal!</h4>
        <div style="font-size:0.82rem;color:#166534;display:flex;flex-direction:column;gap:0.35rem;">
          <div style="display:flex;justify-content:space-between;"><span>Buyer:</span><strong>${b.name}</strong></div>
          <div style="display:flex;justify-content:space-between;"><span>Agreed Price:</span><strong id="bc-deal-price">₹${b.offeredPriceKg}/kg</strong></div>
          <div style="display:flex;justify-content:space-between;"><span>Quantity:</span><strong>1,000 kg</strong></div>
          <div style="display:flex;justify-content:space-between;"><span>Payment:</span><strong>${b.paymentTerms.split('.')[0]}</strong></div>
        </div>
        <button onclick="KrishiBuyers.confirmDeal('${b.id}')" class="btn btn-primary btn-full" style="margin-top:0.875rem;">
          <i class="fa-solid fa-handshake"></i> Confirm Deal & Notify Buyer
        </button>
      </div>

      ${b.trustLevel === 'new' ? `
        <div style="padding:0.75rem 0.875rem;background:#fffbeb;border-radius:var(--radius-md);border:1px solid #fde68a;display:flex;gap:0.5rem;">
          <i class="fa-solid fa-shield-halved" style="color:#d97706;flex-shrink:0;"></i>
          <p style="font-size:0.75rem;color:#78350f;line-height:1.4;">This is a <strong>new buyer</strong>. For your protection, choose <strong>Escrow / Spot Cash</strong> payment only.</p>
        </div>
      ` : ''}
    `);
  },

  sendCounter(id) {
    const b = window.KrishiData.buyers.find(x => x.id === id) || window.KrishiData.buyers[0];
    const chat    = document.getElementById('bc-chat');
    const inp     = document.getElementById('bc-inp');
    const dealBox = document.getElementById('bc-deal');
    if (!chat || !inp) return;

    const myPrice   = parseFloat(inp.value);
    const agreePrice = Math.round(((b.offeredPriceKg + myPrice) / 2) * 2) / 2;

    chat.innerHTML += `<div class="neg-msg neg-msg-farmer"><strong>You (Farmer):</strong> "I need ₹${myPrice}/kg for Grade A quality. Can you match this?"</div>`;
    chat.scrollTop = chat.scrollHeight;

    setTimeout(() => {
      chat.innerHTML += `<div class="neg-msg neg-msg-owner"><strong>${b.contactPerson}:</strong> "I can agree to <strong>₹${agreePrice}/kg</strong>. That's my best offer. Shall we proceed?"</div>`;
      chat.innerHTML += `<div class="neg-msg neg-msg-system">🤝 Counter offer: ₹${myPrice} → ₹${agreePrice}/kg — Both parties close</div>`;
      chat.scrollTop = chat.scrollHeight;
      if (dealBox) {
        dealBox.style.display = 'block';
        const dp = document.getElementById('bc-deal-price');
        if (dp) dp.textContent = `₹${agreePrice}/kg`;
      }
    }, 750);
  },

  confirmDeal(id) {
    const b = window.KrishiData.buyers.find(x => x.id === id) || window.KrishiData.buyers[0];
    const agreeEl = document.getElementById('bc-deal-price');
    const price   = agreeEl ? agreeEl.textContent : `₹${b.offeredPriceKg}/kg`;

    KrishiNotifs.accept('buyer-' + b.id, {
      type:  'buyer',
      icon:  '🛒',
      title: `🛒 ${b.contactPerson} Accepted Your Crop Deal!`,
      body:  `${b.name} agreed to buy at ${price}. Payment: ${b.paymentTerms.split('.')[0]}. Confirm pickup schedule by calling ${b.phone}.`
    });

    KrishiUtils.closeModal();
    KrishiUtils.toast(`✅ Deal confirmed with ${b.name} at ${price}!`, 'success');

    setTimeout(() => {
      KrishiUtils.openModal(`
        <div style="text-align:center;padding:0.5rem;">
          <div style="font-size:4rem;margin-bottom:1rem;">🤝</div>
          <h3 style="font-size:1.1rem;font-weight:900;color:#14532d;margin-bottom:0.5rem;">Crop Deal Confirmed!</h3>
          <p style="font-size:0.88rem;color:var(--text-muted);line-height:1.5;margin-bottom:1rem;">
            <strong>${b.contactPerson}</strong> from <strong>${b.name}</strong> has accepted your deal at <strong>${price}</strong>.<br><br>
            📱 Confirmation has been sent to the buyer. They will contact you to arrange farm pickup.
          </p>
          <div style="padding:0.875rem;background:#f0fdf4;border-radius:var(--radius-lg);border:1px solid #86efac;margin-bottom:1rem;text-align:left;">
            <p style="font-size:0.82rem;font-weight:800;color:#14532d;">📞 Buyer Contact: ${b.phone}</p>
            <p style="font-size:0.72rem;color:#166534;margin-top:0.25rem;">Payment: ${b.paymentTerms}</p>
          </div>
          <button onclick="KrishiUtils.closeModal();KrishiRouter.render();" class="btn btn-primary btn-full">Done</button>
        </div>
      `);
    }, 300);

    KrishiRouter.render();
  }
};

