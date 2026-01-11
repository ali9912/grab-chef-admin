'use client';
import { useCallback, useEffect, useState } from 'react';
import { ChefBanner } from './components/ChefBanner';
import { ChefLevel } from './components/ChefLevel';
import { CustomerTable } from './components/CustomerTable';
import { MedalsAchievement } from './components/MedalAcheivement';
import { RevenueChart } from './components/RevenueChart';
import { useParams } from 'next/navigation';
import { getCookie } from 'cookies-next/client';
import axios from 'axios';
import { BASE_API_URL } from '@/common/constants';
import { toast } from 'sonner';

const ChefDetails = () => {
  const [data, setData] = useState<any>(null);
  const [chefEvents, setChefEvents] = useState<any[]>([]);
  const [chefRevenue, setChefRevenue] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const chefId = params?.slug;

  const getChef = useCallback(async () => {
    try {
      setLoading(true);
      const token = getCookie('token');
      const response = await axios.get(
        `${BASE_API_URL}/admin/get-chef/${chefId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setData(response?.data?.chef);
    } catch (error: any) {
      toast(error?.message);
    } finally {
      setLoading(false);
    }
  }, [chefId]);

  const getChefRevenue = useCallback(async () => {
    try {
      setLoading(true);
      const token = getCookie('token');
      const response = await axios.get(
        `${BASE_API_URL}/admin/get-chef-revenue/${chefId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setChefRevenue(response?.data);
    } catch (error: any) {
      toast(error?.message);
    } finally {
      setLoading(false);
    }
  }, [chefId]);

  const getChefEvents = useCallback(async () => {
    try {
      setLoading(true);
      const token = getCookie('token');
      const response = await axios.get(
        `${BASE_API_URL}/admin/get-user-event/${chefId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
     
      setChefEvents(response?.data?.events);
    } catch (error: any) {
      toast(error?.message);
    } finally {
      setLoading(false);
    }
  }, [chefId]);

  useEffect(() => {
    if (chefId) {
      getChef();
      getChefEvents();
      getChefRevenue();
    }
  }, [chefId, getChef, getChefEvents, getChefRevenue]);

  if (loading) {
    return (
      <div className='min-h-screen bg-gray-50 p-6 flex items-center justify-center'>
        <div className='text-lg'>Loading chef details...</div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <div className=' space-y-6'>
        {/* Header */}
        <div className='flex items-center justify-between mb-8'>
          <h1 className='text-4xl font-bold text-gray-900'>Chef Details</h1>
          <div className='text-lg text-gray-500'>Chef / Chef</div>
        </div>

        {/* Top Row */}
        <div className='grid grid-cols-1 xl:grid-cols-2 gap-6'>
          <ChefBanner chef={data} />
          <RevenueChart chefRevenue={chefRevenue}/>
        </div>

        {/* Middle Row */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          {data && <MedalsAchievement data={data?.chef?.achievements} />}
          <ChefLevel />
        </div>

        {/* Bottom Row */}
        <CustomerTable events={chefEvents} />
      </div>
    </div>
  );
};

export default ChefDetails;
