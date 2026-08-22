/**
 * KrishiSetu AI — Client Router v3
 */
window.KrishiRouter = {

  render() {
    const tab     = window.KrishiStore.state.currentTab;
    const content = document.getElementById('app-content');
    if (!content) return;

    let html = '';

    switch (tab) {
      case 'home':          html = window.KrishiRoleDash.render();       break;
      case 'sell_smart':    html = window.KrishiSellSmart.render();       break;
      case 'krishi_ai':     html = window.KrishiAI.render();              break;
      case 'disease_scan':  html = window.KrishiDiseaseScan.render();     break;
      case 'tractors':      html = window.KrishiTractors.render();        break;
      case 'workers':       html = window.KrishiWorkers.render();         break;
      case 'buyers':        html = window.KrishiBuyers.render();          break;
      case 'directory':     html = window.KrishiDirectory.render();       break;
      case 'irrigation':    html = window.KrishiIrrigation.render();      break;
      case 'profit_calc':   html = window.KrishiProfitCalc.render();      break;
      case 'map':           html = window.KrishiMap.render();             break;
      case 'provider_reg':  html = window.KrishiProviderReg.render();     break;
      case 'transport':     html = window.KrishiTransport.render();       break;
      case 'cold_storage':  html = window.KrishiColdStorage.render();     break;
      case 'seeds':         html = window.KrishiSeeds.render();           break;
      case 'pesticides':    html = window.KrishiPesticides.render();      break;
      case 'profile':       html = window.KrishiProfile.render();         break;
      case 'admin':         html = window.KrishiAdmin ? window.KrishiAdmin.render() : '<p>Loading…</p>'; break;
      default:              html = window.KrishiRoleDash.render();        break;
    }

    content.innerHTML = html;

    // Post-render hooks
    if (tab === 'map')         setTimeout(() => window.KrishiMap.initLeaflet(), 100);
    if (tab === 'profit_calc') setTimeout(() => window.KrishiProfitCalc.calc(), 50);

    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.KrishiNav.renderBottomNav();
    window.KrishiNav.renderTopHeader();
    window.KrishiNav.renderLocationBar();
  }
};
