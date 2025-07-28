// Module de gestion du bloc-notes avec jsonbin.io
class NotesManager {
    constructor() {
        this.notes = [];
        this.init();
    }

    async init() {
        this.createNotesSection();
        this.setupEventListeners();
        await this.loadNotes();
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
                <div id="notes-history" class="notes-history"><p>Chargement des notes...</p></div>
                <div class="notes-input-area">
                    <textarea id="new-note-input" class="notes-textarea" placeholder="Écrivez une nouvelle note..."></textarea>
                    <button id="send-note-btn" class="notes-btn">Envoyer</button>
                </div>
                 <div class="notes-footer">
                    💡 Les notes sont partagées entre tous les utilisateurs.
                </div>
            </div>`;
        main.appendChild(notesSection);
    }

    setupEventListeners() {
        const sendBtn = document.getElementById('send-note-btn');
        const noteInput = document.getElementById('new-note-input');

        if (sendBtn) sendBtn.addEventListener('click', () => this.sendNote());
        if (noteInput) noteInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendNote();
            }
        });
    }

    async loadNotes() {
        const history = document.getElementById('notes-history');
        try {
            const response = await fetch(`https://api.jsonbin.io/v3/b/${CONFIG.notes.jsonBinBinId}/latest`, {
                headers: { 'X-Master-Key': CONFIG.notes.jsonBinApiKey }
            });
            if (!response.ok) throw new Error('Erreur de chargement');
            const data = await response.json();
            this.notes = data.record.notes || [];
            this.displayAllNotes();
        } catch (error) {
            console.error("Erreur de chargement des notes:", error);
            if(history) history.innerHTML = `<p style="color: var(--danger);">Impossible de charger les notes.</p>`;
        }
    }

    async sendNote() {
        const noteInput = document.getElementById('new-note-input');
        const noteText = noteInput.value.trim();

        if (noteText) {
            const newNote = {
                text: noteText,
                timestamp: new Date().toISOString()
            };
            
            this.notes.push(newNote);
            this.displayNote(newNote);
            noteInput.value = '';

            try {
                await fetch(`https://api.jsonbin.io/v3/b/${CONFIG.notes.jsonBinBinId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Master-Key': CONFIG.notes.jsonBinApiKey
                    },
                    body: JSON.stringify({ notes: this.notes })
                });
            } catch (error) {
                console.error("Erreur de sauvegarde des notes:", error);
                alert("Une erreur est survenue. Votre note n'a peut-être pas été sauvegardée.");
            }
        }
    }
    
    displayAllNotes() {
        const history = document.getElementById('notes-history');
        if (!history) return;
        history.innerHTML = '';
        if (this.notes.length === 0) {
            history.innerHTML = `<p>Aucune note pour le moment. Soyez le premier !</p>`;
        } else {
            this.notes.forEach(note => this.displayNote(note));
        }
    }

    displayNote(note) {
        const history = document.getElementById('notes-history');
        if (!history) return;
        
        // Si le message "aucune note" est présent, on le retire
        const placeholder = history.querySelector('p');
        if (placeholder) placeholder.remove();

        const noteElement = document.createElement('div');
        noteElement.className = 'note-entry';
        
        const date = new Date(note.timestamp);
        const formattedDate = `${date.toLocaleDateString('fr-FR')} à ${date.toLocaleTimeString('fr-FR', {hour: '2-digit', minute:'2-digit'})}`;

        noteElement.innerHTML = `
            <p class="note-text">${this.escapeHTML(note.text)}</p>
            <span class="note-timestamp">${formattedDate}</span>
        `;
        
        history.appendChild(noteElement);
        history.scrollTop = history.scrollHeight;
    }

    escapeHTML(str) {
        return str.replace(/[&<>"']/g, (match) => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
        }[match]));
    }
}
