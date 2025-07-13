import React from 'react';
import { render, screen } from '@/lib/testing/utils';
import { SimpleTest } from '../SimpleTest';

describe('SimpleTest', () => {
  it('renders form fields', () => {
    render(<SimpleTest />);
    
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/zip code/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/i agree to the privacy policy/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/i'd like to receive marketing communications/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /get my free resource/i })).toBeInTheDocument();
  });
});