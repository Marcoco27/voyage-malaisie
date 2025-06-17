// Module de gestion du bloc-notes partagé
class NotesManager {
    constructor() {
        this.notes = '';
        this.autoSaveTimeout = null;
        this.init();
    }
    
    init() {
        this.loadNotes();
        this.createNotesSection();
        this.setupAutoSave();
    }
    
    createNotesSection() {
        const main = document.querySelector('main');
        if (!main) return;
        
        const notesSection = document.createElement('section');
        notesSection.id = 'notes-section';
        notesSection.className = 'notes-section fade-in';
        notesSection.innerHTML = `
            <div class="title-with-icon">
                <div class="title-icon">📝</div>
                <h2>Bloc-notes Famille</h2>
            </div>
            
            <div class="notes-container">
                <div class="notes-header">
                    <div class="notes-info">
                        <span id="notes-count">0</span> caractères
                        <span id="notes-status" class="notes-status">Sauvegardé</span>
                    </div>
                    <div class="notes-actions">
                        <button id="clear-notes" class="notes-btn clear-btn" title="Effacer tout">
                            🗑️ Effacer
                        </button>
                        <button id="export-notes" class="notes-btn export-btn" title="Exporter">
                            📥 Exporter
                        </button>
                    </div>
                </div>
                
                <textarea 
                    id="family-notes" 
                    class="notes-textarea" 
                    placeholder="Partagez vos notes, idées, découvertes et souvenirs de voyage ici...
                    
🏨 Hôtels recommandés
🍽️ Restaurants à ne pas manquer  
📱 Numéros utiles
💡 Conseils pratiques
📸 Lieux photos parfaits
🎁 Souvenirs à acheter

Tout le monde peut modifier et ajouter du contenu !"
                    maxlength="${CONFIG.notes.maxLength}"></textarea>
                
                <div class="notes-footer">
                    <div class="notes-tips">
                        💡 <strong>Conseils:</strong> Vos notes sont sauvegardées automatiquement. 
                        Utilisez des emojis pour organiser le contenu !
                    </div>
                </div>
            </div>
        `;
        
        main.appendChild(notesSection);
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        const textarea = document.getElementById('family-notes');
        const clearBtn = document.getElementById('clear-notes');
        const exportBtn = document.getElementById('export-notes');
        
        if (textarea) {
            textarea.value = this.notes;
            this.updateCounter();
            
            textarea.addEventListener('input', () => {
                this.handleInput();
            });
            
            textarea.addEventListener('keydown', (e) => {
                // Raccourcis clavier
                if (e.ctrlKey && e.key === 's') {
                    e.preventDefault();
                    this.saveNotes();
                }
            });
        }
        
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                this.clearNotes();
            });
        }
        
        if (exportBtn) {
            exportBtn.addEventListener('click', () => {
                this.exportNotes();
            });
        }
    }
    
    handleInput() {
        const textarea = document.getElementById('family-notes');
        if (!textarea) return;
        
        this.notes = textarea.value;
        this.updateCounter();
        this.showSavingStatus();
        
        // Auto-save après 2 secondes d'inactivité
        if (this.autoSaveTimeout) {
            clearTimeout(this.autoSaveTimeout);
        }
        
        this.autoSaveTimeout = setTimeout(() => {
            this.saveNotes();
        }, 2000);
    }
    
    updateCounter() {
        const counter = document.getElementById('notes-count');
        if (counter) {
            counter.textContent = this.notes.length;
            
            // Changer la couleur selon la limite
            const percentage = (this.notes.length / CONFIG.notes.maxLength) * 100;
            if (percentage > 90) {
                counter.style.color = '#FF7B54';
            } else if (percentage > 75) {
                counter.style.color = '#F6E96B';
            } else {
                counter.style.color = '#6BCF7F';
            }
        }
    }
    
    showSavingStatus() {
        const status = document.getElementById('notes-status');
        if (status) {
            status.textContent = 'Sauvegarde...';
            status.className = 'notes-status saving';
        }
    }
    
    showSavedStatus() {
        const status = document.getElementById('notes-status');
        if (status) {
            status.textContent = 'Sauvegardé';
            status.className = 'notes-status saved';
        }
    }
    
    loadNotes() {
        try {
            const saved = localStorage.getItem(CONFIG.notes.storageKey);
            this.notes = saved || '';
        } catch (error) {
            console.error('Erreur chargement notes:', error);
            this.notes = '';
        }
    }
    
    saveNotes() {
        try {
            localStorage.setItem(CONFIG.notes.storageKey, this.notes);
            this.showSavedStatus();
            
            // Ajouter un petit effet visuel
            const status = document.getElementById('notes-status');
            if (status) {
                status.classList.add('save-flash');
                setTimeout(() => {
                    status.classList.remove('save-flash');
                }, 300);
            }
            
        } catch (error) {
            console.error('Erreur sauvegarde notes:', error);
            const status = document.getElementById('notes-status');
            if (status) {
                status.textContent = 'Erreur sauvegarde';
                status.className = 'notes-status error';
            }
        }
    }
    
    clearNotes() {
        if (confirm('Êtes-vous sûr de vouloir effacer toutes les notes ?')) {
            this.notes = '';
            const textarea = document.getElementById('family-notes');
            if (textarea) {
                textarea.value = '';
            }
            this.updateCounter();
            this.saveNotes();
        }
    }
    
    exportNotes() {
        const blob = new Blob([this.notes], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `notes-voyage-malaisie-${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
    
    setupAutoSave() {
        // Sauvegarder périodiquement (toutes les 30 secondes)
        setInterval(() => {
            if (this.notes) {
                this.saveNotes();
            }
        }, 30000);
    }
}
