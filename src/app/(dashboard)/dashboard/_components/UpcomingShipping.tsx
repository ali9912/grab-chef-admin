'use client';
import { BASE_API_URL } from '@/common/constants';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import axios from 'axios';
import { getCookie, useGetCookie } from 'cookies-next/client';
import { ChevronDown, MapPin, Plane } from 'lucide-react';
import { useEffect, useState } from 'react';
import DeliveryMaps from './DeliveryMap';

interface Customer {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  isVerified: boolean;
  createdAt: string;
  __v: number;
  phoneNumber?: string;
}

interface FullAddress {
  name: string;
  address?: string;
  location: {
    coordinates: [number, number];
    type: string;
  };
  _id: string;
}

interface MenuItem {
  menuItemId: string;
  quantity: number;
  _id: string;
}

interface OrderItem {
  _id: string;
  customer: Customer;
  chef: any;
  area: string;
  fullAddress: FullAddress;
  menuItems: MenuItem[];
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

const UpcomingShipping = () => {
  const [data, setData] = useState<OrderItem[]>([]);
  const [showAll, setShowAll] = useState(false);

  const getEvents = async () => {
    try {
      const token = getCookie('token');
      const response = await axios.get(`${BASE_API_URL}/admin/get-events`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = response.data;
      setData(data?.events || []);
    } catch (error) {
      console.log('ERROR', error);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  const formatTime = (timeString: string): string => {
    if (!timeString) return '';
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const getCustomerInitials = (firstName: string, lastName: string): string => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
  };

  const pendingOrders = data.filter(item => item.status === 'pending');
  const displayOrders = showAll ? pendingOrders : pendingOrders.slice(0, 3);
  const hasMoreOrders = pendingOrders.length > 3;

  return (
    <Card>
      <CardContent className='space-y-6 p-6'>
        <DeliveryMaps data={data} />
        
        {/* Upcoming Shipping Schedule Section */}
        <div className='space-y-4'>
          <div className='flex items-center gap-4'>
            <Plane className='h-12 w-12 fill-red-500' strokeWidth={0} />
            <h3 className='text-lg font-semibold text-gray-900'>Upcoming Shipping Schedule</h3>
          </div>
          
          <div className='space-y-4'>
            {displayOrders &&
              displayOrders.length > 0 &&
              displayOrders
                .map((item, index) => (
                <div
                  key={item._id || index}
                  className='flex items-start gap-4'
                >
                  {/* Customer Avatar */}
                  <Avatar className='w-12 h-12 flex-shrink-0'>
                    <AvatarFallback className='bg-gray-100 text-gray-600 text-sm font-medium'>
                      {getCustomerInitials(item.customer?.firstName, item.customer?.lastName)}
                    </AvatarFallback>
                  </Avatar>
                  
                  {/* Customer Details and Address Container */}
                  <div className='flex-1 flex justify-between items-start min-w-0'>
                    {/* Customer Details */}
                    <div className='flex-1 min-w-0'>
                      <div className='flex items-center gap-2 mb-1'>
                        <span className='font-bold text-gray-900'>
                          {item.customer?.firstName} {item.customer?.lastName}
                        </span>
                        <span className='text-sm text-red-500 font-bold'>
                          ({item.menuItems?.length || 0} Items)
                        </span>
                      </div>
                      <div className='text-sm text-gray-500'>
                        Will be shipping on {formatTime(item.time)}
                      </div>
                    </div>
                    
                    {/* Address and Location Pin */}
                    <div className='flex items-center gap-3 flex-shrink-0'>
                      <div className='text-sm text-gray-600 text-right max-w-xs'>
                        {item.fullAddress?.name || item.fullAddress?.address || 'Address not available'}
                        {item.fullAddress?.address && item.fullAddress?.name !== item.fullAddress?.address && (
                          <span>, {item.fullAddress.address}</span>
                        )}
                        <span className='text-gray-500'> United Kingdom</span>
                      </div>
                      <div className='w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0'>
                        <MapPin className='h-4 w-4 text-gray-800' />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        
        {/* Show More Button */}
        {hasMoreOrders && (
          <div className='flex justify-center pt-2'>
            <div
              className='w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center shadow-sm cursor-pointer'
              onClick={() => setShowAll(!showAll)}
            >
              <ChevronDown className={`h-3 w-3 text-gray-600 transition-transform ${showAll ? 'rotate-180' : ''}`} />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UpcomingShipping;
