// Main application logic
class App {
  constructor() {
    this.vanillaEditor = null;
    this.libraryEditor = null;
    this.consoleOutput = null;
    this.playground = null;
    this.currentPattern = null;
    this.patterns = patterns;
    this.autoSaveKey = 'lean-stack-playground-autosave';

    this.init();
  }

  async init() {
    // Wait for Monaco to load
    await this.waitForMonaco();

    // Initialize components
    this.initializeEditors();
    this.initializeConsole();
    this.initializePlayground();
    this.initializeEventListeners();
    this.initializePatternSelector();
    this.initializeKeyboardShortcuts();

    // Load from URL or localStorage or default pattern
    this.loadInitialState();
  }

  waitForMonaco() {
    return new Promise((resolve) => {
      if (window.monaco) {
        resolve();
      } else {
        const checkMonaco = setInterval(() => {
          if (window.monaco) {
            clearInterval(checkMonaco);
            resolve();
          }
        }, 100);
      }
    });
  }

  initializeEditors() {
    // Configure Monaco theme
    monaco.editor.defineTheme('playgroundTheme', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#1a1a2e',
        'editor.lineHighlightBackground': '#2a2a3e',
      }
    });

    // Vanilla editor
    this.vanillaEditor = monaco.editor.create(
      document.getElementById('vanilla-editor'),
      {
        value: '',
        language: 'javascript',
        theme: 'playgroundTheme',
        minimap: { enabled: false },
        fontSize: 14,
        lineNumbers: 'on',
        scrollBeyondLastLine: false,
        automaticLayout: true,
        tabSize: 2,
        wordWrap: 'on'
      }
    );

    // Library editor
    this.libraryEditor = monaco.editor.create(
      document.getElementById('library-editor'),
      {
        value: '',
        language: 'javascript',
        theme: 'playgroundTheme',
        minimap: { enabled: false },
        fontSize: 14,
        lineNumbers: 'on',
        scrollBeyondLastLine: false,
        automaticLayout: true,
        tabSize: 2,
        wordWrap: 'on'
      }
    );

    // Auto-save on change
    this.vanillaEditor.onDidChangeModelContent(() => this.autoSave());
    this.libraryEditor.onDidChangeModelContent(() => this.autoSave());
  }

  initializeConsole() {
    const consoleContainer = document.getElementById('console-output');
    this.consoleOutput = new ConsoleOutput(consoleContainer);
  }

  initializePlayground() {
    this.playground = new Playground(this.consoleOutput);
  }

  initializeEventListeners() {
    // Run button
    document.getElementById('run-btn').addEventListener('click', () => {
      this.runCode();
    });

    // Clear console button
    document.getElementById('clear-console-btn').addEventListener('click', () => {
      this.consoleOutput.clear();
    });

    // Reset button
    document.getElementById('reset-btn').addEventListener('click', () => {
      this.resetToPattern();
    });

    // Share button
    document.getElementById('share-btn').addEventListener('click', () => {
      this.shareCode();
    });

    // Copy buttons
    document.getElementById('copy-vanilla-btn').addEventListener('click', () => {
      this.copyToClipboard(this.vanillaEditor.getValue(), 'Vanilla code');
    });

    document.getElementById('copy-library-btn').addEventListener('click', () => {
      this.copyToClipboard(this.libraryEditor.getValue(), 'Library code');
    });
  }

  initializePatternSelector() {
    const grid = document.getElementById('patterns-grid');

    this.patterns.forEach(pattern => {
      const card = document.createElement('div');
      card.className = 'pattern-card';
      card.innerHTML = `
        <h3>${pattern.title}</h3>
        <p>${pattern.description}</p>
        <div class="pattern-stats">
          <div class="stat">
            <span class="stat-label">Vanilla</span>
            <span class="stat-value">${pattern.vanillaSize}</span>
          </div>
          <div class="stat">
            <span class="stat-label">${pattern.libraryName}</span>
            <span class="stat-value">${pattern.librarySize}</span>
          </div>
        </div>
      `;

      card.addEventListener('click', () => {
        this.loadPattern(pattern);
      });

      grid.appendChild(card);
    });
  }

  initializeKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Cmd/Ctrl + Enter to run code
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        this.runCode();
      }

      // Cmd/Ctrl + K to clear console
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        this.consoleOutput.clear();
      }
    });
  }

  loadPattern(pattern) {
    this.currentPattern = pattern;

    // Update editors safely
    if (this.vanillaEditor && this.libraryEditor) {
      this.vanillaEditor.setValue(pattern.vanilla.code);
      this.libraryEditor.setValue(pattern.library.code);
    }

    // Update UI
    this.updatePatternInfo(pattern);

    // Clear console
    this.consoleOutput.clear();

    // Highlight selected pattern
    document.querySelectorAll('.pattern-card').forEach((card, index) => {
      card.classList.toggle('active', this.patterns[index].id === pattern.id);
    });

    // Auto-save
    this.autoSave();

    // Don't auto-scroll - let user stay where they are
    // The editors are visible from the pattern cards
    console.log('Pattern loaded:', pattern.title);
  }

  updatePatternInfo(pattern) {
    document.getElementById('current-pattern-title').textContent = pattern.title;
    document.getElementById('pattern-description').textContent = pattern.description;

    document.getElementById('vanilla-label').innerHTML = `
      <span class="editor-name">Vanilla JavaScript</span>
      <span class="editor-size">${pattern.vanillaSize}</span>
    `;

    document.getElementById('library-label').innerHTML = `
      <span class="editor-name">${pattern.libraryName}</span>
      <span class="editor-size">${pattern.librarySize}</span>
    `;
  }

  async runCode() {
    const vanillaCode = this.vanillaEditor.getValue();
    const libraryCode = this.libraryEditor.getValue();

    if (!vanillaCode.trim() && !libraryCode.trim()) {
      this.consoleOutput.clear();
      this.consoleOutput.warn('No code to execute', 'vanilla');
      return;
    }

    const runBtn = document.getElementById('run-btn');
    runBtn.disabled = true;
    runBtn.textContent = 'Running...';

    try {
      await this.playground.runBoth(vanillaCode, libraryCode);
    } finally {
      runBtn.disabled = false;
      runBtn.textContent = 'Run Code';
    }
  }

  resetToPattern() {
    if (this.currentPattern) {
      this.loadPattern(this.currentPattern);
    }
  }

  autoSave() {
    const state = {
      patternId: this.currentPattern?.id,
      vanillaCode: this.vanillaEditor.getValue(),
      libraryCode: this.libraryEditor.getValue(),
      timestamp: Date.now()
    };

    localStorage.setItem(this.autoSaveKey, JSON.stringify(state));
  }

  loadFromAutoSave() {
    try {
      const saved = localStorage.getItem(this.autoSaveKey);
      if (!saved) return false;

      const state = JSON.parse(saved);

      // Find the pattern
      const pattern = this.patterns.find(p => p.id === state.patternId);
      if (!pattern) return false;

      // Load the pattern first
      this.currentPattern = pattern;
      this.updatePatternInfo(pattern);

      // Then set the saved code
      this.vanillaEditor.setValue(state.vanillaCode);
      this.libraryEditor.setValue(state.libraryCode);

      // Highlight selected pattern
      document.querySelectorAll('.pattern-card').forEach((card, index) => {
        card.classList.toggle('active', this.patterns[index].id === pattern.id);
      });

      return true;
    } catch (error) {
      console.error('Failed to load autosave:', error);
      return false;
    }
  }

  shareCode() {
    const state = {
      p: this.currentPattern?.id,
      v: this.compressCode(this.vanillaEditor.getValue()),
      l: this.compressCode(this.libraryEditor.getValue())
    };

    const encoded = btoa(JSON.stringify(state));
    const url = `${window.location.origin}${window.location.pathname}?code=${encoded}`;

    this.copyToClipboard(url, 'Share link');

    // Show feedback
    const shareBtn = document.getElementById('share-btn');
    const originalText = shareBtn.textContent;
    shareBtn.textContent = '✓ Link Copied!';
    setTimeout(() => {
      shareBtn.textContent = originalText;
    }, 2000);
  }

  loadFromURL() {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (!code) return false;

    try {
      const state = JSON.parse(atob(code));

      // Find the pattern
      const pattern = this.patterns.find(p => p.id === state.p);
      if (!pattern) return false;

      // Load the pattern first
      this.currentPattern = pattern;
      this.updatePatternInfo(pattern);

      // Then set the code
      this.vanillaEditor.setValue(this.decompressCode(state.v));
      this.libraryEditor.setValue(this.decompressCode(state.l));

      // Highlight selected pattern
      document.querySelectorAll('.pattern-card').forEach((card, index) => {
        card.classList.toggle('active', this.patterns[index].id === pattern.id);
      });

      return true;
    } catch (error) {
      console.error('Failed to load from URL:', error);
      return false;
    }
  }

  loadInitialState() {
    // Priority: URL > AutoSave > Default Pattern
    if (this.loadFromURL()) {
      console.log('Loaded from URL');
    } else if (this.loadFromAutoSave()) {
      console.log('Loaded from autosave');
    } else {
      // Load first pattern by default
      this.loadPattern(this.patterns[0]);
    }
  }

  compressCode(code) {
    // Simple compression: just return the code for now
    // Could implement LZString or similar for better compression
    return code;
  }

  decompressCode(code) {
    return code;
  }

  async copyToClipboard(text, label = 'Content') {
    try {
      await navigator.clipboard.writeText(text);
      this.showToast(`${label} copied to clipboard!`);
    } catch (error) {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      this.showToast(`${label} copied to clipboard!`);
    }
  }

  showToast(message) {
    // Create toast element if it doesn't exist
    let toast = document.getElementById('toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast';
      toast.className = 'toast';
      document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new App());
} else {
  new App();
}
