import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCurrency } from '../context/CurrencyContext';

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
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId, newRole) => {
    try {
      await axios.put(`/api/users/${userId}/role`, { role: newRole });
      fetchUsers(); // Refresh the list
      if (selectedUser && selectedUser._id === userId) {
        setSelectedUser({ ...selectedUser, role: newRole });
      }
    } catch (error) {
      console.error('Error updating user role:', error);
      alert('Error updating user role');
    }
  };

  const toggleUserStatus = async (userId, currentStatus) => {
    try {
      await axios.put(`/api/users/${userId}/status`, { isActive: !currentStatus });
      fetchUsers();
    } catch (error) {
      console.error('Error updating user status:', error);
      alert('Error updating user status');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">User Management</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Users List */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold">All Users</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {users.map((user) => (
              <div key={user._id} className="px-6 py-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-gray-900">{user.name}</h4>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.role === 'admin' 
                          ? 'bg-purple-100 text-purple-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {user.role}
                      </span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {user.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    <p className="text-xs text-gray-400">
                      Joined: {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => fetchUserSales(user._id)}
                      className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      View Sales
                    </button>
                    
                    {user.role === 'sales-agent' ? (
                      <button
                        onClick={() => updateUserRole(user._id, 'admin')}
                        className="text-sm bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700"
                      >
                        Make Admin
                      </button>
                    ) : (
                      <button
                        onClick={() => updateUserRole(user._id, 'sales-agent')}
                        className="text-sm bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700"
                      >
                        Remove Admin
                      </button>
                    )}
                    
                    <button
                      onClick={() => toggleUserStatus(user._id, user.isActive)}
                      className={`text-sm px-3 py-1 rounded ${
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
          <div className="px-6 py-4 border-b border-gray-200">
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
            <div className="p-6">
              {/* Sales Statistics */}
              {salesStats && (
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-600">{salesStats.totalSales}</div>
                    <div className="text-sm text-blue-600">Total Sales</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {formatCurrency(salesStats.totalRevenue.toFixed(2))}
                    </div>
                    <div className="text-sm text-green-600">Total Revenue</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {formatCurrency(salesStats.averageSale.toFixed(2))}
                    </div>
                    <div className="text-sm text-purple-600">Avg. Sale</div>
                  </div>
                </div>
              )}

              {/* Sales List */}
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {userSales.map((sale) => (
                  <div key={sale._id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-medium">Sale ID: {sale.saleId}</div>
                        <div className="text-sm text-gray-500">
                          {new Date(sale.createdAt).toLocaleString()}
                        </div>
                      </div>
                      <div className="text-lg font-bold text-green-600">
                        {formatCurrency(sale.totalAmount.toFixed(2))}
                      </div>
                    </div>
                    
                    <div className="text-sm">
                      {sale.items.map((item, index) => (
                        <div key={index} className="flex justify-between">
                          <span>{item.product.name} x {item.quantity}</span>
                          <span>{formatCurrency((item.price * item.quantity).toFixed(2))}</span>
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