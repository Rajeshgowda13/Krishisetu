/**
 * KrishiSetu AI — Krishi AI Chat Assistant v2 (Premium)
 */
window.KrishiAI = {
  history: [
    { from:'ai', text:'ನಮಸ್ಕಾರ! I am Krishi AI 🤖 — your personal digital farming advisor. Ask me anything in Kannada, Hindi, or English about crops, prices, diseases, or nearby services!', time:'Now' }
  ],

  render() {
    const lang = window.KrishiStore.state.currentLanguage;
    const p = window.KrishiStore.state.farmerProfile;
    return `
    <div class="anim-in" style="max-width:720px;margin:0 auto;display:flex;flex-direction:column;gap:1.125rem;">

      <!-- Banner -->
      <div style="background:linear-gradient(135deg,#0a1f14,#153d27 60%,#0f4f35);border-radius:var(--radius-2xl);padding:1.375rem 1.5rem;display:flex;align-items:center;justify-content:space-between;gap:1rem;">
        <div style="display:flex;align-items:center;gap:0.875rem;">
          <div style="width:3rem;height:3rem;border-radius:var(--radius-lg);background:linear-gradient(135deg,#f59e0b,#d97706);display:flex;align-items:center;justify-content:center;font-size:1.4rem;box-shadow:0 4px 12px rgba(245,158,11,0.35);flex-shrink:0;">🤖</div>
          <div>
            <h2 style="font-size:1.1rem;font-weight:900;color:#fff;letter-spacing:-0.02em;">Ask Krishi AI</h2>
            <p style="font-size:0.72rem;color:rgba(255,255,255,0.55);">Connected to ${p.district} · ${p.soilType} Farm Data</p>
          </div>
        </div>
        <button onclick="KrishiAI.clearChat()" class="btn btn-ghost btn-sm">Clear</button>
      </div>

      <!-- Chat window -->
      <div class="card" style="display:flex;flex-direction:column;min-height:460px;padding:1.25rem;">

        <!-- Messages -->
        <div id="ai-msgs" style="flex:1;overflow-y:auto;display:flex;flex-direction:column;gap:0.875rem;padding-right:0.25rem;margin-bottom:1rem;max-height:320px;">
          ${this.history.map(m => this._bubble(m)).join('')}
        </div>

        <!-- Preset prompts -->
        <div style="display:flex;flex-wrap:wrap;gap:0.4rem;margin-bottom:0.875rem;">
          ${[
            ['🌱 Best crop for red soil?', 'Which crop is best for red loamy soil in August?'],
            ['🌶️ Leaves turning yellow?', 'My chilli leaves are turning yellow, what should I do?'],
            ['👷 Need 5 workers tomorrow', 'Find 5 farm workers for harvesting tomorrow'],
            ['📈 Best tomato market?', 'Which mandi has the best tomato price today?'],
          ].map(([label, q]) => `<button onclick="KrishiAI.send('${q.replace(/'/g,"\\'")}');" class="search-chip chip-green" style="font-size:0.72rem;">${label}</button>`).join('')}
        </div>

        <!-- Input row -->
        <div style="display:flex;gap:0.5rem;align-items:center;background:var(--earth-100);border-radius:var(--radius-xl);padding:0.375rem 0.375rem 0.375rem 0.875rem;border:1.5px solid var(--border);">
          <input id="ai-inp" type="text" placeholder="Type or tap 🎙️ to speak in Kannada / English…" style="flex:1;background:transparent;border:none;outline:none;font-family:var(--font);font-size:0.88rem;color:var(--text-main);" onkeypress="if(event.key==='Enter')KrishiAI.handleSend()">
          <button onclick="KrishiAI.voiceInput()" title="Voice" style="width:2.5rem;height:2.5rem;border-radius:var(--radius-md);background:var(--gold-500);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#fff;font-size:1rem;flex-shrink:0;transition:background 0.15s;" onmouseover="this.style.background='#d97706'" onmouseout="this.style.background='var(--gold-500)'">🎙️</button>
          <button onclick="KrishiAI.handleSend()" class="btn btn-primary" style="border-radius:var(--radius-md);padding:0.6rem 1rem;font-size:0.85rem;flex-shrink:0;">Send</button>
        </div>
      </div>
    </div>`;
  },

  _bubble(m) {
    const isUser = m.from === 'user';
    return `
      <div style="display:flex;flex-direction:column;align-items:${isUser ? 'flex-end' : 'flex-start'};">
        <div class="${isUser ? 'bubble-user' : 'bubble-ai'}">
          <p style="font-size:0.875rem;line-height:1.55;white-space:pre-wrap;">${m.text}</p>
        </div>
        <div style="display:flex;align-items:center;gap:0.5rem;margin-top:0.3rem;padding:0 0.25rem;">
          <span style="font-size:0.65rem;color:var(--text-muted);">${m.time}</span>
          ${!isUser ? `<button onclick="KrishiUtils.speak('${m.text.replace(/'/g,"\\'").replace(/\n/g,' ')}','${window.KrishiStore.state.currentLanguage}')" style="background:none;border:none;cursor:pointer;color:var(--green-600);font-size:0.8rem;" title="Listen">🔊</button>` : ''}
        </div>
      </div>`;
  },

  handleSend() {
    const inp = document.getElementById('ai-inp');
    if (!inp?.value.trim()) return;
    this.send(inp.value.trim());
    inp.value = '';
  },

  send(text) {
    this.history.push({ from:'user', text, time: new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}) });
    KrishiRouter.render();
    setTimeout(() => {
      this.history.push({ from:'ai', text: this._respond(text), time: new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}) });
      KrishiRouter.render();
      const box = document.getElementById('ai-msgs');
      if (box) box.scrollTop = box.scrollHeight;
    }, 650);
  },

  _respond(q) {
    const v = q.toLowerCase();
    const loc = window.KrishiStore.state.currentLocation;
    const p = window.KrishiStore.state.farmerProfile;
    if (v.includes('crop') || v.includes('soil') || v.includes('plant') || v.includes('best')) {
      return `Based on your ${loc.district} farm (${p.soilType}) and August monsoon forecast, top 3 crops recommended:\n\n1. 🍅 Hybrid Tomato (Arka Rakshak) — High blight-resistance. Est. profit ₹1.2 lakh/acre. Seedlings at Sri Lakshmi Nursery (3.2 km).\n2. 🌶️ Byadgi Chilli — Stable mandi price in Kolar. 60-day crop.\n3. 🌽 Maize (Co-H4) — Lower water input, good FCI MSP support.\n\nWould you like nursery contact details?`;
    } else if (v.includes('yellow') || v.includes('disease') || v.includes('leaf') || v.includes('curl')) {
      return `Yellow/curling leaves on chilli or tomato in ${loc.name} typically indicate:\n\n• Nitrogen deficiency — Apply urea or NPK 19-19-19\n• Whitefly-transmitted Leaf Curl Virus — Spray Neem Oil @ 5ml/litre\n\nNearest bio-pesticide shop: Sri Krishna Krishi Kendra (2.1 km) — +91 94481 44520\n\nTap "Scan Crop" in the bottom bar to upload a photo for AI diagnosis!`;
    } else if (v.includes('worker') || v.includes('labor') || v.includes('harvest')) {
      return `Found 2 worker groups available near ${loc.name}:\n\n👷 Nagaraju & Team (5 workers) — ₹500/day per worker · 2.8 km away · Harvesting specialists\n👩‍🌾 Savitramma — ₹450/day · 5.6 km away · Weeding & transplanting\n\nGo to "Farm Workers" tab to hire directly!`;
    } else if (v.includes('tractor')) {
      return `🚜 Available near you:\n\n• Mahindra 575 DI (50 HP) — Kumar Swamy · 4.1 km · ₹700/hr base\n• Swaraj 744 FE (48 HP) — Suresh Patel · 7.3 km · ₹650/hr base\n\nTap "Tractors" in the navigation to negotiate the hourly rate directly!`;
    } else if (v.includes('price') || v.includes('mandi') || v.includes('market') || v.includes('rate')) {
      return `Today's top mandi prices near ${loc.name}:\n\n🍅 Tomato (Hybrid) — ₹2,600/quintal (Kolar APMC) 📈 +6.5%\n🌶️ Green Chilli — ₹4,200/quintal (Mandya Yard) ➡️ Stable\n🧅 Onion (Red) — ₹2,100/quintal (Yeshwanthpur) 📉 -4.2%\n\nAI Sell Smart predicts Tomato prices rising to ₹2,850/q in 7 days. Check "Sell Smart AI" for full 30-day forecast!`;
    } else {
      return `I found relevant information for "${q}" near ${loc.name}. Today's top mandi price for Tomato: ₹26/kg at Kolar APMC. 2 verified buyers are active. Would you like me to compare buyer offers or check price forecasts? You can also tap "Scan Crop" for instant AI plant disease diagnosis.`;
    }
  },

  voiceInput() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return KrishiUtils.toast('Voice input not available in this browser.', 'warn');
    const rec = new SR();
    rec.lang = window.KrishiStore.state.currentLanguage === 'kn' ? 'kn-IN' : 'en-IN';
    KrishiUtils.toast('🎙️ Listening… speak now!', 'info');
    rec.start();
    rec.onresult = e => this.send(e.results[0][0].transcript);
  },

  clearChat() {
    this.history = [{ from:'ai', text:'Chat cleared. How can I help your farm today? 🌾', time:'Now' }];
    KrishiRouter.render();
  }
};
