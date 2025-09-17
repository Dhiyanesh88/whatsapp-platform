import React, { createContext, useContext, useState, useEffect } from 'react';

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
  const [impersonating, setImpersonating] = useState(null);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('user');
    const savedImpersonating = localStorage.getItem('impersonating');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedImpersonating) {
      setImpersonating(JSON.parse(savedImpersonating));
    }
    setLoading(false);
  }, []);

  const login = async (email, password, role) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication
    if (role === 'super_admin' && email === 'admin@platform.com' && password === 'admin123') {
      const userData = {
        id: 1,
        email: 'admin@platform.com',
        name: 'Super Admin',
        role: 'super_admin',
        permissions: ['all']
      };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return { success: true };
    } else if (role === 'customer') {
      // Mock customer login
      const userData = {
        id: 2,
        email: email,
        name: 'Customer User',
        role: 'customer',
        customerId: 'CUST001',
        environment: 'sandbox',
        permissions: ['dashboard', 'campaigns', 'templates']
      };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return { success: true };
    }
    
    return { success: false, error: 'Invalid credentials' };
  };

  const logout = () => {
    setUser(null);
    setImpersonating(null);
    localStorage.removeItem('user');
    localStorage.removeItem('impersonating');
  };

  const impersonate = (customerData) => {
    if (user?.role === 'super_admin') {
      setImpersonating(customerData);
      localStorage.setItem('impersonating', JSON.stringify(customerData));
      
      // Log impersonation for audit
      console.log('Impersonation started:', {
        adminId: user.id,
        customerId: customerData.id,
        timestamp: new Date().toISOString()
      });
    }
  };

  const stopImpersonation = () => {
    if (impersonating) {
      console.log('Impersonation ended:', {
        adminId: user.id,
        customerId: impersonating.id,
        timestamp: new Date().toISOString()
      });
    }
    setImpersonating(null);
    localStorage.removeItem('impersonating');
  };

  const value = {
    user,
    impersonating,
    loading,
    login,
    logout,
    impersonate,
    stopImpersonation,
    isAuthenticated: !!user,
    isSuperAdmin: user?.role === 'super_admin',
    isCustomer: user?.role === 'customer' || !!impersonating,
    currentUser: impersonating || user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};