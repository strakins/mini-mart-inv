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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      showToast.error('Failed to load products');
    }
  };

  const searchProducts = async () => {
    if (!searchTerm.trim()) {
      fetchProducts();
      return;
    }

    try {
      const response = await axios.get(`/api/products/search?q=${searchTerm}`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error searching products:', error);
      showToast.error('Search failed');
    }
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

    setLoading(true);
    const loadingToast = showToast.loading('Processing sale...');

    try {
      const response = await axios.post('/api/sales', {
        items: cart,
        paymentMethod: 'cash'
      });

      // Generate receipt
      generateReceiptPDF(response.data);
      
      // Clear cart
      setCart([]);
      
      showToast.update(loadingToast, {
        render: 'Sale completed successfully!',
        type: 'success',
        isLoading: false,
        autoClose: 3000
      });
      
      // Refresh products
      fetchProducts();
    } catch (error) {
      console.error('Sale error:', error);
      showToast.update(loadingToast, {
        render: error.response?.data?.message || 'Error processing sale',
        type: 'error',
        isLoading: false,
        autoClose: 5000
      });
    } finally {
      setLoading(false);
    }
  };

  const clearCart = () => {
    if (cart.length === 0) return;
    
    setCart([]);
    showToast.info('Cart cleared');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Sales Dashboard</h1>
          <p className="text-gray-600">Welcome, {user?.name}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Products Section - Updated to stacked layout */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="Search by name, barcode, or category..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && searchProducts()}
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    onClick={searchProducts}
                    className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
                  >
                    Search
                  </button>
                </div>
              </div>

              {/* Stacked Products List */}
              <div className="divide-y divide-gray-200">
                {products.map(product => (
                  <div key={product._id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      {/* Product Info */}
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-gray-900">{product.name}</h3>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-sm font-medium text-green-600">
                            {formatCurrency(product.price)}
                          </span>
                          <span className={`text-sm ${
                            product.quantity < 10 ? 'text-red-600 font-semibold' : 'text-gray-600'
                          }`}>
                            Stock: {product.quantity}
                          </span>
                          {product.category && (
                            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                              {product.category}
                            </span>
                          )}
                        </div>
                        {product.description && (
                          <p className="text-sm text-gray-600 mt-1">{product.description}</p>
                        )}
                      </div>

                      {/* Add Button */}
                      <div className="ml-4">
                        <button
                          onClick={() => addToCart(product)}
                          disabled={product.quantity === 0}
                          className={`px-6 py-2 rounded-lg font-medium ${
                            product.quantity === 0
                              ? 'bg-gray-400 cursor-not-allowed text-gray-700'
                              : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                          }`}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                
                {products.length === 0 && (
                  <div className="p-8 text-center text-gray-500">
                    No products found. {searchTerm ? 'Try a different search.' : 'Add some products in the admin panel.'}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Cart Section */}
          <div className="bg-white rounded-lg shadow p-6">
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
                      {/* Single row layout */}
                      <div className="flex items-center justify-between">
                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm truncate">{item.name}</h4>
                          <p className="text-gray-600 text-xs">{formatCurrency(item.price)} each</p>
                        </div>
                        
                        {/* Quantity Controls */}
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
                        
                        {/* Total Price */}
                        <div className="text-right min-w-20">
                          <div className="font-semibold text-sm">
                            {formatCurrency(item.price * item.quantity)}
                          </div>
                        </div>
                        
                        {/* Remove Button */}
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
                    disabled={loading || cart.length === 0}
                    className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                  >
                    {loading ? 'Processing...' : 'Complete Sale'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesPage;