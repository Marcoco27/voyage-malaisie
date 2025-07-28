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
        maxLength: 10000,
        // Configuration pour jsonbin.io (solution simple sans compte)
        jsonBinApiKey: '$2a$10$s31.F.O.1.i./.X.e.c.c.u.g.U.C.O.S.s.S.s.S.s.S.s.S.s', // Clé publique d'exemple
        jsonBinBinId: '66a784e1e41b4d34e413a54b' // ID du bin de stockage
    },

    // Configuration Firebase (À REMPLIR AVEC VOS CLÉS)
    // Suivez les instructions pour créer un projet web sur firebase.google.com
    firebase: {
        apiKey: "VOTRE_API_KEY",
        authDomain: "VOTRE_PROJECT_ID.firebaseapp.com",
        databaseURL: "https://VOTRE_PROJECT_ID-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "VOTRE_PROJECT_ID",
        storageBucket: "VOTRE_PROJECT_ID.appspot.com",
        messagingSenderId: "VOTRE_SENDER_ID",
        appId: "VOTRE_APP_ID"
    }
};
