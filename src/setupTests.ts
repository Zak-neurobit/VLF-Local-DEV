import '@testing-library/jest-dom';
import { vi } from 'vitest';
import React from 'react';

// Ensure document.body is clean for each test
afterEach(() => {
  document.body.innerHTML = '';
});

// Mock pino logger
vi.mock('@/lib/pino-logger', () => ({
  logger: {
    error: vi.fn(),
    warn: vi.fn(),
    info: vi.fn(),
    debug: vi.fn(),
  },
  apiLogger: {
    error: vi.fn(),
    warn: vi.fn(),
    info: vi.fn(),
    debug: vi.fn(),
  },
  dbLogger: {
    error: vi.fn(),
    warn: vi.fn(),
    info: vi.fn(),
    debug: vi.fn(),
  },
  securityLogger: {
    error: vi.fn(),
    warn: vi.fn(),
    info: vi.fn(),
    debug: vi.fn(),
  },
  performanceLogger: {
    error: vi.fn(),
    warn: vi.fn(),
    info: vi.fn(),
    debug: vi.fn(),
  },
}));

// Mock browser utils
vi.mock('@/lib/utils/browser', () => ({
  isBrowser: true,
  safeWindow: {
    innerWidth: 1024,
    innerHeight: 768,
    location: { href: '', pathname: '', search: '', hash: '' },
    localStorage: {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    },
    sessionStorage: {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    },
  },
  safeDocument: {
    body: document.body,
    createElement: document.createElement.bind(document),
    querySelector: document.querySelector.bind(document),
    querySelectorAll: document.querySelectorAll.bind(document),
  },
}));

// Mock Bull/BullMQ
vi.mock('bull', () => ({
  default: vi.fn(() => ({
    add: vi.fn(),
    process: vi.fn(),
    on: vi.fn(),
    close: vi.fn(),
  })),
}));

vi.mock('bullmq', () => ({
  Queue: vi.fn(() => ({
    add: vi.fn(),
    close: vi.fn(),
  })),
  Worker: vi.fn(() => ({
    on: vi.fn(),
    close: vi.fn(),
  })),
}));

// Mock Next.js modules
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
  redirect: vi.fn(),
  notFound: vi.fn(),
}));

vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: any) =>
    React.createElement('a', { href, ...props }, children),
}));

vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: any) => React.createElement('img', { src, alt, ...props }),
}));

// Mock Radix UI components
vi.mock('@radix-ui/react-dialog', () => ({
  Root: ({ children }: any) => children,
  Trigger: ({ children }: any) => children,
  Content: ({ children }: any) => children,
  Close: ({ children }: any) => children,
}));

vi.mock('@radix-ui/react-dropdown-menu', () => ({
  Root: ({ children }: any) => children,
  Trigger: ({ children }: any) => children,
  Content: ({ children }: any) => children,
  Item: ({ children }: any) => children,
}));

// Mock Framer Motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => React.createElement('div', props, children),
    span: ({ children, ...props }: any) => React.createElement('span', props, children),
    button: ({ children, ...props }: any) => React.createElement('button', props, children),
    a: ({ children, ...props }: any) => React.createElement('a', props, children),
  },
  AnimatePresence: ({ children }: any) => children,
  useAnimation: () => ({
    start: vi.fn(),
    stop: vi.fn(),
  }),
  useInView: () => true,
}));

// Mock Lucide React icons
vi.mock('lucide-react', () => ({
  ChevronRight: () => null,
  ChevronLeft: () => null,
  Menu: () => null,
  X: () => null,
  Search: () => null,
  Phone: () => null,
  Mail: () => null,
  MapPin: () => null,
  Clock: () => null,
  Calendar: () => null,
  Check: () => null,
  AlertCircle: () => null,
  Info: () => null,
  Star: () => null,
  ArrowRight: () => null,
  ArrowLeft: () => null,
  Plus: () => null,
  Minus: () => null,
  User: () => null,
  Users: () => null,
  Home: () => null,
  Building: () => null,
  Globe: () => null,
  Settings: () => null,
  LogOut: () => null,
  LogIn: () => null,
}));

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
  root: null,
  rootMargin: '',
  thresholds: [],
  takeRecords: () => [],
})) as any;

// Mock ResizeObserver
global.ResizeObserver = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
})) as any;

// Mock window methods
window.scrollTo = vi.fn();
window.alert = vi.fn();
window.confirm = vi.fn(() => true);

// Add custom matchers if needed
expect.extend({
  toBeInTheDocument(received) {
    const pass = document.body.contains(received);
    return {
      pass,
      message: () => `expected element ${pass ? 'not ' : ''}to be in the document`,
    };
  },
});

// Global test utilities
global.React = React;
