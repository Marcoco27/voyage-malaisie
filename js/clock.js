// Horloge double (KL + Paris) affichée dans le header, style simple, police visible, couleur blanche, centrée
class ClockManager {
    constructor() {
        this.clockInterval = null;
        this.klElem = null;
        this.parisElem = null;
        this.init();
    }

    init() {
        this.createSimpleClock();
        if (this.klElem && this.parisElem) {
            this.updateClock();
            this.clockInterval = setInterval(() => this.updateClock(), 1000);
        }
    }

    createSimpleClock() {
        const header = document.querySelector('.hero-header');
        if (!header) return;
        
        // Supprimer toute ancienne horloge simple éventuelle
        const oldClock = header.querySelector('.simple-clock');
        if (oldClock) oldClock.remove();

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

        this.klElem = document.getElementById('kl-time');
        this.parisElem = document.getElementById('paris-time');
    }

    updateClock() {
        const now = new Date();
        const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
        
        try {
            const klTime = now.toLocaleTimeString('fr-FR', { ...timeOptions, timeZone: CONFIG.timezones.kualaLumpur });
            const parisTime = now.toLocaleTimeString('fr-FR', { ...timeOptions, timeZone: CONFIG.timezones.france });

            if (this.klElem) this.klElem.textContent = klTime;
            if (this.parisElem) this.parisElem.textContent = parisTime;
        } catch (error) {
            console.error("Erreur lors de la mise à jour de l'horloge :", error);
            // Optionnel : arrêter l'intervalle si les fuseaux horaires ne sont pas valides
            if (this.clockInterval) {
                clearInterval(this.clockInterval);
                this.clockInterval = null;
            }
        }
    }
}
