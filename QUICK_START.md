# ⚡ Quick Start Guide

Get started with Lean Stack Playground in 60 seconds!

## 🚀 Three Ways to Run

### 1. Double-Click Method (Easiest)
```bash
# Just double-click index.html in Finder/Explorer
# Opens in your default browser instantly!
```

### 2. Local Server Method (Recommended)
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js
npx http-server

# Then open: http://localhost:8000
```

### 3. Deploy to Netlify (Production)
```bash
# Drag & drop the folder at: netlify.com/drop
# Or use CLI:
netlify deploy --prod --dir .
```

## 🎯 Quick Tour (30 seconds)

1. **Choose a pattern** - Click any of the 6 cards
2. **Edit the code** - Modify either editor
3. **Run it** - Click "Run Code" or press Cmd/Ctrl+Enter
4. **See results** - Check console output and performance metrics

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Cmd/Ctrl + Enter` | Run code |
| `Cmd/Ctrl + K` | Clear console |

## 🎨 Main Features

### Top Bar Actions
- **🔄 Reset** - Restore original pattern code
- **🔗 Share** - Copy shareable URL to clipboard
- **▶️ Run Code** - Execute both versions

### Editor Actions
- **📋 Copy** - Copy code to clipboard (top-right of each editor)

### Console Actions
- **🗑️ Clear** - Clear console output (top-right of console)

## 📚 Pattern Overview

All 6 patterns are ready to explore:

1. **State Management** (2kb vs 45kb) - 95% smaller
2. **Component System** (3kb vs 42kb) - 93% smaller
3. **Client-Side Routing** (1.5kb vs 16kb) - 91% smaller
4. **HTTP Client** (0.8kb vs 13kb) - 94% smaller
5. **Event Bus** (0.5kb vs 5kb) - 90% smaller
6. **Form Validation** (2kb vs 22kb) - 91% smaller

## 🎓 How to Learn

### Step 1: Run Original
Click a pattern → Click "Run Code" → See how it works

### Step 2: Modify Code
Change values, add logs, experiment freely

### Step 3: Compare
Look at performance metrics - which is faster?

### Step 4: Copy & Use
Found something useful? Click copy button → Paste in your project

## 💾 Auto-Save

Your work is automatically saved to browser localStorage:
- Switch between patterns - your edits persist
- Refresh page - your code is still there
- Close tab - come back anytime

## 🔗 Sharing

1. Make your changes
2. Click "🔗 Share"
3. Link copied to clipboard!
4. Send to colleagues, post on Twitter, save in docs

## 📱 Mobile Support

Works great on phones/tablets:
- Editors stack vertically
- Console output readable
- All buttons accessible
- Pinch to zoom in editors

## 🐛 Troubleshooting

### Monaco Editor Not Loading?
- Check internet connection (Monaco loads from CDN)
- Wait a few seconds for initial load
- Check browser console for errors

### Code Not Running?
- Look for syntax errors in console
- Check if "Run Code" button is enabled
- Try resetting to original pattern

### Share Link Not Working?
- Make sure you clicked "Share" (not just copied URL)
- Check clipboard permissions in browser
- Try copying from address bar after share

## 📖 Documentation

Quick links:

- **[README.md](README.md)** - Full documentation
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - How to deploy
- **[TESTING.md](TESTING.md)** - Testing checklist
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Add patterns
- **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Project overview

## 🎯 Common Tasks

### Add a New Pattern
1. Open `js/patterns/patterns.js`
2. Copy an existing pattern object
3. Modify the code, sizes, and description
4. Refresh browser - new pattern appears!

### Change Colors
1. Open `css/styles.css`
2. Modify CSS variables at the top:
```css
:root {
  --primary-purple: #6c5ce7;  /* Change this */
  --dark-bg: #0f0f1e;         /* Or this */
}
```

### Customize Hero
1. Open `index.html`
2. Find the `<section class="hero">` section
3. Edit text, add your branding

## 🚀 Deploy in 5 Minutes

### Option A: Netlify (Easiest)
1. Go to [netlify.com/drop](https://netlify.com/drop)
2. Drag the whole folder
3. Done! Your site is live

### Option B: GitHub + Netlify
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_REPO_URL
git push -u origin main

# Then connect repo in Netlify dashboard
```

### Option C: GitHub Pages
1. Push to GitHub
2. Settings → Pages → Enable
3. Select main branch, root folder
4. Save → Live in 2 minutes!

## 💡 Pro Tips

1. **Use keyboard shortcuts** - Much faster than clicking
2. **Experiment freely** - Reset button brings back original
3. **Share discoveries** - Help others learn
4. **Read the code** - Patterns are production-ready
5. **Check console** - Errors show helpful messages

## 🎨 Customization Ideas

- Change color scheme in `styles.css`
- Add your company logo to hero
- Include analytics in `index.html`
- Add more patterns in `patterns.js`
- Customize footer links

## 📞 Need Help?

- **GitHub Issues:** [Report bugs here](https://github.com/yourusername/lean-stack-playground/issues)
- **Email:** codecraftie@example.com
- **Docs:** Read [README.md](README.md)

## ⭐ Like It?

- Star the repo on GitHub
- Share on Twitter
- Tell your developer friends
- Submit new patterns
- Write a blog post about it

---

**You're ready! Pick a pattern and start exploring! 🚀**
