const DATA_ENDPOINT = './data/itinerary.json';

class DataService {
    constructor(endpoint = DATA_ENDPOINT) {
        this.endpoint = endpoint;
        this.cache = null;
        this.loading = false;
    }

    async fetchItinerary(forceRefresh = false) {
        if (this.cache && !forceRefresh) {
            return this.cache;
        }

        if (this.loading) {
            return new Promise((resolve) => {
                const checkCache = setInterval(() => {
                    if (!this.loading && this.cache) {
                        clearInterval(checkCache);
                        resolve(this.cache);
                    }
                }, 50);
            });
        }

        this.loading = true;
        try {
            const response = await fetch(this.endpoint);
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            this.cache = await response.json();
            return this.cache;
        } catch (error) {
            console.error('Erreur DataService:', error);
            throw error;
        } finally {
            this.loading = false;
        }
    }

    async getAllLocations() {
        return this.fetchItinerary();
    }

    async getLocationByIndex(index) {
        const itinerary = await this.fetchItinerary();
        return itinerary[index] || null;
    }

    async getLocationByName(name) {
        const itinerary = await this.fetchItinerary();
        return itinerary.find(loc => loc.lieu.toLowerCase().includes(name.toLowerCase())) || null;
    }

    async getStats() {
        const itinerary = await this.fetchItinerary();
        return {
            totalDays: itinerary.reduce((sum, loc) => sum + (loc.nuits || 0), 0),
            totalDestinations: itinerary.length,
            totalKms: itinerary.reduce((sum, loc) => {
                if (!loc.distance) return sum;
                const match = loc.distance.match(/^(\d+)/);
                return sum + (match ? parseInt(match[1]) : 0);
            }, 0),
            transportModes: [...new Set(itinerary.flatMap(loc => loc.transport || []))].length
        };
    }

    clearCache() {
        this.cache = null;
    }
}

export const dataService = new DataService();
export default DataService;
