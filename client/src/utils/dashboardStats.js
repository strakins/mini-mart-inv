import axios from 'axios';

export const getDashboardStats = async () => {


  try {
    // Fetch all necessary data in parallel
    const [usersResponse, productsResponse, salesResponse] = await Promise.all([
      axios.get('/users'),
      axios.get('/products'),
      axios.get('/sales/report')
    ]);

    const users = usersResponse.data;
    const products = productsResponse.data;
    const sales = salesResponse.data;

    // Calculate stats
    const totalUsers = users.length;
    const totalProducts = products.length;
    
    // Today's sales
    const today = new Date().toDateString();
    const todaySales = sales.filter(sale => 
      new Date(sale.createdAt).toDateString() === today
    );
    const todaysRevenue = todaySales.reduce((sum, sale) => sum + sale.totalAmount, 0);
    
    // Low stock items
    const lowStockItems = products.filter(product => 
      product.quantity <= product.minStockLevel
    ).length;

    return {
      totalUsers,
      totalProducts,
      todaysRevenue,
      lowStockItems,
      recentSales: sales.slice(0, 5) // Last 5 sales
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return {
      totalUsers: 0,
      totalProducts: 0,
      todaysRevenue: 0,
      lowStockItems: 0,
      recentSales: []
    };
  }
};


// src/utils/dashboardStats.js
// import api from '../services/api';

// export const getDashboardStats = async () => {
//   try {
//     console.log('Fetching dashboard stats...');
    
//     // Fetch all necessary data in parallel
//     const [usersResponse, productsResponse, salesResponse] = await Promise.all([
//       api.get('/users'),
//       api.get('/products'),
//       api.get('/sales/report')
//     ]);

//     const users = usersResponse.data;
//     const products = productsResponse.data;
//     const sales = salesResponse.data;

//     // Calculate stats
//     const totalUsers = users.length;
//     const totalProducts = products.length;
    
//     // Today's sales
//     const today = new Date().toDateString();
//     const todaySales = sales.filter(sale => 
//       new Date(sale.createdAt).toDateString() === today
//     );
//     const todaysRevenue = todaySales.reduce((sum, sale) => sum + sale.totalAmount, 0);
    
//     // Low stock items
//     const lowStockItems = products.filter(product => 
//       product.quantity <= (product.minStockLevel || 5)
//     ).length;

//     console.log('Dashboard stats loaded successfully');
    
//     return {
//       totalUsers,
//       totalProducts,
//       todaysRevenue,
//       lowStockItems,
//       recentSales: sales.slice(0, 5) // Last 5 sales
//     };
//   } catch (error) {
//     console.error('Error fetching dashboard stats:', error);
//     console.error('Error details:', error.response?.data);
    
//     // Return default values instead of throwing
//     return {
//       totalUsers: 0,
//       totalProducts: 0,
//       todaysRevenue: 0,
//       lowStockItems: 0,
//       recentSales: []
//     };
//   }
// };