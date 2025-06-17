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
        const totalDays = this.voyage.reduce((sum, etape) => sum + etape.nuits, 0);
        const totalDestinations = this.voyage.length;
        const transportModes = [...new Set(this.voyage.flatMap(etape => etape.transport))];
        
        // Calcul approximatif des kilomètres
        let totalKms = 0;
        this.voyage.forEach(etape => {
            const distance = etape.distance.replace(/[^\d]/g, '');
            if (distance) totalKms += parseInt(distance);
        });
        
        // Animation des compteurs
        this.animateCounter('stats-days', totalDays);
        this.animateCounter('stats-destinations', totalDestinations);
        this.animateCounter('stats-kms', totalKms);
        this.animateCounter('stats-transport', transportModes.length);
    }
    
    animateCounter(elementId, targetValue) {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        let current = 0;
        const increment = targetValue / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= targetValue) {
                current = targetValue;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 50);
    }
    
    initMap() {
        try {
            if (!window.L) throw new Error("Leaflet non chargé");
            
            this.map = L.map("map", { 
                scrollWheelZoom: false,
                zoomControl: true
            });
            
            // Utiliser un style de carte tropical
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors',
                maxZoom: 18
            }).addTo(this.map);
            
            const latlngs = [];
            
            this.voyage.forEach((etape, index) => {
                const lat = etape.lat;
                const lon = etape.lon;
                latlngs.push([lat, lon]);
                
                // Créer une icône personnalisée
                const customIcon = L.divIcon({
                    html: `<div class="custom-marker">${index + 1}</div>`,
                    className: 'custom-marker-wrapper',
                    iconSize: [30, 30],
                    iconAnchor: [15, 15]
                });
                
                const nuitLabel = etape.nuits === 1 ? 'nuit' : 'nuits';
                const popupContent = `
                    <div class="map-popup">
                        <h3>${index + 1}. ${etape.lieu}</h3>
                        <p><strong>${etape.dates}</strong></p>
                        <p>${etape.description}</p>
                        <p><em>${etape.nuits} ${nuitLabel} • ${etape.distance}</em></p>
                    </div>
                `;
                
                const marker = L.marker([lat, lon], { icon: customIcon })
                    .addTo(this.map)
                    .bindPopup(popupContent);
                
                this.markers.push(marker);
            });
            
            // Tracer la route
            const polyline = L.polyline(latlngs, {
                color: '#00A8A8',
                weight: 4,
                opacity: 0.8
            }).addTo(this.map);
            
            this.map.fitBounds(polyline.getBounds(), { padding: [20, 20] });
            
        } catch (error) {
            console.error("Erreur carte:", error);
            const mapElement = document.getElementById("map");
            if (mapElement) {
                mapElement.innerHTML = `<div class="error">⚠️ Impossible d'afficher la carte</div>`;
            }
        }
    }
    
    generateItinerary() {
        const itineraryBody = document.getElementById("itinerary-body");
        if (!itineraryBody) return;
        
        itineraryBody.innerHTML = '';
        
        this.voyage.forEach((etape, index) => {
            const bookingCell = etape.bookingLink 
                ? `<a href="${etape.bookingLink}" target="_blank" class="booking-btn small">
                     <i class="fas fa-external-link-alt"></i> Booking
                   </a>` 
                : `<span class="booking-placeholder">À venir</span>`;
                
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${etape.dates}</td>
                <td><a href="#card-${index}" class="table-link">${etape.lieu}</a></td>
                <td>${etape.nuits}</td>
                <td>${etape.distance}</td>
                <td>${bookingCell}</td>
            `;
            itineraryBody.appendChild(row);
        });
    }
    
    generateNoteCards() {
        const notesContainer = document.getElementById("notes-container");
        if (!notesContainer) return;
        
        notesContainer.innerHTML = '';
        
        this.voyage.forEach((etape, index) => {
            const activitesHTML = etape.activites
                .map(act => `<li><i class="fas fa-camera-retro"></i> ${act}</li>`)
                .join('');
            
            const conseilHTML = etape.conseil 
                ? `<p><strong class="section-title"><i class="fas fa-lightbulb"></i> Conseil</strong> ${etape.conseil}</p>` 
                : '';
            
            const bookingHTML = etape.bookingLink 
                ? `<a href="${etape.bookingLink}" target="_blank" class="booking-btn">
                    <i class="fas fa-bed"></i> Voir sur Booking.com
                   </a>` 
                : '';
            
            const cardElement = document.createElement('div');
            cardElement.className = 'note-card';
            cardElement.id = `card-${index}`;
            cardElement.innerHTML = `
                <img src="${etape.image}" alt="Photo de ${etape.lieu}" class="card-image">
                <div class="card-header">
                    <div class="card-header-text">
                        <h3>${etape.lieu}</h3>
                        <span>${etape.dates}</span>
                    </div>
                    <i class="fas fa-chevron-down card-toggle-icon"></i>
                </div>
                <div class="card-details">
                    <p>${etape.description}</p>
                    <strong class="section-title">
                        <i class="fas fa-star"></i> À ne pas manquer
                    </strong>
                    <ul>${activitesHTML}</ul>
                    ${conseilHTML}
                    ${bookingHTML}
                </div>
            `;
            
            notesContainer.appendChild(cardElement);
        });
    }
    
    initCardToggle() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.card-header')) {
                const card = e.target.closest('.note-card');
                card.classList.toggle('expanded');
            }
        });
    }
    
    initScrollEffects() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('.fade-in, .note-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
    
    initBackToTop() {
        const backToTopBtn = document.getElementById('back-to-top-btn');
        if (!backToTopBtn) return;
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Méthode pour mettre à jour les liens Booking
    updateBookingLinks(bookingLinks) {
        if (Array.isArray(bookingLinks) && bookingLinks.length === this.voyage.length) {
            bookingLinks.forEach((link, index) => {
                if (this.voyage[index]) {
                    this.voyage[index].bookingLink = link;
                }
            });
            
            // Régénérer les cartes avec les nouveaux liens
            this.generateNoteCards();
            this.initCardToggle();
        }
    }
    
    destroy() {
        if (this.weatherManager) this.weatherManager.destroy();
        if (this.clockManager) this.clockManager.destroy();
    }
}

// Ajouter les styles CSS pour les marqueurs personnalisés
const style = document.createElement('style');
style.textContent = `
    .custom-marker-wrapper {
        background: none !important;
        border: none !important;
    }
    
    .custom-marker {
        background: linear-gradient(135deg, #00A8A8, #6BCF7F);
        color: white;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        font-size: 0.9rem;
        box-shadow: 0 4px 12px rgba(0, 168, 168, 0.3);
        border: 2px solid white;
    }
    
    .map-popup {
        max-width: 250px;
    }
    
    .map-popup h3 {
        margin: 0 0 0.5rem 0;
        color: #00A8A8;
        font-size: 1.1rem;
    }
    
    .map-popup p {
        margin: 0.3rem 0;
        font-size: 0.9rem;
    }
    
    .error {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 200px;
        background: rgba(255, 123, 84, 0.1);
        color: #FF7B54;
        border-radius: 15px;
        font-weight: 500;
    }
`;
document.head.appendChild(style);
