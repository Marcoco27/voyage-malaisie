// js/simple-auth.js

const correctCode = 'malaisie2025';
const sessionKey = 'voyage_access_granted';

const form = document.getElementById('access-form');
const secretCodeInput = document.getElementById('secret-code');
const errorMessage = document.getElementById('error-message');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const enteredCode = secretCodeInput.value.trim();

    if (enteredCode === correctCode) {
        // Enregistrer l'accès dans la session du navigateur
        sessionStorage.setItem(sessionKey, 'true');
        // Rediriger vers la page principale de l'application
        window.location.href = 'app.html';
    } else {
        errorMessage.style.display = 'block';
        secretCodeInput.focus();
    }
});
