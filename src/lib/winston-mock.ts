// Mock winston for client-side usage
export const createLogger = () => ({
  info: console.log,
  error: console.error,
  warn: console.warn,
  debug: console.debug,
  log: console.log,
});

export const format = {
  combine: () => {},
  timestamp: () => {},
  errors: () => {},
  splat: () => {},
  json: () => {},
  colorize: () => {},
  simple: () => {},
};

export const transports = {
  Console: class Console {
    constructor() {}
  },
  File: class File {
    constructor() {}
  },
};

export default {
  createLogger,
  format,
  transports,
};