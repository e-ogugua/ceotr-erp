/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Contact from '../Contact';

// Mock fetch globally
global.fetch = jest.fn();

// Mock COMPANY_INFO data
jest.mock('../../data/demoServices', () => ({
  COMPANY_INFO: {
    headquarters: 'Lagos, Nigeria',
    phone: ['+234 806 450 8595', '+234 803 123 4567'],
    email: ['info@ceotrltd.com', 'contact@ceotrltd.com'],
    businessHours: 'Mon - Fri: 9:00 AM - 6:00 PM',
    socialLinks: {
      linkedin: 'https://linkedin.com/company/ceotrltd',
      instagram: 'https://instagram.com/ceotrltd',
      facebook: 'https://facebook.com/ceotrltd',
      twitter: 'https://twitter.com/ceotrltd'
    }
  }
}));

describe('Contact Component', () => {
  beforeEach(() => {
    fetch.mockClear();
    // Mock successful API response by default for most tests
    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ status: 'success' })
    });
  });

  it('renders contact form with all required fields', () => {
    render(<Contact />);

    expect(screen.getByText('Contact Us')).toBeInTheDocument();
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Send Message/i })).toBeInTheDocument();
  });

  it('renders company contact information', () => {
    render(<Contact />);

    expect(screen.getByText('Get In Touch')).toBeInTheDocument();
    expect(screen.getByText('Office Address')).toBeInTheDocument();
    expect(screen.getByText('Phone Numbers')).toBeInTheDocument();
    expect(screen.getByText('Email Addresses')).toBeInTheDocument();
    expect(screen.getByText('Business Hours')).toBeInTheDocument();
    expect(screen.getByText('Follow Us')).toBeInTheDocument();
  });

  it('validates required fields before submission', async () => {
    render(<Contact />);

    const submitButton = screen.getByRole('button', { name: /Send Message/i });
    fireEvent.click(submitButton);

    // Form should not submit due to HTML5 validation
    expect(fetch).not.toHaveBeenCalled();
  });

  it('submits form with valid data', async () => {
    render(<Contact />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/Full Name/i), {
      target: { value: 'John Doe' }
    });
    fireEvent.change(screen.getByLabelText(/Phone Number/i), {
      target: { value: '+234 806 450 8595' }
    });
    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: 'john@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/Subject/i), {
      target: { value: 'general' }
    });
    fireEvent.change(screen.getByLabelText(/Message/i), {
      target: { value: 'This is a test message' }
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Send Message/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/mock/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: expect.stringContaining('"name":"John Doe"'),
      });
    });
  });

  it('displays success message after successful submission', async () => {
    // Ensure successful response for this test
    fetch.mockClear();
    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ status: 'success' })
    });

    render(<Contact />);

    // Fill and submit form
    fireEvent.change(screen.getByLabelText(/Full Name/i), {
      target: { value: 'John Doe' }
    });
    fireEvent.change(screen.getByLabelText(/Phone Number/i), {
      target: { value: '+234 806 450 8595' }
    });
    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: 'john@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/Subject/i), {
      target: { value: 'general' }
    });
    fireEvent.change(screen.getByLabelText(/Message/i), {
      target: { value: 'This is a test message' }
    });

    fireEvent.click(screen.getByRole('button', { name: /Send Message/i }));

    await waitFor(() => {
      expect(screen.getByText('Message Sent Successfully')).toBeInTheDocument();
      expect(screen.getByText(/Thank you for contacting us/)).toBeInTheDocument();
    });
  });

  it('displays error message when submission fails', async () => {
    // Clear previous mocks and set up error response
    fetch.mockClear();
    fetch.mockRejectedValueOnce(new Error('Network error'));

    render(<Contact />);

    // Fill and submit form
    fireEvent.change(screen.getByLabelText(/Full Name/i), {
      target: { value: 'John Doe' }
    });
    fireEvent.change(screen.getByLabelText(/Phone Number/i), {
      target: { value: '+234 806 450 8595' }
    });
    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: 'john@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/Subject/i), {
      target: { value: 'general' }
    });
    fireEvent.change(screen.getByLabelText(/Message/i), {
      target: { value: 'This is a test message' }
    });

    fireEvent.click(screen.getByRole('button', { name: /Send Message/i }));

    await waitFor(() => {
      expect(screen.getByText('Failed to Send Message')).toBeInTheDocument();
      expect(screen.getByText(/Failed to send message/)).toBeInTheDocument();
    });
  });

  it('disables form during submission', async () => {
    render(<Contact />);

    // Fill form
    fireEvent.change(screen.getByLabelText(/Full Name/i), {
      target: { value: 'John Doe' }
    });
    fireEvent.change(screen.getByLabelText(/Phone Number/i), {
      target: { value: '+234 806 450 8595' }
    });
    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: 'john@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/Subject/i), {
      target: { value: 'general' }
    });
    fireEvent.change(screen.getByLabelText(/Message/i), {
      target: { value: 'This is a test message' }
    });

    const submitButton = screen.getByRole('button', { name: /Send Message/i });
    fireEvent.click(submitButton);

    // Check that form is disabled during submission
    await waitFor(() => {
      expect(screen.getByText('Sending...')).toBeInTheDocument();
      expect(screen.getByLabelText(/Full Name/i)).toBeDisabled();
      expect(submitButton).toBeDisabled();
    });
  });

  it('clears form after successful submission', async () => {
    render(<Contact />);

    // Fill form
    fireEvent.change(screen.getByLabelText(/Full Name/i), {
      target: { value: 'John Doe' }
    });
    fireEvent.change(screen.getByLabelText(/Phone Number/i), {
      target: { value: '+234 806 450 8595' }
    });
    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: 'john@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/Subject/i), {
      target: { value: 'general' }
    });
    fireEvent.change(screen.getByLabelText(/Message/i), {
      target: { value: 'This is a test message' }
    });

    fireEvent.click(screen.getByRole('button', { name: /Send Message/i }));

    await waitFor(() => {
      expect(screen.getByText('Message Sent Successfully')).toBeInTheDocument();
    });

    // Wait for form to clear
    await waitFor(() => {
      expect(screen.getByLabelText(/Full Name/i)).toHaveValue('');
      expect(screen.getByLabelText(/Email Address/i)).toHaveValue('');
    }, { timeout: 4000 });
  });

  it('has proper accessibility attributes', () => {
    render(<Contact />);

    // Check for proper form labels
    expect(screen.getByLabelText(/Full Name/i)).toHaveAttribute('id', 'name');
    expect(screen.getByLabelText(/Phone Number/i)).toHaveAttribute('id', 'phone');
    expect(screen.getByLabelText(/Email Address/i)).toHaveAttribute('id', 'email');
    expect(screen.getByLabelText(/Subject/i)).toHaveAttribute('id', 'subject');
    expect(screen.getByLabelText(/Message/i)).toHaveAttribute('id', 'message');

    // Check for required field indicators
    expect(screen.getByLabelText(/Full Name/i)).toBeRequired();
    expect(screen.getByLabelText(/Phone Number/i)).toBeRequired();
    expect(screen.getByLabelText(/Email Address/i)).toBeRequired();
    expect(screen.getByLabelText(/Subject/i)).toBeRequired();
    expect(screen.getByLabelText(/Message/i)).toBeRequired();
  });
});
