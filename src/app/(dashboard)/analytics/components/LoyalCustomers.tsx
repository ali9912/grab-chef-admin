'use client';
import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import axios from 'axios';
import { BASE_API_URL } from '@/common/constants';
import { getCookie } from 'cookies-next/client';

interface Customer {
  id: number;
  name: string;
  orderCount: number;
  avatar: string;
  initials: string;
}

const customers: Customer[] = [
  {
    id: 1,
    name: 'Claudya Chintia',
    orderCount: 651,
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjKNpeICypw6HglgXH9dwb2Uj4rG0eH9DXcQ&s',
    initials: 'CC',
  },
  {
    id: 2,
    name: 'Jean Reves',
    orderCount: 356,
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjKNpeICypw6HglgXH9dwb2Uj4rG0eH9DXcQ&s',
    initials: 'JR',
  },
  {
    id: 3,
    name: 'Kevin Hard',
    orderCount: 125,
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjKNpeICypw6HglgXH9dwb2Uj4rG0eH9DXcQ&s',
    initials: 'KH',
  },
  {
    id: 4,
    name: 'Dave Jev Bosh',
    orderCount: 78,
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjKNpeICypw6HglgXH9dwb2Uj4rG0eH9DXcQ&s',
    initials: 'DB',
  },
];

const LoyalCustomers = () => {
  const [data, setData] = useState([]);

  const getLoyalCustomers = async () => {
    try {
      const token = getCookie('token');
      const res = await axios.get(`${BASE_API_URL}/admin/repeating-customers`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const resData = res.data;
      setData(resData);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    getLoyalCustomers();
  }, []);

  return (
    <div>
      <div>
        <div>
          <div className='flex justify-center'>
            <Card className='w-full mx-auto px-6 py-3 bg-white shadow'>
              <div>
                <h2 className='text-xl font-semibold text-gray-900'>
                  Loyal Customers
                </h2>
                {/* <p className='text-sm text-gray-500'>Lorem ipsum dolor</p> */}
              </div>

              <div className='space-y-1'>
                {data &&
                  data.length &&
                  data?.slice(0, 5).map((customer:any) => (
                    <div
                      key={customer._id}
                      className='flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer'
                    >
                      <div className='flex items-center space-x-3'>
                        <Avatar className='w-12 h-12'>
                          <AvatarImage
                            src={
                              customer?.customerProfilePicture ||
                              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjKNpeICypw6HglgXH9dwb2Uj4rG0eH9DXcQ&s'
                            }
                            alt={customer?.customerName}
                          />
                          {/* <AvatarFallback className='bg-gradient-to-br from-blue-500 to-purple-600 text-white font-medium'>
                          {customer.initials}
                        </AvatarFallback> */}
                        </Avatar>
                        <div>
                          <h3 className='font-medium text-gray-900'>
                            {customer?.customerName}
                          </h3>
                          <p className='text-sm text-red-500 font-medium'>
                            {customer?.totalBookings} Times Order
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoyalCustomers;
