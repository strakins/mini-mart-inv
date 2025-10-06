// import React, { useState, useEffect } from 'react';
// import ProductManagement from '../components/ProductManagement';
// import UserManagement from '../components/UserManagement';
// import SalesReport from '../components/SalesReport';
// import CurrencySettings from '../components/CurrencySettings';
// import { getDashboardStats } from '../utils/dashboardStats';
// import { useCurrency } from '../context/CurrencyContext';
// import Loader from '../components/Loader'

// const AdminDashboard = () => {
//   const [activeTab, setActiveTab] = useState('dashboard');
//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     totalProducts: 0,
//     todaysRevenue: 0,
//     lowStockItems: 0,
//     recentSales: [] 
//   });

  
//   const [loading, setLoading] = useState(true);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const { formatCurrency } = useCurrency();

//   useEffect(() => {
//     loadDashboardData();
//   }, []);

//   const loadDashboardData = async () => {
//     setLoading(true);
//     const dashboardStats = await getDashboardStats();
//     setStats(dashboardStats);
//     setLoading(false);
//   };

//   const tabs = [
//     { id: 'dashboard', name: 'Dashboard', icon: '📊' },
//     { id: 'products', name: 'Products', icon: '📦' },
//     { id: 'users', name: 'Users', icon: '👥' },
//     { id: 'sales', name: 'Sales', icon: '💰' },
//     { id: 'currency', name: 'Currency', icon: '💱' },
//   ];

//   const renderContent = () => {
//     switch (activeTab) {
//       case 'products':
//         return <ProductManagement />;
//       case 'users':
//         return <UserManagement />;
//       case 'sales':
//         return <SalesReport />;
//       case 'currency':
//         return <CurrencySettings />;
//       default:
//         return <DashboardOverview />;
//     }
//   };

//   const DashboardOverview = () => (
//     <div className="p-4 sm:p-6">
//       <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
//         <h2 className="text-2xl font-bold">Admin Dashboard</h2>
//         <button
//           onClick={loadDashboardData}
//           className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 text-sm sm:text-base"
//         >
//           Refresh Data
//         </button>
//       </div>
      
//       {loading ? (
//         <div className="text-center py-8">
//           {/* Loading dashboard data... */}
//           <Loader />
//         </div>
//       ) : (
//         <>
//           {/* Stats Cards - Responsive grid */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
//             <div className="bg-white rounded-lg shadow p-4 sm:p-6">
//               <div className="flex items-center">
//                 <div className="p-2 sm:p-3 bg-blue-100 rounded-lg mr-3 sm:mr-4">
//                   <span className="text-xl sm:text-2xl">👥</span>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-600">Total Users</p>
//                   <p className="text-xl sm:text-2xl font-bold">{stats.totalUsers}</p>
//                 </div>
//               </div>
//             </div>
            
//             <div className="bg-white rounded-lg shadow p-4 sm:p-6">
//               <div className="flex items-center">
//                 <div className="p-2 sm:p-3 bg-green-100 rounded-lg mr-3 sm:mr-4">
//                   <span className="text-xl sm:text-2xl">📦</span>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-600">Total Products</p>
//                   <p className="text-xl sm:text-2xl font-bold">{stats.totalProducts}</p>
//                 </div>
//               </div>
//             </div>
            
//             <div className="bg-white rounded-lg shadow p-4 sm:p-6">
//               <div className="flex items-center">
//                 <div className="p-2 sm:p-3 bg-purple-100 rounded-lg mr-3 sm:mr-4">
//                   <span className="text-xl sm:text-2xl">💰</span>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-600">Today's Revenue</p>
//                   <p className="text-xl sm:text-2xl font-bold">{formatCurrency(stats.todaysRevenue)}</p>
//                 </div>
//               </div>
//             </div>
            
//             <div className="bg-white rounded-lg shadow p-4 sm:p-6">
//               <div className="flex items-center">
//                 <div className="p-2 sm:p-3 bg-red-100 rounded-lg mr-3 sm:mr-4">
//                   <span className="text-xl sm:text-2xl">⚠️</span>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-600">Low Stock</p>
//                   <p className="text-xl sm:text-2xl font-bold">{stats.lowStockItems}</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
//             {/* Quick Actions */}
//             <div className="bg-white rounded-lg shadow p-4 sm:p-6">
//               <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
//               <div className="space-y-2 sm:space-y-3">
//                 {tabs.filter(tab => tab.id !== 'dashboard').map((tab) => (
//                   <button 
//                     key={tab.id}
//                     onClick={() => setActiveTab(tab.id)}
//                     className="w-full text-left p-3 sm:p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-200"
//                   >
//                     <div className="flex items-center">
//                       <span className="text-lg sm:text-xl mr-3">{tab.icon}</span>
//                       <div>
//                         <div className="font-medium text-sm sm:text-base">{tab.name}</div>
//                         <div className="text-xs sm:text-sm text-gray-600">Manage {tab.name.toLowerCase()}</div>
//                       </div>
//                     </div>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Recent Sales */}
//             <div className="bg-white rounded-lg shadow p-4 sm:p-6">
//               <h3 className="text-lg font-semibold mb-4">Recent Sales</h3>
//               <div className="space-y-2 sm:space-y-3">
//                 {stats.recentSales.length > 0 ? (
//                   stats.recentSales.map((sale) => (
//                     <div key={sale._id} className="border border-gray-200 rounded-lg p-3">
//                       <div className="flex justify-between items-center">
//                         <div>
//                           <div className="font-medium text-sm">{sale.saleId}</div>
//                           <div className="text-xs text-gray-500">
//                             {new Date(sale.createdAt).toLocaleDateString()}
//                           </div>
//                         </div>
//                         <div className="text-green-600 font-semibold text-sm sm:text-base">
//                           {formatCurrency(sale.totalAmount)}
//                         </div>
//                       </div>
//                       <div className="text-xs text-gray-600 mt-1">
//                         by {sale.salesAgent?.name || 'Unknown'}
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <div className="text-center text-gray-500 py-4">
//                     No recent sales
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Desktop Tab Navigation */}
//       <div className="bg-white shadow-sm hidden sm:block">
//         <div className="max-w-7xl mx-auto">
//           <div className="border-b border-gray-200">
//             <nav className="-mb-px flex space-x-4 sm:space-x-8 px-4 sm:px-6">
//               {tabs.map((tab) => (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id)}
//                   className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
//                     activeTab === tab.id
//                       ? 'border-indigo-500 text-indigo-600'
//                       : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                   }`}
//                 >
//                   <span className="mr-2">{tab.icon}</span>
//                   {tab.name}
//                 </button>
//               ))}
//             </nav>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Tab Navigation */}
//       <div className="bg-white shadow-sm sm:hidden">
//         <div className="border-b border-gray-200">
//           <button
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             className="w-full flex justify-between items-center p-4 text-left"
//           >
//             <span className="font-medium">
//               {tabs.find(tab => tab.id === activeTab)?.name}
//             </span>
//             <svg 
//               className={`w-5 h-5 transition-transform ${isMobileMenuOpen ? 'transform rotate-180' : ''}`}
//               fill="none" 
//               stroke="currentColor" 
//               viewBox="0 0 24 24"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//             </svg>
//           </button>
          
//           {isMobileMenuOpen && (
//             <div className="border-t border-gray-200">
//               {tabs.map((tab) => (
//                 <button
//                   key={tab.id}
//                   onClick={() => {
//                     setActiveTab(tab.id);
//                     setIsMobileMenuOpen(false);
//                   }}
//                   className={`w-full text-left p-4 border-l-4 ${
//                     activeTab === tab.id
//                       ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
//                       : 'border-transparent text-gray-600 hover:bg-gray-50'
//                   }`}
//                 >
//                   <span className="mr-3">{tab.icon}</span>
//                   {tab.name}
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Content */}
//       {renderContent()}
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useState, useEffect } from 'react';
import ProductManagement from '../components/ProductManagement';
import UserManagement from '../components/UserManagement';
import SalesReport from '../components/SalesReport';
import CurrencySettings from '../components/CurrencySettings';
import { getDashboardStats } from '../utils/dashboardStats';
import { useCurrency } from '../context/CurrencyContext';
import Loader from '../components/Loader';

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { formatCurrency } = useCurrency();

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
    { id: 'products', name: 'Products', icon: '📦' },
    { id: 'users', name: 'Users', icon: '👥' },
    { id: 'sales', name: 'Sales', icon: '💰' },
    { id: 'currency', name: 'Currency', icon: '💱' },
  ];

  // Define DashboardOverview component before using it
  const DashboardOverview = () => (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <button
          onClick={loadDashboardData}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 text-sm sm:text-base"
        >
          Refresh Data
        </button>
      </div>
      
      {loading ? (
        <div className="text-center py-8">
          <Loader />
        </div>
      ) : (
        <>
          {/* Stats Cards - Responsive grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="bg-white rounded-lg shadow p-4 sm:p-6">
              <div className="flex items-center">
                <div className="p-2 sm:p-3 bg-blue-100 rounded-lg mr-3 sm:mr-4">
                  <span className="text-xl sm:text-2xl">👥</span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Users</p>
                  <p className="text-xl sm:text-2xl font-bold">{stats.totalUsers}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-4 sm:p-6">
              <div className="flex items-center">
                <div className="p-2 sm:p-3 bg-green-100 rounded-lg mr-3 sm:mr-4">
                  <span className="text-xl sm:text-2xl">📦</span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Products</p>
                  <p className="text-xl sm:text-2xl font-bold">{stats.totalProducts}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-4 sm:p-6">
              <div className="flex items-center">
                <div className="p-2 sm:p-3 bg-purple-100 rounded-lg mr-3 sm:mr-4">
                  <span className="text-xl sm:text-2xl">💰</span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Today's Revenue</p>
                  <p className="text-xl sm:text-2xl font-bold">{formatCurrency(stats.todaysRevenue)}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-4 sm:p-6">
              <div className="flex items-center">
                <div className="p-2 sm:p-3 bg-red-100 rounded-lg mr-3 sm:mr-4">
                  <span className="text-xl sm:text-2xl">⚠️</span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Low Stock</p>
                  <p className="text-xl sm:text-2xl font-bold">{stats.lowStockItems}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow p-4 sm:p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2 sm:space-y-3">
                {tabs.filter(tab => tab.id !== 'dashboard').map((tab) => (
                  <button 
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className="w-full text-left p-3 sm:p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-200"
                  >
                    <div className="flex items-center">
                      <span className="text-lg sm:text-xl mr-3">{tab.icon}</span>
                      <div>
                        <div className="font-medium text-sm sm:text-base">{tab.name}</div>
                        <div className="text-xs sm:text-sm text-gray-600">Manage {tab.name.toLowerCase()}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Sales */}
            <div className="bg-white rounded-lg shadow p-4 sm:p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Sales</h3>
              <div className="space-y-2 sm:space-y-3">
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
                        <div className="text-green-600 font-semibold text-sm sm:text-base">
                          {formatCurrency(sale.totalAmount)}
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

  // Now define renderContent after DashboardOverview
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

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Desktop Tab Navigation */}
      <div className="bg-white shadow-sm hidden sm:block">
        <div className="max-w-7xl mx-auto">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-4 sm:space-x-8 px-4 sm:px-6">
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

      {/* Mobile Tab Navigation */}
      <div className="bg-white shadow-sm sm:hidden">
        <div className="border-b border-gray-200">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-full flex justify-between items-center p-4 text-left"
          >
            <span className="font-medium">
              {tabs.find(tab => tab.id === activeTab)?.name}
            </span>
            <svg 
              className={`w-5 h-5 transition-transform ${isMobileMenuOpen ? 'transform rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {isMobileMenuOpen && (
            <div className="border-t border-gray-200">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left p-4 border-l-4 ${
                    activeTab === tab.id
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'border-transparent text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span className="mr-3">{tab.icon}</span>
                  {tab.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      {renderContent()}
    </div>
  );
};

export default AdminDashboard;