// Module d'authentification
class AuthManager {
    constructor() {
        this.isAuthenticated = false;
        this.init();
    }
    
    init() {
        // Vérifier si l'utilisateur est déjà connecté
        const remembered = localStorage.getItem(CONFIG.auth.rememberKey);
        const sessionAuth = sessionStorage.getItem(CONFIG.auth.sessionKey);
        
        if (remembered === 'true' || sessionAuth === 'true') {
            this.isAuthenticated = true;
            this.showMainContent();
        } else {
            this.showLoginForm();
        }
    }
    
    showLoginForm() {
        document.body.innerHTML = `
            <div class="login-container">
                <div class="login-card">
                    <div class="login-header">
                        <h1>🏝️ Voyage Malaisie</h1>
                        <p>Accès famille uniquement</p>
                    </div>
                    <form id="loginForm" class="login-form">
                        <div class="form-group">
                            <label for="username">Nom d'utilisateur</label>
                            <input type="text" id="username" name="username" required>
                        </div>
                        <div class="form-group">
                            <label for="password">Mot de passe</label>
                            <input type="password" id="password" name="password" required>
                        </div>
                        <div class="form-group checkbox-group">
                            <label>
                                <input type="checkbox" id="remember" name="remember">
                                Se souvenir de moi
                            </label>
                        </div>
                        <button type="submit" class="login-btn">Se connecter</button>
                        <div id="loginError" class="error-message" style="display:none;"></div>
                    </form>
                </div>
            </div>
            <style>
                .login-container {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: linear-gradient(135deg, #00A8A8 0%, #0077BE 100%);
                    padding: 20px;
                }
                
                .login-card {
                    background: white;
                    border-radius: 20px;
                    padding: 40px;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                    max-width: 400px;
                    width: 100%;
                    text-align: center;
                }
                
                .login-header h1 {
                    margin: 0 0 10px 0;
                    color: #2C3E50;
                    font-size: 2rem;
                }
                
                .login-header p {
                    color: #666;
                    margin: 0 0 30px 0;
                }
                
                .form-group {
                    margin-bottom: 20px;
                    text-align: left;
                }
                
                .form-group label {
                    display: block;
                    margin-bottom: 5px;
                    color: #2C3E50;
                    font-weight: 500;
                }
                
                .form-group input[type="text"],
                .form-group input[type="password"] {
                    width: 100%;
                    padding: 12px;
                    border: 2px solid #e0e0e0;
                    border-radius: 10px;
                    font-size: 16px;
                    transition: border-color 0.3s;
                    box-sizing: border-box;
                }
                
                .form-group input:focus {
                    outline: none;
                    border-color: #00A8A8;
                }
                
                .checkbox-group label {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    cursor: pointer;
                }
                
                .login-btn {
                    width: 100%;
                    padding: 12px;
                    background: linear-gradient(135deg, #00A8A8, #6BCF7F);
                    color: white;
                    border: none;
                    border-radius: 10px;
                    font-size: 16px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: transform 0.2s;
                }
                
                .login-btn:hover {
                    transform: translateY(-2px);
                }
                
                .error-message {
                    color: #FF7B54;
                    font-size: 14px;
                    margin-top: 10px;
                }
            </style>
        `;
        
        // Ajouter l'événement de soumission
        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });
    }
    
    handleLogin() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const remember = document.getElementById('remember').checked;
        
        if (CONFIG.auth.users[username] === password) {
            this.isAuthenticated = true;
            
            // Sauvegarder l'état de connexion
            sessionStorage.setItem(CONFIG.auth.sessionKey, 'true');
            if (remember) {
                localStorage.setItem(CONFIG.auth.rememberKey, 'true');
            }
            
            this.showMainContent();
        } else {
            const errorDiv = document.getElementById('loginError');
            errorDiv.textContent = 'Nom d\'utilisateur ou mot de passe incorrect';
            errorDiv.style.display = 'block';
        }
    }
    
    logout() {
        this.isAuthenticated = false;
        sessionStorage.removeItem(CONFIG.auth.sessionKey);
        localStorage.removeItem(CONFIG.auth.rememberKey);
        location.reload();
    }
    
    showMainContent() {
        // Cacher le formulaire de connexion et afficher le contenu principal
        const loginContainer = document.querySelector('.login-container');
        if (loginContainer) {
            loginContainer.style.display = 'none';
        }
        
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.style.display = 'block';
            
            // Initialiser l'application voyage qui gère tout
            if (typeof VoyageApp !== 'undefined') {
                new VoyageApp();
            }
        } else {
            // Fallback: créer le contenu principal dynamiquement
            this.createMainContent();
        }
    }
    
    loadMainContentDirect() {
        // Cette méthode sera appelée par le constructeur principal
        // Elle sera remplacée par le HTML principal une fois créé
        console.log('Utilisateur authentifié - chargement du contenu principal');
        this.createMainContent();
    }
    
    createMainContent() {
        // Remplacer tout le contenu par le site principal
        document.body.innerHTML = `
            <header class="hero-header">
                <h1>🏝️ Itinéraire Malaisie & Singapour</h1>
                <p class="hero-subtitle">20 jours d'aventure à travers l'Asie du Sud-Est</p>
                
                <!-- Les widgets météo et horloges seront injectés ici -->
                
                <nav class="main-nav">
                    <a href="#itineraire"><i class="fas fa-map"></i> Itinéraire</a>
                    <a href="#notes-etapes"><i class="fas fa-info-circle"></i> Détails des étapes</a>
                    <a href="#notes-section"><i class="fas fa-sticky-note"></i> Bloc-notes</a>
                </nav>
            </header>

            <main>
                <!-- Section Statistiques -->
                <section id="stats-section" class="fade-in">
                    <div class="stats-container">
                        <div class="stat-box">
                            <span id="stats-days" class="stat-number blue">0</span>
                            <p class="stat-label">Jours</p>
                        </div>
                        <div class="stat-box">
                            <span id="stats-destinations" class="stat-number green">0</span>
                            <p class="stat-label">Villes</p>
                        </div>
                        <div class="stat-box">
                            <span id="stats-kms" class="stat-number orange">0</span>
                            <p class="stat-label">Kilomètres</p>
                        </div>
                        <div class="stat-box">
                            <span id="stats-transport" class="stat-number purple">0</span>
                            <p class="stat-label">Modes de transport</p>
                        </div>
                    </div>
                </section>

                <!-- Section Carte Interactive -->
                <section id="itineraire" class="fade-in">
                    <div class="title-with-icon">
                        <img src="assets/image-map-itineraire.png" alt="Icône de carte" class="title-icon">
                        <h2>Le Périple en Malaisie</h2>
                    </div>
                    
                    <div id="map" aria-label="Carte interactive du voyage"></div>
                    <div id="mapError" class="error" style="display:none">
                       ⚠️ Impossible d'afficher la carte ; vérifiez votre connexion Internet.
                    </div>
                    
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

                <!-- Section Détails des Étapes -->
                <section id="notes-etapes" class="fade-in">
                    <div class="title-with-icon">
                        <img src="assets/image-map-itineraire.png" alt="Icône de notes" class="title-icon">
                        <h2>Toutes les Infos</h2>
                    </div>

                    <div id="notes-container">
                      <!-- Les cartes interactives seront générées ici par le script -->
                    </div>
                </section>
                
                <!-- Section Bloc-notes sera ajoutée par le NotesManager -->
            </main>

            <footer class="tropical-footer">
                <div class="footer-content">
                    <p>Fait avec ❤️ pour un voyage inoubliable</p>
                    <div class="footer-icons">
                        <span>🏝️</span>
                        <span>🌴</span>
                        <span>✈️</span>
                        <span>📸</span>
                    </div>
                </div>
            </footer>

            <button id="back-to-top-btn" class="back-to-top" title="Retour en haut">
                <i class="fas fa-arrow-up"></i>
            </button>
        `;
        
        // Initialiser l'application voyage
        if (typeof VoyageApp !== 'undefined') {
            new VoyageApp();
        }
    }
}

// Initialiser l'authentification
document.addEventListener('DOMContentLoaded', () => {
    window.authManager = new AuthManager();
});
