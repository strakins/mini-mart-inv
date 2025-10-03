import React, { createContext, useState, useContext, useEffect } from 'react';
import { getCurrencySettings, saveCurrencySettings, formatCurrency as formatCurrencyUtil } from '../utils/currencyFormatter';

const CurrencyContext = createContext();

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

export const CurrencyProvider = ({ children }) => {
  const [currencySettings, setCurrencySettings] = useState(getCurrencySettings());

  useEffect(() => {
    // Load currency settings on app start
    setCurrencySettings(getCurrencySettings());
  }, []);

  const updateCurrencySettings = (newSettings) => {
    setCurrencySettings(newSettings);
    saveCurrencySettings(newSettings);
  };

  const formatCurrency = (amount) => {
    return formatCurrencyUtil(amount);
  };

  const value = {
    currencySettings,
    updateCurrencySettings,
    formatCurrency
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};