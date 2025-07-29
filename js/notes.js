// Module de gestion du bloc-notes
class NotesManager {
    constructor() {
        this.notes = localStorage.getItem(CONFIG.notes.storageKey) || '';
        this.autoSaveTimeout = null;
        this.init();
    }
    
    init() {
        this.createNotesSection();
    }
    
    createNotesSection() {
        const main = document.querySelector('main');
        if (!main) return;
        
        const notesSection = document.createElement('section');
        notesSection.id = 'notes-section';
        notesSection.className = 'notes-section';
        notesSection.innerHTML = `
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
                <textarea id="family-notes" class="notes-textarea" placeholder="Partagez vos notes, idées...">${this.notes}</textarea>
                <div class="notes-footer">
                    💡 Vos notes sont sauvegardées automatiquement dans le navigateur.
                </div>
            </div>`;
        main.appendChild(notesSection);
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        const textarea = document.getElementById('family-notes');
        textarea.addEventListener('input', () => this.handleInput());
        document.getElementById('clear-notes').addEventListener('click', () => this.clearNotes());
    }
    
    handleInput() {
        const textarea = document.getElementById('family-notes');
        this.notes = textarea.value;
        document.getElementById('notes-count').textContent = this.notes.length;
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
            document.getElementById('family-notes').value = '';
            this.saveNotes();
            document.getElementById('notes-count').textContent = 0;
        }
    }

    updateStatus(className, text) {
        const status = document.getElementById('notes-status');
        status.className = `notes-status ${className}`;
        status.textContent = text;
    }
}
