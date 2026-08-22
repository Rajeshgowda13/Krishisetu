/**
 * KrishiSetu AI — Tractor Rental Marketplace v2 (Premium)
 */
window.KrishiTractors = {
  render() {
    const tractors = window.KrishiData.tractors;
    const r = window.KrishiStore.state.searchRadiusKm;
    return `
    <div class="anim-in" style="display:flex;flex-direction:column;gap:1.25rem;">

      <!-- Banner -->
      <div style="background:linear-gradient(135deg,#1e3a5f,#1e40af,#1d4ed8);border-radius:var(--radius-2xl);padding:1.5rem;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:1rem;overflow:hidden;position:relative;">
        <div style="position:absolute;right:-1.5rem;bottom:-1.5rem;width:8rem;height:8rem;background:rgba(255,255,255,0.05);border-radius:50%;"></div>
        <div style="position:relative;z-index:1;">
          <span style="font-size:0.65rem;font-weight:800;letter-spacing:0.07em;text-transform:uppercase;color:rgba(255,255,255,0.6);">🚜 Tractor & Machinery Marketplace</span>
          <h2 style="font-size:clamp(1.3rem,3.5vw,1.875rem);font-weight:900;color:#fff;letter-spacing:-0.025em;margin:0.3rem 0 0.375rem;">Rent a Tractor Near You 🌾</h2>
          <p style="font-size:0.82rem;color:rgba(255,255,255,0.7);">Compare HP, attachments, driver charges — negotiate hourly rates directly with owners.</p>
        </div>
        <span style="font-size:0.78rem;font-weight:700;background:rgba(255,255,255,0.15);border:1px solid rgba(255,255,255,0.25);color:#fff;padding:0.45rem 0.875rem;border-radius:var(--radius-lg);flex-shrink:0;">Within ${r} km</span>
      </div>

      <!-- Tractor Cards -->
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(20rem,1fr));gap:1.125rem;">
        ${tractors.map(t => `
          <div class="card" style="padding:1.375rem;display:flex;flex-direction:column;gap:1rem;border-top:3px solid #3b82f6;">

            <!-- Header -->
            <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:0.75rem;">
              <div style="display:flex;align-items:center;gap:0.75rem;">
                <div style="width:3rem;height:3rem;border-radius:var(--radius-lg);background:#dbeafe;display:flex;align-items:center;justify-content:center;font-size:1.5rem;flex-shrink:0;">🚜</div>
                <div>
                  <h3 style="font-size:0.95rem;font-weight:800;color:var(--text-main);line-height:1.2;">${t.tractorModel}</h3>
                  <p style="font-size:0.72rem;color:var(--text-muted);">${t.ownerName} · ${t.distanceKm} km away</p>
                </div>
              </div>
              <span class="badge badge-green" style="${t.availabilityStatus.includes('Today') ? 'background:#dcfce7;color:#15803d;' : 'background:#fef3c7;color:#92400e;'}">${t.availabilityStatus}</span>
            </div>

            <!-- HP Bar -->
            <div>
              <div style="display:flex;justify-content:space-between;font-size:0.72rem;font-weight:600;color:var(--text-muted);margin-bottom:0.35rem;">
                <span>Engine Power</span><span style="font-weight:800;color:var(--text-main);">${t.hp} HP</span>
              </div>
              <div class="hp-bar-track"><div class="hp-bar-fill" style="width:${Math.min(t.hp/80*100,100)}%;"></div></div>
            </div>

            <!-- Details -->
            <div style="padding:0.875rem;background:var(--earth-50);border-radius:var(--radius-lg);border:1px solid var(--border);font-size:0.78rem;display:flex;flex-direction:column;gap:0.5rem;">
              <div style="display:flex;justify-content:space-between;">
                <span style="color:var(--text-muted);">Attachments:</span>
                <span style="font-weight:700;color:var(--text-main);text-align:right;max-width:60%;">${t.attachments.join(' · ')}</span>
              </div>
              <div style="display:flex;justify-content:space-between;">
                <span style="color:var(--text-muted);">Driver:</span>
                <span style="font-weight:700;color:var(--green-700);">${t.driverName}</span>
              </div>
              <div style="display:flex;justify-content:space-between;">
                <span style="color:var(--text-muted);">Driver charge:</span>
                <span style="font-weight:700;color:var(--text-main);">+₹${t.driverChargePerHour}/hr</span>
              </div>
            </div>

            <!-- Rate + Rating -->
            <div style="display:flex;align-items:center;justify-content:space-between;">
              <div>
                <p style="font-size:0.68rem;color:var(--text-muted);font-weight:600;">Base Hourly Rate</p>
                <p style="font-size:1.5rem;font-weight:900;color:#1e40af;letter-spacing:-0.03em;">₹${t.baseHourlyRate}<span style="font-size:0.72rem;font-weight:600;color:var(--text-muted);">/hr</span></p>
              </div>
              <div style="text-align:right;">
                <p style="font-size:0.68rem;color:var(--text-muted);font-weight:600;">Rating</p>
                <p style="font-size:0.92rem;font-weight:800;color:var(--gold-600);">⭐ ${t.rating} <span style="font-size:0.7rem;font-weight:600;color:var(--text-muted);">(${t.completedBookings} jobs)</span></p>
              </div>
            </div>

            <!-- Actions -->
            ${KrishiNotifs.isAccepted('tractor-'+t.id) ? `
              <div style="padding:0.875rem;background:#f0fdf4;border-radius:var(--radius-lg);border:2px solid #22c55e;text-align:center;">
                <p style="font-size:0.88rem;font-weight:800;color:#14532d;">✅ Booking Accepted!</p>
                <p style="font-size:0.72rem;color:#166534;margin-top:0.2rem;">${t.ownerName} has confirmed your booking. They will arrive as scheduled.</p>
                <button onclick="KrishiUtils.toast('📞 Calling ${t.ownerName}: ${t.ownerPhone}');" class="btn btn-primary btn-sm" style="margin-top:0.625rem;">
                  <i class="fa-solid fa-phone"></i> Call Owner
                </button>
              </div>
            ` : `
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.625rem;padding-top:0.75rem;border-top:1px solid var(--border);">
                <button onclick="KrishiTractors.openNegotiate('${t.id}')" class="btn btn-gold btn-sm">
                  <i class="fa-solid fa-comments-dollar"></i> Negotiate
                </button>
                <button onclick="KrishiTractors.openNegotiate('${t.id}')" class="btn btn-primary btn-sm">
                  <i class="fa-solid fa-calendar-check"></i> Book Now
                </button>
              </div>
            `}
          </div>
        `).join('')}
      </div>
    </div>`;
  },

  openNegotiate(id) {
    const t = window.KrishiData.tractors.find(x => x.id === id) || window.KrishiData.tractors[0];
    KrishiUtils.openModal(`
      <h3 style="font-size:1.1rem;font-weight:900;color:var(--text-main);display:flex;align-items:center;gap:0.625rem;margin-bottom:0.25rem;padding-right:2rem;">
        <span style="font-size:1.4rem;">🚜</span> ${t.tractorModel}
      </h3>
      <p style="font-size:0.78rem;color:var(--text-muted);margin-bottom:1.125rem;">Owner: <strong>${t.ownerName}</strong> · Listed rate: <strong style="color:var(--text-main);">₹${t.baseHourlyRate}/hr</strong></p>

      <!-- Negotiation chat -->
      <div class="neg-chat" id="neg-chat" style="margin-bottom:1rem;">
        <div class="neg-msg neg-msg-owner"><strong>Owner (${t.ownerName}):</strong> "Listed price is ₹${t.baseHourlyRate}/hr including ${t.attachments[0]}."</div>
      </div>

      <!-- Offer input -->
      <div style="padding:1rem;background:#fffbeb;border-radius:var(--radius-lg);border:1px solid #fde68a;margin-bottom:1rem;">
        <label style="font-size:0.8rem;font-weight:700;color:#78350f;display:block;margin-bottom:0.5rem;">Your Offer (₹/hour):</label>
        <div style="display:flex;align-items:center;gap:0.625rem;">
          <span style="font-size:1.1rem;font-weight:800;color:var(--text-main);">₹</span>
          <input type="number" id="offer-inp" value="${t.baseHourlyRate - 100}" class="input" style="width:8rem;font-size:1rem;font-weight:800;text-align:center;">
          <span style="font-size:0.82rem;color:var(--text-muted);font-weight:600;">/hour</span>
          <button onclick="KrishiTractors.sendOffer('${t.id}')" class="btn btn-gold btn-sm" style="margin-left:auto;">Send Offer</button>
        </div>
      </div>

      <!-- Booking summary (hidden until deal) -->
      <div id="booking-summary" style="display:none;padding:1.125rem;background:#f0fdf4;border-radius:var(--radius-lg);border:1px solid #86efac;">
        <h4 style="font-size:0.92rem;font-weight:800;color:#14532d;margin-bottom:0.75rem;">✅ Deal Agreed — Booking Summary</h4>
        <div style="display:flex;flex-direction:column;gap:0.4rem;font-size:0.82rem;">
          <div style="display:flex;justify-content:space-between;"><span style="color:#166534;">Hours Booked:</span><strong>4 Hours</strong></div>
          <div style="display:flex;justify-content:space-between;"><span style="color:#166534;">Agreed Hourly Rate:</span><strong id="sum-rate">₹650/hr</strong></div>
          <div style="display:flex;justify-content:space-between;"><span style="color:#166534;">Driver Charge (4h):</span><strong>₹400</strong></div>
          <div style="display:flex;justify-content:space-between;padding-top:0.5rem;border-top:1px solid #86efac;font-size:0.95rem;"><span style="color:#14532d;font-weight:800;">Total Payable:</span><strong id="sum-total" style="color:#14532d;font-size:1.05rem;">₹3,000</strong></div>
        </div>
        <button onclick="KrishiTractors.confirmBooking('${t.id}')" class="btn btn-primary btn-full" style="margin-top:0.875rem;">
          <i class="fa-solid fa-lock"></i> Confirm & Proceed to Payment
        </button>
      </div>
    `);
  },

  sendOffer(id) {
    const t = window.KrishiData.tractors.find(x => x.id === id) || window.KrishiData.tractors[0];
    const chat = document.getElementById('neg-chat');
    const offerInp = document.getElementById('offer-inp');
    if (!chat || !offerInp) return;
    const offer = Number(offerInp.value);
    const counter = Math.round((t.baseHourlyRate + offer) / 2);

    chat.innerHTML += `<div class="neg-msg neg-msg-farmer"><strong>You (Farmer):</strong> "I'd like to offer ₹${offer}/hr for 4 hours."</div>`;
    setTimeout(() => {
      chat.innerHTML += `<div class="neg-msg neg-msg-owner"><strong>Owner (${t.ownerName}):</strong> "I can meet at <strong>₹${counter}/hr</strong>. That includes ${t.attachments[0]}. Deal?"</div>`;
      chat.innerHTML += `<div class="neg-msg neg-msg-system">🤝 Counter-offer received — ₹${offer}/hr → ₹${counter}/hr</div>`;
      chat.scrollTop = chat.scrollHeight;
      const sum = document.getElementById('booking-summary');
      if (sum) {
        sum.style.display = 'block';
        document.getElementById('sum-rate').textContent = `₹${counter}/hr`;
        document.getElementById('sum-total').textContent = KrishiUtils.formatINR(counter * 4 + 400);
      }
    }, 700);
    chat.scrollTop = chat.scrollHeight;
  },

  confirmBooking(id) {
    const t = window.KrishiData.tractors.find(x => x.id === id) || window.KrishiData.tractors[0];
    const rate = document.getElementById('sum-rate')?.textContent || `₹${t.baseHourlyRate}/hr`;

    // Mark as accepted in notification store
    KrishiNotifs.accept('tractor-' + t.id, {
      type:  'tractor',
      icon:  '🚜',
      title: `🚜 ${t.ownerName} Accepted Your Tractor Booking!`,
      body:  `${t.tractorModel} (${t.hp} HP) confirmed at ${rate} for 4 hours. Owner will arrive as scheduled.`
    });

    KrishiUtils.closeModal();
    KrishiUtils.toast('✅ Tractor booked! ' + t.ownerName + ' has accepted your request.', 'success');

    // Show farmer alert banner
    setTimeout(() => {
      KrishiUtils.openModal(`
        <div style="text-align:center;padding:0.5rem;">
          <div style="font-size:4rem;margin-bottom:1rem;">🚜</div>
          <h3 style="font-size:1.1rem;font-weight:900;color:#14532d;margin-bottom:0.5rem;">Booking Confirmed!</h3>
          <p style="font-size:0.88rem;color:var(--text-muted);margin-bottom:1rem;line-height:1.5;">
            <strong>${t.ownerName}</strong> has accepted your tractor booking for
            <strong>${t.tractorModel}</strong> at <strong>${rate}</strong>.<br><br>
            📱 A confirmation SMS has been sent to your registered mobile number.
          </p>
          <div style="padding:0.875rem;background:#f0fdf4;border-radius:var(--radius-lg);border:1px solid #86efac;margin-bottom:1rem;">
            <p style="font-size:0.78rem;font-weight:700;color:#14532d;">📞 Owner Contact: ${t.ownerPhone || '+91 98765 XXXXX'}</p>
          </div>
          <button onclick="KrishiUtils.closeModal();KrishiRouter.render();" class="btn btn-primary btn-full">Done</button>
        </div>
      `);
    }, 300);

    KrishiRouter.render();
  }
};
