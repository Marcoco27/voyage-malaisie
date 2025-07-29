// Module d'authentification
class AuthManager {
    constructor() {
        this.isAuthenticated = false;
        this.loginContainer = null;
        this.mainContent = document.getElementById('main-content');
        // La vérification de CONFIG se fait au moment de l'instanciation
        if (typeof CONFIG === 'undefined') {
            console.error("Le fichier de configuration (config/config.js) n'a pas pu être chargé ou est incorrect.");
            document.body.innerHTML = '<div class="error" style="padding: 20px;">Erreur critique : Impossible de charger la configuration de l'application.</div>';
            return;
        }
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
        document.body.prepend(this.loginContainer);

        const loginForm = document.getElementById('loginForm');
        const errorDiv = document.getElementById('loginError');

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = loginForm.username.value;
            const password = loginForm.password.value;
            const remember = loginForm.remember.checked;

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
        if (this.loginContainer) {
            this.loginContainer.remove();
            this.loginContainer = null;
        }

        if (this.mainContent) {
            this.mainContent.style.display = 'block';
        }

        if (typeof VoyageApp !== 'undefined' && !window.voyageApp) {
            window.voyageApp = new VoyageApp();
        }
    }
}

// L'instanciation se fait directement, car les scripts sont maintenant
// chargés de manière synchrone dans le bon ordre.
new AuthManager();
