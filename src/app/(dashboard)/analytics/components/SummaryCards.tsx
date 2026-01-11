'use client';
import { BASE_API_URL } from '@/common/constants';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell } from 'recharts';

type StatCardProps = {
  title: string;
  value: string | number;
  percentage: number; // e.g., 75
};

const COLORS = ['#FF5F6D', '#FFC371']; // Gradient-like simulation

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  percentage,
}) => {
  const data = [
    { name: 'progress', value: percentage },
    { name: 'rest', value: 100 - percentage },
  ];

  return (
    <div className='flex items-center justify-between p-5 bg-white rounded-xl shadow-md w-full'>
      <div>
        <p className='text-gray-500 text-sm font-medium'>{title}</p>
        <p className='text-2xl font-bold mt-1'>{value}</p>
      </div>
      <PieChart
        width={60}
        height={60}
      >
        <defs>
          <linearGradient
            id='colorUv'
            x1='1'
            y1='1'
            x2='0'
            y2='0'
          >
            <stop
              offset='20%'
              stopColor='#FFC41F'
              stopOpacity={0.5}
            />
            <stop
              offset='70%'
              stopColor='#FF0000'
              stopOpacity={0.8}
            />
          </linearGradient>
        </defs>
        <Pie
          data={data}
          innerRadius={21.5}
          outerRadius={30}
          startAngle={90}
          endAngle={-270}
          paddingAngle={0}
          cornerRadius={4}
          dataKey='value'
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={index === 0 ? 'url(#colorUv)' : '#fceeee'}
            />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
};

const SummaryCards = () => {
  const [data, setData] = useState<any>({});

  const getAnalyticsData = async () => {
    try {
      const response = await axios.get(`${BASE_API_URL}/admin/get-analytics-data`);
      const resData = response.data;
      setData(resData);
    } catch (error) {
      console.log('ERROR', error);
    }
  };

  useEffect(() => {
    getAnalyticsData();
  }, []);

  return (
    <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 flex-wrap'>
      <StatCard
        title='Menus Today'
        value={data?.totalMenusToday || 0}
        percentage={77}
      />
      <StatCard
        title='Customer Today'
        value={data?.totalCustomersToday || 0}
        percentage={53}
      />
      <StatCard
        title='Total Revenue'
        value={`${data?.totalRevenue || 0} PKR`}
        percentage={88}
      />
      <StatCard
        title='Chefs Today'
        value={data?.totalChefsToday || 0}
        percentage={25}
      />
    </div>
  );
};

export default SummaryCards;
