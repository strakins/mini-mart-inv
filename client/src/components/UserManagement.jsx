import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCurrency } from '../context/CurrencyContext';
import { showToast } from '../utils/toast';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userSales, setUserSales] = useState([]);
  const [salesStats, setSalesStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const { formatCurrency } = useCurrency();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      showToast.error('Failed to load users');
    }
  };

  const fetchUserSales = async (userId) => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/users/${userId}/sales`);
      setUserSales(response.data.sales);
      setSalesStats(response.data.statistics);
      setSelectedUser(users.find(user => user._id === userId));
    } catch (error) {
      console.error('Error fetching user sales:', error);
      showToast.error('Failed to load user sales');
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId, newRole) => {
    try {
      await axios.put(`/api/users/${userId}/role`, { role: newRole });
      fetchUsers();
      if (selectedUser && selectedUser._id === userId) {
        setSelectedUser({ ...selectedUser, role: newRole });
      }
      showToast.success(`User role updated to ${newRole}`);
    } catch (error) {
      console.error('Error updating user role:', error);
      showToast.error('Error updating user role');
    }
  };

  const toggleUserStatus = async (userId, currentStatus) => {
    try {
      await axios.put(`/api/users/${userId}/status`, { isActive: !currentStatus });
      fetchUsers();
      showToast.success(`User ${!currentStatus ? 'activated' : 'deactivated'}`);
    } catch (error) {
      console.error('Error updating user status:', error);
      showToast.error('Error updating user status');
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-6">User Management</h2>
      
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        {/* Users List */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold">All Users</h3>
          </div>
          <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
            {users.map((user) => (
              <div key={user._id} className="px-4 sm:px-6 py-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                      <h4 className="font-medium text-gray-900 text-sm sm:text-base">{user.name}</h4>
                      <div className="flex flex-wrap gap-1">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          user.role === 'admin' 
                            ? 'bg-purple-100 text-purple-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {user.role}
                        </span>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          user.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {user.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    <p className="text-xs text-gray-400">
                      Joined: {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={() => fetchUserSales(user._id)}
                      className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 whitespace-nowrap"
                    >
                      View Sales
                    </button>
                    
                    {user.role === 'sales-agent' ? (
                      <button
                        onClick={() => updateUserRole(user._id, 'admin')}
                        className="text-sm bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 whitespace-nowrap"
                      >
                        Make Admin
                      </button>
                    ) : (
                      <button
                        onClick={() => updateUserRole(user._id, 'sales-agent')}
                        className="text-sm bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700 whitespace-nowrap"
                      >
                        Remove Admin
                      </button>
                    )}
                    
                    <button
                      onClick={() => toggleUserStatus(user._id, user.isActive)}
                      className={`text-sm px-3 py-1 rounded whitespace-nowrap ${
                        user.isActive
                          ? 'bg-red-600 text-white hover:bg-red-700'
                          : 'bg-green-600 text-white hover:bg-green-700'
                      }`}
                    >
                      {user.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Sales Details */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold">
              {selectedUser ? `${selectedUser.name}'s Sales` : 'User Sales Details'}
            </h3>
            {selectedUser && (
              <p className="text-sm text-gray-600">Click on a user to view their sales</p>
            )}
          </div>

          {loading ? (
            <div className="p-6 text-center">Loading sales data...</div>
          ) : selectedUser ? (
            <div className="p-4 sm:p-6">
              {/* Sales Statistics */}
              {salesStats && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <div className="text-xl sm:text-2xl font-bold text-blue-600">{salesStats.totalSales}</div>
                    <div className="text-sm text-blue-600">Total Sales</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <div className="text-xl sm:text-2xl font-bold text-green-600">
                      {formatCurrency(salesStats.totalRevenue)}
                    </div>
                    <div className="text-sm text-green-600">Total Revenue</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg text-center">
                    <div className="text-xl sm:text-2xl font-bold text-purple-600">
                      {formatCurrency(salesStats.averageSale)}
                    </div>
                    <div className="text-sm text-purple-600">Avg. Sale</div>
                  </div>
                </div>
              )}

              {/* Sales List */}
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {userSales.map((sale) => (
                  <div key={sale._id} className="border border-gray-200 rounded-lg p-3 sm:p-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                      <div>
                        <div className="font-medium text-sm">Sale: {sale.saleId}</div>
                        <div className="text-xs sm:text-sm text-gray-500">
                          {new Date(sale.createdAt).toLocaleString()}
                        </div>
                      </div>
                      <div className="text-lg font-bold text-green-600">
                        {formatCurrency(sale.totalAmount)}
                      </div>
                    </div>
                    
                    <div className="text-xs sm:text-sm space-y-1">
                      {sale.items.map((item, index) => (
                        <div key={index} className="flex justify-between">
                          <span>{item.product.name} x {item.quantity}</span>
                          <span>{formatCurrency(item.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                
                {userSales.length === 0 && (
                  <div className="text-center text-gray-500 py-8">
                    No sales records found for this user.
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="p-6 text-center text-gray-500">
              Select a user to view their sales details
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;