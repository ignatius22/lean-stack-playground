# 🤝 Contributing to Lean Stack Playground

Thank you for your interest in contributing! This guide will help you add new patterns, fix bugs, or improve the playground.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Adding New Patterns](#adding-new-patterns)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Submitting Changes](#submitting-changes)

## 📜 Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for all. Please be respectful and constructive in all interactions.

### Expected Behavior

- Use welcoming and inclusive language
- Respect differing viewpoints and experiences
- Accept constructive criticism gracefully
- Focus on what's best for the community

## 🎯 How Can I Contribute?

### 1. Adding New Patterns

The most valuable contribution is adding new pattern comparisons showing vanilla JS alternatives to popular libraries.

**Good pattern candidates:**
- Popular libraries (10k+ npm downloads/week)
- Simple functionality that can be replicated in vanilla JS
- Clear performance or bundle size benefits
- Educational value for developers

**Examples:**
- Date formatting (Moment.js vs vanilla)
- Deep cloning (Lodash vs vanilla)
- Query string parsing (qs vs vanilla)
- Debouncing/throttling (Lodash vs vanilla)
- Local storage wrapper (store.js vs vanilla)
- UUID generation (uuid vs vanilla)

### 2. Improving Existing Patterns

- Make code clearer or more elegant
- Add better examples
- Improve comments and explanations
- Fix bugs in pattern code

### 3. Enhancing Features

- Improve UI/UX
- Add new playground features
- Optimize performance
- Fix bugs

### 4. Documentation

- Improve README clarity
- Add tutorials or guides
- Fix typos or errors
- Translate to other languages

## ➕ Adding New Patterns

### Step 1: Choose Your Pattern

Identify a library-vs-vanilla comparison that would be educational and useful.

**Checklist:**
- [ ] Library is popular (check npm downloads)
- [ ] Vanilla alternative is realistic (not overly complex)
- [ ] Performance/size difference is significant
- [ ] Code can execute in browser sandbox
- [ ] Educational value is clear

### Step 2: Research Bundle Sizes

Use [Bundlephobia](https://bundlephobia.com) to get accurate library sizes:

```
https://bundlephobia.com/package/[library-name]
```

For vanilla code, estimate based on minified code length.

### Step 3: Write Executable Code

Both vanilla and library versions must:
- Execute without errors in browser
- Produce visible console output
- Complete within 1-2 seconds
- Demonstrate the pattern clearly
- Include comments explaining key concepts

**Template:**

```javascript
// Vanilla version
const vanilla = {
  code: `// Brief description of what this does
function yourPattern() {
  // Implementation here
}

// Test/demo code
console.log('Starting test...');
yourPattern();
console.log('✓ Vanilla pattern complete');`
}

// Library version
const library = {
  code: `// Library-style implementation
// Simulating how [LibraryName] works
const libraryPattern = () => {
  // Implementation here
}

// Test/demo code
console.log('Starting test...');
libraryPattern();
console.log('✓ Library pattern complete');`
}
```

### Step 4: Add Pattern to patterns.js

Edit `/js/patterns/patterns.js` and add your pattern to the array:

```javascript
{
  id: 'your-pattern-id',  // lowercase-with-hyphens
  title: 'Pattern Name',  // Display name
  description: 'Brief description - XX% smaller than LibraryName',
  vanillaSize: 'Xkb',     // Minified size
  librarySize: 'Xkb',     // From bundlephobia
  libraryName: 'LibraryName',
  vanilla: {
    code: `// Your vanilla code here`
  },
  library: {
    code: `// Your library-style code here`
  }
}
```

### Step 5: Test Your Pattern

1. Open `index.html` in browser
2. Click on your new pattern card
3. Verify both editors load correctly
4. Click "Run Code"
5. Check console output is clear and helpful
6. Verify performance metrics display
7. Test on mobile device
8. Check for console errors

### Step 6: Document Your Pattern

Add a comment block above your pattern explaining:
- What problem it solves
- Why vanilla is viable
- Any limitations or trade-offs
- When to use library vs vanilla

**Example:**

```javascript
/**
 * PATTERN: Deep Cloning
 *
 * Problem: Cloning nested objects without reference issues
 * Library: Lodash.cloneDeep (24kb)
 * Vanilla: structuredClone() (built-in, 0kb)
 *
 * Trade-offs:
 * - Vanilla: Limited to cloneable types, no functions
 * - Library: More flexible, handles edge cases
 *
 * When to use vanilla: Most object cloning scenarios
 * When to use library: Need to clone functions or special types
 */
```

## 🛠️ Development Setup

### Prerequisites

None! This project has zero dependencies.

### Local Development

1. **Clone repository:**
```bash
git clone https://github.com/yourusername/lean-stack-playground.git
cd lean-stack-playground
```

2. **Open in browser:**
```bash
open index.html
# or
python -m http.server 8000  # Then visit http://localhost:8000
```

3. **Make changes:**
   - Edit files in your favorite editor
   - Refresh browser to see changes
   - Check browser console for errors

### File Structure

```
lean-stack-playground/
├── index.html              # Main page (modify rarely)
├── css/
│   └── styles.css         # All styles
├── js/
│   ├── app.js             # Main app logic
│   ├── playground.js      # Execution engine (modify rarely)
│   ├── console.js         # Console handler (modify rarely)
│   └── patterns/
│       └── patterns.js    # ADD NEW PATTERNS HERE
├── README.md
├── CONTRIBUTING.md        # This file
├── DEPLOYMENT.md
├── TESTING.md
└── netlify.toml
```

**Where to make changes:**
- **New patterns:** `js/patterns/patterns.js`
- **Styling:** `css/styles.css`
- **New features:** Depends on feature (usually `js/app.js`)
- **Bug fixes:** Find the relevant file

## 📏 Coding Standards

### JavaScript Style

- Use modern ES6+ syntax
- Prefer `const` over `let`, avoid `var`
- Use arrow functions for callbacks
- Use template literals for strings with variables
- Add comments for complex logic
- Keep functions small and focused

**Example:**

```javascript
// Good ✅
const greet = (name) => {
  console.log(`Hello, ${name}!`);
};

// Avoid ❌
var greet = function(name) {
  console.log('Hello, ' + name + '!');
}
```

### Pattern Code Style

- Start with comments explaining what you're demonstrating
- Use descriptive variable names
- Include test/demo code that produces output
- End with a success message (e.g., `✓ Pattern complete`)
- Keep code runnable - no placeholders or TODOs

**Example:**

```javascript
code: `// Demonstrates event delegation pattern
const container = document.createElement('div');

// Single listener handles all clicks
container.addEventListener('click', (e) => {
  if (e.target.matches('.btn')) {
    console.log('Button clicked:', e.target.textContent);
  }
});

// Simulate clicks
console.log('Testing event delegation...');
const btn = document.createElement('button');
btn.className = 'btn';
btn.textContent = 'Click me';
container.appendChild(btn);
btn.click();

console.log('✓ Event delegation complete');`
```

### CSS Style

- Use CSS custom properties (variables)
- Follow existing naming conventions
- Keep selectors specific but not overly nested
- Add comments for sections
- Maintain responsive design

### HTML Style

- Use semantic HTML5 elements
- Include proper ARIA labels
- Keep structure clean and minimal
- Follow existing patterns

## 🧪 Testing Guidelines

Before submitting your contribution:

### Manual Testing

- [ ] Pattern loads correctly
- [ ] Both editors populate with code
- [ ] "Run Code" executes without errors
- [ ] Console output is clear and helpful
- [ ] Performance metrics display
- [ ] Works on mobile
- [ ] No browser console errors
- [ ] Share URL works with your pattern

### Code Review Checklist

- [ ] Code follows style guidelines
- [ ] Comments explain complex logic
- [ ] No console.log debugging statements (except pattern demo code)
- [ ] Variable names are descriptive
- [ ] No hardcoded values that should be configurable
- [ ] Error cases are handled
- [ ] Code is DRY (Don't Repeat Yourself)

## 📤 Submitting Changes

### 1. Fork and Branch

```bash
# Fork the repository on GitHub, then:
git clone https://github.com/YOUR_USERNAME/lean-stack-playground.git
cd lean-stack-playground

# Create a branch
git checkout -b feature/your-pattern-name
# or
git checkout -b fix/bug-description
```

### 2. Make Changes

- Edit files following coding standards
- Test thoroughly
- Commit logical chunks of work

### 3. Commit

Write clear commit messages:

```bash
# Good commit messages ✅
git commit -m "Add deep cloning pattern (vanilla vs Lodash)"
git commit -m "Fix console output escaping bug"
git commit -m "Improve mobile responsive layout"

# Poor commit messages ❌
git commit -m "updates"
git commit -m "fix stuff"
git commit -m "wip"
```

### 4. Push

```bash
git push origin feature/your-pattern-name
```

### 5. Create Pull Request

1. Go to GitHub repository
2. Click "New Pull Request"
3. Select your branch
4. Fill out PR template:

```markdown
## Description
Brief description of what this PR does

## Type of Change
- [ ] New pattern
- [ ] Bug fix
- [ ] Feature enhancement
- [ ] Documentation update

## Testing
- [ ] Tested in Chrome
- [ ] Tested in Firefox
- [ ] Tested in Safari
- [ ] Tested on mobile
- [ ] No console errors

## Screenshots (if applicable)
Add screenshots showing your changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Code is well-commented
- [ ] Changes are documented
- [ ] All tests pass
```

### 6. Review Process

- Maintainers will review your PR
- Address any feedback
- Once approved, your PR will be merged!

## 🎨 Pattern Ideas

Looking for inspiration? Here are patterns we'd love to see:

### High Priority
- [ ] Date formatting (Moment.js vs vanilla)
- [ ] Deep cloning (Lodash vs structuredClone)
- [ ] Query strings (qs vs URLSearchParams)
- [ ] Debounce/throttle (Lodash vs vanilla)
- [ ] UUID generation (uuid vs vanilla)
- [ ] Cookie handling (js-cookie vs vanilla)
- [ ] Array utilities (Lodash vs vanilla array methods)
- [ ] Object utilities (Lodash vs vanilla spread/rest)

### Medium Priority
- [ ] Markdown parsing (marked vs simple parser)
- [ ] Animation (GSAP vs Web Animations API)
- [ ] Drag and drop (interact.js vs vanilla)
- [ ] File upload (dropzone vs vanilla)
- [ ] Toast notifications (toastify vs vanilla)
- [ ] Modal dialogs (sweetalert vs vanilla)

### Future Ideas
- [ ] Virtual scrolling
- [ ] Infinite scroll
- [ ] Image lazy loading
- [ ] Autocomplete
- [ ] Color picker
- [ ] Date picker

## 💡 Tips for Great Contributions

### Do ✅

- Keep patterns simple and focused
- Use realistic examples
- Include helpful comments
- Test thoroughly before submitting
- Make console output informative
- Show clear performance benefits
- Respond to PR feedback promptly

### Don't ❌

- Add dependencies or build tools
- Make code overly complex
- Leave debugging code
- Change unrelated files
- Submit untested code
- Ignore coding standards
- Create massive PRs (break into smaller ones)

## 📞 Questions?

Need help or have questions?

- **Open an issue** on GitHub
- **Start a discussion** in GitHub Discussions
- **Email:** codecraftie@example.com

## 🙏 Recognition

All contributors will be:
- Listed in README.md
- Credited in release notes
- Thanked publicly on social media

Thank you for making Lean Stack Playground better! 🎉

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.
