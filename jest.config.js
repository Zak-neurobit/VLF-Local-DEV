const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    // Handle module aliases
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@lib/(.*)$': '<rootDir>/src/lib/$1',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@services/(.*)$': '<rootDir>/src/services/$1',
    '^@types/(.*)$': '<rootDir>/src/types/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    // Handle lucide-react specific imports
    '^lucide-react/dist/esm/icons/(.*)$': 'lucide-react',
    '^lucide-react$': '<rootDir>/__mocks__/lucide-react.js',
    // Handle CSS imports (with CSS modules)
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    // Handle CSS imports (without CSS modules)
    '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
    // Handle image imports
    '^.+\\.(jpg|jpeg|png|gif|webp|avif|ico|bmp|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.next/',
    '<rootDir>/tools/',
    '<rootDir>/venv/',
    '<rootDir>/public/~partytown/',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(.*\\.mjs$|@hookform|@radix-ui|@heroicons|countup.js|react-intersection-observer|lucide-react|@builder.io|bullmq))',
  ],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testMatch: ['**/__tests__/**/*.(test|spec).(ts|tsx|js|jsx)', '**/*.(test|spec).(ts|tsx|js|jsx)'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
    '!src/**/node_modules/**',
  ],
  coverageThreshold: {
    global: {
      branches: 40, // Start with achievable goals
      functions: 40, // Gradually increase over time
      lines: 50, // Higher for lines as they're easier
      statements: 50, // Match lines threshold
    },
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  watchPathIgnorePatterns: ['<rootDir>/tools/', '<rootDir>/venv/'],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
