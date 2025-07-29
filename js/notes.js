// js/notes.js - Gestionnaire de bloc-notes avec Firebase v9

// Importer les fonctions nécessaires, y compris remove et update
import { ref, onValue, push, serverTimestamp, remove, update } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

export class NotesManager {
    constructor(database) {
        this.db = database;
        this.notesList = null;
        this.notesForm = null;
    }

    init() {
        this.renderLayout();
        this.setupEventListeners();
        this.loadNotes();
    }

    renderLayout() {
        const mainContainer = document.querySelector('main');
        const footer = document.querySelector('.tropical-footer');
        if (!mainContainer || !footer) return;
        if (document.getElementById('notes-section')) return;

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
                    <label for="note-input" class="form-label">Laissez un message sur le carnet de voyage :</label>
                    <textarea id="note-input" placeholder="Écrire une note ici..." required maxlength="500"></textarea>
                    <button type="submit">Ajouter la note</button>
                </form>
            </div>
        `;
        
        mainContainer.insertBefore(section, footer);

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
        const notesRef = ref(this.db, 'blocnotes/');
        push(notesRef, {
            content: content,
            timestamp: serverTimestamp()
        }).catch(error => console.error("Erreur lors de l'ajout de la note:", error));
    }

    loadNotes() {
        const notesRef = ref(this.db, 'blocnotes/');

        onValue(notesRef, (snapshot) => {
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
        });
    }
    
    displayNote(noteData) {
        const noteElement = document.createElement('li');
        noteElement.className = 'note-item';
        noteElement.dataset.key = noteData.key;

        const formattedDate = noteData.timestamp ? new Date(noteData.timestamp).toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : "Date inconnue";

        noteElement.innerHTML = `
            <div class="note-content-display">
                <p class="note-content">${this.sanitize(noteData.content || 'Note vide')}</p>
                <span class="note-timestamp">${formattedDate}</span>
            </div>
            <div class="note-content-edit">
                <textarea class="edit-textarea">${noteData.content || ''}</textarea>
                <button class="save-btn">Enregistrer</button>
                <button class="cancel-btn">Annuler</button>
            </div>
            <div class="note-actions">
                <button class="edit-btn" title="Modifier"><i class="fas fa-pencil-alt"></i></button>
                <button class="delete-btn" title="Supprimer"><i class="fas fa-trash"></i></button>
            </div>
        `;
        
        this.notesList.appendChild(noteElement);

        // --- Ajout des écouteurs d'événements ---
        noteElement.querySelector('.delete-btn').addEventListener('click', () => {
            if (confirm("Êtes-vous sûr de vouloir supprimer cette note ?")) {
                this.deleteNote(noteData.key);
            }
        });

        noteElement.querySelector('.edit-btn').addEventListener('click', () => this.toggleEditMode(noteElement, true));
        noteElement.querySelector('.cancel-btn').addEventListener('click', () => this.toggleEditMode(noteElement, false));
        noteElement.querySelector('.save-btn').addEventListener('click', () => {
            const newContent = noteElement.querySelector('.edit-textarea').value.trim();
            this.updateNote(noteData.key, newContent);
        });
    }
    
    deleteNote(noteKey) {
        const noteRef = ref(this.db, `blocnotes/${noteKey}`);
        remove(noteRef).catch(error => console.error("Erreur de suppression:", error));
    }

    updateNote(noteKey, newContent) {
        if (!newContent) return;
        const noteRef = ref(this.db, `blocnotes/${noteKey}`);
        update(noteRef, { content: newContent })
            .catch(error => console.error("Erreur de mise à jour:", error));
    }

    toggleEditMode(noteElement, isEditing) {
        noteElement.classList.toggle('editing', isEditing);
    }

    sanitize(text) {
        const element = document.createElement('div');
        element.innerText = text;
        return element.innerHTML;
    }
}
