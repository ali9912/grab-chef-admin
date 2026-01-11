'use client';

import { BASE_API_URL } from '@/common/constants';
import {
  analyticsData,
  areaChartConfig,
  areaChartData,
} from '@/common/constants/data';
import { cn } from '@/lib/utils';
import axios from 'axios';
import { getCookie } from 'cookies-next/client';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { AreaChartComponent } from '../_components/analytics-area-chart';
import { AnalyticsBarChart } from '../_components/analytics-bar-chart';
import { AnalyticsCard } from '../_components/analytics-card';
import CustomersList from '../_components/CustomerList';
import MostOrderedDishes from '../_components/MostOrderedDishes';
import TopRatedChefs from '../_components/TopRatedChef';
import UpcomingShipping from '../_components/UpcomingShipping';

const DashboardView = () => {
  const [data, setData] = useState({
    totalMenu: 0,
    totalChef: 0,
    totalCustomer: 0,
    totalOrders: 0,
  });
  const [loading, setLoading] = useState(false);

  const getDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      const token = getCookie('token');
      const response = await axios.get(
        `${BASE_API_URL}/admin/dashboard-analytics`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setData(response?.data);
    } catch (error: any) {
      toast(error?.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <div className='px-8 pt-10 flex flex-col gap-4 '>
      <div className='flex sm:items-center sm:justify-between sm:flex-row flex-col gap-2'>
        <h1 className='text-[34px] font-semibold'>Dashboard</h1>
        <div className='flex items-center gap-2'>
          <p className='text-[18px] font-normal text-[#202020]'>Dashboard</p>
          <span className='text-[18px] font-normal text-[#202020]'>/</span>
          <p className='text-[18px] font-normal text-[#202020]'>Order</p>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className={cn('col-span-1', 'grid grid-cols-2', 'gap-4')}>
          {analyticsData(data).map((item, index) => (
            <AnalyticsCard
              key={index}
              data={item}
            />
          ))}
        </div>
        <AreaChartComponent />
      </div>


      {/* Main Content Grid */}
      <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
        {/* Left Column - 1/4 width */}
        <div className='lg:col-span-1 space-y-6'>
          <TopRatedChefs />
          <MostOrderedDishes />
        </div>

        {/* Right Column - 3/4 width */}
        <div className='lg:col-span-3 space-y-6'>
          {/* Customer Map */}
          <AnalyticsBarChart />
          
          {/* Bottom Row */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <div className='md:col-span-1'>
              <CustomersList />
            </div>
            <div className='md:col-span-2'>
              <UpcomingShipping />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
