// Pattern definitions for the playground
const patterns = [
  {
    id: 'state-management',
    title: 'State Management',
    description: 'Reactive state with subscribers - 95% smaller than Redux',
    vanillaSize: '2kb',
    librarySize: '45kb',
    libraryName: 'Redux',
    vanilla: {
      code: `// Lightweight state management with factory function
function createStore(initialState) {
  let state = initialState;
  const listeners = [];

  return {
    getState: () => state,
    setState: (updates) => {
      state = { ...state, ...updates };
      listeners.forEach(listener => listener(state));
    },
    subscribe: (listener) => {
      listeners.push(listener);
      return () => {
        const index = listeners.indexOf(listener);
        listeners.splice(index, 1);
      };
    }
  };
}

// Test it out
const store = createStore({ count: 0, user: 'Alice' });

console.log('Initial state:', store.getState());

const unsubscribe = store.subscribe((state) => {
  console.log('State updated:', state);
});

store.setState({ count: 1 });
store.setState({ count: 2, user: 'Bob' });
store.setState({ count: 3 });

console.log('Final state:', store.getState());
console.log('✓ Vanilla state management complete');`
    },
    library: {
      code: `// Redux-style state management
const initialState = { count: 0, user: 'Alice' };
let state = initialState;
const listeners = [];

function reducer(state, action) {
  switch (action.type) {
    case 'SET_COUNT':
      return { ...state, count: action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'UPDATE_BOTH':
      return {
        ...state,
        count: action.payload.count,
        user: action.payload.user
      };
    default:
      return state;
  }
}

function dispatch(action) {
  state = reducer(state, action);
  listeners.forEach(listener => listener(state));
}

function subscribe(listener) {
  listeners.push(listener);
}

function getState() {
  return state;
}

// Test it out
console.log('Initial state:', getState());

subscribe((state) => {
  console.log('State updated:', state);
});

dispatch({ type: 'SET_COUNT', payload: 1 });
dispatch({ type: 'UPDATE_BOTH', payload: { count: 2, user: 'Bob' } });
dispatch({ type: 'SET_COUNT', payload: 3 });

console.log('Final state:', getState());
console.log('✓ Redux-style state management complete');`
    }
  },
  {
    id: 'component-system',
    title: 'Component System',
    description: 'Reusable UI components - 93% smaller than React',
    vanillaSize: '3kb',
    librarySize: '42kb',
    libraryName: 'React',
    vanilla: {
      code: `// Simple component system with state and lifecycle
function component(element, initialState = {}) {
  let state = initialState;

  const render = (template) => {
    element.innerHTML = template;
    return element;
  };

  const setState = (updates) => {
    state = { ...state, ...updates };
    if (component.onUpdate) {
      component.onUpdate(state);
    }
  };

  const getState = () => state;

  return { render, setState, getState };
}

// Create a counter component
const container = document.createElement('div');
const counter = component(container, { count: 0 });

counter.onUpdate = (state) => {
  console.log('Component updated:', state);
  counter.render(\`
    <div>
      <h3>Count: \${state.count}</h3>
      <p>Status: \${state.count > 5 ? 'High' : 'Low'}</p>
    </div>
  \`);
};

// Initial render
counter.render('<div><h3>Count: 0</h3><p>Status: Low</p></div>');
console.log('Component mounted');

// Simulate updates
setTimeout(() => counter.setState({ count: 3 }), 100);
setTimeout(() => counter.setState({ count: 7 }), 200);
setTimeout(() => console.log('✓ Component lifecycle complete'), 300);`
    },
    library: {
      code: `// React-style component with hooks simulation
let currentState;
let currentComponent;

function useState(initialValue) {
  if (currentState === undefined) {
    currentState = initialValue;
  }

  const setState = (newValue) => {
    currentState = newValue;
    if (currentComponent && currentComponent.onUpdate) {
      currentComponent.onUpdate();
    }
  };

  return [currentState, setState];
}

function Counter() {
  const [count, setCount] = useState(0);

  const render = () => {
    console.log('Component updated:', { count });
    return \`
      <div>
        <h3>Count: \${count}</h3>
        <p>Status: \${count > 5 ? 'High' : 'Low'}</p>
      </div>
    \`;
  };

  return { render, setCount };
}

// Mount component
currentComponent = Counter();
console.log('Component mounted');
console.log(currentComponent.render());

// Simulate updates
currentComponent.onUpdate = () => {
  console.log(currentComponent.render());
};

setTimeout(() => currentComponent.setCount(3), 100);
setTimeout(() => currentComponent.setCount(7), 200);
setTimeout(() => console.log('✓ React-style component complete'), 300);`
    }
  },
  {
    id: 'routing',
    title: 'Client-Side Routing',
    description: 'Hash-based navigation - 91% smaller than React Router',
    vanillaSize: '1.5kb',
    librarySize: '16kb',
    libraryName: 'React Router',
    vanilla: {
      code: `// Lightweight hash-based router
class Router {
  constructor() {
    this.routes = {};
    this.currentRoute = null;

    window.addEventListener('hashchange', () => this.handleRoute());
    this.handleRoute();
  }

  addRoute(path, handler) {
    this.routes[path] = handler;
    return this;
  }

  handleRoute() {
    const hash = window.location.hash.slice(1) || '/';
    this.currentRoute = hash;

    const handler = this.routes[hash] || this.routes['/'];
    if (handler) {
      handler(hash);
    }
  }

  navigate(path) {
    window.location.hash = path;
  }
}

// Setup router
const router = new Router();

router
  .addRoute('/', () => console.log('📍 Route: Home page'))
  .addRoute('/about', () => console.log('📍 Route: About page'))
  .addRoute('/contact', () => console.log('📍 Route: Contact page'));

// Simulate navigation
console.log('Starting navigation test...');
setTimeout(() => router.navigate('/about'), 100);
setTimeout(() => router.navigate('/contact'), 200);
setTimeout(() => router.navigate('/'), 300);
setTimeout(() => console.log('✓ Routing complete'), 400);`
    },
    library: {
      code: `// React Router-style navigation
class Route {
  constructor(path, component) {
    this.path = path;
    this.component = component;
  }

  matches(currentPath) {
    return this.path === currentPath;
  }
}

class BrowserRouter {
  constructor() {
    this.routes = [];
    this.history = [];
    this.currentPath = '/';

    window.addEventListener('hashchange', () => {
      this.currentPath = window.location.hash.slice(1) || '/';
      this.render();
    });
  }

  addRoute(path, component) {
    this.routes.push(new Route(path, component));
    return this;
  }

  push(path) {
    this.history.push(this.currentPath);
    window.location.hash = path;
  }

  render() {
    const route = this.routes.find(r => r.matches(this.currentPath));
    if (route) {
      route.component();
    }
  }
}

// Setup router
const router = new BrowserRouter();

router
  .addRoute('/', () => console.log('📍 Route: Home page'))
  .addRoute('/about', () => console.log('📍 Route: About page'))
  .addRoute('/contact', () => console.log('📍 Route: Contact page'));

// Simulate navigation
console.log('Starting navigation test...');
setTimeout(() => router.push('/about'), 100);
setTimeout(() => router.push('/contact'), 200);
setTimeout(() => router.push('/'), 300);
setTimeout(() => console.log('✓ React Router-style complete'), 400);`
    }
  },
  {
    id: 'http-client',
    title: 'HTTP Client',
    description: 'Fetch wrapper with interceptors - 94% smaller than Axios',
    vanillaSize: '0.8kb',
    librarySize: '13kb',
    libraryName: 'Axios',
    vanilla: {
      code: `// Lightweight fetch wrapper
const http = {
  interceptors: {
    request: [],
    response: []
  },

  async request(url, options = {}) {
    // Apply request interceptors
    let config = { url, ...options };
    for (const interceptor of this.interceptors.request) {
      config = await interceptor(config);
    }

    console.log(\`📡 \${config.method || 'GET'} \${config.url}\`);

    try {
      // Real fetch request
      const fetchOptions = {
        method: config.method || 'GET',
        headers: config.headers || {}
      };

      if (config.body) {
        fetchOptions.body = JSON.stringify(config.body);
        fetchOptions.headers['Content-Type'] = 'application/json';
      }

      const fetchResponse = await fetch(config.url, fetchOptions);
      const data = await fetchResponse.json();

      const response = {
        status: fetchResponse.status,
        data: data,
        headers: Object.fromEntries(fetchResponse.headers.entries())
      };

      // Apply response interceptors
      let result = response;
      for (const interceptor of this.interceptors.response) {
        result = await interceptor(result);
      }

      return result;
    } catch (error) {
      console.error('Request failed:', error);
      throw error;
    }
  },

  get(url) {
    return this.request(url, { method: 'GET' });
  },

  post(url, data) {
    return this.request(url, { method: 'POST', body: data });
  }
};

// Add interceptors
http.interceptors.request.push((config) => {
  console.log('🔒 Adding auth token');
  config.headers = { ...config.headers, Authorization: 'Bearer token123' };
  return config;
});

http.interceptors.response.push((response) => {
  console.log(\`✓ Response: \${response.status}\`);
  return response;
});

// Test requests with real API
http.get('https://jsonplaceholder.typicode.com/users/1').then(r => console.log('User:', r.data));
setTimeout(() => {
  http.post('https://jsonplaceholder.typicode.com/posts', {
    title: 'Test Post',
    body: 'Hello from Lean Stack!',
    userId: 1
  }).then(r => console.log('Created post:', r.data));
}, 100);
setTimeout(() => console.log('✓ HTTP client complete'), 1000);`
    },
    library: {
      code: `// Axios-style HTTP client
class AxiosInstance {
  constructor() {
    this.interceptors = {
      request: { handlers: [] },
      response: { handlers: [] }
    };
    this.defaults = {
      headers: { 'Content-Type': 'application/json' }
    };
  }

  async request(config) {
    // Merge defaults
    config = { ...this.defaults, ...config };

    // Request interceptors
    for (const handler of this.interceptors.request.handlers) {
      config = await handler.fulfilled(config);
    }

    console.log(\`📡 \${config.method || 'GET'} \${config.url}\`);

    try {
      // Real fetch request
      const fetchOptions = {
        method: config.method || 'GET',
        headers: config.headers || {}
      };

      if (config.data) {
        fetchOptions.body = JSON.stringify(config.data);
        fetchOptions.headers['Content-Type'] = 'application/json';
      }

      const fetchResponse = await fetch(config.url, fetchOptions);
      const data = await fetchResponse.json();

      const response = {
        status: fetchResponse.status,
        statusText: fetchResponse.statusText,
        data: data,
        headers: config.headers,
        config: config
      };

      // Response interceptors
      let result = response;
      for (const handler of this.interceptors.response.handlers) {
        result = await handler.fulfilled(result);
      }

      return result;
    } catch (error) {
      throw error;
    }
  }

  get(url, config = {}) {
    return this.request({ ...config, method: 'GET', url });
  }

  post(url, data, config = {}) {
    return this.request({ ...config, method: 'POST', url, data });
  }
}

// Create instance
const axios = new AxiosInstance();

// Add interceptors
axios.interceptors.request.handlers.push({
  fulfilled: (config) => {
    console.log('🔒 Adding auth token');
    config.headers.Authorization = 'Bearer token123';
    return config;
  }
});

axios.interceptors.response.handlers.push({
  fulfilled: (response) => {
    console.log(\`✓ Response: \${response.status}\`);
    return response;
  }
});

// Test requests with real API
axios.get('https://jsonplaceholder.typicode.com/users/1').then(r => console.log('User:', r.data));
setTimeout(() => {
  axios.post('https://jsonplaceholder.typicode.com/posts', {
    title: 'Test Post',
    body: 'Hello from Lean Stack!',
    userId: 1
  }).then(r => console.log('Created post:', r.data));
}, 100);
setTimeout(() => console.log('✓ Axios-style complete'), 1000);`
    }
  },
  {
    id: 'event-bus',
    title: 'Event Bus',
    description: 'Pub/sub pattern - 90% smaller than EventEmitter',
    vanillaSize: '0.5kb',
    librarySize: '5kb',
    libraryName: 'EventEmitter3',
    vanilla: {
      code: `// Simple event bus implementation
const EventBus = {
  events: {},

  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  },

  off(event, callback) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter(cb => cb !== callback);
  },

  emit(event, data) {
    if (!this.events[event]) return;
    console.log(\`📢 Event emitted: \${event}\`, data);
    this.events[event].forEach(callback => callback(data));
  },

  once(event, callback) {
    const wrapper = (data) => {
      callback(data);
      this.off(event, wrapper);
    };
    this.on(event, wrapper);
  }
};

// Register listeners
EventBus.on('user:login', (user) => {
  console.log('Handler 1: User logged in:', user.name);
});

EventBus.on('user:login', (user) => {
  console.log('Handler 2: Welcome,', user.name);
});

EventBus.once('app:ready', () => {
  console.log('App ready (fires once)');
});

// Emit events
EventBus.emit('user:login', { name: 'Alice', id: 1 });
EventBus.emit('app:ready');
EventBus.emit('app:ready'); // Won't fire again

setTimeout(() => {
  EventBus.emit('user:login', { name: 'Bob', id: 2 });
}, 100);

setTimeout(() => console.log('✓ Event bus complete'), 200);`
    },
    library: {
      code: `// EventEmitter3-style implementation
class EventEmitter {
  constructor() {
    this._events = {};
    this._maxListeners = 10;
  }

  on(event, listener, context) {
    if (!this._events[event]) {
      this._events[event] = [];
    }

    this._events[event].push({
      listener,
      context,
      once: false
    });

    return this;
  }

  once(event, listener, context) {
    if (!this._events[event]) {
      this._events[event] = [];
    }

    this._events[event].push({
      listener,
      context,
      once: true
    });

    return this;
  }

  emit(event, ...args) {
    if (!this._events[event]) return false;

    console.log(\`📢 Event emitted: \${event}\`, args[0]);

    const listeners = this._events[event].slice();

    listeners.forEach(({ listener, context, once }) => {
      listener.apply(context, args);
      if (once) {
        this.removeListener(event, listener);
      }
    });

    return true;
  }

  removeListener(event, listener) {
    if (!this._events[event]) return this;

    this._events[event] = this._events[event].filter(
      item => item.listener !== listener
    );

    return this;
  }
}

// Create emitter instance
const emitter = new EventEmitter();

// Register listeners
emitter.on('user:login', (user) => {
  console.log('Handler 1: User logged in:', user.name);
});

emitter.on('user:login', (user) => {
  console.log('Handler 2: Welcome,', user.name);
});

emitter.once('app:ready', () => {
  console.log('App ready (fires once)');
});

// Emit events
emitter.emit('user:login', { name: 'Alice', id: 1 });
emitter.emit('app:ready');
emitter.emit('app:ready'); // Won't fire again

setTimeout(() => {
  emitter.emit('user:login', { name: 'Bob', id: 2 });
}, 100);

setTimeout(() => console.log('✓ EventEmitter complete'), 200);`
    }
  },
  {
    id: 'form-validation',
    title: 'Form Validation',
    description: 'Schema-based validation - 91% smaller than Formik',
    vanillaSize: '2kb',
    librarySize: '22kb',
    libraryName: 'Formik',
    vanilla: {
      code: `// Simple form validation
const validator = {
  rules: {
    required: (value) => value && value.trim() !== '',
    email: (value) => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value),
    minLength: (min) => (value) => value && value.length >= min,
    maxLength: (max) => (value) => value && value.length <= max
  },

  validate(data, schema) {
    const errors = {};

    for (const [field, rules] of Object.entries(schema)) {
      const value = data[field];

      for (const [ruleName, ruleConfig] of Object.entries(rules)) {
        let isValid;

        if (typeof ruleConfig === 'boolean' && ruleConfig) {
          isValid = this.rules[ruleName](value);
        } else if (typeof ruleConfig === 'number') {
          isValid = this.rules[ruleName](ruleConfig)(value);
        }

        if (!isValid) {
          errors[field] = \`\${field} validation failed: \${ruleName}\`;
          break;
        }
      }
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }
};

// Define schema
const schema = {
  email: { required: true, email: true },
  password: { required: true, minLength: 8 },
  username: { required: true, minLength: 3, maxLength: 20 }
};

// Test validation
const testData1 = {
  email: 'invalid-email',
  password: 'short',
  username: 'ab'
};

console.log('Test 1 (invalid):');
const result1 = validator.validate(testData1, schema);
console.log('Valid:', result1.isValid);
console.log('Errors:', result1.errors);

const testData2 = {
  email: 'user@example.com',
  password: 'securepass123',
  username: 'alice'
};

console.log('\\nTest 2 (valid):');
const result2 = validator.validate(testData2, schema);
console.log('Valid:', result2.isValid);
console.log('Errors:', result2.errors);
console.log('\\n✓ Validation complete');`
    },
    library: {
      code: `// Formik-style validation
class FormValidator {
  constructor(initialValues, validationSchema) {
    this.values = initialValues;
    this.errors = {};
    this.touched = {};
    this.validationSchema = validationSchema;
  }

  setFieldValue(field, value) {
    this.values[field] = value;
    this.validateField(field);
  }

  setFieldTouched(field, isTouched = true) {
    this.touched[field] = isTouched;
  }

  validateField(field) {
    const rules = this.validationSchema[field];
    const value = this.values[field];

    delete this.errors[field];

    if (rules.required && (!value || value.trim() === '')) {
      this.errors[field] = \`\${field} is required\`;
      return false;
    }

    if (rules.email && !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value)) {
      this.errors[field] = \`\${field} must be valid email\`;
      return false;
    }

    if (rules.minLength && value.length < rules.minLength) {
      this.errors[field] = \`\${field} must be at least \${rules.minLength} chars\`;
      return false;
    }

    if (rules.maxLength && value.length > rules.maxLength) {
      this.errors[field] = \`\${field} must be at most \${rules.maxLength} chars\`;
      return false;
    }

    return true;
  }

  validateForm() {
    Object.keys(this.validationSchema).forEach(field => {
      this.validateField(field);
    });

    return {
      isValid: Object.keys(this.errors).length === 0,
      errors: this.errors,
      values: this.values
    };
  }
}

// Define schema
const schema = {
  email: { required: true, email: true },
  password: { required: true, minLength: 8 },
  username: { required: true, minLength: 3, maxLength: 20 }
};

// Test validation
console.log('Test 1 (invalid):');
const form1 = new FormValidator({
  email: 'invalid-email',
  password: 'short',
  username: 'ab'
}, schema);

const result1 = form1.validateForm();
console.log('Valid:', result1.isValid);
console.log('Errors:', result1.errors);

console.log('\\nTest 2 (valid):');
const form2 = new FormValidator({
  email: 'user@example.com',
  password: 'securepass123',
  username: 'alice'
}, schema);

const result2 = form2.validateForm();
console.log('Valid:', result2.isValid);
console.log('Errors:', result2.errors);
console.log('\\n✓ Formik-style validation complete');`
    }
  }
];

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = patterns;
}
