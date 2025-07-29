// Gestionnaire de météo
class WeatherManager {
    constructor(weatherConfig) {
        this.config = weatherConfig;
        this.init();
    }

    async init() {
        const widget = this.createWeatherWidget();
        document.querySelector('.hero-header').appendChild(widget);
        this.updateWeather();
        setInterval(() => this.updateWeather(), this.config.updateInterval);
    }

    createWeatherWidget() {
        const widget = document.createElement('div');
        widget.className = 'weather-widget';
        widget.innerHTML = `
            <div class="weather-content">
                <i class="fas fa-spinner fa-spin weather-icon"></i>
                <div class="weather-info">
                    <div class="weather-temp">--°C</div>
                    <div class="weather-city">Chargement...</div>
                </div>
            </div>
            <div class="weather-details">--</div>
        `;
        return widget;
    }

    async updateWeather() {
        try {
            const city = this.config.defaultCity;
            const apiKey = this.config.apiKey;
            const url = `${this.config.apiUrl}?q=${city}&appid=${apiKey}&units=metric&lang=fr`;
            const response = await fetch(url);
            if (!response.ok) throw new Error('Réponse réseau incorrecte');
            const data = await response.json();
            this.displayWeather(data);
        } catch (error) {
            console.error("Erreur de mise à jour météo:", error);
            this.displayError();
        }
    }

    displayWeather(data) {
        const widget = document.querySelector('.weather-widget');
        if (!widget) return;
        const iconClass = this.getWeatherIcon(data.weather[0].id);
        widget.querySelector('.weather-icon').className = `fas ${iconClass} weather-icon`;
        widget.querySelector('.weather-temp').textContent = `${Math.round(data.main.temp)}°C`;
        widget.querySelector('.weather-city').textContent = data.name;
        widget.querySelector('.weather-details').textContent = data.weather[0].description;
    }

    displayError() {
        const widget = document.querySelector('.weather-widget');
        if (!widget) return;
        widget.querySelector('.weather-icon').className = `fas fa-exclamation-triangle weather-icon`;
        widget.querySelector('.weather-city').textContent = 'Erreur météo';
    }

    getWeatherIcon(conditionId) {
        if (conditionId >= 200 && conditionId < 300) return 'fa-bolt';
        if (conditionId >= 300 && conditionId < 500) return 'fa-cloud-rain';
        if (conditionId >= 500 && conditionId < 600) return 'fa-cloud-showers-heavy';
        if (conditionId >= 600 && conditionId < 700) return 'fa-snowflake';
        if (conditionId >= 700 && conditionId < 800) return 'fa-smog';
        if (conditionId === 800) return 'fa-sun';
        if (conditionId > 800) return 'fa-cloud';
        return 'fa-question-circle';
    }
}
export { WeatherManager };
