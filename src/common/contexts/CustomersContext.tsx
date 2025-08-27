'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';
import { getData } from '../../api/api';
import { urls } from '../../api/urls';

interface Customer {
  _id: string;
  firstName: string;
  lastName?: string;
  type: string;
  createdAt: string;
}

interface CustomersContextType {
  customers: Customer[];
  loading: boolean;
  error: string | null;
  getCustomers: () => Promise<void>;
  refreshCustomers: () => Promise<void>;
}

const CustomersContext = createContext<CustomersContextType | undefined>(undefined);

export const useCustomers = () => {
  const context = useContext(CustomersContext);
  if (context === undefined) {
    throw new Error('useCustomers must be used within a CustomersProvider');
  }
  return context;
};

interface CustomersProviderProps {
  children: ReactNode;
}

export const CustomersProvider: React.FC<CustomersProviderProps> = ({ children }) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCustomers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getData(urls.dashboard.getCustomers);
      console.log(data, '---customer data');
      setCustomers(data?.customers || []);
    } catch (error: any) {
      console.log(error?.message);
      const errorMessage = error?.message || 'Failed to fetch customers';
      setError(errorMessage);
      toast(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const refreshCustomers = async () => {
    await getCustomers();
  };

  useEffect(() => {
    getCustomers();
  }, []);

  const value: CustomersContextType = {
    customers,
    loading,
    error,
    getCustomers,
    refreshCustomers,
  };

  return (
    <CustomersContext.Provider value={value}>
      {children}
    </CustomersContext.Provider>
  );
};
