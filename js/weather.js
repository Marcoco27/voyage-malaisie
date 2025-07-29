// Module de gestion de la météo
class WeatherManager {
    constructor() {
        this.widget = null;
        this.init();
    }

    init() {
        this.createWeatherWidget();
        if (this.widget) {
            this.getCurrentCityWeather();
            setInterval(() => this.getCurrentCityWeather(), CONFIG.weather.updateInterval);
        }
    }

    createWeatherWidget() {
        const header = document.querySelector('.hero-header');
        if (!header) return;

        this.widget = document.createElement('div');
        this.widget.id = 'weather-widget';
        this.widget.className = 'weather-widget';
        this.widget.innerHTML = '<!-- Contenu météo sera injecté ici -->';

        const clockWidget = header.querySelector('.clock-widget');
        if (clockWidget) {
            header.insertBefore(this.widget, clockWidget);
        } else {
            header.appendChild(this.widget);
        }
    }

    async getCurrentCityWeather() {
        if (!this.widget) return;

        if (CONFIG.weather.apiKey === 'votre_cle_openweathermap') {
            this.showWeatherError('Clé API non configurée');
            return;
        }

        try {
            const response = await fetch(`${CONFIG.weather.apiUrl}?q=${CONFIG.weather.defaultCity}&appid=${CONFIG.weather.apiKey}&units=metric&lang=fr`);
            if (!response.ok) {
                throw new Error(`Erreur réseau: ${response.statusText}`);
            }
            const data = await response.json();
            this.displayWeather(data);
        } catch (error) {
            console.error("Erreur de météo:", error);
            this.showWeatherError('Météo indisponible');
        }
    }

    _renderWeatherHTML(data) {
        const icon = this._getWeatherIcon(data.weather[0].icon);
        return `
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

    _renderErrorHTML(message) {
        return `<div class="weather-content"><div class="weather-icon">❌</div><div class="weather-info"><div class="weather-city">${message}</div></div></div>`;
    }
    
    displayWeather(data) {
        if (this.widget) {
            this.widget.innerHTML = this._renderWeatherHTML(data);
        }
    }

    showWeatherError(message) {
        if (this.widget) {
            this.widget.innerHTML = this._renderErrorHTML(message);
        }
    }

    _getWeatherIcon(iconCode) {
        const icons = {
            '01d': '☀️', '01n': '🌙', '02d': '⛅', '02n': '☁️',
            '03d': '☁️', '03n': '☁️', '04d': '☁️', '04n': '☁️',
            '09d': '🌧️', '09n': '🌧️', '10d': '🌦️', '10n': '🌧️',
            '11d': '⛈️', '11n': '⛈️', '13d': '❄️', '13n': '❄️',
            '50d': '🌫️', '50n': '🌫️'
        };
        return icons[iconCode] || '🌤️';
    }
}
