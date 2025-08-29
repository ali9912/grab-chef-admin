'use client';
import { BASE_API_URL } from '@/common/constants';
import { Card } from '@/components/ui/card';
import axios from 'axios';
import { getCookie } from 'cookies-next/client';
import { Heart, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import DownArrowButton from '../../dashboard/_components/DownArrowButton';

interface MenuItem {
  id: number;
  name: string;
  price: number;
  image: string;
  likes: number;
  sales: number;
}

interface ApiMenuItem {
  id: number;
  itemName: string;
  price: number;
  images: string[];
  likes?: number;
  sales?: number;
}

interface ApiResponse {
  mostOrderedDishes?: ApiMenuItem[];
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: 'Spinach with Roasted Crab',
    price: 6.73,
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxqfyojxMBijikrAeZvgsCyIDMD-rCktUBPw&s',
    likes: 256,
    sales: 6723,
  },
  {
    id: 2,
    name: 'Chicken Teriyaki Khas Haji Muhidin Malang',
    price: 6.73,
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxqfyojxMBijikrAeZvgsCyIDMD-rCktUBPw&s',
    likes: 256,
    sales: 6723,
  },
  {
    id: 3,
    name: 'Fried Chicken Roll Extra Spicy with Mozarella',
    price: 6.73,
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxqfyojxMBijikrAeZvgsCyIDMD-rCktUBPw&s',
    likes: 256,
    sales: 6723,
  },
];

const BestSellerMenus = () => {
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

  // Use API data if available, otherwise fall back to mock data
  const displayItems = data?.mostOrderedDishes?.slice(0, 3) || menuItems;

  if (loading) {
    return (
      <Card className='w-full p-6 bg-white rounded-xl'>
        <div className='mb-6'>
          <h2 className='text-xl font-bold text-gray-900 mb-1'>
            Best Seller Menus
          </h2>
          <p className='text-sm text-gray-500'>Lorem ipsum dolor</p>
        </div>
        <div className='space-y-4'>
          {[1, 2, 3].map((i) => (
            <div key={i} className='animate-pulse'>
              <div className='w-full h-32 bg-gray-200 rounded-lg mb-3'></div>
              <div className='h-4 bg-gray-200 rounded mb-2'></div>
              <div className='flex justify-between'>
                <div className='h-4 bg-gray-200 rounded w-16'></div>
                <div className='flex space-x-4'>
                  <div className='h-4 bg-gray-200 rounded w-12'></div>
                  <div className='h-4 bg-gray-200 rounded w-12'></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card className='w-full p-6 bg-white rounded-xl relative'>
      <div className='mb-6'>
        <h2 className='text-xl font-bold text-gray-900 mb-1'>
          Best Seller Menus
        </h2>
        <p className='text-sm text-gray-500'>Lorem ipsum dolor</p>
      </div>

      <div className='space-y-4'>
        {displayItems.map((item: MenuItem | ApiMenuItem, index: number) => (
          <div
            key={item.id || index}
            className='rounded-xl hover:bg-gray-50 transition-colors duration-200 cursor-pointer overflow-hidden'
          >
            <div className='w-full'>
              <img
                src={'image' in item ? item.image : item.images?.[0]}
                alt={'name' in item ? item.name : item.itemName}
                className='w-full h-32 rounded-lg object-cover'
              />
            </div>
            
            <div className='p-3'>
              <h3 className='font-bold text-gray-900 text-sm leading-tight mb-2'>
                {'name' in item ? item.name : item.itemName}
              </h3>
              
              <div className='flex items-center justify-between'>
                <span className='text-base font-bold text-gray-900'>
                  ${item.price?.toFixed(2) || '6.73'}
                </span>
                
                <div className='flex items-center space-x-4 text-xs'>
                  <div className='flex items-center space-x-1'>
                    <Heart className='w-3 h-3 fill-red-500 text-red-500' />
                    <span className='text-gray-600 font-medium'>
                      {((item.likes || 256) / 1000).toFixed(0)}k
                    </span>
                  </div>
                  
                  <div className='flex items-center space-x-1'>
                    <TrendingUp className='w-3 h-3 text-red-500' />
                    <span className='text-gray-600 font-medium'>
                      {(item.sales || 0).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

     <DownArrowButton />
    </Card>
  );
};

export default BestSellerMenus;
