// Currency configuration with hardcoded conversion rates
// Base currency is NGN (₦) - Nigerian Naira
// All other currencies are converted from NGN

export const CURRENCIES = {
  NGN: {
    symbol: '₦',
    name: 'Nigerian Naira',
    rate: 1 // Base rate
  },
  USD: {
    symbol: '$',
    name: 'US Dollar',
    rate: 0.0012 // 1 NGN = 0.0012 USD (approx 1 USD = 833 NGN)
  },
  GBP: {
    symbol: '£',
    name: 'British Pound',
    rate: 0.001 // 1 NGN = 0.001 GBP (approx 1 GBP = 1000 NGN)
  }
};

export const DEFAULT_CURRENCY = 'NGN';

// Helper function to format currency amounts
export const formatCurrency = (amount, currency = DEFAULT_CURRENCY) => {
  const currencyConfig = CURRENCIES[currency];
  const convertedAmount = amount * currencyConfig.rate;

  // Format based on currency
  if (currency === 'NGN') {
    return `${currencyConfig.symbol}${convertedAmount.toLocaleString()}`;
  } else if (currency === 'USD') {
    return `${currencyConfig.symbol}${convertedAmount.toFixed(0)}`;
  } else if (currency === 'GBP') {
    return `${currencyConfig.symbol}${convertedAmount.toFixed(0)}`;
  }

  return `${currencyConfig.symbol}${convertedAmount.toFixed(2)}`;
};

// Helper function to get price range string
export const getPriceRange = (minPrice, maxPrice, currency = DEFAULT_CURRENCY) => {
  return `${formatCurrency(minPrice, currency)}–${formatCurrency(maxPrice, currency)}`;
};
