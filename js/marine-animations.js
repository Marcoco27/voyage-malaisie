// Module d'animations marines pour le header
class MarineAnimations {
    constructor() {
        if (!CONFIG.marineAnimations.enabled) return;
        
        this.animationContainer = null;
        this.init();
    }

    init() {
        this.createAnimationContainer();
        if (this.animationContainer) {
            this.startAnimations();
        }
    }

    createAnimationContainer() {
        const header = document.querySelector('.hero-header');
        if (!header) return;

        this.animationContainer = document.createElement('div');
        this.animationContainer.className = 'marine-animations';
        header.insertBefore(this.animationContainer, header.firstChild);
    }

    _createCreature() {
        const creatureConfig = CONFIG.marineAnimations.creatures;
        const randomCreatureType = creatureConfig[Math.floor(Math.random() * creatureConfig.length)];
        
        const creature = document.createElement('div');
        creature.className = `marine-creature ${randomCreatureType.type}`;
        
        // Position et durée aléatoires
        creature.style.top = `${Math.random() * 70 + 15}%`;
        const duration = Math.random() * (randomCreatureType.maxDuration - randomCreatureType.minDuration) + randomCreatureType.minDuration;
        creature.style.animationDuration = `${duration}s`;
        creature.style.animationDelay = `${Math.random() * duration}s`;

        // Inverser aléatoirement la direction
        if (Math.random() > 0.5) {
            creature.style.transform = 'scaleX(-1)';
        }

        this.animationContainer.appendChild(creature);
    }

    startAnimations() {
        for (let i = 0; i < CONFIG.marineAnimations.creatureCount; i++) {
            this._createCreature();
        }
    }
}
