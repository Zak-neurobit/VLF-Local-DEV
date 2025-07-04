/**
 * Check if code is running in browser environment
 */
export const isBrowser = typeof window !== 'undefined';

/**
 * Safe window access utilities
 */
export const safeWindow = {
  innerWidth: isBrowser ? window.innerWidth : 1024,
  innerHeight: isBrowser ? window.innerHeight : 768,
  location: isBrowser ? window.location : { href: '', pathname: '', search: '', hash: '' },
  localStorage: isBrowser ? window.localStorage : {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
    clear: () => {},
  },
  sessionStorage: isBrowser ? window.sessionStorage : {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
    clear: () => {},
  },
};

/**
 * Execute function only in browser environment
 */
export function onClient<T>(callback: () => T): T | undefined {
  if (isBrowser) {
    return callback();
  }
  return undefined;
}

/**
 * Add event listener safely
 */
export function addWindowListener(
  event: string,
  handler: EventListener,
  options?: boolean | AddEventListenerOptions
) {
  if (isBrowser) {
    window.addEventListener(event, handler, options);
    return () => window.removeEventListener(event, handler, options);
  }
  return () => {};
}