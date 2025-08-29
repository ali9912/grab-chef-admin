'use client'
import React, { useEffect, useState } from "react";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import axios from 'axios';
import { BASE_API_URL } from '@/common/constants';

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 rounded-xl shadow-md border text-sm">
        <p className="font-semibold text-black">
          {data.value} customers
        </p>
        <p className="text-gray-500">{data.date}</p>
      </div>
    );
  }
  return null;
};

const CustomerMapChart: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCustomerData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch daily customer data
      const response = await axios.get(`${BASE_API_URL}/admin/get-sales-statistics/day`);
      const responseData = response.data;
      
      if (responseData?.newCustomers && Array.isArray(responseData.newCustomers)) {
        // Transform the data to match our chart format
        const transformedData = responseData.newCustomers.map((item: any, index: number) => ({
          x: index + 1, // Use index + 1 as x value (1, 2, 3, etc.)
          value: item.count || 0,
          date: item._id || `Day ${index + 1}`
        }));
        
        // Limit to 7 data points to match the original design
        const limitedData = transformedData.slice(0, 7);
        
        // If we have less than 7 data points, pad with zeros
        while (limitedData.length < 7) {
          limitedData.push({
            x: limitedData.length + 1,
            value: 0,
            date: `Day ${limitedData.length + 1}`
          });
        }
        
        setData(limitedData);
      } else {
        // No data available
        setData([]);
        setError('No customer data available');
      }
    } catch (error) {
      console.log('ERROR fetching customer data:', error);
      setError('Failed to load customer data');
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomerData();
  }, []);

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow w-full">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800">Customer Map</h2>
          <p className="text-sm text-gray-500">Lorem ipsum dolor</p>
        </div>
        <div className="h-[300px] flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
        </div>
      </div>
    );
  }

  if (error || data.length === 0) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow w-full">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800">Customer Map</h2>
          <p className="text-sm text-gray-500">Lorem ipsum dolor</p>
        </div>
        <div className="h-[300px] flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-500 text-sm mb-2">
              {error || 'No customer data available'}
            </p>
            <button 
              onClick={fetchCustomerData}
              className="text-red-500 text-xs hover:text-red-600 underline"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow w-full">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">Customer Map</h2>
        <p className="text-sm text-gray-500">Lorem ipsum dolor</p>
        {error && (
          <p className="text-xs text-red-500 mt-1">{error}</p>
        )}
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <defs>
            <linearGradient id="customerGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fb2c36" />
              <stop offset="100%" stopColor="#FFB366" />
            </linearGradient>
          </defs>
          
          <CartesianGrid 
            horizontal={true} 
            vertical={false} 
            stroke="#f0f0f0" 
            strokeDasharray="none"
          />
          
          <XAxis 
            dataKey="x" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#666' }}
            tickMargin={10}
          />
          
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#666' }}
            tickMargin={10}
          />
          
          <Bar 
            dataKey="value" 
            fill="url(#customerGradient)"
            radius={[4, 4, 0, 0]}
            barSize={10}
          />
          <Tooltip content={<CustomTooltip />} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomerMapChart;
