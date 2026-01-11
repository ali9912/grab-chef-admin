'use client';
import { BASE_API_URL } from '@/common/constants';
import { Card } from '@/components/ui/card';
import axios from 'axios';
import { getCookie } from 'cookies-next/client';
import { useEffect, useState } from 'react';



interface ApiMenuItem {
  id: number;
  itemName: string;
  price: number;
  images: string[];
  orders?: number;
}

interface ApiResponse {
  mostOrderedDishes?: ApiMenuItem[];
}



const DailyTrendingMenus = () => {
  const [data, setData] = useState<ApiResponse>({});
  const [loading, setLoading] = useState(true);

  const getBestSeller = async () => {
    try {
      setLoading(true);
      const token = getCookie('token');
      const response = await axios.get(
        `${BASE_API_URL}/admin/get-menu-insights`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setData(response.data);
      console.log(
        '===response.data===>',
        JSON.stringify(response.data, null, 1),
      );
    } catch (error) {
      console.log('ERROR', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBestSeller();
  }, []);

  const displayItems = data?.mostOrderedDishes?.slice(0, 5) || [];

  if (loading) {
    return (
      <Card className='w-full p-6 bg-white rounded-xl'>
        <div className='mb-6'>
          <h2 className='text-xl font-bold text-gray-900 mb-1'>
            Daily Trending Menus
          </h2>
          <p className='text-sm text-gray-500'>Lorem ipsum dolor</p>
        </div>
        <div className='space-y-4'>
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className='animate-pulse'>
              <div className='flex items-center space-x-3'>
                <div className='w-12 h-12 bg-gray-200 rounded-lg'></div>
                <div className='flex-1'>
                  <div className='h-4 bg-gray-200 rounded mb-1'></div>
                  <div className='h-3 bg-gray-200 rounded w-16'></div>
                </div>
                <div className='h-4 bg-gray-200 rounded w-12'></div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card className='w-full p-6 bg-white rounded-xl'>
      <div className='mb-6'>
        <h2 className='text-xl font-bold text-gray-900 mb-1'>
          Daily Trending Menus
        </h2>
        <p className='text-sm text-gray-500'>Lorem ipsum dolor</p>
      </div>

      <div className='space-y-0'>
        {displayItems.map((item: ApiMenuItem, index: number) => (
          <div key={item.id || index}>
            <div className='flex items-center space-x-3 py-3 hover:bg-gray-50 transition-colors duration-200 cursor-pointer rounded-lg px-2'>
              <div className='flex-shrink-0'>
                <img
                  src={item.images?.[0] || ''}
                  alt={item.itemName}
                  className='w-12 h-12 rounded-lg object-cover'
                />
              </div>
              
              <div className='flex-1 min-w-0'>
                <h3 className='font-medium text-gray-900 text-sm leading-tight mb-1'>
                  {item.itemName}
                </h3>
                <p className='text-xs text-gray-500'>
                  Order {item.orders || 0}x
                </p>
              </div>
              
              <div className='flex-shrink-0'>
                <span className='font-bold text-gray-900 text-sm'>
                  PKR {item.price?.toFixed(1) || '0.0'}
                </span>
              </div>
            </div>
            
            {/* Divider line between items (except for the last item) */}
            {index < displayItems.length - 1 && (
              <div className='border-b border-gray-100'></div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default DailyTrendingMenus;
