// Gestionnaire d'horloge
export class ClockManager {
    constructor(timezonesConfig) {
        this.config = timezonesConfig;
    }

    init() {
        const clockContainer = this.createClockContainer();
        document.querySelector('.hero-header').prepend(clockContainer); // Ajoute en premier
        this.updateClocks();
        setInterval(() => this.updateClocks(), 1000);
    }

    createClockContainer() {
        const container = document.createElement('div');
        container.className = 'clock-container';
        container.innerHTML = `
            <div id="clock-france" class="simple-clock"></div>
            <div id="clock-malaisie" class="simple-clock"></div>
        `;
        return container;
    }

    updateClocks() {
        const franceTime = new Date().toLocaleTimeString('fr-FR', { timeZone: this.config.france, hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const malaysiaTime = new Date().toLocaleTimeString('en-GB', { timeZone: this.config.kualaLumpur, hour: '2-digit', minute: '2-digit', second: '2-digit' });
        
        document.getElementById('clock-france').innerHTML = `<span class="clock-label">Paris</span> <span class="clock-time">${franceTime}</span>`;
        document.getElementById('clock-malaisie').innerHTML = `<span class="clock-label">Kuala Lumpur</span> <span class="clock-time">${malaysiaTime}</span>`;
    }
}
