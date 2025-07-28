// Horloge double (KL + Paris) affichée dans le header, style simple, police visible, couleur blanche, centrée
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
        // Créer l'élément horloge double
        const clock = document.createElement('div');
        clock.className = 'simple-clock';
        clock.innerHTML = `
            <span class="clock-label">🇲🇾 Kuala Lumpur</span>
            <span id="kl-time" class="clock-time">--:--:--</span>
            <span class="clock-sep">|</span>
            <span class="clock-label">🇫🇷 Paris</span>
            <span id="paris-time" class="clock-time">--:--:--</span>
        `;
        header.insertBefore(clock, header.firstChild);
    }

    updateClock() {
        const now = new Date();
        const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
        const klTime = now.toLocaleTimeString('fr-FR', { ...timeOptions, timeZone: CONFIG.timezones.kualaLumpur });
        const parisTime = now.toLocaleTimeString('fr-FR', { ...timeOptions, timeZone: CONFIG.timezones.france });
        const klElem = document.getElementById('kl-time');
        const parisElem = document.getElementById('paris-time');
        if (klElem) klElem.textContent = klTime;
        if (parisElem) parisElem.textContent = parisTime;
    }
}
