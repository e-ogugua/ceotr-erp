import React, { createContext, useState } from 'react';
import { CURRENCIES, DEFAULT_CURRENCY } from '../config/currency';

export const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [currentCurrency, setCurrentCurrency] = useState(DEFAULT_CURRENCY);

  return (
    <CurrencyContext.Provider value={{
      currentCurrency,
      setCurrentCurrency,
      CURRENCIES
    }}>
      {children}
    </CurrencyContext.Provider>
  );
};
