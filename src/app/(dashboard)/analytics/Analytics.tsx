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
      
      {/* Main Analytics Grid - Responsive Layout */}
      <div className='grid grid-cols-1 lg:grid-cols-4 gap-4 items-start'>
        {/* Main Content Area */}
        <div className='lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4'>
          {/* Top Row - Sales Statistics and Summary */}
          <div className='md:col-span-2 flex flex-col gap-4'>
            <SalesStatisticsChart />
            <SalesSummary />
          </div>
          
          {/* Right Column - Customer Chart and Loyal Customers */}
          <div className='md:col-span-1 flex flex-col gap-4'>
            <CustomerBarChart />
            <LoyalCustomers />
          </div>
          
          {/* Bottom Row - Most Favorites Items */}
          <div className='md:col-span-3'>
            <MostFavoritesItems />
          </div>
        </div>
        
        {/* Sidebar - Best Seller Menus and Trending Menus */}
        <div className='lg:col-span-1 flex flex-col gap-4'>
          <BestSellerMenus />
          <DailyTrendingMenus />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
