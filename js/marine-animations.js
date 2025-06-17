// Module d'animations marines pour le header
class MarineAnimations {
    constructor() {
        this.animationContainer = null;
        this.init();
    }
    
    init() {
        this.createAnimationContainer();
        this.startAnimations();
    }
    
    createAnimationContainer() {
        const header = document.querySelector('.hero-header');
        if (!header) return;
        
        this.animationContainer = document.createElement('div');
        this.animationContainer.className = 'marine-animations';
        header.insertBefore(this.animationContainer, header.firstChild);
    }
    
    createCreature(type, delay) {
        const creature = document.createElement('div');
        creature.className = `marine-creature ${type}`;
        creature.style.top = `${Math.random() * 70 + 15}%`; // Position verticale aléatoire (15% à 85%)
        creature.style.animationDelay = `${delay}s`;
        creature.style.animationDuration = `${Math.random() * 15 + 20}s`; // Durée aléatoire
        if (type === 'shark') {
            creature.style.transform = 'scaleX(-1)'; // Le requin peut nager dans l'autre sens
        }
        this.animationContainer.appendChild(creature);
    }

    startAnimations() {
        if (!this.animationContainer) return;
        const creatures = [
            { type: 'turtle', src: 'assets/turtle-silhouette.png' },
            { type: 'shark', src: 'assets/shark-silhouette.png' },
            { type: 'fish-group', src: 'assets/fish-group-silhouette.png' },
            { type: 'single-fish', src: 'assets/single-fish-silhouette.png' }
        ];

        // Injecter les styles pour les images directement
        const styleSheet = document.createElement("style");
        let styles = '';
        creatures.forEach(c => {
            styles += `.marine-creature.${c.type} { background-image: url(${c.src}); }\n`;
        });
        styleSheet.innerText = styles;
        document.head.appendChild(styleSheet);
        
        // Créer quelques créatures
        this.createCreature('turtle', 0);
        this.createCreature('fish-group', 5);
        this.createCreature('shark', 12);
        this.createCreature('single-fish', 2);
        this.createCreature('single-fish', 8);
        this.createCreature('turtle', 15);
    }
}
