// Gestionnaire d'animations marines
class MarineAnimations {
    constructor(animationsConfig) {
        this.config = animationsConfig;
        if (this.config.enabled) {
            this.init();
        }
    }

    init() {
        const header = document.querySelector('.hero-header');
        if (!header) return;

        const container = document.createElement('div');
        container.className = 'marine-animations';
        header.prepend(container); // S'assurer qu'il est en arrière-plan

        this.createCreatures(container, this.config.creatureCount);
    }

    createCreatures(container, count) {
        for (let i = 0; i < count; i++) {
            const creatureConfig = this.getRandomCreature();
            const creature = document.createElement('div');
            creature.className = `marine-creature ${creatureConfig.type}`;
            
            const duration = Math.random() * (creatureConfig.maxDuration - creatureConfig.minDuration) + creatureConfig.minDuration;
            const delay = Math.random() * duration;

            creature.style.animationDuration = `${duration}s`;
            creature.style.animationDelay = `-${delay}s`; // Départs décalés
            creature.style.top = `${Math.random() * 90}%`; // Position verticale aléatoire
            
            container.appendChild(creature);
        }
    }

    getRandomCreature() {
        const creatures = this.config.creatures;
        return creatures[Math.floor(Math.random() * creatures.length)];
    }
}
export { MarineAnimations };
