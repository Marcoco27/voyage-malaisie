document.addEventListener("DOMContentLoaded", () => {
  const voyage = [
     { lieu: "Kuala Lumpur (arrivée)", dates: "31 juil – 03 août", nuits: 3, distance: "—", lat: 3.07823, lon: 101.60376, image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=2064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dw=350", description: "Premiers pas dans la fourmilière urbaine. Un mélange fascinant de modernité et de tradition.", activites: ["Admirer les tours Petronas (de jour et de nuit)", "Se perdre dans le marché de Jalan Alor"], conseil: "Utilisez l'application 'Grab' (équivalent d'Uber) pour vous déplacer facilement et à bon prix." },
     { lieu: "Cameron Highlands", dates: "03 et 04 août", nuits: 1, distance: "220 km – 3 h 30", lat: 4.471,lon: 101.377, image: "https://images.unsplash.com/photo-1646977804023-a852f96fbdcd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fENhbWVyb24lMjBIaWdobGFuZHN8ZW58MHx8MHx8fDA%3Dw=350", description: "Superbe ballade au milieu des plantations de thé. Endroit verdoyant très calme et agréable.", activites: ["Visite des plantations de thé", "fraîcheur des montagnes."], conseil: "Prendre une petite laine..." },
     { lieu: "Taman Negara", dates: "04 – 06 août", nuits: 2, distance: "245 km – 4h à 4h30", lat: 4.37,lon: 102.4, image: "https://images.unsplash.com/photo-1633683935952-ad5b2d927a31?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8VGFtYW4lMjBOZWdhcmF8ZW58MHx8MHx8fDA%3Dw=350", description: "Randonnée dans la plus vieille forêt tropicale du monde !", activites: ["Excursion avec un guide", "Pont suspendu (canopy walk)", "Découverte de la faune et de la flore"], conseil: "Ne pas oublier l'anti-moustique !" },
     { lieu: "Kuala Besut", dates: "06 – 07 août", nuits: 1, distance: "275 km – 4 h", lat: 5.833,lon: 102.55, image: "https://images.unsplash.com/photo-1609511092514-b07ed4beddc6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWFsYWlzaWUlMjBiZXN1dHxlbnwwfHwwfHx8MA%3D%3Dw=350", description: "Etape repos et réconfort après la Jungle ;)", activites: ["Grasse matinée", "Plage privée", "Piscine"], conseil: "Reprendre des forces avant de prendre le bateau pour les îles Perhentian." },
     { lieu: "Îles Perhentian", dates: "07 – 09 août", nuits: 2, distance: "40 min de bateau", lat: 5.914, lon: 102.722, image: "https://images.unsplash.com/photo-1660574026735-04197dcf1f24?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fCVDMyU4RWxlcyUyMFBlcmhlbnRpYW58ZW58MHx8MHx8fDA%3D%3Dw=350", description: "Le paradis sur terre. Des plages de sable blanc, une eau turquoise et une vie marine incroyable.", activites: ["Snorkeling à Turtle Point pour nager avec les tortues", "Randonnée entre Long Beach et Coral Bay", "Excursion en bateau pour voir les requins de récif"], conseil: "Pensez à retirer de l'argent avant d'arriver sur les îles, il n'y a pas de distributeur." },
     { lieu: "Cherating", dates: "09 – 11 août", nuits: 2, distance: "220 km – 3 h 30", lat: 4.139,lon: 103.392, image: "https://images.unsplash.com/photo-1523340306477-76c135412b28?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bWFsYWlzaWUlMjBiYWJ5JTIwdHVydGxlfGVufDB8MHwwfHx8MA%3D%3Dw=350", description: "L'une des caractéristiques les plus remarquables de Cherating est sa plage longue et large, bordée de palmiers ondulants qui ajoutent une touche tropicale à ce paysage pittoresque.", activites: ["Sanctuaire des tortues de Cherating", "Plage", "Kayak dans la mangrove"], conseil: "Escale" },
     { lieu: "Tioman Island", dates: "11 – 12 août", nuits: 1, distance: "155 km – 2h + 1h30 ferry", lat: 2.820, lon: 104.161, image: "https://images.unsplash.com/flagged/photo-1576061798518-fb0500878ba7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fFRpb21hbiUyMElzbGFuZHxlbnwwfDB8MHx8fDA%3D%3Dw=350", description: "Détente, plongée ou snorkeling dans un paradis tropical.", activites: ["Snorkeling", "Plage", "Kiff"], conseil: "Profiter de l'instant présent" },
     { lieu: "Singapour", dates: "12 – 15 août", nuits: 3, distance: "140 km – 3h30 à 4h30", lat: 1.3521, lon: 103.8198, image: "https://images.unsplash.com/photo-1472148439583-1f4cf81b80e0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fFNpbmdhcG91cnxlbnwwfHwwfHx8MA%3D%3Dw=350", description: "La cité-jardin futuriste. Une propreté impeccable et des attractions de classe mondiale.", activites: ["Assister au spectacle son et lumière de Gardens by the Bay", "Manger dans un 'Hawker Centre' (Lau Pa Sat)", "Explorer le quartier colonial et Marina Bay Sands"], conseil: "Le réseau de métro (MRT) est extrêmement efficace. Achetez une carte 'EZ-Link' pour des trajets illimités." },
     { lieu: "Melaka", dates: "15 – 17 août", nuits: 2, distance: "240 km – 3h30 à 4h30", lat: 2.1896, lon: 102.2501, image: "https://plus.unsplash.com/premium_photo-1697730170911-9cf912ad3a22?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TWVsYWthfGVufDB8MHwwfHx8MA%3D%3Dw=350", description: "Découvrir le Stadthuys (place rouge), le marché nocturne de Jonker Walk et faire une croisière fluviale.", activites: ["Explorer le quartier colonial et Marina Bay Sands"], conseil: "Ne pas oublier son parapluie" },
     { lieu: "Kuala Selangor", dates: "17 – 18 août", nuits: 1, distance: "160 km – 2 h 15", lat: 3.3467, lon: 101.2634, image: "https://images.unsplash.com/photo-1736863929622-97ebe7e2a428?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fEt1YWxhJTIwU2VsYW5nb3IlMjBtYWxhaXNpYXxlbnwwfDB8MHx8fDA%3D%3Dw=350", description: "Une ville de Malaisie, célèbre pour ses paysages et ses lucioles. Vous vivrez une soirée inoubliable !", activites: ["Excursion en barque pour voir le spectacle magique des lucioles (vers 20h)."], conseil: "" },
     { lieu: "Kuala Lumpur (fin de séjour)", dates: "18 – 20 août", nuits: 2, distance: "85 km – 1 h 15", lat: 3.139, lon: 101.687, image: "https://images.unsplash.com/photo-1598797246294-7620e33a632f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8S3VhbGElMjBMdW1wdXJ8ZW58MHwwfDB8fHwww=350", description: "Découvrez le côté multiculturel de la ville en visitant le marché de nuit de Chinatown ou l'un des nombreux temples.", activites: ["Grimper les marches des Batu Caves" ,"Derniers achats" ,"visite d'un musée ou simplement se reposer avant le retour."], conseil: "Refaire sa valise" },
  ];

  try {
    if (!window.L) { throw "Leaflet non chargé"; }
    const itineraryBody = document.getElementById("itinerary-body");
    const notesContainer = document.getElementById("notes-container");
    const map = L.map("map", { scrollWheelZoom: false });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 18, attribution: "© OpenStreetMap" }).addTo(map);
    const latlngs = [];

    voyage.forEach((etape, index) => {
      // 1. Générer le tableau
      const tableRow = `<tr>
          <td>${etape.dates}</td>
          <td><a href="#card-${index}" class="table-link">${etape.lieu}</a></td>
          <td>${etape.nuits}</td>
          <td>${etape.distance}</td>
        </tr>`;
      itineraryBody.innerHTML += tableRow;

      // 2. Générer les cartes interactives
      const activitesHTML = etape.activites.map(act => `<li><i class="fas fa-camera-retro"></i>${act}</li>`).join('');
      const conseilHTML = etape.conseil ? `<p><strong class="section-title"><i class="fas fa-lightbulb"></i>Conseil</strong>${etape.conseil}</p>` : '';

      const cardHTML = `
        <div class="note-card" id="card-${index}">
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
        </div>
      `;
      notesContainer.innerHTML += cardHTML;
      
      // 3. Mettre à jour la carte Leaflet
      L.marker([etape.lat, etape.lon]).addTo(map).bindPopup(`<strong>${index + 1}. ${etape.lieu}</strong><br>${etape.dates}`);
      latlngs.push([etape.lat, etape.lon]);
    });

    // 4. Activer l'interactivité des cartes
    const cards = document.querySelectorAll('.note-card');
    cards.forEach((card, index) => {
      setTimeout(() => { card.classList.add('visible'); }, index * 150);
      card.addEventListener('click', (e) => {
        if (e.target.tagName.toLowerCase() !== 'a') {
            card.classList.toggle('active');
        }
      });
    });

    // 5. Gérer le clic sur les liens du tableau
    document.querySelectorAll('.table-link').forEach(link => {
      link.addEventListener('click', (event) => {
        const targetId = link.getAttribute('href');
        const targetCard = document.querySelector(targetId);

        if (targetCard) {
          document.querySelectorAll('.note-card.active').forEach(activeCard => {
            if (activeCard.id !== targetCard.id) {
              activeCard.classList.remove('active');
            }
          });
          targetCard.classList.add('active');
        }
      });
    });

    // 6. Finaliser la carte et le bouton "Retour en haut"
    if (latlngs.length > 0) { map.fitBounds(latlngs, { padding: [30, 30] }); }
    L.polyline(latlngs, { color: "#ff914d", weight: 4, opacity: 0.8 }).addTo(map);

    const backToTopBtn = document.getElementById('back-to-top-btn');
    window.addEventListener('scroll', () => {
      backToTopBtn.classList.toggle('show', window.scrollY > 300);
    });
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

  } catch (e) {
    document.getElementById("mapError").style.display = "block";
    console.error(e);
  }
});