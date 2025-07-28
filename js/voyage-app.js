// Application principale de voyage en Malaisie
class VoyageApp {
    constructor() {
        this.voyage = [
            { lieu: "Kuala Lumpur (arrivée)", dates: "31 juil – 03 août", nuits: 3, distance: "—", lat: 3.07823, lon: 101.60376, transport: ["avion", "voiture"], image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=2064&auto=format&fit=crop&ixlib=rb-4.1.0", description: "Premiers pas dans la fourmilière urbaine. Un mélange fascinant de modernité et de tradition.", activites: ["Admirer les tours Petronas", "Se perdre dans Jalan Alor"], conseil: "Utilisez 'Grab' (équivalent d'Uber) pour vous déplacer facilement.", bookingLink: "" },
            { lieu: "Cameron Highlands", dates: "03 et 04 août", nuits: 1, distance: "220 km – 3 h 30", lat: 4.471, lon: 101.377, transport: ["voiture"], image: "https://images.unsplash.com/photo-1646977804023-a852f96fbdcd?w=600&auto=format&fit=crop&q=60", description: "Superbe ballade au milieu des plantations de thé. Un bol d'air frais et verdoyant.", activites: ["Visite des plantations de thé", "Randonnée dans la Mossy Forest"], conseil: "Prendre une petite laine, les nuits sont fraîches.", bookingLink: "" },
            { lieu: "Taman Negara", dates: "04 – 06 août", nuits: 2, distance: "245 km – 4h à 4h30", lat: 4.37, lon: 102.4, transport: ["voiture", "pirogue"], image: "https://images.unsplash.com/photo-1633683935952-ad5b2d927a31?w=600&auto=format&fit=crop&q=60", description: "Aventure au cœur de la plus vieille forêt tropicale du monde !", activites: ["Pont suspendu (canopy walk)", "Excursion en pirogue", "Baignade à Lata Berkoh"], conseil: "Ne pas oublier l'anti-moustique et des chaussures de marche.", bookingLink: "" },
            { lieu: "Kuala Besut", dates: "06 – 07 août", nuits: 1, distance: "275 km – 4 h", lat: 5.833, lon: 102.55, transport: ["voiture"], image: "https://images.unsplash.com/photo-1609511092514-b07ed4beddc6?w=600&auto=format&fit=crop&q=60", description: "Etape pratique et reposante avant d'embarquer pour le paradis.", activites: ["Dîner de fruits de mer frais", "Préparer ses affaires pour les îles"], conseil: "Confirmer l'heure du bateau pour le lendemain dès votre arrivée.", bookingLink: "" },
            { lieu: "Îles Perhentian", dates: "07 – 09 août", nuits: 2, distance: "40 min de bateau", lat: 5.914, lon: 102.722, transport: ["bateau"], image: "https://images.unsplash.com/photo-1660574026735-04197dcf1f24?w=600&auto=format&fit=crop&q=60", description: "Le paradis sur terre. Des plages de sable blanc, une eau turquoise et une vie marine incroyable.", activites: ["Nager avec les tortues à Turtle Point", "Snorkeling à Shark Point", "Kayak de mer"], conseil: "Retirez de l'argent avant d'arriver, il n'y a pas de distributeur sur les îles.", bookingLink: "" },
            { lieu: "Cherating", dates: "09 – 11 août", nuits: 2, distance: "220 km – 3 h 30", lat: 4.139, lon: 103.392, transport: ["voiture"], image: "https://images.unsplash.com/photo-1523340306477-76c135412b28?w=600&auto=format&fit=crop&q=60", description: "Ambiance décontractée, plage immense et une rencontre émouvante avec les tortues.", activites: ["Sanctuaire des tortues (lâcher de bébés le soir)", "Leçon de surf", "Kayak dans la mangrove"], conseil: "Le lâcher des tortues dépend de la saison, vérifiez les horaires.", bookingLink: "" },
            { lieu: "Tioman Island", dates: "11 – 12 août", nuits: 1, distance: "155 km + 1h30 ferry", lat: 2.820, lon: 104.161, transport: ["voiture", "ferry"], image: "https://images.unsplash.com/flagged/photo-1576061798518-fb0500878ba7?w=600&auto=format&fit=crop&q=60", description: "Une île plus sauvage et montagneuse, parfaite pour la plongée et la tranquillité.", activites: ["Plongée sous-marine", "Randonnée vers les cascades d'Asah", "Détente sur la plage de Juara"], conseil: "L'île est grande, louer un scooter peut être une bonne option.", bookingLink: "" },
            { lieu: "Singapour", dates: "12 – 15 août", nuits: 3, distance: "140 km + Frontière", lat: 1.3521, lon: 103.8198, transport: ["voiture"], image: "https://images.unsplash.com/photo-1472148439583-1f4cf81b80e0?w=600&auto=format&fit=crop&q=60", description: "La cité-jardin futuriste. Une propreté impeccable et des attractions de classe mondiale.", activites: ["Spectacle son et lumière à Gardens by the Bay", "Manger dans un 'Hawker Centre'", "Visiter Marina Bay Sands"], conseil: "Le réseau de métro (MRT) est excellent. Achetez une carte 'EZ-Link'.", bookingLink: "" },
            { lieu: "Melaka", dates: "15 – 17 août", nuits: 2, distance: "240 km + Frontière", lat: 2.1896, lon: 102.2501, transport: ["voiture"], image: "https://plus.unsplash.com/premium_photo-1697730170911-9cf912ad3a22?w=600&auto=format&fit=crop&q=60", description: "Un joyau historique au charme colonial, classé à l'UNESCO.", activites: ["Place hollandaise (Stadthuys)", "Marché nocturne de Jonker Walk", "Croisière sur la rivière Melaka"], conseil: "Goûtez la 'Chicken Rice Ball', une spécialité locale.", bookingLink: "" },
            { lieu: "Kuala Selangor", dates: "17 – 18 août", nuits: 1, distance: "160 km – 2 h 15", lat: 3.3467, lon: 101.2634, transport: ["voiture"], image: "https://images.unsplash.com/photo-1736863929622-97ebe7e2a428?w=600&auto=format&fit=crop&q=60", description: "Célèbre pour ses paysages et son spectacle naturel féerique.", activites: ["Voir les lucioles en barque (vers 20h)", "Observer les singes 'Silver-leaf'"], conseil: "Le spectacle des lucioles est meilleur par nuit sans lune.", bookingLink: "" },
            { lieu: "Kuala Lumpur (fin de séjour)", dates: "18 – 20 août", nuits: 2, distance: "85 km – 1 h 15", lat: 3.139, lon: 101.687, transport: ["voiture"], image: "https://images.unsplash.com/photo-1598797246294-7620e33a632f?w=600&auto=format&fit=crop&q=60", description: "Derniers moments pour le shopping, les visites ou simplement se détendre.", activites: ["Shopping à Bukit Bintang", "Visite du Musée des arts islamiques", "Profiter de la piscine de l'hôtel"], conseil: "Prévoyez large pour le transfert vers l'aéroport KLIA.", bookingLink: "" }
        ];
        
        this.map = null;
        this.markers = [];
        this.init();
    }
    
    init() {
        this.renderBaseLayout();
        this.createLogoutButton();
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

    createLogoutButton() {
        const logoutBtn = document.createElement('button');
        logoutBtn.className = 'logout-btn';
        logoutBtn.innerHTML = '🚪 Déconnexion';
        logoutBtn.addEventListener('click', () => {
            if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
                window.authManager.logout();
            }
        });
        document.body.appendChild(logoutBtn);
    }
    
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
            // Générer tous les points de l'itinéraire
            this.map = L.map("map").setView([4.5, 102.5], 7);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
            
            const latlngs = this.voyage.map(etape => [etape.lat, etape.lon]);
            this.voyage.forEach((etape, index) => {
                L.marker([etape.lat, etape.lon]).addTo(this.map)
                    .bindPopup(`<b>${etape.lieu}</b><br>${etape.description}`);
            });
            L.polyline(latlngs, { color: 'var(--primary)', weight: 3 }).addTo(this.map);
            // Adapter la vue pour englober tout l'itinéraire
            this.map.fitBounds(latlngs, {padding: [50, 50], maxZoom: 9});
        } catch (error) {
            document.getElementById("map").innerHTML = `<div class=\"error\">⚠️ Impossible d'afficher la carte.</div>`;
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
        notesContainer.innerHTML = this.voyage.map((etape, index) => `
            <div class="note-card" id="card-${index}">
                <img src="${etape.image}" alt="Photo de ${etape.lieu}" class="card-image">
                <div class="card-banner"><h3>${etape.lieu}</h3></div>
                <div class="card-header">
                    <div class="card-header-text">
                        <span>${etape.dates}</span> | <span>${etape.nuits} nuit(s)</span>
                    </div>
                    <i class="fas fa-chevron-down card-toggle-icon"></i>
                </div>
                <div class="card-details">
                    <p>${etape.description}</p>
                    <strong class="section-title"><i class="fas fa-star"></i> À ne pas manquer</strong>
                    <ul>${etape.activites.map(act => `<li><i class=\"fas fa-camera-retro\"></i> ${act}</li>`).join('')}</ul>
                    ${etape.conseil ? `<strong class=\"section-title\"><i class=\"fas fa-lightbulb\"></i> Conseil</strong><p>${etape.conseil}</p>` : ''}
                </div>
            </div>
        `).join('');
    }
    
    initCardToggle() {
        document.getElementById('notes-container').addEventListener('click', (e) => {
            const header = e.target.closest('.card-header');
            if (header) {
                header.parentElement.classList.toggle('expanded');
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
