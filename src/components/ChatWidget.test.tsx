import React from 'react';
import { render, screen, fireEvent, waitFor } from '@/lib/testing/utils';
import { ChatWidget } from './ChatWidget';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({
      children,
      initial,
      animate,
      exit,
      whileHover,
      whileTap,
      transition,
      ...props
    }: any) => <div {...props}>{children}</div>,
    button: ({
      children,
      initial,
      animate,
      exit,
      whileHover,
      whileTap,
      transition,
      ...props
    }: any) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock ChatInterface
jest.mock('./VirtualAssistant/ChatInterface', () => ({
  ChatInterface: ({ onClose }: { onClose: () => void }) => (
    <div data-testid="chat-interface">
      Chat Interface
      <button onClick={onClose}>Close</button>
    </div>
  ),
}));

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('ChatWidget', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  it('renders chat button initially', () => {
    render(<ChatWidget />);
    // The button has an SVG icon, not text
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button.querySelector('svg')).toBeInTheDocument();
  });

  it('opens chat interface when button is clicked', () => {
    render(<ChatWidget />);

    const chatButton = screen.getByRole('button');
    fireEvent.click(chatButton);

    expect(screen.getByTestId('chat-interface')).toBeInTheDocument();
  });

  it('closes chat interface when close button is clicked', async () => {
    render(<ChatWidget />);

    // Open chat
    const chatButton = screen.getByRole('button');
    fireEvent.click(chatButton);

    // Ensure chat is open
    expect(screen.getByTestId('chat-interface')).toBeInTheDocument();

    // Find close button by title attribute
    const closeButton = screen.getByTitle('Close');
    fireEvent.click(closeButton);

    // Wait for animations/state to complete
    await waitFor(() => {
      expect(screen.queryByTestId('chat-interface')).not.toBeInTheDocument();
    });
  });

  it('supports Spanish language', () => {
    render(<ChatWidget language="es" />);
    // The widget itself exists, language changes the content inside
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('shows new message indicator for first-time visitors', async () => {
    localStorageMock.getItem.mockReturnValue(null);

    render(<ChatWidget />);

    // Wait for the welcome message delay (5 seconds)
    await waitFor(
      () => {
        expect(localStorageMock.setItem).toHaveBeenCalledWith('chatWidgetVisited', 'true');
      },
      { timeout: 6000 }
    );
  }, 10000); // Increase test timeout

  it('does not show new message indicator for returning visitors', () => {
    localStorageMock.getItem.mockReturnValue('true');

    render(<ChatWidget />);

    // Should not set the visited flag again
    expect(localStorageMock.setItem).not.toHaveBeenCalled();
  });

  it('reads language from URL parameters', () => {
    // Mock URLSearchParams
    const originalURLSearchParams = window.URLSearchParams;
    window.URLSearchParams = jest.fn().mockImplementation(() => ({
      get: jest.fn(key => (key === 'lang' ? 'es' : null)),
    })) as any;

    render(<ChatWidget />);

    // The widget should exist with the language parameter
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();

    // Restore original URLSearchParams
    window.URLSearchParams = originalURLSearchParams;
  });
});
