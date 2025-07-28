// Horloge simple affichée dans le header
class ClockManager {
    constructor() {
        this.clockInterval = null;
        this.init();
    }

    init() {
        this.createSimpleClock();
        this.updateClock();
        this.clockInterval = setInterval(() => this.updateClock(), 1000);
    }

    createSimpleClock() {
        const header = document.querySelector('.hero-header');
        if (!header) return;
        // Supprimer toute ancienne horloge simple éventuelle
        const oldClock = header.querySelector('.simple-clock');
        if (oldClock) oldClock.remove();
        // Créer l'élément horloge
        const clock = document.createElement('div');
        clock.className = 'simple-clock';
        clock.innerHTML = '<span id="simple-clock-time">--:--:--</span> <span class="simple-clock-label">(Heure locale Malaisie)</span>';
        // Ajouter l'horloge en haut du header
        header.insertBefore(clock, header.firstChild);
    }

    updateClock() {
        const now = new Date();
        const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
        const timeString = now.toLocaleTimeString('fr-FR', { ...timeOptions, timeZone: CONFIG.timezones.kualaLumpur });
        const timeElem = document.getElementById('simple-clock-time');
        if (timeElem) timeElem.textContent = timeString;
    }
}
