document

J'ai analysé votre `script.js` et j'y ai apporté la correction nécessaire. J'ai également remarqué que pour les étapes d'une seule nuit, vous aviez modifié la clé de l'objet de `nuits` à `nuit`. Bien que l'intention soit bonne, cela peut causer des bugs dans d'autres parties du code qui s'attendent à trouver la clé `nuits` (comme le calcul des statistiques).

La solution la plus robuste, que j'ai implémentée, est de **toujours utiliser la même clé (`nuits`)** et de laisser le code gérer intelligemment l'affichage du singulier ou du pluriel.

Voici le fichier `script.js` final, corrigé et optimisé. Vous pouvez remplacer l'intégralité de votre fichier actuel par celui-ci.

---

### Le Fichier `script.js` Final et Corrigé

```javascript
document.addEventListener("DOMContentLoaded", () => {
  const voyage = [
     // CORRECTION : La clé est maintenant "nuits" partout pour la cohérence.
     { lieu: "Kuala Lumpur (arrivée)", dates: "31 juil – 03 août", nuits: 3, distance: "—", lat: 3.addEventListener("DOMContentLoaded", () => {
  const voyage = [
     // CORRECTION : La clé "nuit" a été standardisée en "nuits" pour la cohérence des données.
     { lieu: "Kuala Lumpur (arrivée)", dates: "31 juil – 03 août", nuits: 3, distance: "—", lat: 3.07823, lon: 101.60376, transport: ["avion", "voiture"], image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=2064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dw=350", description: "Premiers pas dans la fourmilière urbaine. Un mélange fascinant de modernité et de tradition.", activites: ["Admirer les tours Petronas", "Se perdre dans Jalan Alor"], conseil: "Utilisez 'Grab' (équivalent d'Uber) pour vous déplacer facilement." },
     { lieu: "Cameron Highlands", dates: "03 et 04 août", nuits: 1, distance: "220 km – 3 h 30", lat: 4.471,lon: 101.377, transport: ["voiture"], image: "https://images.unsplash.com/photo-1646977804023-a852f96fbdcd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fENhbWVyb24lMjBIaWdobGFuZHN8ZW58MHx8MHx8fDA%3D%3Dw=350", description: "Superbe ballade au milieu des plantations de thé. Un bol d'air frais et verdoyant.", activites: ["Visite des plantations de thé", "Randonnée dans la Mossy Forest"], conseil: "Prendre une petite laine, les nuits sont fraîches." },
     { lieu: "Taman Negara", dates: "04 – 06 août", nuits: 2, distance: "245 km – 4h à 4h30", lat: 4.37,lon: 102.4, transport: ["voiture", "pirogue"], image: "https://images.unsplash.com/photo-1633683935952-ad5b2d927a31?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8VGFtYW4lMjBOZWdhcmF8ZW58MHx8MHx8fDA%3D%3Dw=350", description: "Aventure au cœur de la plus.07823, lon: 101.60376, transport: ["avion", "voiture"], image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=2064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dw=350", description: "Premiers pas dans la fourmilière urbaine. Un mélange fascinant de modernité et de tradition.", activites: ["Admirer les tours Petronas", "Se perdre dans Jalan Alor"], conseil: "Utilisez 'Grab' (équivalent d'Uber) pour vous déplacer facilement." },
     { lieu: "Cameron Highlands", dates: "03 et 04 août", nuits: 1, distance: "220 km – 3 h 30", lat: 4.471,lon: 101.377, transport: ["voiture"], image: "https://images.unsplash.com/photo-1646977804023-a852f96fbdcd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fENhbWVyb24lMjBIaWdobGFuZHN8ZW58MHx8MHx8fDA%3D%3Dw=350", description: "Superbe ballade au milieu des plantations de thé. Un bol d'air frais et verdoyant.", activites: ["Visite des plantations de thé", "Randonnée dans la Mossy Forest"], conseil: "Prendre une petite laine, les nuits sont fraîches." },
     { lieu: "Taman Negara", dates: "04 – 06 août", nuits: 2, distance: "245 km – 4h à 4h30", lat: 4.37,lon: 102.4, transport: ["voiture", "pirogue"], image: "https://images.unsplash.com/photo-1633683935952-ad5b2d927a31?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8VGFtYW4lMjBOZWdhcmF8ZW58MHx8MHx8fDA%3D%3Dw=350", description: "Aventure au cœur de la plus vieille forêt tropicale du monde !", activites: ["Pont suspendu (canopy walk)", "Excursion en pirogue", "Baignade à Lata Berkoh"], conseil: "Ne pas oublier l'anti-moustique et des chaussures de marche." },
     { lieu: "Kuala Besut", dates: "06 – 07 août", nuits: 1, distance: "275 km – 4 h", lat: 5.833,lon: 102.55, transport: ["voiture"], image: "https://images.unsplash.com/photo-1609511092514-b07ed4beddc6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWFsYWlzaWUlMjBiZXN1dHxlbnwwfHwwfHx8MA%3D%3Dw=350", description: "Etape pratique et reposante avant d'embarquer pour le paradis.", activites: ["Dîner de fruits de mer frais", "Préparer ses affaires pour les îles"], conseil: "Confirmer l'heure du bateau pour le lendemain dès votre arrivée vieille forêt tropicale du monde !", activites: ["Pont suspendu (canopy walk)", "Excursion en pirogue", "Baignade à Lata Berkoh"], conseil: "Ne pas oublier l'anti-moustique et des chaussures de marche." },
     { lieu: "Kuala Besut", dates: "06 – 07 août", nuits: 1, distance: "275 km – 4 h", lat: 5.833,lon: 102.55, transport: ["voiture"], image: "https://images.unsplash.com/photo-1609511092514-b07ed4beddc6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWFsYWlzaWUlMjBiZXN1dHxlbnwwfHwwfHx8MA%3D%3Dw=350", description: "Etape pratique et reposante avant d'embarquer pour le paradis.", activites: ["Dîner de fruits de mer frais", "Préparer ses affaires pour les îles"], conseil: "Confirmer l'heure du bateau pour le lendemain dès votre arrivée." },
     { lieu: "Îles Perhentian", dates: "07 – 09 août", nuits: 2, distance: "40 min de bateau", lat: 5.914, lon: 102.722, transport: ["bateau"], image: "https://images.unsplash.com/photo-1660574026735-04197dcf1f24?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fCVDMyU4RWxlcyUyMFBlcmhlbnRpYW58ZW58MHx8MHx8fDA%3D%3Dw=350", description: "Le paradis sur terre. Des plages de sable blanc, une eau turquoise et une vie marine incroyable.", activites: ["Nager avec les tortues." },
     { lieu: "Îles Perhentian", dates: "07 – 09 août", nuits: 2, distance: "40 min de bateau", lat: 5.914, lon: 102.722, transport: ["bateau"], image: "https://images.unsplash.com/photo-1660574026735-04197dcf1f24?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fCVDMyU4RWxlcyUyMFBlcmhlbnRpYW58ZW58MHx8MHx8fDA%3D%3Dw=350", description: "Le paradis sur terre. Des plages de sable blanc, une eau turquoise et une vie marine incroyable.", activites: ["Nager avec les tortues à Turtle Point", "Snorkeling à Shark Point", "Kayak de mer"], conseil: "Retirez de l'argent avant d'arriver, il n'y a pas de distributeur sur les îles." },
     { lieu: "Cherating", dates: "09 – 11 août", nuits: 2, distance: "220 km – 3 h 30", lat: 4.139,lon: 103.392, transport: ["voiture"], image: "https://images.unsplash.com/photo-152334 à Turtle Point", "Snorkeling à Shark Point", "Kayak de mer"], conseil: "Retirez de l'argent avant d'arriver, il n'y a pas de distributeur sur les îles." },
     { lieu: "Cherating", dates: "09 – 11 août", nuits: 2, distance: "220 km – 3 h 30", lat: 4.139,lon: 103.392, transport: ["voiture"], image: "https://images.unsplash.com/photo-1523340306477-76c135412b28?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MH0306477-76c135412b28?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bWFsYWlzaWUlMjBiYWJ5JTIwdHVydGxlfxzZWFyY2h8OXx8bWFsYWlzaWUlMjBiYWJ5JTIwdHVydGxlfGVufDB8MHwwfHx8MA%3D%3Dw=350", description: "Ambiance décontractée, plage immense et une rencontre émouvante avec les tortues.",GVufDB8MHwwfHx8MA%3D%3Dw=350", description: "Ambiance décontractée, plage immense et une rencontre émouvante avec les tortues.", activites: ["Sanctuaire des tortues (lâcher de bébés le soir)", "Leçon de surf", "Kayak dans la activites: ["Sanctuaire des tortues (lâcher de bébés le soir)", "Leçon de surf", "Kayak dans la mangrove"], conseil: "Le lâcher des tortues dépend de la saison, vérifiez les horaires mangrove"], conseil: "Le lâcher des tortues dépend de la saison, vérifiez les horaires." },
     { lieu: "Tioman Island", dates: "11 – 12 août", nuits: 1,." },
     { lieu: "Tioman Island", dates: "11 – 12 août", nu distance: "155 km + 1h30 ferry", lat: 2.820,its: 1, distance: "155 km + 1h30 ferry", lat: 2 lon: 104.161, transport: ["voiture", "ferry"], image: ".820, lon: 104.161, transport: ["voiture", "ferry"], image: "https://images.unsplash.com/flagged/photo-157606https://images.unsplash.com/flagged/photo-1576061798518-fb0500878ba7?w=600&auto=format&1798518-fb0500878ba7?w=600fit=crop&q=60&ixlib=rb-4.1.0&ixid=M&auto=format&fit=crop&q=60&ixlib=rb-4.1.03wxMjA3fDB8MHxzZWFyY2h8MjB8fFRpb2&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fFR1hbiUyMElzbGFuZHxlbnwwfDB8MHx8fDA%3D%3Dwpb21hbiUyMElzbGFuZHxlbnwwfDB8MHx8fDA%=350", description: "Une île plus sauvage et montagneuse, parfaite pour la plongée et la3D%3Dw=350", description: "Une île plus sauvage et montagneuse, parfaite pour tranquillité.", activites: ["Plongée sous-marine", "Randonnée vers les cascades d'As la plongée et la tranquillité.", activites: ["Plongée sous-marine", "Randonnée versah", "Détente sur la plage de Juara"], conseil: "L'île est grande, louer les cascades d'Asah", "Détente sur la plage de Juara"], conseil: "L'île un scooter peut être une bonne option." },
     { lieu: "Singapour", dates: "12 – est grande, louer un scooter peut être une bonne option." },
     { lieu: "Singapour", dates 15 août", nuits: 3, distance: "140 km + Frontière", lat:: "12 – 15 août", nuits: 3, distance: "140 km + 1.3521, lon: 103.8198, transport: ["vo Frontière", lat: 1.3521, lon: 103.8198iture"], image: "https://images.unsplash.com/photo-147214843, transport: ["voiture"], image: "https://images.unsplash.com/photo-14729583-1f4cf81b80e0?w=600&auto148439583-1f4cf81b80e0?w==format&fit=crop&q=60&ixlib=rb-4.1.0&ix600&auto=format&fit=crop&q=60&ixlib=rb-4.id=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8f1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2hFNpbmdhcG91cnxlbnwwfHwwfHx8MA%3D%3Dw8MTJ8fFNpbmdhcG91cnxlbnwwfHwwfHx8MA%3=350", description: "La cité-jardin futuriste. Une propreté impeccable et des attractionsD%3Dw=350", description: "La cité-jardin futuriste. Une propreté impeccable et des attractions de classe mondiale.", activites: ["Spectacle son et lumière à Gardens by the Bay", " de classe mondiale.", activites: ["Spectacle son et lumière à Gardens by the Bay", "Manger dans unManger dans un 'Hawker Centre'", "Visiter Marina Bay Sands"], conseil: "Le réseau de métro ( 'Hawker Centre'", "Visiter Marina Bay Sands"], conseil: "Le réseau de métro (MRT) est excellent. Achetez une carte 'EZ-Link'." },
     { lieu: "Melaka", dates: "1MRT) est excellent. Achetez une carte 'EZ-Link'." },
     { lieu: "Melaka",5 – 17 août", nuits: 2, distance: "240 km + Frontière", dates: "15 – 17 août", nuits: 2, distance: "240 km lat: 2.1896, lon: 102.2501, transport: + Frontière", lat: 2.1896, lon: 102.250 ["voiture"], image: "https://plus.unsplash.com/premium_photo-169771, transport: ["voiture"], image: "https://plus.unsplash.com/premium_photo-169730170911-9cf912ad3a22?w=60730170911-9cf912ad3a22?w=60&auto=format&fit=crop&q=60&ixlib=rb-4.1.00&auto=format&fit=crop&q=60&ixlib=rb-4.10&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mn.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8x8TWVsYWthfGVufDB8MHwwfHx8MA%3D%3Dw=350Mnx8TWVsYWthfGVufDB8MHwwfHx8MA%3D%3Dw", description: "Un joyau historique au charme colonial, classé à l'UNESCO.", activites: ["Place=350", description: "Un joyau historique au charme colonial, classé à l'UNESCO.", activites: hollandaise (Stadthuys)", "Marché nocturne de Jonker Walk", "Croisière sur la rivière Melaka ["Place hollandaise (Stadthuys)", "Marché nocturne de Jonker Walk", "Croisière sur la rivière"], conseil: "Goûtez la 'Chicken Rice Ball', une spécialité locale." },
     { lieu: Melaka"], conseil: "Goûtez la 'Chicken Rice Ball', une spécialité locale." },
     { lieu: " "Kuala Selangor", dates: "17 – 18 août", nuits: 1, distance:Kuala Selangor", dates: "17 – 18 août", nuits: 1, distance: " "160 km – 2 h 15", lat: 3.3467, lon160 km – 2 h 15", lat: 3.3467, lon:: 101.2634, transport: ["voiture"], image: "https://images.unsplash.com/photo-1736863929622-97ebe7 101.2634, transport: ["voiture"], image: "https://images.unsplash.com/photo-1736863929622-97ebe7ee2a428?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB2a428?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB88MHxzZWFyY2h8MTF8fEt1YWxhJTIwU2VsYW5nbMHxzZWFyY2h8MTF8fEt1YWxhJTIwU2VsYW3IlMjBtYWxhaXNpYXxlbnwwfDB8MHx8fDA%3D%5nb3IlMjBtYWxhaXNpYXxlbnwwfDB8MHx8fDA%3Dw=350", description: "Célèbre pour ses paysages et son spectacle naturel féerique.",3D%3Dw=350", description: "Célèbre pour ses paysages et son spectacle naturel activites: ["Voir les lucioles en barque (vers 20h)", "Observer les singes ' féerique.", activites: ["Voir les lucioles en barque (vers 20h)", "ObserverSilver-leaf'"], conseil: "Le spectacle des lucioles est meilleur par nuit sans lune." },
     { lieu: les singes 'Silver-leaf'"], conseil: "Le spectacle des lucioles est meilleur par nuit sans lune." "Kuala Lumpur (fin de séjour)", dates: "18 – 20 août", nuits:  },
     { lieu: "Kuala Lumpur (fin de séjour)", dates: "18 – 202, distance: "85 km – 1 h 15", lat: 3.139 août", nuits: 2, distance: "85 km – 1 h 15", lat: 3.139, lon: 101.687, transport: ["voiture"],, lon: 101.687, transport: ["voiture"], image: "https://images.unsplash.com/photo-1598797246294-762 image: "https://images.unsplash.com/photo-159879724620e33a632f?w=600&auto=format&fit=crop&94-7620e33a632f?w=600&auto=q=60&ixlib=rb-4.1.0&ixid=M3wxMjAformat&fit=crop&q=60&ixlib=rb-4.1.0&ixid3fDB8MHxzZWFyY2h8NHx8S3VhbGElMjBMdW1=M3wxMjA3fDB8MHxzZWFyY2h8NHx8S3VhbGwdXJ8ZW58MHwwfDB8fHwww=350", description: "DElMjBMdW1wdXJ8ZW58MHwwfDB8fHwww=350", description:erniers moments pour le shopping, les visites ou simplement se détendre.", activites: ["Shopping à Bukit Bintang", " "Derniers moments pour le shopping, les visites ou simplement se détendre.", activites: ["Shopping à Bukit Bintang",Visite du Musée des arts islamiques", "Profiter de la piscine de l'hôtel"], conseil: "Prévoyez "Visite du Musée des arts islamiques", "Profiter de la piscine de l'hôtel"], conseil: "Prévoyez large pour le transfert vers l'aéroport KLIA." },
  ];

  try {
 large pour le transfert vers l'aéroport KLIA." },
  ];

  try {
    if (!window    if (!window.L) { throw "Leaflet non chargé"; }
    // === 1. Récupération.L) { throw "Leaflet non chargé"; }
    // === 1. Récupération des éléments du DOM ===
    const itineraryBody = document.getElementById("itinerary-body");
    const notesContainer = document.getElementById des éléments du DOM ===
    const itineraryBody = document.getElementById("itinerary-body");
    const notes("notes-container");
    const map = L.map("map", { scrollWheelZoom: false });
Container = document.getElementById("notes-container");
    const map = L.map("map", { scrollWheel    
    // === 2. Génération du contenu principal de la page ===
    const latlngs =Zoom: false });
    
    // === 2. Génération du contenu principal de la page ===
     [];
    voyage.forEach((etape, index) => {
      // Générer la ligne du tableauconst latlngs = [];
    voyage.forEach((etape, index) => {
      // Gén
      itineraryBody.innerHTML += `<tr>
          <td>${etape.dates}</td>
          <td><érer la ligne du tableau
      itineraryBody.innerHTML += `<tr>
          <td>${etape.dates}a href="#card-${index}" class="table-link">${etape.lieu}</a></td>
          <td>${</td>
          <td><a href="#card-${index}" class="table-link">${etape.lieu}</a>etape.nuits}</td>
          <td>${etape.distance}</td>
        </tr>`;

      // Générer</td>
          <td>${etape.nuits}</td>
          <td>${etape.distance}</td>
        </tr>`;

      // Générer les cartes interactives des étapes
      const activitesHTML = etape.activites.map les cartes interactives des étapes
      const activitesHTML = etape.activites.map(act => (act => `<li><i class="fas fa-camera-retro"></i>${act}</li>`).join('');`<li><i class="fas fa-camera-retro"></i>${act}</li>`).join('');
      const conseil
      const conseilHTML = etape.conseil ? `<p><strong class="section-title"><i classHTML = etape.conseil ? `<p><strong class="section-title"><i class="fas fa-="fas fa-lightbulb"></i>Conseil</strong>${etape.conseil}</p>` : '';
      lightbulb"></i>Conseil</strong>${etape.conseil}</p>` : '';
      notesContainer.innerHTMLnotesContainer.innerHTML += `<div class="note-card" id="card-${index}">
          <img src += `<div class="note-card" id="card-${index}">
          <img src="${etape.="${etape.image}" alt="Photo de ${etape.lieu}" class="card-image">
          image}" alt="Photo de ${etape.lieu}" class="card-image">
          <div class="<div class="card-header">
            <div class="card-header-text">
              <h3>${card-header">
            <div class="card-header-text">
              <h3>${etape.lieuetape.lieu}</h3>
              <span>${etape.dates}</span>
            </div>
            <i class}</h3>
              <span>${etape.dates}</span>
            </div>
            <i class="fas fa-="fas fa-chevron-down card-toggle-icon"></i>
          </div>
          <div class="cardchevron-down card-toggle-icon"></i>
          </div>
          <div class="card-details">
-details">
            <p>${etape.description}</p>
            <strong class="section-title            <p>${etape.description}</p>
            <strong class="section-title"><i class=""><i class="fas fa-star"></i>À ne pas manquer</strong>
            <ul>${activitesHTML}</ul>fas fa-star"></i>À ne pas manquer</strong>
            <ul>${activitesHTML}</ul>
            ${conse
            ${conseilHTML}
          </div>
        </div>`;
      
      // Mettre à jour lailHTML}
          </div>
        </div>`;
      
      // Mettre à jour la carte Leaflet
 carte Leaflet
      // CORRECTION : Logique pour l'accord singulier/pluriel de "nuit"
      const nuitLabel = etape.nuits === 1 ? 'nuit' : 'nu      // CORRECTION : Logique ajoutée pour gérer le singulier/pluriel de "nuit"
its';
      const popupContent = `<div class="map-popup">
            <h3>${index + 1      const nuitLabel = etape.nuits === 1 ? 'nuit' : 'nuits';
}. ${etape.lieu}</h3>
            <p>${etape.description}</p>
            <span><      const popupContent = `<div class="map-popup">
            <h3>${index + 1}. ${etape.i class="fas fa-moon"></i> ${etape.nuits} ${nuitLabel}</span>
        </div>`;lieu}</h3>
            <p>${etape.description}</p>
            <span><i class="fas fa
      L.marker([etape.lat, etape.lon]).addTo(map).bindPopup(popup-moon"></i> ${etape.nuits} ${nuitLabel}</span>
        </div>`;
      L.Content);
      latlngs.push([etape.lat, etape.lon]);
    });

marker([etape.lat, etape.lon]).addTo(map).bindPopup(popupContent);
          // === 3. Logique d'interactivité (après génération du contenu) ===
    const cards = document.querySelectorAlllatlngs.push([etape.lat, etape.lon]);
    });

    // === ('.note-card');
    cards.forEach((card, index) => {
      setTimeout(() => { card3. Logique d'interactivité (après génération du contenu) ===
    const cards = document.querySelectorAll('.note-card');
    cards.forEach((card, index) => {
      setTimeout(() => { card..classList.add('visible'); }, index * 100);
      card.addEventListener('click', (e) => {
        if (e.target.tagName.toLowerCase() !== 'a') card.classList.classList.add('visible'); }, index * 100);
      card.addEventListener('click', (etoggle('active');
      });
    });

    document.querySelectorAll('.table-link').forEach(link =>) => {
        if (e.target.tagName.toLowerCase() !== 'a') card.classList.toggle {
      link.addEventListener('click', () => {
        const targetCard = document.querySelector(link.getAttribute('active');
      });
    });

    document.querySelectorAll('.table-link').forEach(link => {('href'));
        if (targetCard) {
          document.querySelectorAll('.note-card.active').forEach
      link.addEventListener('click', () => {
        const targetCard = document.querySelector(link.getAttribute(activeCard => {
            if (activeCard.id !== targetCard.id) activeCard.classList.('href'));
        if (targetCard) {
          document.querySelectorAll('.note-card.active').forEachremove('active');
          });
          targetCard.classList.add('active');
        }
      });(activeCard => {
            if (activeCard.id !== targetCard.id) activeCard.classList.
    });

    // === 4. Logique pour les statistiques de voyage ===
    const calculateAndDisplayremove('active');
          });
          targetCard.classList.add('active');
        }
      });Stats = () => {
      const totalNights = voyage.reduce((sum, etape) => sum +
    });

    // === 4. Logique pour les statistiques de voyage ===
    const calculateAndDisplay (typeof etape.nuits === 'number' ? etape.nuits : 0), 0);
      const totalDestinations = voyage.filter(etape => !etape.lieu.toLowerCase().includes('Stats = () => {
      // Le code de calcul est maintenant robuste grâce à la clé "nuits" standardvol')).length;
      const totalKms = voyage.reduce((sum, etape) => {
        isée
      const totalNights = voyage.reduce((sum, etape) => sum + (typeof etapeconst kmMatch = etape.distance.toString().match(/(\d+)\s*km/);
        .nuits === 'number' ? etape.nuits : 0), 0);
      const totalreturn sum + (kmMatch ? parseInt(kmMatch[1], 10) : 0);
      Destinations = voyage.filter(etape => !etape.lieu.toLowerCase().includes('vol')).length;}, 0);
      const uniqueTransportModes = new Set(voyage.flatMap(etape => etape.transport ||
      const totalKms = voyage.reduce((sum, etape) => {
        const kmMatch = [])).size;
      
      const animateValue = (element, end, duration) => {
        let etape.distance.toString().match(/(\d+)\s*km/);
        return sum + ( start = 0;
        let startTimestamp = null;
        const step = (timestamp) => {
kmMatch ? parseInt(kmMatch[1], 10) : 0);
      }, 0);          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp)
      const uniqueTransportModes = new Set(voyage.flatMap(etape => etape.transport || [])).size; / duration, 1);
          element.textContent = Math.floor(progress * (end - start) +
      
      const animateValue = (element, end, duration) => {
        let start = 0 start).toLocaleString();
          if (progress < 1) window.requestAnimationFrame(step);
        };
        window.requestAnimationFrame(step);
      };

      const statsSection = document.getElementById('stats-section;
        let startTimestamp = null;
        const step = (timestamp) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, ');
      const observer = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  animateValue(document.getElementById('stats-days1);
          element.textContent = Math.floor(progress * (end - start) + start).toLocaleString();'), totalNights + 1, 1500);
                  animateValue(document.getElementById('stats-dest
          if (progress < 1) window.requestAnimationFrame(step);
        };
        window.requestAnimationFrame(step);
      };

      const statsSection = document.getElementById('stats-section');
      constinations'), totalDestinations, 1500);
                  animateValue(document.getElementById('stats-kms'), totalKms, 1500);
                  animateValue(document.getElementById('stats-transport'), observer = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
              if uniqueTransportModes, 1500);
                  observer.unobserve(entry.target);
              } (entry.isIntersecting) {
                  animateValue(document.getElementById('stats-days'), totalNights + 
          });
      }, { threshold: 0.5 });
      if (statsSection) observer.observe1, 1500);
                  animateValue(document.getElementById('stats-destinations'), totalDest(statsSection);
    };
    calculateAndDisplayStats();

    // === 5. Finalisation de l'inations, 1500);
                  animateValue(document.getElementById('stats-kms'), totalKmsUI ===
    if (latlngs.length > 0) {
      map.fitBounds(lat, 1500);
                  animateValue(document.getElementById('stats-transport'), uniqueTransportModes,lngs, { padding: [40, 40] });
      L.tileLayer('https:// 1500);
                  observer.unobserve(entry.target);
              }
          });
{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18      }, { threshold: 0.5 });
      if (statsSection) observer.observe(statsSection);, attribution: '© OpenStreetMap' }).addTo(map);
      L.polyline(latlngs, { color: "#
    };
    calculateAndDisplayStats();

    // === 5. Finalisation de l'UI ===
    ff914d", weight: 4, opacity: 0.8 }).addTo(map);
    }

    const backToTopBtn = document.getElementById('back-to-top-btn');
    windowif (latlngs.length > 0) {
      map.fitBounds(latlngs, {.addEventListener('scroll', () => {
      backToTopBtn.classList.toggle('show', window.scrollY padding: [40, 40] });
      L.tileLayer('https://{s}.tile > 300);
    });
    backToTopBtn.addEventListener('click', () => {
.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

  } catch (© OpenStreetMap' }).addTo(map);
      L.polyline(latlngs, { color: "#ff914e) {
    console.error("Erreur lors de l'initialisation de la page :", e);d", weight: 4, opacity: 0.8 }).addTo(map);
    }

    const
    const mapError = document.getElementById("mapError");
    if(mapError) mapError.style.display = "block";
  }
});