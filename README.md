# Store Inventory Management System (POS)

A modern, full-featured Point of Sale (POS) and inventory management system built with React, Node.js, and MongoDB.

## 🌟 Features

### 💼 **Admin Features**
- **Dashboard Overview** - Real-time sales, inventory, and user statistics
- **Product Management** - Add, edit, delete, and search products with barcode support
- **User Management** - Manage user roles (admin/sales-agent), activate/deactivate users
- **Sales Reports** - Detailed sales analytics with date filtering
- **Currency Settings** - Configure currency formats and display preferences
- **Low Stock Alerts** - Automatic notifications for products running low

### 🛒 **Sales Features**
- **Fast Product Search** - Real-time search with auto-complete functionality
- **Shopping Cart** - Add, update, and remove items with quantity management
- **Quick Checkout** - Fast payment processing with multiple payment methods
- **Receipt Generation** - Automatic PDF and thermal printer receipt generation
- **Mobile Responsive** - Optimized for mobile devices with cart sidebar

### 🔐 **Authentication & Security**
- **User Registration & Login** - Secure authentication with JWT tokens
- **Role-based Access Control** - Admin and sales-agent permissions
- **Session Management** - Persistent login with token storage
- **Password Protection** - Secure password hashing

## 🚀 **Live Demo**

- **Frontend**: [https://pos-strakins-projects.vercel.app](https://pos-strakins-projects.vercel.app)
- **Backend API**: [https://mini-mart-inv.onrender.com/api](https://mini-mart-inv.onrender.com/api)

## 📋 **Prerequisites**

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

## ⚙️ **Installation**

### Backend Setup
```bash
# Clone the repository
git clone <repository-url>

# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file and configure
cp .env.example .env

# Start the server
npm start

# For development
npm run dev
```

### Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env file and configure
cp .env.example .env

# Start the development server
npm run dev

# Build for production
npm run build
```

## 🔧 **Environment Variables**

### Backend (.env)
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## 📁 **Project Structure**

```
store-inventory/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── context/
│       ├── pages/
│       ├── services/
│       ├── utils/
│       └── App.jsx
└── README.md
```

## 🗄️ **API Endpoints**

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/search` - Search products
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Sales
- `GET /api/sales` - Get all sales
- `GET /api/sales/report` - Get sales report
- `POST /api/sales` - Create sale
- `GET /api/sales/:id` - Get sale by ID

### Users
- `GET /api/users` - Get all users
- `PUT /api/users/:id/role` - Update user role
- `PUT /api/users/:id/status` - Update user status

## 👥 **User Roles**

### **Admin**
- Full system access
- Manage products and inventory
- View sales reports
- Manage users and permissions
- Configure system settings

### **Sales Agent**
- Process sales transactions
- View product inventory
- Generate receipts
- View personal sales history

## 🛠️ **Technologies Used**

### **Frontend**
- React 18
- Vite
- Tailwind CSS
- Axios for API calls
- React Router v6
- JSPDF for receipt generation
- React Toastify for notifications

### **Backend**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing
- CORS for cross-origin requests




### Admin Account
```
Email: sundaytest@gmail.com
Password: ADE!bim2026
```

### Sales Agent Accounts
```

Email: rose12@gmail.com
Password: sora_234!


```

## 🖨️ **Receipt Printing**

The system supports two types of receipt printing:

1. **PDF Receipts** - For customer records and email receipts
2. **Thermal Printer Format** - Optimized for POS receipt printers (80mm width)

## 🔌 **Integration Features**

- **WhatsApp Integration** - Direct contact for support and inquiries
- **Barcode Support** - Product identification via barcodes
- **Currency Support** - Multi-currency formatting (NGN default)

## 🚨 **Error Handling**

- Comprehensive error messages
- Toast notifications for user feedback
- Network error handling
- Form validation with user-friendly messages

## 📈 **Performance Optimizations**

- **Debounced Search** - Reduces API calls during typing
- **Lazy Loading** - Component-based code splitting
- **Cached Data** - Local storage for user sessions
- **Optimized Images** - Compressed assets for faster loading

## 🔒 **Security Features**

- JWT token authentication
- Password hashing with bcrypt
- Input validation and sanitization
- CORS configuration
- Rate limiting on API endpoints

## 🤝 **Support & Contact**

For support, questions, or custom POS solutions:
- **WhatsApp**: [+2347063003993](https://wa.me/2347063003993)
- **Developer**: Strakins Tech Hub

## 📄 **License**

This project is proprietary software. All rights reserved.

## 🙏 **Acknowledgments**

- Built with modern web technologies
- Designed for retail businesses
- Optimized for Nigerian market
- Focus on user experience and speed

---

**Developed by Strakins Tech Hub** © 2024