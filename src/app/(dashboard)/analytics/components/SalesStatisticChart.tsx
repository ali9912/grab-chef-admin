'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';
import { BsThreeDotsVertical } from 'react-icons/bs';

// import {DropdownMenu, DropdownMenuContent, DropdownMenuTrigger} from "@radix-ui/react-dropdown-menu";
import { SelectLabel } from '@radix-ui/react-select';
import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from 'recharts';
import axios from 'axios';
import { BASE_API_URL } from '@/common/constants';

const COLORS = {
  Beverages: 'url(#beverageGradient)',
  Food: 'url(#foodGradient)',
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    return (
      <div className='bg-white p-3 rounded-xl shadow-md border text-sm'>
        <p className='text-black'>{payload[0].value} Bookings</p>
        <p className='text-black'>Revenue: PKR {payload[1].value} </p>
        <p className='text-gray-500'>{item.date}</p>
      </div>
    );
  }
  return null;
};

const SalesStatisticsChart: React.FC = () => {
  const [data, setData] = useState<any>({});
  const [filter, setFilter] = useState('week');
  const [option, setOption] = useState('bookingsAndRevenue');
  const [counts, setCounts] = useState<{
    totalBookingsAllTime: number;
    totalRevenueAllTime: number;
    totalCustomerCounts: number;
    totalCuisineCounts: number;
  }>({
    totalBookingsAllTime: 0,
    totalRevenueAllTime: 0,
    totalCustomerCounts: 0,
    totalCuisineCounts: 0,
  });

  const getAnalyticsData = async () => {
    try {
      const response = await axios.get(
        `${BASE_API_URL}/admin/get-sales-statistics/${filter}`,
      );
      const resData = response.data;
      setData(resData);
      let totalBookingsAllTime = 0;
      let totalRevenueAllTime = 0;
      let totalCustomerCounts = 0;
      let totalCuisineCounts = 0;
      for (const element in resData?.bookingsAndRevenue) {
        const item = resData?.bookingsAndRevenue[element];
        totalBookingsAllTime = totalBookingsAllTime + item?.totalBookings;
        totalRevenueAllTime = totalRevenueAllTime + item?.totalRevenue;
      }
      for (const element in resData?.newCustomers) {
        const item = resData?.newCustomers[element];
        totalCustomerCounts = totalCustomerCounts + item?.count;
      }
      for (const element in resData?.mostOrderedCuisines) {
        const item = resData?.mostOrderedCuisines[element];
        totalCuisineCounts = totalCuisineCounts + item?.count;
      }
      setCounts({
        totalBookingsAllTime,
        totalRevenueAllTime,
        totalCustomerCounts,
        totalCuisineCounts,
      });
    } catch (error) {
      console.log('ERROR', error);
    }
  };

  useEffect(() => {
    getAnalyticsData();
  }, [filter]);

  const dataKey1: Record<string, string> = {
    bookingsAndRevenue: 'totalBookings',
    newCustomers: 'count',
    mostOrderedCuisines: 'count',
  };
  const dataKey2: Record<string, string> = {
    bookingsAndRevenue: 'totalRevenue',
  };

  const xAxisKey: Record<string, string> = {
    bookingsAndRevenue: '_id',
    newCustomers: '_id',
    mostOrderedCuisines: '_id',
  };

  const optionKey: Record<string, string> = {
    bookingsAndRevenue: 'Bookings And Revenue',
    newCustomers: 'New Customers',
    mostOrderedCuisines: 'Most Ordered Cuisines',
  };
  const filterKey: Record<string, string> = {
    day: 'Day',
    week: 'Week',
    month: 'Month',
  };

  const legendKey1: Record<string, string> = {
    bookingsAndRevenue: 'Total Bookings',
    newCustomers: 'New Customers',
    mostOrderedCuisines: 'Most Ordered Cuisines',
  };
  const countKey: Record<string, number> = {
    'Total Bookings': counts.totalBookingsAllTime,
    'New Customers': counts.totalRevenueAllTime,
    'Most Ordered Cuisines': counts.totalCustomerCounts,
    'Total Revenue': counts.totalCuisineCounts,
  };
  const legendKey2: Record<string, string> = {
    bookingsAndRevenue: 'Total Revenue',
    newCustomers: 'Total Revenue',
    mostOrderedCuisines: 'Total Revenue',
  };

  return (
    <div className='bg-white p-6 rounded-2xl shadow w-full'>
      <div className='flex flex-col justify-between items-start mb-6'>
        <div className=' flex items-center justify-between w-full'>
          <div>
            <h2 className='text-xl font-semibold'>Sales Statistic</h2>
            <p className='text-gray-400 text-sm'>Lorem ipsum dolor</p>
          </div>
          <div className='flex gap-3 items-center mb-8'>
            <Select
              defaultValue='bookingsAndRevenue'
              value={option}
              onValueChange={e => setOption(e)}
            >
              <SelectTrigger className='rounded-2xl'>
                <p>{optionKey[option] || `Select Type`}</p>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value='bookingsAndRevenue'>
                    Bookings And Revenue
                  </SelectItem>
                  <SelectItem value='newCustomers'>New Customers</SelectItem>
                  <SelectItem value='mostOrderedCuisines'>
                    Most Ordered Cuisines
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select
              defaultValue='week'
              value={filter}
              onValueChange={e => setFilter(e)}
            >
              <SelectTrigger className='rounded-2xl'>
                <p>{filterKey[filter] || `Select Type`}</p>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value='day'>Day</SelectItem>
                  <SelectItem value='week'>Week</SelectItem>
                  <SelectItem value='month'>Month</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className='flex gap-6 items-center justify-between w-full'>
          <div className='flex gap-6 items-center'>
            <div className='flex items-center gap-2'>
              <span className='w-3 h-3 rounded-full bg-orange-400' />
              <span className=' text-gray-600 text-xs'>
                {legendKey1[option]}
              </span>
              <span className='text-black text-sm font-semibold'>
                {countKey[legendKey1[option]]}
              </span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='w-3 h-3 rounded-full bg-indigo-400' />
              <span className='text-gray-600 text-xs'>
                {legendKey2[option]}
              </span>
              <span className='text-black text-sm font-semibold'>
                {countKey[legendKey2[option]]}
              </span>
            </div>
          </div>
        </div>
      </div>

      <ResponsiveContainer
        width='100%'
        className={'text-sm mt-8'}
        height={300}
      >
        <BarChart data={data[option] || []}>
          <defs>
            <linearGradient
              id='beverageGradient'
              x1='0'
              y1='0'
              x2='0'
              y2='1'
            >
              <stop
                offset='0%'
                stopColor='#FF5F6D'
              />
              <stop
                offset='100%'
                stopColor='#FFC371'
              />
            </linearGradient>
            <linearGradient
              id='foodGradient'
              x1='0'
              y1='0'
              x2='0'
              y2='1'
            >
              <stop
                offset='0%'
                stopColor='#6366F1'
              />
              <stop
                offset='100%'
                stopColor='#A5B4FC'
              />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray='3 3'
            vertical={false}
          />
          <XAxis dataKey={xAxisKey[option]} />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey={dataKey1[option]}
            fill={COLORS.Food}
            barSize={30}
            radius={[8, 8, 0, 0]}
          />
          <Bar
            dataKey={dataKey2[option]}
            fill={COLORS.Beverages}
            barSize={30}
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesStatisticsChart;
