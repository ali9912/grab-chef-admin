import React from 'react';
import SummaryCards from './components/SummaryCards';
import SalesStatisticsChart from './components/SalesStatisticChart';
import SalesSummary from './components/SalesSummary';
import CustomerBarChart from './components/CustomerBarChart';
import LoyalCustomers from './components/LoyalCustomers';
import BestSellerMenus from './components/BestSellerMenus';
import DailyTrendingMenus from './components/DailyTrendingMenus';
import MostFavoritesItems from './components/MostFavoritesItems';

const Analytics = () => {
  return (
    <div className='p-6 w-full'>
      {/* Page Header */}
      <div className='mb- flex items-center justify-between mb-4'>
        <h1 className='text-3xl font-semibold text-gray-900'>Analytics</h1>
        <p>Analytics/review</p>
      </div>

      <div className='mb-8'>
        <SummaryCards />
      </div>
      
      {/* Main Analytics Grid - 4 Columns */}
      <div className='grid grid-cols-4 gap-4 items-start'>
        {/* Column 1: Sales Statistics Chart */}
        <div className='col-span-3 grid grid-cols-3 gap-4'>
          <div className='col-span-2 flex flex-col gap-4'>
            <SalesStatisticsChart />
            <SalesSummary />
          </div>
          <div className='col-span-1 flex flex-col gap-4'>
            <CustomerBarChart />
            <LoyalCustomers />
          </div>
          <div className='col-span-3'>
            <MostFavoritesItems />
          </div>
        </div>
        
        {/* Column 4: Best Seller Menus */}
        <div className='col-span-1 flex flex-col gap-4'>
          <BestSellerMenus />
          <DailyTrendingMenus />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
