import axios from 'axios';

export const getDashboardStats = async () => {
  try {
    // Fetch all necessary data in parallel
    const [usersResponse, productsResponse, salesResponse] = await Promise.all([
      axios.get('/api/users'),
      axios.get('/api/products'),
      axios.get('/api/sales/report')
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