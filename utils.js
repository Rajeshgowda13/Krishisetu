/**
 * KrishiSetu AI — Utility helpers v2 (premium)
 */
window.KrishiUtils = {

  formatINR(n) {
    return '₹' + Number(n).toLocaleString('en-IN', { maximumFractionDigits: 2 });
  },

  toast(msg, type = 'success') {
    const c = document.getElementById('toast-container');
    if (!c) return;
    const el = document.createElement('div');
    el.className = `toast toast-${type} anim-in`;
    el.style.cssText = 'pointer-events:auto;';
    el.innerHTML = `
      <i class="fa-solid ${type==='success' ? 'fa-circle-check' : type==='info' ? 'fa-circle-info' : 'fa-triangle-exclamation'}" style="font-size:1.05rem;flex-shrink:0;"></i>
      <span style="flex:1;font-size:0.85rem;">${msg}</span>
      <button onclick="this.parentElement.remove()" style="background:none;border:none;color:inherit;opacity:0.7;cursor:pointer;padding:0 0.25rem;font-size:1rem;">✕</button>
    `;
    c.appendChild(el);
    setTimeout(() => el.remove(), 4000);
  },

  openModal(html) {
    const ov = document.getElementById('modal-overlay');
    const ct = document.getElementById('modal-container');
    if (!ov || !ct) return;
    ct.innerHTML = `
      <button onclick="KrishiUtils.closeModal()" style="position:absolute;top:1rem;right:1rem;width:2.25rem;height:2.25rem;border-radius:99px;background:var(--earth-100);border:1px solid var(--border);cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--text-muted);font-size:1rem;transition:background 0.15s;" onmouseover="this.style.background='#e2e8f0'" onmouseout="this.style.background='var(--earth-100)'">✕</button>
      ${html}
    `;
    ov.classList.remove('hidden');
    ov.style.display = 'flex';
    ct.classList.add('anim-pop');
  },

  closeModal() {
    const ov = document.getElementById('modal-overlay');
    if (ov) { ov.style.display = 'none'; ov.classList.add('hidden'); }
  },

  speak(text, lang = 'kn') {
    if (!('speechSynthesis' in window)) return this.toast('Speech not supported in this browser.', 'warn');
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang === 'kn' ? 'kn-IN' : lang === 'hi' ? 'hi-IN' : 'en-US';
    u.rate = 0.92;
    window.speechSynthesis.speak(u);
    this.toast('🔊 Playing audio...', 'info');
  },

  /* Render a dark SVG price chart */
  renderChart(historical, forecast) {
    const all = [...historical, ...forecast.map(f => f.price)];
    const minP = Math.min(...all) * 0.93;
    const maxP = Math.max(...all) * 1.07;
    const W = 600, H = 210, PAD = 44;
    const innerW = W - PAD*2, innerH = H - PAD*2;

    const toY = v => H - PAD - ((v - minP) / (maxP - minP)) * innerH;
    const total = historical.length + forecast.length;
    const stepX = innerW / (total - 1);

    const hPts = historical.map((p, i) => ({ x: PAD + i*stepX, y: toY(p), p }));
    const fPts = forecast.map((f, i) => ({ x: PAD + (historical.length + i)*stepX, y: toY(f.price), p: f.price, label: f.day.split('(')[1]?.replace(')','') || f.day }));
    const allFPts = [hPts[hPts.length-1], ...fPts];

    const hPath = hPts.map((pt,i) => (i===0?`M${pt.x} ${pt.y}`:`L${pt.x} ${pt.y}`)).join(' ');
    const fPath = allFPts.map((pt,i) => (i===0?`M${pt.x} ${pt.y}`:`L${pt.x} ${pt.y}`)).join(' ');

    // area fill under history
    const areaPath = `${hPath} L${hPts[hPts.length-1].x} ${H-PAD} L${hPts[0].x} ${H-PAD} Z`;

    return `
      <div style="background:#0d1117;border-radius:var(--radius-xl);padding:1rem;overflow:auto;">
        <div style="display:flex;gap:1.5rem;margin-bottom:0.75rem;font-size:0.72rem;font-weight:700;">
          <span style="display:flex;align-items:center;gap:0.4rem;color:#6ee7b7;"><span style="width:24px;height:3px;background:#34d399;border-radius:2px;display:inline-block;"></span> Historical Prices</span>
          <span style="display:flex;align-items:center;gap:0.4rem;color:#fcd34d;"><span style="width:24px;height:3px;background:#fbbf24;border-radius:2px;display:inline-block;border-top:2px dashed #fbbf24;background:none;"></span> AI Forecast</span>
        </div>
        <svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;min-width:300px;" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#34d399" stop-opacity="0.25"/>
              <stop offset="100%" stop-color="#34d399" stop-opacity="0"/>
            </linearGradient>
          </defs>

          <!-- Grid -->
          ${[0.25,0.5,0.75,1].map(f => {
            const y = PAD + (1-f)*innerH;
            const val = Math.round(minP + f*(maxP-minP));
            return `<line x1="${PAD}" y1="${y}" x2="${W-PAD}" y2="${y}" stroke="#1e293b" stroke-width="1"/>
                    <text x="${PAD-6}" y="${y+4}" fill="#475569" font-size="10" text-anchor="end" font-family="Outfit,sans-serif">₹${val}</text>`;
          }).join('')}

          <!-- Area fill -->
          <path d="${areaPath}" fill="url(#areaGrad)"/>

          <!-- Historical line -->
          <path d="${hPath}" fill="none" stroke="#34d399" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>

          <!-- Forecast line -->
          <path d="${fPath}" fill="none" stroke="#fbbf24" stroke-width="2.5" stroke-dasharray="6 4" stroke-linecap="round" stroke-linejoin="round"/>

          <!-- Historical dots -->
          ${hPts.map(pt => `
            <circle cx="${pt.x}" cy="${pt.y}" r="4" fill="#34d399" stroke="#0d1117" stroke-width="2"/>
            <text x="${pt.x}" y="${pt.y-10}" fill="#6ee7b7" font-size="10" text-anchor="middle" font-family="Outfit,sans-serif" font-weight="700">₹${pt.p}</text>
          `).join('')}

          <!-- Forecast dots -->
          ${fPts.map(pt => `
            <circle cx="${pt.x}" cy="${pt.y}" r="5" fill="#fbbf24" stroke="#0d1117" stroke-width="2"/>
            <text x="${pt.x}" y="${pt.y-12}" fill="#fcd34d" font-size="10" text-anchor="middle" font-family="Outfit,sans-serif" font-weight="700">₹${pt.p}</text>
            <text x="${pt.x}" y="${H-8}" fill="#475569" font-size="9" text-anchor="middle" font-family="Outfit,sans-serif">${pt.label}</text>
          `).join('')}
        </svg>
      </div>
    `;
  }
};
