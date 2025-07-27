import '@testing-library/jest-dom';
import React from 'react';

// Ensure document.body is clean for each test
afterEach(() => {
  document.body.innerHTML = '';
});

// Mock pino logger
jest.mock('@/lib/pino-logger', () => ({
  logger: {
    error: jest.fn(),
    warn: jest.fn(),
    info: jest.fn(),
    debug: jest.fn(),
  },
  apiLogger: {
    error: jest.fn(),
    warn: jest.fn(),
    info: jest.fn(),
    debug: jest.fn(),
  },
  dbLogger: {
    error: jest.fn(),
    warn: jest.fn(),
    info: jest.fn(),
    debug: jest.fn(),
  },
  securityLogger: {
    error: jest.fn(),
    warn: jest.fn(),
    info: jest.fn(),
    debug: jest.fn(),
  },
  performanceLogger: {
    error: jest.fn(),
    warn: jest.fn(),
    info: jest.fn(),
    debug: jest.fn(),
  },
}));

// Mock browser utils
jest.mock('@/lib/utils/browser', () => ({
  isBrowser: true,
  safeWindow: {
    innerWidth: 1024,
    innerHeight: 768,
    location: { href: '', pathname: '', search: '', hash: '' },
    localStorage: {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
    },
    sessionStorage: {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
    },
  },
  onClient: jest.fn(callback => callback()),
  addWindowListener: jest.fn(() => jest.fn()),
}));

// Mock Bull queue - virtual mock since bull package is not installed
jest.mock(
  'bull',
  () => {
    return jest.fn().mockImplementation(() => ({
      add: jest.fn().mockResolvedValue({ id: '123' }),
      process: jest.fn(),
      on: jest.fn(),
      close: jest.fn(),
      getJob: jest.fn(),
      getJobs: jest.fn().mockResolvedValue([]),
      empty: jest.fn(),
      clean: jest.fn(),
      pause: jest.fn(),
      resume: jest.fn(),
      isPaused: jest.fn().mockResolvedValue(false),
      getJobCounts: jest.fn().mockResolvedValue({
        waiting: 0,
        active: 0,
        completed: 0,
        failed: 0,
        delayed: 0,
      }),
      getWaitingCount: jest.fn().mockResolvedValue(0),
      getActiveCount: jest.fn().mockResolvedValue(0),
      getCompletedCount: jest.fn().mockResolvedValue(0),
      getFailedCount: jest.fn().mockResolvedValue(0),
      getDelayedCount: jest.fn().mockResolvedValue(0),
    }));
  },
  { virtual: true }
);

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
  useParams: () => ({}),
}));

// Mock LanguageSwitcher component to avoid import issues in tests
jest.mock('@/components/LanguageSwitcher', () => ({
  __esModule: true,
  LanguageSwitcher: () => null,
  default: () => null,
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: () => null,
}));

// lucide-react is now mocked via __mocks__/lucide-react.js

// Mock @radix-ui components that might cause issues
jest.mock('@radix-ui/react-select', () => ({
  __esModule: true,
  Root: ({ children }: { children: React.ReactNode }) => children,
  Trigger: ({ children }: { children: React.ReactNode }) =>
    React.createElement('div', {}, children),
  Content: ({ children }: { children: React.ReactNode }) =>
    React.createElement('div', {}, children),
  Item: ({ children }: { children: React.ReactNode }) => React.createElement('div', {}, children),
  Value: ({ children }: { children: React.ReactNode }) => React.createElement('span', {}, children),
  Icon: () => null,
  Viewport: ({ children }: { children: React.ReactNode }) =>
    React.createElement('div', {}, children),
  ScrollUpButton: () => null,
  ScrollDownButton: () => null,
}));

// Mock other potentially problematic imports
jest.mock(
  'bullmq',
  () => ({
    __esModule: true,
    Queue: jest.fn().mockImplementation(() => ({
      add: jest.fn().mockResolvedValue({ id: '123' }),
      process: jest.fn(),
      on: jest.fn(),
      close: jest.fn(),
    })),
    Worker: jest.fn(),
    default: jest.fn(),
  }),
  { virtual: true }
);

// Mock framer-motion
jest.mock('framer-motion', () => {
  // Create a mock component that strips framer-motion props
  const createMockComponent =
    (tag: string) =>
    ({ children, ...props }: { children?: React.ReactNode; [key: string]: unknown }) => {
      // Remove framer-motion specific props to avoid React warnings
      const {
        initial,
        animate,
        exit,
        transition,
        variants,
        whileHover,
        whileTap,
        whileInView,
        whileFocus,
        drag,
        dragConstraints,
        dragElastic,
        dragMomentum,
        dragPropagation,
        dragTransition,
        ...cleanProps
      } = props;

      // Suppress unused variable warnings - these are intentionally destructured to remove them
      void initial;
      void animate;
      void exit;
      void transition;
      void variants;
      void whileHover;
      void whileTap;
      void whileInView;
      void whileFocus;
      void drag;
      void dragConstraints;
      void dragElastic;
      void dragMomentum;
      void dragPropagation;
      void dragTransition;

      return React.createElement(tag, cleanProps, children);
    };

  return {
    motion: {
      div: createMockComponent('div'),
      nav: createMockComponent('nav'),
      header: createMockComponent('header'),
      section: createMockComponent('section'),
      article: createMockComponent('article'),
      aside: createMockComponent('aside'),
      main: createMockComponent('main'),
      footer: createMockComponent('footer'),
      h1: createMockComponent('h1'),
      h2: createMockComponent('h2'),
      h3: createMockComponent('h3'),
      h4: createMockComponent('h4'),
      h5: createMockComponent('h5'),
      h6: createMockComponent('h6'),
      p: createMockComponent('p'),
      span: createMockComponent('span'),
      a: createMockComponent('a'),
      button: createMockComponent('button'),
      form: createMockComponent('form'),
      input: createMockComponent('input'),
      textarea: createMockComponent('textarea'),
      select: createMockComponent('select'),
      option: createMockComponent('option'),
      label: createMockComponent('label'),
      ul: createMockComponent('ul'),
      ol: createMockComponent('ol'),
      li: createMockComponent('li'),
      img: createMockComponent('img'),
      video: createMockComponent('video'),
      audio: createMockComponent('audio'),
      canvas: createMockComponent('canvas'),
      svg: createMockComponent('svg'),
      path: createMockComponent('path'),
      circle: createMockComponent('circle'),
      rect: createMockComponent('rect'),
      line: createMockComponent('line'),
      polyline: createMockComponent('polyline'),
      polygon: createMockComponent('polygon'),
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
  };
});

// Note: window.location cannot be easily mocked in jsdom
// Tests that need to mock window.location should do so individually

// Only mock document-related stuff if we're in a jsdom environment
if (typeof document !== 'undefined') {
  // Mock document.createElement for download tests
  const originalCreateElement = document.createElement.bind(document);

  document.createElement = jest.fn((tagName: string) => {
    const element = originalCreateElement(tagName);

    if (tagName === 'a') {
      // Override click method for anchor elements
      element.click = jest.fn();
    }

    return element;
  }) as typeof document.createElement;

  // Mock document.body.appendChild and removeChild with proper implementation
  const originalAppendChild = document.body.appendChild.bind(document.body);
  const originalRemoveChild = document.body.removeChild.bind(document.body);

  document.body.appendChild = jest.fn(element => {
    return originalAppendChild(element);
  });

  document.body.removeChild = jest.fn(element => {
    return originalRemoveChild(element);
  });
}

// Mock IntersectionObserver if it exists
if (typeof global !== 'undefined' && !global.IntersectionObserver) {
  global.IntersectionObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  }));
}
