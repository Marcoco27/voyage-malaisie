// Module de gestion du bloc-notes
class NotesManager {
    constructor() {
        this.notes = localStorage.getItem(CONFIG.notes.storageKey) || '';
        this.autoSaveTimeout = null;
        
        // Éléments du DOM
        this.notesSection = null;
        this.textarea = null;
        this.countSpan = null;
        this.statusSpan = null;
        
        this.init();
    }

    init() {
        this.createNotesSection();
        this.setupEventListeners();
    }

    _renderNotesHTML() {
        const section = document.createElement('section');
        section.id = 'notes-section';
        section.className = 'notes-section';
        section.innerHTML = `
            <div class="title-with-icon">
                <div class="title-icon">📝</div>
                <h2>Bloc-notes Famille</h2>
            </div>
            <div class="notes-container">
                <div class="notes-header">
                    <div class="notes-info">
                        <span id="notes-count">${this.notes.length}</span> caractères
                        <span id="notes-status" class="notes-status saved">Sauvegardé</span>
                    </div>
                    <div class="notes-actions">
                        <button id="clear-notes" class="notes-btn">Effacer</button>
                    </div>
                </div>
                <textarea id="family-notes" class="notes-textarea" placeholder="Partagez vos notes, idées..."></textarea>
                <div class="notes-footer">
                    💡 Vos notes sont sauvegardées automatiquement dans le navigateur.
                </div>
            </div>`;
        return section;
    }

    createNotesSection() {
        const main = document.querySelector('main');
        if (!main) return;

        this.notesSection = this._renderNotesHTML();
        main.appendChild(this.notesSection);
        
        // Mise en cache des éléments
        this.textarea = document.getElementById('family-notes');
        this.countSpan = document.getElementById('notes-count');
        this.statusSpan = document.getElementById('notes-status');
        
        // Initialiser la valeur du textarea
        this.textarea.value = this.notes;
    }

    setupEventListeners() {
        if (!this.textarea) return;
        
        this.textarea.addEventListener('input', () => this.handleInput());
        
        const clearButton = document.getElementById('clear-notes');
        if (clearButton) {
            clearButton.addEventListener('click', () => this.clearNotes());
        }
    }

    handleInput() {
        this.notes = this.textarea.value;
        this.countSpan.textContent = this.notes.length;
        this.updateStatus('saving', 'Sauvegarde...');

        clearTimeout(this.autoSaveTimeout);
        this.autoSaveTimeout = setTimeout(() => this.saveNotes(), 1500);
    }

    saveNotes() {
        localStorage.setItem(CONFIG.notes.storageKey, this.notes);
        this.updateStatus('saved', 'Sauvegardé');
    }

    clearNotes() {
        if (confirm('Voulez-vous vraiment effacer toutes les notes ?')) {
            this.notes = '';
            this.textarea.value = '';
            this.saveNotes();
            this.countSpan.textContent = 0;
        }
    }

    updateStatus(className, text) {
        if (this.statusSpan) {
            this.statusSpan.className = `notes-status ${className}`;
            this.statusSpan.textContent = text;
        }
    }
}
