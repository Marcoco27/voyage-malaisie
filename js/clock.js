// Module de gestion des horloges
class ClockManager {
    constructor() {
        this.clockInterval = null;
        this.init();
    }
    
    init() {
        this.createClockWidget();
        this.updateClocks();
        this.clockInterval = setInterval(() => this.updateClocks(), 1000);
    }
    
    createClockWidget() {
        const header = document.querySelector('.hero-header');
        if (!header) return;
        
        const clockWidgetContainer = document.createElement('div');
        clockWidgetContainer.className = 'clock-widget';
        clockWidgetContainer.innerHTML = `
            <div class="clock-cockpit">
                <div class="cockpit-label">France 🇫🇷</div>
                <div class="cockpit-display"><div class="cockpit-time" id="france-time">--:--:--</div></div>
            </div>
            <div class="clock-cockpit">
                <div class="cockpit-label">Kuala Lumpur 🇲🇾</div>
                <div class="cockpit-display"><div class="cockpit-time" id="kl-time">--:--:--</div></div>
            </div>
        `;
        
        // Insérer avant la navigation
        const nav = header.querySelector('.main-nav');
        if(nav) {
            header.insertBefore(clockWidgetContainer, nav);
        } else {
            header.appendChild(clockWidgetContainer);
        }
    }
    
    updateClocks() {
        const now = new Date();
        const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
        
        document.getElementById('france-time').textContent = now.toLocaleTimeString('fr-FR', { ...timeOptions, timeZone: CONFIG.timezones.france });
        document.getElementById('kl-time').textContent = now.toLocaleTimeString('fr-FR', { ...timeOptions, timeZone: CONFIG.timezones.kualaLumpur });
    }
}

// Ajoute automatiquement les vis, repères et centre à chaque horloge cockpit-display
function enhanceCockpitDisplays() {
  const marks = Array.from({length: 12}, (_, i) => `<div class="cadran-mark m${i}"></div>`).join('');
  const screws = `
    <div class="cadran-screw s1"></div>
    <div class="cadran-screw s2"></div>
    <div class="cadran-screw s3"></div>
    <div class="cadran-screw s4"></div>
  `;
  const center = '<div class="cadran-center"></div>';
  document.querySelectorAll('.cockpit-display').forEach(el => {
    // Évite de dupliquer si déjà présent
    if (!el.classList.contains('cadran-enhanced')) {
      el.insertAdjacentHTML('beforeend', screws + center + marks);
      el.classList.add('cadran-enhanced');
    }
  });
}
// Lance l'amélioration après chargement du DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', enhanceCockpitDisplays);
} else {
  enhanceCockpitDisplays();
}
