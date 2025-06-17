// Module de gestion des horloges
class ClockManager {
    constructor() {
        this.clockInterval = null;
        this.init();
    }
    
    init() {
        this.createClockWidget();
        this.updateClocks();
        
        // Mettre à jour toutes les secondes
        this.clockInterval = setInterval(() => {
            this.updateClocks();
        }, 1000);
    }
    
    createClockWidget() {
        const header = document.querySelector('.hero-header');
        if (!header) return;
        
        const clockWidget = document.createElement('div');
        clockWidget.id = 'clock-widget';
        clockWidget.className = 'clock-widget';
        clockWidget.innerHTML = `
            <div class="clocks-container">
                <div class="clock france-clock">
                    <div class="clock-flag">🇫🇷</div>
                    <div class="clock-info">
                        <div class="clock-time">--:--:--</div>
                        <div class="clock-label">France</div>
                    </div>
                </div>
                <div class="clock malaysia-clock">
                    <div class="clock-flag">🇲🇾</div>
                    <div class="clock-info">
                        <div class="clock-time">--:--:--</div>
                        <div class="clock-label">Kuala Lumpur</div>
                    </div>
                </div>
            </div>
        `;
        
        header.appendChild(clockWidget);
    }
    
    updateClocks() {
        const now = new Date();
        
        // Heure française
        const franceTime = new Intl.DateTimeFormat('fr-FR', {
            timeZone: CONFIG.timezones.france,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        }).format(now);
        
        // Heure de Kuala Lumpur
        const klTime = new Intl.DateTimeFormat('fr-FR', {
            timeZone: CONFIG.timezones.kualaLumpur,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        }).format(now);
        
        // Mettre à jour l'affichage
        const franceClock = document.querySelector('.france-clock .clock-time');
        const malaysiaClock = document.querySelector('.malaysia-clock .clock-time');
        
        if (franceClock) franceClock.textContent = franceTime;
        if (malaysiaClock) malaysiaClock.textContent = klTime;
        
        // Ajouter un effet de pulse pour les secondes
        this.addPulseEffect();
    }
    
    addPulseEffect() {
        const clocks = document.querySelectorAll('.clock-time');
        clocks.forEach(clock => {
            clock.classList.remove('pulse');
            // Force reflow
            clock.offsetHeight;
            clock.classList.add('pulse');
        });
    }
    
    destroy() {
        if (this.clockInterval) {
            clearInterval(this.clockInterval);
        }
    }
}
