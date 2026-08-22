/**
 * KrishiSetu AI — Notifications & Request Acceptance System
 * Tracks accepted bookings/offers and notifies the farmer
 */
window.KrishiNotifs = {
  STORAGE_KEY: 'ks_notifications_v1',
  ACCEPTED_KEY: 'ks_accepted_v1',

  getAll() {
    try { return JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || []; } catch { return []; }
  },

  getAccepted() {
    try { return JSON.parse(localStorage.getItem(this.ACCEPTED_KEY)) || {}; } catch { return {}; }
  },

  isAccepted(requestId) {
    return !!this.getAccepted()[requestId];
  },

  accept(requestId, details) {
    // Mark accepted
    const accepted = this.getAccepted();
    accepted[requestId] = { ...details, acceptedAt: Date.now() };
    localStorage.setItem(this.ACCEPTED_KEY, JSON.stringify(accepted));

    // Push notification
    const notifs = this.getAll();
    notifs.unshift({
      id:    `notif-${Date.now()}`,
      type:  details.type,   // 'tractor' | 'worker' | 'buyer'
      title: details.title,
      body:  details.body,
      icon:  details.icon,
      read:  false,
      time:  Date.now()
    });
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(notifs.slice(0, 50)));
  },

  markAllRead() {
    const notifs = this.getAll().map(n => ({ ...n, read: true }));
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(notifs));
    KrishiNav.renderTopHeader();
  },

  unreadCount() {
    return this.getAll().filter(n => !n.read).length;
  },

  clearAll() {
    localStorage.removeItem(this.STORAGE_KEY);
    localStorage.removeItem(this.ACCEPTED_KEY);
  },

  /* Render the notification bell panel (inside a modal) */
  showPanel() {
    const notifs = this.getAll();
    this.markAllRead();

    KrishiUtils.openModal(`
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem;padding-right:2rem;">
        <h3 style="font-size:1rem;font-weight:900;color:var(--text-main);display:flex;align-items:center;gap:0.5rem;">
          <i class="fa-solid fa-bell" style="color:var(--gold-500);"></i> Activity Notifications
        </h3>
        ${notifs.length ? `<button onclick="KrishiNotifs.clearAll();KrishiUtils.closeModal();" style="font-size:0.72rem;color:#b91c1c;font-weight:700;background:none;border:none;cursor:pointer;font-family:var(--font);">Clear All</button>` : ''}
      </div>

      ${notifs.length === 0 ? `
        <div style="text-align:center;padding:2rem 0;">
          <div style="font-size:3rem;margin-bottom:0.75rem;">🔔</div>
          <p style="font-size:0.88rem;font-weight:600;color:var(--text-muted);">No notifications yet.</p>
          <p style="font-size:0.78rem;color:var(--text-muted);margin-top:0.25rem;">When a worker, tractor owner or buyer accepts your request, you'll see it here.</p>
        </div>
      ` : `
        <div style="display:flex;flex-direction:column;gap:0.5rem;max-height:22rem;overflow-y:auto;">
          ${notifs.map(n => `
            <div style="display:flex;align-items:flex-start;gap:0.75rem;padding:0.875rem;border-radius:var(--radius-lg);background:${n.read?'var(--earth-50)':'#f0fdf4'};border:1px solid ${n.read?'var(--border)':'#86efac'};">
              <div style="width:2.5rem;height:2.5rem;border-radius:50%;background:${n.type==='tractor'?'#dbeafe':n.type==='worker'?'#ffe4e6':n.type==='buyer'?'#dcfce7':'#fffbeb'};display:flex;align-items:center;justify-content:center;font-size:1.25rem;flex-shrink:0;">${n.icon}</div>
              <div style="min-width:0;">
                <p style="font-size:0.85rem;font-weight:800;color:var(--text-main);">${n.title}</p>
                <p style="font-size:0.75rem;color:var(--text-muted);line-height:1.4;margin-top:0.15rem;">${n.body}</p>
                <p style="font-size:0.65rem;color:var(--text-muted);margin-top:0.3rem;">${new Date(n.time).toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'})} · ${new Date(n.time).toLocaleDateString('en-IN')}</p>
              </div>
            </div>
          `).join('')}
        </div>
      `}
    `);
  }
};
