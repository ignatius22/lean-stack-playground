// Playground execution engine with sandboxed iframes
class Playground {
  constructor(consoleOutput) {
    this.consoleOutput = consoleOutput;
    this.vanillaIframe = null;
    this.libraryIframe = null;
    this.isRunning = false;
    this.setupMessageListener();
  }

  setupMessageListener() {
    window.addEventListener('message', (event) => {
      // Security check - only accept console messages with expected structure
      if (!event.data || event.data.type !== 'console') {
        return;
      }

      // Validate message structure
      const { level, message, side } = event.data;
      if (level && message && (side === 'vanilla' || side === 'library')) {
        this.consoleOutput[level](message, side);
      }
    });
  }

  createSandboxedIframe() {
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.sandbox = 'allow-scripts';

    // Security: Set restrictive CSP
    iframe.setAttribute('csp', "default-src 'none'; script-src 'unsafe-inline'");

    document.body.appendChild(iframe);
    return iframe;
  }

  destroyIframe(iframe) {
    if (iframe && iframe.parentNode) {
      iframe.parentNode.removeChild(iframe);
    }
  }

  async executeCode(code, side = 'vanilla') {
    return new Promise((resolve, reject) => {
      try {
        // Create new iframe
        const iframe = this.createSandboxedIframe();

        if (side === 'vanilla') {
          this.destroyIframe(this.vanillaIframe);
          this.vanillaIframe = iframe;
        } else {
          this.destroyIframe(this.libraryIframe);
          this.libraryIframe = iframe;
        }

        // Build the HTML content with console interceptor
        const html = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline';">
          </head>
          <body>
            <script>
              ${ConsoleOutput.createInterceptor(side)}

              // Execute user code in try-catch
              (async function() {
                try {
                  ${code}
                } catch (error) {
                  console.error(error.stack || error.message || String(error));
                }
              })();
            </script>
          </body>
          </html>
        `;

        // Use srcdoc to avoid cross-origin issues
        iframe.srcdoc = html;

        // Resolve after a short delay to allow code to execute
        setTimeout(() => {
          resolve();
        }, 50);

      } catch (error) {
        reject(error);
      }
    });
  }

  async runBoth(vanillaCode, libraryCode) {
    if (this.isRunning) {
      console.warn('Already running code...');
      return;
    }

    this.isRunning = true;
    this.consoleOutput.clear();

    try {
      // Measure execution time for vanilla
      const vanillaStart = performance.now();
      await this.executeCode(vanillaCode, 'vanilla');
      const vanillaEnd = performance.now();
      const vanillaTime = vanillaEnd - vanillaStart;

      // Small delay between executions
      await new Promise(resolve => setTimeout(resolve, 100));

      // Measure execution time for library
      const libraryStart = performance.now();
      await this.executeCode(libraryCode, 'library');
      const libraryEnd = performance.now();
      const libraryTime = libraryEnd - libraryStart;

      // Wait a bit for async operations to complete
      await new Promise(resolve => setTimeout(resolve, 500));

      // Display performance comparison
      this.consoleOutput.performance(vanillaTime, libraryTime);

    } catch (error) {
      this.consoleOutput.error(`Execution error: ${error.message}`);
    } finally {
      this.isRunning = false;
    }
  }

  cleanup() {
    this.destroyIframe(this.vanillaIframe);
    this.destroyIframe(this.libraryIframe);
    this.vanillaIframe = null;
    this.libraryIframe = null;
  }

  reset() {
    this.cleanup();
    this.consoleOutput.clear();
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Playground;
}
