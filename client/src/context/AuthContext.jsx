import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    // Wake up the backend when app starts
    const wakeUpBackend = async () => {
      try {
        await axios.get(`${import.meta.env.VITE_API_URL}/health`);
        // console.log('Backend warmed up');
      } catch (error) {
        console.log('Backend waking up...', error);
      }
    };
    
    wakeUpBackend();
  }, []);

  // Get API URL from environment variables
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userInfo = localStorage.getItem('userInfo');
    
    if (token && userInfo) {
      setUser(JSON.parse(userInfo));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    
    // Set base URL for all API calls
    if (API_BASE_URL) {
      axios.defaults.baseURL = API_BASE_URL;
    } else {
      console.error('VITE_API_URL environment variable is not set');
    }
    
    setLoading(false);
  }, [API_BASE_URL]);

  const login = async (email, password) => {
    try {
      console.log('API Base URL:', axios.defaults.baseURL);
      console.log('Making login request to:', `${axios.defaults.baseURL}/auth/login`);
      
      const response = await axios.post('/auth/login', { 
        email, 
        password 
      });
      
      const { token, ...userInfo } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(userInfo);
      
      console.log('Login successful:', userInfo);
      return { success: true };
    } catch (error) {
      console.error('Login error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        url: error.config?.url
      });
      
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed. Please check your backend URL.' 
      };
    }
  };

  // ... rest of your AuthContext remains the same
  const register = async (userData) => {
    try {
      console.log('Making registration request to:', `${axios.defaults.baseURL}/auth/register`);
      
      const response = await axios.post('/auth/register', userData);
      
      const { token, ...userInfo } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(userInfo);
      
      console.log('Registration successful:', userInfo);
      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Registration failed.' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};