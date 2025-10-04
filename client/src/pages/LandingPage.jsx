import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-xl sm:text-2xl font-bold text-indigo-600">StoreInventory</h1>
              </div>
            </div>
            <div className="flex space-x-2 sm:space-x-4">
              <Link
                to="/login"
                className="bg-indigo-600 text-white px-3 sm:px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-200 text-sm sm:text-base"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="border border-indigo-600 text-indigo-600 px-3 sm:px-4 py-2 rounded-md hover:bg-indigo-50 transition duration-200 text-sm sm:text-base"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
            Streamline Your Store
            <span className="text-indigo-600 block mt-2"> Inventory Management</span>
          </h1>
          <p className="text-base sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
            Efficient inventory tracking, seamless sales processing, and comprehensive reporting 
            all in one platform. Built for modern retail businesses.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/register"
              className="bg-indigo-600 text-white px-6 sm:px-8 py-3 rounded-lg hover:bg-indigo-700 transition duration-200 font-semibold text-sm sm:text-base"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="border border-indigo-600 text-indigo-600 px-6 sm:px-8 py-3 rounded-lg hover:bg-indigo-50 transition duration-200 font-semibold text-sm sm:text-base"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
            <div className="text-center">
              <div className="bg-indigo-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl sm:text-2xl">📦</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Inventory Management</h3>
              <p className="text-sm sm:text-base text-gray-600 px-4">Track products, manage stock levels, and get low stock alerts.</p>
            </div>
            <div className="text-center">
              <div className="bg-indigo-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl sm:text-2xl">🛒</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Sales Processing</h3>
              <p className="text-sm sm:text-base text-gray-600 px-4">Quick and easy sales with barcode scanning and receipt generation.</p>
            </div>
            <div className="text-center">
              <div className="bg-indigo-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl sm:text-2xl">📊</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Sales Reports</h3>
              <p className="text-sm sm:text-base text-gray-600 px-4">Comprehensive reporting and analytics for business insights.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;