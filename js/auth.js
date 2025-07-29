// Module d'authentification
class AuthManager {
    constructor() {
        this.isAuthenticated = false;
        this.loginForm = null;
        this.errorDiv = null;
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

    _renderLoginForm() {
        const loginContainer = document.createElement('div');
        loginContainer.className = 'login-container';
        loginContainer.innerHTML = `
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
            </div>`;
        return loginContainer;
    }

    showLoginForm() {
        document.body.innerHTML = '';
        const loginFormContainer = this._renderLoginForm();
        document.body.appendChild(loginFormContainer);
        
        this.loginForm = document.getElementById('loginForm');
        this.errorDiv = document.getElementById('loginError');

        this.loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });
    }

    handleLogin() {
        const username = this.loginForm.username.value;
        const password = this.loginForm.password.value;
        const remember = this.loginForm.remember.checked;

        if (CONFIG.auth.users[username] === password) {
            this.isAuthenticated = true;
            sessionStorage.setItem(CONFIG.auth.sessionKey, 'true');
            if (remember) {
                localStorage.setItem(CONFIG.auth.rememberKey, 'true');
            }
            this.createMainContent();
        } else {
            this.showLoginError('Nom d'utilisateur ou mot de passe incorrect');
        }
    }

    showLoginError(message) {
        this.errorDiv.textContent = message;
        this.errorDiv.style.display = 'block';
    }

    logout() {
        this.isAuthenticated = false;
        sessionStorage.removeItem(CONFIG.auth.sessionKey);
        localStorage.removeItem(CONFIG.auth.rememberKey);
        location.reload();
    }

    createMainContent() {
        document.body.innerHTML = ''; // Nettoie le body
        let mainContent = document.getElementById('main-content');
        if (!mainContent) {
            mainContent = document.createElement('div');
            mainContent.id = 'main-content';
            document.body.appendChild(mainContent);
        }
        mainContent.style.display = 'block';

        // Initialise l'app principale
        if (typeof VoyageApp !== 'undefined') {
            window.voyageApp = new VoyageApp();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.authManager = new AuthManager();
});
