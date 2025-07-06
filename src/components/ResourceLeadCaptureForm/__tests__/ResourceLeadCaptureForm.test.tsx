import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ResourceLeadCaptureForm from '../index';
import { useRouter } from 'next/navigation';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock fetch
global.fetch = jest.fn();

describe('ResourceLeadCaptureForm', () => {
  const mockRouter = {
    push: jest.fn(),
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    jest.clearAllMocks();
  });

  const defaultProps = {
    resourceId: 'test-resource',
    resourceTitle: 'Test Resource Guide',
    resourceUrl: '/downloads/test-guide.pdf',
    resourceType: 'download' as const,
  };

  describe('Rendering', () => {
    it('renders all required form fields', () => {
      render(<ResourceLeadCaptureForm {...defaultProps} />);
      
      expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/zip code/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/privacy policy/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/marketing communications/i)).toBeInTheDocument();
    });

    it('renders in Spanish when language prop is "es"', () => {
      render(<ResourceLeadCaptureForm {...defaultProps} language="es" />);
      
      expect(screen.getByText('Obtenga Su Recurso Gratuito')).toBeInTheDocument();
      expect(screen.getByLabelText(/nombre completo/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
    });

    it('displays custom resource title', () => {
      render(<ResourceLeadCaptureForm {...defaultProps} />);
      
      expect(screen.getByText(/download "test resource guide"/i)).toBeInTheDocument();
    });
  });

  describe('Validation', () => {
    it('validates required fields', async () => {
      render(<ResourceLeadCaptureForm {...defaultProps} />);
      
      const submitButton = screen.getByRole('button', { name: /get my free resource/i });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText(/please enter your name/i)).toBeInTheDocument();
        expect(screen.getByText(/please enter your email address/i)).toBeInTheDocument();
        expect(screen.getByText(/please enter your zip code/i)).toBeInTheDocument();
        expect(screen.getByText(/you must agree to the privacy policy/i)).toBeInTheDocument();
      });
    });

    it('validates email format', async () => {
      render(<ResourceLeadCaptureForm {...defaultProps} />);
      
      const emailInput = screen.getByLabelText(/email address/i);
      await userEvent.type(emailInput, 'invalid-email');
      
      const submitButton = screen.getByRole('button', { name: /get my free resource/i });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
      });
    });

    it('validates ZIP code format', async () => {
      render(<ResourceLeadCaptureForm {...defaultProps} />);
      
      const zipInput = screen.getByLabelText(/zip code/i);
      await userEvent.type(zipInput, '123'); // Invalid ZIP
      
      const submitButton = screen.getByRole('button', { name: /get my free resource/i });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText(/please enter a valid zip code/i)).toBeInTheDocument();
      });
    });

    it('accepts valid ZIP formats', async () => {
      render(<ResourceLeadCaptureForm {...defaultProps} />);
      
      const zipInput = screen.getByLabelText(/zip code/i);
      
      // Test 5-digit ZIP
      await userEvent.clear(zipInput);
      await userEvent.type(zipInput, '12345');
      
      const submitButton = screen.getByRole('button', { name: /get my free resource/i });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.queryByText(/please enter a valid zip code/i)).not.toBeInTheDocument();
      });
      
      // Test ZIP+4 format
      await userEvent.clear(zipInput);
      await userEvent.type(zipInput, '12345-6789');
      
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.queryByText(/please enter a valid zip code/i)).not.toBeInTheDocument();
      });
    });
  });

  describe('Form Submission', () => {
    beforeEach(() => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({ success: true }),
      });
    });

    const fillForm = async () => {
      await userEvent.type(screen.getByLabelText(/full name/i), 'John Doe');
      await userEvent.type(screen.getByLabelText(/email address/i), 'john@example.com');
      await userEvent.type(screen.getByLabelText(/phone number/i), '919-555-0123');
      await userEvent.type(screen.getByLabelText(/zip code/i), '27601');
      await userEvent.click(screen.getByLabelText(/i agree to the privacy policy/i));
    };

    it('submits form with correct data', async () => {
      render(<ResourceLeadCaptureForm {...defaultProps} />);
      
      await fillForm();
      
      const submitButton = screen.getByRole('button', { name: /get my free resource/i });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith('/api/leads/capture', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            phone: '919-555-0123',
            practiceArea: 'general',
            formId: 'resource-test-resource',
            pageUrl: 'http://localhost/',
            source: 'resource-download',
            language: 'en',
            message: 'Downloaded resource: Test Resource Guide',
            metadata: {
              resourceId: 'test-resource',
              resourceTitle: 'Test Resource Guide',
              zipCode: '27601',
              privacyConsent: true,
              marketingConsent: false,
            },
          }),
        });
      });
    });

    it('handles optional phone field', async () => {
      render(<ResourceLeadCaptureForm {...defaultProps} />);
      
      await userEvent.type(screen.getByLabelText(/full name/i), 'Jane Smith');
      await userEvent.type(screen.getByLabelText(/email address/i), 'jane@example.com');
      await userEvent.type(screen.getByLabelText(/zip code/i), '27601');
      await userEvent.click(screen.getByLabelText(/i agree to the privacy policy/i));
      
      const submitButton = screen.getByRole('button', { name: /get my free resource/i });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        const callArgs = JSON.parse((global.fetch as jest.Mock).mock.calls[0][1].body);
        expect(callArgs.phone).toBe('not-provided');
      });
    });

    it('shows success message after submission', async () => {
      render(<ResourceLeadCaptureForm {...defaultProps} />);
      
      await fillForm();
      
      const submitButton = screen.getByRole('button', { name: /get my free resource/i });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText(/success! check your email/i)).toBeInTheDocument();
        expect(screen.getByText(/we've sent "test resource guide" to your email/i)).toBeInTheDocument();
      });
    });

    it('triggers download for download type', async () => {
      // Mock createElement and click
      const mockClick = jest.fn();
      const mockLink = { click: mockClick, href: '', download: '' };
      jest.spyOn(document, 'createElement').mockReturnValue(mockLink as any);
      
      render(<ResourceLeadCaptureForm {...defaultProps} />);
      
      await fillForm();
      
      const submitButton = screen.getByRole('button', { name: /get my free resource/i });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(mockLink.href).toBe('/downloads/test-guide.pdf');
        expect(mockLink.download).toBe('Test Resource Guide');
        expect(mockClick).toHaveBeenCalled();
      });
    });

    it('calls onSuccess callback', async () => {
      const onSuccess = jest.fn();
      render(<ResourceLeadCaptureForm {...defaultProps} onSuccess={onSuccess} />);
      
      await fillForm();
      
      const submitButton = screen.getByRole('button', { name: /get my free resource/i });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(onSuccess).toHaveBeenCalledWith({
          email: 'john@example.com',
          resourceDelivered: true,
        });
      });
    });
  });

  describe('Error Handling', () => {
    it('displays API error message', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        json: async () => ({ error: 'Server error occurred' }),
      });
      
      render(<ResourceLeadCaptureForm {...defaultProps} />);
      
      await fillForm();
      
      const submitButton = screen.getByRole('button', { name: /get my free resource/i });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Server error occurred')).toBeInTheDocument();
      });
    });

    it('displays generic error on network failure', async () => {
      (global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'));
      
      render(<ResourceLeadCaptureForm {...defaultProps} />);
      
      await fillForm();
      
      const submitButton = screen.getByRole('button', { name: /get my free resource/i });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
      });
    });
  });

  describe('Resource Types', () => {
    it('handles email delivery type', async () => {
      render(<ResourceLeadCaptureForm {...defaultProps} resourceType="email" />);
      
      await fillForm();
      
      const submitButton = screen.getByRole('button', { name: /get my free resource/i });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText(/check your email for more details/i)).toBeInTheDocument();
        expect(screen.queryByText(/download resource now/i)).not.toBeInTheDocument();
      });
    });

    it('handles redirect type', async () => {
      jest.useFakeTimers();
      
      Object.defineProperty(window, 'location', {
        value: { href: '' },
        writable: true,
      });
      
      render(
        <ResourceLeadCaptureForm 
          {...defaultProps} 
          resourceType="redirect"
          resourceUrl="/protected/resource"
        />
      );
      
      await fillForm();
      
      const submitButton = screen.getByRole('button', { name: /get my free resource/i });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText(/success! check your email/i)).toBeInTheDocument();
      });
      
      jest.advanceTimersByTime(2000);
      
      expect(window.location.href).toBe('/protected/resource');
      
      jest.useRealTimers();
    });
  });
});