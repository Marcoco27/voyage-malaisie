// Module d'authentification
class AuthManager {
    constructor() {
        this.isAuthenticated = false;
        this.init();
    }
    
    init() {
        const remembered = localStorage.getItem(CONFIG.auth.rememberKey);
        const sessionAuth = sessionStorage.getItem(CONFIG.auth.sessionKey);
        
        if (remembered === 'true' || sessionAuth === 'true') {
            this.isAuthenticated = true;
            this.createMainContent();
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
                        <div class="form-group">
                            <input type="checkbox" id="remember" name="remember">
                            <label for="remember">Se souvenir de moi</label>
                        </div>
                        <button type="submit" class="login-btn">Se connecter</button>
                        <div id="loginError" class="error-message" style="display:none;"></div>
                    </form>
                </div>
            </div>`;
        
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
            sessionStorage.setItem(CONFIG.auth.sessionKey, 'true');
            if (remember) {
                localStorage.setItem(CONFIG.auth.rememberKey, 'true');
            }
            this.createMainContent();
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
    
    createMainContent() {
        document.body.innerHTML = ''; // Nettoie le body
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.style.display = 'block';
             // Initialise l'app principale
            if (typeof VoyageApp !== 'undefined') {
                window.voyageApp = new VoyageApp();
            }
        } else {
            // Fallback si #main-content n'est pas dans le HTML au départ
            const appContainer = document.createElement('div');
            appContainer.id = 'main-content';
            document.body.appendChild(appContainer);
            window.voyageApp = new VoyageApp();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.authManager = new AuthManager();
});
