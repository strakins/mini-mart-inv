// Default currency configuration
const defaultCurrency = {
  code: 'USD',
  symbol: '$',
  decimalPlaces: 2,
  thousandsSeparator: ',',
  decimalSeparator: '.',
  symbolPosition: 'before' // 'before' or 'after'
};

// Get currency settings from localStorage or use defaults
export const getCurrencySettings = () => {
  const saved = localStorage.getItem('currencySettings');
  return saved ? JSON.parse(saved) : defaultCurrency;
};

// Save currency settings
export const saveCurrencySettings = (settings) => {
  localStorage.setItem('currencySettings', JSON.stringify(settings));
};

// Format amount with currency settings
export const formatCurrency = (amount) => {
  const currency = getCurrencySettings();
  
  // Format number with thousands and decimal separators
  const formattedAmount = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: currency.decimalPlaces,
    maximumFractionDigits: currency.decimalPlaces,
  }).format(amount);
  
  // Add currency symbol
  if (currency.symbolPosition === 'before') {
    return `${currency.symbol}${formattedAmount}`;
  } else {
    return `${formattedAmount}${currency.symbol}`;
  }
};

// Common currencies for admin to choose from
export const commonCurrencies = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'NGN', symbol: '₦', name: 'Nigerian Naira' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
];