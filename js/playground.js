// Playground execution engine with sandboxed iframes
class Playground {
  constructor(consoleOutput) {
    this.consoleOutput = consoleOutput;
    this.vanillaIframe = null;
    this.libraryIframe = null;
    this.isRunning = false;
    this.vanillaExecutionTime = 0;
    this.libraryExecutionTime = 0;
    this.setupMessageListener();
  }

  setupMessageListener() {
    window.addEventListener('message', (event) => {
      // Security check - only accept messages with expected structure
      if (!event.data || !event.data.type) {
        return;
      }

      // Handle console messages
      if (event.data.type === 'console') {
        const { level, message, side } = event.data;
        if (level && message && (side === 'vanilla' || side === 'library')) {
          this.consoleOutput[level](message, side);
        }
      }

      // Handle performance timing messages
      if (event.data.type === 'performance') {
        const { side, time } = event.data;
        if (side === 'vanilla') {
          this.vanillaExecutionTime = time;
        } else if (side === 'library') {
          this.libraryExecutionTime = time;
        }
      }
    });
  }

  createSandboxedIframe() {
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    // allow-same-origin is needed for the iframe to access its own document
    iframe.sandbox = 'allow-scripts allow-same-origin';

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

        // Build the HTML content with console interceptor and performance timing
        const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
</head>
<body>
  <script>
    ${ConsoleOutput.createInterceptor(side)}

    // Execute user code with performance timing
    (async function() {
      const startTime = performance.now();
      try {
        ${code}
      } catch (error) {
        console.error(error.stack || error.message || String(error));
      } finally {
        // Wait a bit for async operations to complete, then send timing
        setTimeout(() => {
          const endTime = performance.now();
          const executionTime = endTime - startTime;
          window.parent.postMessage({
            type: 'performance',
            side: '${side}',
            time: executionTime
          }, '*');
        }, 50);
      }
    })();
  </script>
</body>
</html>`;

        // Use srcdoc - this is safe since we never access contentWindow/contentDocument
        iframe.srcdoc = html;

        // Resolve after a short delay to allow code to execute
        setTimeout(() => {
          resolve();
        }, 100);

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

    // Reset timing
    this.vanillaExecutionTime = 0;
    this.libraryExecutionTime = 0;

    try {
      // Execute vanilla code
      await this.executeCode(vanillaCode, 'vanilla');

      // Small delay between executions
      await new Promise(resolve => setTimeout(resolve, 100));

      // Execute library code
      await this.executeCode(libraryCode, 'library');

      // Wait for async operations and timing messages to arrive
      await new Promise(resolve => setTimeout(resolve, 600));

      // Display performance comparison using actual execution times from iframes
      this.consoleOutput.performance(this.vanillaExecutionTime, this.libraryExecutionTime);

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
