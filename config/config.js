// Configuration globale du site
const CONFIG = {
    // API Météo OpenWeatherMap (clé gratuite - à remplacer par votre clé)
    weather: {
        apiKey: 'a1e80ab5644eba8f07d8920d13f9bf83', // À remplacer
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
            'malaisie': 'voyage2025' 
        }
    },
    
    // Configuration du bloc-notes
    notes: {
        storageKey: 'voyage_malaisie_notes',
        maxLength: 10000
    },

    // Configuration des animations marines
    marineAnimations: {
        enabled: true,
        creatureCount: 6, // Nombre total de créatures à animer
        creatures: [
            { type: 'turtle', minDuration: 20, maxDuration: 30 },
            { type: 'shark', minDuration: 30, maxDuration: 40 },
            { type: 'fish-group', minDuration: 15, maxDuration: 25 },
            { type: 'single-fish', minDuration: 10, maxDuration: 20 }
        ]
    }
};
