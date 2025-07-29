// Application principale de voyage en Malaisie
class VoyageApp {
    constructor() { // Ne prend plus de paramètre
        this.voyage = [];
        this.map = null;
        this.markers = [];
        this.init();
    }
    
    async init() {
        await this.loadItineraryData();
        this.renderBaseLayout();
        // this.createLogoutButton(); // Le bouton de déconnexion n'est plus nécessaire
        this.generateStats();
        this.initMap();
        this.generateItinerary();
        this.generateNoteCards();
        this.initScrollEffects();
        this.initCardToggle();
        this.initBackToTop();
        
        // Initialiser les autres modules
        this.weatherManager = new WeatherManager();
        this.clockManager = new ClockManager();
        this.notesManager = new NotesManager();
        this.marineAnimations = new MarineAnimations();

        // Gestion du hash pour ouvrir la card correspondante
        setTimeout(() => this.openCardFromHash(), 150);
        window.addEventListener('hashchange', () => this.openCardFromHash());
    }

    async loadItineraryData() {
        try {
            const response = await fetch('data/itinerary.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.voyage = await response.json();
        } catch (error) {
            console.error("Impossible de charger les données de l'itinéraire:", error);
            const container = document.getElementById('main-content');
            if (container) {
                container.innerHTML = `<div class="error">Impossible de charger les données du voyage. Veuillez réessayer plus tard.</div>`;
            }
        }
    }
    
    renderBaseLayout() {
        const container = document.getElementById('main-content');
        container.innerHTML = `
            <header class="hero-header">
                <h1>🏝️ Itinéraire Malaisie & Singapour</h1>
                <p class="hero-subtitle">20 jours d'aventure à travers l'Asie du Sud-Est</p>
                <nav class="main-nav">
                    <a href="#itineraire"><i class="fas fa-map"></i> Itinéraire</a>
                    <a href="#notes-etapes"><i class="fas fa-info-circle"></i> Détails des étapes</a>
                    <a href="#notes-section"><i class="fas fa-sticky-note"></i> Bloc-notes</a>
                </nav>
            </header>
            <main>
                <section id="stats-section" class="fade-in">
                    <div class="stats-container">
                        <!-- Stats injectées par JS -->
                    </div>
                </section>
                <section id="itineraire" class="fade-in">
                    <div class="title-with-icon">
                        <img src="assets/image-map-itineraire.png" alt="Icône de carte" class="title-icon">
                        <h2>Le Périple en Malaisie</h2>
                    </div>
                    <div id="map"></div>
                    <div class="title-with-icon">
                        <img src="assets/image-map-itineraire.png" alt="Icône de calendrier" class="title-icon">
                        <h2>Planning Détaillé</h2>
                    </div>
                    <div class="table-container">
                        <table class="itinerary-table">
                            <thead>
                                <tr>
                                    <th><i class="fas fa-calendar"></i> Date 2024</th>
                                    <th><i class="fas fa-map-marker-alt"></i> Lieu</th>
                                    <th><i class="fas fa-moon"></i> Nuits</th>
                                    <th><i class="fas fa-route"></i> Distance / durée</th>
                                    <th><i class="fas fa-bed"></i> Réservation</th>
                                </tr>
                            </thead>
                            <tbody id="itinerary-body"></tbody>
                        </table>
                    </div>
                </section>
                <section id="notes-etapes" class="fade-in">
                    <div class="title-with-icon">
                        <img src="assets/image-map-itineraire.png" alt="Icône de notes" class="title-icon">
                        <h2>Toutes les Infos</h2>
                    </div>
                    <div id="notes-container"></div>
                </section>
                <!-- Section Bloc-notes sera ajoutée par NotesManager -->
            </main>
            <footer class="tropical-footer">
                <p>Fait avec ❤️ pour un voyage inoubliable</p>
            </footer>
            <button id="back-to-top-btn" class="back-to-top" title="Retour en haut">
                <i class="fas fa-arrow-up"></i>
            </button>
        `;
    }

    // La fonction createLogoutButton n'est plus utilisée
    /*
    createLogoutButton() {
        const logoutBtn = document.createElement('button');
        logoutBtn.className = 'logout-btn';
        logoutBtn.innerHTML = '🚪 Déconnexion';
        logoutBtn.addEventListener('click', () => {
            if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
                this.authManager.logout();
            }
        });
        document.body.appendChild(logoutBtn);
    }
    */
    
    generateStats() {
        const container = document.querySelector('.stats-container');
        if(!container) return;

        const totalDays = this.voyage.reduce((sum, etape) => sum + etape.nuits, 0);
        const totalDestinations = this.voyage.length;
        const totalKms = this.voyage.reduce((sum, etape) => {
            const dist = parseInt(etape.distance.split(' ')[0]);
            return isNaN(dist) ? sum : sum + dist;
        }, 0);
        const transportModes = [...new Set(this.voyage.flatMap(etape => etape.transport))].length;

        container.innerHTML = `
            <div class="stat-box"><span id="stats-days" class="stat-number blue">${totalDays}</span><p class="stat-label">Jours</p></div>
            <div class="stat-box"><span id="stats-destinations" class="stat-number green">${totalDestinations}</span><p class="stat-label">Villes</p></div>
            <div class="stat-box"><span id="stats-kms" class="stat-number orange">${totalKms}</span><p class="stat-label">Kilomètres</p></div>
            <div class="stat-box"><span id="stats-transport" class="stat-number purple">${transportModes}</span><p class="stat-label">Transports</p></div>
        `;
    }
    
    initMap() {
        try {
            if (!window.L) throw new Error("Leaflet non chargé");
            this.map = L.map("map").setView([4.5, 102.5], 7);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
            
            const latlngs = this.voyage.map(etape => [etape.lat, etape.lon]);
            this.voyage.forEach((etape, index) => {
                L.marker([etape.lat, etape.lon]).addTo(this.map)
                    .bindPopup(`<b>${etape.lieu}</b><br>${etape.description}`);
            });
            L.polyline(latlngs, { color: 'var(--primary)', weight: 3 }).addTo(this.map);
            this.map.fitBounds(latlngs, {padding: [50, 50], maxZoom: 9});
        } catch (error) {
            document.getElementById("map").innerHTML = `<div class="error">⚠️ Impossible d'afficher la carte.</div>`;
        }
    }
    
    generateItinerary() {
        const itineraryBody = document.getElementById("itinerary-body");
        if (!itineraryBody) return;
        itineraryBody.innerHTML = this.voyage.map((etape, index) => `
            <tr>
                <td>${etape.dates}</td>
                <td><a href="#card-${index}" class="table-link">${etape.lieu}</a></td>
                <td>${etape.nuits}</td>
                <td>${etape.distance}</td>
                <td>${etape.bookingLink ? `<a href="${etape.bookingLink}" class="booking-btn" target="_blank">Voir</a>` : '<span class="booking-placeholder">À venir</span>'}</td>
            </tr>
        `).join('');
    }
    
    generateNoteCards() {
        const notesContainer = document.getElementById("notes-container");
        if (!notesContainer) return;
        notesContainer.innerHTML = '';
        this.voyage.forEach((etape, index) => {
            const details = encodeURIComponent(etape.description + (etape.conseil ? '
Conseil : ' + etape.conseil : ''));
            let start = '', end = '';
            const dateMatch = etape.dates.match(/(\d{1,2})\s*(\w+)\s*[–-]\s*(\d{1,2})\s*(\w+)/);
            if (dateMatch) {
                const mois = {"janv":1,"févr":2,"mars":3,"avr":4,"mai":5,"juin":6,"juil":7,"août":8,"sept":9,"oct":10,"nov":11,"déc":12};
                const d1 = dateMatch[1].padStart(2,'0');
                const m1 = mois[dateMatch[2].slice(0,4)] || 1;
                const d2 = dateMatch[3].padStart(2,'0');
                const m2 = mois[dateMatch[4].slice(0,4)] || m1;
                start = `2024${m1.toString().padStart(2,'0')}${d1}T120000Z`;
                end = `2024${m2.toString().padStart(2,'0')}${d2}T120000Z`;
            }
            const dates = (start && end) ? `&dates=${start}/${end}` : '';
            const gcalUrl = `https://calendar.google.com/calendar/u/0/r/eventedit?cid=NThmYjBjN2EzMjEyYzJlZTY5YWJlMDIwOTA1N2I2MDUyODUxZmIwZWY5MmM3OWM3ZGZkMDAzMDY1Y2JhZmQ4MUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&text=${encodeURIComponent(etape.lieu)}&details=${details}${dates}`;
            
            const card = document.createElement('div');
            card.className = 'note-card';
            card.tabIndex = 0;
            card.setAttribute('role', 'region');
            card.setAttribute('aria-label', `Étape ${index + 1}: ${etape.lieu}`);
            card.id = `card-${index}`;
            card.innerHTML = `
                <img src="${etape.image}" alt="Photo de ${etape.lieu}" class="card-image" loading="lazy">
                <div class="card-banner"><h3>${etape.lieu}</h3></div>
                <div class="card-header" tabindex="0" role="button" aria-expanded="false">
                    <div class="card-header-text">
                        <span>${etape.dates}</span> | <span>${etape.nuits} nuit(s)</span>
                    </div>
                    <i class="fas fa-chevron-down card-toggle-icon"></i>
                </div>
                <div class="card-details" aria-hidden="true">
                    <div class="card-section">
                        <p class="card-description">${etape.description || ''}</p>
                        ${(etape.activites && etape.activites.length) ? `
                        <strong class="section-title"><i class="fas fa-star"></i> À ne pas manquer</strong>
                        <ul class="card-activites">
                            ${etape.activites.map(act => `<li><i class='fas fa-camera-retro'></i> ${act}</li>`).join('')}
                        </ul>
                        ` : ''}
                        ${etape.conseil ? `<strong class="section-title"><i class="fas fa-lightbulb"></i> Conseil</strong><p class="card-conseil">${etape.conseil}</p>` : ''}
                        ${(etape.transport && etape.transport.length) ? `<div class="card-transport"><strong><i class="fas fa-bus"></i> Transport :</strong> ${etape.transport.join(', ')}</div>` : ''}
                        ${etape.distance ? `<div class="card-distance"><strong><i class="fas fa-route"></i> Distance :</strong> ${etape.distance}</div>` : ''}
                        ${etape.bookingLink ? `<a href="${etape.bookingLink}" class="booking-btn booking-link" target="_blank">Voir la réservation</a>` : ''}
                        <a href="${gcalUrl}" class="booking-btn gcal-link" target="_blank">Exporter vers Google Agenda</a>
                    </div>
                </div>
            `;
            notesContainer.appendChild(card);
        });
    }
    
    toggleCard(card, forceOpen = null) {
        const header = card.querySelector('.card-header');
        const detailsDiv = card.querySelector('.card-details');
        if (!header || !detailsDiv) return;

        const isOpen = card.classList.contains('expanded');
        const expand = (forceOpen === true) ? true : (forceOpen === false ? false : !isOpen);
        
        card.classList.toggle('expanded', expand);
        header.setAttribute('aria-expanded', String(expand));
        detailsDiv.setAttribute('aria-hidden', String(!expand));
    }

    openCardFromHash() {
        if (window.location.hash && window.location.hash.startsWith('#card-')) {
            const card = document.querySelector(window.location.hash);
            if (card) {
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                this.toggleCard(card, true);
            }
        }
    }
    
    initCardToggle() {
        const notesContainer = document.getElementById('notes-container');
        if (!notesContainer) return;

        notesContainer.addEventListener('click', (e) => {
            const header = e.target.closest('.card-header');
            if (header) {
                const card = header.closest('.note-card');
                if (card) this.toggleCard(card);
            }
        });

        notesContainer.addEventListener('keydown', (e) => {
            if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('card-header')) {
                e.preventDefault();
                const card = e.target.closest('.note-card');
                if (card) this.toggleCard(card);
            }
        });
    }

    initScrollEffects() {
        // Simple fade-in on scroll
    }

    initBackToTop() {
        const btn = document.getElementById('back-to-top-btn');
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 200) btn.classList.add('show');
            else btn.classList.remove('show');
        });
        btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }
}
