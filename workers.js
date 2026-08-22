/**
 * KrishiSetu AI — Farm Workers Marketplace v2 (Premium)
 */
window.KrishiWorkers = {
  render() {
    const workers = window.KrishiData.workers;
    return `
    <div class="anim-in" style="display:flex;flex-direction:column;gap:1.25rem;">

      <!-- Banner -->
      <div style="background:linear-gradient(135deg,#881337,#be123c,#e11d48);border-radius:var(--radius-2xl);padding:1.5rem;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:1rem;overflow:hidden;position:relative;">
        <div style="position:absolute;right:-2rem;bottom:-2rem;width:9rem;height:9rem;background:rgba(255,255,255,0.05);border-radius:50%;"></div>
        <div style="position:relative;z-index:1;">
          <span style="font-size:0.65rem;font-weight:800;letter-spacing:0.07em;text-transform:uppercase;color:rgba(255,255,255,0.6);">👷 Farm Labor Marketplace</span>
          <h2 style="font-size:clamp(1.3rem,3.5vw,1.875rem);font-weight:900;color:#fff;letter-spacing:-0.025em;margin:0.3rem 0 0.375rem;">Find Skilled Farm Workers 🌾</h2>
          <p style="font-size:0.82rem;color:rgba(255,255,255,0.7);">Hire individual or group workers for harvesting, planting, weeding, spraying & sorting.</p>
        </div>
        <div style="display:flex;align-items:center;gap:0.5rem;background:rgba(255,255,255,0.15);border:1px solid rgba(255,255,255,0.25);border-radius:var(--radius-lg);padding:0.5rem 0.875rem;font-size:0.8rem;font-weight:700;color:#fff;flex-shrink:0;">
          <span class="pulse-dot"></span> Workers Available Today
        </div>
      </div>

      <!-- Worker Cards -->
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(20rem,1fr));gap:1.125rem;">
        ${workers.map(w => `
          <div class="card" style="padding:1.375rem;display:flex;flex-direction:column;gap:1rem;border-top:3px solid #e11d48;">

            <!-- Header -->
            <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:0.75rem;">
              <div style="display:flex;align-items:center;gap:0.75rem;">
                <div style="width:3rem;height:3rem;border-radius:var(--radius-lg);background:#ffe4e6;display:flex;align-items:center;justify-content:center;font-size:1.4rem;flex-shrink:0;">👷</div>
                <div>
                  <h3 style="font-size:0.95rem;font-weight:800;color:var(--text-main);line-height:1.2;">${w.name}</h3>
                  <p style="font-size:0.72rem;color:var(--text-muted);">${w.leaderName} · ${w.distanceKm} km away</p>
                </div>
              </div>
              <span class="badge" style="background:#ffe4e6;color:#9f1239;border:1px solid #fecdd3;flex-shrink:0;">👥 Team of ${w.teamSize}</span>
            </div>

            <!-- Skills -->
            <div style="padding:0.875rem;background:var(--earth-50);border-radius:var(--radius-lg);border:1px solid var(--border);">
              <p style="font-size:0.68rem;font-weight:700;color:var(--text-muted);letter-spacing:0.05em;text-transform:uppercase;margin-bottom:0.5rem;">Specialized Skills</p>
              <div style="display:flex;flex-wrap:wrap;gap:0.375rem;">
                ${w.skills.map(s => `<span class="badge badge-purple" style="font-size:0.68rem;">${s}</span>`).join('')}
              </div>
              <div style="margin-top:0.625rem;padding-top:0.625rem;border-top:1px solid var(--border);font-size:0.75rem;">
                <span style="color:var(--text-muted);">Crop Expertise: </span>
                <strong style="color:var(--text-main);">${w.cropExpertise.join(' · ')}</strong>
              </div>
            </div>

            <!-- Wage & Rating -->
            <div style="display:flex;align-items:center;justify-content:space-between;padding:0.875rem;background:#fff1f2;border-radius:var(--radius-lg);border:1px solid #fecdd3;">
              <div>
                <p style="font-size:0.68rem;color:var(--text-muted);font-weight:600;">Daily Wage / Worker</p>
                <p style="font-size:1.5rem;font-weight:900;color:#be123c;letter-spacing:-0.03em;">₹${w.dailyWagePerWorker}<span style="font-size:0.72rem;font-weight:600;color:var(--text-muted);">/day</span></p>
              </div>
              <div style="text-align:right;">
                <p style="font-size:0.68rem;color:var(--text-muted);font-weight:600;">Experience · Rating</p>
                <p style="font-size:0.85rem;font-weight:800;color:var(--text-main);">${w.experienceYears} yrs · ⭐ ${w.rating}</p>
                <p style="font-size:0.68rem;color:var(--text-muted);">${w.completedJobs} jobs done</p>
              </div>
            </div>

            <!-- Hire button -->
            ${KrishiNotifs.isAccepted('worker-'+w.id) ? `
              <div style="padding:0.875rem;background:#f0fdf4;border-radius:var(--radius-lg);border:2px solid #22c55e;text-align:center;">
                <p style="font-size:0.88rem;font-weight:800;color:#14532d;">✅ ${w.leaderName} Accepted Your Request!</p>
                <p style="font-size:0.72rem;color:#166534;margin-top:0.2rem;">Workers will arrive on the scheduled date. Confirm the final details directly.</p>
                <button onclick="KrishiUtils.toast('📞 Calling ${w.leaderName}: ${w.phone}');" class="btn btn-primary btn-sm" style="margin-top:0.625rem;">
                  <i class="fa-solid fa-phone"></i> Call ${w.leaderName}
                </button>
              </div>
            ` : `
              <button onclick="KrishiWorkers.openHire('${w.id}')" class="btn btn-gold btn-full">
                <i class="fa-solid fa-user-plus"></i> Hire — Request Work Date & Time
              </button>
            `}
          </div>
        `).join('')}
      </div>
    </div>`;
  },

  openHire(id) {
    const w = window.KrishiData.workers.find(x => x.id === id) || window.KrishiData.workers[0];
    KrishiUtils.openModal(`
      <h3 style="font-size:1.05rem;font-weight:900;color:var(--text-main);display:flex;align-items:center;gap:0.625rem;margin-bottom:0.25rem;padding-right:2rem;">
        👷 Hire: ${w.leaderName}
      </h3>
      <p style="font-size:0.78rem;color:var(--text-muted);margin-bottom:1.125rem;">Rate: <strong>₹${w.dailyWagePerWorker}/day</strong> per worker · Phone: <strong>${w.phone}</strong></p>

      <div style="display:flex;flex-direction:column;gap:0.75rem;margin-bottom:1rem;">
        <div style="display:flex;align-items:center;justify-content:space-between;padding:0.875rem;background:var(--earth-50);border-radius:var(--radius-lg);border:1px solid var(--border);">
          <label style="font-size:0.82rem;font-weight:700;color:var(--text-main);">Number of Workers:</label>
          <input type="number" id="w-num" value="${w.teamSize}" min="1" max="${w.teamSize}" class="input" style="width:5rem;text-align:center;font-weight:800;" oninput="KrishiWorkers.updateTotal(${w.dailyWagePerWorker})">
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;padding:0.875rem;background:var(--earth-50);border-radius:var(--radius-lg);border:1px solid var(--border);">
          <label style="font-size:0.82rem;font-weight:700;color:var(--text-main);">Number of Days:</label>
          <input type="number" id="w-days" value="1" min="1" max="14" class="input" style="width:5rem;text-align:center;font-weight:800;" oninput="KrishiWorkers.updateTotal(${w.dailyWagePerWorker})">
        </div>
      </div>

      <div style="padding:1rem;background:#f0fdf4;border-radius:var(--radius-lg);border:1px solid #86efac;display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
        <span style="font-size:0.85rem;font-weight:700;color:#14532d;">Estimated Wage Cost:</span>
        <span id="w-total" style="font-size:1.25rem;font-weight:900;color:var(--green-700);">₹${w.dailyWagePerWorker * w.teamSize}</span>
      </div>

      <button onclick="KrishiWorkers.sendHire('${w.id}')" class="btn btn-primary btn-full">
        <i class="fa-solid fa-paper-plane"></i> Send Farm Job Request
      </button>
    `);
  },

  updateTotal(wage) {
    const n = Number(document.getElementById('w-num')?.value) || 1;
    const d = Number(document.getElementById('w-days')?.value) || 1;
    const el = document.getElementById('w-total');
    if (el) el.textContent = KrishiUtils.formatINR(wage * n * d);
  },

  sendHire(id) {
    const w = window.KrishiData.workers.find(x => x.id === id) || window.KrishiData.workers[0];
    const numW = Number(document.getElementById('w-num')?.value) || w.teamSize;
    const days = Number(document.getElementById('w-days')?.value) || 1;
    const total = w.dailyWagePerWorker * numW * days;

    KrishiNotifs.accept('worker-' + w.id, {
      type:  'worker',
      icon:  '👷',
      title: `👷 ${w.leaderName} Accepted Your Farm Job Request!`,
      body:  `${numW} worker${numW>1?'s':''} for ${days} day${days>1?'s':''} · Total ₹${total.toLocaleString('en-IN')}. They will arrive on the scheduled date.`
    });

    KrishiUtils.closeModal();
    KrishiUtils.toast(`✅ Request sent! ${w.leaderName} has accepted your farm job.`, 'success');

    setTimeout(() => {
      KrishiUtils.openModal(`
        <div style="text-align:center;padding:0.5rem;">
          <div style="font-size:4rem;margin-bottom:1rem;">👷</div>
          <h3 style="font-size:1.1rem;font-weight:900;color:#14532d;margin-bottom:0.5rem;">Job Request Accepted!</h3>
          <p style="font-size:0.88rem;color:var(--text-muted);line-height:1.5;margin-bottom:1rem;">
            <strong>${w.leaderName}</strong> has accepted your farm job request for
            <strong>${numW} worker${numW>1?'s':''}</strong> × <strong>${days} day${days>1?'s':''}</strong>.<br><br>
            📱 Job confirmation sent to ${w.phone}.
          </p>
          <div style="padding:0.875rem;background:#f0fdf4;border-radius:var(--radius-lg);border:1px solid #86efac;margin-bottom:1rem;">
            <p style="font-size:0.82rem;font-weight:800;color:#14532d;">Total Wages: ₹${total.toLocaleString('en-IN')}</p>
            <p style="font-size:0.72rem;color:#166534;margin-top:0.25rem;">📞 Contact: ${w.phone}</p>
          </div>
          <button onclick="KrishiUtils.closeModal();KrishiRouter.render();" class="btn btn-primary btn-full">Done</button>
        </div>
      `);
    }, 300);

    KrishiRouter.render();
  }
};
