import React, { useState, useEffect } from 'react';
import { useCurrency } from '../context/CurrencyContext';
import { commonCurrencies } from '../utils/currencyFormatter';
import { showToast } from '../utils/toast';

const CurrencySettings = () => {
  const { currencySettings, updateCurrencySettings, formatCurrency } = useCurrency();
  const [settings, setSettings] = useState(currencySettings);

  useEffect(() => {
    setSettings(currencySettings);
  }, [currencySettings]);

  const handleSave = () => {
    updateCurrencySettings(settings);
    showToast.success('Currency settings updated successfully!');
  };

  const handleCurrencyChange = (currencyCode) => {
    const selectedCurrency = commonCurrencies.find(c => c.code === currencyCode);
    if (selectedCurrency) {
      setSettings({
        ...settings,
        code: selectedCurrency.code,
        symbol: selectedCurrency.symbol
      });
    }
  };

  const previewAmount = 1234567.89;

  return (
    <div className="bg-white rounded-lg shadow p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-6">Currency Settings</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
        {/* Currency Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Currency
          </label>
          <select
            value={settings.code}
            onChange={(e) => handleCurrencyChange(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
          >
            {commonCurrencies.map(currency => (
              <option key={currency.code} value={currency.code}>
                {currency.name} ({currency.symbol})
              </option>
            ))}
          </select>
        </div>

        {/* Symbol Position */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Symbol Position
          </label>
          <select
            value={settings.symbolPosition}
            onChange={(e) => setSettings({ ...settings, symbolPosition: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
          >
            <option value="before">Before amount ($100)</option>
            <option value="after">After amount (100$)</option>
          </select>
        </div>

        {/* Decimal Places */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Decimal Places
          </label>
          <select
            value={settings.decimalPlaces}
            onChange={(e) => setSettings({ ...settings, decimalPlaces: parseInt(e.target.value) })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
          >
            <option value="0">0 (100)</option>
            <option value="2">2 (100.00)</option>
          </select>
        </div>

        {/* Custom Symbol */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Custom Symbol (optional)
          </label>
          <input
            type="text"
            value={settings.symbol}
            onChange={(e) => setSettings({ ...settings, symbol: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
            placeholder="$"
            maxLength="3"
          />
        </div>
      </div>

      {/* Preview */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h3 className="font-semibold mb-2 text-sm sm:text-base">Preview</h3>
        <div className="text-xl sm:text-2xl font-bold text-green-600">
          {formatCurrency(previewAmount)}
        </div>
        <p className="text-xs sm:text-sm text-gray-600 mt-1">
          This is how amounts will appear throughout the application
        </p>
      </div>

      {/* Save Button */}
      <div className="flex items-center">
        <button
          onClick={handleSave}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition duration-200 text-sm sm:text-base"
        >
          Save Settings
        </button>
      </div>

      {/* Current Settings Info */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-blue-800 mb-2 text-sm sm:text-base">Current Settings:</h4>
        <div className="text-xs sm:text-sm text-blue-700 space-y-1">
          <div>Currency: {settings.code} ({settings.symbol})</div>
          <div>Symbol Position: {settings.symbolPosition}</div>
          <div>Decimal Places: {settings.decimalPlaces}</div>
        </div>
      </div>
    </div>
  );
};

export default CurrencySettings;