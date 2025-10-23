/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CurrencyProvider, CurrencyContext } from '../CurrencyContext';

// Test component to access context
const TestComponent = () => {
  const { currentCurrency, setCurrentCurrency, formatCurrency } = React.useContext(CurrencyContext);

  return (
    <div>
      <span data-testid="current-currency">{currentCurrency}</span>
      <button
        data-testid="change-currency"
        onClick={() => setCurrentCurrency('USD')}
      >
        Change to USD
      </button>
      <span data-testid="formatted-price">
        {formatCurrency(1000)}
      </span>
    </div>
  );
};

describe('CurrencyContext', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  it('provides default currency from localStorage or DEFAULT_CURRENCY', () => {
    render(
      <CurrencyProvider>
        <TestComponent />
      </CurrencyProvider>
    );

    expect(screen.getByTestId('current-currency')).toHaveTextContent('NGN');
    expect(screen.getByTestId('formatted-price')).toHaveTextContent('₦1,000');
  });

  it('persists currency selection to localStorage', async () => {
    render(
      <CurrencyProvider>
        <TestComponent />
      </CurrencyProvider>
    );

    fireEvent.click(screen.getByTestId('change-currency'));

    await waitFor(() => {
      expect(screen.getByTestId('current-currency')).toHaveTextContent('USD');
    });

    expect(localStorage.getItem('ceotr-currency')).toBe('USD');
  });

  it('formats currency correctly for different currencies', () => {
    const TestFormatComponent = () => {
      const { formatCurrency } = React.useContext(CurrencyContext);

      return (
        <div>
          <span data-testid="ngn-price">{formatCurrency(1000, 'NGN')}</span>
          <span data-testid="usd-price">{formatCurrency(1000, 'USD')}</span>
          <span data-testid="gbp-price">{formatCurrency(1000, 'GBP')}</span>
        </div>
      );
    };

    render(
      <CurrencyProvider>
        <TestFormatComponent />
      </CurrencyProvider>
    );

    expect(screen.getByTestId('ngn-price')).toHaveTextContent('₦1,000');
    expect(screen.getByTestId('usd-price')).toHaveTextContent('$1'); // Uses toFixed(0)
    expect(screen.getByTestId('gbp-price')).toHaveTextContent('£1'); // Uses toFixed(0)
  });

  it('provides price range formatting', () => {
    const TestRangeComponent = () => {
      const { getPriceRange } = React.useContext(CurrencyContext);

      return (
        <span data-testid="price-range">
          {getPriceRange(1000, 5000)}
        </span>
      );
    };

    render(
      <CurrencyProvider>
        <TestRangeComponent />
      </CurrencyProvider>
    );

    expect(screen.getByTestId('price-range')).toHaveTextContent('₦1,000–₦5,000'); // Uses en-dash
  });

  it('loads saved currency from localStorage on initialization', () => {
    localStorage.setItem('ceotr-currency', 'USD');

    render(
      <CurrencyProvider>
        <TestComponent />
      </CurrencyProvider>
    );

    expect(screen.getByTestId('current-currency')).toHaveTextContent('USD');
    expect(screen.getByTestId('formatted-price')).toHaveTextContent('$1'); // Uses toFixed(0)
  });
});
