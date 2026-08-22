/**
 * KrishiSetu AI — App Bootstrap v3 (Auth-aware)
 */
window.KrishiApp = {

  boot() {
    const session = KrishiAuth.getSession();
    if (!session) {
      this.renderLogin();
    } else {
      // Sync the store role with logged-in user's role
      const user = KrishiAuth.getCurrentUser();
      if (user && user.role) {
        KrishiStore.state.currentRole = user.role;
      }
      this.renderApp();
    }
  },

  renderLogin() {
    // Hide nav during login
    ['top-header','location-bar','bottom-nav'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = 'none';
    });
    document.body.style.paddingBottom = '0';

    const content = document.getElementById('app-content');
    if (content) {
      content.style.padding = '0';
      content.style.maxWidth = 'none';
      content.innerHTML = KrishiLogin.render();
    }
  },

  renderApp() {
    // Show nav
    ['top-header','location-bar','bottom-nav'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = '';
    });
    document.body.style.paddingBottom = '';

    const content = document.getElementById('app-content');
    if (content) {
      content.style.padding = '';
      content.style.maxWidth = '';
    }

    // Subscribe router to store changes
    if (!KrishiApp._subscribed) {
      KrishiStore.subscribe(() => KrishiRouter.render());
      KrishiApp._subscribed = true;
    }

    KrishiRouter.render();
  },

  _subscribed: false
};

document.addEventListener('DOMContentLoaded', () => {
  KrishiApp.boot();
});
