import React from 'react';
import { render, screen } from '@/lib/testing/utils';
import Page from './page';

// Mock components
jest.mock('@/components/HomePage', () => ({
  __esModule: true,
  default: () => <div data-testid="homepage">HomePage Component</div>,
}));

jest.mock('@/design-system/templates/MasterLayout', () => ({
  MasterLayout: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="master-layout">{children}</div>
  ),
}));

jest.mock('@/components/ResourceHints', () => ({
  __esModule: true,
  default: () => null,
}));

describe('Homepage', () => {
  it('renders without crashing', () => {
    render(<Page />);
    expect(screen.getByTestId('homepage')).toBeInTheDocument();
  });

  it('wraps content in MasterLayout', () => {
    render(<Page />);
    expect(screen.getByTestId('master-layout')).toBeInTheDocument();
  });
});
