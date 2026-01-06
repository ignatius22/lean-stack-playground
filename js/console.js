// Console output handler for the playground
class ConsoleOutput {
  constructor(containerElement) {
    this.container = containerElement;
    this.messages = [];
  }

  clear() {
    this.messages = [];
    this.render();
  }

  log(message, type = 'log', side = 'vanilla') {
    this.messages.push({
      message,
      type,
      side,
      timestamp: Date.now()
    });
    this.render();
  }

  error(message, side = 'vanilla') {
    this.log(message, 'error', side);
  }

  warn(message, side = 'vanilla') {
    this.log(message, 'warn', side);
  }

  info(message, side = 'vanilla') {
    this.log(message, 'info', side);
  }

  performance(vanillaTime, libraryTime) {
    const diff = libraryTime - vanillaTime;
    const percentage = ((diff / libraryTime) * 100).toFixed(1);
    const faster = vanillaTime < libraryTime ? 'vanilla' : 'library';

    this.messages.push({
      message: {
        vanillaTime,
        libraryTime,
        diff: Math.abs(diff),
        percentage: Math.abs(percentage),
        faster
      },
      type: 'performance',
      timestamp: Date.now()
    });
    this.render();
  }

  formatMessage(msg) {
    if (typeof msg === 'object' && msg !== null) {
      try {
        return JSON.stringify(msg, null, 2);
      } catch (e) {
        return String(msg);
      }
    }
    return String(msg);
  }

  getTypeIcon(type) {
    const icons = {
      log: '📝',
      error: '❌',
      warn: '⚠️',
      info: 'ℹ️',
      performance: '⚡'
    };
    return icons[type] || '📝';
  }

  getTypeClass(type) {
    return `console-${type}`;
  }

  renderPerformanceMessage(data) {
    const { vanillaTime, libraryTime, diff, percentage, faster } = data;

    return `
      <div class="performance-message">
        <div class="performance-header">
          <span class="performance-icon">⚡</span>
          <span class="performance-title">Performance Comparison</span>
        </div>
        <div class="performance-details">
          <div class="performance-row">
            <span class="label">Vanilla JS:</span>
            <span class="value ${faster === 'vanilla' ? 'faster' : ''}">${vanillaTime.toFixed(2)}ms</span>
          </div>
          <div class="performance-row">
            <span class="label">Library:</span>
            <span class="value ${faster === 'library' ? 'faster' : ''}">${libraryTime.toFixed(2)}ms</span>
          </div>
          <div class="performance-row highlight">
            <span class="label">Difference:</span>
            <span class="value">${percentage}% ${faster === 'vanilla' ? 'faster' : 'slower'}</span>
          </div>
        </div>
      </div>
    `;
  }

  render() {
    if (!this.container) return;

    if (this.messages.length === 0) {
      this.container.innerHTML = `
        <div class="console-empty">
          <span class="console-empty-icon">💡</span>
          <p>Click "Run Code" to see console output and performance metrics</p>
        </div>
      `;
      return;
    }

    const messagesHTML = this.messages.map((item, index) => {
      if (item.type === 'performance') {
        return this.renderPerformanceMessage(item.message);
      }

      const sideClass = item.side === 'vanilla' ? 'side-vanilla' : 'side-library';
      const typeClass = this.getTypeClass(item.type);
      const icon = this.getTypeIcon(item.type);
      const message = this.formatMessage(item.message);

      return `
        <div class="console-message ${typeClass} ${sideClass}" data-index="${index}">
          <span class="console-icon">${icon}</span>
          <span class="console-side-badge">${item.side}</span>
          <pre class="console-text">${this.escapeHtml(message)}</pre>
        </div>
      `;
    }).join('');

    this.container.innerHTML = messagesHTML;

    // Auto-scroll to bottom
    this.container.scrollTop = this.container.scrollHeight;
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Method to create console interceptor for iframe
  static createInterceptor(side, onMessage) {
    return `
      (function() {
        const originalConsole = {
          log: console.log,
          error: console.error,
          warn: console.warn,
          info: console.info
        };

        function sendMessage(type, args) {
          const message = args.map(arg => {
            if (typeof arg === 'object' && arg !== null) {
              try {
                return JSON.stringify(arg, null, 2);
              } catch (e) {
                return String(arg);
              }
            }
            return String(arg);
          }).join(' ');

          window.parent.postMessage({
            type: 'console',
            level: type,
            message: message,
            side: '${side}'
          }, '*');
        }

        console.log = function(...args) {
          originalConsole.log.apply(console, args);
          sendMessage('log', args);
        };

        console.error = function(...args) {
          originalConsole.error.apply(console, args);
          sendMessage('error', args);
        };

        console.warn = function(...args) {
          originalConsole.warn.apply(console, args);
          sendMessage('warn', args);
        };

        console.info = function(...args) {
          originalConsole.info.apply(console, args);
          sendMessage('info', args);
        };

        // Catch runtime errors
        window.addEventListener('error', function(e) {
          const errorMsg = e.error ?
            e.error.stack || e.error.message :
            e.message + ' (Line ' + e.lineno + ')';

          sendMessage('error', [errorMsg]);
          e.preventDefault();
        });

        // Catch unhandled promise rejections
        window.addEventListener('unhandledrejection', function(e) {
          sendMessage('error', ['Unhandled Promise Rejection:', e.reason]);
          e.preventDefault();
        });
      })();
    `;
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ConsoleOutput;
}
