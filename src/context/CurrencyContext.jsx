/**
 * CurrencyContext.jsx - Currency state management for CEOTR Ltd ERP Suite
 *
 * Provides global currency state management with formatting utilities.
 * The context is memoized to prevent unnecessary re-renders across the application.
 *
 * Performance Optimizations:
 * - useMemo for context value to prevent re-renders when currency hasn't changed
 * - Centralized currency formatting logic accessible to all components
 * - Persistent currency selection via localStorage integration
 *
 * @fileoverview Currency state management with performance optimizations
 */
import React, { createContext, useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { CURRENCIES, DEFAULT_CURRENCY, formatCurrency, getPriceRange } from '../config/currency';

export const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  // Get initial currency from localStorage or use default
  const [currentCurrency, setCurrentCurrency] = useState(() => {
    const saved = localStorage.getItem('ceotr-currency');
    return saved || DEFAULT_CURRENCY;
  });

  // Memoized currency setter that also persists to localStorage
  const updateCurrency = useCallback((currency) => {
    setCurrentCurrency(currency);
    localStorage.setItem('ceotr-currency', currency);
  }, []);

  // Memoized context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    currentCurrency,
    setCurrentCurrency: updateCurrency,
    CURRENCIES,
    formatCurrency: (amount, currency = currentCurrency) => formatCurrency(amount, currency),
    getPriceRange: (minPrice, maxPrice, currency = currentCurrency) =>
      getPriceRange(minPrice, maxPrice, currency)
  }), [currentCurrency, updateCurrency]);

  return (
    <CurrencyContext.Provider value={contextValue}>
      {children}
    </CurrencyContext.Provider>
  );
};

CurrencyProvider.propTypes = {
  children: PropTypes.node.isRequired
};
