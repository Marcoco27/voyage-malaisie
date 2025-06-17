// Configuration globale du site
const CONFIG = {
    // API Météo OpenWeatherMap (clé gratuite - à remplacer par votre clé)
    weather: {
        apiKey: '4eee2057f69a6abd082700bc17010414', // À remplacer
        apiUrl: 'https://api.openweathermap.org/data/2.5/weather',
        defaultCity: 'Kuala Lumpur,MY',
        updateInterval: 300000 // 5 minutes
    },
    
    // Configuration des fuseaux horaires
    timezones: {
        france: 'Europe/Paris',
        kualaLumpur: 'Asia/Kuala_Lumpur'
    },
    
    // Configuration d'authentification
    auth: {
        sessionKey: 'voyage_malaisie_auth',
        rememberKey: 'voyage_malaisie_remember',
        users: {
            // Utilisateur de démonstration - à modifier
            'famille': 'voyage2024' 
        }
    },
    
    // Configuration du bloc-notes
    notes: {
        storageKey: 'voyage_malaisie_notes',
        maxLength: 10000
    },
    
    // Palette de couleurs tropical/minimaliste
    colors: {
        primary: '#00A8A8',      // Turquoise tropical
        secondary: '#FF7B54',    // Corail
        accent: '#F6E96B',       // Jaune soleil
        success: '#6BCF7F',      // Vert tropical
        dark: '#2C3E50',         // Bleu nuit
        light: '#F8FFFE',        // Blanc crème
        sand: '#F5F3F0',         // Sable
        ocean: '#0077BE'         // Bleu océan
    }
};

// Export pour utilisation dans d'autres modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
