import React from 'react';
import { render, screen, within } from '@/lib/testing/test-utils';
import PracticeAreasPage from './page';

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
    const { container } = render(<PracticeAreasPage />);

    // Check if any heading exists first, then look for practice areas content
    const headings = within(container).getAllByRole('heading');
    expect(headings.length).toBeGreaterThan(0);

    // Look for practice areas text anywhere in the page (there should be multiple)
    const practiceAreasElements = within(container).getAllByText(/practice areas/i);
    expect(practiceAreasElements.length).toBeGreaterThan(0);
  });

  it('displays all practice area sections', () => {
    const { container } = render(<PracticeAreasPage />);

    // Check for practice area sections
    const practiceAreas = ['Immigration Law', 'Personal Injury', 'Worker', 'Criminal Defense'];

    practiceAreas.forEach(area => {
      const elements = within(container).getAllByText(new RegExp(area, 'i'));
      expect(elements.length).toBeGreaterThan(0);
    });
  });
});
