// Central mock service registry for local testing
export { retellMock, handleRetellMockRequest } from './retell-mock';
export { ghlMock, handleGHLMockRequest } from './ghl-mock';

// Environment check
export const isMockEnvironment = () => {
  return (
    process.env.NODE_ENV === 'development' &&
    (process.env.USE_MOCKS === 'true' || !process.env.RETELL_API_KEY)
  );
};

// Mock service configuration
export const mockConfig = {
  retell: {
    enabled: isMockEnvironment(),
    baseUrl: 'http://localhost:3000/api/retell',
  },
  ghl: {
    enabled: isMockEnvironment(),
    baseUrl: 'http://localhost:3000/api/ghl',
  },
};
