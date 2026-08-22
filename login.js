/**
 * KrishiSetu AI — Login & Register Page
 */
window.KrishiLogin = {
  mode: 'login',   // 'login' | 'register'
  step: 1,         // registration step
  regData: {},

  render() {
    return `
    <div style="min-height:100vh;background:linear-gradient(160deg,#0a1f14 0%,#153d27 45%,#0f2e20 100%);display:flex;align-items:center;justify-content:center;padding:1rem;">

      <!-- Decorative blobs -->
      <div style="position:fixed;top:-6rem;left:-6rem;width:22rem;height:22rem;border-radius:50%;background:rgba(52,137,90,0.12);pointer-events:none;"></div>
      <div style="position:fixed;bottom:-8rem;right:-6rem;width:28rem;height:28rem;border-radius:50%;background:rgba(245,158,11,0.07);pointer-events:none;"></div>

      <div style="width:100%;max-width:440px;position:relative;z-index:1;">

        <!-- Logo -->
        <div style="text-align:center;margin-bottom:2rem;">
          <div style="width:4.5rem;height:4.5rem;border-radius:1.25rem;background:linear-gradient(135deg,#f59e0b,#d97706);display:flex;align-items:center;justify-content:center;font-size:2rem;margin:0 auto 1rem;box-shadow:0 8px 24px rgba(245,158,11,0.45);">🌾</div>

          <!-- Dual-language name -->
          <div style="display:flex;align-items:center;justify-content:center;gap:0.625rem;flex-wrap:wrap;margin-bottom:0.375rem;">
            <h1 style="font-size:1.75rem;font-weight:900;color:#fff;letter-spacing:-0.03em;margin:0;">KrishiSetu <span style="color:#fbbf24;">AI</span></h1>
            <span style="font-size:0.8rem;font-weight:600;color:rgba(255,255,255,0.4);">|</span>
            <h2 style="font-size:1.35rem;font-weight:800;color:#fcd34d;letter-spacing:0.01em;margin:0;font-family:'Noto Sans Kannada',sans-serif;">ಕೃಷಿಸೇತು AI</h2>
          </div>

          <!-- Highlighted tagline pill -->
          <div style="display:inline-flex;align-items:center;gap:0.5rem;background:linear-gradient(135deg,rgba(245,158,11,0.22),rgba(251,191,36,0.12));border:1px solid rgba(245,158,11,0.45);border-radius:99px;padding:0.35rem 1rem;margin-top:0.375rem;">
            <span style="width:6px;height:6px;border-radius:50%;background:#34d399;animation:pulseDot 2s infinite;flex-shrink:0;"></span>
            <span style="font-size:0.78rem;font-weight:800;color:#fcd34d;letter-spacing:0.04em;">One Digital Bridge for Every Farmer</span>
          </div>
          <p style="font-size:0.7rem;color:rgba(255,255,255,0.45);margin-top:0.4rem;font-family:'Noto Sans Kannada',sans-serif;">ಪ್ರತಿಯೊಬ್ಬ ರೈತನಿಗೂ ಒಂದು ಡಿಜಿಟಲ್ ಸೇತುವೆ</p>
        </div>

        <!-- Card -->
        <div style="background:rgba(255,255,255,0.96);border-radius:1.5rem;padding:2rem;box-shadow:0 24px 60px rgba(0,0,0,0.4);border:1px solid rgba(255,255,255,0.3);">

          <!-- Tab toggle -->
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.25rem;background:#f1f5f9;border-radius:0.875rem;padding:0.25rem;margin-bottom:1.5rem;">
            <button onclick="KrishiLogin.mode='login';KrishiLogin.step=1;KrishiApp.renderLogin();" style="padding:0.6rem;border-radius:0.625rem;font-size:0.85rem;font-weight:800;border:none;cursor:pointer;font-family:var(--font);transition:all 0.15s;${this.mode==='login' ? 'background:#fff;color:var(--green-800);box-shadow:0 2px 8px rgba(0,0,0,0.12);' : 'background:transparent;color:#64748b;'}">Sign In</button>
            <button onclick="KrishiLogin.mode='register';KrishiLogin.step=1;KrishiApp.renderLogin();" style="padding:0.6rem;border-radius:0.625rem;font-size:0.85rem;font-weight:800;border:none;cursor:pointer;font-family:var(--font);transition:all 0.15s;${this.mode==='register' ? 'background:#fff;color:var(--green-800);box-shadow:0 2px 8px rgba(0,0,0,0.12);' : 'background:transparent;color:#64748b;'}">Create Account</button>
          </div>

          ${this.mode === 'login' ? this._loginForm() : this._registerForm()}

          <!-- Demo accounts -->
          <div style="margin-top:1.25rem;padding:0.875rem;background:#f0fdf4;border-radius:0.875rem;border:1px solid #bbf7d0;">
            <p style="font-size:0.72rem;font-weight:800;color:#14532d;margin-bottom:0.5rem;">🎯 Demo Accounts (password: demo1234)</p>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.375rem;">
              ${[
                ['farmer@demo.com','👨‍🌾 Farmer'],
                ['buyer@demo.com','🛒 Buyer'],
                ['tractor@demo.com','🚜 Tractor Owner'],
                ['worker@demo.com','👷 Farm Worker'],
                ['nursery@demo.com','🌱 Nursery'],
                ['transport@demo.com','🚚 Transport'],
              ].map(([email,label]) => `
                <button onclick="document.getElementById('login-id').value='${email}';document.getElementById('login-pw').value='demo1234';" style="text-align:left;font-size:0.68rem;font-weight:700;color:#166534;background:#dcfce7;border:1px solid #86efac;border-radius:0.5rem;padding:0.3rem 0.5rem;cursor:pointer;font-family:var(--font);">${label}</button>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>`;
  },

  _loginForm() {
    return `
      <div style="display:flex;flex-direction:column;gap:0.875rem;">
        <div>
          <label style="font-size:0.78rem;font-weight:700;color:#475569;display:block;margin-bottom:0.35rem;">Email or Phone Number</label>
          <input id="login-id" type="text" placeholder="email@example.com or +91 98XXX XXXXX" class="input" style="font-size:0.9rem;">
        </div>
        <div>
          <label style="font-size:0.78rem;font-weight:700;color:#475569;display:block;margin-bottom:0.35rem;">Password</label>
          <input id="login-pw" type="password" placeholder="Enter your password" class="input" style="font-size:0.9rem;" onkeypress="if(event.key==='Enter')KrishiLogin.doLogin()">
        </div>
        <div id="login-err" style="display:none;padding:0.625rem 0.75rem;background:#fef2f2;border:1px solid #fecaca;border-radius:0.625rem;font-size:0.78rem;font-weight:600;color:#b91c1c;"></div>
        <button onclick="KrishiLogin.doLogin()" class="btn btn-primary btn-full btn-lg" style="margin-top:0.25rem;">
          <i class="fa-solid fa-right-to-bracket"></i> Sign In to KrishiSetu
        </button>
      </div>`;
  },

  _registerForm() {
    const roles = [
      { id:'farmer',        icon:'👨‍🌾', label:'Farmer',         desc:'Grow & sell crops' },
      { id:'buyer',         icon:'🛒', label:'Crop Buyer',      desc:'Purchase produce' },
      { id:'tractor_owner', icon:'🚜', label:'Tractor Owner',   desc:'Rent out tractor' },
      { id:'farm_laborer',  icon:'👷', label:'Farm Worker',     desc:'Offer labour' },
      { id:'nursery',       icon:'🌱', label:'Nursery Owner',   desc:'Sell seedlings' },
      { id:'agri_store',    icon:'🏪', label:'Agri Shop',       desc:'Sell inputs' },
      { id:'transport',     icon:'🚚', label:'Transport',       desc:'Transport service' },
      { id:'irrigation',    icon:'💧', label:'Irrigation Dlr',  desc:'Drip systems' },
    ];

    if (this.step === 1) return `
      <div>
        <p style="font-size:0.85rem;font-weight:800;color:var(--text-main);margin-bottom:0.75rem;">Step 1 — Choose Your Role</p>
        <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:0.5rem;margin-bottom:1rem;">
          ${roles.map(r => `
            <button onclick="KrishiLogin.regData.role='${r.id}';KrishiLogin.step=2;KrishiApp.renderLogin();" style="padding:0.75rem 0.5rem;border-radius:0.875rem;border:2px solid ${this.regData.role===r.id ? 'var(--green-600)' : '#e2e8f0'};background:${this.regData.role===r.id ? '#f0fdf4' : '#f8fafc'};cursor:pointer;text-align:center;font-family:var(--font);transition:all 0.15s;">
              <div style="font-size:1.4rem;">${r.icon}</div>
              <div style="font-size:0.75rem;font-weight:800;color:var(--text-main);margin-top:0.2rem;">${r.label}</div>
              <div style="font-size:0.62rem;color:var(--text-muted);">${r.desc}</div>
            </button>
          `).join('')}
        </div>
      </div>`;

    if (this.step === 2) {
      const selectedRole = roles.find(r => r.id === this.regData.role);
      return `
        <div style="display:flex;flex-direction:column;gap:0.75rem;">
          <div style="display:flex;align-items:center;gap:0.625rem;margin-bottom:0.25rem;">
            <button onclick="KrishiLogin.step=1;KrishiApp.renderLogin();" style="width:2rem;height:2rem;border-radius:50%;border:1px solid var(--border);background:var(--earth-50);cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:0.85rem;">←</button>
            <p style="font-size:0.85rem;font-weight:800;color:var(--text-main);">Step 2 — ${selectedRole?.icon} ${selectedRole?.label} Details</p>
          </div>
          <div>
            <label style="font-size:0.78rem;font-weight:700;color:#475569;display:block;margin-bottom:0.3rem;">Full Name</label>
            <input id="reg-name" type="text" placeholder="Your full name" class="input" style="font-size:0.9rem;">
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.5rem;">
            <div>
              <label style="font-size:0.78rem;font-weight:700;color:#475569;display:block;margin-bottom:0.3rem;">Phone Number</label>
              <input id="reg-phone" type="tel" placeholder="+91 98XXX XXXXX" class="input" style="font-size:0.9rem;">
            </div>
            <div>
              <label style="font-size:0.78rem;font-weight:700;color:#475569;display:block;margin-bottom:0.3rem;">District</label>
              <input id="reg-dist" type="text" placeholder="e.g. Mandya" class="input" style="font-size:0.9rem;">
            </div>
          </div>
          <div>
            <label style="font-size:0.78rem;font-weight:700;color:#475569;display:block;margin-bottom:0.3rem;">Email Address</label>
            <input id="reg-email" type="email" placeholder="your@email.com" class="input" style="font-size:0.9rem;">
          </div>
          <div>
            <label style="font-size:0.78rem;font-weight:700;color:#475569;display:block;margin-bottom:0.3rem;">Create Password</label>
            <input id="reg-pw" type="password" placeholder="Min. 6 characters" class="input" style="font-size:0.9rem;">
          </div>
          <div id="reg-err" style="display:none;padding:0.625rem 0.75rem;background:#fef2f2;border:1px solid #fecaca;border-radius:0.625rem;font-size:0.78rem;font-weight:600;color:#b91c1c;"></div>
          <button onclick="KrishiLogin.doRegister()" class="btn btn-gold btn-full btn-lg">
            <i class="fa-solid fa-user-plus"></i> Create My Account
          </button>
        </div>`;
    }
  },

  doLogin() {
    const id = document.getElementById('login-id')?.value?.trim();
    const pw = document.getElementById('login-pw')?.value;
    const errEl = document.getElementById('login-err');
    if (!id || !pw) { errEl.style.display='block'; errEl.textContent='Please enter your email/phone and password.'; return; }
    const res = KrishiAuth.login(id, pw);
    if (!res.ok) { errEl.style.display='block'; errEl.textContent=res.error; return; }
    KrishiApp.boot();
  },

  doRegister() {
    const name  = document.getElementById('reg-name')?.value?.trim();
    const phone = document.getElementById('reg-phone')?.value?.trim();
    const dist  = document.getElementById('reg-dist')?.value?.trim();
    const email = document.getElementById('reg-email')?.value?.trim();
    const pw    = document.getElementById('reg-pw')?.value;
    const errEl = document.getElementById('reg-err');

    if (!name || !email || !pw || !phone || !dist) { errEl.style.display='block'; errEl.textContent='Please fill in all fields.'; return; }
    if (pw.length < 6) { errEl.style.display='block'; errEl.textContent='Password must be at least 6 characters.'; return; }

    const res = KrishiAuth.register({
      role: this.regData.role || 'farmer',
      name, phone, email, password: pw,
      district: dist, state: 'Karnataka', profilePhoto: '👤'
    });
    if (!res.ok) { errEl.style.display='block'; errEl.textContent=res.error; return; }
    KrishiApp.boot();
  }
};
