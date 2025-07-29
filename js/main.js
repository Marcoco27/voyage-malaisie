// js/main.js - Point d'entrée principal de l'application

// Importer les modules nécessaires de Firebase (syntaxe moderne v9)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";

// Importer les modules de l'application
import { VoyageApp } from './voyage-app.js';
import { NotesManager } from './notes.js';
import { WeatherManager } from './weather.js';
import { ClockManager } from './clock.js';
import { MarineAnimations } from './marine-animations.js';

// --- Configuration Centralisée ---
const config = {
    firebase: {
      apiKey: "AIzaSyD7JU2HJpEZFW4LSFH0LzRVivulTUgaBpc",
      authDomain: "mgprofilbox.firebaseapp.com",
      projectId: "mgprofilbox",
      storageBucket: "mgprofilbox.appspot.com",
      messagingSenderId: "663481645724",
      appId: "1:663481645724:web:f438035583a728200e0b59",
      measurementId: "G-C20NJDMSRE"
    },
    weather: {
        apiKey: 'a1e80ab5644eba8f07d8920d13f9bf83',
        apiUrl: 'https://api.openweathermap.org/data/2.5/weather',
        defaultCity: 'Kuala Lumpur,MY',
        updateInterval: 300000 // 5 minutes
    },
    timezones: {
        france: 'Europe/Paris',
        kualaLumpur: 'Asia/Kuala_Lumpur'
    },
    marineAnimations: {
        enabled: true,
        creatureCount: 6,
        creatures: [
            { type: 'turtle', minDuration: 20, maxDuration: 30 },
            { type: 'shark', minDuration: 30, maxDuration: 40 },
            { type: 'fish-group', minDuration: 15, maxDuration: 25 },
            { type: 'single-fish', minDuration: 10, maxDuration: 20 }
        ]
    }
};

// --- Initialisation de l'Application ---
class MainApp {
    constructor(config) {
        this.config = config;
        this.initFirebase();
        this.initApplication();
    }

    initFirebase() {
        const app = initializeApp(this.config.firebase);
        this.database = getDatabase(app);
    }

    initApplication() {
        document.addEventListener('DOMContentLoaded', async () => {
            // Créer les instances des modules
            const notesManager = new NotesManager(this.database);
            const weatherManager = new WeatherManager(this.config.weather);
            const clockManager = new ClockManager(this.config.timezones);
            const marineAnimations = new MarineAnimations(this.config.marineAnimations);
            const voyageApp = new VoyageApp();

            // Initialiser les modules dans le bon ordre
            await voyageApp.init(); // Attendre que la structure de base soit en place
            notesManager.init();
            weatherManager.init();
            clockManager.init();
            marineAnimations.init();
        });
    }
}

// Lancer l'application avec la configuration
new MainApp(config);
