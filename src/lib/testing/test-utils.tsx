import React, { ReactElement } from 'react';
import { render, RenderOptions, waitFor, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../components/i18n/test-config';

// Mock providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};

// Custom render function
const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// Re-export everything
export * from '@testing-library/react';
export { customRender as render };

// Test data builders
export const createMockUser = (overrides = {}) => ({
  id: '1',
  email: 'test@vasquezlaw.com',
  name: 'Test User',
  role: 'client',
  ...overrides,
});

export const createMockCase = (overrides = {}) => ({
  id: '1',
  caseNumber: 'CASE-2024-001',
  clientId: '1',
  attorneyId: '2',
  practiceArea: 'immigration',
  status: 'active',
  createdAt: new Date().toISOString(),
  ...overrides,
});

export const createMockAppointment = (overrides = {}) => ({
  id: '1',
  clientId: '1',
  attorneyId: '2',
  date: new Date().toISOString(),
  duration: 60,
  type: 'consultation',
  status: 'scheduled',
  ...overrides,
});

// Performance testing utilities
export const measureRenderTime = async (component: ReactElement) => {
  const start = performance.now();
  const { container } = render(component);
  const end = performance.now();

  return {
    renderTime: end - start,
    container,
  };
};

// Accessibility testing helpers
export const checkA11y = async (container: HTMLElement) => {
  const axe = require('axe-core');
  const results = await axe.run(container);
  return results.violations;
};

// Mock API responses
export const mockApiResponses = {
  success: (data: Record<string, unknown>) => ({
    ok: true,
    status: 200,
    json: async () => data,
  }),

  error: (status: number, message: string) => ({
    ok: false,
    status,
    json: async () => ({ error: message }),
  }),
};

// WebSocket mock helpers
export class MockWebSocket {
  url: string;
  readyState: number = 1;
  onopen: ((event: Event) => void) | null = null;
  onclose: ((event: CloseEvent) => void) | null = null;
  onmessage: ((event: MessageEvent) => void) | null = null;
  onerror: ((event: Event) => void) | null = null;

  constructor(url: string) {
    this.url = url;
    setTimeout(() => {
      if (this.onopen) {
        this.onopen(new Event('open'));
      }
    }, 0);
  }

  send(data: string) {
    // Mock implementation
  }

  close() {
    this.readyState = 3;
    if (this.onclose) {
      this.onclose(new CloseEvent('close'));
    }
  }

  simulateMessage(data: Record<string, unknown>) {
    if (this.onmessage) {
      this.onmessage(new MessageEvent('message', { data: JSON.stringify(data) }));
    }
  }
}

// Wait utilities
export const waitForLoadingToFinish = async () => {
  // Wait for loading spinner to disappear
  await waitFor(() => {
    const spinner = screen.queryByTestId('loading-spinner');
    if (spinner) {
      throw new Error('Still loading');
    }
  });
};

export const waitForApiCall = (mockFn: any) =>
  new Promise(resolve => {
    const checkCalled = () => {
      if (mockFn.mock.calls.length > 0) {
        resolve(mockFn.mock.calls[0]);
      } else {
        setTimeout(checkCalled, 50);
      }
    };
    checkCalled();
  });
