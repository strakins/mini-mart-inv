import React, { useState, useEffect } from 'react';
import ProductManagement from '../components/ProductManagement';
import UserManagement from '../components/UserManagement';
import SalesReport from '../components/SalesReport';
import CurrencySettings from '../components/CurrencySettings';
import { getDashboardStats } from '../utils/dashboardStats';
import { useCurrency } from '../context/CurrencyContext'; // Add this import

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    todaysRevenue: 0,
    lowStockItems: 0,
    recentSales: []
  });
  const [loading, setLoading] = useState(true);
  const { formatCurrency } = useCurrency(); // Add this

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    const dashboardStats = await getDashboardStats();
    setStats(dashboardStats);
    setLoading(false);
  };

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: '📊' },
    { id: 'products', name: 'Product Management', icon: '📦' },
    { id: 'users', name: 'User Management', icon: '👥' },
    { id: 'sales', name: 'Sales Report', icon: '💰' },
    { id: 'currency', name: 'Currency Settings', icon: '💱' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'products':
        return <ProductManagement />;
      case 'users':
        return <UserManagement />;
      case 'sales':
        return <SalesReport />;
      case 'currency':
        return <CurrencySettings />;
      default:
        return <DashboardOverview />;
    }
  };

  const DashboardOverview = () => (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Admin Dashboard Overview</h2>
        <button
          onClick={loadDashboardData}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          Refresh Data
        </button>
      </div>
      
      {loading ? (
        <div className="text-center py-8">Loading dashboard data...</div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg mr-4">
                  <span className="text-2xl">👥</span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold">{stats.totalUsers}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg mr-4">
                  <span className="text-2xl">📦</span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Products</p>
                  <p className="text-2xl font-bold">{stats.totalProducts}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-lg mr-4">
                  <span className="text-2xl">💰</span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Today's Revenue</p>
                  <p className="text-2xl font-bold">{formatCurrency(stats.todaysRevenue)}</p> {/* Updated */}
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 bg-red-100 rounded-lg mr-4">
                  <span className="text-2xl">⚠️</span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Low Stock Items</p>
                  <p className="text-2xl font-bold">{stats.lowStockItems}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => setActiveTab('products')}
                  className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-200"
                >
                  <div className="flex items-center">
                    <span className="text-xl mr-3">📦</span>
                    <div>
                      <div className="font-medium">Manage Products</div>
                      <div className="text-sm text-gray-600">Add, edit, or remove products</div>
                    </div>
                  </div>
                </button>
                
                <button 
                  onClick={() => setActiveTab('users')}
                  className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-200"
                >
                  <div className="flex items-center">
                    <span className="text-xl mr-3">👥</span>
                    <div>
                      <div className="font-medium">Manage Users</div>
                      <div className="text-sm text-gray-600">View and manage user accounts</div>
                    </div>
                  </div>
                </button>
                
                <button 
                  onClick={() => setActiveTab('sales')}
                  className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-200"
                >
                  <div className="flex items-center">
                    <span className="text-xl mr-3">💰</span>
                    <div>
                      <div className="font-medium">Sales Reports</div>
                      <div className="text-sm text-gray-600">View sales analytics and reports</div>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Recent Sales */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Sales</h3>
              <div className="space-y-3">
                {stats.recentSales.length > 0 ? (
                  stats.recentSales.map((sale) => (
                    <div key={sale._id} className="border border-gray-200 rounded-lg p-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium text-sm">{sale.saleId}</div>
                          <div className="text-xs text-gray-500">
                            {new Date(sale.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="text-green-600 font-semibold">
                          {formatCurrency(sale.totalAmount)} {/* Updated */}
                        </div>
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        by {sale.salesAgent?.name || 'Unknown'}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 py-4">
                    No recent sales
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Tab Navigation */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Content */}
      {renderContent()}
    </div>
  );
};

export default AdminDashboard;