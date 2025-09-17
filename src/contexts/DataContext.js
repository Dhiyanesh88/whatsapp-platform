import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [customers, setCustomers] = useState([
    {
      id: 'CUST001',
      name: 'Acme Corp',
      email: 'admin@acme.com',
      phone: '+1234567890',
      status: 'active',
      environment: 'production',
      credits: 1500,
      createdAt: '2024-01-15',
      lastLogin: '2024-01-20'
    },
    {
      id: 'CUST002',
      name: 'TechStart Inc',
      email: 'contact@techstart.com',
      phone: '+1987654321',
      status: 'active',
      environment: 'sandbox',
      credits: 500,
      createdAt: '2024-01-10',
      lastLogin: '2024-01-19'
    }
  ]);

  const [campaigns, setCampaigns] = useState([
    {
      id: 'CAMP001',
      name: 'Welcome Campaign',
      customerId: 'CUST001',
      status: 'active',
      environment: 'production',
      scheduled: '2024-01-21T10:00:00Z',
      sent: 1250,
      delivered: 1200,
      failed: 50
    }
  ]);

  const [templates, setTemplates] = useState([
    {
      id: 'TEMP001',
      name: 'Welcome Message',
      customerId: 'CUST001',
      status: 'approved',
      environment: 'production',
      language: 'en',
      category: 'marketing'
    }
  ]);

  const [failures, setFailures] = useState([
    {
      id: 'FAIL001',
      messageId: 'MSG001',
      customerId: 'CUST001',
      campaignId: 'CAMP001',
      timestamp: '2024-01-20T15:30:00Z',
      errorCode: 'RATE_LIMIT',
      environment: 'production',
      status: 'open'
    }
  ]);

  const [apiKeys, setApiKeys] = useState([
    {
      id: 'KEY001',
      name: 'Production Key',
      environment: 'production',
      status: 'active',
      createdAt: '2024-01-01',
      lastUsed: '2024-01-20'
    }
  ]);

  const [pricing, setPricing] = useState({
    lastSynced: '2024-01-20T12:00:00Z',
    rates: {
      'US': 0.05,
      'UK': 0.04,
      'IN': 0.02
    }
  });

  const addCustomer = (customerData) => {
    const newCustomer = {
      ...customerData,
      id: `CUST${String(customers.length + 1).padStart(3, '0')}`,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'active'
    };
    setCustomers(prev => [...prev, newCustomer]);
    return newCustomer;
  };

  const updateCustomer = (id, updates) => {
    setCustomers(prev => prev.map(customer => 
      customer.id === id ? { ...customer, ...updates } : customer
    ));
  };

  const addCampaign = (campaignData) => {
    const newCampaign = {
      ...campaignData,
      id: `CAMP${String(campaigns.length + 1).padStart(3, '0')}`,
      status: 'draft',
      sent: 0,
      delivered: 0,
      failed: 0
    };
    setCampaigns(prev => [...prev, newCampaign]);
    return newCampaign;
  };

  const updateCampaign = (id, updates) => {
    setCampaigns(prev => prev.map(campaign => 
      campaign.id === id ? { ...campaign, ...updates } : campaign
    ));
  };

  const syncPricing = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setPricing(prev => ({
      ...prev,
      lastSynced: new Date().toISOString()
    }));
  };

  const value = {
    customers,
    campaigns,
    templates,
    failures,
    apiKeys,
    pricing,
    addCustomer,
    updateCustomer,
    addCampaign,
    updateCampaign,
    syncPricing,
    setCustomers,
    setCampaigns,
    setTemplates,
    setFailures,
    setApiKeys
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};