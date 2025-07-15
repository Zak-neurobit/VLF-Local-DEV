import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Badge } from '../badge';
import { Select, SelectOption } from '../select';
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from '../dialog';
import { Progress } from '../progress';
import { Switch } from '../switch';
import { Label } from '../label';

describe('New UI Components', () => {
  describe('Badge', () => {
    it('renders with default variant', () => {
      render(<Badge>Test Badge</Badge>);
      expect(screen.getByText('Test Badge')).toBeInTheDocument();
    });

    it('renders with different variants', () => {
      const { rerender } = render(<Badge variant="success">Success</Badge>);
      expect(screen.getByText('Success')).toHaveClass('bg-green-100');

      rerender(<Badge variant="warning">Warning</Badge>);
      expect(screen.getByText('Warning')).toHaveClass('bg-yellow-100');
    });
  });

  describe('Select', () => {
    it('renders with options', () => {
      render(
        <Select label="Choose an option">
          <SelectOption value="1">Option 1</SelectOption>
          <SelectOption value="2">Option 2</SelectOption>
        </Select>
      );
      expect(screen.getByText('Choose an option')).toBeInTheDocument();
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('displays error message', () => {
      render(<Select error="This field is required" />);
      expect(screen.getByText('This field is required')).toBeInTheDocument();
    });
  });

  describe('Dialog', () => {
    it('opens and closes dialog', () => {
      render(
        <Dialog>
          <DialogTrigger>Open Dialog</DialogTrigger>
          <DialogContent>
            <DialogTitle>Test Dialog</DialogTitle>
          </DialogContent>
        </Dialog>
      );

      // Dialog should not be visible initially
      expect(screen.queryByText('Test Dialog')).not.toBeInTheDocument();

      // Click to open dialog
      fireEvent.click(screen.getByText('Open Dialog'));
      expect(screen.getByText('Test Dialog')).toBeInTheDocument();
    });
  });

  describe('Progress', () => {
    it('renders with correct value', () => {
      render(<Progress value={50} max={100} showLabel />);
      expect(screen.getByText('50%')).toBeInTheDocument();
      expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '50');
    });

    it('renders with custom label', () => {
      render(<Progress value={75} label="Loading..." />);
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });

  describe('Switch', () => {
    it('toggles state', () => {
      const handleChange = jest.fn();
      render(<Switch onCheckedChange={handleChange} />);
      
      const switchButton = screen.getByRole('switch');
      expect(switchButton).toHaveAttribute('aria-checked', 'false');

      fireEvent.click(switchButton);
      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it('renders with label', () => {
      render(<Switch label="Enable notifications" />);
      expect(screen.getByText('Enable notifications')).toBeInTheDocument();
    });
  });

  describe('Label', () => {
    it('renders basic label', () => {
      render(<Label htmlFor="test">Test Label</Label>);
      expect(screen.getByText('Test Label')).toBeInTheDocument();
    });

    it('renders required indicator', () => {
      render(<Label required>Required Field</Label>);
      expect(screen.getByText('*')).toHaveClass('text-destructive');
    });
  });
});