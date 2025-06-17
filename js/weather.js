// Module de gestion de la météo
class WeatherManager {
    constructor() {
        this.currentWeather = null;
        this.lastUpdate = null;
        this.updateInterval = null;
        this.init();
    }
    
    init() {
        this.createWeatherWidget();
        this.getCurrentCityWeather();
        
        // Mettre à jour toutes les 5 minutes
        this.updateInterval = setInterval(() => {
            this.getCurrentCityWeather();
        }, CONFIG.weather.updateInterval);
    }
    
    createWeatherWidget() {
        const header = document.querySelector('.hero-header');
        if (!header) return;
        
        const weatherWidget = document.createElement('div');
        weatherWidget.id = 'weather-widget';
        weatherWidget.className = 'weather-widget';
        weatherWidget.innerHTML = `
            <div class="weather-content">
                <div class="weather-icon">🌤️</div>
                <div class="weather-info">
                    <div class="weather-temp">--°C</div>
                    <div class="weather-city">Chargement...</div>
                </div>
                <div class="weather-details">
                    <div class="weather-humidity">💧 --%</div>
                    <div class="weather-wind">💨 -- km/h</div>
                </div>
            </div>
        `;
        
        header.appendChild(weatherWidget);
    }
    
    async getCurrentCityWeather() {
        try {
            // Déterminer la ville actuelle selon les dates du voyage
            const currentCity = this.getCurrentDestination();
            
            // Si pas de clé API configurée, afficher un message
            if (CONFIG.weather.apiKey === 'votre_cle_openweathermap') {
                this.showWeatherError('Clé API météo non configurée');
                return;
            }
            
            const response = await fetch(
                `${CONFIG.weather.apiUrl}?q=${currentCity}&appid=${CONFIG.weather.apiKey}&units=metric&lang=fr`
            );
            
            if (!response.ok) throw new Error('Erreur API météo');
            
            const data = await response.json();
            this.displayWeather(data);
            this.lastUpdate = new Date();
            
        } catch (error) {
            console.error('Erreur météo:', error);
            this.showWeatherError('Météo indisponible');
        }
    }
    
    getCurrentDestination() {
        // Déterminer la ville actuelle selon la date
        const today = new Date();
        const currentYear = today.getFullYear();
        
        // Voyage prévu pour août 2024, ajuster selon la date actuelle
        const voyageDates = [
            { lieu: 'Kuala Lumpur', start: new Date(currentYear, 6, 31), end: new Date(currentYear, 7, 3) },
            { lieu: 'Cameron Highlands', start: new Date(currentYear, 7, 3), end: new Date(currentYear, 7, 4) },
            { lieu: 'Taman Negara', start: new Date(currentYear, 7, 4), end: new Date(currentYear, 7, 6) },
            { lieu: 'Kuala Besut', start: new Date(currentYear, 7, 6), end: new Date(currentYear, 7, 7) },
            { lieu: 'Perhentian Islands', start: new Date(currentYear, 7, 7), end: new Date(currentYear, 7, 9) },
            { lieu: 'Cherating', start: new Date(currentYear, 7, 9), end: new Date(currentYear, 7, 11) },
            { lieu: 'Tioman Island', start: new Date(currentYear, 7, 11), end: new Date(currentYear, 7, 12) },
            { lieu: 'Singapore', start: new Date(currentYear, 7, 12), end: new Date(currentYear, 7, 15) },
            { lieu: 'Melaka', start: new Date(currentYear, 7, 15), end: new Date(currentYear, 7, 17) },
            { lieu: 'Kuala Selangor', start: new Date(currentYear, 7, 17), end: new Date(currentYear, 7, 18) },
            { lieu: 'Kuala Lumpur', start: new Date(currentYear, 7, 18), end: new Date(currentYear, 7, 20) }
        ];
        
        // Trouver la destination actuelle
        for (const dest of voyageDates) {
            if (today >= dest.start && today <= dest.end) {
                return dest.lieu + ',MY';
            }
        }
        
        // Par défaut, Kuala Lumpur
        return CONFIG.weather.defaultCity;
    }
    
    displayWeather(data) {
        const widget = document.getElementById('weather-widget');
        if (!widget) return;
        
        const temp = Math.round(data.main.temp);
        const city = data.name;
        const humidity = data.main.humidity;
        const windSpeed = Math.round(data.wind.speed * 3.6); // m/s vers km/h
        const description = data.weather[0].description;
        const icon = this.getWeatherIcon(data.weather[0].icon);
        
        widget.querySelector('.weather-icon').textContent = icon;
        widget.querySelector('.weather-temp').textContent = `${temp}°C`;
        widget.querySelector('.weather-city').textContent = city;
        widget.querySelector('.weather-humidity').textContent = `💧 ${humidity}%`;
        widget.querySelector('.weather-wind').textContent = `💨 ${windSpeed} km/h`;
        
        // Ajouter tooltip avec description
        widget.title = `${city}: ${description}, ${temp}°C`;
    }
    
    getWeatherIcon(iconCode) {
        const icons = {
            '01d': '☀️', '01n': '🌙',
            '02d': '⛅', '02n': '☁️',
            '03d': '☁️', '03n': '☁️',
            '04d': '☁️', '04n': '☁️',
            '09d': '🌧️', '09n': '🌧️',
            '10d': '🌦️', '10n': '🌧️',
            '11d': '⛈️', '11n': '⛈️',
            '13d': '❄️', '13n': '❄️',
            '50d': '🌫️', '50n': '🌫️'
        };
        
        return icons[iconCode] || '🌤️';
    }
    
    showWeatherError(message) {
        const widget = document.getElementById('weather-widget');
        if (!widget) return;
        
        widget.querySelector('.weather-icon').textContent = '❌';
        widget.querySelector('.weather-temp').textContent = '--°C';
        widget.querySelector('.weather-city').textContent = message;
        widget.querySelector('.weather-humidity').textContent = '💧 --%';
        widget.querySelector('.weather-wind').textContent = '💨 -- km/h';
    }
    
    destroy() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
    }
}
