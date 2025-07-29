// Gestionnaire de bloc-notes avec Firebase
class NotesManager {
    constructor() {
        this.notesList = null;
        this.notesForm = null;
        this.db = null;
        this.init();
    }

    init() {
        if (typeof firebase === 'undefined' || typeof firebase.database === 'undefined') {
            console.error("Firebase Database n'est pas chargé. Le bloc-notes ne peut pas fonctionner.");
            return;
        }
        
        this.db = firebase.database();
        this.renderLayout();
        this.setupEventListeners();
        this.loadNotes();
    }

    renderLayout() {
        const mainContainer = document.querySelector('main');
        if (!mainContainer) return;

        // On cherche le footer pour s'insérer avant lui
        const footer = document.querySelector('.tropical-footer');

        const section = document.createElement('section');
        section.id = 'notes-section';
        section.className = 'fade-in';
        section.innerHTML = `
            <div class="title-with-icon">
                <img src="assets/image-map-itineraire.png" alt="Icône de bloc-notes" class="title-icon">
                <h2>Bloc-notes Partagé</h2>
            </div>
            <div class="notes-app-container">
                <ul id="notes-list" class="notes-list" role="log" aria-live="polite">
                    <li>Chargement des notes...</li>
                </ul>
                <form id="notes-form" class="notes-form">
                    <textarea id="note-input" placeholder="Écrire une note ici..." required maxlength="500"></textarea>
                    <button type="submit">Ajouter la note</button>
                </form>
            </div>
        `;
        
        // CORRECTION : Insérer le bloc-notes avant le footer pour le bon ordre visuel.
        if (footer) {
            mainContainer.insertBefore(section, footer);
        } else {
            mainContainer.appendChild(section); // Fallback si le footer n'est pas trouvé
        }

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
                noteInput.value = '';
            }
        });
    }

    addNote(content) {
        const newNote = {
            content: content,
            timestamp: firebase.database.ServerValue.TIMESTAMP
        };
        this.db.ref('blocnotes/').push(newNote)
            .catch(error => console.error("Erreur lors de l'ajout de la note:", error));
    }

    loadNotes() {
        const notesRef = this.db.ref('blocnotes/');

        notesRef.on('value', (snapshot) => {
            if (!this.notesList) return;
            this.notesList.innerHTML = ''; 

            const notes = [];
            snapshot.forEach((childSnapshot) => {
                notes.push({
                    key: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });

            notes.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

            if (notes.length === 0) {
                this.notesList.innerHTML = "<li>Aucune note pour l'instant. Soyez le premier !</li>";
            } else {
                notes.forEach(noteData => {
                    this.displayNote(noteData);
                });
            }
        }, error => {
            console.error("Erreur de lecture:", error);
            if (this.notesList) {
                this.notesList.innerHTML = '<li>Impossible de charger les notes.</li>';
            }
        });
    }
    
    displayNote(noteData) {
        const noteElement = document.createElement('li');
        noteElement.className = 'note-item';

        let formattedDate = "Date inconnue";
        if (noteData.timestamp) {
            const date = new Date(noteData.timestamp);
            if (!isNaN(date.getTime())) {
                formattedDate = date.toLocaleString('fr-FR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                });
            }
        }

        noteElement.innerHTML = `
            <p class="note-content">${this.sanitize(noteData.content || 'Note vide')}</p>
            <span class="note-timestamp">${formattedDate}</span>
        `;
        
        this.notesList.appendChild(noteElement);
    }
    
    sanitize(text) {
        const element = document.createElement('div');
        element.innerText = text;
        return element.innerHTML;
    }
}
