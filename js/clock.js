// Gestion simple des horloges sans habillage
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
            <div class="simple-clock">
                <span id="france-time">--:--:--</span>
                <span style="margin-left: 1rem;">France 🇫🇷</span>
            </div>
            <div class="simple-clock">
                <span id="kl-time">--:--:--</span>
                <span style="margin-left: 1rem;">Kuala Lumpur 🇲🇾</span>
            </div>
        `;

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

// Initialisation automatique
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new ClockManager());
} else {
    new ClockManager();
}
