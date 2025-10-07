import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useCurrency } from '../context/CurrencyContext';
import { showToast } from '../utils/toast';
import { generateReceiptPDF } from '../utils/recieptGenerator';

const SalesPage = () => {
  const { user } = useAuth();
  const { formatCurrency } = useCurrency();
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false); // Remove initial loading
  const [processingSale, setProcessingSale] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  // Add search functionality with debouncing
  useEffect(() => {
    if (searchTerm.trim() === '') {
      fetchProducts();
      return;
    }

    // Set up debouncing to avoid too many API calls
    const timeoutId = setTimeout(() => {
      searchProducts();
    }, 300); // 300ms delay

    return () => clearTimeout(timeoutId); // Cleanup on unmount or searchTerm change
  }, [searchTerm]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      showToast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const searchProducts = async () => {
    if (!searchTerm.trim()) {
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(`/products/search?q=${searchTerm}`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error searching products:', error);
      showToast.error('Search failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchProducts();
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    fetchProducts();
  };

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.productId === product._id);
    
    if (existingItem) {
      setCart(cart.map(item =>
        item.productId === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
      showToast.info(`Increased quantity of ${product.name}`);
    } else {
      setCart([...cart, {
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: 1,
        availableQuantity: product.quantity
      }]);
      showToast.success(`${product.name} added to cart`);
    }
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }

    setCart(cart.map(item =>
      item.productId === productId
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const removeFromCart = (productId) => {
    const item = cart.find(item => item.productId === productId);
    setCart(cart.filter(item => item.productId !== productId));
    showToast.warning(`${item.name} removed from cart`);
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const processSale = async () => {
    if (cart.length === 0) {
      showToast.warning('Cart is empty. Add products to complete sale.');
      return;
    }

    setProcessingSale(true);
    const loadingToast = showToast.loading('Processing sale...');

    try {
      const response = await axios.post('/sales', {
        items: cart,
        paymentMethod: 'cash'
      });

      generateReceiptPDF(response.data);
      setCart([]);
      
      showToast.update(loadingToast, {
        render: 'Sale completed successfully!',
        type: 'success',
        isLoading: false,
        autoClose: 2000 // Shorter autoClose for faster feedback
      });
      
      fetchProducts();
    } catch (error) {
      console.error('Sale error:', error);
      showToast.update(loadingToast, {
        render: error.response?.data?.message || 'Error processing sale',
        type: 'error',
        isLoading: false,
        autoClose: 3000 // Shorter error display
      });
    } finally {
      setProcessingSale(false);
    }
  };

  const clearCart = () => {
    if (cart.length === 0) return;
    setCart([]);
    showToast.info('Cart cleared');
  };

  // Mobile cart badge
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Cart FAB */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsCartOpen(true)}
          className="bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-colors relative"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
              {cartItemCount}
            </span>
          )}
        </button>
      </div>

      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Sales Dashboard</h1>
          <p className="text-gray-600 text-sm sm:text-base">Welcome, {user?.name}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Products Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 sm:p-6 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={handleSearchChange}
                      onKeyPress={handleKeyPress}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base pr-10"
                    />
                    {searchTerm && (
                      <button
                        onClick={clearSearch}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        ×
                      </button>
                    )}
                  </div>
                  <button
                    onClick={searchProducts}
                    disabled={loading}
                    className="bg-indigo-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 text-sm sm:text-base whitespace-nowrap"
                  >
                    {loading ? '...' : 'Search'}
                  </button>
                </div>
                {searchTerm && (
                  <p className="text-xs text-gray-500 mt-2">
                    Searching for: "{searchTerm}" • {products.length} product(s) found
                    {loading && ' • Loading...'}
                  </p>
                )}
              </div>

              {/* Stacked Products List */}
              <div className="divide-y divide-gray-200">
                {products.map(product => (
                  <div key={product._id} className="p-4 sm:p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      {/* Product Info */}
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-gray-900">{product.name}</h3>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-1">
                          <span className="text-sm font-medium text-green-600">
                            {formatCurrency(product.price)}
                          </span>
                          <span className={`text-sm ${
                            product.quantity < 10 ? 'text-red-600 font-semibold' : 'text-gray-600'
                          }`}>
                            Stock: {product.quantity}
                          </span>
                          {product.category && (
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded self-start">
                              {product.category}
                            </span>
                          )}
                        </div>
                        {product.description && (
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{product.description}</p>
                        )}
                      </div>

                      {/* Add Button */}
                      <div className="sm:ml-4">
                        <button
                          onClick={() => addToCart(product)}
                          disabled={product.quantity === 0}
                          className={`w-full sm:w-auto px-4 sm:px-6 py-2 rounded-lg font-medium text-sm sm:text-base ${
                            product.quantity === 0
                              ? 'bg-gray-400 cursor-not-allowed text-gray-700'
                              : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                          }`}
                        >
                          {product.quantity === 0 ? 'Out of Stock' : 'Add'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                
                {products.length === 0 && (
                  <div className="p-8 text-center text-gray-500">
                    {searchTerm ? 
                      `No products found matching "${searchTerm}". Try a different search term.` : 
                      'No products found. Add some products in the admin panel.'
                    }
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Cart Section - Desktop */}
          <div className="hidden lg:block bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Shopping Cart</h2>
              {cart.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Clear Cart
                </button>
              )}
            </div>
            
            {cart.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Your cart is empty</p>
            ) : (
              <>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {cart.map(item => (
                    <div key={item.productId} className="border border-gray-200 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm truncate">{item.name}</h4>
                          <p className="text-gray-600 text-xs">{formatCurrency(item.price)} each</p>
                        </div>
                        
                        <div className="flex items-center space-x-2 mx-4">
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 text-xs"
                          >
                            -
                          </button>
                          <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            disabled={item.quantity >= item.availableQuantity}
                            className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 text-xs disabled:opacity-50"
                          >
                            +
                          </button>
                        </div>
                        
                        <div className="text-right min-w-20">
                          <div className="font-semibold text-sm">
                            {formatCurrency(item.price * item.quantity)}
                          </div>
                        </div>
                        
                        <button
                          onClick={() => removeFromCart(item.productId)}
                          className="ml-2 text-red-600 hover:text-red-800 text-sm"
                          title="Remove item"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xl font-bold">Total:</span>
                    <span className="text-xl font-bold">{formatCurrency(getTotal())}</span>
                  </div>
                  
                  <button
                    onClick={processSale}
                    disabled={processingSale || cart.length === 0}
                    className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                  >
                    {processingSale ? 'Processing...' : 'Complete Sale'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Cart Sidebar */}
      {isCartOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsCartOpen(false)}
          />
          
          {/* Cart Panel */}
          <div className="absolute right-0 top-0 h-full w-4/5 max-w-sm bg-white shadow-xl">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-lg font-bold">Shopping Cart</h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-4">
                {cart.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">Your cart is empty</p>
                ) : (
                  <div className="space-y-3">
                    {cart.map(item => (
                      <div key={item.productId} className="border border-gray-200 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm truncate">{item.name}</h4>
                            <p className="text-gray-600 text-xs">{formatCurrency(item.price)} each</p>
                          </div>
                          
                          <div className="flex items-center space-x-2 mx-2">
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                              className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 text-xs"
                            >
                              -
                            </button>
                            <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                              disabled={item.quantity >= item.availableQuantity}
                              className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 text-xs disabled:opacity-50"
                            >
                              +
                            </button>
                          </div>
                          
                          <div className="text-right min-w-16">
                            <div className="font-semibold text-sm">
                              {formatCurrency(item.price * item.quantity)}
                            </div>
                          </div>
                          
                          <button
                            onClick={() => removeFromCart(item.productId)}
                            className="ml-1 text-red-600 hover:text-red-800 text-sm"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {cart.length > 0 && (
                <div className="border-t p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">Total:</span>
                    <span className="text-lg font-bold">{formatCurrency(getTotal())}</span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={clearCart}
                      className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 font-medium"
                    >
                      Clear
                    </button>
                    <button
                      onClick={processSale}
                      disabled={processingSale}
                      className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 font-medium"
                    >
                      {processingSale ? 'Processing...' : 'Checkout'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesPage;