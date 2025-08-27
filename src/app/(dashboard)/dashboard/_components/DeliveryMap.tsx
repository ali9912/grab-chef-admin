import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Ellipsis, MoreHorizontal } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getCookie } from 'cookies-next/client';
import { BASE_API_URL } from '@/common/constants';

interface OrderItem {
  _id: string;
  customer: any;
  chef: any;
  area: string;
  fullAddress: any;
  menuItems: any[];
  orderId: number;
  date: string;
  time: string;
  status: string;
  totalAmount: number;
  cancelReason: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
  ingredients: any[];
  attendance?: any;
}

interface DeliveryMapsProps {
  data: OrderItem[];
}

const DeliveryMaps = ({ data }: DeliveryMapsProps) => {
  return (
    <div>
      <div className='relative rounded-lg mb-4 overflow-hidden'>
        <div className='flex justify-between items-center'>
          <div>
            <p className='text-2xl font-bold'>Delivery Maps</p>
            <p className='text-sm text-gray-500'>Lorem ipsum dolor sit amet, consectetur</p>
          </div>
          <div>
            <Ellipsis />
          </div>
        </div>
        {/* Simple network visualization */}
      </div>
      <div className='text-center'>
        <div className='text-2xl font-bold'>{data?.length || 0} Orders</div>
        <div className='text-sm text-gray-500'>10:45 AM</div>
      </div>
    </div>
  );
};

export default DeliveryMaps;
