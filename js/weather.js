// Module de gestion de la météo
class WeatherManager {
    constructor() {
        this.init();
    }
    
    init() {
        this.createWeatherWidget();
        this.getCurrentCityWeather();
        setInterval(() => this.getCurrentCityWeather(), CONFIG.weather.updateInterval);
    }
    
    createWeatherWidget() {
        const header = document.querySelector('.hero-header');
        if (!header) return;
        
        const weatherWidget = document.createElement('div');
        weatherWidget.id = 'weather-widget';
        weatherWidget.className = 'weather-widget';
        weatherWidget.innerHTML = `<!-- Contenu météo sera injecté ici -->`;
        
        // Insérer avant les horloges
        const clockWidget = header.querySelector('.clock-widget');
        if (clockWidget) {
            header.insertBefore(weatherWidget, clockWidget);
        } else {
            header.appendChild(weatherWidget);
        }
    }
    
    async getCurrentCityWeather() {
        const widget = document.getElementById('weather-widget');
        try {
            if (CONFIG.weather.apiKey === 'votre_cle_openweathermap') {
                this.showWeatherError('Clé API non configurée');
                return;
            }
            
            const response = await fetch(`${CONFIG.weather.apiUrl}?q=${CONFIG.weather.defaultCity}&appid=${CONFIG.weather.apiKey}&units=metric&lang=fr`);
            if (!response.ok) throw new Error('Erreur réseau');
            
            const data = await response.json();
            this.displayWeather(data);
            
        } catch (error) {
            this.showWeatherError('Météo indisponible');
        }
    }
    
    displayWeather(data) {
        const widget = document.getElementById('weather-widget');
        const icon = this.getWeatherIcon(data.weather[0].icon);
        widget.innerHTML = `
            <div class="weather-content">
                <div class="weather-icon">${icon}</div>
                <div class="weather-info">
                    <div class="weather-temp">${Math.round(data.main.temp)}°C</div>
                    <div class="weather-city">${data.name}</div>
                </div>
                <div class="weather-details">
                    💧 ${data.main.humidity}%<br>
                    💨 ${Math.round(data.wind.speed * 3.6)} km/h
                </div>
            </div>`;
    }

    showWeatherError(message) {
        document.getElementById('weather-widget').innerHTML = `<div class="weather-content"><div class="weather-icon">❌</div><div class="weather-info"><div class="weather-city">${message}</div></div></div>`;
    }
    
    getWeatherIcon(iconCode) {
        const icons = { '01d': '☀️', '01n': '🌙', '02d': '⛅', '02n': '☁️', '03d': '☁️', '03n': '☁️', '04d': '☁️', '04n': '☁️', '09d': '🌧️', '09n': '🌧️', '10d': '🌦️', '10n': '🌧️', '11d': '⛈️', '11n': '⛈️', '13d': '❄️', '13n': '❄️', '50d': '🌫️', '50n': '🌫️' };
        return icons[iconCode] || '🌤️';
    }
}
