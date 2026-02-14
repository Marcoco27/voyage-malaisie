// js/main.js - Point d'entrée principal de l'application

import { VoyageApp } from './voyage-app.js';
import { WeatherManager } from './weather.js';
import { ClockManager } from './clock.js';
import { MarineAnimations } from './marine-animations.js';

// --- Configuration Centralisée ---
const config = {
    weather: {
        apiKey: 'a1e80ab5644eba8f07d8920d13f9bf83',
        apiUrl: 'https://api.openweathermap.org/data/2.5/weather',
        defaultCity: 'Kuala Lumpur,MY',
        updateInterval: 300000
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
        this.initApplication();
    }

    initApplication() {
        document.addEventListener('DOMContentLoaded', async () => {
            const voyageApp = new VoyageApp();
            await voyageApp.init(); 

            new WeatherManager(this.config.weather).init();
            new ClockManager(this.config.timezones).init();
            new MarineAnimations(this.config.marineAnimations).init();
        });
    }
}

new MainApp(config);
