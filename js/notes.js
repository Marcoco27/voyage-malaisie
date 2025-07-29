// Gestionnaire de bloc-notes avec Firebase
class NotesManager {
    constructor() {
        this.notesContainer = null;
        this.notesList = null;
        this.notesForm = null;
        this.db = null;

        // Attendre que le DOM soit prêt pour ne pas interférer avec le reste de la page
        document.addEventListener('DOMContentLoaded', () => {
            this.init();
        });
    }

    init() {
        if (typeof firebase === 'undefined' || typeof firebase.database === 'undefined') {
            console.error("Firebase Database n'est pas chargé. Le bloc-notes ne peut pas fonctionner.");
            return;
        }
        
        // Initialiser la référence à la base de données Firebase
        this.db = firebase.database();
        
        this.renderLayout();
        this.setupEventListeners();
        this.loadNotes();
    }

    renderLayout() {
        const mainContainer = document.querySelector('main');
        if (!mainContainer) return;

        const section = document.createElement('section');
        section.id = 'notes-section';
        section.className = 'fade-in';
        section.innerHTML = `
            <div class="title-with-icon">
                <img src="assets/image-map-itineraire.png" alt="Icône de bloc-notes" class="title-icon">
                <h2>Bloc-notes Partagé</h2>
            </div>
            <div class="notes-app-container">
                <div id="notes-list" class="notes-list" role="log" aria-live="polite">
                    <!-- Les notes chargées depuis Firebase apparaîtront ici -->
                </div>
                <form id="notes-form" class="notes-form">
                    <textarea id="note-input" placeholder="Écrire une note ici..." required maxlength="500"></textarea>
                    <button type="submit">Ajouter la note</button>
                </form>
            </div>
        `;
        mainContainer.appendChild(section);

        this.notesContainer = section;
        this.notesList = document.getElementById('notes-list');
        this.notesForm = document.getElementById('notes-form');
    }
    
    setupEventListeners() {
        if (!this.notesForm) return;

        this.notesForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const noteInput = document.getElementById('note-input');
            const content = noteInput.value.trim();

            if (content) {
                this.addNote(content);
                noteInput.value = ''; // Réinitialiser le champ
            }
        });
    }

    addNote(content) {
        const newNote = {
            content: content,
            timestamp: firebase.database.ServerValue.TIMESTAMP
        };

        // CORRECTION : Utiliser le chemin 'blocnotes/' comme défini dans les règles Firebase
        this.db.ref('blocnotes/').push(newNote)
            .catch(error => console.error("Erreur lors de l'ajout de la note:", error));
    }

    loadNotes() {
        // CORRECTION : Utiliser le chemin 'blocnotes/'
        const notesRef = this.db.ref('blocnotes/').orderByChild('timestamp');

        notesRef.on('child_added', (snapshot) => {
            const note = snapshot.val();
            const noteId = snapshot.key;
            this.displayNote(note, noteId);
        });
    }
    
    displayNote(note, noteId) {
        if (!this.notesList) return;

        const noteElement = document.createElement('div');
        noteElement.className = 'note-item';
        noteElement.dataset.id = noteId;

        const date = new Date(note.timestamp);
        const formattedDate = date.toLocaleString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        noteElement.innerHTML = `
            <p class="note-content">${this.sanitize(note.content)}</p>
            <span class="note-timestamp">${formattedDate}</span>
        `;
        
        this.notesList.prepend(noteElement);
    }
    
    sanitize(text) {
        const element = document.createElement('div');
        element.innerText = text;
        return element.innerHTML;
    }
}

// CORRECTION : Démarrer automatiquement le gestionnaire de notes
new NotesManager();
