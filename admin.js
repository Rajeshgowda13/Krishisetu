/**
 * KrishiSetu AI - Platform Admin Control Panel
 */

window.KrishiAdmin = {
  render() {
    return `
      <div class="space-y-6 animate-fadeIn">
        
        <!-- Header -->
        <div class="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
          <div>
            <span class="px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-emerald-300 uppercase tracking-wider">
              👨💼 SYSTEM CONTROL & MODERATION
            </span>
            <h2 class="text-2xl sm:text-3xl font-extrabold tracking-tight mt-2 text-white">
              Platform Admin Dashboard 🛡️
            </h2>
            <p class="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Monitor active users, verify provider listings, manage Agmarknet market price feeds & review trust scores.
            </p>
          </div>
          <span class="text-xs px-3 py-1.5 rounded-xl bg-emerald-500 text-white font-bold">Admin Active</span>
        </div>

        <!-- Platform Stats Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div class="agri-card p-4 text-center border-l-4 border-l-emerald-600">
            <span class="text-xs font-bold text-slate-500 uppercase">Registered Farmers</span>
            <p class="text-2xl font-black text-slate-900 mt-1">1,420</p>
            <span class="text-[11px] text-emerald-600 font-semibold">+18% this month</span>
          </div>

          <div class="agri-card p-4 text-center border-l-4 border-l-blue-600">
            <span class="text-xs font-bold text-slate-500 uppercase">Verified Buyers</span>
            <p class="text-2xl font-black text-slate-900 mt-1">86</p>
            <span class="text-[11px] text-blue-600 font-semibold">100% APMC Verified</span>
          </div>

          <div class="agri-card p-4 text-center border-l-4 border-l-amber-500">
            <span class="text-xs font-bold text-slate-500 uppercase">Completed Trades</span>
            <p class="text-2xl font-black text-slate-900 mt-1">1,250</p>
            <span class="text-[11px] text-amber-600 font-semibold">Zero Fraud Reports</span>
          </div>

          <div class="agri-card p-4 text-center border-l-4 border-l-purple-600">
            <span class="text-xs font-bold text-slate-500 uppercase">Total Volume</span>
            <p class="text-2xl font-black text-slate-900 mt-1">₹42.8 Lakhs</p>
            <span class="text-[11px] text-purple-600 font-semibold">Gross Trade Value</span>
          </div>
        </div>

        <!-- Provider Verification Queue -->
        <div class="agri-card p-6 shadow-md">
          <h3 class="text-base font-extrabold text-slate-900 mb-3 flex items-center gap-2">
            <i class="fa-solid fa-clock-rotate-left text-amber-500"></i> Pending Provider Verification Queue (2)
          </h3>

          <div class="space-y-3 text-xs">
            <div class="p-3 bg-slate-50 rounded-xl border flex flex-wrap items-center justify-between gap-2">
              <div>
                <p class="font-extrabold text-slate-900 text-sm">🌱 Chamundeshwari Nursery & Bio Plants</p>
                <p class="text-slate-500">Submitted by: K. Mahadeva • Mandya • Document: APMC License #44102</p>
              </div>
              <div class="flex gap-2">
                <button onclick="KrishiUtils.showToast('✅ Provider Verified & Published!'); this.closest('.p-3').remove();" class="btn-primary py-1 px-3 text-[11px]">
                  Approve & Verify
                </button>
                <button onclick="this.closest('.p-3').remove();" class="btn-secondary py-1 px-3 text-[11px]">
                  Reject
                </button>
              </div>
            </div>

            <div class="p-3 bg-slate-50 rounded-xl border flex flex-wrap items-center justify-between gap-2">
              <div>
                <p class="font-extrabold text-slate-900 text-sm">🚜 Swaraj Heavy Duty Rentals</p>
                <p class="text-slate-500">Submitted by: Siddaramaiah • Hoskote • Document: Vehicle RC Book</p>
              </div>
              <div class="flex gap-2">
                <button onclick="KrishiUtils.showToast('✅ Provider Verified & Published!'); this.closest('.p-3').remove();" class="btn-primary py-1 px-3 text-[11px]">
                  Approve & Verify
                </button>
                <button onclick="this.closest('.p-3').remove();" class="btn-secondary py-1 px-3 text-[11px]">
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Agmarknet Live Price Feed Sync Manager -->
        <div class="agri-card p-6 shadow-md">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <i class="fa-solid fa-arrows-rotate text-emerald-600"></i> Agmarknet Mandi Feed Synchronization
            </h3>
            <button onclick="KrishiUtils.showToast('🔄 Agmarknet API Sync Triggered! 4 Mandis updated.');" class="btn-amber py-1.5 px-3 text-xs">
              Trigger Manual Sync
            </button>
          </div>
          <p class="text-xs text-slate-500">Last automatic sync completed today at 08:00 AM (4 Karnataka mandis updated).</p>
        </div>

      </div>
    `;
  }
};
