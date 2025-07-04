import React from 'react';
import { render, screen } from '@/lib/testing/utils';
import PracticeAreasPage from './page';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, initial, animate, whileInView, viewport, transition, ...props }: any) => (
      <div {...props}>{children}</div>
    ),
    section: ({ children, initial, animate, whileInView, viewport, transition, ...props }: any) => (
      <section {...props}>{children}</section>
    ),
  },
}));

// Mock next/script
jest.mock('next/script', () => ({
  __esModule: true,
  default: () => null,
}));

// Mock ChatWidget
jest.mock('@/components/ChatWidget', () => ({
  ChatWidget: () => null,
}));

describe('PracticeAreasPage', () => {
  it('renders practice areas page with title', () => {
    render(<PracticeAreasPage />);

    // Check if the main heading is rendered - be more specific
    expect(screen.getByRole('heading', { level: 1, name: /practice areas/i })).toBeInTheDocument();
  });

  it('displays all practice area sections', () => {
    render(<PracticeAreasPage />);

    // Check for practice area sections
    const practiceAreas = ['Immigration Law', 'Personal Injury', 'Worker', 'Criminal Defense'];

    practiceAreas.forEach(area => {
      const elements = screen.getAllByText(new RegExp(area, 'i'));
      expect(elements.length).toBeGreaterThan(0);
    });
  });
});
