// Module d'authentification
class AuthManager {
    constructor() {
        this.isAuthenticated = false;
        this.loginContainer = null;
        this.mainContent = document.getElementById('main-content');
        this.init();
    }

    init() {
        const remembered = localStorage.getItem(CONFIG.auth.rememberKey);
        const sessionAuth = sessionStorage.getItem(CONFIG.auth.sessionKey);

        if (remembered === 'true' || sessionAuth === 'true') {
            this.isAuthenticated = true;
            this.showMainContent();
        } else {
            this.showLoginForm();
        }
    }

    _renderLoginForm() {
        const container = document.createElement('div');
        container.className = 'login-container';
        container.innerHTML = `
            <div class="login-card">
                <div class="login-header">
                    <h1>🏝️ Voyage Malaisie</h1>
                    <p>Accès famille uniquement</p>
                </div>
                <form id="loginForm" class="login-form">
                    <div class="form-group">
                        <label for="username">Nom d'utilisateur</label>
                        <input type="text" id="username" name="username" required autocomplete="username">
                    </div>
                    <div class="form-group">
                        <label for="password">Mot de passe</label>
                        <input type="password" id="password" name="password" required autocomplete="current-password">
                    </div>
                    <div class="form-group">
                        <input type="checkbox" id="remember" name="remember">
                        <label for="remember">Se souvenir de moi</label>
                    </div>
                    <button type="submit" class="login-btn">Se connecter</button>
                    <div id="loginError" class="error-message" style="display:none;"></div>
                </form>
            </div>`;
        return container;
    }

    showLoginForm() {
        if (this.loginContainer) return;
        this.loginContainer = this._renderLoginForm();
        document.body.prepend(this.loginContainer); // Use prepend to avoid destroying scripts

        const loginForm = document.getElementById('loginForm');
        const errorDiv = document.getElementById('loginError');

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = loginForm.username.value;
            const password = loginForm.password.value;
            const remember = loginForm.remember.checked;

            // Use the credentials from CONFIG
            if (CONFIG.auth.users[username] === password) {
                this.isAuthenticated = true;
                sessionStorage.setItem(CONFIG.auth.sessionKey, 'true');
                if (remember) {
                    localStorage.setItem(CONFIG.auth.rememberKey, 'true');
                }
                this.showMainContent();
            } else {
                errorDiv.textContent = 'Nom d'utilisateur ou mot de passe incorrect';
                errorDiv.style.display = 'block';
            }
        });
    }

    logout() {
        this.isAuthenticated = false;
        sessionStorage.removeItem(CONFIG.auth.sessionKey);
        localStorage.removeItem(CONFIG.auth.rememberKey);
        location.reload();
    }

    showMainContent() {
        // Remove login form if it exists
        if (this.loginContainer) {
            this.loginContainer.remove();
            this.loginContainer = null;
        }

        // Show main content from index.html, which was previously hidden
        if (this.mainContent) {
            this.mainContent.style.display = 'block';
        }

        // Initialize the main app, checking if it hasn't been initialized before
        if (typeof VoyageApp !== 'undefined' && !window.voyageApp) {
            window.voyageApp = new VoyageApp();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // This ensures config.js is loaded before AuthManager runs
    if (typeof CONFIG !== 'undefined') {
        window.authManager = new AuthManager();
    } else {
        console.error("Le fichier de configuration (config/config.js) n'a pas pu être chargé ou est incorrect.");
        // Display an error message to the user
        document.body.innerHTML = '<div class="error" style="padding: 20px;">Erreur critique : Impossible de charger la configuration de l'application.</div>';
    }
});
