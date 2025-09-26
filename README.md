Ce projet est une application web interactive et dynamique conçue pour présenter un itinéraire de voyage de 20 jours en Malaisie et à Singapour. 
L'interface, à la fois riche et intuitive, offre une vue d'ensemble du parcours, des informations détaillées sur chaque étape, et des widgets en temps réel pour une expérience immersive.

Carte Interactive : Affiche le tracé complet du voyage sur une carte Leaflet, avec des marqueurs pour chaque destination.
Itinéraire Détaillé : Présente le planning sous forme de tableau, incluant les dates, lieux, hébergements et distances.
Cartes d'Information : Des fiches détaillées et extensibles pour chaque étape, contenant des descriptions, activités, conseils et photos.
Statistiques Clés : Un aperçu rapide du voyage : nombre de jours, de destinations, de kilomètres parcourus et de moyens de transport.
Widgets en Temps Réel :
Météo : Affiche la météo actuelle de la ville par défaut (configurable).
Horloges Mondiales : Donne l'heure en temps réel pour différentes zones horaires (ex: France et Kuala Lumpur).
Animations d'Ambiance : De subtiles animations marines en arrière-plan pour enrichir l'expérience visuelle.
Conception Responsive : Une interface qui s'adapte à toutes les tailles d'écran, du mobile au bureau.
L'application est construite avec des technologies web standard, en mettant l'accent sur une architecture modulaire et maintenable.

Frontend :
HTML5
CSS3 (avec des variables pour une thématisation facile)
JavaScript (ES6 Modules) : Le cœur de l'application, tout le code est écrit en JavaScript moderne et modulaire, sans aucun framework.
APIs & Librairies :
Leaflet.js : Pour la cartographie interactive.
OpenWeatherMap API : Pour les données météorologiques en temps réel.
Font Awesome : Pour les icônes.

    ├── assets/               # Images et icônes statiques
    ├── css/
    │   └── style.css         # Feuille de style principale
    ├── data/
    │   └── itinerary.json    # Fichier de données central contenant tout l'itinéraire
    ├── js/
    │   ├── main.js           # Point d'entrée principal, initialise les modules
    │   ├── voyage-app.js     # Gère le rendu de l'itinéraire, de la carte et des fiches
    │   ├── weather.js        # Module pour le widget météo
    │   ├── clock.js          # Module pour les horloges
    │   └── marine-animations.js # Gère les animations d'arrière-plan
    └── index.html            # Fichier HTML principal


L'application est entièrement pilotée par le fichier data/itinerary.json.

Au chargement, js/main.js initialise la VoyageApp.
VoyageApp utilise fetch pour charger et parser de manière asynchrone le contenu de data/itinerary.json.
À partir de ces données, JavaScript génère dynamiquement tous les composants HTML :
Les statistiques (jours, villes, etc.).
La carte Leaflet, ses marqueurs et le tracé du parcours.
Le tableau du planning détaillé.
Les fiches d'information pour chaque étape.
Les autres modules (WeatherManager, ClockManager) sont initialisés indépendamment pour gérer leurs widgets respectifs.
Pour modifier, ajouter ou supprimer une étape du voyage, il suffit d'éditer ce fichier. Chaque objet du tableau représente une étape et doit suivre la structure ci-dessous :

    {
      "lieu": "Cherating",
      "dates": "09 – 11 août",
      "nuits": 2,
      "distance": "220 km – 3 h 30",
      "lat": 4.139,
      "lon": 103.392,
      "transport": ["voiture"],
      "image": "https://...",
      "description": "Ambiance décontractée, plage immense...",
      "activites": [
          "Sanctuaire des tortues...",
          "Leçon de surf",
          "Kayak dans la mangrove"
      ],
      "conseil": "Le lâcher des tortues dépend de la saison...",
      "hotel": "Royale Chulan Cherating Chalet",
      "hotelAddress": "Jalan Kampung Cherating Lama, 26080 Cherating, Malaisie"
    }
