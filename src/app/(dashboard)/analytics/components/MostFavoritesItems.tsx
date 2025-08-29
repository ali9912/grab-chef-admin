'use client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, ChevronDown, BarChart3, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next/client';
import axios from 'axios';
import { BASE_API_URL } from '@/common/constants';
import DownArrowButton from '../../dashboard/_components/DownArrowButton';

interface FavoriteItem {
  id: number;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  likes: string;
  interest: number;
  totalSales: string;
  completion: number;
  category: string;
}

interface ApiMenuItem {
  itemName: string;
  images: string[];
  price: number;
  cuisineStyle: string;
  orders: number;
  chefName: string;
}

interface ApiResponse {
  mostOrderedDishes?: ApiMenuItem[];
  categories?: string[];
}

const defaultCategories = [
  'All Categories',
  'Pakistani',
  'Italian',
  'Chinese',
  'Indian',
];

const CircularProgress = ({ percentage }: { percentage: number }) => {
  const circumference = 2 * Math.PI * 20;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className='relative w-16 h-16'>
      <svg
        className='w-16 h-16 transform -rotate-90'
        viewBox='0 0 44 44'
      >
        <circle
          cx='22'
          cy='22'
          r='20'
          stroke='#f3f4f6'
          strokeWidth='4'
          fill='transparent'
        />
        <circle
          cx='22'
          cy='22'
          r='20'
          stroke='url(#gradient)'
          strokeWidth='4'
          fill='transparent'
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap='round'
          className='transition-all duration-300'
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
        </defs>
      </svg>
      <div className='absolute inset-0 flex items-center justify-center'>
        <span className='text-sm font-semibold text-gray-900'>
          {percentage}%
        </span>
      </div>
    </div>
  );
};

const TrendChart = ({ trend }: { trend: 'up' | 'down' }) => {
  return (
    <div className='w-16 h-8 flex items-center justify-center'>
      <svg
        width='40'
        height='20'
        viewBox='0 0 40 20'
      >
        <path
          d={
            trend === 'up'
              ? 'M2 18 L10 12 L18 14 L26 8 L34 10 L38 6'
              : 'M2 6 L10 12 L18 10 L26 16 L34 14 L38 18'
          }
          stroke='#ef4444'
          strokeWidth='2'
          fill='none'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </div>
  );
};

const MostFavoritesItems = () => {
  const [activeCategory, setActiveCategory] = useState('All Categories');
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

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-sm ${
          i < rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
      >
        ★
      </span>
    ));
  };

  // Get categories from cuisine styles in API data or use defaults
  const cuisineStyles = data?.mostOrderedDishes?.map(item => item.cuisineStyle || 'Other') || [];
  const uniqueCuisineStyles = [...new Set(cuisineStyles)];
  const categories = uniqueCuisineStyles.length > 0 
    ? ['All Categories', ...uniqueCuisineStyles] 
    : defaultCategories;

  // Filter items based on active category
  const filteredItems = data?.mostOrderedDishes?.filter(item => {
    if (activeCategory === 'All Categories') return true;
    return (item.cuisineStyle || 'Other') === activeCategory;
  }) || [];

  // Calculate total orders for percentage calculation
  const totalOrders = data?.mostOrderedDishes?.reduce((sum, item) => sum + item.orders, 0) || 0;

  if (loading) {
    return (
      <Card className='w-full p-6 bg-white rounded-xl'>
        <div className='mb-6 flex xl:flex-row flex-col justify-between'>
          <div>
            <h2 className='text-2xl font-bold text-gray-900 mb-2'>
              Most Favorites Items
            </h2>
            <p className='text-sm text-gray-500 mb-6'>
              Lorem ipsum dolor sit amet, consectetur
            </p>
          </div>
          <div className='flex flex-wrap gap-4 bg-[#FFF3F0] rounded-3xl h-fit w-fit p-2'>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className='h-8 w-20 bg-gray-200 rounded-full animate-pulse'></div>
            ))}
          </div>
        </div>
        <div className='space-y-6'>
          {[1, 2, 3].map((i) => (
            <div key={i} className='animate-pulse'>
              <div className='flex items-center gap-6 p-4 rounded-lg'>
                <div className='w-20 h-20 bg-gray-200 rounded-lg'></div>
                <div className='flex-1'>
                  <div className='h-4 bg-gray-200 rounded mb-2'></div>
                  <div className='h-3 bg-gray-200 rounded w-32 mb-2'></div>
                  <div className='h-3 bg-gray-200 rounded w-24'></div>
                </div>
                <div className='flex gap-8'>
                  <div className='w-16 h-16 bg-gray-200 rounded'></div>
                  <div className='w-16 h-16 bg-gray-200 rounded'></div>
                  <div className='w-16 h-16 bg-gray-200 rounded-full'></div>
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
      <div className='mb-6 flex xl:flex-row flex-col justify-between'>
        <div>
          <h2 className='text-2xl font-bold text-gray-900 mb-2'>
            Most Favorites Items
          </h2>
          <p className='text-sm text-gray-500 mb-6'>
            Lorem ipsum dolor sit amet, consectetur
          </p>
        </div>

        {/* Category Tabs */}
        <div className='flex flex-wrap gap-4 bg-[#FFF3F0] rounded-3xl h-fit w-fit p-2'>
          {categories.map(category => (
            <Button
              key={category}
              variant={activeCategory === category ? 'default' : 'outline'}
              className={`rounded-full px-3 py-2 text-sm ${
                activeCategory === category
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border-gray-300'
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Items List */}
      <div className='space-y-6'>
        {filteredItems.slice(0, 3).map((item, index) => (
          <div
            key={index}
            className='flex items-center gap-6 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200'
          >
            {/* Left Section: Image and Basic Info */}
            <div className='flex-shrink-0'>
              <img
                src={item.images?.[0] || ''}
                alt={item.itemName}
                className='w-20 h-20 rounded-lg object-cover'
              />
            </div>

            <div className='flex-1 min-w-0'>
              <h3 className='font-bold text-gray-900 text-base mb-2 line-clamp-2'>
                {item.itemName}
              </h3>
              <div className='flex items-center gap-3 mb-2'>
                <div className='flex items-center'>
                  {renderStars(4)}
                </div>
                <span className='text-sm text-gray-500'>
                  (454 reviews)
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <Heart className='w-4 h-4 fill-red-500 text-red-500' />
                <span className='text-sm text-gray-600'>
                  256k Like it
                </span>
              </div>
              <div className='text-sm text-gray-500 mt-1'>
                Chef: {item.chefName}
              </div>
            </div>

            {/* Middle Section: Performance Metrics */}
            <div className='flex items-center gap-8'>
              {/* Interest */}
              <div className='text-center flex items-center'>
                <TrendChart trend='up' />
                <div className='ml-2'>
                  <div className='text-lg font-bold text-gray-900'>
                    45%
                  </div>
                  <div className='text-sm text-gray-500'>Interest</div>
                </div>
              </div>

              {/* Total Sales */}
              <div className='text-center'>
                <div className='flex items-center justify-center mb-2'>
                  <BarChart3 className='w-6 h-6 text-red-500' />
                </div>
                <div className='text-lg font-bold text-gray-900'>
                  {item.orders.toLocaleString()}
                </div>
                <div className='text-sm text-gray-500'>Total Sales</div>
              </div>

              {/* Progress Circle */}
              <div className='text-center'>
                <CircularProgress percentage={totalOrders > 0 ? Math.round((item.orders / totalOrders) * 100) : 0} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Expand Button */}
      <DownArrowButton />
    </Card>
  );
};

export default MostFavoritesItems;
