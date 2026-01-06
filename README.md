# ⚡ Lean Stack Playground

**Stop Installing Libraries for Simple Features**

An interactive JavaScript playground that lets you edit, execute, and compare vanilla JavaScript patterns against library equivalents in real-time. Built for the [HackerNoon Proof of Usefulness Hackathon](https://hackernoon.com).

🔗 **Live Demo:** [codecraftie.netlify.app](https://codecraftie.netlify.app)

![Lean Stack Playground](https://img.shields.io/badge/Bundle%20Size-95%25%20Smaller-success)
![Dependencies](https://img.shields.io/badge/Dependencies-0-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## 🎯 What Is This?

Lean Stack Playground is an educational tool that demonstrates how vanilla JavaScript patterns can replace entire libraries with **95% less code**. It's designed to help developers:

- 🎓 Learn vanilla JS alternatives to popular libraries
- ⚡ See real performance metrics and bundle size comparisons
- 🧪 Experiment with code in a safe, sandboxed environment
- 🔗 Share discoveries with colleagues and the community
- 📦 Copy production-ready code directly into projects

## ✨ Features

### 🚀 Live Code Execution
- **Dual Monaco editors** for side-by-side comparison
- **Sandboxed iframe execution** with strict CSP policies
- **Real-time console output** capture (logs, errors, warnings)
- **Performance timing** showing actual execution speed
- **Error handling** with helpful stack traces

### 📊 Performance Comparison
- Visual indicators showing which approach is faster
- Bundle size comparison (vanilla vs library)
- Execution time measured in milliseconds
- Percentage difference calculations
- Highlighted performance winners

### 🎨 Pattern Library
Six carefully crafted patterns comparing vanilla JS to popular libraries:

1. **State Management** - Vanilla (2kb) vs Redux (45kb) - *95% smaller*
2. **Component System** - Vanilla (3kb) vs React (42kb) - *93% smaller*
3. **Client-Side Routing** - Vanilla (1.5kb) vs React Router (16kb) - *91% smaller*
4. **HTTP Client** - Vanilla (0.8kb) vs Axios (13kb) - *94% smaller*
5. **Event Bus** - Vanilla (0.5kb) vs EventEmitter (5kb) - *90% smaller*
6. **Form Validation** - Vanilla (2kb) vs Formik (22kb) - *91% smaller*

### 🔗 Sharing & Persistence
- **URL encoding** - Share experiments via shareable links
- **localStorage auto-save** - Never lose your work
- **Copy to clipboard** - One-click code copying
- **Reset functionality** - Restore original patterns

### ⌨️ Developer Experience
- **Keyboard shortcuts** - Cmd/Ctrl+Enter to run code
- **Mobile responsive** - Works on all devices
- **Fast loading** - < 1 second initial load
- **No build step** - Pure HTML/CSS/JavaScript
- **Zero dependencies** - No npm packages required

## 🚀 Quick Start

### Option 1: Open Locally

1. **Clone or download** this repository
2. **Open** `index.html` in your browser
3. **Start coding!** No installation or build step required

```bash
# Clone the repo
git clone https://github.com/ignatius22/lean-stack-playground.git

# Navigate to the directory
cd lean-stack-playground

# Open in browser (macOS)
open index.html

# Or open in browser (Linux)
xdg-open index.html

# Or simply drag index.html into your browser
```

### Option 2: Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy)

1. Click the "Deploy to Netlify" button above
2. Connect your GitHub account
3. Deploy! Your playground will be live in seconds

## 📖 How to Use

### 1. Choose a Pattern
Click on any of the 6 pattern cards to load it into the playground.

### 2. Edit the Code
Both editors are fully editable. Modify the vanilla or library code to experiment.

### 3. Run the Code
Click the **"Run Code"** button or press **Cmd/Ctrl + Enter** to execute both versions.

### 4. Analyze Results
Check the console output for:
- Logged values from `console.log()`
- Error messages with line numbers
- Performance comparison metrics
- Visual indicators of which is faster

### 5. Share Your Discovery
Click **"Share"** to get a URL with your code encoded. Share it on Twitter, in documentation, or with your team.

## 🎮 Keyboard Shortcuts

- **Cmd/Ctrl + Enter** - Run code
- **Cmd/Ctrl + K** - Clear console

## 🏗️ Architecture

### File Structure
```
lean-stack-playground/
├── index.html           # Main HTML page
├── css/
│   └── styles.css      # All styling (responsive, modern)
├── js/
│   ├── app.js          # Main application logic
│   ├── playground.js   # Code execution engine
│   ├── console.js      # Console output handler
│   └── patterns/
│       └── patterns.js # Pattern definitions
└── README.md           # This file
```

### Key Components

#### Playground Engine (`playground.js`)
- Creates sandboxed iframes for secure code execution
- Intercepts console methods to capture output
- Measures execution time with `performance.now()`
- Handles errors gracefully with try-catch
- Destroys and recreates iframes for clean state

#### Console Output (`console.js`)
- Captures and formats console messages
- Color-codes different message types
- Displays performance metrics visually
- Auto-scrolls to latest output
- Escapes HTML to prevent XSS

#### Pattern Data (`patterns/patterns.js`)
Each pattern includes:
- `id` - Unique identifier
- `title` - Display name
- `description` - Brief explanation
- `vanillaSize` - Bundle size for vanilla approach
- `librarySize` - Bundle size for library approach
- `libraryName` - Name of the library being compared
- `vanilla.code` - Executable vanilla JavaScript
- `library.code` - Executable library-style code

## 🔒 Security

### Sandboxed Execution
- Code runs in **isolated iframes** with `sandbox="allow-scripts"`
- **Content Security Policy** restricts script sources
- **No eval()** - All code execution is iframe-based
- **XSS protection** - HTML escaping for console output

### Safe by Design
- Only accepts messages from known iframe sources
- No server-side execution - everything runs client-side
- No data transmission - all sharing via URL encoding
- No cookies or tracking

## 🎨 Customization

### Adding New Patterns

1. Open `js/patterns/patterns.js`
2. Add a new pattern object to the `patterns` array:

```javascript
{
  id: 'your-pattern-id',
  title: 'Your Pattern Name',
  description: 'Brief description',
  vanillaSize: '1kb',
  librarySize: '20kb',
  libraryName: 'LibraryName',
  vanilla: {
    code: `// Your vanilla JS code here
console.log('Hello from vanilla!');`
  },
  library: {
    code: `// Your library-style code here
console.log('Hello from library!');`
  }
}
```

3. Refresh the page - your pattern will appear automatically!

### Customizing Styles

All styles are in `css/styles.css`. Key CSS variables:

```css
:root {
  --primary-purple: #6c5ce7;
  --primary-purple-dark: #5849c7;
  --dark-bg: #0f0f1e;
  --text-primary: #ffffff;
  /* ... more variables */
}
```

## 📊 Success Metrics

Built to achieve "Top 1%" in the hackathon by enabling:

### Usage Metrics
- Code executions per visitor (target: 5+)
- Time on site (target: 5+ minutes)
- Return visitor rate (target: 30%+)
- Shared experiments (tracked via unique URLs)

### Learning Outcomes
- Users can successfully modify patterns
- Clear understanding of performance differences
- Ability to copy and use code immediately

### Social Proof
- Easy sharing on Twitter and other platforms
- "I just saved 40kb" moments
- Developer recommendations

## 🚢 Deployment

### Deploy to Netlify

1. **Via Drag & Drop:**
   - Zip the project folder
   - Go to [Netlify Drop](https://app.netlify.com/drop)
   - Drag and drop the zip file

2. **Via CLI:**
```bash
npm install -g netlify-cli
netlify deploy --prod --dir .
```

3. **Via Git:**
   - Push code to GitHub
   - Connect repository in Netlify dashboard
   - Deploy automatically on every push

### Deploy to Vercel

```bash
npm install -g vercel
vercel --prod
```

### Deploy to GitHub Pages

1. Push code to GitHub repository
2. Go to Settings > Pages
3. Set source to `main` branch, `/root` folder
4. Save and wait for deployment

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Add new patterns** - Show more vanilla alternatives
2. **Improve existing patterns** - Make code clearer or more efficient
3. **Fix bugs** - Report or fix any issues you find
4. **Enhance features** - Add new capabilities
5. **Improve documentation** - Make it easier to understand

## 📝 License

MIT License - feel free to use this in your own projects!

## 🙏 Credits

- Built by **Codecraftie Solutions**
- For the **HackerNoon Proof of Usefulness Hackathon**
- Powered by **Monaco Editor** (VS Code's editor)
- Inspired by developers tired of bloated bundles

## 🔗 Links

- [Live Demo](https://codecraftie.netlify.app)
- [HackerNoon Hackathon](https://hackernoon.com)
- [Monaco Editor](https://microsoft.github.io/monaco-editor/)
- [Report Issues](https://github.com/ignatius22/lean-stack-playground/issues)

## 💡 Philosophy

> "The best dependency is no dependency."

Modern web development has normalized installing dozens of packages for simple tasks. This playground shows there's often a simpler way.

We're not anti-library - libraries are great for complex problems. But for simple state management, routing, or HTTP requests? Vanilla JavaScript is often enough.

**Use this playground to:**
- Learn the fundamentals
- Understand what libraries do under the hood
- Make informed decisions about dependencies
- Ship faster, lighter applications

---

**Built with ❤️ for developers who care about bundle size**

If you find this useful, please ⭐ star the repo and share it with others!
