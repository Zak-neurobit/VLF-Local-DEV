import '@testing-library/jest-dom';

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

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: 'div',
    nav: 'nav',
    header: 'header',
    section: 'section',
    article: 'article',
    aside: 'aside',
    main: 'main',
    footer: 'footer',
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    h6: 'h6',
    p: 'p',
    span: 'span',
    a: 'a',
    button: 'button',
    form: 'form',
    input: 'input',
    textarea: 'textarea',
    select: 'select',
    option: 'option',
    label: 'label',
    ul: 'ul',
    ol: 'ol',
    li: 'li',
    img: 'img',
    video: 'video',
    audio: 'audio',
    canvas: 'canvas',
    svg: 'svg',
    path: 'path',
    circle: 'circle',
    rect: 'rect',
    line: 'line',
    polyline: 'polyline',
    polygon: 'polygon',
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
}));

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
  }) as any;

  // Mock document.body.appendChild and removeChild
  document.body.appendChild = jest.fn(element => {
    return element;
  });

  document.body.removeChild = jest.fn(element => {
    return element;
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
