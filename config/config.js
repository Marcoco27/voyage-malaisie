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
            'famille': 'voyage2024' 
        }
    },
    
    // Configuration du bloc-notes
    notes: {
        storageKey: 'voyage_malaisie_notes',
        maxLength: 10000
    }
};
