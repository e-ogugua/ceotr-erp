/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import AnalyticsDashboard from '../AnalyticsDashboard';

// Mock console methods
const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});
const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});

// Mock setTimeout and clearInterval
jest.useFakeTimers();

describe('AnalyticsDashboard', () => {
  beforeEach(() => {
    mockConsoleLog.mockClear();
    mockAlert.mockClear();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('renders analytics dashboard with initial stats', () => {
    render(<AnalyticsDashboard />);

    expect(screen.getByText('Live Analytics')).toBeInTheDocument();
    expect(screen.getByText('Live')).toBeInTheDocument();
    expect(screen.getByText('Visitors Today')).toBeInTheDocument();
    expect(screen.getByText('Page Views')).toBeInTheDocument();
    expect(screen.getByText('Avg. Time')).toBeInTheDocument();
    expect(screen.getByText('Popular Service')).toBeInTheDocument();
  });

  it('renders chat widget button', () => {
    render(<AnalyticsDashboard />);

    const chatButton = screen.getByRole('button');
    expect(chatButton).toBeInTheDocument();
    expect(chatButton).toHaveClass('bg-gradient-to-r');
  });

  it('opens and closes chat widget', () => {
    render(<AnalyticsDashboard />);

    const chatButton = screen.getByRole('button');

    // Chat should be initially closed
    expect(screen.queryByText('Live Chat')).not.toBeInTheDocument();

    // Open chat
    fireEvent.click(chatButton);
    expect(screen.getByText('Live Chat')).toBeInTheDocument();

    // Check for chat input using placeholder attribute
    const messageInput = screen.getByPlaceholderText('Type your message...');
    expect(messageInput).toBeInTheDocument();

    expect(screen.getByText('Call Now')).toBeInTheDocument();
    expect(screen.getByText('24/7 Support')).toBeInTheDocument();

    // Close chat
    const closeButton = screen.getByText('×');
    fireEvent.click(closeButton);
    expect(screen.queryByText('Live Chat')).not.toBeInTheDocument();
  });

  it('handles chat message submission', () => {
    render(<AnalyticsDashboard />);

    // Open chat
    fireEvent.click(screen.getByRole('button'));

    // Type a message
    const messageInput = screen.getByPlaceholderText('Type your message...');
    fireEvent.change(messageInput, { target: { value: 'Hello, I need help' } });

    // Submit the message
    const sendButton = screen.getByRole('button', { name: 'Send' });
    fireEvent.click(sendButton);

    // Check that the message was logged
    expect(mockConsoleLog).toHaveBeenCalledWith('Chat message:', 'Hello, I need help');

    // Check that alert was called after timeout
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(mockAlert).toHaveBeenCalledWith('Thank you for your message! Our team will get back to you shortly.');
  });

  it('clears chat input after message submission', async () => {
    render(<AnalyticsDashboard />);

    // Open chat
    fireEvent.click(screen.getByRole('button'));

    // Type and submit a message
    const messageInput = screen.getByPlaceholderText('Type your message...');
    fireEvent.change(messageInput, { target: { value: 'Test message' } });

    const sendButton = screen.getByRole('button', { name: 'Send' });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(messageInput.value).toBe('');
    });
  });

  it('does not submit empty chat messages', () => {
    render(<AnalyticsDashboard />);

    // Open chat
    fireEvent.click(screen.getByRole('button'));

    // Try to submit empty message
    const sendButton = screen.getByRole('button', { name: 'Send' });
    fireEvent.click(sendButton);

    // Should not log or alert
    expect(mockConsoleLog).not.toHaveBeenCalled();
    expect(mockAlert).not.toHaveBeenCalled();
  });

  it('cleans up interval on unmount', () => {
    const clearIntervalSpy = jest.spyOn(global, 'clearInterval');

    const { unmount } = render(<AnalyticsDashboard />);

    // Fast-forward time to trigger interval
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    unmount();

    // clearInterval should have been called
    expect(clearIntervalSpy).toHaveBeenCalled();

    clearIntervalSpy.mockRestore();
  });

  it('displays proper phone number link', () => {
    render(<AnalyticsDashboard />);

    // Open chat
    fireEvent.click(screen.getByRole('button'));

    const phoneLink = screen.getByRole('link', { name: /Call Now/i });
    expect(phoneLink).toHaveAttribute('href', 'tel:+2348064508595');
  });

  it('has proper accessibility attributes', () => {
    render(<AnalyticsDashboard />);

    // Check for proper button labeling
    const chatButton = screen.getByRole('button');
    expect(chatButton).toBeInTheDocument();

    // Open chat and check form accessibility
    fireEvent.click(chatButton);

    const messageInput = screen.getByPlaceholderText('Type your message...');
    expect(messageInput).toHaveAttribute('type', 'text');

    const sendButton = screen.getByRole('button', { name: 'Send' });
    expect(sendButton).toHaveAttribute('type', 'submit');
  });

  it('maintains performance with memoization', () => {
    const { rerender } = render(<AnalyticsDashboard />);

    // Component should not cause unnecessary re-renders
    expect(screen.getByText('Live Analytics')).toBeInTheDocument();

    // Re-render with same props should not cause issues
    rerender(<AnalyticsDashboard />);

    expect(screen.getByText('Live Analytics')).toBeInTheDocument();
  });
});
