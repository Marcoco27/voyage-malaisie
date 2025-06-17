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
