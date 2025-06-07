document.addEventListener("DOMContentLoaded", () => {
  const voyage = [
     { lieu: "Kuala Lumpur (arrivée)", dates: "31 juil – 03 août", nuits: 3, distance: "—", lat: 3.07823, lon: 101.60376, transport: ["avion", "voiture"], image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=2064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dw=350", description: "Premiers pas dans la fourmilière urbaine. Un mélange fascinant de modernité et de tradition.", activites: ["Admirer les tours Petronas", "Se perdre dans Jalan Alor"], conseil: "Utilisez 'Grab' (équivalent d'Uber) pour vous déplacer facilement." },
     { lieu: "Cameron Highlands", dates: "03 et 04 août", nuits: 1, distance: "220 km – 3 h 30", lat: 4.471,lon: 101.377, transport: ["voiture"], image: "https://images.unsplash.com/photo-1646977804023-a852f96fbdcd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fENhbWVyb24lMjBIaWdobGFuZHN8ZW58MHx8MHx8fDA%3D%3Dw=350", description: "Superbe ballade au milieu des plantations de thé. Un bol d'air frais et verdoyant.", activites: ["Visite des plantations de thé", "Randonnée dans la Mossy Forest"], conseil: "Prendre une petite laine, les nuits sont fraîches." },
     { lieu: "Taman Negara", dates: "04 – 06 août", nuits: 2, distance: "245 km – 4h à 4h30", lat: 4.37,lon: 102.4, transport: ["voiture", "pirogue"], image: "https://images.unsplash.com/photo-1633683935952-ad5b2d927a31?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8VGFtYW4lMjBOZWdhcmF8ZW58MHx8MHx8fDA%3D%3Dw=350", description: "Aventure au cœur de la plus vieille forêt tropicale du monde !", activites: ["Pont suspendu (canopy walk)", "Excursion en pirogue", "Baignade à Lata Berkoh"], conseil: "Ne pas oublier l'anti-moustique et des chaussures de marche." },
     { lieu: "Kuala Besut", dates: "06 – 07 août", nuits: 1, distance: "275 km – 4 h", lat: 5.833,lon: 102.55, transport: ["voiture"], image: "https://images.unsplash.com/photo-1609511092514-b07ed4beddc6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWFsYWlzaWUlMjBiZXN1dHxlbnwwfHwwfHx8MA%3D%3Dw=350", description: "Etape pratique et reposante avant d'embarquer pour le paradis.", activites: ["Dîner de fruits de mer frais", "Préparer ses affaires pour les îles"], conseil: "Confirmer l'heure du bateau pour le lendemain dès votre arrivée." },
     { lieu: "Îles Perhentian", dates: "07 – 09 août", nuits: 2, distance: "40 min de bateau", lat: 5.914, lon: 102.722, transport: ["bateau"], image: "https://images.unsplash.com/photo-1660574026735-04197dcf1f24?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fCVDMyU4RWxlcyUyMFBlcmhlbnRpYW58ZW58MHx8MHx8fDA%3D%3Dw=350", description: "Le paradis sur terre. Des plages de sable blanc, une eau turquoise et une vie marine incroyable.", activites: ["Nager avec les tortues à Turtle Point", "Snorkeling à Shark Point", "Kayak de mer"], conseil: "Retirez de l'argent avant d'arriver, il n'y a pas de distributeur sur les îles." },
     { lieu: "Cherating", dates: "09 – 11 août", nuits: 2, distance: "220 km – 3 h 30", lat: 4.139,lon: 103.392, transport: ["voiture"], image: "https://images.unsplash.com/photo-1523340306477-76c135412b28?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bWFsYWlzaWUlMjBiYWJ5JTIwdHVydGxlfGVufDB8MHwwfHx8MA%3D%3Dw=350", description: "Ambiance décontractée, plage immense et une rencontre émouvante avec les tortues.", activites: ["Sanctuaire des tortues (lâcher de bébés le soir)", "Leçon de surf", "Kayak dans la mangrove"], conseil: "Le lâcher des tortues dépend de la saison, vérifiez les horaires." },
     { lieu: "Tioman Island", dates: "11 – 12 août", nuits: 1, distance: "155 km + 1h30 ferry", lat: 2.820, lon: 104.161, transport: ["voiture", "ferry"], image: "https://images.unsplash.com/flagged/photo-1576061798518-fb0500878ba7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fFRpb21hbiUyMElzbGFuZHxlbnwwfDB8MHx8fDA%3D%3Dw=350", description: "Une île plus sauvage et montagneuse, parfaite pour la plongée et la tranquillité.", activites: ["Plongée sous-marine", "Randonnée vers les cascades d'Asah", "Détente sur la plage de Juara"], conseil: "L'île est grande, louer un scooter peut être une bonne option." },
     { lieu: "Singapour", dates: "12 – 15 août", nuits: 3, distance: "140 km + Frontière", lat: 1.3521, lon: 103.8198, transport: ["voiture"], image: "https://images.unsplash.com/photo-1472148439583-1f4cf81b80e0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fFNpbmdhcG91cnxlbnwwfHwwfHx8MA%3D%3Dw=350", description: "La cité-jardin futuriste. Une propreté impeccable et des attractions de classe mondiale.", activites: ["Spectacle son et lumière à Gardens by the Bay", "Manger dans un 'Hawker Centre'", "Visiter Marina Bay Sands"], conseil: "Le réseau de métro (MRT) est excellent. Achetez une carte 'EZ-Link'." },
     { lieu: "Melaka", dates: "15 – 17 août", nuits: 2, distance: "240 km + Frontière", lat: 2.1896, lon: 102.2501, transport: ["voiture"], image: "https://plus.unsplash.com/premium_photo-1697730170911-9cf912ad3a22?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TWVsYWthfGVufDB8MHwwfHx8MA%3D%3Dw=350", description: "Un joyau historique au charme colonial, classé à l'UNESCO.", activites: ["Place hollandaise (Stadthuys)", "Marché nocturne de Jonker Walk", "Croisière sur la rivière Melaka"], conseil: "Goûtez la 'Chicken Rice Ball', une spécialité locale." },
     { lieu: "Kuala Selangor", dates: "17 – 18 août", nuits: 1, distance: "160 km – 2 h 15", lat: 3.3467, lon: 101.2634, transport: ["voiture"], image: "https://images.unsplash.com/photo-1736863929622-97ebe7e2a428?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fEt1YWxhJTIwU2VsYW5nb3IlMjBtYWxhaXNpYXxlbnwwfDB8MHx8fDA%3D%3Dw=350", description: "Célèbre pour ses paysages et son spectacle naturel féerique.", activites: ["Voir les lucioles en barque (vers 20h)", "Observer les singes 'Silver-leaf'"], conseil: "Le spectacle des lucioles est meilleur par nuit sans lune." },
     { lieu: "Kuala Lumpur (fin de séjour)", dates: "18 – 20 août", nuits: 2, distance: "85 km – 1 h 15", lat: 3.139, lon: 101.687, transport: ["voiture"], image: "https://images.unsplash.com/photo-1598797246294-7620e33a632f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8S3VhbGElMjBMdW1wdXJ8ZW58MHwwfDB8fHwww=350", description: "Derniers moments pour le shopping, les visites ou simplement se détendre.", activites: ["Shopping à Bukit Bintang", "Visite du Musée des arts islamiques", "Profiter de la piscine de l'hôtel"], conseil: "Prévoyez large pour le transfert vers l'aéroport KLIA." },
  ];

  try {
    if (!window.L) { throw "Leaflet non chargé"; }
    // === 1. Récupération des éléments du DOM ===
    const itineraryBody = document.getElementById("itinerary-body");
    const notesContainer = document.getElementById("notes-container");
    const map = L.map("map", { scrollWheelZoom: false });
    
    // === 2. Génération du contenu principal de la page ===
    const latlngs = [];
    voyage.forEach((etape, index) => {
      // Générer la ligne du tableau
      itineraryBody.innerHTML += `<tr>
          <td>${etape.dates}</td>
          <td><a href="#card-${index}" class="table-link">${etape.lieu}</a></td>
          <td>${etape.nuits}</td>
          <td>${etape.distance}</td>
        </tr>`;

      // Générer les cartes interactives des étapes
      const activitesHTML = etape.activites.map(act => `<li><i class="fas fa-camera-retro"></i>${act}</li>`).join('');
      const conseilHTML = etape.conseil ? `<p><strong class="section-title"><i class="fas fa-lightbulb"></i>Conseil</strong>${etape.conseil}</p>` : '';
      notesContainer.innerHTML += `<div class="note-card" id="card-${index}">
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
            <strong class="section-title"><i class="fas fa-star"></i>À ne pas manquer</strong>
            <ul>${activitesHTML}</ul>
            ${conseilHTML}
          </div>
        </div>`;
      
      // Mettre à jour la carte Leaflet
      const popupContent = `<div class="map-popup">
            <h3>${index + 1}. ${etape.lieu}</h3>
            <p>${etape.description}</p>
            <span><i class="fas fa-moon"></i> ${etape.nuits} nuits</span>
        </div>`;
      L.marker([etape.lat, etape.lon]).addTo(map).bindPopup(popupContent);
      latlngs.push([etape.lat, etape.lon]);
    });

    // === 3. Logique d'interactivité (après génération du contenu) ===
    const cards = document.querySelectorAll('.note-card');
    cards.forEach((card, index) => {
      setTimeout(() => { card.classList.add('visible'); }, index * 100);
      card.addEventListener('click', (e) => {
        if (e.target.tagName.toLowerCase() !== 'a') card.classList.toggle('active');
      });
    });

    document.querySelectorAll('.table-link').forEach(link => {
      link.addEventListener('click', () => {
        const targetCard = document.querySelector(link.getAttribute('href'));
        if (targetCard) {
          document.querySelectorAll('.note-card.active').forEach(activeCard => {
            if (activeCard.id !== targetCard.id) activeCard.classList.remove('active');
          });
          targetCard.classList.add('active');
        }
      });
    });

    // === 4. Logique pour les statistiques de voyage ===
    const calculateAndDisplayStats = () => {
      const totalNights = voyage.reduce((sum, etape) => sum + (typeof etape.nuits === 'number' ? etape.nuits : 0), 0);
      const totalDestinations = voyage.filter(etape => !etape.lieu.toLowerCase().includes('vol')).length;
      const totalKms = voyage.reduce((sum, etape) => {
        const kmMatch = etape.distance.toString().match(/(\d+)\s*km/);
        return sum + (kmMatch ? parseInt(kmMatch[1], 10) : 0);
      }, 0);
      const uniqueTransportModes = new Set(voyage.flatMap(etape => etape.transport || [])).size;
      
      const animateValue = (element, end, duration) => {
        let start = 0;
        let startTimestamp = null;
        const step = (timestamp) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          element.textContent = Math.floor(progress * (end - start) + start).toLocaleString();
          if (progress < 1) window.requestAnimationFrame(step);
        };
        window.requestAnimationFrame(step);
      };

      const statsSection = document.getElementById('stats-section');
      const observer = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  animateValue(document.getElementById('stats-days'), totalNights + 1, 1500);
                  animateValue(document.getElementById('stats-destinations'), totalDestinations, 1500);
                  animateValue(document.getElementById('stats-kms'), totalKms, 1500);
                  animateValue(document.getElementById('stats-transport'), uniqueTransportModes, 1500);
                  observer.unobserve(entry.target);
              }
          });
      }, { threshold: 0.5 });
      if (statsSection) observer.observe(statsSection);
    };
    calculateAndDisplayStats();

    // === 5. Finalisation de l'UI ===
    if (latlngs.length > 0) {
      map.fitBounds(latlngs, { padding: [40, 40] });
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '© OpenStreetMap' }).addTo(map);
      L.polyline(latlngs, { color: "#ff914d", weight: 4, opacity: 0.8 }).addTo(map);
    }

    const backToTopBtn = document.getElementById('back-to-top-btn');
    window.addEventListener('scroll', () => {
      backToTopBtn.classList.toggle('show', window.scrollY > 300);
    });
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

  } catch (e) {
    console.error("Erreur lors de l'initialisation de la page :", e);
    const mapError = document.getElementById("mapError");
    if(mapError) mapError.style.display = "block";
  }
});